import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Award,
  Activity,
  Target,
  Zap,
  Star
} from 'lucide-react';
import api from '../services/api';

const StatCard = ({ title, value, icon, color, gradient }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, y: -2 }}
    className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 ${gradient}`}
  >
    <div className="flex items-center">
      <div className={`p-4 rounded-2xl ${color} shadow-inner`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600 font-inter">{title}</p>
        <p className="text-3xl font-bold text-gray-900 font-poppins">{value}</p>
      </div>
    </div>
  </motion.div>
);

const AchievementCard = ({ achievement }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02, y: -2 }}
    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <div className={`p-4 rounded-2xl ${achievement.unlocked ? 'bg-gradient-to-br from-emerald-100 to-green-200' : 'bg-gray-100'} shadow-inner`}>
          {achievement.unlocked ? (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Trophy className="w-6 h-6 text-emerald-600" />
            </motion.div>
          ) : (
            <Award className="w-6 h-6 text-gray-400" />
          )}
        </div>
      </div>
      <div className="ml-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-900 font-poppins">{achievement.title}</h3>
        <p className="mt-1 text-sm text-gray-600 font-inter">{achievement.description}</p>
        {achievement.progress && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-500 font-inter">Progress</span>
              <span className="text-xs font-medium text-emerald-600 font-inter">{achievement.progress}%</span>
            </div>
            <div className="relative">
              <div className="overflow-hidden h-3 rounded-full bg-gray-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${achievement.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-inner"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  </motion.div>
);

const ActivityItem = ({ activity, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ x: 5 }}
    className="flex items-center py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 rounded-lg px-2 transition-colors duration-200"
  >
    <div className="flex-shrink-0">
      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 shadow-inner">
        {activity.icon}
      </div>
    </div>
    <div className="ml-4 flex-1">
      <p className="text-sm font-medium text-gray-900 font-inter">{activity.title}</p>
      <p className="text-sm text-gray-500 font-inter">{activity.timestamp}</p>
    </div>
    {activity.score && (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 + 0.3 }}
        className="ml-auto"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-800 border border-emerald-200">
          +{activity.score} points
        </span>
      </motion.div>
    )}
  </motion.div>
);

const ProgressChart = ({ data }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
  >
    <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">Learning Progress</h3>
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 font-inter">{item.label}</span>
          <div className="flex items-center space-x-3">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.percentage}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
              />
            </div>
            <span className="text-sm font-semibold text-gray-900 font-inter w-12 text-right">
              {item.percentage}%
            </span>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const Progress = () => {
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    quizzesTaken: 0,
    flashcardsReviewed: 0,
    totalPoints: 0,
  });
  const [achievements, setAchievements] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const [statsResponse, achievementsResponse, activityResponse] = await Promise.all([
          api.progress.getStats(),
          api.progress.getAchievements(),
          api.progress.getActivity(),
        ]);

        setStats(statsResponse.data);
        setAchievements(achievementsResponse.data);
        setRecentActivity(activityResponse.data);
      } catch (err) {
        setError('Failed to fetch progress data. Please try again later.');
        console.error('Error fetching progress:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  const progressData = [
    { label: 'Lessons', percentage: Math.min((stats.lessonsCompleted / 50) * 100, 100) },
    { label: 'Quizzes', percentage: Math.min((stats.quizzesTaken / 30) * 100, 100) },
    { label: 'Flashcards', percentage: Math.min((stats.flashcardsReviewed / 100) * 100, 100) },
    { label: 'Overall', percentage: Math.min(((stats.lessonsCompleted + stats.quizzesTaken + stats.flashcardsReviewed) / 180) * 100, 100) },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
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
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-50 border border-red-200 rounded-2xl p-6"
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <div className="p-2 rounded-full bg-red-100">
              <svg className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800 font-poppins">Error</h3>
            <p className="text-sm text-red-700 mt-1 font-inter">{error}</p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 font-poppins bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Your Learning Journey
        </h1>
        <p className="mt-3 text-lg text-gray-600 font-inter">
          Track your progress and celebrate your achievements
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Lessons Completed"
          value={stats.lessonsCompleted}
          icon={<BookOpen className="w-6 h-6 text-blue-600" />}
          color="bg-gradient-to-br from-blue-100 to-blue-200"
          gradient="hover:from-blue-50 hover:to-blue-100"
        />
        <StatCard
          title="Quizzes Taken"
          value={stats.quizzesTaken}
          icon={<CheckCircle className="w-6 h-6 text-emerald-600" />}
          color="bg-gradient-to-br from-emerald-100 to-green-200"
          gradient="hover:from-emerald-50 hover:to-green-100"
        />
        <StatCard
          title="Flashcards Reviewed"
          value={stats.flashcardsReviewed}
          icon={<Clock className="w-6 h-6 text-purple-600" />}
          color="bg-gradient-to-br from-purple-100 to-purple-200"
          gradient="hover:from-purple-50 hover:to-purple-100"
        />
        <StatCard
          title="Total Points"
          value={stats.totalPoints}
          icon={<Star className="w-6 h-6 text-yellow-600" />}
          color="bg-gradient-to-br from-yellow-100 to-orange-200"
          gradient="hover:from-yellow-50 hover:to-orange-100"
        />
      </div>

      {/* Progress Chart and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProgressChart data={progressData} />
        
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6 font-poppins">Recent Achievements</h2>
          <div className="space-y-4">
            {achievements.slice(0, 3).map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </div>

      {/* All Achievements */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 font-poppins">All Achievements</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6 font-poppins">Recent Activity</h2>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {recentActivity.map((activity, index) => (
            <ActivityItem key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress; 