const crypto = require("crypto");
const fs = require("fs/promises");
const http = require("http");
const path = require("path");
const { URL } = require("url");


const HOST = process.env.HOST || (process.env.PORT ? "0.0.0.0" : "127.0.0.1");
const PORT = Number(process.env.PORT || 4173);
const ROOT_DIR = __dirname;
const DATA_DIR = process.env.DATA_DIR ? path.resolve(process.env.DATA_DIR) : path.join(ROOT_DIR, "data");
const DB_FILE = process.env.DB_FILE ? path.resolve(process.env.DB_FILE) : path.join(DATA_DIR, "db.json");
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;

// API login/register/user của bạn đặt ở đây
const DEMO_ACCOUNT = {
  id: "acct-demo-student",
  name: "AnNDH2",
  email: "anndh2@fpt.edu.vn",
  role: "Student",
  provider: "Email/Password",
  passwordSalt: "server-demo-student-salt",
  createdAt: "Seeded demo account",
  status: "Active"
};

const GOOGLE_CHOICES = [
  {
    name: "Nguyen Hoang Nhat",
    email: "hoangnhat.ut@gmail.com",
    status: "Signed in"
  },
  {
    name: DEMO_ACCOUNT.name,
    email: DEMO_ACCOUNT.email,
    status: "School account"
  }
];

const CONTENT_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const STATIC_FILES = new Set(["login.html", "index.html", "portfolio.html", "styles.css", "app.js", "login.js", "portfolio-public.js"]);
const STATIC_ASSET_TYPES = new Set([".js", ".png", ".jpg", ".jpeg", ".svg", ".ico"]);

const TOPIC_SPEC = {
  projectName: "Personalized Career Orientation & Learning Roadmap Platform for Software Engineering Students",
  context:
    "Software Engineering students often need to choose a specialized career track by year 2 or 3, but curricula, online roadmaps, and portfolio projects are disconnected.",
  problems: [
    "Skill gaps between university curricula and industry requirements.",
    "Choice paralysis caused by too many generic online roadmaps.",
    "Disconnected portfolios that do not tell a coherent employability story."
  ],
  actors: ["SE Student", "Academic Counselor", "Industry Mentor"],
  entities: ["Student Profile", "Tech Path", "Skill Node", "Course Repo", "Job Trend", "Mentor Session"],
  functionalRequirements: [
    ["FR1", "AI Virtual Mentor", "Chat, transcript/GitHub context, career advice."],
    ["FR2", "Dynamic Roadmap", "Target role selection, prioritized skill tree, resources, progress."],
    ["FR3", "Skill Gap Analysis", "Current skills mapped against selected role requirements."],
    ["FR4", "Market Pulse", "Job trend scan and keyword frequency analysis."],
    ["FR5", "E-Portfolio Management", "GitHub repository sync and shareable portfolio story."],
    ["FR6", "User Management", "Email/password, Google OAuth 2.0, persistent student records."]
  ]
};

function roadmapNode(id, phase, title, priority, duration, skills, resources) {
  return { id, phase, title, priority, duration, skills, resources };
}

