"use client";

import { useEffect, useState } from "react";
import {
  DSA_DIFFICULTIES,
  DSA_METHOD,
  DSA_SKIP,
  dsaPatterns,
} from "@/data/tracker";
import { todayISO } from "@/lib/plan";
import { dsaProgress } from "@/lib/tracker";
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

const EMPTY = {
  name: "",
  url: "",
  pattern: dsaPatterns[0].id,
  difficulty: DSA_DIFFICULTIES[0] as string,
  date: "",
  resolved: false,
};

export default function DsaPage() {
  const { dsa, addDsa, updateDsa, removeDsa, ready } = useProgress();
  const [form, setForm] = useState(EMPTY);
  const stats = dsaProgress(dsa);

  // Default the date to today, client-side so the static HTML has no date.
  useEffect(() => {
    setForm((f) => (f.date ? f : { ...f, date: todayISO() }));
  }, []);

  const submit = () => {
    if (!form.name.trim()) return;
    addDsa({ ...form, name: form.name.trim(), url: form.url.trim() });
    setForm({ ...EMPTY, date: todayISO() });
  };

  return (
    <div>
      <PageHeader title="DSA">
        {DSA_METHOD} {DSA_SKIP}
      </PageHeader>

      <Card className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">Re-solved from blank</h2>
          <ProgressSummary
            done={stats.resolved}
            total={stats.target}
            complete={stats.resolved >= stats.target}
            barClass="bg-blue-500"
          />
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          {stats.logged} problem{stats.logged === 1 ? "" : "s"} logged ·{" "}
          {stats.logged - stats.resolved} still waiting on a re-solve. Only the
          re-solve counts.
        </p>

        <ul className="mt-4 space-y-2.5">
          {dsaPatterns.map((p) => {
            const slot = stats.byPattern[p.id];
            return (
              <li
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-2"
              >
                <span className="text-sm">{p.name}</span>
                <ProgressSummary
                  done={slot.resolved}
                  total={slot.target}
                  complete={slot.resolved >= slot.target}
                  barClass="bg-blue-500"
                />
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="mb-4">
        <h2 className="font-semibold">Log a problem</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Problem name" className="sm:col-span-2">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Two Sum"
              className={inputClass}
            />
          </Field>
          <Field label="Link" className="sm:col-span-2">
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://neetcode.io/problems/…"
              className={inputClass}
            />
          </Field>
          <Field label="Pattern">
            <select
              value={form.pattern}
              onChange={(e) => setForm({ ...form, pattern: e.target.value })}
              className={inputClass}
            >
              {dsaPatterns.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Difficulty">
            <select
              value={form.difficulty}
              onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
              className={inputClass}
            >
              {DSA_DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Date">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputClass}
            />
          </Field>
          <label className="flex items-end gap-2 pb-1.5 text-sm">
            <input
              type="checkbox"
              checked={form.resolved}
              onChange={(e) => setForm({ ...form, resolved: e.target.checked })}
              className="h-4 w-4 accent-emerald-600"
            />
            Re-solved from blank next day
          </label>
        </div>
        <button
          onClick={submit}
          disabled={!ready || !form.name.trim()}
          className={`mt-4 ${primaryButtonClass}`}
        >
          Add problem
        </button>
      </Card>

      <h2 className="mb-3 font-semibold">Log</h2>
      {dsa.length === 0 ? (
        <EmptyState>
          Nothing logged yet. DSA starts in Week 4 — one new problem a day,
          re-solved from blank the next.
        </EmptyState>
      ) : (
        <ul className="space-y-2">
          {dsa.map((e) => {
            const pattern = dsaPatterns.find((p) => p.id === e.pattern);
            return (
              <li
                key={e.id}
                className="flex flex-wrap items-center gap-x-3 gap-y-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <label
                  title="Only re-solved problems count toward the target"
                  className="flex cursor-pointer items-center gap-2 text-xs text-zinc-500"
                >
                  <input
                    type="checkbox"
                    checked={e.resolved}
                    onChange={() => updateDsa(e.id, { resolved: !e.resolved })}
                    className="h-4 w-4 accent-emerald-600"
                  />
                  re-solved
                </label>
                <span className="min-w-0 flex-1 text-sm font-medium">
                  {e.url ? (
                    <a
                      href={e.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      {e.name} ↗
                    </a>
                  ) : (
                    e.name
                  )}
                </span>
                <span className="text-xs text-zinc-500">
                  {pattern?.name ?? e.pattern} · {e.difficulty}
                  {e.date && ` · ${e.date}`}
                </span>
                <button
                  onClick={() => removeDsa(e.id)}
                  aria-label={`Remove ${e.name}`}
                  className="text-xs text-zinc-400 hover:text-red-500"
                >
                  remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
