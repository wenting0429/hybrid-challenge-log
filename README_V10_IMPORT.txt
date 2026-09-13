HYBRID CHALLENGE LOG — V10 壺鈴爆汗日 IMPORT

Built strictly on the latest V9 formal app.

What this patch does
--------------------
Adds one ADMIN-ONLY button to the Daily Training card:

  ⇩ 匯入｜壺鈴爆汗日

Press it once on an authorized menu-admin device. The app writes this
template directly to Supabase daily_templates through the existing
save_daily_template RPC.

Imported template
-----------------
Level 7｜壺鈴爆汗日
No Run
Equipment: Treadmill / Kettlebell / Dumbbell / TRX
5 Blocks × 4 items = 20 items

Every item has an EXPLICIT block_index (1–5).
The import does NOT use the old automatic 4-item Block splitter.

After successful import
-----------------------
- The new cloud menu appears in Daily Training on every device after refresh.
- The old built-in Level 7「代謝耐力」is hidden from the NEW-TRAINING picker.
- The old fatBurn/代謝耐力 template is NOT deleted.
- Historical results that reference the old template can still render normally.

Critical data safety
--------------------
workouts.js: unchanged / byte-identical
index.html: unchanged / byte-identical
style.css: unchanged / byte-identical

Only:
  app.js
  service-worker.js
changed.

Deploy
------
Upload/replace those two files, refresh the app, then on your authorized
admin device press:
  ⇩ 匯入｜壺鈴爆汗日

After import succeeds, the button becomes:
  ✓ 壺鈴爆汗日已匯入
