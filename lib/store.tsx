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
import type { ApplicationStatus, ApplicationType, CertStatus } from "@/data/tracker";

/**
 * Bumped whenever the curriculum is replaced. Day ids like `w01-d01` repeat
 * across plans, so every stored key is namespaced by this version: a new
 * plan starts clean instead of inheriting the old plan's ticks.
 */
export const PLAN_VERSION = "v4-ml-10w";

export type ProjectStatus = "not-started" | "in-progress" | "done";
export type ProjectState = { status: ProjectStatus; url: string };
/** One "push": every day from `fromId` onward moves `days` later. */
export type ShiftEntry = { fromId: string; days: number; at: string };

/** One logged DSA problem. Only `resolved` ones count toward the target. */
export type DsaLogEntry = {
  id: string;
  name: string;
  url: string;
  pattern: string;
  difficulty: string;
  date: string;
  /** re-solved from a blank file the next day */
  resolved: boolean;
};

export type ScratchState = { done: boolean; url: string };

export type MockEntry = {
  id: string;
  date: string;
  type: string;
  wentWrong: string;
};

export type ApplicationEntry = {
  id: string;
  company: string;
  role: string;
  type: ApplicationType | "";
  city: string;
  url: string;
  appliedOn: string;
  status: ApplicationStatus;
  followUpOn: string;
  notes: string;
};

/** The weekly review log, keyed by the review day's id. */
export type ReviewState = {
  built: string;
  cantExplain: string;
  hours: string;
  repo: string;
};

export type CertState = { status: CertStatus; url: string; onCV: boolean };

export type Settings = {
  /** when on, a day can't be completed without a proof link */
  requireProof: boolean;
  rulesCollapsed: boolean;
};

const DEFAULT_SETTINGS: Settings = { requireProof: false, rulesCollapsed: false };

/** localStorage key for the current plan version. */
const k = (name: string) => `roadmap-${name}-${PLAN_VERSION}`;

const KEYS = {
  progress: k("progress"),
  completedAt: k("completed-at"),
  subtasks: k("subtasks"),
  notes: k("notes"),
  proofs: k("proofs"),
  projects: k("projects"),
  shifts: k("shifts"),
  checklist: k("checklist"),
  dsa: k("dsa"),
  scratch: k("scratch"),
  theory: k("theory"),
  stars: k("stars"),
  mocks: k("mocks"),
  applications: k("applications"),
  reviews: k("reviews"),
  certs: k("certs"),
  settings: k("settings"),
} as const;

/** Keys written by the previous (15-week) plan, kept only for export. */
const LEGACY_KEYS = [
  "roadmap-progress-v1",
  "roadmap-completed-at-v1",
  "roadmap-subtasks-v1",
  "roadmap-notes-v1",
  "roadmap-projects-v1",
  "roadmap-shifts-v1",
] as const;

const LEGACY_DISMISSED = k("legacy-notice-dismissed");

type BoolMap = Record<string, boolean>;
type StrMap = Record<string, string>;
type ProjectMap = Record<string, ProjectState>;
type ScratchMap = Record<string, ScratchState>;
type ReviewMap = Record<string, ReviewState>;
type CertMap = Record<string, CertState>;

export type SyncState =
  | "off" // Supabase env vars not configured — local-only mode
  | "signed-out"
  | "syncing"
  | "synced"
  | "error";

export type AuthUser = { id: string; email: string | null };

/** Why a mark-complete didn't go through. */
export type ToggleResult = "ok" | "cancelled" | "proof-required";

