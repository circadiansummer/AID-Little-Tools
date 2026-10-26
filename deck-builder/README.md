# Story Card Deck Builder

Open `Story-Card-Deck-Builder.html` in a modern browser. The complete HTML contains the supplied 21-character Animal Crossing example roster and Better Dungeons images; no server or install is required. The full 200-character roster is pending.

- Left: searchable portrait roster, type filter, replacement story-card and Better Dungeons JSON uploads.
- Center: selected cards in click order, removal, undo, editing of deck copies, filename, JSON download. Ten characters is a guide, not a limit.
- Right: upload or drop your own card array or Story Card Studio project, search, select individually or add visible cards.
- Images match on `id`/`aidId`, then case-insensitive title/name, then shared comma-separated keys/triggers. Ambiguous matches are skipped; missing/broken images show initials. Supports `adventure.storyCards`, `adventures[]` backups, a direct `storyCards` map, and legacy card arrays. Active icons take precedence over active graphics; embedded raster images and HTTP(S) links are supported.
- Story-card JSON export contains only selected AI Dungeon cards. Images/configuration are used for browsing; they are not inserted into AI Dungeon JSON. Arbitrary fields and nested data survive unchanged unless the user edits a supported field. Repeated trigger sets require confirmation; records are never silently deduplicated.
- Replacing a source removes its selections. Reset/unload clears undo history; clear-deck and individual changes can be undone. Import data stays in memory; reload starts fresh. External image hosts may receive requests for their image URLs.

To replace the bundled roster later, replace `data/roster.json`, then run `node build.cjs`. Replace `data/better-dungeons.json` to update the default extension images. `template.html` is the editable source; the generated HTML is the downloadable/offline artifact.

This addition leaves the canonical Studio v5.0 intact. The proposed Pages workflow checks that the generated HTML matches its sources, runs the fixture tests, and packages it at `deck-builder/Story-Card-Deck-Builder.html` beside Studio. Publication happens only after this change lands on main and the existing Pages deployment succeeds. No third-party hosting is used.

Verification: `node test.cjs` covers syntax, real fixtures, ID/name/trigger matching, ambiguity, full backups, unsafe image URL rejection, invalid card rejection, and nested-field preservation. Local Chromium browser checks verified selection from both sources, JSON download with exact object parity, deck-only editing and undo, search, and a 390px layout. Physical mobile browsers and live AI Dungeon import were not tested. The supplied roster and extension file have no overlapping character names; their zero portrait matches are intentional, not invented substitutions.
