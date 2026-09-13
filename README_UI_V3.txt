HYBRID CHALLENGE LOG — UI V3 (2026-09-13)

This version corrects the daily-training popup interaction:

HOME
- Daily menus are shown as compact horizontal cards.
- Swipe left/right to browse.
- Each card only shows Level + menu name.
- Tap a card to open that exact menu.

POPUP
- Shows ONE selected menu only.
- No second menu list / no nested selector.
- Vertical scroll = move through menu information.
- Horizontal swipe = move across Blocks.
- Bottom actions remain:
    Close
    Modify Menu / Locked
    Start Training

All previous data, Supabase configuration, results, locked-menu rules,
round colors and score-wall behavior remain intact.

Deploy:
replace
  index.html
  style.css
  workouts.js
  app.js
  service-worker.js

Do not replace/delete config.js.
