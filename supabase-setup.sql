create table if not exists public.training_results (
  id text primary key,
  created_at timestamptz not null default now(),
  nickname text not null check (char_length(nickname) between 1 and 30),
  session_date date not null,
  division text not null,
  workout_type text not null,
  workout_name text,
  total_seconds integer,
  rpe numeric,
  run_distance_m integer not null default 0,
  stations jsonb not null default '{}'::jsonb,
  notes text,
  completion_pct integer not null default 0
);

alter table public.training_results enable row level security;

drop policy if exists "public can read training results" on public.training_results;
create policy "public can read training results"
on public.training_results for select
to anon
using (true);

drop policy if exists "public can add training results" on public.training_results;
create policy "public can add training results"
on public.training_results for insert
to anon
with check (
  char_length(nickname) between 1 and 30
  and completion_pct between 0 and 100
  and (rpe is null or (rpe >= 1 and rpe <= 10))
  and run_distance_m >= 0
);


-- Track how many times each score-wall entry has been challenged.
create table if not exists public.challenge_events (
  id text primary key,
  created_at timestamptz not null default now(),
  source_result_id text not null
);

alter table public.challenge_events enable row level security;

drop policy if exists "public can read challenge events" on public.challenge_events;
create policy "public can read challenge events"
on public.challenge_events for select
to anon
using (true);

drop policy if exists "public can add challenge events" on public.challenge_events;
create policy "public can add challenge events"
on public.challenge_events for insert
to anon
with check (char_length(source_result_id) > 0);

grant select, insert on public.challenge_events to anon;
grant select, insert on public.challenge_events to authenticated;

-- =========================================================
-- Reliable persistent challenge counter
-- Run this whole file again in Supabase SQL Editor.
-- Existing training_results rows are preserved.
-- =========================================================

alter table public.training_results
add column if not exists challenge_count integer not null default 0;

create or replace function public.increment_challenge_count(p_source_result_id text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  update public.training_results
  set challenge_count = coalesce(challenge_count, 0) + 1
  where id = p_source_result_id
  returning challenge_count into v_count;

  if v_count is null then
    raise exception 'Challenge source not found: %', p_source_result_id;
  end if;

  return v_count;
end;
$$;

revoke all on function public.increment_challenge_count(text) from public;
grant execute on function public.increment_challenge_count(text) to anon;
grant execute on function public.increment_challenge_count(text) to authenticated;
