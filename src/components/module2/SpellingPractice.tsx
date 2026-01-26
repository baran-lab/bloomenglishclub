import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { playCorrectSound, playIncorrectSound } from '@/utils/soundEffects';
import { useNavigate } from 'react-router-dom';

interface SpellingItem {
  id: string;
  spelling: string;
  correctAnswer: string;
  options: string[];
}

interface SpellingPracticeProps {
  spellingData: SpellingItem[];
  onComplete: () => void;
}

export const SpellingPractice: React.FC<SpellingPracticeProps> = ({ spellingData, onComplete }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  const currentItem = spellingData[currentIndex];
  const progress = (completedItems.size / spellingData.length) * 100;
  const allCompleted = completedItems.size === spellingData.length;

  const speakSpelling = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      // Speak each letter with a pause
      const letters = currentItem.spelling.split('-');
      let delay = 0;
      letters.forEach((letter, idx) => {
        setTimeout(() => {
          const utterance = new SpeechSynthesisUtterance(letter);
          utterance.lang = 'en-US';
          utterance.rate = 0.5;
          speechSynthesis.speak(utterance);
        }, delay);
        delay += 800;
      });
    }
  };

  const handleSelect = (answer: string) => {
    if (selectedAnswer) return; // Already answered
    
    setSelectedAnswer(answer);
    const correct = answer === currentItem.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      playCorrectSound();
      setCompletedItems(prev => new Set([...prev, currentItem.id]));
    } else {
      playIncorrectSound();
    }
  };

  const goNext = () => {
    if (currentIndex < spellingData.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  const retry = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">Spelling Practice 📝</h2>
        <p className="text-muted-foreground">Listen to the spelling and pick the correct name</p>
      </div>

      {/* Progress */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
      </div>

      {/* Spelling Display - Audio only, no visible spelling */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl p-8 border border-primary/30 text-center"
        >
          <div className="text-6xl mb-4">🔤</div>
          <h3 className="text-xl font-medium text-muted-foreground mb-4">
            Listen to the spelling
          </h3>

          <Button onClick={speakSpelling} className="gap-2" size="lg">
            <Volume2 className="w-5 h-5" />
            Listen to Spelling
          </Button>
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {currentItem.options.map((option) => (
          <motion.button
            key={option}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(option)}
            disabled={selectedAnswer !== null}
            className={`
              p-4 rounded-xl border-2 text-lg font-medium text-left transition-all
              ${selectedAnswer === option
                ? isCorrect
                  ? 'bg-green-500/20 border-green-500 text-green-700'
                  : 'bg-red-500/20 border-red-500 text-red-700'
                : selectedAnswer !== null && option === currentItem.correctAnswer
                  ? 'bg-green-500/20 border-green-500 text-green-700'
                  : 'bg-card border-border hover:border-primary/50'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {selectedAnswer === option && (
                isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )
              )}
              {selectedAnswer !== null && selectedAnswer !== option && option === currentItem.correctAnswer && (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Feedback */}
      {selectedAnswer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-4 rounded-xl ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}
        >
          <p className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
            {isCorrect ? '🎉 Correct!' : `❌ The correct answer is: ${currentItem.correctAnswer}`}
          </p>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(prev => prev - 1);
              setSelectedAnswer(null);
              setIsCorrect(null);
            }
          }} 
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {spellingData.length}
        </span>
        {allCompleted ? (
          <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600 gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Complete
          </Button>
        ) : selectedAnswer && !isCorrect ? (
          <Button onClick={retry} variant="outline">
            Try Again
          </Button>
        ) : (
          <Button onClick={goNext} disabled={!selectedAnswer || currentIndex === spellingData.length - 1}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
