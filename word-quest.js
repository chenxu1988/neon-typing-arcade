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

const QUEST_BANK = [
    // Context Clues (Grades 3-5)
    { grade: 3, mode: 'context', category: 'CONTEXT CLUES', key: 'enormous', prompt: 'The enormous elephant shook the ground as it walked. What does "enormous" mean?', choices: ['Very huge', 'Tiny and quiet', 'Fast swimmer', 'Bright yellow'], answer: 'Very huge', explain: 'Shaking the ground gives a clue that enormous means very huge.' },
    { grade: 3, mode: 'context', category: 'CONTEXT CLUES', key: 'cautious', prompt: 'Mia was cautious when crossing the icy bridge. What does "cautious" mean?', choices: ['Careful', 'Sleepy', 'Angry', 'Silly'], answer: 'Careful', explain: 'An icy bridge requires moving slowly and carefully.' },
    { grade: 3, mode: 'context', category: 'CONTEXT CLUES', key: 'famished', prompt: 'After hiking all morning without lunch, Leo felt famished. What does "famished" mean?', choices: ['Very hungry', 'Very cold', 'Super excited', 'Ready to sleep'], answer: 'Very hungry', explain: 'Hiking without lunch makes someone very hungry.' },
    { grade: 4, mode: 'context', category: 'CONTEXT CLUES', key: 'scarce', prompt: 'Water is scarce in the dry desert, so plants store every drop. What does "scarce" mean?', choices: ['Hard to find', 'Overflowing', 'Frozen solid', 'Bright blue'], answer: 'Hard to find', explain: 'In a dry desert, water is rare and hard to find.' },
    { grade: 4, mode: 'context', category: 'CONTEXT CLUES', key: 'peculiar', prompt: 'The scientist noticed a peculiar glow coming from the cave. What does "peculiar" mean?', choices: ['Strange or unusual', 'Ordinary', 'Invisible', 'Loud'], answer: 'Strange or unusual', explain: 'A mysterious glow in a cave is unusual or peculiar.' },
    { grade: 5, mode: 'context', category: 'CONTEXT CLUES', key: 'resilient', prompt: 'Even after the storm knocked down branches, the resilient tree bloomed again. What does "resilient" mean?', choices: ['Able to recover quickly', 'Easily broken', 'Ancient', 'Rootless'], answer: 'Able to recover quickly', explain: 'Blooming again after storm damage shows recovery and strength.' },
    { grade: 5, mode: 'context', category: 'CONTEXT CLUES', key: 'consensus', prompt: 'After debating for an hour, the class reached a consensus on the field trip. What does "consensus" mean?', choices: ['General agreement', 'Loud argument', 'Secret vote', 'Sudden cancel'], answer: 'General agreement', explain: 'Debating until everyone agrees leads to a consensus.' },

    // Synonyms & Antonyms
    { grade: 3, mode: 'synonyms', category: 'SYNONYMS', key: 'happy', prompt: 'Which word is a SYNONYM (same meaning) for "joyful"?', choices: ['Cheerful', 'Gloomy', 'Tired', 'Quiet'], answer: 'Cheerful', explain: 'Joyful and cheerful both mean happy.' },
    { grade: 3, mode: 'synonyms', category: 'ANTONYMS', key: 'ancient', prompt: 'Which word is an ANTONYM (opposite) of "ancient"?', choices: ['Modern', 'Old', 'Dusty', 'Broken'], answer: 'Modern', explain: 'Ancient means very old; modern means new.' },
    { grade: 4, mode: 'synonyms', category: 'SYNONYMS', key: 'brave', prompt: 'Which word is a SYNONYM for "courageous"?', choices: ['Brave', 'Fearful', 'Greedy', 'Careless'], answer: 'Brave', explain: 'Courageous and brave share the same meaning.' },
    { grade: 4, mode: 'synonyms', category: 'ANTONYMS', key: 'expand', prompt: 'Which word is an ANTONYM of "expand"?', choices: ['Shrink', 'Stretch', 'Multiply', 'Grow'], answer: 'Shrink', explain: 'Expand means get bigger; shrink means get smaller.' },
    { grade: 5, mode: 'synonyms', category: 'SYNONYMS', key: 'authentic', prompt: 'Which word is a SYNONYM for "authentic"?', choices: ['Genuine', 'Fake', 'Fragile', 'Boring'], answer: 'Genuine', explain: 'Authentic and genuine both mean real and original.' },
    { grade: 5, mode: 'synonyms', category: 'ANTONYMS', key: 'scarce', prompt: 'Which word is an ANTONYM of "abundant"?', choices: ['Scarce', 'Plentiful', 'Generous', 'Wealthy'], answer: 'Scarce', explain: 'Abundant means plenty; scarce means very little.' },

    // Parts of Speech
    { grade: 3, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'verb', prompt: 'In "The rocket zoomed across the sky", what part of speech is "zoomed"?', choices: ['Verb', 'Noun', 'Adjective', 'Pronoun'], answer: 'Verb', explain: '"Zoomed" shows action, so it is a verb.' },
    { grade: 3, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'adjective', prompt: 'In "A fluffy kitten slept on the rug", what part of speech is "fluffy"?', choices: ['Adjective', 'Verb', 'Noun', 'Adverb'], answer: 'Adjective', explain: '"Fluffy" describes the noun "kitten", so it is an adjective.' },
    { grade: 4, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'adverb', prompt: 'In "She solved the puzzle quickly", what part of speech is "quickly"?', choices: ['Adverb', 'Adjective', 'Noun', 'Preposition'], answer: 'Adverb', explain: '"Quickly" tells how she solved it, modifying the verb.' },
    { grade: 4, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'pronoun', prompt: 'In "They built a sturdy bridge together", what part of speech is "They"?', choices: ['Pronoun', 'Noun', 'Verb', 'Conjunction'], answer: 'Pronoun', explain: '"They" replaces a group of names, making it a pronoun.' },
    { grade: 5, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'conjunction', prompt: 'In "We packed flashlights because the cave was dark", what is "because"?', choices: ['Conjunction', 'Adjective', 'Interjection', 'Pronoun'], answer: 'Conjunction', explain: '"Because" connects two clauses, acting as a conjunction.' },
    { grade: 5, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'preposition', prompt: 'In "The owl perched beneath the branches", what part of speech is "beneath"?', choices: ['Preposition', 'Verb', 'Adverb', 'Noun'], answer: 'Preposition', explain: '"Beneath" shows position/location relative to the branches.' },

    // Prefixes & Suffixes
    { grade: 3, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'unhappy', prompt: 'What does the prefix "un-" do to the word "happy" in "unhappy"?', choices: ['Means "not"', 'Means "again"', 'Means "before"', 'Means "full of"'], answer: 'Means "not"', explain: '"Un-" means "not", so unhappy means not happy.' },
    { grade: 3, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'rebuild', prompt: 'What does "rebuild" mean?', choices: ['Build again', 'Build wrong', 'Never build', 'Build slowly'], answer: 'Build again', explain: 'The prefix "re-" means "again".' },
    { grade: 4, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'fearless', prompt: 'What does the suffix "-less" mean in "fearless"?', choices: ['Without', 'Full of', 'Before', 'Able to'], answer: 'Without', explain: '"-less" means without, so fearless means without fear.' },
    { grade: 4, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'preview', prompt: 'What does the prefix "pre-" mean in "preview"?', choices: ['Before', 'After', 'Not', 'Under'], answer: 'Before', explain: '"Pre-" means before; a preview is a look before.' },
    { grade: 5, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'portable', prompt: 'What does the suffix "-able" mean in "portable"?', choices: ['Able to be', 'Opposite of', 'One who does', 'Without'], answer: 'Able to be', explain: '"-able" means able to be (able to be carried).' },
    { grade: 5, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'mislead', prompt: 'What does the prefix "mis-" mean in "mislead"?', choices: ['Wrongly', 'Together', 'Halfway', 'Upward'], answer: 'Wrongly', explain: '"Mis-" means wrongly or badly.' }
];

