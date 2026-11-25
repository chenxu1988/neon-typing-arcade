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

let gameActive = false;
let gamePaused = false;
let score = 0;

const startScreen = document.getElementById('start-screen');
const pauseScreen = document.getElementById('pause-screen');
const endScreen = document.getElementById('end-screen');
const modeSelect = document.getElementById('mode-select');
const gradeSelect = document.getElementById('grade-select');

function updateQuestBanner() {
    const profile = window.ArcadeProfile ? window.ArcadeProfile.loadProfile() : { games: {} };
    const stats = profile.games.word_quest || { bestScore: 0, bestAcc: 0 };
    document.getElementById('quest-best-banner').innerText = `BEST: ${stats.bestScore} PTS | ${stats.bestAcc}% ACC`;
}

function startGame() {
    sounds.init();
    score = 0;
    gameActive = true;
    gamePaused = false;
    startScreen.classList.remove('active');
    pauseScreen.classList.remove('active');
    endScreen.classList.remove('active');
    if (sounds.bgmEnabled) sounds.bgmController.start();
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

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
document.getElementById('pause-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('end-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('voice-toggle').addEventListener('click', () => sounds.toggleVoice());
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());

updateQuestBanner();
