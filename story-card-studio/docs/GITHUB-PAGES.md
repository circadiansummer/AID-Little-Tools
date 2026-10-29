# GitHub Pages deployment — Story Card Studio v5.1

The Pages site serves the **canonical v5.1 application** at the root plus the Deck Builder. Existing links to `/Story-Card-Studio-v5.0.html` continue to load **v5.1** via an exact-copy Pages compatibility alias; they are not redirected to a broken path or an obsolete editor. A separate **test preview** of that same v5.1 source is also available at `/test-pages/` once the Pages Actions workflow succeeds. The preview uses isolated browser storage keys; see [Test Pages](TEST-PAGES.md). The original v5.0 source remains historical in GitHub. Historical v4.12 builds and private creator examples are not published. The source repository and the preview URL are public.

## Addresses

- **Intended website:** https://circadiansummer.github.io/AID-Little-Tools/
- **Stable original v5.0 URL (now loads v5.1):** https://circadiansummer.github.io/AID-Little-Tools/Story-Card-Studio-v5.0.html
- **Direct v5.1 HTML:** https://circadiansummer.github.io/AID-Little-Tools/Story-Card-Studio-v5.1.html
- **Preview URL:** https://circadiansummer.github.io/AID-Little-Tools/test-pages/
- **Source of truth:** [Story-Card-Studio-v5.1.html](../Story-Card-Studio-v5.1.html)
- **Deployment workflow:** [story-card-studio-pages.yml](../../.github/workflows/story-card-studio-pages.yml)
- **GitHub Actions:** https://github.com/circadiansummer/AID-Little-Tools/actions
- **Pages settings:** https://github.com/circadiansummer/AID-Little-Tools/settings/pages

## Enable publication (repository administrator)

1. Open **Settings → Pages → Build and deployment** in the repository.
2. Change **Source** to **GitHub Actions**. Do not select “Deploy from a branch”; the v5.1 website requires an isolated artifact from a subfolder.
3. Open **Actions → Publish Story Card Studio v5.1 to GitHub Pages**. If a prior run failed before Pages was enabled, select **Run workflow** on branch `main`, or use **Re-run jobs** on the failed run.
4. Check that the **Package approved v5.1 static files** and **Deploy v5.1** jobs both complete successfully.
5. Open the site URL above. The root `index.html` redirects to the versioned v5.1 page.

The workflow runs automatically when the v5.1 HTML, its root redirect, the baseline checksum document, or this workflow changes on `main`. It can also run manually through `workflow_dispatch`. **This is the sole supported hosted deployment process for Story Card Studio going forward.** Whenever v5.1 HTML changes, update its SHA-256 in the baseline document in the same commit so the workflow can verify the exact new bytes.

## Why the workflow verifies a checksum

The deployed application must exactly match the canonical SHA-256 documented in [V5.1-BASELINE.md](V5.1-BASELINE.md). If the HTML changes without an approved, documented baseline update, the workflow **fails instead of silently publishing a new application version**. Record new testing results and an updated checksum before intentionally publishing subsequent revisions.

The workflow uploads the verified v5.1 editor **twice under the v5.0 and v5.1 public filenames**, a Pages-specific root redirect to the stable v5.0 filename, the standalone Deck Builder, `.nojekyll`, and the separate `/test-pages/` preview (also carrying both public filenames). Both editor copies must be byte-identical to the checksum-verified v5.1 source, or deployment fails. The historical GitHub v5.0 source file is left untouched. The **v5.1 production HTML is copied without alteration** under both filenames; only the hosted redirect is adjusted. The preview is generated from the same checksum-verified v5.1 production HTML, changing only two browser storage keys and appending a browser-title suffix. Checksum gates verify both the exact source and exact preview bytes. A deployment is distinct from a GitHub Release or tag; neither is created by this workflow.

## Hosted verification checklist

1. Open both the root URL and the direct versioned URL in a modern browser. Confirm the page says **Story Card Studio v5.1** rather than v4.12 and that navigation works.
2. Confirm RE Support OFF loads the established seven-card demo. Confirm RE Support ON loads 24 total cards, including 18 encounters across three Acts.
3. Import a non-sensitive sample Story Card JSON file, make a change, export it, and verify that creator metadata and all unedited fields are preserved.
4. Check desktop layout and mobile Safari navigation, editing, touch-drag cancellation, and file export. Browser emulation is **not** a substitute for testing on a physical iPhone.
5. Confirm the browser console has no unexpected network errors. Workspace processing is client-side; users should still export JSON for backups because browser storage is not durable cross-device storage.

**Privacy:** The static website is public. Do not place private user Story Card JSON, private examples, credentials, tracking scripts or telemetry in the Pages artifact. Story Card Studio processes imported data locally in the browser; hosting the HTML does not create a remote Story Card database.

## References

- [GitHub Docs: Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Docs: Using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Docs: Deploying your website automatically](https://docs.github.com/en/get-started/start-your-journey/deploying-your-website-automatically)
