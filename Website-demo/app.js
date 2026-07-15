const STORAGE_KEY = "seCareerCompassState";
const BACKEND_TOKEN_KEY = "seCareerCompassApiToken";
const API_BASE = "";

let roles = {
  "Cloud Architect": {
    focus: "Cloud infrastructure, distributed systems, security, and cost-aware architecture.",
    requiredSkills: [
      "Networking",
      "Linux",
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "CI/CD",
      "Security",
      "System Design",
      "Monitoring"
    ],
    nodes: [
      node("cloud-linux", "Foundation", "Linux and networking basics", "High", "2 weeks", ["Linux", "Networking"], [
        ["Linux Journey", "https://linuxjourney.com/"],
        ["Cisco Networking Basics", "https://skillsforall.com/course/networking-basics"]
      ]),
      node("cloud-docker", "Foundation", "Containers with Docker", "High", "2 weeks", ["Docker"], [
        ["Docker docs", "https://docs.docker.com/get-started/"],
        ["Docker crash course", "https://www.youtube.com/results?search_query=docker+crash+course"]
      ]),
      node("cloud-aws", "Core Cloud", "AWS core services", "High", "3 weeks", ["AWS"], [
        ["AWS Skill Builder", "https://skillbuilder.aws/"],
        ["AWS Well-Architected", "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"]
      ]),
      node("cloud-k8s", "Core Cloud", "Kubernetes orchestration", "High", "3 weeks", ["Kubernetes"], [
        ["Kubernetes docs", "https://kubernetes.io/docs/home/"],
        ["Kubernetes course", "https://www.youtube.com/results?search_query=kubernetes+full+course"]
      ]),
      node("cloud-terraform", "Core Cloud", "Infrastructure as Code with Terraform", "Medium", "2 weeks", ["Terraform"], [
        ["HashiCorp Learn", "https://developer.hashicorp.com/terraform/tutorials"],
        ["Terraform AWS provider", "https://registry.terraform.io/providers/hashicorp/aws/latest/docs"]
      ]),
      node("cloud-cicd", "Professional Evidence", "CI/CD pipeline for cloud deployment", "Medium", "2 weeks", ["CI/CD"], [
        ["GitHub Actions docs", "https://docs.github.com/actions"],
        ["GitLab CI docs", "https://docs.gitlab.com/ee/ci/"]
      ]),
      node("cloud-observability", "Professional Evidence", "Monitoring, logging, and incident response", "Medium", "2 weeks", ["Monitoring", "Security"], [
        ["OpenTelemetry docs", "https://opentelemetry.io/docs/"],
        ["Prometheus docs", "https://prometheus.io/docs/introduction/overview/"]
      ]),
      node("cloud-design", "Professional Evidence", "Cloud architecture case study", "High", "2 weeks", ["System Design"], [
        ["System Design Primer", "https://github.com/donnemartin/system-design-primer"],
        ["AWS Architecture Center", "https://aws.amazon.com/architecture/"]
      ])
    ]
  },
  "Data Engineer": {
    focus: "Data pipelines, warehousing, analytics engineering, and reliable batch/stream processing.",
    requiredSkills: [
      "Python",
      "SQL",
      "Data Modeling",
      "Airflow",
      "Spark",
      "Kafka",
      "dbt",
      "Docker",
      "Cloud Storage",
      "Data Quality"
    ],
    nodes: [
      node("de-python", "Foundation", "Python for data workflows", "High", "2 weeks", ["Python"], [
        ["Python docs", "https://docs.python.org/3/tutorial/"],
        ["Python data course", "https://www.youtube.com/results?search_query=python+for+data+engineering"]
      ]),
      node("de-sql", "Foundation", "Advanced SQL and query tuning", "High", "2 weeks", ["SQL"], [
        ["Mode SQL tutorial", "https://mode.com/sql-tutorial/"],
        ["PostgreSQL docs", "https://www.postgresql.org/docs/current/tutorial.html"]
      ]),
      node("de-modeling", "Foundation", "Data modeling and warehouse design", "High", "2 weeks", ["Data Modeling"], [
        ["Kimball basics", "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/"],
        ["dbt modeling guide", "https://docs.getdbt.com/docs/build/sql-models"]
      ]),
      node("de-airflow", "Pipeline Systems", "Workflow orchestration with Airflow", "High", "2 weeks", ["Airflow"], [
        ["Airflow docs", "https://airflow.apache.org/docs/"],
        ["Airflow tutorial", "https://www.youtube.com/results?search_query=apache+airflow+tutorial"]
      ]),
      node("de-spark", "Pipeline Systems", "Distributed processing with Spark", "Medium", "3 weeks", ["Spark"], [
        ["Spark docs", "https://spark.apache.org/docs/latest/"],
        ["Databricks academy", "https://www.databricks.com/learn/training/home"]
      ]),
      node("de-kafka", "Pipeline Systems", "Streaming basics with Kafka", "Medium", "2 weeks", ["Kafka"], [
        ["Kafka docs", "https://kafka.apache.org/documentation/"],
        ["Confluent tutorials", "https://developer.confluent.io/tutorials/"]
      ]),
      node("de-dbt", "Professional Evidence", "Analytics engineering with dbt", "Medium", "2 weeks", ["dbt"], [
        ["dbt docs", "https://docs.getdbt.com/docs/introduction"],
        ["dbt learn", "https://learn.getdbt.com/"]
      ]),
      node("de-quality", "Professional Evidence", "Data quality checks and lineage report", "High", "2 weeks", ["Data Quality", "Cloud Storage"], [
        ["Great Expectations", "https://docs.greatexpectations.io/docs/"],
        ["Google Cloud data docs", "https://cloud.google.com/docs"]
      ])
    ]
  },
  "DevOps Engineer": {
    focus: "Automation, deployment reliability, environment management, and production operations.",
    requiredSkills: [
      "Linux",
      "Git",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Terraform",
      "Scripting",
      "Monitoring",
      "Security",
      "Cloud"
    ],
    nodes: [
      node("devops-linux", "Foundation", "Linux administration and shell scripting", "High", "2 weeks", ["Linux", "Scripting"], [
        ["Linux Journey", "https://linuxjourney.com/"],
        ["Bash guide", "https://mywiki.wooledge.org/BashGuide"]
      ]),
      node("devops-git", "Foundation", "Git workflow and release branching", "High", "1 week", ["Git"], [
        ["Git book", "https://git-scm.com/book/en/v2"],
        ["GitHub flow", "https://docs.github.com/en/get-started/using-github/github-flow"]
      ]),
      node("devops-docker", "Platform", "Docker images and compose stacks", "High", "2 weeks", ["Docker"], [
        ["Docker docs", "https://docs.docker.com/"],
        ["Docker compose docs", "https://docs.docker.com/compose/"]
      ]),
      node("devops-cicd", "Platform", "CI/CD pipeline design", "High", "2 weeks", ["CI/CD"], [
        ["GitHub Actions", "https://docs.github.com/actions"],
        ["Jenkins docs", "https://www.jenkins.io/doc/"]
      ]),
      node("devops-k8s", "Platform", "Kubernetes deployment operations", "High", "3 weeks", ["Kubernetes"], [
        ["Kubernetes docs", "https://kubernetes.io/docs/home/"],
        ["Kubernetes the hard way", "https://github.com/kelseyhightower/kubernetes-the-hard-way"]
      ]),
      node("devops-iac", "Professional Evidence", "Terraform modules and environments", "Medium", "2 weeks", ["Terraform", "Cloud"], [
        ["Terraform tutorials", "https://developer.hashicorp.com/terraform/tutorials"],
        ["AWS IaC guide", "https://docs.aws.amazon.com/whitepapers/latest/introduction-devops-aws/infrastructure-as-code.html"]
      ]),
      node("devops-monitor", "Professional Evidence", "Observability dashboard and alerting", "Medium", "2 weeks", ["Monitoring"], [
        ["Grafana docs", "https://grafana.com/docs/"],
        ["Prometheus docs", "https://prometheus.io/docs/"]
      ]),
      node("devops-security", "Professional Evidence", "DevSecOps checks in pipeline", "Medium", "2 weeks", ["Security"], [
        ["OWASP DevSecOps", "https://owasp.org/www-project-devsecops-guideline/"],
        ["Snyk learn", "https://learn.snyk.io/"]
      ])
    ]
  },
  "Mobile Developer": {
    focus: "Mobile UI, native device capabilities, API integration, testing, and app store readiness.",
    requiredSkills: [
      "JavaScript",
      "TypeScript",
      "React Native",
      "Flutter",
      "REST API",
      "Firebase",
      "Mobile UX",
      "Testing",
      "State Management",
      "App Deployment"
    ],
    nodes: [
      node("mobile-ts", "Foundation", "TypeScript and async JavaScript", "High", "2 weeks", ["TypeScript", "JavaScript"], [
        ["TypeScript handbook", "https://www.typescriptlang.org/docs/"],
        ["MDN async JS", "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous"]
      ]),
      node("mobile-ux", "Foundation", "Mobile UX and accessibility", "Medium", "1 week", ["Mobile UX"], [
        ["Material Design", "https://m3.material.io/"],
        ["Apple HIG", "https://developer.apple.com/design/human-interface-guidelines/"]
      ]),
      node("mobile-rn", "App Stack", "React Native app architecture", "High", "3 weeks", ["React Native"], [
        ["React Native docs", "https://reactnative.dev/docs/getting-started"],
        ["Expo docs", "https://docs.expo.dev/"]
      ]),
      node("mobile-flutter", "App Stack", "Flutter fundamentals", "Medium", "2 weeks", ["Flutter"], [
        ["Flutter docs", "https://docs.flutter.dev/"],
        ["Flutter codelabs", "https://docs.flutter.dev/codelabs"]
      ]),
      node("mobile-api", "App Stack", "REST API integration and caching", "High", "2 weeks", ["REST API", "State Management"], [
        ["TanStack Query", "https://tanstack.com/query/latest"],
        ["REST API tutorial", "https://www.youtube.com/results?search_query=rest+api+mobile+app+tutorial"]
      ]),
      node("mobile-firebase", "Professional Evidence", "Firebase auth, storage, and notifications", "Medium", "2 weeks", ["Firebase"], [
        ["Firebase docs", "https://firebase.google.com/docs"],
        ["Firebase codelabs", "https://firebase.google.com/codelabs"]
      ]),
      node("mobile-test", "Professional Evidence", "Mobile testing pipeline", "Medium", "2 weeks", ["Testing"], [
        ["Detox docs", "https://wix.github.io/Detox/"],
        ["Flutter testing", "https://docs.flutter.dev/testing"]
      ]),
      node("mobile-release", "Professional Evidence", "App deployment portfolio case study", "High", "2 weeks", ["App Deployment"], [
        ["Play Console help", "https://support.google.com/googleplay/android-developer/"],
        ["App Store Connect", "https://developer.apple.com/app-store-connect/"]
      ])
    ]
  }
};

const predefinedSkills = [
  "JavaScript",
  "TypeScript",
  "Java",
  "Python",
  "OOP",
  "Data Structures",
  "SQL",
  "HTML/CSS",
  "Git",
  "Linux",
  "Docker",
  "Kubernetes",
  "AWS",
  "Terraform",
  "CI/CD",
  "REST API",
  "React Native",
  "Testing",
  "Security",
  "System Design"
];

const defaultPortfolio = [
  {
    name: "internship-roadmap-api",
    url: "https://github.com/sample/internship-roadmap-api",
    language: "Java",
    summary: "REST API that stores student skill assessments, roadmap progress, mentor chat history, and portfolio links.",
    stack: ["Spring Boot", "PostgreSQL", "JWT"],
    source: "demo"
  },
  {
    name: "cloud-notes-deploy",
    url: "https://github.com/sample/cloud-notes-deploy",
    language: "TypeScript",
    summary: "Containerized notes app with CI/CD deployment and monitoring evidence for cloud or DevOps roles.",
    stack: ["Docker", "GitHub Actions", "AWS"],
    source: "demo"
  },
  {
    name: "portfolio-story-builder",
    url: "https://github.com/sample/portfolio-story-builder",
    language: "JavaScript",
    summary: "Frontend app that turns GitHub README files into employer-facing project summaries.",
    stack: ["JavaScript", "GitHub API", "UI"],
    source: "demo"
  }
];

let marketData = [
  { skill: "Kubernetes", LinkedIn: 56, TopCV: 28, growth: 22 },
  { skill: "AWS", LinkedIn: 64, TopCV: 33, growth: 18 },
  { skill: "Docker", LinkedIn: 61, TopCV: 36, growth: 12 },
  { skill: "Python", LinkedIn: 72, TopCV: 41, growth: 15 },
  { skill: "SQL", LinkedIn: 69, TopCV: 44, growth: 9 },
  { skill: "React Native", LinkedIn: 31, TopCV: 24, growth: 11 },
  { skill: "Terraform", LinkedIn: 42, TopCV: 18, growth: 27 },
  { skill: "Kafka", LinkedIn: 37, TopCV: 16, growth: 19 }
];

const sessions = [
  { role: "Academic Counselor", topic: "Choose a specialization by semester 5", status: "Scheduled" },
  { role: "Industry Mentor", topic: "Review cloud deployment portfolio", status: "Pending notes" },
  { role: "AI Virtual Mentor", topic: "Roadmap progress checkpoint", status: "Active" }
];

const defaultTasks = [
  { id: "task-transcript", lane: "To do", actor: "student", title: "Upload transcript and refresh mentor context", due: "Today", tag: "FR1.3" },
  { id: "task-gap", lane: "Doing", actor: "student", title: "Close the first 3 urgent skill gaps", due: "This week", tag: "FR3.3" },
  { id: "task-portfolio", lane: "Review", actor: "mentor", title: "Review portfolio story for target role", due: "Friday", tag: "FR5.2" },
  { id: "task-counseling", lane: "Review", actor: "counselor", title: "Confirm target role and semester learning load", due: "Next advising slot", tag: "FR2.1" },
  { id: "task-market", lane: "Done", actor: "student", title: "Check market pulse before choosing next node", due: "Completed", tag: "FR4.3" }
];

const defaultNotifications = [
  { type: "Roadmap", text: "A high-priority Kubernetes node is still open for Cloud Architect.", time: "09:00" },
  { type: "Market Pulse", text: "Terraform demand increased in this simulated daily scan.", time: "10:30" },
  { type: "Portfolio", text: "Add architecture diagrams to strengthen employer-facing evidence.", time: "14:00" }
];

const defaultNotes = [
  { author: "Academic Counselor", text: "Student should choose one specialization track before semester 5.", date: "2026-07-04" },
  { author: "Industry Mentor", text: "Portfolio needs a deployed project with README screenshots and trade-offs.", date: "2026-07-04" }
];

