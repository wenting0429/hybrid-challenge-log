HYBRID CHALLENGE LOG — UI V6

Fixes:
1. Daily Training "開始訓練" is visible again next to "查看菜單".
   Root cause was an older CSS rule still hiding #startSimulationBtn.

2. Daily Training no longer opens Android's native white system selector.
   The native select remains only as an internal data source.
   The visible selector is now an app-styled dark dropdown:
   - dark UI consistent with the app
   - scrollable
   - Level grouping
   - selected check mark
   - options sorted Level 1 -> 10
   - cloud templates are included automatically

Unchanged:
- Classic challenge
- true menu popups
- Supabase results and daily_templates
- locked template rules
- historical records
- round/block colors
- score wall

Deploy:
replace
  index.html
  style.css
  workouts.js
  app.js
  service-worker.js

Keep config.js and existing assets.
