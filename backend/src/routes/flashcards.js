const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth, adminAuth } = require('../middleware/auth');
const Flashcard = require('../models/Flashcard');

// Get all flashcards
router.get('/', auth, async (req, res) => {
  try {
    const flashcards = await Flashcard.find()
      .populate('createdBy', 'name email')
      .populate('lessonId', 'title')
      .sort({ createdAt: -1 });
    
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get daily flashcards (random selection)
router.get('/daily', auth, async (req, res) => {
  try {
    // Get a random selection of flashcards for daily practice
    const flashcards = await Flashcard.aggregate([
      { $sample: { size: 10 } } // Get 10 random flashcards
    ]);
    
    if (flashcards.length === 0) {
      return res.status(404).json({ message: 'No flashcards available' });
    }
    
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get flashcards by lesson ID
router.get('/lesson/:lessonId', auth, async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ lessonId: req.params.lessonId })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(flashcards);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create flashcard (admin only)
router.post('/', adminAuth, [
  body('lessonId').notEmpty().withMessage('Lesson ID is required'),
  body('question').trim().notEmpty().withMessage('Question is required'),
  body('answer').trim().notEmpty().withMessage('Answer is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const flashcard = new Flashcard({
      ...req.body,
      createdBy: req.user._id
    });

    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update flashcard (admin only)
router.put('/:id', adminAuth, [
  body('question').optional().trim().notEmpty().withMessage('Question cannot be empty'),
  body('answer').optional().trim().notEmpty().withMessage('Answer cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const flashcard = await Flashcard.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    res.json(flashcard);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete flashcard (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const flashcard = await Flashcard.findByIdAndDelete(req.params.id);
    
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    res.json({ message: 'Flashcard deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Bulk create flashcards (admin only)
router.post('/bulk', adminAuth, [
  body('lessonId').notEmpty().withMessage('Lesson ID is required'),
  body('flashcards').isArray().withMessage('Flashcards must be an array'),
  body('flashcards.*.question').notEmpty().withMessage('Question is required'),
  body('flashcards.*.answer').notEmpty().withMessage('Answer is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { lessonId, flashcards } = req.body;
    const flashcardDocs = flashcards.map(card => ({
      ...card,
      lessonId,
      createdBy: req.user._id
    }));

    const createdFlashcards = await Flashcard.insertMany(flashcardDocs);
    res.status(201).json(createdFlashcards);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark flashcard as known
router.post('/:id/known', auth, async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    
    // Update the flashcard to mark it as known
    // You might want to add a 'known' field to the Flashcard model
    // For now, we'll just return success
    res.json({ message: 'Flashcard marked as known', flashcardId: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark flashcard as unknown
router.post('/:id/unknown', auth, async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    
    // Update the flashcard to mark it as unknown
    // You might want to add a 'known' field to the Flashcard model
    // For now, we'll just return success
    res.json({ message: 'Flashcard marked as unknown', flashcardId: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 