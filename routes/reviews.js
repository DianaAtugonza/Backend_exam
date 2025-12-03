import express from 'express';
import {
  addReview,
  getProjectReviews,
  approveProject,
  rejectProject,
  publishProject
} from '../controllers/reviewController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/:projectId')
  .get(getProjectReviews)
  .post(protect, authorize('supervisor', 'faculty', 'admin'), addReview);

router.post('/:projectId/approve', protect, authorize('supervisor', 'faculty', 'admin'), approveProject);
router.post('/:projectId/reject', protect, authorize('supervisor', 'faculty', 'admin'), rejectProject);
router.post('/:projectId/publish', protect, authorize('faculty', 'admin'), publishProject);

export default router;
