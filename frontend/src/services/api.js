import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verify: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
};

// Profile API calls
const profile = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
};

// Lessons API calls
const lessons = {
  getAll: () => api.get('/lessons'),
  getDaily: () => api.get('/lessons/daily'),
  complete: (lessonId) => api.post(`/lessons/${lessonId}/complete`),
};

// Flashcards API calls
const flashcards = {
  getAll: () => api.get('/flashcards'),
  getDaily: () => api.get('/flashcards/daily'),
  markAsKnown: (cardId) => api.post(`/flashcards/${cardId}/known`),
  markAsUnknown: (cardId) => api.post(`/flashcards/${cardId}/unknown`),
};

// Quizzes API calls
const quizzes = {
  getAll: () => api.get('/quizzes'),
  getDaily: () => api.get('/quizzes/daily'),
  getById: (quizId) => api.get(`/quizzes/${quizId}`),
  submitAnswer: (quizId, answer) => api.post(`/quizzes/${quizId}/answer`, answer),
  complete: (quizId) => api.post(`/quizzes/${quizId}/complete`),
};

// Progress API calls
const progress = {
  getStats: () => api.get('/progress/stats'),
  getAchievements: () => api.get('/progress/achievements'),
  getActivity: () => api.get('/progress/activity'),
  getStreak: () => api.get('/progress/streak'),
  getLeaderboard: () => api.get('/progress/leaderboard'),
  getLessonHistory: () => api.get('/progress/lessons/history'),
  getQuizHistory: () => api.get('/progress/quizzes/history'),
};

// Attach the API modules to the main api object
api.auth = auth;
api.profile = profile;
api.lessons = lessons;
api.flashcards = flashcards;
api.quizzes = quizzes;
api.progress = progress;

// Export both the api instance and the API modules
export { api as default, auth, profile, lessons, flashcards, quizzes, progress }; 
