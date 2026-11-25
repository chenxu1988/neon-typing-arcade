# 🌌 Neon Typing Arcade — LAUSD Grade 3+ Educational Suite 🦕

Welcome to **Neon Typing Arcade** — a zero-build educational game suite for LAUSD Grade 3+ students covering ELA, Spelling, Vocabulary, Math, Fractions, and Typing, powered by vanilla HTML/CSS/JS, procedural Web Audio chiptune music, Web Speech read-aloud, and AI-generated 2D game art!

---

## 🎮 The Games

### 1. 🏠 Arcade Hub (`index.html`)
* Unified **Stars**, **8 Unlockable Badges**, and **Daily Streak** tracker (`shared/profile.js`).
* **Grade Filter** (`All`, `Grade 3`, `Grade 4`, `Grade 5`).
* **Parent & Teacher Progress Report** modal showing sessions played, best scores, and top missed words/items (with `Reset Progress`).

### 2. 🌌 Neon Plane Typing (`plane-game.html`)
* **3 Stages & Distinct Bosses**: *Neon Nebula* (Nebula Mothership), *Cyber Asteroid Belt* (Aegis Core), and *Dark Void* (Void Dreadnought).
* **Sectors**: Quantum Cosmos (Sci-Fi), LAUSD Grade 3 ELA, LAUSD Grade 4 ELA, LAUSD Grade 5 ELA, and **Custom Spelling List**.
* **Learning & Power-Ups**: Word pronunciation, 1-line definitions on missed-word pills, 1-click "Practice Missed Words" drill, Shield (`🛡️`), EMP Slow-Mo (`❄️`), and Heart (`❤️`).

### 3. 🦕 Dinosaur Adventure Typing (`dino-game.html`)
* **Grade 3–5 Themes**: Grade 3 Basics, Grade 4 Science & Nature, and Grade 5 History & Space.
* **5 Prehistoric Biomes**: Illustrated backgrounds, animated Rex sprite, sentence read-aloud, confetti, `ESC` Pause, and "Practice Missed Words" drill.

### 4. 🧮 Astro Math Defense (`astro-math.html`)
* **Grade 3–5 Topics**: Multiplication (`0–10`), Division Facts, Add & Subtract, and Grade 5 Order of Operations.
* **Gameplay**: Falling math meteors, keyboard + on-screen numpad, visual grouping hints on mistakes, and the **Calculator Mothership Boss**.

### 5. 📖 Word Quest (`word-quest.html`)
* **Grade 3–5 ELA Modes**: Context Clues, Synonyms & Antonyms, Parts of Speech, and Prefixes & Suffixes.
* **Gameplay**: 10-plank sky-bridge quest, spaced-repetition retry for missed questions, Web Speech read-aloud, and 3-streak Relic bonuses.

### 6. 🍕 Fraction Pizza Dash (`fraction-dash.html`)
* **Grade 3–5 Modes**: Build Fractions, Equivalent Fractions, and Compare Fractions (`<`, `=`, `>`).
* **Gameplay**: Interactive SVG pizza slice builder, 18s customer order timer, and streak bonuses.

### 7. 🔬 Science Explorer (`science-explorer.html`)
* **Grade 3–5 STEM**: Solar System, Food Chains, Water Cycle, States of Matter, and Simple Circuits.
* **Gameplay**: Live SVG STEM diagrams, 10-stop Rover Expedition, Web Speech read-aloud, and spaced-repetition retry.

### 8. ⏰ Time, Money & Area Dash (`life-math.html`)
* **Grade 3–5 Practical Math**: Analog clock reading, coin/change counting, and unit-square Area & Perimeter.
* **Gameplay**: Interactive SVG clock, clickable coin builder, and `6×6` unit-square grid.

---

## 🧱 Shared Architecture (`shared/`)
* `shared/audio.js` — Unified `BaseSoundManager`, `ChiptuneSequencer`, and `speakText()` (`file://` compatible).
* `shared/profile.js` — Unified `localStorage` (`arcadeProfile`) for stars, badges, streaks, and missed-items log.
* `shared/ui.css` — Shared design tokens, pills, badges, filter tabs, and modals.

---

## 🚀 How to Play
No installation or build tools required! Open **`index.html`** in Google Chrome to launch any game.
