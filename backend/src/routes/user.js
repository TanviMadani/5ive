const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth } = require('../middleware/auth');
const User = require('../models/User');

// Get user profile (both /profile and / for compatibility)
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user profile at root for /api/profile compatibility
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('jobRole').optional().trim(),
  body('interests').optional().isArray().withMessage('Interests must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, jobRole, interests } = req.body;
    const updateFields = {};
    
    if (name) updateFields.name = name;
    if (jobRole) updateFields.jobRole = jobRole;
    if (interests) updateFields.interests = interests;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true }
    ).select('-passwordHash');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile at root for /api/profile compatibility
router.put('/', auth, [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('jobRole').optional().trim(),
  body('interests').optional().isArray().withMessage('Interests must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, jobRole, interests } = req.body;
    const updateFields = {};
    
    if (name) updateFields.name = name;
    if (jobRole) updateFields.jobRole = jobRole;
    if (interests) updateFields.interests = interests;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true }
    ).select('-passwordHash');

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update streak
router.put('/streak', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { streak: 1 } },
      { new: true }
    ).select('-passwordHash');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update points
router.put('/points', auth, [
  body('points').isInt({ min: 0 }).withMessage('Points must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { points: req.body.points } },
      { new: true }
    ).select('-passwordHash');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 