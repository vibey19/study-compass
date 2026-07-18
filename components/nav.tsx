"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { todayISO } from "@/lib/plan";
import { backlogDays, currentWeekNumber, useSchedule } from "@/lib/schedule";
import { useProgress } from "@/lib/store";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  const pathname = usePathname();
  const { user, syncState, progress } = useProgress();
  const schedule = useSchedule();
  const [weekHref, setWeekHref] = useState("/week/1");
  const [backlogCount, setBacklogCount] = useState(0);

  // Date-dependent bits are computed client-side only, so the statically
  // prerendered HTML never bakes in a build-time "today".
  useEffect(() => {
    const t = todayISO();
    setWeekHref(`/week/${currentWeekNumber(schedule, t)}`);
    setBacklogCount(backlogDays(progress, schedule, t).length);
  }, [schedule, progress]);

  const links = [
    { href: "/", label: "Dashboard" },
    { href: weekHref, label: "This Week" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/backlog", label: "Backlog" },
    { href: "/projects", label: "Projects" },
    { href: "/calendar", label: "Calendar" },
    { href: "/settings", label: "Settings" },
  ];

  const navLinks = links.map((l) => {
    const active =
      l.label === "This Week"
        ? pathname.startsWith("/week")
        : pathname === l.href;
    return (
      <Link
        key={l.label}
        href={l.href}
        className={`relative flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors sm:py-1 ${
          active
            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
            : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        }`}
      >
        {l.label}
        {l.label === "Backlog" && backlogCount > 0 && (
          <span className="rounded-full bg-red-500 px-1.5 text-[10px] font-semibold leading-4 text-white">
            {backlogCount}
          </span>
        )}
      </Link>
    );
  });

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-2 px-4 pt-3 pb-2 sm:py-3">
        <Link href="/" className="mr-auto shrink-0 text-sm font-bold tracking-tight sm:mr-2">
          🧭 <span className="text-blue-600 dark:text-blue-400">Study Compass</span>
        </Link>
        <nav className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto text-sm sm:flex">
          {navLinks}
        </nav>
        {syncState !== "off" && (
          <Link
            href="/settings"
            title={
              user
                ? `Signed in as ${user.email ?? "user"} — ${syncState}`
                : "Not signed in — progress is local only"
            }
            className="shrink-0 text-xs"
          >
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                user
                  ? syncState === "error"
                    ? "bg-red-500"
                    : "bg-emerald-500"
                  : "bg-zinc-400"
              }`}
            />
          </Link>
        )}
        <ThemeToggle />
      </div>
      <nav className="scrollbar-none flex items-center gap-1 overflow-x-auto px-4 pb-2 text-sm sm:hidden">
        {navLinks}
      </nav>
    </header>
  );
}
