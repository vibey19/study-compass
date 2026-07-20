// The schedule layer: curriculum dates are fixed in data/curriculum.ts, but
// the plan is elastic. Two things move it off that fixed baseline:
//  - manual "shifts": the user explicitly pushes a day (and everything
//    after it) later, e.g. "Push to tomorrow".
//  - automatic "drift": a single number, recomputed fresh every time from
//    progress, comparing how many study days *should* be done by today
//    (per the original fixed calendar) against how many actually are.
//    Ahead of pace → negative drift → the whole remaining plan (and its
//    finish date) pulls earlier. Behind pace → positive drift → it pushes
//    later. Because it's recomputed from scratch each time rather than
//    logged as an event, unchecking a day you jumped ahead on unwinds it
//    automatically, and a day you never get to keeps sliding to "today"
//    instead of piling up as overdue.
// Every day's *effective* date = its base position + drift + all manual
// shifts that start at or before it. All date-aware UI reads from a
// Schedule.
import { useEffect, useMemo, useState } from "react";
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
  /** calendar days the plan has moved vs. its original fixed dates (negative = pulled earlier/ahead) */
  drift: number;
  dateOf: (id: string) => string;
  dayOn: (iso: string) => DayEntry | null;
};

const indexOfId = new Map(allDays.map((d, i) => [d.id, i] as const));

/**
 * Positive when behind pace (fewer study days completed than the original
 * calendar has scheduled by `today`), negative when ahead. Pure function of
 * progress + today, so it's always current — never a log to replay.
 */
export function computeDrift(
  progress: Record<string, boolean>,
  today = todayISO()
): number {
  const scheduledSoFar = studyDays.filter((d) => d.date <= today).length;
  const completed = studyDays.filter((d) => progress[d.id]).length;
  return scheduledSoFar - completed;
}

export function buildSchedule(
  shifts: ShiftEntry[],
  driftDays = 0
): Schedule {
  const offsets = new Array<number>(allDays.length).fill(driftDays);
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
    drift: driftDays,
    dateOf: (id) => idToDate[id] ?? "",
    dayOn: (iso) => dateToDay.get(iso) ?? null,
  };
}

export function useSchedule(): Schedule {
  const { shifts, progress } = useProgress();
  // Date-dependent, so resolved client-side only (see nav.tsx) — otherwise
  // a statically prerendered page bakes in the build's date as "today".
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    setToday(todayISO());
  }, []);
  return useMemo(() => {
    const drift = computeDrift(progress, today ?? PLAN_START);
    return buildSchedule(shifts, drift);
  }, [shifts, progress, today]);
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
  /** days the plan has moved off its original calendar: 0 = on track, <0 behind, >0 ahead */
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
    scheduleDelta: -schedule.drift,
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
