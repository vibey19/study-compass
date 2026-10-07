"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DayEntry } from "@/data/curriculum";
import { projectForDay } from "@/data/projects";
import { checklistForPhase } from "@/data/tracker";
import {
  PHASE_META,
  bootcampWatch,
  dayIntensity,
  formatDate,
  isPhaseFinalReviewDay,
  subtasksOf,
  todayISO,
} from "@/lib/plan";
import { backlogDays, useSchedule } from "@/lib/schedule";
import { checklistProgressForPhase } from "@/lib/tracker";
import { useProgress } from "@/lib/store";
import { InlineMd } from "@/components/inline-md";
import { ResourceLinks } from "@/components/resource-links";

const inputClass =
  "w-full min-w-0 rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950";

export function DayCard({
  day,
  date,
  isToday = false,
}: {
  day: DayEntry;
  /** effective (schedule-adjusted) ISO date; falls back to the base date */
  date?: string;
  isToday?: boolean;
}) {
  const {
    progress,
    requestToggleDay,
    subtasks,
    toggleSubtask,
    notes,
    setNote,
    proofs,
    setProof,
    pushDay,
    settings,
  } = useProgress();
  const done = !!progress[day.id];
  const meta = PHASE_META[day.phase];
  const subs = subtasksOf(day);
  const project = day.isProjectDay ? projectForDay(day.focus, day.week) : null;
  const shownDate = date ?? day.date;
  const intensity = dayIntensity(day);
  const proof = proofs[day.id] ?? "";
  const [blocked, setBlocked] = useState(false);
  const todayRing = isToday
    ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-950"
    : "";

  const handleToggle = () => {
    const result = requestToggleDay(day.id);
    setBlocked(result === "proof-required");
  };

  return (
    <div
      id={`day-${day.id}`}
      className={`flex flex-col rounded-2xl border border-l-4 p-4 shadow-sm transition-all ${meta.edge} ${
        done
          ? "border-y-emerald-300 border-r-emerald-300 bg-emerald-50/60 dark:border-y-emerald-800 dark:border-r-emerald-800 dark:bg-emerald-950/30"
          : "border-y-zinc-200 border-r-zinc-200 bg-white hover:shadow-md dark:border-y-zinc-800 dark:border-r-zinc-800 dark:bg-zinc-900"
      } ${todayRing}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="uppercase tracking-wide">
          {formatDate(shownDate)} · Day {day.dayOfWeek}
        </span>
        <span className="flex flex-wrap items-center gap-2">
          {isToday && <span className="font-semibold text-blue-500">Today</span>}
          <span
            title={intensity.label}
            className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
              intensity.heavy
                ? "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300"
                : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            }`}
          >
            {intensity.hours}
          </span>
          {day.track === "review" && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              ↻ review
            </span>
          )}
          {day.isBufferDay && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
              ⏸ buffer
            </span>
          )}
          {day.isProjectDay && (
            <Link
              href={project ? `/projects#${project.id}` : "/projects"}
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${meta.badge}`}
            >
              🛠 Project{project ? ` ${project.number}` : " day"}
            </Link>
          )}
        </span>
      </div>

      <h3
        className={`mt-2 font-semibold ${
          done
            ? "text-emerald-800 line-through decoration-emerald-400 dark:text-emerald-300"
            : ""
        }`}
      >
        {day.focus}
      </h3>

      {day.isBufferDay && <BufferBacklog day={day} />}

      {subs.length > 1 ? (
        <ul className="mt-2 space-y-1.5">
          {subs.map((s, i) => {
            const key = `${day.id}#${i}`;
            const checked = !!subtasks[key];
            const watch = bootcampWatch(s);
            return (
              <li key={key}>
                <label className="flex cursor-pointer items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSubtask(key)}
                    className="mt-0.5 accent-emerald-600"
                  />
                  <span
                    className={
                      checked
                        ? "text-zinc-400 line-through dark:text-zinc-500"
                        : "text-zinc-700 dark:text-zinc-300"
                    }
                  >
                    {watch && (
                      <span
                        className="mr-1.5 inline-block rounded-full bg-violet-100 px-1.5 py-0.5 align-[1px] text-[10px] font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                        title="Bootcamp video — watch at 1.75x"
                      >
                        1.75x · {watch.time}
                      </span>
                    )}
                    <InlineMd text={s} />
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      ) : day.tasks ? (
        <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
          <InlineMd text={day.tasks} />
        </p>
      ) : null}

      <ResourceLinks resources={day.resources} />

      {day.track === "review" && <ReviewLog day={day} />}

      <label className="mt-3 block">
        <span className="text-xs text-zinc-500">
          Proof{" "}
          <span className="text-zinc-400">
            {settings.requireProof ? "(required)" : "— commit or repo link"}
          </span>
        </span>
        <input
          type="url"
          value={proof}
          onChange={(e) => {
            setProof(day.id, e.target.value);
            if (e.target.value.trim()) setBlocked(false);
          }}
          placeholder="https://github.com/…/commit/…"
          className={`mt-1 ${inputClass} ${
            blocked ? "border-red-400 dark:border-red-500" : ""
          }`}
        />
      </label>

      <details className="mt-3">
        <summary className="cursor-pointer select-none text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
          Notes{notes[day.id] ? " ●" : ""}
        </summary>
        <textarea
          value={notes[day.id] ?? ""}
          onChange={(e) => setNote(day.id, e.target.value)}
          rows={3}
          placeholder="Notes for this day…"
          className="mt-2 w-full rounded-lg border border-zinc-300 bg-white p-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </details>

      {blocked && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700 dark:bg-red-950/40 dark:text-red-300">
          Proof is required. Paste the commit link above, or turn the
          requirement off in{" "}
          <Link href="/settings" className="underline">
            Settings
          </Link>
          .
        </p>
      )}

      <button onClick={handleToggle} className="mt-auto w-full pt-3">
        <span
          className={`block w-full rounded-xl px-3 py-2 text-center text-sm font-medium transition-colors ${
            done
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "border border-zinc-300 hover:border-emerald-400 hover:bg-emerald-50 dark:border-zinc-700 dark:hover:border-emerald-700 dark:hover:bg-emerald-950/30"
          }`}
        >
          {done ? "✓ Completed" : "Mark day complete"}
        </span>
      </button>

      {isToday && !done && (
        <button
          onClick={() => pushDay(day.id)}
          title="Moves today's plan to tomorrow and shifts every later day by one day. Undo in Settings."
          className="mt-2 w-full rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-center text-sm font-medium text-amber-900 transition-colors hover:bg-amber-100 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20"
        >
          Busy today? Push to tomorrow →
        </button>
      )}
    </div>
  );
}

