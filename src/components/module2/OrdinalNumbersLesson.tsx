import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle2, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VocabularyItem } from '@/data/module1Data';
import { useLanguage } from '@/components/LanguageContext';

interface OrdinalNumbersLessonProps {
  content: VocabularyItem[];
  onComplete: () => void;
  title?: string;
}

export const OrdinalNumbersLesson: React.FC<OrdinalNumbersLessonProps> = ({ 
  content, 
  onComplete,
  title = 'Ordinal Numbers'
}) => {
  const { selectedLanguage } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [gameMode, setGameMode] = useState<'learn' | 'match'>('learn');
  const [matchItems, setMatchItems] = useState<VocabularyItem[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());

  const currentItem = content[currentIndex];
  const progress = (completedItems.size / content.length) * 100;
  const allCompleted = completedItems.size >= content.length;

  const speakText = (text: string) => {
    speakText(text, 0.7);
  };

  const handleNext = () => {
    setCompletedItems(prev => new Set([...prev, currentItem.id]));
    if (currentIndex < content.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
    }
  };

  const startMatchGame = () => {
    const shuffled = [...content].sort(() => Math.random() - 0.5).slice(0, 8);
    setMatchItems(shuffled);
    setMatchedPairs(new Set());
    setSelectedMatch(null);
    setGameMode('match');
  };

  const handleMatchSelect = (item: VocabularyItem) => {
    if (matchedPairs.has(item.id)) return;
    
    if (!selectedMatch) {
      setSelectedMatch(item.id);
      speakText(item.english.split(' - ')[1] || item.english);
    } else {
      if (selectedMatch === item.id) {
        // Correct match
        setMatchedPairs(prev => new Set([...prev, item.id]));
        setCompletedItems(prev => new Set([...prev, item.id]));
      }
      setSelectedMatch(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">{title} 🔢</h2>
        <p className="text-muted-foreground">Learn ordinal numbers: 1st, 2nd, 3rd...</p>
      </div>

      {/* Progress */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center gap-2">
        <Button 
          variant={gameMode === 'learn' ? 'default' : 'outline'} 
          onClick={() => setGameMode('learn')}
          size="sm"
        >
          Learn
        </Button>
        <Button 
          variant={gameMode === 'match' ? 'default' : 'outline'} 
          onClick={startMatchGame}
          size="sm"
          className="gap-2"
        >
          <Shuffle className="w-4 h-4" />
          Match Game
        </Button>
      </div>

      {gameMode === 'learn' ? (
        <>
          {/* Current Item Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl p-8 border border-primary/30"
            >
              <div className="text-center space-y-4">
                <div className="text-5xl font-bold text-primary">
                  {currentItem.english.split(' - ')[0]}
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {currentItem.english.split(' - ')[1]}
                </div>

                <Button 
                  onClick={() => speakText(currentItem.english.split(' - ')[1] || currentItem.english)} 
                  className="gap-2"
                >
                  <Volume2 className="w-5 h-5" />
                  Listen
                </Button>

                {showTranslation ? (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg text-foreground"
                    dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
                  >
                    {currentItem.translations[selectedLanguage]}
                  </motion.p>
                ) : (
                  <Button variant="ghost" onClick={() => setShowTranslation(true)}>
                    Show Translation
                  </Button>
                )}

                {completedItems.has(currentItem.id) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-600 rounded-full"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Learned!
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex(prev => prev - 1);
                  setShowTranslation(false);
                }
              }} 
              disabled={currentIndex === 0}
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {content.length}
            </span>
            <Button onClick={handleNext}>
              {currentIndex === content.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </>
      ) : (
        /* Match Game Mode */
        <div className="space-y-4">
          <p className="text-center text-muted-foreground">
            Tap a card to hear it, then tap again to mark as matched
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {matchItems.map((item) => (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleMatchSelect(item)}
                className={`
                  p-4 rounded-xl border-2 text-center transition-all
                  ${matchedPairs.has(item.id) 
                    ? 'bg-green-500/20 border-green-500 text-green-700' 
                    : selectedMatch === item.id
                      ? 'bg-primary/20 border-primary'
                      : 'bg-card border-border hover:border-primary/50'
                  }
                `}
                disabled={matchedPairs.has(item.id)}
              >
                <div className="text-2xl font-bold">{item.english.split(' - ')[0]}</div>
                <div className="text-sm text-muted-foreground">{item.english.split(' - ')[1]}</div>
              </motion.button>
            ))}
          </div>

          {matchedPairs.size === matchItems.length && matchItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-6 bg-green-500/20 rounded-2xl border border-green-500/30"
            >
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-lg font-bold text-green-600">All matched!</p>
            </motion.div>
          )}
        </div>
      )}

      {/* Complete Button */}
      {allCompleted && (
        <div className="flex justify-center">
          <Button onClick={onComplete} className="bg-green-500 hover:bg-green-600 gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Complete Lesson
          </Button>
        </div>
      )}
    </div>
  );
};
