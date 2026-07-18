"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { useProgress, type ProjectStatus } from "@/lib/store";
import { InlineMd } from "@/components/inline-md";

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: "not-started", label: "Not started" },
  { value: "in-progress", label: "In progress" },
  { value: "done", label: "Done" },
];

const STATUS_STYLE: Record<ProjectStatus, string> = {
  "not-started":
    "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  "in-progress":
    "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  done: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
};

export default function ProjectsPage() {
  const { projects: state, setProject, ready } = useProgress();

  return (
    <div>
      <h1 className="text-2xl font-bold">Portfolio projects</h1>
      <p className="mt-1 text-sm text-zinc-500">
        Five projects, each in its own GitHub repo with a real README.
      </p>

      <div className="mt-6 space-y-4">
        {projects.map((p) => {
          const st = state[p.id] ?? { status: "not-started" as const, url: "" };
          return (
            <section
              key={p.id}
              id={p.id}
              className="scroll-mt-20 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-semibold">
                  {p.number}. {p.title}
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500">
                    {p.weeksLabel}:{" "}
                    {p.weeks.map((w, i) => (
                      <span key={w}>
                        {i > 0 && ", "}
                        <Link
                          href={`/week/${w}`}
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          W{w}
                        </Link>
                      </span>
                    ))}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[st.status]}`}
                  >
                    {STATUS_OPTIONS.find((o) => o.value === st.status)?.label}
                  </span>
                </div>
              </div>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                <InlineMd text={p.goal} />
              </p>

              <h3 className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Deliverables
              </h3>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
                {p.deliverables.map((d, i) => (
                  <li key={i}>
                    <InlineMd text={d} />
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <select
                  value={st.status}
                  onChange={(e) =>
                    setProject(p.id, { status: e.target.value as ProjectStatus })
                  }
                  disabled={!ready}
                  className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                >
                  {STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <input
                  type="url"
                  value={st.url}
                  onChange={(e) => setProject(p.id, { url: e.target.value })}
                  disabled={!ready}
                  placeholder="Repo / demo URL"
                  className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
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
            </section>
          );
        })}
      </div>
    </div>
  );
}
