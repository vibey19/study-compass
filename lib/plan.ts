import { roadmap, PHASE_NAMES, type DayEntry } from "@/data/curriculum";

export const allDays: DayEntry[] = roadmap.flatMap((w) => w.days);
export const studyDays: DayEntry[] = allDays.filter((d) => !d.isRestDay);
export const PLAN_START = allDays[0].date;
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
  "Python Foundations": {
    dot: "bg-blue-500",
    fill: "bg-blue-500",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
    cell: "bg-blue-100 hover:bg-blue-200 dark:bg-blue-500/20 dark:hover:bg-blue-500/30",
    edge: "border-l-blue-500",
  },
  "Data Science Toolkit": {
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
  "Deployment & MLOps": {
    dot: "bg-amber-500 dark:bg-amber-600",
    fill: "bg-amber-500 dark:bg-amber-600",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    cell: "bg-amber-100 hover:bg-amber-200 dark:bg-amber-500/20 dark:hover:bg-amber-500/30",
    edge: "border-l-amber-500",
  },
  NLP: {
    dot: "bg-teal-500 dark:bg-teal-600",
    fill: "bg-teal-500 dark:bg-teal-600",
    badge: "bg-teal-100 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300",
    cell: "bg-teal-100 hover:bg-teal-200 dark:bg-teal-500/20 dark:hover:bg-teal-500/30",
    edge: "border-l-teal-500",
  },
  "Deep Learning": {
    dot: "bg-orange-500 dark:bg-orange-600",
    fill: "bg-orange-500 dark:bg-orange-600",
    badge:
      "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300",
    cell: "bg-orange-100 hover:bg-orange-200 dark:bg-orange-500/20 dark:hover:bg-orange-500/30",
    edge: "border-l-orange-500",
  },
  "Transformers & GenAI": {
    dot: "bg-violet-500",
    fill: "bg-violet-500",
    badge:
      "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
    cell: "bg-violet-100 hover:bg-violet-200 dark:bg-violet-500/20 dark:hover:bg-violet-500/30",
    edge: "border-l-violet-500",
  },
  "LLM Engineering": {
    dot: "bg-rose-500",
    fill: "bg-rose-500",
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300",
    cell: "bg-rose-100 hover:bg-rose-200 dark:bg-rose-500/20 dark:hover:bg-rose-500/30",
    edge: "border-l-rose-500",
  },
  "Capstone & Polish": {
    dot: "bg-cyan-500 dark:bg-cyan-600",
    fill: "bg-cyan-500 dark:bg-cyan-600",
    badge: "bg-cyan-100 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-300",
    cell: "bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-500/20 dark:hover:bg-cyan-500/30",
    edge: "border-l-cyan-500",
  },
};
