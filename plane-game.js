// --- Word Dictionaries ---
const scifiDictionary = [
    "laser", "plasma", "meteor", "proton", "cosmos", "orbit", "vector", "matrix", "shield", "warp",
    "photon", "comet", "beacon", "energy", "fusion", "quantum", "gravity", "nebula", "galaxy", "rocket",
    "stellar", "neutron", "asteroid", "engine", "signal", "module", "system", "thruster", "sensor", "core",
    "nanite", "hologram", "cyberspace", "android", "titanium", "velocity", "generator", "overdrive", "catalyst", "hyperdrive",
    "horizon", "vortex", "starlight", "pulsar", "singularity", "dimension", "telemetry", "spectrum", "satellite", "atmosphere",
    "alien", "aurora", "binary", "blaster", "capsule", "circuit", "cluster", "cockpit", "collider", "cryo",
    "cyber", "data", "deflector", "docking", "drone", "eclipse", "electron", "exosuit", "flux", "forcefield",
    "gamma", "grid", "hull", "hyperion", "ignition", "impulse", "ion", "jetpack", "kepler", "kinetic",
    "launch", "lightyear", "lunar", "magnet", "mars", "mech", "moonbeam", "nova", "observatory", "omega",
    "orbital", "oxygen", "parsec", "payload", "planet", "pod", "portal", "probe", "quasar", "radar",
    "radiation", "reactor", "robot", "rover", "scanner", "shuttle", "solar", "spacecraft", "starship", "supernova",
    "tachyon", "teleport", "terra", "titan", "trajectory", "turret", "universe", "uranium", "void", "wormhole",
    "xenon", "zenith", "zero"
];

const lausdGrade3 = [
    "friend", "school", "because", "before", "people", "would", "about", "could", "write", "glowing",
    "character", "sentence", "paragraph", "author", "chapter", "compare", "contrast", "describe", "explain", "detail",
    "fraction", "multiply", "divide", "explore", "energy", "matter", "source", "nature", "history", "culture",
    "opinion", "purpose", "influence", "reason", "support", "creature", "habitat", "protect", "observe", "discover",
    "answer", "around", "always", "animal", "basket", "beauty", "believe", "between", "blanket", "bright",
    "brother", "building", "butter", "camera", "candle", "careful", "carpet", "carry", "center", "change",
    "circle", "clever", "climate", "cloud", "collect", "colony", "common", "complete", "connect", "country",
    "courage", "create", "curious", "danger", "decide", "desert", "different", "dinner", "doctor", "dollar",
    "dragon", "dream", "earth", "effort", "either", "enough", "equal", "evening", "example", "except",
    "family", "famous", "favorite", "feather", "festival", "figure", "forest", "forever", "garden", "gentle",
    "giant", "golden", "govern", "grateful", "ground", "happen", "harbor", "harvest", "healthy", "helpful",
    "hidden", "holiday", "honest", "hundred", "hungry", "island", "journey", "jungle", "kitchen", "kitten",
    "listen", "little", "locate", "magnet", "market", "measure", "member", "memory", "message", "middle",
    "minute", "mirror", "moment", "monkey", "morning", "mountain", "museum", "music", "mystery", "nation",
    "nearby", "neither", "notice", "number", "ocean", "orange", "order", "outside", "parent", "pattern",
    "pencil", "perfect", "person", "picture", "planet", "please", "pocket", "polite", "practice", "present",
    "pretty", "problem", "project", "promise", "puzzle", "question", "quiet", "rabbit", "rainbow", "rather",
    "recall", "record", "reduce", "region", "remain", "remember", "repair", "repeat", "report", "rescue",
    "result", "return", "rhythm", "ribbon", "river", "safety", "science", "season", "second", "secret",
    "shadow", "shelter", "signal", "silver", "simple", "sister", "sketch", "smooth", "social", "solve",
    "special", "speech", "spiral", "spring", "square", "steady", "story", "strange", "stream", "street",
    "strong", "student", "study", "subject", "success", "sudden", "summer", "supply", "surface", "surprise",
    "symbol", "system", "tablet", "talent", "teacher", "thought", "through", "thunder", "ticket", "together",
    "toward", "travel", "treasure", "triangle", "trouble", "tunnel", "turtle", "umbrella", "uncle", "under",
    "useful", "valley", "value", "village", "visit", "voice", "volume", "voyage", "wander", "warmth",
    "weather", "welcome", "whisper", "window", "winter", "wisdom", "wonder", "yellow", "young", "zebra"
];

const lausdGrade4 = [
    "accident", "balance", "calmness", "daughter", "excitement", "frighten", "gather", "honest", "imagine", "journal",
    "boundary", "capture", "horizon", "constant", "telescope", "analyze", "conclude", "evidence", "inference", "summarize",
    "metaphor", "simile", "narrative", "dialogue", "adjective", "adverb", "pronoun", "preposition", "conjunction", "punctuation",
    "ecosystem", "producer", "consumer", "organism", "environment", "adaptation", "government", "constitution", "citizen", "heritage",
    "abundant", "accurate", "achieve", "adequate", "adventure", "affection", "altitude", "ancient", "announce", "anxiety",
    "apparent", "approach", "approval", "argument", "arrange", "article", "assemble", "atlantic", "attitude", "audience",
    "average", "awkward", "barrier", "behavior", "benefit", "biography", "blossom", "brilliant", "calendar", "campaign",
    "capacity", "category", "cautious", "celebrate", "century", "challenge", "champion", "chapter", "chemical", "civilian",
    "clarify", "classic", "climate", "collapse", "combine", "comfort", "command", "comment", "commerce", "community",
    "compass", "compete", "complex", "compose", "concept", "concern", "condense", "conflict", "confuse", "congress",
    "conquer", "consent", "consider", "construct", "contain", "context", "continue", "contract", "control", "convince",
    "cooperate", "coordinate", "correct", "courageous", "courtesy", "creative", "creature", "critical", "culture", "current",
    "custom", "cylinder", "decade", "declare", "decline", "decorate", "decrease", "defend", "definite", "delicate",
    "deliver", "demand", "democracy", "demonstrate", "depend", "deposit", "describe", "deserve", "design", "despair",
    "destroy", "determine", "develop", "diagram", "diameter", "dictate", "difficult", "digest", "dignity", "diligent",
    "dimension", "direct", "disaster", "discard", "discover", "discuss", "disease", "display", "distance", "distinct",
    "district", "diverse", "divide", "document", "domestic", "dominate", "dramatic", "drought", "durable", "eager",
    "economy", "edition", "educate", "effect", "efficient", "elaborate", "elastic", "election", "element", "elevate",
    "eliminate", "emerge", "emotion", "emphasis", "employ", "enable", "enclose", "encourage", "endure", "energy",
    "enforce", "engage", "engineer", "enormous", "ensure", "enter", "entire", "envelope", "equal", "equation",
    "equator", "equip", "erosion", "escape", "essential", "establish", "estimate", "evaluate", "eventual", "examine",
    "example", "exceed", "excellent", "exchange", "exclaim", "exclude", "excuse", "execute", "exercise", "exhaust",
    "exhibit", "exist", "expand", "expect", "expedition", "expense", "experience", "experiment", "expert", "explain",
    "explode", "explore", "export", "expose", "express", "extend", "external", "extinct", "extract", "extreme"
];

const lausdGrade5 = [
    "abolish", "abstract", "accomplish", "accumulate", "acknowledge", "acquire", "adaptable", "adequate", "adjacent", "advocate",
    "affluent", "aggravate", "allegory", "allocate", "alteration", "ambiguous", "ambition", "amendment", "amplify", "analogy",
    "ancestor", "anecdote", "antagonist", "anticipate", "apparent", "appreciate", "approximate", "arbitrary", "architect", "arrogant",
    "artifact", "articulate", "aspiration", "assimilate", "assumption", "astonish", "atmosphere", "attribute", "authentic", "authority",
    "autonomous", "barren", "beneficial", "benevolent", "bias", "boycott", "brevity", "brittle", "bureaucracy", "calculate",
    "campaign", "candidate", "capable", "capacity", "catalyst", "category", "chronicle", "chronology", "circulate", "citation",
    "clarify", "classify", "coalition", "coherent", "coincide", "collaborate", "collapse", "colleague", "colony", "commemorate",
    "commerce", "commission", "commodity", "compatible", "compel", "compensate", "competent", "compile", "complement", "complex",
    "component", "compose", "comprehend", "compromise", "conceal", "concede", "concentrate", "conception", "conclude", "concrete",
    "condense", "condition", "conduct", "confederate", "confer", "confident", "confine", "confirm", "conflict", "conform",
    "confront", "congress", "conscience", "conscious", "consensus", "consequence", "conserve", "considerable", "consistent", "consolidate",
    "conspicuous", "constant", "constitute", "construct", "consult", "consume", "contact", "contagious", "contain", "contaminate"
];

