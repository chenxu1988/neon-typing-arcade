# LAUSD Grade 3+ Arcade — Task Tracker

**Source of Truth:** [Linear — LAUSD Grade 3+ Arcade](https://linear.app/fengyan-studio/project/lausd-grade-3-arcade-69c47bf92ea8) (`FEN-*`)
**Status Legend:** `TODO` | `IN_PROGRESS` | `DONE` | `BLOCKED`
**Priority Legend:** `P0` (Foundation / Critical) | `P1` (Core Feature) | `P2` (Polish / Nice-to-Have)
**Workflow:** Pick Linear ticket -> Branch `feat/FEN-<id>-<slug>` off `master` -> Implement -> Verify (`node --check` / test) -> Mark `DONE` + merge to `master`.

---

## Phase 1: Shared Foundation & Hub Progression

| ID | Priority | Status | Task | Commit |
| :--- | :--- | :--- | :--- | :--- |
| `T1.1` | `P0` | `DONE` | Create `shared/audio.js` with unified `SoundManager`, `ChiptuneSequencer`, and `speakText()` (file:// compatible) | `done` |
| `T1.2` | `P0` | `DONE` | Create `shared/profile.js` for unified `localStorage` (`arcadeProfile`: stars, badges, streak, per-game stats, missed items) | `done` |
| `T1.3` | `P0` | `DONE` | Create `shared/ui.css` with shared modals, HUD pills, badge styles, and responsive breakpoints | `done` |
| `T1.5` | `P1` | `DONE` | Upgrade `index.html` with Stars/Badges bar, Grade filter (`All`, `3`, `4`, `5`), and Parent/Teacher Progress Report modal | `done` |

---

## Phase 2: Deepen Existing Games (Grade 3–5 + Meaning + Touch)

| ID | Priority | Status | Task | Commit |
| :--- | :--- | :--- | :--- | :--- |
| `T2.1` | `P0` | `DONE` | Migrate `plane-game.js` to use `shared/audio.js` & `shared/profile.js` (award stars & log missed words) | `done` |
| `T2.2` | `P1` | `DONE` | Add LAUSD Grade 5 ELA sector + kid-friendly 1-line word definitions on Plane Game Over "Words to Practice" pills | `done` |
| `T2.4` | `P0` | `DONE` | Migrate `dino-game.js` to use `shared/audio.js` & `shared/profile.js` (award stars & log missed words) | `done` |
| `T2.5` | `P1` | `DONE` | Add Grade 3 / 4 / 5 theme selector, `ESC` Pause modal, and Main Menu button to `dino-game.html` | `done` |
| `T2.6` | `P1` | `DONE` | Add "Words to Practice" summary + 1-click drill retry on `dino-game.html` Victory screen | `done` |

---

## Phase 3: New LAUSD Grade 3+ Educational Games

### Game 3: Astro Math Defense (`astro-math.html`)
| ID | Priority | Status | Task | Commit |
| :--- | :--- | :--- | :--- | :--- |
| `T3.1` | `P1` | `DONE` | Scaffold `astro-math.html`, `astro-math.css`, `astro-math.js` with Grade 3–5 topic selector (Multiply, Divide, Add/Sub, Order of Ops) | `done` |
| `T3.2` | `P1` | `DONE` | Implement falling meteor math equations, keyboard + on-screen numpad input, visual array/grouping hint on wrong answer | `done` |
| `T3.3` | `P2` | `DONE` | Add Calculator Mothership Boss (missing-factor & word problems) + register card in `index.html` | `done` |

### Game 4: Word Quest (`word-quest.html`)
| ID | Priority | Status | Task | Commit |
| :--- | :--- | :--- | :--- | :--- |
| `T3.4` | `P1` | `DONE` | Scaffold `word-quest.html`, `word-quest.css`, `word-quest.js` with Grade 3–5 ELA modes (Context Clues, Synonyms/Antonyms, Parts of Speech, Prefixes/Suffixes) | `done` |
| `T3.5` | `P1` | `DONE` | Implement bridge-building quest loop, spaced-repetition retry for missed questions, and Web Speech read-aloud | `done` |
| `T3.6` | `P2` | `DONE` | Add relic rewards, star integration, and register card in `index.html` | `done` |

### Game 5: Fraction Pizza Dash (`fraction-dash.html`)
| ID | Priority | Status | Task | Commit |
| :--- | :--- | :--- | :--- | :--- |
| `T3.7` | `P1` | `DONE` | Scaffold `fraction-dash.html`, `fraction-dash.css`, `fraction-dash.js` with interactive SVG pizza/pie slice builder | `done` |
| `T3.8` | `P1` | `DONE` | Implement Grade 3–5 challenge modes (Build Fraction, Equivalent Fractions, Compare `>`/`<`/`=`) | `done` |
| `T3.9` | `P2` | `DONE` | Add customer order timer, combo streaks, star rewards, and register card in `index.html` | `f927afe` |

---

## Phase 4: New STEM / Practical Math Games, Star Shop & Polish

| ID | Priority | Status | Task | Commit |
| :--- | :--- | :--- | :--- | :--- |
| `T4.1` | `P0` | `DONE` | Build **Science Explorer** (`science-explorer.html`, `.css`, `.js`) for Grade 3–5 STEM (Solar System, Food Chains, Water Cycle, Matter, Circuits) | `done` |
| `T4.2` | `P0` | `DONE` | Register **Science Explorer** in `index.html` + add `science_whiz` badge in `shared/profile.js` | `done` |
| `T4.3` | `P0` | `DONE` | Build **Time, Money & Area Dash** (`life-math.html`, `.css`, `.js`) with SVG analog clock, coin counter, and area/perimeter grid | `done` |
| `T4.4` | `P0` | `DONE` | Register **Time, Money & Area Dash** in `index.html`, add `time_master` badge, and update `README.md` | `done` |
| `T4.5` | `P1` | `DONE` | Add Star Shop catalog (`unlocks`, `equipped`, `purchaseItem`, `equipItem`) to `shared/profile.js` + Star Shop modal in `index.html` | `done` |
| `T4.6` | `P1` | `DONE` | Wire equipped Star Shop cosmetics into Plane (aura/trail), Dino (hats), Word Quest (avatars), and Fraction Dash (toppings) | `done` |
| `T4.7` | `P1` | `DONE` | Expand `word-quest.js` bank to 60+ LAUSD Grade 3–5 questions + add visual dot-array grid in `astro-math.js` | `done` |
| `T4.8` | `P1` | `DONE` | Add side-by-side Equivalence Visualizer in `fraction-dash.js` on missed Equivalent/Compare orders | `done` |

---

## Triage / Discovered Work Items

*(Add newly discovered bugs, polish ideas, or scope changes here during implementation before prioritizing them into a Phase.)*

- [x] `TRIAGE-1` (`P2`): Replace remaining 3 inline SVGs in `plane-game.js` (`s2-elite`, `s3-fighter`, `s3-elite`) with matching AI-generated PNG sprites.
- [x] `TRIAGE-2` (`P2`): Update `README.md` with new games and shared architecture once Phase 3 completes.
- [~] `TRIAGE-3` (`WONTFIX`): ~~Create `shared/touch-keyboard.js`~~ — Dropped per desktop/keyboard-only scope decision.
- [~] `TRIAGE-4` (`WONTFIX`): ~~Wire `shared/touch-keyboard.js` into `plane-game.html`~~ — Dropped per desktop/keyboard-only scope decision.
- [x] `TRIAGE-5` (`P0`): Fix `Reset Progress` in Parent/Teacher modal to also clear `neonPlaneTypingStats` and `dinoTypingStats`.
- [x] `TRIAGE-6` (`P0`): Start Fraction Pizza Dash orders with an uncut pizza (`totalSlices = 1`) so students must choose the denominator before selecting slices.
- [x] `TRIAGE-7` (`P0`): Enforce strict grade isolation in `plane-game.js` (deduplicate G3/G4/G5 word lists), `word-quest.js`, and `science-explorer.js` (never fall back to other grades).
- [x] `TRIAGE-8` (`P0`): Extract all game content banks into `db/*.js` (`window.ArcadeDB`, `file://` compatible) and add `scripts/validate-db.js`.
- [x] `TRIAGE-9` (`P0`): Add `🏠 Hub` and `⏸️ Pause` buttons to the top HUD of all 7 games.
- [x] `TRIAGE-10` (`P0`): Add multi-student profile login (name only, no password) + JSON Export/Import in `shared/profile.js` and `index.html`.
- [ ] `TRIAGE-11` (`P2`, `FEN-17`): Future Game — **Reading Comprehension** (short Grade 3–5 passages with main idea, inference, and evidence).
- [ ] `TRIAGE-12` (`P2`, `FEN-18`): Future Game — **Logic & Number Patterns** (sequences, input/output tables, shape reasoning).
- [x] `TRIAGE-13` (`P2`): Art Upgrade (**Astro Math Defense** `astro-math.html`) — Replace CSS/emoji ship, meteors, Calculator Mothership boss, and space backdrop with AI-generated PNG sprites/backgrounds (`assets/`) + Hub card preview.
- [x] `TRIAGE-14` (`P2`): Art Upgrade (**Word Quest** `word-quest.html`) — Add AI-generated explorer avatar, sky-bridge/temple background, and Hub card preview (`assets/`).
- [x] `TRIAGE-15` (`P2`): Art Upgrade (**Fraction Pizza Dash** `fraction-dash.html`) — Keep interactive `<svg>` pizza cutter, add AI-generated pizzeria background, customer portraits, and Hub card preview (`assets/`).
- [x] `TRIAGE-16` (`P2`): Art Upgrade (**Science Explorer** `science-explorer.html`) — Keep dynamic `<svg>` STEM diagrams, add AI-generated Science Rover sprite, alien/lab expedition backdrop, and Hub card preview (`assets/`).
- [x] `TRIAGE-17` (`P2`): Art Upgrade (**Time, Money & Area Dash** `life-math.html`) — Keep interactive `<svg>` analog clock, add AI-generated shop/workshop backdrop, mascot/coin art, and Hub card preview (`assets/`).
- [x] `TRIAGE-18` (`P2`): Art Upgrade (**Castle Siege** `castle-siege.html`) — Added AI battlefield BG (`castle-bg.jpg`), castles (`castle-player.jpg`, `castle-enemy.jpg`), Knight (`castle-knight.jpg`), Raider sprite (`castle-raider.jpg`), and Hub preview.

---

## Phase 5: Castle Siege (History, Geography & Civics)

| ID | Priority | Status | Task | Owner |
|----|----------|--------|------|-------|
| `T5.1` | `P0` | `DONE` | Create `db/history-bank.js` (`window.ArcadeDB.historyBank`, Grades 3–5 History, Geography & Civics) and validate in `scripts/validate-db.js` | `done` |
| `T5.2` | `P0` | `DONE` | Build `castle-siege.html` and `castle-siege.css` with medieval battlefield, castle HP bars, wave timer, HUD (`🏠 Hub`, `⏸️ Pause`, audio), and modals | `done` |
| `T5.3` | `P0` | `DONE` | Build `castle-siege.js` with 20s timed waves, 1s wrong-answer cooldown + fact explanation, center clash animation, Web Speech read-aloud, and `ArcadeProfile` integration | `done` |
| `T5.4` | `P0` | `DONE` | Register Castle Siege in `index.html`, add `castle_hero` badge in `shared/profile.js`, and update `README.md` | `done` |

---

## Phase 6: Pro Game Design Polish, Fixes & Parity (Desktop-First)

| ID | Linear | Priority | Status | Task | Commit |
|----|--------|----------|--------|------|--------|
| `T6.1` | `FEN-5` | `P0` | `DONE` | Restore `shared/profile.js` from git `HEAD` so `ArcadeProfile`, Star Shop, badges, and cosmetics work across all 8 games | `done` |
| `T6.2` | `FEN-6` | `P0` | `DONE` | Repair `index.html` corrupted modal JS (`shopModal`/`playerModal` handlers) and fix hardcoded badge counts (`0/10`, `0/8` -> `11`) | `done` |
| `T6.3` | `FEN-7` | `P0` | `DONE` | Fix `castle-siege.js` BGM (`bpm`/`lead` keys + `ChiptuneSequencer`), stop TTS on `togglePause()`, add `MAIN MENU` to Pause modal, and fix `index.html` wave copy (`30s`) | `done` |
| `T6.4` | `FEN-8` | `P1` | `DONE` | Upgrade `index.html` filtering: add Subject filter (`All`, `ELA & Typing`, `Math`, `Science & History`) + pass `?grade=3\|4\|5` deep-link into games | `done` |
| `T6.5` | `FEN-9` | `P1` | `DONE` | Standardize HUD, `Esc` Pause, `MAIN MENU` exit, keyboard shortcuts (`1–4`, `Enter`), and Web Speech TTS toggle across all 8 games | `done` |
| `T6.6` | `FEN-10` | `P1` | `DONE` | Add 3-Star mastery thresholds + optional Timed mode for Chill games (`dino-game`, `word-quest`, `science-explorer`, `life-math`) | `done` |
| `T6.7` | `FEN-11` | `P1` | `DONE` | Differentiate `science-explorer.js` with interactive STEM diagram challenges + expand `db/science-bank.js` (to 10+ per topic/grade) and `db/word-quest-bank.js` (to 10+ per mode/grade) | `done` |
| `T6.8` | `FEN-12` | `P1` | `DONE` | Polish `dino-game.js` & `db/dino-sentences.js`: penalize/shake on key-mashing, add Shift/punctuation cue for Grade 3, and expand Grade 4/5 sentence pools | `done` |
| `T6.9` | `FEN-13` | `P1` | `DONE` | Polish `fraction-dash.js` & `db/fraction-bank.js`: fix uncut reset, show both pizzas side-by-side during Compare, add Grade 3–5 scaling, deduplicate orders, and add `1–3`/`Enter` keys | `done` |
| `T6.10` | `FEN-14` | `P1` | `DONE` | Polish `life-math.js`: enforce contiguous shapes in `area_build`, add single-coin undo, add perimeter side-length labels, and add Grade 3–5 scaling + TTS | `done` |
| `T6.11` | `FEN-15` | `P1` | `DONE` | Upgrade `astro-math.js` (scale dot-array hints to `12×12` + multi-shot/shielded Calculator Boss) and `plane-game.js` (add 3-Stage Victory milestone + optional Endless mode) | `done` |
| `T6.12` | `FEN-16` | `P2` | `DONE` | Complete Star Shop cosmetics for `astro-math`, `science-explorer`, `life-math`, and `castle-siege`, plus remaining AI art upgrades (`TRIAGE-13`–`TRIAGE-18`) | `done` |
| `T6.13` | `—` | `P1` | `DONE` | Add shared procedural Action SFX (<180ms, TTS-safe volume) to `shared/audio.js` and wire into all 8 games (summon, clash, castle hit, laser, slice, coin, plank, rover ping, dino step/jump) | `done` |
| `T6.14` | `—` | `P1` | `DONE` | Add constrained `±8px` in-lane micro-patrol, idle breathing/bobbing, and clash/reaction animations across Castle Siege and all 7 other games | `done` |
