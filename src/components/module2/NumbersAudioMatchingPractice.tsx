import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle2, RotateCcw, Shuffle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VocabularyItem } from '@/data/module1Data';
import { useNavigate } from 'react-router-dom';
import { speakText } from '@/utils/speechUtils';

interface NumbersAudioMatchingPracticeProps {
  numbers: VocabularyItem[];
  onComplete: () => void;
  title?: string;
}

const playSuccessSound = () => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  } catch (e) { console.log('Audio not available'); }
};

export const NumbersAudioMatchingPractice: React.FC<NumbersAudioMatchingPracticeProps> = ({ 
  numbers, 
  onComplete,
  title = 'Numbers Matching'
}) => {
  const navigate = useNavigate();
  const [shuffledAudio, setShuffledAudio] = useState<VocabularyItem[]>([]);
  const [shuffledNumbers, setShuffledNumbers] = useState<VocabularyItem[]>([]);
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongMatch, setWrongMatch] = useState<string | null>(null);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const progress = (matchedPairs.size / numbers.length) * 100;
  const allCompleted = matchedPairs.size === numbers.length;

  // Extract the numeric value from the english string (e.g., "61 - sixty-one" -> "61")
  const getNumericValue = (english: string): string => {
    const match = english.match(/^(\d+)/);
    return match ? match[1] : english;
  };

  // Get the spoken word (e.g., "61 - sixty-one" -> "sixty-one")
  const getSpokenWord = (english: string): string => {
    const parts = english.split(' - ');
    return parts.length > 1 ? parts[1] : english;
  };

  const shuffleArrays = useCallback(() => {
    setShuffledAudio([...numbers].sort(() => Math.random() - 0.5));
    setShuffledNumbers([...numbers].sort(() => Math.random() - 0.5));
    setSelectedAudio(null);
    setMatchedPairs(new Set());
    setWrongMatch(null);
  }, [numbers]);

  useEffect(() => {
    shuffleArrays();
  }, [shuffleArrays]);

  const speakNumber = (item: VocabularyItem) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const word = getSpokenWord(item.english);
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      setPlayingAudio(item.id);
      utterance.onend = () => setPlayingAudio(null);
      speechSynthesis.speak(utterance);
    }
  };

  const handleAudioClick = (item: VocabularyItem) => {
    if (matchedPairs.has(item.id)) return;
    setSelectedAudio(item.id);
    speakNumber(item);
  };

  const handleNumberClick = (item: VocabularyItem) => {
    if (!selectedAudio || matchedPairs.has(item.id)) return;

    if (selectedAudio === item.id) {
      // Correct match
      setMatchedPairs(prev => new Set([...prev, item.id]));
      setSelectedAudio(null);
      playSuccessSound();
    } else {
      // Wrong match
      setWrongMatch(item.id);
      setTimeout(() => {
        setWrongMatch(null);
        setSelectedAudio(null);
      }, 800);
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      {/* Header */}
      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">
          Match the audio with the numbers
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
      </div>

      {/* Instructions */}
      <div className="text-center p-3 bg-primary/10 rounded-xl">
        <p className="text-sm text-foreground">
          {selectedAudio ? 'Now click the matching number 👆' : 'Click an audio button to hear it, then match it 🔊'}
        </p>
      </div>

      {/* Matching Game */}
      <div className="grid grid-cols-2 gap-4">
        {/* Audio Column */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground text-center mb-3">🔊 Audio</h4>
          {shuffledAudio.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleAudioClick(item)}
              disabled={matchedPairs.has(item.id)}
              className={`
                w-full p-4 rounded-xl text-lg font-medium transition-all flex items-center justify-center gap-2
                ${matchedPairs.has(item.id) 
                  ? 'bg-green-500/20 text-green-600 border-2 border-green-500/30' 
                  : selectedAudio === item.id 
                    ? 'bg-primary text-primary-foreground border-2 border-primary'
                    : 'bg-card border-2 border-border hover:border-primary/50 text-foreground'
                }
              `}
              whileTap={{ scale: 0.95 }}
            >
              <Volume2 className={`w-5 h-5 ${playingAudio === item.id ? 'animate-pulse' : ''}`} />
              {matchedPairs.has(item.id) ? getNumericValue(item.english) : 'Play'}
              {matchedPairs.has(item.id) && <CheckCircle2 className="w-5 h-5" />}
            </motion.button>
          ))}
        </div>

        {/* Numbers Column */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground text-center mb-3">Numbers</h4>
          {shuffledNumbers.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleNumberClick(item)}
              disabled={matchedPairs.has(item.id)}
              className={`
                w-full p-4 rounded-xl text-2xl font-bold transition-all
                ${matchedPairs.has(item.id) 
                  ? 'bg-green-500/20 text-green-600 border-2 border-green-500/30' 
                  : wrongMatch === item.id 
                    ? 'bg-destructive/20 text-destructive border-2 border-destructive'
                    : 'bg-card border-2 border-border hover:border-primary/50 text-foreground'
                }
              `}
              whileTap={{ scale: 0.95 }}
              animate={wrongMatch === item.id ? { x: [-5, 5, -5, 5, 0] } : {}}
            >
              {getNumericValue(item.english)}
              {matchedPairs.has(item.id) && (
                <CheckCircle2 className="w-5 h-5 inline-block ml-2" />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        {allCompleted ? (
          <Button onClick={onComplete} className="gap-2 bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-4 h-4" />
            Complete Practice
          </Button>
        ) : (
          <Button variant="outline" onClick={shuffleArrays} className="gap-2">
            <Shuffle className="w-4 h-4" />
            Shuffle
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
            <p className="text-lg font-bold text-green-600">Great job! All matched correctly!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
