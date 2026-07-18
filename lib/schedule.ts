// The schedule layer: curriculum dates are fixed in data/curriculum.ts, but
// the user can push days ("shifts"). Every day's *effective* date = its base
// position + all shifts that start at or before it, so one push cascades
// through the rest of the plan. All date-aware UI reads from a Schedule.
import { useMemo } from "react";
import type { DayEntry } from "@/data/curriculum";
import {
  DAY_MS,
  PLAN_START,
  allDays,
  fromUTC,
  studyDays,
  toUTC,
  todayISO,
} from "@/lib/plan";
import { useProgress, type ShiftEntry } from "@/lib/store";

export type Schedule = {
  idToDate: Record<string, string>;
  start: string;
  end: string;
  dateOf: (id: string) => string;
  dayOn: (iso: string) => DayEntry | null;
};

const indexOfId = new Map(allDays.map((d, i) => [d.id, i] as const));

export function buildSchedule(shifts: ShiftEntry[]): Schedule {
  const offsets = new Array<number>(allDays.length).fill(0);
  for (const s of shifts) {
    const from = indexOfId.get(s.fromId);
    if (from === undefined) continue;
    for (let i = from; i < offsets.length; i++) offsets[i] += s.days;
  }
  const startMs = toUTC(PLAN_START);
  const idToDate: Record<string, string> = {};
  const dateToDay = new Map<string, DayEntry>();
  allDays.forEach((d, i) => {
    const iso = fromUTC(startMs + (i + offsets[i]) * DAY_MS);
    idToDate[d.id] = iso;
    dateToDay.set(iso, d);
  });
  return {
    idToDate,
    start: idToDate[allDays[0].id],
    end: idToDate[allDays[allDays.length - 1].id],
    dateOf: (id) => idToDate[id] ?? "",
    dayOn: (iso) => dateToDay.get(iso) ?? null,
  };
}

export function useSchedule(): Schedule {
  const { shifts } = useProgress();
  return useMemo(() => buildSchedule(shifts), [shifts]);
}

export type PlanStatus =
  | { kind: "before"; daysUntil: number }
  // day is null when today falls in a gap left by a pushed day;
  // next is then the first upcoming scheduled day.
  | { kind: "during"; day: DayEntry | null; next: DayEntry | null }
  | { kind: "after" };

export function planStatus(schedule: Schedule, today = todayISO()): PlanStatus {
  if (today < schedule.start) {
    return {
      kind: "before",
      daysUntil: Math.round((toUTC(schedule.start) - toUTC(today)) / DAY_MS),
    };
  }
  if (today > schedule.end) return { kind: "after" };
  const day = schedule.dayOn(today);
  const next = day
    ? null
    : (allDays.find((d) => schedule.dateOf(d.id) > today) ?? null);
  return { kind: "during", day, next };
}

export function currentWeekNumber(
  schedule: Schedule,
  today = todayISO()
): number {
  const st = planStatus(schedule, today);
  if (st.kind === "before") return 1;
  if (st.kind === "after") return allDays[allDays.length - 1].week;
  return (st.day ?? st.next)?.week ?? 1;
}

export type Stats = {
  completed: number;
  total: number;
  percent: number;
  currentStreak: number;
  longestStreak: number;
  /** completed minus scheduled-so-far study days: 0 = on track, <0 behind, >0 ahead */
  scheduleDelta: number;
};

export function computeStats(
  progress: Record<string, boolean>,
  schedule: Schedule,
  today = todayISO()
): Stats {
  const completed = studyDays.filter((d) => progress[d.id]).length;
  const total = studyDays.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  const past = studyDays.filter((d) => schedule.dateOf(d.id) <= today);
  let i = past.length - 1;
  // An incomplete "today" doesn't break the streak yet
  if (i >= 0 && schedule.dateOf(past[i].id) === today && !progress[past[i].id]) {
    i--;
  }
  let currentStreak = 0;
  while (i >= 0 && progress[past[i].id]) {
    currentStreak++;
    i--;
  }

  let longestStreak = 0;
  let run = 0;
  for (const d of studyDays) {
    run = progress[d.id] ? run + 1 : 0;
    if (run > longestStreak) longestStreak = run;
  }

  return {
    completed,
    total,
    percent,
    currentStreak,
    longestStreak,
    scheduleDelta: completed - past.length,
  };
}

/** Study days whose (effective) date has passed without being completed. */
export function backlogDays(
  progress: Record<string, boolean>,
  schedule: Schedule,
  today = todayISO()
): DayEntry[] {
  return studyDays.filter(
    (d) => schedule.dateOf(d.id) < today && !progress[d.id]
  );
}
