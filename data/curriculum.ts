// AUTO-GENERATED from CURRICULUM.md by scripts/generate-curriculum.mjs.
// Do not edit by hand — edit CURRICULUM.md and run `npm run generate`.

export type DayEntry = {
  id: string; // e.g. "w01-d01"
  week: number; // 1-17
  dayOfWeek: number; // 1-7 (7 = rest day)
  date: string; // ISO date, e.g. "2026-07-20"
  phase: string;
  focus: string;
  tasks: string; // markdown-ish text (**bold**, `code`)
  resources: string[];
  isRestDay: boolean;
  isProjectDay: boolean; // marked [P] in the curriculum
};

export type WeekEntry = {
  week: number;
  title: string;
  phase: string;
  dateRange: string;
  days: DayEntry[];
};

export const PHASE_NAMES: string[] = [
  "Python Foundations",
  "Data Science Toolkit",
  "Classic Machine Learning",
  "Deployment & MLOps",
  "NLP",
  "Deep Learning",
  "Transformers & GenAI",
  "LLM Engineering",
  "Capstone & Polish"
];

export const roadmap: WeekEntry[] = [
  {
    "week": 1,
    "title": "Python Fundamentals I",
    "phase": "Python Foundations",
    "dateRange": "Jul 20–26",
    "days": [
      {
        "id": "w01-d01",
        "week": 1,
        "dayOfWeek": 1,
        "date": "2026-07-20",
        "phase": "Python Foundations",
        "focus": "Course setup + syntax",
        "tasks": "Watch (1h 51m): Welcome, Course Materials & Setup, then Python Basics; Set up Anaconda env + VS Code exactly as the course does; Practice (2.5h): scripts using variables, data types, operators",
        "resources": [
          "Udemy — Welcome, Course Materials & Setup (46m)",
          "Udemy — Python Basics (1h 5m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w01-d02",
        "week": 1,
        "dayOfWeek": 2,
        "date": "2026-07-21",
        "phase": "Python Foundations",
        "focus": "Control flow",
        "tasks": "Watch (49m): Control Flow — if/elif/else, loops; Practice (3h): 15–20 loop/conditional problems solved without peeking at solutions",
        "resources": [
          "Udemy — Control Flow (49m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w01-d03",
        "week": 1,
        "dayOfWeek": 3,
        "date": "2026-07-22",
        "phase": "Python Foundations",
        "focus": "Data structures",
        "tasks": "Watch (2h 10m): Lists, Tuples, Sets, Dictionaries; Practice (2.5h): slicing, comprehensions, nested-structure exercises",
        "resources": [
          "Udemy — Lists, Tuples, Sets, Dictionaries (2h 10m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w01-d04",
        "week": 1,
        "dayOfWeek": 4,
        "date": "2026-07-23",
        "phase": "Python Foundations",
        "focus": "Functions",
        "tasks": "Watch (1h 22m): Functions — lambda, map, filter; Practice (3h): rewrite earlier exercises as functions, lambda/map/filter drills",
        "resources": [
          "Udemy — Functions (1h 22m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w01-d05",
        "week": 1,
        "dayOfWeek": 5,
        "date": "2026-07-24",
        "phase": "Python Foundations",
        "focus": "Practice day",
        "tasks": "Work through the Python Practice Problems section end to end (2–4h); Redo the hardest ones from memory (1h)",
        "resources": [
          "Udemy — Python Practice Problems (2–4 hrs)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w01-d06",
        "week": 1,
        "dayOfWeek": 6,
        "date": "2026-07-25",
        "phase": "Python Foundations",
        "focus": "Modules, files & errors",
        "tasks": "Watch (1h 26m): Modules & Packages, File Handling, Exception Handling; Practice (3h): build a small CLI tool that reads/writes files with proper error handling",
        "resources": [
          "Udemy — Modules & Packages (35m)",
          "Udemy — File Handling (26m)",
          "Udemy — Exception Handling (25m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w01-d07",
        "week": 1,
        "dayOfWeek": 7,
        "date": "2026-07-26",
        "phase": "Python Foundations",
        "focus": "Rest",
        "tasks": "Light review of notes only",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 2,
    "title": "Python Fundamentals II + Web Frameworks",
    "phase": "Python Foundations",
    "dateRange": "Jul 27–Aug 2",
    "days": [
      {
        "id": "w02-d01",
        "week": 2,
        "dayOfWeek": 1,
        "date": "2026-07-27",
        "phase": "Python Foundations",
        "focus": "OOP",
        "tasks": "Watch (1h 33m): OOP — classes, inheritance, polymorphism, encapsulation, abstraction; Practice (3h): model a small domain (library, bank) with classes",
        "resources": [
          "Udemy — Object-Oriented Programming (1h 33m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w02-d02",
        "week": 2,
        "dayOfWeek": 2,
        "date": "2026-07-28",
        "phase": "Python Foundations",
        "focus": "Advanced Python",
        "tasks": "Watch (1h 24m): magic methods, operator overloading, custom exceptions, iterators, generators, decorators, closures; Practice (3h): write one example of each from scratch",
        "resources": [
          "Udemy — Advanced Python (1h 24m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w02-d03",
        "week": 2,
        "dayOfWeek": 3,
        "date": "2026-07-29",
        "phase": "Python Foundations",
        "focus": "Runtime topics",
        "tasks": "Watch (1h 44m): Logging, Multithreading & Multiprocessing, Memory Management; Practice (2.5h): add logging to the week-1 CLI tool, parallelize a slow script",
        "resources": [
          "Udemy — Logging (27m)",
          "Udemy — Multithreading & Multiprocessing (56m)",
          "Udemy — Memory Management & Garbage Collection (21m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w02-d04",
        "week": 2,
        "dayOfWeek": 4,
        "date": "2026-07-30",
        "phase": "Python Foundations",
        "focus": "Git & GitHub",
        "tasks": "Watch (50m): Git & GitHub; Practice (3h): set up your portfolio repo convention, branches, PRs, write a proper README",
        "resources": [
          "Udemy — Git & GitHub (50m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w02-d05",
        "week": 2,
        "dayOfWeek": 5,
        "date": "2026-07-31",
        "phase": "Python Foundations",
        "focus": "Flask",
        "tasks": "Watch (1h 36m): Flask Framework; Practice (3h): extend the course app with 2–3 routes of your own",
        "resources": [
          "Udemy — Flask Framework (1h 36m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w02-d06",
        "week": 2,
        "dayOfWeek": 6,
        "date": "2026-08-01",
        "phase": "Python Foundations",
        "focus": "Streamlit",
        "tasks": "Watch (26m): Streamlit; Practice (3.5h): build a small Streamlit dashboard; Push the week's work to GitHub",
        "resources": [
          "Udemy — Streamlit (26m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w02-d07",
        "week": 2,
        "dayOfWeek": 7,
        "date": "2026-08-02",
        "phase": "Python Foundations",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 3,
    "title": "NumPy, Pandas & Statistics I",
    "phase": "Data Science Toolkit",
    "dateRange": "Aug 3–9",
    "days": [
      {
        "id": "w03-d01",
        "week": 3,
        "dayOfWeek": 1,
        "date": "2026-08-03",
        "phase": "Data Science Toolkit",
        "focus": "NumPy",
        "tasks": "Watch (28m): NumPy; Practice (3.5h): arrays, indexing, broadcasting, vectorized ops (numpy-100-style exercises)",
        "resources": [
          "Udemy — NumPy (28m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w03-d02",
        "week": 3,
        "dayOfWeek": 2,
        "date": "2026-08-04",
        "phase": "Data Science Toolkit",
        "focus": "Pandas",
        "tasks": "Watch (1h 9m): Pandas; Practice (3h): load a real CSV — selection, groupby, merge, pivot",
        "resources": [
          "Udemy — Pandas (1h 9m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w03-d03",
        "week": 3,
        "dayOfWeek": 3,
        "date": "2026-08-05",
        "phase": "Data Science Toolkit",
        "focus": "Visualization",
        "tasks": "Watch (49m): Data Visualization — Matplotlib & Seaborn; Practice (3h): reproduce 6–8 plot types on a real dataset",
        "resources": [
          "Udemy — Data Visualization (49m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w03-d04",
        "week": 3,
        "dayOfWeek": 4,
        "date": "2026-08-06",
        "phase": "Data Science Toolkit",
        "focus": "SQLite",
        "tasks": "Watch (17m): SQLite with Python; Practice (3h): design a small schema, query via sqlite3 and pandas.read_sql",
        "resources": [
          "Udemy — SQLite with Python (17m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w03-d05",
        "week": 3,
        "dayOfWeek": 5,
        "date": "2026-08-07",
        "phase": "Data Science Toolkit",
        "focus": "Statistics 1/4",
        "tasks": "Watch (≈1h 50m): Statistics for ML — descriptive stats, distributions; Practice (2.5h): compute and verify everything in NumPy",
        "resources": [
          "Udemy — Statistics for Machine Learning (7h 30m, part 1/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w03-d06",
        "week": 3,
        "dayOfWeek": 6,
        "date": "2026-08-08",
        "phase": "Data Science Toolkit",
        "focus": "Statistics 2/4",
        "tasks": "Watch (≈1h 50m): probability, sampling, central limit theorem; Practice (2.5h): simulate distributions and sampling in code",
        "resources": [
          "Udemy — Statistics for Machine Learning (part 2/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w03-d07",
        "week": 3,
        "dayOfWeek": 7,
        "date": "2026-08-09",
        "phase": "Data Science Toolkit",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 4,
    "title": "Statistics II, EDA + Project 1",
    "phase": "Data Science Toolkit",
    "dateRange": "Aug 10–16",
    "days": [
      {
        "id": "w04-d01",
        "week": 4,
        "dayOfWeek": 1,
        "date": "2026-08-10",
        "phase": "Data Science Toolkit",
        "focus": "Statistics 3/4",
        "tasks": "Watch (≈1h 50m): hypothesis testing, p-values, confidence intervals; Practice (2.5h): run t-tests and chi-square on real data with scipy.stats",
        "resources": [
          "Udemy — Statistics for Machine Learning (part 3/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w04-d02",
        "week": 4,
        "dayOfWeek": 2,
        "date": "2026-08-11",
        "phase": "Data Science Toolkit",
        "focus": "Statistics 4/4",
        "tasks": "Watch (≈1h 50m): ANOVA, correlation, remaining topics — finish the section; Practice (2.5h): make a one-page stats cheat sheet",
        "resources": [
          "Udemy — Statistics for Machine Learning (part 4/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w04-d03",
        "week": 4,
        "dayOfWeek": 3,
        "date": "2026-08-12",
        "phase": "Data Science Toolkit",
        "focus": "Feature engineering 1/2",
        "tasks": "Watch (≈1h 15m): FE & EDA — missing values, encoding, scaling; Practice (2.5h): apply to a genuinely messy dataset",
        "resources": [
          "Udemy — Feature Engineering & EDA (2h 30m, part 1/2)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w04-d04",
        "week": 4,
        "dayOfWeek": 4,
        "date": "2026-08-13",
        "phase": "Data Science Toolkit",
        "focus": "EDA workflow 2/2",
        "tasks": "Watch (≈1h 15m): outliers + full EDA workflow — finish the section; Practice (2.5h): full EDA pass on a fresh dataset",
        "resources": [
          "Udemy — Feature Engineering & EDA (part 2/2)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w04-d05",
        "week": 4,
        "dayOfWeek": 5,
        "date": "2026-08-14",
        "phase": "Data Science Toolkit",
        "focus": "Project 1",
        "tasks": "Pick a dataset; Clean it, documenting every decision; Start EDA",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w04-d06",
        "week": 4,
        "dayOfWeek": 6,
        "date": "2026-08-15",
        "phase": "Data Science Toolkit",
        "focus": "Project 1",
        "tasks": "Deepen the analysis; Produce 5–8 purposeful visualizations; Run one statistical test that supports a real claim",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w04-d07",
        "week": 4,
        "dayOfWeek": 7,
        "date": "2026-08-16",
        "phase": "Data Science Toolkit",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 5,
    "title": "Regression",
    "phase": "Classic Machine Learning",
    "dateRange": "Aug 17–23",
    "days": [
      {
        "id": "w05-d01",
        "week": 5,
        "dayOfWeek": 1,
        "date": "2026-08-17",
        "phase": "Classic Machine Learning",
        "focus": "Project 1 wrap",
        "tasks": "Write 3 concrete findings in the README; Polish the notebook; Publish the repo",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w05-d02",
        "week": 5,
        "dayOfWeek": 2,
        "date": "2026-08-18",
        "phase": "Classic Machine Learning",
        "focus": "ML fundamentals",
        "tasks": "Watch (1h): Machine Learning Fundamentals; Practice (3h): sklearn workflow — train/test split, fit/predict/score on 2 datasets",
        "resources": [
          "Udemy — Machine Learning Fundamentals (1h)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w05-d03",
        "week": 5,
        "dayOfWeek": 3,
        "date": "2026-08-19",
        "phase": "Classic Machine Learning",
        "focus": "Linear regression 1/4",
        "tasks": "Watch (≈1h 45m): simple & multiple linear regression, OLS; Practice (2.5h): fit and interpret coefficients on a real dataset",
        "resources": [
          "Udemy — Linear Regression (7h, part 1/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w05-d04",
        "week": 5,
        "dayOfWeek": 4,
        "date": "2026-08-20",
        "phase": "Classic Machine Learning",
        "focus": "Linear regression 2/4",
        "tasks": "Watch (≈1h 45m): gradient descent, assumptions, R²/RMSE; Practice (2.5h): implement linear regression + gradient descent from scratch in NumPy",
        "resources": [
          "Udemy — Linear Regression (part 2/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w05-d05",
        "week": 5,
        "dayOfWeek": 5,
        "date": "2026-08-21",
        "phase": "Classic Machine Learning",
        "focus": "Linear regression 3/4",
        "tasks": "Watch (≈1h 45m): polynomial regression, Ridge, Lasso, ElasticNet; Practice (2.5h): compare regularization methods on one dataset",
        "resources": [
          "Udemy — Linear Regression (part 3/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w05-d06",
        "week": 5,
        "dayOfWeek": 6,
        "date": "2026-08-22",
        "phase": "Classic Machine Learning",
        "focus": "Linear regression 4/4",
        "tasks": "Watch (≈1h 45m): end-to-end regression project — finish the section; Practice (2.5h): repeat the project solo on a different dataset",
        "resources": [
          "Udemy — Linear Regression (part 4/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w05-d07",
        "week": 5,
        "dayOfWeek": 7,
        "date": "2026-08-23",
        "phase": "Classic Machine Learning",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 6,
    "title": "Classification & Ensembles",
    "phase": "Classic Machine Learning",
    "dateRange": "Aug 24–30",
    "days": [
      {
        "id": "w06-d01",
        "week": 6,
        "dayOfWeek": 1,
        "date": "2026-08-24",
        "phase": "Classic Machine Learning",
        "focus": "Logistic regression",
        "tasks": "Watch (2h): Logistic Regression; Practice (2.5h): binary classifier with precision/recall/F1/ROC-AUC evaluation",
        "resources": [
          "Udemy — Logistic Regression (2h)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w06-d02",
        "week": 6,
        "dayOfWeek": 2,
        "date": "2026-08-25",
        "phase": "Classic Machine Learning",
        "focus": "SVM",
        "tasks": "Watch (2h): Support Vector Machines; Practice (2.5h): compare kernels on a nonlinear dataset",
        "resources": [
          "Udemy — Support Vector Machines (2h)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w06-d03",
        "week": 6,
        "dayOfWeek": 3,
        "date": "2026-08-26",
        "phase": "Classic Machine Learning",
        "focus": "Naive Bayes + KNN",
        "tasks": "Watch (1h 33m): Naive Bayes, then K-Nearest Neighbors; Practice (3h): compare NB, KNN and logistic on one dataset",
        "resources": [
          "Udemy — Naive Bayes (56m)",
          "Udemy — K-Nearest Neighbors (37m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w06-d04",
        "week": 6,
        "dayOfWeek": 4,
        "date": "2026-08-27",
        "phase": "Classic Machine Learning",
        "focus": "Decision trees",
        "tasks": "Watch (1h 28m): Decision Trees; Practice (3h): visualize a tree, control overfitting with depth/pruning",
        "resources": [
          "Udemy — Decision Trees (1h 28m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w06-d05",
        "week": 6,
        "dayOfWeek": 5,
        "date": "2026-08-28",
        "phase": "Classic Machine Learning",
        "focus": "Random Forest + AdaBoost",
        "tasks": "Watch (2h 5m): Random Forest, then AdaBoost; Practice (2.5h): feature importances, compare against a single tree",
        "resources": [
          "Udemy — Random Forest (1h 10m)",
          "Udemy — AdaBoost (55m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w06-d06",
        "week": 6,
        "dayOfWeek": 6,
        "date": "2026-08-29",
        "phase": "Classic Machine Learning",
        "focus": "Boosting + XGBoost",
        "tasks": "Watch (1h 38m): Gradient Boosting, then XGBoost; Practice (3h): tune XGBoost on a Kaggle-style dataset",
        "resources": [
          "Udemy — Gradient Boosting (34m)",
          "Udemy — XGBoost (1h 4m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w06-d07",
        "week": 6,
        "dayOfWeek": 7,
        "date": "2026-08-30",
        "phase": "Classic Machine Learning",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 7,
    "title": "Unsupervised Learning + Project 2",
    "phase": "Classic Machine Learning",
    "dateRange": "Aug 31–Sep 6",
    "days": [
      {
        "id": "w07-d01",
        "week": 7,
        "dayOfWeek": 1,
        "date": "2026-08-31",
        "phase": "Classic Machine Learning",
        "focus": "Unsupervised 1/2",
        "tasks": "Watch (≈1h 50m): PCA, K-Means; Practice (2.5h): cluster and reduce a real dataset, elbow + silhouette",
        "resources": [
          "Udemy — Unsupervised Learning (3h 45m, part 1/2)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w07-d02",
        "week": 7,
        "dayOfWeek": 2,
        "date": "2026-09-01",
        "phase": "Classic Machine Learning",
        "focus": "Unsupervised 2/2",
        "tasks": "Watch (≈1h 55m): Hierarchical, DBSCAN, Isolation Forest, LOF — finish the section; Practice (2.5h): anomaly-detection exercise",
        "resources": [
          "Udemy — Unsupervised Learning (part 2/2)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w07-d03",
        "week": 7,
        "dayOfWeek": 3,
        "date": "2026-09-02",
        "phase": "Classic Machine Learning",
        "focus": "Project 2",
        "tasks": "Pick a supervised problem with a clear metric; Scope it; Build a clean sklearn Pipeline (preprocessing → model)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w07-d04",
        "week": 7,
        "dayOfWeek": 4,
        "date": "2026-09-03",
        "phase": "Classic Machine Learning",
        "focus": "Project 2",
        "tasks": "Compare 3+ model types with cross-validation; Tune the winner; Record before/after metrics",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w07-d05",
        "week": 7,
        "dayOfWeek": 5,
        "date": "2026-09-04",
        "phase": "Classic Machine Learning",
        "focus": "Project 2",
        "tasks": "Finalize the best model; Metrics table + \"why this model\" in the README; Publish",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w07-d06",
        "week": 7,
        "dayOfWeek": 6,
        "date": "2026-09-05",
        "phase": "Classic Machine Learning",
        "focus": "Algorithm review",
        "tasks": "Build an algorithm cheat sheet: when to use what, key hyperparameters; Redo your 2 weakest topics",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w07-d07",
        "week": 7,
        "dayOfWeek": 7,
        "date": "2026-09-06",
        "phase": "Classic Machine Learning",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 8,
    "title": "Docker & AWS Deployment",
    "phase": "Deployment & MLOps",
    "dateRange": "Sep 7–13",
    "days": [
      {
        "id": "w08-d01",
        "week": 8,
        "dayOfWeek": 1,
        "date": "2026-09-07",
        "phase": "Deployment & MLOps",
        "focus": "Docker 1/2",
        "tasks": "Watch (≈50m): images, containers, Dockerfile; Practice (3h): containerize your week-2 Flask app",
        "resources": [
          "Udemy — Docker (1h 40m, part 1/2)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w08-d02",
        "week": 8,
        "dayOfWeek": 2,
        "date": "2026-09-08",
        "phase": "Deployment & MLOps",
        "focus": "Docker 2/2",
        "tasks": "Watch (≈50m): compose, registries — finish the section; Practice (3h): docker-compose the Flask app with a DB, push the image",
        "resources": [
          "Udemy — Docker (part 2/2)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w08-d03",
        "week": 8,
        "dayOfWeek": 3,
        "date": "2026-09-09",
        "phase": "Deployment & MLOps",
        "focus": "End-to-end ML 1/2",
        "tasks": "Watch (≈2h): End-to-End ML Project & AWS Deployment — part 1; Code along (2.5h)",
        "resources": [
          "Udemy — End-to-End ML Project & AWS Deployment (4h, part 1/2)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w08-d04",
        "week": 8,
        "dayOfWeek": 4,
        "date": "2026-09-10",
        "phase": "Deployment & MLOps",
        "focus": "End-to-end ML 2/2",
        "tasks": "Watch (≈2h): finish the section — AWS deployment; Code along (2.5h): get the course project live",
        "resources": [
          "Udemy — End-to-End ML Project & AWS Deployment (part 2/2)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w08-d05",
        "week": 8,
        "dayOfWeek": 5,
        "date": "2026-09-11",
        "phase": "Deployment & MLOps",
        "focus": "Project 2 serving",
        "tasks": "Serve Project 2's model behind a Flask/FastAPI endpoint; Containerize with Docker; Test locally",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w08-d06",
        "week": 8,
        "dayOfWeek": 6,
        "date": "2026-09-12",
        "phase": "Deployment & MLOps",
        "focus": "Project 2 deploy",
        "tasks": "Deploy the container to AWS (or a free tier host); End-to-end test; Add the live URL to the README",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w08-d07",
        "week": 8,
        "dayOfWeek": 7,
        "date": "2026-09-13",
        "phase": "Deployment & MLOps",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 9,
    "title": "MLOps Pipeline",
    "phase": "Deployment & MLOps",
    "dateRange": "Sep 14–20",
    "days": [
      {
        "id": "w09-d01",
        "week": 9,
        "dayOfWeek": 1,
        "date": "2026-09-14",
        "phase": "Deployment & MLOps",
        "focus": "ETL + MongoDB",
        "tasks": "Watch (≈1h 20m): MLOps — MongoDB + ETL pipeline; Code along (3h)",
        "resources": [
          "Udemy — MLOps Pipeline (8h, part 1/6)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w09-d02",
        "week": 9,
        "dayOfWeek": 2,
        "date": "2026-09-15",
        "phase": "Deployment & MLOps",
        "focus": "MLflow",
        "tasks": "Watch (≈1h 20m): experiment tracking with MLflow; Practice (3h): track Project 2 experiments retroactively",
        "resources": [
          "Udemy — MLOps Pipeline (part 2/6)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w09-d03",
        "week": 9,
        "dayOfWeek": 3,
        "date": "2026-09-16",
        "phase": "Deployment & MLOps",
        "focus": "DVC + S3",
        "tasks": "Watch (≈1h 20m): data/model versioning with DVC + AWS S3; Code along (3h)",
        "resources": [
          "Udemy — MLOps Pipeline (part 3/6)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w09-d04",
        "week": 9,
        "dayOfWeek": 4,
        "date": "2026-09-17",
        "phase": "Deployment & MLOps",
        "focus": "CI/CD",
        "tasks": "Watch (≈1h 20m): GitHub Actions; Practice (3h): add lint + test CI to the Project 2 repo",
        "resources": [
          "Udemy — MLOps Pipeline (part 4/6)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w09-d05",
        "week": 9,
        "dayOfWeek": 5,
        "date": "2026-09-18",
        "phase": "Deployment & MLOps",
        "focus": "EC2 deployment",
        "tasks": "Watch (≈1h 20m): deploying on EC2; Code along (3h)",
        "resources": [
          "Udemy — MLOps Pipeline (part 5/6)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w09-d06",
        "week": 9,
        "dayOfWeek": 6,
        "date": "2026-09-19",
        "phase": "Deployment & MLOps",
        "focus": "BentoML + wrap-up",
        "tasks": "Watch (≈1h 20m): BentoML — finish the section; Practice (3h): diagram the full pipeline and note what each tool solves",
        "resources": [
          "Udemy — MLOps Pipeline (part 6/6)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w09-d07",
        "week": 9,
        "dayOfWeek": 7,
        "date": "2026-09-20",
        "phase": "Deployment & MLOps",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 10,
    "title": "Traditional NLP",
    "phase": "NLP",
    "dateRange": "Sep 21–27",
    "days": [
      {
        "id": "w10-d01",
        "week": 10,
        "dayOfWeek": 1,
        "date": "2026-09-21",
        "phase": "NLP",
        "focus": "Text preprocessing",
        "tasks": "Watch (≈1h 10m): tokenization, stemming, lemmatization, stopwords; Practice (2.5h): NLTK preprocessing pipeline",
        "resources": [
          "Udemy — Natural Language Processing (5h 45m, part 1/5)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w10-d02",
        "week": 10,
        "dayOfWeek": 2,
        "date": "2026-09-22",
        "phase": "NLP",
        "focus": "BoW & TF-IDF",
        "tasks": "Watch (≈1h 10m): Bag of Words, n-grams, TF-IDF; Practice (2.5h): vectorize a text dataset both ways and compare",
        "resources": [
          "Udemy — Natural Language Processing (part 2/5)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w10-d03",
        "week": 10,
        "dayOfWeek": 3,
        "date": "2026-09-23",
        "phase": "NLP",
        "focus": "Word embeddings",
        "tasks": "Watch (≈1h 10m): word2vec, average word2vec; Practice (2.5h): train/use embeddings, nearest-neighbor words",
        "resources": [
          "Udemy — Natural Language Processing (part 3/5)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w10-d04",
        "week": 10,
        "dayOfWeek": 4,
        "date": "2026-09-24",
        "phase": "NLP",
        "focus": "Text classification",
        "tasks": "Watch (≈1h 10m): text classification with classic ML; Practice (2.5h): spam or sentiment classifier v1",
        "resources": [
          "Udemy — Natural Language Processing (part 4/5)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w10-d05",
        "week": 10,
        "dayOfWeek": 5,
        "date": "2026-09-25",
        "phase": "NLP",
        "focus": "NLP wrap",
        "tasks": "Watch (≈1h 5m): finish the NLP section; Practice (3h): improve the classifier — TF-IDF + best model, error analysis",
        "resources": [
          "Udemy — Natural Language Processing (part 5/5)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w10-d06",
        "week": 10,
        "dayOfWeek": 6,
        "date": "2026-09-26",
        "phase": "NLP",
        "focus": "NLP mini-project",
        "tasks": "Polish the classifier end to end; Clean repo + README with metrics; Push to GitHub",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w10-d07",
        "week": 10,
        "dayOfWeek": 7,
        "date": "2026-09-27",
        "phase": "NLP",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 11,
    "title": "Neural Networks & CNNs",
    "phase": "Deep Learning",
    "dateRange": "Sep 28–Oct 4",
    "days": [
      {
        "id": "w11-d01",
        "week": 11,
        "dayOfWeek": 1,
        "date": "2026-09-28",
        "phase": "Deep Learning",
        "focus": "ANN 1/4",
        "tasks": "Watch (≈1h 30m): DL Fundamentals — perceptron, ANN, activation functions; Practice (2.5h): forward pass by hand in NumPy",
        "resources": [
          "Udemy — Deep Learning Fundamentals (6h, part 1/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w11-d02",
        "week": 11,
        "dayOfWeek": 2,
        "date": "2026-09-29",
        "phase": "Deep Learning",
        "focus": "Backprop 2/4",
        "tasks": "Watch (≈1h 30m): backpropagation, loss functions, optimizers; Practice (2.5h): implement a tiny NN in NumPy",
        "resources": [
          "Udemy — Deep Learning Fundamentals (part 2/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w11-d03",
        "week": 11,
        "dayOfWeek": 3,
        "date": "2026-09-30",
        "phase": "Deep Learning",
        "focus": "Training 3/4",
        "tasks": "Watch (≈1h 30m): training deep nets — regularization, dropout, batch norm; Practice (2.5h): experiments in PyTorch",
        "resources": [
          "Udemy — Deep Learning Fundamentals (part 3/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w11-d04",
        "week": 11,
        "dayOfWeek": 4,
        "date": "2026-10-01",
        "phase": "Deep Learning",
        "focus": "CNN 4/4",
        "tasks": "Watch (≈1h 30m): CNNs — finish the section; Practice (2.5h): train a small CNN on MNIST in PyTorch",
        "resources": [
          "Udemy — Deep Learning Fundamentals (part 4/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w11-d05",
        "week": 11,
        "dayOfWeek": 5,
        "date": "2026-10-02",
        "phase": "Deep Learning",
        "focus": "ANN project",
        "tasks": "Watch + code along (2h): ANN Practical Project; Re-build it in PyTorch (2h) and compare results",
        "resources": [
          "Udemy — ANN Practical Project (2h)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w11-d06",
        "week": 11,
        "dayOfWeek": 6,
        "date": "2026-10-03",
        "phase": "Deep Learning",
        "focus": "Project 3",
        "tasks": "Kick off image classification: pick a dataset; Train a CNN baseline from scratch; Record accuracy",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w11-d07",
        "week": 11,
        "dayOfWeek": 7,
        "date": "2026-10-04",
        "phase": "Deep Learning",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 12,
    "title": "Project 3 + RNNs",
    "phase": "Deep Learning",
    "dateRange": "Oct 5–11",
    "days": [
      {
        "id": "w12-d01",
        "week": 12,
        "dayOfWeek": 1,
        "date": "2026-10-05",
        "phase": "Deep Learning",
        "focus": "Project 3",
        "tasks": "Fine-tune a pretrained backbone (e.g. ResNet18) on your dataset; Compare against the baseline",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w12-d02",
        "week": 12,
        "dayOfWeek": 2,
        "date": "2026-10-06",
        "phase": "Deep Learning",
        "focus": "Project 3 wrap",
        "tasks": "Confusion matrix + misclassified examples discussed; Small Gradio/Streamlit demo; Publish",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w12-d03",
        "week": 12,
        "dayOfWeek": 3,
        "date": "2026-10-07",
        "phase": "Deep Learning",
        "focus": "RNN 1/4",
        "tasks": "Watch (≈1h 40m): RNN fundamentals; Practice (2.5h): char-level RNN toy example in PyTorch",
        "resources": [
          "Udemy — Recurrent Neural Networks (6h 30m, part 1/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w12-d04",
        "week": 12,
        "dayOfWeek": 4,
        "date": "2026-10-08",
        "phase": "Deep Learning",
        "focus": "LSTM 2/4",
        "tasks": "Watch (≈1h 40m): LSTM; Practice (2.5h): LSTM on a text dataset",
        "resources": [
          "Udemy — Recurrent Neural Networks (part 2/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w12-d05",
        "week": 12,
        "dayOfWeek": 5,
        "date": "2026-10-09",
        "phase": "Deep Learning",
        "focus": "GRU 3/4",
        "tasks": "Watch (≈1h 35m): GRU, bidirectional RNN; Practice (2.5h): compare LSTM vs GRU",
        "resources": [
          "Udemy — Recurrent Neural Networks (part 3/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w12-d06",
        "week": 12,
        "dayOfWeek": 6,
        "date": "2026-10-10",
        "phase": "Deep Learning",
        "focus": "RNN wrap 4/4",
        "tasks": "Watch (≈1h 35m): finish the RNN section; Practice (2.5h): sequence model on your week-10 NLP dataset",
        "resources": [
          "Udemy — Recurrent Neural Networks (part 4/4)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w12-d07",
        "week": 12,
        "dayOfWeek": 7,
        "date": "2026-10-11",
        "phase": "Deep Learning",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 13,
    "title": "Transformers & AI Agents",
    "phase": "Transformers & GenAI",
    "dateRange": "Oct 12–18",
    "days": [
      {
        "id": "w13-d01",
        "week": 13,
        "dayOfWeek": 1,
        "date": "2026-10-12",
        "phase": "Transformers & GenAI",
        "focus": "Seq2Seq & attention",
        "tasks": "Watch (1h 10m): Seq2Seq & Attention Mechanism; Practice (3h): hand-trace attention on a tiny example, write notes",
        "resources": [
          "Udemy — Seq2Seq & Attention Mechanism (1h 10m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w13-d02",
        "week": 13,
        "dayOfWeek": 2,
        "date": "2026-10-13",
        "phase": "Transformers & GenAI",
        "focus": "Transformers 1/3",
        "tasks": "Watch (≈1h 30m): self-attention, positional encoding; Practice (2.5h): implement scaled dot-product attention in PyTorch",
        "resources": [
          "Udemy — Transformers (4h 20m, part 1/3)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w13-d03",
        "week": 13,
        "dayOfWeek": 3,
        "date": "2026-10-14",
        "phase": "Transformers & GenAI",
        "focus": "Transformers 2/3",
        "tasks": "Watch (≈1h 30m): encoder/decoder, multi-head attention, layer norm; Practice (2.5h): diagram the full architecture from memory",
        "resources": [
          "Udemy — Transformers (part 2/3)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w13-d04",
        "week": 13,
        "dayOfWeek": 4,
        "date": "2026-10-15",
        "phase": "Transformers & GenAI",
        "focus": "Transformers 3/3",
        "tasks": "Watch (≈1h 20m): finish the Transformers section; Practice (2.5h): run a pretrained transformer via a HuggingFace pipeline",
        "resources": [
          "Udemy — Transformers (part 3/3)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w13-d05",
        "week": 13,
        "dayOfWeek": 5,
        "date": "2026-10-16",
        "phase": "Transformers & GenAI",
        "focus": "Claude Code & agents",
        "tasks": "Watch (2h 37m): Claude Code & AI Agents; Follow along (2h): set up Claude Code, build the example agent",
        "resources": [
          "Udemy — Claude Code & AI Agents (2h 37m)"
        ],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w13-d06",
        "week": 13,
        "dayOfWeek": 6,
        "date": "2026-10-17",
        "phase": "Transformers & GenAI",
        "focus": "Agent practice",
        "tasks": "Build a small tool-using agent of your own; Write the 1-page design for Project 4",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w13-d07",
        "week": 13,
        "dayOfWeek": 7,
        "date": "2026-10-18",
        "phase": "Transformers & GenAI",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 14,
    "title": "Project 4: RAG/Agent App",
    "phase": "LLM Engineering",
    "dateRange": "Oct 19–25",
    "days": [
      {
        "id": "w14-d01",
        "week": 14,
        "dayOfWeek": 1,
        "date": "2026-10-19",
        "phase": "LLM Engineering",
        "focus": "Project 4",
        "tasks": "Design the app; Implement document ingestion, chunking, embeddings",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w14-d02",
        "week": 14,
        "dayOfWeek": 2,
        "date": "2026-10-20",
        "phase": "LLM Engineering",
        "focus": "Project 4",
        "tasks": "Vector store (Chroma/FAISS) + retrieval + LLM generation — working RAG v1",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w14-d03",
        "week": 14,
        "dayOfWeek": 3,
        "date": "2026-10-21",
        "phase": "LLM Engineering",
        "focus": "Project 4",
        "tasks": "Add at least one agent/tool-use capability beyond plain RAG",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w14-d04",
        "week": 14,
        "dayOfWeek": 4,
        "date": "2026-10-22",
        "phase": "LLM Engineering",
        "focus": "Project 4",
        "tasks": "Build a small evaluation set (questions + expected answers); Score the app; Fix the worst failures",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w14-d05",
        "week": 14,
        "dayOfWeek": 5,
        "date": "2026-10-23",
        "phase": "LLM Engineering",
        "focus": "Project 4",
        "tasks": "Build a Streamlit UI so it's demoable",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w14-d06",
        "week": 14,
        "dayOfWeek": 6,
        "date": "2026-10-24",
        "phase": "LLM Engineering",
        "focus": "Project 4",
        "tasks": "Deploy to a public URL (HF Spaces / Streamlit Cloud / Render)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w14-d07",
        "week": 14,
        "dayOfWeek": 7,
        "date": "2026-10-25",
        "phase": "LLM Engineering",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 15,
    "title": "Project 4 Polish + Revision",
    "phase": "LLM Engineering",
    "dateRange": "Oct 26–Nov 1",
    "days": [
      {
        "id": "w15-d01",
        "week": 15,
        "dayOfWeek": 1,
        "date": "2026-10-26",
        "phase": "LLM Engineering",
        "focus": "Hardening",
        "tasks": "Add logging and error handling to Project 4; Note cost/latency behavior",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w15-d02",
        "week": 15,
        "dayOfWeek": 2,
        "date": "2026-10-27",
        "phase": "LLM Engineering",
        "focus": "CI + docs",
        "tasks": "GitHub Actions for lint/test; README with architecture diagram",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w15-d03",
        "week": 15,
        "dayOfWeek": 3,
        "date": "2026-10-28",
        "phase": "LLM Engineering",
        "focus": "Demo",
        "tasks": "Record a demo GIF/video; Final publish",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true
      },
      {
        "id": "w15-d04",
        "week": 15,
        "dayOfWeek": 4,
        "date": "2026-10-29",
        "phase": "LLM Engineering",
        "focus": "Course catch-up",
        "tasks": "Finish any Udemy sections you skipped or rushed; Clear the backlog",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w15-d05",
        "week": 15,
        "dayOfWeek": 5,
        "date": "2026-10-30",
        "phase": "LLM Engineering",
        "focus": "Revision",
        "tasks": "Revisit transformers + MLOps notes; Explain both out loud or in writing (interview practice)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w15-d06",
        "week": 15,
        "dayOfWeek": 6,
        "date": "2026-10-31",
        "phase": "LLM Engineering",
        "focus": "Capstone prep",
        "tasks": "Shortlist 2–3 capstone ideas; Check data availability; Pick one",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w15-d07",
        "week": 15,
        "dayOfWeek": 7,
        "date": "2026-11-01",
        "phase": "LLM Engineering",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 16,
    "title": "Capstone Project",
    "phase": "Capstone & Polish",
    "dateRange": "Nov 2–8",
    "days": [
      {
        "id": "w16-d01",
        "week": 16,
        "dayOfWeek": 1,
        "date": "2026-11-02",
        "phase": "Capstone & Polish",
        "focus": "Scope",
        "tasks": "Write a 1-page spec before any code: problem, data, models, success criteria",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w16-d02",
        "week": 16,
        "dayOfWeek": 2,
        "date": "2026-11-03",
        "phase": "Capstone & Polish",
        "focus": "Build core",
        "tasks": "Core data/model pipeline",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w16-d03",
        "week": 16,
        "dayOfWeek": 3,
        "date": "2026-11-04",
        "phase": "Capstone & Polish",
        "focus": "Build core",
        "tasks": "Continue the core build; Integrate the DL/GenAI layer",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w16-d04",
        "week": 16,
        "dayOfWeek": 4,
        "date": "2026-11-05",
        "phase": "Capstone & Polish",
        "focus": "Testing & eval",
        "tasks": "Test thoroughly; Evaluate against your own success criteria",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w16-d05",
        "week": 16,
        "dayOfWeek": 5,
        "date": "2026-11-06",
        "phase": "Capstone & Polish",
        "focus": "Deployment",
        "tasks": "Deploy; Get it live",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w16-d06",
        "week": 16,
        "dayOfWeek": 6,
        "date": "2026-11-07",
        "phase": "Capstone & Polish",
        "focus": "Documentation",
        "tasks": "README, architecture diagram, demo GIF/video; Write up the design decisions",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w16-d07",
        "week": 16,
        "dayOfWeek": 7,
        "date": "2026-11-08",
        "phase": "Capstone & Polish",
        "focus": "Rest",
        "tasks": "",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  },
  {
    "week": 17,
    "title": "Final Polish",
    "phase": "Capstone & Polish",
    "dateRange": "Nov 9–15",
    "days": [
      {
        "id": "w17-d01",
        "week": 17,
        "dayOfWeek": 1,
        "date": "2026-11-09",
        "phase": "Capstone & Polish",
        "focus": "Self-assessment",
        "tasks": "Identify your weakest 2–3 course topics; Rewatch those sections and practice",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w17-d02",
        "week": 17,
        "dayOfWeek": 2,
        "date": "2026-11-10",
        "phase": "Capstone & Polish",
        "focus": "GitHub polish",
        "tasks": "Pin your 5 best repos; Every README: what it does, how to run it, stack, results",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w17-d03",
        "week": 17,
        "dayOfWeek": 3,
        "date": "2026-11-11",
        "phase": "Capstone & Polish",
        "focus": "Code quality pass",
        "tasks": "Refactor one older project; Add docstrings/tests you skipped the first time",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w17-d04",
        "week": 17,
        "dayOfWeek": 4,
        "date": "2026-11-12",
        "phase": "Capstone & Polish",
        "focus": "Buffer",
        "tasks": "Catch-up day for anything delayed earlier in the plan",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w17-d05",
        "week": 17,
        "dayOfWeek": 5,
        "date": "2026-11-13",
        "phase": "Capstone & Polish",
        "focus": "Buffer",
        "tasks": "Catch-up day",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w17-d06",
        "week": 17,
        "dayOfWeek": 6,
        "date": "2026-11-14",
        "phase": "Capstone & Polish",
        "focus": "Final check",
        "tasks": "Confirm all 5 projects are live, working, and documented end to end",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false
      },
      {
        "id": "w17-d07",
        "week": 17,
        "dayOfWeek": 7,
        "date": "2026-11-15",
        "phase": "Capstone & Polish",
        "focus": "Done",
        "tasks": "Ready for the hiring cycle",
        "resources": [],
        "isRestDay": true,
        "isProjectDay": false
      }
    ]
  }
];
