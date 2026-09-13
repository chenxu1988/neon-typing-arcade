// --- Word Dictionary ---
const dictionary = [
    "laser", "plasma", "meteor", "proton", "cosmos", "orbit", "vector", "matrix", "shield", "warp",
    "photon", "comet", "beacon", "energy", "fusion", "quantum", "gravity", "nebula", "galaxy", "rocket",
    "stellar", "neutron", "asteroid", "engine", "signal", "module", "system", "thruster", "sensor", "core",
    "nanite", "hologram", "cyberspace", "android", "titanium", "velocity", "generator", "overdrive", "catalyst", "hyperdrive",
    "horizon", "vortex", "starlight", "pulsar", "singularity", "dimension", "telemetry", "spectrum", "satellite", "atmosphere"
];

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

// Screen overlays
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
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
    
    // Reset Goal 2: Shield state
    shieldActive = false;
    playerShield.className = '';

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
    if (!gameActive) return;

    const randomIndex = Math.floor(Math.random() * dictionary.length);
    const text = dictionary[randomIndex];
    
    // Choose starting letter that isn't already spawned to avoid instant collision in lock-on
    const activeFirstLetters = words.map(w => w.word[0]);
    let wordText = text;
    if (activeFirstLetters.includes(text[0])) {
        // Find alternative
        const alternatives = dictionary.filter(w => !activeFirstLetters.includes(w[0]));
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
        isShield: isShieldWord
    });

    // Scale difficulty gradually
    if (score > 0 && score % 100 === 0) {
        baseSpeed += 0.05;
        scaleSpawnRate();
    }
}

function scaleSpawnRate() {
    currentSpawnDelay = Math.max(1200, currentSpawnDelay - 100);
    clearInterval(spawnInterval);
    spawnInterval = setInterval(spawnWord, currentSpawnDelay);
}

function gameLoop() {
    if (!gameActive) return;

    const areaHeight = gameArea.clientHeight;
    // Word hits bottom threshold (approx. plane position)
    const hitThreshold = areaHeight - 80;

    for (let i = words.length - 1; i >= 0; i--) {
        const w = words[i];
        w.y += w.speed;
        w.element.style.top = `${w.y}px`;

        if (w.y >= hitThreshold) {
            // Remove word
            w.element.remove();
            words.splice(i, 1);

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
        }
    }

    animationFrameId = requestAnimationFrame(gameLoop);
}

function playerTakeHit() {
    lives--;
    sounds.playHit();
    updateLivesUI();

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
    
    // Trigger CSS shatter animation
    playerShield.classList.remove('active');
    playerShield.classList.add('shattering');
    setTimeout(() => {
        playerShield.classList.remove('shattering');
    }, 400);
}

function activateShield() {
    shieldActive = true;
    sounds.playShieldUp();
    
    playerShield.classList.remove('shattering');
    playerShield.classList.add('active');
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

function handleKeyPress(e) {
    if (!gameActive) return;
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
            errors++;
        }
    } else {
        // Locked target active, compare key with next untyped letter
        const targetChar = targetedWord.word[targetedWord.typedCount].toLowerCase();
        if (typedChar === targetChar) {
            processCorrectChar();
        } else {
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

    // Draw thin laser beam element
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const laser = document.createElement('div');
    laser.className = 'laser';
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

    // Remove targeted word
    targetedWord.element.remove();
    words = words.filter(w => w.id !== targetedWord.id);
    
    score += targetedWord.word.length * 10;
    scoreVal.innerText = score;

    targetedWord = null;
    updatePlanePosition();
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