const WORD_DEFINITIONS = {
    // Sci-Fi
    laser: "A focused beam of bright light.",
    plasma: "Super-hot glowing gas made of charged particles.",
    meteor: "A space rock burning up as it enters Earth's sky.",
    orbit: "The curved path a planet or moon takes around something.",
    galaxy: "A huge group of billions of stars and planets.",
    gravity: "The invisible force that pulls objects toward each other.",
    nebula: "A giant colorful cloud of dust and gas in space.",
    quantum: "Relating to the tiniest packets of energy in physics.",
    velocity: "Speed in a specific direction.",
    telemetry: "Measuring and sending data from far away.",
    // Grade 3
    character: "A person, animal, or creature in a story.",
    compare: "To find ways two things are alike.",
    contrast: "To find ways two things are different.",
    describe: "To tell what something looks, sounds, or feels like.",
    fraction: "A part of a whole, like one half or three fourths.",
    habitat: "The natural home where a plant or animal lives.",
    opinion: "What someone thinks or believes about a topic.",
    observe: "To watch carefully to learn details.",
    courage: "Being brave even when something feels scary.",
    rhythm: "A steady beat or pattern in music or poetry.",
    // Grade 4
    analyze: "To study something closely by looking at its parts.",
    conclude: "To decide what something means after looking at clues.",
    evidence: "Facts or clues that prove something is true.",
    inference: "A smart guess based on clues and what you know.",
    summarize: "To retell the main points briefly in your own words.",
    metaphor: "Comparing two things directly without using 'like' or 'as'.",
    simile: "Comparing two things using 'like' or 'as'.",
    ecosystem: "Living things and their environment working together.",
    adaptation: "A trait that helps a living thing survive.",
    heritage: "Traditions and history passed down through families.",
    // Grade 5
    abolish: "To officially end a law, system, or practice.",
    acknowledge: "To admit or recognize that something is true.",
    advocate: "To speak up in support of a person or idea.",
    allegory: "A story with a hidden moral or deeper meaning.",
    ambiguous: "Unclear or able to be understood in more than one way.",
    amendment: "An official change or addition to a law or document.",
    analogy: "A comparison showing how two pairs of things are alike.",
    antagonist: "The character or force working against the hero.",
    anticipate: "To expect or prepare for something before it happens.",
    artifact: "An object made by humans in the past.",
    authentic: "Real, genuine, and not a copy.",
    beneficial: "Helpful or producing a good result.",
    boycott: "Refusing to buy or use something as a protest.",
    chronology: "Events arranged in the order they happened in time.",
    citation: "Giving credit to the source where you found information.",
    collaborate: "To work together with others toward a shared goal.",
    compromise: "When both sides give up a little to reach an agreement.",
    consequence: "The result or effect of an action or choice.",
    consensus: "General agreement reached by a group.",
    conserve: "To protect and save resources so they don't run out."
};

const DIFFICULTY_PRESETS = {
    easy: { baseSpeed: 0.65, spawnDelay: 2700, minSpawnDelay: 1600, speedStep: 0.04, delayStep: 80, bossChargeMs: 14000 },
    normal: { baseSpeed: 0.95, spawnDelay: 2200, minSpawnDelay: 1200, speedStep: 0.06, delayStep: 100, bossChargeMs: 12000 },
    hard: { baseSpeed: 1.3, spawnDelay: 1750, minSpawnDelay: 950, speedStep: 0.08, delayStep: 110, bossChargeMs: 10000 }
};

const STAGES = [
    {
        id: 1,
        name: 'STAGE 1: NEON NEBULA',
        cssClass: 'stage-1',
        track: 'stage1',
        enemies: {
            scout: '<img src="assets/enemy-scout.png" class="enemy-ship scout-sprite" alt="">',
            fighter: '<img src="assets/enemy-fighter.png" class="enemy-ship fighter-sprite" alt="">',
            elite: '<img src="assets/enemy-elite.png" class="enemy-ship elite-sprite" alt="">'
        }
    },
    {
        id: 2,
        name: 'STAGE 2: CYBER ASTEROID BELT',
        cssClass: 'stage-2',
        track: 'stage2',
        enemies: {
            scout: '<img src="assets/s2-scout.png" class="enemy-ship scout-sprite" alt="">',
            fighter: '<img src="assets/s2-fighter.png" class="enemy-ship fighter-sprite" alt="">',
            elite: '<img src="assets/s2-elite.png" class="enemy-ship elite-sprite" alt="">'
        }
    },
    {
        id: 3,
        name: 'STAGE 3: DARK VOID',
        cssClass: 'stage-3',
        track: 'stage3',
        enemies: {
            scout: '<img src="assets/s3-scout.png" class="enemy-ship scout-sprite" alt="">',
            fighter: '<img src="assets/s3-fighter.png" class="enemy-ship fighter-sprite" alt="">',
            elite: '<img src="assets/s3-elite.png" class="enemy-ship elite-sprite" alt="">'
        }
    }
];

const BOSS_CONFIGS = [
    {
        name: 'NEBULA MOTHERSHIP',
        cssClass: 'boss-stage-1',
        hasEscorts: true,
        maxEscorts: 2,
        escortsOnlyEnraged: false,
        hasShieldPhase: false,
        hasMegaBeam: false,
        chargeMult: 1.0,
        hasBlink: false,
        dualSalvo: false
    },
    {
        name: 'AEGIS CORE',
        cssClass: 'boss-stage-2',
        hasEscorts: false,
        maxEscorts: 0,
        escortsOnlyEnraged: false,
        hasShieldPhase: true,
        hasMegaBeam: true,
        chargeMult: 1.0,
        hasBlink: false,
        dualSalvo: false
    },
    {
        name: 'VOID DREADNOUGHT',
        cssClass: 'boss-stage-3',
        hasEscorts: true,
        maxEscorts: 1,
        escortsOnlyEnraged: true,
        hasShieldPhase: false,
        hasMegaBeam: true,
        chargeMult: 1.25,
        hasBlink: true,
        dualSalvo: true
    }
];

const STORAGE_KEY = 'neonPlaneTypingStats';
const CUSTOM_WORDS_KEY = 'neonPlaneCustomWords';

// Current active word pool
let activeDictionary = [];
let activeSector = 'scifi';
let activeDifficulty = DIFFICULTY_PRESETS.normal;

// --- Game State Variables ---
let score = 0;
let lives = 3;
const MAX_LIVES = 3;
let totalTyped = 0;
let errors = 0;
let startTime = null;
let pausedAt = null;
let totalPausedMs = 0;
let gameActive = false;
let words = [];
let targetedWord = null;
let wordIdCounter = 0;
let spawnInterval = null;
let animationFrameId = null;
let lastFrameTime = 0;

// Educational: per-word mistake tracking & practice drill mode
let wordMistakes = new Map();
let lastMissedWords = [];
let practiceDrillMode = false;
let wordDeck = [];

// Power-up states
let shieldActive = false;
let empActive = false;
let empRemainingMs = 0;

// Combo and Multipliers
let comboStreak = 0;
let scoreMultiplier = 1.0;

// Boss & Wave state
let stage = 1;
let wave = 1;
let nextSpeedMilestone = 150;
let bossActive = false;
let bossBattleStarted = false;
let bossDefeatedThisRun = false;
let activeBossConfig = BOSS_CONFIGS[0];
let bossLevel = 0;
let bossHp = 5;
let bossMaxHp = 5;
let bossX = 50; // percentage across arena (22..78)
let bossDir = 1; // 1 = right, -1 = left
let bossEnraged = false;
let bossShielded = false;
let bossShieldUsed = false;
let bossCharge = 0; // 0..1
let nextBossScore = 1000;
let bossClearInterval = null;
let bossBombTimeout = null;
let bossEscortInterval = null;

// Pause State
let gamePaused = false;

// Difficulty scaling
let baseSpeed = 1.0;
let currentSpawnDelay = 2200; // ms

// --- DOM References ---
const gameArea = document.getElementById('game-area');
const wordsContainer = document.getElementById('words-container');
const lasersContainer = document.getElementById('lasers-container');
const explosionsContainer = document.getElementById('explosions-container');
const playerPlane = document.getElementById('player-plane');
const playerShield = document.getElementById('player-shield');
const scoreVal = document.getElementById('score-val');
const stageVal = document.getElementById('stage-val');
const waveVal = document.getElementById('wave-val');
const stageBanner = document.getElementById('stage-banner');
const wpmVal = document.getElementById('wpm-val');
const accVal = document.getElementById('acc-val');
const empHud = document.getElementById('emp-hud');
const livesContainer = document.getElementById('lives-container');

// Combo HUD elements
const comboHud = document.getElementById('combo-hud');
const comboVal = document.getElementById('combo-val');
const multVal = document.getElementById('mult-val');

