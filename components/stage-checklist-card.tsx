"use client";

import Link from "next/link";
import { checklistKey, checklistForPhase } from "@/data/tracker";
import { PHASE_META } from "@/lib/plan";
import { checklistProgress } from "@/lib/tracker";
import { useProgress } from "@/lib/store";
import { ProgressSummary } from "@/components/ui";

/** The done-when checklist for the stage currently in progress. */
export function StageChecklistCard({ phase }: { phase: string }) {
  const { checklist, toggleChecklistItem } = useProgress();
  const stage = checklistForPhase(phase);
  if (!stage) return null;

  const meta = PHASE_META[phase];
  const { done, total, complete } = checklistProgress(checklist, stage);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${meta.dot}`}
          />
          Stage {stage.stage}: done when…
        </h2>
        <ProgressSummary
          done={done}
          total={total}
          complete={complete}
          barClass={meta.dot}
        />
      </div>

      <ul className="mt-4 space-y-2">
        {stage.items.map((item, i) => {
          const key = checklistKey(stage.stage, i);
          const checked = !!checklist[key];
          return (
            <li key={key}>
              <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleChecklistItem(key)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
                />
                <span
                  className={
                    checked
                      ? "text-zinc-400 line-through dark:text-zinc-500"
                      : "text-zinc-700 dark:text-zinc-300"
                  }
                >
                  {item}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      <Link
        href="/checklists"
        className="mt-4 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
      >
        All stage checklists →
      </Link>
    </section>
  );
}
