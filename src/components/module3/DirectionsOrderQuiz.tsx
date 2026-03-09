import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, GripVertical, Play, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

export const DirectionsOrderQuiz: React.FC<DirectionsOrderQuizProps> = ({ steps, onComplete, title }) => {
  const [phase, setPhase] = useState<'watch' | 'order'>('watch');
  const [currentVideo, setCurrentVideo] = useState(0);
  const [shuffledSteps, setShuffledSteps] = useState<DirectionStep[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startOrdering = () => {
    const shuffled = [...steps].sort(() => Math.random() - 0.5);
    // Ensure it's actually shuffled
    if (shuffled.every((s, i) => s.id === steps[i].id)) {
      shuffled.reverse();
    }
    setShuffledSteps(shuffled);
    setPhase('order');
  };

  const handleVideoEnd = () => {
    setVideoPlaying(false);
    if (currentVideo < steps.length - 1) {
      setCurrentVideo(prev => prev + 1);
    }
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  const handleReplayAll = () => {
    setCurrentVideo(0);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setVideoPlaying(true);
      }
    }, 100);
  };

  const checkOrder = () => {
    const correct = shuffledSteps.every((step, index) => step.id === steps[index].id);
    setIsChecked(true);
    setIsCorrect(correct);
    setAttempts(prev => prev + 1);
    if (correct) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const resetQuiz = () => {
    const shuffled = [...steps].sort(() => Math.random() - 0.5);
    if (shuffled.every((s, i) => s.id === steps[i].id)) {
      shuffled.reverse();
    }
    setShuffledSteps(shuffled);
    setIsChecked(false);
    setIsCorrect(false);
  };

  const getCorrectPosition = (stepId: string): number => {
    return steps.findIndex(s => s.id === stepId) + 1;
  };

  if (phase === 'watch') {
    return (
      <div className="space-y-6">
        {title && (
          <div className="text-center">
            <h2 className="text-xl font-bold text-primary">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">Watch and listen to the directions, then put them in order</p>
          </div>
        )}

        <div className="bg-card rounded-2xl overflow-hidden shadow-lg max-w-lg mx-auto">
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              key={steps[currentVideo]?.videoUrl}
              src={steps[currentVideo]?.videoUrl}
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
          <div className="p-4 text-center">
            <p className="font-semibold text-foreground">{steps[currentVideo]?.text}</p>
            <p className="text-xs text-muted-foreground mt-1">Video {currentVideo + 1} of {steps.length}</p>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i <= currentVideo ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="flex justify-center gap-3">
          {currentVideo > 0 && (
            <Button variant="outline" onClick={handleReplayAll} className="gap-2">
              <RotateCw className="w-4 h-4" />
              Replay All
            </Button>
          )}
          {currentVideo === steps.length - 1 && !videoPlaying && (
            <Button onClick={startOrdering} className="gap-2">
              Start Ordering
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">Drag and drop the directions into the correct order</p>
        </div>
      )}

      <Reorder.Group
        axis="y"
        values={shuffledSteps}
        onReorder={isChecked ? () => {} : setShuffledSteps}
        className="space-y-2 max-w-lg mx-auto"
      >
        {shuffledSteps.map((step, index) => {
          const isInCorrectPosition = isChecked && step.id === steps[index].id;
          const isInWrongPosition = isChecked && step.id !== steps[index].id;

          return (
            <Reorder.Item
              key={step.id}
              value={step}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-colors ${
                isInCorrectPosition
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/30'
                  : isInWrongPosition
                  ? 'border-red-400 bg-red-50 dark:bg-red-950/30'
                  : 'border-border bg-card hover:border-primary/50'
              } ${!isChecked ? 'cursor-grab active:cursor-grabbing' : ''}`}
              drag={!isChecked ? 'y' : false}
            >
              <div className="flex items-center gap-3 flex-1">
                {!isChecked && <GripVertical className="w-5 h-5 text-muted-foreground" />}
                {isInCorrectPosition && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {isInWrongPosition && <XCircle className="w-5 h-5 text-red-500" />}
                <span className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <span className="font-medium text-foreground">{step.text}</span>
              </div>
              {isInWrongPosition && (
                <span className="text-xs text-red-500 font-medium">→ #{getCorrectPosition(step.id)}</span>
              )}
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      <AnimatePresence>
        {isChecked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center p-4 rounded-xl max-w-lg mx-auto ${
              isCorrect ? 'bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300'
            }`}
          >
            {isCorrect ? '🎉 Great job! You got the correct order!' : '❌ Not quite. Check the numbers and try again.'}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center gap-3">
        {!isChecked && (
          <Button onClick={checkOrder}>Check Order</Button>
        )}
        {isChecked && !isCorrect && (
          <Button onClick={resetQuiz} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        )}
        {isChecked && isCorrect && (
          <Button onClick={onComplete}>Continue</Button>
        )}
      </div>

      {attempts > 0 && (
        <p className="text-center text-xs text-muted-foreground">Attempts: {attempts}</p>
      )}
    </div>
  );
};
