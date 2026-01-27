import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Home, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { alphabetData } from '@/data/module2Data';
import { useNavigate } from 'react-router-dom';

interface AlphabetMatchingPracticeProps {
  onComplete: () => void;
}

export const AlphabetMatchingPractice: React.FC<AlphabetMatchingPracticeProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentBatch, setCurrentBatch] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedPhonetic, setSelectedPhonetic] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<boolean>(false);
  const [shuffledPhonetics, setShuffledPhonetics] = useState<typeof alphabetData>([]);

  const BATCH_SIZE = 5;
  const totalBatches = Math.ceil(alphabetData.length / BATCH_SIZE);
  const startIdx = currentBatch * BATCH_SIZE;
  const currentAlphabet = alphabetData.slice(startIdx, startIdx + BATCH_SIZE);
  
  useEffect(() => {
    setShuffledPhonetics([...currentAlphabet].sort(() => Math.random() - 0.5));
    setMatchedPairs(new Set());
    setSelectedLetter(null);
    setSelectedPhonetic(null);
  }, [currentBatch]);

  useEffect(() => {
    if (selectedLetter && selectedPhonetic) {
      const letterItem = currentAlphabet.find(a => a.letter === selectedLetter);
      const phoneticItem = currentAlphabet.find(a => a.letter === selectedPhonetic);
      
      if (letterItem && phoneticItem && letterItem.letter === phoneticItem.letter) {
        playSuccessSound();
        setMatchedPairs(prev => new Set([...prev, letterItem.letter]));
        setSelectedLetter(null);
        setSelectedPhonetic(null);
      } else {
        setWrongPair(true);
        setTimeout(() => {
          setWrongPair(false);
          setSelectedLetter(null);
          setSelectedPhonetic(null);
        }, 800);
      }
    }
  }, [selectedLetter, selectedPhonetic]);

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

  const speakLetter = (letter: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(letter);
      utterance.lang = 'en-US';
      utterance.rate = 0.6;
      speechSynthesis.speak(utterance);
    }
  };

  const handleNextBatch = () => {
    if (currentBatch < totalBatches - 1) {
      setCurrentBatch(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const resetBatch = () => {
    setMatchedPairs(new Set());
    setSelectedLetter(null);
    setSelectedPhonetic(null);
    setShuffledPhonetics([...currentAlphabet].sort(() => Math.random() - 0.5));
  };

  const batchComplete = matchedPairs.size === currentAlphabet.length;

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">Alphabet Matching 🔤</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Match the letters with their sounds ({currentBatch + 1}/{totalBatches})
        </p>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${((currentBatch * BATCH_SIZE + matchedPairs.size) / alphabetData.length) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Letters Column */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-center text-muted-foreground">Letter</p>
          {currentAlphabet.map(item => (
            <motion.button
              key={`letter-${item.letter}`}
              onClick={() => {
                if (!matchedPairs.has(item.letter)) {
                  setSelectedLetter(item.letter);
                  speakLetter(item.letter);
                }
              }}
              className={`
                w-full p-4 rounded-xl text-2xl font-bold transition-all flex items-center justify-center gap-2
                ${matchedPairs.has(item.letter) 
                  ? 'bg-green-500/20 text-green-700 border-2 border-green-500/50' 
                  : selectedLetter === item.letter 
                    ? 'bg-primary text-primary-foreground border-2 border-primary' 
                    : 'bg-card border-2 border-border hover:border-primary/50'
                }
                ${wrongPair && selectedLetter === item.letter ? 'bg-red-500/20 border-red-500' : ''}
              `}
              disabled={matchedPairs.has(item.letter)}
              whileTap={{ scale: 0.98 }}
            >
              {matchedPairs.has(item.letter) && <CheckCircle2 className="w-5 h-5 text-green-500" />}
              {item.letter}
              <Volume2 className="w-4 h-4 opacity-50" />
            </motion.button>
          ))}
        </div>

        {/* Phonetic Column */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-center text-muted-foreground">Sound</p>
          {shuffledPhonetics.map(item => (
            <motion.button
              key={`phonetic-${item.letter}`}
              onClick={() => {
                if (!matchedPairs.has(item.letter)) {
                  setSelectedPhonetic(item.letter);
                }
              }}
              className={`
                w-full p-4 rounded-xl text-lg font-medium transition-all italic
                ${matchedPairs.has(item.letter) 
                  ? 'bg-green-500/20 text-green-700 border-2 border-green-500/50' 
                  : selectedPhonetic === item.letter 
                    ? 'bg-primary text-primary-foreground border-2 border-primary' 
                    : 'bg-card border-2 border-border hover:border-primary/50'
                }
                ${wrongPair && selectedPhonetic === item.letter ? 'bg-red-500/20 border-red-500' : ''}
              `}
              disabled={matchedPairs.has(item.letter)}
              whileTap={{ scale: 0.98 }}
            >
              {matchedPairs.has(item.letter) && <CheckCircle2 className="w-5 h-5 inline mr-2 text-green-500" />}
              /{item.phonetic}/
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {wrongPair && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center p-3 bg-red-500/10 rounded-xl"
          >
            <XCircle className="w-5 h-5 inline mr-2 text-red-500" />
            <span className="text-red-600 font-medium">Try again!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {batchComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-lg font-bold text-green-600">Great job!</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={resetBatch} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        
        {batchComplete ? (
          <Button onClick={handleNextBatch} className="gap-2 bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-4 h-4" />
            {currentBatch < totalBatches - 1 ? 'Next Letters' : 'Complete'}
          </Button>
        ) : (
          <span className="text-sm text-muted-foreground">
            {matchedPairs.size}/{currentAlphabet.length} matched
          </span>
        )}
      </div>
    </div>
  );
};

export default AlphabetMatchingPractice;
