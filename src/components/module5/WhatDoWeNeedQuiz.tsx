import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Home, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';

interface WhatDoWeNeedQuizProps {
  onComplete: () => void;
}

const items = [
  { id: 'carrots', label: 'Carrots', emoji: '🥕', correct: true },
  { id: 'coke', label: 'Coke', emoji: '🥤', correct: false },
  { id: 'eggs', label: 'Eggs', emoji: '🥚', correct: true },
  { id: 'coffee', label: 'Coffee', emoji: '☕', correct: false },
  { id: 'orange', label: 'Orange', emoji: '🍊', correct: true },
];

export const WhatDoWeNeedQuiz: React.FC<WhatDoWeNeedQuizProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelect = (id: string) => {
    if (submitted) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < 3) {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    const correctIds = items.filter(i => i.correct).map(i => i.id);
    const allCorrect = correctIds.every(id => selected.has(id)) && selected.size === 3;
    setIsCorrect(allCorrect);
    setSubmitted(true);
    if (allCorrect) {
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  const handleRetry = () => {
    setSelected(new Set());
    setSubmitted(false);
    setIsCorrect(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">🛒 What Do We Need?</h2>
        <p className="text-muted-foreground text-sm">Watch the video, then tap the 3 items you hear.</p>
      </div>

      <div className="rounded-2xl overflow-hidden bg-black shadow-lg">
        <video
          preload="metadata"
          ref={videoRef}
          src="/videos/module5/m5-what-do-we-need.mp4"
          controls
          className="w-full aspect-video"
          onEnded={() => setVideoEnded(true)}
        />
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
        {items.map(item => {
          const isSelected = selected.has(item.id);
          const showCorrect = submitted && item.correct;
          const showWrong = submitted && isSelected && !item.correct;

          return (
            <motion.button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                showCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : showWrong
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-card hover:bg-accent'
              }`}
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </motion.button>
          );
        })}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        {selected.size}/3 selected
      </div>

      {!submitted ? (
        <div className="flex justify-center">
          <Button onClick={handleSubmit} disabled={selected.size !== 3} className="gap-2 px-8">
            Check Answers
          </Button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-center p-6 rounded-xl border ${
              isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500'
            }`}
          >
            <div className="text-3xl mb-2">{isCorrect ? '🎉' : '🤔'}</div>
            <h3 className="font-fredoka text-lg font-bold mb-2">
              {isCorrect ? 'Great job! That was clear.' : 'Nice try! The correct items are highlighted in green.'}
            </h3>
            <div className="flex justify-center gap-3 mt-4">
              {!isCorrect && (
                <Button variant="outline" onClick={handleRetry}>Try Again</Button>
              )}
              <Button onClick={onComplete} className="gap-2">
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
