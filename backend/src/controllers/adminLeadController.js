import mongoose from 'mongoose';
import { Lead, SOURCES, STATUSES } from '../models/Lead.js';
import { getConfiguredAdminSecret, normalizeAdminKey } from '../utils/adminSecret.js';

/**
 * Login check: runs after express.json() so body.adminKey is always available.
 * Does not use requireAdmin middleware (avoids header-only edge cases).
 */
export async function loginAdmin(req, res) {
  const secret = getConfiguredAdminSecret();
  if (!secret) {
    return res.status(503).json({
      success: false,
      message: 'Admin access is not configured (missing ADMIN_SECRET in backend/.env).',
    });
  }

  const fromBody = normalizeAdminKey(req.body?.adminKey ?? req.body?.secret);
  const rawHeader = req.headers['x-admin-key'];
  const fromHeader = normalizeAdminKey(Array.isArray(rawHeader) ? rawHeader[0] : rawHeader);
  const key = fromBody || fromHeader;

  if (!key || key !== secret) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized — use the exact ADMIN_SECRET value from backend/.env (no spaces).',
      meta: {
        keyReceivedChars: key.length,
        secretConfiguredChars: secret.length,
        emptyPayload: !req.body || Object.keys(req.body).length === 0,
      },
    });
  }

  return res.json({ success: true, message: 'OK' });
}

export async function listLeads(req, res) {
  try {
    const {
      source,
      status,
      q,
      limit = '100',
      skip = '0',
    } = req.query;

    const filter = {};
    if (source && SOURCES.includes(source)) filter.source = source;
    if (status && STATUSES.includes(status)) filter.status = status;
    if (q && String(q).trim()) {
      const rx = new RegExp(String(q).trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [{ name: rx }, { email: rx }, { phone: rx }, { message: rx }, { subject: rx }];
    }

    const lim = Math.min(Number(limit) || 100, 500);
    const sk = Number(skip) || 0;

    const [items, total] = await Promise.all([
      Lead.find(filter).sort({ createdAt: -1 }).skip(sk).limit(lim).lean(),
      Lead.countDocuments(filter),
    ]);

    return res.json({ success: true, data: items, total, limit: lim, skip: sk });
  } catch (error) {
    console.error('listLeads', error);
    return res.status(500).json({ success: false, message: 'Could not load leads.' });
  }
}

export async function getLeadStats(req, res) {
  try {
    const bySource = await Lead.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const byStatus = await Lead.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const newToday = await Lead.countDocuments({ createdAt: { $gte: startOfDay } });
    const total = await Lead.countDocuments();

    return res.json({
      success: true,
      data: {
        total,
        newToday,
        bySource: Object.fromEntries(bySource.map((x) => [x._id, x.count])),
        byStatus: Object.fromEntries(byStatus.map((x) => [x._id, x.count])),
      },
    });
  } catch (error) {
    console.error('getLeadStats', error);
    return res.status(500).json({ success: false, message: 'Could not load stats.' });
  }
}

export async function updateLeadStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const doc = await Lead.findByIdAndUpdate(id, { status }, { new: true });
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    return res.json({ success: true, data: doc });
  } catch (error) {
    console.error('updateLeadStatus', error);
    return res.status(500).json({ success: false, message: 'Could not update lead.' });
  }
}

export async function deleteLead(req, res) {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid lead id.' });
    }

    const doc = await Lead.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }

    return res.json({ success: true, message: 'Lead deleted.', data: { _id: doc._id } });
  } catch (error) {
    console.error('deleteLead', error);
    return res.status(500).json({ success: false, message: 'Could not delete lead.' });
  }
}
