---
name: art-assets
description: Guidelines for generating and sizing 2D game art assets in assets/ without wasting image-gen quota or bloating load times.
---

# Game Art & Asset Sizing Rules

1. **Match Generation Detail to Display Size:**
   - Do **not** generate separate high-detail renders for small UI icons or unit tokens (`<= 96px` in-game).
   - Prefer simple, clean, flat 2D sprite prompts or **one combined sprite sheet** per game when multiple small units are needed.
   - Generate only what the game actually displays prominently (1 backdrop + key hero/boss sprites).

2. **Target Resolution Caps in `assets/`:**
   - **Tiny unit/projectile sprites** (`<= 64px` display): max `128×128`
   - **Character, ship, and castle sprites** (`64–160px` display): max `256×256`
   - **Boss sprites** (`> 160px` display): max `384×384`
   - **Battlefield / biome backgrounds**: max `1280×720`

3. **Format & Optimization:**
   - Use `.png` only when alpha transparency is needed; use `.jpg` (quality ~82) for opaque backgrounds and framed portraits.
   - Always downscale oversized generated images before committing to `assets/`.
