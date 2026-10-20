# Encounter Highlight — acceptance and regression

**Status:** Desktop and mobile Chromium checks PASS (83 assertions total on 2026-10-20); iPhone Safari NOT RUN; unchanged locked desktop v4.12; no deployment of this experiment.

## Quick regression

1. Open `desktop-color-dev.html` in a desktop browser, or `mobile-color-dev.html` on iOS Safari through a protected HTTPS test host.
2. Toggle Random Encounters support on, load Demo Cards and open **#RE - Encounter Analysis**.
3. Verify the dropdown occurs between **Search encounters** and **+ Act / + Card**, with exactly **No Highlight**, **Highlight by Importance**, **Highlight by Rarity**, **Highlight by Duration**. Default is Importance.
4. Set each mode and verify the left rail has the exact corresponding border colors from `STORY_CARD_HIGHLIGHT_HANDOFF.md`. **No Highlight** is neutral; selecting a card retains a separate purple focus outline.
5. Verify **ⓘ Color Key** (U+24D8, one ASCII space, “Color Key”) on both **Story Card Editor** and **Encounter Analysis**.
6. Editor key shows Importance and Rarity only. Encounter Analysis key shows Importance, Rarity **and Duration**, in consistent colors. Hover, click/tap, focus, Escape and narrow-screen positioning all work.
7. In Encounter Spread, select Importance, Rarity, Duration in turn and check stacked bar, donut slices and legend swatches use the same corresponding palette as borders/key. Check chart selection and rail highlight selection are **independent**.
8. Create/edit a real encounter with changes in rarity, importance and duration. Verify immediately updated swatches without altering stored JSON beyond intentional metadata edits.
9. Check cards remain draggable across Types/Acts on touch devices, including cancellation and edge auto-scroll; check selection, fullscreen details, RE support toggle, undo, and keyboard interactions.
10. Import and export AI Dungeon Story Card JSON with custom fields; compare values, titles, keys, Notes and Entry; verify no new color/highlight metadata was added to exported card records.
11. Confirm wide desktop layout, narrow mobile layout, and horizontal iPad touch behavior. No desktop/mobile manual layout toggle.

## Automated evidence

Development suite `test_story_card_color_devs.py` (in the generated local development ZIP) was executed and passed **41 desktop + 42 mobile assertions** under Chromium emulation. The ZIP also retains `build_story_card_color_devs.py` and two screenshots. Both HTML builds have checksums in the README. This report does not imply an actual iOS Safari run.

## Merge gate

Review, then create a **new combined responsive development candidate** using shared color constants and shared metadata logic. Keep the frozen desktop v4.12 and existing mobile touch prototype untouched. Physical iOS Safari, import/export and gesture regressions must pass before an approved release or replacement of the hosted test site.