// Boss HUD elements
const enemyBoss = document.getElementById('enemy-boss');
const bossNameLabel = document.getElementById('boss-name-label');
const bossHealthBar = document.getElementById('boss-health-bar');
const bossChargeContainer = document.getElementById('boss-charge-container');
const bossChargeBar = document.getElementById('boss-charge-bar');

// Screen overlays & Selectors
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const pauseScreen = document.getElementById('pause-screen');
const vocabSelect = document.getElementById('vocab-select');
const difficultySelect = document.getElementById('difficulty-select');
const customWordsPanel = document.getElementById('custom-words-panel');
const customWordsInput = document.getElementById('custom-words-input');
const sectorBestBanner = document.getElementById('sector-best-banner');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const practiceMissedBtn = document.getElementById('practice-missed-btn');
const gameoverMenuBtn = document.getElementById('gameover-menu-btn');
const pauseMenuBtn = document.getElementById('pause-menu-btn');
const resumeBtn = document.getElementById('resume-btn');
const finalScoreVal = document.getElementById('final-score-val');
const finalWpmVal = document.getElementById('final-wpm-val');
const finalAccVal = document.getElementById('final-acc-val');
const finalStageVal = document.getElementById('final-stage-val');
const finalWaveVal = document.getElementById('final-wave-val');
const newRecordBadge = document.getElementById('new-record-badge');
const practiceWordsContainer = document.getElementById('practice-words-container');

// --- Persistence Helpers ---
function loadAllStats() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

function getSectorStats(sector) {
    const all = loadAllStats();
    return all[sector] || { highScore: 0, bestWpm: 0, bestAcc: 0 };
}

function saveSectorStats(sector, runScore, runWpm, runAcc) {
    const all = loadAllStats();
    const prev = all[sector] || { highScore: 0, bestWpm: 0, bestAcc: 0 };
    const isNewRecord = runScore > prev.highScore && runScore > 0;

    all[sector] = {
        highScore: Math.max(prev.highScore, runScore),
        bestWpm: Math.max(prev.bestWpm, runWpm),
        bestAcc: Math.max(prev.bestAcc, runAcc)
    };

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {
        // Ignore storage quota errors
    }
    return isNewRecord;
}

function updateSectorBestBanner() {
    const stats = getSectorStats(vocabSelect.value);
    sectorBestBanner.innerText = `BEST: ${stats.highScore} PTS | ${stats.bestWpm} WPM | ${stats.bestAcc}% ACC`;
}

// --- Procedural Chiptune Music Tracks (via shared/audio.js) ---
const CHIPTUNE_TRACKS = {
    stage1: {
        bpm: 134,
        leadWave: 'square',
        lead: [
            'E5', null, 'G5', null, 'A5', null, 'G5', 'E5',
            'D5', null, 'E5', 'G5', 'E5', null, 'C5', null,
            'F5', null, 'A5', null, 'G5', null, 'E5', 'D5',
            'C5', null, 'D5', 'E5', 'G5', null, null, null
        ],
        bass: [
            'C3', 'C3', 'G3', 'C3', 'A2', 'A2', 'E3', 'A2',
            'F2', 'F2', 'C3', 'F2', 'G2', 'G2', 'D3', 'G2',
            'C3', 'C3', 'G3', 'C3', 'A2', 'A2', 'E3', 'A2',
            'F2', 'F2', 'G2', 'G2', 'C3', null, 'G2', null
        ]
    },
    stage2: {
        bpm: 142,
        leadWave: 'sawtooth',
        lead: [
            'D5', null, 'F5', 'A5', 'G5', null, 'F5', 'D5',
            'C5', null, 'E5', 'G5', 'F5', null, 'E5', null,
            'Bb4', null, 'D5', 'F5', 'A5', null, 'G5', 'F5',
            'E5', 'F5', 'G5', 'A5', 'D5', null, null, null
        ],
        bass: [
            'D2', 'D3', 'D2', 'D3', 'D2', 'D3', 'A2', 'D3',
            'C2', 'C3', 'C2', 'C3', 'F2', 'F3', 'C3', 'A2',
            'B2', 'B2', 'F2', 'B2', 'G2', 'G2', 'D3', 'G2',
            'A2', 'A2', 'E3', 'A2', 'D2', null, 'A2', null
        ]
    },
    stage3: {
        bpm: 150,
        leadWave: 'square',
        lead: [
            'E5', 'B4', 'G5', 'B4', 'Fs5', 'B4', 'E5', 'D5',
            'C5', 'G4', 'E5', 'G4', 'D5', 'A4', 'Fs5', 'D5',
            'E5', 'B4', 'G5', 'A5', 'B5', null, 'G5', 'E5',
            'Fs5', 'E5', 'D5', 'B4', 'E5', null, null, null
        ],
        bass: [
            'E2', 'E3', 'E2', 'E3', 'D2', 'D3', 'D2', 'D3',
            'C2', 'C3', 'C2', 'C3', 'B2', 'B2', 'D3', 'B2',
            'E2', 'E3', 'E2', 'E3', 'G2', 'G3', 'E3', 'G2',
            'B2', 'B2', 'Fs4', 'B2', 'E2', null, 'B2', null
        ]
    },
    boss: {
        bpm: 162,
        leadWave: 'sawtooth',
        lead: [
            'E5', 'E5', null, 'G5', 'Fs5', 'E5', 'Eb5', 'E5',
            'C5', 'C5', null, 'E5', 'D5', 'C5', 'B4', null,
            'A4', 'C5', 'E5', 'A5', 'G5', 'Fs5', 'E5', 'D5',
            'B4', 'Eb5', 'Fs5', 'B5', 'E5', null, 'B4', null
        ],
        bass: [
            'E2', 'E2', 'E3', 'E2', 'E2', 'E2', 'G2', 'B2',
            'C2', 'C2', 'C3', 'C2', 'B2', 'B2', 'G2', 'Fs4',
            'A2', 'A2', 'E3', 'A2', 'D2', 'D2', 'A2', 'D2',
            'B2', 'B2', 'Eb4', 'B2', 'E2', 'E2', 'B2', null
        ]
    }
};

class SoundManager extends window.ArcadeAudio.BaseSoundManager {
    constructor() {
        super(CHIPTUNE_TRACKS, 'stage1');
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
        btn.blur();
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
        btn.blur();
    }

    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        const btn = document.getElementById('voice-toggle');
        if (this.voiceEnabled) {
            btn.innerText = '🗣️ Voice: On';
            btn.classList.add('active');
        } else {
            btn.innerText = '🔇 Voice: Off';
            btn.classList.remove('active');
            this.stopSpeech();
        }
        btn.blur();
    }

    speakWord(word, force = false) {
        this.speak(word, force);
    }

    playLaser() {
        if (!this.soundEnabled) return;
        this.init();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(880, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.12);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.12);
    }

    playExplosion() {
        if (!this.soundEnabled) return;
        this.init();

        const bufferSize = this.ctx.sampleRate * 0.4;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const noiseNode = this.ctx.createBufferSource();
        noiseNode.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(100, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(10, this.ctx.currentTime + 0.4);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

        noiseNode.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noiseNode.start();
        noiseNode.stop(this.ctx.currentTime + 0.4);
    }

    playHit() {
        if (!this.soundEnabled) return;
        this.init();

        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';

        osc1.frequency.setValueAtTime(130, this.ctx.currentTime);
        osc2.frequency.setValueAtTime(127, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start();
        osc2.start();

        osc1.stop(this.ctx.currentTime + 0.3);
        osc2.stop(this.ctx.currentTime + 0.3);
    }

    playShieldUp() {
        if (!this.soundEnabled) return;
        this.init();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.35);
    }

    playShieldDown() {
        if (!this.soundEnabled) return;
        this.init();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(350, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(60, this.ctx.currentTime + 0.25);

        const bufferSize = this.ctx.sampleRate * 0.25;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noiseNode = this.ctx.createBufferSource();
        noiseNode.buffer = buffer;
        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        noiseNode.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);

        osc.start();
        noiseNode.start();

        osc.stop(this.ctx.currentTime + 0.25);
        noiseNode.stop(this.ctx.currentTime + 0.25);
    }

    playComboUp() {
        if (!this.soundEnabled) return;
        this.init();

        const time = this.ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99];

        freqs.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time + idx * 0.08);

            gain.gain.setValueAtTime(0.06, time + idx * 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, time + idx * 0.08 + 0.15);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(time + idx * 0.08);
            osc.stop(time + idx * 0.08 + 0.15);
        });
    }

    playUnlock() {
        if (!this.soundEnabled) return;
        this.init();

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.09);

        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.09);
    }
}

const sounds = new SoundManager();

// --- Core Game Functions ---

function clearBossTimers() {
    if (bossClearInterval) {
        clearInterval(bossClearInterval);
        bossClearInterval = null;
    }
    if (bossBombTimeout) {
        clearTimeout(bossBombTimeout);
        bossBombTimeout = null;
    }
    if (bossEscortInterval) {
        clearInterval(bossEscortInterval);
        bossEscortInterval = null;
    }
}

