# Quick Memory Menu

AID Memory Browser v0.1.8 adds a **Memories** button to AI Dungeon and keyword search for its memory list. It runs on `play.aidungeon.com`, `alpha.aidungeon.com`, and `beta.aidungeon.com`.

On narrow screens (640 CSS pixels or less), the button sits above the native command bar or composer when those controls are detected. It respects safe-area insets and the visible viewport, and hides while a native dialog or an input keyboard is active. Search uses a full-width field with a row of three touch-sized buttons below it. Desktop placement stays at the lower left.

The search toolbar is inside the native memory dialog, visually above its existing controls. It is appended without moving AID's original header or Show unused toggle, and match navigation scrolls only the memory list. Search remains button-driven. The native Show unused toggle is retained; no custom replacement toggle is added. Local tests cover inside-dialog pointer/focus handling and native off/on changes; the actual AID modal still needs live confirmation after this placement change.

- [Firefox instructions](FIREFOX.md)
- [Chrome instructions](CHROME.md)

Click **Memories**, enter a keyword, then click **Search**. Use **Previous** and **Next** to move between matching memories. Both buttons wrap around the list. Enter also runs a search. Changing Timeline, Relevance, or Show unused clears the results; click Search again.

AI Dungeon requires a recent AI response (within 15 minutes) for View Context. The shortcut uses that same limit. Notices can be dismissed with **×** and fade after 15 seconds.

The extension runs only on the three AI Dungeon hosts listed above. It does not send or store memory text, make network requests, or edit, pin, or delete memories. Search scans the current native list and may visibly scroll it. A scan is capped at 300 steps; partial results are labelled “loaded rows only.”

## Development

No build is needed. The `extension/` folder contains only the three required extension files: `manifest.json`, `content.js`, and `styles.css`. Load this folder in Chrome, or select its `manifest.json` in Firefox. Guides, tests, and development metadata stay outside it. The version is kept in the manifest, package metadata, and source, with no visible badge.

Install test dependencies with `npm install`, then run `npm test`. The 13 local DOM tests cover opening, notices, explicit search, wrapping, virtualized rows, inside-dialog pointer/focus handling, and the Show unused lifecycle. Live opening was confirmed by the user for v0.1.4; later UI/search changes have local test coverage and await further live confirmation. DOM fixtures are sanitized and run without AID scripts or network access.

For browser layout tests, run `npx playwright install chromium`, then `npm run test:mobile`. Alternatively set `AID_TEST_BROWSER` to an installed Chromium browser executable. The additional test checks 15 hostname/viewport combinations: play, alpha and beta at 320×568, 390×844, 412×915, 640×360 and 1280×800. It checks launcher/composer separation, simulated keyboard handling, inside-dialog search, native toggle operation, touch targets, horizontal overflow and route changes. Screenshots go to ignored `mobile-artifacts/`. v0.1.8 passed all 14 tests in headless Edge with Playwright. The fixtures simulate mobile layout and keyboard viewport changes; they are not live authenticated AID tests or tests on a physical phone.

Firefox installation here is temporary; this extension has not been signed for permanent Firefox installation or published to either browser's add-on store.
