import express from 'express';
import { 
  createWorkerProfile, 
  getNearbyWorkers,
  getWorkerProfile
} from '../controllers/worker.controller.js';
import upload from '../middleware/upload.middleware.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', authMiddleware, upload.single('idCard'), createWorkerProfile);
router.get('/nearby', getNearbyWorkers);

// 🔥 ADD THIS
router.get('/:uid', authMiddleware, getWorkerProfile);

export default router;
