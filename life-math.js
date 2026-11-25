// Time, Money & Area Dash — Practical LAUSD Grade 3-5 Math (T4.3)
const LIFE_TRACKS = {
    main: {
        bpm: 132,
        leadWave: 'triangle',
        lead: [
            'F5', null, 'A5', 'C6', 'A5', null, 'G5', 'F5',
            'G5', null, 'E5', 'C5', 'F5', null, 'A5', null,
            'D5', null, 'F5', 'A5', 'G5', null, 'E5', 'D5',
            'C5', 'D5', 'E5', 'G5', 'F5', null, null, null
        ],
        bass: [
            'F2', 'F3', 'C3', 'F3', 'F2', 'F3', 'C3', 'F3',
            'C3', 'G3', 'C3', 'G3', 'F2', 'F3', 'C3', null,
            'D2', 'D3', 'A2', 'D3', 'G2', 'G3', 'D3', 'G3',
            'C3', 'G3', 'C3', 'E3', 'F2', null, null, null
        ]
    }
};

class LifeSoundManager extends window.ArcadeAudio.BaseSoundManager {
    constructor() {
        super(LIFE_TRACKS, 'main');
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
}

const sounds = new LifeSoundManager();

const TOTAL_ROUNDS = 10;
let gameActive = false;
let gamePaused = false;
let score = 0;
let roundIdx = 0;
let streak = 0;
let totalAttempts = 0;
let wrongAttempts = 0;
let currentChallenge = null;
let roundLocked = false;
let missedItems = new Set();

// Money & Grid state
let builtCents = 0;
let selectedCoins = [];
let selectedCells = new Set();

const modeSelect = document.getElementById('mode-select');
const startScreen = document.getElementById('start-screen');
const pauseScreen = document.getElementById('pause-screen');
const endScreen = document.getElementById('end-screen');
const modeTag = document.getElementById('mode-tag');
const challengePrompt = document.getElementById('challenge-prompt');
const visualWorkspace = document.getElementById('visual-workspace');
const inputWorkspace = document.getElementById('input-workspace');
const feedbackBar = document.getElementById('feedback-bar');

function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function formatCents(c) {
    if (c >= 100) {
        return `$${(c / 100).toFixed(2)}`;
    }
    return `${c}¢`;
}

function renderClockSVG(hour, minute) {
    const minAngle = minute * 6 - 90;
    const hrAngle = ((hour % 12) + minute / 60) * 30 - 90;
    const mx = Math.cos(minAngle * Math.PI / 180) * 68;
    const my = Math.sin(minAngle * Math.PI / 180) * 68;
    const hx = Math.cos(hrAngle * Math.PI / 180) * 46;
    const hy = Math.sin(hrAngle * Math.PI / 180) * 46;

    let nums = '';
    for (let n = 1; n <= 12; n++) {
        const a = (n * 30 - 90) * Math.PI / 180;
        const nx = Math.cos(a) * 76;
        const ny = Math.sin(a) * 76 + 5;
        nums += `<text x="${nx.toFixed(1)}" y="${ny.toFixed(1)}" fill="#1b5e20" font-size="14" font-weight="bold" text-anchor="middle">${n}</text>`;
    }

    return `<svg class="clock-svg" viewBox="-100 -100 200 200">
        <circle cx="0" cy="0" r="94" fill="#ffffff" stroke="#00e676" stroke-width="6"/>
        ${nums}
        <line x1="0" y1="0" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#102a24" stroke-width="6" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="${mx.toFixed(1)}" y2="${my.toFixed(1)}" stroke="#d32f2f" stroke-width="4" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="5" fill="#102a24"/>
    </svg>`;
}

function generateChallenge() {
    const sel = modeSelect.value;
    const modes = ['time', 'money', 'area'];
    const type = sel === 'mixed' ? modes[Math.floor(Math.random() * modes.length)] : sel;

    if (type === 'time') {
        const h = 1 + Math.floor(Math.random() * 12);
        const mins = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
        const m = mins[Math.floor(Math.random() * mins.length)];
        const fmt = (hr, mn) => `${hr}:${String(mn).padStart(2, '0')}`;
        const answer = fmt(h, m);

        const distractors = new Set([answer]);
        while (distractors.size < 4) {
            const dh = 1 + Math.floor(Math.random() * 12);
            const dm = mins[Math.floor(Math.random() * mins.length)];
            distractors.add(fmt(dh, dm));
        }

        return {
            type: 'time',
            tag: 'ANALOG CLOCK',
            label: `Clock ${answer}`,
            prompt: 'What time is shown on the clock?',
            hour: h,
            minute: m,
            answer,
            choices: shuffle(Array.from(distractors))
        };
    }

    if (type === 'money') {
        const target = (3 + Math.floor(Math.random() * 24)) * 5; // 15¢ to 130¢
        const isChange = Math.random() < 0.4 && target < 95;
        if (isChange) {
            const price = 100 - target;
            return {
                type: 'money',
                tag: 'MAKE CHANGE',
                label: `Change for $1 - ${price}¢`,
                prompt: `Item costs ${price}¢. Customer pays $1.00. Build the change (${formatCents(target)})!`,
                targetCents: target
            };
        }
        return {
            type: 'money',
            tag: 'COUNT COINS',
            label: `Build ${formatCents(target)}`,
            prompt: `Click coins to build exactly ${formatCents(target)}!`,
            targetCents: target
        };
    }

    // Area & Perimeter
    if (Math.random() < 0.55) {
        const areas = [4, 6, 8, 9, 10, 12, 15, 16];
        const targetArea = areas[Math.floor(Math.random() * areas.length)];
        return {
            type: 'area_build',
            tag: 'BUILD AREA',
            label: `Area = ${targetArea}`,
            prompt: `Click tiles on the 6×6 grid to cover an Area of ${targetArea} square units!`,
            targetArea
        };
    }
    const w = 2 + Math.floor(Math.random() * 4);
    const h = 2 + Math.floor(Math.random() * 3);
    const perim = 2 * (w + h);
    const distractors = new Set([perim]);
    while (distractors.size < 4) {
        distractors.add(Math.max(4, perim + (Math.floor(Math.random() * 7) - 3) * 2));
    }
    return {
        type: 'perim_calc',
        tag: 'PERIMETER',
        label: `Perimeter ${w}×${h}`,
        prompt: `Find the PERIMETER (total outside edge) of this ${w} × ${h} rectangle!`,
        w,
        h,
        answer: String(perim),
        choices: shuffle(Array.from(distractors).map(String))
    };
}

function updateHUD() {
    document.getElementById('score-val').innerText = score;
    document.getElementById('round-val').innerText = Math.min(roundIdx + 1, TOTAL_ROUNDS);
    const acc = totalAttempts === 0 ? 100 : Math.max(0, Math.round(((totalAttempts - wrongAttempts) / totalAttempts) * 100));
    document.getElementById('acc-val').innerText = `${acc}%`;
    document.getElementById('streak-val').innerText = streak;
}

function updateLifeBanner() {
    const profile = window.ArcadeProfile ? window.ArcadeProfile.loadProfile() : { games: {} };
    const stats = profile.games.life_math || { bestScore: 0, bestAcc: 0 };
    document.getElementById('life-best-banner').innerText = `BEST: ${stats.bestScore} PTS | ${stats.bestAcc}% ACC`;
}

function renderMoneyWorkspace() {
    visualWorkspace.innerHTML = `
        <div class="money-readout">${formatCents(builtCents)}</div>
        <div class="coin-tray">${selectedCoins.map(c => `<span class="coin-chip">${c >= 100 ? '$1' : c + '¢'}</span>`).join('')}</div>
    `;
}

function renderAreaGrid(interactive, highlightW = 0, highlightH = 0) {
    const grid = document.createElement('div');
    grid.className = 'unit-grid';
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 6; c++) {
            const idx = r * 6 + c;
            const cell = document.createElement('div');
            const isHighlighted = interactive ? selectedCells.has(idx) : (r < highlightH && c < highlightW);
            cell.className = `unit-cell${isHighlighted ? ' active' : ''}${interactive ? '' : ' locked'}`;
            if (interactive) {
                cell.addEventListener('click', () => {
                    if (!gameActive || gamePaused || roundLocked) return;
                    if (selectedCells.has(idx)) selectedCells.delete(idx);
                    else selectedCells.add(idx);
                    sounds.playClick();
                    renderAreaWorkspace();
                });
            }
            grid.appendChild(cell);
        }
    }
    return grid;
}

