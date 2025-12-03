import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Technology', 'Healthcare', 'Education', 'Agriculture', 'Business', 'Other']
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'approved', 'rejected', 'in-progress', 'completed'],
    default: 'draft'
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['student', 'supervisor', 'faculty'],
      default: 'student'
    }
  },
  supervisor: {
    name: String,
    email: String
  },
  technologies: [String],
  tags: [String],
  githubLink: {
    type: String,
    match: [
      /^https?:\/\/(www\.)?github\.com\/.*/,
      'Please provide a valid GitHub URL'
    ]
  },
  liveDemo: {
    type: String,
    match: [
      /^https?:\/\/.*/,
      'Please provide a valid URL'
    ]
  },
  document: {
    filename: String,
    originalname: String,
    path: String,
    size: Number
  },
  teamMembers: [{
    name: String,
    email: String,
    role: String
  }],
  faculty: String,
  department: String,
  year: Number,
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