let resourceCatalog = [
  resource("Linux Journey", "Linux", "Foundation", "Cloud Architect", "Documentation", "https://linuxjourney.com/", "Practical Linux basics for cloud and DevOps foundations."),
  resource("Docker Get Started", "Docker", "Foundation", "DevOps Engineer", "Documentation", "https://docs.docker.com/get-started/", "Official container learning path with exercises."),
  resource("Kubernetes Docs", "Kubernetes", "Intermediate", "Cloud Architect", "Documentation", "https://kubernetes.io/docs/home/", "Core concepts, workloads, services, and cluster operations."),
  resource("AWS Skill Builder", "AWS", "Intermediate", "Cloud Architect", "Course", "https://skillbuilder.aws/", "Cloud services and architecture training directly from AWS."),
  resource("Terraform Tutorials", "Terraform", "Portfolio", "DevOps Engineer", "Documentation", "https://developer.hashicorp.com/terraform/tutorials", "Infrastructure as Code tutorials and deployable examples."),
  resource("Mode SQL Tutorial", "SQL", "Foundation", "Data Engineer", "Course", "https://mode.com/sql-tutorial/", "Interactive SQL practice for analytics and data engineering."),
  resource("Apache Airflow Docs", "Airflow", "Intermediate", "Data Engineer", "Documentation", "https://airflow.apache.org/docs/", "Workflow orchestration concepts and DAG examples."),
  resource("Spark Documentation", "Spark", "Intermediate", "Data Engineer", "Documentation", "https://spark.apache.org/docs/latest/", "Distributed data processing fundamentals."),
  resource("React Native Docs", "React Native", "Intermediate", "Mobile Developer", "Documentation", "https://reactnative.dev/docs/getting-started", "Native mobile app development with JavaScript and TypeScript."),
  resource("Firebase Codelabs", "Firebase", "Portfolio", "Mobile Developer", "Course", "https://firebase.google.com/codelabs", "Auth, storage, notifications, and mobile backend practice."),
  resource("System Design Primer", "System Design", "Portfolio", "Cloud Architect", "GitHub", "https://github.com/donnemartin/system-design-primer", "Interview-ready architecture patterns and design trade-offs."),
  resource("Great Expectations", "Data Quality", "Portfolio", "Data Engineer", "Documentation", "https://docs.greatexpectations.io/docs/", "Data validation and quality reporting for portfolio pipelines.")
];

const traceabilityItems = [
  trace("FR1.1", "Natural language chat interface", "AI Mentor chat input and history", "Implemented"),
  trace("FR1.2", "Integrate LLM APIs for career advice", "Simulated LLM mentor response; ready for API adapter", "Prototype"),
  trace("FR1.3", "Analyze transcripts and GitHub profiles", "Transcript upload signals and GitHub repository sync", "Implemented"),
  trace("FR2.1", "Select target career role", "Global target role selector", "Implemented"),
  trace("FR2.2", "Generate hierarchical skill tree", "Dynamic roadmap by role and phase", "Implemented"),
  trace("FR2.3", "Two resources per technical node", "Roadmap node resource links", "Implemented"),
  trace("FR2.4", "Mark nodes completed and update progress", "Roadmap checkboxes and live progress", "Implemented"),
  trace("FR3.1", "Input current technical skills", "Skill picker and custom skill form", "Implemented"),
  trace("FR3.2", "Map current skills to role requirements", "Gap report matching engine", "Implemented"),
  trace("FR3.3", "Visual report or PDF for missing skills", "Gap bars and print-to-PDF report", "Implemented"),
  trace("FR4.1", "Daily job portal scrape", "Run daily scan simulation", "Prototype"),
  trace("FR4.2", "Keyword frequency analysis", "Market skill mention dataset", "Implemented"),
  trace("FR4.3", "Interactive trend charts", "Canvas market chart with portal filter", "Implemented"),
  trace("FR5.1", "Link GitHub and sync public repos", "GitHub username sync with public API fallback", "Implemented"),
  trace("FR5.2", "Summarize README objectives and stacks", "README keyword summarizer and stack detector", "Prototype"),
  trace("FR5.3", "Generate shareable e-portfolio URL", "Portfolio URL generator and copy action", "Implemented"),
  trace("FR6.1", "Email/password and Google OAuth", "Node.js auth API and simulated Google OAuth chooser", "Implemented"),
  trace("FR6.2", "Persistent chat, assessment, progress DB", "Node.js JSON database with local cache fallback", "Implemented")
];

const nfrItems = [
  ["Usability", "Target: every core workflow is keyboard reachable and usable at 390 px without page-level horizontal overflow; verify by responsive and keyboard QA."],
  ["Performance", "Target: local API health under 500 ms and view transitions under 100 ms for the classroom dataset; verify with browser timings."],
  ["Reliability", "Target: roadmap, skills, chat, bookmarks and portfolio survive refresh; verify through API persistence plus local-cache fallback."],
  ["Security", "Target: protected /api/me routes return 401 without a session, passwords are hashed, redirects are allowlisted and private files return 404."],
  ["Accessibility", "Target: named form controls, aria-current navigation, visible focus and readable data alternatives for interactive charts."],
  ["Maintainability", "Target: one backend catalog feeds roadmap/resources while feature renderers remain isolated and syntax checks pass."]
];

const businessRules = [
  "A student can select only one active target role at a time.",
  "A roadmap node can be completed only after it appears in the generated role roadmap.",
  "Skill gap analysis is recalculated whenever current skills or target role changes.",
  "Every roadmap technical node must expose at least two learning resources.",
  "A portfolio project should map to at least one target-role skill before it is marked employer-ready.",
  "Counselor and mentor notes are stored with an author and date for advising history.",
  "Market pulse data is refreshed by a scheduled scan in the production design.",
  "Chat history, skill assessment, roadmap progress, and portfolio data must persist for the student."
];

const entityModel = [
  ["Student Profile", "Stores identity, GPA signal, skills, GitHub handle, and selected target role."],
  ["Tech Path", "Represents a target career role such as Cloud Architect or Data Engineer."],
  ["Skill Node", "A roadmap item with priority, phase, duration, required skills, completion state, and resources."],
  ["Course Repo", "Curated learning resource linked to skill, role, level, and provider."],
  ["Job Trend", "Aggregated keyword frequency and growth signal from simulated job portals."],
  ["Mentor Session", "Counselor or industry mentor advising item with topic, owner, status, and notes."],
  ["Student Skill Progress", "Links Student Profile and Skill Node with evidence, completion state, and assessment history."]
];

const architectureStages = [
  ["Frontend", "HTML, CSS and JavaScript SPA", "Browser UI, local cache, responsive views"],
  ["Backend API", "Node.js built-in HTTP server", "Authentication, roadmap, mentor, portfolio and resources"],
  ["Persistence", "Local JSON database", "Accounts, sessions and personalized student records"],
  ["External services", "GitHub public API + future adapters", "Repository metadata; LLM and job data remain replaceable adapters"]
];

const acceptanceTests = [
  ["AT-01", "Authentication", "Demo account signs in and protected dashboard opens.", "Automated"],
  ["AT-02", "Roadmap", "Role change refreshes nodes and completion persists.", "Automated"],
  ["AT-03", "Skill Gap", "Skill changes recalculate missing priorities and printable report.", "Automated"],
  ["AT-04", "AI Mentor", "Question uses role, gaps, GPA and portfolio context.", "Demo-ready"],
  ["AT-05", "Portfolio", "Copied public URL returns a recruiter-facing portfolio page.", "Automated"],
  ["AT-06", "Responsive UI", "Core workflows remain usable at 390 px and 1440 px.", "Visual QA"]
];

const apiInventory = [
  "GET /api/health",
  "GET /api/roles",
  "GET /api/roadmap",
  "GET /api/resources",
  "GET /api/market/trends",
  "GET /api/portfolio/:userId",
  "POST /api/auth/login",
  "GET/PUT /api/me/profile",
  "GET/PUT /api/me/roadmap",
  "GET/PUT /api/me/skills",
  "GET/POST/DELETE /api/me/chat",
  "GET /api/me/portfolio + POST /api/me/portfolio/sync",
  "GET/POST /api/me/bookmarks",
  "GET/PUT /api/me/resource-progress",
  "GET/POST/PATCH /api/me/mentor-sessions"
];

const sectionLabels = {
  dashboard: "Dashboard",
  mentor: "AI Mentor",
  roadmap: "Roadmap",
  gap: "Skill Gap",
  market: "Market Pulse",
  portfolio: "E-Portfolio",
  workspace: "Workspace",
  resources: "Resources",
  spec: "System Spec",
  users: "Users"
};

const DEMO_ACCOUNT = {
  id: "acct-demo-student",
  name: "AnNDH2",
  email: "anndh2@fpt.edu.vn",
  role: "Student",
  salt: "demo-student-salt"
};

let state = loadState();
let mentorBusy = false;

function node(id, phase, title, priority, duration, skills, resources) {
  return { id, phase, title, priority, duration, skills, resources };
}

function resource(title, skill, level, role, provider, url, description) {
  return { id: `${normalize(title)}-${normalize(skill)}`.replace(/\s+/g, "-"), title, skill, level, role, provider, url, description };
}

function trace(id, requirement, demoSurface, status) {
  return { id, requirement, demoSurface, status };
}

function loadState() {
  const fallback = {
    role: "Cloud Architect",
    skills: ["JavaScript", "Java", "Git", "OOP", "SQL", "HTML/CSS"],
    completed: {},
    chat: [
      {
        from: "mentor",
        text: advisorWelcomeMessage()
      }
    ],
    transcript: {
      fileName: "",
      signals: ["Data Structures: B+", "Database: A-", "Web Development: B", "Software Engineering: A"],
      gpa: 3.2
    },
    github: "",
    portfolio: defaultPortfolio,
    user: {
      id: DEMO_ACCOUNT.id,
      name: DEMO_ACCOUNT.name,
      email: "anndh2@fpt.edu.vn",
      role: "Student",
      authProvider: "Email/Password",
      lastLogin: "",
      signedIn: false,
      remember: false
    },
    accounts: defaultAccounts(),
    loginEvents: [
      {
        type: "Session restored",
        detail: "Default demo account loaded",
        time: new Date().toLocaleString()
      }
    ],
    lastScan: new Date().toLocaleString(),
    tasks: defaultTasks,
    notifications: defaultNotifications,
    notes: defaultNotes,
    sessions,
    bookmarks: [],
    completedResources: [],
    actorMode: "student"
  };

  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return normalizeState({ ...fallback, ...saved });
  } catch {
    return normalizeState(fallback);
  }
}

function normalizeState(raw) {
  const normalized = { ...raw };
  const seeded = defaultAccounts();
  const accounts = Array.isArray(normalized.accounts) ? normalized.accounts : [];
  normalized.accounts = [...accounts]
    .filter((account) => account && account.email)
    .map((account) => {
      const provider = account.provider || account.authProvider || "Email/Password";
      const passwordManaged = Boolean(account.passwordManaged);
      const passwordSalt = account.passwordSalt || account.salt || `salt-${accountIdFromEmail(account.email)}`;
      const passwordHash =
        account.passwordHash || (provider === "Google OAuth 2.0" || passwordManaged ? "" : hashPassword("careercompass", passwordSalt));
      return {
        id: account.id || accountIdFromEmail(account.email),
        name: account.name || displayNameFromEmail(account.email),
        email: normalizeEmail(account.email),
        role: account.role || "Student",
        provider,
        passwordSalt,
        passwordHash,
        createdAt: account.createdAt || "Migrated local record",
        lastLogin: account.lastLogin || "",
        status: account.status || "Active",
        twoFactor: Boolean(account.twoFactor),
        passwordManaged
      };
    });

  if (!normalized.accounts.some((account) => normalizeEmail(account.email) === DEMO_ACCOUNT.email)) {
    normalized.accounts.unshift(seeded[0]);
  }

  const savedUser = normalized.user || {};
  const current =
    normalized.accounts.find((account) => account.id === savedUser.id) ||
    normalized.accounts.find((account) => normalizeEmail(account.email) === normalizeEmail(savedUser.email)) ||
    normalized.accounts[0] ||
    seeded[0];

  normalized.user = {
    id: current.id,
    name: savedUser.name || current.name,
    email: current.email,
    role: savedUser.role || current.role,
    authProvider: savedUser.authProvider || current.provider,
    lastLogin: savedUser.lastLogin || current.lastLogin || new Date().toLocaleString(),
    signedIn: Boolean(savedUser.signedIn),
    remember: Boolean(savedUser.remember)
  };

  normalized.loginEvents = Array.isArray(normalized.loginEvents) ? normalized.loginEvents.slice(0, 8) : [];
  normalized.skills = Array.isArray(normalized.skills) ? normalized.skills : [];
  normalized.completed = normalized.completed && typeof normalized.completed === "object" ? normalized.completed : {};
  normalized.chat = normalizeChatMessages(normalized.chat).length ? normalizeChatMessages(normalized.chat) : fallbackChat();
  normalized.portfolio = normalizePortfolioProjects(normalized.portfolio);
  normalized.sessions = Array.isArray(normalized.sessions) ? normalized.sessions : sessions;
  normalized.bookmarks = Array.isArray(normalized.bookmarks) ? normalized.bookmarks : [];
  normalized.completedResources = Array.isArray(normalized.completedResources) ? normalized.completedResources : [];
  normalized.tasks = Array.isArray(normalized.tasks) ? normalized.tasks : defaultTasks;
  normalized.notes = Array.isArray(normalized.notes) ? normalized.notes : defaultNotes;
  normalized.notifications = Array.isArray(normalized.notifications) ? normalized.notifications : defaultNotifications;
  normalized.backendRecords = Array.isArray(normalized.backendRecords) ? normalized.backendRecords : [];
  return normalized;
}

function fallbackChat() {
  return [{ from: "mentor", text: advisorWelcomeMessage() }];
}

