// Project specs captured from PROJECTS.md. If PROJECTS.md changes, update this file.

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
    title: "EDA + Statistical Analysis",
    weeks: [4, 5],
    weeksLabel: "Weeks 4–5",
    goal: "Show you can take a messy real dataset and extract a genuine, defensible insight — not just make plots.",
    deliverables: [
      "Data cleaning notebook (document every cleaning decision and why)",
      "5–8 visualizations that each answer a specific question, not decoration",
      "One statistical test that supports a real claim (e.g. \"X is significantly associated with Y, p < 0.05\") with a plain-English interpretation",
      "A written summary: 3 concrete findings, in prose, at the top of the README",
    ],
    stack: ["pandas", "matplotlib/seaborn", "scipy.stats"],
  },
  {
    id: "p2",
    number: 2,
    title: "End-to-End Classic ML Pipeline",
    weeks: [7, 8],
    weeksLabel: "Weeks 7–8",
    goal: "Show you can build a production-shaped ML pipeline, not just call `.fit()` in a notebook.",
    deliverables: [
      "A `sklearn.Pipeline` covering preprocessing → model, no manual leakage",
      "At least 3 model types compared with cross-validation, not just train/test split",
      "Hyperparameter tuning on the winning model, with before/after metrics",
      "The trained model served behind a Flask/FastAPI endpoint, containerized with Docker",
      "README includes a metrics table and a short \"why this model\" justification",
    ],
    stack: ["pandas", "scikit-learn", "XGBoost", "Flask/FastAPI", "Docker"],
  },
  {
    id: "p3",
    number: 3,
    title: "Computer Vision with Transfer Learning",
    weeks: [11, 12],
    weeksLabel: "Weeks 11–12",
    goal: "Show you can work with deep learning in PyTorch and use pretrained models effectively rather than training everything from zero.",
    deliverables: [
      "Baseline: a small CNN trained from scratch, with accuracy reported",
      "Improved: a pretrained backbone (e.g. ResNet18) fine-tuned on your data, with accuracy reported — the delta is the interesting result",
      "Confusion matrix + a few misclassified examples shown and briefly discussed",
      "Simple inference script or small Gradio/Streamlit demo",
    ],
    stack: ["PyTorch", "torchvision", "Gradio (optional)"],
  },
  {
    id: "p4",
    number: 4,
    title: "RAG / Agent GenAI App — Flagship",
    weeks: [14, 15],
    weeksLabel: "Weeks 14–15",
    goal: "The project that signals \"modern AI engineer,\" not just \"ML practitioner.\" Make it genuinely useful to you so you're motivated to polish it.",
    deliverables: [
      "A working RAG pipeline: ingestion → chunking → embeddings → vector store → retrieval → LLM generation with retrieved context",
      "At least one tool-use/agent capability beyond plain RAG",
      "Basic evaluation: test questions with expected answers or quality criteria, and how the app scores",
      "A simple UI (Streamlit/Gradio) so it's demoable, not just a CLI script",
      "Deployed and reachable at a public URL",
    ],
    stack: [
      "LLM API (Anthropic/OpenAI)",
      "LangChain or plain API calls",
      "Chroma/FAISS",
      "Streamlit/Gradio",
    ],
  },
  {
    id: "capstone",
    number: 5,
    title: "Capstone — Combined Project",
    weeks: [15],
    weeksLabel: "Week 15 (folded into Project 4)",
    goal: "One coherent application that ties classic ML and DL/GenAI together, showing you can architect a small system, not just individual models.",
    deliverables: [
      "1-page design spec written before you start building",
      "Working, deployed app",
      "Architecture diagram (even a simple one) in the README",
      "Short demo video or GIF",
      "A \"design decisions\" section: what you chose, what you rejected, and why",
    ],
    stack: ["Your pick — combine classic ML + DL/GenAI from earlier projects"],
  },
];

export function projectForWeek(week: number): ProjectEntry | null {
  return projects.find((p) => p.weeks.includes(week)) ?? null;
}
