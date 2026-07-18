"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { roadmap } from "@/data/curriculum";
import { PHASE_META, formatShort, todayISO } from "@/lib/plan";
import { useSchedule } from "@/lib/schedule";
import { useProgress } from "@/lib/store";
import { DayCard } from "@/components/day-card";
import { ProgressBar } from "@/components/progress-bar";

export function WeekView({ week }: { week: number }) {
  const w = roadmap.find((x) => x.week === week)!;
  const { progress } = useProgress();
  const schedule = useSchedule();
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(todayISO());
  }, []);

  // Auto-scroll to today's card when viewing the current week
  useEffect(() => {
    if (!today) return;
    const t = w.days.find((d) => schedule.dateOf(d.id) === today);
    if (t) {
      document
        .getElementById(`day-${t.id}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [today, w, schedule]);

  const meta = PHASE_META[w.phase];
  const studyCount = w.days.filter((d) => !d.isRestDay).length;
  const doneCount = w.days.filter((d) => !d.isRestDay && progress[d.id]).length;
  const range = `${formatShort(schedule.dateOf(w.days[0].id))} – ${formatShort(
    schedule.dateOf(w.days[w.days.length - 1].id)
  )}`;

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.badge}`}
            >
              {w.phase}
            </span>
            <span className="text-xs text-zinc-500">{range}, 2026</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight">
            Week {w.week} — {w.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {week > 1 ? (
            <Link
              href={`/week/${week - 1}`}
              className="rounded-xl border border-zinc-300 px-3 py-1.5 text-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              ← Week {week - 1}
            </Link>
          ) : (
            <span className="rounded-xl border border-zinc-200 px-3 py-1.5 text-sm text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
              ← Week 0
            </span>
          )}
          {week < roadmap.length ? (
            <Link
              href={`/week/${week + 1}`}
              className="rounded-xl border border-zinc-300 px-3 py-1.5 text-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Week {week + 1} →
            </Link>
          ) : (
            <span className="rounded-xl border border-zinc-200 px-3 py-1.5 text-sm text-zinc-400 dark:border-zinc-800 dark:text-zinc-600">
              Done →
            </span>
          )}
        </div>
      </div>

      <div className="mb-5 flex items-center gap-3">
        <ProgressBar
          percent={studyCount ? (doneCount / studyCount) * 100 : 0}
          barClass={meta.dot}
          className="flex-1"
        />
        <span className="text-sm text-zinc-500">
          {doneCount}/{studyCount} days
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {w.days.map((d) => (
          <DayCard
            key={d.id}
            day={d}
            date={schedule.dateOf(d.id)}
            isToday={schedule.dateOf(d.id) === today}
          />
        ))}
      </div>
    </div>
  );
}
