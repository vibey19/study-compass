"use client";

import Link from "next/link";
import { checklistKey, stageChecklists } from "@/data/tracker";
import { PHASE_META, phaseProgress } from "@/lib/plan";
import { checklistProgress } from "@/lib/tracker";
import { useProgress } from "@/lib/store";
import { Card, PageHeader, ProgressSummary } from "@/components/ui";

export default function ChecklistsPage() {
  const { checklist, toggleChecklistItem } = useProgress();
  const weeksOf = new Map(
    phaseProgress({}).map((p) => [p.name, p] as const)
  );

  return (
    <div>
      <PageHeader title="Stage checklists">
        One checklist per stage. Rule 6: don&apos;t start the next stage until
        the current one is ticked.
      </PageHeader>

      <div className="space-y-4">
        {stageChecklists.map((stage) => {
          const meta = PHASE_META[stage.phase];
          const { done, total, complete } = checklistProgress(checklist, stage);
          const weeks = weeksOf.get(stage.phase);
          return (
            <Card key={stage.stage} id={`stage-${stage.stage}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 font-semibold">
                  <span
                    className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${meta.dot}`}
                  />
                  Stage {stage.stage}: {stage.phase}
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

              {weeks && (
                <p className="mt-4 border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800">
                  Covered by{" "}
                  <Link
                    href={`/week/${weeks.firstWeek}`}
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {weeks.firstWeek === weeks.lastWeek
                      ? `week ${weeks.firstWeek}`
                      : `weeks ${weeks.firstWeek}–${weeks.lastWeek}`}
                  </Link>
                  .
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
