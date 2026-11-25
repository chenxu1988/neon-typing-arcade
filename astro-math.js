// Astro Math Defense — Core Gameplay, Numpad, Hints & Progression (T3.2)
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

    toggleVoice() {
        this.voiceEnabled = !this.voiceEnabled;
        const btn = document.getElementById('voice-toggle');
        if (btn) {
            btn.innerText = this.voiceEnabled ? '🗣️ Voice: On' : '🔇 Voice: Off';
            btn.classList.toggle('active', this.voiceEnabled);
            btn.blur();
        }
        if (!this.voiceEnabled) this.stopSpeech();
    }
}

const sounds = new MathSoundManager();

const DIFFICULTY_PRESETS = {
    easy: { baseSpeed: 0.42, spawnMs: 3600, minSpawnMs: 2200, speedStep: 0.05 },
    normal: { baseSpeed: 0.65, spawnMs: 2900, minSpawnMs: 1700, speedStep: 0.07 },
    hard: { baseSpeed: 0.95, spawnMs: 2300, minSpawnMs: 1350, speedStep: 0.09 }
};

function generateMathProblem(topic) {
    if (topic === 'multiply') {
        const a = Math.floor(Math.random() * 11);
        const b = Math.floor(Math.random() * 11);
        return {
            text: `${a} × ${b} = ?`,
            answer: a * b,
            rows: a,
            cols: b,
            hint: `Hint: ${a} rows of ${b} dots`
        };
    }
    if (topic === 'divide') {
        const b = 1 + Math.floor(Math.random() * 10);
        const ans = 1 + Math.floor(Math.random() * 10);
        const a = b * ans;
        return {
            text: `${a} ÷ ${b} = ?`,
            answer: ans,
            rows: b,
            cols: ans,
            hint: `Hint: Think ${b} × ? = ${a}`
        };
    }
    if (topic === 'addsub') {
        if (Math.random() < 0.5) {
            const a = 12 + Math.floor(Math.random() * 75);
            const b = 10 + Math.floor(Math.random() * 65);
            return {
                text: `${a} + ${b} = ?`,
                answer: a + b,
                hint: `Hint: Add tens (${Math.floor(a / 10) * 10} + ${Math.floor(b / 10) * 10}), then ones!`
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
            hint: `Hint: Multiply ${a} × ${b} = ${a * b} first, then add ${c}.`
        };
    }
    return {
        text: `(${c} + ${a}) × ${b} = ?`,
        answer: (c + a) * b,
        hint: `Hint: Solve (${c} + ${a} = ${c + a}) inside parentheses first!`
    };
}

let gameActive = false;
let gamePaused = false;
let score = 0;
let wave = 1;
let lives = 3;
let combo = 0;
let multiplier = 1.0;
let totalAttempts = 0;
let wrongAttempts = 0;
let currentInput = '';
let meteors = [];
let meteorIdCounter = 0;
let missedFacts = new Map();
let activeDifficulty = DIFFICULTY_PRESETS.normal;
let baseSpeed = 0.65;
let spawnDelay = 2900;
let nextWaveScore = 200;
let bossActive = false;
let bossHp = 4;
let bossMaxHp = 4;
let nextBossScore = 500;
let bossDefeatedThisRun = false;
let spawnTimer = null;
let bossTimer = null;
let animFrameId = null;
let lastFrameTime = 0;
let hintTimeout = null;

const mathBoss = document.getElementById('math-boss');
const bossHealthBar = document.getElementById('boss-health-bar');

const gameArea = document.getElementById('game-area');
const meteorsContainer = document.getElementById('meteors-container');
const lasersContainer = document.getElementById('lasers-container');
const fxContainer = document.getElementById('fx-container');
const hintBanner = document.getElementById('hint-banner');
const topicSelect = document.getElementById('topic-select');
const difficultySelect = document.getElementById('difficulty-select');
const startScreen = document.getElementById('start-screen');
const pauseScreen = document.getElementById('pause-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const answerDisplay = document.getElementById('answer-input-display');
const scoreVal = document.getElementById('score-val');
const waveVal = document.getElementById('wave-val');
const accVal = document.getElementById('acc-val');
const comboHud = document.getElementById('combo-hud');
const comboVal = document.getElementById('combo-val');
const multVal = document.getElementById('mult-val');
const livesContainer = document.getElementById('lives-container');

function updateTopicBanner() {
    const profile = window.ArcadeProfile ? window.ArcadeProfile.loadProfile() : { games: {} };
    const stats = profile.games.astro_math || { bestScore: 0, bestAcc: 0 };
    document.getElementById('topic-best-banner').innerText = `BEST: ${stats.bestScore} PTS | ${stats.bestAcc}% ACC`;
}

function updateLivesUI() {
    const hearts = livesContainer.querySelectorAll('.heart');
    hearts.forEach((h, idx) => h.classList.toggle('active', idx < lives));
}

function updateStatsUI() {
    scoreVal.innerText = score;
    waveVal.innerText = wave;
    const acc = totalAttempts === 0 ? 100 : Math.max(0, Math.round(((totalAttempts - wrongAttempts) / totalAttempts) * 100));
    accVal.innerText = `${acc}%`;
    comboVal.innerText = combo;
    multVal.innerText = multiplier.toFixed(1);
    comboHud.classList.toggle('active', combo > 0);
}

function showHint(text, rows = 0, cols = 0) {
    if (!text) return;
    hintBanner.innerHTML = '';
    const msg = document.createElement('div');
    msg.innerText = text;
    hintBanner.appendChild(msg);

    if (rows > 0 && cols > 0 && rows <= 12 && cols <= 12) {
        const dotSize = cols > 8 ? 8 : 10;
        const grid = document.createElement('div');
        grid.className = 'array-grid-hint';
        grid.style.gridTemplateColumns = `repeat(${cols}, ${dotSize}px)`;
        for (let i = 0; i < rows * cols; i++) {
            const dot = document.createElement('span');
            dot.className = 'array-dot';
            if (cols > 8) {
                dot.style.width = '7px';
                dot.style.height = '7px';
            }
            grid.appendChild(dot);
        }
        hintBanner.appendChild(grid);
    }

    hintBanner.classList.add('active');
    if (hintTimeout) clearTimeout(hintTimeout);
    hintTimeout = setTimeout(() => hintBanner.classList.remove('active'), 3600);
}

function spawnFloatingText(x, y, text) {
    const el = document.createElement('div');
    el.className = 'floating-text';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.innerText = text;
    fxContainer.appendChild(el);
    setTimeout(() => el.remove(), 800);
}

function fireLaserAt(meteorEl) {
    const areaRect = gameArea.getBoundingClientRect();
    const mRect = meteorEl.getBoundingClientRect();
    const x1 = areaRect.width / 2;
    const y1 = areaRect.height - 108;
    const x2 = (mRect.left + mRect.width / 2) - areaRect.left;
    const y2 = (mRect.top + mRect.height / 2) - areaRect.top;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const beam = document.createElement('div');
    beam.className = 'laser-beam';
    beam.style.left = `${x1}px`;
    beam.style.top = `${y1}px`;
    beam.style.width = `${dist}px`;
    beam.style.transform = `rotate(${angle}deg)`;
    lasersContainer.appendChild(beam);
    setTimeout(() => beam.remove(), 170);

    return { x: x2, y: y2 };
}

function generateBossProblem(topic) {
    if (topic === 'multiply' || topic === 'divide') {
        const a = 2 + Math.floor(Math.random() * 8);
        const ans = 2 + Math.floor(Math.random() * 9);
        const prod = a * ans;
        if (Math.random() < 0.5) {
            return {
                text: `${a} × ? = ${prod}`,
                answer: ans,
                hint: `Boss Hint: Divide ${prod} ÷ ${a}`
            };
        }
        return {
            text: `${a} packs × ${ans} each = ?`,
            answer: prod,
            hint: `Boss Hint: Multiply ${a} × ${ans}`
        };
    }
    const base = generateMathProblem(topic);
    return {
        text: `BOSS: ${base.text}`,
        answer: base.answer,
        hint: base.hint
    };
}

function spawnMeteor() {
    if (!gameActive || gamePaused || bossActive) return;
    const prob = generateMathProblem(topicSelect.value);
    const id = meteorIdCounter++;
    const xPercent = 14 + Math.random() * 72;
    const yPx = -28;

    const el = document.createElement('div');
    el.className = 'meteor-card';
    el.style.left = `${xPercent}%`;
    el.style.top = `${yPx}px`;
    el.innerHTML = `<span class="meteor-icon">☄️</span><span class="meteor-eq">${prob.text}</span>`;
    meteorsContainer.appendChild(el);

    meteors.push({
        id,
        text: prob.text,
        answer: prob.answer,
        rows: prob.rows || 0,
        cols: prob.cols || 0,
        hint: prob.hint,
        element: el,
        x: xPercent,
        y: yPx,
        speed: baseSpeed + Math.random() * 0.25
    });
}

function spawnBossProblem() {
    if (!gameActive || gamePaused || !bossActive || bossHp <= 0) return;
    const salvoCount = (bossHp <= 2 && meteors.length === 0) ? 2 : 1;
    if (salvoCount === 2) showHint('⚡ MOTHERSHIP OVERDRIVE — DUAL SHOT!');

    for (let s = 0; s < salvoCount; s++) {
        const prob = generateBossProblem(topicSelect.value);
        const id = meteorIdCounter++;
        const xPercent = salvoCount === 2 ? (s === 0 ? 28 : 66) : (25 + Math.random() * 50);
        const yPx = 95;

        const el = document.createElement('div');
        el.className = 'meteor-card boss-problem';
        el.style.left = `${xPercent}%`;
        el.style.top = `${yPx}px`;
        el.innerHTML = `<span class="meteor-icon">⚡</span><span class="meteor-eq">${prob.text}</span>`;
        meteorsContainer.appendChild(el);

        meteors.push({
            id,
            text: prob.text,
            answer: prob.answer,
            hint: prob.hint,
            element: el,
            x: xPercent,
            y: yPx,
            speed: baseSpeed * 0.9,
            isBossProblem: true
        });
        if (s === 0 && sounds.speak) sounds.speak(prob.text);
    }
}

function triggerBoss() {
    bossActive = true;
    bossMaxHp = 5;
    bossHp = bossMaxHp;
    clearInterval(spawnTimer);
    mathBoss.classList.add('active');
    bossHealthBar.style.width = '100%';
    showHint('⚠️ CALCULATOR MOTHERSHIP INCOMING!');
    if (bossTimer) clearTimeout(bossTimer);
    bossTimer = setTimeout(spawnBossProblem, 1200);
}

function defeatBoss() {
    bossActive = false;
    bossDefeatedThisRun = true;
    if (bossTimer) clearTimeout(bossTimer);
    mathBoss.classList.remove('active');
    score += 200;
    nextBossScore = score + 600;
    sounds.playSuccess();
    spawnFloatingText(gameArea.clientWidth / 2, 70, 'BOSS DEFEATED +200');
    updateStatsUI();
    spawnTimer = setInterval(spawnMeteor, spawnDelay);
}

function gameLoop(timestamp) {
    if (!gameActive || gamePaused) return;

    const dt = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 16.667, 3) : 1;
    lastFrameTime = timestamp;

    const hitThreshold = gameArea.clientHeight - 132;

    for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.y += m.speed * dt;
        m.element.style.top = `${m.y}px`;

        if (m.y >= hitThreshold) {
            const wasBoss = m.isBossProblem;
            missedFacts.set(m.text, (missedFacts.get(m.text) || 0) + 1);
            showHint(`${m.text.replace('?', m.answer)} — ${m.hint}`);
            m.element.remove();
            meteors.splice(i, 1);

            combo = 0;
            multiplier = 1.0;
            lives--;
            sounds.playError();
            updateLivesUI();
            updateStatsUI();

            if (lives <= 0) {
                endGame();
                return;
            }
            if (wasBoss && bossActive && bossHp > 0) {
                bossTimer = setTimeout(spawnBossProblem, 1200);
            }
        }
    }

    animFrameId = requestAnimationFrame(gameLoop);
}

