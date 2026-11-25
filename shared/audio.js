(function (global) {
    'use strict';

    const NOTE_FREQ = {
        C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
        C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
        C4: 261.63, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Fs4: 369.99,
        G4: 392.00, Gs4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
        C5: 523.25, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, Fs5: 739.99,
        G5: 783.99, A5: 880.00, B5: 987.77, C6: 1046.50
    };

    class ChiptuneSequencer {
        constructor(tracks = {}, defaultTrack = null) {
            this.tracks = tracks;
            this.currentTrack = defaultTrack || Object.keys(tracks)[0] || null;
            this.isPlaying = false;
            this.step = 0;
            this.timerId = null;
            this.ctx = null;
        }

        setContext(ctx) {
            this.ctx = ctx;
        }

        setTracks(tracks, defaultTrack = null) {
            this.tracks = tracks || {};
            this.currentTrack = defaultTrack || Object.keys(this.tracks)[0] || null;
        }

        setTrack(trackName) {
            if (!this.tracks[trackName]) return;
            if (this.currentTrack === trackName) return;
            this.currentTrack = trackName;
            this.step = 0;
            if (this.isPlaying) {
                this.restartLoop();
            }
        }

        start() {
            if (this.isPlaying || !this.ctx || !this.currentTrack || !this.tracks[this.currentTrack]) return;
            this.isPlaying = true;
            this.step = 0;
            this.restartLoop();
        }

        stop() {
            this.isPlaying = false;
            if (this.timerId) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
        }

        restartLoop() {
            if (this.timerId) {
                clearInterval(this.timerId);
                this.timerId = null;
            }
            const track = this.tracks[this.currentTrack];
            if (!track) return;
            const stepMs = (60 / (track.bpm || 132) / 2) * 1000;
            this.playStep();
            this.timerId = setInterval(() => this.playStep(), stepMs);
        }

        playTone(freq, duration, type, volume) {
            if (!this.ctx || !freq) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type || 'square';
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(volume, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + duration);
        }

        playDrum(isKick) {
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            if (isKick) {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(135, now);
                osc.frequency.exponentialRampToValueAtTime(38, now + 0.09);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.09);
            } else {
                osc.type = 'square';
                osc.frequency.setValueAtTime(980, now);
                gain.gain.setValueAtTime(0.012, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.025);
            }
        }

        playStep() {
            if (!this.isPlaying || !this.ctx || this.ctx.state !== 'running') return;
            const track = this.tracks[this.currentTrack];
            if (!track || !track.lead || track.lead.length === 0) return;

            const idx = this.step % track.lead.length;
            const stepSec = 60 / (track.bpm || 132) / 2;

            const leadNote = track.lead[idx];
            const bassNote = track.bass ? track.bass[idx % track.bass.length] : null;

            if (leadNote && NOTE_FREQ[leadNote]) {
                this.playTone(NOTE_FREQ[leadNote], stepSec * 0.85, track.leadWave || 'square', track.leadVol || 0.032);
            }
            if (bassNote && NOTE_FREQ[bassNote]) {
                this.playTone(NOTE_FREQ[bassNote], stepSec * 0.9, track.bassWave || 'triangle', track.bassVol || 0.055);
            }

            if (track.drums !== false) {
                if (idx % 4 === 0) this.playDrum(true);
                else if (idx % 2 === 1) this.playDrum(false);
            }

            this.step++;
        }
    }

    function speakText(text, options = {}) {
        const { enabled = true, force = false, lang = 'en-US', rate = 0.94, pitch = 1.05, volume = 1.0 } = options;
        if ((!enabled && !force) || !('speechSynthesis' in global) || !text) return;
        try {
            global.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = lang;
            utter.rate = rate;
            utter.pitch = pitch;
            utter.volume = volume;
            global.speechSynthesis.speak(utter);
        } catch {
            // Ignore restricted speech synthesis errors
        }
    }

    function stopSpeech() {
        if ('speechSynthesis' in global) {
            try {
                global.speechSynthesis.cancel();
            } catch {
                // Ignore
            }
        }
    }

    class BaseSoundManager {
        constructor(tracks = {}, defaultTrack = null) {
            this.ctx = null;
            this.soundEnabled = true;
            this.bgmEnabled = true;
            this.voiceEnabled = true;
            this._startSfxUntil = 0;
            this._pendingSpeakTimer = null;
            this.bgmController = new ChiptuneSequencer(tracks, defaultTrack);
        }

        init() {
            if (!this.ctx) {
                const AudioCtx = global.AudioContext || global.webkitAudioContext;
                if (AudioCtx) {
                    this.ctx = new AudioCtx();
                    this.bgmController.setContext(this.ctx);
                }
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume().catch(() => {});
            }
        }

        playTone(freq, duration = 0.12, type = 'sine', volume = 0.08, endFreq = null) {
            if (!this.soundEnabled) return;
            this.init();
            if (!this.ctx) return;

            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            if (endFreq !== null) {
                osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), now + duration);
            }
            gain.gain.setValueAtTime(volume, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + duration);
        }

        playFanfare(notes = [523.25, 659.25, 783.99], stepDelay = 0.085) {
            if (!this.soundEnabled) return;
            this.init();
            if (!this.ctx) return;

            const t = this.ctx.currentTime;
            notes.forEach((freq, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, t + idx * stepDelay);
                gain.gain.setValueAtTime(0.08, t + idx * stepDelay);
                gain.gain.exponentialRampToValueAtTime(0.001, t + idx * stepDelay + 0.2);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t + idx * stepDelay);
                osc.stop(t + idx * stepDelay + 0.2);
            });
        }

        playClick() {
            this.playTone(720 + Math.random() * 240, 0.05, 'triangle', 0.08, 120);
        }

        playError() {
            this.playTone(130, 0.14, 'sawtooth', 0.1, 65);
        }

        playSuccess() {
            this.playFanfare([523.25, 659.25, 783.99], 0.08);
        }

        playGameStart(theme = 'chime') {
            if (!this.soundEnabled) return;
            this.init();
            if (!this.ctx) return;

            this._startSfxUntil = Date.now() + 700;
            const t = this.ctx.currentTime;
            const scheduleNote = (freq, startOffset, dur, type, vol, endFreq = null) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, t + startOffset);
                if (endFreq !== null) {
                    osc.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), t + startOffset + dur);
                }
                gain.gain.setValueAtTime(0.001, t + startOffset);
                gain.gain.linearRampToValueAtTime(vol, t + startOffset + 0.025);
                gain.gain.exponentialRampToValueAtTime(0.001, t + startOffset + dur);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t + startOffset);
                osc.stop(t + startOffset + dur + 0.02);
            };

            switch (theme) {
                case 'horn':
                    scheduleNote(174.61, 0, 0.24, 'sawtooth', 0.11, 220);
                    scheduleNote(261.63, 0.18, 0.45, 'sawtooth', 0.12, 261.63);
                    scheduleNote(130.81, 0.18, 0.45, 'triangle', 0.10, 130.81);
                    break;
                case 'launch':
                    scheduleNote(120, 0, 0.38, 'sawtooth', 0.09, 640);
                    scheduleNote(880, 0.22, 0.16, 'sine', 0.08, 1320);
                    break;
                case 'roar':
                    scheduleNote(150, 0, 0.42, 'sawtooth', 0.14, 58);
                    scheduleNote(75, 0.04, 0.38, 'triangle', 0.12, 42);
                    break;
                case 'powerup':
                    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => scheduleNote(f, i * 0.06, 0.14, 'square', 0.06));
                    break;
                case 'quest':
                    [587.33, 739.99, 880, 1174.66].forEach((f, i) => scheduleNote(f, i * 0.07, 0.18, 'triangle', 0.09));
                    break;
                case 'bell':
                    scheduleNote(987.77, 0, 0.18, 'sine', 0.11);
                    scheduleNote(1318.51, 0.09, 0.30, 'sine', 0.11);
                    break;
                case 'sonar':
                    scheduleNote(880, 0, 0.14, 'sine', 0.09);
                    scheduleNote(1318.51, 0.16, 0.24, 'sine', 0.09);
                    break;
                case 'chime':
                default:
                    scheduleNote(1318.51, 0, 0.14, 'triangle', 0.10);
                    scheduleNote(1975.53, 0.08, 0.28, 'sine', 0.10);
                    break;
            }
        }

        speak(text, force = false) {
            if (this._pendingSpeakTimer) {
                clearTimeout(this._pendingSpeakTimer);
                this._pendingSpeakTimer = null;
            }
            const delay = !force ? Math.max(0, this._startSfxUntil - Date.now()) : 0;
            if (delay > 0) {
                this._pendingSpeakTimer = setTimeout(() => {
                    this._pendingSpeakTimer = null;
                    speakText(text, { enabled: this.voiceEnabled, force });
                }, delay);
            } else {
                speakText(text, { enabled: this.voiceEnabled, force });
            }
        }

        stopSpeech() {
            if (this._pendingSpeakTimer) {
                clearTimeout(this._pendingSpeakTimer);
                this._pendingSpeakTimer = null;
            }
            stopSpeech();
        }
    }

    global.ArcadeAudio = {
        NOTE_FREQ,
        ChiptuneSequencer,
        BaseSoundManager,
        speakText,
        stopSpeech
    };
})(window);