function clearEmpTimer() {
    empActive = false;
    empRemainingMs = 0;
    empHud.style.display = 'none';
    gameArea.classList.remove('emp-active');
}

function getCustomWordList() {
    const raw = (customWordsInput.value || '').trim();
    const parsed = raw
        .split(/[\s,;]+/)
        .map(w => w.toLowerCase().replace(/[^a-z]/g, ''))
        .filter(w => w.length >= 2);
    const unique = Array.from(new Set(parsed));
    if (unique.length > 0) {
        try {
            localStorage.setItem(CUSTOM_WORDS_KEY, unique.join(', '));
        } catch {
            // Ignore storage errors
        }
        return unique;
    }
    return ['planet', 'galaxy', 'comet', 'orbit', 'rocket'];
}

function loadCustomWordsUI() {
    try {
        const saved = localStorage.getItem(CUSTOM_WORDS_KEY);
        if (saved) customWordsInput.value = saved;
    } catch {
        // Ignore storage errors
    }
}

function updateCustomPanelVisibility() {
    customWordsPanel.style.display = vocabSelect.value === 'custom' ? 'flex' : 'none';
}

function getCurrentStageConfig() {
    return STAGES[(stage - 1) % STAGES.length];
}

function applyStageTheme(showBanner = false) {
    const cfg = getCurrentStageConfig();
    gameArea.classList.remove('stage-1', 'stage-2', 'stage-3');
    gameArea.classList.add(cfg.cssClass);
    stageVal.innerText = stage;
    sounds.bgmController.setTrack(cfg.track);

    if (showBanner) {
        const cycleNote = stage > STAGES.length ? ` (LOOP ${Math.ceil(stage / STAGES.length)})` : '';
        stageBanner.innerText = `${cfg.name}${cycleNote}`;
        stageBanner.classList.add('active');
        setTimeout(() => stageBanner.classList.remove('active'), 2200);
    }
}

function refillWordDeck() {
    wordDeck = [...activeDictionary];
    for (let i = wordDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordDeck[i], wordDeck[j]] = [wordDeck[j], wordDeck[i]];
    }
}

function startGame(drillWords = null) {
    clearBossTimers();
    clearEmpTimer();
    sounds.stopSpeech();

    score = 0;
    lives = MAX_LIVES;
    totalTyped = 0;
    errors = 0;
    startTime = Date.now();
    pausedAt = null;
    totalPausedMs = 0;
    targetedWord = null;
    words = [];
    wordMistakes = new Map();

    // Load difficulty preset
    activeDifficulty = DIFFICULTY_PRESETS[difficultySelect.value] || DIFFICULTY_PRESETS.normal;
    baseSpeed = activeDifficulty.baseSpeed;
    currentSpawnDelay = activeDifficulty.spawnDelay;
    gameActive = true;

    // Choose active vocabulary pool (or Practice Drill pool)
    practiceDrillMode = Array.isArray(drillWords) && drillWords.length > 0;
    activeSector = vocabSelect.value;
    if (practiceDrillMode) {
        activeDictionary = drillWords;
    } else if (activeSector === 'grade3') {
        activeDictionary = lausdGrade3;
    } else if (activeSector === 'grade4') {
        activeDictionary = lausdGrade4;
    } else if (activeSector === 'grade5') {
        activeDictionary = lausdGrade5;
    } else if (activeSector === 'custom') {
        activeDictionary = getCustomWordList();
    } else {
        activeDictionary = scifiDictionary;
    }
    refillWordDeck();

    // Reset Shield state
    shieldActive = false;
    playerShield.className = '';

    // Reset Combo state
    comboStreak = 0;
    scoreMultiplier = 1.0;
    comboHud.className = 'hud-item';
    comboHud.style.opacity = '0';
    comboHud.style.transform = 'scale(0.8)';

    // Reset Stage, Wave & Boss state
    stage = 1;
    wave = 1;
    nextSpeedMilestone = 150;
    bossActive = false;
    bossBattleStarted = false;
    bossDefeatedThisRun = false;
    bossLevel = 0;
    bossX = 50;
    bossDir = 1;
    bossEnraged = false;
    bossShielded = false;
    bossShieldUsed = false;
    bossCharge = 0;
    bossChargeBar.style.width = '0%';
    nextBossScore = 1000;
    enemyBoss.classList.remove('active', 'bank-left', 'bank-right', 'boss-hit', 'boss-enraged', 'boss-shielded', 'boss-stage-1', 'boss-stage-2', 'boss-stage-3', 'boss-blink');
    bossNameLabel.innerText = '';
    bossChargeContainer.classList.add('hidden');
    enemyBoss.style.left = '50%';
    stageBanner.classList.remove('active');

    applyStageTheme(true);
    if (sounds.bgmEnabled) {
        sounds.bgmController.start();
    }

    // Reset Pause state
    gamePaused = false;
    pauseScreen.classList.remove('active');

    // Reset HUD
    scoreVal.innerText = "0";
    waveVal.innerText = "1";
    wpmVal.innerText = "0";
    accVal.innerText = "100%";
    updateLivesUI();

    // Clear containers
    wordsContainer.innerHTML = '';
    lasersContainer.innerHTML = '';
    explosionsContainer.innerHTML = '';

    // Hide screens
    startScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');

    // Align plane & apply Star Shop cosmetic skin
    playerPlane.classList.remove('skin-plane_gold', 'skin-plane_emerald', 'skin-plane_rainbow');
    if (window.ArcadeProfile) {
        const equippedPlane = window.ArcadeProfile.loadProfile().equipped.plane;
        if (equippedPlane) playerPlane.classList.add(`skin-${equippedPlane}`);
    }
    playerPlane.style.left = '50%';

    // Start Spawner and Loop
    if (spawnInterval) clearInterval(spawnInterval);
    spawnWord();
    spawnInterval = setInterval(spawnWord, currentSpawnDelay);

    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    lastFrameTime = performance.now();
    animationFrameId = requestAnimationFrame(gameLoop);
}

function pickNextWord() {
    const activeFirstLetters = words.map(w => w.word[0].toLowerCase());
    const activeWordsSet = new Set(words.map(w => w.word));

    // Spaced repetition: 35% chance to replay a struggled word if any exist
    if (wordMistakes.size > 0 && Math.random() < 0.35) {
        const struggled = Array.from(wordMistakes.keys()).filter(
            w => !activeWordsSet.has(w) && !activeFirstLetters.includes(w[0].toLowerCase())
        );
        if (struggled.length > 0) {
            return struggled[Math.floor(Math.random() * struggled.length)];
        }
    }

    if (wordDeck.length === 0) {
        refillWordDeck();
    }

    // Draw from shuffled deck avoiding active first-letter collisions
    const idx = wordDeck.findIndex(w => !activeFirstLetters.includes(w[0].toLowerCase()) && !activeWordsSet.has(w));
    if (idx !== -1) {
        return wordDeck.splice(idx, 1)[0];
    }

    const available = activeDictionary.filter(w => !activeFirstLetters.includes(w[0].toLowerCase()));
    const pool = available.length > 0 ? available : activeDictionary;
    return pool[Math.floor(Math.random() * pool.length)];
}

function choosePowerUp() {
    const roll = Math.random();
    if (roll < 0.12) return 'shield';
    if (roll < 0.22) return 'emp';
    if (lives < MAX_LIVES && roll < 0.30) return 'heal';
    return 'none';
}

function spawnWord() {
    if (!gameActive || bossActive || gamePaused) return;

    const wordText = pickNextWord();
    const id = wordIdCounter++;
    const xPercent = 10 + Math.random() * 80;
    const yPx = -40;

    const element = document.createElement('div');
    element.className = 'enemy-word';
    element.style.left = `${xPercent}%`;
    element.style.top = `${yPx}px`;

    const powerUp = choosePowerUp();

    const stageCfg = getCurrentStageConfig();
    let shipClass = 'ship-scout';
    let shipHTML = stageCfg.enemies.scout;

    if (wordText.length > 5 && wordText.length <= 8) {
        shipClass = 'ship-fighter';
        shipHTML = stageCfg.enemies.fighter;
    } else if (wordText.length > 8) {
        shipClass = 'ship-elite';
        shipHTML = stageCfg.enemies.elite;
    }

    element.classList.add(shipClass);

    let innerHTML = shipHTML;
    if (powerUp === 'shield') {
        element.classList.add('shield-word');
        innerHTML += '<span class="shield-icon">🛡️ </span>';
    } else if (powerUp === 'emp') {
        element.classList.add('emp-word');
        innerHTML += '<span class="powerup-icon">❄️ </span>';
    } else if (powerUp === 'heal') {
        element.classList.add('heal-word');
        innerHTML += '<span class="powerup-icon">❤️ </span>';
    }

    innerHTML += '<div class="word-text-wrapper">';
    wordText.split('').forEach(char => {
        innerHTML += `<span class="untyped">${char}</span>`;
    });
    innerHTML += '</div>';

    element.innerHTML = innerHTML;
    wordsContainer.appendChild(element);

    const speed = baseSpeed + Math.random() * 0.35;

    words.push({
        id: id,
        word: wordText,
        element: element,
        x: xPercent,
        y: yPx,
        typedCount: 0,
        speed: speed,
        powerUp: powerUp,
        isBossBomb: false
    });
}

