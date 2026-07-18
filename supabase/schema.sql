-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- One row per user holding the same JSON blob the app keeps in localStorage.

create table if not exists public.roadmap_progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.roadmap_progress enable row level security;

create policy "Users manage their own progress"
  on public.roadmap_progress
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
