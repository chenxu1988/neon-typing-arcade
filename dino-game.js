const BIOMES = [
    { level: 1, name: 'LEVEL 1: SUNNY MEADOW', cssClass: 'biome-1', goal: '🍓' },
    { level: 2, name: 'LEVEL 2: JUNGLE VALLEY', cssClass: 'biome-2', goal: '🍍' },
    { level: 3, name: 'LEVEL 3: GOLDEN DESERT', cssClass: 'biome-3', goal: '🥭' },
    { level: 4, name: 'LEVEL 4: SUNSET CANYON', cssClass: 'biome-4', goal: '🥚' },
    { level: 5, name: 'LEVEL 5: VOLCANO PEAK', cssClass: 'biome-5', goal: '🏆' }
];

const SENTENCES_POOL = {
    1: [
        "The cat sat on the mat.",
        "I like to play ball.",
        "The sun is very hot.",
        "A green frog can hop.",
        "My dog likes to nap.",
        "We see a big red bus.",
        "The bird sang a song.",
        "I can run up the hill.",
        "Look at the bright moon.",
        "Ten fish swim in a pond."
    ],
    2: [
        "Big dinosaurs eat green leaves.",
        "A small dog ran fast today.",
        "We can jump very high.",
        "Monkeys swing from tall trees.",
        "The baby dino found a berry.",
        "Rain falls on the jungle floor.",
        "Colorful parrots fly above us.",
        "A turtle hides inside its shell.",
        "Bears sleep during cold winter.",
        "Butterflies land on sweet flowers."
    ],
    3: [
        "The blue bird flies in the sky.",
        "My friend has a red bicycle.",
        "They found a treasure chest.",
        "Camels walk across warm sand.",
        "The clever fox jumped over rocks.",
        "We packed water for our hike.",
        "Stars shine bright at midnight.",
        "A gentle breeze cooled the camp.",
        "The explorer drew a helpful map.",
        "Golden light filled the canyon."
    ],
    4: [
        "Elephants have long trunks and big ears.",
        "Space rockets fly to the moon and stars.",
        "The ocean is full of colorful fish.",
        "Scientists study fossils from long ago.",
        "A rainbow appeared after the afternoon storm.",
        "Dolphins leap happily over ocean waves.",
        "Our class visited the natural history museum.",
        "Mountains rise high above the quiet valley.",
        "Courageous explorers sailed across wide seas.",
        "The library has stories about ancient worlds."
    ],
    5: [
        "The friendly T-Rex is looking for his dinner.",
        "A volcano erupted with bright orange lava.",
        "Pterodactyls soar above the giant tall trees.",
        "Every fossil tells an amazing story about Earth.",
        "Velociraptors raced swiftly across the dusty plains.",
        "Triceratops used three horns to protect its herd.",
        "Stegosaurus carried bony plates along its strong back.",
        "Brachiosaurus stretched its long neck to reach leaves.",
        "Prehistoric forests echoed with thunderous dinosaur footsteps.",
        "You have mastered every biome in the dinosaur world!"
    ]
};

const SENTENCES_PER_LEVEL = 4;
const DINO_STORAGE_KEY = 'dinoTypingStats';

let currentLevel = 1;
let currentSentenceIndex = 0;
let activeLevelSentences = [];
let charIndex = 0;
let errors = 0;
let totalTyped = 0;
let startTime = null;
let gameActive = false;

const levelVal = document.getElementById('level-val');
const stepVal = document.getElementById('step-val');
const wpmVal = document.getElementById('wpm-val');
const accuracyVal = document.getElementById('accuracy-val');
const sentenceDisplay = document.getElementById('sentence-display');
const dinoSprite = document.getElementById('dino-sprite');
const gameBoard = document.getElementById('game-board');
const goalItem = document.getElementById('goal-item');
const levelBanner = document.getElementById('level-banner');
const confettiContainer = document.getElementById('confetti-container');

