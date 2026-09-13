HYBRID CHALLENGE LOG — modular production build 2026-09-13

Upload/replace these five files in the same GitHub repository folder:
  index.html
  style.css
  workouts.js
  app.js
  service-worker.js

Keep your existing files unchanged:
  config.js
  manifest.webmanifest
  icon-192.png
  icon-512.png
  apple-touch-icon.png
  exercise-media.js
  animations/ (if present)

Architecture:
  index.html        HTML structure
  style.css         visual styling
  workouts.js       built-in daily workout definitions
  app.js            app logic + Supabase cloud daily-template management
  service-worker.js cache/update behavior

Important:
- Existing Supabase daily_templates cloud menus remain enabled.
- Admin-created/edited cloud menus still sync between devices.
- Built-in menus can now be changed in workouts.js without editing index.html.
- Locked Level 7 無跑步模擬賽 factual corrections:
    Block 2 Sled Pull = 80 m
    Block 4 Sandbag Lunges = 80 m
  The correction is applied when the locked cloud template and saved result
  snapshots are read, so historical locking remains intact.