const TOTAL_PLANKS = 10;

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
    const primary = QUEST_BANK.filter(q => (mode === 'mixed' || q.mode === mode) && q.grade === g);
    const sameMode = QUEST_BANK.filter(q => (mode === 'mixed' || q.mode === mode) && q.grade !== g);
    const pool = [...shuffleArray(primary), ...shuffleArray(sameMode), ...shuffleArray(QUEST_BANK)];
    const picked = [];
    const seen = new Set();
    for (const q of pool) {
        if (picked.length >= TOTAL_PLANKS) break;
        if (!seen.has(q.prompt)) {
            seen.add(q.prompt);
            picked.push({ ...q, retried: false });
        }
    }
    return picked;
}

function renderBridge() {
    bridgeTrack.innerHTML = '';
    for (let i = 0; i < TOTAL_PLANKS; i++) {
        const plank = document.createElement('div');
        plank.className = `bridge-plank${i < builtPlanks ? ' built' : ''}`;
        bridgeTrack.appendChild(plank);
    }
    const pct = (builtPlanks / TOTAL_PLANKS) * 82;
    explorer.style.left = `calc(${pct}% + 20px)`;
}

function updateQuestHUD() {
    document.getElementById('score-val').innerText = score;
    document.getElementById('step-val').innerText = builtPlanks;
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
    if (builtPlanks >= TOTAL_PLANKS || questQueue.length === 0) {
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

function startGame() {
    sounds.init();
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
