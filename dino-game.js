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

const GRADE_SENTENCES = {
    grade3: SENTENCES_POOL,
    grade4: {
        1: [
            "Plants use sunlight to make their own food.",
            "Every magnet has a north pole and a south pole.",
            "Water freezes into ice when it gets very cold.",
            "A habitat gives animals food, water, and shelter.",
            "Frogs begin their lives as tiny tadpoles.",
            "Roots pull water from the soil into the stem."
        ],
        2: [
            "Producers, consumers, and decomposers form an ecosystem.",
            "Erosion slowly shapes valleys, canyons, and coastlines.",
            "Camouflage helps creatures blend into their surroundings.",
            "A simple circuit needs a battery, wires, and a bulb.",
            "Sound travels in waves through air, water, and solids.",
            "Clouds form when warm water vapor cools in the sky."
        ],
        3: [
            "Metamorphic rocks change deep underground from heat and pressure.",
            "Pollinators like bees carry pollen from flower to flower.",
            "Solar panels convert bright sunlight into clean electricity.",
            "Herbivores eat plants, while carnivores eat other animals.",
            "Earthquakes happen when tectonic plates suddenly shift.",
            "Friction slows down moving objects when surfaces rub together."
        ],
        4: [
            "Adaptations allow desert cactuses to store water for dry months.",
            "Fossil fuels formed over millions of years from ancient organisms.",
            "Gravity keeps the moon orbiting smoothly around planet Earth.",
            "Evaporation, condensation, and precipitation drive the water cycle.",
            "Wetlands filter pollution and protect towns from heavy floods.",
            "Optic nerves send light signals from our eyes to the brain."
        ],
        5: [
            "Biologists classify living things by their shared traits and behaviors.",
            "Renewable wind turbines generate power without burning fossil fuels.",
            "Weathering breaks large boulders into smaller pebbles and sand.",
            "Migration helps birds travel thousands of miles to warmer climates.",
            "Earth's tilted axis creates spring, summer, autumn, and winter.",
            "Every species plays an important role in keeping nature balanced."
        ]
    },
    grade5: {
        1: [
            "Primary sources include diaries, letters, and artifacts.",
            "Astronomers use powerful telescopes to study distant galaxies.",
            "A compass needle points north using Earth's magnetic field.",
            "The thirteen colonies grew along the Atlantic coast.",
            "Mars has iron-rich dust that makes it look red.",
            "Maps use scale bars and legends to show real distances."
        ],
        2: [
            "The Constitution divides government into three equal branches.",
            "Mercury, Venus, Earth, and Mars are rocky inner planets.",
            "Explorers used astrolabes and stars to navigate open oceans.",
            "Congress writes laws, while courts interpret what they mean.",
            "Jupiter is the largest planet in our entire solar system.",
            "Trade routes connected distant cities across continents."
        ],
        3: [
            "The Bill of Rights protects freedom of speech and assembly.",
            "Photosynthesis turns carbon dioxide and water into sugar and oxygen.",
            "Pioneer families traveled westward in covered wagons along trails.",
            "Saturn's dazzling rings are made of ice crystals and rock.",
            "Inventions like the printing press spread ideas much faster.",
            "Citizens participate in democracy by voting and sharing ideas."
        ],
        4: [
            "The Declaration of Independence stated that all people have equal rights.",
            "Comets are icy travelers that grow bright tails near the sun.",
            "Archaeologists carefully excavate ancient ruins to learn about history.",
            "Chemical reactions combine atoms to create brand-new substances.",
            "The Industrial Revolution replaced hand tools with steam-powered machines.",
            "Satellite imagery helps meteorologists track hurricanes across oceans."
        ],
        5: [
            "Checking multiple credible sources helps historians verify important facts.",
            "Space probes have sent back close-up photos of icy moons and rings.",
            "The Preamble begins with the famous words: We the People.",
            "Gravity bends the paths of asteroids, moons, and spacecraft alike.",
            "Understanding chronology helps us see how past choices shape today.",
            "Curiosity and teamwork drive every great discovery in science and history."
        ]
    }
};

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

function startGame(drillWords = null) {
    sounds.init();
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
document.getElementById('voice-toggle').addEventListener('click', () => sounds.toggleVoice());
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());
document.getElementById('display-container').addEventListener('click', () => {
    if (gameActive && activeLevelSentences[currentSentenceIndex]) {
        sounds.speakSentence(activeLevelSentences[currentSentenceIndex], true);
    }
});

updateBestBanner();
