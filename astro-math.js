// Astro Math Defense — Scaffold & Problem Generator (T3.1)
const MATH_TRACKS = {
    main: {
        bpm: 138,
        leadWave: 'square',
        lead: [
            'C5', null, 'E5', 'G5', 'A5', null, 'G5', 'E5',
            'D5', null, 'F5', 'A5', 'G5', null, 'D5', null,
            'C5', null, 'E5', 'G5', 'C6', null, 'A5', 'G5',
            'F5', 'E5', 'D5', 'B4', 'C5', null, null, null
        ],
        bass: [
            'C3', 'C3', 'G3', 'C3', 'A2', 'A2', 'E3', 'A2',
            'F2', 'F2', 'C3', 'F2', 'G2', 'G2', 'D3', 'G2',
            'C3', 'C3', 'G3', 'C3', 'F2', 'F2', 'C3', 'F2',
            'G2', 'G2', 'G3', 'G2', 'C3', null, null, null
        ]
    }
};

class MathSoundManager extends window.ArcadeAudio.BaseSoundManager {
    constructor() {
        super(MATH_TRACKS, 'main');
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
            if (gameActive && !gamePaused) this.bgmController.start();
        } else {
            btn.innerText = '🎵 Music: Off';
            btn.classList.remove('active');
            this.bgmController.stop();
        }
        btn.blur();
    }
}

const sounds = new MathSoundManager();

const DIFFICULTY_PRESETS = {
    easy: { baseSpeed: 0.45, spawnMs: 3600 },
    normal: { baseSpeed: 0.7, spawnMs: 2900 },
    hard: { baseSpeed: 1.0, spawnMs: 2300 }
};

function generateMathProblem(topic) {
    if (topic === 'multiply') {
        const a = Math.floor(Math.random() * 11);
        const b = Math.floor(Math.random() * 11);
        return {
            text: `${a} × ${b} = ?`,
            answer: a * b,
            hint: `Hint: ${a} groups of ${b} (skip-count by ${b}, ${a} times).`
        };
    }
    if (topic === 'divide') {
        const b = 1 + Math.floor(Math.random() * 10);
        const ans = 1 + Math.floor(Math.random() * 10);
        const a = b * ans;
        return {
            text: `${a} ÷ ${b} = ?`,
            answer: ans,
            hint: `Hint: ${b} × ? = ${a}`
        };
    }
    if (topic === 'addsub') {
        if (Math.random() < 0.5) {
            const a = 12 + Math.floor(Math.random() * 75);
            const b = 10 + Math.floor(Math.random() * 65);
            return {
                text: `${a} + ${b} = ?`,
                answer: a + b,
                hint: `Hint: Add tens first, then ones!`
            };
        }
        const b = 10 + Math.floor(Math.random() * 45);
        const ans = 8 + Math.floor(Math.random() * 55);
        const a = b + ans;
        return {
            text: `${a} - ${b} = ?`,
            answer: ans,
            hint: `Hint: Count up from ${b} to ${a}.`
        };
    }
    // Grade 5: Order of Operations
    const a = 2 + Math.floor(Math.random() * 8);
    const b = 2 + Math.floor(Math.random() * 6);
    const c = 1 + Math.floor(Math.random() * 9);
    if (Math.random() < 0.5) {
        return {
            text: `${c} + ${a} × ${b} = ?`,
            answer: c + (a * b),
            hint: `Hint: Multiply ${a} × ${b} first, then add ${c}.`
        };
    }
    return {
        text: `(${c} + ${a}) × ${b} = ?`,
        answer: (c + a) * b,
        hint: `Hint: Solve (${c} + ${a}) inside parentheses first!`
    };
}

let gameActive = false;
let gamePaused = false;
let score = 0;
let wave = 1;
let lives = 3;
let totalAttempts = 0;
let wrongAttempts = 0;
let currentInput = '';
let meteors = [];
let missedFacts = new Map();

const topicSelect = document.getElementById('topic-select');
const difficultySelect = document.getElementById('difficulty-select');
const startScreen = document.getElementById('start-screen');
const pauseScreen = document.getElementById('pause-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const answerDisplay = document.getElementById('answer-input-display');

function updateTopicBanner() {
    const profile = window.ArcadeProfile ? window.ArcadeProfile.loadProfile() : { games: {} };
    const stats = profile.games.astro_math || { bestScore: 0, bestAcc: 0 };
    document.getElementById('topic-best-banner').innerText = `BEST: ${stats.bestScore} PTS | ${stats.bestAcc}% ACC`;
}

function startGame() {
    sounds.init();
    score = 0;
    wave = 1;
    lives = 3;
    totalAttempts = 0;
    wrongAttempts = 0;
    currentInput = '';
    meteors = [];
    missedFacts = new Map();
    gameActive = true;
    gamePaused = false;

    answerDisplay.innerText = '_';
    document.getElementById('score-val').innerText = '0';
    document.getElementById('wave-val').innerText = '1';
    document.getElementById('acc-val').innerText = '100%';
    startScreen.classList.remove('active');
    pauseScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');

    if (sounds.bgmEnabled) sounds.bgmController.start();
}

function returnToMenu() {
    gameActive = false;
    gamePaused = false;
    sounds.bgmController.stop();
    pauseScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');
    updateTopicBanner();
    startScreen.classList.add('active');
}

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
document.getElementById('pause-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('gameover-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());

updateTopicBanner();