function defaultAccounts() {
  return [
    {
      id: DEMO_ACCOUNT.id,
      name: DEMO_ACCOUNT.name,
      email: DEMO_ACCOUNT.email,
      role: DEMO_ACCOUNT.role,
      provider: "Email/Password",
      passwordSalt: DEMO_ACCOUNT.salt,
      passwordHash: hashPassword("careercompass", DEMO_ACCOUNT.salt),
      createdAt: "Seeded demo account",
      lastLogin: new Date().toLocaleString(),
      status: "Active",
      twoFactor: false
    }
  ];
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function accountIdFromEmail(email) {
  const slug = normalizeEmail(email).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `acct-${slug || "local-user"}`;
}

function displayNameFromEmail(email) {
  const [name] = normalizeEmail(email).split("@");
  return name ? name.replace(/[._-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()) : "Student";
}

function initials(name) {
  const parts = String(name || "Student")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  if (parts.length === 1 && parts[0].length > 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts.map((part) => part[0]).join("") || "ST").toUpperCase();
}

function hashPassword(password, salt) {
  const source = `${salt}:${password}`;
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) {
    hash ^= source.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function findAccountByEmail(email) {
  const target = normalizeEmail(email);
  return (state.accounts || []).find((account) => normalizeEmail(account.email) === target);
}

function currentAccount() {
  return (
    (state.accounts || []).find((account) => account.id === state.user.id) ||
    findAccountByEmail(state.user.email) ||
    (state.accounts || [])[0]
  );
}

function makeAccount({ name, email, password, role, provider }) {
  const normalizedEmail = normalizeEmail(email);
  const salt = `salt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    id: accountIdFromEmail(normalizedEmail),
    name: name.trim() || displayNameFromEmail(normalizedEmail),
    email: normalizedEmail,
    role: role || "Student",
    provider: provider || "Email/Password",
    passwordSalt: salt,
    passwordHash: password ? hashPassword(password, salt) : "",
    createdAt: new Date().toLocaleString(),
    lastLogin: "",
    status: "Active",
    twoFactor: false
  };
}

function signInAccount(account, provider, remember) {
  const loginTime = new Date().toLocaleString();
  account.lastLogin = loginTime;
  account.provider = provider;
  state.user = {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    authProvider: provider,
    lastLogin: loginTime,
    signedIn: true,
    remember: Boolean(remember)
  };
  addLoginEvent(provider, `${account.email} signed in`);
}

function addLoginEvent(type, detail) {
  state.loginEvents = [
    {
      type,
      detail,
      time: new Date().toLocaleString()
    },
    ...(state.loginEvents || [])
  ].slice(0, 8);
}

function passwordStrength(password) {
  const checks = [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
    password.length >= 12
  ];
  const score = checks.filter(Boolean).length;
  const label = score >= 5 ? "Strong" : score >= 3 ? "Good" : score >= 1 ? "Weak" : "Waiting";
  return { score, label, percent: Math.min(100, score * 20) };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function apiToken() {
  return localStorage.getItem(BACKEND_TOKEN_KEY) || "";
}

async function apiRequest(path, options = {}) {
  const headers = {
    Accept: "application/json",
    ...(options.headers || {})
  };
  let body = options.body;
  if (body !== undefined && !(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(body);
  }
  const token = apiToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE}/api${path}`, {
      ...options,
      headers,
      body
    });
  } catch (error) {
    throw Object.assign(new Error("Backend API is not reachable."), { offline: true, cause: error });
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw Object.assign(new Error(payload.message || "Backend request failed."), {
      status: response.status,
      payload
    });
  }
  return payload;
}

async function apiOptional(path, options = {}) {
  if (!apiToken() && path.startsWith("/me/")) return null;
  try {
    const payload = await apiRequest(path, options);
    state.backendSyncedAt = new Date().toLocaleString();
    return payload;
  } catch (error) {
    if (error.status === 401) {
      localStorage.removeItem(BACKEND_TOKEN_KEY);
    }
    return null;
  }
}

function aggregateMarketTrends(trends) {
  const grouped = new Map();
  (Array.isArray(trends) ? trends : []).forEach((trend) => {
    const key = normalize(trend.skill);
    if (!key) return;
    const current = grouped.get(key) || {
      skill: trend.skill,
      LinkedIn: 0,
      TopCV: 0,
      growthValues: []
    };
    if (trend.source === "LinkedIn" || trend.source === "TopCV") {
      current[trend.source] = Number(trend.frequency || 0);
    }
    current.growthValues.push(Number(trend.growth || 0));
    grouped.set(key, current);
  });
  return [...grouped.values()].map((item) => ({
    skill: item.skill,
    LinkedIn: item.LinkedIn,
    TopCV: item.TopCV,
    growth: Math.round(item.growthValues.reduce((sum, value) => sum + value, 0) / Math.max(1, item.growthValues.length))
  }));
}

async function hydratePublicCatalogs() {
  const roleNames = Object.keys(roles);
  const roadmapRequests = roleNames.map(async (roleName) => {
    try {
      const payload = await apiRequest(`/roadmap?role=${encodeURIComponent(roleName)}`);
      if (payload && Array.isArray(payload.nodes) && payload.nodes.length) {
        roles[payload.role || roleName] = {
          focus: payload.focus || roles[roleName].focus,
          requiredSkills: payload.requiredSkills || roles[roleName].requiredSkills,
          nodes: payload.nodes
        };
      }
    } catch {
      // The bundled catalogs remain available when the local backend is offline.
    }
  });

  const resourcesRequest = apiRequest("/resources")
    .then((payload) => {
      if (Array.isArray(payload.resources) && payload.resources.length) resourceCatalog = payload.resources;
    })
    .catch(() => {});

  const marketRequest = apiRequest("/market/trends")
    .then((payload) => {
      const aggregated = aggregateMarketTrends(payload.trends);
      if (aggregated.length) marketData = aggregated;
      if (payload.lastScan) state.lastScan = new Date(payload.lastScan).toLocaleString();
    })
    .catch(() => {});

  await Promise.all([...roadmapRequests, resourcesRequest, marketRequest]);
}

function accountFromBackendUser(user) {
  return {
    id: user.id || accountIdFromEmail(user.email),
    name: user.name || displayNameFromEmail(user.email),
    email: normalizeEmail(user.email),
    role: user.role || "Student",
    provider: user.provider || "Email/Password",
    passwordSalt: "",
    passwordHash: "",
    passwordManaged: true,
    createdAt: user.createdAt || "Backend account",
    lastLogin: user.lastLogin || "",
    status: user.status || "Active",
    twoFactor: false
  };
}

function upsertAccountFromBackend(user) {
  if (!user || !user.email) return null;
  const account = accountFromBackendUser(user);
  const index = (state.accounts || []).findIndex((item) => normalizeEmail(item.email) === account.email);
  if (index >= 0) {
    state.accounts[index] = { ...state.accounts[index], ...account };
  } else {
    state.accounts = [account, ...(state.accounts || [])];
  }
  return account;
}

function applyBackendUser(user) {
  const account = upsertAccountFromBackend(user);
  if (!account) return;
  state.user = {
    ...state.user,
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    authProvider: account.provider,
    lastLogin: account.lastLogin || state.user.lastLogin,
    signedIn: true
  };
}

function normalizePortfolioProject(project) {
  const stack = Array.isArray(project.stack)
    ? project.stack
    : Array.isArray(project.techStack)
      ? project.techStack
      : [project.language || project.skill || "Portfolio evidence"];
  return {
    id: project.id || project.name,
    name: project.name || "career-portfolio",
    url: project.url || "#",
    language: project.language || stack[0] || "Code",
    summary: project.summary || project.description || "Portfolio evidence aligned with the selected career role.",
    stack: stack.filter(Boolean),
    source:
      project.source ||
      (/github\.com\/(?:sample|example)\//i.test(project.url || "") ? "demo" : project.url ? "github" : "manual")
  };
}

function normalizePortfolioProjects(projects) {
  const normalized = Array.isArray(projects) ? projects.map(normalizePortfolioProject) : [];
  return normalized.length ? normalized : defaultPortfolio;
}

function normalizeChatMessages(messages) {
  return (Array.isArray(messages) ? messages : [])
    .filter((message) => message && message.from && message.text)
    .map((message) => ({
      from: message.from === "user" ? "user" : "mentor",
      text: String(message.text),
      createdAt: message.createdAt || new Date().toISOString()
    }));
}

async function hydrateFromBackend() {
  if (!apiToken()) return false;
  const auth = await apiOptional("/auth/me");
  if (!auth || !auth.user) return false;
  applyBackendUser(auth.user);

  const [profileRes, roadmapRes, skillsRes, chatRes, portfolioRes, sessionsRes, recordsRes, bookmarksRes, resourceProgressRes] = await Promise.all([
    apiOptional("/me/profile"),
    apiOptional("/me/roadmap"),
    apiOptional("/me/skills"),
    apiOptional("/me/chat"),
    apiOptional("/me/portfolio"),
    apiOptional("/me/mentor-sessions"),
    apiOptional("/me/records"),
    apiOptional("/me/bookmarks"),
    apiOptional("/me/resource-progress")
  ]);

  const profile = profileRes && profileRes.profile;
  if (profile) {
    state.role = roles[profile.targetRole] ? profile.targetRole : state.role;
    state.github = profile.github || state.github || "";
    state.transcript.gpa = Number(profile.gpa || state.transcript.gpa || 0);
    if (Array.isArray(profile.transcriptSignals) && profile.transcriptSignals.length) {
      state.transcript.signals = profile.transcriptSignals;
    }
  }
  if (roadmapRes && roadmapRes.completedNodes) {
    state.completed = roadmapRes.completedNodes;
  }
  if (skillsRes && Array.isArray(skillsRes.skills)) {
    state.skills = skillsRes.skills;
  }
  if (chatRes && Array.isArray(chatRes.messages) && chatRes.messages.length) {
    state.chat = normalizeChatMessages(chatRes.messages);
  }
  if (portfolioRes) {
    state.github = portfolioRes.github || state.github || "";
    state.portfolioShareUrl = portfolioRes.shareUrl || state.portfolioShareUrl;
    if (Array.isArray(portfolioRes.projects)) {
      state.portfolio = normalizePortfolioProjects(portfolioRes.projects);
    }
  }
  if (sessionsRes && Array.isArray(sessionsRes.sessions) && sessionsRes.sessions.length) {
    state.sessions = sessionsRes.sessions.map((session) => ({
      id: session.id,
      role: session.role,
      topic: session.topic,
      status: session.status,
      owner: session.owner,
      createdAt: session.createdAt
    }));
  }
  if (recordsRes && recordsRes.records) {
    state.backendRecords = recordsRes.records;
  }
  if (bookmarksRes && Array.isArray(bookmarksRes.bookmarks)) {
    state.bookmarks = bookmarksRes.bookmarks;
  }
  if (resourceProgressRes && Array.isArray(resourceProgressRes.completedResources)) {
    state.completedResources = resourceProgressRes.completedResources;
  }

  saveState();
  return true;
}

async function syncProfileToBackend() {
  return apiOptional("/me/profile", {
    method: "PUT",
    body: {
      fullName: state.user.name,
      targetRole: state.role,
      gpa: state.transcript.gpa,
      github: state.github,
      transcriptSignals: state.transcript.signals
    }
  });
}

async function syncRoadmapToBackend() {
  const payload = await apiOptional("/me/roadmap", {
    method: "PUT",
    body: {
      targetRole: state.role,
      completedNodes: state.completed
    }
  });
  if (payload && payload.completedNodes) {
    state.completed = payload.completedNodes;
    state.role = payload.targetRole || state.role;
    saveState();
  }
  return payload;
}

async function syncSkillsToBackend(createSnapshot = false) {
  const payload = await apiOptional("/me/skills", {
    method: "PUT",
    body: {
      targetRole: state.role,
      skills: state.skills,
      createSnapshot
    }
  });
  if (payload && Array.isArray(payload.skills)) {
    state.skills = payload.skills;
    saveState();
  }
  return payload;
}

async function syncStudentSnapshot() {
  saveState();
  await Promise.all([syncProfileToBackend(), syncRoadmapToBackend(), syncSkillsToBackend()]);
  saveState();
}

function currentRole() {
  return roles[state.role] || roles["Cloud Architect"];
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function safeExternalUrl(value) {
  try {
    const url = new URL(String(value || ""), window.location.origin);
    if (!["http:", "https:"].includes(url.protocol)) return "#";
    return escapeHtml(url.href);
  } catch {
    return "#";
  }
}

function formatGrowth(value) {
  const number = Number(value || 0);
  return `${number > 0 ? "+" : ""}${number}%`;
}

function compactDateTime(value) {
  if (!value) return "Not run";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).split(",")[0] || "Not run";
  return date.toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getCompletion() {
  const nodes = currentRole().nodes;
  const done = nodes.filter((item) => state.completed[item.id]).length;
  return {
    done,
    total: nodes.length,
    percent: Math.round((done / nodes.length) * 100)
  };
}

function getGap() {
  const required = currentRole().requiredSkills;
  const owned = new Set(state.skills.map(normalize));
  const matched = required.filter((skill) => owned.has(normalize(skill)));
  const missing = required.filter((skill) => !owned.has(normalize(skill)));
  return { required, matched, missing };
}

function getUrgentSkills() {
  const missing = new Set(getGap().missing.map(normalize));
  return currentRole()
    .nodes.filter((item) => item.skills.some((skill) => missing.has(normalize(skill))))
    .sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority))
    .slice(0, 5);
}

function priorityRank(priority) {
  return { High: 1, Medium: 2, Low: 3 }[priority] || 4;
}

async function init() {
  if (!ensureAppAccess()) return;
  await hydratePublicCatalogs();
  await hydrateFromBackend();
  setupNavigation();
  setupRoleSelect();
  setupMentor();
  setupRoadmapActions();
  setupGap();
  setupMarket();
  setupPortfolio();
  setupWorkspace();
  setupResources();
  setupSpec();
  setupUsers();
  renderAll();
  const initialSection = sectionFromHash();
  if (initialSection && document.getElementById(initialSection)) {
    activateSection(initialSection);
  }
  window.addEventListener("hashchange", () => {
    const sectionId = sectionFromHash();
    if (sectionId && document.getElementById(sectionId)) {
      activateSection(sectionId, false);
    }
  });
  window.addEventListener("popstate", () => {
    const sectionId = sectionFromHash();
    if (sectionId && document.getElementById(sectionId)) activateSection(sectionId, false);
  });
  refreshIcons();
}

function ensureAppAccess() {
  if (state.user && state.user.signedIn) {
    return true;
  }
  const next = encodeURIComponent(`index.html${window.location.hash || "#view-dashboard"}`);
  window.location.replace(`login.html?next=${next}`);
  return false;
}

function setupNavigation() {
  document.querySelectorAll(".nav-item").forEach((button) => {
    const label = button.querySelector("span")?.textContent.trim() || sectionLabels[button.dataset.section] || "Section";
    button.setAttribute("aria-label", label);
    button.title = label;
    button.addEventListener("click", () => activateSection(button.dataset.section));
  });

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", () => activateSection(button.dataset.jump));
  });

  document.getElementById("saveSnapshot").addEventListener("click", async () => {
    await syncStudentSnapshot();
    toast(apiToken() ? "Student snapshot saved to backend and local cache." : "Student snapshot saved to local cache.");
    renderUsers();
  });
}

function sectionFromHash() {
  const hash = window.location.hash.replace("#", "");
  return hash.startsWith("view-") ? hash.replace("view-", "") : hash;
}

function activateSection(sectionId, updateHash = true) {
  const activeView = document.getElementById(sectionId);
  if (!activeView || !activeView.classList.contains("view")) return;
  let activeNav = null;
  document.querySelectorAll(".nav-item").forEach((item) => {
    const active = item.dataset.section === sectionId;
    item.classList.toggle("active", active);
    if (active) {
      item.setAttribute("aria-current", "page");
      activeNav = item;
    } else {
      item.removeAttribute("aria-current");
    }
  });
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === sectionId);
  });
  const routeHash = `#view-${sectionId}`;
  if (updateHash && window.location.hash !== routeHash) {
    window.history.pushState({ sectionId }, "", routeHash);
  }
  if (sectionId === "market") {
    renderMarket();
  }
  document.title = `${sectionLabels[sectionId] || "Workspace"} - SE Career Compass`;
  if (activeNav && window.innerWidth <= 1180) {
    const navList = activeNav.closest(".nav-list");
    if (navList) {
      navList.scrollTo({ left: Math.max(0, activeNav.offsetLeft - navList.clientWidth / 2 + activeNav.clientWidth / 2), behavior: "smooth" });
    }
  }
  window.requestAnimationFrame(() => {
    if (sectionId === "dashboard") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    activeView.scrollIntoView({ block: "start", behavior: "smooth" });
    const heading = activeView.querySelector("h2");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  });
  refreshIcons();
}

