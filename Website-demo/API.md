# SE Career Compass Backend API

Base URL for local demo:

```text
http://127.0.0.1:4173/api
```

Authenticated endpoints require:

```http
Authorization: Bearer <session-token>
Content-Type: application/json
```

## Health And Public Catalog

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/health` | Check whether the backend is running. |
| GET | `/spec` | Return the topic context, actors, entities, and FR mapping. |
| GET | `/roles` | Return career roles, required skills, and roadmap nodes. |
| GET | `/roadmap?role=DevOps%20Engineer` | Return a public roadmap for a selected target role. |
| GET | `/resources?role=Cloud%20Architect&level=Foundation&q=docker` | Search curated learning resources. |
| GET | `/market/trends` | Return keyword trend data for market pulse charts. |
| POST | `/market/scan` | Create a simulated daily job portal scan. |
| GET | `/portfolio/:userId` | Return portfolio data used by the public recruiter page. |

## Authentication

| Method | Endpoint | Body | Result |
| --- | --- | --- | --- |
| POST | `/auth/register` | `{ "name": "...", "email": "...", "password": "...", "role": "Student" }` | Creates an account with a hashed password. |
| POST | `/auth/login` | `{ "email": "...", "password": "..." }` | Returns a session token and user profile. |
| GET | `/oauth/google/accounts` | none | Returns simulated Google chooser accounts. |
| POST | `/auth/google` | `{ "name": "...", "email": "..." }` | Simulates Google OAuth selection and returns a session token. |
| GET | `/auth/me` | none | Validates the bearer token. |
| POST | `/auth/logout` | none | Invalidates the current session token. |

Example login response:

```json
{
  "token": "session-token",
  "user": {
    "id": "acct-student-example",
    "name": "Student Example",
    "email": "student@example.com",
    "role": "Student",
    "provider": "Email/Password"
  }
}
```

## Student Profile And Records

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/me/profile` | Load the authenticated student's profile. |
| PUT | `/me/profile` | Update full name, target role, GPA, GitHub handle, and transcript signals. |
| GET | `/me/records` | Return record summaries for chat, skill assessment, roadmap, portfolio, bookmarks, sessions, and market scan. |

Profile update body:

```json
{
  "fullName": "Nguyen Hoang Nhat",
  "targetRole": "DevOps Engineer",
  "gpa": 3.2,
  "github": "student-github",
  "transcriptSignals": ["Database: A-", "Software Engineering: A"]
}
```

## Core Product Flows

| FR | Method | Endpoint | Purpose |
| --- | --- | --- | --- |
| FR1 | GET | `/me/chat` | Load AI mentor chat history. |
| FR1 | POST | `/me/chat` | Save a question and return a mentor response based on role and skill gap. |
| FR1 | DELETE | `/me/chat` | Clear the student's persisted chat history. |
| FR2 | GET | `/me/roadmap` | Load the student's roadmap and completion state. |
| FR2 | PUT | `/me/roadmap` | Save target role and completed roadmap nodes. |
| FR3 | GET | `/me/skills` | Load current skills, required skills, gap result, and urgent priorities. |
| FR3 | PUT | `/me/skills` | Save skills and optionally create an explicit assessment snapshot. |
| FR3 | POST | `/me/skill-gap/report` | Generate a printable skill gap report payload. |
| FR5 | GET | `/me/portfolio` | Load portfolio projects and share URL. |
| FR5 | POST | `/me/portfolio/sync` | Save GitHub handle and portfolio projects, or generate role-aligned evidence. |
| FR5 | GET | `/portfolio/:userId` | Load the public recruiter portfolio without authentication. |
| Resources | GET | `/me/bookmarks` | Load saved resource IDs. |
| FR5 | POST | `/me/bookmarks` | Save or remove a course resource bookmark. |
| Resources | GET | `/me/resource-progress` | Load completed resource IDs. |
| Resources | PUT | `/me/resource-progress` | Mark a resource complete or incomplete. |
| Workspace | GET | `/me/mentor-sessions` | Load advising and mentor sessions. |
| Workspace | POST | `/me/mentor-sessions` | Create a new counselor or mentor session. |
| Workspace | PATCH | `/me/mentor-sessions/:id` | Update an advising session status. |

Roadmap update body:

```json
{
  "targetRole": "Cloud Architect",
  "completedNodes": {
    "cloud-linux": true,
    "cloud-docker": true
  }
}
```

Skill update body:

```json
{
  "targetRole": "Data Engineer",
  "skills": ["JavaScript", "SQL", "Python", "Docker"],
  "createSnapshot": true
}
```

Portfolio sync body:

```json
{
  "github": "student-github",
  "projects": [
    {
      "name": "career-roadmap-api",
      "url": "https://github.com/student-github/career-roadmap-api",
      "summary": "API for student roadmap progress and portfolio records.",
      "stack": ["Node.js", "REST API", "JSON DB"]
    }
  ]
}
```

## Storage Model

The demo uses `data/db.json` as a lightweight local database. It stores:

- `users`: account records and password hashes.
- `sessions`: bearer tokens with expiration.
- `studentStates`: profile, skills, roadmap progress, chat history, portfolio, bookmarks, mentor sessions, and notes.
- `marketScans`: simulated job portal scan snapshots.

This keeps the demo easy to run for a classroom report while still matching the backend responsibilities in the topic requirements.
