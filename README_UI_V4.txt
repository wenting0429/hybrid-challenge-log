HYBRID CHALLENGE LOG — UI V4 (2026-09-13)

Approved interaction applied:

HOME
- Classic challenge keeps normal selectors.
- Daily training uses a normal dropdown selector (no horizontal swipe cards).
- Neither classic nor daily expands menu content inside the homepage card.

TRUE POP-UP
- Classic "查看菜單" opens a centered modal with dark/blurred background.
- Daily "查看菜單" opens the same style of centered modal.
- Pop-up is visually separated from the page with strong shadow/border/overlay.
- Only the selected menu is shown.

DAILY POP-UP ACTIONS
- 關閉
- 修改菜單 / 已鎖定
- 開始訓練

CLASSIC POP-UP ACTIONS
- 關閉
- 挑戰開始

Other functionality retained:
- Supabase results/daily_templates
- locked-menu rules
- factual correction rules
- active-session round/block colors
- score-wall round/block colors

Deploy:
replace these five files:
  index.html
  style.css
  workouts.js
  app.js
  service-worker.js

Keep config.js and all existing assets.