/**
 * A buffer day's real work is whatever slipped, so the current backlog is
 * listed above the curriculum's fallback tasks.
 */
function BufferBacklog({ day }: { day: DayEntry }) {
  const { progress, toggleDay } = useProgress();
  const schedule = useSchedule();
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(todayISO());
  }, []);

  if (!today) return null;
  // Only days before this buffer day count — a later day isn't late yet.
  const bufferDate = schedule.dateOf(day.id);
  const overdue = backlogDays(progress, schedule, today).filter(
    (d) => schedule.dateOf(d.id) < bufferDate
  );

  if (overdue.length === 0) {
    return (
      <p className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
        Backlog is clear — use the fallback tasks below.
      </p>
    );
  }

  return (
    <div className="mt-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-500/30 dark:bg-amber-500/10">
      <p className="text-xs font-semibold uppercase tracking-wide text-amber-900 dark:text-amber-300">
        Catch up first · {overdue.length} day
        {overdue.length === 1 ? "" : "s"} behind
      </p>
      <ul className="mt-2 space-y-1.5">
        {overdue.map((d) => (
          <li key={d.id}>
            <label className="flex cursor-pointer items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={false}
                onChange={() => toggleDay(d.id)}
                aria-label={`Mark ${d.focus} complete`}
                className="mt-0.5 accent-emerald-600"
              />
              <span className="text-zinc-700 dark:text-zinc-300">
                {d.focus}
                <Link
                  href={`/week/${d.week}#day-${d.id}`}
                  className="ml-1.5 text-xs text-blue-600 hover:underline dark:text-blue-400"
                >
                  open →
                </Link>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The weekly review log, plus the stage gate on a phase's last review day. */
function ReviewLog({ day }: { day: DayEntry }) {
  const { reviews, setReview, checklist } = useProgress();
  const entry =
    reviews[day.id] ?? { built: "", cantExplain: "", hours: "", repo: "" };
  const stageGate = isPhaseFinalReviewDay(day)
    ? checklistProgressForPhase(checklist, day.phase)
    : null;
  const stage = checklistForPhase(day.phase);

  return (
    <div className="mt-3 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
      {stageGate && !stageGate.complete && (
        <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900 dark:bg-amber-500/10 dark:text-amber-300">
          Last review day of <strong>{day.phase}</strong> — the stage
          checklist is {stageGate.done}/{stageGate.total}. Don't start the next
          stage until it's ticked.{" "}
          <Link
            href={`/checklists#stage-${stage?.stage ?? ""}`}
            className="underline"
          >
            Open checklist →
          </Link>
        </p>
      )}
      {stageGate?.complete && (
        <p className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
          <strong>{day.phase}</strong> checklist complete ✓ — clear to start the
          next stage.
        </p>
      )}
      <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Weekly review log
      </p>
      <div className="mt-2 space-y-2">
        <label className="block">
          <span className="text-xs text-zinc-500">What I built</span>
          <textarea
            value={entry.built}
            onChange={(e) => setReview(day.id, { built: e.target.value })}
            rows={2}
            className={`mt-1 ${inputClass}`}
          />
        </label>
        <label className="block">
          <span className="text-xs text-zinc-500">
            What I still can't explain
          </span>
          <textarea
            value={entry.cantExplain}
            onChange={(e) => setReview(day.id, { cantExplain: e.target.value })}
            rows={2}
            className={`mt-1 ${inputClass}`}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <label className="w-24 shrink-0">
            <span className="text-xs text-zinc-500">Hours</span>
            <input
              type="number"
              min="0"
              step="0.5"
              value={entry.hours}
              onChange={(e) => setReview(day.id, { hours: e.target.value })}
              className={`mt-1 ${inputClass}`}
            />
          </label>
          <label className="min-w-0 flex-1">
            <span className="text-xs text-zinc-500">Repo link</span>
            <input
              type="url"
              value={entry.repo}
              onChange={(e) => setReview(day.id, { repo: e.target.value })}
              placeholder="https://github.com/…"
              className={`mt-1 ${inputClass}`}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
