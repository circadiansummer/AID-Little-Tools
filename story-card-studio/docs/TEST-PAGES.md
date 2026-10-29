# Story Card Studio — GitHub Pages test preview

**Status:** Configured by the repository's GitHub Pages workflow. **A publicly served preview is available only after the Actions deployment succeeds**; the presence of these files in GitHub alone does not prove a working public URL.

## Open the test editor

- **Test preview:** https://circadiansummer.github.io/AID-Little-Tools/test-pages/
- **Direct preview HTML:** https://circadiansummer.github.io/AID-Little-Tools/test-pages/Story-Card-Studio-v5.0.html
- **Confirmed production editor:** https://circadiansummer.github.io/AID-Little-Tools/
- **Pages workflow:** [story-card-studio-pages.yml](../../.github/workflows/story-card-studio-pages.yml)
- **Actions results:** https://github.com/circadiansummer/AID-Little-Tools/actions/workflows/story-card-studio-pages.yml

## How this preview is isolated

GitHub Pages supports one site for a repository. Rather than replacing the production application or selecting a preview branch as the entire Pages source, the workflow deploys a dedicated **`/test-pages/` path** within the same site artifact.

The workflow checks out the UX candidate at the pinned commit `c172d2a92282adb24224ff36be1fa9eaebf4e4dc`, checks the candidate's SHA-256 before use, and runs its 29 focused checks. The workflow then copies the candidate into `test-pages/Story-Card-Studio-v5.0.html` with only these deliberate changes:

1. Workspace `STORAGE_KEY` becomes `story-card-studio-project-v1-test-pages` instead of the production browser storage key.
2. Undo `UNDO_STORAGE_KEY` becomes `story-card-studio-deleted-card-v1-test-pages`; Find & Replace presets already derive from the workspace key.
3. Browser tab title appends **TEST PREVIEW**, to distinguish this URL from production.

The test redirect is marked `noindex,nofollow`. The root production editor and its documented baseline SHA-256 are **not modified**; the Deck Builder remains part of the Pages artifact. The Actions workflow updates the site artifact as a whole, but test code runs solely under the separate path.

## Pinned hashes

- Reviewed UX candidate SHA-256: `adec93ddcdaefa905a30b173b1da5c7b7c24fa66c5aa460255b9ea0879a36fd2`.
- Isolated test preview (three deterministic changes above) SHA-256: `7499323c95b27cffca6378f491cbcb1fcb135e45a86b1fce597d14dee18ec62c`.
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
