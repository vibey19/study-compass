// Tracker reference data captured from Part C of CURRICULUM.md: the stage
// done-when checklists, DSA targets, from-scratch drills, interview prep,
// the dashboard rules and the certification list.
//
// Every `id` here is a storage key for the user's progress, so ids are
// stable: rename a label freely, but never change an id.

/* ------------------------------------------------------------------ C1 */

export type ChecklistStage = {
  stage: number;
  /** must match a phase name in data/curriculum.ts exactly */
  phase: string;
  items: string[];
};

export const stageChecklists: ChecklistStage[] = [
  {
    stage: 1,
    phase: "Python and Tools",
    items: [
      "All CS50P problem sets 0 to 9 finished and the final project submitted (free certificate)",
      "Can write a class, read/write a file, use a dict of lists and a list of dicts without looking anything up",
      "Can write and run pytest tests",
      "Can init a repo, commit, branch, merge, resolve a conflict and push without googling",
      "CLI tool project on GitHub with README and tests",
    ],
  },
  {
    stage: 2,
    phase: "Data, SQL and Math",
    items: [
      "Can load, clean, filter, group, merge and plot data in pandas without looking things up",
      "Can write SELECT, WHERE, GROUP BY, HAVING, JOINs and a window function in SQL without looking things up",
      "Understand array shapes and broadcasting in NumPy",
      "Can explain: dot product, matrix multiplication, cosine similarity, derivative, chain rule, gradient",
      "Can explain: mean, variance, normal distribution, conditional probability, Bayes rule, p-value",
      "Can explain: central limit theorem, z-test vs t-test, chi-square, type 1 vs type 2 error, confidence interval",
      "Can explain how you'd handle missing values, outliers, imbalance (incl. SMOTE) and categorical encoding",
      "Project 1 (EDA) on GitHub with 5 written findings",
    ],
  },
  {
    stage: 3,
    phase: "Classic Machine Learning",
    items: [
      "Can explain overfitting vs underfitting and bias vs variance out loud",
      "Can explain train/validation/test split and cross-validation, and why test data stays untouched",
      "Can pick and justify a metric: MAE/RMSE/R2 for regression, precision/recall/F1/ROC-AUC for classification",
      "Can explain data leakage with an example and how a Pipeline prevents it",
      "Can explain L1 vs L2 regularisation, decision trees (entropy vs gini), random forests, AdaBoost, gradient boosting, XGBoost, SVM and kernels, Naive Bayes, KNN, k-means, PCA at intuition level",
      "Linear regression, logistic regression and k-means written in NumPy from scratch",
      "Project 2 on GitHub with metrics table and model choice explained",
    ],
  },
  {
    stage: 4,
    phase: "Deep Learning and Transformers",
    items: [
      "Can write a PyTorch training loop from memory (dataset, dataloader, model, loss, optimizer, train, eval)",
      "Can explain backprop and the chain rule on paper using micrograd",
      "Can explain vanishing and exploding gradients, when to use which activation and loss function, and SGD vs momentum vs Adam",
      "Can explain why RNNs struggle with long sequences, what LSTM gates do, and why attention replaced them",
      "Can explain what a convolution does and why CNNs suit images",
      "Can explain transfer learning and when to use it",
      "Can explain self-attention (queries, keys, values) and a transformer block on paper",
      "Tiny GPT rebuilt without the video",
      "Project 3 on GitHub with baseline vs transfer learning results",
      "Project 4 (fine-tuned classifier) with baseline comparison",
      "CV, LinkedIn and GitHub ready, first applications sent",
    ],
  },
  {
    stage: 5,
    phase: "LLMs and RAG",
    items: [
      "Can explain tokens, embeddings, context window, temperature, fine-tuning vs prompting vs RAG",
      "Can explain how semantic search works and what a vector index does",
      "Can explain chunking choices and how you evaluate retrieval and answers",
      "Project 5 (RAG app) with evaluation results, one tool, and a UI",
      "AI-901 exam booked",
    ],
  },
  {
    stage: 6,
    phase: "MLOps and Cloud",
    items: [
      "Can write a Dockerfile and a FastAPI endpoint from scratch (first done in Week 5)",
      "Can explain what MLflow tracks and why experiment tracking matters",
      "CI runs tests and builds on every push",
      "One project live on Azure with a public URL",
      "Can explain data drift and how you'd monitor a model or LLM app in production",
      "Can explain the deploy path of your project end to end",
    ],
  },
  {
    stage: 7,
    phase: "Portfolio and Job Hunt",
    items: [
      "3 best projects each have a README with numbers, a live link or demo, and how to run it",
      "CV final, one page, two role-specific versions",
      "Recorded 10-minute walkthrough for each top project",
      "5 STAR stories written",
      "At least 25 applications sent and every one followed up",
      "AI-901 taken",
    ],
  },
];

