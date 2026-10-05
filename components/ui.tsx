// Shared form and layout atoms for the tracker pages, so the inputs,
// cards and headers stay consistent without a component library.
import type { ReactNode } from "react";

export const inputClass =
  "w-full min-w-0 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm outline-none focus:border-blue-500 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950";

export const buttonClass =
  "rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-100 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-800";

export const primaryButtonClass =
  "rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50";

export function PageHeader({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {children && (
        <p className="mt-1 text-sm text-zinc-500">{children}</p>
      )}
    </div>
  );
}

export function Card({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 ${className}`}
    >
      {children}
    </section>
  );
}

export function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs text-zinc-500">{label}</span>
      <span className="mt-1 block">{children}</span>
    </label>
  );
}

/** A labelled count, e.g. "12/70 re-solved". */
export function Counter({
  value,
  total,
  unit,
  good,
}: {
  value: number;
  total?: number;
  unit?: string;
  good?: boolean;
}) {
  return (
    <span
      className={`text-sm font-semibold ${
        good ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500"
      }`}
    >
      {value}
      {total !== undefined && (
        <span className="font-normal text-zinc-400">/{total}</span>
      )}
      {unit && <span className="ml-1 font-normal text-zinc-400">{unit}</span>}
    </span>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700">
      {children}
    </p>
  );
}

/** "4/6" plus a thin bar, or a done marker when everything is ticked. */
export function ProgressSummary({
  done,
  total,
  complete,
  barClass,
}: {
  done: number;
  total: number;
  complete: boolean;
  barClass: string;
}) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-1.5 w-24 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
        <span
          className={`block h-full ${barClass}`}
          style={{ width: `${total ? (done / total) * 100 : 0}%` }}
        />
      </span>
      <span
        className={`text-sm font-medium ${
          complete
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-zinc-500"
        }`}
      >
        {done}/{total}
        {complete && " ✓"}
      </span>
    </span>
  );
}
