# Story Card Studio v5.1 — Frozen Controls, Color Key, Merge Arrows (preview candidate)

**Status:** TEST-PAGES DEVELOPMENT CANDIDATE — not promoted to production.
**Baseline:** main Story-Card-Studio-v5.1.html Git blob `618c5b11858e7a3249fbbfc20ec952410fcefd30`.
**Candidate Git blob:** `2e10e1a34034bd637e772aea41693866b5ed91cd`.
**Candidate SHA-256:** `6a44d86f0a9a7518ca19984cc95dc782e7ea710d824b8189ee87e3fb45e817b4`.
**Isolated Pages preview SHA-256:** `1b80e6cc926b47cd04cd218db879b7bc41ebf75b9345663999355e78a1721a7d`.

## Requested changes

1. Story Card Editor frozen header (`#cardsPage .library-controls`): remove the `65%` maximum height and independent `overflow-y:auto`; allow its full text and controls to remain visible, stationary, and non-scrollable above the tiles.
2. Story Cards tile section (`#cardsPage .library-scroll`): preserve independent desktop vertical scrolling, with a lower stacking position than the header. Mobile stays in the established document-scrolling layout (no independent list scroller).
3. Color Key hover/focus popup: raise header stacking context above the tiles and tooltip z-index within it. Allow overflow out of the unscrollable header, instead of masking/clipping the popup. Align the tooltip left on narrow phones so it stays within the viewport.
4. Merge JSONs First/Second Set: change both `↓ Add Cards from Editor` labels to `← Add Cards from Editor`. Import semantics and click handlers unchanged.

No Story Card data, parser, export behavior, RE state, Merge selection logic, storage key, production version, historical v5.0, or production Pages link changes are included.

## Verification

- **PASS:** Chromium with inline HTML injected into the browser at viewport sizes **1600×900**, **1000×800**, and **390×844**. **34/34 focused responsive assertions**: RE Demo Cards loaded (24 records), Color Key appears and is visually topmost (measured by elementFromPoint), popup fits horizontally, frozen controls cannot scroll, tile section scrolls independently on desktop, header position is stationary when tiles move, mobile document layout remains, both labels exact, and no JavaScript errors.
- **PASS:** 49/49 focused deterministic JavaScript/source checks against the changed HTML, including existing 45 validations and four new contract assertions.
- **PASS:** Extracted inline JavaScript parses under Node `--check`; no functional JS was changed.
- **NOT RUN:** Physical iPhone Safari, live GitHub Pages browser navigation, and native AI Dungeon import.
- **RELEASE BOUNDARY:** Main/production `Story-Card-Studio-v5.1.html` remains checksum-protected. Only the separately hosted `test-pages/` preview should use this development candidate until the owner requests promotion.

## Acceptance

On desktop in RE mode, hover Color Key while the tile list contains many cards; tooltip should appear fully above them. Scroll the tile list and confirm the Story Cards heading/search/help never move independently. On mobile, verify the tooltip stays within horizontal bounds; the page remains naturally scrollable. Check both Merge source-arrow labels.
