# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## Environment

Define `VITE_CODESPACE_NAME` when running in Codespaces so the frontend calls the public backend URL:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

For example, put the value in `.env.local`. When `VITE_CODESPACE_NAME` is unset, the app falls back to `http://localhost:8000/api` for local development and avoids `https://undefined-8000.app.github.dev` URLs.

## Scripts

```bash
npm --prefix octofit-tracker/frontend run dev
npm --prefix octofit-tracker/frontend run build
```
