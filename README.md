# 🧭 Study Compass

A personal study-plan tracker built with Next.js (App Router), TypeScript, and
Tailwind. It turns a day-by-day curriculum into a dashboard you actually keep
up with: daily checklists, streaks, a phase-colored calendar, and a backlog
that catches anything you miss.

## Features

- **Dashboard** — today's plan, overall progress, streaks, and per-phase
  progress at a glance
- **Weekly view** — each day as a card with checkable sub-tasks, resource
  links, notes, and a mark-complete control
- **Push to tomorrow** — busy days happen; one click on today's card moves the
  day to tomorrow and cascades every later day back one. Undo in Settings.
- **Backlog** — any study day whose date passes without being completed shows
  up here automatically; nothing is silently lost
- **Roadmap & calendar** — the full plan as collapsible weeks and as month
  grids colored by phase
- **Projects** — portfolio project tracking with status and repo/demo links
- **Dark mode**, fully responsive

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Progress storage & sync

Progress lives in localStorage, so the app works fully offline and logged out.
Optionally, log in with a Supabase magic link to sync across devices:

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard → SQL Editor, run `supabase/schema.sql`.
3. Copy `.env.local.example` to `.env.local` and fill in the project URL and
   anon key (Project Settings → API).
4. Rebuild. An "Account & sync" section appears in Settings.

On login the cloud copy is pulled; afterwards every change is pushed
automatically (debounced). Without env vars the app silently stays local-only.