const ROLE_CATALOG = {
  "Cloud Architect": {
    focus: "Cloud infrastructure, distributed systems, security, and cost-aware architecture.",
    requiredSkills: ["Networking", "Linux", "Docker", "Kubernetes", "AWS", "Terraform", "CI/CD", "Security", "System Design", "Monitoring"],
    nodes: [
      roadmapNode("cloud-linux", "Foundation", "Linux and networking basics", "High", "2 weeks", ["Linux", "Networking"], [
        ["Linux Journey", "https://linuxjourney.com/"],
        ["Cisco Networking Basics", "https://skillsforall.com/course/networking-basics"]
      ]),
      roadmapNode("cloud-docker", "Foundation", "Containers with Docker", "High", "2 weeks", ["Docker"], [
        ["Docker docs", "https://docs.docker.com/get-started/"],
        ["Docker crash course", "https://www.youtube.com/results?search_query=docker+crash+course"]
      ]),
      roadmapNode("cloud-aws", "Core Cloud", "AWS core services", "High", "3 weeks", ["AWS"], [
        ["AWS Skill Builder", "https://skillbuilder.aws/"],
        ["AWS Well-Architected", "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"]
      ]),
      roadmapNode("cloud-k8s", "Core Cloud", "Kubernetes orchestration", "High", "3 weeks", ["Kubernetes"], [
        ["Kubernetes docs", "https://kubernetes.io/docs/home/"],
        ["Kubernetes course", "https://www.youtube.com/results?search_query=kubernetes+full+course"]
      ]),
      roadmapNode("cloud-terraform", "Core Cloud", "Infrastructure as Code with Terraform", "Medium", "2 weeks", ["Terraform"], [
        ["HashiCorp Learn", "https://developer.hashicorp.com/terraform/tutorials"],
        ["Terraform AWS provider", "https://registry.terraform.io/providers/hashicorp/aws/latest/docs"]
      ]),
      roadmapNode("cloud-design", "Professional Evidence", "Cloud architecture case study", "High", "2 weeks", ["System Design"], [
        ["System Design Primer", "https://github.com/donnemartin/system-design-primer"],
        ["AWS Architecture Center", "https://aws.amazon.com/architecture/"]
      ])
    ]
  },
  "Data Engineer": {
    focus: "Data pipelines, warehousing, analytics engineering, and reliable batch/stream processing.",
    requiredSkills: ["Python", "SQL", "Data Modeling", "Airflow", "Spark", "Kafka", "dbt", "Docker", "Cloud Storage", "Data Quality"],
    nodes: [
      roadmapNode("de-python", "Foundation", "Python for data workflows", "High", "2 weeks", ["Python"], [
        ["Python docs", "https://docs.python.org/3/tutorial/"],
        ["Python data course", "https://www.youtube.com/results?search_query=python+for+data+engineering"]
      ]),
      roadmapNode("de-sql", "Foundation", "Advanced SQL and query tuning", "High", "2 weeks", ["SQL"], [
        ["Mode SQL tutorial", "https://mode.com/sql-tutorial/"],
        ["PostgreSQL docs", "https://www.postgresql.org/docs/current/tutorial.html"]
      ]),
      roadmapNode("de-airflow", "Pipeline Systems", "Workflow orchestration with Airflow", "High", "2 weeks", ["Airflow"], [
        ["Airflow docs", "https://airflow.apache.org/docs/"],
        ["Airflow tutorial", "https://www.youtube.com/results?search_query=apache+airflow+tutorial"]
      ]),
      roadmapNode("de-spark", "Pipeline Systems", "Distributed processing with Spark", "Medium", "3 weeks", ["Spark"], [
        ["Spark docs", "https://spark.apache.org/docs/latest/"],
        ["Databricks academy", "https://www.databricks.com/learn/training/home"]
      ]),
      roadmapNode("de-quality", "Professional Evidence", "Data quality checks and lineage report", "High", "2 weeks", ["Data Quality", "Cloud Storage"], [
        ["Great Expectations", "https://docs.greatexpectations.io/docs/"],
        ["Google Cloud data docs", "https://cloud.google.com/docs"]
      ])
    ]
  },
  "DevOps Engineer": {
    focus: "Automation, deployment reliability, environment management, and production operations.",
    requiredSkills: ["Linux", "Git", "Docker", "Kubernetes", "CI/CD", "Terraform", "Scripting", "Monitoring", "Security", "Cloud"],
    nodes: [
      roadmapNode("devops-linux", "Foundation", "Linux administration and shell scripting", "High", "2 weeks", ["Linux", "Scripting"], [
        ["Linux Journey", "https://linuxjourney.com/"],
        ["Bash guide", "https://mywiki.wooledge.org/BashGuide"]
      ]),
      roadmapNode("devops-git", "Foundation", "Git workflow and release branching", "High", "1 week", ["Git"], [
        ["Git book", "https://git-scm.com/book/en/v2"],
        ["GitHub flow", "https://docs.github.com/en/get-started/using-github/github-flow"]
      ]),
      roadmapNode("devops-docker", "Platform", "Docker images and compose stacks", "High", "2 weeks", ["Docker"], [
        ["Docker docs", "https://docs.docker.com/"],
        ["Docker compose docs", "https://docs.docker.com/compose/"]
      ]),
      roadmapNode("devops-cicd", "Platform", "CI/CD pipeline design", "High", "2 weeks", ["CI/CD"], [
        ["GitHub Actions", "https://docs.github.com/actions"],
        ["Jenkins docs", "https://www.jenkins.io/doc/"]
      ]),
      roadmapNode("devops-monitor", "Professional Evidence", "Observability dashboard and alerting", "Medium", "2 weeks", ["Monitoring"], [
        ["Grafana docs", "https://grafana.com/docs/"],
        ["Prometheus docs", "https://prometheus.io/docs/"]
      ])
    ]
  },
  "Mobile Developer": {
    focus: "Mobile UI, native device capabilities, API integration, testing, and app store readiness.",
    requiredSkills: ["JavaScript", "TypeScript", "React Native", "Flutter", "REST API", "Firebase", "Mobile UX", "Testing", "State Management", "App Deployment"],
    nodes: [
      roadmapNode("mobile-ts", "Foundation", "TypeScript and async JavaScript", "High", "2 weeks", ["TypeScript", "JavaScript"], [
        ["TypeScript handbook", "https://www.typescriptlang.org/docs/"],
        ["MDN async JS", "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous"]
      ]),
      roadmapNode("mobile-ux", "Foundation", "Mobile UX and accessibility", "Medium", "1 week", ["Mobile UX"], [
        ["Material Design", "https://m3.material.io/"],
        ["Apple HIG", "https://developer.apple.com/design/human-interface-guidelines/"]
      ]),
      roadmapNode("mobile-rn", "App Stack", "React Native app architecture", "High", "3 weeks", ["React Native"], [
        ["React Native docs", "https://reactnative.dev/docs/getting-started"],
        ["Expo docs", "https://docs.expo.dev/"]
      ]),
      roadmapNode("mobile-firebase", "Professional Evidence", "Firebase auth, storage, and notifications", "Medium", "2 weeks", ["Firebase"], [
        ["Firebase docs", "https://firebase.google.com/docs"],
        ["Firebase codelabs", "https://firebase.google.com/codelabs"]
      ]),
      roadmapNode("mobile-release", "Professional Evidence", "App deployment portfolio case study", "High", "2 weeks", ["App Deployment"], [
        ["Play Console help", "https://support.google.com/googleplay/android-developer/"],
        ["App Store Connect", "https://developer.apple.com/app-store-connect/"]
      ])
    ]
  }
};

const PREDEFINED_SKILLS = [
  "JavaScript", "TypeScript", "Java", "Python", "OOP", "Data Structures", "SQL", "HTML/CSS", "Git", "Linux", "Docker",
  "Kubernetes", "AWS", "Terraform", "CI/CD", "REST API", "React Native", "Testing", "System Design", "Security"
];

