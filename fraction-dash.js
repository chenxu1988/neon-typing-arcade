// Fraction Pizza Dash — Challenge Modes: Build, Equivalent, Compare (T3.8)
const PIZZA_TRACKS = {
    main: {
        bpm: 136,
        leadWave: 'triangle',
        lead: [
            'G4', 'A4', 'B4', null, 'D5', null, 'B4', 'G4',
            'C5', null, 'E5', 'D5', 'B4', null, 'G4', null,
            'A4', 'B4', 'C5', null, 'D5', null, 'E5', 'D5',
            'B4', 'A4', 'G4', null, 'D5', null, null, null
        ],
        bass: [
            'G2', 'D3', 'G2', 'D3', 'G2', 'D3', 'G2', 'D3',
            'C3', 'G3', 'C3', 'G3', 'G2', 'D3', 'G2', null,
            'D3', 'A3', 'D3', 'A3', 'D3', 'A3', 'D3', 'A3',
            'G2', 'D3', 'G2', null, 'D3', null, null, null
        ]
    }
};

class PizzaSoundManager extends window.ArcadeAudio.BaseSoundManager {
    constructor() {
        super(PIZZA_TRACKS, 'main');
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

const sounds = new PizzaSoundManager();

const CUSTOMERS = ['🧑‍🚀', '🦕', '👩‍🔬', '🤖', '🦊', '🐼'];
const TOTAL_ORDERS = 10;

const BUILD_FRACTIONS = [
    [1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 6], [5, 6], [3, 8], [5, 8], [7, 8]
];

const EQUIV_PROBLEMS = [
    { num: 1, denom: 2, targetDenom: 4 },
    { num: 1, denom: 2, targetDenom: 6 },
    { num: 1, denom: 2, targetDenom: 8 },
    { num: 1, denom: 3, targetDenom: 6 },
    { num: 2, denom: 3, targetDenom: 6 },
    { num: 1, denom: 4, targetDenom: 8 },
    { num: 3, denom: 4, targetDenom: 8 }
];

const COMPARE_PROBLEMS = [
    { a: [1, 2], b: [1, 3], op: '>' },
    { a: [2, 4], b: [1, 2], op: '=' },
    { a: [2, 3], b: [3, 4], op: '<' },
    { a: [3, 6], b: [4, 8], op: '=' },
    { a: [5, 8], b: [1, 2], op: '>' },
    { a: [2, 8], b: [1, 3], op: '<' },
    { a: [3, 4], b: [5, 6], op: '<' },
    { a: [4, 6], b: [2, 3], op: '=' }
];

let gameActive = false;
let gamePaused = false;
let score = 0;
let orderIndex = 0;
let streak = 0;
let totalAttempts = 0;
let wrongAttempts = 0;
let totalSlices = 4;
let selectedSlices = new Set();
let currentOrder = null;
let orderLocked = false;
let missedOrders = new Set();
const ORDER_TIME_MS = 18000;
let orderRemainingMs = ORDER_TIME_MS;
let timerInterval = null;

const timerBar = document.getElementById('timer-bar');

const pizzaSvg = document.getElementById('pizza-svg');
const pizzaReadout = document.getElementById('pizza-readout');
const modeSelect = document.getElementById('mode-select');
const startScreen = document.getElementById('start-screen');
const pauseScreen = document.getElementById('pause-screen');
const endScreen = document.getElementById('end-screen');
const builderControls = document.getElementById('builder-controls');
const compareControls = document.getElementById('compare-controls');
const feedbackBar = document.getElementById('feedback-bar');
const orderTag = document.getElementById('order-mode-tag');
const orderPrompt = document.getElementById('order-prompt');
const customerAvatar = document.getElementById('customer-avatar');

function renderPizzaSVG(denom, selectedSet, interactive = true) {
    pizzaSvg.innerHTML = '';
    const ns = 'http://www.w3.org/2000/svg';

    const crust = document.createElementNS(ns, 'circle');
    crust.setAttribute('cx', '0');
    crust.setAttribute('cy', '0');
    crust.setAttribute('r', '108');
    crust.setAttribute('fill', '#e65100');
    crust.setAttribute('stroke', '#ff9800');
    crust.setAttribute('stroke-width', '4');
    pizzaSvg.appendChild(crust);

    const r = 96;
    if (denom <= 1) {
        const whole = document.createElementNS(ns, 'circle');
        whole.setAttribute('cx', '0');
        whole.setAttribute('cy', '0');
        whole.setAttribute('r', String(r));
        whole.setAttribute('fill', '#4a2030');
        whole.setAttribute('stroke', '#2b121d');
        whole.setAttribute('stroke-width', '3');
        if (interactive) {
            whole.setAttribute('class', 'pizza-slice');
            whole.addEventListener('click', () => {
                feedbackBar.innerText = '🔪 Pick how many SLICES to cut first!';
                sounds.playClick();
            });
        }
        pizzaSvg.appendChild(whole);
        pizzaReadout.innerText = 'Uncut Pizza — Pick Slices!';
        return;
    }

    for (let i = 0; i < denom; i++) {
        const a1 = (i / denom) * Math.PI * 2 - Math.PI / 2;
        const a2 = ((i + 1) / denom) * Math.PI * 2 - Math.PI / 2;
        const x1 = Math.cos(a1) * r;
        const y1 = Math.sin(a1) * r;
        const x2 = Math.cos(a2) * r;
        const y2 = Math.sin(a2) * r;
        const largeArc = (a2 - a1) > Math.PI ? 1 : 0;

        const path = document.createElementNS(ns, 'path');
        path.setAttribute('d', `M 0 0 L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`);
        const isSelected = selectedSet.has(i);
        path.setAttribute('fill', isSelected ? '#ffeb3b' : '#4a2030');
        path.setAttribute('stroke', '#2b121d');
        path.setAttribute('stroke-width', '3');
        if (interactive) {
            path.setAttribute('class', 'pizza-slice');
            path.addEventListener('click', () => {
                if (!gameActive || gamePaused || orderLocked) return;
                if (selectedSet.has(i)) selectedSet.delete(i);
                else selectedSet.add(i);
                sounds.playClick();
                renderPizzaSVG(denom, selectedSet, true);
            });
        }
        pizzaSvg.appendChild(path);

        if (isSelected) {
            const midA = (a1 + a2) / 2;
            const tx = (Math.cos(midA) * 56).toFixed(1);
            const ty = (Math.sin(midA) * 56).toFixed(1);
            const topping = window.ArcadeProfile ? window.ArcadeProfile.loadProfile().equipped.pizza : null;
            if (topping === 'pizza_mushroom' || topping === 'pizza_star') {
                const icon = document.createElementNS(ns, 'text');
                icon.setAttribute('x', tx);
                icon.setAttribute('y', String(Number(ty) + 6));
                icon.setAttribute('font-size', denom >= 8 ? '14' : '19');
                icon.setAttribute('text-anchor', 'middle');
                icon.setAttribute('pointer-events', 'none');
                icon.textContent = topping === 'pizza_mushroom' ? '🍄' : '⭐';
                pizzaSvg.appendChild(icon);
            } else {
                const pep = document.createElementNS(ns, 'circle');
                pep.setAttribute('cx', tx);
                pep.setAttribute('cy', ty);
                pep.setAttribute('r', denom >= 8 ? '7' : '10');
                pep.setAttribute('fill', '#d32f2f');
                pep.setAttribute('pointer-events', 'none');
                pizzaSvg.appendChild(pep);
            }
        }
    }

    pizzaReadout.innerText = `${selectedSet.size} / ${denom}`;
}

function setActiveDenominator(d) {
    totalSlices = d;
    selectedSlices = new Set();
    document.querySelectorAll('.denom-btn').forEach(b => {
        b.classList.toggle('active', Number(b.dataset.d) === d);
    });
    renderPizzaSVG(totalSlices, selectedSlices, true);
}

function updateHUD() {
    document.getElementById('score-val').innerText = score;
    document.getElementById('order-val').innerText = Math.min(orderIndex + 1, TOTAL_ORDERS);
    const acc = totalAttempts === 0 ? 100 : Math.max(0, Math.round(((totalAttempts - wrongAttempts) / totalAttempts) * 100));
    document.getElementById('acc-val').innerText = `${acc}%`;
    document.getElementById('streak-val').innerText = streak;
}

function generateOrder() {
    const selectedMode = modeSelect.value;
    const modes = ['build', 'equiv', 'compare'];
    const type = selectedMode === 'mixed' ? modes[Math.floor(Math.random() * modes.length)] : selectedMode;

    if (type === 'build') {
        const [num, denom] = BUILD_FRACTIONS[Math.floor(Math.random() * BUILD_FRACTIONS.length)];
        return {
            type: 'build',
            tag: 'BUILD FRACTION',
            label: `${num}/${denom}`,
            prompt: `Serve me ${num}/${denom} of a pizza!`,
            num,
            denom
        };
    }
    if (type === 'equiv') {
        const eq = EQUIV_PROBLEMS[Math.floor(Math.random() * EQUIV_PROBLEMS.length)];
        return {
            type: 'equiv',
            tag: 'EQUIVALENT FRACTION',
            label: `${eq.num}/${eq.denom} = ?/${eq.targetDenom}`,
            prompt: `Build a pizza with ${eq.targetDenom} slices equal to ${eq.num}/${eq.denom}!`,
            num: eq.num,
            denom: eq.denom,
            targetDenom: eq.targetDenom
        };
    }
    const cmp = COMPARE_PROBLEMS[Math.floor(Math.random() * COMPARE_PROBLEMS.length)];
    return {
        type: 'compare',
        tag: 'COMPARE FRACTIONS',
        label: `${cmp.a[0]}/${cmp.a[1]} ? ${cmp.b[0]}/${cmp.b[1]}`,
        prompt: `Compare: ${cmp.a[0]}/${cmp.a[1]}  [ ? ]  ${cmp.b[0]}/${cmp.b[1]}`,
        a: cmp.a,
        b: cmp.b,
        op: cmp.op
    };
}

function startOrderTimer() {
    clearInterval(timerInterval);
    orderRemainingMs = ORDER_TIME_MS;
    timerBar.style.width = '100%';
    timerInterval = setInterval(() => {
        if (!gameActive || gamePaused || orderLocked) return;
        orderRemainingMs -= 100;
        timerBar.style.width = `${Math.max(0, (orderRemainingMs / ORDER_TIME_MS) * 100)}%`;
        if (orderRemainingMs <= 0) {
            clearInterval(timerInterval);
            handleOrderResult(false, `Time's up! Order was ${currentOrder.label}.`);
        }
    }, 100);
}

function loadNextOrder() {
    if (!gameActive) return;
    if (orderIndex >= TOTAL_ORDERS) {
        finishShift();
        return;
    }

    currentOrder = generateOrder();
    orderLocked = false;
    customerAvatar.innerText = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
    orderTag.innerText = currentOrder.tag;
    orderPrompt.innerText = currentOrder.prompt;
    feedbackBar.innerText = '';
    updateHUD();
    startOrderTimer();

    if (currentOrder.type === 'compare') {
        builderControls.style.display = 'none';
        compareControls.style.display = 'flex';
        const previewSet = new Set();
        for (let i = 0; i < currentOrder.a[0]; i++) previewSet.add(i);
        renderPizzaSVG(currentOrder.a[1], previewSet, false);
        pizzaReadout.innerText = `${currentOrder.a[0]}/${currentOrder.a[1]}  vs  ${currentOrder.b[0]}/${currentOrder.b[1]}`;
    } else {
        compareControls.style.display = 'none';
        builderControls.style.display = 'flex';
        setActiveDenominator(1);
    }
}

function handleOrderResult(isCorrect, hintText) {
    orderLocked = true;
    clearInterval(timerInterval);
    totalAttempts++;
    if (isCorrect) {
        sounds.playSuccess();
        streak++;
        score += 100 + streak * 15;
        feedbackBar.innerText = `✅ Delicious! Exact fraction!`;
    } else {
        sounds.playError();
        wrongAttempts++;
        streak = 0;
        missedOrders.add(currentOrder.label);
        feedbackBar.innerText = `❌ ${hintText}`;
    }
    updateHUD();
    orderIndex++;
    setTimeout(loadNextOrder, 1150);
}

function servePizzaOrder() {
    if (!gameActive || gamePaused || orderLocked || !currentOrder || currentOrder.type === 'compare') return;
    if (totalSlices <= 1) {
        feedbackBar.innerText = '🔪 Pick how many SLICES to cut first!';
        sounds.playError();
        return;
    }
    const builtVal = selectedSlices.size / totalSlices;
    const targetVal = currentOrder.num / currentOrder.denom;
    const isEqual = Math.abs(builtVal - targetVal) < 1e-6;

    if (currentOrder.type === 'equiv') {
        const ok = isEqual && totalSlices === currentOrder.targetDenom;
        handleOrderResult(ok, `Set slices to ${currentOrder.targetDenom} and pick ${(currentOrder.num * currentOrder.targetDenom) / currentOrder.denom} slices.`);
    } else {
        handleOrderResult(isEqual, `Needed ${currentOrder.num}/${currentOrder.denom} (${currentOrder.num} of ${currentOrder.denom} slices).`);
    }
}

function submitCompare(op) {
    if (!gameActive || gamePaused || orderLocked || !currentOrder || currentOrder.type !== 'compare') return;
    const ok = op === currentOrder.op;
    handleOrderResult(ok, `${currentOrder.a[0]}/${currentOrder.a[1]} ${currentOrder.op} ${currentOrder.b[0]}/${currentOrder.b[1]}`);
}

function updatePizzaBanner() {
    const profile = window.ArcadeProfile ? window.ArcadeProfile.loadProfile() : { games: {} };
    const stats = profile.games.fraction_dash || { bestScore: 0, bestAcc: 0 };
    document.getElementById('pizza-best-banner').innerText = `BEST: ${stats.bestScore} PTS | ${stats.bestAcc}% ACC`;
}

function startGame() {
    sounds.init();
    score = 0;
    orderIndex = 0;
    streak = 0;
    totalAttempts = 0;
    wrongAttempts = 0;
    missedOrders = new Set();
    gameActive = true;
    gamePaused = false;

    startScreen.classList.remove('active');
    pauseScreen.classList.remove('active');
    endScreen.classList.remove('active');
    loadNextOrder();
    if (sounds.bgmEnabled) sounds.bgmController.start();
}

function finishShift() {
    gameActive = false;
    clearInterval(timerInterval);
    sounds.bgmController.stop();
    sounds.playFanfare([523.25, 659.25, 783.99, 1046.5]);

    const acc = totalAttempts === 0 ? 100 : Math.max(0, Math.round(((totalAttempts - wrongAttempts) / totalAttempts) * 100));
    let isNewBest = false;
    if (window.ArcadeProfile) {
        const prev = window.ArcadeProfile.loadProfile().games.fraction_dash;
        isNewBest = score > (prev ? prev.bestScore : 0) && score > 0;
        window.ArcadeProfile.recordSession({
            gameId: 'fraction_dash',
            accuracy: acc,
            score,
            wpm: 0,
            missedItems: Array.from(missedOrders),
            badgeId: 'fraction_chef'
        });
    }

    document.getElementById('new-record-badge').style.display = isNewBest ? 'block' : 'none';
    document.getElementById('final-score-val').innerText = score;
    document.getElementById('final-acc-val').innerText = `${acc}%`;

    const review = document.getElementById('missed-fractions');
    review.innerHTML = '';
    if (missedOrders.size === 0) {
        review.innerHTML = '<span class="missed-pill" style="border-color:#4caf50;background:rgba(76,175,80,0.2)">✨ Master Fraction Chef!</span>';
    } else {
        Array.from(missedOrders).slice(0, 8).forEach(lbl => {
            const p = document.createElement('span');
            p.className = 'missed-pill';
            p.innerText = lbl;
            review.appendChild(p);
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
    clearInterval(timerInterval);
    sounds.bgmController.stop();
    pauseScreen.classList.remove('active');
    endScreen.classList.remove('active');
    updatePizzaBanner();
    startScreen.classList.add('active');
}

window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && gameActive) {
        e.preventDefault();
        togglePause();
    }
});

document.querySelectorAll('.denom-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!gameActive || gamePaused || orderLocked) return;
        setActiveDenominator(Number(btn.dataset.d));
    });
});
document.querySelectorAll('#compare-controls .compare-btn').forEach(btn => {
    btn.addEventListener('click', () => submitCompare(btn.dataset.op));
});
document.getElementById('clear-pizza-btn').addEventListener('click', () => {
    selectedSlices = new Set();
    renderPizzaSVG(totalSlices, selectedSlices, true);
});
document.getElementById('serve-btn').addEventListener('click', servePizzaOrder);
document.getElementById('resume-btn').addEventListener('click', togglePause);
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
document.getElementById('pause-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('end-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());

renderPizzaSVG(totalSlices, selectedSlices, true);
updatePizzaBanner();
