// Science Explorer — LAUSD Grade 3-5 STEM Rover Expedition (T4.1)
const SCI_TRACKS = {
    main: {
        bpm: 130,
        leadWave: 'triangle',
        lead: [
            'E5', null, 'G5', 'B5', 'A5', null, 'G5', 'E5',
            'D5', null, 'Fs5', 'A5', 'G5', null, 'E5', null,
            'C5', null, 'E5', 'G5', 'B5', null, 'A5', 'G5',
            'Fs5', 'E5', 'D5', 'B4', 'E5', null, null, null
        ],
        bass: [
            'E2', 'E3', 'B2', 'E3', 'E2', 'E3', 'B2', 'E3',
            'D2', 'D3', 'A2', 'D3', 'E2', 'E3', 'B2', null,
            'C2', 'C3', 'G2', 'C3', 'G2', 'G3', 'D3', 'G3',
            'B2', 'Fs4', 'B2', 'D3', 'E2', null, null, null
        ]
    }
};

class SciSoundManager extends window.ArcadeAudio.BaseSoundManager {
    constructor() {
        super(SCI_TRACKS, 'main');
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

const sounds = new SciSoundManager();

// Question bank loaded from db/science-bank.js
const SCIENCE_BANK = window.ArcadeDB.scienceBank;

function renderScienceDiagram(q) {
    const hotspotHint = q.interactive
        ? '<text x="110" y="155" fill="#76ff03" font-size="9.5" text-anchor="middle" font-weight="bold">👆 TIP: CLICK DIAGRAM OR PICK 1–4</text>'
        : '';
    if (q.topic === 'solar') {
        return `<svg viewBox="0 0 220 160">
            <circle cx="42" cy="80" r="26" fill="#ffca28" class="svg-hotspot" data-choice="Sun" style="cursor:pointer"/>
            <ellipse cx="110" cy="80" rx="58" ry="26" fill="none" stroke="#4dd0e1" stroke-dasharray="4 4"/>
            <ellipse cx="122" cy="80" rx="88" ry="44" fill="none" stroke="#80deea" stroke-dasharray="4 4"/>
            <circle cx="96" cy="57" r="8" fill="#90a4ae" class="svg-hotspot" data-choice="Mercury" style="cursor:pointer"/>
            <circle cx="152" cy="100" r="11" fill="#29b6f6" class="svg-hotspot" data-choice="Earth" style="cursor:pointer"/>
            <circle cx="195" cy="60" r="15" fill="#ffb74d" class="svg-hotspot" data-choice="Jupiter" style="cursor:pointer"/>
            <text x="42" y="122" fill="#ffca28" font-size="11" text-anchor="middle">SUN</text>
            <text x="152" y="130" fill="#80deea" font-size="11" text-anchor="middle">ORBITS</text>
            ${hotspotHint}
        </svg>`;
    }
    if (q.topic === 'foodchain') {
        return `<svg viewBox="0 0 240 160">
            <circle cx="34" cy="40" r="18" fill="#ffca28" class="svg-hotspot" data-choice="Sun" style="cursor:pointer"/>
            <text x="34" y="45" font-size="18" text-anchor="middle" pointer-events="none">☀️</text>
            <text x="65" y="45" fill="#76ff03" font-size="18">→</text>
            <text x="102" y="48" font-size="24" text-anchor="middle" class="svg-hotspot" data-choice="Producers" style="cursor:pointer">🌿</text>
            <text x="132" y="45" fill="#76ff03" font-size="18">→</text>
            <text x="166" y="48" font-size="24" text-anchor="middle" class="svg-hotspot" data-choice="Herbivore" style="cursor:pointer">🐇</text>
            <text x="195" y="45" fill="#76ff03" font-size="18">→</text>
            <text x="220" y="48" font-size="22" text-anchor="middle" class="svg-hotspot" data-choice="Apex predator" style="cursor:pointer">🦅</text>
            <text x="120" y="110" fill="#80deea" font-size="13" text-anchor="middle" font-weight="bold">ENERGY FLOW IN ECOSYSTEM</text>
            ${q.interactive ? '<text x="120" y="140" fill="#76ff03" font-size="9.5" text-anchor="middle" font-weight="bold">👆 CLICK ORGANISM OR PICK 1–4</text>' : ''}
        </svg>`;
    }
    if (q.topic === 'watercycle') {
        return `<svg viewBox="0 0 220 160">
            <circle cx="38" cy="34" r="16" fill="#ffca28"/>
            <rect x="0" y="125" width="220" height="35" fill="#0288d1" rx="6" class="svg-hotspot" data-choice="Collection" style="cursor:pointer"/>
            <ellipse cx="145" cy="40" rx="34" ry="16" fill="#eceff1" class="svg-hotspot" data-choice="Condensation" style="cursor:pointer"/>
            <path d="M55 118 Q62 82 95 55" stroke="#ffca28" stroke-width="5" fill="none" stroke-dasharray="4 3" class="svg-hotspot" data-choice="Evaporation" style="cursor:pointer"/>
            <text x="62" y="92" fill="#ffca28" font-size="10">UP</text>
            <path d="M145 58 L145 112" stroke="#4fc3f7" stroke-width="5" stroke-dasharray="5 3" class="svg-hotspot" data-choice="Precipitation" style="cursor:pointer"/>
            <text x="165" y="92" fill="#81d4fa" font-size="10">RAIN</text>
            <text x="110" y="147" fill="#fff" font-size="11" text-anchor="middle" pointer-events="none">WATER CYCLE</text>
        </svg>`;
    }
    if (q.topic === 'matter') {
        return `<svg viewBox="0 0 220 160">
            <g class="svg-hotspot" data-choice="Solid" style="cursor:pointer">
                <rect x="14" y="34" width="56" height="72" rx="6" fill="transparent" stroke="#00e5ff" stroke-width="2"/>
                <circle cx="30" cy="84" r="6" fill="#76ff03"/><circle cx="44" cy="84" r="6" fill="#76ff03"/><circle cx="58" cy="84" r="6" fill="#76ff03"/>
                <circle cx="30" cy="70" r="6" fill="#76ff03"/><circle cx="44" cy="70" r="6" fill="#76ff03"/><circle cx="58" cy="70" r="6" fill="#76ff03"/>
                <text x="42" y="124" fill="#b2ebf2" font-size="10" text-anchor="middle">SOLID</text>
            </g>
            <g class="svg-hotspot" data-choice="Liquid" style="cursor:pointer">
                <rect x="82" y="34" width="56" height="72" rx="6" fill="transparent" stroke="#00e5ff" stroke-width="2"/>
                <circle cx="96" cy="90" r="6" fill="#29b6f6"/><circle cx="114" cy="86" r="6" fill="#29b6f6"/><circle cx="126" cy="92" r="6" fill="#29b6f6"/>
                <circle cx="104" cy="74" r="6" fill="#29b6f6"/><circle cx="120" cy="72" r="6" fill="#29b6f6"/>
                <text x="110" y="124" fill="#b2ebf2" font-size="10" text-anchor="middle">LIQUID</text>
            </g>
            <g class="svg-hotspot" data-choice="Gas" style="cursor:pointer">
                <rect x="150" y="34" width="56" height="72" rx="6" fill="transparent" stroke="#00e5ff" stroke-width="2"/>
                <circle cx="164" cy="48" r="5" fill="#ffca28"/><circle cx="192" cy="60" r="5" fill="#ffca28"/><circle cx="174" cy="88" r="5" fill="#ffca28"/>
                <text x="178" y="124" fill="#b2ebf2" font-size="10" text-anchor="middle">GAS</text>
            </g>
            ${hotspotHint}
        </svg>`;
    }
    return `<svg viewBox="0 0 220 160">
        <rect x="35" y="45" width="150" height="72" rx="10" fill="none" stroke="#ffca28" stroke-width="4" class="svg-hotspot" data-choice="Closed (complete loop)" style="cursor:pointer"/>
        <rect x="24" y="64" width="22" height="34" rx="4" fill="#ef5350" class="svg-hotspot" data-choice="Battery" style="cursor:pointer"/>
        <text x="35" y="85" fill="#fff" font-size="10" text-anchor="middle" pointer-events="none">+</text>
        <circle cx="185" cy="81" r="16" fill="#fff59d" stroke="#fbc02d" stroke-width="3"/>
        <text x="185" y="86" font-size="14" text-anchor="middle">💡</text>
        <text x="110" y="142" fill="#80deea" font-size="11" text-anchor="middle">SIMPLE CIRCUIT</text>
        ${hotspotHint}
    </svg>`;
}

let totalStops = 10;
let gameActive = false;
let gamePaused = false;
let score = 0;
let stopsDone = 0;
let discoveries = 0;
let streak = 0;
let totalAttempts = 0;
let wrongAttempts = 0;
let queue = [];
let currentQ = null;
let qLocked = false;
let missedConcepts = new Set();

const topicSelect = document.getElementById('topic-select');
const gradeSelect = document.getElementById('grade-select');
const startScreen = document.getElementById('start-screen');
const pauseScreen = document.getElementById('pause-screen');
const endScreen = document.getElementById('end-screen');
const trailNodes = document.getElementById('trail-nodes');
const rover = document.getElementById('rover');
const diagramBox = document.getElementById('diagram-box');
const qTopic = document.getElementById('q-topic');
const qPrompt = document.getElementById('q-prompt');
const qChoices = document.getElementById('q-choices');
const qFeedback = document.getElementById('q-feedback');

function shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function buildQueue(topic, grade) {
    const g = Number(grade);
    const strict = SCIENCE_BANK.filter(q => (topic === 'mixed' || q.topic === topic) && q.grade === g);
    const pool = shuffle(strict);
    const limit = Math.min(10, pool.length);
    totalStops = limit;
    return pool.slice(0, limit).map(q => ({ ...q, retried: false }));
}

function renderTrail() {
    trailNodes.innerHTML = '';
    trailNodes.style.gridTemplateColumns = `repeat(${totalStops}, 1fr)`;
    for (let i = 0; i < totalStops; i++) {
        const n = document.createElement('div');
        n.className = `trail-node${i < stopsDone ? ' done' : ''}`;
        trailNodes.appendChild(n);
    }
    const pct = totalStops > 0 ? (stopsDone / totalStops) * 82 : 0;
    rover.style.left = `calc(${pct}% + 18px)`;
}

function updateHUD() {
    document.getElementById('score-val').innerText = score;
    document.getElementById('step-val').innerText = `${stopsDone}/${totalStops}`;
    const acc = totalAttempts === 0 ? 100 : Math.max(0, Math.round(((totalAttempts - wrongAttempts) / totalAttempts) * 100));
    document.getElementById('acc-val').innerText = `${acc}%`;
    document.getElementById('disc-val').innerText = discoveries;
}

function updateSciBanner() {
    const profile = window.ArcadeProfile ? window.ArcadeProfile.loadProfile() : { games: {} };
    const stats = profile.games.science_explorer || { bestScore: 0, bestAcc: 0 };
    document.getElementById('sci-best-banner').innerText = `BEST: ${stats.bestScore} PTS | ${stats.bestAcc}% ACC`;
}

function loadNextQuestion() {
    if (!gameActive) return;
    if (stopsDone >= totalStops || queue.length === 0) {
        finishExpedition();
        return;
    }

    currentQ = queue.shift();
    qLocked = false;
    qTopic.innerText = currentQ.retried ? `${currentQ.label} (RETRY)` : currentQ.label;
    qPrompt.innerText = currentQ.prompt;
    qFeedback.innerText = '';
    diagramBox.innerHTML = renderScienceDiagram(currentQ);
    qChoices.innerHTML = '';

    shuffle(currentQ.choices).forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-btn';
        btn.dataset.choice = choice;
        btn.innerText = `${idx + 1}. ${choice}`;
        btn.addEventListener('click', () => handleAnswer(btn, choice));
        qChoices.appendChild(btn);
    });

