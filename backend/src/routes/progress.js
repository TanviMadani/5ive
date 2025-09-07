const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { leaderboardManager } = require('../config/redis');
const User = require('../models/User');
const Progress = require('../models/Progress');

// Get user progress stats
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('Fetching stats for user:', userId);
    
    // Get user's progress data
    const progress = await Progress.findOne({ userId });
    
    if (!progress) {
      // Create new progress record for new users
      const newProgress = new Progress({ userId });
      await newProgress.save();
      
      return res.json({
        totalLessons: 0,
        totalQuizzes: 0,
        totalPoints: 0,
        currentStreak: 0,
        longestStreak: 0,
        accuracy: 0,
        level: 1
      });
    }
    
    // Calculate stats
    const stats = {
      totalLessons: progress.completedLessons?.length || 0,
      totalQuizzes: progress.completedQuizzes?.length || 0,
      totalPoints: progress.totalPoints || 0,
      currentStreak: progress.currentStreak || 0,
      longestStreak: progress.longestStreak || 0,
      accuracy: progress.accuracy || 0,
      level: progress.level || 1
    };
    
    console.log('Stats calculated:', stats);
    res.json(stats);
  } catch (error) {
    console.error('Error fetching progress stats:', error);
    res.status(500).json({ 
      message: 'Failed to fetch progress stats',
      error: error.message 
    });
  }
});

// Get user streak information
router.get('/streak', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's streak data
    const progress = await Progress.findOne({ userId });
    
    if (!progress) {
      return res.json({
        currentStreak: 0,
        longestStreak: 0,
        lastActivity: null,
        streakHistory: []
      });
    }
    
    const streakData = {
      currentStreak: progress.currentStreak || 0,
      longestStreak: progress.longestStreak || 0,
      lastActivity: progress.lastActivity || null,
      streakHistory: progress.streakHistory || []
    };
    
    res.json(streakData);
  } catch (error) {
    console.error('Error fetching streak data:', error);
    res.status(500).json({ message: 'Failed to fetch streak data' });
  }
});

// Get lesson history
router.get('/lessons/history', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's lesson progress
    const progress = await Progress.findOne({ userId });
    
    if (!progress) {
      return res.json([]);
    }
    
    const lessonHistory = progress.completedLessons?.map(lesson => ({
      lessonId: lesson.lessonId,
      completedAt: lesson.completedAt,
      score: lesson.score || 0,
      timeSpent: lesson.timeSpent || 0
    })) || [];
    
    res.json(lessonHistory);
  } catch (error) {
    console.error('Error fetching lesson history:', error);
    res.status(500).json({ message: 'Failed to fetch lesson history' });
  }
});

// Get quiz history
router.get('/quizzes/history', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's quiz progress
    const progress = await Progress.findOne({ userId });
    
    if (!progress) {
      return res.json([]);
    }
    
    const quizHistory = progress.completedQuizzes?.map(quiz => ({
      quizId: quiz.quizId,
      completedAt: quiz.completedAt,
      score: quiz.score || 0,
      totalQuestions: quiz.totalQuestions || 0,
      correctAnswers: quiz.correctAnswers || 0
    })) || [];
    
    res.json(quizHistory);
  } catch (error) {
    console.error('Error fetching quiz history:', error);
    res.status(500).json({ message: 'Failed to fetch quiz history' });
  }
});

// Get leaderboard
router.get('/leaderboard', auth, async (req, res) => {
  try {
    // For now, return empty leaderboard to avoid Redis issues
    // TODO: Implement Redis leaderboard when Redis is properly configured
    res.json([]);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
});

// Get user's rank
router.get('/rank', auth, async (req, res) => {
  try {
    const userId = req.user._id.toString();
    
    // Get user's rank and score
    const rankData = await leaderboardManager.getUserRank(userId);
    
    res.json(rankData);
  } catch (error) {
    console.error('Error fetching user rank:', error);
    res.status(500).json({ message: 'Failed to fetch user rank' });
  }
});

// Get achievements
router.get('/achievements', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Mock achievements data for now
    const achievements = [
      {
        id: '1',
        title: 'First Steps',
        description: 'Complete your first lesson',
        icon: '🎯',
        unlocked: true,
        progress: 100
      },
      {
        id: '2',
        title: 'Quiz Master',
        description: 'Complete 5 quizzes',
        icon: '🧠',
        unlocked: false,
        progress: 60
      },
      {
        id: '3',
        title: 'Streak Champion',
        description: 'Maintain a 7-day streak',
        icon: '🔥',
        unlocked: false,
        progress: 30
      },
      {
        id: '4',
        title: 'Flashcard Pro',
        description: 'Review 50 flashcards',
        icon: '🃏',
        unlocked: false,
        progress: 0
      }
    ];
    
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ message: 'Failed to fetch achievements' });
  }
});

// Get recent activity
router.get('/activity', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Mock activity data for now
    const activity = [
      {
        id: '1',
        title: 'Completed Introduction to AI',
        timestamp: '2 hours ago',
        icon: '📚',
        score: 85
      },
      {
        id: '2',
        title: 'Took AI Fundamentals Quiz',
        timestamp: '1 day ago',
        icon: '🧠',
        score: 92
      },
      {
        id: '3',
        title: 'Reviewed 10 flashcards',
        timestamp: '2 days ago',
        icon: '🃏',
        score: 100
      },
      {
        id: '4',
        title: 'Started Machine Learning lesson',
        timestamp: '3 days ago',
        icon: '📖',
        score: null
      }
    ];
    
    res.json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ message: 'Failed to fetch activity' });
  }
});

module.exports = router;
