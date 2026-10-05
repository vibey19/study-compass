// Parses the curriculum table in CURRICULUM.md into data/curriculum.ts.
// Only the lines between the CURRICULUM START / CURRICULUM END markers are
// read; the instructions and tracker data around them are ignored.
// Run with: npm run generate
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const md = readFileSync(join(root, "CURRICULUM.md"), "utf8");

const START_MARKER = "<!-- CURRICULUM START -->";
const END_MARKER = "<!-- CURRICULUM END -->";

const MONTHS = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};
const START_UTC = Date.UTC(2026, 9, 6); // Tue Oct 6, 2026
const DAY_MS = 86400000;
const pad2 = (n) => String(n).padStart(2, "0");
const isoForIndex = (i) => new Date(START_UTC + i * DAY_MS).toISOString().slice(0, 10);

/** The curriculum block, or a hard error if the markers are missing. */
function curriculumLines(source) {
  const lines = source.split("\n");
  const from = lines.findIndex((l) => l.trim() === START_MARKER);
  const to = lines.findIndex((l) => l.trim() === END_MARKER);
  if (from === -1) throw new Error(`Missing ${START_MARKER} in CURRICULUM.md`);
  if (to === -1) throw new Error(`Missing ${END_MARKER} in CURRICULUM.md`);
  if (to < from) throw new Error(`${END_MARKER} appears before ${START_MARKER}`);
  return lines.slice(from + 1, to);
}

/** "CS50P (https://cs50.harvard.edu/python/)" → { label, url } */
function parseResource(raw) {
  const m = raw.match(/^(.*?)\s*\((https?:\/\/[^\s)]+)\)$/);
  return m
    ? { label: m[1].trim(), url: m[2] }
    : { label: raw.trim(), url: "" };
}

let phase = null;
const weeks = [];
let cur = null;

for (const raw of curriculumLines(md)) {
  const line = raw.trim();
  let m;
  if ((m = line.match(/^## Phase \d+: (.+?) \(Week/))) {
    phase = m[1].trim();
    continue;
  }
  if ((m = line.match(/^### Week (\d+) \((.+?)\)(?::\s*(.+))?$/))) {
    if (!phase) throw new Error(`Week ${m[1]} appears before any phase header`);
    cur = {
      week: Number(m[1]),
      title: (m[3] ?? phase).trim(),
      phase,
      dateRange: m[2].trim(),
      days: [],
    };
    weeks.push(cur);
    continue;
  }
  if (cur && /^\|\s*\d+\s*\|/.test(line)) {
    const cells = line.split("|").slice(1, -1).map((c) => c.trim());
    const dayOfWeek = Number(cells[0]);
    const dateStr = cells[1] ?? "";
    const focusRaw = cells[2] ?? "";
    const tasksRaw = cells[3] ?? "";
    const resourcesRaw = cells[4] ?? "";

    const date = isoForIndex((cur.week - 1) * 7 + (dayOfWeek - 1));
    const dm = dateStr.match(/^([A-Z][a-z]{2}) (\d{1,2})/);
    if (dm) {
      const expect = `2026-${pad2(MONTHS[dm[1]])}-${pad2(Number(dm[2]))}`;
      if (expect !== date) {
        throw new Error(
          `Date mismatch week ${cur.week} day ${dayOfWeek}: table says ${expect}, computed ${date}`
        );
      }
    }

    const clean = (s) => (s === "—" || s === "-" ? "" : s);
    // Review and buffer days are decided only by their tag, never by the day
    // number. No day in this plan is a rest day.
    const isProjectDay = /\[P\]/.test(focusRaw);
    const isReviewDay = /\[R\]/.test(focusRaw);
    const isBufferDay = /\[B\]/.test(focusRaw);
    if (isReviewDay && isBufferDay) {
      throw new Error(`Week ${cur.week} day ${dayOfWeek} is tagged both [R] and [B]`);
    }
    const focus = focusRaw
      .replace(/\*\*/g, "")
      .replace(/\[[PRB]\]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const resources = clean(resourcesRaw)
      ? clean(resourcesRaw)
          .split(/\s·\s/)
          .map((s) => s.trim())
          .filter(Boolean)
          .map(parseResource)
      : [];

    cur.days.push({
      id: `w${pad2(cur.week)}-d${pad2(dayOfWeek)}`,
      week: cur.week,
      dayOfWeek,
      date,
      phase: cur.phase,
      focus,
      tasks: clean(tasksRaw),
      resources,
      isRestDay: false,
      isProjectDay,
      isBufferDay,
      track: isReviewDay ? "review" : isBufferDay ? "buffer" : "ml",
      isLightDay: isReviewDay || isBufferDay,
    });
  }
}

// Validate
const days = weeks.flatMap((w) => w.days);
const phases = [...new Set(weeks.map((w) => w.phase))];
const projectDays = days.filter((d) => d.isProjectDay).length;
const reviewDays = days.filter((d) => d.track === "review").length;
const bufferDays = days.filter((d) => d.isBufferDay).length;
if (weeks.length !== 10) throw new Error(`Expected 10 weeks, got ${weeks.length}`);
if (days.length !== 70) throw new Error(`Expected 70 days, got ${days.length}`);
for (const w of weeks) {
  if (w.days.length !== 7) throw new Error(`Week ${w.week} has ${w.days.length} days`);
}
if (phases.length !== 7) throw new Error(`Expected 7 phases, got ${phases.length}`);

const banner = `// AUTO-GENERATED from CURRICULUM.md by scripts/generate-curriculum.mjs.
// Do not edit by hand — edit CURRICULUM.md and run \`npm run generate\`.
`;

const out = `${banner}
export type Resource = {
  label: string;
  /** empty when the curriculum lists no link — the UI falls back to a search */
  url: string;
};

export type DayEntry = {
  id: string; // e.g. "w01-d01"
  week: number; // 1-10
  dayOfWeek: number; // 1-7 (weeks run Tue → Mon, so 5 = Saturday)
  date: string; // ISO date, e.g. "2026-10-06"
  phase: string;
  focus: string;
  tasks: string; // markdown-ish text (**bold**, \`code\`)
  resources: Resource[];
  isRestDay: boolean; // always false in this plan — no rest days
  isProjectDay: boolean; // marked [P] in the curriculum
  isBufferDay: boolean; // marked [B] — catch-up day, works the backlog first
  track: "ml" | "review" | "buffer"; // "review" = [R] weekly review day
  isLightDay: boolean; // review and buffer days
};

export type WeekEntry = {
  week: number;
  title: string;
  phase: string;
  dateRange: string;
  days: DayEntry[];
};

export const PHASE_NAMES: string[] = ${JSON.stringify(phases, null, 2)};

export const roadmap: WeekEntry[] = ${JSON.stringify(weeks, null, 2)};
`;

mkdirSync(join(root, "data"), { recursive: true });
writeFileSync(join(root, "data", "curriculum.ts"), out);
console.log(
  `Wrote data/curriculum.ts: ${weeks.length} weeks, ${days.length} days, ` +
    `${phases.length} phases, ${projectDays} project days, ` +
    `${reviewDays} review days, ${bufferDays} buffer days.`
);
