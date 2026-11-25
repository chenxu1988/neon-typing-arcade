// Word Quest — LAUSD Grade 3+ ELA Scaffold & Question Bank (T3.4)
const QUEST_TRACKS = {
    main: {
        bpm: 128,
        leadWave: 'triangle',
        lead: [
            'G4', null, 'B4', 'D5', 'E5', null, 'D5', 'B4',
            'C5', null, 'E5', 'G5', 'Fs5', null, 'D5', null,
            'G4', null, 'B4', 'D5', 'G5', null, 'E5', 'C5',
            'D5', 'C5', 'B4', 'A4', 'G4', null, null, null
        ],
        bass: [
            'G2', 'G3', 'D3', 'G3', 'E2', 'E3', 'B2', 'E3',
            'C3', 'G3', 'C3', 'G3', 'D3', 'A3', 'D3', null,
            'G2', 'G3', 'D3', 'G3', 'C3', 'G3', 'C3', 'E3',
            'D3', 'A3', 'D3', 'Fs4', 'G2', null, null, null
        ]
    }
};

class QuestSoundManager extends window.ArcadeAudio.BaseSoundManager {
    constructor() {
        super(QUEST_TRACKS, 'main');
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

    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        const btn = document.getElementById('voice-toggle');
        btn.innerText = this.voiceEnabled ? '🗣️ Voice: On' : '🔇 Voice: Off';
        btn.classList.toggle('active', this.voiceEnabled);
        if (!this.voiceEnabled) this.stopSpeech();
        btn.blur();
    }
}

const sounds = new QuestSoundManager();

// Question bank loaded from db/word-quest-bank.js
const QUEST_BANK = window.ArcadeDB.wordQuestBank;

let totalPlanks = 10;

let gameActive = false;
let gamePaused = false;
let score = 0;
let builtPlanks = 0;
let relics = 0;
let streak = 0;
let totalAttempts = 0;
let wrongAttempts = 0;
let questQueue = [];
let currentQuestion = null;
let currentQuestionLocked = false;
let missedKeys = new Set();

const startScreen = document.getElementById('start-screen');
const pauseScreen = document.getElementById('pause-screen');
const endScreen = document.getElementById('end-screen');
const modeSelect = document.getElementById('mode-select');
const gradeSelect = document.getElementById('grade-select');
const bridgeTrack = document.getElementById('bridge-track');
const explorer = document.getElementById('explorer');
const qCategory = document.getElementById('q-category');
const qPrompt = document.getElementById('q-prompt');
const qChoices = document.getElementById('q-choices');
const qFeedback = document.getElementById('q-feedback');

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function buildQuestQueue(mode, grade) {
    const g = Number(grade);
    const strict = QUEST_BANK.filter(q => (mode === 'mixed' || q.mode === mode) && q.grade === g);
    const pool = shuffleArray(strict);
    const limit = Math.min(10, pool.length);
    totalPlanks = limit;
    return pool.slice(0, limit).map(q => ({ ...q, retried: false }));
}

function renderBridge() {
    bridgeTrack.innerHTML = '';
    bridgeTrack.style.gridTemplateColumns = `repeat(${totalPlanks}, 1fr)`;
    for (let i = 0; i < totalPlanks; i++) {
        const plank = document.createElement('div');
        plank.className = `bridge-plank${i < builtPlanks ? ' built' : ''}`;
        bridgeTrack.appendChild(plank);
    }
    const pct = totalPlanks > 0 ? (builtPlanks / totalPlanks) * 82 : 0;
    explorer.style.left = `calc(${pct}% + 20px)`;
}

function updateQuestHUD() {
    document.getElementById('score-val').innerText = score;
    document.getElementById('step-val').innerText = `${builtPlanks}/${totalPlanks}`;
    const acc = totalAttempts === 0 ? 100 : Math.max(0, Math.round(((totalAttempts - wrongAttempts) / totalAttempts) * 100));
    document.getElementById('acc-val').innerText = `${acc}%`;
    document.getElementById('relic-val').innerText = relics;
}

function updateQuestBanner() {
    const profile = window.ArcadeProfile ? window.ArcadeProfile.loadProfile() : { games: {} };
    const stats = profile.games.word_quest || { bestScore: 0, bestAcc: 0 };
    document.getElementById('quest-best-banner').innerText = `BEST: ${stats.bestScore} PTS | ${stats.bestAcc}% ACC`;
}

function loadNextQuestion() {
    if (!gameActive) return;
    if (builtPlanks >= totalPlanks || questQueue.length === 0) {
        finishQuest();
        return;
    }

    currentQuestion = questQueue.shift();
    currentQuestionLocked = false;
    qCategory.innerText = currentQuestion.retried ? `${currentQuestion.category} (RETRY)` : currentQuestion.category;
    qPrompt.innerText = currentQuestion.prompt;
    qFeedback.innerText = '';
    qChoices.innerHTML = '';

    const shuffledChoices = shuffleArray(currentQuestion.choices);
    shuffledChoices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-btn';
        btn.dataset.choice = choice;
        btn.innerText = `${idx + 1}. ${choice}`;
        btn.addEventListener('click', () => handleChoice(btn, choice));
        qChoices.appendChild(btn);
    });

    sounds.speak(currentQuestion.prompt);
}

