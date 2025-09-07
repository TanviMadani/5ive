import { motion } from 'framer-motion';
import { Zap, Target, Users, ArrowRight, Sparkles, Brain } from 'lucide-react';

const CallToAction = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="white" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
          <rect width="100" height="100" fill="url(#dots)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Additional floating shapes */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-emerald-300/20 to-teal-300/20 rounded-lg"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-gradient-to-br from-orange-300/20 to-red-300/20 rounded-full"
          animate={{
            y: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center py-20 px-4 sm:py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium mb-6 backdrop-blur-sm border border-white/30"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Join the Learning Revolution
          </motion.div>

          <h2 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl font-poppins">
            <motion.span 
              className="block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ready to Transform
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Your Learning?
            </motion.span>
          </h2>
          
          <motion.p 
            className="mt-6 text-xl leading-7 text-blue-100 max-w-3xl mx-auto font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Join thousands of professionals and students who are already mastering new skills 
            with AI-powered micro-lessons. Start your journey today and see results in just 5 minutes.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-10 flex flex-wrap justify-center gap-8 text-white/80"
          >
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-emerald-300" />
              <span className="text-sm">10,000+ Learners</span>
            </div>
            <div className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-300" />
              <span className="text-sm">500+ Lessons</span>
            </div>
            <div className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-purple-300" />
              <span className="text-sm">AI-Powered</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.a
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-transparent text-base font-semibold rounded-xl text-blue-600 bg-white hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 font-inter"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Learning Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.a>
            
            <motion.a
              href="/lessons"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-base font-semibold rounded-xl text-white bg-transparent hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-inter"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Target className="w-5 h-5 mr-2" />
              Explore Lessons
            </motion.a>
          </motion.div>

          {/* Trust Message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-8 text-sm text-blue-200 font-inter"
          >
            No credit card required • Start learning immediately • Cancel anytime
          </motion.p>
        </motion.div>

        {/* Enhanced Decorative elements */}
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
    </div>
  );
};

export default CallToAction; 