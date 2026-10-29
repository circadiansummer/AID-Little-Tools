# AID Little Tools

Utilities for AI Dungeon creators.

**[Quick Memory Menu](quick-memory-menu/README.md)** — a browser extension that opens AI Dungeon memories with one button and adds keyword search. [Firefox instructions](quick-memory-menu/FIREFOX.md) · [Chrome instructions](quick-memory-menu/CHROME.md).

**New: [Story Card Deck Builder](deck-builder/Story-Card-Deck-Builder.html)** — choose from a bundled character roster, match Better Dungeons portraits, and merge selected cards with your own JSON. [Usage and build instructions](deck-builder/README.md).

**Current active application: [Story Card Studio v5.1](story-card-studio/Story-Card-Studio-v5.1.html)** — one responsive, self-contained HTML tool for desktop and mobile.

- [Story Card Studio README](story-card-studio/README.md) — usage, features, version and test status
- [Active browser entry point](story-card-studio/index.html)
- [v5.1 baseline and verification](story-card-studio/docs/V5.1-BASELINE.md)
- [Historical versions](story-card-studio/README.md#historical-files)

The current development and hosting workflow uses **GitHub only**: repository changes are reviewed on `main`, and the checksum-gated GitHub Pages Actions workflow manages any website deployment. Third-party hosting is no longer part of the process. A public GitHub Release or tag remains a separate approval.

## GitHub Pages website — v5.1 (stable v5.0 URL)

**Existing public links are preserved:** [Story-Card-Studio-v5.0.html](https://circadiansummer.github.io/AID-Little-Tools/Story-Card-Studio-v5.0.html) continues to serve the **current v5.1 application** on GitHub Pages. The root website directs there; the explicit [v5.1 URL](https://circadiansummer.github.io/AID-Little-Tools/Story-Card-Studio-v5.1.html) remains available. This compatibility alias affects Pages only; the original v5.0 source in GitHub remains unchanged.

[Open Story Card Studio v5.1](https://circadiansummer.github.io/AID-Little-Tools/) (available after the Pages deployment succeeds). GitHub Actions publishes the checksum-verified canonical v5.1 app at the site root, the Deck Builder, and a browser-storage-isolated v5.1 test-pages copy; v5.0 remains in GitHub history/source only. See the [GitHub Pages setup and verification guide](story-card-studio/docs/GITHUB-PAGES.md). The website is not a GitHub Release.