function appendDigit(digit) {
    if (!gameActive || gamePaused) return;
    if (currentInput.length >= 4) return;
    currentInput += digit;
    answerDisplay.innerText = currentInput;
    sounds.playClick();
}

function backspaceDigit() {
    if (!gameActive || gamePaused) return;
    currentInput = currentInput.slice(0, -1);
    answerDisplay.innerText = currentInput || '_';
}

function submitAnswer() {
    if (!gameActive || gamePaused || currentInput === '') return;
    const val = parseInt(currentInput, 10);
    currentInput = '';
    answerDisplay.innerText = '_';
    totalAttempts++;

    const matches = meteors.filter(m => m.answer === val);
    if (matches.length > 0) {
        matches.sort((a, b) => b.y - a.y);
        const target = matches[0];
        const pos = fireLaserAt(target.element);
        sounds.playSuccess();

        combo++;
        if (combo >= 15) multiplier = 3.0;
        else if (combo >= 8) multiplier = 2.0;
        else if (combo >= 4) multiplier = 1.5;

        const pts = Math.round(25 * multiplier);
        score += pts;
        spawnFloatingText(pos.x, pos.y, `+${pts}`);

        const wasBoss = target.isBossProblem;
        target.element.remove();
        meteors = meteors.filter(m => m.id !== target.id);

        if (wasBoss && bossActive) {
            bossHp--;
            bossHealthBar.style.width = `${Math.max(0, (bossHp / bossMaxHp) * 100)}%`;
            if (bossHp <= 0) {
                defeatBoss();
            } else if (!meteors.some(m => m.isBossProblem)) {
                bossTimer = setTimeout(spawnBossProblem, 1100);
            }
        } else if (score >= nextBossScore && !bossActive) {
            triggerBoss();
        } else if (score >= nextWaveScore) {
            wave++;
            nextWaveScore += 200 + wave * 50;
            baseSpeed += activeDifficulty.speedStep;
            spawnDelay = Math.max(activeDifficulty.minSpawnMs, spawnDelay - 160);
            clearInterval(spawnTimer);
            spawnTimer = setInterval(spawnMeteor, spawnDelay);
        }
    } else {
        wrongAttempts++;
        combo = 0;
        multiplier = 1.0;
        sounds.playError();
        if (meteors.length > 0) {
            const lowest = [...meteors].sort((a, b) => b.y - a.y)[0];
            missedFacts.set(lowest.text, (missedFacts.get(lowest.text) || 0) + 1);
            showHint(lowest.hint, lowest.rows, lowest.cols);
        }
    }

    updateStatsUI();
}

