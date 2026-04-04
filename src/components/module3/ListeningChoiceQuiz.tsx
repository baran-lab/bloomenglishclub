import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { playCorrectSound, playIncorrectSound } from '@/utils/soundEffects';

export interface ListeningQuestion {
  videoUrl: string;
  correctAnswer: string;
  options: string[];
}

interface ListeningChoiceQuizProps {
  questions: ListeningQuestion[];
  onComplete: () => void;
  title?: string;
}

export const ListeningChoiceQuiz: React.FC<ListeningChoiceQuizProps> = ({ questions, onComplete, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = questions[currentIndex];

  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  const handleSelect = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    const correct = option === current.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(s => s + 1);
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setIsFinished(true);
      onComplete();
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  if (isFinished) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 py-12">
        <div className="text-6xl">🎉</div>
        <h2 className="font-fredoka text-2xl font-bold text-foreground">Practice Complete!</h2>
        <p className="text-muted-foreground text-lg">You got {score} out of {questions.length} correct!</p>
        <div className="w-full max-w-xs mx-auto bg-muted rounded-full h-3">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(score / questions.length) * 100}%` }} />
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h2 className="font-fredoka text-xl font-bold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">Listen and choose the sentence you hear</p>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span>Score: {score}/{questions.length}</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
      </div>

      {/* Video player */}
      <Card className="overflow-hidden">
        <div className="relative aspect-video bg-black">
          <video preload="metadata"
            ref={videoRef}
            src={current.videoUrl}
            className="w-full h-full object-contain"
            playsInline
            autoPlay
          />
          <button
            onClick={handleReplay}
            className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </Card>

      <div className="flex items-center gap-2 justify-center text-muted-foreground">
        <Volume2 className="w-4 h-4" />
        <span className="text-sm">Listen and click the sentence you hear</span>
      </div>

      {/* Answer options */}
      <div className="space-y-3 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {current.options.map((option, i) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === current.correctAnswer;
            let borderClass = 'border-border hover:border-primary/50';
            let bgClass = 'bg-card';

            if (selectedAnswer) {
              if (isCorrectOption) {
                borderClass = 'border-green-500';
                bgClass = 'bg-green-50 dark:bg-green-950/30';
              } else if (isSelected && !isCorrect) {
                borderClass = 'border-red-500';
                bgClass = 'bg-red-50 dark:bg-red-950/30';
              } else {
                borderClass = 'border-border opacity-50';
              }
            }

            return (
              <motion.button
                key={`${currentIndex}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleSelect(option)}
                disabled={!!selectedAnswer}
                className={`w-full text-left p-4 rounded-xl border-2 ${borderClass} ${bgClass} transition-all flex items-center gap-3`}
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-foreground font-medium flex-1">{option}</span>
                {selectedAnswer && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />}
                {selectedAnswer && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Feedback + Next */}
      <AnimatePresence>
        {selectedAnswer && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3">
            <p className={`font-fredoka text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '✅ Correct!' : `❌ The correct answer is: "${current.correctAnswer}"`}
            </p>
            <Button onClick={handleNext} className="gap-2 rounded-xl">
              {currentIndex < questions.length - 1 ? 'Next' : 'Finish'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
