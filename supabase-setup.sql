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
