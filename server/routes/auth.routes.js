import express from 'express';
import { syncUser } from '../controllers/auth.controller.js';

const router = express.Router();

// @route POST /api/auth/sync
router.post('/sync', syncUser);

export default router;