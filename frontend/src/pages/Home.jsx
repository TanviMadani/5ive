import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Enhanced Grid Pattern */}
        <div className="absolute inset-0 opacity-4" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.04'%3E%3Cpath d='M0 0h100v100H0z'/%3E%3C/g%3E%3Cg fill='%233B82F6' fill-opacity='0.06'%3E%3Cpath d='M0 0h50v50H0zM50 50h50v50H50z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Dot Pattern Overlay */}
        <div className="absolute inset-0 opacity-3" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233B82F6' fill-opacity='0.08'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        
        {/* Floating Orbs - Enhanced */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-200/25 to-indigo-300/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-200/25 to-teal-300/25 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.1, 0.3],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
        <motion.div
          className="absolute top-3/4 left-1/2 w-80 h-80 bg-gradient-to-br from-purple-200/25 to-pink-300/25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />
        
        {/* Additional Floating Elements */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-cyan-200/20 to-blue-300/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
            y: [0, -25, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-56 h-56 bg-gradient-to-br from-orange-200/20 to-red-300/20 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7
          }}
        />
        
        {/* Enhanced Curved Lines */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.04" />
                <stop offset="50%" stopColor="#10B981" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.03" />
                <stop offset="50%" stopColor="#EC4899" stopOpacity="0.03" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.03" />
              </linearGradient>
            </defs>
            <path
              d="M0,20 Q25,5 50,20 T100,20"
              stroke="url(#lineGradient)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.5"
            />
            <path
              d="M0,80 Q25,65 50,80 T100,80"
              stroke="url(#lineGradient)"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M100,40 Q75,25 50,40 T0,40"
              stroke="url(#lineGradient2)"
              strokeWidth="0.6"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M100,60 Q75,45 50,60 T0,60"
              stroke="url(#lineGradient2)"
              strokeWidth="0.6"
              fill="none"
              opacity="0.25"
            />
          </svg>
        </div>
        
        {/* Geometric Shapes */}
        <motion.div
          className="absolute top-1/6 right-1/6 w-20 h-20 border border-blue-200/20 rotate-45"
          animate={{
            rotate: [45, 225, 45],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/6 left-1/6 w-16 h-16 border border-emerald-200/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <Features />
            <CallToAction />
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
