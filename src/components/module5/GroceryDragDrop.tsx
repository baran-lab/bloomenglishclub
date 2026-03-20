import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, ArrowRight, Home, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { groceryItemsCorrectOrder } from '@/data/module5Data';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';

interface GroceryDragDropProps {
  onComplete: () => void;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const speakWord = (word: string) => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }
};

export const GroceryDragDrop: React.FC<GroceryDragDropProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const correctOrder = groceryItemsCorrectOrder.map(g => g.name.toLowerCase());

  const [userSlots, setUserSlots] = useState<(string | null)[]>(Array(24).fill(null));
  const [availableWords, setAvailableWords] = useState<string[]>(() =>
    shuffleArray(groceryItemsCorrectOrder.map(g => g.name))
  );
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [correctSlots, setCorrectSlots] = useState<Set<number>>(new Set());
  const [wrongSlots, setWrongSlots] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<{ idx: number; correct: boolean } | null>(null);

  const handleWordClick = (word: string) => {
    setSelectedWord(prev => prev === word ? null : word);
  };

  const handleSlotClick = (index: number) => {
    if (correctSlots.has(index)) return;

    // If slot already has a word, put it back
    if (userSlots[index] !== null) {
      const word = userSlots[index]!;
      setAvailableWords(prev => [...prev, word]);
      setUserSlots(prev => {
        const n = [...prev];
        n[index] = null;
        return n;
      });
      setWrongSlots(prev => {
        const n = new Set(prev);
        n.delete(index);
        return n;
      });
      return;
    }

    // Place selected word and check immediately
    if (selectedWord) {
      const isCorrect = selectedWord.toLowerCase() === correctOrder[index];
      
      if (isCorrect) {
        setUserSlots(prev => {
          const n = [...prev];
          n[index] = selectedWord;
          return n;
        });
        setAvailableWords(prev => prev.filter(w => w !== selectedWord));
        setCorrectSlots(prev => {
          const n = new Set(prev);
          n.add(index);
          return n;
        });
        playSuccessSound();
        speakWord(selectedWord);
        setLastFeedback({ idx: index, correct: true });
        
        // Check if all done
        const newCorrectCount = correctSlots.size + 1;
        if (newCorrectCount === 24) {
          setIsComplete(true);
        }
      } else {
        // Wrong placement - show briefly then return
        setUserSlots(prev => {
          const n = [...prev];
          n[index] = selectedWord;
          return n;
        });
        setAvailableWords(prev => prev.filter(w => w !== selectedWord));
        setWrongSlots(prev => {
          const n = new Set(prev);
          n.add(index);
          return n;
        });
        playErrorSound();
        setLastFeedback({ idx: index, correct: false });
        
        // Return the word after a short delay
        const wordToReturn = selectedWord;
        setTimeout(() => {
          setUserSlots(prev => {
            const n = [...prev];
            if (n[index] === wordToReturn) {
              n[index] = null;
            }
            return n;
          });
          setWrongSlots(prev => {
            const n = new Set(prev);
            n.delete(index);
            return n;
          });
          setAvailableWords(prev => [...prev, wordToReturn]);
        }, 800);
      }
      
      setSelectedWord(null);
      setTimeout(() => setLastFeedback(null), 1200);
    }
  };

  const handleReset = () => {
    setUserSlots(Array(24).fill(null));
    setAvailableWords(shuffleArray(groceryItemsCorrectOrder.map(g => g.name)));
    setSelectedWord(null);
    setCorrectSlots(new Set());
    setWrongSlots(new Set());
    setIsComplete(false);
    setLastFeedback(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <span className="text-sm text-muted-foreground">{correctSlots.size}/24 matched</span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">🛒 Grocery Items</h2>
        <p className="text-muted-foreground text-sm">Tap a word, then tap the matching item to place it.</p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${(correctSlots.size / 24) * 100}%` }}
        />
      </div>

      {/* Drop slots grid with emoji visuals */}
      <div className="space-y-2">
        <h3 className="font-fredoka text-lg font-semibold text-foreground">
          Match the names to the items:
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {userSlots.map((word, idx) => {
            const correctItem = groceryItemsCorrectOrder[idx];
            const isCorrectSlot = correctSlots.has(idx);
            const isWrongSlot = wrongSlots.has(idx);

            return (
              <motion.button
                key={idx}
                onClick={() => handleSlotClick(idx)}
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg border-2 min-h-[80px] text-xs font-medium transition-all ${
                  isCorrectSlot
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700'
                    : isWrongSlot
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 animate-shake'
                    : word
                    ? 'border-primary bg-primary/10 text-primary'
                    : selectedWord
                    ? 'border-primary/50 bg-primary/5 cursor-pointer hover:bg-primary/10 border-dashed'
                    : 'border-muted-foreground/30 bg-muted/30 text-muted-foreground border-dashed'
                }`}
                whileHover={!isCorrectSlot ? { scale: 1.02 } : {}}
                whileTap={!isCorrectSlot ? { scale: 0.98 } : {}}
              >
                <span className="text-2xl mb-0.5">{correctItem.emoji}</span>
                {isCorrectSlot && word ? (
                  <span className="text-center leading-tight font-semibold">{word}</span>
                ) : word ? (
                  <span className="text-center leading-tight">{word}</span>
                ) : (
                  <span className="text-muted-foreground/50 text-[10px]">?</span>
                )}
                {isCorrectSlot && (
                  <CheckCircle2 className="absolute top-0.5 right-0.5 w-3.5 h-3.5 text-green-600" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Available words */}
      {availableWords.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-fredoka text-lg font-semibold text-foreground">
            Available words: <span className="text-sm text-muted-foreground font-normal">(tap a word, then tap an item)</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableWords.map((word) => (
              <motion.button
                key={word}
                onClick={() => handleWordClick(word)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedWord === word
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-card border border-border text-foreground hover:bg-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {word}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-center gap-3 pt-4">
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" /> Reset
        </Button>
      </div>

      {/* Completion */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 p-6 bg-accent rounded-xl border border-border"
          >
            <div className="text-4xl">🎉</div>
            <h3 className="font-fredoka text-xl font-bold text-primary">
              All grocery items matched!
            </h3>
            <p className="text-muted-foreground">Great job learning the grocery items!</p>
            <Button onClick={onComplete} className="gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
