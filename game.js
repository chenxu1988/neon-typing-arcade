const sentences = {
    1: ["The cat sat on the mat.", "I like to play ball.", "The sun is very hot."],
    2: ["Big dinosaurs eat green leaves.", "A small dog ran fast today.", "We can jump very high."],
    3: ["The blue bird flies in the sky.", "My friend has a red bicycle.", "They found a treasure chest."],
    4: ["Elephants have long trunks and big ears.", "Space rockets fly to the moon and stars.", "The ocean is full of colorful fish."],
    5: ["The friendly T-Rex is looking for his dinner.", "A volcano erupted with bright orange lava.", "Pterodactyls soar above the giant tall trees."]
};

let currentLevel = 1;
let currentSentenceIndex = 0;
let charIndex = 0;
let errors = 0;
let totalTyped = 0;
let startTime = null;

const levelVal = document.getElementById('level-val');
const wpmVal = document.getElementById('wpm-val');
const accuracyVal = document.getElementById('accuracy-val');
const sentenceDisplay = document.getElementById('sentence-display');
const dinoSprite = document.getElementById('dino-sprite');

// --- Standard HTML5 Audio Controller for bgm.ogg ---
class BGMController {
    constructor() {
        this.audio = new Audio('bgm.ogg');
        this.audio.loop = true;
        this.audio.volume = 0.25; // Clear but non-intrusive volume
        this.isPlaying = false;
    }

    start() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.audio.play().catch(err => {
            console.log("Play deferred or bgm.mp3 not found. Place bgm.mp3 in folder to play.", err);
            this.isPlaying = false;
            const btn = document.getElementById('bgm-toggle');
            if (btn) {
                btn.innerText = '🎵 Music: Off';
                btn.classList.remove('active');
            }
        });
    }

    stop() {
        this.isPlaying = false;
        this.audio.pause();
    }
}

class SoundManager {
    constructor() {
        this.ctx = null;
        this.soundEnabled = true;
        this.bgmEnabled = false;
        this.bgmController = new BGMController();
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleSound() {
        this.init();
        this.soundEnabled = !this.soundEnabled;
        const btn = document.getElementById('sound-toggle');
        if (this.soundEnabled) {
            btn.innerText = '🔊 Sound: On';
            btn.classList.add('active');
        } else {
            btn.innerText = '🔇 Sound: Off';
            btn.classList.remove('active');
        }
        btn.blur(); // Fix: remove focus to prevent keyboard Space/Enter triggering click
    }

    toggleBGM() {
        this.init();
        this.bgmEnabled = !this.bgmEnabled;
        const btn = document.getElementById('bgm-toggle');
        if (this.bgmEnabled) {
            btn.innerText = '🎵 Music: On';
            btn.classList.add('active');
            this.bgmController.start();
        } else {
            btn.innerText = '🎵 Music: Off';
            btn.classList.remove('active');
            this.bgmController.stop();
        }
        btn.blur(); // Fix: remove focus to prevent keyboard Space/Enter triggering click
    }

    playType() {
        if (!this.soundEnabled) return;
        this.init();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Keyboard "clack" sound
        osc.type = 'triangle';
        const pitch = 700 + Math.random() * 300;
        osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playError() {
        if (!this.soundEnabled) return;
        this.init();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Typo error buzzer
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(60, this.ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }
}

const sounds = new SoundManager();

// --- Walking Animation Timer ---
let walkingTimeout = null;

function triggerWalking() {
    dinoSprite.classList.add('dino-walking');
    dinoSprite.classList.remove('dino-idle');
    
    if (walkingTimeout) clearTimeout(walkingTimeout);
    
    walkingTimeout = setTimeout(() => {
        dinoSprite.classList.remove('dino-walking');
        dinoSprite.classList.add('dino-idle');
    }, 400);
}

function initGame() {
    loadSentence();
    window.addEventListener('keydown', handleKeyPress);

    // Wire buttons
    document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
    document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());
}

function loadSentence() {
    const levelSentences = sentences[currentLevel];
    const sentence = levelSentences[currentSentenceIndex];
    
    sentenceDisplay.innerHTML = '';
    sentence.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.innerText = char;
        if (index === 0) span.classList.add('char-current');
        sentenceDisplay.appendChild(span);
    });
    
    charIndex = 0;
    updateDinoPosition();
}

function handleKeyPress(e) {
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt') return;

    // Initialize/resume sound context on any keypress to satisfy browser security
    sounds.init();

    // Prevent default browser behavior for Space to avoid scrolling down page
    if (e.key === ' ') {
        e.preventDefault();
    }

    if (!startTime) startTime = new Date();

    const levelSentences = sentences[currentLevel];
    const targetSentence = levelSentences[currentSentenceIndex];
    const spans = sentenceDisplay.querySelectorAll('span');
    
    const targetChar = targetSentence[charIndex];
    const pressedChar = e.key;

    totalTyped++;

    if (pressedChar === targetChar) {
        sounds.playType();
        triggerWalking();
        spans[charIndex].classList.remove('char-current', 'char-wrong');
        spans[charIndex].classList.add('char-correct');
        charIndex++;
        
        if (charIndex < targetSentence.length) {
            spans[charIndex].classList.add('char-current');
        } else {
            finishSentence();
        }
    } else {
        sounds.playError();
        errors++;
        spans[charIndex].classList.add('char-wrong');
    }

    updateStats();
    updateDinoPosition();
}

function updateStats() {
    // Accuracy
    const accuracy = Math.max(0, Math.round(((totalTyped - errors) / totalTyped) * 100));
    accuracyVal.innerText = accuracy;

    // WPM
    if (startTime) {
        const timeElapsed = (new Date() - startTime) / 60000; // in minutes
        const wpm = Math.round((totalTyped / 5) / timeElapsed);
        wpmVal.innerText = wpm;
    }
}

function updateDinoPosition() {
    const levelSentences = sentences[currentLevel];
    const targetSentence = levelSentences[currentSentenceIndex];
    const progress = (charIndex / targetSentence.length) * 80 + 10; // 10% to 90%
    dinoSprite.style.left = `${progress}%`;
}

function finishSentence() {
    currentSentenceIndex++;
    if (currentSentenceIndex >= sentences[currentLevel].length) {
        nextLevel();
    } else {
        loadSentence();
    }
}

function nextLevel() {
    currentLevel++;
    if (currentLevel > 5) {
        alert("Victory! You are a Typing Master!");
        currentLevel = 1;
    }
    currentSentenceIndex = 0;
    levelVal.innerText = currentLevel;
    loadSentence();
}

initGame();
