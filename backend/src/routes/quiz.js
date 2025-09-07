const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { auth, adminAuth } = require('../middleware/auth');
const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');

// Get all quizzes
router.get('/', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate('createdBy', 'name email')
      .populate('lessonId', 'title')
      .sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get daily quiz (random selection)
router.get('/daily', auth, async (req, res) => {
  try {
    const quizzes = await Quiz.aggregate([
      { $sample: { size: 1 } }
    ]);
    
    if (quizzes.length === 0) {
      return res.status(404).json({ message: 'No quizzes available' });
    }
    
    const quiz = quizzes[0];
    res.json(quiz);
  } catch (error) {
    console.error('Error fetching daily quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quiz by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('lessonId', 'title');
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Complete a quiz
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const { score, totalQuestions, answers } = req.body;
    
    // Here you would typically update progress and calculate results
    res.json({ 
      message: 'Quiz completed successfully',
      score,
      totalQuestions,
      passed: score >= (totalQuestions * 0.7) // 70% to pass
    });
  } catch (error) {
    console.error('Error completing quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get quiz by lesson ID
router.get('/lesson/:lessonId', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ lessonId: req.params.lessonId })
      .populate('createdBy', 'name email');
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create quiz (admin only)
router.post('/', adminAuth, [
  body('lessonId').notEmpty().withMessage('Lesson ID is required'),
  body('questions').isArray().withMessage('Questions must be an array'),
  body('questions.*.question').notEmpty().withMessage('Question text is required'),
  body('questions.*.options').isArray().withMessage('Options must be an array'),
  body('questions.*.answer').notEmpty().withMessage('Answer is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const quiz = new Quiz({
      ...req.body,
      createdBy: req.user._id
    });

    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit quiz answers
router.post('/:quizId/submit', auth, [
  body('answers').isArray().withMessage('Answers must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const { answers } = req.body;
    let score = 0;
    const feedback = [];

    quiz.questions.forEach((question, index) => {
      const isCorrect = question.answer === answers[index];
      if (isCorrect) score++;
      feedback.push({
        question: question.question,
        correct: isCorrect,
        correctAnswer: question.answer
      });
    });

    // Update progress
    const progress = await Progress.findOneAndUpdate(
      { userId: req.user._id, lessonId: quiz.lessonId },
      { 
        completed: true,
        score: (score / quiz.questions.length) * 100,
        date: new Date()
      },
      { upsert: true, new: true }
    );

    res.json({
      score,
      totalQuestions: quiz.questions.length,
      feedback,
      progress
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update quiz (admin only)
router.put('/:id', adminAuth, [
  body('questions').optional().isArray().withMessage('Questions must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete quiz (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 