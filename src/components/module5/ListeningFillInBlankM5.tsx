import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Volume2, Check, ArrowRight, ArrowLeft, Home, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';
import { speakText } from '@/utils/speechUtils';

export interface ListeningFillItem {
  id: string;
  questionAudio: string; // question to speak
  answerAudio: string; // answer to speak
  displaySentence: string; // sentence with ________ for blank
  acceptedAnswers: string[]; // accepted answers (case-insensitive)
}

interface ListeningFillInBlankM5Props {
  items: ListeningFillItem[];
  onComplete: () => void;
  title?: string;
}

const speakSentence = (text: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();
    window.speechSynthesis.speak(utterance);
  });
};

export const ListeningFillInBlankM5: React.FC<ListeningFillInBlankM5Props> = ({ items, onComplete, title = 'How much? How many? Practice' }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());
  const [hasListened, setHasListened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const currentItem = items[currentIndex];
  const progress = (completedItems.size / items.length) * 100;

  const playAudio = useCallback(async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    await speakSentence(currentItem.questionAudio);
    await new Promise(r => setTimeout(r, 600));
    await speakSentence(currentItem.answerAudio);
    setIsPlaying(false);
    setHasListened(true);
  }, [currentItem, isPlaying]);

  useEffect(() => {
    setHasListened(false);
    setAnswer('');
    setIsCorrect(null);
    setAttemptCount(0);
    setShowCorrectAnswer(false);
    const timer = setTimeout(() => playAudio(), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const checkAnswer = () => {
    const trimmed = answer.trim().toLowerCase();
    const correct = currentItem.acceptedAnswers.some(a => a.toLowerCase() === trimmed);
    setIsCorrect(correct);
    if (correct) {
      playSuccessSound();
      setCompletedItems(prev => new Set(prev).add(currentIndex));
    } else {
      playErrorSound();
      const newAttempt = attemptCount + 1;
      setAttemptCount(newAttempt);
      if (newAttempt >= 2) {
        setShowCorrectAnswer(true);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleRetry = () => {
    setAnswer('');
    setIsCorrect(null);
  };

  // Split the display sentence around the blank
  const parts = currentItem.displaySentence.split('________');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <span className="text-sm font-medium text-muted-foreground">{currentIndex + 1}/{items.length}</span>
      </div>

      <div className="text-center">
        <h2 className="font-fredoka text-xl font-bold text-foreground">{title}</h2>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${progress}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="space-y-6"
        >
          {/* Listen button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={playAudio}
              disabled={isPlaying}
              className="gap-3 text-lg px-8 py-6 rounded-xl"
            >
              <Volume2 className={`w-6 h-6 ${isPlaying ? 'text-primary animate-pulse' : 'text-primary'}`} />
              {isPlaying ? 'Listening...' : 'Listen'}
            </Button>
          </div>

          {/* Sentence with blank */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <p className="text-xl font-medium text-foreground leading-relaxed">
              {parts[0]}
              {isCorrect ? (
                <span className="inline-block mx-1 px-3 py-1 bg-primary/10 text-primary rounded-lg font-bold">{answer}</span>
              ) : (
                <Input
                  value={answer}
                  onChange={e => setAnswer(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && answer.trim() && checkAnswer()}
                  placeholder="________"
                  className="inline-block w-32 mx-1 text-center text-lg font-bold border-b-2 border-primary bg-transparent"
                  disabled={isCorrect === true}
                />
              )}
              {parts[1]}
            </p>
          </div>

          {/* Feedback */}
          {isCorrect === true && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Check className="w-6 h-6" />
                <span className="font-bold text-lg">Correct! 🎉</span>
              </div>
            </motion.div>
          )}

          {isCorrect === false && !showCorrectAnswer && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-3">
              <p className="text-destructive font-medium">Try again! Listen carefully. 🔊</p>
              <Button variant="outline" onClick={handleRetry} size="sm">Try Again</Button>
            </motion.div>
          )}

          {showCorrectAnswer && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-3">
              <p className="text-destructive font-medium">The correct answer is:</p>
              <p className="text-xl font-bold text-primary">{currentItem.acceptedAnswers[0]}</p>
            </motion.div>
          )}

          {/* Check / Next buttons */}
          <div className="flex justify-center gap-3">
            {isCorrect !== true && !showCorrectAnswer && (
              <Button onClick={checkAnswer} disabled={!answer.trim()} className="gap-2 px-8">
                <Check className="w-4 h-4" /> Check
              </Button>
            )}
            {(isCorrect === true || showCorrectAnswer) && (
              <Button onClick={handleNext} className="gap-2 px-8 bg-gradient-primary text-primary-foreground">
                {currentIndex < items.length - 1 ? (
                  <>Next <ArrowRight className="w-4 h-4" /></>
                ) : (
                  <>Complete <Star className="w-4 h-4" /></>
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
