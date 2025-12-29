import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs'; // Added for directory checking
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import workerRoutes from './routes/worker.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Ensure 'uploads' directory exists to prevent Multer ENOENT errors
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("📁 Created 'uploads' directory for ID storage");
}

// Middleware
app.use(cors());
app.use(express.json());

// Serving uploaded ID images
app.use('/uploads', express.static(uploadDir));

// Connect Database
connectDB();

// 2. Register Routes
app.use('/api/auth', authRoutes);
app.use('/api/workers', workerRoutes);

// Health Check
app.get('/', (req, res) => res.send('RozgaarSetu API Running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Hyperlocal Search active at /api/workers/nearby`);
});