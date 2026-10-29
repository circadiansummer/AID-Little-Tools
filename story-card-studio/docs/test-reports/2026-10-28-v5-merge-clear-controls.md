# Story Card Studio v5.0 — Merge source Clear and Deselect test report

**Date:** October 28, 2026 (America/Chicago)  
**Target:** `develop/v5.0-editor-ux`, **not** the production Story Card Studio v5.0 build on `main`  
**Reviewed standalone HTML SHA-256:** `e8fdaa69d9e3004905b23145414a960f14791bfa65bc4ba73ab5e663a73097cd`  
**Reviewed Git blob:** `0a53bca0f6414958a9e8754e27d350ce83397be0`  
**Preview output SHA-256 after its isolated storage-key/tab-title substitutions:** `743940ee2c20b8711df7b70ba2dcca57ea69593add26692765c0316e73873888`.

## Functional contract

- Story Card Editor toolbar: `Upload JSON to Studio`.
- Merge First and Second Set: `↓ Add Cards from Editor` retains the existing load/replace-with-confirmation behavior.
- Merge First and Second Set: `Deselect` clears selection only; cards stay loaded.
- **Clear** to the right of Deselect: confirmation before emptying that source column, clearing filename/collapse state, and removing its selected entries from center. A canceled dialog leaves all contents unchanged, and an unrelated source remains available.
- Merge center **Clear**: confirmation before deselecting all cards in both sources to empty the merged column. It does **not** delete source cards or modify the Story Card Editor workspace.

## Verification

**PASS — 44/44** focused source/behavior checks: inline JS parsing, preexisting Editor UX checks, exact new labels and button IDs, source/center confirmation/cancel logic, drop state, collapse logic, and preservation of the other source.

**PASS — 81/81** headless Chromium Playwright behavior assertions: 27 checks each at **1600×1040**, **1000×860**, and **390×844**. Tests uploaded two JSON sets, selected/deselected them, confirmed and canceled both Clear types, checked disabled states, ensured right-source records survived clearing the left source, verified center reset retained both sources, then downloaded the surviving selected card and confirmed its custom metadata.

**PASS — 92/92** existing Chromium editor/merge regression assertions rerun with the updated labels at the same three viewport widths: blank-field export and import, custom JSON metadata, Type collapse, fixed controls/scroll, merge download, and the RE-related editor UI. No browser `pageerror` exceptions observed.

**PASS — Node.js syntax check** on the extracted inline HTML script. The local standalone artifact matches the GitHub blob by Git's content hash.

## Not run

Native Safari on physical iOS/iPadOS hardware, GitHub Pages hosted runtime check, live AI Dungeon import validation. Prior RE chart-scale/regression evidence remains applicable to the unmodified chart code but was not rerun for this text/button-only change.

## Publication boundary

The current `main` production HTML and historical releases are not changed by this development update. The GitHub Pages test-preview workflow is independently checksum-pinned and must be refreshed to the exact reviewed branch commit and hash to serve this new candidate. Do not describe a Pages URL as updated until its workflow has completed successfully.
