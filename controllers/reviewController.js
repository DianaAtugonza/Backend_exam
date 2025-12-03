import Review from '../models/Review.js';
import Project from '../models/Project.js';

// @desc    Add review to project
// @route   POST /api/reviews/:projectId
// @access  Private (Supervisor/Admin)
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { projectId } = req.params;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    const review = await Review.create({
      project: projectId,
      reviewer: req.user._id,
      rating,
      comment
    });

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get reviews for a project
// @route   GET /api/reviews/:projectId
// @access  Public
export const getProjectReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ project: req.params.projectId })
      .populate('reviewer', 'name email role');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Approve project
// @route   POST /api/reviews/:projectId/approve
// @access  Private (Supervisor/Admin)
export const approveProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    project.status = 'approved';
    await project.save();

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Reject project
// @route   POST /api/reviews/:projectId/reject
// @access  Private (Supervisor/Admin)
export const rejectProject = async (req, res) => {
  try {
    const { reason } = req.body;
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    project.status = 'rejected';
    
    // Add review with rejection reason
    await Review.create({
      project: req.params.projectId,
      reviewer: req.user._id,
      rating: 1,
      comment: reason || 'Project rejected',
      status: 'rejected'
    });

    await project.save();

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Publish project (Admin only)
// @route   POST /api/reviews/:projectId/publish
// @access  Private (Admin)
export const publishProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    if (project.status !== 'approved') {
      return res.status(400).json({
        success: false,
        error: 'Only approved projects can be published'
      });
    }

    project.status = 'completed';
    await project.save();

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