function startGame() {
    sounds.init();
    if (sounds.playGameStart) sounds.playGameStart('powerup');
    activeDifficulty = DIFFICULTY_PRESETS[difficultySelect.value] || DIFFICULTY_PRESETS.normal;
    baseSpeed = activeDifficulty.baseSpeed;
    spawnDelay = activeDifficulty.spawnMs;
    score = 0;
    wave = 1;
    nextWaveScore = 200;
    bossActive = false;
    bossDefeatedThisRun = false;
    nextBossScore = 500;
    if (bossTimer) clearTimeout(bossTimer);
    mathBoss.classList.remove('active');
    lives = 3;
    combo = 0;
    multiplier = 1.0;
    totalAttempts = 0;
    wrongAttempts = 0;
    currentInput = '';
    meteors = [];
    missedFacts = new Map();
    gameActive = true;
    gamePaused = false;

    meteorsContainer.innerHTML = '';
    lasersContainer.innerHTML = '';
    fxContainer.innerHTML = '';
    hintBanner.classList.remove('active');
    answerDisplay.innerText = '_';
    updateLivesUI();
    updateStatsUI();

    startScreen.classList.remove('active');
    pauseScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');

    if (sounds.bgmEnabled) sounds.bgmController.start();

    clearInterval(spawnTimer);
    spawnMeteor();
    spawnTimer = setInterval(spawnMeteor, spawnDelay);
    cancelAnimationFrame(animFrameId);
    lastFrameTime = performance.now();
    animFrameId = requestAnimationFrame(gameLoop);
}

