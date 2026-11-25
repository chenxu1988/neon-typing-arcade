# LAUSD Grade 3+ Arcade — Task Tracker

**Status Legend:** `TODO` | `IN_PROGRESS` | `DONE` | `BLOCKED`
**Priority Legend:** `P0` (Foundation / Critical) | `P1` (Core Feature) | `P2` (Polish / Nice-to-Have)
**Workflow:** Pick task -> Implement -> Verify (`node --check` / test) -> Mark `DONE` + record commit SHA -> Commit.

---

## Phase 1: Shared Foundation & Hub Progression

| ID | Priority | Status | Task | Commit |
| :--- | :--- | :--- | :--- | :--- |
| `T1.1` | `P0` | `DONE` | Create `shared/audio.js` with unified `SoundManager`, `ChiptuneSequencer`, and `speakText()` (file:// compatible) | `758219a` |
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
| `T4.5` | `P1` | `TODO` | Add Star Shop catalog (`unlocks`, `equipped`, `purchaseItem`, `equipItem`) to `shared/profile.js` + Star Shop modal in `index.html` | — |
| `T4.6` | `P1` | `TODO` | Wire equipped Star Shop cosmetics into Plane (aura/trail), Dino (hats), Word Quest (avatars), and Fraction Dash (toppings) | — |
| `T4.7` | `P1` | `TODO` | Expand `word-quest.js` bank to 60+ LAUSD Grade 3–5 questions + add visual dot-array grid in `astro-math.js` | — |
| `T4.8` | `P1` | `TODO` | Add side-by-side Equivalence Visualizer in `fraction-dash.js` on missed Equivalent/Compare orders | — |

---

## Triage / Discovered Work Items

*(Add newly discovered bugs, polish ideas, or scope changes here during implementation before prioritizing them into a Phase.)*

- [x] `TRIAGE-1` (`P2`): Replace remaining 3 inline SVGs in `plane-game.js` (`s2-elite`, `s3-fighter`, `s3-elite`) with matching AI-generated PNG sprites.
- [x] `TRIAGE-2` (`P2`): Update `README.md` with new games and shared architecture once Phase 3 completes.
- [ ] `TRIAGE-3` (`P2`): Create `shared/touch-keyboard.js` (collapsible on-screen QWERTY + 0–9 keypad for tablets/Chromebooks, formerly `T1.4`).
- [ ] `TRIAGE-4` (`P2`): Wire `shared/touch-keyboard.js` toggle into `plane-game.html` for tablet play (formerly `T2.3`).
- [x] `TRIAGE-5` (`P0`): Fix `Reset Progress` in Parent/Teacher modal to also clear `neonPlaneTypingStats` and `dinoTypingStats`.
