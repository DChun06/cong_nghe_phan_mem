# SE Career Compass

Personalized Career Orientation & Learning Roadmap Platform for Software Engineering Students

Submitted by: AnNDH2

## What This Demo Covers

This is a complete frontend prototype for the Software Engineering course project. It demonstrates the main workflows from the submitted topic:

- AI Virtual Mentor: chat interface, GPA input, transcript upload signal extraction, GitHub context.
- Dynamic Roadmap: target role selection, generated skill tree, resource links, completion tracking.
- Skill Gap Analysis: current skill selection, mapping to role requirements, visual gap report, print-to-PDF flow.
- Market Pulse: simulated daily job portal scan, keyword frequency analysis, interactive chart.
- E-Portfolio: GitHub public repository sync, README/stack summarization, shareable portfolio URL.
- Actor Workspace: student, academic counselor, and industry mentor action boards.
- Course Repo: curated learning resources with search, level filter, and bookmarks.
- System Spec: functional requirement traceability, NFRs, business rules, and logical data model.
- User Management: backend email/password login, simulated Google OAuth flow, session token, and persistent account records.

## How To Run

Recommended option: run the Node.js backend and static server:

```powershell
node server.js
```

Then open:

```text
http://127.0.0.1:4173/login.html
```

Shortcut on Windows:

```powershell
.\start-demo.bat
```

Frontend-only fallback: open `login.html` directly in a browser, or run a static server:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4173/login.html
```

For public deployment, follow `DEPLOY.md`.

## Backend API

The demo backend is implemented in `server.js` with Node.js built-in modules.
See `API.md` for request/response examples and functional requirement mapping.

Project metadata:

- `GET /api/spec` returns the topic context, problems, actors, functional requirements, and main entities.
- `GET /api/roles` returns target career roles and required skill baselines.

FR1 AI Virtual Mentor:

- `GET /api/me/chat` returns the authenticated student's mentor chat history.
- `POST /api/me/chat` stores a student question and returns a personalized mentor response based on target role and skill gap.

FR2 Dynamic Roadmap:

- `GET /api/roadmap?role=DevOps%20Engineer` returns a public roadmap for a target role.
- `GET /api/me/roadmap` returns the authenticated student's roadmap and completion state.
- `PUT /api/me/roadmap` updates target role and completed skill nodes.

FR3 Skill Gap Analysis:

- `GET /api/me/skills` returns current skills, predefined skills, gap mapping, and urgent priorities.
- `PUT /api/me/skills` saves current skills and creates a skill assessment snapshot.
- `POST /api/me/skill-gap/report` generates a role-based skill gap report payload.

FR4 Market Pulse:

- `GET /api/market/trends` returns simulated job keyword trends.
- `POST /api/market/scan` creates a scheduled-scan style market pulse snapshot.

FR5 E-Portfolio Management:

- `GET /api/me/portfolio` returns stored portfolio projects and share URL.
- `POST /api/me/portfolio/sync` simulates GitHub repository synchronization and README/stack summarization.
- `GET /api/resources` returns curated learning resources by role, level, and query.
- `POST /api/me/bookmarks` stores saved course resources.

FR6 User Management:

- `POST /api/auth/register` creates an account and stores a hashed password.
- `POST /api/auth/login` validates email/password and returns a session token.
- `POST /api/auth/google` simulates Google OAuth account selection and returns a session token.
- `GET /api/oauth/google/accounts` returns Google account chooser options.
- `GET /api/auth/me` validates the current bearer token.
- `POST /api/auth/logout` invalidates the current session token.
- `GET /api/me/profile` returns the authenticated student's profile.
- `PUT /api/me/profile` updates the authenticated student's profile.
- `GET /api/me/records` returns persistent record summaries for dashboard/user management.
- `GET /api/health` checks backend availability.

Data is persisted in `data/db.json`.

## Demo Notes

- Backend account data is stored in `data/db.json`; client session data is cached in browser `localStorage`.
- GitHub sync uses the public GitHub API when internet is available. If it fails, the backend generates role-aligned portfolio evidence so the demo flow still works.
- LLM responses, job scraping, Google OAuth, and README AI summaries are simulated for the prototype. Email/password authentication is backed by the local Node.js API.

## Recommended Demo Flow

1. Choose a target role from the top bar.
2. Open Roadmap and mark a few nodes completed.
3. Open Skill Gap and select/unselect current skills.
4. Ask AI Mentor for internship or portfolio advice.
5. Open Market Pulse and run the daily scan.
6. Open E-Portfolio and sync a GitHub username.
7. Open Workspace to show student/counselor/mentor operations.
8. Open System Spec to explain how the demo maps to the functional requirements.
# Software-Engineering-Students
