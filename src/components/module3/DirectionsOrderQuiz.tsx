import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Play, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { playCorrectSound, playIncorrectSound } from '@/utils/soundEffects';

export interface DirectionStep {
  id: string;
  videoUrl: string;
  text: string;
}

interface DirectionsOrderQuizProps {
  steps: DirectionStep[];
  onComplete: () => void;
  title?: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const DirectionsOrderQuiz: React.FC<DirectionsOrderQuizProps> = ({ steps, onComplete, title }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const step = steps[currentStep];
  const correctWords = step?.text.replace(/\.$/, '').split(' ') || [];

  useEffect(() => {
    if (step) {
      const words = step.text.replace(/\.$/, '').split(' ');
      setAvailableWords(shuffleArray(words));
      setSelectedWords([]);
      setShowResult(false);
      setIsCorrect(false);
      setHasWatched(false);
      setVideoPlaying(false);
    }
  }, [currentStep]);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setVideoPlaying(false);
    setHasWatched(true);
  };

  const handleWordClick = (word: string, index: number) => {
    if (showResult) return;
    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);
    setAvailableWords(newAvailable);
    setSelectedWords([...selectedWords, word]);
  };

  const handleSelectedWordClick = (word: string, index: number) => {
    if (showResult) return;
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setAvailableWords([...availableWords, word]);
  };

  const handleCheck = () => {
    const userSentence = selectedWords.join(' ').toLowerCase();
    const correctSentence = correctWords.join(' ').toLowerCase();
    const correct = userSentence === correctSentence;
    setIsCorrect(correct);
    setShowResult(true);
    if (correct) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleRetry = () => {
    const words = step.text.replace(/\.$/, '').split(' ');
    setAvailableWords(shuffleArray(words));
    setSelectedWords([]);
    setShowResult(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    if (showResult && isCorrect) {
      // Auto-play the video after correct answer, then advance
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
          setVideoPlaying(true);
          // After video ends, advance to next
          const onEnded = () => {
            videoRef.current?.removeEventListener('ended', onEnded);
            handleNext();
          };
          videoRef.current.addEventListener('ended', onEnded);
        } else {
          handleNext();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showResult, isCorrect]);

  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">Listen and put the words in the correct order</p>
        </div>
      )}

      {/* Progress */}
      <div className="flex gap-1">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < currentStep ? 'bg-green-500' : i === currentStep ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-center text-muted-foreground">
        Direction {currentStep + 1} of {steps.length}
      </p>

      {/* Video */}
      <Card className="overflow-hidden">
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            key={step?.videoUrl}
            src={step?.videoUrl}
            className="w-full h-full object-contain"
            onEnded={handleVideoEnd}
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            playsInline
          />
          {!videoPlaying && (
            <button
              onClick={handlePlayVideo}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
            </button>
          )}
        </div>
        <div className="p-3 flex justify-end">
          <Button variant="outline" size="sm" onClick={handlePlayVideo} className="gap-2">
            <Volume2 className="w-4 h-4" /> Replay
          </Button>
        </div>
      </Card>

      {/* Word ordering section */}
      <AnimatePresence mode="wait">
        {hasWatched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6">
              <h4 className="text-lg font-medium mb-4">Put the words in the correct order:</h4>

              {/* Selected words area */}
              <div className="min-h-16 p-4 bg-muted/50 rounded-lg border-2 border-dashed border-border mb-4 flex flex-wrap gap-2">
                {selectedWords.length === 0 ? (
                  <span className="text-muted-foreground text-sm">Tap the words below to build the sentence...</span>
                ) : (
                  selectedWords.map((word, index) => (
                    <motion.button
                      key={`sel-${index}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => handleSelectedWordClick(word, index)}
                      disabled={showResult}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        showResult
                          ? isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {word}
                    </motion.button>
                  ))
                )}
              </div>

              {/* Available words */}
              <div className="flex flex-wrap gap-2 mb-6">
                {availableWords.map((word, index) => (
                  <motion.button
                    key={`avail-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => handleWordClick(word, index)}
                    disabled={showResult}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                  >
                    {word}
                  </motion.button>
                ))}
              </div>

              {/* Actions */}
              {!showResult ? (
                <Button onClick={handleCheck} disabled={selectedWords.length === 0} className="w-full">
                  Check Answer
                </Button>
              ) : isCorrect ? (
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-green-700 dark:text-green-300 font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Correct! "{step.text}" {currentStep < steps.length - 1 && 'Moving to next...'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-red-700 dark:text-red-300 font-medium flex items-center gap-2">
                      <XCircle className="h-5 w-5" />
                      Not quite. The correct answer is: "{step.text}"
                    </p>
                  </div>
                  <Button onClick={handleRetry} variant="outline" className="w-full gap-2">
                    <RotateCcw className="h-4 w-4" /> Try Again
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!hasWatched && (
        <Card className="p-6 text-center">
          <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Watch the video above, then put the words in order.</p>
        </Card>
      )}
    </div>
  );
};
