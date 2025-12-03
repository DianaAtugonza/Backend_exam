import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import projectRoutes from './routes/projects.js';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import reviewRoutes from './routes/reviews.js';
import userRoutes from './routes/users.js';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'UCU Innovators Hub API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      projects: '/api/projects',
      reviews: '/api/reviews',
      upload: '/api/upload',
      users: '/api/users',
      health: '/api/health'
    }
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
