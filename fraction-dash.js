// Fraction Pizza Dash — SVG Pizza Builder & Scaffold (T3.7)
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

let gameActive = false;
let gamePaused = false;
let totalSlices = 4;
let selectedSlices = new Set();

const pizzaSvg = document.getElementById('pizza-svg');
const pizzaReadout = document.getElementById('pizza-readout');
const startScreen = document.getElementById('start-screen');
const pauseScreen = document.getElementById('pause-screen');
const endScreen = document.getElementById('end-screen');

function renderPizzaSVG(denom, selectedSet, interactive = true) {
    pizzaSvg.innerHTML = '';
    const ns = 'http://www.w3.org/2000/svg';

    // Outer crust ring
    const crust = document.createElementNS(ns, 'circle');
    crust.setAttribute('cx', '0');
    crust.setAttribute('cy', '0');
    crust.setAttribute('r', '108');
    crust.setAttribute('fill', '#e65100');
    crust.setAttribute('stroke', '#ff9800');
    crust.setAttribute('stroke-width', '4');
    pizzaSvg.appendChild(crust);

    const r = 96;
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
                if (selectedSet.has(i)) selectedSet.delete(i);
                else selectedSet.add(i);
                sounds.playClick();
                renderPizzaSVG(denom, selectedSet, true);
            });
        }
        pizzaSvg.appendChild(path);

        if (isSelected) {
            const midA = (a1 + a2) / 2;
            const pep = document.createElementNS(ns, 'circle');
            pep.setAttribute('cx', (Math.cos(midA) * 56).toFixed(1));
            pep.setAttribute('cy', (Math.sin(midA) * 56).toFixed(1));
            pep.setAttribute('r', denom >= 8 ? '7' : '10');
            pep.setAttribute('fill', '#d32f2f');
            pep.setAttribute('pointer-events', 'none');
            pizzaSvg.appendChild(pep);
        }
    }

    pizzaReadout.innerText = `${selectedSet.size} / ${denom}`;
}

function updatePizzaBanner() {
    const profile = window.ArcadeProfile ? window.ArcadeProfile.loadProfile() : { games: {} };
    const stats = profile.games.fraction_dash || { bestScore: 0, bestAcc: 0 };
    document.getElementById('pizza-best-banner').innerText = `BEST: ${stats.bestScore} PTS | ${stats.bestAcc}% ACC`;
}

function startGame() {
    sounds.init();
    gameActive = true;
    gamePaused = false;
    selectedSlices = new Set();
    renderPizzaSVG(totalSlices, selectedSlices, true);
    startScreen.classList.remove('active');
    pauseScreen.classList.remove('active');
    endScreen.classList.remove('active');
    if (sounds.bgmEnabled) sounds.bgmController.start();
}

function returnToMenu() {
    gameActive = false;
    gamePaused = false;
    sounds.bgmController.stop();
    pauseScreen.classList.remove('active');
    endScreen.classList.remove('active');
    updatePizzaBanner();
    startScreen.classList.add('active');
}

document.querySelectorAll('.denom-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.denom-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        totalSlices = Number(btn.dataset.d);
        selectedSlices = new Set();
        renderPizzaSVG(totalSlices, selectedSlices, true);
    });
});
document.getElementById('clear-pizza-btn').addEventListener('click', () => {
    selectedSlices = new Set();
    renderPizzaSVG(totalSlices, selectedSlices, true);
});
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
document.getElementById('pause-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('end-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());

renderPizzaSVG(totalSlices, selectedSlices, true);
updatePizzaBanner();