export function checklistForPhase(phase: string): ChecklistStage | null {
  return stageChecklists.find((s) => s.phase === phase) ?? null;
}

/** Storage key for one checklist item. */
export function checklistKey(stage: number, index: number): string {
  return `stage${stage}#${index}`;
}

/* ------------------------------------------------------------------ C3 */

export type DsaPattern = { id: string; name: string; target: number };

/** Targets sum to DSA_TOTAL_TARGET. DSA runs from Week 4. */
export const dsaPatterns: DsaPattern[] = [
  { id: "arrays-hashing", name: "Arrays & Hashing", target: 12 },
  { id: "two-pointers", name: "Two Pointers", target: 8 },
  { id: "sliding-window", name: "Sliding Window", target: 6 },
  { id: "stack", name: "Stack", target: 6 },
  { id: "binary-search", name: "Binary Search", target: 8 },
  { id: "linked-list", name: "Linked List", target: 8 },
  { id: "trees", name: "Trees", target: 12 },
  { id: "heap", name: "Heap / Priority Queue", target: 4 },
  { id: "mixed", name: "Mixed review", target: 6 },
];

export const DSA_TOTAL_TARGET = dsaPatterns.reduce((n, p) => n + p.target, 0);

export const DSA_METHOD =
  "Try 20 minutes, read the solution, re-solve from scratch the next day. Only the re-solve counts.";

export const DSA_SKIP = "Skip for now: hard DP, advanced graphs, tries, bit manipulation.";

export const DSA_DIFFICULTIES = ["Easy", "Medium"] as const;
export type DsaDifficulty = (typeof DSA_DIFFICULTIES)[number];

/* ------------------------------------------------------------------ C4 */

export type ScratchItem = {
  id: string;
  name: string;
  /** week it's planned for; null for the bonus buffer-day drills */
  week: number | null;
  weekLabel: string;
};

export const scratchItems: ScratchItem[] = [
  { id: "cosine-similarity", name: "Cosine similarity + vector norm", week: 3, weekLabel: "Week 3" },
  { id: "numerical-derivative", name: "Numerical derivative", week: 3, weekLabel: "Week 3" },
  { id: "linear-regression", name: "Linear regression with gradient descent", week: 4, weekLabel: "Week 4" },
  { id: "logistic-regression", name: "Logistic regression", week: 4, weekLabel: "Week 4" },
  { id: "k-means", name: "k-means", week: 5, weekLabel: "Week 5" },
  { id: "softmax-ce", name: "Softmax + cross-entropy loss", week: 6, weekLabel: "Week 6" },
  { id: "attention", name: "Scaled dot-product attention", week: 7, weekLabel: "Week 7" },
  { id: "knn", name: "k-nearest neighbours", week: null, weekLabel: "Bonus · buffer day" },
  { id: "pca-svd", name: "PCA via SVD", week: null, weekLabel: "Bonus · buffer day" },
];

