const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { adminAuth } = require('../middleware/auth');
const AdminContent = require('../models/AdminContent');
const User = require('../models/User');

// Get all admin content
router.get('/content', adminAuth, async (req, res) => {
  try {
    const content = await AdminContent.find()
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload admin content
router.post('/content', adminAuth, [
  body('file').notEmpty().withMessage('File is required'),
  body('tags').isArray().withMessage('Tags must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const content = new AdminContent({
      ...req.body,
      uploadedBy: req.user._id
    });

    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete admin content
router.delete('/content/:id', adminAuth, async (req, res) => {
  try {
    const content = await AdminContent.findByIdAndDelete(req.params.id);
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user role (admin only)
router.put('/users/:id/role', adminAuth, [
  body('role').isIn(['user', 'admin']).withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { role: req.body.role } },
      { new: true }
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get system stats (admin only)
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const [userCount, lessonCount, quizCount, flashcardCount] = await Promise.all([
      User.countDocuments(),
      Lesson.countDocuments(),
      Quiz.countDocuments(),
      Flashcard.countDocuments()
    ]);

    res.json({
      userCount,
      lessonCount,
      quizCount,
      flashcardCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 