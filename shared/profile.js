(function (global) {
    'use strict';

    const PROFILE_KEY = 'arcadeProfile';

    const BADGE_CATALOG = [
        { id: 'first_flight', icon: '🚀', name: 'First Flight', desc: 'Complete a Neon Plane Typing run' },
        { id: 'dino_explorer', icon: '🦕', name: 'Dino Explorer', desc: 'Complete a Dinosaur Adventure run' },
        { id: 'sharp_shooter', icon: '🎯', name: 'Sharp Shooter', desc: 'Finish any game with 95%+ accuracy' },
        { id: 'boss_slayer', icon: '👾', name: 'Boss Slayer', desc: 'Defeat a Boss Mothership' },
        { id: 'math_whiz', icon: '🧮', name: 'Math Whiz', desc: 'Complete an Astro Math run' },
        { id: 'word_wizard', icon: '📖', name: 'Word Wizard', desc: 'Complete a Word Quest run' },
        { id: 'fraction_chef', icon: '🍕', name: 'Fraction Chef', desc: 'Complete a Fraction Dash run' },
        { id: 'science_whiz', icon: '🔬', name: 'Science Whiz', desc: 'Complete a Science Explorer expedition' },
        { id: 'time_master', icon: '⏰', name: 'Time & Money Pro', desc: 'Complete a Time, Money & Area Dash run' },
        { id: 'streak_3', icon: '🔥', name: '3-Day Streak', desc: 'Play on 3 consecutive days' }
    ];

    function getLocalDateKey(date = new Date()) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    function createDefaultProfile() {
        return {
            stars: 0,
            badges: [],
            streak: { count: 0, lastPlayDate: null },
            sessions: { count: 0, lastPlayedAt: null },
            games: {},
            missedLog: []
        };
    }

    function loadProfile() {
        try {
            const raw = global.localStorage.getItem(PROFILE_KEY);
            if (!raw) return createDefaultProfile();
            const parsed = JSON.parse(raw);
            return {
                ...createDefaultProfile(),
                ...parsed,
                streak: { count: 0, lastPlayDate: null, ...(parsed.streak || {}) },
                sessions: { count: 0, lastPlayedAt: null, ...(parsed.sessions || {}) },
                games: parsed.games || {},
                badges: Array.isArray(parsed.badges) ? parsed.badges : [],
                missedLog: Array.isArray(parsed.missedLog) ? parsed.missedLog : []
            };
        } catch {
            return createDefaultProfile();
        }
    }

    function saveProfile(profile) {
        try {
            global.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
        } catch {
            // Ignore storage quota / private mode errors
        }
        return profile;
    }

    function updateStreak(profile) {
        const today = getLocalDateKey();
        const last = profile.streak.lastPlayDate;
        if (last === today) return;

        if (last) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayKey = getLocalDateKey(yesterday);
            profile.streak.count = (last === yesterdayKey) ? profile.streak.count + 1 : 1;
        } else {
            profile.streak.count = 1;
        }
        profile.streak.lastPlayDate = today;

        if (profile.streak.count >= 3 && !profile.badges.includes('streak_3')) {
            profile.badges.push('streak_3');
        }
    }

    function unlockBadgeInProfile(profile, badgeId) {
        if (!badgeId || profile.badges.includes(badgeId)) return false;
        profile.badges.push(badgeId);
        return true;
    }

    function logMissedItems(profile, gameId, items) {
        if (!Array.isArray(items) || items.length === 0) return;
        const now = new Date().toISOString();
        const map = new Map();
        profile.missedLog.forEach(entry => {
            map.set(`${entry.game}::${entry.item}`, entry);
        });

        items.forEach(rawItem => {
            const item = String(rawItem || '').trim();
            if (!item) return;
            const key = `${gameId}::${item}`;
            const prev = map.get(key);
            if (prev) {
                prev.count += 1;
                prev.lastSeen = now;
            } else {
                map.set(key, { item, game: gameId, count: 1, lastSeen: now });
            }
        });

        profile.missedLog = Array.from(map.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, 50);
    }

    function recordSession(options = {}) {
        const {
            gameId = 'unknown',
            accuracy = 0,
            score = 0,
            wpm = 0,
            missedItems = [],
            bossDefeated = false,
            badgeId = null
        } = options;

        const profile = loadProfile();
        updateStreak(profile);

        profile.sessions.count += 1;
        profile.sessions.lastPlayedAt = new Date().toISOString();

        let starsEarned = 1;
        if (accuracy >= 85) starsEarned += 1;
        if (accuracy >= 95) starsEarned += 1;
        profile.stars += starsEarned;

        const prevGame = profile.games[gameId] || { plays: 0, bestScore: 0, bestWpm: 0, bestAcc: 0 };
        profile.games[gameId] = {
            plays: prevGame.plays + 1,
            bestScore: Math.max(prevGame.bestScore, score),
            bestWpm: Math.max(prevGame.bestWpm, wpm),
            bestAcc: Math.max(prevGame.bestAcc, accuracy)
        };

        const newlyUnlocked = [];
        if (badgeId && unlockBadgeInProfile(profile, badgeId)) newlyUnlocked.push(badgeId);
        if (accuracy >= 95 && unlockBadgeInProfile(profile, 'sharp_shooter')) newlyUnlocked.push('sharp_shooter');
        if (bossDefeated && unlockBadgeInProfile(profile, 'boss_slayer')) newlyUnlocked.push('boss_slayer');

        logMissedItems(profile, gameId, missedItems);
        saveProfile(profile);

        return { starsEarned, newlyUnlocked, profile };
    }

    function awardStars(amount) {
        const profile = loadProfile();
        profile.stars = Math.max(0, profile.stars + (Number(amount) || 0));
        saveProfile(profile);
        return profile.stars;
    }

    function unlockBadge(badgeId) {
        const profile = loadProfile();
        const unlocked = unlockBadgeInProfile(profile, badgeId);
        if (unlocked) saveProfile(profile);
        return unlocked;
    }

    function resetProfile() {
        const fresh = createDefaultProfile();
        saveProfile(fresh);
        return fresh;
    }

    global.ArcadeProfile = {
        BADGE_CATALOG,
        loadProfile,
        saveProfile,
        recordSession,
        awardStars,
        unlockBadge,
        resetProfile
    };
})(window);