const RESOURCE_CATALOG = Object.entries(ROLE_CATALOG).flatMap(([role, config]) =>
  config.nodes.flatMap((node) =>
    node.resources.map(([title, url], index) => ({
      id: `${node.id}-resource-${index + 1}`,
      title,
      url,
      role,
      skill: node.skills[0],
      level: node.phase === "Foundation" ? "Foundation" : node.phase.includes("Professional") ? "Portfolio" : "Intermediate",
      provider: url.includes("github") ? "GitHub" : url.includes("docs") ? "Documentation" : "Course",
      description: `${title} supports ${node.title} for the ${role} roadmap.`
    }))
  )
);

const MARKET_TRENDS = [
  { skill: "Docker", frequency: 86, growth: 18, source: "LinkedIn" },
  { skill: "Kubernetes", frequency: 74, growth: 21, source: "LinkedIn" },
  { skill: "SQL", frequency: 91, growth: 12, source: "TopCV" },
  { skill: "React Native", frequency: 52, growth: 9, source: "TopCV" },
  { skill: "AWS", frequency: 68, growth: 17, source: "LinkedIn" },
  { skill: "Testing", frequency: 63, growth: 8, source: "TopCV" }
];

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

function hashPassword(password, salt) {
  return crypto.scryptSync(String(password), salt, 32).toString("hex");
}

function safeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    provider: user.provider,
    createdAt: user.createdAt,
    lastLogin: user.lastLogin || "",
    status: user.status || "Active",
    passwordManaged: true
  };
}

function defaultStudentState(user) {
  const now = new Date().toISOString();
  return {
    userId: user.id,
    profile: {
      fullName: user.name,
      email: user.email,
      program: "Software Engineering",
      yearStage: "2-3 orientation stage",
      targetRole: "Cloud Architect",
      gpa: 3.2,
      github: "",
      transcriptSignals: ["Data Structures: B+", "Database: A-", "Web Development: B", "Software Engineering: A"],
      updatedAt: now
    },
    skills: ["JavaScript", "Java", "Git", "OOP", "SQL", "HTML/CSS"],
    completedNodes: {},
    chatHistory: [
      {
        from: "mentor",
        text: "Welcome. I can help map your skills, transcript, GitHub profile, and portfolio evidence to a target software engineering career role.",
        createdAt: now
      }
    ],
    skillAssessments: [],
    portfolio: [
      {
        id: "portfolio-api",
        name: "student-roadmap-api",
        techStack: ["Node.js", "REST API", "JSON DB"],
        summary: "Backend API demonstrating authentication, roadmap state, and portfolio records.",
        url: "https://github.com/example/student-roadmap-api",
        source: "demo"
      }
    ],
    bookmarks: [],
    completedResources: [],
    mentorSessions: [
      {
        id: "session-counselor-1",
        role: "Academic Counselor",
        topic: "Choose a specialization by semester 5",
        status: "Scheduled",
        owner: "Academic Counselor",
        createdAt: now
      },
      {
        id: "session-mentor-1",
        role: "Industry Mentor",
        topic: "Review portfolio evidence for target role",
        status: "Pending notes",
        owner: "Industry Mentor",
        createdAt: now
      }
    ],
    notes: [],
    lastMarketScan: now
  };
}

