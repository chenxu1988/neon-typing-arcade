# LAUSD Grade 3+ Educational Arcade — Master Plan

**Goal:** Grow **Neon Typing Arcade** into a multi-subject educational game suite for LAUSD Grade 3+ students (ELA, Math, and Typing) with zero build tools, Chromebook + tablet/touch support, and shared progression across all games.

---

## 1. Review of Current Games

### `plane-game.html` — Neon Plane Typing
- **What works well:** Strong arcade loop, 3 stages with distinct music and Bosses, `Easy`/`Normal`/`Hard` presets, `Tab`/`Backspace` target switching, `localStorage` best stats, Web Speech pronunciation, Custom Spelling List, and "Practice Missed Words" drill mode.
- **Gaps for LAUSD Grade 3+:**
  1. **Spelling without meaning:** Kids can type `inference` or `ecosystem` without learning what the word means.
  2. **Desktop-only input:** Relies solely on physical `keydown` events; iPad/touchscreen users cannot play without an on-screen keyboard.
  3. **Fixed Grade 3 & Grade 4 lists:** Needs Grade 5 ELA/Academic vocabulary and optional short definitions/context clues.

### `dino-game.html` — Dinosaur Adventure Typing
- **What works well:** Cute AI-generated Rex sprite and 5 biome backgrounds, 50-sentence pool, net WPM + accuracy, procedural chiptune music, Web Speech sentence read-aloud, and confetti celebrations.
- **Gaps for LAUSD Grade 3+:**
  1. **No grade/topic selector:** Levels 1–5 are fixed; a 3rd grader and 5th grader get the same sentences.
  2. **No mistake review:** Tracks `errors` count, but doesn't show *which* words/punctuation caused trouble or offer a quick retry.
  3. **Short session arc:** 5 levels × 4 sentences ends quickly; needs endless/free-play or themed packs (Science, History, ELA Grammar).

### `index.html` — Arcade Hub & Shared Architecture
- **What works well:** Clean two-card hub pulling `localStorage` best scores.
- **Gaps as we scale to 5+ games:**
  1. **Duplicated code:** `BGMController`, `SoundManager`, Web Speech helpers, and `localStorage` logic are duplicated in `plane-game.js` and `dino-game.js`.
  2. **No cross-game motivation:** No shared Stars, Badges, Daily Streak, or Parent/Teacher Progress Summary.

---

## 2. Architecture Plan (Zero-Build Vanilla Modules)

Create a lightweight `shared/` folder using standard browser ES modules (`<script type="module">`) or global-safe scripts so games still work via `file://` or GitHub Pages:

- `shared/audio.js` — Unified `SoundManager`, Web Speech pronunciation (`speakText`), and reusable Web Audio chiptune sequencer.
- `shared/profile.js` — Unified `localStorage` profile (`arcadeProfile`): Stars earned, unlocked Badges, Daily Streak, per-game stats, and missed-items log for Parent/Teacher review.
- `shared/touch-keyboard.js` — Optional collapsible on-screen QWERTY / Number Pad overlay for tablet/touch devices.
- `shared/ui.css` — Shared modal, HUD pill, badge, and responsive layout tokens.

---

## 3. Roadmap & Phases

### Phase 1: Shared Foundation & Hub Progression
1. Extract `shared/audio.js` and `shared/profile.js` without breaking `file://` local opening.
2. Upgrade `index.html` with:
   - **Star & Badge Bar** (e.g., *First Flight*, *100% Accuracy*, *Boss Slayer*, *Math Whiz*, *5-Day Streak*).
   - **Grade Filter** (`All`, `Grade 3`, `Grade 4`, `Grade 5`).
   - **Parent / Teacher Report Modal** showing time played, accuracy trends, and top missed words/facts across games.

### Phase 2: Deepen Existing Games (Grade 3–5 + Meaning + Touch)
1. **Plane Typing (`plane-game.html`):**
   - Add **Grade 5 ELA** sector + kid-friendly **1-line definitions** shown on Game Over "Words to Practice" pills (and optional "Definition Hint" toggle).
   - Add optional **on-screen keyboard** toggle for tablet play.
2. **Dino Typing (`dino-game.html`):**
   - Add **Grade / Theme Selector** (Grade 3 Basics, Grade 4 Science & Nature, Grade 5 History & Space).
   - Add **Words to Practice** summary on the Victory screen.
   - Add a **Pause** modal (`ESC`) and **Main Menu** button matching Plane Typing.

### Phase 3: New LAUSD Grade 3+ Educational Games

