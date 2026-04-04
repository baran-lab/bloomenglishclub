import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Volume2, RotateCcw, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound, playRecordingSuccessSound } from '@/utils/soundEffects';
import { speakText } from '@/utils/speechUtils';

export interface SentenceOrderItem {
  correctSentence: string;
  jumbledWords: string[];
}

interface SentenceOrderPracticeProps {
  sentences: SentenceOrderItem[];
  onComplete: () => void;
  title?: string;
}

const speakSentence = (text: string) => {
    speakText(text, 0.7);
  };

export const SentenceOrderPractice: React.FC<SentenceOrderPracticeProps> = ({
  sentences,
  onComplete,
  title = 'How much? How many? Practice',
}) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [hasListened, setHasListened] = useState(false);

  const sentence = sentences[currentIndex];

  useEffect(() => {
    if (sentence) {
      setAvailableWords([...sentence.jumbledWords]);
      setSelectedWords([]);
      setShowResult(false);
      setIsCorrect(false);
      setHasListened(false);
    }
  }, [currentIndex]);

  // Auto-play the sentence audio
  useEffect(() => {
    if (sentence) {
      const timer = setTimeout(() => {
        speakSentence(sentence.correctSentence);
        setHasListened(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const handleWordClick = (word: string, index: number) => {
    if (showResult) return;
    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);
    setAvailableWords(newAvailable);
    setSelectedWords([...selectedWords, word]);
  };

  const handleSelectedWordClick = (word: string, index: number) => {
    if (showResult) return;
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setAvailableWords([...availableWords, word]);
  };

  const handleCheckAnswer = () => {
    const userSentence = selectedWords.join(' ');
    const correct = userSentence.toLowerCase() === sentence.correctSentence.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playRecordingSuccessSound();
      setCompletedCount(prev => prev + 1);
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      playSuccessSound();
      onComplete();
    }
  };

  useEffect(() => {
    if (showResult && isCorrect) {
      const timer = setTimeout(handleNext, 1500);
      return () => clearTimeout(timer);
    }
  }, [showResult, isCorrect]);

  const handleTryAgain = () => {
    setAvailableWords([...sentence.jumbledWords]);
    setSelectedWords([]);
    setShowResult(false);
    setIsCorrect(false);
  };

  const handleReplay = () => {
    speakSentence(sentence.correctSentence);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <span className="text-sm text-muted-foreground">{currentIndex + 1}/{sentences.length}</span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">🎧 {title}</h2>
        <p className="text-muted-foreground text-sm">Listen to the sentence and put the words in the correct order.</p>
      </div>

      {/* Progress */}
      <div className="flex gap-1">
        {sentences.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < completedCount ? 'bg-green-500' : i === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Audio play button */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={handleReplay}
          className="gap-3 rounded-full px-8"
        >
          <Volume2 className="w-6 h-6 text-primary" />
          Listen Again
        </Button>
      </div>

      {/* Word ordering area */}
      <Card className="p-5">
        <h4 className="text-base font-medium mb-3 text-foreground">Put the words in the correct order:</h4>

        {/* Selected words */}
        <div className="min-h-14 p-3 bg-muted/50 rounded-lg border-2 border-dashed border-border mb-4 flex flex-wrap gap-2">
          {selectedWords.length === 0 ? (
            <span className="text-muted-foreground text-sm">Tap the words below...</span>
          ) : (
            selectedWords.map((word, i) => (
              <motion.button
                key={`sel-${i}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => handleSelectedWordClick(word, i)}
                disabled={showResult}
                className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
                  showResult
                    ? isCorrect
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {word}
              </motion.button>
            ))
          )}
        </div>

        {/* Available words */}
        <div className="flex flex-wrap gap-2 mb-4">
          {availableWords.map((word, i) => (
            <motion.button
              key={`avail-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => handleWordClick(word, i)}
              disabled={showResult}
              className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm hover:bg-secondary/80 transition-colors"
            >
              {word}
            </motion.button>
          ))}
        </div>

        {/* Check / Result */}
        {!showResult ? (
          <Button onClick={handleCheckAnswer} disabled={selectedWords.length === 0} className="w-full">
            Check Answer
          </Button>
        ) : isCorrect ? (
          <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-green-700 dark:text-green-300 font-medium flex items-center gap-2 text-sm">
              <Check className="h-4 w-4" />
              Correct! "{sentence.correctSentence}"
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-red-700 dark:text-red-300 font-medium flex items-center gap-2 text-sm">
                <X className="h-4 w-4" />
                The correct answer: "{sentence.correctSentence}"
              </p>
            </div>
            <Button onClick={handleTryAgain} variant="outline" className="w-full gap-2">
              <RotateCcw className="h-4 w-4" /> Try Again
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
