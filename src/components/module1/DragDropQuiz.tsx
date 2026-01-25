import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { playSuccessSound } from '@/utils/soundEffects';

interface BlankSentence {
  id: string;
  textBefore: string;
  textAfter: string;
  correctAnswer: string;
}

interface DragDropQuizProps {
  sentences: BlankSentence[];
  words: string[];
  onComplete: () => void;
  title?: string;
  characterName?: string;
}

export const DragDropQuiz: React.FC<DragDropQuizProps> = ({
  sentences,
  words,
  onComplete,
  title = 'Complete the Sentences',
  characterName = 'Dmitry',
}) => {
  const [filledBlanks, setFilledBlanks] = useState<Record<string, string>>({});
  const [availableWords, setAvailableWords] = useState(words);
  const [showResult, setShowResult] = useState(false);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
  };

  const handleBlankClick = (sentenceId: string) => {
    if (!selectedWord) return;
    if (filledBlanks[sentenceId]) return;

    setFilledBlanks(prev => ({ ...prev, [sentenceId]: selectedWord }));
    setAvailableWords(prev => prev.filter(w => w !== selectedWord));
    setSelectedWord(null);

    // Check if complete
    if (Object.keys(filledBlanks).length + 1 === sentences.length) {
      setTimeout(() => {
        setShowResult(true);
        playSuccessSound();
      }, 500);
    }
  };

  const handleRemoveWord = (sentenceId: string) => {
    const word = filledBlanks[sentenceId];
    if (word) {
      setAvailableWords(prev => [...prev, word]);
      setFilledBlanks(prev => {
        const updated = { ...prev };
        delete updated[sentenceId];
        return updated;
      });
    }
  };

  const handleRetry = () => {
    setFilledBlanks({});
    setAvailableWords(words);
    setSelectedWord(null);
    setShowResult(false);
  };

  const allCorrect = sentences.every(s => {
    const answer = filledBlanks[s.id]?.toLowerCase().replace(/[^a-z0-9]/g, '');
    const correct = s.correctAnswer.toLowerCase().replace(/[^a-z0-9]/g, '');
    return answer === correct;
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground mt-2">
          Tap a word, then tap the blank to fill in {characterName}'s information
        </p>
      </div>

      {/* Sentences with blanks */}
      <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
        {sentences.map((sentence) => (
          <motion.div
            key={sentence.id}
            className="flex flex-wrap items-center gap-1 text-lg"
          >
            <span className="text-foreground">{sentence.textBefore}</span>
            <motion.button
              onClick={() => filledBlanks[sentence.id] ? handleRemoveWord(sentence.id) : handleBlankClick(sentence.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                min-w-[100px] px-3 py-1 rounded-lg border-2 border-dashed transition-all
                ${filledBlanks[sentence.id]
                  ? 'bg-primary/10 border-primary text-primary font-medium'
                  : selectedWord
                    ? 'border-primary bg-primary/5 cursor-pointer'
                    : 'border-muted-foreground/30 text-muted-foreground'
                }
              `}
            >
              {filledBlanks[sentence.id] || '___________'}
            </motion.button>
            <span className="text-foreground">{sentence.textAfter}</span>
          </motion.div>
        ))}
      </div>

      {/* Available words */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground text-center">
          Available Words
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {availableWords.map((word, index) => (
            <motion.button
              key={`${word}-${index}`}
              onClick={() => handleWordClick(word)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-4 py-2 rounded-xl font-medium transition-all
                ${selectedWord === word
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }
              `}
            >
              {word}
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            {allCorrect ? (
              <div className="bg-success/20 rounded-2xl p-6 border-2 border-success">
                <div className="flex items-center justify-center gap-2 text-success mb-2">
                  <Check className="w-6 h-6" />
                  <span className="font-fredoka text-xl font-bold">Perfect! 🎉</span>
                </div>
                <p className="text-foreground">You completed all sentences correctly!</p>
              </div>
            ) : (
              <div className="bg-accent/20 rounded-2xl p-6 border-2 border-accent">
                <div className="flex items-center justify-center gap-2 text-accent-foreground mb-2">
                  <span className="font-fredoka text-xl font-bold">Good effort! 💪</span>
                </div>
                <p className="text-foreground">Check some of your answers and try again!</p>
              </div>
            )}

            <div className="flex justify-center gap-4">
              {!allCorrect && (
                <Button variant="outline" onClick={handleRetry} className="gap-2 rounded-xl">
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
              )}
              <Button onClick={onComplete} className="gap-2 rounded-xl bg-gradient-primary text-primary-foreground">
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DragDropQuiz;
