# Story Card Studio repository rules

1. Read [README.md](README.md) and the two mobile handoff documents before edits.
2. `desktop/aid-story-card-editor-v4.12.html` is **LOCKED**. Do not change it without express owner permission.
3. Mobile work is restricted to isolated files under `mobile/`; do not silently merge or announce a release.
4. Preserve AI Dungeon Story Card JSON, creator-authored Entry, Notes, keys, extra fields and edit/import/export behavior. Never transform card data to solve presentation problems.
5. Keep browser emulation, real iOS Safari testing, AI Dungeon tests, and user acceptance separate in reports.
6. Mobile core requirements: tap-to-edit, accessible full-screen card details, touch drag between Types/Acts with cancellation and auto-scroll, desktop fallback unchanged.
7. Prefer targeted regression tests and record the exact build/hash. The initial development bundle holds additional Python tests and isolation patches, which should be added unchanged when available.
8. GitHub documentation updates are development records, not release authorization. Production publication/integration requires explicit consent.