type Store = {
  /** false until localStorage has been read on the client */
  ready: boolean;
  progress: BoolMap;
  /** day id → ISO date it was checked off; drives the elastic schedule */
  completedAt: StrMap;
  subtasks: BoolMap;
  notes: StrMap;
  /** day id → commit or repo link proving the day happened */
  proofs: StrMap;
  projects: ProjectMap;
  shifts: ShiftEntry[];
  checklist: BoolMap;
  dsa: DsaLogEntry[];
  scratch: ScratchMap;
  theory: BoolMap;
  stars: StrMap;
  mocks: MockEntry[];
  applications: ApplicationEntry[];
  reviews: ReviewMap;
  certs: CertMap;
  settings: Settings;
  /** raw toggle — no proof check; prefer requestToggleDay from the UI */
  toggleDay: (id: string) => void;
  /** toggle with the proof rules applied (soft prompt / hard block) */
  requestToggleDay: (id: string) => ToggleResult;
  toggleSubtask: (key: string) => void;
  setNote: (id: string, text: string) => void;
  setProof: (id: string, url: string) => void;
  setProject: (id: string, patch: Partial<ProjectState>) => void;
  toggleChecklistItem: (key: string) => void;
  addDsa: (entry: Omit<DsaLogEntry, "id">) => void;
  updateDsa: (id: string, patch: Partial<DsaLogEntry>) => void;
  removeDsa: (id: string) => void;
  setScratch: (id: string, patch: Partial<ScratchState>) => void;
  toggleTheory: (id: string) => void;
  setStar: (id: string, text: string) => void;
  addMock: (entry: Omit<MockEntry, "id">) => void;
  removeMock: (id: string) => void;
  addApplication: (entry: Omit<ApplicationEntry, "id">) => void;
  updateApplication: (id: string, patch: Partial<ApplicationEntry>) => void;
  removeApplication: (id: string) => void;
  setReview: (dayId: string, patch: Partial<ReviewState>) => void;
  setCert: (id: string, patch: Partial<CertState>) => void;
  setSettings: (patch: Partial<Settings>) => void;
  /** pushes the given day (and everything after it) one day later */
  pushDay: (fromId: string) => void;
  undoLastShift: () => void;
  resetAll: () => void;
  exportJSON: () => string;
  /** returns an error message, or null on success */
  importJSON: (json: string) => string | null;
  /** true while progress from the previous plan is still sitting unexported */
  hasLegacyProgress: boolean;
  /** the previous plan's progress as JSON, or null if there is none */
  legacyJSON: () => string | null;
  dismissLegacyNotice: () => void;
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

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}

