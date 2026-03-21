import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, RotateCcw, ArrowRight, Home, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { groceryItemsCorrectOrder } from '@/data/module5Data';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';

interface HowMuchManyDragDropProps {
  onComplete: () => void;
}

// Sequential questions in the specified order
const questionSequence = [
  { item: 'Apples', question: 'How many apples do you need?', side: 'many' as const },
  { item: 'Bananas', question: 'How many bananas do you need?', side: 'many' as const },
  { item: 'Bread', question: 'How much bread do you need?', side: 'much' as const },
  { item: 'Water', question: 'How much water do you need?', side: 'much' as const },
  { item: 'Carrots', question: 'How many carrots do you need?', side: 'many' as const },
  { item: 'Soda', question: 'How much soda do you need?', side: 'much' as const },
  { item: 'Oranges', question: 'How many oranges do you need?', side: 'many' as const },
  { item: 'Rice', question: 'How much rice do you need?', side: 'much' as const },
  { item: 'Pineapples', question: 'How many pineapples do you need?', side: 'many' as const },
  { item: 'Sugar', question: 'How much sugar do you need?', side: 'much' as const },
  { item: 'Eggs', question: 'How many eggs do you need?', side: 'many' as const },
  { item: 'Onions', question: 'How many onions do you need?', side: 'many' as const },
  { item: 'Coffee', question: 'How much coffee do you need?', side: 'much' as const },
  { item: 'Salt', question: 'How much salt do you need?', side: 'much' as const },
  { item: 'Tea', question: 'How much tea do you need?', side: 'much' as const },
  { item: 'Cheese', question: 'How much cheese do you need?', side: 'much' as const },
  { item: 'Pies', question: 'How many pies do you need?', side: 'many' as const },
  { item: 'Juice', question: 'How much juice do you need?', side: 'much' as const },
  { item: 'Potatoes', question: 'How many potatoes do you need?', side: 'many' as const },
  { item: 'Green peppers', question: 'How many green peppers do you need?', side: 'many' as const },
  { item: 'Milk', question: 'How much milk do you need?', side: 'much' as const },
  { item: 'Meat', question: 'How much meat do you need?', side: 'much' as const },
  { item: 'Cherries', question: 'How many cherries do you need?', side: 'many' as const },
  { item: 'Tomatoes', question: 'How many tomatoes do you need?', side: 'many' as const },
];

const speakSentence = (text: string): Promise<void> => {
  return new Promise((resolve) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      speechSynthesis.speak(utterance);
    } else {
      resolve();
    }
  });
};

export const HowMuchManyDragDrop: React.FC<HowMuchManyDragDropProps> = ({ onComplete }) => {
  const navigate = useNavigate();

  const allItems = groceryItemsCorrectOrder.map(g => ({
    name: g.name,
    emoji: g.emoji,
    category: g.category,
  }));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [availableItems, setAvailableItems] = useState(() =>
    [...allItems].sort(() => Math.random() - 0.5)
  );
  const [howManyItems, setHowManyItems] = useState<typeof allItems>([]);
  const [howMuchItems, setHowMuchItems] = useState<typeof allItems>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [wrongFlash, setWrongFlash] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');

  const totalItems = questionSequence.length;
  const totalPlaced = howManyItems.length + howMuchItems.length;

  // Play the current question audio
  const playCurrentQuestion = useCallback(async () => {
    if (currentQuestionIndex >= questionSequence.length) return;
    const q = questionSequence[currentQuestionIndex];
    setCurrentQuestion(q.question);
    setIsPlaying(true);
    await speakSentence(q.question);
    setIsPlaying(false);
  }, [currentQuestionIndex]);

  // Play first question on mount and each new question
  useEffect(() => {
    if (currentQuestionIndex < questionSequence.length && !isComplete) {
      const timer = setTimeout(() => playCurrentQuestion(), 500);
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex, isComplete, playCurrentQuestion]);

  const handleItemClick = (name: string) => {
    if (isPlaying) return;
    setSelectedItem(prev => prev === name ? null : name);
  };

  const handleDropZoneClick = (side: 'many' | 'much') => {
    if (!selectedItem || isPlaying) return;

    const currentQ = questionSequence[currentQuestionIndex];
    if (!currentQ) return;

    // Check if the selected item matches the current question's item
    if (selectedItem.toLowerCase() !== currentQ.item.toLowerCase()) {
      playErrorSound();
      setWrongFlash(selectedItem);
      setTimeout(() => setWrongFlash(null), 600);
      setSelectedItem(null);
      return;
    }

    // Check if dropped on the correct side
    if (side !== currentQ.side) {
      playErrorSound();
      setWrongFlash(selectedItem);
      setTimeout(() => setWrongFlash(null), 600);
      setSelectedItem(null);
      return;
    }

    // Correct!
    playSuccessSound();
    const item = availableItems.find(i => i.name.toLowerCase() === selectedItem.toLowerCase());
    if (!item) return;

    setAvailableItems(prev => prev.filter(i => i.name.toLowerCase() !== selectedItem.toLowerCase()));
    if (side === 'many') {
      setHowManyItems(prev => [...prev, item]);
    } else {
      setHowMuchItems(prev => [...prev, item]);
    }
    setSelectedItem(null);

    // Move to next question or complete
    if (currentQuestionIndex + 1 >= questionSequence.length) {
      setIsComplete(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setAvailableItems([...allItems].sort(() => Math.random() - 0.5));
    setHowManyItems([]);
    setHowMuchItems([]);
    setSelectedItem(null);
    setWrongFlash(null);
    setIsComplete(false);
    setCurrentQuestionIndex(0);
    setCurrentQuestion('');
    setIsPlaying(false);
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
        <p className="text-muted-foreground text-sm">Listen to the question and drag the correct item to the right side.</p>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${(totalPlaced / totalItems) * 100}%` }} />
      </div>

      {/* Current question display with audio */}
      {!isComplete && currentQuestionIndex < questionSequence.length && (
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accent/50 border border-border rounded-xl p-4 text-center space-y-2"
        >
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={playCurrentQuestion}
              disabled={isPlaying}
              className="rounded-full"
            >
              <Volume2 className={`w-5 h-5 ${isPlaying ? 'text-primary animate-pulse' : 'text-muted-foreground'}`} />
            </Button>
            <p className="font-fredoka text-lg font-semibold text-foreground">{currentQuestion}</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Question {currentQuestionIndex + 1} of {totalItems}
          </p>
        </motion.div>
      )}

      {/* Two-column drop zones */}
      <div className="grid grid-cols-2 gap-3">
        {/* How Many */}
        <motion.button
          onClick={() => handleDropZoneClick('many')}
          className={`p-3 rounded-xl border-2 border-dashed min-h-[200px] flex flex-col transition-all ${
            selectedItem
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
            selectedItem
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
            Items: <span className="text-sm text-muted-foreground font-normal">(listen, tap the item you hear, then tap the correct side)</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {availableItems.map(item => (
              <motion.button
                key={item.name}
                onClick={() => handleItemClick(item.name)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedItem === item.name
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : wrongFlash === item.name
                    ? 'bg-destructive/20 border border-destructive text-foreground'
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
