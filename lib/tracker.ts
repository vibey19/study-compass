// Derived numbers for the tracker pages and the dashboard tiles. Pure
// functions over store state so they can be called from anywhere.
import {
  APPLICATION_TARGET,
  DSA_TOTAL_TARGET,
  certifications,
  checklistKey,
  dsaPatterns,
  scratchItems,
  stageChecklists,
  theoryQuestions,
  type ChecklistStage,
} from "@/data/tracker";
import { studyDays, todayISO } from "@/lib/plan";
import type {
  ApplicationEntry,
  CertState,
  DsaLogEntry,
  ScratchState,
} from "@/lib/store";

/* --------------------------------------------------------------- DSA */

export type DsaProgress = {
  /** re-solved from blank — the only ones that count */
  resolved: number;
  /** every problem logged, re-solved or not */
  logged: number;
  target: number;
  byPattern: Record<string, { resolved: number; logged: number; target: number }>;
};

export function dsaProgress(dsa: DsaLogEntry[]): DsaProgress {
  const byPattern: DsaProgress["byPattern"] = {};
  for (const p of dsaPatterns) {
    byPattern[p.id] = { resolved: 0, logged: 0, target: p.target };
  }
  for (const entry of dsa) {
    const slot = byPattern[entry.pattern];
    if (!slot) continue;
    slot.logged++;
    if (entry.resolved) slot.resolved++;
  }
  return {
    resolved: dsa.filter((e) => e.resolved).length,
    logged: dsa.length,
    target: DSA_TOTAL_TARGET,
    byPattern,
  };
}

/* ------------------------------------------------------------- Proof */

/** Completed days that carry a commit or repo link. */
export function proofCount(
  progress: Record<string, boolean>,
  proofs: Record<string, string>
): { withProof: number; completed: number } {
  const done = studyDays.filter((d) => progress[d.id]);
  return {
    withProof: done.filter((d) => proofs[d.id]?.trim()).length,
    completed: done.length,
  };
}

/* ------------------------------------------------------ Applications */

export type ApplicationStats = {
  /** anything past "to apply" */
  sent: number;
  /** reached an interview, take-home or offer */
  interviews: number;
  toApply: number;
  offers: number;
  target: number;
  overdueFollowUps: number;
};

export function isFollowUpOverdue(
  app: ApplicationEntry,
  today = todayISO()
): boolean {
  if (!app.followUpOn) return false;
  if (app.status === "offer" || app.status === "rejected") return false;
  return app.followUpOn < today;
}

export function applicationStats(
  applications: ApplicationEntry[],
  today = todayISO()
): ApplicationStats {
  const interviewish = new Set(["interview", "take-home", "offer"]);
  return {
    sent: applications.filter((a) => a.status !== "to apply").length,
    interviews: applications.filter((a) => interviewish.has(a.status)).length,
    toApply: applications.filter((a) => a.status === "to apply").length,
    offers: applications.filter((a) => a.status === "offer").length,
    target: APPLICATION_TARGET,
    overdueFollowUps: applications.filter((a) => isFollowUpOverdue(a, today))
      .length,
  };
}

/* ----------------------------------------------------- Certifications */

export function certsEarned(certs: Record<string, CertState>): number {
  return certifications.filter((c) => certs[c.id]?.status === "earned").length;
}

/**
 * The Certifications block for the CV: earned certs flagged "show on CV",
 * with members of a cvGroup (the Kaggle courses) collapsed onto one line.
 * Part C caps this section at 4 lines, which the grouping is there to make
 * possible.
 */
export function cvLines(certs: Record<string, CertState>): string[] {
  const shown = certifications.filter(
    (c) => certs[c.id]?.status === "earned" && certs[c.id]?.onCV
  );
  const lines: string[] = [];
  const grouped = new Map<string, string[]>();
  for (const c of shown) {
    if (!c.cvGroup) {
      lines.push(c.name);
      continue;
    }
    const names = grouped.get(c.cvGroup) ?? [];
    // "Kaggle Learn Pandas" reads as just "Pandas" once grouped.
    names.push(c.name.replace(`${c.cvGroup} `, ""));
    grouped.set(c.cvGroup, names);
  }
  for (const [group, names] of grouped) {
    lines.push(`${group}: ${names.join(", ")}`);
  }
  return lines;
}

/* -------------------------------------------------- Stage checklists */

export type ChecklistProgress = {
  stage: ChecklistStage;
  done: number;
  total: number;
  complete: boolean;
};

export function checklistProgress(
  checklist: Record<string, boolean>,
  stage: ChecklistStage
): ChecklistProgress {
  const done = stage.items.filter(
    (_, i) => checklist[checklistKey(stage.stage, i)]
  ).length;
  return {
    stage,
    done,
    total: stage.items.length,
    complete: done === stage.items.length,
  };
}

export function checklistProgressForPhase(
  checklist: Record<string, boolean>,
  phase: string
): ChecklistProgress | null {
  const stage = stageChecklists.find((s) => s.phase === phase);
  return stage ? checklistProgress(checklist, stage) : null;
}

/* --------------------------------------------- From-scratch & theory */

export function scratchDone(scratch: Record<string, ScratchState>): number {
  return scratchItems.filter((i) => scratch[i.id]?.done).length;
}

export function theoryDone(theory: Record<string, boolean>): number {
  return theoryQuestions.filter((q) => theory[q.id]).length;
}