const Ctx = createContext<Store | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState<BoolMap>({});
  const [completedAt, setCompletedAt] = useState<StrMap>({});
  const [subtasks, setSubtasks] = useState<BoolMap>({});
  const [notes, setNotes] = useState<StrMap>({});
  const [proofs, setProofs] = useState<StrMap>({});
  const [projects, setProjects] = useState<ProjectMap>({});
  const [shifts, setShifts] = useState<ShiftEntry[]>([]);
  const [checklist, setChecklist] = useState<BoolMap>({});
  const [dsa, setDsa] = useState<DsaLogEntry[]>([]);
  const [scratch, setScratch] = useState<ScratchMap>({});
  const [theory, setTheory] = useState<BoolMap>({});
  const [stars, setStars] = useState<StrMap>({});
  const [mocks, setMocks] = useState<MockEntry[]>([]);
  const [applications, setApplications] = useState<ApplicationEntry[]>([]);
  const [reviews, setReviews] = useState<ReviewMap>({});
  const [certs, setCerts] = useState<CertMap>({});
  const [settings, setSettingsState] = useState<Settings>(DEFAULT_SETTINGS);
  const [hasLegacyProgress, setHasLegacyProgress] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [syncState, setSyncState] = useState<SyncState>(
    supabase ? "signed-out" : "off"
  );
  // Blocks pushes until the signed-in user's cloud copy has been pulled,
  // so a stale local state never clobbers the cloud on login.
  const cloudLoaded = useRef(false);
  // Other plan versions living in the same cloud row, preserved on push.
  const otherVersions = useRef<Record<string, unknown>>({});
  // Read inside toggleDay without making it depend on settings.
  const settingsRef = useRef(settings);
  settingsRef.current = settings;
  const proofsRef = useRef(proofs);
  proofsRef.current = proofs;

  useEffect(() => {
    setProgress(load(KEYS.progress, {}));
    setCompletedAt(load(KEYS.completedAt, {}));
    setSubtasks(load(KEYS.subtasks, {}));
    setNotes(load(KEYS.notes, {}));
    setProofs(load(KEYS.proofs, {}));
    setProjects(load(KEYS.projects, {}));
    setShifts(loadArray(KEYS.shifts, []));
    setChecklist(load(KEYS.checklist, {}));
    setDsa(loadArray(KEYS.dsa, []));
    setScratch(load(KEYS.scratch, {}));
    setTheory(load(KEYS.theory, {}));
    setStars(load(KEYS.stars, {}));
    setMocks(loadArray(KEYS.mocks, []));
    setApplications(loadArray(KEYS.applications, []));
    setReviews(load(KEYS.reviews, {}));
    setCerts(load(KEYS.certs, {}));
    setSettingsState({ ...DEFAULT_SETTINGS, ...load(KEYS.settings, {}) });
    try {
      setHasLegacyProgress(
        !localStorage.getItem(LEGACY_DISMISSED) &&
          LEGACY_KEYS.some((key) => localStorage.getItem(key))
      );
    } catch {
      // storage unavailable — nothing to migrate
    }
    setReady(true);
  }, []);

  // One writer per key, so a change only re-serializes what it touched.
  useEffect(() => { if (ready) save(KEYS.progress, progress); }, [ready, progress]);
  useEffect(() => { if (ready) save(KEYS.completedAt, completedAt); }, [ready, completedAt]);
  useEffect(() => { if (ready) save(KEYS.subtasks, subtasks); }, [ready, subtasks]);
  useEffect(() => { if (ready) save(KEYS.notes, notes); }, [ready, notes]);
  useEffect(() => { if (ready) save(KEYS.proofs, proofs); }, [ready, proofs]);
  useEffect(() => { if (ready) save(KEYS.projects, projects); }, [ready, projects]);
  useEffect(() => { if (ready) save(KEYS.shifts, shifts); }, [ready, shifts]);
  useEffect(() => { if (ready) save(KEYS.checklist, checklist); }, [ready, checklist]);
  useEffect(() => { if (ready) save(KEYS.dsa, dsa); }, [ready, dsa]);
  useEffect(() => { if (ready) save(KEYS.scratch, scratch); }, [ready, scratch]);
  useEffect(() => { if (ready) save(KEYS.theory, theory); }, [ready, theory]);
  useEffect(() => { if (ready) save(KEYS.stars, stars); }, [ready, stars]);
  useEffect(() => { if (ready) save(KEYS.mocks, mocks); }, [ready, mocks]);
  useEffect(() => { if (ready) save(KEYS.applications, applications); }, [ready, applications]);
  useEffect(() => { if (ready) save(KEYS.reviews, reviews); }, [ready, reviews]);
  useEffect(() => { if (ready) save(KEYS.certs, certs); }, [ready, certs]);
  useEffect(() => { if (ready) save(KEYS.settings, settings); }, [ready, settings]);

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
  // The row holds one blob per plan version, so switching plans doesn't
  // overwrite the old one and this version reads only its own slice.
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
        const row = (data?.data ?? {}) as Record<string, unknown>;
        const { [PLAN_VERSION]: mine, ...rest } = row;
        otherVersions.current = rest;
        const d = (mine ?? {}) as Record<string, unknown>;
        if (d.progress) setProgress(d.progress as BoolMap);
        if (d.completedAt) setCompletedAt(d.completedAt as StrMap);
        if (d.subtasks) setSubtasks(d.subtasks as BoolMap);
        if (d.notes) setNotes(d.notes as StrMap);
        if (d.proofs) setProofs(d.proofs as StrMap);
        if (d.projects) setProjects(d.projects as ProjectMap);
        if (Array.isArray(d.shifts)) setShifts(d.shifts as ShiftEntry[]);
        if (d.checklist) setChecklist(d.checklist as BoolMap);
        if (Array.isArray(d.dsa)) setDsa(d.dsa as DsaLogEntry[]);
        if (d.scratch) setScratch(d.scratch as ScratchMap);
        if (d.theory) setTheory(d.theory as BoolMap);
        if (d.stars) setStars(d.stars as StrMap);
        if (Array.isArray(d.mocks)) setMocks(d.mocks as MockEntry[]);
        if (Array.isArray(d.applications)) {
          setApplications(d.applications as ApplicationEntry[]);
        }
        if (d.reviews) setReviews(d.reviews as ReviewMap);
        if (d.certs) setCerts(d.certs as CertMap);
        if (d.settings) {
          setSettingsState({ ...DEFAULT_SETTINGS, ...(d.settings as Settings) });
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
        data: {
          ...otherVersions.current,
          [PLAN_VERSION]: {
            progress, completedAt, subtasks, notes, proofs, projects, shifts,
            checklist, dsa, scratch, theory, stars, mocks, applications,
            reviews, certs, settings,
          },
        },
        updated_at: new Date().toISOString(),
      });
      setSyncState(error ? "error" : "synced");
    }, 800);
    return () => clearTimeout(t);
  }, [
    progress, completedAt, subtasks, notes, proofs, projects, shifts,
    checklist, dsa, scratch, theory, stars, mocks, applications, reviews,
    certs, settings, user?.id,
  ]); // eslint-disable-line react-hooks/exhaustive-deps

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
    otherVersions.current = {};
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

  // Rule 4 of the plan: no commit, no credit. Completing a day without a
  // proof link asks first, or is refused outright if the user made proof
  // mandatory in Settings. Un-ticking a day is never questioned.
  const requestToggleDay = useCallback(
    (id: string): ToggleResult => {
      const marking = !progress[id];
      const hasProof = !!proofsRef.current[id]?.trim();
      if (marking && !hasProof) {
        if (settingsRef.current.requireProof) return "proof-required";
        const ok =
          typeof window === "undefined" ||
          window.confirm("No commit link. Mark complete anyway?");
        if (!ok) return "cancelled";
      }
      toggleDay(id);
      return "ok";
    },
    [progress, toggleDay]
  );

  const toggleSubtask = useCallback((key: string) => {
    setSubtasks((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  /** Drops the key entirely when the text is empty, so maps stay small. */
  const setTextIn = (
    setter: React.Dispatch<React.SetStateAction<StrMap>>,
    id: string,
    text: string
  ) =>
    setter((m) => {
      if (!text) {
        const { [id]: _, ...rest } = m;
        return rest;
      }
      return { ...m, [id]: text };
    });

  const setNote = useCallback((id: string, text: string) => {
    setTextIn(setNotes, id, text);
  }, []);

  const setProof = useCallback((id: string, url: string) => {
    setTextIn(setProofs, id, url);
  }, []);

  const setStar = useCallback((id: string, text: string) => {
    setTextIn(setStars, id, text);
  }, []);

  const setProject = useCallback((id: string, patch: Partial<ProjectState>) => {
    setProjects((p) => {
      const base: ProjectState = p[id] ?? { status: "not-started", url: "" };
      return { ...p, [id]: { ...base, ...patch } };
    });
  }, []);

  const toggleChecklistItem = useCallback((key: string) => {
    setChecklist((c) => ({ ...c, [key]: !c[key] }));
  }, []);

  const addDsa = useCallback((entry: Omit<DsaLogEntry, "id">) => {
    setDsa((list) => [{ ...entry, id: newId() }, ...list]);
  }, []);

  const updateDsa = useCallback((id: string, patch: Partial<DsaLogEntry>) => {
    setDsa((list) => list.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const removeDsa = useCallback((id: string) => {
    setDsa((list) => list.filter((e) => e.id !== id));
  }, []);

  const setScratchItem = useCallback((id: string, patch: Partial<ScratchState>) => {
    setScratch((s) => {
      const base: ScratchState = s[id] ?? { done: false, url: "" };
      return { ...s, [id]: { ...base, ...patch } };
    });
  }, []);

  const toggleTheory = useCallback((id: string) => {
    setTheory((t) => ({ ...t, [id]: !t[id] }));
  }, []);

  const addMock = useCallback((entry: Omit<MockEntry, "id">) => {
    setMocks((list) => [{ ...entry, id: newId() }, ...list]);
  }, []);

  const removeMock = useCallback((id: string) => {
    setMocks((list) => list.filter((e) => e.id !== id));
  }, []);

  const addApplication = useCallback((entry: Omit<ApplicationEntry, "id">) => {
    setApplications((list) => [{ ...entry, id: newId() }, ...list]);
  }, []);

  const updateApplication = useCallback(
    (id: string, patch: Partial<ApplicationEntry>) => {
      setApplications((list) =>
        list.map((e) => (e.id === id ? { ...e, ...patch } : e))
      );
    },
    []
  );

  const removeApplication = useCallback((id: string) => {
    setApplications((list) => list.filter((e) => e.id !== id));
  }, []);

  const setReview = useCallback((dayId: string, patch: Partial<ReviewState>) => {
    setReviews((r) => {
      const base: ReviewState =
        r[dayId] ?? { built: "", cantExplain: "", hours: "", repo: "" };
      return { ...r, [dayId]: { ...base, ...patch } };
    });
  }, []);

  const setCert = useCallback((id: string, patch: Partial<CertState>) => {
    setCerts((c) => {
      const base: CertState =
        c[id] ?? { status: "planned", url: "", onCV: false };
      return { ...c, [id]: { ...base, ...patch } };
    });
  }, []);

  const setSettings = useCallback((patch: Partial<Settings>) => {
    setSettingsState((s) => ({ ...s, ...patch }));
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
    setProofs({});
    setProjects({});
    setShifts([]);
    setChecklist({});
    setDsa([]);
    setScratch({});
    setTheory({});
    setStars({});
    setMocks([]);
    setApplications([]);
    setReviews({});
    setCerts({});
    setSettingsState(DEFAULT_SETTINGS);
  }, []);

  const exportJSON = useCallback(
    () =>
      JSON.stringify(
        {
          planVersion: PLAN_VERSION,
          progress, completedAt, subtasks, notes, proofs, projects, shifts,
          checklist, dsa, scratch, theory, stars, mocks, applications,
          reviews, certs, settings,
        },
        null,
        2
      ),
    [
      progress, completedAt, subtasks, notes, proofs, projects, shifts,
      checklist, dsa, scratch, theory, stars, mocks, applications, reviews,
      certs, settings,
    ]
  );

  const importJSON = useCallback((json: string): string | null => {
    try {
      const data = JSON.parse(json);
      if (!data || typeof data !== "object" || Array.isArray(data)) {
        return "Not a valid progress file.";
      }
      const obj = (key: string): object | null =>
        data[key] && typeof data[key] === "object" && !Array.isArray(data[key])
          ? data[key]
          : null;
      const arr = <T,>(key: string): T[] | null =>
        Array.isArray(data[key]) ? (data[key] as T[]) : null;

      const maps = {
        progress: obj("progress"),
        completedAt: obj("completedAt"),
        subtasks: obj("subtasks"),
        notes: obj("notes"),
        proofs: obj("proofs"),
        projects: obj("projects"),
        checklist: obj("checklist"),
        scratch: obj("scratch"),
        theory: obj("theory"),
        stars: obj("stars"),
        reviews: obj("reviews"),
        certs: obj("certs"),
        settings: obj("settings"),
      };
      const lists = {
        shifts: arr<ShiftEntry>("shifts"),
        dsa: arr<DsaLogEntry>("dsa"),
        mocks: arr<MockEntry>("mocks"),
        applications: arr<ApplicationEntry>("applications"),
      };
      if (
        !Object.values(maps).some(Boolean) &&
        !Object.values(lists).some(Boolean)
      ) {
        return "File doesn't contain any recognized progress data.";
      }

      if (maps.progress) setProgress(maps.progress as BoolMap);
      if (maps.completedAt) setCompletedAt(maps.completedAt as StrMap);
      if (maps.subtasks) setSubtasks(maps.subtasks as BoolMap);
      if (maps.notes) setNotes(maps.notes as StrMap);
      if (maps.proofs) setProofs(maps.proofs as StrMap);
      if (maps.projects) setProjects(maps.projects as ProjectMap);
      if (maps.checklist) setChecklist(maps.checklist as BoolMap);
      if (maps.scratch) setScratch(maps.scratch as ScratchMap);
      if (maps.theory) setTheory(maps.theory as BoolMap);
      if (maps.stars) setStars(maps.stars as StrMap);
      if (maps.reviews) setReviews(maps.reviews as ReviewMap);
      if (maps.certs) setCerts(maps.certs as CertMap);
      if (maps.settings) {
        setSettingsState({ ...DEFAULT_SETTINGS, ...(maps.settings as Settings) });
      }
      if (lists.shifts) setShifts(lists.shifts);
      if (lists.dsa) setDsa(lists.dsa);
      if (lists.mocks) setMocks(lists.mocks);
      if (lists.applications) setApplications(lists.applications);
      return null;
    } catch {
      return "Could not parse the file as JSON.";
    }
  }, []);

  /** The previous plan's raw localStorage entries, for a one-time export. */
  const legacyJSON = useCallback((): string | null => {
    try {
      const out: Record<string, unknown> = {};
      for (const key of LEGACY_KEYS) {
        const raw = localStorage.getItem(key);
        if (raw == null) continue;
        // Strip the "roadmap-" prefix and "-v1" suffix: "progress", "notes"…
        const name = key.replace(/^roadmap-/, "").replace(/-v1$/, "");
        try {
          out[name] = JSON.parse(raw);
        } catch {
          out[name] = raw;
        }
      }
      if (Object.keys(out).length === 0) return null;
      return JSON.stringify({ planVersion: "v3-15w", ...out }, null, 2);
    } catch {
      return null;
    }
  }, []);

  const dismissLegacyNotice = useCallback(() => {
    try {
      localStorage.setItem(LEGACY_DISMISSED, "1");
    } catch {
      // not persisting the dismissal is harmless — the notice reappears
    }
    setHasLegacyProgress(false);
  }, []);

  return (
    <Ctx.Provider
      value={{
        ready,
        progress,
        completedAt,
        subtasks,
        notes,
        proofs,
        projects,
        shifts,
        checklist,
        dsa,
        scratch,
        theory,
        stars,
        mocks,
        applications,
        reviews,
        certs,
        settings,
        toggleDay,
        requestToggleDay,
        toggleSubtask,
        setNote,
        setProof,
        setProject,
        toggleChecklistItem,
        addDsa,
        updateDsa,
        removeDsa,
        setScratch: setScratchItem,
        toggleTheory,
        setStar,
        addMock,
        removeMock,
        addApplication,
        updateApplication,
        removeApplication,
        setReview,
        setCert,
        setSettings,
        pushDay,
        undoLastShift,
        resetAll,
        exportJSON,
        importJSON,
        hasLegacyProgress,
        legacyJSON,
        dismissLegacyNotice,
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
