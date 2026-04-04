import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronRight, CheckCircle2, XCircle, Home, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageContext';

interface MarisolNeighborQuizProps {
  onComplete: () => void;
}

// Matching exercise data for Marisol
const marisolMatchingData = [
  { id: 'first-name', label: 'First Name', answer: 'Marisol' },
  { id: 'last-name', label: 'Last Name', answer: 'Rivera' },
  { id: 'age', label: 'Age', answer: '28 years old' },
  { id: 'marital', label: 'Marital Status', answer: 'Single' },
  { id: 'job', label: 'Job', answer: 'Cashier' },
  { id: 'where', label: 'Where', answer: 'Supermarket' },
];

const shuffledAnswers = ['Rivera', 'Single', '28 years old', 'Cashier', 'Marisol', 'Supermarket'];

export const MarisolNeighborQuiz: React.FC<MarisolNeighborQuizProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { selectedLanguage } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const [showMatching, setShowMatching] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [wrongPair, setWrongPair] = useState(false);
  const [shuffled, setShuffled] = useState<string[]>([]);

  // Shuffle answers on mount
  useEffect(() => {
    setShuffled([...shuffledAnswers].sort(() => Math.random() - 0.5));
  }, []);

  // Auto-play video
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoWatched(true);
  };

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

  // Check for match when both selected
  useEffect(() => {
    if (selectedLabel && selectedAnswer) {
      const correctItem = marisolMatchingData.find(item => item.id === selectedLabel);
      if (correctItem && correctItem.answer === selectedAnswer) {
        // Correct match
        playSuccessSound();
        setMatchedPairs(prev => ({ ...prev, [selectedLabel]: selectedAnswer }));
        setSelectedLabel(null);
        setSelectedAnswer(null);
      } else {
        // Wrong match
        setWrongPair(true);
        setTimeout(() => {
          setWrongPair(false);
          setSelectedLabel(null);
          setSelectedAnswer(null);
        }, 800);
      }
    }
  }, [selectedLabel, selectedAnswer]);

  const allMatched = Object.keys(matchedPairs).length === marisolMatchingData.length;

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">Meet Marisol Rivera 👩‍🦰</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Watch the video, then match the information
        </p>
      </div>

      {!showMatching ? (
        <>
          {/* Video Player */}
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
            <video preload="metadata"
              ref={videoRef}
              src="/videos/module1/marisol-intro.mp4"
              className="w-full h-full object-contain"
              onEnded={handleVideoEnd}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {!isPlaying && !videoWatched && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/40"
              >
                <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play className="w-10 h-10 text-primary-foreground ml-1" />
                </div>
              </motion.button>
            )}
          </div>

          {videoWatched && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Button onClick={() => setShowMatching(true)} size="lg" className="gap-2">
                Start Matching Exercise
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </>
      ) : (
        <>
          {/* Matching Exercise */}
          <div className="grid grid-cols-2 gap-4">
            {/* Labels Column */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-center text-muted-foreground">Information</p>
              {marisolMatchingData.map(item => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    if (!matchedPairs[item.id]) setSelectedLabel(item.id);
                  }}
                  className={`
                    w-full p-3 rounded-xl text-left font-medium transition-all
                    ${matchedPairs[item.id]
                      ? 'bg-green-500/20 text-green-700 border-2 border-green-500/50'
                      : selectedLabel === item.id
                        ? 'bg-primary text-primary-foreground border-2 border-primary'
                        : 'bg-card border-2 border-border hover:border-primary/50'
                    }
                    ${wrongPair && selectedLabel === item.id ? 'bg-red-500/20 border-red-500' : ''}
                  `}
                  disabled={!!matchedPairs[item.id]}
                  whileTap={{ scale: 0.98 }}
                >
                  {matchedPairs[item.id] && <CheckCircle2 className="w-4 h-4 inline mr-2 text-green-500" />}
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Answers Column */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-center text-muted-foreground">Answers</p>
              {shuffled.map((answer, idx) => {
                const isMatched = Object.values(matchedPairs).includes(answer);
                return (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      if (!isMatched) setSelectedAnswer(answer);
                    }}
                    className={`
                      w-full p-3 rounded-xl font-medium transition-all
                      ${isMatched
                        ? 'bg-green-500/20 text-green-700 border-2 border-green-500/50'
                        : selectedAnswer === answer
                          ? 'bg-primary text-primary-foreground border-2 border-primary'
                          : 'bg-card border-2 border-border hover:border-primary/50'
                      }
                      ${wrongPair && selectedAnswer === answer ? 'bg-red-500/20 border-red-500' : ''}
                    `}
                    disabled={isMatched}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isMatched && <CheckCircle2 className="w-4 h-4 inline mr-2 text-green-500" />}
                    {answer}
                  </motion.button>
                );
              })}
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

          {/* Completion */}
          {allMatched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30">
                <p className="text-2xl mb-2">🎉</p>
                <p className="text-lg font-bold text-green-600">Great job! All matched!</p>
              </div>
              <Button onClick={onComplete} className="w-full gap-2">
                Continue <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default MarisolNeighborQuiz;
