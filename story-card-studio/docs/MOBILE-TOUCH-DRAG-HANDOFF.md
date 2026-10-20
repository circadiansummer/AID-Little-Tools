# Story Card Studio — mobile touch-drag development handoff

**Status:** Isolated experimental mobile HTML build, based on the earlier mobile development clone of desktop Story Card Studio v4.12. **Not merged or released**, no GitHub modifications. The desktop v4.12 and first mobile clone are unchanged.

## Paths / integrity

- LOCKED baseline `/mnt/data/aid-story-card-editor-v4.12(1).html`, SHA-256: `516ae4a06fe9712bf0a3e073ef520bfe78026f42599dda5baa6ae376ef21edf2`.
- Original mobile clone `/mnt/data/aid-story-card-editor-v4.12-mobile-dev.html`, SHA-256: `3742c8ff93cf9f8ed1fd9a7ce85953d4344420c133f7d8f89dffe69ed3ebf383`.
- New mobile touch prototype `/mnt/data/aid-story-card-editor-v4.12-mobile-touch-dev.html`, SHA-256: `29f66e6d8ab7c78508a095410afd0480fff01be20c4ecfcc15851e5b4077a751`.
- Surgical generator `build_touch_drag.py` applies changes to original mobile clone; `touch-drag-isolation.patch` compares these two mobile builds.

## New behavior

- On touch-enabled phones 760 px wide or less, hold a Story Card about 390 ms to lift it. A card preview follows the touch; eligible Types or Acts are highlighted. Releasing over an eligible target changes the card through the **existing `moveCard()`** code path. This respects RE Notes/Act semantics and avoids modifying other JSON properties.
- Supports three mobile card views: Story Card board, Trigger Analysis sidebar, and Encounter Analysis Acts sidebar.
- Normal taps still open Card Details; swipe gestures that begin before the 390 ms long-press threshold scroll normally. Multi-select does not initiate touch drag.
- Invalid targets, release without target, Escape, touch cancellation, pagehide and leaving phone width abort without moving anything. Destination same as origin is a no-op.
- Auto-scroll works for vertically scrolling page, Trigger/Encounter list rails, and horizontally scrolling Kanban columns.
- An accessible drag status is announced with `aria-live`; a floating preview indicates the destination. Mobile toast overlays don't intercept touches.
- Type/Act selector in Card Details remains available as an accessibility alternative.

## Verification and limitations

- Browser interactions: **56 touch regression checks** across 320, 375, 390, 430 px plus desktop baseline; **13 additional tests** for Trigger Analysis drag, horizontal/vertical edge scrolling, cancel/no-op.
- Unmodified earlier mobile regression suite: **63 checks**.
- JSON import/export parity, creator custom fields, editing, and AutoCards config creation: PASS (automated Chromium).
- Embedded JS syntax: `node --check` PASS.
- Desktop locked SHA unchanged and original mobile clone unchanged. No GitHub changes.
- **NOT RUN:** Physical iPhone + iOS Safari/WebKit (browser runtime not installed here); actual mobile browser behavior must be verified before integration. AI Dungeon runtime not in scope.

## Manual on-device test sequence

1. Open the standalone HTML in an iOS browser that executes JavaScript. iOS Files Quick Look may only preview the HTML and may not execute JS; hosting the standalone file as a static HTTPS page is safer for Safari testing.
2. Load Demo Cards. Tap a card once; verify full-screen editor opens. Close it.
3. Hold a card for about half a second; confirm preview and highlighted destinations. Drag to another Type and release; confirm card moved.
4. Drag over an invalid destination or release outside Type boundaries; confirm no move. Start a swipe without pausing; confirm normal scrolling.
5. Switch to Columns layout, long-press a card, and hover near the board's right/left edge; confirm horizontal auto-scroll and ability to drop.
6. In Trigger Analysis, long-press a list card; drop onto another type; confirm its Type changed. With Random Encounters enabled, use Encounter Analysis to drag a RAND card between Acts and verify Notes `- Act:` reflects the new Act.
7. Try two fingers, Safari context menu, quick presses, touch cancellation, long lists, landscape layout and page reload. Check card data and JSON export parity.

## Later integration (requires express authorization)

After user accepts on physical iOS Safari, review `touch-drag-isolation.patch` and `mobile-isolation.patch` separately against the current locked desktop branch. Incorporate gesture-specific mobile CSS/JS without changing desktop DnD or story-card data rules; decide storage namespace during integration. Run iOS Safari + desktop + JSON roundtrip checks again. Do **not** treat the mobile prototype as a release.