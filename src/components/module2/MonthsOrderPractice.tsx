import React, { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { CheckCircle2, Shuffle, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VocabularyItem } from '@/data/module1Data';
import { playCorrectSound, playIncorrectSound } from '@/utils/soundEffects';

interface MonthsOrderPracticeProps {
  months: VocabularyItem[];
  onComplete: () => void;
}

export const MonthsOrderPractice: React.FC<MonthsOrderPracticeProps> = ({ months, onComplete }) => {
  const [shuffledMonths, setShuffledMonths] = useState<VocabularyItem[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    shuffleMonths();
  }, []);

  const shuffleMonths = () => {
    const shuffled = [...months].sort(() => Math.random() - 0.5);
    setShuffledMonths(shuffled);
    setIsChecked(false);
    setIsCorrect(false);
  };

  const checkOrder = () => {
    const isInOrder = shuffledMonths.every((month, index) => month.id === months[index].id);
    setIsChecked(true);
    setIsCorrect(isInOrder);
    setAttempts(prev => prev + 1);
    
    if (isInOrder) {
      playCorrectSound();
    } else {
      playIncorrectSound();
    }
  };

  const getCorrectPosition = (monthId: string): number => {
    return months.findIndex(m => m.id === monthId) + 1;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">Put the Months in Order 📅</h2>
        <p className="text-muted-foreground">Drag and drop to arrange the months from January to December</p>
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 rounded-xl p-4 text-center">
        <p className="text-sm text-muted-foreground">
          <GripVertical className="w-4 h-4 inline-block mr-1" />
          Drag the months to put them in the correct order
        </p>
      </div>

      {/* Months List */}
      <Reorder.Group 
        axis="y" 
        values={shuffledMonths} 
        onReorder={setShuffledMonths}
        className="space-y-2"
      >
        {shuffledMonths.map((month, index) => (
          <Reorder.Item
            key={month.id}
            value={month}
            className={`
              bg-card rounded-xl border-2 p-4 cursor-grab active:cursor-grabbing
              flex items-center gap-3 transition-colors
              ${isChecked 
                ? month.id === months[index].id
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-red-500 bg-red-500/10'
                : 'border-border hover:border-primary/50'
              }
            `}
          >
            <GripVertical className="w-5 h-5 text-muted-foreground" />
            <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">
              {index + 1}
            </span>
            <span className="font-medium text-lg flex-1">{month.english}</span>
            {isChecked && (
              <span className={`text-sm ${month.id === months[index].id ? 'text-green-600' : 'text-red-600'}`}>
                {month.id === months[index].id 
                  ? <CheckCircle2 className="w-5 h-5" />
                  : `Should be #${getCorrectPosition(month.id)}`
                }
              </span>
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Feedback */}
      {isChecked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center p-6 rounded-xl ${isCorrect ? 'bg-green-500/20' : 'bg-amber-500/20'}`}
        >
          {isCorrect ? (
            <>
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-lg font-bold text-green-600">Perfect! All months are in the correct order!</p>
            </>
          ) : (
            <>
              <p className="text-lg font-bold text-amber-600">
                Not quite right. Keep trying!
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Check the numbers on the right to see the correct positions.
              </p>
            </>
          )}
        </motion.div>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={shuffleMonths} className="gap-2">
          <Shuffle className="w-4 h-4" />
          Shuffle
        </Button>
        
        {!isChecked ? (
          <Button onClick={checkOrder}>
            Check Order
          </Button>
        ) : isCorrect ? (
          <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600 gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Complete
          </Button>
        ) : (
          <Button onClick={() => {
            setIsChecked(false);
            setIsCorrect(false);
          }}>
            Try Again
          </Button>
        )}
      </div>

      {/* Attempts counter */}
      {attempts > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Attempts: {attempts}
        </p>
      )}
    </div>
  );
};
