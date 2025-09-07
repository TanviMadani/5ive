import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Play, 
  ArrowRight, 
  Check, 
  Clock,
  Target,
  Trophy,
  Sparkles,
  Brain,
  Zap,
  Award
} from 'lucide-react';
import api from '../services/api';

const QuizCard = ({ quiz, onStart, index }) => {
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-indigo-200 shadow-inner">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 font-poppins">{quiz.title}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500 font-inter">{quiz.duration} min</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 font-inter leading-relaxed">{quiz.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-200 text-blue-800 border border-blue-300 font-inter">
              <Target className="w-3 h-3 mr-1" />
              {quiz.questions} Questions
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-100 to-green-200 text-emerald-800 border border-emerald-300 font-inter">
              <Zap className="w-3 h-3 mr-1" />
              {quiz.difficulty}
            </span>
          </div>
          <motion.button
            onClick={() => onStart(quiz.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 font-inter"
          >
            <div className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Start Quiz</span>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const QuestionCard = ({ question, questionIndex, selectedOption, onOptionChange, showResults, isCorrect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 mb-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold font-poppins">
          {questionIndex + 1}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 font-poppins">{question.text}</h3>
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const optionId = `q${question._id}_option${index}`;
          let bgColor = 'bg-gray-50 hover:bg-gray-100 border-gray-200';
          let textColor = 'text-gray-700';
          let icon = null;

          if (showResults) {
            if (option.isCorrect) {
              bgColor = 'bg-gradient-to-r from-emerald-100 to-green-200 border-emerald-300';
              textColor = 'text-emerald-800';
              icon = <CheckCircle className="w-5 h-5 text-emerald-600" />;
            } else if (selectedOption === option.text && !option.isCorrect) {
              bgColor = 'bg-gradient-to-r from-red-100 to-pink-200 border-red-300';
              textColor = 'text-red-800';
              icon = <XCircle className="w-5 h-5 text-red-600" />;
            }
          } else if (selectedOption === option.text) {
            bgColor = 'bg-gradient-to-r from-blue-100 to-indigo-200 border-blue-300';
            textColor = 'text-blue-800';
          }

          return (
            <motion.label
              key={index}
              htmlFor={optionId}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`block p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${bgColor} ${textColor} hover:shadow-md`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={optionId}
                    name={`question_${question._id}`}
                    value={option.text}
                    checked={selectedOption === option.text}
                    onChange={() => onOptionChange(question._id, option.text)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                    disabled={showResults}
                  />
                  <span className="font-medium font-inter">{option.text}</span>
                </div>
                {icon && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {icon}
                  </motion.div>
                )}
              </div>
            </motion.label>
          );
        })}
      </div>
      
      {showResults && question.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl border border-blue-200"
        >
          <h4 className="text-sm font-semibold text-blue-600 mb-2 font-poppins flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Explanation
          </h4>
          <p className="text-gray-700 font-inter">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

const QuizResult = ({ score, totalQuestions, results, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isExcellent = percentage >= 90;
  const isGood = percentage >= 70;
  const isAverage = percentage >= 50;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-100"
    >
      <div className="mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
          className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center"
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-2 font-poppins">Quiz Completed!</h2>
        <p className="text-lg text-gray-600 font-inter">Great job completing the quiz!</p>
      </div>
      
      <div className="mb-8">
        <div className="text-center mb-4">
          <p className="text-4xl font-bold text-gray-800 mb-1 font-poppins">
            {score} / {totalQuestions}
          </p>
          <p className="text-lg text-gray-600 font-inter">
            {percentage}% {isExcellent ? 'Excellent!' : isGood ? 'Good!' : isAverage ? 'Average' : 'Keep practicing!'}
          </p>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-3 rounded-full ${
              isExcellent ? 'bg-gradient-to-r from-emerald-500 to-green-600' :
              isGood ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
              isAverage ? 'bg-gradient-to-r from-yellow-500 to-orange-600' :
              'bg-gradient-to-r from-red-500 to-pink-600'
            }`}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 font-poppins">Detailed Results:</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl text-left border-2 ${
                result.isCorrect 
                  ? 'bg-gradient-to-r from-emerald-50 to-green-100 border-emerald-200 text-emerald-800' 
                  : 'bg-gradient-to-r from-red-50 to-pink-100 border-red-200 text-red-800'
              }`}
            >
              <p className="font-medium font-inter mb-2">Question {index + 1}: {result.questionText}</p>
              <div className="flex items-center space-x-2">
                <span>Your answer: {result.selectedAnswer}</span>
                {result.isCorrect ? 
                  <CheckCircle className="w-4 h-4 text-emerald-600" /> : 
                  <XCircle className="w-4 h-4 text-red-600" />
                }
              </div>
              {!result.isCorrect && (
                <p className="mt-1 text-sm">Correct answer: {result.correctAnswer}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.button
        onClick={onRestart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-inter"
      >
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5" />
          <span>Try Another Quiz</span>
        </div>
      </motion.button>
    </motion.div>
  );
};

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [detailedResults, setDetailedResults] = useState([]);

  const fetchDailyQuiz = useCallback(async () => {
    setLoading(true);
    setError(null);
    setShowResults(false);
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuiz(null);
    try {
      const response = await api.quizzes.getDaily();
      if (response.data && response.data.questions && response.data.questions.length > 0) {
        // Ensure options are available for each question
        const formattedQuiz = {
          ...response.data,
          questions: response.data.questions.map(q => ({
            ...q,
            options: q.options && q.options.length > 0 ? q.options : [
              { text: "Option A (Sample)", isCorrect: true }, // Sample fallback
              { text: "Option B (Sample)", isCorrect: false },
              { text: "Option C (Sample)", isCorrect: false },
            ]
          }))
        };
        setQuiz(formattedQuiz);
      } else {
        setError('No questions available for the daily quiz. Please try again later.');
        setQuiz({ title: "Daily Quiz", questions: [] }); // Set empty quiz to prevent crashes
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch daily quiz. Please check your connection.');
      console.error("Fetch daily quiz error:", err);
      setQuiz({ title: "Daily Quiz", questions: [] }); // Set empty quiz on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDailyQuiz();
  }, [fetchDailyQuiz]);

  const handleOptionChange = (questionId, optionText) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionText,
    }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    let currentScore = 0;
    const results = quiz.questions.map(q => {
      const selectedAnswerText = selectedAnswers[q._id];
      const correctAnswerOption = q.options.find(opt => opt.isCorrect);
      const isCorrect = selectedAnswerText === correctAnswerOption?.text;
      if (isCorrect) {
        currentScore++;
      }
      return {
        questionText: q.text,
        selectedAnswer: selectedAnswerText || "Not answered",
        correctAnswer: correctAnswerOption?.text,
        isCorrect: isCorrect,
      };
    });

    setScore(currentScore);
    setDetailedResults(results);
    setShowResults(true);

    // Optional: Send results to backend
    try {
      // Assuming a quiz has an _id. If daily quiz doesn't have one, this needs adjustment.
      // Or, perhaps the API to submit answers is different for a daily quiz.
      if (quiz._id) {
        await api.quizzes.complete(quiz._id, { score: currentScore, totalQuestions: quiz.questions.length, answers: selectedAnswers });
      }
    } catch (err) {
      console.error("Failed to submit quiz results:", err);
      // Handle submission error, e.g., notify user
    }
  };
  
  const handleNextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      handleSubmit(); // Auto-submit if it's the last question
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-100 to-pink-200 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 font-poppins">Oops!</h3>
          <p className="text-gray-600 mb-6 font-inter">{error}</p>
          <motion.button
            onClick={fetchDailyQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-inter"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (!quiz || quiz.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-100 to-blue-200 flex items-center justify-center">
            <Brain className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-700 mb-4 font-poppins">Daily Quiz</h1>
          <p className="text-gray-600 mb-6 font-inter">No quiz available at the moment. Please check back later.</p>
          <motion.button
            onClick={fetchDailyQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-inter"
          >
            Refresh Quiz
          </motion.button>
        </motion.div>
      </div>
    );
  }
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100 py-8 px-4 flex flex-col items-center">
      <motion.div 
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-poppins bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {quiz.title || "Daily Quiz"}
          </h1>
          <p className="text-lg text-gray-600 font-inter">Test your knowledge with AI-curated questions!</p>
        </div>

        {!showResults ? (
          <>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <motion.div 
                className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full shadow-inner" 
                style={{ width: `${progressPercentage}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="flex items-center justify-center space-x-4 mb-6">
              <span className="text-sm text-gray-500 font-inter">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-500 font-inter">{Math.round(progressPercentage)}% Complete</span>
            </div>

            <QuestionCard
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              selectedOption={selectedAnswers[currentQuestion._id]}
              onOptionChange={handleOptionChange}
              showResults={false}
            />
            
            <div className="mt-8 flex justify-center">
              {currentQuestionIndex < quiz.questions.length - 1 ? (
                <motion.button
                  onClick={handleNextQuestion}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!selectedAnswers[currentQuestion._id]}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-inter disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-2">
                    <span>Next Question</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!selectedAnswers[currentQuestion._id]}
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-inter disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5" />
                    <span>Submit Quiz</span>
                  </div>
                </motion.button>
              )}
            </div>
          </>
        ) : (
          <QuizResult
            score={score}
            totalQuestions={quiz.questions.length}
            results={detailedResults}
            onRestart={fetchDailyQuiz}
          />
        )}
      </motion.div>
    </div>
  );
};

export default QuizPage; 