function ensureStudentState(db, user) {
  db.studentStates = Array.isArray(db.studentStates) ? db.studentStates : [];
  let state = db.studentStates.find((item) => item.userId === user.id);
  if (!state) {
    state = defaultStudentState(user);
    db.studentStates.push(state);
  }
  state.bookmarks = Array.isArray(state.bookmarks) ? state.bookmarks : [];
  state.completedResources = Array.isArray(state.completedResources) ? state.completedResources : [];
  state.chatHistory = Array.isArray(state.chatHistory) ? state.chatHistory : [];
  state.portfolio = (Array.isArray(state.portfolio) ? state.portfolio : []).map((project) => ({
    ...project,
    source: project.source || (/github\.com\/(?:sample|example)\//i.test(project.url || "") ? "demo" : project.url ? "github" : "manual")
  }));
  state.mentorSessions = Array.isArray(state.mentorSessions) ? state.mentorSessions : [];
  return state;
}

function getRoleConfig(role) {
  return ROLE_CATALOG[role] || ROLE_CATALOG["Cloud Architect"];
}

function getCompletion(role, completedNodes = {}) {
  const nodes = getRoleConfig(role).nodes;
  const done = nodes.filter((node) => completedNodes[node.id]).length;
  return {
    done,
    total: nodes.length,
    percent: nodes.length ? Math.round((done / nodes.length) * 100) : 0
  };
}

function getSkillGap(role, skills = []) {
  const required = getRoleConfig(role).requiredSkills;
  const owned = new Set(skills.map((skill) => String(skill).trim().toLowerCase()));
  const matched = required.filter((skill) => owned.has(skill.toLowerCase()));
  const missing = required.filter((skill) => !owned.has(skill.toLowerCase()));
  return { required, matched, missing };
}

function getUrgentPriorities(role, missingSkills) {
  const missing = new Set(missingSkills.map((skill) => skill.toLowerCase()));
  const rank = { High: 1, Medium: 2, Low: 3 };
  return getRoleConfig(role)
    .nodes.filter((node) => node.skills.some((skill) => missing.has(skill.toLowerCase())))
    .sort((a, b) => (rank[a.priority] || 9) - (rank[b.priority] || 9))
    .slice(0, 5)
    .map((node) => ({
      id: node.id,
      title: node.title,
      priority: node.priority,
      duration: node.duration,
      skills: node.skills
    }));
}

function buildMentorReply(state, question) {
  const role = state.profile.targetRole;
  const gap = getSkillGap(role, state.skills);
  const priorities = getUrgentPriorities(role, gap.missing).slice(0, 4);
  const completion = getCompletion(role, state.completedNodes);
  const key = String(question || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  const hasAny = (terms) => terms.some((term) => key.includes(term));
  const missingText = gap.missing.slice(0, 4).join(", ") || "không còn skill gap nền tảng";
  const priorityText = priorities.map((item, index) => `${index + 1}. ${item.title} (${item.duration})`).join("; ") || "chuyển trọng tâm sang portfolio evidence";
  const verifiedProjects = state.portfolio.filter((project) => project.source !== "demo").length;
  const gpa = Number(state.profile.gpa || 0).toFixed(2);

  if (hasAny(["portfolio", "du an", "project", "readme"])) {
    return `Với target **${role}**, bạn đang có **${verifiedProjects} project đã xác minh**. Hãy ưu tiên một project chứng minh ${missingText}. README nên có problem, kiến trúc, lựa chọn công nghệ, test/deployment evidence và phần reflection về trade-off.`;
  }
  if (hasAny(["lo trinh", "roadmap", "4 tuan", "hoc gi", "ke hoach"])) {
    return `Roadmap **${role}** hiện hoàn thành **${completion.percent}%**. Kế hoạch ưu tiên: ${priorityText}. Mỗi tuần chỉ chọn một milestone và kết thúc bằng commit, README, screenshot hoặc demo link.`;
  }
  if (hasAny(["thieu", "skill gap", "ky nang", "uu tien"])) {
    return `Bạn đang match **${gap.matched.length}/${gap.required.length}** kỹ năng của **${role}**. Gap chính: **${missingText}**. Hành động kế tiếp: ${priorityText}. Hãy lưu một assessment snapshot sau khi cập nhật bằng chứng kỹ năng.`;
  }
  if (hasAny(["github", "cv", "thuc tap", "intern", "phong van", "viec lam"])) {
    const githubState = state.profile.github ? `đã liên kết GitHub **${state.profile.github}**` : "chưa liên kết GitHub";
    return `Để chuẩn bị thực tập **${role}**, bạn ${githubState}, GPA hiện tại **${gpa}**. Ưu tiên đóng 2-3 gap (${missingText}), pin 2-3 repo đúng role, viết CV theo kết quả đo được và chuẩn bị câu chuyện về lỗi khó nhất cùng cách xử lý.`;
  }
  return `Snapshot hiện tại cho **${role}**: roadmap **${completion.percent}%**, skill match **${gap.matched.length}/${gap.required.length}**, GPA **${gpa}**, portfolio xác minh **${verifiedProjects} project**. Việc nên làm tiếp theo là ${priorityText}. Bạn có thể hỏi sâu hơn về lộ trình 4 tuần, skill gap, portfolio hoặc thực tập.`;
}

function getAuthenticatedUser(db, req) {
  const token = getBearerToken(req);
  const session = db.sessions.find((item) => item.token === token && new Date(item.expiresAt).getTime() > Date.now());
  return session ? db.users.find((item) => item.id === session.userId) : null;
}

function requireAuthenticatedUser(db, req, res) {
  const user = getAuthenticatedUser(db, req);
  if (!user) {
    sendJson(res, 401, { message: "Authentication is required for this endpoint." });
    return null;
  }
  return user;
}

function normalizeDatabase(db = {}) {
  db.users = Array.isArray(db.users) ? db.users : [];
  db.sessions = Array.isArray(db.sessions) ? db.sessions : [];
  db.studentStates = Array.isArray(db.studentStates) ? db.studentStates : [];
  db.marketScans = Array.isArray(db.marketScans) ? db.marketScans : [];
  return db;
}

async function ensureDatabase() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let db;
  try {
    db = normalizeDatabase(JSON.parse(await fs.readFile(DB_FILE, "utf8")));
  } catch {
    db = normalizeDatabase();
  }

  const demoEmail = normalizeEmail(DEMO_ACCOUNT.email);
  if (!db.users.some((user) => normalizeEmail(user.email) === demoEmail)) {
    db.users.unshift({
      ...DEMO_ACCOUNT,
      email: demoEmail,
      passwordHash: hashPassword("careercompass", DEMO_ACCOUNT.passwordSalt),
      lastLogin: ""
    });
  }

  db.users.forEach((user) => ensureStudentState(db, user));

  await writeDatabase(db);
  return db;
}

async function readDatabase() {
  try {
    return normalizeDatabase(JSON.parse(await fs.readFile(DB_FILE, "utf8")));
  } catch (error) {
    if (error?.code === "ENOENT") return ensureDatabase();
    throw error;
  }
}

async function writeDatabase(db) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DB_FILE, `${JSON.stringify(db, null, 2)}\n`, "utf8");
}

async function parseBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
    if (Buffer.concat(chunks).length > 1024 * 1024) {
      throw Object.assign(new Error("Request body is too large."), { status: 413 });
    }
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    throw Object.assign(new Error("Invalid JSON request body."), { status: 400 });
  }
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

function findUserByEmail(db, email) {
  const normalized = normalizeEmail(email);
  return db.users.find((user) => normalizeEmail(user.email) === normalized);
}

function createSession(db, user) {
  const now = new Date();
  const token = crypto.randomBytes(32).toString("hex");
  const session = {
    token,
    userId: user.id,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + SESSION_TTL_MS).toISOString()
  };
  db.sessions = [
    session,
    ...(db.sessions || []).filter((item) => new Date(item.expiresAt).getTime() > Date.now())
  ].slice(0, 80);
  return session;
}

