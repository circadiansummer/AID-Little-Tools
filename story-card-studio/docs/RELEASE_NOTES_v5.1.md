# Story Card Studio v5.1 — release notes

**Owner-approved main build:** October 28, 2026, America/Chicago.  
**Canonical artifact:** `story-card-studio/Story-Card-Studio-v5.1.html`.

v5.1 promotes the previously tested v5.0 editor usability candidate, with the final label revisions. It retains the one-file desktop/mobile architecture and preserves the original v5.0 build as historical.

**Changes:** Blank Triggers and Entries are allowed in JSON downloads; button labels clarify direction and purpose; Story Cards header/controls stay fixed while desktop card lists scroll; Editor and Merge Types collapse; Merge left/right Deselect All only unchecks cards; confirmation-gated Clear deletes a source column or empties the center selection without changing other source collections.

**Final labels:** Upload JSON to Studio; Download JSON for AID; ↓ Add JSON for First Set; ↓ Add JSON for Second Set; ↓ Add Cards from Editor; → Send to Editor Tab; Deselect All; Clear.

**Verification:** 45/45 focused deterministic checks; 95/95 Editor/Merge Chromium assertions; 81/81 Clear/Deselect browser assertions; RE chart regression with 18 encounters plus 120 unrelated cards and 144-card JSON export. See [v5.1 testing](V5.1-TESTING.md). Physical iPhone Safari and live AI Dungeon are **NOT RUN**.

**Deployment:** The GitHub Pages workflow publishes the checksum-verified v5.1 at the root and an isolated same-version preview under `/test-pages/`; check the relevant Actions run for evidence. Public GitHub tags/releases are separate, not part of this promotion.

## November 18, 2026 — In-version maintenance update

Owner-approved production promotion of the previously browser-tested export filename candidate, retaining the version number v5.1 and the stable v5.0 Pages URL. The Story Card Editor topbar remains compact, with a native **Download JSON for AID** filename dialog (Cancel/Download; Enter/Escape). Merge retains an inline **Export filename** field. The download handlers normalize the `.json` extension without changing JSON data or validation.

This also includes the previously approved frozen Editor header, topmost Color Key tooltip with mobile-safe alignment, and **← Add Cards from Editor** buttons. Verification: 110 Chromium interactions, 10 JSON parity comparisons, and 64 deterministic source checks; see [current testing](V5.1-TESTING.md). No separately tagged GitHub Release is created.