const startScreen = document.getElementById('start-screen');
const victoryScreen = document.getElementById('victory-screen');
const bestStatsBanner = document.getElementById('best-stats-banner');
const finalWpmVal = document.getElementById('final-wpm-val');
const finalAccVal = document.getElementById('final-acc-val');
const newRecordBadge = document.getElementById('new-record-badge');

// --- Cheerful Procedural Chiptune BGM ---
const DINO_NOTES = {
    C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00,
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00
};

const DINO_MELODY = [
    'C5', null, 'E5', 'G5', 'A5', null, 'G5', 'E5',
    'F5', null, 'D5', null, 'E5', 'C5', 'G4', null,
    'C5', null, 'E5', 'G5', 'A5', 'G5', 'E5', 'D5',
    'C5', null, 'G4', 'A4', 'C5', null, null, null
];

const DINO_BASS = [
    'C3', 'G3', 'C3', 'G3', 'F3', 'C3', 'C3', 'G3',
    'F3', 'C3', 'G3', 'D3', 'C3', 'G3', 'C3', null,
    'C3', 'G3', 'C3', 'G3', 'F3', 'C3', 'G3', 'D3',
    'C3', 'G3', 'F3', 'G3', 'C3', null, null, null
];

class BGMController {
    constructor() {
        this.ctx = null;
        this.isPlaying = false;
        this.step = 0;
        this.timerId = null;
    }

    setContext(ctx) {
        this.ctx = ctx;
    }

    start() {
        if (this.isPlaying || !this.ctx) return;
        this.isPlaying = true;
        this.step = 0;
        this.playStep();
        this.timerId = setInterval(() => this.playStep(), 240);
    }

    stop() {
        this.isPlaying = false;
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    playStep() {
        if (!this.isPlaying || !this.ctx || this.ctx.state !== 'running') return;
        const idx = this.step % DINO_MELODY.length;
        const now = this.ctx.currentTime;

        const lead = DINO_MELODY[idx];
        if (lead && DINO_NOTES[lead]) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(DINO_NOTES[lead], now);
            gain.gain.setValueAtTime(0.035, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.2);
        }

        const bass = DINO_BASS[idx];
        if (bass && DINO_NOTES[bass]) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(DINO_NOTES[bass], now);
            gain.gain.setValueAtTime(0.045, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.22);
        }

        this.step++;
    }
}

class SoundManager {
    constructor() {
        this.ctx = null;
        this.soundEnabled = true;
        this.bgmEnabled = true;
        this.voiceEnabled = true;
        this.bgmController = new BGMController();
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.bgmController.setContext(this.ctx);
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleSound() {
        this.init();
        this.soundEnabled = !this.soundEnabled;
        const btn = document.getElementById('sound-toggle');
        btn.innerText = this.soundEnabled ? '🔊 Sound: On' : '🔇 Sound: Off';
        btn.classList.toggle('active', this.soundEnabled);
        btn.blur();
    }

    toggleBGM() {
        this.init();
        this.bgmEnabled = !this.bgmEnabled;
        const btn = document.getElementById('bgm-toggle');
        if (this.bgmEnabled) {
            btn.innerText = '🎵 Music: On';
            btn.classList.add('active');
            if (gameActive) this.bgmController.start();
        } else {
            btn.innerText = '🎵 Music: Off';
            btn.classList.remove('active');
            this.bgmController.stop();
        }
        btn.blur();
    }

    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        const btn = document.getElementById('voice-toggle');
        btn.innerText = this.voiceEnabled ? '🗣️ Voice: On' : '🔇 Voice: Off';
        btn.classList.toggle('active', this.voiceEnabled);
        if (!this.voiceEnabled) this.stopSpeech();
        btn.blur();
    }

    speakSentence(text, force = false) {
        if ((!this.voiceEnabled && !force) || !('speechSynthesis' in window) || !text) return;
        try {
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.lang = 'en-US';
            utter.rate = 0.92;
            utter.pitch = 1.05;
            window.speechSynthesis.speak(utter);
        } catch {
            // Ignore speech restrictions
        }
    }

