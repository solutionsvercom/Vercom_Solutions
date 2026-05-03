import express from 'express';
import { requireAdmin } from '../middleware/adminAuth.js';
import {
  loginAdmin,
  listLeads,
  getLeadStats,
  updateLeadStatus,
  deleteLead,
} from '../controllers/adminLeadController.js';

const router = express.Router();

router.post('/verify', loginAdmin);
router.get('/leads', requireAdmin, listLeads);
router.get('/stats', requireAdmin, getLeadStats);
router.patch('/leads/:id/status', requireAdmin, updateLeadStatus);
router.delete('/leads/:id', requireAdmin, deleteLead);

export default router;
