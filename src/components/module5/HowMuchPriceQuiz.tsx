import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';

interface HowMuchPriceQuizProps {
  onComplete: () => void;
}

const questions = [
  {
    video: '/videos/module5/m5-how-much-soda.mp4',
    item: 'Soda',
    options: ['one dollar and ninety-nine cents', 'one ninety-nine'],
    correct: 0,
  },
  {
    video: '/videos/module5/m5-how-much-juice.mp4',
    item: 'Juice',
    options: ['two forty-nine', 'two dollars and forty-nine cents'],
    correct: 1,
  },
  {
    video: '/videos/module5/m5-how-much-milk.mp4',
    item: 'Milk',
    options: ['one ninety-nine', 'one dollar and ninety-nine cents'],
    correct: 1,
  },
  {
    video: '/videos/module5/m5-how-much-meat.mp4',
    item: 'Meat',
    options: ['six forty-nine', 'six dollars and forty-nine cents'],
    correct: 0,
  },
  {
    video: '/videos/module5/m5-how-much-bread.mp4',
    item: 'Bread',
    options: ['one dollar and nine cents', 'one dollar and ninety cents'],
    correct: 0,
  },
  {
    video: '/videos/module5/m5-how-much-flour.mp4',
    item: 'Flour',
    options: ['one dollar and eighty-nine cents', 'one eighty-nine'],
    correct: 1,
  },
  {
    video: '/videos/module5/m5-how-much-sugar.mp4',
    item: 'Sugar',
    options: ['one seventy-nine', 'one dollar and seventy-nine cents'],
    correct: 0,
  },
  {
    video: '/videos/module5/m5-how-much-cheese.mp4',
    item: 'Cheese',
    options: ['thirty dollars', 'three dollars'],
    correct: 1,
  },
  {
    video: '/videos/module5/m5-how-much-rice.mp4',
    item: 'Rice',
    options: ['one dollar and eighty-nine cents', 'one eighty-nine'],
    correct: 0,
  },
  {
    video: '/videos/module5/m5-how-much-tea.mp4',
    item: 'Tea',
    options: ['four dollars and forty-nine', 'four forty-nine'],
    correct: 1,
  },
  {
    video: '/videos/module5/m5-how-much-water.mp4',
    item: 'Water',
    options: ['seven cents', 'seventy-nine cents'],
    correct: 1,
  },
  {
    video: '/videos/module5/m5-how-much-onions.mp4',
    item: 'Onions',
    options: ['ninety-nine cents', 'ninety cents'],
    correct: 0,
  },
  {
    video: '/videos/module5/m5-how-much-oranges.mp4',
    item: 'Oranges',
    options: ['one twenty-nine', 'one dollar and twenty-nine cents'],
    correct: 1,
  },
  {
    video: '/videos/module5/m5-how-much-bananas.mp4',
    item: 'Bananas',
    options: ['one twenty-nine', 'one dollar and twenty-nine cents'],
    correct: 0,
  },
];

export const HowMuchPriceQuiz: React.FC<HowMuchPriceQuizProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const q = questions[currentIdx];

  const handleSelect = (optIdx: number) => {
    if (showResult) return;
    setSelected(optIdx);
    setShowResult(true);
    if (optIdx === q.correct) {
      playSuccessSound();
      setCorrectCount(prev => prev + 1);
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 p-6 bg-accent rounded-xl border border-border">
          <div className="text-4xl">🎉</div>
          <h3 className="font-fredoka text-xl font-bold text-primary">
            {correctCount}/{questions.length} correct!
          </h3>
          <p className="text-muted-foreground">Great job learning prices!</p>
          <Button onClick={onComplete} className="gap-2">Continue <ArrowRight className="w-4 h-4" /></Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <span className="text-sm text-muted-foreground">{currentIdx + 1}/{questions.length}</span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">💲 How Much?</h2>
        <p className="text-muted-foreground text-sm">Watch the video and tap the price you hear.</p>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full"
          animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="rounded-2xl overflow-hidden bg-black shadow-lg">
        <video ref={videoRef} src={q.video} controls autoPlay className="w-full aspect-video" key={q.video} />
      </div>

      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.correct;
          const isSelected = selected === idx;
          return (
            <motion.button key={idx} onClick={() => handleSelect(idx)}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all ${
                showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700'
                    : isSelected
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700'
                    : 'border-border bg-card text-foreground opacity-50'
                  : 'border-border bg-card hover:bg-accent text-foreground'
              }`}>
              <div className="flex items-center justify-between">
                <span className="capitalize">{opt}</span>
                {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              </div>
            </motion.button>
          );
        })}
      </div>

      {showResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
          <Button onClick={handleNext} className="gap-2 px-8">
            {currentIdx < questions.length - 1 ? 'Next' : 'See Results'} <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};
