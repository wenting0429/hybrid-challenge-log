-- HYBRID CHALLENGE LOG: lightweight public visit counter
-- Counts a visit session from the frontend at most once per browser every 30 minutes.
-- The table itself is not directly writable by anonymous users.

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
  update public.site_stats
  set stat_value = stat_value + 1,
      updated_at = now()
  where stat_key = 'visits'
  returning stat_value into v;

  if v is null then
    insert into public.site_stats (stat_key, stat_value)
    values ('visits', 1)
    returning stat_value into v;
  end if;

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
  );
$$;

revoke all on function public.increment_site_visit() from public;
revoke all on function public.get_site_visits() from public;

grant execute on function public.increment_site_visit() to anon;
grant execute on function public.increment_site_visit() to authenticated;
grant execute on function public.get_site_visits() to anon;
grant execute on function public.get_site_visits() to authenticated;
