> **HISTORICAL DOCUMENT (superseded status).** This file records an earlier development stage. The active main build is now [Story Card Studio v5.0](../Story-Card-Studio-v5.0.html). See the [current README](../README.md) and [v5.0 baseline](V5.0-BASELINE.md). Any older references below to an unmerged desktop/mobile development plan, an active v4.12 build, or a future unified HTML reflect the state **at that time**; preserve their technical findings as historical evidence.

# Offline-first distribution plan — proposed, not released

**Assumption:** Typical users work offline roughly 99% of the time. No desktop/mobile manual view toggle; one shared responsive source is the intended final architecture.

## PC / Mac / Linux: portable HTML as the primary deliverable

1. Offer a versioned `Story-Card-Studio-vX.Y.html` file. It should contain all application code, styles and runtime assets inline: no CDN, external network request, login, installer or build step.
2. Offer an optional `Story-Card-Studio-vX.Y.zip` containing the exact same HTML, a README with offline start instructions, sample non-sensitive JSON fixtures, changelog, and SHA-256 checksums. A zipped version is not required for normal use.
3. Users unzip if necessary, then double-click the HTML in Chrome, Firefox, Edge, or Safari. **Do not infer success solely from the filename:** a downloaded GitHub 404/error page can also be saved as `.html`; verify ZIP/checksum and HTML title.
4. Work entirely client-side. Use explicit **Export JSON** and backup reminders; do not treat browser localStorage on `file://` as a guaranteed durable backup or assume local data migrates across file paths and browsers.
5. Before release, test on Windows/macOS/Linux, both direct HTML and extracted ZIP, with network disabled and JSON import/export exercised.

Avoid an Electron/Tauri/native installer unless a demonstrable OS integration need justifies the additional packaging, signing, update and support costs.

## iPhone / iPad: installable offline-first PWA

1. Serve the same approved responsive app from HTTPS (static hosting can be free); use a valid manifest, home-screen icons and an app-display mode suitable for iOS.
2. Add a small versioned service worker that precaches the application shell and all required assets. The app must not need network requests for its editing functionality.
3. User opens the hosted URL in Safari **once while online**, then uses **Share → Add to Home Screen → Open as Web App**, and launches from the Home Screen for offline use.
4. Test Airplane Mode: close the app, reopen from Home Screen, edit a sample, import/export a real JSON file, and inspect stored state. Repeat after device restart/update. Account for browser cache eviction or user clearing website data; **do not guarantee indefinite offline caching**.
5. Offer clear in-app **Export JSON** / **Import JSON** / **Backup** controls. Changing web hostnames does not transfer browser storage; export/import is the migration plan.
6. A single downloaded HTML file opened through iOS Files/Quick Look is **not** an equivalent supported mobile runtime. Third-party HTML viewers are optional technical alternatives, not the default user experience.
7. For Android use the analogous installable PWA path in a supporting browser, tested separately.

## Version/build and merge gates

- Keep desktop v4.12 locked and existing Vercel development deployment unchanged until explicit owner approval.
- Merge the isolated mobile responsive behavior, touch gestures and Encounter Analysis color feature into a **new development candidate**, reusing one shared data and palette implementation.
- Compile both a portable standalone HTML file and a PWA static asset set from the **same source**; no independent business logic branches.
- Make any PWA update observable to the user and non-destructive to stored project data.
- Validate browser storage persistence limitations, file permissions, import/export, and genuine iOS Safari offline operation before public release.
- Document licensing/hosting terms for any chosen public hosting platform, and keep experimental authenticated previews separate from production distribution.

Sources: Apple Support "Turn a website into an app in Safari on iPhone"; MDN "Offline and background operation" and "Making PWAs installable." These are design recommendations, not proof the current development prototype is an installable offline PWA.