function setupRoleSelect() {
  const select = document.getElementById("roleSelect");
  select.innerHTML = Object.keys(roles)
    .map((role) => `<option value="${escapeHtml(role)}">${escapeHtml(role)}</option>`)
    .join("");
  select.value = state.role;
  select.addEventListener("change", async () => {
    state.role = select.value;
    saveState();
    renderAll();
    toast(`Target role changed to ${state.role}.`);
    await Promise.all([syncProfileToBackend(), syncRoadmapToBackend(), syncSkillsToBackend()]);
    renderUsers();
  });
}

function setupMentor() {
  document.getElementById("chatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    sendMentorQuestion(document.getElementById("chatInput").value);
  });

  document.querySelectorAll("#quickPrompts [data-prompt]").forEach((button) => {
    button.addEventListener("click", () => sendMentorQuestion(button.dataset.prompt));
  });

  document.getElementById("clearChat").addEventListener("click", async () => {
    if (!window.confirm("Clear the mentor conversation history?")) return;
    const button = document.getElementById("clearChat");
    button.disabled = true;
    await apiOptional("/me/chat", { method: "DELETE" });
    state.chat = [{ from: "mentor", text: advisorWelcomeMessage(), createdAt: new Date().toISOString() }];
    saveState();
    renderChat();
    renderUsers();
    button.disabled = false;
    toast("Mentor conversation cleared.");
  });

  document.getElementById("transcriptFile").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!["txt", "csv"].includes(extension) || file.size > 2 * 1024 * 1024) {
      event.target.value = "";
      document.getElementById("transcriptStatus").textContent = "Use a TXT or CSV file no larger than 2 MB.";
      toast("Transcript was not accepted. Use TXT or CSV up to 2 MB.");
      return;
    }
    state.transcript.fileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      state.transcript.signals = inferTranscriptSignals(String(reader.result || ""));
      saveState();
      renderMentorContext();
      renderDashboard();
      toast("Transcript context updated.");
      syncProfileToBackend();
    };
    reader.onerror = () => {
      state.transcript.signals = [`${file.name}: uploaded for review`];
      saveState();
      renderMentorContext();
    };
    reader.readAsText(file);
    document.getElementById("transcriptStatus").textContent = `${file.name} ready for AI personalization`;
  });

  document.getElementById("gpaInput").addEventListener("input", (event) => {
    state.transcript.gpa = Number(event.target.value || 0);
    saveState();
    renderMentorContext();
    renderDashboard();
    syncProfileToBackend();
  });

  document.getElementById("mentorRefresh").addEventListener("click", async () => {
    state.github = document.getElementById("githubInputMentor").value.trim();
    saveState();
    renderMentorContext();
    renderDashboard();
    await syncProfileToBackend();
    toast(apiToken() ? "Mentor context refreshed and synced." : "Mentor context refreshed.");
  });
}

async function sendMentorQuestion(rawQuestion) {
  const input = document.getElementById("chatInput");
  const question = String(rawQuestion || "").trim();
  if (!question) return;
  if (mentorBusy) {
    toast("The advisor is finishing the previous answer.");
    return;
  }
  mentorBusy = true;
  const sendButton = document.querySelector("#chatForm button[type='submit']");
  input.disabled = true;
  sendButton.disabled = true;
  state.chat.push({ from: "user", text: question, createdAt: new Date().toISOString() });
  if (input) input.value = "";
  renderChat(true);

  await new Promise((resolve) => window.setTimeout(resolve, Math.min(900, 350 + question.length * 8)));
  try {
    const payload = await apiOptional("/me/chat", {
      method: "POST",
      body: { message: question }
    });
    if (payload && Array.isArray(payload.history)) {
      state.chat = normalizeChatMessages(payload.history);
    } else {
      state.chat.push({ from: "mentor", text: mentorReply(question), createdAt: new Date().toISOString() });
      if (apiToken()) toast("Backend advisor unavailable; local personalized advisor used.");
    }
    saveState();
    renderChat();
    renderUsers();
  } finally {
    mentorBusy = false;
    input.disabled = false;
    sendButton.disabled = false;
    input.focus();
  }
}

function inferTranscriptSignals(text) {
  const source = normalize(text);
  const signals = [];
  if (source.includes("data") || source.includes("algorithm")) signals.push("Data Structures: strong signal");
  if (source.includes("database") || source.includes("sql")) signals.push("Database: strong signal");
  if (source.includes("network")) signals.push("Networking: needs review");
  if (source.includes("cloud")) signals.push("Cloud Computing: existing exposure");
  if (source.includes("software engineering")) signals.push("Software Engineering: good process foundation");
  if (signals.length === 0) {
    signals.push("Transcript uploaded: manual academic review recommended");
  }
  return signals.slice(0, 5);
}

function advisorWelcomeMessage() {
  return [
    "Chào AnNDH2, mình là **CareerCompass AI Advisor** - tư vấn viên định hướng nghề nghiệp cho sinh viên Software Engineering.",
    "Mình có thể hỗ trợ bạn chọn target role, phân tích skill gap, lập roadmap học tập, gợi ý portfolio/GitHub và chuẩn bị thực tập.",
    "Bạn có thể hỏi tự nhiên, ví dụ: \"Mình nên học gì trong 4 tuần tới?\" hoặc bấm các gợi ý nhanh phía trên."
  ].join("\n\n");
}

function mentorReply(question) {
  const key = searchKey(question);
  if (hasAny(key, ["chao", "xin chao", "hello", "ban la ai", "help", "giup"])) {
    return advisorWelcomeMessage();
  }
  if (hasAny(key, ["portfolio", "du an", "project", "san pham", "readme", "e-portfolio"])) {
    return portfolioCounselingReply();
  }
  if (hasAny(key, ["nen chon", "chon role", "dinh huong", "nghe nao", "career role", "target role", "vai tro"])) {
    return roleCounselingReply();
  }
  if (hasAny(key, ["lo trinh", "roadmap", "4 tuan", "ke hoach", "hoc gi", "learning plan", "hoc tap"])) {
    return roadmapCounselingReply();
  }
  if (hasAny(key, ["thieu", "skill gap", "gap", "ky nang", "skills", "uu tien", "yeu"])) {
    return skillGapCounselingReply();
  }
  if (hasAny(key, ["github", "repo", "repository", "source code"])) {
    return githubCounselingReply();
  }
  if (hasAny(key, ["thuc tap", "intern", "internship", "cv", "resume", "phong van", "interview", "viec lam", "job"])) {
    return internshipCounselingReply();
  }
  if (hasAny(key, ["gpa", "diem", "bang diem", "transcript", "mon hoc", "hoc luc"])) {
    return academicCounselingReply();
  }
  if (hasAny(key, ["thi truong", "market", "xu huong", "trend", "linkedin", "topcv", "nhu cau"])) {
    return marketCounselingReply();
  }
  if (hasAny(key, ["tai lieu", "resource", "khoa hoc", "hoc o dau", "youtube", "documentation", "course"])) {
    return resourceCounselingReply();
  }
  return generalAdvisorReply();
}

function projectSuggestion() {
  const suggestions = {
    "Cloud Architect": "một hệ thống multi-service deploy lên cloud bằng Docker/Terraform, có monitoring và ghi chú cost",
    "Data Engineer": "một pipeline từ raw data đến warehouse model, có data quality checks và dashboard kết quả",
    "DevOps Engineer": "một CI/CD pipeline deploy app containerized, kèm monitoring và rollback notes",
    "Mobile Developer": "một mobile app có auth, API caching, test cơ bản và release notes"
  };
  return suggestions[state.role] || suggestions["Cloud Architect"];
}

function searchKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function hasAny(text, terms) {
  return terms.some((term) => text.includes(searchKey(term)));
}

function advisorSnapshot() {
  const gap = getGap();
  const completion = getCompletion();
  const urgent = getUrgentSkills();
  const readiness = getReadinessScore();
  const gpa = Number(state.transcript.gpa || 0);
  return {
    gap,
    completion,
    urgent,
    readiness,
    gpa: Number.isFinite(gpa) ? gpa.toFixed(2) : "N/A",
    missingText: gap.missing.slice(0, 4).join(", ") || "chưa có kỹ năng thiếu nghiêm trọng",
    matchedText: gap.matched.slice(0, 4).join(", ") || "chưa có kỹ năng khớp rõ ràng",
    project: projectSuggestion()
  };
}

function roleCounselingReply() {
  const snap = advisorSnapshot();
  const roleNotes = {
    "Cloud Architect": "hợp với bạn nếu bạn thích hệ thống phân tán, cloud infrastructure, security, networking và tối ưu vận hành.",
    "Data Engineer": "hợp với bạn nếu bạn thích SQL, Python, pipeline dữ liệu, data warehouse và xử lý dữ liệu ở quy mô lớn.",
    "DevOps Engineer": "hợp với bạn nếu bạn thích automation, CI/CD, Linux, container, monitoring và làm hệ thống ổn định hơn.",
    "Mobile Developer": "hợp với bạn nếu bạn thích xây sản phẩm người dùng cuối, UI/UX, API integration và release app."
  };
  return [
    `Nếu tư vấn như một counselor, mình sẽ giữ bạn ở hướng **${state.role}** trong giai đoạn này vì ${roleNotes[state.role]}`,
    `Tín hiệu hiện tại: readiness khoảng **${snap.readiness}%**, roadmap hoàn thành **${snap.completion.percent}%**, kỹ năng khớp **${snap.gap.matched.length}/${snap.gap.required.length}**.`,
    "Cách ra quyết định trong 2 tuần tới:",
    `- Làm 1 mini project đúng role: ${snap.project}.`,
    `- Học trước các kỹ năng còn thiếu: ${snap.missingText}.`,
    "- Sau khi có project đầu tiên, hãy nhờ Industry Mentor review README và architecture/story."
  ].join("\n\n");
}

function roadmapCounselingReply() {
  const snap = advisorSnapshot();
  const priorities = snap.urgent.slice(0, 4);
  const plan = priorities.length ? priorities : currentRole().nodes.slice(0, 4);
  return [
    `Mình đề xuất roadmap 4 tuần cho **${state.role}** như sau:`,
    plan.map((item, index) => `- Tuần ${index + 1}: **${item.title}** (${item.duration}) - tập trung vào ${item.skills.join(", ")}.`).join("\n"),
    "Cách học để không bị loạn roadmap online:",
    "- Mỗi tuần chỉ chọn 1 node chính.",
    "- Cuối tuần phải có bằng chứng: commit GitHub, README, screenshot, hoặc short demo.",
    "- Sau 4 tuần, dùng Skill Gap Report để kiểm tra lại độ sẵn sàng."
  ].join("\n\n");
}

function skillGapCounselingReply() {
  const snap = advisorSnapshot();
  const urgent = snap.urgent.slice(0, 5);
  return [
    `Với target **${state.role}**, hệ thống đang thấy bạn match **${snap.gap.matched.length}/${snap.gap.required.length}** kỹ năng.`,
    `Các gap cần xử lý trước: **${snap.missingText}**.`,
    "Mức ưu tiên học:",
    urgent.map((item, index) => `- ${index + 1}. **${item.title}** - ${item.priority} priority, liên quan ${item.skills.join(", ")}.`).join("\n") || "- Hiện chưa có gap nghiêm trọng. Hãy chuyển trọng tâm sang portfolio.",
    "Lời khuyên của mình: đừng học tất cả cùng lúc. Chọn gap số 1, hoàn thành node trong Roadmap, rồi gắn bằng chứng vào E-Portfolio."
  ].join("\n\n");
}

function portfolioCounselingReply() {
  const snap = advisorSnapshot();
  return [
    `Portfolio của bạn nên kể một câu chuyện duy nhất: **\"Tôi đang trở thành ${state.role}\"**.`,
    `Dự án nên làm tiếp theo: **${snap.project}**.`,
    "Checklist cho README để nhà tuyển dụng dễ đánh giá:",
    "- Problem: dự án giải quyết vấn đề gì?",
    "- Architecture: sơ đồ hoặc mô tả module chính.",
    "- Tech stack: vì sao chọn các công nghệ đó?",
    "- Evidence: screenshot, demo link, test result, deployment note.",
    "- Reflection: 2-3 trade-offs hoặc lỗi đã gặp và cách xử lý.",
    `Hiện bạn có **${state.portfolio.length}** project trong E-Portfolio. Mục tiêu tốt cho demo là 3 project, nhưng ít nhất 1 project phải thật sự bám sát ${state.role}.`
  ].join("\n\n");
}

function githubCounselingReply() {
  const snap = advisorSnapshot();
  const linked = state.github ? `đã link GitHub **${state.github}**` : "chưa link GitHub";
  return [
    `Hiện trạng: bạn ${linked}.`,
    "Để GitHub nhìn chuyên nghiệp hơn:",
    "- Pin 2-3 repo đúng target role, không pin repo bài tập rời rạc.",
    "- README phải có mục overview, tech stack, setup, screenshots và learning outcome.",
    "- Commit message nên rõ ý, tránh toàn bộ lịch sử chỉ là \"update\".",
    "- Repo nên có `.env.example`, hướng dẫn chạy và license nếu cần.",
    `Nếu bạn chưa biết repo nào nên làm, hãy bắt đầu với: **${snap.project}**.`
  ].join("\n\n");
}

function internshipCounselingReply() {
  const snap = advisorSnapshot();
  return [
    `Để chuẩn bị thực tập cho hướng **${state.role}**, mình sẽ ưu tiên theo thứ tự này:`,
    `- 1. Đóng 2-3 skill gap quan trọng: ${snap.missingText}.`,
    `- 2. Hoàn thành 1 project portfolio role-specific: ${snap.project}.`,
    "- 3. Viết CV theo bằng chứng, không chỉ liệt kê công nghệ.",
    "- 4. Chuẩn bị 3 câu chuyện phỏng vấn: project khó nhất, lỗi từng gặp, cách tự học công nghệ mới.",
    `Với GPA **${snap.gpa}**, tín hiệu học thuật của bạn ${Number(snap.gpa) >= 3.2 ? "khá ổn" : "nên được bù bằng portfolio mạnh hơn"}. Nhà tuyển dụng SE thường nhìn project và GitHub rất kỹ, nên hãy biến roadmap thành bằng chứng cụ thể.`
  ].join("\n\n");
}

function academicCounselingReply() {
  const snap = advisorSnapshot();
  const signals = (state.transcript.signals || []).slice(0, 4).join("; ");
  return [
    `Mình đang đọc academic context của bạn theo hướng tư vấn, không chỉ nhìn điểm số.`,
    `GPA hiện tại: **${snap.gpa}**. Transcript signals: ${signals || "chưa có transcript upload"}.`,
    "Cách dùng điểm số trong định hướng nghề:",
    "- Nếu môn nền tảng như Data Structures, Database, Network tốt: dùng nó làm lợi thế khi chọn role.",
    "- Nếu điểm một môn chưa cao: bù bằng project có evidence rõ ràng.",
    "- Khi hỏi mentor/counselor, hãy đưa cả GPA, môn mạnh/yếu và target role để nhận feedback sát hơn.",
    `Với **${state.role}**, mình khuyên bạn tập trung chứng minh các phần còn thiếu: ${snap.missingText}.`
  ].join("\n\n");
}

