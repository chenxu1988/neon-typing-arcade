// --- Word Dictionaries ---
const scifiDictionary = [
    "laser", "plasma", "meteor", "proton", "cosmos", "orbit", "vector", "matrix", "shield", "warp",
    "photon", "comet", "beacon", "energy", "fusion", "quantum", "gravity", "nebula", "galaxy", "rocket",
    "stellar", "neutron", "asteroid", "engine", "signal", "module", "system", "thruster", "sensor", "core",
    "nanite", "hologram", "cyberspace", "android", "titanium", "velocity", "generator", "overdrive", "catalyst", "hyperdrive",
    "horizon", "vortex", "starlight", "pulsar", "singularity", "dimension", "telemetry", "spectrum", "satellite", "atmosphere"
];

const lausdGrade3 = [
    "friend", "school", "because", "before", "people", "would", "about", "could", "write", "glowing",
    "character", "sentence", "paragraph", "author", "chapter", "compare", "contrast", "describe", "explain", "detail",
    "fraction", "multiply", "divide", "explore", "energy", "matter", "source", "nature", "history", "culture",
    "opinion", "purpose", "influence", "reason", "support", "creature", "habitat", "protect", "observe", "discover"
];

const lausdGrade4 = [
    "accident", "balance", "calmness", "daughter", "excitement", "frighten", "gather", "honest", "imagine", "journal",
    "boundary", "capture", "horizon", "constant", "telescope", "analyze", "conclude", "evidence", "inference", "summarize",
    "metaphor", "simile", "narrative", "dialogue", "adjective", "adverb", "pronoun", "preposition", "conjunction", "punctuation",
    "ecosystem", "producer", "consumer", "organism", "environment", "adaptation", "government", "constitution", "citizen", "heritage"
];

// Current active word pool
let activeDictionary = [];

// --- Game State Variables ---
let score = 0;
let lives = 3;
let totalTyped = 0;
let errors = 0;
let startTime = null;
let gameActive = false;
let words = [];
let targetedWord = null;
let wordIdCounter = 0;
let spawnInterval = null;
let animationFrameId = null;

// Goal 2: Shield state
let shieldActive = false;

// Goal 4: Combo and Multipliers
let comboStreak = 0;
let scoreMultiplier = 1.0;

// Extra Goals: Boss Battle state
let bossActive = false;
let bossHp = 5;
let bossMaxHp = 5;
let lastBossMilestone = 0;

// Extra Goals: Pause State
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
const wpmVal = document.getElementById('wpm-val');
const livesContainer = document.getElementById('lives-container');

// Goal 4: Combo HUD elements
const comboHud = document.getElementById('combo-hud');
const comboVal = document.getElementById('combo-val');
const multVal = document.getElementById('mult-val');

// Extra Goals: Boss HUD elements
const enemyBoss = document.getElementById('enemy-boss');
const bossHealthBar = document.getElementById('boss-health-bar');

// Screen overlays & Selectors
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const pauseScreen = document.getElementById('pause-screen');
const vocabSelect = document.getElementById('vocab-select');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const resumeBtn = document.getElementById('resume-btn');
const finalScoreVal = document.getElementById('final-score-val');
const finalWpmVal = document.getElementById('final-wpm-val');

// --- Standard HTML5 Audio Controller for bgm.ogg ---
class BGMController {
    constructor() {
        this.audio = new Audio('bgm.ogg');
        this.audio.loop = true;
        this.audio.volume = 0.25;
        this.isPlaying = false;
    }