    stopSpeech() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }

    playType() {
        if (!this.soundEnabled) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(700 + Math.random() * 260, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.05);
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
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(130, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(70, this.ctx.currentTime + 0.14);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.14);
    }

    playFanfare(notes = [523.25, 659.25, 783.99]) {
        if (!this.soundEnabled) return;
        this.init();
        const t = this.ctx.currentTime;
        notes.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, t + i * 0.09);
            gain.gain.setValueAtTime(0.09, t + i * 0.09);
            gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.09 + 0.22);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(t + i * 0.09);
            osc.stop(t + i * 0.09 + 0.22);
        });
    }
}

const sounds = new SoundManager();

// --- Persistence ---
function loadBestStats() {
    try {
        return JSON.parse(localStorage.getItem(DINO_STORAGE_KEY)) || { bestWpm: 0, bestAcc: 0 };
    } catch {
        return { bestWpm: 0, bestAcc: 0 };
    }
}

function saveBestStats(wpm, acc) {
    const prev = loadBestStats();
    const isNewBest = wpm > prev.bestWpm && wpm > 0;
    const next = {
        bestWpm: Math.max(prev.bestWpm, wpm),
        bestAcc: Math.max(prev.bestAcc, acc)
    };
    try {
        localStorage.setItem(DINO_STORAGE_KEY, JSON.stringify(next));
    } catch {
        // Ignore storage errors
    }
    return isNewBest;
}

function updateBestBanner() {
    const stats = loadBestStats();
    bestStatsBanner.innerText = `BEST: ${stats.bestWpm} WPM | ${stats.bestAcc}% ACCURACY`;
}

// --- Animations & Scenery ---
let walkingTimeout = null;

function spawnDustPuff() {
    const puff = document.createElement('div');
    puff.className = 'dust-puff';
    puff.style.left = dinoSprite.style.left || '8%';
    confettiContainer.appendChild(puff);
    setTimeout(() => puff.remove(), 400);
}

function triggerWalking() {
    dinoSprite.classList.add('dino-walking');
    dinoSprite.classList.remove('dino-idle');
    if (Math.random() < 0.45) spawnDustPuff();
    if (walkingTimeout) clearTimeout(walkingTimeout);
    walkingTimeout = setTimeout(() => {
        dinoSprite.classList.remove('dino-walking');
        dinoSprite.classList.add('dino-idle');
    }, 350);
}

function spawnConfetti() {
    const colors = ['#ffeb3b', '#ff5722', '#4caf50', '#00bcd4', '#e91e63'];
    const rect = goalItem.getBoundingClientRect();
    const envRect = document.getElementById('environment').getBoundingClientRect();
    const x = (rect.left + rect.width / 2) - envRect.left;
    const y = (rect.top + rect.height / 2) - envRect.top;

    for (let i = 0; i < 16; i++) {
        const dot = document.createElement('div');
        dot.className = 'confetti-dot';
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        dot.style.backgroundColor = colors[i % colors.length];
        const angle = Math.random() * Math.PI * 2;
        const dist = 25 + Math.random() * 65;
        dot.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
        dot.style.setProperty('--dy', `${Math.sin(angle) * dist - 20}px`);
        confettiContainer.appendChild(dot);
        setTimeout(() => dot.remove(), 700);
    }
}

function applyBiome(showBanner = true) {
    const cfg = BIOMES[currentLevel - 1] || BIOMES[0];
    gameBoard.className = cfg.cssClass;
    goalItem.innerText = cfg.goal;
    levelVal.innerText = currentLevel;

    if (showBanner) {
        levelBanner.innerText = cfg.name;
        levelBanner.classList.add('active');
        setTimeout(() => levelBanner.classList.remove('active'), 1800);
    }
}

function pickLevelSentences(level) {
    const pool = [...(SENTENCES_POOL[level] || SENTENCES_POOL[1])];
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, SENTENCES_PER_LEVEL);
}