function checkDifficultyProgression() {
    if (bossActive) return;

    while (score >= nextSpeedMilestone) {
        wave++;
        waveVal.innerText = wave;
        baseSpeed += activeDifficulty.speedStep;
        currentSpawnDelay = Math.max(activeDifficulty.minSpawnDelay, currentSpawnDelay - activeDifficulty.delayStep);
        clearInterval(spawnInterval);
        spawnInterval = setInterval(spawnWord, currentSpawnDelay);
        nextSpeedMilestone += 150 + wave * 25;
    }
}

function gameLoop(timestamp) {
    if (!gameActive || gamePaused) return;

    const dt = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 16.667, 3) : 1;
    lastFrameTime = timestamp;

    if (empActive) {
        empRemainingMs -= dt * 16.667;
        if (empRemainingMs <= 0) {
            clearEmpTimer();
        }
    }

    const speedFactor = empActive ? 0.45 : 1.0;
    const areaHeight = gameArea.clientHeight;
    const hitThreshold = areaHeight - 80;

    // Smooth horizontal Boss patrol & Mega Beam charge
    if (bossActive && bossHp > 0) {
        const patrolSpeed = (0.24 + Math.min(bossLevel * 0.04, 0.16)) * (bossEnraged ? 1.55 : 1.0) * speedFactor * dt;
        bossX += bossDir * patrolSpeed;
        if (bossX >= 78) {
            bossX = 78;
            bossDir = -1;
        } else if (bossX <= 22) {
            bossX = 22;
            bossDir = 1;
        }
        enemyBoss.style.left = `${bossX}%`;
        enemyBoss.classList.toggle('bank-left', bossDir < 0);
        enemyBoss.classList.toggle('bank-right', bossDir > 0);

        if (bossBattleStarted && activeBossConfig.hasMegaBeam) {
            const chargeMs = activeDifficulty.bossChargeMs || 12000;
            bossCharge += ((16.667 * dt) / chargeMs) * activeBossConfig.chargeMult * speedFactor;
            bossChargeBar.style.width = `${Math.min(100, bossCharge * 100)}%`;
            if (bossCharge >= 1) {
                fireBossMegaBeam();
            }
        }
    }

    for (let i = words.length - 1; i >= 0; i--) {
        const w = words[i];
        w.y += w.speed * speedFactor * dt;
        w.element.style.top = `${w.y}px`;

        if (w.y >= hitThreshold) {
            const wasBossBomb = w.isBossBomb;
            const wasShieldBreaker = w.isShieldBreaker;
            recordWordMistake(w.word);

            w.element.remove();
            words.splice(i, 1);

            resetCombo();

            if (shieldActive) {
                shatterShield();
            } else {
                playerTakeHit();
            }

            if (targetedWord && targetedWord.id === w.id) {
                targetedWord = null;
                updatePlanePosition();
            }

            if (wasShieldBreaker && bossActive && bossShielded && bossHp > 0) {
                bossBombTimeout = setTimeout(spawnBossShieldBreaker, 1500);
            } else if (wasBossBomb && bossActive && !bossShielded && bossHp > 0 && words.filter(item => item.isBossBomb).length === 0) {
                bossBombTimeout = setTimeout(spawnBossSalvo, 1500);
            }
        }
    }

    animationFrameId = requestAnimationFrame(gameLoop);
}

function recordWordMistake(word) {
    wordMistakes.set(word, (wordMistakes.get(word) || 0) + 1);
}

function playerTakeHit() {
    lives--;
    sounds.playHit();
    updateLivesUI();
    triggerScreenShake();

    gameArea.classList.add('screen-hit');
    setTimeout(() => {
        gameArea.classList.remove('screen-hit');
    }, 300);

    if (lives <= 0) {
        endGame();
    }
}

function shatterShield() {
    shieldActive = false;
    sounds.playShieldDown();
    triggerScreenShake();

    playerShield.className = 'shattering';
    setTimeout(() => {
        playerShield.className = '';
    }, 400);
}

function activateShield() {
    shieldActive = true;
    sounds.playShieldUp();
    playerShield.className = 'active';
}

function activateEmp() {
    empActive = true;
    empRemainingMs = 5000;
    empHud.style.display = 'block';
    gameArea.classList.add('emp-active');
    sounds.playShieldUp();
}

function activateHeal() {
    if (lives < MAX_LIVES) {
        lives++;
        updateLivesUI();
        sounds.playComboUp();
    }
}

function triggerScreenShake() {
    gameArea.classList.add('screen-shake');
    setTimeout(() => {
        gameArea.classList.remove('screen-shake');
    }, 220);
}

function updateLivesUI() {
    const hearts = livesContainer.querySelectorAll('.heart');
    hearts.forEach((heart, idx) => {
        if (idx < lives) {
            heart.classList.add('active');
        } else {
            heart.classList.remove('active');
        }
    });
}