    if (currentQ.interactive) {
        diagramBox.querySelectorAll('.svg-hotspot').forEach(el => {
            el.addEventListener('click', () => {
                if (qLocked) return;
                const picked = el.getAttribute('data-choice');
                const matchBtn = Array.from(qChoices.querySelectorAll('.choice-btn')).find(b => b.dataset.choice === picked);
                if (matchBtn) handleAnswer(matchBtn, picked);
            });
        });
    }

    sounds.speak(currentQ.prompt);
}

function handleAnswer(btn, choice) {
    if (!gameActive || gamePaused || qLocked || !currentQ) return;
    qLocked = true;
    totalAttempts++;

    const btns = qChoices.querySelectorAll('.choice-btn');
    btns.forEach(b => { b.disabled = true; });

    if (choice === currentQ.answer) {
        btn.classList.add('correct');
        if (sounds.playAction) sounds.playAction('rover_ping');
        sounds.playSuccess();
        stopsDone++;
        streak++;
        let pts = currentQ.retried ? 50 : 100;
        let note = '';
        if (streak > 0 && streak % 3 === 0) {
            discoveries++;
            pts += 50;
            note = ' 🔬 +1 DISCOVERY (+50)!';
        }
        score += pts;
        qFeedback.innerText = `✅ ${currentQ.explain}${note}`;
        renderTrail();
        updateHUD();
        setTimeout(loadNextQuestion, 1150);
    } else {
        btn.classList.add('wrong');
        btns.forEach(b => {
            if (b.dataset.choice === currentQ.answer) b.classList.add('correct');
        });
        sounds.playError();
        wrongAttempts++;
        streak = 0;
        missedConcepts.add(currentQ.key);
        qFeedback.innerText = `❌ ${currentQ.explain}`;
        updateHUD();

        if (!currentQ.retried) {
            queue.splice(Math.min(2, queue.length), 0, { ...currentQ, retried: true });
        }
        setTimeout(loadNextQuestion, 1750);
    }
}

