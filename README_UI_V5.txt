HYBRID CHALLENGE LOG — UI V5 BALANCED HOME

Changes:
- Classic and Daily cards now both have:
    查看菜單 | 開始
- Both View Menu buttons use the same neutral dark secondary style.
- Both Start buttons use the same teal primary style.
- Daily popup Start button also uses teal for semantic consistency.
- On mobile, Classic Challenge's two selectors sit side-by-side.
  This significantly reduces the card height and removes excess empty space.
- Classic and Daily cards now share matching spacing, stat rhythm and action layout.

No database/data changes.
Supabase, historical results, daily_templates, locks, corrections,
pop-up menus, round colors and score wall remain unchanged.

Deploy:
replace
  index.html
  style.css
  workouts.js
  app.js
  service-worker.js

Keep config.js and existing assets.
