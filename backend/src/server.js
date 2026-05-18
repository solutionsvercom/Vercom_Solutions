import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDatabase } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { legacyRedirects } from './middleware/legacyRedirects.js';
import { getConfiguredAdminSecret } from './utils/adminSecret.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/* override: true — so backend/.env wins over a stale ADMIN_SECRET from the OS/shell */
dotenv.config({ path: path.join(__dirname, '../.env'), override: true });

const app = express();
const port = Number(process.env.PORT) || 5000;
/** Bind to all interfaces (0.0.0.0) so the API is reachable when Atlas allows 0.0.0.0/0 and you access from LAN or a deployed host. */
const host = process.env.HOST?.trim() || '0.0.0.0';
const mongoUri = process.env.MONGODB_URI;

/** WHM / Passenger sits behind Apache; trust X-Forwarded-* for correct IPs and HTTPS. */
app.set('trust proxy', process.env.TRUST_PROXY !== '0');

/** True when Node is started by Phusion Passenger (WHM → Application Manager). */
function isPassenger() {
  return (
    typeof process.env.PASSENGER_INSTANCE_REGISTRY_DIR === 'string' ||
    typeof process.env.PASSENGER_APP_ENV === 'string' ||
    process.env.IN_PASSENGER === '1'
  );
}

const clientOrigin = process.env.CLIENT_URL?.trim() || 'http://localhost:5173';
const corsOrigins = new Set(
  clientOrigin.includes(',')
    ? clientOrigin.split(',').map((o) => o.trim()).filter(Boolean)
    : [clientOrigin]
);
/** Production-like deploy: allow only CLIENT_URL(s). Hostinger: set NODE_ENV=production or SERVE_FRONTEND=1. */
const lockDownCors =
  process.env.NODE_ENV === 'production' || isPassenger() || process.env.SERVE_FRONTEND === '1';
if (!lockDownCors) {
  if ([...corsOrigins].some((o) => o.includes('localhost'))) {
    corsOrigins.add('http://127.0.0.1:5173');
  }
  corsOrigins.add('http://localhost:5173');
  corsOrigins.add('http://127.0.0.1:5173');
}
app.use(
  cors({
    origin: [...corsOrigins],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-admin-key', 'Authorization'],
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Backend is running.' });
});

app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/admin', adminRoutes);

/** Production: serve Vite build from `backend/public` (same origin as /api). Override with STATIC_DIR. */
const distPath = path.resolve(
  process.env.STATIC_DIR?.trim() || path.join(__dirname, '../public'),
);
const distIndex = path.join(distPath, 'index.html');
/** Hostinger / WHM: set NODE_ENV=production or SERVE_FRONTEND=1. Passenger auto-serves when dist exists. SERVE_FRONTEND=0 disables. */
const serveFrontend =
  fs.existsSync(distIndex) &&
  process.env.SERVE_FRONTEND !== '0' &&
  (process.env.NODE_ENV === 'production' ||
    process.env.SERVE_FRONTEND === '1' ||
    isPassenger());

if (serveFrontend) {
  app.use(legacyRedirects);
  app.use(express.static(distPath, { index: false }));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    res.sendFile(distIndex, (err) => (err ? next(err) : undefined));
  });
} else if (process.env.NODE_ENV === 'production') {
  console.warn(
    `[static] No ${distIndex} — run "npm run build" from the repo root (outputs to backend/public), or set STATIC_DIR.`,
  );
}

if (!mongoUri) {
  console.error('MONGODB_URI is missing. Add it in backend/.env.');
  process.exit(1);
}

connectDatabase(mongoUri).then(() => {
  const adminLen = getConfiguredAdminSecret().length;
  const logReady = (where) => {
    console.log(`Server listening (${where})`);
    console.log(
      adminLen > 0
        ? `[admin] ADMIN_SECRET active (${adminLen} chars) — login must match backend/.env exactly.`
        : 'Admin: WARNING — ADMIN_SECRET missing in backend/.env.'
    );
  };

  if (isPassenger()) {
    app.listen('passenger', () => logReady('Phusion Passenger'));
  } else {
    app.listen(port, host, () => logReady(`http://${host}:${port}`));
  }
});
