> **HISTORICAL DOCUMENT (superseded status).** This file records an earlier development stage. The active main build is now [Story Card Studio v5.0](../Story-Card-Studio-v5.0.html). See the [current README](../README.md) and [v5.0 baseline](V5.0-BASELINE.md). Any older references below to an unmerged desktop/mobile development plan, an active v4.12 build, or a future unified HTML reflect the state **at that time**; preserve their technical findings as historical evidence.

# Story Card Studio — isolated mobile development branch

**Status:** Prototype / separate HTML build. **NOT** merged into locked desktop v4.12. **NOT** tested in real iOS Safari. No GitHub changes.

**Original locked source:** `aid-story-card-editor-v4.12(1).html`
**Original SHA-256:** `516ae4a06fe9712bf0a3e073ef520bfe78026f42599dda5baa6ae376ef21edf2`
**Prototype:** `aid-story-card-editor-v4.12-mobile-dev.html`

## What the mobile prototype changes

- At widths **760px and below**, the seven desktop navigation tabs become a single, touch-sized View selector. RE-only options remain disabled while RE Support is off.
- Header actions wrap into touch-sized controls on phones; main editor layouts become one column.
- Tapping a Story Card opens its **existing** Card Details panel in a full-screen, scrollable mobile editor with a Close details control. Also works from Trigger Analysis, Encounter Analysis, and configuration-card buttons. The editor supports normal Title, Entry, Trigger, Notes, Advanced, and Type/Act fields.
- Reorganize on mobile by **changing Type or Act through Card Details**. Desktop HTML5 drag/drop is preserved at large widths; no simulated finger dragging was added.
- Trigger Analysis and Encounter Analysis rails become bounded scroll regions above their analysis sections; Merge JSONs sources stack vertically (A, B, then merged result).
- Smaller viewport styling, 16px form controls to minimize iOS input zoom, `100dvh` detail pane height, safe-area padding, and improved wrapped headers.
- All mobile UI changes are separated with `MOBILE ISOLATION` comments to ease later integration.
- The mobile prototype uses **separate localStorage and sessionStorage keys** to avoid overwriting the desktop application's saved workspace when both run under the same browser origin.

## Integration plan (later, only with explicit authorization)

1. Review `mobile-isolation.patch` against the locked desktop source and cherry-pick isolated CSS, markup, event handlers, and lifecycle hooks. Do not merge the prototype-specific storage namespaces into the production build; instead decide on one shared storage key for the integrated version.
2. Reconcile with any changes made to desktop after v4.12. Preserve core Story Card normalization/import/export logic and the existing Merge JSONs selection behavior.
3. Verify mobile detail opening and closing after code changes, including its interactions with Undo, deletion, advanced checkboxes and on-screen keyboard.
4. Test directly on iOS Safari, both when hosted over HTTPS and when opened as a local file. Note that **iOS Files Quick Look previews may not run JavaScript**; users must open the HTML in a full browser.
5. Regression-test desktop at 1024, 1440 and 1920px and JSON import/export using native AI Dungeon Story Card fixtures.

## Tests performed

- `node --check` passed for the prototype's embedded JavaScript.
- `test_mobile.py`: **63 checks passed** in mobile Chromium emulation at 320, 375, 390 and 430px, including tab navigation, touch emulation, detail opening, moving Type/Act, RE toggle and desktop fallback.
- `test_io.py`: exact import/export round-trip of nine standard fields plus custom metadata; mobile edit; AutoCards config creation; independent storage names; original source hash.
- **NOT RUN:** iOS Safari / WebKit live test; native mobile AI Dungeon UI.

## Known limitations

- Touch drag-and-drop is not implemented; changing Type/Act is the supported mobile alternative in this prototype.
- Full-screen Card Details opens on the next animation frame after selection (about one rendered frame). Mobile regression tests wait for this rendering step.
- Testing used Chromium's emulated touch viewport, not actual iPhone Safari or Files.app.
- The two builds remain separate until an explicitly approved integration.