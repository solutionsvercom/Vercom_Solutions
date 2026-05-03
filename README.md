
# Vercom Solutions MERN Stack

This project is converted from a Figma AI-generated frontend into a full MERN stack application.

## Project Structure

- `frontend`: React + Vite app (uses your existing UI components)
- `backend`: Express + Node.js API with MongoDB (Mongoose); **production static files** are built into **`backend/public`**
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

## Production build (single Node app)

The Vite build outputs the SPA into **`backend/public`**. Express serves **`/api/*`** and **`/`** (and client routes like `/admin`) from the same process, so the browser uses same-origin **`/api/...`** with no extra CORS setup.

1. On the server, clone or upload the full repo (`backend/`, `frontend/`, `src/`, root `package.json`).
2. From the **repository root**: `npm install` then **`npm run build`** (creates/updates `backend/public/`).
3. Configure **`backend/.env`**:
   - `MONGODB_URI`, `ADMIN_SECRET`, `JWT_SECRET`
   - **`NODE_ENV=production`** (recommended) **or** **`SERVE_FRONTEND=1`** if your host does not set `NODE_ENV`
   - **`CLIENT_URL=https://your-domain.com`** (no trailing slash; comma-separate `www` if needed)
   - **`PORT`**: use the port your host assigns (Hostinger sets this automatically; do not hardcode in production unless required)
4. Start the app from **`backend`**: `npm start` (runs `node src/server.js`), **or** from repo root: `npm start` (same).

Optional: if the built files are not at `backend/public`, set **`STATIC_DIR`** to the absolute folder that contains `index.html`.

## Hostinger (Node.js web app)

Typical setup: **one** Node application serves both the React site and the API.

| Step | What to do |
|------|------------|
| **Files** | Deploy the full monorepo (or Git deploy) so `frontend/`, `backend/`, `src/`, and root `package.json` exist. |
| **Build** | In hPanel, use a **build** step from the **repository root**, e.g. `npm ci && npm run build`, so `backend/public/index.html` exists before start. Alternatively SSH: `cd` to repo root, `npm install`, `npm run build`. |
| **App root** | Set the application directory to **`backend`** (folder that contains `backend/package.json`). |
| **Start command** | **`npm start`** or startup file **`src/server.js`**. |
| **Environment variables** | Add `MONGODB_URI`, `ADMIN_SECRET`, `JWT_SECRET`, `CLIENT_URL` (your live `https://` URL), **`NODE_ENV=production`**. If the panel does not support `NODE_ENV`, set **`SERVE_FRONTEND=1`** so the SPA is served and CORS matches production. |
| **Do not** | Mount the app under a path like `/api` only — the site expects `/` for pages and `/api/...` for JSON. |

If Hostinger only runs install/start inside **`backend`** and has no “parent” build: run **`npm run build`** inside **`backend`** once (that script runs `npm --prefix .. run build` and fills **`backend/public`**), or run the root build via SSH.

### WHM / Phusion Passenger (same layout)

The app still uses **`backend/public`** for static files. Set **`Application path`** to the folder with **`backend/package.json`**. Run **`npm run build`** from the **repo root** on deploy. In **`backend/.env`**: **`NODE_ENV=production`**, **`CLIENT_URL`**, secrets. Passenger is detected automatically for `app.listen('passenger')`.

## GitHub (replace an old repo with this project)

`backend/.env`, `node_modules`, and **`backend/public`** are **not** committed (see `.gitignore`). Run **`npm run build`** on the server after each deploy that changes the frontend.

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
