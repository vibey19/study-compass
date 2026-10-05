"use client";

import { useEffect, useState } from "react";
import { MOCK_TYPES, starPrompts, theoryQuestions } from "@/data/tracker";
import { todayISO } from "@/lib/plan";
import { theoryDone } from "@/lib/tracker";
import { useProgress } from "@/lib/store";
import {
  Card,
  EmptyState,
  Field,
  PageHeader,
  ProgressSummary,
  inputClass,
  primaryButtonClass,
} from "@/components/ui";

export default function InterviewPage() {
  const {
    theory,
    toggleTheory,
    stars,
    setStar,
    mocks,
    addMock,
    removeMock,
    ready,
  } = useProgress();
  const [mock, setMock] = useState({
    date: "",
    type: MOCK_TYPES[0] as string,
    wentWrong: "",
  });
  const done = theoryDone(theory);
  const starsWritten = starPrompts.filter((p) => stars[p.id]?.trim()).length;

  useEffect(() => {
    setMock((m) => (m.date ? m : { ...m, date: todayISO() }));
  }, []);

  const submitMock = () => {
    if (!mock.date) return;
    addMock({ ...mock, wentWrong: mock.wentWrong.trim() });
    setMock({ date: todayISO(), type: MOCK_TYPES[0], wentWrong: "" });
  };

  return (
    <div>
      <PageHeader title="Interview prep">
        Theory you can explain out loud in two minutes, five STAR stories, and
        an honest log of what went wrong in each mock.
      </PageHeader>

      <Card className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">ML theory</h2>
          <ProgressSummary
            done={done}
            total={theoryQuestions.length}
            complete={done === theoryQuestions.length}
            barClass="bg-blue-500"
          />
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          Tick one only when you can explain it out loud, in two minutes,
          without notes.
        </p>
        <ul className="mt-4 space-y-2">
          {theoryQuestions.map((q) => {
            const checked = !!theory[q.id];
            return (
              <li key={q.id}>
                <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleTheory(q.id)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-600"
                  />
                  <span
                    className={
                      checked
                        ? "text-zinc-400 line-through dark:text-zinc-500"
                        : "text-zinc-700 dark:text-zinc-300"
                    }
                  >
                    {q.question}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">STAR stories</h2>
          <ProgressSummary
            done={starsWritten}
            total={starPrompts.length}
            complete={starsWritten === starPrompts.length}
            barClass="bg-blue-500"
          />
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          Situation, Task, Action, Result — write it out, then say it out loud.
        </p>
        <div className="mt-4 space-y-4">
          {starPrompts.map((p) => (
            <Field key={p.id} label={p.prompt}>
              <textarea
                value={stars[p.id] ?? ""}
                onChange={(e) => setStar(p.id, e.target.value)}
                rows={4}
                placeholder="Situation… Task… Action… Result…"
                className={inputClass}
              />
            </Field>
          ))}
        </div>
      </Card>

      <Card className="mb-4">
        <h2 className="font-semibold">Log a mock interview</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Date">
            <input
              type="date"
              value={mock.date}
              onChange={(e) => setMock({ ...mock, date: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Type">
            <select
              value={mock.type}
              onChange={(e) => setMock({ ...mock, type: e.target.value })}
              className={inputClass}
            >
              {MOCK_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="What went wrong" className="sm:col-span-2">
            <textarea
              value={mock.wentWrong}
              onChange={(e) => setMock({ ...mock, wentWrong: e.target.value })}
              rows={3}
              placeholder="Be specific — this is the list you practise from."
              className={inputClass}
            />
          </Field>
        </div>
        <button
          onClick={submitMock}
          disabled={!ready || !mock.date}
          className={`mt-4 ${primaryButtonClass}`}
        >
          Add mock
        </button>
      </Card>

      <h2 className="mb-3 font-semibold">Mock log</h2>
      {mocks.length === 0 ? (
        <EmptyState>
          No mocks yet. First ones are scheduled for Week 10, days 3 and 4.
        </EmptyState>
      ) : (
        <ul className="space-y-2">
          {mocks.map((m) => (
            <li
              key={m.id}
              className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {m.type}
                </span>
                <span className="text-xs text-zinc-500">{m.date}</span>
                <button
                  onClick={() => removeMock(m.id)}
                  aria-label={`Remove ${m.type} mock on ${m.date}`}
                  className="ml-auto text-xs text-zinc-400 hover:text-red-500"
                >
                  remove
                </button>
              </div>
              {m.wentWrong && (
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
                  {m.wentWrong}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