function startGame() {
    sounds.init();
    currentLevel = 1;
    currentSentenceIndex = 0;
    errors = 0;
    totalTyped = 0;
    startTime = null;
    gameActive = true;

    wpmVal.innerText = '0';
    accuracyVal.innerText = '100';
    startScreen.classList.remove('active');
    victoryScreen.classList.remove('active');

    activeLevelSentences = pickLevelSentences(currentLevel);
    applyBiome(true);
    loadSentence();

    if (sounds.bgmEnabled) {
        sounds.bgmController.start();
    }
}

function loadSentence() {
    const sentence = activeLevelSentences[currentSentenceIndex];
    stepVal.innerText = `${currentSentenceIndex + 1}`;
    sentenceDisplay.innerHTML = '';
    sentence.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.innerText = char;
        if (index === 0) span.classList.add('char-current');
        sentenceDisplay.appendChild(span);
    });

    charIndex = 0;
    updateDinoPosition();
    sounds.speakSentence(sentence);
}

function handleKeyPress(e) {
    if (!gameActive) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1) return;

    sounds.init();

    if (e.key === ' ') {
        e.preventDefault();
    }

    if (!startTime) startTime = Date.now();

    const targetSentence = activeLevelSentences[currentSentenceIndex];
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

function getAccuracy() {
    if (totalTyped === 0) return 100;
    return Math.max(0, Math.round(((totalTyped - errors) / totalTyped) * 100));
}

function getWpm() {
    if (!startTime) return 0;
    const elapsedMin = Math.max((Date.now() - startTime) / 60000, 1 / 60);
    const netWords = Math.max(0, (totalTyped - errors) / 5);
    return Math.round(netWords / elapsedMin);
}

function updateStats() {
    accuracyVal.innerText = getAccuracy();
    wpmVal.innerText = getWpm();
}

function updateDinoPosition() {
    const targetSentence = activeLevelSentences[currentSentenceIndex];
    const progress = (charIndex / targetSentence.length) * 80 + 8; // 8% to 88%
    dinoSprite.style.left = `${progress}%`;
}

function finishSentence() {
    sounds.playFanfare([523.25, 659.25, 783.99]);
    spawnConfetti();
    dinoSprite.classList.remove('dino-jump');
    void dinoSprite.offsetWidth;
    dinoSprite.classList.add('dino-jump');

    currentSentenceIndex++;
    if (currentSentenceIndex >= activeLevelSentences.length) {
        setTimeout(nextLevel, 420);
    } else {
        setTimeout(loadSentence, 420);
    }
}

function nextLevel() {
    currentLevel++;
    if (currentLevel > BIOMES.length) {
        showVictory();
        return;
    }
    sounds.playFanfare([523.25, 659.25, 783.99, 1046.5]);
    currentSentenceIndex = 0;
    activeLevelSentences = pickLevelSentences(currentLevel);
    applyBiome(true);
    loadSentence();
}

function showVictory() {
    gameActive = false;
    sounds.bgmController.stop();
    sounds.stopSpeech();
    sounds.playFanfare([523.25, 659.25, 783.99, 1046.5]);

    const finalWpm = getWpm();
    const finalAcc = getAccuracy();
    const isNewBest = saveBestStats(finalWpm, finalAcc);
    updateBestBanner();

    finalWpmVal.innerText = finalWpm;
    finalAccVal.innerText = finalAcc;
    newRecordBadge.style.display = isNewBest ? 'block' : 'none';
    victoryScreen.classList.add('active');
}

// --- Event Listeners ---
window.addEventListener('keydown', handleKeyPress);
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('play-again-btn').addEventListener('click', startGame);
document.getElementById('voice-toggle').addEventListener('click', () => sounds.toggleVoice());
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());
document.getElementById('display-container').addEventListener('click', () => {
    if (gameActive && activeLevelSentences[currentSentenceIndex]) {
        sounds.speakSentence(activeLevelSentences[currentSentenceIndex], true);
    }
});

updateBestBanner();
