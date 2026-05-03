
# Vercom Solutions MERN Stack

This project is converted from a Figma AI-generated frontend into a full MERN stack application.

## Project Structure

- `frontend`: React + Vite app (uses your existing UI components)
- `backend`: Express + Node.js API with MongoDB (Mongoose)
- `src`: Existing shared frontend source from the original export

## Setup

1. Install dependencies from root:
   - `npm install`
2. Create backend environment file:
   - Copy `backend/.env.example` to `backend/.env`
   - Update `MONGODB_URI` for your MongoDB instance
3. Run frontend + backend together:
   - `npm run dev`

## API Endpoints

- `GET /api/health` - health check
- `POST /api/contact` - save contact form submissions in MongoDB
- `POST /api/chat` - chatbot response endpoint (saves chat + reply)

## Production build (WHM / VPS)

1. On the server, clone or upload the repo (layout can match `Vercom_Solutions` with `backend/` + `frontend/` + shared `src/` as in this monorepo).
2. Install dependencies: `npm install` (from the **repository root**).
3. Build the SPA: `npm run build` — output is **`frontend/dist/`** (ignored by git; do not commit `node_modules` or `.env`).
4. Configure **`backend/.env`** (copy from `backend/.env.example`):
   - `MONGODB_URI`, `ADMIN_SECRET`
   - `NODE_ENV=production`
   - `CLIENT_URL=https://your-domain.com` (your live site; comma-separate multiple origins if needed)
5. Start the API + static site: `npm start` (runs `node backend/src/server.js`). With `NODE_ENV=production`, Express serves **`frontend/dist`** and all **`/api/*`** routes on the same port, so the React app can call `/api/...` without CORS issues.
6. Point your reverse proxy (Apache/Nginx in WHM) at that Node process port (e.g. `5000`), or use **Application Manager / Passenger** with `npm start` and set env vars in the panel.
7. Optional: if your built files live elsewhere, set **`STATIC_DIR`** in `backend/.env` to the absolute path of the folder that contains `index.html`.

### WHM → Application Manager (Node.js) — Vercom example

Use these so **one** Node app serves the **React site** (`/`) and **API** (`/api/...`) on the same domain.

| Field | Recommended value |
|--------|-------------------|
| **Application name** | Vercom Solutions |
| **Deployment domain** | `vercomsolutions.in` (or `www.vercomsolutions.in` if that is your primary host) |
| **Base application URL** | **`https://vercomsolutions.in` only** — do **not** set the base path to `/api`. This app already exposes APIs under `/api/...`. If the manager only shows “domain + path” and you put `/api` as the path, the browser may request `/api/api/...` and break forms and admin. |
| **Application path** | Path to the folder that contains **`backend/package.json`**, relative to the account home directory. Examples: `Vercom_Solutions/backend` or `backend` if the app lives directly under home. |
| **Deployment environment** | **Production** |
| **Startup** | Use **NPM** with script **`start`**, or set the application startup file to **`src/server.js`** (same as `npm start`). Run **`npm install`** in that `backend` folder (and build the frontend from the repo root so `frontend/dist` exists next to `backend`). |

In **`backend/.env`** on the server set **`NODE_ENV=production`**, **`CLIENT_URL=https://vercomsolutions.in`** (match your live URL, including `https://`), **`MONGODB_URI`**, and **`ADMIN_SECRET`**.

The server detects **Phusion Passenger** and calls **`app.listen('passenger')`** automatically; locally it still uses **`PORT`** / **`HOST`** as before.

## GitHub (replace an old repo with this project)

`backend/.env`, `node_modules`, and `frontend/dist` are **not** committed (see `.gitignore`). Secrets stay on your machine and server only.

1. On GitHub, open your existing Vercom repository and copy its URL (HTTPS or SSH), e.g. `https://github.com/YOUR_USER/vercom-solutions.git`.

2. In this folder on your PC:

   ```bash
   git remote add origin https://github.com/YOUR_USER/vercom-solutions.git
   ```

   If `origin` already exists from an old setup: `git remote remove origin` then add again.

3. Push this codebase as **`main`** (already the default branch here):

   ```bash
   git push -u origin main
   ```

   If the GitHub repo already has commits (e.g. old site) and Git rejects the push, either merge the histories or **overwrite** the remote (destructive — backs up nothing on GitHub):

   ```bash
   git push -u origin main --force
   ```

   Use `--force` only if you intend to replace all remote history with this project.
  