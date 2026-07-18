export function ProgressBar({
  percent,
  className = "",
  barClass = "bg-emerald-500",
}: {
  percent: number;
  className?: string;
  barClass?: string;
}) {
  return (
    <div
      className={`h-2.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800 ${className}`}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-all duration-300 ${barClass}`}
        style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
      />
    </div>
  );
}
