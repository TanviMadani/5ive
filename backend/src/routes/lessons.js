const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth, adminAuth } = require('../middleware/auth');
const Lesson = require('../models/Lesson');

// Get all lessons
router.get('/', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find()
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get daily lesson (random selection)
router.get('/daily', auth, async (req, res) => {
  try {
    const lessons = await Lesson.aggregate([
      { $sample: { size: 1 } }
    ]);
    
    if (lessons.length === 0) {
      return res.status(404).json({ message: 'No lessons available' });
    }
    
    const lesson = lessons[0];
    
    // Add mock data for frontend compatibility
    const dailyLesson = {
      id: lesson._id,
      title: lesson.title,
      description: lesson.content.substring(0, 200) + '...',
      duration: '15 min',
      progress: 0,
      keyPoints: [
        'Key concept 1 from the lesson',
        'Key concept 2 from the lesson',
        'Key concept 3 from the lesson'
      ],
      insights: 'AI-generated insights about this lesson topic',
      tags: lesson.tags || ['AI', 'Learning']
    };
    
    res.json(dailyLesson);
  } catch (error) {
    console.error('Error fetching daily lesson:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete a lesson
router.post('/complete', auth, async (req, res) => {
  try {
    const { lessonId } = req.body;
    
    if (!lessonId) {
      return res.status(400).json({ message: 'Lesson ID is required' });
    }
    
    // Here you would typically update progress, but for now just return success
    res.json({ message: 'Lesson completed successfully' });
  } catch (error) {
    console.error('Error completing lesson:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get lesson by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new lesson (admin only)
router.post('/', adminAuth, [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('tags').isArray().withMessage('Tags must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const lesson = new Lesson({
      ...req.body,
      createdBy: req.user._id
    });

    await lesson.save();
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update lesson (admin only)
router.put('/:id', adminAuth, [
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().trim().notEmpty().withMessage('Content cannot be empty'),
  body('tags').optional().isArray().withMessage('Tags must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const lesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete lesson (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Search lessons
router.get('/search/:query', auth, async (req, res) => {
  try {
    const lessons = await Lesson.find(
      { $text: { $search: req.params.query } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .populate('createdBy', 'name email');
    
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 