#### Game 3: `astro-math.html` — Astro Math Defense (Math Fluency)
- **LAUSD Focus:** Grade 3–5 Multiplication facts (0–12), Division fact families, Multi-digit addition/subtraction, and Order of Operations.
- **Core Loop:** Incoming meteors carry math equations (`7 × 8 = ?`). Type the answer (or tap the on-screen number pad / 4-choice shields on touch) to fire! Wrong answers give a visual hint (e.g., array/grouping cue) instead of harsh failure.
- **Boss Mechanic:** Giant Calculator Mothership fires multi-step word problems or missing-factor puzzles (`6 × ? = 42`).

#### Game 4: `word-quest.html` — Word Quest (ELA Meaning, Synonyms & Grammar)
- **LAUSD Focus:** Context clues, Synonyms/Antonyms, Prefixes/Suffixes (`un-`, `re-`, `-ful`, `-less`), and Parts of Speech (Noun, Verb, Adjective, Adverb).
- **Core Loop:** Guide an explorer across puzzle bridges. Each obstacle presents a short sentence with a highlighted target word or blank; pick or type the right answer to build the bridge and collect relics.
- **Educational Hook:** Missed concepts are queued for spaced repetition later in the quest.

#### Game 5: `fraction-dash.html` — Fraction Pizza Dash (Visual Fractions)
- **LAUSD Focus:** Grade 3–4 fraction fundamentals — visual part-to-whole (`3/4`), equivalent fractions (`1/2 = 2/4`), comparing fractions (`2/3 > 3/5`), and simple fraction addition.
- **Core Loop:** Hungry space/dino customers order visual pizza/pie slices (`"Give me 3/4!"` or `"Match an equivalent to 1/2!"`). Build or select the matching visual fraction before the order timer runs out.

---

## 4. Phase 4: New STEM / Practical Math Games, Star Shop & Polish

### 4A (Priority 1): New LAUSD Grade 3–5 Games
- **Game 6: `science-explorer.html` — Science Explorer (STEM):**
  - **Topics:** Solar System, Food Chains, Water Cycle, States of Matter, and Simple Circuits (Grades 3–5).
  - **Mechanics:** Dynamic SVG STEM diagrams per question (planet orbits, food-chain arrows, water-cycle flow, particle boxes, circuit bulb), 10-stop Rover Expedition bar, `1–4` / click answers, Web Speech read-aloud, and spaced-repetition retry.
- **Game 7: `life-math.html` — Time, Money & Area Dash (Practical Math):**
  - **Time Mode:** SVG analog clock face with hour/minute hands -> pick matching digital time (`1–4` / click).
  - **Money Mode:** Tactile clickable SVG coins (`$1`, `25¢`, `10¢`, `5¢`, `1¢`) -> build target amount or make change.
  - **Area & Perimeter Mode:** Interactive `6×6` unit-square tile grid -> build target Area or compute Perimeter of highlighted shapes.

### 4B (Priority 2): Star Shop & Cosmetics (`shared/profile.js` + `index.html`)
- Make earned **Stars** spendable in a **Star Shop** modal on `index.html` (unlock & equip Plane Neon Skins, Dino Hats, Explorer Avatars, Pizza Toppings, and Rover/Clock themes).

### 4C (Priority 2): Existing Game Depth & Visual Learning
- Expand `word-quest.js` question bank from 25 to 60+ LAUSD Grade 3–5 questions.
- Add visual `row × col` dot array diagrams in `astro-math.js` on wrong answers.
- Add side-by-side pizza Equivalence Visualizer in `fraction-dash.js` on wrong Equivalent/Compare answers.

---

## 5. Phase 5: Castle Siege & Future Subject Expansion

### Game 8: `castle-siege.html` — Castle Siege (History, Geography & Civics)
- **Theme:** Medieval Castle Siege — Student Knights vs. Enemy Raiders (Dragons & Goblins).
- **LAUSD Focus (Grades 3–5):**
  - **Grade 3:** Continents & Oceans, Map Directions, Local & California Landmarks, Community Rules.
  - **Grade 4:** California Regions, Gold Rush, Missions & Statehood, California Government.
  - **Grade 5:** US Geography & Capitals, 3 Branches of Government, Revolutionary War, US Constitution.
- **Core Loop (Timed Wave Auto-Battler):**
  - Both castles start at `100 HP`.
  - Each wave lasts **20 seconds** with a visible incoming Raider squad (`3–6` units).
  - Correct answers summon `1` Knight; wrong answers trigger a `1s` cooldown and display the correct fact explanation (existing Knights stay).
  - When time runs out, Knights and Raiders march to the center clash zone and battle: excess units deal `diff × 10` damage to the opposing castle (tie = `0` damage). Repeat until one castle reaches `0 HP`.

