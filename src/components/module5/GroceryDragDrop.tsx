import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, ArrowRight, Home, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { groceryItemsCorrectOrder } from '@/data/module5Data';
import { useNavigate } from 'react-router-dom';

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

const playCorrectSound = () => {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    gain.gain.value = 0.1;
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {}
};

export const GroceryDragDrop: React.FC<GroceryDragDropProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const correctOrder = groceryItemsCorrectOrder.map(g => g.name.toLowerCase());

  const [userSlots, setUserSlots] = useState<(string | null)[]>(Array(24).fill(null));
  const [availableWords, setAvailableWords] = useState<string[]>(() =>
    shuffleArray(groceryItemsCorrectOrder.map(g => g.name))
  );
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [correctSlots, setCorrectSlots] = useState<Set<number>>(new Set());
  const [wrongSlots, setWrongSlots] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  const handleWordClick = (word: string) => {
    if (isChecked) return;
    setSelectedWord(prev => prev === word ? null : word);
  };

  const handleSlotClick = (index: number) => {
    if (isChecked) return;

    // If slot already has a word, put it back
    if (userSlots[index] !== null) {
      const word = userSlots[index]!;
      setAvailableWords(prev => [...prev, word]);
      setUserSlots(prev => {
        const n = [...prev];
        n[index] = null;
        return n;
      });
      return;
    }

    // Place selected word
    if (selectedWord) {
      setUserSlots(prev => {
        const n = [...prev];
        n[index] = selectedWord;
        return n;
      });
      setAvailableWords(prev => prev.filter(w => w !== selectedWord));
      setSelectedWord(null);
    }
  };

  const handleCheck = () => {
    const correct = new Set<number>();
    const wrong = new Set<number>();
    userSlots.forEach((word, idx) => {
      if (word === null) return;
      if (word.toLowerCase() === correctOrder[idx]) {
        correct.add(idx);
      } else {
        wrong.add(idx);
      }
    });
    setCorrectSlots(correct);
    setWrongSlots(wrong);
    setIsChecked(true);

    if (correct.size === 24) {
      playCorrectSound();
      setIsComplete(true);
    }
  };

  const handleRetry = () => {
    // Put wrong answers back into available
    const returnWords: string[] = [];
    const newSlots = [...userSlots];
    wrongSlots.forEach(idx => {
      if (newSlots[idx]) {
        returnWords.push(newSlots[idx]!);
        newSlots[idx] = null;
      }
    });
    setUserSlots(newSlots);
    setAvailableWords(prev => shuffleArray([...prev, ...returnWords]));
    setCorrectSlots(new Set());
    setWrongSlots(new Set());
    setIsChecked(false);
  };

  const handleReset = () => {
    setUserSlots(Array(24).fill(null));
    setAvailableWords(shuffleArray(groceryItemsCorrectOrder.map(g => g.name)));
    setSelectedWord(null);
    setIsChecked(false);
    setCorrectSlots(new Set());
    setWrongSlots(new Set());
    setIsComplete(false);
  };

  const filledCount = userSlots.filter(s => s !== null).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <span className="text-sm text-muted-foreground">{filledCount}/24 placed</span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">🛒 Grocery Items</h2>
        <p className="text-muted-foreground text-sm">Look at the image and drag the correct names to match each item.</p>
      </div>

      {/* Reference image */}
      <Card className="overflow-hidden">
        <img
          src="/images/module5/grocery-items.jpg"
          alt="Grocery items reference"
          className="w-full h-auto"
        />
      </Card>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${(correctSlots.size / 24) * 100}%` }}
        />
      </div>

      {/* Drop slots grid */}
      <div className="space-y-2">
        <h3 className="font-fredoka text-lg font-semibold text-foreground">
          Place the names in the correct order:
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
                className={`relative flex flex-col items-center justify-center p-2 rounded-lg border-2 border-dashed min-h-[70px] text-xs font-medium transition-all ${
                  isCorrectSlot
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : isWrongSlot
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : word
                    ? 'border-primary bg-primary/10 text-primary'
                    : selectedWord
                    ? 'border-primary/50 bg-primary/5 cursor-pointer hover:bg-primary/10'
                    : 'border-muted-foreground/30 bg-muted/30 text-muted-foreground'
                }`}
                whileHover={!isChecked ? { scale: 1.02 } : {}}
                whileTap={!isChecked ? { scale: 0.98 } : {}}
              >
                <span className="text-lg mb-0.5">{correctItem.emoji}</span>
                {word ? (
                  <span className="text-center leading-tight">{word}</span>
                ) : (
                  <span className="text-muted-foreground/50 text-[10px]">#{idx + 1}</span>
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
            Available words: <span className="text-sm text-muted-foreground font-normal">(tap a word, then tap a slot)</span>
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
        {!isChecked ? (
          <Button
            onClick={handleCheck}
            disabled={filledCount < 24}
            className="gap-2"
          >
            Check Answers
          </Button>
        ) : !isComplete ? (
          <Button onClick={handleRetry} className="gap-2">
            Try Again
          </Button>
        ) : null}
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
