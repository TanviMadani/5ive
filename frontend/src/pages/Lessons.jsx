import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  Target, 
  Lightbulb, 
  Tag,
  Play,
  Award,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import api from '../services/api';

const LessonCard = ({ lesson, onComplete, index }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = async () => {
    try {
      await api.lessons.complete(lesson.id);
      setIsCompleted(true);
      onComplete(lesson.id);
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-200 shadow-inner">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-poppins">{lesson.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500 font-inter">{lesson.duration}</span>
              </div>
            </div>
          </div>
          {lesson.progress === 100 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="p-2 rounded-full bg-gradient-to-br from-emerald-100 to-green-200"
            >
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </motion.div>
          )}
        </div>
        
        <p className="text-gray-600 mb-4 font-inter leading-relaxed">{lesson.description}</p>
        
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 font-inter">Progress</span>
            <span className="text-sm font-semibold text-blue-600 font-inter">{lesson.progress}%</span>
          </div>
          <div className="relative">
            <div className="overflow-hidden h-3 rounded-full bg-gray-200">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${lesson.progress}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-inner"
              />
            </div>
          </div>
        </div>
        
        <motion.button
          onClick={handleComplete}
          disabled={isCompleted}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full px-6 py-3 rounded-xl font-medium font-inter transition-all duration-300 ${
            isCompleted
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white cursor-not-allowed shadow-lg'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isCompleted ? (
            <div className="flex items-center justify-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Completed</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Start Lesson</span>
            </div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

const DailyLesson = ({ lesson, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl shadow-xl p-8 border border-blue-200 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-200 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-20"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-200 text-blue-800 border border-blue-300 mb-4"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Today's AI-Curated Lesson
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3 font-poppins">{lesson.title}</h2>
            <div className="flex items-center space-x-4 text-gray-600 font-inter">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{lesson.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>AI Optimized</span>
              </div>
            </div>
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <p className="text-gray-700 text-lg leading-relaxed font-inter">{lesson.description}</p>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3 font-poppins flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
              Key Takeaways
            </h3>
            <ul className="space-y-2">
              {lesson.keyPoints.map((point, index) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 text-gray-700 font-inter"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{point}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {lesson.insights && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-white rounded-xl border border-blue-200 shadow-inner"
            >
              <h4 className="text-sm font-semibold text-blue-600 mb-2 font-poppins flex items-center">
                <Award className="w-4 h-4 mr-2" />
                AI Insight
              </h4>
              <p className="text-gray-700 font-inter">{lesson.insights}</p>
            </motion.div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {lesson.tags.map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-200 text-blue-800 border border-blue-300 font-inter"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </motion.span>
            ))}
          </div>
          <motion.button
            onClick={() => onComplete(lesson.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-inter"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Mark as Completed
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Lessons = () => {
  const [dailyLesson, setDailyLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        setLoading(true);
        // Fetch daily lesson
        const dailyResponse = await api.lessons.getDaily();
        setDailyLesson(dailyResponse.data);

        // Fetch all lessons
        const lessonsResponse = await api.lessons.getAll();
        setLessons(lessonsResponse.data);
      } catch (err) {
        setError('Failed to fetch lessons. Please try again later.');
        console.error('Error fetching lessons:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleLessonComplete = async (lessonId) => {
    try {
      await api.lessons.complete(lessonId);
      setLessons(lessons.map(lesson => 
        lesson.id === lessonId 
          ? { ...lesson, progress: 100 }
          : lesson
      ));
    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  };

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
          Your Learning Path
        </h1>
        <p className="mt-3 text-lg text-gray-600 font-inter">
          Discover AI-curated lessons and track your progress
        </p>
      </motion.div>

      {/* Daily AI-Curated Lesson */}
      {dailyLesson && (
        <DailyLesson lesson={dailyLesson} onComplete={handleLessonComplete} />
      )}

      {/* All Lessons */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-poppins">All Lessons</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson, index) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              onComplete={handleLessonComplete}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons; 