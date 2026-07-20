"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { todayISO } from "@/lib/plan";
import { supabase } from "@/lib/supabase";

export type ProjectStatus = "not-started" | "in-progress" | "done";
export type ProjectState = { status: ProjectStatus; url: string };
/** One "push": every day from `fromId` onward moves `days` later. */
export type ShiftEntry = { fromId: string; days: number; at: string };

const KEYS = {
  progress: "roadmap-progress-v1",
  completedAt: "roadmap-completed-at-v1",
  subtasks: "roadmap-subtasks-v1",
  notes: "roadmap-notes-v1",
  projects: "roadmap-projects-v1",
  shifts: "roadmap-shifts-v1",
} as const;

type BoolMap = Record<string, boolean>;
type StrMap = Record<string, string>;
type ProjectMap = Record<string, ProjectState>;

export type SyncState =
  | "off" // Supabase env vars not configured — local-only mode
  | "signed-out"
  | "syncing"
  | "synced"
  | "error";

export type AuthUser = { id: string; email: string | null };

type Store = {
  /** false until localStorage has been read on the client */
  ready: boolean;
  progress: BoolMap;
  /** day id → ISO date it was checked off; drives the elastic schedule */
  completedAt: StrMap;
  subtasks: BoolMap;
  notes: StrMap;
  projects: ProjectMap;
  shifts: ShiftEntry[];
  toggleDay: (id: string) => void;
  toggleSubtask: (key: string) => void;
  setNote: (id: string, text: string) => void;
  setProject: (id: string, patch: Partial<ProjectState>) => void;
  /** pushes the given day (and everything after it) one day later */
  pushDay: (fromId: string) => void;
  undoLastShift: () => void;
  resetAll: () => void;
  exportJSON: () => string;
  /** returns an error message, or null on success */
  importJSON: (json: string) => string | null;
  // Auth & cloud sync
  user: AuthUser | null;
  syncState: SyncState;
  /** sends a magic login link; returns an error message, or null on success */
  signIn: (email: string) => Promise<string | null>;
  signOut: () => Promise<void>;
};

function load<T extends object>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as T)
      : fallback;
  } catch {
    return fallback;
  }
}

function loadArray<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, value: object) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage full/unavailable — state still works for the session
  }
}

