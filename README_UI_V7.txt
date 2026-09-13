HYBRID CHALLENGE LOG — UI V7 SCORE WALL BLOCK FIX

Bug fixed:
Some historical score-wall records displayed BLOCK labels/colors while others did not.

Cause:
Older app versions saved challenge_items without block_index / block_round metadata.

Fix:
- Existing saved Block metadata is always preserved.
- Daily Training history recovers missing Block metadata from the matching current template.
- Repeated movements are matched safely in sequence when necessary.
- If a very old/deleted Daily Training template cannot be resolved, the legacy app fallback
  (4 items per Block) is used so the score detail still has a consistent Block structure.
- Classic HYROX/TYRUN historical rows receive deterministic Round metadata.
- Recovery happens before factual locked-template corrections, so those corrections also work
  correctly on older score records.

Data safety:
This is display-time recovery only. Supabase historical rows are NOT modified or deleted.

Fast deploy:
Only these two files changed:
  app.js
  service-worker.js

You may upload just those two files to GitHub.