function marketCounselingReply() {
  const relevant = marketData
    .filter((item) => currentRole().requiredSkills.map(searchKey).includes(searchKey(item.skill)))
    .map((item) => ({ ...item, count: item.LinkedIn + item.TopCV }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 4);
  const fallback = marketData.map((item) => ({ ...item, count: item.LinkedIn + item.TopCV })).sort((a, b) => b.count - a.count).slice(0, 4);
  const data = relevant.length ? relevant : fallback;
  return [
    `Dựa trên Market Pulse mô phỏng cho **${state.role}**, các keyword đáng chú ý là:`,
    data.map((item) => `- **${item.skill}**: ${item.count} mentions, tăng khoảng ${item.growth}%.`).join("\n"),
    "Cách dùng insight này:",
    "- Không chạy theo trend nếu chưa có nền tảng.",
    "- Ưu tiên skill vừa xuất hiện trong job market vừa nằm trong skill gap của bạn.",
    "- Sau mỗi daily scan, cập nhật roadmap node kế tiếp nếu thị trường đổi mạnh."
  ].join("\n\n");
}

function resourceCounselingReply() {
  const snap = advisorSnapshot();
  const missing = new Set(snap.gap.missing.map(searchKey));
  const resources = resourceCatalog
    .filter((item) => item.role === state.role || missing.has(searchKey(item.skill)))
    .slice(0, 5);
  return [
    `Mình gợi ý tài liệu học theo target **${state.role}**, ưu tiên skill gap trước:`,
    resources.map((item) => `- **${item.title}** (${item.level}) - ${item.skill}: ${item.description}`).join("\n") || "- Hiện chưa có resource phù hợp trong Course Repo.",
    "Cách học hiệu quả:",
    "- Đọc docs/course trước, nhưng phải làm task nhỏ ngay trong ngày.",
    "- Bookmark resource trong Course Repo để nhóm bạn demo được flow học tập.",
    "- Sau khi học xong, tick roadmap node và cập nhật E-Portfolio."
  ].join("\n\n");
}

function generalAdvisorReply() {
  const snap = advisorSnapshot();
  return [
    `Mình hiểu câu hỏi của bạn theo hướng tư vấn tổng quan cho **${state.role}**.`,
    `Tình trạng hiện tại: readiness **${snap.readiness}%**, roadmap **${snap.completion.percent}%**, skill match **${snap.gap.matched.length}/${snap.gap.required.length}**, portfolio **${state.portfolio.length}** project.`,
    "Mình khuyên bạn làm 3 việc tiếp theo:",
    `- Hoàn thành node ưu tiên: **${nextBestAction()}**.`,
    `- Đóng skill gap chính: ${snap.missingText}.`,
    `- Xây portfolio evidence: ${snap.project}.`,
    "Nếu muốn mình tư vấn sát hơn, bạn hãy hỏi theo một trong các hướng: lộ trình 4 tuần, kỹ năng thiếu, project portfolio, CV/GitHub hoặc chuẩn bị thực tập."
  ].join("\n\n");
}

function setupRoadmapActions() {
  document.getElementById("roadmapSearch").addEventListener("input", renderRoadmap);
  document.getElementById("roadmapStatusFilter").addEventListener("change", renderRoadmap);
  document.getElementById("resetRoadmap").addEventListener("click", async () => {
    if (!window.confirm(`Reset roadmap progress for ${state.role}?`)) return;
    currentRole().nodes.forEach((item) => delete state.completed[item.id]);
    saveState();
    renderRoadmap();
    renderDashboard();
    renderGap();
    await syncRoadmapToBackend();
    renderUsers();
  });

  document.getElementById("completeFirstPriority").addEventListener("click", async () => {
    const urgent = getUrgentSkills()
      .filter((item) => !state.completed[item.id])
      .sort((a, b) => priorityRank(a.priority) - priorityRank(b.priority));
    const first = urgent[0] || currentRole().nodes.find((item) => !state.completed[item.id]);
    if (first) {
      state.completed[first.id] = true;
      saveState();
      renderRoadmap();
      renderDashboard();
      renderUsers();
      toast(`${first.title} marked as completed.`);
      await syncRoadmapToBackend();
      renderUsers();
    }
  });
}

function setupGap() {
  document.getElementById("skillSearch").addEventListener("input", renderGap);
  document.getElementById("gapStatusFilter").addEventListener("change", renderGap);
  document.getElementById("addSkillForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = document.getElementById("customSkill");
    const skill = input.value.trim();
    if (!skill) return;
    if (!state.skills.map(normalize).includes(normalize(skill))) {
      state.skills.push(skill);
    }
    input.value = "";
    saveState();
    renderGap();
    renderDashboard();
    await syncSkillsToBackend();
    renderUsers();
  });

  document.getElementById("saveSkillAssessment").addEventListener("click", async () => {
    const button = document.getElementById("saveSkillAssessment");
    button.disabled = true;
    const payload = await syncSkillsToBackend(true);
    button.disabled = false;
    toast(payload ? "Skill assessment snapshot saved." : "Assessment saved to the local demo cache.");
  });
  document.getElementById("exportGapReport").addEventListener("click", exportGapReport);
}

function setupMarket() {
  document.getElementById("marketSource").addEventListener("change", renderMarket);
  document.getElementById("marketScope").addEventListener("change", renderMarket);
  document.getElementById("simulateScrape").addEventListener("click", async () => {
    const button = document.getElementById("simulateScrape");
    button.disabled = true;
    button.innerHTML = '<i data-lucide="loader-circle"></i> Scanning...';
    refreshIcons();
    try {
      const scan = await apiOptional("/market/scan", { method: "POST", body: { role: state.role } });
      if (scan && Array.isArray(scan.trends)) {
        applyMarketScan(scan);
      } else {
        marketData.forEach((item) => {
          item.LinkedIn += Math.round(Math.random() * 4);
          item.TopCV += Math.round(Math.random() * 3);
          item.growth += Math.round(Math.random() * 4 - 1);
        });
        state.lastScan = new Date().toLocaleString();
      }
      state.notifications = [
        { type: "Market Pulse", text: `Market scan refreshed for ${state.role}.`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
        ...(state.notifications || [])
      ].slice(0, 8);
      saveState();
      renderMarket();
      renderDashboard();
      renderUsers();
      toast(apiToken() ? "Daily market scan completed through backend." : "Daily market scan completed with demo data.");
    } finally {
      button.disabled = false;
      button.innerHTML = '<i data-lucide="calendar-sync"></i> Run daily scan';
      refreshIcons();
    }
  });
  window.addEventListener("resize", () => {
    if (document.getElementById("market").classList.contains("active")) renderMarket();
  });
}

function setupPortfolio() {
  document.getElementById("githubUsername").value = state.github || "";
  document.getElementById("githubInputMentor").value = state.github || "";

  document.getElementById("syncGithub").addEventListener("click", async () => {
    const username = document.getElementById("githubUsername").value.trim();
    if (username && !/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username)) {
      toast("Enter a valid GitHub username.");
      return;
    }
    state.github = username;
    document.getElementById("githubInputMentor").value = username;
    if (!username) {
      state.portfolio = defaultPortfolio;
      saveState();
      renderPortfolio();
      renderDashboard();
      return;
    }
    await syncGitHub(username);
  });

  document.getElementById("portfolioFilter").addEventListener("change", renderPortfolio);

  document.getElementById("manualProjectForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("manualProjectName").value.trim();
    const summary = document.getElementById("manualProjectSummary").value.trim();
    const url = document.getElementById("manualProjectUrl").value.trim();
    const stack = document.getElementById("manualProjectStack").value.split(",").map((item) => item.trim()).filter(Boolean);
    if (!name || !summary || !stack.length) return;
    state.portfolio = [
      {
        id: `manual-${Date.now()}`,
        name,
        url: url || "#",
        language: stack[0],
        summary,
        stack,
        source: "manual"
      },
      ...normalizePortfolioProjects(state.portfolio)
    ].slice(0, 12);
    event.target.reset();
    saveState();
    renderPortfolio();
    renderDashboard();
    await apiOptional("/me/portfolio/sync", {
      method: "POST",
      body: { github: state.github, projects: state.portfolio }
    });
    toast("Manual project evidence added.");
  });

  document.getElementById("copyPortfolioUrl").addEventListener("click", async () => {
    const url = portfolioUrl();
    try {
      await navigator.clipboard.writeText(url);
      toast("Portfolio URL copied.");
    } catch {
      toast(url);
    }
  });
}

function setupWorkspace() {
  document.getElementById("actorMode").value = state.actorMode || "student";
  document.getElementById("actorMode").addEventListener("change", (event) => {
    state.actorMode = event.target.value;
    saveState();
    renderWorkspace();
  });

  document.getElementById("taskForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const titleInput = document.getElementById("taskTitleInput");
    const dueInput = document.getElementById("taskDueInput");
    const title = titleInput.value.trim();
    if (!title) return;
    state.tasks = [
      {
        id: `task-${Date.now()}`,
        lane: document.getElementById("taskLaneInput").value,
        actor: state.actorMode || "student",
        title,
        due: dueInput.value.trim() || "No due date",
        tag: "CUSTOM"
      },
      ...(state.tasks || [])
    ];
    titleInput.value = "";
    dueInput.value = "";
    saveState();
    renderWorkspace();
    renderDashboard();
    toast("Career action added to the workspace.");
  });

  document.getElementById("createMentorSession").addEventListener("click", async () => {
    const session = {
      role: "Industry Mentor",
      topic: `${state.role} portfolio review`,
      status: "Scheduled",
      createdAt: new Date().toLocaleString()
    };
    state.sessions = [session, ...(state.sessions || [])];
    state.notifications = [
      { type: "Mentor Session", text: `New session created for ${state.role}.`, time: new Date().toLocaleTimeString() },
      ...(state.notifications || [])
    ];
    saveState();
    renderWorkspace();
    renderDashboard();
    renderUsers();
    toast("Mentor session created.");
    const payload = await apiOptional("/me/mentor-sessions", {
      method: "POST",
      body: session
    });
    if (payload && payload.session) {
      state.sessions = payload.sessions.map((item) => ({
        id: item.id,
        role: item.role,
        topic: item.topic,
        status: item.status,
        owner: item.owner,
        createdAt: item.createdAt
      }));
      saveState();
      renderWorkspace();
      renderUsers();
    }
  });

  document.getElementById("noteForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("noteInput");
    const text = input.value.trim();
    if (!text) return;
    const author = state.actorMode === "mentor" ? "Industry Mentor" : state.actorMode === "counselor" ? "Academic Counselor" : "SE Student";
    state.notes = [{ author, text, date: new Date().toISOString().slice(0, 10) }, ...(state.notes || [])];
    input.value = "";
    saveState();
    renderWorkspace();
    renderUsers();
    toast("Advising note saved.");
  });
}

function setupResources() {
  document.getElementById("resourceSearch").addEventListener("input", renderResources);
  document.getElementById("resourceLevel").addEventListener("change", renderResources);
  document.getElementById("resourceProvider").addEventListener("change", renderResources);
  document.getElementById("savedResourcesOnly").addEventListener("change", renderResources);
  document.getElementById("resetResourceFilters").addEventListener("click", () => {
    document.getElementById("resourceSearch").value = "";
    document.getElementById("resourceLevel").value = "all";
    document.getElementById("resourceProvider").value = "all";
    document.getElementById("savedResourcesOnly").checked = false;
    renderResources();
  });
}

function setupSpec() {
  document.getElementById("exportSpec").addEventListener("click", exportSpec);
}

function setupUsers() {
  document.getElementById("signOutButton").addEventListener("click", async () => {
    const token = localStorage.getItem(BACKEND_TOKEN_KEY);
    if (token) {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch {
        // Static-file fallback: local sign-out still works when the backend is not running.
      }
    }
    localStorage.removeItem(BACKEND_TOKEN_KEY);
    state.user.signedIn = false;
    state.user.remember = false;
    addLoginEvent("Sign out", `${state.user.email} signed out`);
    saveState();
    window.location.href = "login.html";
  });
}

function renderAll() {
  document.getElementById("roleSelect").value = state.role;
  renderDashboard();
  renderChat();
  renderMentorContext();
  renderRoadmap();
  renderGap();
  renderMarket();
  renderPortfolio();
  renderWorkspace();
  renderResources();
  renderSpec();
  renderUsers();
  refreshIcons();
}



function renderChat(showTyping = false) {
  const feed = document.getElementById("chatFeed");
  const messages = state.chat
    .map((message) => {
      const label = message.from === "user" ? "Bạn" : "AI Advisor";
      const timestamp = message.createdAt
        ? new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "";
      return `<div class="message ${message.from}"><div class="message-head"><strong>${label}</strong><time>${escapeHtml(timestamp)}</time></div>${renderMessageText(message.text)}</div>`;
    })
    .join("");
  const typing = showTyping
    ? '<div class="message mentor typing" aria-label="AI Advisor is typing"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></div>'
    : "";
  feed.innerHTML = messages + typing;
  feed.scrollTop = feed.scrollHeight;
}

function renderMessageText(text) {
  const escaped = escapeHtml(text);
  const withStrong = escaped.replace(/\*\*(.*?)\*\*/g, '<strong class="inline-strong">$1</strong>');
  return withStrong
    .split(/\n{2,}/)
    .map((block) => {
      const lines = block.split("\n").filter(Boolean);
      if (lines.length && lines.every((line) => line.trim().startsWith("- "))) {
        return `<ul>${lines.map((line) => `<li>${line.trim().slice(2)}</li>`).join("")}</ul>`;
      }
      return `<p>${lines.join("<br>")}</p>`;
    })
    .join("");
}

function renderMentorContext() {
  document.getElementById("gpaInput").value = state.transcript.gpa || "";
  document.getElementById("githubInputMentor").value = state.github || "";
  document.getElementById("transcriptStatus").textContent = state.transcript.fileName
    ? `${state.transcript.fileName} ready for AI personalization`
    : "No transcript uploaded";
  const signals = state.transcript.signals.map((signal) => `<li>${escapeHtml(signal)}</li>`).join("");
  document.getElementById("mentorContext").innerHTML = `
    <strong>Hồ sơ tư vấn hiện tại</strong>
    <ul class="urgent-list">${signals}</ul>
    <p>Target role: <strong>${escapeHtml(state.role)}</strong></p>
    <p>Skill gap chính: <strong>${escapeHtml(getGap().missing.slice(0, 3).join(", ") || "Không có gap lớn")}</strong></p>
    <p>Gợi ý hỏi tiếp: <strong>lộ trình 4 tuần, project portfolio, CV/GitHub, thực tập.</strong></p>
  `;
}

