import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { playCorrectSound, playIncorrectSound } from '@/utils/soundEffects';

export interface VideoFillInBlankQuestion {
  videoUrl: string;
  question: string;
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswers: string[];
  options: string[];
}

interface VideoFillInBlankQuizProps {
  questions: VideoFillInBlankQuestion[];
  onComplete: () => void;
  title?: string;
}

export const VideoFillInBlankQuiz: React.FC<VideoFillInBlankQuizProps> = ({ questions, onComplete, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = questions[currentIndex];

  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setSubmitted(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  const handleOptionSelect = (option: string) => {
    if (submitted) return;
    setSelectedAnswer(option);
  };

  const handleDrop = () => {
    if (!selectedAnswer || submitted) return;
    setSubmitted(true);
    const normalizedAnswer = selectedAnswer.trim().toLowerCase();
    const correct = current.correctAnswers.some(a => a.toLowerCase() === normalizedAnswer);
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
    setSelectedAnswer(null);
    setIsCorrect(null);
    setSubmitted(false);
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
          <p className="text-sm text-muted-foreground mt-1">Listen and drag the correct preposition</p>
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
      <div className="relative rounded-2xl overflow-hidden bg-black aspect-video max-w-2xl mx-auto">
        <video
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

      {/* Fill in the blank sentence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-card rounded-xl border-2 border-border p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-lg font-medium text-foreground justify-center">
              <span>{current.sentenceBefore}</span>
              <button
                onClick={handleDrop}
                disabled={!selectedAnswer || submitted}
                className={`min-w-[140px] px-4 py-2 rounded-lg border-2 border-dashed text-center font-semibold transition-all ${
                  submitted
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                      : 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300'
                    : selectedAnswer
                      ? 'border-primary bg-primary/10 text-primary cursor-pointer'
                      : 'border-muted-foreground/30 text-muted-foreground'
                }`}
              >
                {submitted ? (isCorrect ? selectedAnswer : current.correctAnswers[0]) : selectedAnswer || '___________'}
              </button>
              <span>{current.sentenceAfter}</span>
            </div>

            {/* Drag options */}
            {!submitted && (
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                {current.options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleOptionSelect(option)}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition-all ${
                      selectedAnswer === option
                        ? 'border-primary bg-primary text-primary-foreground shadow-md'
                        : 'border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Feedback + Next */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3">
            {isCorrect ? (
              <p className="font-fredoka text-lg font-bold text-green-600 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Correct!
              </p>
            ) : (
              <p className="font-fredoka text-lg font-bold text-red-600 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> The correct answer is: "{current.correctAnswers[0]}"
              </p>
            )}
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