function togglePause() {
    if (!gameActive) return;
    gamePaused = !gamePaused;
    if (gamePaused) {
        clearInterval(spawnTimer);
        sounds.bgmController.stop();
        pauseScreen.classList.add('active');
    } else {
        pauseScreen.classList.remove('active');
        if (sounds.bgmEnabled) sounds.bgmController.start();
        spawnTimer = setInterval(spawnMeteor, spawnDelay);
        lastFrameTime = performance.now();
        animFrameId = requestAnimationFrame(gameLoop);
    }
}

function endGame() {
    gameActive = false;
    bossActive = false;
    clearInterval(spawnTimer);
    if (bossTimer) clearTimeout(bossTimer);
    cancelAnimationFrame(animFrameId);
    mathBoss.classList.remove('active');
    sounds.bgmController.stop();

    const acc = totalAttempts === 0 ? 100 : Math.max(0, Math.round(((totalAttempts - wrongAttempts) / totalAttempts) * 100));
    const missedList = Array.from(missedFacts.keys());

    let isNewBest = false;
    if (window.ArcadeProfile) {
        const prev = window.ArcadeProfile.loadProfile().games.astro_math;
        isNewBest = score > (prev ? prev.bestScore : 0) && score > 0;
        window.ArcadeProfile.recordSession({
            gameId: 'astro_math',
            accuracy: acc,
            score,
            wpm: 0,
            missedItems: missedList,
            bossDefeated: bossDefeatedThisRun,
            badgeId: 'math_whiz'
        });
    }

    document.getElementById('final-score-val').innerText = score;
    document.getElementById('final-acc-val').innerText = `${acc}%`;
    document.getElementById('final-wave-val').innerText = wave;
    document.getElementById('new-record-badge').style.display = isNewBest ? 'block' : 'none';

    const container = document.getElementById('missed-facts-container');
    container.innerHTML = '';
    if (missedList.length === 0) {
        container.innerHTML = '<div class="practice-pills"><span class="practice-pill">✨ Flawless Math!</span></div>';
    } else {
        const pills = document.createElement('div');
        pills.className = 'practice-pills';
        missedList.slice(0, 8).forEach(fact => {
            const p = document.createElement('span');
            p.className = 'practice-pill';
            p.innerText = fact;
            pills.appendChild(p);
        });
        container.appendChild(pills);
    }

    gameOverScreen.classList.add('active');
}

