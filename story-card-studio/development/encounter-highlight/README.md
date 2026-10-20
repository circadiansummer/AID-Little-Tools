# Encounter Analysis UI experiments

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

## Additional development features (2026-10-20)
- Encounter Analysis now includes a sixth matching metric tile immediately after Awareness bypass: **Cards in Largest Act**. It shows the maximum number of encounter cards belonging to one Act, and the sublabel **Largest Act: Act N**. Ties use the lowest Act number. Cards are counted from live editor data and the metric refreshes with the normal analysis render.
- Visible navigation tabs, workspace headings, and the mobile View selector use **🃏 - RE Encounter Analysis**, **🎲 - RE Settings**, **🎭 - Inner Self Settings**, and **🪪 - Auto-Cards Settings**.
- Encounter Analysis and RE Settings use bold **Required for Use:** before the existing Random Encounters installation links. Inner Self and Auto-Cards configuration descriptions use the requested revised copy, bold callouts, and the linked [LewdLeah/Inner-Self repository](https://github.com/LewdLeah/Inner-Self).
- User-facing terminology is standardized to **Inner Self** and **Auto-Cards**; internal identifiers and original Story Card entries, Notes, keys and imported JSON remain unchanged.
- **Verification of this revision**: inline JS parse checks PASS for both files, static copy/navigation checks PASS, four independent pure-JavaScript largest-Act count/tie cases PASS. New browser/UI/AI Dungeon/iOS Safari testing **NOT RUN**; the 83 historical Chromium checks predate these additional changes.

## Verification, preservation, distribution
- Development SHA-256 (current): `desktop-color-dev.html` = `e5be4a9912de23b9d1d1ee90c2b8d720c815fafee04e442b83ad60a1b66f2c31`; `mobile-color-dev.html` = `693ff9966fc5e54d52595a4df716ac9e0cbc6a4ae041bccc1ecc936ce641c7b8`.
- **Previous highlight-only revision**: 83 Chromium assertions (desktop 1400×900 and mobile emulation 390×844), PASS on 2026-10-20, rerun successfully; no reported browser JS errors. Node JS syntax checks were reported PASS during that development.
- Real iPhone Safari, AI Dungeon integration, full regression coverage, and Vercel deployment of these experimental builds: **NOT RUN**.
- No desktop/mobile layout override per creator decision: final integration should use responsive layout and device input capability detection.
- Suggested distribution: desktop portable single HTML + optional ZIP, mobile offline-first PWA installed once over HTTPS, with explicit JSON export/backup instructions.
- Desktop v4.12 SHA-256 remains `516ae4a06fe9712bf0a3e073ef520bfe78026f42599dda5baa6ae376ef21edf2`.
- Changes to the desktop baseline or publication require separate creator approval.

The original local development bundle (not separately committed here) includes `build_story_card_color_devs.py`, `test_story_card_color_devs.py`, and two screenshots. See the handoff for reproducible test details.
