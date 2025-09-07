import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Mail, 
  Twitter, 
  Github, 
  Linkedin, 
  Heart, 
  Zap, 
  Target, 
  BookOpen,
  Shield,
  Users
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Lessons', href: '/dashboard/lessons' },
        { name: 'Quizzes', href: '/dashboard/quizzes' },
        { name: 'Flashcards', href: '/dashboard/flashcards' },
        { name: 'Progress', href: '/dashboard/progress' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#' },
        { name: 'Contact', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
      color: 'hover:text-blue-400',
    },
    {
      name: 'GitHub',
      href: '#',
      icon: Github,
      color: 'hover:text-gray-300',
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: Linkedin,
      color: 'hover:text-blue-500',
    },
    {
      name: 'Email',
      href: 'mailto:hello@5ive.com',
      icon: Mail,
      color: 'hover:text-red-400',
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 overflow-hidden sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-4"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mr-3">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent font-poppins">
                5ive
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-400 text-sm leading-relaxed font-inter mb-6"
            >
              Transform your learning journey with AI-powered micro-lessons, interactive content, 
              and intelligent progress tracking. Master new skills in just 5 minutes.
            </motion.p>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <div className="flex items-center text-gray-400 text-sm">
                <Users className="w-4 h-4 mr-2 text-blue-400" />
                <span>10,000+ Active Learners</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Target className="w-4 h-4 mr-2 text-emerald-400" />
                <span>500+ AI-Curated Lessons</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Zap className="w-4 h-4 mr-2 text-orange-400" />
                <span>5-Minute Learning Sessions</span>
              </div>
            </motion.div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase mb-4 font-poppins">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-inter hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center text-gray-400 text-sm font-inter">
              <span>© {currentYear} 5ive. All rights reserved.</span>
              <span className="mx-2">•</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-400" />
              <span>for learners worldwide</span>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`text-gray-400 transition-colors duration-200 ${item.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 text-center text-xs text-gray-500 font-inter"
          >
            <p>
              AI-powered learning platform • Secure & private • 
              <Shield className="w-3 h-3 inline mx-1" />
              Enterprise-grade security
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 