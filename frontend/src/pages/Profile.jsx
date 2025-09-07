import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Briefcase, 
  Target, 
  Bell, 
  Edit3,
  Save,
  X,
  Camera,
  Settings,
  Award,
  BookOpen,
  Zap
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobRole: '',
    interests: [],
    // Frontend-only fields (not saved to backend)
    bio: '',
    learningGoals: '',
    notificationPreferences: {
      email: true,
      push: true,
      weeklyDigest: true,
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.profile.get();
        
        // Merge backend data with frontend defaults
        setFormData(prev => ({
          ...prev,
          name: response.data.name || '',
          email: response.data.email || '',
          bio: response.data.bio || '',
          learningGoals: response.data.learningGoals || '',
          jobRole: response.data.jobRole || '',
          interests: response.data.interests || [],
          // Keep the default notification preferences since backend doesn't have them
          notificationPreferences: prev.notificationPreferences
        }));
      } catch (err) {
        setError('Failed to fetch profile data. Please try again later.');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]: !prev.notificationPreferences[type],
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only send fields that the backend expects
      const updateData = {
        name: formData.name,
        jobRole: formData.jobRole,
        interests: formData.interests
      };
      
      const response = await api.profile.update(updateData);
      updateUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
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
          Your Profile
        </h1>
        <p className="mt-3 text-lg text-gray-600 font-inter">
          Manage your account settings and learning preferences
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture */}
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 relative group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="h-28 w-28 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg"
                >
                  {user?.name?.charAt(0) || 'U'}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Camera className="w-4 h-4 text-blue-600" />
                </motion.button>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 font-poppins">Profile Picture</h3>
                <p className="text-gray-600 font-inter">
                  Upload a new profile picture (coming soon)
                </p>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 font-inter mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Full Name</span>
                  </div>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-inter mb-2">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>Email Address</span>
                  </div>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                />
              </motion.div>
            </div>

            {/* Job Role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700 font-inter mb-2">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Job Role</span>
                </div>
              </label>
              <input
                type="text"
                name="jobRole"
                id="jobRole"
                value={formData.jobRole}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g., Software Engineer, Product Manager"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 font-inter mb-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Bio</span>
                </div>
              </label>
              <textarea
                name="bio"
                id="bio"
                rows={3}
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="Tell us a bit about yourself..."
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
              />
            </motion.div>

            {/* Learning Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="learningGoals" className="block text-sm font-medium text-gray-700 font-inter mb-2">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span>Learning Goals</span>
                </div>
              </label>
              <textarea
                name="learningGoals"
                id="learningGoals"
                rows={3}
                value={formData.learningGoals}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="What are your learning goals? What skills do you want to develop?"
                className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
              />
            </motion.div>

            {/* Notification Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-poppins flex items-center">
                <Bell className="w-5 h-5 mr-2 text-blue-600" />
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="email"
                    checked={formData.notificationPreferences.email}
                    onChange={() => handleNotificationChange('email')}
                    disabled={!isEditing}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                  <label htmlFor="email" className="ml-3 text-sm text-gray-700 font-inter">
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="push"
                    checked={formData.notificationPreferences.push}
                    onChange={() => handleNotificationChange('push')}
                    disabled={!isEditing}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                  <label htmlFor="push" className="ml-3 text-sm text-gray-700 font-inter">
                    Push Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="weeklyDigest"
                    checked={formData.notificationPreferences.weeklyDigest}
                    onChange={() => handleNotificationChange('weeklyDigest')}
                    disabled={!isEditing}
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                  <label htmlFor="weeklyDigest" className="ml-3 text-sm text-gray-700 font-inter">
                    Weekly Progress Digest
                  </label>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex justify-end space-x-4"
            >
              {isEditing ? (
                <>
                  <motion.button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 font-inter"
                  >
                    <div className="flex items-center space-x-2">
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </div>
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-inter"
                  >
                    <div className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </div>
                  </motion.button>
                </>
              ) : (
                <motion.button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 font-inter"
                >
                  <div className="flex items-center space-x-2">
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </div>
                </motion.button>
              )}
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile; 