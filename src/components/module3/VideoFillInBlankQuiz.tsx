import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { playCorrectSound, playIncorrectSound } from '@/utils/soundEffects';

export interface VideoFillInBlankQuestion {
  videoUrl: string;
  question: string;
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswers: string[];
}

interface VideoFillInBlankQuizProps {
  questions: VideoFillInBlankQuestion[];
  onComplete: () => void;
  title?: string;
}

export const VideoFillInBlankQuiz: React.FC<VideoFillInBlankQuizProps> = ({ questions, onComplete, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = questions[currentIndex];

  useEffect(() => {
    setAnswer('');
    setIsCorrect(null);
    setSubmitted(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  const handleSubmit = () => {
    if (!answer.trim() || submitted) return;
    setSubmitted(true);
    const normalizedAnswer = answer.trim().toLowerCase();
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
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !submitted) {
      handleSubmit();
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
          <p className="text-sm text-muted-foreground mt-1">Listen and write the correct preposition</p>
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

      <div className="flex items-center gap-2 justify-center text-muted-foreground">
        <Volume2 className="w-4 h-4" />
        <span className="text-sm">{current.question}</span>
      </div>

      {/* Fill in the blank */}
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
              <Input
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={submitted}
                placeholder="___________"
                className={`w-48 text-center text-lg font-semibold border-2 ${
                  submitted
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                      : 'border-red-500 bg-red-50 dark:bg-red-950/30'
                    : 'border-primary/30'
                }`}
                autoFocus
              />
              <span>{current.sentenceAfter}</span>
            </div>

            {!submitted && (
              <div className="flex justify-center">
                <Button onClick={handleSubmit} disabled={!answer.trim()} className="gap-2 rounded-xl">
                  Check Answer
                </Button>
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