function getBearerToken(req) {
  const header = req.headers.authorization || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match ? match[1] : "";
}

async function handleApi(req, res, pathname) {
  const requestUrl = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);

  if (req.method === "GET" && pathname === "/api/health") {
    sendJson(res, 200, { status: "ok", service: "SE Career Compass API" });
    return;
  }

  const db = await readDatabase();

  if (req.method === "GET" && pathname === "/api/spec") {
    sendJson(res, 200, TOPIC_SPEC);
    return;
  }

  if (req.method === "GET" && pathname === "/api/roles") {
    sendJson(res, 200, {
      roles: Object.entries(ROLE_CATALOG).map(([name, config]) => ({
        name,
        focus: config.focus,
        requiredSkills: config.requiredSkills,
        nodeCount: config.nodes.length
      }))
    });
    return;
  }

  if (req.method === "GET" && pathname === "/api/roadmap") {
    const role = requestUrl.searchParams.get("role") || "Cloud Architect";
    const config = getRoleConfig(role);
    sendJson(res, 200, {
      role: ROLE_CATALOG[role] ? role : "Cloud Architect",
      focus: config.focus,
      requiredSkills: config.requiredSkills,
      nodes: config.nodes
    });
    return;
  }

  if (req.method === "GET" && pathname === "/api/resources") {
    const role = requestUrl.searchParams.get("role");
    const level = requestUrl.searchParams.get("level") || "all";
    const query = String(requestUrl.searchParams.get("q") || "").trim().toLowerCase();
    const resources = RESOURCE_CATALOG.filter((item) => {
      const roleMatch = !role || item.role === role;
      const levelMatch = level === "all" || item.level === level;
      const queryMatch =
        !query ||
        `${item.title} ${item.skill} ${item.provider} ${item.description} ${item.role}`.toLowerCase().includes(query);
      return roleMatch && levelMatch && queryMatch;
    });
    sendJson(res, 200, { resources });
    return;
  }

  if (req.method === "GET" && pathname === "/api/market/trends") {
    const source = requestUrl.searchParams.get("source") || "all";
    const activeTrends = db.marketScans[0]?.trends || MARKET_TRENDS;
    const trends = activeTrends.filter((item) => source === "all" || item.source === source);
    sendJson(res, 200, {
      lastScan: db.marketScans[0]?.createdAt || new Date().toISOString(),
      trends
    });
    return;
  }

  if (req.method === "GET" && pathname.startsWith("/api/portfolio/")) {
    const userId = decodeURIComponent(pathname.slice("/api/portfolio/".length));
    const portfolioOwner = db.users.find((item) => item.id === userId);
    const publicState = db.studentStates.find((item) => item.userId === userId);
    if (!portfolioOwner || !publicState) {
      sendJson(res, 404, { message: "Public portfolio not found." });
      return;
    }
    sendJson(res, 200, {
      student: {
        name: publicState.profile.fullName || portfolioOwner.name,
        targetRole: publicState.profile.targetRole,
        github: publicState.profile.github || ""
      },
      projects: (publicState.portfolio || []).map((project) => ({
        ...project,
        source: project.source || (/github\.com\/(?:sample|example)\//i.test(project.url || "") ? "demo" : project.url ? "github" : "manual")
      })),
      generatedAt: publicState.profile.updatedAt || new Date().toISOString()
    });
    return;
  }

  if (req.method === "POST" && pathname === "/api/auth/register") {
    const body = await parseBody(req);
    const name = String(body.name || "").trim();
    const email = normalizeEmail(body.email);
    const password = String(body.password || "").trim();
    const role = String(body.role || "Student").trim() || "Student";

    if (!name) {
      sendJson(res, 400, { message: "Full name is required." });
      return;
    }
    if (!email || !email.includes("@")) {
      sendJson(res, 400, { message: "Valid email is required." });
      return;
    }
    if (findUserByEmail(db, email)) {
      sendJson(res, 409, { message: "This email already has an account." });
      return;
    }
    if (password.length < 8) {
      sendJson(res, 400, { message: "Password must be at least 8 characters." });
      return;
    }

    const passwordSalt = crypto.randomBytes(16).toString("hex");
    const user = {
      id: accountIdFromEmail(email),
      name,
      email,
      role,
      provider: "Email/Password",
      passwordSalt,
      passwordHash: hashPassword(password, passwordSalt),
      createdAt: new Date().toISOString(),
      lastLogin: "",
      status: "Active"
    };
    db.users.unshift(user);
    ensureStudentState(db, user);
    await writeDatabase(db);
    sendJson(res, 201, { user: safeUser(user), message: "Account created. Sign in to continue." });
    return;
  }

  if (req.method === "POST" && pathname === "/api/auth/login") {
    const body = await parseBody(req);
    const email = normalizeEmail(body.email);
    const password = String(body.password || "").trim();
    const user = findUserByEmail(db, email);

    if (!user || user.provider === "Google OAuth 2.0" || !user.passwordHash) {
      sendJson(res, 401, { message: "Invalid email or password." });
      return;
    }
    if (hashPassword(password, user.passwordSalt) !== user.passwordHash) {
      sendJson(res, 401, { message: "Invalid email or password." });
      return;
    }

    user.lastLogin = new Date().toISOString();
    ensureStudentState(db, user);
    const session = createSession(db, user);
    await writeDatabase(db);
    sendJson(res, 200, { token: session.token, user: safeUser(user) });
    return;
  }

  if (req.method === "POST" && pathname === "/api/auth/google") {
    const body = await parseBody(req);
    const email = normalizeEmail(body.email);
    const name = String(body.name || displayNameFromEmail(email)).trim();

    if (!email || !email.includes("@")) {
      sendJson(res, 400, { message: "Valid Google account email is required." });
      return;
    }

    let user = findUserByEmail(db, email);
    if (!user) {
      user = {
        id: accountIdFromEmail(email),
        name,
        email,
        role: "Student",
        provider: "Google OAuth 2.0",
        passwordSalt: "",
        passwordHash: "",
        createdAt: new Date().toISOString(),
        lastLogin: "",
        status: "Active"
      };
      db.users.unshift(user);
    } else {
      user.name = user.name || name;
      user.provider = "Google OAuth 2.0";
    }

    user.lastLogin = new Date().toISOString();
    const session = createSession(db, user);
    await writeDatabase(db);
    sendJson(res, 200, { token: session.token, user: safeUser(user) });
    return;
  }

  if (req.method === "GET" && pathname === "/api/oauth/google/accounts") {
    const saved = db.users
      .filter((user) => user.provider === "Google OAuth 2.0")
      .map((user) => ({
        name: user.name,
        email: user.email,
        status: "Saved account"
      }));
    const seen = new Set();
    const accounts = [...GOOGLE_CHOICES, ...saved].filter((account) => {
      const email = normalizeEmail(account.email);
      if (seen.has(email)) return false;
      seen.add(email);
      return true;
    });
    sendJson(res, 200, { accounts });
    return;
  }

  if (req.method === "GET" && pathname === "/api/auth/me") {
    const token = getBearerToken(req);
    const session = db.sessions.find((item) => item.token === token && new Date(item.expiresAt).getTime() > Date.now());
    const user = session ? db.users.find((item) => item.id === session.userId) : null;
    if (!user) {
      sendJson(res, 401, { message: "Session is not valid." });
      return;
    }
    sendJson(res, 200, { user: safeUser(user) });
    return;
  }

  if (req.method === "POST" && pathname === "/api/auth/logout") {
    const token = getBearerToken(req);
    db.sessions = db.sessions.filter((session) => session.token !== token);
    await writeDatabase(db);
    sendJson(res, 200, { message: "Signed out." });
    return;
  }

  if (pathname.startsWith("/api/me/")) {
    const user = requireAuthenticatedUser(db, req, res);
    if (!user) return;
    const studentState = ensureStudentState(db, user);

    if (req.method === "GET" && pathname === "/api/me/profile") {
      sendJson(res, 200, { profile: studentState.profile, user: safeUser(user) });
      return;
    }

    if (req.method === "PUT" && pathname === "/api/me/profile") {
      const body = await parseBody(req);
      studentState.profile = {
        ...studentState.profile,
        ...Object.fromEntries(
          Object.entries(body).filter(([key]) =>
            ["fullName", "program", "yearStage", "targetRole", "gpa", "github", "transcriptSignals"].includes(key)
          )
        ),
        updatedAt: new Date().toISOString()
      };
      if (body.fullName) {
        user.name = String(body.fullName).trim();
      }
      await writeDatabase(db);
      sendJson(res, 200, { profile: studentState.profile });
      return;
    }

    if (req.method === "GET" && pathname === "/api/me/records") {
      const role = studentState.profile.targetRole;
      const completion = getCompletion(role, studentState.completedNodes);
      const gap = getSkillGap(role, studentState.skills);
      sendJson(res, 200, {
        records: [
          ["Chat history", `${studentState.chatHistory.length} messages`],
          ["Skill assessment", `${gap.matched.length}/${gap.required.length} matched for ${role}`],
          ["Roadmap progress", `${completion.done}/${completion.total} nodes completed`],
          ["GitHub portfolio", `${studentState.portfolio.length} repositories stored`],
          ["Course bookmarks", `${studentState.bookmarks.length} resources saved`],
          ["Mentor sessions", `${studentState.mentorSessions.length} advising sessions`],
          ["Market pulse", `Last scan ${studentState.lastMarketScan}`]
        ],
        profile: studentState.profile
      });
      return;
    }

    if (req.method === "GET" && pathname === "/api/me/roadmap") {
      const role = requestUrl.searchParams.get("role") || studentState.profile.targetRole;
      const config = getRoleConfig(role);
      sendJson(res, 200, {
        role,
        focus: config.focus,
        nodes: config.nodes,
        completedNodes: studentState.completedNodes,
        completion: getCompletion(role, studentState.completedNodes)
      });
      return;
    }

    if (req.method === "PUT" && pathname === "/api/me/roadmap") {
      const body = await parseBody(req);
      if (body.targetRole && ROLE_CATALOG[body.targetRole]) {
        studentState.profile.targetRole = body.targetRole;
      }
      if (body.completedNodes && typeof body.completedNodes === "object") {
        studentState.completedNodes = body.completedNodes;
      }
      studentState.profile.updatedAt = new Date().toISOString();
      await writeDatabase(db);
      sendJson(res, 200, {
        completedNodes: studentState.completedNodes,
        completion: getCompletion(studentState.profile.targetRole, studentState.completedNodes),
        targetRole: studentState.profile.targetRole
      });
      return;
    }

    if (req.method === "GET" && pathname === "/api/me/skills") {
      const role = studentState.profile.targetRole;
      const gap = getSkillGap(role, studentState.skills);
      sendJson(res, 200, {
        predefinedSkills: PREDEFINED_SKILLS,
        skills: studentState.skills,
        role,
        gap,
        urgentPriorities: getUrgentPriorities(role, gap.missing)
      });
      return;
    }

    if (req.method === "PUT" && pathname === "/api/me/skills") {
      const body = await parseBody(req);
      studentState.skills = Array.isArray(body.skills)
        ? [...new Set(body.skills.map((skill) => String(skill).trim()).filter(Boolean))]
        : studentState.skills;
      const role = body.targetRole && ROLE_CATALOG[body.targetRole] ? body.targetRole : studentState.profile.targetRole;
      studentState.profile.targetRole = role;
      const gap = getSkillGap(role, studentState.skills);
      if (body.createSnapshot === true) {
        studentState.skillAssessments.unshift({
          id: `assessment-${Date.now()}`,
          role,
          matched: gap.matched,
          missing: gap.missing,
          createdAt: new Date().toISOString()
        });
        studentState.skillAssessments = studentState.skillAssessments.slice(0, 30);
      }
      await writeDatabase(db);
      sendJson(res, 200, {
        skills: studentState.skills,
        role,
        gap,
        urgentPriorities: getUrgentPriorities(role, gap.missing)
      });
      return;
    }

    if (req.method === "POST" && pathname === "/api/me/skill-gap/report") {
      const body = await parseBody(req);
      const role = body.targetRole && ROLE_CATALOG[body.targetRole] ? body.targetRole : studentState.profile.targetRole;
      const skills = Array.isArray(body.skills) ? body.skills : studentState.skills;
      const gap = getSkillGap(role, skills);
      sendJson(res, 200, {
        role,
        gap,
        urgentPriorities: getUrgentPriorities(role, gap.missing),
        generatedAt: new Date().toISOString()
      });
      return;
    }

    if (req.method === "GET" && pathname === "/api/me/chat") {
      sendJson(res, 200, { messages: studentState.chatHistory });
      return;
    }

    if (req.method === "DELETE" && pathname === "/api/me/chat") {
      studentState.chatHistory = [];
      await writeDatabase(db);
      sendJson(res, 200, { messages: [] });
      return;
    }

    if (req.method === "POST" && pathname === "/api/me/chat") {
      const body = await parseBody(req);
      const question = String(body.message || "").trim();
      if (!question) {
        sendJson(res, 400, { message: "Chat message is required." });
        return;
      }
      const now = new Date().toISOString();
      const userMessage = { from: "user", text: question, createdAt: now };
      const mentorMessage = { from: "mentor", text: buildMentorReply(studentState, question), createdAt: now };
      studentState.chatHistory.push(userMessage, mentorMessage);
      await writeDatabase(db);
      sendJson(res, 201, { messages: [userMessage, mentorMessage], history: studentState.chatHistory });
      return;
    }

    if (req.method === "GET" && pathname === "/api/me/portfolio") {
      sendJson(res, 200, {
        github: studentState.profile.github,
        shareUrl: `/portfolio.html?user=${encodeURIComponent(user.id)}`,
        projects: studentState.portfolio
      });
      return;
    }

    if (req.method === "POST" && pathname === "/api/me/portfolio/sync") {
      const body = await parseBody(req);
      const github = String(Object.prototype.hasOwnProperty.call(body, "github") ? body.github || "" : studentState.profile.github || "").trim();
      studentState.profile.github = github;
      const role = studentState.profile.targetRole;
      const hasSubmittedProjects = Array.isArray(body.projects);
      const submittedProjects = hasSubmittedProjects
        ? body.projects
            .filter((item) => item && item.name)
            .map((item, index) => ({
              id: item.id || `repo-${github || "student"}-${index + 1}`,
              name: String(item.name).trim(),
              techStack: Array.isArray(item.stack) ? item.stack : Array.isArray(item.techStack) ? item.techStack : [item.language || "Code"],
              summary: item.summary || item.description || `Repository evidence aligned with ${role}.`,
              url: item.url || (github ? `https://github.com/${github}` : "#"),
              source: item.source || (github ? "github" : "manual")
            }))
        : [];
      if (hasSubmittedProjects) {
        studentState.portfolio = submittedProjects.slice(0, 12);
      } else if (github) {
        studentState.portfolio = [
            {
              id: `repo-${github || "student"}-roadmap`,
              name: `${github || "student"}-${role.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-portfolio`,
              techStack: getRoleConfig(role).requiredSkills.slice(0, 4),
              summary: `Portfolio repository aligned with ${role}: README story, technical stack, and role-specific evidence.`,
              url: `https://github.com/${github || "student"}/career-portfolio`,
              source: "github"
            },
            ...studentState.portfolio.filter((item) => !String(item.id || "").startsWith(`repo-${github || "student"}-roadmap`))
          ].slice(0, 12);
      } else {
        studentState.portfolio = studentState.portfolio.filter((item) => item.source === "manual");
      }
      studentState.profile.updatedAt = new Date().toISOString();
      await writeDatabase(db);
      sendJson(res, 200, {
        github,
        shareUrl: `/portfolio.html?user=${encodeURIComponent(user.id)}`,
        projects: studentState.portfolio
      });
      return;
    }

    if (req.method === "GET" && pathname === "/api/me/mentor-sessions") {
      sendJson(res, 200, { sessions: studentState.mentorSessions });
      return;
    }

    if (req.method === "PATCH" && pathname.startsWith("/api/me/mentor-sessions/")) {
      const sessionId = decodeURIComponent(pathname.slice("/api/me/mentor-sessions/".length));
      const session = studentState.mentorSessions.find((item) => item.id === sessionId);
      if (!session) {
        sendJson(res, 404, { message: "Mentor session not found." });
        return;
      }
      const body = await parseBody(req);
      const allowedStatuses = new Set(["Scheduled", "Active", "Pending notes", "Completed"]);
      if (body.status && allowedStatuses.has(body.status)) session.status = body.status;
      if (body.topic) session.topic = String(body.topic).trim();
      session.updatedAt = new Date().toISOString();
      await writeDatabase(db);
      sendJson(res, 200, { session, sessions: studentState.mentorSessions });
      return;
    }

    if (req.method === "POST" && pathname === "/api/me/mentor-sessions") {
      const body = await parseBody(req);
      const session = {
        id: `session-${Date.now()}`,
        role: body.role || "Industry Mentor",
        topic: body.topic || `Review ${studentState.profile.targetRole} roadmap progress`,
        status: body.status || "Scheduled",
        owner: body.owner || body.role || "Industry Mentor",
        createdAt: new Date().toISOString()
      };
      studentState.mentorSessions.unshift(session);
      await writeDatabase(db);
      sendJson(res, 201, { session, sessions: studentState.mentorSessions });
      return;
    }

    if (req.method === "GET" && pathname === "/api/me/bookmarks") {
      sendJson(res, 200, { bookmarks: studentState.bookmarks });
      return;
    }

    if (req.method === "GET" && pathname === "/api/me/resource-progress") {
      sendJson(res, 200, { completedResources: studentState.completedResources });
      return;
    }

    if (req.method === "PUT" && pathname === "/api/me/resource-progress") {
      const body = await parseBody(req);
      const resourceId = String(body.resourceId || "").trim();
      if (!resourceId) {
        sendJson(res, 400, { message: "Resource id is required." });
        return;
      }
      const completedResources = new Set(studentState.completedResources);
      if (body.completed === false) completedResources.delete(resourceId);
      else completedResources.add(resourceId);
      studentState.completedResources = [...completedResources];
      await writeDatabase(db);
      sendJson(res, 200, { completedResources: studentState.completedResources });
      return;
    }

    if (req.method === "POST" && pathname === "/api/me/bookmarks") {
      const body = await parseBody(req);
      const resourceId = String(body.resourceId || "").trim();
      if (!resourceId) {
        sendJson(res, 400, { message: "Resource id is required." });
        return;
      }
      const bookmarks = new Set(studentState.bookmarks);
      if (body.saved === false) bookmarks.delete(resourceId);
      else bookmarks.add(resourceId);
      studentState.bookmarks = [...bookmarks];
      await writeDatabase(db);
      sendJson(res, 200, { bookmarks: studentState.bookmarks });
      return;
    }
  }

  if (req.method === "POST" && pathname === "/api/market/scan") {
    const body = await parseBody(req);
    const role = body.role && ROLE_CATALOG[body.role] ? body.role : "Cloud Architect";
    const existingSkills = new Set(MARKET_TRENDS.map((item) => item.skill.toLowerCase()));
    const roleSignals = getRoleConfig(role).requiredSkills
      .filter((skill) => !existingSkills.has(skill.toLowerCase()))
      .slice(0, 4)
      .map((skill, index) => ({
        skill,
        frequency: 48 - index * 5,
        growth: 16 - index * 2,
        source: index % 2 === 0 ? "LinkedIn" : "TopCV"
      }));
    const scan = {
      id: `scan-${Date.now()}`,
      createdAt: new Date().toISOString(),
      sources: ["LinkedIn", "TopCV"],
      role,
      trends: [...MARKET_TRENDS, ...roleSignals]
    };
    db.marketScans.unshift(scan);
    db.marketScans = db.marketScans.slice(0, 20);
    const user = getAuthenticatedUser(db, req);
    if (user) {
      ensureStudentState(db, user).lastMarketScan = scan.createdAt;
    }
    await writeDatabase(db);
    sendJson(res, 201, scan);
    return;
  }

  sendJson(res, 404, { message: "API route not found." });
}

