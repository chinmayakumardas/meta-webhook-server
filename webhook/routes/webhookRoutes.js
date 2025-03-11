import express from 'express';
import { handleWebhook, verifyWebhook } from '../controllers/webhookController.js';

const router = express.Router();

// Route to verify webhook with Facebook
router.get('/webhook', verifyWebhook);

// Route to handle incoming webhook messages
router.post('/webhook', handleWebhook);

export default router;