function returnToMenu() {
    gameActive = false;
    gamePaused = false;
    clearInterval(spawnTimer);
    cancelAnimationFrame(animFrameId);
    sounds.bgmController.stop();
    pauseScreen.classList.remove('active');
    gameOverScreen.classList.remove('active');
    updateTopicBanner();
    startScreen.classList.add('active');
}

window.addEventListener('keydown', e => {
    if (!gameActive) return;
    if (e.key === 'Escape') {
        e.preventDefault();
        togglePause();
        return;
    }
    if (gamePaused) return;
    if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        appendDigit(e.key);
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        backspaceDigit();
    } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        submitAnswer();
    }
});

document.querySelectorAll('#numpad-grid [data-digit]').forEach(btn => {
    btn.addEventListener('click', () => appendDigit(btn.dataset.digit));
});
document.getElementById('clear-btn').addEventListener('click', backspaceDigit);
document.getElementById('fire-btn').addEventListener('click', submitAnswer);
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
document.getElementById('resume-btn').addEventListener('click', togglePause);
document.getElementById('pause-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('gameover-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('hud-pause-btn').addEventListener('click', (e) => { togglePause(); e.currentTarget.blur(); });
document.getElementById('voice-toggle').addEventListener('click', () => sounds.toggleVoice());
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());

updateTopicBanner();
