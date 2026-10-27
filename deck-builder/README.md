# Open Roads Story Card Deck Builder

Open Story-Card-Deck-Builder.html in a modern browser, or use the repository's GitHub Pages /deck-builder/ address. The complete HTML embeds the 250-villager roster, Better Dungeons portraits, and fixed 66-card core deck. No server or install is required for the downloaded HTML.

## Choose villagers and export

- The wider character-only roster offers search and combined gender, species, personality and star-sign filters. Portrait frames are 2:3 with centered, uncropped images; catchphrases appear below names. Hover or keyboard-focus a card for its full Entry tooltip; Escape dismisses it.
- The Open Roads deck panel always includes all 66 core cards. Core-deck details stay in the background; these fixed cards cannot be deselected or edited here.
- Select villagers to add them after the core cards in click order. Selected copies can be edited or removed, and selection/edits can be undone. Clear villagers removes only the selections; the 66-card base remains.
- Personality, gender and species tallies are in a Cast breakdown disclosure, collapsed by default, and describe selected villagers. Unknown metadata is counted as Unknown. About ten villagers is a guide, not a limit.
- Export defaults to open-roads-custom-villager-deck.json. Every download contains all core cards followed by selected villagers, preserving all original fields unless a selected copy was explicitly edited. Repeated trigger sets prompt for confirmation; no records are silently deduplicated.
- The former right-hand upload column is removed. The roster heading, file information and roster/image upload controls have also been removed; bundled sources are maintained in the repository. Reload resets selections.

## Bundled sources

- data/roster.json: supplied open_roads_250_story_cards.json.
- data/better-dungeons.json: supplied Animal_Crossing__Open_Roads_adventure.json; all 250 villagers match portraits.
- data/open-roads-core-story-cards.json: supplied merged-story-cards-AID (7).json, renamed descriptively. Contains 9 Lore, 8 Location, 19 Town NPCs, 29 encounter cards, and one RE Config card.

Edit template.html and rebuild with node deck-builder/build.cjs from the repository root. The generated HTML is the standalone download. Run node deck-builder/test.cjs for syntax, image matching, metadata, preservation, and fixed-base merge checks. GitHub Pages checks generated-file parity and packages the tool alongside unchanged Studio v5.0 after approved changes reach main.

Image matching uses linked ID, then exact normalized title/name, then shared trigger; ambiguous matches are skipped. Supports extension adventure exports and backups, embedded raster images and HTTP(S) image URLs. External image hosts may receive image requests. Images are for browsing and are not inserted into the AI Dungeon card export.

## Verification

Node checks cover exact core-card ordering/preservation with zero or two selected villagers, 250 portrait matches, metadata parsing, tallies, unsafe image URL rejection, and nested fields. Local Chromium downloaded a 68-card JSON that exactly equaled the complete attached base plus Raymond and Shino. Clearing villagers retained 66 exportable core cards. Two-panel layout at 390px showed no horizontal overflow. Earlier targeted checks covered combined filters and tooltip dismissal. Physical mobile browsers and live AI Dungeon import were not tested.

## Random picks and history

Choose 3, 6, or 12 villagers and click Random. Candidates respect every active filter and text search, exclude already-selected villagers, and are sampled without replacement. Existing selections remain. The button becomes Reroll; clicking again replaces only the most recent random batch, retaining its requested size. A different assortment is guaranteed when the candidate pool permits one; overlap between rerolls is allowed. If too few candidates remain, all eligible villagers are selected with a notice.

Clicking elsewhere, changing a control, or focusing another element returns the button to Random and keeps its current picks as ordinary selections. Hover alone does not end reroll mode. Undo and Redo restore exact selected-card contents and order for up to 30 actions, including rerolls and edits. New deck changes discard redo history. Replacing/resetting the roster clears both stacks. The fixed 66-card base is never part of selectable history.

Targeted Chromium checks: six filtered random picks plus manual Raymond retained seven selections across reroll; the batch changed, Undo restored the first exact assortment, and Redo restored the second. Clicking the filename restored Random appearance. A single eligible female octopus was selected when requesting twelve; a new manual selection after Undo disabled Redo. Node tests cover sizes 3/6/12, uniqueness, empty/limited pools, and alternative assortments.

The selected-villager panel stretches to the roster height and assigns remaining space to its list. Chromium verified no core-deck section, a closed-by-default breakdown that opens to correct tallies, a 518px list at the checked desktop viewport, and 67 total cards after selecting Raymond. No browser errors.

The filename, JSON export button and preservation note now sit in the page-title row above the selected-deck column, aligned to its right edge. On narrow screens they stack below the title. Chromium verified matching desktop right edges, export controls above the panel, a 679px selected list at the checked viewport, and no overflow at 390px.


The left panel starts at search and filters. Removed header space is assigned to the portrait scroller (620px at the checked desktop viewport). Chromium verified no upload inputs, no console errors, and intact header export/collapsed statistics.

Community-focused display: the main number counts 19 Town NPCs plus selected villagers; the full 66-card base still exports. Intro reads A New Adventure / Choose your villagers & build your community. Roster catchphrases carry a speech-bubble emoji. Chromium verified six random selections display 25 and 19 Town NPCs + 6 Selected Villagers, with a speech bubble before crisp.

