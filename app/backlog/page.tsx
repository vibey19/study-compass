"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PHASE_META, formatDate, todayISO } from "@/lib/plan";
import { backlogDays, useSchedule } from "@/lib/schedule";
import { useProgress } from "@/lib/store";
import { InlineMd } from "@/components/inline-md";

export default function BacklogPage() {
  const { progress, toggleDay, ready } = useProgress();
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

  const overdue = backlogDays(progress, schedule, today);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Backlog</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Study days whose date has passed without being marked complete. Finish
        one and check it off here — or use "Push to tomorrow" on the dashboard
        ahead of a busy day so it never lands here.
      </p>

      {overdue.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
          <p className="text-3xl">🎉</p>
          <p className="mt-2 font-semibold text-emerald-800 dark:text-emerald-300">
            All caught up
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Nothing overdue. Keep the streak going.
          </p>
        </div>
      ) : (
        <>
          <p className="mt-4 text-sm font-medium text-red-500">
            {overdue.length} day{overdue.length === 1 ? "" : "s"} overdue
          </p>
          <ul className="mt-3 space-y-3">
            {overdue.map((d) => {
              const meta = PHASE_META[d.phase];
              return (
                <li
                  key={d.id}
                  className={`flex items-start gap-3 rounded-2xl border border-l-4 border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 ${meta.edge}`}
                >
                  <input
                    type="checkbox"
                    checked={false}
                    onChange={() => toggleDay(d.id)}
                    aria-label={`Mark ${d.focus} complete`}
                    className="mt-1 h-4 w-4 shrink-0 accent-emerald-600"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{d.focus}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.badge}`}
                      >
                        {d.phase}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      Was due {formatDate(schedule.dateOf(d.id))} · Week{" "}
                      {d.week}, Day {d.dayOfWeek}
                    </p>
                    {d.tasks && (
                      <p className="mt-1.5 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <InlineMd text={d.tasks} />
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/week/${d.week}`}
                    className="shrink-0 text-xs text-blue-600 hover:underline dark:text-blue-400"
                  >
                    open →
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