function renderRoadmap() {
  const completion = getCompletion();
  const query = normalize(document.getElementById("roadmapSearch")?.value);
  const status = document.getElementById("roadmapStatusFilter")?.value || "all";
  document.getElementById("roadmapPercent").textContent = `${completion.percent}%`;
  document.getElementById("roadmapProgressBar").style.width = `${completion.percent}%`;

  const remainingNodes = currentRole().nodes.filter((item) => !state.completed[item.id]);
  const remainingWeeks = remainingNodes.reduce((sum, item) => sum + (Number.parseInt(item.duration, 10) || 0), 0);
  document.getElementById("roadmapMeta").innerHTML = `<strong>${remainingNodes.length}</strong> milestones remaining · about <strong>${remainingWeeks}</strong> learning weeks`;
  const priorityButton = document.getElementById("completeFirstPriority");
  priorityButton.disabled = remainingNodes.length === 0;
  priorityButton.innerHTML = remainingNodes.length
    ? '<i data-lucide="check-check"></i> Mark first priority'
    : '<i data-lucide="badge-check"></i> Roadmap complete';

  const phases = [...new Set(currentRole().nodes.map((item) => item.phase))];
  const phaseMarkup = phases
    .map((phase) => {
      const allPhaseNodes = currentRole().nodes.filter((item) => item.phase === phase);
      const nodes = allPhaseNodes.filter((item) => {
        const complete = Boolean(state.completed[item.id]);
        const matchesStatus = status === "all" || (status === "complete" ? complete : !complete);
        const searchable = normalize(`${item.title} ${item.skills.join(" ")} ${item.priority} ${item.phase}`);
        return matchesStatus && (!query || searchable.includes(query));
      });
      if (!nodes.length) return "";
      const highCount = nodes.filter((item) => item.priority === "High").length;
      const doneCount = allPhaseNodes.filter((item) => state.completed[item.id]).length;
      return `
        <div class="roadmap-phase">
          <div class="phase-title">
            <h3>${escapeHtml(phase)}</h3>
            <span class="priority-badge">${doneCount}/${allPhaseNodes.length} done · ${highCount} high</span>
          </div>
          ${nodes.map(renderRoadmapNode).join("")}
        </div>
      `;
    })
    .join("");
  document.getElementById("roadmapTree").innerHTML = phaseMarkup || '<div class="empty-state"><i data-lucide="search-x"></i><strong>No roadmap milestone matched</strong><span>Clear the search or change the status filter.</span></div>';

  document.querySelectorAll("[data-node-id]").forEach((checkbox) => {
    checkbox.addEventListener("change", async () => {
      state.completed[checkbox.dataset.nodeId] = checkbox.checked;
      saveState();
      renderRoadmap();
      renderDashboard();
      renderUsers();
      await syncRoadmapToBackend();
      renderUsers();
    });
  });
  refreshIcons();
}

function renderRoadmapNode(item) {
  const complete = Boolean(state.completed[item.id]);
  const priorityClass = normalize(item.priority);
  const missing = new Set(getGap().missing.map(normalize));
  const gapSkills = item.skills.filter((skill) => missing.has(normalize(skill)));
  const reason = gapSkills.length ? `Closes gap: ${gapSkills.join(", ")}` : "Builds role evidence";
  const resources = item.resources
    .map(([label, url]) => `<a href="${safeExternalUrl(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`)
    .join("");
  return `
    <article class="skill-node ${complete ? "complete" : ""} ${priorityClass}">
      <div class="node-head">
        <input type="checkbox" data-node-id="${escapeHtml(item.id)}" ${complete ? "checked" : ""} aria-label="Mark ${escapeHtml(item.title)} completed" />
        <div>
          <p class="node-title">${escapeHtml(item.title)}</p>
          <div class="node-meta">${escapeHtml(item.priority)} priority - ${escapeHtml(item.duration)} - ${escapeHtml(item.skills.join(", "))}</div>
          <div class="node-reason"><i data-lucide="sparkles"></i> ${escapeHtml(reason)}</div>
        </div>
      </div>
      <div class="resource-links">${resources}</div>
    </article>
  `;
}

function renderGap() {
  renderSkillPicker();
  const gap = getGap();
  const percent = Math.round((gap.matched.length / gap.required.length) * 100);
  const missingByNode = getUrgentSkills();
  const reportFilter = document.getElementById("gapStatusFilter")?.value || "all";
  const visibleSkills = gap.required.filter((skill) => {
    const matched = gap.matched.includes(skill);
    return reportFilter === "all" || (reportFilter === "matched" ? matched : !matched);
  });
  const rows = visibleSkills
    .map((skill) => {
      const matched = gap.matched.includes(skill);
      return {
        skill,
        percent: matched ? 100 : 0,
        color: matched ? "var(--green)" : "var(--red)"
      };
    })
    .map((row) => `
      <div class="gap-row">
        <span>${escapeHtml(row.skill)}</span>
        <div class="bar-track"><b style="width:${row.percent}%; background:${row.color}"></b></div>
        <strong>${row.percent}%</strong>
      </div>
    `)
    .join("");

  const nextPriority = missingByNode.find((item) => !state.completed[item.id]);
  document.getElementById("gapOverview").innerHTML = `
    <article class="section-kpi"><span>Skill coverage</span><strong>${percent}%</strong><small>${gap.matched.length} of ${gap.required.length} role skills</small></article>
    <article class="section-kpi"><span>Critical gaps</span><strong>${gap.missing.length}</strong><small>Skills still requiring evidence</small></article>
    <article class="section-kpi"><span>Next learning action</span><strong>${escapeHtml(nextPriority?.title || "Build evidence")}</strong><small>${escapeHtml(nextPriority?.duration || "Portfolio review")}</small></article>
  `;

  document.getElementById("gapReport").innerHTML = `
    <div class="gap-score">
      <div class="score-box"><span>Skill coverage</span><strong>${percent}%</strong></div>
      <div class="score-box"><span>Matched</span><strong>${gap.matched.length}</strong></div>
      <div class="score-box"><span>Missing</span><strong>${gap.missing.length}</strong></div>
    </div>
    <div class="gap-bars">${rows || '<p class="empty-text">No skills match this report filter.</p>'}</div>
    <ol class="urgent-list">
      ${missingByNode.map((item) => `<li><strong>${escapeHtml(item.title)}</strong> - ${escapeHtml(item.skills.join(", "))}</li>`).join("") || "<li>No urgent missing skills for this role.</li>"}
    </ol>
  `;
  document.getElementById("gapActionPlan").innerHTML = nextPriority
    ? `<div><span>Recommended next</span><strong>${escapeHtml(nextPriority.title)}</strong><small>${escapeHtml(nextPriority.skills.join(", "))} · ${escapeHtml(nextPriority.duration)}</small></div><button class="primary-action" type="button" data-gap-open-roadmap><i data-lucide="arrow-right"></i> Continue in Roadmap</button>`
    : `<div><span>Gap status</span><strong>Core skill requirements covered</strong><small>Use E-Portfolio to prove these skills with real project evidence.</small></div><button class="secondary-action" type="button" data-gap-open-portfolio><i data-lucide="briefcase-business"></i> Build evidence</button>`;
  document.querySelector("[data-gap-open-roadmap]")?.addEventListener("click", () => activateSection("roadmap"));
  document.querySelector("[data-gap-open-portfolio]")?.addEventListener("click", () => activateSection("portfolio"));
  refreshIcons();
}

function renderSkillPicker() {
  const combined = [...new Set([...predefinedSkills, ...state.skills, ...currentRole().requiredSkills])];
  const owned = new Set(state.skills.map(normalize));
  const query = normalize(document.getElementById("skillSearch")?.value);
  document.getElementById("skillPicker").innerHTML = combined
    .filter((skill) => !query || normalize(skill).includes(query))
    .sort((a, b) => a.localeCompare(b))
    .map((skill) => `
      <label class="skill-pill">
        <input type="checkbox" value="${escapeHtml(skill)}" ${owned.has(normalize(skill)) ? "checked" : ""} />
        ${escapeHtml(skill)}
      </label>
    `)
    .join("") || '<p class="empty-text">No skill matched your search.</p>';

  document.querySelectorAll("#skillPicker input").forEach((checkbox) => {
    checkbox.addEventListener("change", async () => {
      const skill = checkbox.value;
      const next = new Set(state.skills);
      if (checkbox.checked) next.add(skill);
      else [...next].forEach((item) => {
        if (normalize(item) === normalize(skill)) next.delete(item);
      });
      state.skills = [...next];
      saveState();
      renderGap();
      renderDashboard();
      renderUsers();
      await syncSkillsToBackend();
      renderUsers();
    });
  });
}

function applyMarketScan(scan) {
  const aggregated = aggregateMarketTrends(scan.trends);
  if (aggregated.length) marketData = aggregated;
  state.lastScan = scan.createdAt ? new Date(scan.createdAt).toLocaleString() : new Date().toLocaleString();
}

function renderMarket() {
  const select = document.getElementById("marketSource");
  const source = select.value || "all";
  const scope = document.getElementById("marketScope")?.value || "all";
  const roleSkills = new Set(currentRole().requiredSkills.map(normalize));
  const allData = marketData
    .map((item) => ({
      ...item,
      count: source === "all" ? item.LinkedIn + item.TopCV : item[source]
    }))
    .sort((a, b) => b.count - a.count);
  const data = scope === "role" ? allData.filter((item) => roleSkills.has(normalize(item.skill))) : allData;
  const totalMentions = data.reduce((sum, item) => sum + Number(item.count || 0), 0);
  const allMentions = allData.reduce((sum, item) => sum + Number(item.count || 0), 0);
  const roleMentions = allData.filter((item) => roleSkills.has(normalize(item.skill))).reduce((sum, item) => sum + Number(item.count || 0), 0);
  document.getElementById("marketTotalMentions").textContent = totalMentions.toLocaleString();
  document.getElementById("marketTopSkill").textContent = data[0]?.skill || "No matching skill";
  document.getElementById("marketRoleMatch").textContent = `${Math.round((roleMentions / Math.max(1, allMentions)) * 100)}%`;
  document.getElementById("marketLastScan").textContent = compactDateTime(state.lastScan);

  renderTrendCanvas(data, source);
  document.getElementById("trendList").innerHTML = data
    .map((item) => `
      <div class="trend-item">
        <strong>${escapeHtml(item.skill)} <span class="${item.growth >= 0 ? "growth-up" : "growth-down"}">${formatGrowth(item.growth)}</span></strong>
        <span>${item.count} mentions from ${source === "all" ? "LinkedIn and TopCV" : source}</span>
      </div>
    `)
    .join("") || '<div class="empty-state compact"><i data-lucide="chart-no-axes-column-decreasing"></i><strong>No target-role trend yet</strong><span>Switch to Full market or run another demo scan.</span></div>';
  refreshIcons();
}

function renderTrendCanvas(data, source) {
  const canvas = document.getElementById("trendChart");
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(320, Math.floor(rect.width || 900));
  const height = Math.max(width < 520 ? 320 : 360, Math.floor(rect.height || 420));
  const css = getComputedStyle(document.documentElement);
  const color = (name, fallback) => css.getPropertyValue(name).trim() || fallback;
  const palette = {
    surface: color("--surface", "#ffffff"),
    line: color("--line", "#d9e3f2"),
    ink: color("--ink", "#0b1f44"),
    muted: color("--muted", "#687892"),
    blue: color("--blue", "#155eef"),
    green: color("--green", "#0c9b73"),
    orange: color("--orange", "#ff7a1a"),
    violet: color("--violet", "#7457e8")
  };
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = palette.surface;
  ctx.fillRect(0, 0, width, height);

  const compact = width < 520;
  const left = compact ? 44 : 66;
  const right = compact ? 14 : 24;
  const top = 38;
  const bottom = compact ? 76 : 68;
  const chartWidth = width - left - right;
  const chartHeight = height - top - bottom;
  const max = Math.max(...data.map((item) => item.count), 1);
  const barWidth = Math.max(12, chartWidth / data.length - (compact ? 8 : 16));

  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left, top + chartHeight);
  ctx.lineTo(left + chartWidth, top + chartHeight);
  ctx.stroke();

  ctx.fillStyle = palette.ink;
  ctx.font = `700 ${compact ? 14 : 16}px Segoe UI, Arial`;
  ctx.fillText(`Keyword frequency - ${source === "all" ? "all portals" : source}`, left, 22);

  data.forEach((item, index) => {
    const x = left + index * (chartWidth / data.length) + 8;
    const barHeight = (item.count / max) * (chartHeight - 16);
    const y = top + chartHeight - barHeight;
    const barColor = index % 4 === 0 ? palette.blue : index % 4 === 1 ? palette.green : index % 4 === 2 ? palette.orange : palette.violet;

    ctx.fillStyle = barColor;
    roundRect(ctx, x, y, barWidth, barHeight, 7);
    ctx.fill();

    ctx.fillStyle = palette.ink;
    ctx.font = `700 ${compact ? 11 : 13}px Segoe UI, Arial`;
    ctx.textAlign = "center";
    ctx.fillText(item.count, x + barWidth / 2, y - 8);

    ctx.save();
    ctx.translate(x + barWidth / 2, top + chartHeight + 14);
    ctx.rotate(-Math.PI / 5);
    ctx.font = `${compact ? 10 : 12}px Segoe UI, Arial`;
    ctx.fillStyle = palette.muted;
    ctx.fillText(item.skill, 0, 0);
    ctx.restore();
  });
  ctx.textAlign = "left";
}

function roundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

async function syncGitHub(username) {
  const button = document.getElementById("syncGithub");
  button.disabled = true;
  button.textContent = "Syncing...";
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`);
    if (!response.ok) throw new Error("GitHub API unavailable");
    const repos = await response.json();
    const enriched = await Promise.all(
      repos.slice(0, 6).map(async (repo) => {
        let readme = "";
        try {
          const readmeResponse = await fetch(`https://api.github.com/repos/${repo.full_name}/readme`);
          if (readmeResponse.ok) {
            const data = await readmeResponse.json();
            readme = decodeBase64(data.content || "");
          }
        } catch {
          readme = "";
        }
        return {
          name: repo.name,
          url: repo.html_url,
          language: repo.language || "Code",
          summary: summarizeRepo(repo, readme),
          stack: detectStack(repo, readme),
          source: "github"
        };
      })
    );
    state.portfolio = enriched.length ? enriched : defaultPortfolio;
    const payload = await apiOptional("/me/portfolio/sync", {
      method: "POST",
      body: {
        github: username,
        projects: state.portfolio
      }
    });
    if (payload && Array.isArray(payload.projects)) {
      state.github = payload.github || username;
      state.portfolioShareUrl = payload.shareUrl || state.portfolioShareUrl;
      state.portfolio = normalizePortfolioProjects(payload.projects);
    }
    await syncProfileToBackend();
    toast(apiToken() ? "GitHub repositories synchronized and saved to backend." : "GitHub repositories synchronized.");
  } catch {
    const payload = await apiOptional("/me/portfolio/sync", {
      method: "POST",
      body: { github: username }
    });
    if (payload && Array.isArray(payload.projects)) {
      state.github = payload.github || username;
      state.portfolioShareUrl = payload.shareUrl || state.portfolioShareUrl;
      state.portfolio = normalizePortfolioProjects(payload.projects);
      toast("Backend portfolio evidence generated.");
    } else {
      state.portfolio = defaultPortfolio;
      toast("GitHub sync failed, sample portfolio restored.");
    }
  } finally {
    button.disabled = false;
    button.innerHTML = '<i data-lucide="github"></i> Sync repositories';
    saveState();
    renderPortfolio();
    renderDashboard();
    renderMentorContext();
    renderUsers();
    refreshIcons();
  }
}

