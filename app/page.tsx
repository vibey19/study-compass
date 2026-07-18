"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PHASE_META, allDays, formatDate, todayISO } from "@/lib/plan";
import {
  backlogDays,
  computeStats,
  planStatus,
  useSchedule,
} from "@/lib/schedule";
import { useProgress } from "@/lib/store";
import { DayCard } from "@/components/day-card";
import { PhaseStrip } from "@/components/phase-strip";

export default function Dashboard() {
  const { progress, ready } = useProgress();
  const schedule = useSchedule();
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(todayISO());
  }, []);

  if (!today || !ready) {
    return (
      <div className="py-24 text-center text-sm text-zinc-400">Loading…</div>
    );
  }

  const status = planStatus(schedule, today);
  const stats = computeStats(progress, schedule, today);
  const backlog = backlogDays(progress, schedule, today);
  const firstDay = allDays[0];

  const focusDay =
    status.kind === "before"
      ? firstDay
      : status.kind === "during"
        ? (status.day ?? status.next)
        : null;
  return (
    <div className="space-y-6">
      {/* Status hero */}
      <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-lg sm:p-8">
        {status.kind === "before" && (
          <>
            <p className="text-sm text-blue-100">
              17-week AI engineer roadmap · ends {formatDate(schedule.end)}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Starts {formatDate(schedule.start)}, 2026
            </h1>
            <p className="mt-2 text-blue-100">
              {status.daysUntil === 1
                ? "Tomorrow. "
                : `In ${status.daysUntil} days. `}
              Use the setup weekend to install tooling and skim the plan.
            </p>
          </>
        )}
        {status.kind === "during" && (
          <>
            <p className="text-sm text-blue-100">{formatDate(today)}, 2026</p>
            {status.day ? (
              <>
                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                  Week {status.day.week} · Day {status.day.dayOfWeek}
                </h1>
                <p className="mt-2 flex flex-wrap items-center gap-2 text-blue-100">
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-medium">
                    {status.day.phase}
                  </span>
                  {status.day.isRestDay ? "Rest day" : status.day.focus}
                </p>
              </>
            ) : (
              <>
                <h1 className="mt-1 text-3xl font-bold tracking-tight">
                  Day off — plan shifted
                </h1>
                <p className="mt-2 text-blue-100">
                  Nothing scheduled today.
                  {status.next &&
                    ` Next up: ${status.next.focus} on ${formatDate(schedule.dateOf(status.next.id))}.`}
                </p>
              </>
            )}
          </>
        )}
        {status.kind === "after" && (
          <>
            <p className="text-sm text-blue-100">
              Ended {formatDate(schedule.end)}, 2026
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Plan complete 🎉
            </h1>
            <p className="mt-2 text-blue-100">
              {stats.completed} of {stats.total} study days done. Ready for the
              hiring cycle.
            </p>
          </>
        )}

        <div className="mt-6 flex items-center gap-3">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all duration-300"
              style={{ width: `${stats.percent}%` }}
            />
          </div>
          <span className="shrink-0 text-sm font-semibold">
            {stats.percent}%
          </span>
        </div>
      </section>

      {/* Stat tiles */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Days done
          </p>
          <p className="mt-1 text-2xl font-bold">
            {stats.completed}
            <span className="text-sm font-normal text-zinc-400">
              /{stats.total}
            </span>
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Streak
          </p>
          <p className="mt-1 text-2xl font-bold">
            🔥 {stats.currentStreak}
            <span className="ml-2 text-sm font-normal text-zinc-400">
              best {stats.longestStreak}
            </span>
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Schedule
          </p>
          <p className="mt-1 text-2xl font-bold">
            {status.kind === "before"
              ? "—"
              : stats.scheduleDelta === 0
                ? "On track"
                : stats.scheduleDelta > 0
                  ? `+${stats.scheduleDelta}d`
                  : `${stats.scheduleDelta}d`}
          </p>
        </div>
        <Link
          href="/backlog"
          className="rounded-2xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
        >
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Backlog
          </p>
          <p
            className={`mt-1 text-2xl font-bold ${backlog.length > 0 ? "text-red-500" : ""}`}
          >
            {backlog.length}
            <span className="ml-2 text-sm font-normal text-zinc-400">
              {backlog.length === 0 ? "clear ✓" : "days →"}
            </span>
          </p>
        </Link>
      </section>

      {/* Today's plan */}
      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold tracking-tight">
            {status.kind === "before"
              ? "First up"
              : status.kind === "during" && !status.day
                ? "Next up"
                : "Today's plan"}
          </h2>
        </div>
        {focusDay ? (
          <>
            <DayCard
              day={focusDay}
              date={schedule.dateOf(focusDay.id)}
              isToday={schedule.dateOf(focusDay.id) === today}
            />
            <div className="mt-3 text-sm">
              <Link
                href={`/week/${focusDay.week}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                View full week {focusDay.week} →
              </Link>
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            Nothing scheduled — the plan is over. Review the{" "}
            <Link
              href="/roadmap"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              roadmap
            </Link>{" "}
            or polish your{" "}
            <Link
              href="/projects"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              projects
            </Link>
            .
          </div>
        )}
      </section>

      {/* Phase overview */}
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Phases</h2>
        <PhaseStrip />
      </section>
    </div>
  );
}