function renderAreaWorkspace() {
    visualWorkspace.innerHTML = '';
    visualWorkspace.appendChild(renderAreaGrid(true));
    const readout = document.createElement('div');
    readout.style.fontWeight = '900';
    readout.style.color = '#00e676';
    readout.innerText = `Selected Area: ${selectedCells.size} sq units`;
    visualWorkspace.appendChild(readout);
}

function loadNextChallenge() {
    if (!gameActive) return;
    if (roundIdx >= TOTAL_ROUNDS) {
        finishDash();
        return;
    }

    currentChallenge = generateChallenge();
    roundLocked = false;
    modeTag.innerText = currentChallenge.tag;
    challengePrompt.innerText = currentChallenge.prompt;
    feedbackBar.innerText = '';
    visualWorkspace.innerHTML = '';
    inputWorkspace.innerHTML = '';
    updateHUD();

    if (currentChallenge.type === 'time' || currentChallenge.type === 'perim_calc') {
        if (currentChallenge.type === 'time') {
            visualWorkspace.innerHTML = renderClockSVG(currentChallenge.hour, currentChallenge.minute);
        } else {
            visualWorkspace.appendChild(renderAreaGrid(false, currentChallenge.w, currentChallenge.h));
        }

        const row = document.createElement('div');
        row.className = 'choices-row';
        currentChallenge.choices.forEach((choice, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'choice-btn';
            btn.dataset.choice = choice;
            btn.innerText = currentChallenge.type === 'perim_calc' ? `${idx + 1}. ${choice} units` : `${idx + 1}. ${choice}`;
            btn.addEventListener('click', () => {
                if (roundLocked) return;
                roundLocked = true;
                const ok = choice === currentChallenge.answer;
                btn.classList.add(ok ? 'correct' : 'wrong');
                if (!ok) {
                    row.querySelectorAll('.choice-btn').forEach(b => {
                        if (b.dataset.choice === currentChallenge.answer) b.classList.add('correct');
                    });
                }
                finishRound(ok, `Answer: ${currentChallenge.answer}`);
            });
            row.appendChild(btn);
        });
        inputWorkspace.appendChild(row);
    } else if (currentChallenge.type === 'money') {
        builtCents = 0;
        selectedCoins = [];
        renderMoneyWorkspace();

        const coinsRow = document.createElement('div');
        coinsRow.className = 'coins-row';
        [
            { val: 25, label: '🪙 25¢' },
            { val: 10, label: '🪙 10¢' },
            { val: 5, label: '🪙 5¢' },
            { val: 1, label: '🪙 1¢' }
        ].forEach(c => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'coin-btn';
            b.innerText = c.label;
            b.addEventListener('click', () => {
                if (roundLocked) return;
                builtCents += c.val;
                selectedCoins.push(c.val);
                sounds.playClick();
                renderMoneyWorkspace();
            });
            coinsRow.appendChild(b);
        });

        const actRow = document.createElement('div');
        actRow.className = 'action-row';
        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'dash-btn secondary';
        clearBtn.innerText = 'CLEAR';
        clearBtn.addEventListener('click', () => {
            builtCents = 0;
            selectedCoins = [];
            renderMoneyWorkspace();
        });
        const subBtn = document.createElement('button');
        subBtn.type = 'button';
        subBtn.className = 'dash-btn';
        subBtn.innerText = 'SUBMIT COINS';
        subBtn.addEventListener('click', () => {
            if (roundLocked) return;
            roundLocked = true;
            finishRound(builtCents === currentChallenge.targetCents, `Needed ${formatCents(currentChallenge.targetCents)}.`);
        });
        actRow.appendChild(clearBtn);
        actRow.appendChild(subBtn);
        inputWorkspace.appendChild(coinsRow);
        inputWorkspace.appendChild(actRow);
    } else {
        selectedCells = new Set();
        renderAreaWorkspace();
        const actRow = document.createElement('div');
        actRow.className = 'action-row';
        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.className = 'dash-btn secondary';
        clearBtn.innerText = 'CLEAR';
        clearBtn.addEventListener('click', () => {
            selectedCells = new Set();
            renderAreaWorkspace();
        });
        const subBtn = document.createElement('button');
        subBtn.type = 'button';
        subBtn.className = 'dash-btn';
        subBtn.innerText = 'CHECK AREA';
        subBtn.addEventListener('click', () => {
            if (roundLocked) return;
            roundLocked = true;
            finishRound(selectedCells.size === currentChallenge.targetArea, `Needed ${currentChallenge.targetArea} square units.`);
        });
        actRow.appendChild(clearBtn);
        actRow.appendChild(subBtn);
        inputWorkspace.appendChild(actRow);
    }
}

