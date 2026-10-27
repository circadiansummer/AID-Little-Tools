# Story Card Deck Builder

Open `Story-Card-Deck-Builder.html` in a modern browser. The complete HTML contains the supplied 250-character Open Roads roster and Better Dungeons images; no server or install is required.

- Left: searchable portrait roster, type filter, replacement story-card and Better Dungeons JSON uploads.
- Center: selected cards in click order, removal, undo, editing of deck copies, filename, JSON download. Ten characters is a guide, not a limit.
- Right: upload or drop your own card array or Story Card Studio project, search, select individually or add visible cards.
- Images match on `id`/`aidId`, then case-insensitive title/name, then shared comma-separated keys/triggers. Ambiguous matches are skipped; missing/broken images show initials. Supports `adventure.storyCards`, `adventures[]` backups, a direct `storyCards` map, and legacy card arrays. Active icons take precedence over active graphics; embedded raster images and HTTP(S) links are supported.
- Story-card JSON export contains only selected AI Dungeon cards. Images/configuration are used for browsing; they are not inserted into AI Dungeon JSON. Arbitrary fields and nested data survive unchanged unless the user edits a supported field. Repeated trigger sets require confirmation; records are never silently deduplicated.
- Replacing a source removes its selections. Reset/unload clears undo history; clear-deck and individual changes can be undone. Import data stays in memory; reload starts fresh. External image hosts may receive requests for their image URLs.

To replace the bundled roster later, replace `data/roster.json`, then run `node build.cjs`. Replace `data/better-dungeons.json` to update the default extension images. `template.html` is the editable source; the generated HTML is the downloadable/offline artifact.

This addition leaves the canonical Studio v5.0 intact. The proposed Pages workflow checks that the generated HTML matches its sources, runs the fixture tests, and packages it at `deck-builder/Story-Card-Deck-Builder.html` beside Studio. Publication happens only after this change lands on main and the existing Pages deployment succeeds. No third-party hosting is used.

Verification: `node test.cjs` covers syntax, real fixtures, ID/name/trigger matching, ambiguity, full backups, unsafe image URL rejection, invalid card rejection, and nested-field preservation. Local Chromium browser checks verified selection from both sources, JSON download with exact object parity, deck-only editing and undo, search, and a 390px layout. Physical mobile browsers and live AI Dungeon import were not tested. All 250 roster characters match portraits in the bundled Open Roads extension file. Roster image frames use a responsive 2:3 portrait ratio with centered, contained images.

Roster browsing: the left column includes characters only, with combinable gender, species, personality, and star-sign filters plus text search. Metadata comes from labeled lines in the Entry (`value`) text; missing values appear as Unknown. Catchphrases appear beneath names. Hover or keyboard-focus a roster card to read its full entry in a floating, scrollable tooltip; Escape dismisses it. The merged deck tallies personality, gender, and species for selected characters from either source, including edits; other card types are excluded from those tallies.

Targeted verification: combined Female + Cat + Normal + Aries filters returned Lolly; selecting Raymond and Shino showed one Male/one Female, one Smug/one Peppy, and one Cat/one Deer. Tooltip entry content and keyboard dismissal were verified in Chromium. Node checks cover metadata parsing and summary counts.