export const SCRATCH_RULE = "No sklearn, no PyTorch — plain NumPy only.";

/* ------------------------------------------------------------------ C5 */

export type TheoryQuestion = { id: string; question: string };

/** Tick when you can explain it out loud in 2 minutes. */
export const theoryQuestions: TheoryQuestion[] = [
  { id: "overfitting", question: "What is overfitting and how do you detect and fix it?" },
  { id: "bias-variance", question: "Bias vs variance trade-off" },
  { id: "cross-validation", question: "Why cross-validation instead of one split?" },
  { id: "leakage", question: "What is data leakage? Give an example." },
  { id: "precision-recall", question: "Precision vs recall: when do you care more about each?" },
  { id: "roc-auc", question: "What does ROC-AUC measure?" },
  { id: "l1-l2", question: "L1 vs L2 regularisation" },
  { id: "trees-forests", question: "How does a decision tree split? Why do random forests help?" },
  { id: "bagging-boosting", question: "Bagging vs boosting" },
  { id: "gradient-descent", question: "How does gradient descent work? What does the learning rate do?" },
  { id: "backprop", question: "What is backpropagation?" },
  { id: "activations", question: "Why do we need activation functions?" },
  { id: "batchnorm-dropout", question: "What do batch norm and dropout do?" },
  { id: "cnn", question: "What is a CNN good at and why?" },
  { id: "self-attention", question: "Explain self-attention" },
  { id: "encoder-decoder", question: "Encoder vs decoder models" },
  { id: "embedding", question: "What is an embedding?" },
  { id: "ft-vs-prompt-vs-rag", question: "Fine-tuning vs prompting vs RAG: when to use which?" },
  { id: "rag-eval", question: "How do you evaluate a RAG system?" },
  { id: "class-imbalance", question: "How do you handle class imbalance?" },
  { id: "drift", question: "What is data drift and how do you monitor it?" },
  { id: "deploy-api", question: "How would you deploy a model behind an API?" },
  { id: "experiment-tracking", question: "What does experiment tracking give you?" },
  { id: "best-project", question: "Walk me through your best project and what you'd change" },
];

/* ------------------------------------------------------------------ C6 */

export type StarPrompt = { id: string; prompt: string };

export const starPrompts: StarPrompt[] = [
  { id: "conflict", prompt: "A time you had a conflict or disagreement in a team" },
  { id: "failure", prompt: "A time you failed or made a mistake" },
  { id: "deadline", prompt: "A time you worked under a tight deadline" },
  { id: "learn-fast", prompt: "A time you had to learn something new fast" },
  { id: "proud", prompt: "A project you're proud of and your exact part in it" },
];

export const MOCK_TYPES = [
  "Coding",
  "ML theory",
  "System design",
  "Behavioural",
  "Take-home",
] as const;
export type MockType = (typeof MOCK_TYPES)[number];

/* ------------------------------------------------------------------ C7 */

export const rules: string[] = [
  "Max about 1.5 hours of real watching a day (bootcamp at 1.75x, code-alongs at normal speed). The rest is typing.",
  "Watch and type along once, rebuild from a blank file the next day. Only the rebuild counts.",
  "Watching at 1.75x buys you more topics, not less coding. Never cut the coding blocks to watch more.",
  "AI autocomplete off in learning repos. AI can explain or review code you wrote, never write it.",
  "No commit, no credit. Every day needs a proof link.",
  "Don't start the next stage until the done-when checklist is ticked.",
  "Weekly review: paste your repo to Claude for an honest check.",
  "Start applying in Week 7. Don't wait until you feel ready.",
  "Saturdays are the heavy day. If a weekday gets eaten by TA work or classes, push it, don't skip it.",
];

/* ------------------------------------------------------------------ C8 */

