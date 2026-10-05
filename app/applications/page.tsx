"use client";

import { useEffect, useState } from "react";
import {
  APPLICATION_STATUSES,
  APPLICATION_TYPES,
  type ApplicationStatus,
  type ApplicationType,
} from "@/data/tracker";
import { todayISO } from "@/lib/plan";
import { applicationStats, isFollowUpOverdue } from "@/lib/tracker";
import { useProgress, type ApplicationEntry } from "@/lib/store";
import {
  Card,
  EmptyState,
  Field,
  PageHeader,
  ProgressSummary,
  inputClass,
  primaryButtonClass,
} from "@/components/ui";

const STATUS_STYLE: Record<ApplicationStatus, string> = {
  "to apply": "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  applied: "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-300",
  interview:
    "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
  "take-home":
    "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  offer:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
  rejected: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500",
  "no reply": "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500",
};

const EMPTY = {
  company: "",
  role: "",
  type: "" as ApplicationType | "",
  city: "",
  url: "",
  appliedOn: "",
  status: "to apply" as ApplicationStatus,
  followUpOn: "",
  notes: "",
};

export default function ApplicationsPage() {
  const {
    applications,
    addApplication,
    updateApplication,
    removeApplication,
    ready,
  } = useProgress();
  const [form, setForm] = useState(EMPTY);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(todayISO());
  }, []);

  const stats = applicationStats(applications, today ?? "");

  const submit = () => {
    if (!form.company.trim()) return;
    addApplication({ ...form, company: form.company.trim(), role: form.role.trim() });
    setForm(EMPTY);
  };

  return (
    <div>
      <PageHeader title="Applications">
        Rule 7: start applying in Week 7, don&apos;t wait until you feel ready.
        Every application gets followed up.
      </PageHeader>

      <Card className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">Sent</h2>
          <ProgressSummary
            done={stats.sent}
            total={stats.target}
            complete={stats.sent >= stats.target}
            barClass="bg-blue-500"
          />
        </div>
        <p className="mt-1 text-xs text-zinc-500">
          {stats.toApply} queued · {stats.interviews} reached an interview ·{" "}
          {stats.offers} offer{stats.offers === 1 ? "" : "s"}
          {stats.overdueFollowUps > 0 && (
            <>
              {" · "}
              <strong className="text-red-500">
                {stats.overdueFollowUps} follow-up
                {stats.overdueFollowUps === 1 ? "" : "s"} overdue
              </strong>
            </>
          )}
        </p>
      </Card>

      <Card className="mb-4">
        <h2 className="font-semibold">Add a company</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Company">
            <input
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className={inputClass}
            />
          </Field>
          <Field label="Role">
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              className={inputClass}
            />
          </Field>
          <Field label="Type">
            <select
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value as ApplicationType | "" })
              }
              className={inputClass}
            >
              <option value="">—</option>
              {APPLICATION_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field label="City">
            <input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className={inputClass}
            />
          </Field>
          <Field label="Link" className="sm:col-span-2">
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="Careers page or job posting"
              className={inputClass}
            />
          </Field>
        </div>
        <button
          onClick={submit}
          disabled={!ready || !form.company.trim()}
          className={`mt-4 ${primaryButtonClass}`}
        >
          Add to list
        </button>
      </Card>

      {applications.length === 0 ? (
        <EmptyState>
          Nothing here yet. Week 7 day 4 is the slot for listing 40 target
          companies — add them above, then work the list.
        </EmptyState>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full min-w-[920px] text-sm">
            <thead className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
              <tr>
                <th className="px-3 py-2 font-medium">Company</th>
                <th className="px-3 py-2 font-medium">Role</th>
                <th className="px-3 py-2 font-medium">Type</th>
                <th className="px-3 py-2 font-medium">City</th>
                <th className="px-3 py-2 font-medium">Applied</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Follow up</th>
                <th className="px-3 py-2 font-medium">Notes</th>
                <th className="px-3 py-2" />
              </tr>
            </thead>
            <tbody>
              {applications.map((a) => (
                <Row
                  key={a.id}
                  app={a}
                  today={today}
                  onChange={(patch) => updateApplication(a.id, patch)}
                  onRemove={() => removeApplication(a.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Row({
  app,
  today,
  onChange,
  onRemove,
}: {
  app: ApplicationEntry;
  today: string | null;
  onChange: (patch: Partial<ApplicationEntry>) => void;
  onRemove: () => void;
}) {
  // Highlighted only once "today" is known client-side, so the prerendered
  // HTML never bakes in a stale overdue state.
  const overdue = today ? isFollowUpOverdue(app, today) : false;
  const cell = "px-3 py-2";
  const bare =
    "w-full min-w-0 bg-transparent text-sm outline-none focus:underline";

  return (
    <tr
      className={`border-b border-zinc-100 last:border-0 dark:border-zinc-800/60 ${
        overdue ? "bg-red-50 dark:bg-red-950/30" : ""
      }`}
    >
      <td className={cell}>
        {app.url ? (
          <a
            href={app.url}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {app.company} ↗
          </a>
        ) : (
          <span className="font-medium">{app.company}</span>
        )}
      </td>
      <td className={cell}>
        <input
          value={app.role}
          onChange={(e) => onChange({ role: e.target.value })}
          aria-label="Role"
          className={bare}
        />
      </td>
      <td className={cell}>
        <select
          value={app.type}
          onChange={(e) =>
            onChange({ type: e.target.value as ApplicationType | "" })
          }
          aria-label="Type"
          className={`${bare} text-zinc-600 dark:text-zinc-400`}
        >
          <option value="">—</option>
          {APPLICATION_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </td>
      <td className={cell}>
        <input
          value={app.city}
          onChange={(e) => onChange({ city: e.target.value })}
          aria-label="City"
          className={bare}
        />
      </td>
      <td className={cell}>
        <input
          type="date"
          value={app.appliedOn}
          onChange={(e) => onChange({ appliedOn: e.target.value })}
          aria-label="Date applied"
          className={`${bare} text-zinc-600 dark:text-zinc-400`}
        />
      </td>
      <td className={cell}>
        <select
          value={app.status}
          onChange={(e) =>
            onChange({ status: e.target.value as ApplicationStatus })
          }
          aria-label="Status"
          className={`rounded-full px-2 py-0.5 text-[11px] font-medium outline-none ${STATUS_STYLE[app.status]}`}
        >
          {APPLICATION_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </td>
      <td className={cell}>
        <input
          type="date"
          value={app.followUpOn}
          onChange={(e) => onChange({ followUpOn: e.target.value })}
          aria-label="Follow-up date"
          title={overdue ? "Follow-up is overdue" : undefined}
          className={`${bare} ${
            overdue
              ? "font-medium text-red-600 dark:text-red-400"
              : "text-zinc-600 dark:text-zinc-400"
          }`}
        />
      </td>
      <td className={cell}>
        <input
          value={app.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          aria-label="Notes"
          className={bare}
        />
      </td>
      <td className={cell}>
        <button
          onClick={onRemove}
          aria-label={`Remove ${app.company}`}
          className="text-xs text-zinc-400 hover:text-red-500"
        >
          ✕
        </button>
      </td>
    </tr>
  );
}