function handleChoice(btn, choice) {
    if (!gameActive || gamePaused || currentQuestionLocked || !currentQuestion) return;
    currentQuestionLocked = true;
    totalAttempts++;

    const buttons = qChoices.querySelectorAll('.choice-btn');
    buttons.forEach(b => { b.disabled = true; });

    if (choice === currentQuestion.answer) {
        btn.classList.add('correct');
        sounds.playSuccess();
        builtPlanks++;
        streak++;
        let earned = currentQuestion.retried ? 50 : 100;
        let relicNote = '';
        if (streak > 0 && streak % 3 === 0) {
            relics++;
            earned += 50;
            relicNote = ' 🏺 +1 RELIC (+50)!';
        }
        score += earned;
        qFeedback.innerText = `✅ Correct! ${currentQuestion.explain}${relicNote}`;
        renderBridge();
        updateQuestHUD();
        setTimeout(loadNextQuestion, 1100);
    } else {
        btn.classList.add('wrong');
        buttons.forEach(b => {
            if (b.dataset.choice === currentQuestion.answer) b.classList.add('correct');
        });
        sounds.playError();
        wrongAttempts++;
        streak = 0;
        missedKeys.add(currentQuestion.key);
        qFeedback.innerText = `❌ ${currentQuestion.explain}`;
        updateQuestHUD();

        // Spaced-repetition retry: re-insert 2 questions later if not already retried
        if (!currentQuestion.retried) {
            const insertAt = Math.min(2, questQueue.length);
            questQueue.splice(insertAt, 0, { ...currentQuestion, retried: true });
        }
        setTimeout(loadNextQuestion, 1750);
    }
}

function applyExplorerAvatar() {
    if (!window.ArcadeProfile) return;
    const map = { exp_wizard: '🧙', exp_knight: '🛡️' };
    const eq = window.ArcadeProfile.loadProfile().equipped.explorer;
    explorer.innerText = map[eq] || '🧭';
}

function startGame() {
    sounds.init();
    applyExplorerAvatar();
    score = 0;
    builtPlanks = 0;
    relics = 0;
    streak = 0;
    totalAttempts = 0;
    wrongAttempts = 0;
    missedKeys = new Set();
    questQueue = buildQuestQueue(modeSelect.value, gradeSelect.value);
    gameActive = true;
    gamePaused = false;

    startScreen.classList.remove('active');
    pauseScreen.classList.remove('active');
    endScreen.classList.remove('active');
    renderBridge();
    updateQuestHUD();
    loadNextQuestion();
    if (sounds.bgmEnabled) sounds.bgmController.start();
}

function togglePause() {
    if (!gameActive) return;
    gamePaused = !gamePaused;
    if (gamePaused) {
        sounds.stopSpeech();
        sounds.bgmController.stop();
        pauseScreen.classList.add('active');
    } else {
        pauseScreen.classList.remove('active');
        if (sounds.bgmEnabled) sounds.bgmController.start();
    }
}

function finishQuest() {
    gameActive = false;
    sounds.stopSpeech();
    sounds.bgmController.stop();
    sounds.playFanfare([523.25, 659.25, 783.99, 1046.5]);

    const acc = totalAttempts === 0 ? 100 : Math.max(0, Math.round(((totalAttempts - wrongAttempts) / totalAttempts) * 100));
    let isNewBest = false;
    if (window.ArcadeProfile) {
        const prev = window.ArcadeProfile.loadProfile().games.word_quest;
        isNewBest = score > (prev ? prev.bestScore : 0) && score > 0;
        window.ArcadeProfile.recordSession({
            gameId: 'word_quest',
            accuracy: acc,
            score,
            wpm: 0,
            missedItems: Array.from(missedKeys),
            badgeId: 'word_wizard'
        });
    }

    document.getElementById('new-record-badge').style.display = isNewBest ? 'block' : 'none';
    document.getElementById('final-score-val').innerText = score;
    document.getElementById('final-acc-val').innerText = `${acc}%`;
    document.getElementById('final-relic-val').innerText = relics;

    const review = document.getElementById('missed-review');
    review.innerHTML = '';
    if (missedKeys.size === 0) {
        review.innerHTML = '<span class="missed-pill" style="border-color:#4caf50;background:rgba(76,175,80,0.2)">✨ Flawless Quest!</span>';
    } else {
        Array.from(missedKeys).slice(0, 8).forEach(k => {
            const pill = document.createElement('span');
            pill.className = 'missed-pill';
            pill.innerText = k;
            review.appendChild(pill);
        });
    }

    endScreen.classList.add('active');
}

function returnToMenu() {
    gameActive = false;
    gamePaused = false;
    sounds.stopSpeech();
    sounds.bgmController.stop();
    pauseScreen.classList.remove('active');
    endScreen.classList.remove('active');
    updateQuestBanner();
    startScreen.classList.add('active');
}

window.addEventListener('keydown', e => {
    if (!gameActive) return;
    if (e.key === 'Escape') {
        e.preventDefault();
        togglePause();
        return;
    }
    if (gamePaused || currentQuestionLocked) return;
    if (/^[1-4]$/.test(e.key)) {
        const idx = Number(e.key) - 1;
        const btns = qChoices.querySelectorAll('.choice-btn');
        if (btns[idx]) btns[idx].click();
    }
});

qPrompt.addEventListener('click', () => {
    if (gameActive && currentQuestion) sounds.speak(currentQuestion.prompt, true);
});
document.getElementById('resume-btn').addEventListener('click', togglePause);
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
document.getElementById('pause-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('end-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('voice-toggle').addEventListener('click', () => sounds.toggleVoice());
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());

updateQuestBanner();
