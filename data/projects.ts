// Project specs captured from Part C (C2) of CURRICULUM.md. If that file
// changes, update this one.

export type ProjectEntry = {
  id: string;
  number: number;
  title: string;
  weeks: number[];
  weeksLabel: string;
  goal: string;
  deliverables: string[];
  stack: string[];
};

export const projects: ProjectEntry[] = [
  {
    id: "p1",
    number: 1,
    title: "EDA + Insights",
    weeks: [3],
    weeksLabel: "Week 3",
    goal: "Show you can take a messy real dataset and find a real insight, not just make plots.",
    deliverables: [
      "Cleaning notebook with every decision explained",
      "5 to 8 charts that each answer a question",
      "5 written findings at the top of the README",
    ],
    stack: ["pandas", "matplotlib/seaborn"],
  },
  {
    id: "p2",
    number: 2,
    title: "End-to-End Classic ML",
    weeks: [5],
    weeksLabel: "Week 5 · MLflow added in Week 9",
    goal: "Show you can build a proper ML pipeline, not just call `.fit()`.",
    deliverables: [
      "sklearn Pipeline with no leakage",
      "3 models compared with cross-validation",
      "Tuned best model",
      "Error analysis",
      "Metrics table and why this model",
      "Later served with FastAPI + Docker and tracked in MLflow",
    ],
    stack: ["pandas", "scikit-learn", "XGBoost", "FastAPI", "Docker", "MLflow"],
  },
  {
    id: "p3",
    number: 3,
    title: "Image Classifier + Tiny GPT",
    weeks: [6, 7],
    weeksLabel: "Weeks 6–7",
    goal: "Show real PyTorch skill and that you understand transformers from the inside.",
    deliverables: [
      "Small CNN baseline",
      "Fine-tuned ResNet18 with the accuracy difference",
      "Confusion matrix and misclassified examples",
      "A tiny GPT rebuilt from scratch and trained on your own text",
    ],
    stack: ["PyTorch", "torchvision"],
  },
  {
    id: "p4",
    number: 4,
    title: "Fine-Tuned Text Classifier",
    weeks: [7],
    weeksLabel: "Week 7",
    goal: "Show you know when fine-tuning beats a simple baseline, with numbers.",
    deliverables: [
      "TF-IDF + logistic regression baseline",
      "Fine-tuned small transformer",
      "Results table",
      "Error analysis",
    ],
    stack: ["scikit-learn", "Hugging Face transformers and datasets"],
  },
  {
    id: "p5",
    number: 5,
    title: "RAG App (Flagship)",
    weeks: [8],
    weeksLabel: "Week 8",
    goal: 'The project that says "applied AI engineer".',
    deliverables: [
      "RAG built without LangChain (chunk, embed, index, retrieve, generate with sources)",
      "20-question evaluation with retrieval hit rate and answer quality",
      "One tool the model can call",
      "Gradio UI",
      "Architecture diagram",
    ],
    stack: [
      "sentence-transformers",
      "FAISS",
      "an LLM API (free tier) or local model",
      "Gradio",
    ],
  },
  {
    id: "p6",
    number: 6,
    title: "Production Deploy",
    weeks: [9],
    weeksLabel: "Week 9",
    goal: "Show you can take a model to production, not just a notebook.",
    deliverables: [
      "P5 (and P2 API) in Docker",
      "GitHub Actions CI with green badge",
      "Live on Azure Container Apps",
      "Latency, cost and error logging",
      "Evidently drift report",
      "How-it's-deployed section in README",
    ],
    stack: ["Docker", "FastAPI", "GitHub Actions", "Azure", "MLflow", "Evidently"],
  },
];

/** The three to lead the CV with. */
export const PORTFOLIO_TOP_3 =
  "Portfolio top 3 for the CV: P5 (with P6 deploy), P2, and P3 or P4.";

export function projectForWeek(week: number): ProjectEntry | null {
  return projects.find((p) => p.weeks.includes(week)) ?? null;
}

/**
 * The project a given day belongs to. Weeks 6-7 carry two projects, so an
 * explicit "Project 4" in the day's focus wins over the week lookup.
 */
export function projectForDay(focus: string, week: number): ProjectEntry | null {
  const n = focus.match(/Project (\d+)/i);
  if (n) {
    const byNumber = projects.find((p) => p.number === Number(n[1]));
    if (byNumber) return byNumber;
  }
  return projectForWeek(week);
}
