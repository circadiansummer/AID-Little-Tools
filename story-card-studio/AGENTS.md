# Story Card Studio — instructions for the active v5.1 build

## Source of truth

1. The **active canonical build** is `story-card-studio/Story-Card-Studio-v5.1.html` on `main`; `story-card-studio/index.html` directs users to it. Read `story-card-studio/README.md`, `docs/V5.1-BASELINE.md`, and `docs/V5.1-TESTING.md` before development.
2. The original unified `Story-Card-Studio-v5.0.html` and desktop `desktop/aid-story-card-editor-v4.12.html` are **historical, byte-preserved snapshots**, not the active development baseline. Older files in `mobile/` and `development/encounter-highlight/` are historical experiments. Do not edit their source unless the owner expressly directs it.
3. Develop forward in **one unified, responsive v5.1+ source**, preserving desktop functionality if a desktop/mobile conflict cannot otherwise be resolved. Keep working mobile navigation, full-screen card details, and touch drag behavior.

## Approval and publication

4. **Seek the owner's explicit confirmation before changing GitHub** unless the user has explicitly authorized the exact changes in the ongoing conversation. Authorization to promote v5.1 to `main` does not grant blanket future permission.
5. **GitHub-only workflow:** Use GitHub for source control and, when a hosted website is needed and authorized, the existing **GitHub Pages + GitHub Actions** path. **Do not use Vercel for any future Story Card Studio work**, including previews, deployments, verification or workflow suggestions. Old hosting records are historical, not active instructions. A GitHub commit, hosted publication, public Release and tag are distinct actions; do not manually publish or change host settings without appropriate approval.
6. Every change to HTML must be accompanied by a **direct, complete downloadable HTML file shared in the conversation**. If desktop and mobile are separate affected builds, provide both. A GitHub URL alone is insufficient.

## Preservation and test gates

7. Preserve AI Dungeon Story Card JSON, including creator-authored Title, Keys, Entry, Notes, flags, and arbitrary extra fields. Do not overwrite user-written card content to fix a display issue. Protect script Config and foreign Story Cards.
8. `Demo Cards` is mode-dependent: RE OFF = established seven ordinary cards; RE ON = **exactly 24** objects from `examples/re-enabled-demo.json` (18 `RAND_` cards across Acts 1–3 and six ordinary cards). Test exact JSON export parity after changes.
9. Preserve Find & Replace's restricted search fields and confirmation on bulk replacement; Merge JSON preservation; RE settings/metrics/color key; Inner Self/Auto-Cards config-card toggles; and desktop/mobile accessibility, gesture cancellation, and responsive behavior. **RE Act Structure and Encounter Spread card-count axes must derive from `RAND_##` encounter cards only; never scale them using the total scenario card count.** Test with 100+ unrelated cards.
10. Label tests precisely: static/syntax checks, Chromium emulation, physical Safari, GitHub Pages deployment, and live AI Dungeon are distinct. Never claim one proves another.
11. Synchronize README, baseline documentation, test evidence and hashes for verified updates; preserve old handoff reports as historical rather than rewriting their original findings.
12. Follow the Basic Scripting Project Operating Guide, especially explicit user approval, creator data preservation, version/release boundaries, and clear handoff notes.

## v5.1 controls and test contract

- Do not reintroduce a requirement that Entry or Keys/Triggers be populated before JSON export. Preserve arbitrary creator-authored properties and the 5,000-card cap.
- Preserve exact Merge **Deselect All** behavior (selection only) versus confirmation-gated **Clear** (source destruction or center-selection clearing); ensure cancellation makes no changes and other source collections survive.
- Maintain pinned/sticky editor controls, mobile scrolling, keyboard-accessible Type accordions, and independently collapsible Merge Types. Source card types and fields never change merely because a group collapsed.
- Source and browser test suite: `docs/tests/editor-ux-v5.1.cjs`, current `docs/V5.1-TESTING.md`; execute the checksum-gated GitHub Pages Actions workflow on approved code changes. Release history/docs for v5.0 remain historical.
