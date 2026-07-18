"use client";

import Link from "next/link";
import { PHASE_META, phaseProgress } from "@/lib/plan";
import { useProgress } from "@/lib/store";

export function PhaseStrip() {
  const { progress } = useProgress();
  const phases = phaseProgress(progress);

  return (
    <div>
      <div className="flex w-full gap-1">
        {phases.map((p) => {
          const meta = PHASE_META[p.name];
          const pct = p.total ? Math.round((p.completed / p.total) * 100) : 0;
          return (
            <Link
              key={p.name}
              href={`/week/${p.firstWeek}`}
              title={`${p.name} (Weeks ${p.firstWeek}–${p.lastWeek}) — ${p.completed}/${p.total} days`}
              style={{ flexGrow: p.total }}
              className="min-w-2 basis-0"
            >
              <div className="h-3 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <div
                  className={`h-full ${meta.dot}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
        {phases.map((p) => (
          <span key={p.name} className="flex items-center gap-1.5">
            <span
              className={`inline-block h-2 w-2 rounded-full ${PHASE_META[p.name].dot}`}
            />
            {p.name}
            <span className="text-zinc-400 dark:text-zinc-500">
              {p.completed}/{p.total}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
