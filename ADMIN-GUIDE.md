# HYROX TRAINING LOG — 公開版後台管理

## 刪除錯誤／測試資料
最簡單：Supabase Dashboard → Table Editor → `training_results` → 找到該 row → Delete。

如果要用 SQL，先查再刪：

```sql
select id, nickname, workout_name, total_seconds, created_at
from public.training_results
where nickname = '測試用暱稱'
order by created_at desc;
```

確認後再刪：

```sql
delete from public.training_results
where id = '要刪除的那一筆 id';
```

## 修正被挑戰次數

```sql
update public.training_results
set challenge_count = 0
where id = '該挑戰 id';
```

## 上線前
1. 編輯 `config.js`
2. 填入 Supabase Project URL
3. 填入 `sb_publishable_...` Publishable key
4. 不要放 `sb_secret_...` 或 `service_role`
5. GitHub 上傳 `index.html` + `config.js`
6. Netlify 連 GitHub repository
7. 手機與無痕模式各測一次成績牆讀寫