function startGame() {
    sounds.init();
    if (sounds.playGameStart) sounds.playGameStart('sonar');
    if (window.ArcadeProfile && rover) {
        const eq = window.ArcadeProfile.loadProfile().equipped.science;
        const img = rover.querySelector('img');
        if (img) {
            img.style.borderColor = eq === 'sci_gold' ? '#ffca28' : eq === 'sci_turbo' ? '#76ff03' : '#00e5ff';
            img.style.boxShadow = eq === 'sci_gold' ? '0 0 14px #ffca28' : eq === 'sci_turbo' ? '0 0 14px #76ff03' : '';
        }
    }
    score = 0;
    stopsDone = 0;
    discoveries = 0;
    streak = 0;
    totalAttempts = 0;
    wrongAttempts = 0;
    missedConcepts = new Set();
    queue = buildQueue(topicSelect.value, gradeSelect.value);
    gameActive = true;
    gamePaused = false;

    startScreen.classList.remove('active');
    pauseScreen.classList.remove('active');
    endScreen.classList.remove('active');
    renderTrail();
    updateHUD();
    loadNextQuestion();
    if (sounds.bgmEnabled) sounds.bgmController.start();
    startTimedRun();
}

let timedMode = false;
let timeLeft = 120;
let timedTimerId = null;

