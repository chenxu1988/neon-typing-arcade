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

## 6. Next Immediate Step

Build **Castle Siege** (`T5.1`–`T5.4`: `db/history-bank.js`, `castle-siege.html`, `castle-siege.css`, `castle-siege.js`, Hub registration, and `castle_hero` badge).
