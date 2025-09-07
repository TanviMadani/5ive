const Redis = require('ioredis');

// Create Redis client
const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

// Handle Redis connection events
redis.on('connect', () => {
    console.log('✅ Connected to Redis');
});

redis.on('error', (err) => {
    console.error('❌ Redis connection error:', err.message);
    console.error('Make sure Redis is running on localhost:6379');
});

// Session management
const SESSION_PREFIX = 'session:';
const SESSION_EXPIRY = 24 * 60 * 60; // 24 hours in seconds

const sessionManager = {
    async setSession(userId, sessionData) {
        const key = `${SESSION_PREFIX}${userId}`;
        await redis.set(key, JSON.stringify(sessionData), 'EX', SESSION_EXPIRY);
    },

    async getSession(userId) {
        const key = `${SESSION_PREFIX}${userId}`;
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    },

    async deleteSession(userId) {
        const key = `${SESSION_PREFIX}${userId}`;
        await redis.del(key);
    }
};

// Streak tracking
const STREAK_PREFIX = 'streak:';
const STREAK_EXPIRY = 30 * 24 * 60 * 60; // 30 days in seconds

const streakManager = {
    async updateStreak(userId, date = new Date()) {
        const key = `${STREAK_PREFIX}${userId}`;
        const today = date.toISOString().split('T')[0];

        const lastActivity = await redis.get(key);
        if (lastActivity) {
            const lastDate = new Date(lastActivity);
            const daysDiff = Math.floor((date - lastDate) / (1000 * 60 * 60 * 24));

            if (daysDiff === 1) {
                // Consecutive day
                await redis.set(key, today, 'EX', STREAK_EXPIRY);
                return true;
            } else if (daysDiff > 1) {
                // Streak broken
                await redis.set(key, today, 'EX', STREAK_EXPIRY);
                return false;
            }
            return true; // Same day
        }

        // First activity
        await redis.set(key, today, 'EX', STREAK_EXPIRY);
        return true;
    },

    async getStreak(userId) {
        const key = `${STREAK_PREFIX}${userId}`;
        return await redis.get(key);
    }
};

// Leaderboard
const LEADERBOARD_KEY = 'leaderboard';

const leaderboardManager = {
    async updateScore(userId, points) {
        await redis.zincrby(LEADERBOARD_KEY, points, userId);
    },

    async getTopUsers(limit = 10) {
        return await redis.zrevrange(LEADERBOARD_KEY, 0, limit - 1, 'WITHSCORES');
    },

    async getUserRank(userId) {
        const rank = await redis.zrevrank(LEADERBOARD_KEY, userId);
        const score = await redis.zscore(LEADERBOARD_KEY, userId);
        return { rank: rank !== null ? rank + 1 : null, score: score || 0 };
    }
};

module.exports = {
    redis,
    sessionManager,
    streakManager,
    leaderboardManager
}; 