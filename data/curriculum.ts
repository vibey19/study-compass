// AUTO-GENERATED from CURRICULUM.md by scripts/generate-curriculum.mjs.
// Do not edit by hand — edit CURRICULUM.md and run `npm run generate`.

export type Resource = {
  label: string;
  /** empty when the curriculum lists no link — the UI falls back to a search */
  url: string;
};

export type DayEntry = {
  id: string; // e.g. "w01-d01"
  week: number; // 1-10
  dayOfWeek: number; // 1-7 (weeks run Tue → Mon, so 5 = Saturday)
  date: string; // ISO date, e.g. "2026-10-06"
  phase: string;
  focus: string;
  tasks: string; // markdown-ish text (**bold**, `code`)
  resources: Resource[];
  isRestDay: boolean; // always false in this plan — no rest days
  isProjectDay: boolean; // marked [P] in the curriculum
  isBufferDay: boolean; // marked [B] — catch-up day, works the backlog first
  track: "ml" | "review" | "buffer"; // "review" = [R] weekly review day
  isLightDay: boolean; // review and buffer days
};

export type WeekEntry = {
  week: number;
  title: string;
  phase: string;
  dateRange: string;
  days: DayEntry[];
};

export const PHASE_NAMES: string[] = [
  "Python and Tools",
  "Data, SQL and Math",
  "Classic Machine Learning",
  "Deep Learning and Transformers",
  "LLMs and RAG",
  "MLOps and Cloud",
  "Portfolio and Job Hunt"
];

