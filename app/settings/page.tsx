"use client";

import { useRef, useState } from "react";
import { allDays, formatDate, formatShort, todayISO } from "@/lib/plan";
import { useSchedule } from "@/lib/schedule";
import { useProgress } from "@/lib/store";

export default function SettingsPage() {
  const {
    exportJSON,
    importJSON,
    resetAll,
    ready,
    user,
    syncState,
    signIn,
    signOut,
    shifts,
    undoLastShift,
  } = useProgress();
  const schedule = useSchedule();
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSignIn = async () => {
    if (!email.trim()) return;
    setSending(true);
    const error = await signIn(email.trim());
    setSending(false);
    setMessage(
      error ?? `Magic link sent to ${email.trim()} — open it to finish logging in.`
    );
  };

  const handleExport = () => {
    const blob = new Blob([exportJSON()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `roadmap-progress-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Progress exported.");
  };

  const handleImport = async (file: File) => {
    const error = importJSON(await file.text());
    setMessage(error ?? "Progress imported ✓");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Reset ALL progress? This clears completed days, sub-tasks, notes, and project statuses. This cannot be undone."
      )
    ) {
      resetAll();
      setMessage("All progress reset.");
    }
  };

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      {message && (
        <p className="mt-4 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-800 dark:bg-blue-950/40 dark:text-blue-300">
          {message}
        </p>
      )}

      <section className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="font-semibold">Account & sync</h2>
        {syncState === "off" && (
          <p className="mt-1 text-sm text-zinc-500">
            Cloud sync is not configured. Create a free Supabase project, run{" "}
            <code>supabase/schema.sql</code> in its SQL editor, copy{" "}
            <code>.env.local.example</code> to <code>.env.local</code> with your
            project's URL + anon key, and rebuild. Until then, progress is
            saved in this browser only.
          </p>
        )}
        {syncState !== "off" && !user && (
          <>
            <p className="mt-1 text-sm text-zinc-500">
              Log in with a magic link to save progress to the cloud and use it
              from any device.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-950"
              />
              <button
                onClick={handleSignIn}
                disabled={sending || !email.trim()}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {sending ? "Sending…" : "Send magic link"}
              </button>
            </div>
          </>
        )}
        {user && (
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">
              Signed in as{" "}
              <strong>{user.email ?? user.id.slice(0, 8)}</strong>
              <span className="ml-2 text-xs text-zinc-500">
                {syncState === "synced" && "✓ synced"}
                {syncState === "syncing" && "⟳ syncing…"}
                {syncState === "error" && (
                  <span className="text-red-500">sync error — retrying on next change</span>
                )}
              </span>
            </p>
            <button
              onClick={() => signOut().then(() => setMessage("Signed out."))}
              className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Sign out
            </button>
          </div>
        )}
      </section>

      <section className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="font-semibold">Schedule</h2>
        <p className="mt-1 text-sm text-zinc-500">
          The plan currently ends <strong>{formatDate(schedule.end)}, 2026</strong>.
          It's elastic — finishing days early pulls this date closer
          automatically, and an incomplete day quietly slides to today
          instead of piling up as overdue
          {schedule.drift !== 0 &&
            ` (currently ${Math.abs(schedule.drift)} day${Math.abs(schedule.drift) === 1 ? "" : "s"} ${schedule.drift > 0 ? "behind" : "ahead of"} the original calendar)`}
          {shifts.length > 0 &&
            `, on top of ${shifts.reduce((n, s) => n + s.days, 0)} day(s) shifted manually via "Push to tomorrow"`}
          .
        </p>
        {shifts.length > 0 && (
          <>
            <ul className="mt-3 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              {shifts.map((s, i) => {
                const from = allDays.find((d) => d.id === s.fromId);
                return (
                  <li key={i}>
                    ↷ Pushed <strong>{from?.focus ?? s.fromId}</strong> (and
                    everything after it) by {s.days} day
                    {s.days === 1 ? "" : "s"} on {formatShort(s.at)}
                  </li>
                );
              })}
            </ul>
            <button
              onClick={() => {
                undoLastShift();
                setMessage("Last shift undone.");
              }}
              className="mt-3 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Undo last shift
            </button>
          </>
        )}
      </section>

      <section className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="font-semibold">Backup</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Progress lives in this browser's localStorage. Export before clearing
          browser data or switching devices.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={handleExport}
            disabled={!ready}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Export JSON
          </button>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={!ready}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Import JSON
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleImport(f);
              e.target.value = "";
            }}
          />
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-red-200 bg-white p-5 dark:border-red-900/50 dark:bg-zinc-900">
        <h2 className="font-semibold text-red-700 dark:text-red-400">
          Danger zone
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Wipe every completed day, sub-task, note, and project status.
        </p>
        <button
          onClick={handleReset}
          disabled={!ready}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Reset progress
        </button>
      </section>

      <p className="mt-6 text-xs text-zinc-400">
        Curriculum is generated from <code>CURRICULUM.md</code> — edit the
        markdown and run <code>npm run generate</code> to update the app.
      </p>
    </div>
  );
}
