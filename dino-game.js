const BIOMES = [
    { level: 1, name: 'LEVEL 1: SUNNY MEADOW', cssClass: 'biome-1', goal: '🍓' },
    { level: 2, name: 'LEVEL 2: JUNGLE VALLEY', cssClass: 'biome-2', goal: '🍍' },
    { level: 3, name: 'LEVEL 3: GOLDEN DESERT', cssClass: 'biome-3', goal: '🥭' },
    { level: 4, name: 'LEVEL 4: SUNSET CANYON', cssClass: 'biome-4', goal: '🥚' },
    { level: 5, name: 'LEVEL 5: VOLCANO PEAK', cssClass: 'biome-5', goal: '🏆' }
];

// Sentences loaded from db/dino-sentences.js
const GRADE_SENTENCES = window.ArcadeDB.dinoSentences;
const SENTENCES_POOL = GRADE_SENTENCES.grade3;

const SENTENCES_PER_LEVEL = 4;
const DINO_STORAGE_KEY = 'dinoTypingStats';

let currentLevel = 1;
let currentSentenceIndex = 0;
let activeGrade = 'grade3';
let activeLevelSentences = [];
let charIndex = 0;
let errors = 0;
let totalTyped = 0;
let startTime = null;
let pausedAt = null;
let totalPausedMs = 0;
let gamePaused = false;
let gameActive = false;
let practiceDrillMode = false;
let missedWords = new Set();
let lastMissedWords = [];

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
const pauseScreen = document.getElementById('pause-screen');
const victoryScreen = document.getElementById('victory-screen');
const gradeSelect = document.getElementById('grade-select');
const bestStatsBanner = document.getElementById('best-stats-banner');
const dinoPracticeContainer = document.getElementById('dino-practice-container');
const practiceMissedBtn = document.getElementById('practice-missed-btn');
const finalWpmVal = document.getElementById('final-wpm-val');
const finalAccVal = document.getElementById('final-acc-val');
const newRecordBadge = document.getElementById('new-record-badge');

// --- Cheerful Procedural Chiptune BGM (via shared/audio.js) ---
const DINO_TRACKS = {
    main: {
        bpm: 125,
        leadWave: 'triangle',
        bassWave: 'sine',
        leadVol: 0.035,
        bassVol: 0.045,
        drums: false,
        lead: [
            'C5', null, 'E5', 'G5', 'A5', null, 'G5', 'E5',
            'F5', null, 'D5', null, 'E5', 'C5', 'G4', null,
            'C5', null, 'E5', 'G5', 'A5', 'G5', 'E5', 'D5',
            'C5', null, 'G4', 'A4', 'C5', null, null, null
        ],
        bass: [
            'C3', 'G3', 'C3', 'G3', 'F3', 'C3', 'C3', 'G3',
            'F3', 'C3', 'G3', 'D3', 'C3', 'G3', 'C3', null,
            'C3', 'G3', 'C3', 'G3', 'F3', 'C3', 'G3', 'D3',
            'C3', 'G3', 'F3', 'G3', 'C3', null, null, null
        ]
    }
};

class SoundManager extends window.ArcadeAudio.BaseSoundManager {
    constructor() {
        super(DINO_TRACKS, 'main');
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
        window.ArcadeAudio.speakText(text, {
            enabled: this.voiceEnabled,
            force,
            rate: 0.92,
            pitch: 1.05
        });
    }

    playType() {
        this.playClick();
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
    const gradePool = GRADE_SENTENCES[activeGrade] || SENTENCES_POOL;
    const pool = [...(gradePool[level] || gradePool[1])];
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, SENTENCES_PER_LEVEL);
}

function applyDinoHat() {
    const hatEl = document.getElementById('dino-hat');
    if (!hatEl || !window.ArcadeProfile) return;
    const hatMap = { dino_cap: '🧢', dino_crown: '👑', dino_astro: '👩‍🚀' };
    const equipped = window.ArcadeProfile.loadProfile().equipped.dino;
    hatEl.innerText = hatMap[equipped] || '';
}

