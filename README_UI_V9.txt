HYBRID CHALLENGE LOG — UI V9 ONE-TAP TRAINING

Built from:
  HYBRID_APP_UI_V8_TRAINING_COMPLETE_FIX_20260913

Formal active-training UI now matches the approved demo concept:

NORMAL EXERCISE
  movement + reps/distance + ○/✓
  all on one row

TIMED EXERCISE
  movement + duration + ▶/Ⅱ countdown + ↺ reset + ○/✓
  all on one row

Controls retained:
- ▶ starts countdown
- Ⅱ pauses countdown
- press again to resume
- ↺ resets to original duration
- timer vibration/audio "time up" behavior retained
- session-level Pause also pauses/resumes active countdowns
- ○/✓ toggles exercise completion in one tap
- Finish Challenge is enabled only when all items are completed

Visual change:
- exercise FRAME color follows block_index / Round
- no accordion
- no extra Block badge inside the exercise row
- no long "完成 / 已完成" button

CRITICAL DATA SAFETY
No menu/template data was changed.

workouts.js SHA-256:
  bf226691239d20fc6b4178a857e2972154c476df8588cf6389d958ab6c06289b

It is BYTE-IDENTICAL to the V8 latest source file.

index.html SHA-256:
  4672d2bde78d97611ed22e668b8a0de66c0bce481e8871e266d8f4bfdff50678

It is also BYTE-IDENTICAL to V8.

Only these files changed:
  app.js
  style.css
  service-worker.js

Fast deploy:
Upload/replace only those 3 files.

Keep:
  workouts.js
  index.html
  config.js
  all existing assets
