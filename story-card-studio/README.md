# Story Card Studio v5.0

**Active build on `main`: [Story-Card-Studio-v5.0.html](Story-Card-Studio-v5.0.html)**  
**Architecture:** One responsive, standalone HTML application, suitable for desktop and mobile browsers.  
**Status:** Owner-designated canonical development build. This repository update is **not** an automatic Vercel/Pages deployment or published GitHub Release.

Story Card Studio lets AI Dungeon creators edit, organize, merge, and analyze Story Card JSON in the browser without uploading the JSON to a server. Ordinary Story Card editing does not depend on third-party scripts.

## Quick start

1. Download the **[v5.0 HTML file](Story-Card-Studio-v5.0.html)** using GitHub's *Download raw file* action, not the code-preview webpage.
2. Open in a modern desktop browser; import your AI Dungeon Story Card JSON or choose **Demo Cards**.
3. Edit and export JSON. The exported JSON can be imported into AI Dungeon.

For mobile Safari, hosting over HTTPS is more reliable than opening the file through iOS Files/Quick Look. No installable offline-first PWA has been implemented yet.

## Features currently included

- **Story Card Editor:** Create, edit, organize, bulk-edit, delete/Undo, and export cards. Edit Title, Keys/Triggers, Entry, Notes, supported flags, and other card fields. Stacked and column layouts, drag-and-drop and responsive mobile details.
- **Find & Replace:** Previous/Next, individual Replace and confirmed Replace All across Title, Keys, Entry, and Notes. Includes three built-in presets and three editable browser-local presets. Desktop view has a rightward Card Details cue.
- **Merge JSONs:** Combine selected cards from two sources, export the selection, or move it into the editor while retaining creator-defined fields.
- **Trigger Analysis:** Potential duplicate/short-trigger warnings, theoretical reference networks, sample-passage matching, and approximate token statistics. These analyses do not guarantee AI Dungeon context activation.
- **Random Encounters support:** With RE Support enabled, organize `RAND_XX` cards by Act, edit encounter metadata, display six overview metrics (including Cards in Largest Act), color-code cards, inspect responsive distribution charts, and edit supported RE Config/Advanced settings.
- **Inner Self and Auto-Cards support:** Edit supported script settings and use the **View or Create Config Card / Hide Config Card** toggle to inspect associated Story Cards.
- **Unified desktop/mobile:** Responsive layouts, mobile navigation, full-screen details, touch long-press dragging and cancellation, and desktop mouse/keyboard editing.

The four RE/Inner Self/Auto-Cards tabs ending in `*` indicate that their corresponding custom AI Dungeon scripts must be installed in a scenario to operate *in game*. Those scripts are not required for using the local editor.

## Mode-specific demo cards

- **RE Support OFF:** The established **7-card** fictional-town example, emphasizing ordinary characters, locations, faction, plot, and trigger references.
- **RE Support ON:** The user-supplied **[24-card demo](examples/re-enabled-demo.json)**, with **18 Random Encounters**, six in each of **Acts 1–3**, plus six ordinary Character/Location cards. The sample features the Hidden Leaf Village, Sasuke, and the Third Hokage. Original titles, triggers, entries, Notes, metadata, and other fields are preserved.

Loading a demo replaces the current workspace; export real work beforehand.

## Storage, compatibility and limitations

Editing uses browser-side code. Save important work with **Export JSON**; local browser storage is not a reliable cross-device backup and may not persist indefinitely. v5.0 uses the established desktop storage key; older mobile prototypes used a separate key, so export/import is necessary to transfer those workspaces. Custom Find & Replace presets live in browser storage, not in Story Card JSON.

**Latest verification (2026-10-21):** RE ON loads 24 records/18 encounters; RE OFF loads 7 cards. RE ON export has exactly the same 24 Story Card objects as the supplied JSON. Summary metrics and responsive Chromium smoke checks at 390px/768px/1440px passed, with no page errors. Physical iOS Safari, live AI Dungeon integration, the complete current-version regression suite, and a true installable PWA were **not** verified. See [v5.0 baseline](docs/V5.0-BASELINE.md) and [test checklist](docs/V5.0-TESTING.md).

**Current HTML SHA-256:** `c2350fd6891217e8498ad24deae6da41cc45b15dc7bfc16d4f1a5cf52457f163`.

## GitHub Pages (v5.0)

- **Website:** https://circadiansummer.github.io/AID-Little-Tools/ (once Pages is enabled and deployment has succeeded).
- **Versioned URL:** https://circadiansummer.github.io/AID-Little-Tools/Story-Card-Studio-v5.0.html
- **Deployment:** [GitHub Pages setup and testing guide](docs/GITHUB-PAGES.md).

The GitHub Actions workflow publishes only the active `Story-Card-Studio-v5.0.html` and the v5.0 redirect `index.html` as static site assets. It checks the HTML against the documented canonical v5.0 SHA-256. Historical builds and development prototypes are **not** copied into the Pages artifact. Site publication does not constitute a tagged GitHub Release, full iOS testing, or live AI Dungeon validation.
