import { motion } from 'framer-motion';
import { Brain, Zap, Target, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-white overflow-hidden min-h-screen">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Floating Geometric Shapes Background */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-emerald-200/30 to-teal-300/30 rounded-lg"
          animate={{
            y: [0, 15, 0],
            x: [0, -15, 0],
            rotate: [0, -90, -180],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-orange-200/30 to-red-300/30 rounded-full"
          animate={{
            y: [0, -25, 0],
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-br from-purple-200/30 to-pink-300/30 rounded-lg"
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Additional Background Elements */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-cyan-200/20 to-blue-300/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-pink-200/20 to-rose-300/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        />
        
        {/* Subtle Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroLineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.03" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.03" />
              </linearGradient>
            </defs>
            <path
              d="M0,30 Q25,15 50,30 T100,30"
              stroke="url(#heroLineGradient)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M0,70 Q25,55 50,70 T100,70"
              stroke="url(#heroLineGradient)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative z-10 pb-8 bg-transparent sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="flex flex-col lg:flex-row items-center justify-between min-h-[80vh]">
              {/* Left Side - Centered Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-medium mb-6"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Learning
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-poppins"
                >
                  <span className="block">Master Skills in</span>
                  <motion.span 
                    className="block text-5xl sm:text-6xl md:text-7xl bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    5 Minutes
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-6 text-lg text-gray-600 sm:text-xl sm:max-w-xl sm:mx-auto lg:mx-0 md:mt-8 md:text-2xl font-inter"
                >
                  AI-curated micro-lessons, interactive flashcards, and smart quizzes. 
                  Perfect for busy professionals.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <motion.div 
                    className="rounded-xl shadow-lg"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="/register"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Start Learning Free
                    </a>
                  </motion.div>
                  <motion.div 
                    className="rounded-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <a
                      href="/lessons"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-base font-semibold rounded-xl text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                    >
                      <Target className="w-5 h-5 mr-2" />
                      Explore Lessons
                    </a>
                  </motion.div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-10 flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-500"
                >
                  <div className="flex items-center">
                    <Brain className="w-5 h-5 mr-2 text-emerald-500" />
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-500" />
                    <span>5-Minute Lessons</span>
                  </div>
                  <div className="flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-orange-500" />
                    <span>Smart Learning</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Side - Smaller and More Proportional */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:w-2/5 flex justify-center lg:justify-end"
              >
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  {/* Enhanced AI Brain Illustration */}
                  <motion.div
                    className="relative w-full h-full"
                    animate={{ 
                      y: [0, -10, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      {/* Main Brain - Centered */}
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-indigo-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl">
                        <Brain className="w-20 h-20 text-white" />
                      </div>
                      
                      {/* Floating Elements - Around the Brain */}
                      <motion.div
                        className="absolute -top-6 -right-6 w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center"
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, 180, 360],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </motion.div>
                      
                      <motion.div
                        className="absolute -bottom-6 -left-6 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center"
                        animate={{
                          y: [0, 6, 0],
                          scale: [1, 1.3, 1],
                          rotate: [0, 90, 180],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      >
                        <Target className="w-3 h-3 text-white" />
                      </motion.div>
                      
                      {/* Additional floating elements */}
                      <motion.div
                        className="absolute top-1/2 -right-12 w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center"
                        animate={{
                          y: [0, -10, 0],
                          x: [0, -3, 0],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2
                        }}
                      >
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      </motion.div>
                      
                      <motion.div
                        className="absolute bottom-1/2 -left-10 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
                        animate={{
                          y: [0, 8, 0],
                          x: [0, 3, 0],
                          scale: [1, 1.4, 1],
                        }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1.5
                        }}
                      >
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  {/* Background decorative elements */}
                  <motion.div
                    className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-blue-200/20 to-indigo-300/20 rounded-full blur-lg"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 3
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-gradient-to-br from-emerald-200/20 to-teal-300/20 rounded-full blur-lg"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 4
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero; 