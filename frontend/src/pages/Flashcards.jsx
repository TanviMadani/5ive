import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  RotateCcw, 
  Lightbulb, 
  HelpCircle,
  Target,
  Trophy,
  Sparkles,
  Brain,
  Zap,
  Award,
  BookOpen
} from 'lucide-react';
import api from '../services/api';

const Flashcard = ({ card, isFlipped, onFlip, showNavigation }) => {
  return (
    <motion.div
      className="w-full h-80 perspective preserve-3d cursor-pointer"
      onClick={onFlip}
      initial={false}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Front of the card (Question) */}
      <motion.div
        className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-xl flex flex-col justify-center items-center p-8 border-2 border-blue-200 hover:border-blue-300 transition-colors duration-200"
        style={{ display: isFlipped ? 'none' : 'flex' }}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-blue-600" />
          </div>
          <p className="text-sm text-blue-500 mb-3 font-inter font-medium">Question</p>
          <h2 className="text-2xl font-semibold text-gray-800 text-center font-poppins leading-relaxed">{card.question}</h2>
        </div>
      </motion.div>

      {/* Back of the card (Answer) */}
      <motion.div
        className="absolute w-full h-full backface-hidden bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-xl flex flex-col justify-center items-center p-8 border-2 border-emerald-400 transform rotateY-180"
        style={{ display: isFlipped ? 'flex' : 'none' }}
      >
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <Lightbulb className="w-8 h-8 text-white" />
          </div>
          <p className="text-sm text-emerald-100 mb-3 font-inter font-medium">Answer</p>
          <h2 className="text-2xl font-semibold text-white text-center font-poppins leading-relaxed">{card.answer}</h2>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FlashcardNav = ({ current, total, onNext, onPrev, onMarkKnown, isKnown, onShuffle }) => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between w-full space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-3">
        <motion.button
          onClick={onPrev}
          disabled={current === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white hover:bg-gray-50 text-gray-700 rounded-full disabled:opacity-50 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl border border-gray-200 disabled:cursor-not-allowed"
          aria-label="Previous card"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        
        <div className="text-center">
          <span className="text-gray-700 font-semibold font-poppins text-lg">
            {current + 1} / {total}
          </span>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((current + 1) / total) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
            />
          </div>
        </div>
        
        <motion.button
          onClick={onNext}
          disabled={current === total - 1}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white hover:bg-gray-50 text-gray-700 rounded-full disabled:opacity-50 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl border border-gray-200 disabled:cursor-not-allowed"
          aria-label="Next card"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
      
      <div className="flex items-center space-x-3">
        {onShuffle && (
          <motion.button
            onClick={onShuffle}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-xl transition-all duration-200 flex items-center shadow-lg hover:shadow-xl font-medium font-inter"
            aria-label="Shuffle cards"
          >
            <RotateCcw className="w-4 h-4 mr-2" /> Shuffle
          </motion.button>
        )}
        
        <motion.button
          onClick={onMarkKnown}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-xl transition-all duration-200 flex items-center shadow-lg hover:shadow-xl font-medium font-inter ${
            isKnown 
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white' 
              : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
          }`}
        >
          {isKnown ? (
            <>
              <Check className="w-4 h-4 mr-2" /> Known
            </>
          ) : (
            <>
              <Target className="w-4 h-4 mr-2" /> Mark as Known
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

const SessionComplete = ({ totalCards, knownCount, onRestart }) => {
  const percentage = Math.round((knownCount / totalCards) * 100);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-8 px-4 flex flex-col items-center justify-center">
      <motion.div
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl text-center border border-gray-100"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center"
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4 font-poppins">Session Complete!</h2>
        <p className="text-lg text-gray-600 mb-6 font-inter">
          You reviewed all {totalCards} flashcards.
        </p>
        
        <div className="mb-6">
          <div className="text-center mb-4">
            <p className="text-4xl font-bold text-gray-800 mb-1 font-poppins">
              {knownCount} / {totalCards}
            </p>
            <p className="text-lg text-gray-600 font-inter">
              {percentage}% Mastered
            </p>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full"
            />
          </div>
        </div>
        
        <motion.button
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-inter"
        >
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Review Again</span>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
};

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState({}); // Store by card ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const fetchDailyFlashcards = useCallback(async () => {
    setLoading(true);
    setError(null);
    setFlashcards([]);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setKnownCards({});
    setSessionCompleted(false);
    try {
      const response = await api.flashcards.getDaily();
      if (response.data && response.data.length > 0) {
        setFlashcards(response.data);
      } else {
        setFlashcards([]); // Ensure it's an array
        setError('No flashcards available for today. Check back later!');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch flashcards.');
      console.error("Fetch flashcards error:", err);
      setFlashcards([]); // Ensure it's an array on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDailyFlashcards();
  }, [fetchDailyFlashcards]);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setSessionCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleMarkKnown = async () => {
    const cardId = flashcards[currentCardIndex]?._id;
    if (!cardId) return;

    const wasKnown = knownCards[cardId];
    setKnownCards(prev => ({ ...prev, [cardId]: !wasKnown }));

    try {
      if (!wasKnown) {
        await api.flashcards.markAsKnown(cardId);
      } else {
        // Optional: implement un-marking or just toggle locally
        // For now, we assume marking known is permanent for the session or API call
        // If an un-mark API exists, call api.flashcards.markAsUnknown(cardId)
      }
      // Move to next card automatically if configured, or user can click next
      // handleNext(); 
    } catch (err) {
      console.error("Failed to mark card as known:", err);
      setKnownCards(prev => ({ ...prev, [cardId]: wasKnown })); // Revert on error
      // Optionally notify user of the error
    }
  };

  const shuffleCards = () => {
    setFlashcards(prevFlashcards => [...prevFlashcards].sort(() => Math.random() - 0.5));
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setKnownCards({}); // Reset known status on shuffle if desired
  };

  const restartSession = () => {
    fetchDailyFlashcards();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-100 to-pink-200 flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 font-poppins">Oops!</h3>
          <p className="text-gray-600 mb-6 font-inter">{error}</p>
          <motion.button
            onClick={fetchDailyFlashcards}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-inter"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-100 to-blue-200 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-700 mb-4 font-poppins">Daily Flashcards</h1>
          <p className="text-gray-600 mb-6 font-inter">No flashcards available right now. Great job, or check back later!</p>
          <motion.button
            onClick={fetchDailyFlashcards}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-inter"
          >
            Refresh Flashcards
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (sessionCompleted) {
    const knownCount = Object.values(knownCards).filter(Boolean).length;
    return (
      <SessionComplete
        totalCards={flashcards.length}
        knownCount={knownCount}
        onRestart={restartSession}
      />
    );
  }

  const currentCard = flashcards[currentCardIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-8 px-4 flex flex-col items-center">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-poppins bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Daily Flashcards
          </h1>
          <p className="text-lg text-gray-600 font-inter">Master new concepts with interactive cards!</p>
        </div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentCardIndex} // Ensures re-render on card change for animation
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Flashcard
              card={currentCard}
              isFlipped={isFlipped}
              onFlip={handleFlip}
            />
          </motion.div>
        </AnimatePresence>

        <FlashcardNav
          current={currentCardIndex}
          total={flashcards.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onMarkKnown={handleMarkKnown}
          isKnown={!!knownCards[currentCard?._id]}
          onShuffle={shuffleCards}
        />
      </motion.div>
    </div>
  );
};

export default FlashcardsPage;

// Helper CSS for 3D flip (can be in a global CSS or here if not already present)
// Make sure your Tailwind config supports 'perspective' and 'preserve-3d' utilities
// Or add this to your main CSS file:
/*
.perspective {
  perspective: 1000px;
}
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
.rotateY-180 {
  transform: rotateY(180deg);
}
*/ 