import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Lessons from './pages/Lessons';
import FlashcardsPage from './pages/Flashcards';
import QuizPage from './pages/Quizzes';
import Progress from './pages/Progress';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes with Layout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="flashcards" element={<FlashcardsPage />} />
            <Route path="quizzes" element={<QuizPage />} />
            <Route path="progress" element={<Progress />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Legacy routes for backward compatibility */}
          <Route path="/lessons" element={<Navigate to="/dashboard/lessons" replace />} />
          <Route path="/flashcards" element={<Navigate to="/dashboard/flashcards" replace />} />
          <Route path="/quizzes" element={<Navigate to="/dashboard/quizzes" replace />} />
          <Route path="/progress" element={<Navigate to="/dashboard/progress" replace />} />
          <Route path="/profile" element={<Navigate to="/dashboard/profile" replace />} />

          {/* Catch all route - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;



