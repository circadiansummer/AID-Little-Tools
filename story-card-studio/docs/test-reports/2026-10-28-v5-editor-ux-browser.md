# Story Card Studio v5.0 editor UX — browser verification (development candidate)

**Date:** October 28, 2026 (America/Chicago)  
**Branch:** `develop/v5.0-editor-ux`  
**HTML:** `story-card-studio/Story-Card-Studio-v5.0.html`  
**Git blob SHA:** `9e58b36c0a9d971503c5470a1949a122fd89f1de`  
**SHA-256 of candidate HTML:** `adec93ddcdaefa905a30b173b1da5c7b7c24fa66c5aa460255b9ea0879a36fd2`

## Results

**PASS — 29/29** focused Node-compatible syntax/source and isolated rendering/validation assertions (saved at `docs/tests/editor-ux-v5.cjs`).

**PASS — 92/92** Playwright Chromium browser checks against the standalone candidate HTML:

| Browser viewport | Checks | Outcome |
| --- | ---: | --- |
| 1600 × 1040, desktop | 31 | PASS |
| 1000 × 860, narrow desktop | 31 | PASS |
| 390 × 844, mobile emulation | 30 | PASS |

Browser checks exercised upload/import, blank Keys and Entry export, custom field preservation, label exactness, Type collapsing and re-expansion by search, stacked/columns layouts, desktop independent scrolling versus mobile document scrolling, source/merged group toggles (independent across all three Merge columns), preservation of merge selection counts, download of unchanged JSON records, and absence of JavaScript page errors.

**PASS — 2 additional targeted desktop behavior checks:** Moving a card by drag-and-drop into a collapsed Type reopens the destination and keeps the card. A separate already-collapsed Type stays collapsed after unrelated selection/rerender.

**PASS — RE-enabled regression:** With RE Support enabled, 18 `RAND_##` encounters in the 24-card fixture produced identical Act Structure SVG and metrics with and without an additional 120 unrelated cards. The resulting 144-card JSON exported, and JavaScript emitted no page errors.

The source HTML was reconstructed byte-for-byte from the original canonical v5.0 artifact in the user's Library (the original bytes matched GitHub's baseline SHA-256), patched locally with the exact reviewed substitutions, and its Git blob hash matched the GitHub development branch blob.

## Test boundaries

- **NOT RUN:** physical iPhone/iPad Safari, Firefox, WebKit, hosted GitHub Pages and native AI Dungeon import validation. Emulated mobile Chromium is not native Safari.
- The 5,000-card limit was retained and verified through focused function tests, not a complete 5,001-card browser export run.
- Browser interaction results do **not** automatically authorize promotion from development to `main`.

## Acceptance

User review of the candidate's exact button labels and collapsing/scrolling feel remains the release decision. The confirmed v5.0 on `main` is unchanged, and the historical v4.12 snapshot remains preserved.