function togglePause() {
    if (!gameActive) return;

    gamePaused = !gamePaused;

    if (gamePaused) {
        pausedAt = Date.now();
        sounds.stopSpeech();
        pauseScreen.classList.add('active');
        clearInterval(spawnInterval);
        if (sounds.bgmEnabled) {
            sounds.bgmController.stop();
        }
    } else {
        if (pausedAt) {
            totalPausedMs += Date.now() - pausedAt;
            pausedAt = null;
        }
        pauseScreen.classList.remove('active');
        if (sounds.bgmEnabled) {
            sounds.bgmController.start();
        }
        if (!bossActive) {
            spawnInterval = setInterval(spawnWord, currentSpawnDelay);
        }
        lastFrameTime = performance.now();
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

function unlockTarget() {
    if (!targetedWord) return;
    targetedWord.element.classList.remove('targeted');
    targetedWord = null;
    updatePlanePosition();
    sounds.playUnlock();
}

function pulseNextExpectedHint() {
    if (!targetedWord) return;
    const spans = targetedWord.element.querySelectorAll('.word-text-wrapper span');
    const nextSpan = spans[targetedWord.typedCount];
    if (!nextSpan) return;
    nextSpan.classList.remove('hint-pulse');
    void nextSpan.offsetWidth; // trigger reflow for repeated mistypes
    nextSpan.classList.add('hint-pulse');
    setTimeout(() => nextSpan.classList.remove('hint-pulse'), 450);
}

function handleKeyPress(e) {
    if (!gameActive) return;

    if (e.key === 'Escape') {
        e.preventDefault();
        togglePause();
        return;
    }

    if (gamePaused) return;

    // Allow Tab or Backspace to switch/unlock targets without penalty
    if (e.key === 'Tab' || e.key === 'Backspace') {
        e.preventDefault();
        unlockTarget();
        return;
    }

    // Ignore modifier, navigation, and non-letter keys
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.length !== 1 || !/^[a-z]$/i.test(e.key)) return;

    sounds.init();

    const typedChar = e.key.toLowerCase();
    totalTyped++;

    if (!targetedWord) {
        // Lock onto the lowest matching word (closest to breaching)
        const matches = words.filter(w => w.word[0].toLowerCase() === typedChar);
        if (matches.length > 0) {
            matches.sort((a, b) => b.y - a.y);
            targetedWord = matches[0];
            targetedWord.element.classList.add('targeted');
            sounds.speakWord(targetedWord.word);
            processCorrectChar();
        } else {
            resetCombo();
            triggerScreenShake();
            errors++;
        }
    } else {
        const targetChar = targetedWord.word[targetedWord.typedCount].toLowerCase();
        if (typedChar === targetChar) {
            processCorrectChar();
        } else {
            recordWordMistake(targetedWord.word);
            pulseNextExpectedHint();
            resetCombo();
            triggerScreenShake();
            errors++;
        }
    }

    updateStats();
}

function processCorrectChar() {
    const spans = targetedWord.element.querySelectorAll('.word-text-wrapper span');
    spans[targetedWord.typedCount].className = 'typed';

    targetedWord.typedCount++;
    incrementCombo();

    sounds.playLaser();
    fireLaser(targetedWord.element);
    updatePlanePosition();

    if (targetedWord.typedCount >= targetedWord.word.length) {
        destroyTarget();
    }
}

function fireLaser(wordElement) {
    const areaRect = gameArea.getBoundingClientRect();
    const planeRect = playerPlane.getBoundingClientRect();
    const wordRect = wordElement.getBoundingClientRect();

    const x1 = (planeRect.left + planeRect.width / 2) - areaRect.left;
    const y1 = planeRect.top - areaRect.top + 6;

    const x2 = (wordRect.left + wordRect.width / 2) - areaRect.left;
    const y2 = (wordRect.top + wordRect.height / 2) - areaRect.top;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    let boltMultClass = 'mult-1';
    if (scoreMultiplier === 1.5) boltMultClass = 'mult-1-5';
    else if (scoreMultiplier === 2.0) boltMultClass = 'mult-2';
    else if (scoreMultiplier === 3.0) boltMultClass = 'mult-3';
    else if (scoreMultiplier === 5.0) boltMultClass = 'mult-5';

    // Muzzle flash at plane nose
    const muzzle = document.createElement('div');
    muzzle.className = 'muzzle-flash';
    muzzle.style.left = `${x1}px`;
    muzzle.style.top = `${y1}px`;
    lasersContainer.appendChild(muzzle);
    setTimeout(() => muzzle.remove(), 110);

    // Traveling plasma bolt from plane nose to target
    const bolt = document.createElement('div');
    bolt.className = `plasma-bolt ${boltMultClass}`;
    bolt.style.left = `${x1}px`;
    bolt.style.top = `${y1}px`;
    bolt.style.setProperty('--tx', `${dx}px`);
    bolt.style.setProperty('--ty', `${dy}px`);
    bolt.style.setProperty('--angle', `${angle}deg`);
    lasersContainer.appendChild(bolt);
    setTimeout(() => bolt.remove(), 115);

    // Impact spark when bolt lands
    setTimeout(() => {
        const spark = document.createElement('div');
        spark.className = 'impact-spark';
        spark.style.left = `${x2}px`;
        spark.style.top = `${y2}px`;
        lasersContainer.appendChild(spark);
        setTimeout(() => spark.remove(), 160);
    }, 85);
}

let planeBankTimeout = null;
function updatePlanePosition() {
    const currentLeft = parseFloat(playerPlane.style.left) || 50;
    const targetLeft = targetedWord ? targetedWord.x : 50;

    playerPlane.classList.remove('bank-left', 'bank-right');
    if (Math.abs(targetLeft - currentLeft) > 3) {
        playerPlane.classList.add(targetLeft < currentLeft ? 'bank-left' : 'bank-right');
        if (planeBankTimeout) clearTimeout(planeBankTimeout);
        planeBankTimeout = setTimeout(() => {
            playerPlane.classList.remove('bank-left', 'bank-right');
        }, 220);
    }

    playerPlane.style.left = `${targetLeft}%`;
}

function spawnFloatingText(x, y, text, isPowerup = false) {
    const el = document.createElement('div');
    el.className = isPowerup ? 'floating-text powerup' : 'floating-text';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.innerText = text;
    explosionsContainer.appendChild(el);
    setTimeout(() => el.remove(), 850);
}

function destroyTarget() {
    sounds.playExplosion();

    const areaRect = gameArea.getBoundingClientRect();
    const wordRect = targetedWord.element.getBoundingClientRect();
    const x = (wordRect.left + wordRect.width / 2) - areaRect.left;
    const y = (wordRect.top + wordRect.height / 2) - areaRect.top;

    createExplosion(x, y);

    if (targetedWord.powerUp === 'shield') {
        activateShield();
        spawnFloatingText(x, y - 22, '🛡️ SHIELD UP!', true);
    } else if (targetedWord.powerUp === 'emp') {
        activateEmp();
        spawnFloatingText(x, y - 22, '❄️ SLOW-MO!', true);
    } else if (targetedWord.powerUp === 'heal') {
        activateHeal();
        spawnFloatingText(x, y - 22, '❤️ +1 LIFE!', true);
    }

    const wasBossBomb = targetedWord.isBossBomb;
    const wasShieldBreaker = targetedWord.isShieldBreaker;
    const pointsGained = Math.round(targetedWord.word.length * 10 * scoreMultiplier);
    spawnFloatingText(x, y, `+${pointsGained}`);

    targetedWord.element.remove();
    words = words.filter(w => w.id !== targetedWord.id);

    score += pointsGained;
    scoreVal.innerText = score;

    targetedWord = null;
    updatePlanePosition();

    if (wasShieldBreaker && bossActive && bossShielded) {
        fireBossCoreLaser(x, y);
        bossShielded = false;
        bossCharge = 0;
        bossChargeBar.style.width = '0%';
        enemyBoss.classList.remove('boss-shielded');
        sounds.playShieldDown();
        const bossPos = getBossCenter();
        spawnFloatingText(bossPos.x, bossPos.y + 45, '🔓 SHIELD BROKEN!', true);
        bossBombTimeout = setTimeout(spawnBossSalvo, 1100);
    } else if (wasBossBomb && bossActive) {
        fireBossCoreLaser(x, y);
        bossCharge = 0;
        bossChargeBar.style.width = '0%';

        if (!bossShielded) {
            bossHp--;
            bossHealthBar.style.width = `${Math.max(0, (bossHp / bossMaxHp) * 100)}%`;
        }

        // Hit flash & recoil
        enemyBoss.classList.remove('boss-hit');
        void enemyBoss.offsetWidth;
        enemyBoss.classList.add('boss-hit');
        setTimeout(() => enemyBoss.classList.remove('boss-hit'), 220);

        // Stage 3 Void Dreadnought: blink to a new lane on hit
        if (activeBossConfig.hasBlink && bossHp > 0) {
            let nextX = 24 + Math.random() * 52;
            if (Math.abs(nextX - bossX) < 18) {
                nextX = bossX > 50 ? 25 + Math.random() * 15 : 60 + Math.random() * 15;
            }
            bossX = nextX;
            enemyBoss.style.left = `${bossX}%`;
            enemyBoss.classList.remove('boss-blink');
            void enemyBoss.offsetWidth;
            enemyBoss.classList.add('boss-blink');
            setTimeout(() => enemyBoss.classList.remove('boss-blink'), 300);
        }

        // Enraged + optional Boss Shield Phase once when HP drops to 50% or below
        if (!bossEnraged && bossHp > 0 && bossHp <= Math.ceil(bossMaxHp / 2)) {
            bossEnraged = true;
            enemyBoss.classList.add('boss-enraged');
            const bossPos = getBossCenter();
            spawnFloatingText(bossPos.x, bossPos.y + 45, '⚠️ BOSS ENRAGED!', true);

            if (activeBossConfig.hasShieldPhase && !bossShieldUsed) {
                bossShieldUsed = true;
                bossShielded = true;
                enemyBoss.classList.add('boss-shielded');
                sounds.playShieldUp();
                spawnFloatingText(bossPos.x, bossPos.y + 72, '🛡️ BOSS SHIELD UP!', true);
                if (bossBombTimeout) clearTimeout(bossBombTimeout);
                bossBombTimeout = setTimeout(spawnBossShieldBreaker, 1300);
                return;
            }
        }

        if (bossHp <= 0) {
            defeatBoss();
        } else if (!bossShielded && words.filter(w => w.isBossBomb).length === 0) {
            bossBombTimeout = setTimeout(spawnBossSalvo, bossEnraged ? 1100 : 1400);
        }
    } else if (!bossActive) {
        checkDifficultyProgression();

        if (score >= nextBossScore) {
            triggerBossBattle();
        }
    }
}

function getBossCenter() {
    const areaRect = gameArea.getBoundingClientRect();
    const bossRect = enemyBoss.getBoundingClientRect();
    return {
        x: (bossRect.left + bossRect.width / 2) - areaRect.left,
        y: (bossRect.top + bossRect.height / 2) - areaRect.top
    };
}

function fireBossCoreLaser(startX, startY) {
    const bossCenter = getBossCenter();
    const endX = bossCenter.x;
    const endY = bossCenter.y;

    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const laser = document.createElement('div');
    laser.className = 'boss-beam';
    laser.style.width = `${distance}px`;
    laser.style.left = `${startX}px`;
    laser.style.top = `${startY}px`;
    laser.style.transform = `rotate(${angle}deg)`;

    lasersContainer.appendChild(laser);
    setTimeout(() => {
        laser.remove();
        triggerScreenShake();
    }, 150);
}

function fireBossMegaBeam() {
    bossCharge = 0;
    bossChargeBar.style.width = '0%';

    const bossCenter = getBossCenter();
    const beam = document.createElement('div');
    beam.className = 'boss-mega-beam';
    beam.style.left = `${bossCenter.x}px`;
    lasersContainer.appendChild(beam);
    setTimeout(() => beam.remove(), 580);

    sounds.playExplosion();
    triggerScreenShake();
    spawnFloatingText(bossCenter.x, bossCenter.y + 55, '⚡ MEGA BEAM!', true);

    if (shieldActive) {
        shatterShield();
    } else {
        playerTakeHit();
    }
}

function spawnBossEscort() {
    if (!bossActive || !bossBattleStarted || !activeBossConfig.hasEscorts || bossHp <= 0 || !gameActive || gamePaused) return;
    if (activeBossConfig.escortsOnlyEnraged && !bossEnraged) return;
    const currentEscorts = words.filter(w => w.isEscort).length;
    if (currentEscorts >= activeBossConfig.maxEscorts) return;
    if (Math.random() > 0.72) return;

    const activeFirstLetters = words.map(w => w.word[0].toLowerCase());
    const shortPool = activeDictionary.filter(w => w.length <= 6 && !activeFirstLetters.includes(w[0].toLowerCase()));
    const fallbackPool = activeDictionary.filter(w => !activeFirstLetters.includes(w[0].toLowerCase()));
    const pool = shortPool.length > 0 ? shortPool : (fallbackPool.length > 0 ? fallbackPool : activeDictionary);
    const wordText = pool[Math.floor(Math.random() * pool.length)];

    const id = wordIdCounter++;
    const wingOffset = Math.random() < 0.5 ? -16 : 16;
    const xPercent = Math.max(12, Math.min(88, bossX + wingOffset));
    const yPx = 115;

    const element = document.createElement('div');
    element.className = 'enemy-word ship-scout';
    element.style.left = `${xPercent}%`;
    element.style.top = `${yPx}px`;

    const powerUp = choosePowerUp();
    const stageCfg = getCurrentStageConfig();
    let innerHTML = stageCfg.enemies.scout;
    if (powerUp === 'shield') {
        element.classList.add('shield-word');
        innerHTML += '<span class="shield-icon">🛡️ </span>';
    } else if (powerUp === 'emp') {
        element.classList.add('emp-word');
        innerHTML += '<span class="powerup-icon">❄️ </span>';
    } else if (powerUp === 'heal') {
        element.classList.add('heal-word');
        innerHTML += '<span class="powerup-icon">❤️ </span>';
    }

    innerHTML += '<div class="word-text-wrapper">';
    wordText.split('').forEach(char => {
        innerHTML += `<span class="untyped">${char}</span>`;
    });
    innerHTML += '</div>';

    element.innerHTML = innerHTML;
    wordsContainer.appendChild(element);

    words.push({
        id: id,
        word: wordText,
        element: element,
        x: xPercent,
        y: yPx,
        typedCount: 0,
        speed: baseSpeed * 0.9,
        powerUp: powerUp,
        isBossBomb: false,
        isEscort: true,
        isShieldBreaker: false
    });
}

function spawnBossShieldBreaker() {
    if (!bossActive || !bossShielded || bossHp <= 0 || !gameActive || gamePaused) return;

    const activeFirstLetters = words.map(w => w.word[0].toLowerCase());
    const breakerPool = activeDictionary.filter(w => w.length >= 6 && !activeFirstLetters.includes(w[0].toLowerCase()));
    const pool = breakerPool.length > 0 ? breakerPool : activeDictionary;
    const wordText = pool[Math.floor(Math.random() * pool.length)];

    const id = wordIdCounter++;
    const xPercent = bossX;
    const yPx = 125;

    const element = document.createElement('div');
    element.className = 'enemy-word shield-breaker';
    element.style.left = `${xPercent}%`;
    element.style.top = `${yPx}px`;

    let innerHTML = '<img src="assets/plasma-bomb.png" class="enemy-ship bomb-sprite" alt="">';
    innerHTML += '<span class="powerup-icon">🔓 </span>';
    innerHTML += '<div class="word-text-wrapper">';
    wordText.split('').forEach(char => {
        innerHTML += `<span class="untyped">${char}</span>`;
    });
    innerHTML += '</div>';

    element.innerHTML = innerHTML;
    wordsContainer.appendChild(element);

    words.push({
        id: id,
        word: wordText,
        element: element,
        x: xPercent,
        y: yPx,
        typedCount: 0,
        speed: 1.25 * baseSpeed,
        powerUp: 'none',
        isBossBomb: false,
        isEscort: false,
        isShieldBreaker: true
    });
}

function triggerBossBattle() {
    bossActive = true;
    bossBattleStarted = false;
    bossLevel++;
    activeBossConfig = BOSS_CONFIGS[(stage - 1) % BOSS_CONFIGS.length];
    bossMaxHp = 4 + bossLevel;
    bossHp = bossMaxHp;
    bossX = 50;
    bossDir = Math.random() < 0.5 ? 1 : -1;
    bossEnraged = false;
    bossShielded = false;
    bossShieldUsed = false;
    bossCharge = 0;

    clearInterval(spawnInterval);
    clearBossTimers();

    enemyBoss.style.left = '50%';
    enemyBoss.classList.remove('boss-hit', 'boss-enraged', 'boss-shielded', 'bank-left', 'bank-right', 'boss-stage-1', 'boss-stage-2', 'boss-stage-3', 'boss-blink');
    enemyBoss.classList.add('active', activeBossConfig.cssClass);
    bossNameLabel.innerText = activeBossConfig.name;
    bossChargeContainer.classList.toggle('hidden', !activeBossConfig.hasMegaBeam);
    bossHealthBar.style.width = '100%';
    bossChargeBar.style.width = '0%';

    stageBanner.innerText = `⚠️ BOSS: ${activeBossConfig.name}`;
    stageBanner.classList.add('active');
    setTimeout(() => stageBanner.classList.remove('active'), 2000);

    if (sounds.bgmEnabled) {
        sounds.bgmController.setTrack('boss');
    }

    sounds.playHit();
    triggerScreenShake();
    setTimeout(triggerScreenShake, 300);

    bossClearInterval = setInterval(() => {
        if (!gameActive) {
            clearBossTimers();
            return;
        }
        if (!gamePaused && words.length === 0) {
            clearInterval(bossClearInterval);
            bossClearInterval = null;
            bossBattleStarted = true;
            bossBombTimeout = setTimeout(spawnBossSalvo, 1500);
            if (activeBossConfig.hasEscorts) {
                bossEscortInterval = setInterval(spawnBossEscort, 5000);
            }
        }
    }, 200);
}

function spawnBossSalvo() {
    if (!bossActive || bossShielded || bossHp <= 0 || !gameActive || gamePaused) return;

    // Stage 3 Void Dreadnought (or Loop Bosses 3+) can launch 2 bombs at once when HP >= 2
    const salvoCount = ((activeBossConfig.dualSalvo || bossLevel >= 3) && bossHp >= 2) ? 2 : 1;
    const usedFirstLetters = new Set();

    for (let i = 0; i < salvoCount; i++) {
        const minLen = salvoCount > 1 ? 4 : 6;
        const maxLen = salvoCount > 1 ? 7 : 20;
        const bossDict = activeDictionary.filter(
            w => w.length >= minLen && w.length <= maxLen && !usedFirstLetters.has(w[0].toLowerCase())
        );
        const pool = bossDict.length > 0 ? bossDict : activeDictionary;
        const wordText = pool[Math.floor(Math.random() * pool.length)];
        usedFirstLetters.add(wordText[0].toLowerCase());

        const id = wordIdCounter++;
        let xPercent = bossX;
        if (salvoCount === 2) {
            const offset = i === 0 ? -12 : 12;
            xPercent = Math.max(14, Math.min(86, bossX + offset));
        }
        const yPx = 125;

        const element = document.createElement('div');
        element.className = 'enemy-word plasma-bomb';
        element.style.left = `${xPercent}%`;
        element.style.top = `${yPx}px`;

        let innerHTML = '<img src="assets/plasma-bomb.png" class="enemy-ship bomb-sprite" alt="">';
        innerHTML += '<div class="word-text-wrapper">';
        wordText.split('').forEach(char => {
            innerHTML += `<span class="untyped">${char}</span>`;
        });
        innerHTML += '</div>';

        element.innerHTML = innerHTML;
        wordsContainer.appendChild(element);

        const speed = (1.45 + Math.min(bossLevel * 0.1, 0.5)) * baseSpeed;

        words.push({
            id: id,
            word: wordText,
            element: element,
            x: xPercent,
            y: yPx,
            typedCount: 0,
            speed: speed,
            powerUp: 'none',
            isBossBomb: true
        });
    }
}

function defeatBoss() {
    bossActive = false;
    bossBattleStarted = false;
    bossDefeatedThisRun = true;
    bossEnraged = false;
    bossShielded = false;
    bossCharge = 0;
    bossChargeBar.style.width = '0%';
    clearBossTimers();

    // Clear any remaining escorts or boss projectiles triumphantly
    words.forEach(w => {
        const rect = w.element.getBoundingClientRect();
        const areaRect = gameArea.getBoundingClientRect();
        createExplosion((rect.left + rect.width / 2) - areaRect.left, (rect.top + rect.height / 2) - areaRect.top);
        w.element.remove();
    });
    words = [];
    targetedWord = null;
    updatePlanePosition();

    const bossCenter = getBossCenter();
    const centerX = bossCenter.x;
    const centerY = bossCenter.y;

    sounds.playExplosion();
    createExplosion(centerX, centerY);

    setTimeout(() => {
        sounds.playExplosion();
        createExplosion(centerX - 40, centerY - 15);
    }, 150);

    setTimeout(() => {
        sounds.playExplosion();
        createExplosion(centerX + 40, centerY - 15);
        triggerScreenShake();
    }, 300);

    setTimeout(() => {
        sounds.playExplosion();
        createExplosion(centerX, centerY - 30);
    }, 450);

    enemyBoss.classList.remove('active', 'bank-left', 'bank-right', 'boss-hit', 'boss-enraged', 'boss-shielded', 'boss-stage-1', 'boss-stage-2', 'boss-stage-3', 'boss-blink');

    stage++;
    applyStageTheme(true);

    const bossBonus = 500 + bossLevel * 100;
    score += bossBonus;
    scoreVal.innerText = score;
    spawnFloatingText(centerX, centerY + 30, `BOSS DEFEATED +${bossBonus}`, true);

    nextBossScore = score + 1000 + bossLevel * 250;
    baseSpeed += activeDifficulty.speedStep * 2;
    checkDifficultyProgression();

    clearInterval(spawnInterval);
    spawnInterval = setInterval(spawnWord, currentSpawnDelay);
}

function createExplosion(x, y) {
    const colors = ['#00f0ff', '#ff007f', '#fffb00', '#39ff14'];
    const particleCount = 15;

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        p.style.boxShadow = `0 0 10px ${p.style.backgroundColor}`;

        const angle = Math.random() * Math.PI * 2;
        const speed = 20 + Math.random() * 70;
        p.style.setProperty('--dx', `${Math.cos(angle) * speed}px`);
        p.style.setProperty('--dy', `${Math.sin(angle) * speed}px`);

        explosionsContainer.appendChild(p);
        setTimeout(() => p.remove(), 600);
    }
}

