"use client";

import Link from "next/link";
import { SCRATCH_RULE, scratchItems } from "@/data/tracker";
import { scratchDone } from "@/lib/tracker";
import { useProgress } from "@/lib/store";
import {
  Card,
  PageHeader,
  ProgressSummary,
  inputClass,
} from "@/components/ui";

export default function ScratchPage() {
  const { scratch, setScratch, ready } = useProgress();
  const done = scratchDone(scratch);

  return (
    <div>
      <PageHeader title="From scratch">
        {SCRATCH_RULE} Rule 2: watching it doesn&apos;t count — the rebuild
        from a blank file does.
      </PageHeader>

      <Card className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">Implemented in NumPy</h2>
          <ProgressSummary
            done={done}
            total={scratchItems.length}
            complete={done === scratchItems.length}
            barClass="bg-blue-500"
          />
        </div>
      </Card>

      <ul className="space-y-2">
        {scratchItems.map((item) => {
          const st = scratch[item.id] ?? { done: false, url: "" };
          return (
            <li
              key={item.id}
              className={`rounded-xl border p-4 ${
                st.done
                  ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30"
                  : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="checkbox"
                  checked={st.done}
                  onChange={() => setScratch(item.id, { done: !st.done })}
                  aria-label={`Mark ${item.name} done`}
                  className="h-4 w-4 shrink-0 accent-emerald-600"
                />
                <span
                  className={`min-w-0 flex-1 text-sm font-medium ${
                    st.done ? "text-zinc-500 line-through dark:text-zinc-500" : ""
                  }`}
                >
                  {item.name}
                </span>
                {item.week ? (
                  <Link
                    href={`/week/${item.week}`}
                    className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                  >
                    {item.weekLabel}
                  </Link>
                ) : (
                  <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {item.weekLabel}
                  </span>
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-2 pl-6">
                <input
                  type="url"
                  value={st.url}
                  onChange={(e) => setScratch(item.id, { url: e.target.value })}
                  disabled={!ready}
                  placeholder="Repo link"
                  className={`flex-1 ${inputClass}`}
                />
                {st.url && (
                  <a
                    href={st.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Open ↗
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
