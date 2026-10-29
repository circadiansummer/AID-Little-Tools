# Quick Memory Menu

AID Memory Browser v0.1.6 adds a **Memories** button to AI Dungeon and keyword search for its memory list.

- [Firefox instructions](FIREFOX.md)
- [Chrome instructions](CHROME.md)

Click **Memories**, enter a keyword, then click **Search**. Use **Previous** and **Next** to move between matching memories. Both buttons wrap around the list. Enter also runs a search. Changing Timeline, Relevance, or Show unused clears the results; click Search again.

AI Dungeon requires a recent AI response (within 15 minutes) for View Context. The shortcut uses that same limit. Notices can be dismissed with **×** and fade after 15 seconds.

The extension runs only on `play.aidungeon.com`. It does not send or store memory text, make network requests, or edit, pin, or delete memories. Search scans the current native list and may visibly scroll it. A scan is capped at 300 steps; partial results are labelled “loaded rows only.”

## Development

No build is needed. The `extension/` folder contains only the three required extension files: `manifest.json`, `content.js`, and `styles.css`. Load this folder in Chrome, or select its `manifest.json` in Firefox. Guides, tests, and development metadata stay outside it. The version is kept in the manifest, package metadata, and source, with no visible badge.

Install test dependencies with `npm install`, then run `npm test`. The 12 local DOM tests cover opening, notices, explicit search, wrapping, virtualized rows, and the Show unused lifecycle. Live opening was confirmed by the user for v0.1.4; later UI/search changes have local test coverage and await further live confirmation. DOM fixtures are sanitized and run without AID scripts or network access.

Firefox installation here is temporary; this extension has not been signed for permanent Firefox installation or published to either browser's add-on store.
