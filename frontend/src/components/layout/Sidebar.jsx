import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  CreditCard, 
  HelpCircle, 
  BarChart3, 
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
  HelpCircle as Help,
  Sun,
  Moon,
  Target,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigation = [
  { 
    name: 'Dashboard', 
    path: '/dashboard', 
    icon: LayoutDashboard,
    description: 'Overview and analytics'
  },
  { 
    name: 'Lessons', 
    path: '/dashboard/lessons', 
    icon: BookOpen,
    description: 'Learning materials'
  },
  { 
    name: 'Flashcards', 
    path: '/dashboard/flashcards', 
    icon: CreditCard,
    description: 'Memory training'
  },
  { 
    name: 'Quizzes', 
    path: '/dashboard/quizzes', 
    icon: HelpCircle,
    description: 'Test your knowledge'
  },
  { 
    name: 'Progress', 
    path: '/dashboard/progress', 
    icon: BarChart3,
    description: 'Track your learning'
  },
  { 
    name: 'Profile', 
    path: '/dashboard/profile', 
    icon: User,
    description: 'Account settings'
  },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();
  
  // Mock progress data - replace with real data from your API
  const progressData = {
    lessonsCompleted: 12,
    totalLessons: 20,
    streak: 7,
    level: 'Intermediate'
  };

  const progressPercentage = Math.round((progressData.lessonsCompleted / progressData.totalLessons) * 100);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -280,
          width: isOpen ? 280 : 80
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed inset-y-0 left-0 z-30 bg-white dark:bg-gray-800 shadow-xl transform lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-700 dark:via-blue-800 dark:to-indigo-800">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-blue-600 font-bold text-xl">5</span>
              </div>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-white"
                >
                  <h1 className="text-xl font-bold">ive</h1>
                  <p className="text-xs text-blue-100">Learning</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Progress Mini-Widget */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-4 mt-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Progress</span>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {progressPercentage}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2 mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full shadow-sm"
                />
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-700 dark:text-blue-300">
                  {progressData.lessonsCompleted}/{progressData.totalLessons} lessons
                </span>
                <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>{progressData.streak} day streak</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white hover:scale-[1.02]'
                    }`
                  }
                >
                  {/* Active indicator */}
                  {({ isActive }) => isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="ml-3 min-w-0 flex-1"
                    >
                      <span className="truncate">{item.name}</span>
                      {item.description && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                          {item.description}
                        </p>
                      )}
                    </motion.div>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Bottom Section - Secondary Actions */}
          <div className="border-t border-gray-200 dark:border-gray-700">
            {/* Settings */}
            <div className="p-4">
              <NavLink
                to="/dashboard/settings"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-all duration-200 group"
              >
                <Settings className="w-5 h-5 flex-shrink-0" />
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-3"
                  >
                    Settings
                  </motion.span>
                )}
              </NavLink>
            </div>

            {/* Collapse Button */}
            <div className="px-4 pb-4">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="hidden lg:flex items-center justify-center w-full h-10 px-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white rounded-lg transition-all duration-200 group"
              >
                {isOpen ? (
                  <>
                    <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                    Collapse
                  </>
                ) : (
                  <>
                    <ChevronRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    Expand
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar; 