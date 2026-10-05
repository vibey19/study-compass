"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CERT_GROUPS,
  CERT_STATUSES,
  CV_RULE,
  certifications,
  type CertStatus,
} from "@/data/tracker";
import { certsEarned, cvLines } from "@/lib/tracker";
import { useProgress } from "@/lib/store";
import {
  Card,
  PageHeader,
  ProgressSummary,
  buttonClass,
  inputClass,
} from "@/components/ui";

const STATUS_STYLE: Record<CertStatus, string> = {
  planned: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  "in-progress":
    "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  earned:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
};

export default function CertificationsPage() {
  const { certs, setCert, ready } = useProgress();
  const [copied, setCopied] = useState<string | null>(null);
  const earned = certsEarned(certs);
  const lines = cvLines(certs);

  const copyCvLines = async () => {
    const text = lines.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(`Copied ${lines.length} line${lines.length === 1 ? "" : "s"}.`);
    } catch {
      setCopied("Couldn't reach the clipboard — select the text below instead.");
    }
  };

  return (
    <div>
      <PageHeader title="Certifications">
        Mostly free and earned along the way. {CV_RULE}
      </PageHeader>

      <Card className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">Earned</h2>
          <ProgressSummary
            done={earned}
            total={certifications.length}
            complete={earned === certifications.length}
            barClass="bg-blue-500"
          />
        </div>

        <div className="mt-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-sm font-semibold">CV line</h3>
            <button
              onClick={copyCvLines}
              disabled={!ready || lines.length === 0}
              className={buttonClass}
            >
              Copy for CV
            </button>
            {copied && (
              <span className="text-xs text-zinc-500">{copied}</span>
            )}
          </div>
          {lines.length === 0 ? (
            <p className="mt-2 text-xs text-zinc-500">
              Mark a certificate <strong>earned</strong> and tick “show on CV”
              and it appears here, with the Kaggle courses grouped onto one
              line.
            </p>
          ) : (
            <>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg bg-zinc-100 p-3 text-xs dark:bg-zinc-800">
                {lines.join("\n")}
              </pre>
              {lines.length > 4 && (
                <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">
                  {lines.length} lines — the plan caps this section at 4. Drop
                  the weakest ones from the CV.
                </p>
              )}
            </>
          )}
        </div>
      </Card>

      <div className="space-y-4">
        {CERT_GROUPS.map((group) => {
          const items = certifications.filter((c) => c.group === group.id);
          if (items.length === 0) return null;
          return (
            <Card key={group.id}>
              <h2 className="font-semibold">{group.label}</h2>
              {group.note && (
                <p className="mt-0.5 text-xs text-zinc-500">{group.note}</p>
              )}
              <ul className="mt-4 space-y-3">
                {items.map((c) => {
                  const st =
                    certs[c.id] ?? { status: "planned" as CertStatus, url: "", onCV: false };
                  return (
                    <li
                      key={c.id}
                      className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="min-w-0 flex-1 text-sm font-medium">
                          {c.name}
                        </span>
                        {c.plannedWeek ? (
                          <Link
                            href={`/week/${c.plannedWeek}`}
                            className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                          >
                            {c.plannedLabel}
                          </Link>
                        ) : (
                          <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                            {c.plannedLabel}
                          </span>
                        )}
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[st.status]}`}
                        >
                          {st.status}
                        </span>
                      </div>
                      {c.note && (
                        <p className="mt-1 text-xs text-zinc-500">{c.note}</p>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <select
                          value={st.status}
                          onChange={(e) =>
                            setCert(c.id, {
                              status: e.target.value as CertStatus,
                            })
                          }
                          disabled={!ready}
                          aria-label={`${c.name} status`}
                          className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                        >
                          {CERT_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <input
                          type="url"
                          value={st.url}
                          onChange={(e) => setCert(c.id, { url: e.target.value })}
                          disabled={!ready}
                          placeholder="Certificate link"
                          className={`min-w-0 flex-1 ${inputClass}`}
                        />
                        <label className="flex shrink-0 items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                          <input
                            type="checkbox"
                            checked={st.onCV}
                            onChange={() => setCert(c.id, { onCV: !st.onCV })}
                            disabled={!ready}
                            className="h-4 w-4 accent-emerald-600"
                          />
                          show on CV
                        </label>
                        {st.url && (
                          <a
                            href={st.url}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 text-sm text-blue-600 hover:underline dark:text-blue-400"
                          >
                            Open ↗
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        Already hold something not listed here? Add it to your CV line
        manually — this page tracks only the plan&apos;s own certificates.
      </p>
    </div>
  );
}
