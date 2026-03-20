import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, Home, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound } from '@/utils/soundEffects';
import { VisualVocabularyItem } from '@/data/module5Data';

interface VisualVocabularyLessonProps {
  vocabulary: VisualVocabularyItem[];
  onComplete: () => void;
  title?: string;
}

const speakPhrase = (text: string) => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    speechSynthesis.speak(utterance);
  }
};

export const VisualVocabularyLesson: React.FC<VisualVocabularyLessonProps> = ({
  vocabulary,
  onComplete,
  title = 'Vocabulary',
}) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedWords, setCompletedWords] = useState<Set<number>>(new Set());

  const item = vocabulary[currentIndex];

  // Auto-play audio when card changes
  useEffect(() => {
    if (item) {
      const timer = setTimeout(() => speakPhrase(item.phrase), 400);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCompletedWords(prev => new Set([...prev, currentIndex]));
    if (currentIndex < vocabulary.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const allCompleted = completedWords.size >= vocabulary.length - 1 && currentIndex === vocabulary.length - 1;

  const handleFinish = () => {
    setCompletedWords(prev => new Set([...prev, currentIndex]));
    playSuccessSound();
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <span className="text-sm text-muted-foreground">{currentIndex + 1}/{vocabulary.length}</span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">{title}</h2>
      </div>

      {/* Progress */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${((currentIndex + 1) / vocabulary.length) * 100}%` }}
        />
      </div>

      {/* Vocabulary card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <Card className="p-8 text-center space-y-4">
            <div className="text-6xl">{item.emoji}</div>
            <h3 className="font-fredoka text-2xl font-bold text-foreground">{item.phrase}</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => speakPhrase(item.phrase)}
              className="gap-2 mx-auto"
            >
              <Volume2 className="w-4 h-4" /> Listen
            </Button>
            {completedWords.has(currentIndex) && (
              <div className="flex items-center justify-center gap-1 text-green-600 text-sm">
                <CheckCircle2 className="w-4 h-4" /> Learned
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0} className="gap-1">
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>

        {currentIndex === vocabulary.length - 1 ? (
          <Button onClick={handleFinish} className="gap-2 bg-gradient-primary text-primary-foreground">
            Complete <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-1">
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
