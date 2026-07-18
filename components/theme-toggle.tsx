"use client";

import { useEffect, useState } from "react";

const KEY = "roadmap-theme-v1";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      // ignore — theme just won't persist
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="shrink-0 rounded-full border border-zinc-300 px-2.5 py-1 text-sm hover:bg-zinc-200 dark:border-zinc-700 dark:hover:bg-zinc-800"
    >
      {dark === null ? "◐" : dark ? "☀️" : "🌙"}
    </button>
  );
}
