import { motion } from 'framer-motion';
import { 
  Brain, 
  Clock, 
  Target, 
  BarChart3, 
  Zap, 
  Shield, 
  Users, 
  Sparkles,
  BookOpen,
  CheckCircle,
  TrendingUp,
  Award
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      title: 'AI-Curated Lessons',
      description: 'Personalized 5-minute lessons tailored to your learning style and goals',
      icon: <Brain className="h-6 w-6" />,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50'
    },
    {
      title: 'Microlearning Focus',
      description: 'Learn in bite-sized chunks that fit your busy schedule perfectly',
      icon: <Clock className="h-6 w-6" />,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'from-emerald-50 to-teal-50'
    },
    {
      title: 'Adaptive Quizzes',
      description: 'Smart assessments that adjust difficulty based on your performance',
      icon: <Target className="h-6 w-6" />,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      title: 'Interactive Flashcards',
      description: '3D flip animations and swipe gestures for engaging memorization',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      title: 'Progress Tracking',
      description: 'Visual analytics and streak counters to keep you motivated',
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'from-indigo-50 to-blue-50'
    },
    {
      title: 'Gamified Learning',
      description: 'Earn badges, maintain streaks, and compete on leaderboards',
      icon: <Award className="h-6 w-6" />,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      title: 'Instant Feedback',
      description: 'Real-time AI-powered insights and recommendations',
      icon: <Zap className="h-6 w-6" />,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-50 to-blue-50'
    },
    {
      title: 'Community Learning',
      description: 'Connect with fellow learners and share knowledge',
      icon: <Users className="h-6 w-6" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Additional Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/15 to-indigo-300/15 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-emerald-200/15 to-teal-300/15 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-16 h-16 border border-blue-200/20 rotate-45"
          animate={{
            rotate: [45, 225, 45],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-12 h-12 border border-emerald-200/20 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Why Choose 5ive?
          </motion.div>
          
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl font-poppins mb-8 leading-tight">
            <span className="block mb-3">Learning Made</span>
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 bg-clip-text text-transparent">
              Simple & Effective
            </span>
          </h2>
          <p className="max-w-3xl text-xl text-gray-600 mx-auto font-inter leading-relaxed">
            Our AI-powered platform transforms how you learn with personalized micro-lessons, 
            interactive content, and intelligent progress tracking.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
              whileHover={{ 
                scale: 1.03,
                y: -5
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300,
                damping: 20
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 group-hover:duration-200"></div>
              <div className="relative h-full p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-transparent">
                <div className={`flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.color} text-white transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <div className="mt-4">
                  <h3 className="text-lg leading-6 font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 font-poppins">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed font-inter">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover Effect Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z'/%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-emerald-300 relative z-10" />
            <h3 className="text-2xl font-bold mb-2 font-poppins relative z-10">Ready to Start Learning?</h3>
            <p className="text-blue-100 mb-6 font-inter relative z-10">
              Join thousands of learners who are already transforming their skills with 5ive
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 font-inter relative z-10"
            >
              <TrendingUp className="w-5 h-5 inline mr-2" />
              Start Your Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features; 