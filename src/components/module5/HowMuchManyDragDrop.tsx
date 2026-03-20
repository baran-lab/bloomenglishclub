import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, ArrowRight, Home, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { groceryItemsCorrectOrder } from '@/data/module5Data';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';

interface HowMuchManyDragDropProps {
  onComplete: () => void;
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

export const HowMuchManyDragDrop: React.FC<HowMuchManyDragDropProps> = ({ onComplete }) => {
  const navigate = useNavigate();

  const allItems = groceryItemsCorrectOrder.map(g => ({
    name: g.name,
    emoji: g.emoji,
    category: g.category,
  }));

  const [availableItems, setAvailableItems] = useState(() =>
    [...allItems].sort(() => Math.random() - 0.5)
  );
  const [howManyItems, setHowManyItems] = useState<typeof allItems>([]);
  const [howMuchItems, setHowMuchItems] = useState<typeof allItems>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [wrongFlash, setWrongFlash] = useState<{ side: 'many' | 'much'; name: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const totalPlaced = howManyItems.length + howMuchItems.length;
  const totalItems = allItems.length;

  const handleItemClick = (name: string) => {
    setSelectedItem(prev => prev === name ? null : name);
  };

  const handleDropZoneClick = (side: 'many' | 'much') => {
    if (!selectedItem) return;

    const item = availableItems.find(i => i.name === selectedItem);
    if (!item) return;

    const correctSide = item.category === 'how-many' ? 'many' : 'much';

    if (side === correctSide) {
      playSuccessSound();
      speakWord(item.name);
      setAvailableItems(prev => prev.filter(i => i.name !== selectedItem));
      if (side === 'many') {
        setHowManyItems(prev => [...prev, item]);
      } else {
        setHowMuchItems(prev => [...prev, item]);
      }

      const newTotal = totalPlaced + 1;
      if (newTotal === totalItems) {
        setIsComplete(true);
      }
    } else {
      playErrorSound();
      setWrongFlash({ side, name: selectedItem });
      setTimeout(() => setWrongFlash(null), 600);
    }

    setSelectedItem(null);
  };

  const handleReset = () => {
    setAvailableItems([...allItems].sort(() => Math.random() - 0.5));
    setHowManyItems([]);
    setHowMuchItems([]);
    setSelectedItem(null);
    setWrongFlash(null);
    setIsComplete(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <span className="text-sm text-muted-foreground">{totalPlaced}/{totalItems} sorted</span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">How much? How many?</h2>
        <p className="text-muted-foreground text-sm">Tap an item, then tap the correct question to sort it.</p>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${(totalPlaced / totalItems) * 100}%` }} />
      </div>

      {/* Two-column drop zones */}
      <div className="grid grid-cols-2 gap-3">
        {/* How Many */}
        <motion.button
          onClick={() => handleDropZoneClick('many')}
          className={`p-3 rounded-xl border-2 border-dashed min-h-[200px] flex flex-col transition-all ${
            wrongFlash?.side === 'many'
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : selectedItem
              ? 'border-primary/60 bg-primary/5 cursor-pointer hover:bg-primary/10'
              : 'border-muted-foreground/30 bg-muted/20'
          }`}
          whileTap={selectedItem ? { scale: 0.98 } : {}}
        >
          <div className="text-center mb-2">
            <p className="font-fredoka text-sm font-bold text-foreground">How many</p>
            <p className="text-xs text-muted-foreground">________ do you need?</p>
          </div>
          <div className="flex flex-wrap gap-1 justify-center">
            {howManyItems.map(item => (
              <motion.div
                key={item.name}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center bg-green-50 dark:bg-green-900/20 border border-green-300 rounded-lg px-1.5 py-1 text-[10px]"
              >
                <span className="text-base">{item.emoji}</span>
                <span className="text-green-700 dark:text-green-300 font-medium leading-tight">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.button>

        {/* How Much */}
        <motion.button
          onClick={() => handleDropZoneClick('much')}
          className={`p-3 rounded-xl border-2 border-dashed min-h-[200px] flex flex-col transition-all ${
            wrongFlash?.side === 'much'
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : selectedItem
              ? 'border-primary/60 bg-primary/5 cursor-pointer hover:bg-primary/10'
              : 'border-muted-foreground/30 bg-muted/20'
          }`}
          whileTap={selectedItem ? { scale: 0.98 } : {}}
        >
          <div className="text-center mb-2">
            <p className="font-fredoka text-sm font-bold text-foreground">How much</p>
            <p className="text-xs text-muted-foreground">________ do you need?</p>
          </div>
          <div className="flex flex-wrap gap-1 justify-center">
            {howMuchItems.map(item => (
              <motion.div
                key={item.name}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center bg-blue-50 dark:bg-blue-900/20 border border-blue-300 rounded-lg px-1.5 py-1 text-[10px]"
              >
                <span className="text-base">{item.emoji}</span>
                <span className="text-blue-700 dark:text-blue-300 font-medium leading-tight">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.button>
      </div>

      {/* Available items */}
      {availableItems.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-fredoka text-lg font-semibold text-foreground">
            Items: <span className="text-sm text-muted-foreground font-normal">(tap an item, then tap the correct side)</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableItems.map(item => (
              <motion.button
                key={item.name}
                onClick={() => handleItemClick(item.name)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedItem === item.name
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-card border border-border text-foreground hover:bg-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{item.emoji}</span>
                <span>{item.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center gap-3 pt-2">
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="w-4 h-4" /> Reset
        </Button>
      </div>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4 p-6 bg-accent rounded-xl border border-border"
          >
            <div className="text-4xl">🎉</div>
            <h3 className="font-fredoka text-xl font-bold text-primary">All items sorted correctly!</h3>
            <p className="text-muted-foreground">Great job understanding countable and uncountable nouns!</p>
            <Button onClick={onComplete} className="gap-2">
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
