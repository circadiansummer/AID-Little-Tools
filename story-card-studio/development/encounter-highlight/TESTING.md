# Encounter Highlight — acceptance and regression

**Status:** Earlier highlight-only build passed 83 Chromium checks on 2026-10-20. Later metric/navigation/setup-copy changes pass static and inline JavaScript syntax checks but have **not** been browser-tested. iPhone Safari NOT RUN; unchanged locked desktop v4.12; no deployment of this experiment.

## Quick regression

1. Open `desktop-color-dev.html` in a desktop browser, or `mobile-color-dev.html` on iOS Safari through a protected HTTPS test host.
2. Toggle Random Encounters support on, load Demo Cards and open **🃏 - RE Encounter Analysis\***.
3. Verify the dropdown occurs between **Search encounters** and **+ Act / + Card**, with exactly **No Highlight**, **Highlight by Importance**, **Highlight by Rarity**, **Highlight by Duration**. Default is Importance.
4. Set each mode and verify the left rail has the exact corresponding border colors from `STORY_CARD_HIGHLIGHT_HANDOFF.md`. **No Highlight** is neutral; selecting a card retains a separate purple focus outline.
5. Verify **ⓘ Color Key** (U+24D8, one ASCII space, “Color Key”) on both **Story Card Editor** and **Encounter Analysis**.
6. Editor key shows Importance and Rarity only. Encounter Analysis key shows Importance, Rarity **and Duration**, in consistent colors. Hover, click/tap, focus, Escape and narrow-screen positioning all work.
7. In Encounter Spread, select Importance, Rarity, Duration in turn and check stacked bar, donut slices and legend swatches use the same corresponding palette as borders/key. Check chart selection and rail highlight selection are **independent**.
8. Create/edit a real encounter with changes in rarity, importance and duration. Verify immediately updated swatches without altering stored JSON beyond intentional metadata edits.
9. Check cards remain draggable across Types/Acts on touch devices, including cancellation and edge auto-scroll; check selection, fullscreen details, RE support toggle, undo, and keyboard interactions.
10. Import and export AI Dungeon Story Card JSON with custom fields; compare values, titles, keys, Notes and Entry; verify no new color/highlight metadata was added to exported card records.
11. Confirm wide desktop layout, narrow mobile layout, and horizontal iPad touch behavior. No desktop/mobile manual layout toggle.

## Added acceptance cases — Cards in Largest Act and setup descriptions (2026-10-20)

12. With Act 1 holding 2 encounters and Act 3 holding 4, the sixth summary tile immediately after **Awareness bypass** reads **4 / Cards in Largest Act / Largest Act: Act 3**, using the same metric tile formatting. Check the three-column and two-column responsive arrangements.
13. With Acts 2 and 5 tied at 3 encounters, the metric reads **3 / Cards in Largest Act / Largest Act: Act 2** (lowest-numbered Act wins). Drag an encounter to a different Act, add/delete encounters, and confirm the metric refreshes without a manual reload.
14. Confirm all navigation tabs and workspace headings read **🃏 - RE Encounter Analysis\***, **🎲 - RE Settings\***, **🎭 - Inner Self Settings\***, and **🪪 - Auto-Cards Settings\***. The mobile View selector must match them.
15. Confirm **Required for Use:** is bold in RE Analysis and RE Settings without changing either AI Dungeon/GitHub link. Confirm Inner Self and Auto-Cards descriptions use the specified copy with bold **Required for Use:** and linked **GitHub** to `https://github.com/LewdLeah/Inner-Self`.
16. Verify all user-visible occurrences read **Inner Self** and **Auto-Cards**, including configuration fieldset headings. Leave internal identifiers and creator-authored cards untouched.
17. Repeat focused JSON import/export, RE Act moves, and touch drag/no-op/cancel checks in Chromium and real iOS Safari before calling this revision browser-verified or integrating into the unified build.

## Automated evidence

The **earlier** highlight-only development suite `test_story_card_color_devs.py` (in the generated local development ZIP) was executed and passed **41 desktop + 42 mobile assertions** under Chromium emulation. The ZIP also retains `build_story_card_color_devs.py` and two screenshots. Updated experimental HTML builds have fresh SHA-256 checksums in the README. The new revision has source-level and inline JS parse checks only; the earlier 83 browser results do **not** prove the new revision. This report does not imply an actual iOS Safari run.

## Merge gate

Review, then create a **new combined responsive development candidate** using shared color constants and shared metadata logic. Keep the frozen desktop v4.12 and existing mobile touch prototype untouched. Physical iOS Safari, import/export and gesture regressions must pass before an approved release or replacement of the hosted test site.

## Scenario-label follow-up — 2026-10-20

- **PASS (source + Node syntax):** Both latest experimental HTML copies match the archived downloadable files by SHA-256; four terminal asterisks appear on navigation tabs/page headings (also in mobile selector); the two Inner Self / Auto-Cards callouts read bold **Required for Use in Scenarios:**; both Random Encounters callouts remain bold **Required for Use:**; script parsing passes with `node --check`.
- **PASS (focused Chromium rendering):** Desktop viewport 1440×844 and mobile emulation 390×844 rendered the four tab labels and four page headings correctly, including the mobile selector, both updated setup descriptions and matching GitHub links; no JavaScript page errors reported. Chromium testing used local HTML content injection rather than `file://` navigation, which the browser environment blocks.
- **NOT RUN:** full editing/drag/JSON regression suite for these files, physical iOS Safari, hosted Vercel build of this revision, AI Dungeon script integrations.
- **SHA-256:** desktop `cc1dfae73732346bcddb9ba8d83fa608821ce5d3f5bcb10888fc19ded43b7870`; mobile `6fd8ca7ae582c79fe9171adc67ecc4042e5d7cc5c5f511bbcea892f8717275a3`.
