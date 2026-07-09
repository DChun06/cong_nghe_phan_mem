# Public Deployment Guide

This project is a full-stack Node.js demo:

- Frontend: `login.html`, `index.html`, `styles.css`, `app.js`, `login.js`
- Backend: `server.js`
- Local demo database: `data/db.json`

Do not deploy with GitHub Pages if you need the backend. GitHub Pages can host static files, but it cannot run `server.js`.

## Recommended Option: Render

1. Push this project to a GitHub repository.
2. Open Render and choose **New > Web Service**.
3. Connect the GitHub repository.
4. Use these settings:

```text
Runtime: Node
Build Command: npm install
Start Command: npm start
Health Check Path: /api/health
```

5. Deploy the service.
6. Open the generated Render URL and add `/login.html`.

Example:

```text
https://your-service-name.onrender.com/login.html
```

## Alternative Option: Railway

1. Push this project to GitHub.
2. Open Railway and create a new project from the GitHub repository.
3. Railway should detect `package.json`.
4. If Railway asks for a start command, use:

```text
npm start
```

5. In the service settings, generate a public domain.
6. Open the generated URL with `/login.html`.

Example:

```text
https://your-service-name.up.railway.app/login.html
```

## Data Persistence Note

The current backend stores demo data in a local JSON file. This is enough for a course demo, because the server automatically seeds a demo account and can create new users.

For a real long-term public product, replace `data/db.json` with a managed database such as PostgreSQL. On cloud free tiers, local file storage can reset after redeploys or restarts unless you configure persistent storage.

## Environment Variables

The server already reads the cloud platform port:

```text
PORT
```

Optional variables:

```text
HOST=0.0.0.0
DATA_DIR=/path/to/persistent/data
DB_FILE=/path/to/persistent/data/db.json
```

Local development does not need these variables.