export const roadmap: WeekEntry[] = [
  {
    "week": 1,
    "title": "Python basics",
    "phase": "Python and Tools",
    "dateRange": "Oct 6-12",
    "days": [
      {
        "id": "w01-d01",
        "week": 1,
        "dayOfWeek": 1,
        "date": "2026-10-06",
        "phase": "Python and Tools",
        "focus": "Setup + functions and variables",
        "tasks": "Install Python, VS Code, Git and turn AI autocomplete off; Watch (1h): CS50P Lecture 0; Code (2.5h): Problem Set 0, every problem; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w01-d02",
        "week": 1,
        "dayOfWeek": 2,
        "date": "2026-10-07",
        "phase": "Python and Tools",
        "focus": "Conditionals",
        "tasks": "Watch (1h): CS50P Lecture 1; Code (3h): Problem Set 1; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w01-d03",
        "week": 1,
        "dayOfWeek": 3,
        "date": "2026-10-08",
        "phase": "Python and Tools",
        "focus": "Loops",
        "tasks": "Watch (1h): CS50P Lecture 2; Code (3h): Problem Set 2; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w01-d04",
        "week": 1,
        "dayOfWeek": 4,
        "date": "2026-10-09",
        "phase": "Python and Tools",
        "focus": "Exceptions",
        "tasks": "Watch (1h): CS50P Lecture 3; Code (3h): Problem Set 3; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w01-d05",
        "week": 1,
        "dayOfWeek": 5,
        "date": "2026-10-10",
        "phase": "Python and Tools",
        "focus": "Libraries + shell and Git",
        "tasks": "(Saturday, 6-7h) Watch (1h): CS50P Lecture 4; Code (2.5h): Problem Set 4; Watch + practice (2.5h): Missing Semester shell and version control lectures with exercises; Create repo `ml-journey` and push problem sets 0 to 4; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          },
          {
            "label": "Missing Semester",
            "url": "https://missing.csail.mit.edu/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w01-d06",
        "week": 1,
        "dayOfWeek": 6,
        "date": "2026-10-11",
        "phase": "Python and Tools",
        "focus": "Weekly review",
        "tasks": "Redo the two problem sets you found hardest; Rebuild one thing from this week from a blank file, no notes; Tick this stage's done-when checklist and write down anything you still can't explain; Weekly check-in: paste your repo link to Claude for a review of the commits; Post 3 to 5 lines on LinkedIn about what you built this week; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "review",
        "isLightDay": true
      },
      {
        "id": "w01-d07",
        "week": 1,
        "dayOfWeek": 7,
        "date": "2026-10-12",
        "phase": "Python and Tools",
        "focus": "Unit tests",
        "tasks": "Watch (1h): CS50P Lecture 5; Code (3h): Problem Set 5 using pytest; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      }
    ]
  },
  {
    "week": 2,
    "title": "Python intermediate",
    "phase": "Python and Tools",
    "dateRange": "Oct 13-19",
    "days": [
      {
        "id": "w02-d01",
        "week": 2,
        "dayOfWeek": 1,
        "date": "2026-10-13",
        "phase": "Python and Tools",
        "focus": "File I/O",
        "tasks": "Watch (1h): CS50P Lecture 6; Code (3h): Problem Set 6; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w02-d02",
        "week": 2,
        "dayOfWeek": 2,
        "date": "2026-10-14",
        "phase": "Python and Tools",
        "focus": "Regular expressions",
        "tasks": "Watch (1h): CS50P Lecture 7; Code (3h): Problem Set 7; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w02-d03",
        "week": 2,
        "dayOfWeek": 3,
        "date": "2026-10-15",
        "phase": "Python and Tools",
        "focus": "Object-oriented programming",
        "tasks": "Watch (1h): CS50P Lecture 8; Code (3h): Problem Set 8; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w02-d04",
        "week": 2,
        "dayOfWeek": 4,
        "date": "2026-10-16",
        "phase": "Python and Tools",
        "focus": "Et cetera + Git branches",
        "tasks": "Watch (1h): CS50P Lecture 9; Code (2h): Problem Set 9; Practice (1h): branches, merge, resolve one merge conflict on purpose; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          },
          {
            "label": "Missing Semester",
            "url": "https://missing.csail.mit.edu/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w02-d05",
        "week": 2,
        "dayOfWeek": 5,
        "date": "2026-10-17",
        "phase": "Python and Tools",
        "focus": "CS50P final project: CLI tool",
        "tasks": "(Saturday, 6-7h) Plan (30m): pick a CLI tool (expense tracker, habit logger, quiz app); Code (5h): build it with classes, file storage and at least 5 pytest tests; Write (1h): README + submit as your CS50P final project to claim the free CS50 Certificate (not the paid edX one); Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "CS50P",
            "url": "https://cs50.harvard.edu/python/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w02-d06",
        "week": 2,
        "dayOfWeek": 6,
        "date": "2026-10-18",
        "phase": "Python and Tools",
        "focus": "Weekly review",
        "tasks": "Polish the CLI tool README; Rebuild one thing from this week from a blank file, no notes; Tick this stage's done-when checklist and write down anything you still can't explain; Weekly check-in: paste your repo link to Claude for a review of the commits; Post 3 to 5 lines on LinkedIn about what you built this week; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "review",
        "isLightDay": true
      },
      {
        "id": "w02-d07",
        "week": 2,
        "dayOfWeek": 7,
        "date": "2026-10-19",
        "phase": "Python and Tools",
        "focus": "NumPy + pandas start",
        "tasks": "Read (1h): NumPy beginner guide (arrays, shape, broadcasting); Course (1.5h): Kaggle Pandas lessons 1 to 3; Code (1.5h): redo every exercise in a local notebook without hints; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "NumPy beginner guide",
            "url": "https://numpy.org/doc/stable/user/absolute_beginners.html"
          },
          {
            "label": "Kaggle Learn Pandas",
            "url": "https://www.kaggle.com/learn/pandas"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      }
    ]
  },
  {
    "week": 3,
    "title": "Data, SQL and math",
    "phase": "Data, SQL and Math",
    "dateRange": "Oct 20-26",
    "days": [
      {
        "id": "w03-d01",
        "week": 3,
        "dayOfWeek": 1,
        "date": "2026-10-20",
        "phase": "Data, SQL and Math",
        "focus": "pandas + descriptive stats",
        "tasks": "Watch (1h20m at 1.75x): bootcamp descriptive stats, \"What is Statistics And its Application\" to \"Correlation And Covariance\" (13 videos); Course (2h): Kaggle Pandas lessons 4 to 6 (grouping, types, renaming, combining); Code (1h): mean, median, variance, std, percentiles and correlation by hand in NumPy for one column, check against pandas describe() and corr(); Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Kaggle Learn Pandas",
            "url": "https://www.kaggle.com/learn/pandas"
          },
          {
            "label": "NumPy beginner guide",
            "url": "https://numpy.org/doc/stable/user/absolute_beginners.html"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w03-d02",
        "week": 3,
        "dayOfWeek": 2,
        "date": "2026-10-21",
        "phase": "Data, SQL and Math",
        "focus": "Probability + visualization",
        "tasks": "Watch (1h45m at 1.75x): bootcamp probability and distributions, \"Addition Rule (For Mutual And Non Mutual Exclusive Events)\" to \"Pareto Distribution\" (13 videos); Course (2h): Kaggle Data Visualization; Code (1h): 4 charts on yesterday's dataset, each answering one clear question; Claim the Kaggle Pandas + Data Visualization certificates; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Kaggle Learn Data Visualization",
            "url": "https://www.kaggle.com/learn/data-visualization"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w03-d03",
        "week": 3,
        "dayOfWeek": 3,
        "date": "2026-10-22",
        "phase": "Data, SQL and Math",
        "focus": "SQL",
        "tasks": "Course (3h): Kaggle Intro to SQL, all lessons; Practice (1h): write 10 queries of your own (filters, GROUP BY, JOIN) on the course datasets; Claim the certificate; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Kaggle Learn Intro to SQL",
            "url": "https://www.kaggle.com/learn/intro-to-sql"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w03-d04",
        "week": 3,
        "dayOfWeek": 4,
        "date": "2026-10-23",
        "phase": "Data, SQL and Math",
        "focus": "Linear algebra + calculus",
        "tasks": "Watch (1.5h at 1.25x): 3Blue1Brown linear algebra chapters 1 to 4 + calculus chapters 1 to 4; Code (2.5h): dot product, matrix multiply, norm, cosine similarity and a numerical derivative in plain NumPy; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "3Blue1Brown Essence of Linear Algebra",
            "url": "https://www.3blue1brown.com/topics/linear-algebra"
          },
          {
            "label": "3Blue1Brown Essence of Calculus",
            "url": "https://www.3blue1brown.com/topics/calculus"
          },
          {
            "label": "NumPy beginner guide",
            "url": "https://numpy.org/doc/stable/user/absolute_beginners.html"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w03-d05",
        "week": 3,
        "dayOfWeek": 5,
        "date": "2026-10-24",
        "phase": "Data, SQL and Math",
        "focus": "Project 1: EDA + stats",
        "tasks": "(Saturday, 6-7h) Watch (1h35m at 1.75x): bootcamp hypothesis testing, \"Central Limit Theorem\" to \"Partioning Of Variance In Annova\" (17 videos); Watch (50m at 1.75x): bootcamp feature engineering, \"Handling Missing Values\" to \"Target Guided Ordinal Encoding\" (7 videos); Pick a messy public dataset (not one used in the bootcamp); Code (4.5h): clean it with every decision documented, handle missing values, outliers and encoding, make charts, run one hypothesis test with a plain-English result, write 5 findings; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Kaggle Learn Pandas",
            "url": "https://www.kaggle.com/learn/pandas"
          },
          {
            "label": "Kaggle Learn Data Visualization",
            "url": "https://www.kaggle.com/learn/data-visualization"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w03-d06",
        "week": 3,
        "dayOfWeek": 6,
        "date": "2026-10-25",
        "phase": "Data, SQL and Math",
        "focus": "Weekly review",
        "tasks": "Finish the Project 1 README; Rebuild one thing from this week from a blank file, no notes; Tick this stage's done-when checklist and write down anything you still can't explain; Weekly check-in: paste your repo link to Claude for a review of the commits; Post 3 to 5 lines on LinkedIn about what you built this week; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "review",
        "isLightDay": true
      },
      {
        "id": "w03-d07",
        "week": 3,
        "dayOfWeek": 7,
        "date": "2026-10-26",
        "phase": "Data, SQL and Math",
        "focus": "Buffer day",
        "tasks": "Catch-up: finish anything in your backlog first; If the backlog is empty: 3 DSA problems + rebuild one from-scratch drill from memory; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": true,
        "track": "buffer",
        "isLightDay": true
      }
    ]
  },
  {
    "week": 4,
    "title": "ML foundations",
    "phase": "Classic Machine Learning",
    "dateRange": "Oct 27-Nov 2",
    "days": [
      {
        "id": "w04-d01",
        "week": 4,
        "dayOfWeek": 1,
        "date": "2026-10-27",
        "phase": "Classic Machine Learning",
        "focus": "First models",
        "tasks": "Watch (35m at 1.75x): bootcamp ML intro, \"Introduction\" to \"Instance based Vs Model based learning\" (5 videos); Course (2.5h): Kaggle Intro to ML, all lessons + claim the certificate; SQL (30m): Kaggle Advanced SQL lesson 1; DSA (30m): NeetCode Arrays & Hashing, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Kaggle Learn Intro to ML",
            "url": "https://www.kaggle.com/learn/intro-to-machine-learning"
          },
          {
            "label": "Kaggle Learn Advanced SQL",
            "url": "https://www.kaggle.com/learn/advanced-sql"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w04-d02",
        "week": 4,
        "dayOfWeek": 2,
        "date": "2026-10-28",
        "phase": "Classic Machine Learning",
        "focus": "End-to-end project part 1",
        "tasks": "Read + code (3h): Hands-On ML chapter 2 up to data preparation; type every cell yourself; SQL (30m): Advanced SQL lesson 2; DSA (30m): NeetCode Arrays & Hashing, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Hands-On ML notebooks",
            "url": "https://github.com/ageron/handson-ml3"
          },
          {
            "label": "Kaggle Learn Advanced SQL",
            "url": "https://www.kaggle.com/learn/advanced-sql"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w04-d03",
        "week": 4,
        "dayOfWeek": 3,
        "date": "2026-10-29",
        "phase": "Classic Machine Learning",
        "focus": "End-to-end project part 2",
        "tasks": "Read + code (3h): chapter 2 training, cross-validation, grid search, test set; SQL (30m): finish Advanced SQL + claim the certificate; DSA (30m): NeetCode Arrays & Hashing, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Hands-On ML notebooks",
            "url": "https://github.com/ageron/handson-ml3"
          },
          {
            "label": "Kaggle Learn Advanced SQL",
            "url": "https://www.kaggle.com/learn/advanced-sql"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w04-d04",
        "week": 4,
        "dayOfWeek": 4,
        "date": "2026-10-30",
        "phase": "Classic Machine Learning",
        "focus": "Linear regression from scratch",
        "tasks": "Watch (1h20m at 1.75x): bootcamp linear regression, \"Simple Linear Regression Introduction\" to \"Linear Regression with OLS\" (10 videos); NumPy (2h): linear regression with gradient descent, compare to sklearn; Read (30m): skim Hands-On ML chapter 4 on regularised linear models; DSA (30m): NeetCode Two Pointers, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Hands-On ML notebooks",
            "url": "https://github.com/ageron/handson-ml3"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w04-d05",
        "week": 4,
        "dayOfWeek": 5,
        "date": "2026-10-31",
        "phase": "Classic Machine Learning",
        "focus": "Classification + pipelines",
        "tasks": "(Saturday, 6-7h) Watch (35m at 1.75x): bootcamp regularisation and CV, \"Polynomial Regression Intuition\", \"Pipeline in Polynomial\", \"Ridge Regression\", \"Lasso & ElasticNet\", \"Types Of cross Validation\"; Watch (1h05m at 1.75x): bootcamp logistic regression, \"Can Linear Regression Solve Classifier Problem.\", \"Logistic Regression Indepth Math Intuition\", \"Performance Metrics\", \"Logistic Regression OVR\", \"Grid Search Hyper Parameter\", \"Randomised Search CV\", \"Logistic Imbalanced Dataset\", \"Logistic Regression ROC\"; NumPy (1.5h): logistic regression from scratch, then confusion matrix, precision, recall and F1 by hand; Course (2.5h): Kaggle Intermediate ML + claim the certificate; DSA (30m): NeetCode Two Pointers, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Kaggle Learn Intermediate ML",
            "url": "https://www.kaggle.com/learn/intermediate-machine-learning"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w04-d06",
        "week": 4,
        "dayOfWeek": 6,
        "date": "2026-11-01",
        "phase": "Classic Machine Learning",
        "focus": "Weekly review",
        "tasks": "Rebuild the chapter 2 sklearn Pipeline from a blank file; Rebuild one thing from this week from a blank file, no notes; Tick this stage's done-when checklist and write down anything you still can't explain; Weekly check-in: paste your repo link to Claude for a review of the commits; Post 3 to 5 lines on LinkedIn about what you built this week; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "review",
        "isLightDay": true
      },
      {
        "id": "w04-d07",
        "week": 4,
        "dayOfWeek": 7,
        "date": "2026-11-02",
        "phase": "Classic Machine Learning",
        "focus": "Trees and ensembles",
        "tasks": "Watch (55m at 1.75x): bootcamp trees and random forests, \"Introduction TO Decision Tree.\", \"Entropy and Gini Impurity\", \"Information Gain\", \"Entropy vs Gini impurity\", \"Decision Tree Split for Numerical Features\", \"Post Pruning & Pre Pruning\", \"Decision Tree Regression\", \"Bagging & Boosting Ensemble Techniques.\", \"Random Forest Regression\"; Read + code (2.5h): Hands-On ML chapters 6 and 7; DSA (30m): NeetCode Two Pointers, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Hands-On ML notebooks",
            "url": "https://github.com/ageron/handson-ml3"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      }
    ]
  },
  {
    "week": 5,
    "title": "Clustering + Project 2",
    "phase": "Classic Machine Learning",
    "dateRange": "Nov 3-9",
    "days": [
      {
        "id": "w05-d01",
        "week": 5,
        "dayOfWeek": 1,
        "date": "2026-11-03",
        "phase": "Classic Machine Learning",
        "focus": "Unsupervised learning",
        "tasks": "Watch (1h05m at 1.75x): bootcamp PCA and k-means, \"Introduction To Unsupervised Machine Learning\", \"Curse Of Dimensionality\", \"Feature Selection and Extraction\", \"PCA Geometric Intuition\", \"PCA Maths Intuition 01\", \"Eigen Decomposition on Covariance Matrix\", \"Kmeans Clustering Geometric Intuition\", \"How to Find K Values?\", \"Random Initialisation Trap(Kmeans++)\"; NumPy (2h): k-means from scratch with k-means++ init, test on toy data; Code (30m): PCA with sklearn on a real dataset, plot explained variance; DSA (30m): NeetCode Sliding Window, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Hands-On ML notebooks",
            "url": "https://github.com/ageron/handson-ml3"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w05-d02",
        "week": 5,
        "dayOfWeek": 2,
        "date": "2026-11-04",
        "phase": "Classic Machine Learning",
        "focus": "Boosting + Project 2 setup",
        "tasks": "Watch (1h05m at 1.75x): bootcamp AdaBoost, gradient boosting, XGBoost, \"Introduction to Adaboost ML algorithm\", \"Creating Decision Tree Stump\", \"Performance of Decision Tree Stump\", \"Updating Weights.\", \"Normalising Weights and Assigning Bins\", \"Selecting New Datapoints for Next tree\", \"Final Prediction for Adaboost\", \"Gradient Boosting Regression\", \"Xgboost Classification Indepth Intuit\", \"Xgboost Regressor\"; Pick a tabular dataset that is not Titanic, house prices or one from the bootcamp; Code (2.5h): problem statement, split, sklearn Pipeline, baseline model; DSA (30m): NeetCode Sliding Window, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Hands-On ML notebooks",
            "url": "https://github.com/ageron/handson-ml3"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w05-d03",
        "week": 5,
        "dayOfWeek": 3,
        "date": "2026-11-05",
        "phase": "Classic Machine Learning",
        "focus": "SVM + Project 2: compare and tune",
        "tasks": "Watch (30m at 1.75x): bootcamp SVM, \"Introduction to support vector Machine\" to \"SVM Kernels\" (6 videos); Code (3h): 3 model types with cross-validation (include XGBoost), tune the best one; DSA (30m): NeetCode Sliding Window, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w05-d04",
        "week": 5,
        "dayOfWeek": 4,
        "date": "2026-11-06",
        "phase": "Classic Machine Learning",
        "focus": "Naive Bayes, KNN + Project 2 README",
        "tasks": "Watch (45m at 1.75x): bootcamp Naive Bayes and KNN, \"Understanding Baye's Theorem\", \"Variants Of Naive Baye's\", \"KNN Classification And Regression Indepth Intuition\", \"Optimization Of KNN- KDtree And Ball Tree Indepth Intuition\"; Code (1.5h): error analysis on the worst predictions; Write (1.5h): README with metrics table and why this model; DSA (30m): NeetCode Stack, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w05-d05",
        "week": 5,
        "dayOfWeek": 5,
        "date": "2026-11-07",
        "phase": "Classic Machine Learning",
        "focus": "Project 2: serve it",
        "tasks": "(Saturday, 6-7h) Watch (55m at 1.75x): bootcamp Docker, \"Dockers and What is Containers\" to \"Docker Compose\" (8 videos); Tutorial (1.5h): FastAPI first steps + request body; Code (3.5h): /predict endpoint with pydantic validation + pytest tests, running in Docker; DSA (30m): NeetCode Stack, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "FastAPI tutorial",
            "url": "https://fastapi.tiangolo.com/tutorial/"
          },
          {
            "label": "Docker Get Started",
            "url": "https://docs.docker.com/get-started/"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w05-d06",
        "week": 5,
        "dayOfWeek": 6,
        "date": "2026-11-08",
        "phase": "Classic Machine Learning",
        "focus": "Weekly review",
        "tasks": "Answer 15 ML basics questions out loud and record a 10-minute Project 2 walkthrough; Rebuild one thing from this week from a blank file, no notes; Tick this stage's done-when checklist and write down anything you still can't explain; Weekly check-in: paste your repo link to Claude for a review of the commits; Post 3 to 5 lines on LinkedIn about what you built this week; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "StatQuest",
            "url": "https://www.youtube.com/@statquest"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "review",
        "isLightDay": true
      },
      {
        "id": "w05-d07",
        "week": 5,
        "dayOfWeek": 7,
        "date": "2026-11-09",
        "phase": "Classic Machine Learning",
        "focus": "Buffer day",
        "tasks": "Catch-up: finish anything in your backlog first; If the backlog is empty: 3 DSA problems + rebuild one from-scratch drill from memory; Watch (1h at 1.75x): bootcamp clustering and anomaly detection (optional), \"Hierarichal Clustering\" to \"Local Outlier Factor Anomaly Detection\" (11 videos); Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": true,
        "track": "buffer",
        "isLightDay": true
      }
    ]
  },
  {
    "week": 6,
    "title": "Neural nets and PyTorch",
    "phase": "Deep Learning and Transformers",
    "dateRange": "Nov 10-16",
    "days": [
      {
        "id": "w06-d01",
        "week": 6,
        "dayOfWeek": 1,
        "date": "2026-11-10",
        "phase": "Deep Learning and Transformers",
        "focus": "Neural nets + micrograd",
        "tasks": "Watch (55m at 1.75x): bootcamp deep learning basics, \"Introduction\" to \"Chain Rule of Derivatives\" (7 videos); Code-along (2.5h, normal speed): Karpathy micrograd video; DSA (30m): NeetCode Stack, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Karpathy Zero to Hero",
            "url": "https://karpathy.ai/zero-to-hero.html"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w06-d02",
        "week": 6,
        "dayOfWeek": 2,
        "date": "2026-11-11",
        "phase": "Deep Learning and Transformers",
        "focus": "Activations + rebuild micrograd",
        "tasks": "Watch (50m at 1.75x): bootcamp activation functions, \"Vanishing Gradient Problem and Sigmoid\" to \"Which Activation Function To Apply When?\" (9 videos); Code (3h): rebuild micrograd from a blank file and train a tiny MLP on toy data; DSA (30m): NeetCode Binary Search, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Karpathy Zero to Hero",
            "url": "https://karpathy.ai/zero-to-hero.html"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w06-d03",
        "week": 6,
        "dayOfWeek": 3,
        "date": "2026-11-12",
        "phase": "Deep Learning and Transformers",
        "focus": "Loss functions + PyTorch basics",
        "tasks": "Watch (25m at 1.75x): bootcamp loss functions, \"Loss Function Vs Cost Function\", \"Regression Cost Function\", \"Loss Function Classification Problem\", \"Which Loss Function To Use When?\"; Tutorial (3h): PyTorch Learn the Basics up to building the model (tensors, datasets, dataloaders, transforms); DSA (30m): NeetCode Binary Search, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "PyTorch Learn the Basics",
            "url": "https://pytorch.org/tutorials/beginner/basics/intro.html"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w06-d04",
        "week": 6,
        "dayOfWeek": 4,
        "date": "2026-11-13",
        "phase": "Deep Learning and Transformers",
        "focus": "Optimisers + PyTorch training loop",
        "tasks": "Watch (55m at 1.75x): bootcamp optimisers, weight init, dropout, \"Gradient Descent Optimisers\" to \"Dropout Layers\" (10 videos); Tutorial (1h): autograd, optimization loop, save and load; Code (1.5h): MNIST MLP training loop from memory, aim for 97%+, then compare SGD vs Adam and dropout on vs off; NumPy (30m): softmax + cross-entropy from scratch; DSA (30m): NeetCode Binary Search, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "PyTorch Learn the Basics",
            "url": "https://pytorch.org/tutorials/beginner/basics/intro.html"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w06-d05",
        "week": 6,
        "dayOfWeek": 5,
        "date": "2026-11-14",
        "phase": "Deep Learning and Transformers",
        "focus": "CNNs + Project 3 baseline",
        "tasks": "(Saturday, 6-7h) Watch (40m at 1.75x): bootcamp CNN theory, \"CNN Introduction\" to \"CNN example with RGB\" (9 videos); Tutorial (2h): train a small CNN on CIFAR-10 in PyTorch; Pick a small image dataset; Code (3.5h): small CNN from scratch as baseline, record accuracy; DSA (30m): NeetCode Linked List, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "PyTorch CIFAR-10 tutorial",
            "url": "https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html"
          },
          {
            "label": "PyTorch transfer learning tutorial",
            "url": "https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w06-d06",
        "week": 6,
        "dayOfWeek": 6,
        "date": "2026-11-15",
        "phase": "Deep Learning and Transformers",
        "focus": "Weekly review",
        "tasks": "Write the MNIST training loop again from a blank file; Rebuild one thing from this week from a blank file, no notes; Tick this stage's done-when checklist and write down anything you still can't explain; Weekly check-in: paste your repo link to Claude for a review of the commits; Post 3 to 5 lines on LinkedIn about what you built this week; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "review",
        "isLightDay": true
      },
      {
        "id": "w06-d07",
        "week": 6,
        "dayOfWeek": 7,
        "date": "2026-11-16",
        "phase": "Deep Learning and Transformers",
        "focus": "Project 3: transfer learning + RNN theory",
        "tasks": "Code (3h): fine-tune pretrained ResNet18, compare with the baseline; Write (30m): confusion matrix + 5 misclassified examples in README; Watch (1h10m at 1.75x): bootcamp RNN theory, \"Introduction To NLP In Deep Learning\" to \"Problems With RNN\" (5 videos); DSA (30m): NeetCode Linked List, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "PyTorch transfer learning tutorial",
            "url": "https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html"
          },
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      }
    ]
  },
  {
    "week": 7,
    "title": "Transformers + start applying",
    "phase": "Deep Learning and Transformers",
    "dateRange": "Nov 17-23",
    "days": [
      {
        "id": "w07-d01",
        "week": 7,
        "dayOfWeek": 1,
        "date": "2026-11-17",
        "phase": "Deep Learning and Transformers",
        "focus": "LSTM, GRU and attention theory",
        "tasks": "Watch (1h10m at 1.75x): bootcamp LSTM and GRU, \"Why LSTM RNN?\" to \"GRU RNN Complete Indepth Intuition\" (8 videos); Watch (40m at 1.75x): bootcamp seq2seq and attention, \"Indepth Intuition Of Encoder And Decoder-Sequence to Sequence Architecture\", \"Problems With Encoder And Decoder\", \"Attention Mechanism Indepth Architecture Explanation\"; NumPy (1.5h): an RNN cell forward pass + scaled dot-product attention from scratch; DSA (30m): NeetCode Linked List, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w07-d02",
        "week": 7,
        "dayOfWeek": 2,
        "date": "2026-11-18",
        "phase": "Deep Learning and Transformers",
        "focus": "Self-attention + GPT part 1",
        "tasks": "Watch (1h at 1.75x): bootcamp transformers, \"What And Why To Use Transformers\", \"Understanding the basic architecture of transformers\", \"Self Attention Layer Working\", \"Multi Head Attention\"; Code-along (2.5h, normal speed): Karpathy GPT video, first half (self-attention); DSA (30m): NeetCode Trees, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Karpathy Zero to Hero",
            "url": "https://karpathy.ai/zero-to-hero.html"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w07-d03",
        "week": 7,
        "dayOfWeek": 3,
        "date": "2026-11-19",
        "phase": "Deep Learning and Transformers",
        "focus": "GPT part 2",
        "tasks": "Watch (50m at 1.75x): bootcamp positional encoding and masked attention, \"Positional Encoding Indepth Intuition\", \"Decoder Transformer- Masked Multi Head Attention Working\"; Code-along (3h, normal speed): Karpathy GPT video, second half (transformer block, training); DSA (30m): NeetCode Trees, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Karpathy Zero to Hero",
            "url": "https://karpathy.ai/zero-to-hero.html"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w07-d04",
        "week": 7,
        "dayOfWeek": 4,
        "date": "2026-11-20",
        "phase": "Deep Learning and Transformers",
        "focus": "Rebuild tiny GPT",
        "tasks": "Code (3.5h): rebuild the tiny GPT without the video and train it on your own text; DSA (30m): NeetCode Trees, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Karpathy Zero to Hero",
            "url": "https://karpathy.ai/zero-to-hero.html"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w07-d05",
        "week": 7,
        "dayOfWeek": 5,
        "date": "2026-11-21",
        "phase": "Deep Learning and Transformers",
        "focus": "NLP basics, LLMs + Project 4",
        "tasks": "(Saturday, 6-7h) Watch (1h at 1.75x): bootcamp NLP basics, \"Bag of Words Intuition\", \"Advantages and Disadvantages BOW\", \"N Grams\", \"TF-IDF Instituion\", \"Advantages and Disadvantages of TF-IDF\", \"Word Embeddings\", \"Word2Vec Intuition\", \"Word2Vec Cbow Intuition\", \"SkipGram Indepth Intuition\", \"AvgWord2vec Indepth Intuition\"; Watch (1h, normal speed): Karpathy Intro to LLMs talk; Course (2.5h): HF LLM Course chapters 1 to 3 (pipelines, tokenizers, fine-tuning with Trainer); Code (2h): pick a text classification dataset, TF-IDF + logistic regression baseline, start fine-tuning a small transformer; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Karpathy Intro to LLMs talk",
            "url": "https://www.youtube.com/watch?v=zjkBMFhNj_g"
          },
          {
            "label": "Hugging Face LLM Course",
            "url": "https://huggingface.co/learn/llm-course"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w07-d06",
        "week": 7,
        "dayOfWeek": 6,
        "date": "2026-11-22",
        "phase": "Deep Learning and Transformers",
        "focus": "Weekly review + CV",
        "tasks": "Write (2h): one-page CV, projects at the top, certificates grouped in one line; Fix (1h): LinkedIn + GitHub profile, pin best repos; Send your first 3 applications and log them; Tick this stage's done-when checklist and write down anything you still can't explain; Weekly check-in: paste your repo link to Claude for a review of the commits; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "review",
        "isLightDay": true
      },
      {
        "id": "w07-d07",
        "week": 7,
        "dayOfWeek": 7,
        "date": "2026-11-23",
        "phase": "Deep Learning and Transformers",
        "focus": "Project 4: evaluate",
        "tasks": "Code (2.5h): finish fine-tuning, compare with baseline, error analysis; Write (1h): README results table; List (45m): 40 target companies with careers page links into the Applications tracker; DSA (30m): NeetCode Trees, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Hugging Face LLM Course",
            "url": "https://huggingface.co/learn/llm-course"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      }
    ]
  },
  {
    "week": 8,
    "title": "RAG app",
    "phase": "LLMs and RAG",
    "dateRange": "Nov 24-30",
    "days": [
      {
        "id": "w08-d01",
        "week": 8,
        "dayOfWeek": 1,
        "date": "2026-11-24",
        "phase": "LLMs and RAG",
        "focus": "Embeddings + semantic search",
        "tasks": "Read (1h): Sentence Transformers quickstart; Code (2.5h): semantic search over 100+ documents with FAISS; Apply (30m): 2 applications; DSA (30m): NeetCode Heap, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Sentence Transformers docs",
            "url": "https://sbert.net"
          },
          {
            "label": "FAISS",
            "url": "https://github.com/facebookresearch/faiss"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w08-d02",
        "week": 8,
        "dayOfWeek": 2,
        "date": "2026-11-25",
        "phase": "LLMs and RAG",
        "focus": "Project 5: ingestion",
        "tasks": "Code (3.5h): RAG from scratch, no LangChain: load docs, chunk, embed, store; DSA (30m): NeetCode Heap, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Sentence Transformers docs",
            "url": "https://sbert.net"
          },
          {
            "label": "FAISS",
            "url": "https://github.com/facebookresearch/faiss"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w08-d03",
        "week": 8,
        "dayOfWeek": 3,
        "date": "2026-11-26",
        "phase": "LLMs and RAG",
        "focus": "Project 5: generation",
        "tasks": "Code (3h): retrieval + LLM answer with sources (free API tier or a local model); Apply (30m): 2 applications; DSA (30m): NeetCode mixed, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Book: AI Engineering by Chip Huyen",
            "url": ""
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w08-d04",
        "week": 8,
        "dayOfWeek": 4,
        "date": "2026-11-27",
        "phase": "LLMs and RAG",
        "focus": "Project 5: evaluation",
        "tasks": "Read (1h): AI Engineering chapters on evaluation; Code (2.5h): 20 test questions, retrieval hit rate, answer quality score; DSA (30m): NeetCode mixed, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Book: AI Engineering by Chip Huyen",
            "url": ""
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w08-d05",
        "week": 8,
        "dayOfWeek": 5,
        "date": "2026-11-28",
        "phase": "LLMs and RAG",
        "focus": "Project 5: tool, UI, ship",
        "tasks": "(Saturday, 6-7h) Skim (1h): HF Agents Course unit 1; Code (3h): add one tool the model can call + a Gradio UI; Write (2h): README with architecture, results, demo GIF; Book the AI-901 exam for Dec 12 or 13; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Hugging Face Agents Course",
            "url": "https://huggingface.co/learn/agents-course"
          },
          {
            "label": "Gradio quickstart",
            "url": "https://www.gradio.app/guides/quickstart"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w08-d06",
        "week": 8,
        "dayOfWeek": 6,
        "date": "2026-11-29",
        "phase": "LLMs and RAG",
        "focus": "Weekly review",
        "tasks": "Record a 10-minute Project 5 walkthrough and send 3 applications; Rebuild one thing from this week from a blank file, no notes; Tick this stage's done-when checklist and write down anything you still can't explain; Weekly check-in: paste your repo link to Claude for a review of the commits; Post 3 to 5 lines on LinkedIn about what you built this week; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "review",
        "isLightDay": true
      },
      {
        "id": "w08-d07",
        "week": 8,
        "dayOfWeek": 7,
        "date": "2026-11-30",
        "phase": "LLMs and RAG",
        "focus": "Applications + AI-901 start",
        "tasks": "Apply (2h): 5 applications; Study (1.5h): AI-901 learning path, first modules; DSA (30m): NeetCode mixed, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Microsoft Learn AI-901 study path",
            "url": ""
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      }
    ]
  },
  {
    "week": 9,
    "title": "Production",
    "phase": "MLOps and Cloud",
    "dateRange": "Dec 1-7",
    "days": [
      {
        "id": "w09-d01",
        "week": 9,
        "dayOfWeek": 1,
        "date": "2026-12-01",
        "phase": "MLOps and Cloud",
        "focus": "Experiment tracking",
        "tasks": "Watch (40m at 1.75x): bootcamp MLflow, \"Model Experiment Tracking With MLFLOW\", \"MLFLOW Experiment Tracking With Remote Respository Dagshub\", \"Getting Started With MLOPS With MLFlow And Dagshub With Project\"; Code (2h): log Project 2 or 4 training runs to MLflow and register the best model; Apply (30m): 2 applications; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "MLflow docs",
            "url": "https://mlflow.org/docs/latest/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w09-d02",
        "week": 9,
        "dayOfWeek": 2,
        "date": "2026-12-02",
        "phase": "MLOps and Cloud",
        "focus": "CI + project structure",
        "tasks": "Watch (35m at 1.75x): bootcamp project structure and CI, \"Implementing Project Structure, Logging And Exception Handling\", \"Packaging the Project With Setup.py\", \"Building Docker Image And Github Actions\"; Code (2.5h): GitHub Actions workflow that runs tests + Docker build on every push, refactor Project 5 into a clean package with logging and custom exceptions; DSA (30m): NeetCode mixed, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "GitHub Actions docs",
            "url": "https://docs.github.com/en/actions"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w09-d03",
        "week": 9,
        "dayOfWeek": 3,
        "date": "2026-12-03",
        "phase": "MLOps and Cloud",
        "focus": "Azure setup",
        "tasks": "Setup (1h): Azure for Students account; Watch (15m at 1.75x): bootcamp Azure deploy, \"Deployment Azure With Container And Images\"; Course (1h): Microsoft Learn intro to containers on Azure; Code (1h): push your image to Azure Container Registry; Apply (30m): 2 applications; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Azure for Students",
            "url": "https://azure.microsoft.com/en-us/free/students/"
          },
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          },
          {
            "label": "Microsoft Learn",
            "url": "https://learn.microsoft.com/en-us/training/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w09-d04",
        "week": 9,
        "dayOfWeek": 4,
        "date": "2026-12-04",
        "phase": "MLOps and Cloud",
        "focus": "Deploy to Azure",
        "tasks": "Code (3.5h): deploy Project 5 on Azure Container Apps and get a live URL; DSA (30m): NeetCode mixed, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Microsoft Learn",
            "url": "https://learn.microsoft.com/en-us/training/"
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w09-d05",
        "week": 9,
        "dayOfWeek": 5,
        "date": "2026-12-05",
        "phase": "MLOps and Cloud",
        "focus": "Project 6: monitoring + polish",
        "tasks": "(Saturday, 6-7h) Watch (1h): MLOps Zoomcamp monitoring module; Code (2.5h): Evidently drift report on Project 2 data; Code (2h): log latency, cost and errors for the RAG app; Write (1h): architecture diagram + how-it's-deployed section, green CI badge; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "MLOps Zoomcamp",
            "url": "https://github.com/DataTalksClub/mlops-zoomcamp"
          },
          {
            "label": "Evidently docs",
            "url": "https://docs.evidentlyai.com/"
          },
          {
            "label": "GitHub Actions docs",
            "url": "https://docs.github.com/en/actions"
          }
        ],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w09-d06",
        "week": 9,
        "dayOfWeek": 6,
        "date": "2026-12-06",
        "phase": "MLOps and Cloud",
        "focus": "Weekly review",
        "tasks": "Study (1.5h): AI-901 learning path; Rebuild one thing from this week from a blank file, no notes; Tick this stage's done-when checklist and write down anything you still can't explain; Weekly check-in: paste your repo link to Claude for a review of the commits; Post 3 to 5 lines on LinkedIn about what you built this week; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Microsoft Learn AI-901 study path",
            "url": ""
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "review",
        "isLightDay": true
      },
      {
        "id": "w09-d07",
        "week": 9,
        "dayOfWeek": 7,
        "date": "2026-12-07",
        "phase": "MLOps and Cloud",
        "focus": "Buffer day",
        "tasks": "Catch-up: finish anything in your backlog first; If the backlog is empty: 3 DSA problems + rebuild one from-scratch drill from memory; Study (1h): AI-901 learning path; Watch (15m at 1.75x): bootcamp DVC (optional), \"Data Versioning Control Implementation\"; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Microsoft Learn AI-901 study path",
            "url": ""
          },
          {
            "label": "Udemy bootcamp",
            "url": "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": true,
        "track": "buffer",
        "isLightDay": true
      }
    ]
  },
  {
    "week": 10,
    "title": "Get hired",
    "phase": "Portfolio and Job Hunt",
    "dateRange": "Dec 8-14",
    "days": [
      {
        "id": "w10-d01",
        "week": 10,
        "dayOfWeek": 1,
        "date": "2026-12-08",
        "phase": "Portfolio and Job Hunt",
        "focus": "Portfolio polish",
        "tasks": "Fix (3h): your 3 best projects each have numbers, a live link or demo, and how to run it; Study (1h): AI-901; DSA (30m): NeetCode mixed, 1 new problem + re-solve yesterday's from a blank file; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Microsoft Learn AI-901 study path",
            "url": ""
          },
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w10-d02",
        "week": 10,
        "dayOfWeek": 2,
        "date": "2026-12-09",
        "phase": "Portfolio and Job Hunt",
        "focus": "CV final + applications",
        "tasks": "Write (1.5h): final CV + one version for applied AI roles and one for ML roles; Post (30m): LinkedIn post about Project 5; Apply (2h): 5 applications; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w10-d03",
        "week": 10,
        "dayOfWeek": 3,
        "date": "2026-12-10",
        "phase": "Portfolio and Job Hunt",
        "focus": "Coding + behavioural mock",
        "tasks": "Mock (1.5h): 2 timed medium problems; Write (1.5h): 5 STAR stories; Study (1h): AI-901 practice assessment; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "NeetCode practice",
            "url": "https://neetcode.io/practice"
          },
          {
            "label": "Microsoft Learn AI-901 study path",
            "url": ""
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w10-d04",
        "week": 10,
        "dayOfWeek": 4,
        "date": "2026-12-11",
        "phase": "Portfolio and Job Hunt",
        "focus": "Theory + system design mock",
        "tasks": "Mock (2h): design a RAG system + how you'd evaluate an LLM feature, on paper; Mock (1h): 15 ML theory questions out loud, timed; Study (1h): AI-901 weak areas; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [
          {
            "label": "Book: AI Engineering by Chip Huyen",
            "url": ""
          },
          {
            "label": "Microsoft Learn AI-901 study path",
            "url": ""
          }
        ],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w10-d05",
        "week": 10,
        "dayOfWeek": 5,
        "date": "2026-12-12",
        "phase": "Portfolio and Job Hunt",
        "focus": "Take-home simulation",
        "tasks": "(Saturday, 6-7h) Mock (4h): timed take-home task, then a README as if submitting; Record (2h): 10-minute walkthrough of each top project; AI-901 exam if booked for today; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": true,
        "isBufferDay": false,
        "track": "ml",
        "isLightDay": false
      },
      {
        "id": "w10-d06",
        "week": 10,
        "dayOfWeek": 6,
        "date": "2026-12-13",
        "phase": "Portfolio and Job Hunt",
        "focus": "Final review",
        "tasks": "AI-901 exam if booked for today; go through every stage checklist; Rebuild one thing from this week from a blank file, no notes; Tick this stage's done-when checklist and write down anything you still can't explain; Weekly check-in: paste your repo link to Claude for a review of the commits; Post 3 to 5 lines on LinkedIn about what you built this week; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": false,
        "track": "review",
        "isLightDay": true
      },
      {
        "id": "w10-d07",
        "week": 10,
        "dayOfWeek": 7,
        "date": "2026-12-14",
        "phase": "Portfolio and Job Hunt",
        "focus": "Buffer + next steps",
        "tasks": "Catch-up: finish anything in your backlog first; If the backlog is empty: 3 DSA problems + rebuild one from-scratch drill from memory; Follow up on every open application; plan January: AI-103 or AI-300, keep DSA and applying; Proof: commit today's code to your own repo (no AI attribution)",
        "resources": [],
        "isRestDay": false,
        "isProjectDay": false,
        "isBufferDay": true,
        "track": "buffer",
        "isLightDay": true
      }
    ]
  }
];
