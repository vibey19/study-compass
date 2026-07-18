"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { roadmap } from "@/data/curriculum";
import { PHASE_META, formatShort, todayISO } from "@/lib/plan";
import { currentWeekNumber, useSchedule } from "@/lib/schedule";
import { useProgress } from "@/lib/store";
import { InlineMd } from "@/components/inline-md";

export default function RoadmapPage() {
  const { progress, toggleDay } = useProgress();
  const schedule = useSchedule();
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    const t = todayISO();
    setToday(t);
    setOpen({ [currentWeekNumber(schedule, t)]: true });
    // schedule is stable per shifts; opening once on mount is intended
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const jumpTo = (week: number) => {
    setOpen((o) => ({ ...o, [week]: true }));
    // let the section render before scrolling
    requestAnimationFrame(() => {
      document
        .getElementById(`week-${week}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Full roadmap</h1>
      <p className="mt-1 text-sm text-zinc-500">
        17 weeks · {formatShort(schedule.start)} – {formatShort(schedule.end)},
        2026
      </p>

      {/* Quick jump */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {roadmap.map((w) => (
          <button
            key={w.week}
            onClick={() => jumpTo(w.week)}
            title={w.title}
            className={`h-8 w-8 rounded-lg text-xs font-medium text-white transition-opacity ${PHASE_META[w.phase].dot} hover:opacity-80`}
          >
            {w.week}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {roadmap.map((w) => {
          const meta = PHASE_META[w.phase];
          const study = w.days.filter((d) => !d.isRestDay);
          const done = study.filter((d) => progress[d.id]).length;
          const isOpen = !!open[w.week];
          const range = `${formatShort(schedule.dateOf(w.days[0].id))} – ${formatShort(schedule.dateOf(w.days[w.days.length - 1].id))}`;
          return (
            <section
              key={w.week}
              id={`week-${w.week}`}
              className="scroll-mt-20 rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            >
              <button
                onClick={() =>
                  setOpen((o) => ({ ...o, [w.week]: !o[w.week] }))
                }
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <span
                  className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${meta.dot}`}
                />
                <span className="min-w-0 flex-1">
                  <span className="font-semibold">
                    Week {w.week} — {w.title}
                  </span>
                  <span className="ml-2 whitespace-nowrap text-xs text-zinc-500">
                    {range}
                  </span>
                </span>
                <span
                  className={`text-sm ${done === study.length ? "font-medium text-emerald-600 dark:text-emerald-400" : "text-zinc-500"}`}
                >
                  {done}/{study.length}
                </span>
                <span className="text-zinc-400">{isOpen ? "▾" : "▸"}</span>
              </button>

              {isOpen && (
                <div className="overflow-x-auto border-t border-zinc-100 dark:border-zinc-800">
                  <table className="w-full min-w-[560px] text-sm">
                    <tbody>
                      {w.days.map((d) => {
                        const isDone = !!progress[d.id];
                        const isToday = schedule.dateOf(d.id) === today;
                        return (
                          <tr
                            key={d.id}
                            className={`border-b border-zinc-100 last:border-0 dark:border-zinc-800/60 ${
                              d.isRestDay
                                ? "text-zinc-400 dark:text-zinc-500"
                                : ""
                            } ${isToday ? "bg-blue-50 dark:bg-blue-950/30" : ""}`}
                          >
                            <td className="w-10 px-4 py-2 text-center">
                              {d.isRestDay ? (
                                <span title="Rest day">—</span>
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={isDone}
                                  onChange={() => toggleDay(d.id)}
                                  className="accent-emerald-600"
                                  aria-label={`Mark ${d.focus} complete`}
                                />
                              )}
                            </td>
                            <td className="whitespace-nowrap px-2 py-2 text-zinc-500">
                              {formatShort(schedule.dateOf(d.id))}
                            </td>
                            <td
                              className={`px-2 py-2 font-medium ${isDone ? "text-zinc-400 line-through dark:text-zinc-500" : ""}`}
                            >
                              {d.focus}
                              {d.isProjectDay && (
                                <span
                                  className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] ${meta.badge}`}
                                >
                                  P
                                </span>
                              )}
                            </td>
                            <td className="hidden px-2 py-2 text-zinc-500 md:table-cell">
                              <span className="line-clamp-1">
                                <InlineMd text={d.tasks} />
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 text-right">
                              <Link
                                href={`/week/${w.week}`}
                                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                              >
                                open
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
