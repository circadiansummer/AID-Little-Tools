# Encounter Analysis highlight experiment

**Status:** Implemented and browser-tested in isolated development copies. **Not released, not merged, not deployed.** The locked desktop v4.12, current mobile touch prototype, and Vercel testing site have not been changed.

## Files
- `desktop-color-dev.html` — independent desktop development copy.
- `mobile-color-dev.html` — independent mobile touch development copy.
- `STORY_CARD_HIGHLIGHT_HANDOFF.md` — behavior, exact color map, verified scope, and integration notes.
- `TESTING.md` — acceptance criteria and known verification gaps.

## Implemented behavior
- Encounter Analysis left rail includes `Card Border Highlight` dropdown between encounter search and + Act/+ Card: **No Highlight**, **Highlight by Importance** (default), **Highlight by Rarity**, **Highlight by Duration**.
- **Importance** is ASAP green, Required gold, Optional neutral. **Rarity** uses the pre-existing editor color key. **Duration** maps Very Short to Common green, then Short→Rare blue, Default→Very Rare purple, Long→amber and Very Long→rose.
- The `ⓘ Color Key` labels on both tabs use a single space after the symbol. Editor displays Importance/Rarity; Encounter Analysis displays Importance/Rarity/Duration. Popovers support hover, click/tap, keyboard/Escape.
- Encounter Spread stacked bar, donut, and legends share exactly these color mappings, including the new duration chart palette. Chart dimension control remains independent of border-highlight mode.
- Selection retains an independent purple outline without concealing metadata border colors.
- No edits to creator Story Card contents or JSON schema.

## Verification, preservation, distribution
- Development SHA-256: `desktop-color-dev.html` = `71a8b358e738bd4072f64f4aa5bfdb0a64d314811f16f9301560cd9afe57e650`; `mobile-color-dev.html` = `86b8b7016dcf38f145e0be8979854bc3f39d5b02174455cb30cabb4e37dfb852`.
- Test suite: 83 Chromium assertions (desktop 1400×900 and mobile emulation 390×844), PASS on 2026-10-20, rerun successfully; no reported browser JS errors. Node JS syntax checks were reported PASS during development.
- Real iPhone Safari, AI Dungeon integration, full regression coverage, and Vercel deployment of these experimental builds: **NOT RUN**.
- No desktop/mobile layout override per creator decision: final integration should use responsive layout and device input capability detection.
- Suggested distribution: desktop portable single HTML + optional ZIP, mobile offline-first PWA installed once over HTTPS, with explicit JSON export/backup instructions.
- Desktop v4.12 SHA-256 remains `516ae4a06fe9712bf0a3e073ef520bfe78026f42599dda5baa6ae376ef21edf2`.
- Changes to the desktop baseline or publication require separate creator approval.

The original local development bundle (not separately committed here) includes `build_story_card_color_devs.py`, `test_story_card_color_devs.py`, and two screenshots. See the handoff for reproducible test details.
