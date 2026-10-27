# Open Roads Story Card Deck Builder

Open Story-Card-Deck-Builder.html in a modern browser, or use the repository's GitHub Pages /deck-builder/ address. The complete HTML embeds the 250-villager roster, Better Dungeons portraits, and fixed 66-card core deck. No server or install is required for the downloaded HTML.

## Choose villagers and export

- The wider character-only roster offers search and combined gender, species, personality and star-sign filters. Portrait frames are 2:3 with centered, uncropped images; catchphrases appear below names. Hover or keyboard-focus a card for its full Entry tooltip; Escape dismisses it.
- The Open Roads deck panel always includes all 66 core cards. Expand its core-deck section to browse their titles and entry text. These fixed cards cannot be deselected or edited here.
- Select villagers to add them after the core cards in click order. Selected copies can be edited or removed, and selection/edits can be undone. Clear villagers removes only the selections; the 66-card base remains.
- Personality, gender and species tallies describe selected villagers. Unknown metadata is counted as Unknown. About ten villagers is a guide, not a limit.
- Export defaults to open-roads-custom-villager-deck.json. Every download contains all core cards followed by selected villagers, preserving all original fields unless a selected copy was explicitly edited. Repeated trigger sets prompt for confirmation; no records are silently deduplicated.
- The former right-hand upload column is removed. The visible roster and Better Dungeons upload controls can still replace browsing sources; neither replaces the fixed base deck. Reload resets selections.

## Bundled sources

- data/roster.json: supplied open_roads_250_story_cards.json.
- data/better-dungeons.json: supplied Animal_Crossing__Open_Roads_adventure.json; all 250 villagers match portraits.
- data/open-roads-core-story-cards.json: supplied merged-story-cards-AID (7).json, renamed descriptively. Contains 9 Lore, 8 Location, 19 Town NPCs, 29 encounter cards, and one RE Config card.

Edit template.html and rebuild with node deck-builder/build.cjs from the repository root. The generated HTML is the standalone download. Run node deck-builder/test.cjs for syntax, image matching, metadata, preservation, and fixed-base merge checks. GitHub Pages checks generated-file parity and packages the tool alongside unchanged Studio v5.0 after approved changes reach main.

Image matching uses linked ID, then exact normalized title/name, then shared trigger; ambiguous matches are skipped. Supports extension adventure exports and backups, embedded raster images and HTTP(S) image URLs. External image hosts may receive image requests. Images are for browsing and are not inserted into the AI Dungeon card export.

## Verification

Node checks cover exact core-card ordering/preservation with zero or two selected villagers, 250 portrait matches, metadata parsing, tallies, unsafe image URL rejection, and nested fields. Local Chromium downloaded a 68-card JSON that exactly equaled the complete attached base plus Raymond and Shino. Clearing villagers retained 66 exportable core cards. Two-panel layout at 390px showed no horizontal overflow. Earlier targeted checks covered combined filters and tooltip dismissal. Physical mobile browsers and live AI Dungeon import were not tested.
