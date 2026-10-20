# Story Card Studio

Standalone offline AI Dungeon Story Card JSON editor, merger, trigger analyzer, and configuration interface for Random Encounters, Inner Self, and Auto-Cards.

**Status:** Development archive only. **The desktop v4.12 build is LOCKED.** The mobile builds are isolated experimental prototypes, not releases. No mobile changes may be integrated into desktop, nor any official release published, without explicit owner permission.

## Files

- [Locked desktop v4.12](desktop/aid-story-card-editor-v4.12.html) — byte-preserved approved snapshot.
- [Initial responsive mobile prototype](mobile/aid-story-card-editor-v4.12-mobile-dev.html) — standalone experimental clone.
- [Mobile prototype with touch drag-and-drop](mobile/aid-story-card-editor-v4.12-mobile-touch-dev.html) — most current development candidate. Long-press to drag between Types and RE Acts.
- [Mobile development handoff](docs/MOBILE-DEVELOPMENT-HANDOFF.md) — responsive UI, architecture, checks.
- [Touch-drag handoff](docs/MOBILE-TOUCH-DRAG-HANDOFF.md) — gesture behavior, verification, remaining iOS tests.

## Integrity checks (SHA-256)

| File | SHA-256 |
| --- | --- |
| desktop/aid-story-card-editor-v4.12.html | `516ae4a06fe9712bf0a3e073ef520bfe78026f42599dda5baa6ae376ef21edf2` |
| mobile/aid-story-card-editor-v4.12-mobile-dev.html | `3742c8ff93cf9f8ed1fd9a7ce85953d4344420c133f7d8f89dffe69ed3ebf383` |
| mobile/aid-story-card-editor-v4.12-mobile-touch-dev.html | `29f66e6d8ab7c78508a095410afd0480fff01be20c4ecfcc15851e5b4077a751` |

## Verification and release boundaries

Automated mobile Chromium tests passed during development; **real iOS Safari, iOS Files/Quick Look, and live AI Dungeon behavior were not verified**. Some iOS file previews do not execute the required JavaScript. For device testing, serve the mobile HTML as a real HTTPS webpage. Do not advertise browser emulation as physical-device proof.

The app runs entirely client-side; do not add external telemetry, upload user Story Card data, or publish private examples. Desktop code changes require explicit owner approval. Work on the isolated mobile copy and preserve creator JSON fields.

The GitHub folder is a **development archive**, not a public product distribution or release.
