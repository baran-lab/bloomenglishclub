import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronRight, CheckCircle2, XCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FatimaNeighborQuizProps {
  onComplete: () => void;
}

const fatimaVideos = [
  { url: '/videos/module1/fatima-1.mp4', question: 'What is her first name?', options: ['Fatima', 'Heba'], correctAnswer: 0 },
  { url: '/videos/module1/fatima-2.mp4', question: 'Where is she from?', options: ['Egypt', 'Bangladesh'], correctAnswer: 1 },
  { url: '/videos/module1/fatima-3.mp4', question: 'How old is she?', options: ['32', '28'], correctAnswer: 0 },
  { url: '/videos/module1/fatima-4.mp4', question: 'Is she married or single?', options: ['Married', 'Divorced'], correctAnswer: 1 },
  { url: '/videos/module1/fatima-5.mp4', question: 'What does she do?', options: ['Home Health Aide', 'Housekeeper'], correctAnswer: 0 },
  { url: '/videos/module1/fatima-6.mp4', question: 'Where does she live?', options: ['Apartment 2B', 'Apartment 3A'], correctAnswer: 0 },
];

export const FatimaNeighborQuiz: React.FC<FatimaNeighborQuizProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const currentVideo = fatimaVideos[currentIndex];
  const progress = ((currentIndex + 1) / fatimaVideos.length) * 100;
  const isCorrect = selectedAnswer === currentVideo.correctAnswer;

  // Auto-play video when entering
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

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

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === currentVideo.correctAnswer) {
      setScore(prev => prev + 1);
      playSuccessSound();
    }
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

  const handleNext = () => {
    if (currentIndex < fatimaVideos.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setVideoWatched(false);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsPlaying(false);
    } else {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">Meet Fatima Hassan 🧕</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Home Health Aide • Apt 2B
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Video {currentIndex + 1} of {fatimaVideos.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
      </div>

      {/* Video Player */}
      <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
        <video
          ref={videoRef}
          src={currentVideo.url}
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

      {/* Question and Options */}
      {videoWatched && (
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-2xl border p-6 space-y-4"
          >
            <h4 className="text-lg font-semibold text-center">{currentVideo.question}</h4>
            
            <div className="grid grid-cols-2 gap-3">
              {currentVideo.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={`
                    p-4 rounded-xl font-medium text-lg transition-all
                    ${showResult 
                      ? idx === currentVideo.correctAnswer 
                        ? 'bg-green-500/20 border-2 border-green-500 text-green-700'
                        : selectedAnswer === idx 
                          ? 'bg-red-500/20 border-2 border-red-500 text-red-700'
                          : 'bg-muted border-2 border-transparent'
                      : 'bg-card border-2 border-border hover:border-primary'
                    }
                  `}
                  whileTap={{ scale: showResult ? 1 : 0.98 }}
                >
                  {showResult && idx === currentVideo.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 inline mr-2 text-green-500" />
                  )}
                  {showResult && selectedAnswer === idx && idx !== currentVideo.correctAnswer && (
                    <XCircle className="w-5 h-5 inline mr-2 text-red-500" />
                  )}
                  {option}
                </motion.button>
              ))}
            </div>

            {showResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center p-3 rounded-xl ${isCorrect ? 'bg-green-500/10' : 'bg-amber-500/10'}`}
              >
                <p className={`font-medium ${isCorrect ? 'text-green-600' : 'text-amber-600'}`}>
                  {isCorrect ? '🎉 Correct!' : `The answer is: ${currentVideo.options[currentVideo.correctAnswer]}`}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">Score: {score}/{currentIndex + (showResult ? 1 : 0)}</span>
        
        {showResult && (
          <Button onClick={handleNext} className="gap-2">
            {currentIndex < fatimaVideos.length - 1 ? 'Next Video' : 'Complete'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {currentIndex === fatimaVideos.length - 1 && showResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
        >
          <p className="text-2xl mb-2">🎉</p>
          <p className="text-lg font-bold text-green-600">
            You scored {score} out of {fatimaVideos.length}!
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FatimaNeighborQuiz;