// --- Combo & Multiplier Engine ---

function incrementCombo() {
    comboStreak++;

    let nextMult = 1.0;
    if (comboStreak >= 50) nextMult = 5.0;
    else if (comboStreak >= 30) nextMult = 3.0;
    else if (comboStreak >= 20) nextMult = 2.0;
    else if (comboStreak >= 10) nextMult = 1.5;

    if (nextMult > scoreMultiplier) {
        sounds.playComboUp();

        comboHud.classList.add('level-up');
        setTimeout(() => {
            comboHud.classList.remove('level-up');
        }, 400);
    }

    scoreMultiplier = nextMult;
    updateComboUI();
}

function resetCombo() {
    comboStreak = 0;
    scoreMultiplier = 1.0;
    updateComboUI();
}

function updateComboUI() {
    if (comboStreak === 0) {
        comboHud.classList.remove('active');
        comboHud.style.opacity = '0';
        comboHud.style.transform = 'scale(0.8)';
    } else {
        comboHud.classList.add('active');
        comboVal.innerText = comboStreak;
        multVal.innerText = scoreMultiplier.toFixed(1);
    }
}

// --- Wire Event Listeners ---

window.addEventListener('keydown', handleKeyPress);
vocabSelect.addEventListener('change', () => {
    updateSectorBestBanner();
    updateCustomPanelVisibility();
});

