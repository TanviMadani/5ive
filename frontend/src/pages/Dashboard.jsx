import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Trophy, 
  BookOpen, 
  CheckCircle, 
  TrendingUp, 
  Target,
  Zap,
  Star,
  Award,
  Users,
  Calendar,
  BarChart3,
  Plus,
  ArrowUpRight,
  Clock,
  Bookmark,
  CreditCard
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { progress } from '../services/api';

// Enhanced Welcome Header Component
const WelcomeHeader = () => {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
      
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-700 mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins">
                {greeting}, Tan 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-inter">
                Here's your learning overview for today
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{currentTime}</span>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium font-inter transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 group">
            <Plus className="w-4 h-4" />
            <span>Start Learning</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Streak Counter Component
const StreakCounter = ({ streak }) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-2xl p-6 shadow-xl border border-orange-200 dark:border-orange-700 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h3 className="text-white text-lg font-semibold mb-2 font-poppins">Current Streak</h3>
          <p className="text-white text-5xl font-bold font-poppins">{streak} days</p>
          <p className="text-orange-100 text-sm font-inter">Keep the fire burning! 🔥</p>
        </div>
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          <Flame className="text-white text-6xl drop-shadow-lg" />
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Enhanced Progress Summary Component
const ProgressSummary = ({ stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold font-poppins">Overall Progress</h3>
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:shadow-md transition-shadow duration-200"
        >
          <BookOpen className="text-blue-600 dark:text-blue-400 text-3xl mx-auto mb-3" />
          <p className="text-gray-700 dark:text-gray-300 font-inter text-sm">Lessons</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400 font-poppins">{stats.lessonsCompleted}</p>
        </motion.div>
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700 hover:shadow-md transition-shadow duration-200"
        >
          <CheckCircle className="text-emerald-600 dark:text-emerald-400 text-3xl mx-auto mb-3" />
          <p className="text-gray-700 dark:text-gray-300 font-inter text-sm">Quizzes</p>
          <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400 font-poppins">{stats.quizzesCompleted}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Enhanced Lesson Completion Chart Component
const LessonChart = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold font-poppins">Lesson Completion</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span>This Week</span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Bar 
              dataKey="completed" 
              fill="url(#blueGradient)" 
              name="Completed Lessons"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

// Enhanced Quiz Performance Chart Component
const QuizPerformanceChart = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold font-poppins">Quiz Performance</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>Last 7 Days</span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" />
            <YAxis domain={[0, 100]} stroke="#6B7280" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="score"
              stroke="url(#greenGradient)"
              name="Score (%)"
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
            />
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

// Enhanced Leaderboard Component
const Leaderboard = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold font-poppins">Top Performers</h3>
        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {data.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5, scale: 1.02 }}
            className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
              index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700' :
              index === 1 ? 'bg-gradient-to-r from-gray-50 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/20 border border-gray-200 dark:border-gray-700' :
              index === 2 ? 'bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700' :
              'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                index === 0 ? 'bg-yellow-500 text-white' :
                index === 1 ? 'bg-gray-500 text-white' :
                index === 2 ? 'bg-orange-500 text-white' :
                'bg-blue-500 text-white'
              }`}>
                {index + 1}
              </div>
              <span className="font-medium text-gray-800 dark:text-white font-inter">{user.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-400 flex items-center">
                <Flame className="inline mr-1 text-orange-500 w-4 h-4" />
                <span className="font-inter">{user.streak}</span>
              </span>
              <span className="text-gray-600 dark:text-gray-400 flex items-center">
                <Trophy className="inline mr-1 text-yellow-500 w-4 h-4" />
                <span className="font-inter">{user.points}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Enhanced Quick Actions Component
const QuickActions = () => {
  const actions = [
    { icon: <BookOpen className="w-6 h-6" />, label: 'Start Lesson', color: 'from-blue-500 to-indigo-600', path: '/dashboard/lessons' },
    { icon: <CheckCircle className="w-6 h-6" />, label: 'Take Quiz', color: 'from-emerald-500 to-green-600', path: '/dashboard/quizzes' },
    { icon: <Target className="w-6 h-6" />, label: 'Review Cards', color: 'from-purple-500 to-purple-600', path: '/dashboard/flashcards' },
    { icon: <TrendingUp className="w-6 h-6" />, label: 'View Progress', color: 'from-orange-500 to-red-600', path: '/dashboard/progress' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold font-poppins">Quick Actions</h3>
        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-xl bg-gradient-to-r ${action.color} text-white font-medium font-inter shadow-lg hover:shadow-xl transition-all duration-200 group`}
          >
            <div className="flex flex-col items-center space-y-2">
              {action.icon}
              <span>{action.label}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

// New Recent Activity Component
const RecentActivity = () => {
  const activities = [
    { id: 1, type: 'lesson', title: 'Completed JavaScript Basics', time: '2 hours ago', icon: BookOpen, color: 'text-blue-500' },
    { id: 2, type: 'quiz', title: 'Scored 85% on React Quiz', time: '4 hours ago', icon: CheckCircle, color: 'text-green-500' },
    { id: 3, type: 'flashcard', title: 'Reviewed 20 flashcards', time: '6 hours ago', icon: CreditCard, color: 'text-purple-500' },
    { id: 4, type: 'achievement', title: 'Unlocked "Quick Learner" badge', time: '1 day ago', icon: Award, color: 'text-yellow-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-800 dark:text-white text-lg font-semibold font-poppins">Recent Activity</h3>
        <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const IconComponent = activity.icon;
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
            >
              <div className={`w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center ${activity.color}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    streak: 0,
    lessonHistory: [],
    quizHistory: [],
    leaderboard: [],
    stats: {
      lessonsCompleted: 0,
      quizzesCompleted: 0,
    },
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          streakRes,
          lessonHistoryRes,
          quizHistoryRes,
          leaderboardRes,
          statsRes,
        ] = await Promise.all([
          progress.getStreak(),
          progress.getLessonHistory(),
          progress.getQuizHistory(),
          progress.getLeaderboard(),
          progress.getStats(),
        ]);

        setDashboardData({
          streak: streakRes.data.streak,
          lessonHistory: lessonHistoryRes.data,
          quizHistory: quizHistoryRes.data,
          leaderboard: leaderboardRes.data,
          stats: statsRes.data,
        });
      } catch (err) {
        setError(err.message || 'Failed to fetch dashboard data');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <p className="text-red-600 dark:text-red-400 text-xl mb-4 font-poppins">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 font-medium font-inter transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <WelcomeHeader />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Streak Counter */}
        <StreakCounter streak={dashboardData.streak} />
        
        {/* Progress Summary */}
        <ProgressSummary stats={dashboardData.stats} />
        
        {/* Quick Actions */}
        <QuickActions />
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lesson Chart */}
        <LessonChart data={dashboardData.lessonHistory} />
        
        {/* Quiz Performance Chart */}
        <QuizPerformanceChart data={dashboardData.quizHistory} />
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leaderboard */}
        <div className="lg:col-span-2">
          <Leaderboard data={dashboardData.leaderboard} />
        </div>
        
        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard; 