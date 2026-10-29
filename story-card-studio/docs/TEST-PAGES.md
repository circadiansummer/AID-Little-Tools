# Story Card Studio — GitHub Pages test preview

**Status:** GitHub Actions deployment **succeeded** on October 29, 2026. The workflow confirmed the isolated preview package and deployed the site artifact. This is GitHub-side delivery verification; a separate direct HTTP/interactive test of the public URL was not possible in the current ChatGPT environment.

**Deployment evidence:** [GitHub Actions run 40814040969](https://github.com/circadiansummer/AID-Little-Tools/actions/runs/40814040969) on commit [e03d9b9](https://github.com/circadiansummer/AID-Little-Tools/commit/e03d9b9cbc588a7bfeb5a7038be7f562a48d456f): **Package approved v5.0 static files: success; Deploy v5.0: success.** Build logs confirm **29/29** focused source checks passed, both expected preview SHA-256 values matched, and `test-pages/index.html` plus `test-pages/Story-Card-Studio-v5.0.html` were included in the uploaded Pages artifact. GitHub reported the deployed environment URL as `https://circadiansummer.github.io/AID-Little-Tools/`.

## Open the test editor

- **Test preview:** https://circadiansummer.github.io/AID-Little-Tools/test-pages/
- **Direct preview HTML:** https://circadiansummer.github.io/AID-Little-Tools/test-pages/Story-Card-Studio-v5.0.html
- **Confirmed production editor:** https://circadiansummer.github.io/AID-Little-Tools/
- **Pages workflow:** [story-card-studio-pages.yml](../../.github/workflows/story-card-studio-pages.yml)
- **Actions results:** https://github.com/circadiansummer/AID-Little-Tools/actions/workflows/story-card-studio-pages.yml

## How this preview is isolated

GitHub Pages supports one site for a repository. Rather than replacing the production application or selecting a preview branch as the entire Pages source, the workflow deploys a dedicated **`/test-pages/` path** within the same site artifact.

**Latest test candidate (October 28, 2026):** Updated **Upload JSON to Studio**, **↓ Add Cards from Editor**, **Deselect**, and three confirmation-gated **Clear** controls. The development suite passed 44/44 focused checks and 81/81 new Chromium browser checks; 92/92 prior editor/merge regression checks also passed. The same preview URL continues to serve the pinned build; production stays unchanged.

The workflow checks out the UX candidate at the pinned commit `460d9551ee360b1d7241fdf38c7e615f20d3962a`, checks the candidate's SHA-256 before use, and runs its 29 focused checks. The workflow then copies the candidate into `test-pages/Story-Card-Studio-v5.0.html` with only these deliberate changes:

1. Workspace `STORAGE_KEY` becomes `story-card-studio-project-v1-test-pages` instead of the production browser storage key.
2. Undo `UNDO_STORAGE_KEY` becomes `story-card-studio-deleted-card-v1-test-pages`; Find & Replace presets already derive from the workspace key.
3. Browser tab title appends **TEST PREVIEW**, to distinguish this URL from production.

The test redirect is marked `noindex,nofollow`. The root production editor and its documented baseline SHA-256 are **not modified**; the Deck Builder remains part of the Pages artifact. The Actions workflow updates the site artifact as a whole, but test code runs solely under the separate path.

## Pinned hashes

- Reviewed UX candidate SHA-256: `e8fdaa69d9e3004905b23145414a960f14791bfa65bc4ba73ab5e663a73097cd`.
- Isolated test preview (three deterministic changes above) SHA-256: `743940ee2c20b8711df7b70ba2dcca57ea69593add26692765c0316e73873888`.
- Production editor SHA-256 in [V5.0-BASELINE.md](V5.0-BASELINE.md) remains `d6f4685d32a2b897819afcf5d0a173869005e65c7e5e162cec956c3cf4dc8e4b`.

The script [prepare-test-pages.cjs](tests/prepare-test-pages.cjs) fails rather than publishing if either preview checksum changes or expected storage key markers are absent.

## How to test

1. Open the [Actions workflow](https://github.com/circadiansummer/AID-Little-Tools/actions/workflows/story-card-studio-pages.yml); confirm **Package approved v5.0 static files**, **Verify editor UX preview source and package isolated test-pages**, and **Deploy v5.0** succeeded.
2. If Pages is not enabled, select **Settings → Pages → Build and deployment → Source: GitHub Actions**, then rerun the workflow from `main` (see [GitHub Pages guide](GITHUB-PAGES.md)).
3. Visit the preview URL. The tab title should include **TEST PREVIEW**. The editor still identifies as v5.0 in its on-page heading.
4. Use **Demo Cards** to load disposable data, and test blank Entry/Keys JSON export, button labels, collapsed Types on Editor and Merge, responsive layout, and long lists with the fixed top controls.
5. Verify real iPhone Safari behavior separately if available. Chromium responsive emulation is not native Safari.

**Public preview warning:** The repository and GitHub Pages URL are public. Do not embed confidential cards, keys, credentials, tracking, or user-provided JSON in the static artifact. User-imported JSON remains client-side, but exporting JSON is still essential for backup.

## Updating the preview safely

Do not make the development branch an unrestricted Pages publication source. After code changes have been tested, update the **pinned commit**, **source SHA-256**, and **expected generated preview SHA-256** together; rerun focused tests and the published-preview smoke test. Do **not** change production v5.0 HTML, checksum, Pages root redirect, or public releases unless separately authorized.

**Verification distinction:** A successful workflow plus accessible URL verifies hosting. It does not by itself certify functionality on a physical iPhone or live AI Dungeon integration.