const Ctx = createContext<Store | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState<BoolMap>({});
  const [completedAt, setCompletedAt] = useState<StrMap>({});
  const [subtasks, setSubtasks] = useState<BoolMap>({});
  const [notes, setNotes] = useState<StrMap>({});
  const [projects, setProjects] = useState<ProjectMap>({});
  const [shifts, setShifts] = useState<ShiftEntry[]>([]);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [syncState, setSyncState] = useState<SyncState>(
    supabase ? "signed-out" : "off"
  );
  // Blocks pushes until the signed-in user's cloud copy has been pulled,
  // so a stale local state never clobbers the cloud on login.
  const cloudLoaded = useRef(false);

  useEffect(() => {
    setProgress(load(KEYS.progress, {}));
    setCompletedAt(load(KEYS.completedAt, {}));
    setSubtasks(load(KEYS.subtasks, {}));
    setNotes(load(KEYS.notes, {}));
    setProjects(load(KEYS.projects, {}));
    setShifts(loadArray(KEYS.shifts, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) save(KEYS.progress, progress);
  }, [ready, progress]);
  useEffect(() => {
    if (ready) save(KEYS.completedAt, completedAt);
  }, [ready, completedAt]);
  useEffect(() => {
    if (ready) save(KEYS.subtasks, subtasks);
  }, [ready, subtasks]);
  useEffect(() => {
    if (ready) save(KEYS.notes, notes);
  }, [ready, notes]);
  useEffect(() => {
    if (ready) save(KEYS.projects, projects);
  }, [ready, projects]);
  useEffect(() => {
    if (ready) save(KEYS.shifts, shifts);
  }, [ready, shifts]);

  // --- Auth session tracking ---
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      const u = data.session?.user;
      setUser(u ? { id: u.id, email: u.email ?? null } : null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user;
      setUser(u ? { id: u.id, email: u.email ?? null } : null);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // --- Pull cloud state on login ---
  useEffect(() => {
    if (!supabase || !user || !ready) return;
    let cancelled = false;
    cloudLoaded.current = false;
    setSyncState("syncing");
    supabase
      .from("roadmap_progress")
      .select("data")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setSyncState("error");
          return;
        }
        const d = data?.data as Record<string, unknown> | undefined;
        if (d) {
          if (d.progress) setProgress(d.progress as BoolMap);
          if (d.completedAt) setCompletedAt(d.completedAt as StrMap);
          if (d.subtasks) setSubtasks(d.subtasks as BoolMap);
          if (d.notes) setNotes(d.notes as StrMap);
          if (d.projects) setProjects(d.projects as ProjectMap);
          if (Array.isArray(d.shifts)) setShifts(d.shifts as ShiftEntry[]);
        }
        cloudLoaded.current = true;
        setSyncState("synced");
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Debounced push on any change while signed in ---
  useEffect(() => {
    if (!supabase || !user || !cloudLoaded.current) return;
    const client = supabase;
    const userId = user.id;
    const t = setTimeout(async () => {
      setSyncState("syncing");
      const { error } = await client.from("roadmap_progress").upsert({
        user_id: userId,
        data: { progress, completedAt, subtasks, notes, projects, shifts },
        updated_at: new Date().toISOString(),
      });
      setSyncState(error ? "error" : "synced");
    }, 800);
    return () => clearTimeout(t);
  }, [progress, completedAt, subtasks, notes, projects, shifts, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const signIn = useCallback(async (email: string): Promise<string | null> => {
    if (!supabase) return "Sync is not configured (missing Supabase env vars).";
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          typeof window !== "undefined"
            ? `${window.location.origin}/settings`
            : undefined,
      },
    });
    return error ? error.message : null;
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    cloudLoaded.current = false;
    await supabase.auth.signOut();
    setSyncState("signed-out");
  }, []);

  const toggleDay = useCallback(
    (id: string) => {
      const nowDone = !progress[id];
      setProgress((p) => ({ ...p, [id]: nowDone }));
      setCompletedAt((c) => {
        if (!nowDone) {
          const { [id]: _, ...rest } = c;
          return rest;
        }
        return { ...c, [id]: todayISO() };
      });
    },
    [progress]
  );

  const toggleSubtask = useCallback((key: string) => {
    setSubtasks((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  const setNote = useCallback((id: string, text: string) => {
    setNotes((n) => {
      if (!text) {
        const { [id]: _, ...rest } = n;
        return rest;
      }
      return { ...n, [id]: text };
    });
  }, []);

  const setProject = useCallback((id: string, patch: Partial<ProjectState>) => {
    setProjects((p) => {
      const base: ProjectState = p[id] ?? { status: "not-started", url: "" };
      return { ...p, [id]: { ...base, ...patch } };
    });
  }, []);

  const pushDay = useCallback((fromId: string) => {
    setShifts((s) => [
      ...s,
      { fromId, days: 1, at: new Date().toISOString().slice(0, 10) },
    ]);
  }, []);

  const undoLastShift = useCallback(() => {
    setShifts((s) => s.slice(0, -1));
  }, []);

  const resetAll = useCallback(() => {
    setProgress({});
    setCompletedAt({});
    setSubtasks({});
    setNotes({});
    setProjects({});
    setShifts([]);
  }, []);

  const exportJSON = useCallback(
    () =>
      JSON.stringify(
        { progress, completedAt, subtasks, notes, projects, shifts },
        null,
        2
      ),
    [progress, completedAt, subtasks, notes, projects, shifts]
  );

  const importJSON = useCallback((json: string): string | null => {
    try {
      const data = JSON.parse(json);
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return "Not a valid progress file.";
      }
      const pick = (k: string): object | null =>
        data[k] && typeof data[k] === "object" && !Array.isArray(data[k])
          ? data[k]
          : null;
      const p = pick("progress");
      const c = pick("completedAt");
      const s = pick("subtasks");
      const n = pick("notes");
      const pr = pick("projects");
      const sh = Array.isArray(data.shifts) ? (data.shifts as ShiftEntry[]) : null;
      if (!p && !s && !n && !pr && !sh) {
        return "File doesn't contain any recognized progress data.";
      }
      if (p) setProgress(p as BoolMap);
      if (c) setCompletedAt(c as StrMap);
      if (s) setSubtasks(s as BoolMap);
      if (n) setNotes(n as StrMap);
      if (pr) setProjects(pr as ProjectMap);
      if (sh) setShifts(sh);
      return null;
    } catch {
      return "Could not parse the file as JSON.";
    }
  }, []);

  return (
    <Ctx.Provider
      value={{
        ready,
        progress,
        completedAt,
        subtasks,
        notes,
        projects,
        shifts,
        toggleDay,
        toggleSubtask,
        setNote,
        setProject,
        pushDay,
        undoLastShift,
        resetAll,
        exportJSON,
        importJSON,
        user,
        syncState,
        signIn,
        signOut,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useProgress(): Store {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
