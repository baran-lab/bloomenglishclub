import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Home, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VocabularyItem, SupportedLanguage } from '@/data/module1Data';
import { useLanguage } from '@/components/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { speakText } from '@/utils/speechUtils';

interface VocabularyMatchingPracticeProps {
  vocabulary: VocabularyItem[];
  onComplete: () => void;
  title?: string;
}

export const VocabularyMatchingPractice: React.FC<VocabularyMatchingPracticeProps> = ({
  vocabulary,
  onComplete,
  title = 'Vocabulary Matching'
}) => {
  const navigate = useNavigate();
  const { selectedLanguage } = useLanguage();
  const [currentBatch, setCurrentBatch] = useState(0);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<boolean>(false);
  const [shuffledTranslations, setShuffledTranslations] = useState<VocabularyItem[]>([]);

  // Batch size of 6-7 words at a time (two sections instead of three)
  const BATCH_SIZE = Math.ceil(vocabulary.length / 2);
  const totalBatches = Math.ceil(vocabulary.length / BATCH_SIZE);
  const startIdx = currentBatch * BATCH_SIZE;
  const currentVocab = vocabulary.slice(startIdx, startIdx + BATCH_SIZE);
  const allBatchesComplete = currentBatch >= totalBatches - 1 && matchedPairs.size === currentVocab.length;

  // Shuffle translations for current batch
  useEffect(() => {
    setShuffledTranslations([...currentVocab].sort(() => Math.random() - 0.5));
    setMatchedPairs(new Set());
    setSelectedEnglish(null);
    setSelectedTranslation(null);
  }, [currentBatch, vocabulary]);

  // Check for match when both selected
  useEffect(() => {
    if (selectedEnglish && selectedTranslation) {
      const englishItem = currentVocab.find(v => v.id === selectedEnglish);
      const translationItem = currentVocab.find(v => v.id === selectedTranslation);
      
      if (englishItem && translationItem && englishItem.id === translationItem.id) {
        // Correct match!
        playSuccessSound();
        setMatchedPairs(prev => new Set([...prev, englishItem.id]));
        setSelectedEnglish(null);
        setSelectedTranslation(null);
      } else {
        // Wrong match
        setWrongPair(true);
        setTimeout(() => {
          setWrongPair(false);
          setSelectedEnglish(null);
          setSelectedTranslation(null);
        }, 800);
      }
    }
  }, [selectedEnglish, selectedTranslation]);

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

  // Speak English word using Web Speech API
  const speakWord = (word: string) => {
    speakText(word, 0.7);
  };

  const handleEnglishClick = (id: string, englishWord: string) => {
    if (matchedPairs.has(id)) return;
    setSelectedEnglish(id);
    // Play audio when clicking on English word
    speakWord(englishWord);
  };

  const handleTranslationClick = (id: string) => {
    if (matchedPairs.has(id)) return;
    setSelectedTranslation(id);
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
    setSelectedEnglish(null);
    setSelectedTranslation(null);
    setShuffledTranslations([...currentVocab].sort(() => Math.random() - 0.5));
  };

  const batchComplete = matchedPairs.size === currentVocab.length;

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">{title} - Matching</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Match the English words with their translations ({currentBatch + 1}/{totalBatches})
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          🔊 Tap English words to hear pronunciation
        </p>
      </div>

      {/* Progress */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          animate={{ width: `${((currentBatch * BATCH_SIZE + matchedPairs.size) / vocabulary.length) * 100}%` }}
        />
      </div>

      {/* Matching Area */}
      <div className="grid grid-cols-2 gap-4">
        {/* English Column - with audio */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-center text-muted-foreground">English 🔊</p>
          {currentVocab.map(item => (
            <motion.button
              key={`en-${item.id}`}
              onClick={() => handleEnglishClick(item.id, item.english)}
              className={`
                w-full p-3 rounded-xl text-left font-medium transition-all flex items-center gap-2
                ${matchedPairs.has(item.id) 
                  ? 'bg-green-500/20 text-green-700 border-2 border-green-500/50' 
                  : selectedEnglish === item.id 
                    ? 'bg-primary text-primary-foreground border-2 border-primary' 
                    : 'bg-card border-2 border-border hover:border-primary/50'
                }
                ${wrongPair && selectedEnglish === item.id ? 'bg-red-500/20 border-red-500' : ''}
              `}
              disabled={matchedPairs.has(item.id)}
              whileTap={{ scale: 0.98 }}
            >
              {matchedPairs.has(item.id) && <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />}
              <Volume2 className="w-4 h-4 opacity-50 flex-shrink-0" />
              <span className="flex-1">{item.english}</span>
            </motion.button>
          ))}
        </div>

        {/* Translation Column */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-center text-muted-foreground" dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}>
            Translation
          </p>
          {shuffledTranslations.map(item => (
            <motion.button
              key={`tr-${item.id}`}
              onClick={() => handleTranslationClick(item.id)}
              className={`
                w-full p-3 rounded-xl font-medium transition-all
                ${matchedPairs.has(item.id) 
                  ? 'bg-green-500/20 text-green-700 border-2 border-green-500/50' 
                  : selectedTranslation === item.id 
                    ? 'bg-primary text-primary-foreground border-2 border-primary' 
                    : 'bg-card border-2 border-border hover:border-primary/50'
                }
                ${wrongPair && selectedTranslation === item.id ? 'bg-red-500/20 border-red-500' : ''}
              `}
              disabled={matchedPairs.has(item.id)}
              dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
              whileTap={{ scale: 0.98 }}
            >
              {matchedPairs.has(item.id) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-green-500" />}
              {item.translations[selectedLanguage]}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Wrong match feedback */}
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

      {/* Batch complete celebration */}
      <AnimatePresence>
        {batchComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-lg font-bold text-green-600">Great job! All matched!</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={resetBatch} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
        
        {batchComplete ? (
          <Button onClick={handleNextBatch} className="gap-2 bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-4 h-4" />
            {currentBatch < totalBatches - 1 ? 'Next Words' : 'Complete'}
          </Button>
        ) : (
          <span className="text-sm text-muted-foreground">
            {matchedPairs.size}/{currentVocab.length} matched
          </span>
        )}
      </div>
    </div>
  );
};

export default VocabularyMatchingPractice;
