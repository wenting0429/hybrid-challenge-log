-- HYBRID CHALLENGE LOG
-- Repair / install the public "累計瀏覽" counter.
-- Safe to run more than once.

create table if not exists public.site_stats (
  stat_key text primary key,
  stat_value bigint not null default 0,
  updated_at timestamptz not null default now()
);

insert into public.site_stats (stat_key, stat_value)
values ('visits', 0)
on conflict (stat_key) do nothing;

alter table public.site_stats enable row level security;

create or replace function public.increment_site_visit()
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v bigint;
begin
  insert into public.site_stats (stat_key, stat_value, updated_at)
  values ('visits', 1, now())
  on conflict (stat_key)
  do update set
    stat_value = public.site_stats.stat_value + 1,
    updated_at = now()
  returning stat_value into v;

  return v;
end;
$$;

create or replace function public.get_site_visits()
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (select stat_value from public.site_stats where stat_key = 'visits'),
    0
  )::bigint;
$$;

-- Public browser users may call only these functions.
revoke all on function public.increment_site_visit() from public;
revoke all on function public.get_site_visits() from public;

grant usage on schema public to anon, authenticated;
grant execute on function public.increment_site_visit() to anon, authenticated;
grant execute on function public.get_site_visits() to anon, authenticated;

-- Ask PostgREST/Supabase REST API to refresh its function schema immediately.
notify pgrst, 'reload schema';

-- Optional check:
select stat_key, stat_value, updated_at
from public.site_stats
where stat_key = 'visits';
