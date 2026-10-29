# Story Card Studio v5.1

**Active build on `main`: [Story-Card-Studio-v5.1.html](Story-Card-Studio-v5.1.html)**  
**Architecture:** One responsive, standalone HTML application, suitable for desktop and mobile browsers.  
**Status:** Owner-designated canonical development build. GitHub Pages publication is handled by the repository's separate checksum-gated Actions workflow. A GitHub commit is not a public Release or tag. **GitHub is the sole ongoing source and hosting workflow.**

Story Card Studio lets AI Dungeon creators edit, organize, merge, and analyze Story Card JSON in the browser without uploading the JSON to a server. Ordinary Story Card editing does not depend on third-party scripts.

## Quick start

1. Download the **[v5.1 HTML file](Story-Card-Studio-v5.1.html)** using GitHub's *Download raw file* action, not the code-preview webpage.
2. Open in a modern desktop browser; import your AI Dungeon Story Card JSON or choose **Demo Cards**.
3. Edit and export JSON. The exported JSON can be imported into AI Dungeon.

For mobile Safari, hosting over HTTPS is more reliable than opening the file through iOS Files/Quick Look. No installable offline-first PWA has been implemented yet.

## Features currently included

- **Story Card Editor:** Create, edit, organize, bulk-edit, delete/Undo, and export cards. Edit Title, Keys/Triggers, Entry, Notes, supported flags, and other card fields. Stacked and column layouts, drag-and-drop and responsive mobile details.
- **Find & Replace:** Previous/Next, individual Replace and confirmed Replace All across Title, Keys, Entry, and Notes. Includes three built-in presets and three editable browser-local presets. Desktop view has a rightward Card Details cue.
- **Merge JSONs:** Combine selected cards from two sources, export the selection, or move it into the editor while retaining creator-defined fields.
- **Trigger Analysis:** Potential duplicate/short-trigger warnings, theoretical reference networks, sample-passage matching, and approximate token statistics. These analyses do not guarantee AI Dungeon context activation.
- **Random Encounters support:** With RE Support enabled, organize `RAND_XX` cards by Act, edit encounter metadata, display six overview metrics (including Cards in Largest Act), color-code cards, inspect responsive distribution charts, and edit supported RE Config/Advanced settings. **Act Structure** and **Encounter Spread** card-count axes scale by encounter cards only; unrelated ordinary Story Cards do not inflate their maxima.
- **Inner Self and Auto-Cards support:** Edit supported script settings and use the **View or Create Config Card / Hide Config Card** toggle to inspect associated Story Cards.
- **Unified desktop/mobile:** Responsive layouts, mobile navigation, full-screen details, touch long-press dragging and cancellation, and desktop mouse/keyboard editing.

The four RE/Inner Self/Auto-Cards tabs ending in `*` indicate that their corresponding custom AI Dungeon scripts must be installed in a scenario to operate *in game*. Those scripts are not required for using the local editor.

## What's new in v5.1 (owner-approved)

- **Blank-field exports:** Download JSON with empty Entry and/or Triggers; the 5,000-card safety limit remains.
- **Clearer buttons:** **Upload JSON to Studio**, **Download JSON for AID** (no arrow), Merge **↓ Add Cards from Editor**, and the First/Second Set/Center controls documented below.
- **Fixed card-editor controls:** On desktop, the Story Cards heading, count, toolbar, Find & Replace controls and help text stay visible while the cards beneath them scroll independently. The mobile document-scrolling layout remains.
- **Collapsible Types:** Expand or collapse card Types in Editor and all three Merge columns without affecting exported data or selections.
- **Merge selection versus removal:** First/Second Set **Deselect All** only unchecks cards. The separate **Clear** button prompts before removing an entire source set and its center contributions; center **Clear** prompts before deselecting the merged collection, leaving the source sets intact. Cancel does nothing.

**Verification:** [v5.1 testing and acceptance](docs/V5.1-TESTING.md) documents 45 focused source checks, 95 editor/merge browser checks, 81 destructive-control browser checks, and the RE chart-count regression on the exact v5.1 HTML. v5.0 remains preserved in GitHub as historical.

## Mode-specific demo cards

- **RE Support OFF:** The established **7-card** fictional-town example, emphasizing ordinary characters, locations, faction, plot, and trigger references.
- **RE Support ON:** The user-supplied **[24-card demo](examples/re-enabled-demo.json)**, with **18 Random Encounters**, six in each of **Acts 1–3**, plus six ordinary Character/Location cards. The sample features the Hidden Leaf Village, Sasuke, and the Third Hokage. Original titles, triggers, entries, Notes, metadata, and other fields are preserved.

Loading a demo replaces the current workspace; export real work beforehand.

## Storage, compatibility and limitations

Editing uses browser-side code. Save important work with **Export JSON**; local browser storage is not a reliable cross-device backup and may not persist indefinitely. v5.1 retains the established v5.0 desktop storage key; older mobile prototypes used a separate key, so export/import is necessary to transfer those workspaces. Custom Find & Replace presets live in browser storage, not in Story Card JSON.

**Original v5.0 baseline verification (2026-10-21):** RE ON loads 24 records/18 encounters; RE OFF loads 7 cards. RE ON export has exactly the same 24 Story Card objects as the supplied JSON. Summary metrics and responsive Chromium smoke checks at 390px/768px/1440px passed, with no page errors. Physical iOS Safari, live AI Dungeon integration, the complete current-version regression suite, and a true installable PWA were **not** verified. See [v5.0 baseline](docs/V5.0-BASELINE.md) and [test checklist](docs/V5.0-TESTING.md).

**Encounter chart-scale fix (2026-10-21):** Verified with 18 encounters plus 120 additional ordinary Story Cards at Chromium widths 1440, 768 and 390px; both card-count chart SVGs remained identical, and a peak of 12 encounters produced an axis maximum of 12 rather than 40. Inline JavaScript passed `node --check`. Other full-suite and physical-device checks remain separate, as described below.

**Current v5.1 HTML SHA-256:** `8b7b1c110e30d83ed304fd99b8c7be0cbc7f105b2dc8370ebc3261ad4ad712a4`.

## GitHub Pages (v5.1)

- **Website:** https://circadiansummer.github.io/AID-Little-Tools/ (once Pages is enabled and deployment has succeeded).
- **Versioned URL:** https://circadiansummer.github.io/AID-Little-Tools/Story-Card-Studio-v5.1.html
- **UX test preview:** https://circadiansummer.github.io/AID-Little-Tools/test-pages/ (public; availability depends on a successful Actions deployment)
- **Deployment:** [GitHub Pages setup and testing guide](docs/GITHUB-PAGES.md).

The GitHub Actions workflow publishes the checksum-verified active `Story-Card-Studio-v5.1.html` and its redirect at the site root, plus the standalone Deck Builder. The `/test-pages/` preview now uses the same v5.1 source with separate browser storage keys, so test autosaves cannot overwrite production autosaves. Historical v5.0/v4.12 builds are preserved in the repository, but are not copied to the Pages artifact. Site publication does not constitute a tagged GitHub Release, full iOS testing, or live AI Dungeon validation.
