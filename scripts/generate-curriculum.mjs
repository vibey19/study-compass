// Parses CURRICULUM.md into data/curriculum.ts.
// Run with: npm run generate
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const md = readFileSync(join(root, "CURRICULUM.md"), "utf8");

const MONTHS = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};
const START_UTC = Date.UTC(2026, 6, 20); // Mon Jul 20, 2026
const DAY_MS = 86400000;
const pad2 = (n) => String(n).padStart(2, "0");
const isoForIndex = (i) => new Date(START_UTC + i * DAY_MS).toISOString().slice(0, 10);

let phase = null;
const weeks = [];
let cur = null;

for (const raw of md.split("\n")) {
  const line = raw.trim();
  let m;
  if ((m = line.match(/^## Phase \d+ — (.+?) \(Week/))) {
    phase = m[1].trim();
    continue;
  }
  if ((m = line.match(/^### Week (\d+) \(([^)]+)\)(?:\s*—\s*(.+))?$/))) {
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
    const isProjectDay = /\[P\]/.test(focusRaw);
    const focus = focusRaw
      .replace(/\*\*/g, "")
      .replace(/\[P\]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    const resources = clean(resourcesRaw)
      ? clean(resourcesRaw).split(/\s\+\s/).map((s) => s.trim()).filter(Boolean)
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
      isRestDay: dayOfWeek === 7,
      isProjectDay,
    });
  }
}

// Validate
const dayCount = weeks.reduce((n, w) => n + w.days.length, 0);
const phases = [...new Set(weeks.map((w) => w.phase))];
const projectDays = weeks.flatMap((w) => w.days).filter((d) => d.isProjectDay).length;
if (weeks.length !== 17) throw new Error(`Expected 17 weeks, got ${weeks.length}`);
if (dayCount !== 119) throw new Error(`Expected 119 days, got ${dayCount}`);
for (const w of weeks) {
  if (w.days.length !== 7) throw new Error(`Week ${w.week} has ${w.days.length} days`);
}
if (phases.length !== 9) throw new Error(`Expected 9 phases, got ${phases.length}`);

const banner = `// AUTO-GENERATED from CURRICULUM.md by scripts/generate-curriculum.mjs.
// Do not edit by hand — edit CURRICULUM.md and run \`npm run generate\`.
`;

const out = `${banner}
export type DayEntry = {
  id: string; // e.g. "w01-d01"
  week: number; // 1-17
  dayOfWeek: number; // 1-7 (7 = rest day)
  date: string; // ISO date, e.g. "2026-07-20"
  phase: string;
  focus: string;
  tasks: string; // markdown-ish text (**bold**, \`code\`)
  resources: string[];
  isRestDay: boolean;
  isProjectDay: boolean; // marked [P] in the curriculum
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
  `Wrote data/curriculum.ts: ${weeks.length} weeks, ${dayCount} days, ` +
    `${projectDays} project days, ${phases.length} phases.`
);