function startGame(drillWords = null) {
    sounds.init();
    if (sounds.playGameStart) sounds.playGameStart('roar');
    applyDinoHat();
    practiceDrillMode = Array.isArray(drillWords) && drillWords.length > 0;
    activeGrade = gradeSelect ? gradeSelect.value : 'grade3';
    currentLevel = 1;
    currentSentenceIndex = 0;
    errors = 0;
    totalTyped = 0;
    startTime = null;
    pausedAt = null;
    totalPausedMs = 0;
    gamePaused = false;
    gameActive = true;
    missedWords = new Set();

    wpmVal.innerText = '0';
    accuracyVal.innerText = '100';
    startScreen.classList.remove('active');
    pauseScreen.classList.remove('active');
    victoryScreen.classList.remove('active');

    if (practiceDrillMode) {
        const chunks = [];
        for (let i = 0; i < drillWords.length; i += 4) {
            chunks.push(drillWords.slice(i, i + 4).join(' '));
        }
        activeLevelSentences = chunks;
    } else {
        activeLevelSentences = pickLevelSentences(currentLevel);
    }
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

function togglePause() {
    if (!gameActive) return;
    gamePaused = !gamePaused;

    if (gamePaused) {
        pausedAt = Date.now();
        sounds.stopSpeech();
        sounds.bgmController.stop();
        pauseScreen.classList.add('active');
    } else {
        if (pausedAt) {
            totalPausedMs += Date.now() - pausedAt;
            pausedAt = null;
        }
        pauseScreen.classList.remove('active');
        if (sounds.bgmEnabled) {
            sounds.bgmController.start();
        }
    }
}

function returnToMenu() {
    gameActive = false;
    gamePaused = false;
    sounds.stopSpeech();
    sounds.bgmController.stop();
    pauseScreen.classList.remove('active');
    victoryScreen.classList.remove('active');
    updateBestBanner();
    startScreen.classList.add('active');
}

function handleKeyPress(e) {
    if (!gameActive) return;
    if (e.key === 'Escape') {
        e.preventDefault();
        togglePause();
        return;
    }
    if (gamePaused) return;
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
        recordMissedWordAt(targetSentence, charIndex);
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
    const elapsedMin = Math.max((Date.now() - startTime - totalPausedMs) / 60000, 1 / 60);
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
    if (practiceDrillMode) {
        showVictory();
        return;
    }
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

function recordMissedWordAt(sentence, idx) {
    let start = idx;
    let end = idx;
    while (start > 0 && /[a-zA-Z'-]/.test(sentence[start - 1])) start--;
    while (end < sentence.length && /[a-zA-Z'-]/.test(sentence[end])) end++;
    const word = sentence.slice(start, end).toLowerCase().replace(/^['-]+|['-]+$/g, '');
    if (word.length >= 2) {
        missedWords.add(word);
    }
}

function renderPracticeSummary() {
    dinoPracticeContainer.innerHTML = '';
    const title = document.createElement('div');
    title.className = 'dino-practice-title';
    const pills = document.createElement('div');
    pills.className = 'dino-practice-pills';

    if (lastMissedWords.length === 0) {
        title.innerText = 'TYPING REPORT:';
        const pill = document.createElement('span');
        pill.className = 'dino-practice-pill flawless';
        pill.innerText = '✨ FLAWLESS! NO MISSED WORDS';
        pills.appendChild(pill);
    } else {
        title.innerText = 'WORDS TO PRACTICE (CLICK TO HEAR):';
        lastMissedWords.slice(0, 8).forEach(word => {
            const pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'dino-practice-pill';
            pill.innerText = `🔊 ${word}`;
            pill.addEventListener('click', () => sounds.speakSentence(word, true));
            pills.appendChild(pill);
        });
    }

    dinoPracticeContainer.appendChild(title);
    dinoPracticeContainer.appendChild(pills);
}

function showVictory() {
    gameActive = false;
    sounds.bgmController.stop();
    sounds.stopSpeech();
    sounds.playFanfare([523.25, 659.25, 783.99, 1046.5]);

    const finalWpm = getWpm();
    const finalAcc = getAccuracy();
    const isNewBest = practiceDrillMode ? false : saveBestStats(finalWpm, finalAcc);
    updateBestBanner();

    lastMissedWords = Array.from(missedWords);
    practiceMissedBtn.style.display = lastMissedWords.length > 0 ? 'inline-block' : 'none';

    if (window.ArcadeProfile && !practiceDrillMode) {
        window.ArcadeProfile.recordSession({
            gameId: 'dino',
            accuracy: finalAcc,
            score: finalWpm * 10,
            wpm: finalWpm,
            missedItems: lastMissedWords,
            badgeId: 'dino_explorer'
        });
    }

    finalWpmVal.innerText = finalWpm;
    finalAccVal.innerText = finalAcc;
    newRecordBadge.style.display = isNewBest ? 'block' : 'none';
    renderPracticeSummary();
    victoryScreen.classList.add('active');
}

// --- Event Listeners ---
window.addEventListener('keydown', handleKeyPress);
document.getElementById('start-btn').addEventListener('click', () => startGame());
document.getElementById('play-again-btn').addEventListener('click', () => startGame());
practiceMissedBtn.addEventListener('click', () => startGame(lastMissedWords));
document.getElementById('resume-btn').addEventListener('click', togglePause);
document.getElementById('pause-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('victory-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('hud-pause-btn').addEventListener('click', (e) => { togglePause(); e.currentTarget.blur(); });
document.getElementById('voice-toggle').addEventListener('click', () => sounds.toggleVoice());
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());
document.getElementById('display-container').addEventListener('click', () => {
    if (gameActive && activeLevelSentences[currentSentenceIndex]) {
        sounds.speakSentence(activeLevelSentences[currentSentenceIndex], true);
    }
});

updateBestBanner();
