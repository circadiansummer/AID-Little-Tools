# Story Card Studio — Encounter Highlight Development Handoff

Status: **Implemented in two separate experimental HTML copies only; not merged into locked desktop v4.12 and not deployed to hosted mobile test.**
Date: 2026-10-20

## New Encounter Analysis UI

- New **Card Border Highlight** dropdown between Search encounters and + Act / + Card:
  - No Highlight (neutral)
  - Highlight by Importance (default)
  - Highlight by Rarity
  - Highlight by Duration
- Applies only to the Encounter Analysis rail's Story Card borders, without modifying metadata, Types or exported AI Dungeon JSON.
- Active selection uses its own purple outline / selection treatment; metadata border color remains visible.
- Color Key button label is exactly `ⓘ Color Key` in both Story Cards Editor and Encounter Analysis. The former lists **Rarity** and **Importance**; the latter lists **Rarity, Importance and Duration**.
- Color Key opens via hover / click / keyboard. Mobile popover is positioned within the viewport.
- Encounter Spread graphs already have separate Importance/Rarity/Duration tab buttons. Their stacked bars, donut slices and legends now reuse the same mapping as the rail border and Color Key. Act Structure also uses the revised importance palette.
- The rail highlight dropdown and graph dimension tab are independent: changing one does not change the other.

## Canonical color map

| Dimension | Value | Hex |
|---|---|---|
| Importance | ASAP | `#78ebc4` |
| Importance | Required | `#e2b85c` |
| Importance | Optional / No Highlight | `#44475d` (neutral) |
| Rarity | Very Common | `#c0c4ce` |
| Rarity | Common | `#80cda4` |
| Rarity | Rare | `#7fabf1` |
| Rarity | Very Rare | `#bd95ef` |
| Duration | Very Short | `#80cda4` (Common green) |
| Duration | Short | `#7fabf1` (Rare blue) |
| Duration | Default | `#bd95ef` (Very Rare purple) |
| Duration | Long | `#deb777` (existing duration chart amber) |
| Duration | Very Long | `#da91b6` (existing duration chart rose) |

**Five duration categories but four rarity categories:** To honor the user-specified Common→Very Short starting point, the initial three duration colors are inherited from Common/Rare/Very Rare. The remaining two reuse the existing duration chart's amber and rose. No duplicate colors within a single dimension.

## Source/version safeguards

- Locked desktop baseline (unmodified): `aid-story-card-editor-v4.12.html`, SHA256 `516ae4a06fe9712bf0a3e073ef520bfe78026f42599dda5baa6ae376ef21edf2`.
- Existing mobile touch prototype (unmodified): `aid-story-card-editor-v4.12-mobile-touch-dev.html`, SHA256 `29f66e6d8ab7c78508a095410afd0480fff01be20c4ecfcc15851e5b4077a751`.
- Experimental desktop: `story-card-studio-desktop-color-dev.html`.
- Experimental mobile: `story-card-studio-mobile-color-dev.html`.

## Verification

- JavaScript syntax: `node --check` PASS for both modified builds.
- Chromium browser emulation: **83 assertions passed**, desktop 1400×900 and mobile 390×844 (no reported browser JS errors).
- Tests cover dropdown order/default, neutral/importance/rarity/duration rail colors, bar and donut mappings, color key entries and labels, selection, Escape, and tooltip position.
- **NOT RUN**: actual iOS Safari and real device gesture regressions; Vercel deployment of the new experimental version; third-party browsers, original AI Dungeon platform integrations.

## Next steps

1. Review color mappings and screenshots (especially optional neutral chart readability).
2. Merge behavior into one shared-source responsive development candidate. No desktop/mobile manual toggle (automatic CSS breakpoints and input-capability detection; preserve touch regardless screen width).
3. Run full JSON import/export, RE editing and drag regression suite, including physical iOS Safari.
4. Package desktop as portable single HTML and ZIP (README, checksum, example fixtures) with no installer required.
5. Package mobile as **offline-first PWA** (manifest/icons/service worker precache). Host once over HTTPS and install via Safari Add to Home Screen. Offline reopens are contingent on browser cache retention; provide explicit local JSON export/backups, no external upload. Local HTML downloads through iOS Files/Quick Look are not equivalent to Safari web-app runtime.
6. Preserve Vercel protected test version until separately approved for replacement. Do not tag, publish or merge into locked desktop without authorization.