async function serveStatic(req, res, pathname) {
  const requested = pathname === "/" ? "login.html" : decodeURIComponent(pathname).replace(/^\/+/, "");
  const filePath = path.resolve(ROOT_DIR, requested);
  const relative = path.relative(ROOT_DIR, filePath);
  const publicPath = relative.split(path.sep).join("/");
  const ext = path.extname(filePath).toLowerCase();
  const isRootFrontendFile = STATIC_FILES.has(publicPath);
  const isFrontendAsset = publicPath.startsWith("assets/") && STATIC_ASSET_TYPES.has(ext);

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  if (!isRootFrontendFile && !isFrontendAsset) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
    return;
  }

  try {
    const stat = await fs.stat(filePath);
    if (stat.isDirectory()) {
      res.writeHead(302, { Location: "/login.html" });
      res.end();
      return;
    }
    res.writeHead(200, {
      "Content-Type": CONTENT_TYPES[ext] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(await fs.readFile(filePath));
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url.pathname);
      return;
    }
    await serveStatic(req, res, url.pathname);
  } catch (error) {
    sendJson(res, error.status || 500, { message: error.message || "Internal server error." });
  }
});

server.on("error", (error) => {
  console.error(`Unable to start SE Career Compass: ${error.message}`);
  process.exitCode = 1;
});

ensureDatabase()
  .then(() => {
    server.listen(PORT, HOST, () => {
      const displayHost = HOST === "0.0.0.0" ? "127.0.0.1" : HOST;
      console.log(`SE Career Compass running at http://${displayHost}:${PORT}/login.html`);
      console.log(`API health check: http://${displayHost}:${PORT}/api/health`);
    });
  })
  .catch((error) => {
    console.error(`Unable to initialize the local database: ${error.message}`);
    process.exitCode = 1;
  });
