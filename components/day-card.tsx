"use client";

import Link from "next/link";
import type { DayEntry } from "@/data/curriculum";
import { projectForWeek } from "@/data/projects";
import { PHASE_META, formatDate, subtasksOf } from "@/lib/plan";
import { useProgress } from "@/lib/store";
import { InlineMd } from "@/components/inline-md";
import { ResourceLinks } from "@/components/resource-links";

export function DayCard({
  day,
  date,
  isToday = false,
}: {
  day: DayEntry;
  /** effective (schedule-adjusted) ISO date; falls back to the base date */
  date?: string;
  isToday?: boolean;
}) {
  const { progress, toggleDay, subtasks, toggleSubtask, notes, setNote } =
    useProgress();
  const done = !!progress[day.id];
  const meta = PHASE_META[day.phase];
  const subs = subtasksOf(day);
  const project = day.isProjectDay ? projectForWeek(day.week) : null;
  const shownDate = date ?? day.date;
  const todayRing = isToday ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-950" : "";

  if (day.isRestDay) {
    return (
      <div
        id={`day-${day.id}`}
        className={`rounded-2xl border border-dashed border-zinc-300 bg-zinc-100/60 p-4 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400 ${todayRing}`}
      >
        <div className="flex items-center justify-between text-xs uppercase tracking-wide">
          <span>{formatDate(shownDate)}</span>
          {isToday && <span className="font-semibold text-blue-500">Today</span>}
        </div>
        <p className="mt-2 font-medium">😴 Rest day — {day.focus}</p>
        {day.tasks && (
          <p className="mt-1 text-sm">
            <InlineMd text={day.tasks} />
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      id={`day-${day.id}`}
      className={`flex flex-col rounded-2xl border border-l-4 p-4 shadow-sm transition-all ${meta.edge} ${
        done
          ? "border-y-emerald-300 border-r-emerald-300 bg-emerald-50/60 dark:border-y-emerald-800 dark:border-r-emerald-800 dark:bg-emerald-950/30"
          : "border-y-zinc-200 border-r-zinc-200 bg-white hover:shadow-md dark:border-y-zinc-800 dark:border-r-zinc-800 dark:bg-zinc-900"
      } ${todayRing}`}
    >
      <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="uppercase tracking-wide">
          {formatDate(shownDate)} · Day {day.dayOfWeek}
        </span>
        <span className="flex items-center gap-2">
          {isToday && <span className="font-semibold text-blue-500">Today</span>}
          {day.isProjectDay && (
            <Link
              href={project ? `/projects#${project.id}` : "/projects"}
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.badge}`}
            >
              🛠 Project{project ? ` ${project.number}` : " day"}
            </Link>
          )}
        </span>
      </div>

      <h3
        className={`mt-2 font-semibold ${
          done
            ? "text-emerald-800 line-through decoration-emerald-400 dark:text-emerald-300"
            : ""
        }`}
      >
        {day.focus}
      </h3>

      {subs.length > 1 ? (
        <ul className="mt-2 space-y-1.5">
          {subs.map((s, i) => {
            const key = `${day.id}#${i}`;
            const checked = !!subtasks[key];
            return (
              <li key={key}>
                <label className="flex cursor-pointer items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSubtask(key)}
                    className="mt-0.5 accent-emerald-600"
                  />
                  <span
                    className={
                      checked
                        ? "text-zinc-400 line-through dark:text-zinc-500"
                        : "text-zinc-700 dark:text-zinc-300"
                    }
                  >
                    <InlineMd text={s} />
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      ) : day.tasks ? (
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          <InlineMd text={day.tasks} />
        </p>
      ) : null}

      <ResourceLinks resources={day.resources} />

      <details className="mt-3">
        <summary className="cursor-pointer select-none text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
          Notes{notes[day.id] ? " ●" : ""}
        </summary>
        <textarea
          value={notes[day.id] ?? ""}
          onChange={(e) => setNote(day.id, e.target.value)}
          rows={3}
          placeholder="Notes for this day…"
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white p-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </details>

      <button onClick={() => toggleDay(day.id)} className="mt-auto w-full pt-3">
        <span
          className={`block w-full rounded-xl px-3 py-2 text-center text-sm font-medium transition-colors ${
            done
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "border border-zinc-300 hover:border-emerald-400 hover:bg-emerald-50 dark:border-zinc-700 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30"
          }`}
        >
          {done ? "✓ Completed" : "Mark day complete"}
        </span>
      </button>
    </div>
  );
}
