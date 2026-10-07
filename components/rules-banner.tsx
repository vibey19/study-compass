"use client";

import { rules } from "@/data/tracker";
import { useProgress } from "@/lib/store";

/** The plan's house rules, collapsible and remembered in settings. */
export function RulesBanner() {
  const { settings, setSettings } = useProgress();
  const open = !settings.rulesCollapsed;

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <button
        onClick={() => setSettings({ rulesCollapsed: open })}
        aria-expanded={open}
        className="flex w-full items-center gap-2 p-4 text-left"
      >
        <span className="font-semibold">Rules</span>
        <span className="text-xs text-zinc-500">
          {open
            ? `the ${rules.length} that make this work`
            : `${rules.length} rules`}
        </span>
        <span className="ml-auto text-zinc-400">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <ol className="list-decimal space-y-1.5 border-t border-zinc-100 px-4 py-4 pl-9 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
          {rules.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ol>
      )}
    </section>
  );
}
