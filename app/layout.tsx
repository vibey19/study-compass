import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/lib/store";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Study Compass",
  description:
    "Personal progress tracker for a 15-week AI engineer roadmap — courses, projects, streaks, and schedule.",
};

// Applies the saved theme before first paint to avoid a light-mode flash.
const themeScript = `(function(){try{var t=localStorage.getItem("roadmap-theme-v1");var d=t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ProgressProvider>
          <Nav />
          <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-20">{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}
