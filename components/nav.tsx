"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { todayISO } from "@/lib/plan";
import { backlogDays, currentWeekNumber, useSchedule } from "@/lib/schedule";
import { useProgress } from "@/lib/store";
import { applicationStats } from "@/lib/tracker";
import { ThemeToggle } from "@/components/theme-toggle";

type NavLink = { href: string; label: string; match?: string };

export function Nav() {
  const pathname = usePathname();
  const { user, syncState, progress, applications } = useProgress();
  const schedule = useSchedule();
  const [weekHref, setWeekHref] = useState("/week/1");
  const [backlogCount, setBacklogCount] = useState(0);
  const [followUpCount, setFollowUpCount] = useState(0);

  // Date-dependent bits are computed client-side only, so the statically
  // prerendered HTML never bakes in a build-time "today".
  useEffect(() => {
    const t = todayISO();
    setWeekHref(`/week/${currentWeekNumber(schedule, t)}`);
    setBacklogCount(backlogDays(progress, schedule, t).length);
    setFollowUpCount(applicationStats(applications, t).overdueFollowUps);
  }, [schedule, progress, applications]);

  // Row 1 is the plan itself, row 2 the things tracked alongside it.
  const planLinks: NavLink[] = [
    { href: "/", label: "Dashboard" },
    { href: weekHref, label: "This Week", match: "/week" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/backlog", label: "Backlog" },
    { href: "/calendar", label: "Calendar" },
  ];
  const trackerLinks: NavLink[] = [
    { href: "/projects", label: "Projects" },
    { href: "/checklists", label: "Checklists" },
    { href: "/dsa", label: "DSA" },
    { href: "/scratch", label: "Scratch" },
    { href: "/interview", label: "Interview" },
    { href: "/applications", label: "Applications" },
    { href: "/certifications", label: "Certs" },
    { href: "/settings", label: "Settings" },
  ];

  const badgeFor = (label: string): number => {
    if (label === "Backlog") return backlogCount;
    if (label === "Applications") return followUpCount;
    return 0;
  };

  const render = (links: NavLink[]) =>
    links.map((l) => {
      const active = l.match
        ? pathname.startsWith(l.match)
        : pathname === l.href;
      const badge = badgeFor(l.label);
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
          {badge > 0 && (
            <span className="rounded-full bg-red-500 px-1.5 text-[10px] font-semibold leading-4 text-white">
              {badge}
            </span>
          )}
        </Link>
      );
    });

  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-2 px-4 pt-3 pb-2 sm:pb-1">
        <Link
          href="/"
          className="mr-auto shrink-0 text-sm font-bold tracking-tight sm:mr-2"
        >
          🧭 <span className="text-blue-600 dark:text-blue-400">Study Compass</span>
        </Link>
        <nav className="scrollbar-none hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto text-sm sm:flex">
          {render(planLinks)}
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
      {/* On mobile both groups scroll as their own row; on desktop row 1
          sits beside the logo and only the trackers need a second row. */}
      <nav className="scrollbar-none flex items-center gap-1 overflow-x-auto px-4 pb-2 text-sm sm:hidden">
        {render(planLinks)}
      </nav>
      <nav className="scrollbar-none mx-auto flex w-full max-w-5xl items-center gap-1 overflow-x-auto border-t border-zinc-100 px-4 py-2 text-sm dark:border-zinc-800/60">
        {render(trackerLinks)}
      </nav>
    </header>
  );
}