export const CERT_GROUPS = [
  { id: "free", label: "Free, earned along the way", note: "No extra time — they fall out of the course work." },
  { id: "optional", label: "Optional, quick", note: "" },
  { id: "paid", label: "Paid — one only during the plan", note: "" },
  { id: "after", label: "After the plan (January)", note: "Pick one depending on which way you lean." },
] as const;

export type CertGroup = (typeof CERT_GROUPS)[number]["id"];

export type CertEntry = {
  id: string;
  name: string;
  group: CertGroup;
  /** planned week, or null when it isn't tied to one */
  plannedWeek: number | null;
  plannedLabel: string;
  /** certs sharing a cvGroup collapse into one line on the CV */
  cvGroup?: string;
  note?: string;
};

export const certifications: CertEntry[] = [
  {
    id: "cs50p",
    name: "CS50P free CS50 Certificate (Harvard)",
    group: "free",
    plannedWeek: 2,
    plannedLabel: "Week 2",
    note: "Submit the final project. Pick the free option, not the paid edX verified certificate — start from cs50.harvard.edu/python and register on edX on the free track.",
  },
  { id: "kaggle-pandas", name: "Kaggle Learn Pandas", group: "free", plannedWeek: 3, plannedLabel: "Week 3", cvGroup: "Kaggle Learn" },
  { id: "kaggle-dataviz", name: "Kaggle Learn Data Visualization", group: "free", plannedWeek: 3, plannedLabel: "Week 3", cvGroup: "Kaggle Learn" },
  { id: "kaggle-sql", name: "Kaggle Learn Intro to SQL", group: "free", plannedWeek: 3, plannedLabel: "Week 3", cvGroup: "Kaggle Learn" },
  { id: "kaggle-intro-ml", name: "Kaggle Learn Intro to Machine Learning", group: "free", plannedWeek: 4, plannedLabel: "Week 4", cvGroup: "Kaggle Learn" },
  { id: "kaggle-adv-sql", name: "Kaggle Learn Advanced SQL", group: "free", plannedWeek: 4, plannedLabel: "Week 4", cvGroup: "Kaggle Learn" },
  { id: "kaggle-inter-ml", name: "Kaggle Learn Intermediate Machine Learning", group: "free", plannedWeek: 4, plannedLabel: "Week 4", cvGroup: "Kaggle Learn" },
  {
    id: "hackerrank-sql",
    name: "HackerRank SQL skills test (Basic or Intermediate)",
    group: "optional",
    plannedWeek: null,
    plannedLabel: "Any buffer day",
  },
  {
    id: "ai-901",
    name: "Microsoft AI-901 Azure AI Fundamentals",
    group: "paid",
    plannedWeek: 8,
    plannedLabel: "Book Week 8",
    note: "Take it on Dec 12 or 13.",
  },
  {
    id: "ai-103",
    name: "Microsoft AI-103 (Azure AI Apps and Agents Developer Associate)",
    group: "after",
    plannedWeek: null,
    plannedLabel: "January",
    note: "If leaning applied AI.",
  },
  {
    id: "ai-300",
    name: "Microsoft AI-300 (MLOps Engineer Associate)",
    group: "after",
    plannedWeek: null,
    plannedLabel: "January",
    note: "If leaning MLOps.",
  },
];

export const CV_RULE =
  "Group the Kaggle ones in one line. Max 4 lines in the Certifications section.";

export const CERT_STATUSES = ["planned", "in-progress", "earned"] as const;
export type CertStatus = (typeof CERT_STATUSES)[number];

/* --------------------------------------------------- Applications (A6.5) */

export const APPLICATION_TYPES = [
  "Full-time",
  "Thesis",
  "Internship",
  "Part-time",
] as const;
export type ApplicationType = (typeof APPLICATION_TYPES)[number];

export const APPLICATION_STATUSES = [
  "to apply",
  "applied",
  "interview",
  "take-home",
  "offer",
  "rejected",
  "no reply",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

/** Target from the Stage 7 checklist. */
export const APPLICATION_TARGET = 25;
