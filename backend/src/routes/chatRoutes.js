import express from 'express';
import { createChatReply } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', createChatReply);

export default router;
