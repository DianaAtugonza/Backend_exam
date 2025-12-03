import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  likeProject,
  submitProject
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, authorize('student'), createProject);

router.route('/:id')
  .get(getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

router.route('/:id/like')
  .put(likeProject);

router.route('/:id/submit')
  .post(protect, authorize('student'), submitProject);

export default router;