### Future Subject Backlog
- **Reading Comprehension (ELA):** Short 2–3 sentence passages with main idea, inference, and evidence questions (Grades 3–5).
- **Logic & Number Patterns:** Sequence puzzles, input/output function tables, and shape-pattern reasoning (Grades 3–5).

---

## 6. Phase 6: Pro Game Design Polish, Fixes & Parity (Desktop-First)

Based on the full 8-game design audit, prioritize fixing broken shared state and deepening the existing 8 games before adding new subjects. Target device: **Desktop / Chromebook (keyboard + mouse)** — on-screen touch keyboards (`TRIAGE-3`, `TRIAGE-4`) are out of scope.

### 6A. Critical Blockers (`P0`)
1. **Restore `shared/profile.js`:** Restore from git `HEAD` so `ArcadeProfile`, Star Shop, badges, and cosmetics work across all 8 games.
2. **Fix `index.html` Hub JS & Badge Counts:** Repair the corrupted modal event handlers (lines 532–945) and align the hardcoded badge totals (`0/10`, `0/8`) with the actual `11` badges in `shared/profile.js`.
3. **Fix Castle Siege Bugs:** Fix broken BGM (`tempo`/`melody` keys vs `bpm`/`lead` and missing `sound.startBgm()`/`stopBgm()`), stop speech on `togglePause()`, add `MAIN MENU` to the Pause modal, and align `index.html` card copy (`30s` waves).

### 6B. Hub & Cross-Game Consistency (`P1`)
1. **Subject Filter + Grade Deep-Link (`index.html`):** Replace/pair the non-filtering `Grade 3–5` tabs with Subject tabs (`All`, `ELA & Typing`, `Math`, `Science & History`), and pass `?grade=3|4|5` into games so they auto-select the chosen grade.
2. **Unified HUD / Pause / TTS Bar:** Standardize `Esc` Pause, `MAIN MENU` exit, keyboard shortcuts (`1–4` choices, `Enter` submit), and Web Speech TTS toggles across all 8 games.
3. **3-Star Mastery & Stakes:** Keep Chill default for Grade 3, add 3-Star mastery thresholds + optional Timed mode for passive games (`dino-game`, `word-quest`, `science-explorer`, `life-math`).

### 6C. Per-Game Loop & Content Upgrades (`P1`–`P2`)
1. **Science Explorer (`science-explorer.js`, `db/science-bank.js`):** Differentiate from `Word Quest` with interactive STEM diagram challenges (circuit/food-chain/orbit interactions) and expand `science-bank.js` from 28 items to 10+ per topic/grade.
2. **Word Quest (`db/word-quest-bank.js`):** Expand from 5 items per `(mode, grade)` pair to 10+ so single-mode runs fill all 10 sky-bridge planks.
3. **Dinosaur Adventure Typing (`dino-game.js`, `db/dino-sentences.js`):** Penalize/shake on key-mashing, add Shift/punctuation visual cues for Grade 3, and expand Grade 4/5 sentence pools beyond 6 sentences per level.
4. **Fraction Pizza Dash (`fraction-dash.js`, `db/fraction-bank.js`):** Fix tedious uncut reset (`totalSlices = 1`), render both pizzas side-by-side *during* Compare mode, add Grade 3–5 scaling, deduplicate orders per shift, and add `1–3` / `Enter` shortcuts.
5. **Time, Money & Area Dash (`life-math.js`):** Enforce contiguous/rectilinear shapes in `area_build`, add single-coin click-to-remove undo, add perimeter side-length labels, and add Grade 3–5 scaling + TTS read-aloud.
6. **Astro Math Defense (`astro-math.js`) & Plane Typing (`plane-game.js`):** Scale `astro-math` dot-array hints up to `12×12` and upgrade Calculator Mothership Boss to multi-shot/shielded waves; add a 3-Stage Victory milestone (with optional Endless continuation) to `plane-game.js`.
7. **Star Shop & AI Art Parity:** Add Star Shop cosmetics to the 4 missing games (`astro-math`, `science-explorer`, `life-math`, `castle-siege`) and complete AI art upgrades (`TRIAGE-13`–`TRIAGE-18`).

---

## 7. Next Immediate Step

Execute **Phase 6A (`T6.1`–`T6.3`)** to restore `shared/profile.js`, repair `index.html`, and fix `castle-siege.js` BGM/Pause bugs.