function finishRound(isCorrect, hint) {
    totalAttempts++;
    if (isCorrect) {
        sounds.playSuccess();
        streak++;
        score += 100 + streak * 15;
        feedbackBar.innerText = '✅ Spot on!';
    } else {
        sounds.playError();
        wrongAttempts++;
        streak = 0;
        missedItems.add(currentChallenge.label);
        feedbackBar.innerText = `❌ ${hint}`;
    }
    updateHUD();
    roundIdx++;
    setTimeout(loadNextChallenge, 1150);
}

function startGame() {
    sounds.init();
    if (sounds.playGameStart) sounds.playGameStart('chime');
    score = 0;
    roundIdx = 0;
    streak = 0;
    totalAttempts = 0;
    wrongAttempts = 0;
    missedItems = new Set();
    gameActive = true;
    gamePaused = false;

    startScreen.classList.remove('active');
    pauseScreen.classList.remove('active');
    endScreen.classList.remove('active');
    loadNextChallenge();
    if (sounds.bgmEnabled) sounds.bgmController.start();
}

function finishDash() {
    gameActive = false;
    sounds.bgmController.stop();
    sounds.playFanfare([523.25, 659.25, 783.99, 1046.5]);

    const acc = totalAttempts === 0 ? 100 : Math.max(0, Math.round(((totalAttempts - wrongAttempts) / totalAttempts) * 100));
    let isNewBest = false;
    if (window.ArcadeProfile) {
        const prev = window.ArcadeProfile.loadProfile().games.life_math;
        isNewBest = score > (prev ? prev.bestScore : 0) && score > 0;
        window.ArcadeProfile.recordSession({
            gameId: 'life_math',
            accuracy: acc,
            score,
            wpm: 0,
            missedItems: Array.from(missedItems),
            badgeId: 'time_master'
        });
    }

    document.getElementById('new-record-badge').style.display = isNewBest ? 'block' : 'none';
    document.getElementById('final-score-val').innerText = score;
    document.getElementById('final-acc-val').innerText = `${acc}%`;

    const rev = document.getElementById('missed-review');
    rev.innerHTML = '';
    if (missedItems.size === 0) {
        rev.innerHTML = '<span class="missed-pill" style="border-color:#00e676;background:rgba(0,230,118,0.18)">✨ Flawless!</span>';
    } else {
        Array.from(missedItems).slice(0, 8).forEach(k => {
            const p = document.createElement('span');
            p.className = 'missed-pill';
            p.innerText = k;
            rev.appendChild(p);
        });
    }
    endScreen.classList.add('active');
}

function togglePause() {
    if (!gameActive) return;
    gamePaused = !gamePaused;
    if (gamePaused) {
        sounds.bgmController.stop();
        pauseScreen.classList.add('active');
    } else {
        pauseScreen.classList.remove('active');
        if (sounds.bgmEnabled) sounds.bgmController.start();
    }
}

function returnToMenu() {
    gameActive = false;
    gamePaused = false;
    sounds.bgmController.stop();
    pauseScreen.classList.remove('active');
    endScreen.classList.remove('active');
    updateLifeBanner();
    startScreen.classList.add('active');
}

window.addEventListener('keydown', e => {
    if (!gameActive) return;
    if (e.key === 'Escape') {
        e.preventDefault();
        togglePause();
        return;
    }
    if (gamePaused || roundLocked) return;
    if (/^[1-4]$/.test(e.key)) {
        const btns = inputWorkspace.querySelectorAll('.choice-btn');
        const idx = Number(e.key) - 1;
        if (btns[idx]) btns[idx].click();
    }
});

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
document.getElementById('resume-btn').addEventListener('click', togglePause);
document.getElementById('pause-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('end-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('hud-pause-btn').addEventListener('click', (e) => { togglePause(); e.currentTarget.blur(); });
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());

updateLifeBanner();
