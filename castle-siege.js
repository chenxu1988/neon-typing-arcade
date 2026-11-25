(function () {
    'use strict';

    const WAVE_SECONDS = 30;
    const MAX_HP = 100;
    const DAMAGE_PER_UNIT = 10;
    const WRONG_COOLDOWN_MS = 1000;

    const TOPIC_LABELS = {
        geo: '🗺️ GEOGRAPHY & MAPS',
        history: '📜 HISTORY & LANDMARKS',
        civics: '🏛️ CIVICS & GOVERNMENT'
    };

    const TRACKS = {
        march: {
            bpm: 132,
            lead: ['G4', 'B4', 'D5', 'G5', 'Fs5', 'D5', 'B4', 'D5', 'E5', 'C5', 'A4', 'C5', 'D5', 'B4', 'G4', '-'],
            bass: ['G2', 'G2', 'D3', 'D3', 'C3', 'C3', 'G2', 'D3']
        }
    };

    const sound = window.ArcadeAudio
        ? new window.ArcadeAudio.BaseSoundManager(TRACKS, 'march')
        : { init() {}, playClick() {}, playError() {}, playSuccess() {}, playFanfare() {}, playTone() {}, speak() {}, stopSpeech() {}, soundEnabled: true, bgmEnabled: true, voiceEnabled: true };

    const els = {
        waveVal: document.getElementById('wave-val'),
        timerVal: document.getElementById('timer-val'),
        scoreVal: document.getElementById('score-val'),
        accVal: document.getElementById('acc-val'),
        playerHpBar: document.getElementById('player-hp-bar'),
        playerHpText: document.getElementById('player-hp-text'),
        enemyHpBar: document.getElementById('enemy-hp-bar'),
        enemyHpText: document.getElementById('enemy-hp-text'),
        playerCastle: document.getElementById('player-castle'),
        enemyCastle: document.getElementById('enemy-castle'),
        knightCount: document.getElementById('knight-count'),
        raiderCount: document.getElementById('raider-count'),
        knightSquad: document.getElementById('knight-squad'),
        raiderSquad: document.getElementById('raider-squad'),
        clashSpark: document.getElementById('clash-spark'),
        waveBanner: document.getElementById('wave-banner'),
        qTopic: document.getElementById('q-topic'),
        cooldownPill: document.getElementById('cooldown-pill'),
        qPrompt: document.getElementById('q-prompt'),
        qChoices: document.getElementById('q-choices'),
        qFeedback: document.getElementById('q-feedback'),
        startScreen: document.getElementById('start-screen'),
        pauseScreen: document.getElementById('pause-screen'),
        endScreen: document.getElementById('end-screen'),
        topicSelect: document.getElementById('topic-select'),
        gradeSelect: document.getElementById('grade-select'),
        bestBanner: document.getElementById('siege-best-banner'),
        endTitle: document.getElementById('end-title'),
        endSubtitle: document.getElementById('end-subtitle'),
        endWaves: document.getElementById('end-waves'),
        endScore: document.getElementById('end-score'),
        endAcc: document.getElementById('end-acc'),
        endStars: document.getElementById('end-stars'),
        endMissedWrap: document.getElementById('end-missed-wrap'),
        endMissedList: document.getElementById('end-missed-list')
    };

    const state = {
        running: false,
        paused: false,
        resolving: false,
        cooldown: false,
        wave: 1,
        timeLeft: WAVE_SECONDS,
        playerHp: MAX_HP,
        enemyHp: MAX_HP,
        knights: 0,
        raiders: 0,
        raiderInterval: 7,
        raiderCountdown: 7,
        score: 0,
        correct: 0,
        attempts: 0,
        allFiltered: [],
        pool: [],
        retryQueue: [],
        masteredPrompts: new Set(),
        currentQ: null,
        missed: [],
        timerId: null
    };

    function shuffle(arr) {
        const copy = arr.slice();
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function updateBestBanner() {
        if (!window.ArcadeProfile) return;
        const p = window.ArcadeProfile.loadProfile();
        const stats = p.games.castle_siege || { bestScore: 0, bestAcc: 0 };
        els.bestBanner.innerText = `BEST: ${stats.bestScore} PTS | ${stats.bestAcc}% ACC`;
    }

    function buildPool() {
        const grade = Number(els.gradeSelect.value);
        const topic = els.topicSelect.value;
        const bank = (window.ArcadeDB && window.ArcadeDB.historyBank) || [];
        let filtered = bank.filter(q => q.grade === grade && (topic === 'mixed' || q.topic === topic));
        if (filtered.length === 0) {
            filtered = bank.filter(q => q.grade === grade);
        }
        state.allFiltered = filtered;
        state.pool = shuffle(filtered);
        state.retryQueue = [];
        state.masteredPrompts = new Set();
    }

    function nextQuestion() {
        state.retryQueue.forEach(item => { item.wait--; });
        const dueIdx = state.retryQueue.findIndex(item => item.wait <= 0);
        let q = null;

        if (dueIdx !== -1) {
            q = state.retryQueue.splice(dueIdx, 1)[0].q;
        } else {
            if (state.pool.length === 0) {
                const unmastered = state.allFiltered.filter(item => !state.masteredPrompts.has(item.prompt));
                if (unmastered.length > 0) {
                    state.pool = shuffle(unmastered);
                } else {
                    // All questions in this match pool mastered; reset cycle cleanly
                    state.masteredPrompts.clear();
                    state.pool = shuffle(state.allFiltered);
                }
            }
            q = state.pool.shift();
        }

        if (!q) return;
        state.currentQ = {
            ...q,
            shuffledChoices: shuffle(q.choices)
        };
        renderQuestion();
    }

    function renderQuestion() {
        const q = state.currentQ;
        if (!q) return;
        els.qTopic.innerText = TOPIC_LABELS[q.topic] || 'SOCIAL STUDIES';
        els.qPrompt.innerText = q.prompt;
        els.qChoices.innerHTML = '';

        q.shuffledChoices.forEach((choice, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'choice-btn';
            btn.dataset.choice = choice;
            btn.innerHTML = `<span class="choice-num">${idx + 1}</span><span>${choice}</span>`;
            btn.addEventListener('click', () => handleAnswer(choice, btn));
            els.qChoices.appendChild(btn);
        });

        if (sound.voiceEnabled && sound.speak) {
            sound.speak(q.prompt);
        }
    }

    function setChoicesDisabled(disabled) {
        els.qChoices.querySelectorAll('.choice-btn').forEach(btn => {
            btn.disabled = disabled;
        });
    }

    function updateHUD() {
        els.waveVal.innerText = state.wave;
        els.timerVal.innerText = `${state.timeLeft}s`;
        els.scoreVal.innerText = state.score;
        const acc = state.attempts === 0 ? 100 : Math.round((state.correct / state.attempts) * 100);
        els.accVal.innerText = `${acc}%`;

        els.playerHpBar.style.width = `${Math.max(0, state.playerHp)}%`;
        els.playerHpText.innerText = `${Math.max(0, state.playerHp)} / ${MAX_HP} HP`;
        els.enemyHpBar.style.width = `${Math.max(0, state.enemyHp)}%`;
        els.enemyHpText.innerText = `${Math.max(0, state.enemyHp)} / ${MAX_HP} HP`;

        els.knightCount.innerText = state.knights;
        els.raiderCount.innerText = state.raiders;
    }

    function renderSquad(container, count, icon) {
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const span = document.createElement('span');
            span.className = 'unit-icon';
            span.innerText = icon;
            container.appendChild(span);
        }
    }

    function appendKnight() {
        const img = document.createElement('img');
        img.src = 'assets/castle-knight.jpg';
        img.alt = 'Knight';
        img.className = 'unit-img';
        els.knightSquad.appendChild(img);
    }

    function appendRaider() {
        const img = document.createElement('img');
        img.src = 'assets/castle-raider.jpg';
        img.alt = 'Raider';
        img.className = 'unit-img';
        els.raiderSquad.appendChild(img);
    }

    function handleAnswer(choice, btnEl) {
        if (!state.running || state.paused || state.resolving || state.cooldown || !state.currentQ) return;

        state.attempts++;
        const q = state.currentQ;

        if (choice === q.answer) {
            state.correct++;
            state.knights++;
            state.score += 100;
            state.masteredPrompts.add(q.prompt);
            btnEl.classList.add('correct');
            els.qFeedback.className = 'q-feedback ok';
            els.qFeedback.innerText = `⚔️ Knight summoned! ${q.explain}`;
            appendKnight();
            sound.playSuccess();
            updateHUD();
            setChoicesDisabled(true);
            setTimeout(() => {
                if (state.running && !state.resolving) {
                    nextQuestion();
                }
            }, 350);
        } else {
            btnEl.classList.add('wrong');
            els.qFeedback.className = 'q-feedback err';
            els.qFeedback.innerText = `❌ Answer: ${q.answer} — ${q.explain}`;
            sound.playError();
            if (!state.missed.some(m => m.prompt === q.prompt)) {
                state.missed.push({ prompt: q.prompt, answer: q.answer, explain: q.explain });
            }
            if (!state.retryQueue.some(item => item.q.prompt === q.prompt)) {
                state.retryQueue.push({ q, wait: 2 });
            }
            updateHUD();

            state.cooldown = true;
            setChoicesDisabled(true);
            els.cooldownPill.classList.remove('hidden');
            setTimeout(() => {
                state.cooldown = false;
                els.cooldownPill.classList.add('hidden');
                if (state.running && !state.resolving) {
                    nextQuestion();
                }
            }, WRONG_COOLDOWN_MS);
        }
    }

    function startWave() {
        state.resolving = false;
        state.cooldown = false;
        state.knights = 0;
        state.raiders = 0;
        state.raiderInterval = Math.max(4.5, 7.5 - state.wave * 0.5);
        state.raiderCountdown = state.raiderInterval;
        state.timeLeft = WAVE_SECONDS;

        els.knightSquad.classList.remove('marching');
        els.raiderSquad.classList.remove('marching');
        els.clashSpark.classList.remove('active');
        els.cooldownPill.classList.add('hidden');
        els.waveBanner.innerText = `WAVE ${state.wave} — OUTRACE THE RAIDERS!`;
        els.qFeedback.innerText = '';

        renderSquad(els.knightSquad, 0, '⚔️');
        renderSquad(els.raiderSquad, 0, '👺');
        updateHUD();
        nextQuestion();
    }

    function resolveWave() {
        state.resolving = true;
        setChoicesDisabled(true);
        els.waveBanner.innerText = '🎺 HORN BLOWS — CLASH!';

        // March troops to center
        els.knightSquad.classList.add('marching');
        els.raiderSquad.classList.add('marching');

        setTimeout(() => {
            els.clashSpark.classList.add('active');
            sound.playTone(180, 0.18, 'sawtooth', 0.2, 70);

            const diff = state.knights - state.raiders;
            if (diff > 0) {
                const dmg = diff * DAMAGE_PER_UNIT;
                state.enemyHp = Math.max(0, state.enemyHp - dmg);
                state.score += diff * 50;
                els.waveBanner.innerText = `⚔️ VICTORY! +${dmg} DMG TO RAIDER KEEP!`;
                els.enemyCastle.classList.add('hit');
                sound.playFanfare([523.25, 659.25, 783.99], 90);
            } else if (diff < 0) {
                const dmg = Math.abs(diff) * DAMAGE_PER_UNIT;
                state.playerHp = Math.max(0, state.playerHp - dmg);
                els.waveBanner.innerText = `🐉 RAIDERS BREACH! -${dmg} HP TO YOUR CASTLE!`;
                els.playerCastle.classList.add('hit');
                sound.playError();
            } else {
                els.waveBanner.innerText = '🛡️ STALEMATE! SHIELDS HELD (0 DMG)!';
                sound.playClick();
            }

            updateHUD();

            setTimeout(() => {
                els.enemyCastle.classList.remove('hit');
                els.playerCastle.classList.remove('hit');
                els.clashSpark.classList.remove('active');

                if (state.enemyHp <= 0 || state.playerHp <= 0) {
                    finishSiege(state.enemyHp <= 0);
                } else if (state.running) {
                    state.wave++;
                    startWave();
                }
            }, 1400);
        }, 650);
    }

    function finishSiege(victory) {
        state.running = false;
        clearInterval(state.timerId);
        state.timerId = null;
        if (sound.bgmController) sound.bgmController.stop();
        if (sound.stopSpeech) sound.stopSpeech();

        const acc = state.attempts === 0 ? 100 : Math.round((state.correct / state.attempts) * 100);
        if (victory) {
            state.score += 300;
            sound.playFanfare([523.25, 659.25, 783.99, 1046.5], 110);
        }

        let starsEarned = 0;
        if (window.ArcadeProfile) {
            const res = window.ArcadeProfile.recordSession({
                gameId: 'castle_siege',
                accuracy: acc,
                score: state.score,
                missedItems: state.missed.map(m => m.answer),
                bossDefeated: victory,
                badgeId: victory ? 'castle_hero' : null
            });
            starsEarned = res.starsEarned || 0;
        }

        els.endTitle.innerText = victory ? '🏆 CASTLE VICTORY!' : '🛡️ KEEP FELL!';
        els.endTitle.style.color = victory ? '#4ade80' : '#f87171';
        els.endSubtitle.innerText = victory
            ? `You crushed the Raider Keep in ${state.wave} waves!`
            : `The Raiders broke through on Wave ${state.wave}. Rally your Knights and try again!`;
        els.endWaves.innerText = state.wave;
        els.endScore.innerText = state.score;
        els.endAcc.innerText = `${acc}%`;
        els.endStars.innerText = `+${starsEarned} ⭐`;

        if (state.missed.length > 0) {
            els.endMissedWrap.classList.remove('hidden');
            els.endMissedList.innerHTML = state.missed
                .map(m => `<div>• <strong>${m.answer}</strong> — ${m.explain}</div>`)
                .join('');
        } else {
            els.endMissedWrap.classList.add('hidden');
        }

        els.endScreen.classList.add('active');
    }

    function tick() {
        if (!state.running || state.paused || state.resolving) return;
        state.timeLeft--;
        if (state.timeLeft > 0) {
            state.raiderCountdown--;
            if (state.raiderCountdown <= 0) {
                state.raiders++;
                state.raiderCountdown += state.raiderInterval;
                appendRaider();
                sound.playTone(130, 0.08, 'triangle', 0.12, 95);
            }
        }
        updateHUD();
        if (state.timeLeft <= 0) {
            resolveWave();
        }
    }

    function startGame() {
        sound.init();
        if (sound.playGameStart) sound.playGameStart('horn');
        if (sound.bgmEnabled && sound.bgmController) sound.bgmController.start();
        if (window.ArcadeProfile && els.playerCastle) {
            const eq = window.ArcadeProfile.loadProfile().equipped.castle;
            els.playerCastle.style.boxShadow = eq === 'castle_dragon'
                ? '0 0 18px rgba(255, 87, 34, 0.8)'
                : eq === 'castle_paladin'
                    ? '0 0 18px rgba(255, 224, 130, 0.8)'
                    : '';
        }

        state.running = true;
        state.paused = false;
        state.wave = 1;
        state.playerHp = MAX_HP;
        state.enemyHp = MAX_HP;
        state.score = 0;
        state.correct = 0;
        state.attempts = 0;
        state.missed = [];

        buildPool();
        els.startScreen.classList.remove('active');
        els.endScreen.classList.remove('active');
        els.pauseScreen.classList.remove('active');

        clearInterval(state.timerId);
        state.timerId = setInterval(tick, 1000);
        startWave();
    }

    function togglePause() {
        if (!state.running) return;
        state.paused = !state.paused;
        els.pauseScreen.classList.toggle('active', state.paused);
        if (state.paused && sound.stopSpeech) sound.stopSpeech();
        if (state.paused && sound.bgmController) sound.bgmController.stop();
        else if (!state.paused && sound.bgmEnabled && sound.bgmController) sound.bgmController.start();
    }

    function returnToMenu() {
        state.running = false;
        state.paused = false;
        clearInterval(state.timerId);
        state.timerId = null;
        if (sound.bgmController) sound.bgmController.stop();
        if (sound.stopSpeech) sound.stopSpeech();
        els.pauseScreen.classList.remove('active');
        els.endScreen.classList.remove('active');
        els.startScreen.classList.add('active');
        const urlGrade = window.ArcadeProfile && window.ArcadeProfile.getGradeParam ? window.ArcadeProfile.getGradeParam() : null;
    if (urlGrade && els.gradeSelect) {
        els.gradeSelect.value = urlGrade;
    }
    updateBestBanner();
    }

    // Controls
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('restart-btn').addEventListener('click', startGame);
    document.getElementById('resume-btn').addEventListener('click', togglePause);
    document.getElementById('pause-menu-btn').addEventListener('click', returnToMenu);
    document.getElementById('hud-pause-btn').addEventListener('click', togglePause);
    els.qPrompt.addEventListener('click', () => {
        if (state.currentQ && sound.speak) sound.speak(state.currentQ.prompt, true);
    });

    const voiceBtn = document.getElementById('voice-toggle');
    voiceBtn.addEventListener('click', () => {
        sound.voiceEnabled = !sound.voiceEnabled;
        voiceBtn.classList.toggle('active', sound.voiceEnabled);
        voiceBtn.innerText = sound.voiceEnabled ? '🗣️ Voice: On' : '🗣️ Voice: Off';
        if (!sound.voiceEnabled && sound.stopSpeech) sound.stopSpeech();
    });

    const bgmBtn = document.getElementById('bgm-toggle');
    bgmBtn.addEventListener('click', () => {
        sound.bgmEnabled = !sound.bgmEnabled;
        bgmBtn.classList.toggle('active', sound.bgmEnabled);
        bgmBtn.innerText = sound.bgmEnabled ? '🎵 Music: On' : '🎵 Music: Off';
        if (sound.bgmEnabled && state.running && !state.paused && sound.bgmController) sound.bgmController.start();
        else if (!sound.bgmEnabled && sound.bgmController) sound.bgmController.stop();
    });

    const soundBtn = document.getElementById('sound-toggle');
    soundBtn.addEventListener('click', () => {
        sound.soundEnabled = !sound.soundEnabled;
        soundBtn.classList.toggle('active', sound.soundEnabled);
        soundBtn.innerText = sound.soundEnabled ? '🔊 Sound: On' : '🔇 Sound: Off';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            togglePause();
            return;
        }
        if (!state.running || state.paused || state.resolving || state.cooldown) return;
        const idx = ['1', '2', '3', '4'].indexOf(e.key);
        if (idx !== -1) {
            const buttons = els.qChoices.querySelectorAll('.choice-btn');
            if (buttons[idx] && !buttons[idx].disabled) {
                buttons[idx].click();
            }
        }
    });

    const urlGrade = window.ArcadeProfile && window.ArcadeProfile.getGradeParam ? window.ArcadeProfile.getGradeParam() : null;
    if (urlGrade && els.gradeSelect) {
        els.gradeSelect.value = urlGrade;
    }
    updateBestBanner();
})();
