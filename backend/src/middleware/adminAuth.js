import { getConfiguredAdminSecret, normalizeAdminKey } from '../utils/adminSecret.js';

function readAdminKey(req) {
  const raw = req.headers['x-admin-key'];
  const fromHeader = Array.isArray(raw) ? raw[0] : raw;
  const fromHeaderNorm = normalizeAdminKey(fromHeader);
  if (fromHeaderNorm) return fromHeaderNorm;

  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const fromBody = body.adminKey ?? body.secret;
  return normalizeAdminKey(fromBody);
}

export function requireAdmin(req, res, next) {
  const secret = getConfiguredAdminSecret();
  const key = readAdminKey(req);

  if (!secret) {
    return res.status(503).json({
      success: false,
      message: 'Admin access is not configured (missing ADMIN_SECRET).',
    });
  }

  if (!key || key !== secret) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  next();
}
