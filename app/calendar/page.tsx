"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PHASE_META, allDays, todayISO } from "@/lib/plan";
import { useSchedule } from "@/lib/schedule";
import { useProgress } from "@/lib/store";
import type { DayEntry } from "@/data/curriculum";

const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function monthCells(year: number, month: number): (string | null)[] {
  const pad = (n: number) => String(n).padStart(2, "0");
  const startPad = (new Date(Date.UTC(year, month, 1)).getUTCDay() + 6) % 7; // Monday start
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const cells: (string | null)[] = Array(startPad).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(`${year}-${pad(month + 1)}-${pad(d)}`);
  }
  return cells;
}

export default function CalendarPage() {
  const { progress } = useProgress();
  const schedule = useSchedule();
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(todayISO());
  }, []);

  // Months spanned by the *effective* schedule (extends if days were pushed)
  const months = useMemo(() => {
    const seen = new Set<string>();
    const out: [number, number][] = [];
    for (const d of allDays) {
      const key = schedule.dateOf(d.id).slice(0, 7);
      if (!seen.has(key)) {
        seen.add(key);
        const [y, m] = key.split("-").map(Number);
        out.push([y, m - 1]);
      }
    }
    return out;
  }, [schedule]);

  const dayFor = (iso: string): DayEntry | null => schedule.dayOn(iso);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Colored by phase, following your adjusted schedule. Click a day to open
        its week.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {months.map(([year, month]) => (
          <section
            key={`${year}-${month}`}
            className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="mb-3 text-sm font-semibold">
              {MONTH_LABELS[month]} {year}
            </h2>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-zinc-400">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i}>{d}</span>
              ))}
            </div>
            <div className="mt-1 grid grid-cols-7 gap-1">
              {monthCells(year, month).map((iso, i) => {
                if (!iso) return <span key={i} />;
                const entry = dayFor(iso);
                const dayNum = Number(iso.slice(8));
                if (!entry) {
                  return (
                    <span
                      key={i}
                      className="flex aspect-square items-center justify-center rounded-md text-xs text-zinc-300 dark:text-zinc-700"
                    >
                      {dayNum}
                    </span>
                  );
                }
                const done = !!progress[entry.id];
                const isToday = iso === today;
                const base = entry.isRestDay
                  ? "bg-zinc-100 text-zinc-400 dark:bg-zinc-800/60 dark:text-zinc-500"
                  : `${PHASE_META[entry.phase].cell} text-zinc-800 dark:text-zinc-200`;
                return (
                  <Link
                    key={i}
                    href={`/week/${entry.week}`}
                    title={`${iso} — ${entry.isRestDay ? "Rest" : entry.focus}${done ? " ✓" : ""}`}
                    className={`relative flex aspect-square items-center justify-center rounded-md text-xs transition-transform hover:scale-110 ${base} ${
                      isToday ? "ring-2 ring-blue-500" : ""
                    }`}
                  >
                    {done && !entry.isRestDay ? "✓" : dayNum}
                    {entry.isProjectDay && (
                      <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-zinc-900/60 dark:bg-white/70" />
                    )}
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
        {Object.entries(PHASE_META).map(([name, meta]) => (
          <span key={name} className="flex items-center gap-1.5">
            <span className={`inline-block h-2 w-2 rounded-full ${meta.dot}`} />
            {name}
          </span>
        ))}
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          Rest day
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-900/60 dark:bg-white/70" />
          Project day
        </span>
      </div>
    </div>
  );
}