    start() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.audio.play().catch(err => {
            console.log("Play deferred or bgm.ogg not found.", err);
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

    playLaser() {
        if (!this.soundEnabled) return;
        this.init();
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        // Laser "pew" frequency sweep
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
        
        // Synthesizing a low explosive rumble with bandpassed noise
        const bufferSize = this.ctx.sampleRate * 0.4; // 0.4s
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
        osc2.frequency.setValueAtTime(127, this.ctx.currentTime); // detuned low buzz

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

        // High sweeping chime for shield online
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

        // Low buzz + crash noise
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

        // Rapid series of 3 short ascending chime tones
        const time = this.ctx.currentTime;
        const freqs = [523.25, 659.25, 783.99]; // C5, E5, G5
        
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
}

const sounds = new SoundManager();

// --- Core Game Functions ---

function startGame() {
    score = 0;
    lives = 3;
    totalTyped = 0;
    errors = 0;
    startTime = new Date();
    targetedWord = null;
    words = [];
    baseSpeed = 1.0;
    currentSpawnDelay = 2200;
    gameActive = true;
    
    // Choose active vocabulary pool based on start-screen selector
    const selectedVocab = vocabSelect.value;
    if (selectedVocab === 'grade3') {
        activeDictionary = lausdGrade3;
    } else if (selectedVocab === 'grade4') {
        activeDictionary = lausdGrade4;
    } else {
        activeDictionary = scifiDictionary;
    }

    // Reset Goal 2: Shield state
    shieldActive = false;
    playerShield.className = '';

    // Reset Goal 4: Combo state
    comboStreak = 0;
    scoreMultiplier = 1.0;
    comboHud.className = 'hud-item';
    comboHud.style.opacity = '0';
    comboHud.style.transform = 'scale(0.8)';

    // Reset Boss Battle state
    bossActive = false;
    lastBossMilestone = 0;
    enemyBoss.classList.remove('active');

    // Reset Pause state
    gamePaused = false;
    pauseScreen.classList.remove('active');

    // Reset HUD
    scoreVal.innerText = "0";
    wpmVal.innerText = "0";
    updateLivesUI();

    // Clear containers
    wordsContainer.innerHTML = '';
    lasersContainer.innerHTML = '';
    explosionsContainer.innerHTML = '';

    // Hide screens
    startScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');

    // Align plane
    playerPlane.style.left = '50%';

    // Start Spawner and Loop
    if (spawnInterval) clearInterval(spawnInterval);
    spawnInterval = setInterval(spawnWord, currentSpawnDelay);
    
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(gameLoop);
}

function spawnWord() {
    if (!gameActive || bossActive || gamePaused) return;

    const randomIndex = Math.floor(Math.random() * activeDictionary.length);
    const text = activeDictionary[randomIndex];
    
    // Choose starting letter that isn't already spawned to avoid instant collision in lock-on
    const activeFirstLetters = words.map(w => w.word[0]);
    let wordText = text;
    if (activeFirstLetters.includes(text[0])) {
        // Find alternative
        const alternatives = activeDictionary.filter(w => !activeFirstLetters.includes(w[0]));
        if (alternatives.length > 0) {
            wordText = alternatives[Math.floor(Math.random() * alternatives.length)];
        }
    }

    const id = wordIdCounter++;
    const xPercent = 10 + Math.random() * 80; // 10% to 90%
    const yPx = -40; // Spawn off screen top (increased for ships)

    const element = document.createElement('div');
    element.className = 'enemy-word';
    element.style.left = `${xPercent}%`;
    element.style.top = `${yPx}px`;

    // Goal 2: 20% chance to designate as a Shield Word
    const isShieldWord = Math.random() < 0.20;

    // Goal 3: Determine ship class and structural HTML based on word length
    let shipClass = 'ship-scout';
    let shipHTML = '<div class="enemy-ship scout"><div class="thruster-glow-down"></div></div>';
    
    if (wordText.length > 5 && wordText.length <= 8) {
        shipClass = 'ship-fighter';
        shipHTML = '<div class="enemy-ship fighter"><div class="thruster-glow-down"></div></div>';
    } else if (wordText.length > 8) {
        shipClass = 'ship-elite';
        shipHTML = '<div class="enemy-ship elite"><div class="enemy-ship-body"></div><div class="enemy-ship-wings"></div><div class="thruster-glow-down"></div></div>';
    }
    
    element.classList.add(shipClass);

    // Set up nested inner HTML
    let innerHTML = shipHTML;
    
    if (isShieldWord) {
        element.classList.add('shield-word');
        innerHTML += '<span class="shield-icon">🛡️ </span>';
    }

    // Wrap word text inside a HUD banner
    innerHTML += '<div class="word-text-wrapper">';
    wordText.split('').forEach(char => {
        innerHTML += `<span class="untyped">${char}</span>`;
    });
    innerHTML += '</div>';

    element.innerHTML = innerHTML;
    wordsContainer.appendChild(element);

    const speed = baseSpeed + Math.random() * 0.4; // slight speed variance

    words.push({
        id: id,
        word: wordText,
        element: element,
        x: xPercent,
        y: yPx,
        typedCount: 0,
        speed: speed,
        isShield: isShieldWord,
        isBossBomb: false
    });

    // Scale difficulty gradually (only if no boss active)
    if (score > 0 && score % 100 === 0) {
        baseSpeed += 0.05;
        scaleSpawnRate();
    }
}

function scaleSpawnRate() {
    if (bossActive) return;
    currentSpawnDelay = Math.max(1200, currentSpawnDelay - 100);
    clearInterval(spawnInterval);
    spawnInterval = setInterval(spawnWord, currentSpawnDelay);
}

function gameLoop() {
    if (!gameActive || gamePaused) return;

    const areaHeight = gameArea.clientHeight;
    // Word hits bottom threshold (approx. plane position)
    const hitThreshold = areaHeight - 80;

    for (let i = words.length - 1; i >= 0; i--) {
        const w = words[i];
        w.y += w.speed;
        w.element.style.top = `${w.y}px`;

        if (w.y >= hitThreshold) {
            const wasBossBomb = w.isBossBomb;

            // Remove word
            w.element.remove();
            words.splice(i, 1);

            // Breach reset combo streak
            resetCombo();

            // Handle hit: shield active vs shield inactive
            if (shieldActive) {
                shatterShield();
            } else {
                playerTakeHit();
            }

            // If we just lost our active target, reset target
            if (targetedWord && targetedWord.id === w.id) {
                targetedWord = null;
                updatePlanePosition();
            }

            // If the boss bomb breached, let the boss spawn another after a short delay
            if (wasBossBomb && bossActive && bossHp > 0) {
                setTimeout(spawnBossBomb, 1500);
            }
        }
    }

    animationFrameId = requestAnimationFrame(gameLoop);
}

function playerTakeHit() {
    lives--;
    sounds.playHit();
    updateLivesUI();
    triggerScreenShake();

    // Flash screen red
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
    
    // Trigger CSS shatter animation
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
        pauseScreen.classList.add('active');
        clearInterval(spawnInterval);
        if (sounds.bgmEnabled) {
            sounds.bgmController.audio.pause();
        }
    } else {
        pauseScreen.classList.remove('active');
        if (sounds.bgmEnabled) {
            sounds.bgmController.audio.play().catch(e => console.log(e));
        }
        if (!bossActive) {
            spawnInterval = setInterval(spawnWord, currentSpawnDelay);
        }
        animationFrameId = requestAnimationFrame(gameLoop);
    }
}

function handleKeyPress(e) {
    if (!gameActive) return;
    
    // Pause key triggers (Escape only to avoid conflicts with typing 'p')
    if (e.key === 'Escape') {
        e.preventDefault();
        togglePause();
        return;
    }

    if (gamePaused) return; // ignore all other keypresses when paused
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt') return;

    sounds.init();

    // Prevent scrolling
    if (e.key === ' ') {
        e.preventDefault();
    }

    const typedChar = e.key.toLowerCase();
    totalTyped++;

    if (!targetedWord) {
        // Attempt to lock onto a new target starting with this letter
        const match = words.find(w => w.word[0].toLowerCase() === typedChar);
        if (match) {
            targetedWord = match;
            targetedWord.element.classList.add('targeted');
            processCorrectChar();
        } else {
            resetCombo();
            triggerScreenShake();
            errors++;
        }
    } else {
        // Locked target active, compare key with next untyped letter
        const targetChar = targetedWord.word[targetedWord.typedCount].toLowerCase();
        if (typedChar === targetChar) {
            processCorrectChar();
        } else {
            resetCombo();
            triggerScreenShake();
            errors++;
        }
    }

    updateStats();
}

function processCorrectChar() {
    // Select spans ignoring the shield-icon to match index accurately
    const spans = targetedWord.element.querySelectorAll('span:not(.shield-icon)');
    spans[targetedWord.typedCount].className = 'typed';
    
    targetedWord.typedCount++;

    // Increment combo streak!
    incrementCombo();

    // Fire laser from plane nose to the targeted word
    sounds.playLaser();
    fireLaser(targetedWord.element);

    // Dynamic plane tracking
    updatePlanePosition();

    if (targetedWord.typedCount >= targetedWord.word.length) {
        // Word complete, destroy it!
        destroyTarget();
    }
}

function fireLaser(wordElement) {
    const areaRect = gameArea.getBoundingClientRect();
    const planeRect = playerPlane.getBoundingClientRect();
    const wordRect = wordElement.getBoundingClientRect();

    // Plane nose coordinates relative to game area
    const x1 = (planeRect.left + planeRect.width / 2) - areaRect.left;
    const y1 = planeRect.top - areaRect.top;

    // Word target coordinates relative to game area
    const x2 = (wordRect.left + wordRect.width / 2) - areaRect.left;
    const y2 = (wordRect.top + wordRect.height / 2) - areaRect.top;

    // Draw laser beam
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const laser = document.createElement('div');
    
    // Goal 4: Assign dynamic laser classes based on multiplier strength
    let laserMultClass = 'mult-1';
    if (scoreMultiplier === 1.5) laserMultClass = 'mult-1-5';
    else if (scoreMultiplier === 2.0) laserMultClass = 'mult-2';
    else if (scoreMultiplier === 3.0) laserMultClass = 'mult-3';
    else if (scoreMultiplier === 5.0) laserMultClass = 'mult-5';

    laser.className = `laser ${laserMultClass}`;
    laser.style.width = `${distance}px`;
    laser.style.left = `${x1}px`;
    laser.style.top = `${y1}px`;
    laser.style.transform = `rotate(${angle}deg)`;

    lasersContainer.appendChild(laser);
    setTimeout(() => laser.remove(), 120);
}

function updatePlanePosition() {
    if (targetedWord) {
        playerPlane.style.left = `${targetedWord.x}%`;
    } else {
        playerPlane.style.left = '50%';
    }
}

function destroyTarget() {
    sounds.playExplosion();

    // Get pixel coordinates of destroyed word for explosion burst
    const areaRect = gameArea.getBoundingClientRect();
    const wordRect = targetedWord.element.getBoundingClientRect();
    const x = (wordRect.left + wordRect.width / 2) - areaRect.left;
    const y = (wordRect.top + wordRect.height / 2) - areaRect.top;

    createExplosion(x, y);

    // Goal 2: If we completed a Shield Word, activate the player's shield!
    if (targetedWord.isShield) {
        activateShield();
    }

    const wasBossBomb = targetedWord.isBossBomb;

    // Remove targeted word
    targetedWord.element.remove();
    words = words.filter(w => w.id !== targetedWord.id);
    
    // Goal 4: Award score multiplied by current multiplier
    const pointsGained = Math.round(targetedWord.word.length * 10 * scoreMultiplier);
    score += pointsGained;
    scoreVal.innerText = score;

    targetedWord = null;
    updatePlanePosition();

    // --- Extra Goals: Boss Battle Logic ---
    if (wasBossBomb && bossActive) {
        // Fire secondary quantum blast from the bomb explosion center up to the boss core!
        fireBossCoreLaser(x, y);
        
        bossHp--;
        bossHealthBar.style.width = `${(bossHp / bossMaxHp) * 100}%`;

        if (bossHp <= 0) {
            defeatBoss();
        } else {
            // Spawn next bomb after a short delay
            setTimeout(spawnBossBomb, 1500);
        }
    } else if (!bossActive) {
        // Trigger Boss Battle every 1000 points
        const scoreMilestone = Math.floor(score / 1000);
        if (scoreMilestone > lastBossMilestone) {
            lastBossMilestone = scoreMilestone;
            triggerBossBattle();
        }
    }
}

function fireBossCoreLaser(startX, startY) {
    // Boss core is at top center of game area
    const endX = gameArea.clientWidth / 2;
    const endY = 80; // approximate center Y of active boss

    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const laser = document.createElement('div');
    laser.className = 'laser mult-5'; // Massive heavy blast to the boss!
    laser.style.width = `${distance}px`;
    laser.style.left = `${startX}px`;
    laser.style.top = `${startY}px`;
    laser.style.transform = `rotate(${angle}deg)`;

    lasersContainer.appendChild(laser);
    setTimeout(() => {
        laser.remove();
        triggerScreenShake(); // shake screen when boss gets hit!
    }, 150);
}

function triggerBossBattle() {
    bossActive = true;
    bossHp = 5;
    bossMaxHp = 5;

    // Halt normal spawner
    clearInterval(spawnInterval);

    // Slide boss mothership in!
    enemyBoss.classList.add('active');
    bossHealthBar.style.width = '100%';

    // Shake screen dramatically on boss entrance
    sounds.playHit();
    triggerScreenShake();
    setTimeout(triggerScreenShake, 300);

    // Wait for existing normal words to clear before starting the assault
    const checkClear = setInterval(() => {
        if (words.length === 0) {
            clearInterval(checkClear);
            setTimeout(spawnBossBomb, 1800);
        }
    }, 200);
}

function spawnBossBomb() {
    if (!bossActive || bossHp <= 0 || !gameActive || gamePaused) return;

    // Pick a challenging medium/long word from the active pool
    const bossDict = activeDictionary.filter(w => w.length >= 6);
    const randomIndex = Math.floor(Math.random() * bossDict.length);
    const wordText = bossDict.length > 0 ? bossDict[randomIndex] : activeDictionary[Math.floor(Math.random() * activeDictionary.length)];

    const id = wordIdCounter++;
    const xPercent = 50; // Descends directly from boss core center!
    const yPx = 110; // Top coordinates under the boss cockpit

    const element = document.createElement('div');
    element.className = 'enemy-word plasma-bomb'; // Custom plasma styling
    element.style.left = `${xPercent}%`;
    element.style.top = `${yPx}px`;

    // Set up nested inner HTML (no standard ship, styled as a glowing projectile)
    let innerHTML = '<div class="enemy-ship scout" style="background-color: var(--neon-red); box-shadow: 0 0 15px var(--neon-red);"><div class="thruster-glow-down"></div></div>';
    
    // Wrap word text inside HUD banner
    innerHTML += '<div class="word-text-wrapper">';
    wordText.split('').forEach(char => {
        innerHTML += `<span class="untyped">${char}</span>`;
    });
    innerHTML += '</div>';

    element.innerHTML = innerHTML;
    wordsContainer.appendChild(element);

    // Plasma bombs travel fast!
    const speed = 1.6 * baseSpeed;

    words.push({
        id: id,
        word: wordText,
        element: element,
        x: xPercent,
        y: yPx,
        typedCount: 0,
        speed: speed,
        isShield: false,
        isBossBomb: true
    });
}

function defeatBoss() {
    bossActive = false;
    
    // Giant multiple explosions around the boss
    const centerX = gameArea.clientWidth / 2;
    const centerY = 80;

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

    // Slide boss out
    enemyBoss.classList.remove('active');

    // Massive score bonus!
    score += 500;
    scoreVal.innerText = score;

    // Increase base speed slightly to ramp up next wave
    baseSpeed += 0.2;

    // Resume standard spawning
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
        
        // Cleanup particle
        setTimeout(() => p.remove(), 600);
    }
}

// --- Goal 4: Combo & Multiplier Engine ---

function incrementCombo() {
    comboStreak++;
    
    // Calculate new multiplier
    let nextMult = 1.0;
    if (comboStreak >= 50) nextMult = 5.0;
    else if (comboStreak >= 30) nextMult = 3.0;
    else if (comboStreak >= 20) nextMult = 2.0;
    else if (comboStreak >= 10) nextMult = 1.5;

    // Check for multiplier level up
    if (nextMult > scoreMultiplier) {
        sounds.playComboUp();
        
        // Trigger CSS HUD bounce
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

startBtn.addEventListener('click', () => {
    sounds.init();
    startGame();
});

restartBtn.addEventListener('click', () => {
    sounds.init();
    startGame();
});

resumeBtn.addEventListener('click', () => {
    sounds.init();
    togglePause();
});

document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());

function updateStats() {
    if (!startTime) return;
    const elapsedMinutes = (new Date() - startTime) / 60000;
    if (elapsedMinutes > 0) {
        const wordsTyped = (totalTyped - errors) / 5;
        const wpm = Math.max(0, Math.round(wordsTyped / elapsedMinutes));
        wpmVal.innerText = wpm;
    }
}

function endGame() {
    gameActive = false;
    clearInterval(spawnInterval);
    cancelAnimationFrame(animationFrameId);

    // Fill Game Over modal details
    finalScoreVal.innerText = score;
    finalWpmVal.innerText = wpmVal.innerText;

    // Show game over modal
    gameOverScreen.classList.add('active');
}
