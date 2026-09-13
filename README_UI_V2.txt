HYBRID CHALLENGE LOG — UI V2 (2026-09-13)

Changes
1. Active challenge:
   - items are color-coded by Round / Block
   - round/block badge appears beside each exercise
   - classic HYROX/TYRUN rounds are inferred automatically

2. Score wall:
   - result cards show a subtle round-color strip
   - opening a result shows every exercise color-coded by Round / Block

3. Challenge home:
   - classic challenge menu is collapsed by default
   - click "查看菜單" only when you want to inspect it
   - daily training no longer uses the long dropdown UI
   - click the compact daily training card to open a popup
   - popup includes template selection, full menu preview, Close, Start Training,
     and Modify Menu / Locked state

Data safety
- No database schema changes.
- Existing Supabase training_results and daily_templates remain untouched.
- Existing workout history is not deleted or migrated.
- Existing config.js is still used.

Deploy
Replace these five files in GitHub:
  index.html
  style.css
  workouts.js
  app.js
  service-worker.js

Keep your existing:
  config.js
  manifest.webmanifest
  exercise-media.js
  icons
  animations/
