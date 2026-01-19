import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle2, RotateCcw, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VocabularyItem, encouragingMessages, congratulatoryMessages } from '@/data/module1Data';
import { useLanguage } from '@/components/LanguageContext';

interface NumbersMatchingPracticeProps {
  numbers: VocabularyItem[];
  onComplete: () => void;
  title?: string;
}

// Sound for correct answer
const playSuccessSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
  oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
  oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.4);
};

export const NumbersMatchingPractice: React.FC<NumbersMatchingPracticeProps> = ({ 
  numbers, 
  onComplete,
  title = 'Numbers Matching'
}) => {
  const { selectedLanguage, t } = useLanguage();
  const [shuffledNumbers, setShuffledNumbers] = useState<VocabularyItem[]>([]);
  const [shuffledWords, setShuffledWords] = useState<VocabularyItem[]>([]);
  const [selectedNumber, setSelectedNumber] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongMatch, setWrongMatch] = useState<string | null>(null);

  const progress = (matchedPairs.size / numbers.length) * 100;
  const allCompleted = matchedPairs.size === numbers.length;

  // Extract the numeric value from the english word
  const getNumericValue = (english: string): string => {
    const numMap: Record<string, string> = {
      'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
      'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
      'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
      'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
      'eighteen': '18', 'nineteen': '19', 'twenty': '20',
    };
    return numMap[english.toLowerCase()] || '?';
  };

  const shuffleArrays = useCallback(() => {
    setShuffledNumbers([...numbers].sort(() => Math.random() - 0.5));
    setShuffledWords([...numbers].sort(() => Math.random() - 0.5));
    setSelectedNumber(null);
    setMatchedPairs(new Set());
    setWrongMatch(null);
  }, [numbers]);

  useEffect(() => {
    shuffleArrays();
  }, [shuffleArrays]);

  const speakNumber = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const handleNumberClick = (num: VocabularyItem) => {
    if (matchedPairs.has(num.id)) return;
    setSelectedNumber(num.id);
    speakNumber(num.english);
  };

  const handleWordClick = (word: VocabularyItem) => {
    if (!selectedNumber || matchedPairs.has(word.id)) return;

    if (selectedNumber === word.id) {
      // Correct match
      setMatchedPairs(prev => new Set([...prev, word.id]));
      setSelectedNumber(null);
      playSuccessSound();
    } else {
      // Wrong match
      setWrongMatch(word.id);
      setTimeout(() => {
        setWrongMatch(null);
        setSelectedNumber(null);
      }, 800);
    }
  };

  const getRandomMessage = (messages: typeof encouragingMessages) => {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    return msg.translations[selectedLanguage] || msg.english;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-fredoka text-xl font-bold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            Match the numbers with their written forms
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={shuffleArrays} className="gap-2">
          <Shuffle className="w-4 h-4" />
          Shuffle
        </Button>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-module-3"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Instructions */}
      <div className="text-center p-3 bg-primary/10 rounded-xl">
        <p className="text-sm text-foreground">
          {selectedNumber ? 'Now click the matching word 👆' : 'Click a number to hear it, then match it 🔢'}
        </p>
      </div>

      {/* Matching Game */}
      <div className="grid grid-cols-2 gap-4">
        {/* Numbers Column */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground text-center mb-3">Numbers</h4>
          {shuffledNumbers.map((num) => (
            <motion.button
              key={num.id}
              onClick={() => handleNumberClick(num)}
              disabled={matchedPairs.has(num.id)}
              className={`
                w-full p-4 rounded-xl text-2xl font-bold transition-all flex items-center justify-center gap-2
                ${matchedPairs.has(num.id) 
                  ? 'bg-green-500/20 text-green-600 border-2 border-green-500/30' 
                  : selectedNumber === num.id 
                    ? 'bg-primary text-primary-foreground border-2 border-primary'
                    : 'bg-card border-2 border-border hover:border-primary/50 text-foreground'
                }
              `}
              whileTap={{ scale: 0.95 }}
            >
              {getNumericValue(num.english)}
              {matchedPairs.has(num.id) && <CheckCircle2 className="w-5 h-5" />}
            </motion.button>
          ))}
        </div>

        {/* Words Column */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground text-center mb-3">Words</h4>
          {shuffledWords.map((word) => (
            <motion.button
              key={word.id}
              onClick={() => handleWordClick(word)}
              disabled={matchedPairs.has(word.id)}
              className={`
                w-full p-4 rounded-xl text-lg font-medium transition-all
                ${matchedPairs.has(word.id) 
                  ? 'bg-green-500/20 text-green-600 border-2 border-green-500/30' 
                  : wrongMatch === word.id 
                    ? 'bg-destructive/20 text-destructive border-2 border-destructive animate-shake'
                    : 'bg-card border-2 border-border hover:border-primary/50 text-foreground'
                }
              `}
              whileTap={{ scale: 0.95 }}
              animate={wrongMatch === word.id ? { x: [-5, 5, -5, 5, 0] } : {}}
            >
              {word.english}
              {matchedPairs.has(word.id) && (
                <span className="ml-2 text-xs text-muted-foreground">/{word.pronunciation}/</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Encouraging message */}
      {matchedPairs.size > 0 && matchedPairs.size < numbers.length && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-3 bg-module-3/10 rounded-xl"
        >
          <p className="text-module-3 font-medium">{getRandomMessage(encouragingMessages)}</p>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-center">
        {allCompleted ? (
          <Button onClick={onComplete} className="gap-2 bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-4 h-4" />
            Complete Practice
          </Button>
        ) : (
          <Button 
            variant="outline"
            onClick={shuffleArrays}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </Button>
        )}
      </div>

      {/* Completion celebration */}
      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-lg font-bold text-green-600">{getRandomMessage(congratulatoryMessages)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
