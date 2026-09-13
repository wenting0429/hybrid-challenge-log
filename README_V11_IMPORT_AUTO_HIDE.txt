HYBRID CHALLENGE LOG — V11 IMPORT TOOL AUTO-HIDE

Behavior change:
- Import button is shown only while the target menu has NOT been imported.
- After successful import:
    * success toast appears once
    * the import area disappears immediately
    * app reloads
- On later reloads, if Supabase already contains the imported menu:
    * no "已匯入" record/button remains on the homepage
    * the menu itself remains available normally in Daily Training

No menu data changed.
No historical results changed.
No UI layout/menu content changed.

Only:
  app.js
  service-worker.js
changed.

Deploy:
Upload/replace those two files in GitHub.
