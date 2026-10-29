# Story Card Studio — v5.1 GitHub Pages test-pages

**Active version:** Story Card Studio v5.1, owner-promoted October 28, 2026 (America/Chicago).  
**Preview URL:** https://circadiansummer.github.io/AID-Little-Tools/test-pages/  
**Stable preview URL (loads current v5.1):** https://circadiansummer.github.io/AID-Little-Tools/test-pages/Story-Card-Studio-v5.0.html  
**Direct v5.1 preview file:** https://circadiansummer.github.io/AID-Little-Tools/test-pages/Story-Card-Studio-v5.1.html  
**Production:** https://circadiansummer.github.io/AID-Little-Tools/  
**Workflow:** [story-card-studio-pages.yml](../../.github/workflows/story-card-studio-pages.yml)  
**Current verification:** [V5.1-TESTING.md](V5.1-TESTING.md)

## Current deployment evidence

**PASS — GitHub Pages:** [Workflow run 40817679641](https://github.com/circadiansummer/AID-Little-Tools/actions/runs/40817679641) completed successfully after the v5.1 promotion and preview path fix. It packaged `Story-Card-Studio-v5.1.html` at the root, `test-pages/Story-Card-Studio-v5.1.html`, and the test-pages redirect, verified SHA-256 checksums for both copies, and executed 45/45 focused tests. The deploy job reported success. Direct live-site HTTP verification from ChatGPT was blocked; a successful workflow is deployment evidence rather than an independent remote browser test.

## Isolation and checksum gates

The Pages workflow checks out **main**, verifies the standalone `Story-Card-Studio-v5.1.html` SHA-256 against [V5.1-BASELINE.md](V5.1-BASELINE.md), runs the [45-check v5.1 focused suite](tests/editor-ux-v5.1.cjs), and packages the verified root app and Deck Builder. A separate `test-pages/` copy derives from the **same** source, with only the following intentional differences:

- Production `STORAGE_KEY` becomes `story-card-studio-project-v1-test-pages`.
- Production `UNDO_STORAGE_KEY` becomes `story-card-studio-deleted-card-v1-test-pages`; Find/Replace preset storage also derives from the isolated key.
- Browser tab title becomes `Story Card Studio v5.1 — TEST PREVIEW`.

The script [prepare-test-pages.cjs](tests/prepare-test-pages.cjs) rejects unexpected changes via two checksums:

- v5.1 canonical source SHA-256: `8b7b1c110e30d83ed304fd99b8c7be0cbc7f105b2dc8370ebc3261ad4ad712a4`.
- v5.1 isolated preview SHA-256: `2c91087a75827f75263cd01f6feb37adaa7132537bb646f2911ba53bead98d6c`.

The preview now ships byte-identical copies under **both** `test-pages/Story-Card-Studio-v5.0.html` and `test-pages/Story-Card-Studio-v5.1.html`, while its index opens the older filename for incoming links. The live editor retains the existing v5.0 production browser storage key to preserve current workspaces on upgrade. `/test-pages/` does **not** share autosaved editor state with the root production app. This is a publicly reachable GitHub Pages site; do not embed private user data in HTML/source artifacts.

## How to verify publication

1. Open [GitHub Actions](https://github.com/circadiansummer/AID-Little-Tools/actions/workflows/story-card-studio-pages.yml) and confirm both **Package approved v5.1 static files** and **Deploy v5.1** succeed on the v5.1 promotion commit.
2. Open the root URL and the test-pages URL. The root loads `Story Card Studio v5.1`; test-pages loads the same UI with `TEST PREVIEW` appended to the browser tab.
3. Confirm the RE mode switching, JSON export (including blank Entry/Triggers), **Deselect All** behavior, confirmation/cancellation for Clear, Type collapse and board scrolling on the target browser.
4. Test actual iPhone Safari separately if relevant; desktop/emulated Chromium does not prove Safari behavior.

Historical test-preview deployments from October 28–29 used the v5.0 UX branch and are recorded in GitHub Actions runs [40814040969](https://github.com/circadiansummer/AID-Little-Tools/actions/runs/40814040969) and [40816165604](https://github.com/circadiansummer/AID-Little-Tools/actions/runs/40816165604); those earlier artifacts are not v5.1 evidence. No GitHub Release/tag is created by Pages publishing.
