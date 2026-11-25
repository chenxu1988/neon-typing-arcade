(function (global) {
    'use strict';

    const PROFILE_KEY = 'arcadeProfile';
    const PROFILES_KEY = 'arcadeProfiles';

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
        { id: 'castle_hero', icon: '🏰', name: 'Castle Defender', desc: 'Win a Castle Siege battle' },
        { id: 'streak_3', icon: '🔥', name: '3-Day Streak', desc: 'Play on 3 consecutive days' }
    ];

    const SHOP_ITEMS = [
        { id: 'plane_gold', category: 'plane', icon: '✨', name: 'Golden Ace Aura', cost: 3 },
        { id: 'plane_emerald', category: 'plane', icon: '💚', name: 'Emerald Plasma', cost: 5 },
        { id: 'plane_rainbow', category: 'plane', icon: '🌈', name: 'Hyper Rainbow', cost: 8 },
        { id: 'dino_cap', category: 'dino', icon: '🧢', name: 'Explorer Cap', cost: 3 },
        { id: 'dino_crown', category: 'dino', icon: '👑', name: 'Dino King Crown', cost: 6 },
        { id: 'dino_astro', category: 'dino', icon: '👩‍🚀', name: 'Space Helmet', cost: 8 },
        { id: 'exp_wizard', category: 'explorer', icon: '🧙', name: 'Word Wizard', cost: 4 },
        { id: 'exp_knight', category: 'explorer', icon: '🛡️', name: 'Grammar Knight', cost: 6 },
        { id: 'pizza_mushroom', category: 'pizza', icon: '🍄', name: 'Mushroom Deluxe', cost: 3 },
        { id: 'pizza_star', category: 'pizza', icon: '⭐', name: 'Golden Star Pie', cost: 6 }
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
            unlocks: [],
            equipped: { plane: null, dino: null, explorer: null, pizza: null },
            streak: { count: 0, lastPlayDate: null },
            sessions: { count: 0, lastPlayedAt: null },
            games: {},
            missedLog: []
        };
    }

    function normalizeProfile(parsed) {
        const base = createDefaultProfile();
        if (!parsed || typeof parsed !== 'object') return base;
        return {
            ...base,
            ...parsed,
            streak: { count: 0, lastPlayDate: null, ...(parsed.streak || {}) },
            sessions: { count: 0, lastPlayedAt: null, ...(parsed.sessions || {}) },
            equipped: { plane: null, dino: null, explorer: null, pizza: null, ...(parsed.equipped || {}) },
            games: parsed.games || {},
            badges: Array.isArray(parsed.badges) ? parsed.badges : [],
            unlocks: Array.isArray(parsed.unlocks) ? parsed.unlocks : [],
            missedLog: Array.isArray(parsed.missedLog) ? parsed.missedLog : []
        };
    }

    function loadStore() {
        try {
            const raw = global.localStorage.getItem(PROFILES_KEY);
            if (raw) {
                const store = JSON.parse(raw);
                if (store && store.users && typeof store.users === 'object') {
                    const names = Object.keys(store.users);
                    const active = (store.activeUser && store.users[store.activeUser]) ? store.activeUser : (names[0] || 'Guest');
                    if (!store.users[active]) store.users[active] = createDefaultProfile();
                    return { activeUser: active, users: store.users };
                }
            }
            // Migrate legacy single-user profile into Guest
            const legacyRaw = global.localStorage.getItem(PROFILE_KEY);
            const guestProfile = legacyRaw ? normalizeProfile(JSON.parse(legacyRaw)) : createDefaultProfile();
            const initStore = { activeUser: 'Guest', users: { Guest: guestProfile } };
            global.localStorage.setItem(PROFILES_KEY, JSON.stringify(initStore));
            return initStore;
        } catch {
            return { activeUser: 'Guest', users: { Guest: createDefaultProfile() } };
        }
    }

    function saveStore(store) {
        try {
            global.localStorage.setItem(PROFILES_KEY, JSON.stringify(store));
            const activeProf = store.users[store.activeUser];
            if (activeProf) {
                global.localStorage.setItem(PROFILE_KEY, JSON.stringify(activeProf));
            }
        } catch {
            // Ignore storage quota / private mode errors
        }
        return store;
    }

    function loadProfile() {
        const store = loadStore();
        return normalizeProfile(store.users[store.activeUser]);
    }

    function saveProfile(profile) {
        const store = loadStore();
        store.users[store.activeUser] = normalizeProfile(profile);
        saveStore(store);
        return store.users[store.activeUser];
    }

    function getActiveUser() {
        return loadStore().activeUser;
    }

    function listUsers() {
        return Object.keys(loadStore().users);
    }

    function switchUser(name) {
        const clean = String(name || '').trim().slice(0, 24);
        if (!clean) return loadProfile();
        const store = loadStore();
        if (!store.users[clean]) {
            store.users[clean] = createDefaultProfile();
        }
        store.activeUser = clean;
        saveStore(store);
        return normalizeProfile(store.users[clean]);
    }

    function exportProfileJSON(name = null) {
        const store = loadStore();
        const target = name && store.users[name] ? name : store.activeUser;
        const payload = {
            version: 1,
            name: target,
            exportedAt: new Date().toISOString(),
            profile: normalizeProfile(store.users[target])
        };
        return JSON.stringify(payload, null, 2);
    }

    function importProfileJSON(jsonText) {
        try {
            const data = JSON.parse(jsonText);
            const rawName = (data && data.name) ? data.name : 'Imported';
            const cleanName = String(rawName).trim().slice(0, 24) || 'Imported';
            const rawProfile = (data && data.profile) ? data.profile : data;
            const prof = normalizeProfile(rawProfile);
            const store = loadStore();
            store.users[cleanName] = prof;
            store.activeUser = cleanName;
            saveStore(store);
            return { ok: true, name: cleanName, profile: prof };
        } catch {
            return { ok: false, reason: 'Invalid JSON profile file' };
        }
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

    function purchaseItem(itemId) {
        const item = SHOP_ITEMS.find(i => i.id === itemId);
        if (!item) return { ok: false, reason: 'Item not found' };
        const profile = loadProfile();
        if (profile.unlocks.includes(itemId)) {
            profile.equipped[item.category] = itemId;
            saveProfile(profile);
            return { ok: true, profile };
        }
        if (profile.stars < item.cost) {
            return { ok: false, reason: 'Not enough stars' };
        }
        profile.stars -= item.cost;
        profile.unlocks.push(itemId);
        profile.equipped[item.category] = itemId;
        saveProfile(profile);
        return { ok: true, profile };
    }

    function equipItem(category, itemId) {
        const profile = loadProfile();
        if (itemId && !profile.unlocks.includes(itemId)) return profile;
        profile.equipped[category] = (profile.equipped[category] === itemId) ? null : itemId;
        saveProfile(profile);
        return profile;
    }

    function getGradeParam() {
        try {
            const g = new URLSearchParams(global.location.search).get('grade');
            return (g === '3' || g === '4' || g === '5') ? g : null;
        } catch {
            return null;
        }
    }

    function computeMasteryStars(accuracy, completed = true) {
        if (!completed) return 0;
        const acc = Number(accuracy) || 0;
        if (acc >= 95) return 3;
        if (acc >= 80) return 2;
        return 1;
    }

    function resetProfile() {
        const fresh = createDefaultProfile();
        saveProfile(fresh);
        return fresh;
    }

    global.ArcadeProfile = {
        BADGE_CATALOG,
        SHOP_ITEMS,
        loadProfile,
        saveProfile,
        getActiveUser,
        listUsers,
        switchUser,
        exportProfileJSON,
        importProfileJSON,
        recordSession,
        awardStars,
        unlockBadge,
        purchaseItem,
        equipItem,
        getGradeParam,
        computeMasteryStars,
        resetProfile
    };
})(window);
