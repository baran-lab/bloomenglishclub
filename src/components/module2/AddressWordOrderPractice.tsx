import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Home, ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface AddressWordOrderPracticeProps {
  onComplete: () => void;
}

// Heba's address in correct order
const correctOrder = [
  { id: 'number', text: '456', label: 'Number' },
  { id: 'street', text: 'Oak Avenue', label: 'Street' },
  { id: 'apartment', text: 'Apartment 3A', label: 'Apartment' },
  { id: 'city', text: 'Brooklyn', label: 'City' },
  { id: 'state', text: 'New York', label: 'State' },
  { id: 'zip', text: '11201', label: 'Zip Code' },
];

// Jumbled version for the user to sort
const getShuffled = () => {
  return [...correctOrder].sort(() => Math.random() - 0.5);
};

export const AddressWordOrderPractice: React.FC<AddressWordOrderPracticeProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [shuffled, setShuffled] = useState(getShuffled);
  const [userOrder, setUserOrder] = useState<typeof correctOrder>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleWordClick = (item: typeof correctOrder[0]) => {
    if (isChecked) return;
    
    // Move from shuffled to user order
    setShuffled(prev => prev.filter(w => w.id !== item.id));
    setUserOrder(prev => [...prev, item]);
  };

  const handleUserWordClick = (item: typeof correctOrder[0]) => {
    if (isChecked) return;
    
    // Move back from user order to shuffled
    setUserOrder(prev => prev.filter(w => w.id !== item.id));
    setShuffled(prev => [...prev, item]);
  };

  const checkAnswer = () => {
    const correct = userOrder.every((item, idx) => item.id === correctOrder[idx].id);
    setIsCorrect(correct);
    setIsChecked(true);
    setAttempts(prev => prev + 1);
    
    if (correct) {
      playSuccessSound();
    }
  };

  const resetPractice = () => {
    setShuffled(getShuffled());
    setUserOrder([]);
    setIsChecked(false);
    setIsCorrect(false);
  };

  const playSuccessSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1046.5, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) { }
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">Put the Words in Order</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Arrange Heba's address in the correct order
        </p>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <p className="text-sm font-medium text-blue-700 dark:text-blue-400 text-center">
          📍 Correct Order: Number → Street → Apartment → City → State → Zip Code
        </p>
      </div>

      {/* User's arranged order */}
      <div className="bg-card rounded-2xl border-2 border-dashed border-primary/30 p-4 min-h-[120px]">
        <p className="text-xs text-muted-foreground mb-3 text-center">
          Tap words below to add them here in order:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {userOrder.map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => handleUserWordClick(item)}
              className={`
                px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2
                ${isChecked 
                  ? item.id === correctOrder[idx]?.id 
                    ? 'bg-green-500/20 border-2 border-green-500 text-green-700'
                    : 'bg-red-500/20 border-2 border-red-500 text-red-700'
                  : 'bg-primary/10 border-2 border-primary/50 hover:bg-primary/20'
                }
              `}
              disabled={isChecked}
            >
              {idx > 0 && <ArrowRight className="w-3 h-3 opacity-50" />}
              <span className="text-xs opacity-60">{idx + 1}.</span>
              {item.text}
              <span className="text-xs opacity-60">({item.label})</span>
            </motion.button>
          ))}
          {userOrder.length === 0 && (
            <p className="text-sm text-muted-foreground italic">Tap words below to arrange them...</p>
          )}
        </div>
      </div>

      {/* Available words to choose from */}
      <div className="bg-muted/50 rounded-2xl p-4">
        <p className="text-xs text-muted-foreground mb-3 text-center">Available words (tap to add):</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {shuffled.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleWordClick(item)}
              className="px-4 py-2 rounded-xl font-medium bg-card border-2 border-border hover:border-primary transition-all"
              disabled={isChecked}
            >
              {item.text}
              <span className="text-xs opacity-60 ml-1">({item.label})</span>
            </motion.button>
          ))}
          {shuffled.length === 0 && !isChecked && (
            <p className="text-sm text-muted-foreground italic">All words placed! Check your answer.</p>
          )}
        </div>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {isChecked && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl text-center ${
              isCorrect ? 'bg-green-500/10 border border-green-500/30' : 'bg-amber-500/10 border border-amber-500/30'
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="font-medium text-green-700 dark:text-green-400">🎉 Perfect! Great job!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Heba's address: 456 Oak Avenue, Apartment 3A, Brooklyn, New York, 11201
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="font-medium text-amber-700 dark:text-amber-400">
                  {attempts === 1 ? "Almost! Try again — you've got this! 💪" : "Keep trying! Remember: Number → Street → Apartment → City → State → Zip"}
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actions */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={resetPractice} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        
        {!isChecked && userOrder.length === correctOrder.length && (
          <Button onClick={checkAnswer} className="gap-2">
            Check Answer
            <CheckCircle2 className="w-4 h-4" />
          </Button>
        )}
        
        {isChecked && !isCorrect && (
          <Button onClick={resetPractice} className="gap-2">
            Try Again
            <RotateCcw className="w-4 h-4" />
          </Button>
        )}
        
        {isChecked && isCorrect && (
          <Button onClick={onComplete} className="gap-2 bg-green-500 hover:bg-green-600">
            Continue
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddressWordOrderPractice;
