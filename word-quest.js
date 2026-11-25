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
    { grade: 5, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'mislead', prompt: 'What does the prefix "mis-" mean in "mislead"?', choices: ['Wrongly', 'Together', 'Halfway', 'Upward'], answer: 'Wrongly', explain: '"Mis-" means wrongly or badly.' },

    // Additional Grade 3-5 Context Clues
    { grade: 3, mode: 'context', category: 'CONTEXT CLUES', key: 'generous', prompt: 'Sara was generous and shared half of her strawberries with her friend. What does "generous" mean?', choices: ['Willing to share', 'Selfish', 'Forgetful', 'Noisy'], answer: 'Willing to share', explain: 'Sharing her snack shows Sara is generous.' },
    { grade: 3, mode: 'context', category: 'CONTEXT CLUES', key: 'fragile', prompt: 'Handle the fragile glass vase with both hands so it does not crack. What does "fragile" mean?', choices: ['Easily broken', 'Very heavy', 'Made of steel', 'Waterproof'], answer: 'Easily broken', explain: 'Warning that it could crack shows fragile means easily broken.' },
    { grade: 3, mode: 'context', category: 'CONTEXT CLUES', key: 'eager', prompt: 'The puppy wagged its tail, eager to chase the red ball. What does "eager" mean?', choices: ['Excited and ready', 'Afraid', 'Sleepy', 'Bored'], answer: 'Excited and ready', explain: 'Wagging its tail shows the puppy is excited and ready.' },
    { grade: 4, mode: 'context', category: 'CONTEXT CLUES', key: 'abundant', prompt: 'Apples were abundant in the orchard, filling every basket to the top. What does "abundant" mean?', choices: ['More than enough', 'Missing', 'Rotten', 'Tiny'], answer: 'More than enough', explain: 'Filling every basket shows there were plenty of apples.' },
    { grade: 4, mode: 'context', category: 'CONTEXT CLUES', key: 'diligent', prompt: 'Because Marco was diligent and practiced every day, he mastered the piano piece. What does "diligent" mean?', choices: ['Hardworking and steady', 'Lazy', 'Lucky', 'Careless'], answer: 'Hardworking and steady', explain: 'Practicing every day shows Marco was hardworking.' },
    { grade: 4, mode: 'context', category: 'CONTEXT CLUES', key: 'vivid', prompt: 'The artist painted a vivid sunset with bright orange, pink, and gold. What does "vivid" mean?', choices: ['Bright and clear', 'Dull and gray', 'Blurry', 'Dark'], answer: 'Bright and clear', explain: 'Bright orange, pink, and gold describe vivid colors.' },
    { grade: 5, mode: 'context', category: 'CONTEXT CLUES', key: 'ambiguous', prompt: 'The treasure map’s directions were ambiguous, leaving two different paths to guess. What does "ambiguous" mean?', choices: ['Unclear with multiple meanings', 'Crystal clear', 'Drawn in ink', 'Short'], answer: 'Unclear with multiple meanings', explain: 'Leaving two possible paths shows the map was unclear.' },
    { grade: 5, mode: 'context', category: 'CONTEXT CLUES', key: 'collaborate', prompt: 'The two classes will collaborate to plant a school vegetable garden. What does "collaborate" mean?', choices: ['Work together', 'Compete', 'Argue', 'Watch'], answer: 'Work together', explain: 'Two classes planting one garden means working together.' },
    { grade: 5, mode: 'context', category: 'CONTEXT CLUES', key: 'conserve', prompt: 'Turning off the faucet while brushing helps conserve fresh water. What does "conserve" mean?', choices: ['Save and protect', 'Waste', 'Freeze', 'Pollute'], answer: 'Save and protect', explain: 'Turning off the tap saves water for the future.' },

    // Additional Synonyms & Antonyms
    { grade: 3, mode: 'synonyms', category: 'SYNONYMS', key: 'rapid', prompt: 'Which word is a SYNONYM for "swift"?', choices: ['Fast', 'Slow', 'Heavy', 'Soft'], answer: 'Fast', explain: 'Swift and fast both mean moving quickly.' },
    { grade: 3, mode: 'synonyms', category: 'ANTONYMS', key: 'polite', prompt: 'Which word is an ANTONYM of "polite"?', choices: ['Rude', 'Kind', 'Helpful', 'Gentle'], answer: 'Rude', explain: 'Polite and rude are opposites.' },
    { grade: 3, mode: 'synonyms', category: 'SYNONYMS', key: 'assist', prompt: 'Which word is a SYNONYM for "assist"?', choices: ['Help', 'Block', 'Ignore', 'Hide'], answer: 'Help', explain: 'To assist someone means to help them.' },
    { grade: 4, mode: 'synonyms', category: 'ANTONYMS', key: 'temporary', prompt: 'Which word is an ANTONYM of "permanent"?', choices: ['Temporary', 'Lasting', 'Forever', 'Solid'], answer: 'Temporary', explain: 'Permanent lasts forever; temporary lasts a short time.' },
    { grade: 4, mode: 'synonyms', category: 'SYNONYMS', key: 'peculiar', prompt: 'Which word is a SYNONYM for "unusual"?', choices: ['Peculiar', 'Common', 'Normal', 'Plain'], answer: 'Peculiar', explain: 'Peculiar and unusual both mean out of the ordinary.' },
    { grade: 4, mode: 'synonyms', category: 'ANTONYMS', key: 'confident', prompt: 'Which word is an ANTONYM of "timid"?', choices: ['Bold', 'Shy', 'Nervous', 'Quiet'], answer: 'Bold', explain: 'Timid means shy; bold means confident and brave.' },
    { grade: 5, mode: 'synonyms', category: 'SYNONYMS', key: 'comprehend', prompt: 'Which word is a SYNONYM for "comprehend"?', choices: ['Understand', 'Forget', 'Confuse', 'Refuse'], answer: 'Understand', explain: 'To comprehend something is to understand it.' },
    { grade: 5, mode: 'synonyms', category: 'ANTONYMS', key: 'conceal', prompt: 'Which word is an ANTONYM of "conceal"?', choices: ['Reveal', 'Hide', 'Cover', 'Bury'], answer: 'Reveal', explain: 'Conceal means hide; reveal means show.' },
    { grade: 5, mode: 'synonyms', category: 'SYNONYMS', key: 'beneficial', prompt: 'Which word is a SYNONYM for "beneficial"?', choices: ['Helpful', 'Harmful', 'Useless', 'Dangerous'], answer: 'Helpful', explain: 'Beneficial means helpful or good for you.' },

    // Additional Parts of Speech
    { grade: 3, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'noun', prompt: 'In "The library has thousands of books", what part of speech is "library"?', choices: ['Noun', 'Verb', 'Adjective', 'Adverb'], answer: 'Noun', explain: '"Library" is a place, so it is a noun.' },
    { grade: 3, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'verb', prompt: 'In "Dolphins leap above the ocean waves", what part of speech is "leap"?', choices: ['Verb', 'Noun', 'Adjective', 'Pronoun'], answer: 'Verb', explain: '"Leap" is the action the dolphins do.' },
    { grade: 3, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'adjective', prompt: 'In "We saw three bright stars tonight", what part of speech is "bright"?', choices: ['Adjective', 'Verb', 'Noun', 'Preposition'], answer: 'Adjective', explain: '"Bright" describes the noun "stars".' },
    { grade: 4, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'adverb', prompt: 'In "The turtle walked slowly toward the pond", what is "slowly"?', choices: ['Adverb', 'Adjective', 'Noun', 'Pronoun'], answer: 'Adverb', explain: '"Slowly" describes how the turtle walked.' },
    { grade: 4, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'preposition', prompt: 'In "My backpack is beside the desk", what part of speech is "beside"?', choices: ['Preposition', 'Verb', 'Adjective', 'Conjunction'], answer: 'Preposition', explain: '"Beside" shows location relative to the desk.' },
    { grade: 4, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'pronoun', prompt: 'In "She handed the notebook to him", what part of speech is "She"?', choices: ['Pronoun', 'Noun', 'Verb', 'Adverb'], answer: 'Pronoun', explain: '"She" takes the place of a person’s name.' },
    { grade: 5, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'conjunction', prompt: 'In "I wanted to skate, yet it started raining", what is "yet"?', choices: ['Conjunction', 'Preposition', 'Adverb', 'Interjection'], answer: 'Conjunction', explain: '"Yet" is a coordinating conjunction joining two sentences.' },
    { grade: 5, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'interjection', prompt: 'In "Whoa! Look at that glowing meteor!", what part of speech is "Whoa"?', choices: ['Interjection', 'Conjunction', 'Adjective', 'Preposition'], answer: 'Interjection', explain: '"Whoa!" expresses sudden excitement or surprise.' },
    { grade: 5, mode: 'grammar', category: 'PARTS OF SPEECH', key: 'proper noun', prompt: 'In "We visited Sacramento last summer", what type of noun is "Sacramento"?', choices: ['Proper noun', 'Pronoun', 'Adjective', 'Verb'], answer: 'Proper noun', explain: 'A specific city name is a capitalized proper noun.' },

    // Additional Prefixes & Suffixes
    { grade: 3, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'joyful', prompt: 'What does the suffix "-ful" mean in "joyful"?', choices: ['Full of', 'Without', 'Before', 'Again'], answer: 'Full of', explain: '"-ful" means full of, so joyful means full of joy.' },
    { grade: 3, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'disagree', prompt: 'What does the prefix "dis-" mean in "disagree"?', choices: ['Not or opposite of', 'Again', 'Before', 'Together'], answer: 'Not or opposite of', explain: '"Dis-" means not or opposite, so disagree means not agree.' },
    { grade: 3, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'painter', prompt: 'What does the suffix "-er" mean in "painter"?', choices: ['One who does', 'Full of', 'Without', 'Past time'], answer: 'One who does', explain: 'A painter is one who paints.' },
    { grade: 4, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'bicycle', prompt: 'What does the prefix "bi-" mean in "bicycle"?', choices: ['Two', 'Three', 'One', 'Half'], answer: 'Two', explain: '"Bi-" means two; a bicycle has two wheels.' },
    { grade: 4, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'triangle', prompt: 'What does the prefix "tri-" mean in "triangle"?', choices: ['Three', 'Two', 'Four', 'Ten'], answer: 'Three', explain: '"Tri-" means three; a triangle has three sides.' },
    { grade: 4, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'submarine', prompt: 'What does the prefix "sub-" mean in "submarine"?', choices: ['Under', 'Above', 'Across', 'Between'], answer: 'Under', explain: '"Sub-" means under; a submarine travels under water.' },
    { grade: 5, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'biography', prompt: 'What does the root "bio-" mean in "biography"?', choices: ['Life', 'Earth', 'Water', 'Light'], answer: 'Life', explain: '"Bio-" means life; a biography is a story of someone’s life.' },
    { grade: 5, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'telescope', prompt: 'What does the root "tele-" mean in "telescope"?', choices: ['Far away', 'Small', 'Fast', 'Round'], answer: 'Far away', explain: '"Tele-" means far away (seeing things far away).' },
    { grade: 5, mode: 'affixes', category: 'PREFIXES & SUFFIXES', key: 'chronology', prompt: 'What does the root "chron-" mean in "chronology"?', choices: ['Time', 'Color', 'Sound', 'Stone'], answer: 'Time', explain: '"Chron-" means time; chronology orders events by time.' }
];

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
