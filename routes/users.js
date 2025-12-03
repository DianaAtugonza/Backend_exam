import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  getUserProjects,
  assignSupervisor
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, authorize('admin', 'faculty'), getUsers);
router.get('/:id', protect, getUser);
router.put('/:id', protect, updateUser);
router.get('/:id/projects', protect, getUserProjects);
router.post('/supervisor/:projectId', protect, authorize('admin', 'faculty'), assignSupervisor);

export default router;
