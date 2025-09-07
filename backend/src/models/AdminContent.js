const mongoose = require('mongoose');

const adminContentSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better search performance
adminContentSchema.index({ tags: 'text' });

const AdminContent = mongoose.model('AdminContent', adminContentSchema);

module.exports = AdminContent; 