import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { playSuccessSound } from '@/utils/soundEffects';

interface MatchingPair {
  id: string;
  question: string;
  answer: string;
}

interface MatchingQuizProps {
  pairs: MatchingPair[];
  onComplete: () => void;
  title?: string;
  characterName?: string;
}

export const MatchingQuiz: React.FC<MatchingQuizProps> = ({
  pairs,
  onComplete,
  title = 'Match the Information',
  characterName = 'Fatima',
}) => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [shuffledAnswers] = useState(() => 
    [...pairs].sort(() => Math.random() - 0.5).map(p => ({ id: p.id, answer: p.answer }))
  );

  const handleQuestionClick = (questionId: string) => {
    if (matches[questionId]) return;
    setSelectedQuestion(questionId);
  };

  const handleAnswerClick = (answerId: string) => {
    if (!selectedQuestion) return;
    
    // Check if answer is already matched
    if (Object.values(matches).includes(answerId)) return;

    setMatches(prev => ({
      ...prev,
      [selectedQuestion]: answerId,
    }));
    setSelectedQuestion(null);

    // Check if all matched
    if (Object.keys(matches).length + 1 === pairs.length) {
      setTimeout(() => {
        setIsComplete(true);
        setShowResult(true);
        playSuccessSound();
      }, 500);
    }
  };

  const handleRetry = () => {
    setMatches({});
    setSelectedQuestion(null);
    setIsComplete(false);
    setShowResult(false);
  };

  const allCorrect = pairs.every(p => matches[p.id] === p.id);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground mt-2">
          Match the information you learned about {characterName}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Questions column */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground text-center mb-4">Categories</h3>
          {pairs.map((pair) => (
            <motion.button
              key={pair.id}
              onClick={() => handleQuestionClick(pair.id)}
              disabled={!!matches[pair.id]}
              whileHover={{ scale: matches[pair.id] ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full p-4 rounded-xl text-left transition-all
                ${selectedQuestion === pair.id 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : matches[pair.id] 
                    ? 'bg-success/20 text-success border-2 border-success' 
                    : 'bg-card border-2 border-border hover:border-primary/50'
                }
              `}
            >
              <span className="font-medium">{pair.question}</span>
            </motion.button>
          ))}
        </div>

        {/* Answers column */}
        <div className="space-y-3">
          <h3 className="font-semibold text-foreground text-center mb-4">Answers</h3>
          {shuffledAnswers.map((answer) => {
            const isMatched = Object.values(matches).includes(answer.id);
            return (
              <motion.button
                key={answer.id}
                onClick={() => handleAnswerClick(answer.id)}
                disabled={isMatched || !selectedQuestion}
                whileHover={{ scale: isMatched || !selectedQuestion ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full p-4 rounded-xl text-left transition-all
                  ${isMatched 
                    ? 'bg-success/20 text-success border-2 border-success opacity-60' 
                    : selectedQuestion 
                      ? 'bg-card border-2 border-primary/50 hover:bg-primary/10 cursor-pointer' 
                      : 'bg-card border-2 border-border opacity-50'
                  }
                `}
              >
                <span className="font-medium">{answer.answer}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            {allCorrect ? (
              <div className="bg-success/20 rounded-2xl p-6 border-2 border-success">
                <div className="flex items-center justify-center gap-2 text-success mb-2">
                  <Check className="w-6 h-6" />
                  <span className="font-fredoka text-xl font-bold">Excellent Work! 🎉</span>
                </div>
                <p className="text-foreground">You matched everything correctly!</p>
              </div>
            ) : (
              <div className="bg-destructive/20 rounded-2xl p-6 border-2 border-destructive">
                <div className="flex items-center justify-center gap-2 text-destructive mb-2">
                  <X className="w-6 h-6" />
                  <span className="font-fredoka text-xl font-bold">Good Try!</span>
                </div>
                <p className="text-foreground">Some matches need to be fixed. Try again!</p>
              </div>
            )}

            <div className="flex justify-center gap-4">
              {!allCorrect && (
                <Button variant="outline" onClick={handleRetry} className="gap-2 rounded-xl">
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
              )}
              <Button onClick={onComplete} className="gap-2 rounded-xl bg-gradient-primary text-primary-foreground">
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MatchingQuiz;
