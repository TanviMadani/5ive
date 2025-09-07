const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { leaderboardManager } = require('../config/redis');
const User = require('../models/User');

// Get top users
router.get('/top', auth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const topUsers = await leaderboardManager.getTopUsers(limit);
    
    // Format the response
    const formattedUsers = [];
    for (let i = 0; i < topUsers.length; i += 2) {
      const userId = topUsers[i];
      const score = parseInt(topUsers[i + 1]);
      
      const user = await User.findById(userId).select('name email');
      if (user) {
        formattedUsers.push({
          rank: Math.floor(i / 2) + 1,
          userId: user._id,
          name: user.name,
          email: user.email,
          score
        });
      }
    }
    
    res.json(formattedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's rank and score
router.get('/my-rank', auth, async (req, res) => {
  try {
    const { rank, score } = await leaderboardManager.getUserRank(req.user._id.toString());
    res.json({ rank, score });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's streak
router.get('/my-streak', auth, async (req, res) => {
  try {
    const streak = await streakManager.getStreak(req.user._id.toString());
    res.json({ streak });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 