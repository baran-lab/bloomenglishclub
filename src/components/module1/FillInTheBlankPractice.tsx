import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/components/LanguageContext';
import { SupportedLanguage } from '@/data/module1Data';

interface FillInBlankItem {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswers: string[];
  audioUrl?: string;
  translations: Partial<Record<SupportedLanguage, string>>;
}

interface FillInTheBlankPracticeProps {
  items: FillInBlankItem[];
  onComplete: () => void;
  title?: string;
  userName?: string;
}

export const FillInTheBlankPractice: React.FC<FillInTheBlankPracticeProps> = ({
  items,
  onComplete,
  title = "Let's Review",
  userName = '',
}) => {
  const { selectedLanguage, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const currentItem = items[currentIndex];
  const progress = ((currentIndex + 1) / items.length) * 100;
  const allComplete = currentIndex >= items.length - 1 && completedItems.has(currentItem?.id);

  const speakSentence = () => {
    const fullSentence = `${currentItem.sentenceBefore} blank ${currentItem.sentenceAfter}`;
    const utterance = new SpeechSynthesisUtterance(fullSentence);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  const checkAnswer = () => {
    const normalizedAnswer = userAnswer.trim().toLowerCase();
    const isAnswerCorrect = currentItem.correctAnswers.some(
      ans => ans.toLowerCase() === normalizedAnswer
    );
    
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setCompletedItems(prev => new Set([...prev, currentItem.id]));
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setIsCorrect(null);
      setShowTranslation(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      onComplete();
    }
  };

  const handleRetry = () => {
    setUserAnswer('');
    setIsCorrect(null);
    inputRef.current?.focus();
  };

  const congratsMessages = [
    `Great job, ${userName || 'friend'}! 🌟`,
    `Excellent, ${userName || 'friend'}! ✨`,
    `Perfect, ${userName || 'friend'}! 🎯`,
  ];

  const encourageMessages = [
    `Good try, ${userName || 'friend'}! Try again.`,
    `Almost there, ${userName || 'friend'}!`,
    `Keep practicing, ${userName || 'friend'}!`,
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">{currentIndex + 1}/{items.length}</span>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-primary" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card rounded-3xl p-6 shadow-card border border-border space-y-6"
        >
          {/* Audio button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={speakSentence}
              className="gap-2 rounded-full px-6"
            >
              <Volume2 className="w-5 h-5" />
              Listen
            </Button>
          </div>

          {/* Sentence with blank */}
          <div className="text-center py-4">
            <p className="text-xl font-medium text-foreground leading-relaxed">
              {currentItem.sentenceBefore}
              <span className="inline-block mx-2 min-w-[100px] border-b-2 border-primary pb-1">
                {isCorrect !== null ? (
                  <span className={isCorrect ? 'text-success' : 'text-destructive'}>
                    {userAnswer || '_____'}
                  </span>
                ) : '_____'}
              </span>
              {currentItem.sentenceAfter}
            </p>
          </div>

          {/* Answer input */}
          <div className="flex gap-3 max-w-md mx-auto">
            <Input
              ref={inputRef}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !isCorrect && checkAnswer()}
              placeholder="Type your answer..."
              disabled={isCorrect === true}
              className="text-center text-lg rounded-xl"
            />
            {isCorrect === null && (
              <Button onClick={checkAnswer} className="rounded-xl px-6">
                Check
              </Button>
            )}
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {isCorrect !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl text-center ${
                  isCorrect ? 'bg-success/10' : 'bg-destructive/10'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : (
                    <XCircle className="w-6 h-6 text-destructive" />
                  )}
                  <span className={`font-semibold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                    {isCorrect 
                      ? congratsMessages[Math.floor(Math.random() * congratsMessages.length)]
                      : encourageMessages[Math.floor(Math.random() * encourageMessages.length)]
                    }
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-sm text-muted-foreground">
                    Correct answers: {currentItem.correctAnswers.join(' or ')}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Translation toggle */}
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="w-full text-center text-sm text-primary hover:underline"
          >
            {showTranslation ? 'Hide translation' : 'Show translation'}
          </button>
          
          {showTranslation && (
            <p className="text-center text-muted-foreground italic">
              {currentItem.translations[selectedLanguage]}
            </p>
          )}

          {/* Navigation */}
          <div className="flex justify-center gap-3 pt-4">
            {isCorrect === false && (
              <Button variant="outline" onClick={handleRetry} className="gap-2 rounded-xl">
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
            )}
            {isCorrect === true && (
              <Button onClick={handleNext} className="gap-2 rounded-xl bg-gradient-primary">
                {allComplete ? 'Complete' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FillInTheBlankPractice;
