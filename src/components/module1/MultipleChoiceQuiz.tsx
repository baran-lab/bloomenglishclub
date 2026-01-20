import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageContext';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  translations: Record<string, string>;
}

interface MultipleChoiceQuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
  title: string;
  characterName: string;
}

export const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({
  questions,
  onComplete,
  title,
  characterName,
}) => {
  const { selectedLanguage, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const isLastQuestion = currentIndex === questions.length - 1;
  const allCompleted = currentIndex >= questions.length;

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowResult(true);
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectCount(prev => prev + 1);
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete();
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowTranslation(false);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  if (allCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-4"
      >
        <p className="text-5xl">🎉</p>
        <h3 className="font-fredoka text-2xl font-bold text-foreground">
          Quiz Complete!
        </h3>
        <p className="text-lg text-muted-foreground">
          You got {correctCount} out of {questions.length} correct!
        </p>
        <Button onClick={onComplete} className="gap-2 mt-4">
          Continue <ArrowRight className="w-4 h-4" />
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-card rounded-2xl border border-border p-6 space-y-6"
        >
          {/* Question */}
          <div className="text-center space-y-3">
            <p className="text-lg font-semibold text-foreground">
              {currentQuestion.question}
            </p>
            
            {/* Translation toggle */}
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-sm text-primary hover:underline"
            >
              {showTranslation ? t('hideTranslation') : t('showTranslation')}
            </button>
            
            {showTranslation && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-sm text-muted-foreground italic"
              >
                {currentQuestion.translations[selectedLanguage]}
              </motion.p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectOption = index === currentQuestion.correctAnswer;
              
              let borderColor = 'border-border';
              let bgColor = 'bg-background';
              
              if (showResult) {
                if (isCorrectOption) {
                  borderColor = 'border-green-500';
                  bgColor = 'bg-green-500/10';
                } else if (isSelected && !isCorrectOption) {
                  borderColor = 'border-red-500';
                  bgColor = 'bg-red-500/10';
                }
              } else if (isSelected) {
                borderColor = 'border-primary';
                bgColor = 'bg-primary/10';
              }

              return (
                <motion.button
                  key={index}
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 ${borderColor} ${bgColor} text-left transition-all flex items-center justify-between`}
                >
                  <span className="font-medium text-foreground">{option}</span>
                  {showResult && isCorrectOption && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                  {showResult && isSelected && !isCorrectOption && (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Result Message */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center p-4 rounded-xl ${
                isCorrect ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'
              }`}
            >
              <p className="font-bold text-lg">
                {isCorrect ? '🎉 Correct!' : '❌ Not quite!'}
              </p>
              {!isCorrect && (
                <p className="text-sm mt-1">
                  The correct answer is: {currentQuestion.options[currentQuestion.correctAnswer]}
                </p>
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        {!showResult ? (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="gap-2 px-8"
          >
            Check Answer
          </Button>
        ) : (
          <>
            {!isCorrect && (
              <Button variant="outline" onClick={handleTryAgain} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
            )}
            <Button onClick={handleNext} className="gap-2">
              {isLastQuestion ? 'Complete' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
