import { roadmap, PHASE_NAMES, type DayEntry } from "@/data/curriculum";

export const allDays: DayEntry[] = roadmap.flatMap((w) => w.days);
/** No day in this plan is a rest day, so this is every day. */
export const studyDays: DayEntry[] = allDays.filter((d) => !d.isRestDay);
export const reviewDays: DayEntry[] = allDays.filter((d) => d.track === "review");
export const bufferDays: DayEntry[] = allDays.filter((d) => d.isBufferDay);
export const PLAN_START = allDays[0].date;
export const PLAN_WEEKS = roadmap.length;
export const DAY_MS = 86400000;

const pad = (n: number) => String(n).padStart(2, "0");
const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function todayISO(): string {
  const n = new Date();
  return `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())}`;
}

export function toUTC(iso: string): number {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

export function fromUTC(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

export function daysBetween(fromISO: string, toISO: string): number {
  return Math.round((toUTC(toISO) - toUTC(fromISO)) / DAY_MS);
}

/** "Mon, Jul 20" */
export function formatDate(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  const wd = WEEKDAYS[(new Date(toUTC(iso)).getUTCDay() + 6) % 7];
  return `${wd}, ${MONTH_NAMES[m - 1]} ${d}`;
}

/** "Jul 20" */
export function formatShort(iso: string): string {
  const [, m, d] = iso.split("-").map(Number);
  return `${MONTH_NAMES[m - 1]} ${d}`;
}

export type PhaseProgress = {
  name: string;
  firstWeek: number;
  lastWeek: number;
  total: number;
  completed: number;
};

export function phaseProgress(
  progress: Record<string, boolean>
): PhaseProgress[] {
  return PHASE_NAMES.map((name) => {
    const days = studyDays.filter((d) => d.phase === name);
    const wks = roadmap.filter((w) => w.phase === name).map((w) => w.week);
    return {
      name,
      firstWeek: Math.min(...wks),
      lastWeek: Math.max(...wks),
      total: days.length,
      completed: days.filter((d) => progress[d.id]).length,
    };
  });
}

/** Splits a day's task text into checkable sub-tasks (semicolon-separated). */
export function subtasksOf(day: DayEntry): string[] {
  if (!day.tasks) return [];
  return day.tasks
    .split(/;\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}


/** Weekly review and buffer days are light; Saturday is the heavy day. */
export type DayIntensity = { hours: string; label: string; heavy: boolean };

export function dayIntensity(day: DayEntry): DayIntensity {
  if (day.track === "review") {
    return { hours: "light", label: "Lighter weekly review day", heavy: false };
  }
  if (day.isBufferDay) {
    return { hours: "light", label: "Buffer day — catch up on what slipped", heavy: false };
  }
  // Weeks run Tue → Mon, so day 5 is the Saturday. Read it off the base
  // date rather than the day number so a curriculum edit can't desync it.
  const isSaturday = new Date(toUTC(day.date)).getUTCDay() === 6;
  return isSaturday
    ? { hours: "6–7h", label: "Saturday — the heavy day of the week", heavy: true }
    : { hours: "4–4.5h", label: "Weekday", heavy: false };
}

/**
 * The last weekly review day inside a phase — where the stage's done-when
 * checklist has to be ticked before the next stage starts.
 */
export function isPhaseFinalReviewDay(day: DayEntry): boolean {
  if (day.track !== "review") return false;
  const inPhase = reviewDays.filter((d) => d.phase === day.phase);
  return inPhase[inPhase.length - 1]?.id === day.id;
}

/** The phase that `week` belongs to, or null. */
export function phaseOfWeek(week: number): string | null {
  return roadmap.find((w) => w.week === week)?.phase ?? null;
}

export type PhaseMeta = {
  dot: string;
  fill: string;
  badge: string;
  cell: string;
  edge: string;
};

// Literal class strings so Tailwind's compiler sees them.
// Keys must match the phase names in CURRICULUM.md exactly.
// Hue order is deliberate: adjacent phases sit next to each other in the
// phase strip and calendar, so hues alternate cool/warm to keep every
// neighboring pair distinguishable (validated incl. color-vision-deficiency
// simulation; dark mode steps down to -600 where -500 is too bright).
export const PHASE_META: Record<string, PhaseMeta> = {
  "Python and Tools": {
    dot: "bg-blue-500",
    fill: "bg-blue-500",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
    cell: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-500/20 dark:hover:bg-blue-500/30",
    edge: "border-l-blue-500",
  },
  "Data, SQL and Math": {
    dot: "bg-emerald-500 dark:bg-emerald-600",
    fill: "bg-emerald-500 dark:bg-emerald-600",
    badge:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
    cell: "bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-500/20 dark:hover:bg-emerald-500/30",
    edge: "border-l-emerald-500",
  },
  "Classic Machine Learning": {
    dot: "bg-fuchsia-500",
    fill: "bg-fuchsia-500",
    badge:
      "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
    cell: "bg-fuchsia-100 hover:bg-fuchsia-200 dark:bg-fuchsia-500/20 dark:hover:bg-fuchsia-500/30",
    edge: "border-l-fuchsia-500",
  },
  "Deep Learning and Transformers": {
    dot: "bg-amber-500 dark:bg-amber-600",
    fill: "bg-amber-500 dark:bg-amber-600",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    cell: "bg-amber-100 hover:bg-amber-200 dark:bg-amber-500/20 dark:hover:bg-amber-500/30",
    edge: "border-l-amber-500",
  },
  "LLMs and RAG": {
    dot: "bg-teal-500 dark:bg-teal-600",
    fill: "bg-teal-500 dark:bg-teal-600",
    badge: "bg-teal-100 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300",
    cell: "bg-teal-100 hover:bg-teal-200 dark:bg-teal-500/20 dark:hover:bg-teal-500/30",
    edge: "border-l-teal-500",
  },
  "MLOps and Cloud": {
    dot: "bg-orange-500 dark:bg-orange-600",
    fill: "bg-orange-500 dark:bg-orange-600",
    badge:
      "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300",
    cell: "bg-orange-100 hover:bg-orange-200 dark:bg-orange-500/20 dark:hover:bg-orange-500/30",
    edge: "border-l-orange-500",
  },
  "Portfolio and Job Hunt": {
    dot: "bg-violet-500",
    fill: "bg-violet-500",
    badge:
      "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
    cell: "bg-violet-100 hover:bg-violet-200 dark:bg-violet-500/20 dark:hover:bg-violet-500/30",
    edge: "border-l-violet-500",
  },
};