function decodeBase64(content) {
  try {
    const clean = content.replace(/\s/g, "");
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(clean), (char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
  } catch {
    return "";
  }
}

function summarizeRepo(repo, readme) {
  const text = normalize(`${repo.description || ""} ${readme}`);
  const role = state.role;
  if (text.includes("terraform") || text.includes("kubernetes") || text.includes("docker")) {
    return `Infrastructure-oriented repository useful for ${role}: deployment automation, environment reproducibility, and operations evidence.`;
  }
  if (text.includes("data") || text.includes("sql") || text.includes("pipeline")) {
    return `Data-focused repository useful for ${role}: pipeline thinking, data modeling, and measurable data quality evidence.`;
  }
  if (text.includes("mobile") || text.includes("react native") || text.includes("flutter")) {
    return `Mobile app repository useful for ${role}: user flows, API integration, and release-ready product work.`;
  }
  if (text.includes("api") || text.includes("backend")) {
    return `Backend repository useful for ${role}: API design, persistence, authentication, and maintainable service structure.`;
  }
  return repo.description || `Repository analyzed from GitHub metadata and README for ${role} portfolio alignment.`;
}

function detectStack(repo, readme) {
  const text = normalize(`${repo.language || ""} ${repo.description || ""} ${readme}`);
  const candidates = [
    "React",
    "TypeScript",
    "JavaScript",
    "Java",
    "Spring Boot",
    "Python",
    "SQL",
    "Docker",
    "Kubernetes",
    "AWS",
    "Terraform",
    "Firebase",
    "Flutter",
    "React Native"
  ];
  const stack = candidates.filter((item) => text.includes(normalize(item))).slice(0, 5);
  if (repo.language && !stack.map(normalize).includes(normalize(repo.language))) stack.unshift(repo.language);
  return stack.length ? stack.slice(0, 5) : ["README analysis"];
}

function portfolioAssessment(project) {
  const text = normalize(`${project.name} ${project.summary} ${(project.stack || []).join(" ")}`);
  const matchedSkills = currentRole().requiredSkills.filter((skill) => text.includes(normalize(skill)));
  const evidence = [
    ["Clear project story", String(project.summary || "").length >= 70],
    ["Repository or demo link", Boolean(project.url && project.url !== "#")],
    ["Testing evidence", /test|quality|coverage|detox|junit/i.test(text)],
    ["Deployment evidence", /deploy|cloud|aws|firebase|docker|kubernetes|release/i.test(text)]
  ];
  const score = Math.min(
    100,
    matchedSkills.length * 14 +
      (evidence[0][1] ? 20 : 8) +
      (evidence[1][1] ? 15 : 0) +
      (evidence[2][1] ? 12 : 0) +
      (evidence[3][1] ? 12 : 0)
  );
  return {
    score,
    aligned: matchedSkills.length > 0 && score >= 45,
    matchedSkills,
    evidence,
    missingEvidence: evidence.filter(([, done]) => !done).map(([label]) => label)
  };
}

function renderPortfolio() {
  document.getElementById("githubUsername").value = state.github || "";
  document.getElementById("githubInputMentor").value = state.github || "";
  document.getElementById("portfolioUrl").textContent = portfolioUrl();
  const projects = normalizePortfolioProjects(state.portfolio);
  const assessments = projects.map((project) => ({ project, assessment: portfolioAssessment(project) }));
  const filter = document.getElementById("portfolioFilter")?.value || "all";
  const filtered = assessments.filter(({ assessment }) => filter === "all" || (filter === "aligned" ? assessment.aligned : !assessment.aligned));
  const verified = assessments.filter(({ project }) => project.source !== "demo");
  const aligned = verified.filter(({ assessment }) => assessment.aligned);
  const average = verified.length ? Math.round(verified.reduce((sum, item) => sum + item.assessment.score, 0) / verified.length) : 0;
  document.getElementById("portfolioOverview").innerHTML = `
    <article class="section-kpi"><span>Verified projects</span><strong>${verified.length}</strong><small>${projects.length - verified.length} demo placeholders excluded</small></article>
    <article class="section-kpi"><span>Role-aligned</span><strong>${aligned.length}</strong><small>Projects matching ${escapeHtml(state.role)}</small></article>
    <article class="section-kpi"><span>Evidence score</span><strong>${average}%</strong><small>Average verified project quality</small></article>
  `;
  document.getElementById("portfolioGrid").innerHTML = filtered
    .map(({ project, assessment }) => `
      <article class="repo-card ${project.source === "demo" ? "demo-project" : ""}">
        <div class="repo-card-head">
          <span class="source-badge ${escapeHtml(project.source)}">${escapeHtml(project.source === "github" ? "GitHub synced" : project.source === "manual" ? "Manual evidence" : "Demo placeholder")}</span>
          <strong>${assessment.score}% match</strong>
        </div>
        <h3>${escapeHtml(project.name)}</h3>
        <p>${escapeHtml(project.summary)}</p>
        <div class="repo-score"><span style="width:${assessment.score}%"></span></div>
        <div class="repo-meta">
          ${project.stack.map((item) => `<span class="tech-pill">${escapeHtml(item)}</span>`).join("")}
        </div>
        <div class="evidence-mini-list">
          ${assessment.evidence.map(([label, done]) => `<span class="${done ? "done" : "missing"}"><i data-lucide="${done ? "check" : "minus"}"></i>${escapeHtml(label)}</span>`).join("")}
        </div>
        <div class="repo-actions">
          ${project.url && project.url !== "#" ? `<a href="${safeExternalUrl(project.url)}" target="_blank" rel="noreferrer">Open repository</a>` : '<span class="muted-link">No repository link</span>'}
          ${project.source === "manual" ? `<button class="mini-button danger" type="button" data-remove-project="${escapeHtml(project.id || project.name)}">Remove</button>` : ""}
        </div>
      </article>
    `)
    .join("") || '<div class="empty-state"><i data-lucide="folder-search"></i><strong>No project matched this filter</strong><span>Add evidence manually or change the portfolio quality filter.</span></div>';

  document.querySelectorAll("[data-remove-project]").forEach((button) => {
    button.addEventListener("click", async () => {
      state.portfolio = normalizePortfolioProjects(state.portfolio).filter((project) => String(project.id || project.name) !== button.dataset.removeProject);
      saveState();
      renderPortfolio();
      renderDashboard();
      await apiOptional("/me/portfolio/sync", { method: "POST", body: { github: state.github, projects: state.portfolio } });
      toast("Manual project removed.");
    });
  });
  refreshIcons();
}

function portfolioUrl() {
  if (state.portfolioShareUrl) {
    if (state.portfolioShareUrl.startsWith("http")) return state.portfolioShareUrl;
    if (state.portfolioShareUrl.startsWith("/")) return `${window.location.origin}${state.portfolioShareUrl}`;
  }
  const userId = state.user?.id || "acct-demo-student";
  return `${window.location.origin}/portfolio.html?user=${encodeURIComponent(userId)}`;
}

function renderWorkspace() {
  const mode = state.actorMode || "student";
  document.getElementById("actorMode").value = mode;
  const labels = {
    student: "Student action board",
    counselor: "Academic counselor review board",
    mentor: "Industry mentor portfolio board"
  };
  document.getElementById("workspaceTitle").textContent = labels[mode];
  const visibleTasks = (state.tasks || []).filter((task) => mode === "student" || task.actor === mode || task.actor === "student");
  const openTasks = visibleTasks.filter((task) => task.lane !== "Done").length;
  const reviewTasks = visibleTasks.filter((task) => task.lane === "Review").length;
  const openSessions = (state.sessions || []).filter((session) => session.status !== "Completed").length;
  document.getElementById("workspaceOverview").innerHTML = `
    <article class="section-kpi"><span>Open actions</span><strong>${openTasks}</strong><small>Visible in ${escapeHtml(labels[mode])}</small></article>
    <article class="section-kpi"><span>Awaiting review</span><strong>${reviewTasks}</strong><small>Tasks ready for feedback</small></article>
    <article class="section-kpi"><span>Mentor sessions</span><strong>${openSessions}</strong><small>Scheduled, active or pending notes</small></article>
  `;
  renderTaskBoard(mode);
  renderNotes();
  renderWorkspaceSessions();
  renderPortfolioChecklist();
  refreshIcons();
}

function renderTaskBoard(mode) {
  const lanes = ["To do", "Doing", "Review", "Done"];
  const tasks = (state.tasks || []).filter((task) => mode === "student" || task.actor === mode || task.actor === "student");
  document.getElementById("taskBoard").innerHTML = lanes
    .map((lane) => {
      const laneTasks = tasks.filter((task) => task.lane === lane);
      return `
        <div class="kanban-lane">
          <h4>${escapeHtml(lane)} <span>${laneTasks.length}</span></h4>
          ${laneTasks.map(renderTaskCard).join("") || '<p class="empty-text">No items</p>'}
        </div>
      `;
    })
    .join("");

  document.querySelectorAll("[data-task-move]").forEach((button) => {
    button.addEventListener("click", () => {
      const task = (state.tasks || []).find((item) => item.id === button.dataset.taskMove);
      if (!task) return;
      task.lane = nextLane(task.lane);
      saveState();
      renderWorkspace();
      renderDashboard();
      renderUsers();
    });
  });
  document.querySelectorAll("[data-task-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tasks = (state.tasks || []).filter((task) => task.id !== button.dataset.taskDelete);
      saveState();
      renderWorkspace();
      renderDashboard();
      toast("Workspace task removed.");
    });
  });
}

function renderTaskCard(task) {
  const next = nextLane(task.lane);
  return `
    <article class="task-card">
      <strong>${escapeHtml(task.title)}</strong>
      <div class="task-meta">
        <span>${escapeHtml(task.tag)}</span>
        <span>${escapeHtml(task.due)}</span>
      </div>
      <div class="task-actions">
        <button class="mini-button" data-task-move="${escapeHtml(task.id)}" aria-label="Move ${escapeHtml(task.title)} to ${escapeHtml(next)}">
          ${task.lane === "Done" ? "Reopen" : `Move to ${escapeHtml(next)}`}
        </button>
        ${task.tag === "CUSTOM" ? `<button class="mini-button danger" data-task-delete="${escapeHtml(task.id)}" aria-label="Delete ${escapeHtml(task.title)}">Delete</button>` : ""}
      </div>
    </article>
  `;
}

function nextLane(lane) {
  const order = ["To do", "Doing", "Review", "Done"];
  const index = order.indexOf(lane);
  return order[(index + 1) % order.length];
}

function renderNotes() {
  document.getElementById("noteList").innerHTML = (state.notes || [])
    .map((note) => `
      <div class="note-row">
        <strong>${escapeHtml(note.author)}</strong>
        <span>${escapeHtml(note.text)}</span>
        <small>${escapeHtml(note.date)}</small>
      </div>
    `)
    .join("");
}

