import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowRight, Home, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';
import { VisualVocabularyItem } from '@/data/module5Data';
import { speakText } from '@/utils/speechUtils';

interface VisualMatchingPracticeProps {
  vocabulary: VisualVocabularyItem[];
  onComplete: () => void;
  title?: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const speakPhrase = (text: string) => {
    speakText(text, 0.7);
  };

export const VisualMatchingPractice: React.FC<VisualMatchingPracticeProps> = ({
  vocabulary,
  onComplete,
  title = 'Vocabulary Matching',
}) => {
  const navigate = useNavigate();
  const BATCH_SIZE = Math.min(6, vocabulary.length);
  const totalBatches = Math.ceil(vocabulary.length / BATCH_SIZE);

  const [currentBatch, setCurrentBatch] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<string | null>(null);
  const [shuffledPhrases, setShuffledPhrases] = useState<VisualVocabularyItem[]>([]);
  const [batchCompleted, setBatchCompleted] = useState(false);

  const startIdx = currentBatch * BATCH_SIZE;
  const currentVocab = vocabulary.slice(startIdx, startIdx + BATCH_SIZE);

  useEffect(() => {
    setShuffledPhrases(shuffleArray(currentVocab));
    setMatchedPairs(new Set());
    setSelectedEmoji(null);
    setSelectedPhrase(null);
    setBatchCompleted(false);
  }, [currentBatch]);

  useEffect(() => {
    if (selectedEmoji && selectedPhrase) {
      const emojiItem = currentVocab.find(v => v.id === selectedEmoji);
      const phraseItem = currentVocab.find(v => v.id === selectedPhrase);

      if (emojiItem && phraseItem && emojiItem.id === phraseItem.id) {
        playSuccessSound();
        speakPhrase(emojiItem.phrase);
        setMatchedPairs(prev => new Set([...prev, emojiItem.id]));
        setSelectedEmoji(null);
        setSelectedPhrase(null);

        if (matchedPairs.size + 1 === currentVocab.length) {
          setBatchCompleted(true);
        }
      } else {
        playErrorSound();
        setWrongPair(selectedEmoji + selectedPhrase);
        setTimeout(() => {
          setWrongPair(null);
          setSelectedEmoji(null);
          setSelectedPhrase(null);
        }, 600);
      }
    }
  }, [selectedEmoji, selectedPhrase]);

  const handleNextBatch = () => {
    if (currentBatch < totalBatches - 1) {
      setCurrentBatch(prev => prev + 1);
    } else {
      playSuccessSound();
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentBatch + 1}/{totalBatches}
        </span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground text-sm">Match each image with its name.</p>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${((currentBatch * BATCH_SIZE + matchedPairs.size) / vocabulary.length) * 100}%` }}
        />
      </div>

      {!batchCompleted ? (
        <div className="grid grid-cols-2 gap-3">
          {/* Left column - Emojis */}
          <div className="space-y-2">
            {currentVocab.map(item => {
              const isMatched = matchedPairs.has(item.id);
              const isSelected = selectedEmoji === item.id;
              return (
                <motion.button
                  key={`emoji-${item.id}`}
                  onClick={() => !isMatched && setSelectedEmoji(item.id)}
                  disabled={isMatched}
                  className={`w-full p-3 rounded-lg border-2 text-center text-2xl transition-all ${
                    isMatched
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 opacity-60'
                      : isSelected
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-border bg-card hover:bg-accent'
                  }`}
                  whileHover={!isMatched ? { scale: 1.02 } : {}}
                  whileTap={!isMatched ? { scale: 0.98 } : {}}
                >
                  {item.emoji}
                  {isMatched && <CheckCircle2 className="inline ml-2 w-4 h-4 text-green-600" />}
                </motion.button>
              );
            })}
          </div>

          {/* Right column - Phrases */}
          <div className="space-y-2">
            {shuffledPhrases.map(item => {
              const isMatched = matchedPairs.has(item.id);
              const isSelected = selectedPhrase === item.id;
              return (
                <motion.button
                  key={`phrase-${item.id}`}
                  onClick={() => !isMatched && setSelectedPhrase(item.id)}
                  disabled={isMatched}
                  className={`w-full p-3 rounded-lg border-2 text-center text-sm font-medium transition-all ${
                    isMatched
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 opacity-60'
                      : isSelected
                      ? 'border-primary bg-primary/10 shadow-md'
                      : 'border-border bg-card hover:bg-accent'
                  }`}
                  whileHover={!isMatched ? { scale: 1.02 } : {}}
                  whileTap={!isMatched ? { scale: 0.98 } : {}}
                >
                  {item.phrase}
                  {isMatched && <CheckCircle2 className="inline ml-2 w-4 h-4 text-green-600" />}
                </motion.button>
              );
            })}
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 p-6 bg-accent rounded-xl border border-border"
        >
          <div className="text-4xl">🎉</div>
          <h3 className="font-fredoka text-xl font-bold text-primary">
            {currentBatch < totalBatches - 1 ? 'Batch complete!' : 'All matched!'}
          </h3>
          <Button onClick={handleNextBatch} className="gap-2">
            {currentBatch < totalBatches - 1 ? 'Next Batch' : 'Complete'} <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};