startBtn.addEventListener('click', () => {
    sounds.init();
    startGame();
});

restartBtn.addEventListener('click', () => {
    sounds.init();
    startGame();
});

practiceMissedBtn.addEventListener('click', () => {
    sounds.init();
    startGame(lastMissedWords);
});

function returnToMenu() {
    gameActive = false;
    gamePaused = false;
    bossActive = false;
    bossBattleStarted = false;
    clearInterval(spawnInterval);
    cancelAnimationFrame(animationFrameId);
    clearBossTimers();
    clearEmpTimer();
    sounds.stopSpeech();
    sounds.bgmController.stop();

    words = [];
    targetedWord = null;
    wordsContainer.innerHTML = '';
    lasersContainer.innerHTML = '';
    explosionsContainer.innerHTML = '';
    playerShield.className = '';
    enemyBoss.classList.remove('active', 'bank-left', 'bank-right', 'boss-hit', 'boss-enraged', 'boss-shielded', 'boss-stage-1', 'boss-stage-2', 'boss-stage-3', 'boss-blink');
    stageBanner.classList.remove('active');

    pauseScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');
    updateSectorBestBanner();
    updateCustomPanelVisibility();
    startScreen.classList.add('active');
}

resumeBtn.addEventListener('click', () => {
    sounds.init();
    togglePause();
});

gameoverMenuBtn.addEventListener('click', returnToMenu);
pauseMenuBtn.addEventListener('click', returnToMenu);

document.getElementById('voice-toggle').addEventListener('click', () => sounds.toggleVoice());
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());

// Initialize start screen banner & custom words
loadCustomWordsUI();
updateCustomPanelVisibility();
updateSectorBestBanner();

function getAccuracy() {
    if (totalTyped === 0) return 100;
    return Math.max(0, Math.round(((totalTyped - errors) / totalTyped) * 100));
}

function updateStats() {
    if (!startTime) return;
    const elapsedMs = Date.now() - startTime - totalPausedMs;
    const elapsedMinutes = elapsedMs / 60000;
    if (elapsedMinutes > 0) {
        const wordsTyped = (totalTyped - errors) / 5;
        const wpm = Math.max(0, Math.round(wordsTyped / elapsedMinutes));
        wpmVal.innerText = wpm;
    }
    accVal.innerText = `${getAccuracy()}%`;
}

function renderPracticeWords() {
    practiceWordsContainer.innerHTML = '';
    const title = document.createElement('div');
    title.className = 'practice-title';

    const pills = document.createElement('div');
    pills.className = 'practice-pills';

    if (wordMistakes.size === 0) {
        title.innerText = 'VOCABULARY REPORT:';
        const pill = document.createElement('span');
        pill.className = 'practice-pill flawless';
        pill.innerText = '✨ FLAWLESS TYPING! NO MISSED WORDS';
        pills.appendChild(pill);
    } else {
        title.innerText = 'WORDS TO PRACTICE (CLICK TO HEAR & SEE MEANING):';
        const defBox = document.createElement('div');
        defBox.className = 'practice-definition-box';
        const topWords = Array.from(wordMistakes.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8);
        topWords.forEach(([word, count], idx) => {
            const pill = document.createElement('button');
            pill.type = 'button';
            pill.className = 'practice-pill';
            const def = WORD_DEFINITIONS[word] || 'Practice spelling and pronouncing this word!';
            pill.title = def;
            pill.innerText = count > 1 ? `🔊 ${word} (${count}×)` : `🔊 ${word}`;
            pill.addEventListener('click', () => {
                sounds.speakWord(word, true);
                defBox.innerText = `${word}: ${def}`;
            });
            if (idx === 0) {
                defBox.innerText = `${word}: ${def}`;
            }
            pills.appendChild(pill);
        });
        practiceWordsContainer.appendChild(title);
        practiceWordsContainer.appendChild(pills);
        practiceWordsContainer.appendChild(defBox);
        return;
    }

    practiceWordsContainer.appendChild(title);
    practiceWordsContainer.appendChild(pills);
}

function endGame() {
    gameActive = false;
    bossActive = false;
    bossBattleStarted = false;
    clearInterval(spawnInterval);
    cancelAnimationFrame(animationFrameId);
    clearBossTimers();
    clearEmpTimer();
    sounds.stopSpeech();
    sounds.bgmController.stop();
    enemyBoss.classList.remove('active', 'bank-left', 'bank-right', 'boss-hit', 'boss-enraged', 'boss-shielded', 'boss-stage-1', 'boss-stage-2', 'boss-stage-3', 'boss-blink');

    const runWpm = parseInt(wpmVal.innerText, 10) || 0;
    const runAcc = getAccuracy();
    const isNewRecord = practiceDrillMode ? false : saveSectorStats(activeSector, score, runWpm, runAcc);
    updateSectorBestBanner();

    lastMissedWords = Array.from(wordMistakes.keys());
    practiceMissedBtn.style.display = lastMissedWords.length > 0 ? 'inline-block' : 'none';

    if (window.ArcadeProfile && !practiceDrillMode) {
        window.ArcadeProfile.recordSession({
            gameId: 'plane',
            accuracy: runAcc,
            score,
            wpm: runWpm,
            missedItems: lastMissedWords,
            bossDefeated: bossDefeatedThisRun,
            badgeId: 'first_flight'
        });
    }

    finalScoreVal.innerText = score;
    finalWpmVal.innerText = runWpm;
    finalAccVal.innerText = `${runAcc}%`;
    finalStageVal.innerText = stage;
    finalWaveVal.innerText = wave;
    newRecordBadge.style.display = isNewRecord ? 'block' : 'none';

    renderPracticeWords();
    gameOverScreen.classList.add('active');
}
