# 🧭 Study Compass

A personal study-plan tracker built with Next.js (App Router), TypeScript, and
Tailwind. It turns a day-by-day curriculum into a dashboard you actually keep
up with: daily checklists, proof links, streaks, a phase-colored calendar, and
a backlog that catches anything you miss.

The current plan is 10 weeks, 70 days, Tue Oct 6 – Mon Dec 14 2026, across
seven phases from Python and Tools to Portfolio and Job Hunt. Weeks run
Tuesday to Monday: 4–4.5h weekdays, 6–7h Saturdays, a lighter review day each
Sunday, and four buffer days to catch up on anything that slipped.

## Features

- **Dashboard** — today's plan, overall progress, streaks, the current
  stage's done-when checklist, the house rules, and per-phase progress
- **Weekly view** — each day as a card with checkable sub-tasks, resource
  links, notes, an hours badge, and a proof field for the day's commit
- **Bootcamp watch time** — bootcamp videos are watched at 1.75x, so each
  watch sub-task carries a 1.75x badge with its real runtime, and the
  dashboard totals the time you've ticked off against the plan's 26h40m
- **Daily proof** — "no commit, no credit": completing a day without a proof
  link asks first, or is refused outright if you make proof required in
  Settings
- **Weekly review days** — fields for what you built, what you still can't
  explain, hours and the repo link; a phase's last review day shows whether
  that stage's checklist is ticked
- **Buffer days** — show the current backlog as that day's real tasks, and
  fall back to the curriculum's tasks when nothing is behind
- **Push to tomorrow** — busy days happen; one click on today's card moves the
  day to tomorrow and cascades every later day back one. Undo in Settings.
- **Backlog** — any study day whose date passes without being completed shows
  up here automatically; nothing is silently lost
- **Roadmap & calendar** — the full plan as collapsible weeks and as month
  grids colored by phase
- **Checklists** — the done-when checklist for each of the seven stages
- **DSA** — per-pattern targets toward 70 problems, where only a problem
  re-solved from a blank file counts, plus a log of everything attempted
- **From scratch** — the NumPy drills (no sklearn, no PyTorch) with a repo
  link and the week each is planned for
- **Interview prep** — ML theory questions you can explain out loud, five
  STAR stories, and a mock interview log
- **Applications** — company, role, type, city, link, dates, status and
  notes, with overdue follow-ups highlighted
- **Projects** — the six portfolio projects with status and repo/demo links
- **Certifications** — status, planned week, certificate link and a "show on
  CV" toggle, with a copyable CV line that groups the Kaggle courses
- **Dark mode**, fully responsive

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Editing the curriculum

The day-by-day plan lives in `CURRICULUM.md` between the `CURRICULUM START`
and `CURRICULUM END` markers, as one markdown table per week. Edit it and run:

```bash
npm run generate
```

That regenerates `data/curriculum.ts` and validates the result (10 weeks, 70
days, 7 phases, 7 days per week, and every table date matching its computed
date). Focus cells may carry `[P]` for a project day, `[R]` for the weekly
review day, and `[B]` for a buffer day. Resources are written as
`Name (https://url)`.

`data/curriculum.v3.ts` is the previous 15-week plan, kept as a backup.

## Progress storage & sync

Progress lives in localStorage, so the app works fully offline and logged out.
Every key is namespaced by `PLAN_VERSION` (currently `v4-ml-10w`), so
replacing the curriculum starts a clean slate instead of inheriting ticks from
a plan whose day ids meant something else. Settings offers a one-time export
of the previous plan's progress.

Optionally, log in with a Supabase magic link to sync across devices:

1. Create a free project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard → SQL Editor, run `supabase/schema.sql`.
3. Copy `.env.local.example` to `.env.local` and fill in the project URL and
   anon key (Project Settings → API).
4. Rebuild. An "Account & sync" section appears in Settings.

On login the cloud copy is pulled; afterwards every change is pushed
automatically (debounced). The row holds one blob per plan version, so an
older plan's data is preserved alongside the current one. Without env vars the
app silently stays local-only.
