# Mobile Safari acceptance checklist

**Current status:** Experimental / not verified on a physical iPhone running Safari as of October 20, 2026.

**Preview entry point:** `index.html`, a static redirect to `aid-story-card-editor-v4.12-mobile-touch-dev.html`. The original desktop v4.12 is LOCKED and has not been integrated.

## Recommended physical iPhone testing

1. Open the HTTPS preview **directly in Safari**. iOS Files Quick Look may display an HTML preview without executing its JavaScript.
2. Confirm top navigation selector and Demo Cards respond to taps; switch through all available tabs with Random Encounters Support off.
3. Tap an ordinary Story Card. Verify Card Details opens fullscreen, all fields remain editable, and Close returns to the board.
4. Touch and hold a card ~390ms. Verify a drag ghost appears and Types highlight. Drop onto another Type, verify the card moved and existing JSON fields stayed intact.
5. Do a quick swipe to scroll normally; release outside target, cancel multi-touch, and cancel a long-press to confirm no accidental card movement.
6. Try Columns mode and drag to an offscreen column using horizontal edge auto-scroll; try vertical edge auto-scroll.
7. Drag a card in Trigger Analysis to another Type.
8. Enable RE Support. Drag a RAND_## encounter between Acts and check its `- Act:` Notes update.
9. Test iOS keyboard focus on title and multiline Entry/Notes, mobile scroll restoration, card Delete/Undo, and edited card export.
10. Import/export a Story Card JSON fixture. Compare the exported card records with the originals, including creator custom properties.
11. In LL tabs, test disabled state without config, Create config card, editable settings, and JSON export.
12. Recheck desktop navigation, pointer drag, editing and export at 1024+ px.

For every test record device, iOS/Safari version, exact URL, action, observed result, and PASS / FAIL / NOT RUN. A Chromium touch emulation PASS **does not count** as a physical iOS Safari PASS.

## Integration gate

Do not merge mobile changes into locked desktop v4.12, tag a release, or publish a product without express creator approval. See `../docs/MOBILE-TOUCH-DRAG-HANDOFF.md`.