function stopTimedRun() {
    if (timedTimerId) {
        clearInterval(timedTimerId);
        timedTimerId = null;
    }
}

function startTimedRun() {
    stopTimedRun();
    const toggle = document.getElementById('timed-mode-toggle');
    const hud = document.getElementById('timed-hud');
    const val = document.getElementById('timed-val');
    timedMode = Boolean(toggle && toggle.checked);
    if (hud) hud.style.display = timedMode ? 'block' : 'none';
    if (!timedMode) return;
    timeLeft = 120;
    if (val) val.innerText = timeLeft;
    timedTimerId = setInterval(() => {
        if (!gameActive || gamePaused) return;
        timeLeft--;
        if (val) val.innerText = timeLeft;
        if (timeLeft <= 0) {
            stopTimedRun();
            finishExpedition(false);
        }
    }, 1000);
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

function finishExpedition(completed = true) {
    gameActive = false;
    stopTimedRun();
    sounds.stopSpeech();
    sounds.bgmController.stop();
    sounds.playFanfare([523.25, 659.25, 783.99, 1046.5]);

    if (completed && timedMode && timeLeft > 0) score += timeLeft * 2;
    const acc = totalAttempts === 0 ? 100 : Math.max(0, Math.round(((totalAttempts - wrongAttempts) / totalAttempts) * 100));
    const stars = window.ArcadeProfile ? window.ArcadeProfile.computeMasteryStars(acc, completed) : 3;
    let isNewBest = false;
    if (window.ArcadeProfile) {
        const prev = window.ArcadeProfile.loadProfile().games.science_explorer;
        isNewBest = score > (prev ? prev.bestScore : 0) && score > 0;
        window.ArcadeProfile.recordSession({
            gameId: 'science_explorer',
            accuracy: acc,
            score,
            wpm: 0,
            missedItems: Array.from(missedConcepts),
            badgeId: completed ? 'science_whiz' : null
        });
    }

    const starsEl = document.getElementById('final-stars-val');
    if (starsEl) starsEl.innerText = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    document.getElementById('new-record-badge').style.display = isNewBest ? 'block' : 'none';
    document.getElementById('final-score-val').innerText = score;
    document.getElementById('final-acc-val').innerText = `${acc}%`;
    document.getElementById('final-disc-val').innerText = discoveries;

    const rev = document.getElementById('missed-review');
    rev.innerHTML = '';
    if (missedConcepts.size === 0) {
        rev.innerHTML = '<span class="missed-pill" style="border-color:#76ff03;background:rgba(118,255,3,0.18)">✨ Flawless Scientist!</span>';
    } else {
        Array.from(missedConcepts).slice(0, 8).forEach(k => {
            const p = document.createElement('span');
            p.className = 'missed-pill';
            p.innerText = k;
            rev.appendChild(p);
        });
    }

    endScreen.classList.add('active');
}

function returnToMenu() {
    gameActive = false;
    gamePaused = false;
    stopTimedRun();
    sounds.stopSpeech();
    sounds.bgmController.stop();
    pauseScreen.classList.remove('active');
    endScreen.classList.remove('active');
    const urlGrade = window.ArcadeProfile && window.ArcadeProfile.getGradeParam ? window.ArcadeProfile.getGradeParam() : null;
if (urlGrade && gradeSelect) {
    gradeSelect.value = urlGrade;
}
updateSciBanner();
    startScreen.classList.add('active');
}

window.addEventListener('keydown', e => {
    if (!gameActive) return;
    if (e.key === 'Escape') {
        e.preventDefault();
        togglePause();
        return;
    }
    if (gamePaused || qLocked) return;
    if (/^[1-4]$/.test(e.key)) {
        const btns = qChoices.querySelectorAll('.choice-btn');
        const idx = Number(e.key) - 1;
        if (btns[idx]) btns[idx].click();
    }
});

qPrompt.addEventListener('click', () => {
    if (gameActive && currentQ) sounds.speak(currentQ.prompt, true);
});
document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', startGame);
document.getElementById('resume-btn').addEventListener('click', togglePause);
document.getElementById('pause-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('end-menu-btn').addEventListener('click', returnToMenu);
document.getElementById('hud-pause-btn').addEventListener('click', (e) => { togglePause(); e.currentTarget.blur(); });
document.getElementById('voice-toggle').addEventListener('click', () => sounds.toggleVoice());
document.getElementById('bgm-toggle').addEventListener('click', () => sounds.toggleBGM());
document.getElementById('sound-toggle').addEventListener('click', () => sounds.toggleSound());

const urlGrade = window.ArcadeProfile && window.ArcadeProfile.getGradeParam ? window.ArcadeProfile.getGradeParam() : null;
if (urlGrade && gradeSelect) {
    gradeSelect.value = urlGrade;
}
updateSciBanner();