function renderWorkspaceSessions() {
  document.getElementById("workspaceSessions").innerHTML = (state.sessions || [])
    .map((session, index) => `
      <div class="session-record">
        <div>
          <strong>${escapeHtml(session.role)}</strong>
          <span>${escapeHtml(session.topic)}</span>
        </div>
        <select data-session-status="${index}" data-session-id="${escapeHtml(session.id || "")}" aria-label="Status for ${escapeHtml(session.topic)}">
          ${["Scheduled", "Active", "Pending notes", "Completed"].map((status) => `<option value="${status}" ${session.status === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
      </div>
    `)
    .join("");

  document.querySelectorAll("[data-session-status]").forEach((select) => {
    select.addEventListener("change", async () => {
      const index = Number(select.dataset.sessionStatus);
      state.sessions[index].status = select.value;
      saveState();
      renderWorkspace();
      renderDashboard();
      renderUsers();
      if (select.dataset.sessionId) {
        await apiOptional(`/me/mentor-sessions/${encodeURIComponent(select.dataset.sessionId)}`, {
          method: "PATCH",
          body: { status: select.value }
        });
      }
    });
  });
}

function renderPortfolioChecklist() {
  const completion = getCompletion();
  const gap = getGap();
  const checks = [
    ["Target role selected", Boolean(state.role)],
    ["At least 50% roadmap progress", completion.percent >= 50],
    ["No more than 3 urgent skill gaps", gap.missing.length <= 3],
    ["At least 3 portfolio projects", state.portfolio.length >= 3],
    ["GitHub profile linked", Boolean(state.github)]
  ];
  document.getElementById("portfolioChecklist").innerHTML = checks
    .map(([label, done]) => `
      <label class="check-row ${done ? "done" : ""}">
        <input type="checkbox" disabled ${done ? "checked" : ""} />
        <span>${escapeHtml(label)}</span>
      </label>
    `)
    .join("");
}

function renderResources() {
  const query = normalize(document.getElementById("resourceSearch").value);
  const level = document.getElementById("resourceLevel").value;
  const provider = document.getElementById("resourceProvider").value;
  const savedOnly = document.getElementById("savedResourcesOnly").checked;
  const role = state.role;
  const missing = new Set(getGap().missing.map(normalize));
  const bookmarks = new Set(state.bookmarks || []);
  const completed = new Set(state.completedResources || []);
  const filtered = resourceCatalog.filter((item) => {
    const matchesRole = item.role === role || currentRole().requiredSkills.includes(item.skill);
    const matchesLevel = level === "all" || item.level === level;
    const matchesProvider = provider === "all" || item.provider === provider;
    const matchesSaved = !savedOnly || bookmarks.has(item.id);
    const text = normalize(`${item.title} ${item.skill} ${item.provider} ${item.description} ${item.role}`);
    return matchesRole && matchesLevel && matchesProvider && matchesSaved && (!query || text.includes(query));
  }).sort((a, b) => {
    const aRecommended = missing.has(normalize(a.skill)) ? 1 : 0;
    const bRecommended = missing.has(normalize(b.skill)) ? 1 : 0;
    if (aRecommended !== bRecommended) return bRecommended - aRecommended;
    const aSaved = bookmarks.has(a.id) ? 1 : 0;
    const bSaved = bookmarks.has(b.id) ? 1 : 0;
    return bSaved - aSaved || a.title.localeCompare(b.title);
  });

  const savedInResults = filtered.filter((item) => bookmarks.has(item.id)).length;
  const completeInResults = filtered.filter((item) => completed.has(item.id)).length;

  document.getElementById("resourceSummary").innerHTML = `
    <strong>${filtered.length}</strong> resources matched for <strong>${escapeHtml(role)}</strong>.
    <span>${savedInResults} saved · ${completeInResults} completed · gap-first recommendations</span>
  `;

  document.getElementById("resourceGrid").innerHTML = filtered
    .map((item) => {
      const bookmarked = (state.bookmarks || []).includes(item.id);
      const isCompleted = completed.has(item.id);
      const recommended = missing.has(normalize(item.skill));
      return `
        <article class="resource-card ${isCompleted ? "completed" : ""} ${recommended ? "recommended" : ""}">
          <div class="resource-head">
            <div class="resource-badges"><span>${escapeHtml(item.level)}</span>${recommended ? '<span class="recommended-badge">Recommended gap</span>' : ""}</div>
            <button class="mini-button ${bookmarked ? "selected" : ""}" data-bookmark="${escapeHtml(item.id)}" aria-pressed="${bookmarked}">
              ${bookmarked ? "Saved" : "Save"}
            </button>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.description)}</p>
          <div class="repo-meta">
            <span class="tech-pill">${escapeHtml(item.skill)}</span>
            <span class="tech-pill">${escapeHtml(item.provider)}</span>
          </div>
          <div class="resource-actions">
            <a href="${safeExternalUrl(item.url)}" target="_blank" rel="noreferrer">Open resource</a>
            <button class="mini-button ${isCompleted ? "selected" : ""}" type="button" data-resource-complete="${escapeHtml(item.id)}">${isCompleted ? "Completed" : "Mark complete"}</button>
          </div>
        </article>
      `;
    })
    .join("") || '<div class="empty-state"><i data-lucide="book-open-check"></i><strong>No learning resource matched</strong><span>Clear filters or choose another level/resource type.</span><button class="secondary-action" type="button" data-clear-resource-filters>Clear filters</button></div>';

  document.querySelector("[data-clear-resource-filters]")?.addEventListener("click", () => document.getElementById("resetResourceFilters").click());

  document.querySelectorAll("[data-bookmark]").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.bookmark;
      const bookmarks = new Set(state.bookmarks || []);
      const saved = !bookmarks.has(id);
      if (saved) bookmarks.add(id);
      else bookmarks.delete(id);
      state.bookmarks = [...bookmarks];
      saveState();
      renderResources();
      renderUsers();
      const payload = await apiOptional("/me/bookmarks", {
        method: "POST",
        body: { resourceId: id, saved }
      });
      if (payload && Array.isArray(payload.bookmarks)) {
        state.bookmarks = payload.bookmarks;
        saveState();
        renderResources();
        renderUsers();
      } else {
        toast("Bookmark saved in the local demo cache.");
      }
    });
  });

  document.querySelectorAll("[data-resource-complete]").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.resourceComplete;
      const next = new Set(state.completedResources || []);
      const isCompleted = !next.has(id);
      if (isCompleted) next.add(id);
      else next.delete(id);
      state.completedResources = [...next];
      saveState();
      renderResources();
      const payload = await apiOptional("/me/resource-progress", {
        method: "PUT",
        body: { resourceId: id, completed: isCompleted }
      });
      if (payload && Array.isArray(payload.completedResources)) {
        state.completedResources = payload.completedResources;
        saveState();
        renderResources();
      }
    });
  });
  refreshIcons();
}

function renderSpec() {
  const implemented = traceabilityItems.filter((item) => item.status === "Implemented").length;
  const prototype = traceabilityItems.filter((item) => item.status === "Prototype").length;
  const coverage = Math.round((implemented / Math.max(1, traceabilityItems.length)) * 100);
  document.getElementById("specOverview").innerHTML = `
    <article class="section-kpi"><span>Requirement coverage</span><strong>${coverage}%</strong><small>${implemented} of ${traceabilityItems.length} marked implemented</small></article>
    <article class="section-kpi"><span>Prototype adapters</span><strong>${prototype}</strong><small>LLM, README analysis and market data</small></article>
    <article class="section-kpi"><span>Backend endpoints</span><strong>${apiInventory.length}</strong><small>Public and authenticated API groups</small></article>
    <article class="section-kpi"><span>Acceptance tests</span><strong>${acceptanceTests.length}</strong><small>Core demo flows and responsive QA</small></article>
  `;
  document.getElementById("frMatrix").innerHTML = `
    <table>
      <thead><tr><th>ID</th><th>Requirement</th><th>Demo surface</th><th>Status</th></tr></thead>
      <tbody>
        ${traceabilityItems.map((item) => `
          <tr>
            <td>${escapeHtml(item.id)}</td>
            <td>${escapeHtml(item.requirement)}</td>
            <td>${escapeHtml(item.demoSurface)}</td>
            <td><span class="status-label ${normalize(item.status)}">${escapeHtml(item.status)}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  document.getElementById("nfrList").innerHTML = nfrItems.map(([label, text]) => `
    <div class="spec-row"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(text)}</span></div>
  `).join("");
  document.getElementById("businessRules").innerHTML = businessRules.map((rule, index) => `
    <div class="rule-row"><strong>BR-${String(index + 1).padStart(2, "0")}</strong><span>${escapeHtml(rule)}</span></div>
  `).join("");
  document.getElementById("modelMap").innerHTML = entityModel.map(([entity, text]) => `
    <div class="model-row"><strong>${escapeHtml(entity)}</strong><span>${escapeHtml(text)}</span></div>
  `).join("");
  document.getElementById("specArchitecture").innerHTML = architectureStages
    .map(([label, stack, responsibility], index) => `
      <div class="architecture-node">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div><strong>${escapeHtml(label)}</strong><b>${escapeHtml(stack)}</b><small>${escapeHtml(responsibility)}</small></div>
      </div>
      ${index < architectureStages.length - 1 ? '<i class="architecture-arrow" data-lucide="arrow-down"></i>' : ""}
    `)
    .join("");
  document.getElementById("acceptanceMatrix").innerHTML = acceptanceTests
    .map(([id, feature, criterion, status]) => `
      <div class="acceptance-item">
        <span>${escapeHtml(id)}</span>
        <div><strong>${escapeHtml(feature)}</strong><small>${escapeHtml(criterion)}</small></div>
        <b>${escapeHtml(status)}</b>
      </div>
    `)
    .join("");
  refreshIcons();
}

function renderUsers() {
  const account = currentAccount() || defaultAccounts()[0];
  const signedIn = Boolean(state.user.signedIn);
  const rememberLabel = signedIn ? (state.user.remember ? "Remembered" : "Current tab") : "Signed out";
  document.getElementById("authSummary").innerHTML = `
    <i data-lucide="${signedIn ? "shield-check" : "shield-alert"}"></i>
    <span>${signedIn ? "Signed in" : "Signed out"}</span>
  `;
  document.getElementById("sessionBadge").textContent = signedIn ? "Active" : "Signed out";
  document.getElementById("sessionBadge").classList.toggle("signed-out", !signedIn);
  document.getElementById("accountAvatarInitials").textContent = initials(account.name);
  document.getElementById("accountName").textContent = account.name;
  document.getElementById("accountEmail").textContent = account.email;
  document.getElementById("accountProvider").textContent = state.user.authProvider || account.provider;
  document.getElementById("accountRole").textContent = account.role;
  document.getElementById("accountLastLogin").textContent = account.lastLogin || state.user.lastLogin || "Not recorded";
  document.getElementById("accountSession").textContent = rememberLabel;

  const completion = getCompletion();
  const gap = getGap();
  const lastEvent = (state.loginEvents || [])[0];
  const records = [
    ["Active account", `${account.name} - ${account.email}`],
    ["Auth events", lastEvent ? `${lastEvent.type} at ${lastEvent.time}` : "No auth events recorded"],
    ["Chat history", `${state.chat.length} messages`],
    ["Skill assessment", `${gap.matched.length}/${gap.required.length} matched for ${state.role}`],
    ["Roadmap progress", `${completion.done}/${completion.total} nodes completed`],
    ["GitHub portfolio", `${state.portfolio.length} repositories stored`],
    ["Course bookmarks", `${(state.bookmarks || []).length} resources saved`],
    ["Mentor sessions", `${(state.sessions || []).length} advising sessions`],
    ["Market pulse", `Last scan ${state.lastScan}`],
    ["Backend sync", state.backendSyncedAt ? `Last API sync ${state.backendSyncedAt}` : "Local cache waiting for API sync"]
  ];
  document.getElementById("recordList").innerHTML = records
    .map(([label, value]) => `
      <div class="record-row">
        <strong>${escapeHtml(label)} <span class="status-dot">Stored</span></strong>
        <span>${escapeHtml(value)}</span>
      </div>
    `)
    .join("");

  document.getElementById("sessionList").innerHTML = (state.sessions || [])
    .map((session) => `
      <div class="session-row">
        <strong>${escapeHtml(session.role)} <span>${escapeHtml(session.status)}</span></strong>
        <span>${escapeHtml(session.topic)}</span>
      </div>
    `)
    .join("") || `<p class="empty-text">No mentor sessions yet.</p>`;

  const securityItems = [
    ["Valid email", account.email.includes("@"), account.email],
    ["Password policy", Boolean(account.passwordHash) || account.passwordManaged || account.provider === "Google OAuth 2.0", "Passwords are stored as hashed credentials; OAuth accounts use provider-managed credentials."],
    ["Session state", signedIn, rememberLabel],
    ["Role assigned", Boolean(account.role), account.role],
    ["OAuth path", (state.accounts || []).some((item) => item.provider === "Google OAuth 2.0") || state.user.authProvider === "Google OAuth 2.0", "Google sign-in is handled through the login page account chooser."]
  ];
  document.getElementById("securityChecklist").innerHTML = securityItems
    .map(([label, done, text]) => `
      <div class="security-item ${done ? "" : "pending"}">
        <i>${done ? "OK" : "!"}</i>
        <div>
          <strong>${escapeHtml(label)}</strong>
          <span>${escapeHtml(text)}</span>
        </div>
      </div>
    `)
    .join("");

  document.getElementById("accountList").innerHTML = (state.accounts || [])
    .map((item) => `
      <div class="account-row">
        <strong>
          ${escapeHtml(item.name)}
          <span>${escapeHtml(item.role)}</span>
        </strong>
        <span>${escapeHtml(item.email)} - ${escapeHtml(item.provider)} - created ${escapeHtml(item.createdAt)}</span>
      </div>
    `)
    .join("");
}

async function exportGapReport() {
  const payload = await apiOptional("/me/skill-gap/report", {
    method: "POST",
    body: { targetRole: state.role, skills: state.skills }
  });
  const gap = payload?.gap || getGap();
  const completion = getCompletion();
  const urgent = payload?.urgentPriorities || getUrgentSkills();
  const report = window.open("", "_blank", "width=900,height=720");
  if (!report) {
    toast("Popup blocked. Use browser print on the Skill Gap page.");
    return;
  }
  report.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>Skill Gap Report - ${escapeHtml(state.role)}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 36px; color: #172033; }
          h1 { margin-bottom: 4px; }
          h2 { margin-top: 28px; color: #1d4ed8; }
          table { border-collapse: collapse; width: 100%; margin-top: 12px; }
          th, td { border: 1px solid #d9e0ea; padding: 10px; text-align: left; }
          th { background: #f1f5f9; }
          .metric { display: inline-block; min-width: 150px; margin: 12px 10px 12px 0; padding: 12px; border: 1px solid #d9e0ea; }
        </style>
      </head>
      <body>
        <h1>Skill Gap Report</h1>
        <p>Student: ${escapeHtml(state.user?.name || "SE Student")} | Target role: ${escapeHtml(state.role)} | Generated: ${new Date(payload?.generatedAt || Date.now()).toLocaleString()}</p>
        <div class="metric"><strong>${completion.percent}%</strong><br>Roadmap progress</div>
        <div class="metric"><strong>${gap.matched.length}</strong><br>Matched skills</div>
        <div class="metric"><strong>${gap.missing.length}</strong><br>Missing skills</div>
        <h2>Missing Skills</h2>
        <table>
          <tr><th>Skill</th><th>Priority Evidence</th></tr>
          ${gap.missing.map((skill) => `<tr><td>${escapeHtml(skill)}</td><td>${escapeHtml(priorityEvidence(skill))}</td></tr>`).join("")}
        </table>
        <h2>Urgent Learning Priority</h2>
        <ol>
          ${urgent.map((item) => `<li>${escapeHtml(item.title || item.skill || "Learning priority")} - ${escapeHtml(item.duration || item.priority || "Review roadmap")}</li>`).join("")}
        </ol>
      </body>
    </html>
  `);
  report.document.close();
  report.focus();
  report.print();
}

function exportSpec() {
  const report = window.open("", "_blank", "width=1100,height=760");
  if (!report) {
    toast("Popup blocked. Use browser print on the System Spec page.");
    return;
  }
  report.document.write(`
    <!doctype html>
    <html>
      <head>
        <title>SE Career Compass - System Spec</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 34px; color: #172033; }
          h1 { margin-bottom: 4px; }
          h2 { margin-top: 28px; color: #1d4ed8; }
          table { border-collapse: collapse; width: 100%; margin-top: 10px; font-size: 12px; }
          th, td { border: 1px solid #d9e0ea; padding: 8px; text-align: left; vertical-align: top; }
          th { background: #f1f5f9; }
          li { margin-bottom: 6px; }
        </style>
      </head>
      <body>
        <h1>SE Career Compass - System Specification</h1>
        <p>Submitted by AnNDH2 | Topic: Personalized Career Orientation & Learning Roadmap Platform for Software Engineering Students</p>
        <h2>Functional Requirements Traceability</h2>
        <table>
          <tr><th>ID</th><th>Requirement</th><th>Demo Surface</th><th>Status</th></tr>
          ${traceabilityItems.map((item) => `<tr><td>${escapeHtml(item.id)}</td><td>${escapeHtml(item.requirement)}</td><td>${escapeHtml(item.demoSurface)}</td><td>${escapeHtml(item.status)}</td></tr>`).join("")}
        </table>
        <h2>Non-functional Requirements</h2>
        <ul>${nfrItems.map(([label, text]) => `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(text)}</li>`).join("")}</ul>
        <h2>Business Rules</h2>
        <ol>${businessRules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ol>
        <h2>Main Entities</h2>
        <table>
          <tr><th>Entity</th><th>Description</th></tr>
          ${entityModel.map(([entity, text]) => `<tr><td>${escapeHtml(entity)}</td><td>${escapeHtml(text)}</td></tr>`).join("")}
        </table>
        <h2>Runtime Architecture</h2>
        <ol>${architectureStages.map(([label, stack, responsibility]) => `<li><strong>${escapeHtml(label)}:</strong> ${escapeHtml(stack)} - ${escapeHtml(responsibility)}</li>`).join("")}</ol>
        <h2>Acceptance Checklist</h2>
        <table>
          <tr><th>ID</th><th>Feature</th><th>Acceptance criterion</th><th>Status</th></tr>
          ${acceptanceTests.map(([id, feature, criterion, status]) => `<tr><td>${escapeHtml(id)}</td><td>${escapeHtml(feature)}</td><td>${escapeHtml(criterion)}</td><td>${escapeHtml(status)}</td></tr>`).join("")}
        </table>
      </body>
    </html>
  `);
  report.document.close();
  report.focus();
  report.print();
}

function priorityEvidence(skill) {
  const roadmapNode = currentRole().nodes.find((item) => item.skills.map(normalize).includes(normalize(skill)));
  return roadmapNode ? roadmapNode.title : "Add a portfolio task that proves this skill.";
}

function toast(message) {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.appendChild(el);
  window.setTimeout(() => el.remove(), 2600);
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", init);
