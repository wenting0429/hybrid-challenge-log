# HYROX TRAINING LOG — Public Release

這是公開版候選版本。

## 公開版已整理
- 移除 Local Demo / Shared Cloud / 雲端設定 UI
- 網站固定連線到同一個 Supabase
- Supabase 設定獨立放在 `config.js`，之後更新 `index.html` 不需要重填
- 增加暱稱、挑戰名稱、備註、距離、次數等輸入上限
- 同一台裝置對同一原始挑戰，一小時內重複開始不重複增加「被挑戰次數」
- 成績牆增加 loading / connection error 狀態
- 公開版錯誤訊息不再暴露 Supabase／SQL 開發細節
- 保留既有：挑戰成功才能登錄、挑戰結果不能再次被發起挑戰

## 第一次部署前只需設定一次
打開 `config.js`，把兩個 placeholder 換成：
- Supabase Project URL
- Supabase Publishable key (`sb_publishable_...`)

Publishable key 可以出現在前端；不要放 secret/service_role key。

## GitHub / Netlify
GitHub repository 根目錄建議：
- index.html
- config.js
- supabase-setup.sql（備份用）
- ADMIN-GUIDE.md

Netlify:
- Branch: main
- Build command: 留空
- Publish directory: .
