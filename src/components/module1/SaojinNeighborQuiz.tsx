import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Check, Home, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface SaojinNeighborQuizProps {
  onComplete: () => void;
}

const saojinVideos = [
  { url: '/videos/module1/myn-saojin.mp4', question: 'What is her first name?', options: ['Saojin', 'Minjoo'], correct: 0 },
  { url: '/videos/module1/myn-saojin.mp4', question: 'Where is she from?', options: ['Korea', 'Japan'], correct: 0 },
  { url: '/videos/module1/myn-saojin.mp4', question: 'How old is she?', options: ['32', '28'], correct: 0 },
  { url: '/videos/module1/myn-saojin.mp4', question: 'Is she married or single?', options: ['Single', 'Married'], correct: 0 },
  { url: '/videos/module1/myn-saojin.mp4', question: 'What does she do?', options: ['Nurse', 'Doctor'], correct: 0 },
];

export const SaojinNeighborQuiz: React.FC<SaojinNeighborQuizProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoComplete, setVideoComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const current = saojinVideos[currentIndex];
  const progress = ((currentIndex + 1) / saojinVideos.length) * 100;

  // Auto-play video when entering or advancing
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setVideoComplete(true);
  };

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

  const handleAnswer = (idx: number) => {
    setSelectedAnswer(idx);
    setShowResult(true);
    if (idx === current.correct) {
      setCorrectCount(prev => prev + 1);
    }
  };

  const goNext = () => {
    if (currentIndex < saojinVideos.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setVideoComplete(false);
      setSelectedAnswer(null);
      setShowResult(false);
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
        <h3 className="font-fredoka text-xl font-bold text-foreground">Meet Saojin Lee 👩‍⚕️</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Video {currentIndex + 1} of {saojinVideos.length}
        </p>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
      </div>

      {/* Video Player */}
      <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
        <video preload="metadata"
          ref={videoRef}
          src={current.url}
          className="w-full h-full object-contain"
          onEnded={handleVideoEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          autoPlay
          playsInline
        />
        {!isPlaying && !videoComplete && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40"
          >
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-8 h-8 text-primary-foreground ml-1" />
            </div>
          </motion.button>
        )}
        {isPlaying && (
          <button onClick={togglePlay} className="absolute bottom-4 right-4 p-2 bg-black/50 rounded-full">
            <Pause className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {/* Quiz Section */}
      {videoComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-6 space-y-4"
        >
          <h4 className="font-semibold text-lg text-center">{current.question}</h4>
          <div className="grid grid-cols-2 gap-3">
            {current.options.map((opt, idx) => (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => !showResult && handleAnswer(idx)}
                disabled={showResult}
                className={`
                  p-4 rounded-xl text-lg font-medium transition-all border-2
                  ${showResult
                    ? idx === current.correct
                      ? 'bg-green-500/20 border-green-500 text-green-700'
                      : selectedAnswer === idx
                        ? 'bg-red-500/20 border-red-500 text-red-700'
                        : 'bg-muted border-border'
                    : 'bg-card border-border hover:border-primary/50'
                  }
                `}
              >
                {opt}
              </motion.button>
            ))}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center p-4 rounded-xl ${selectedAnswer === current.correct ? 'bg-green-500/10' : 'bg-amber-500/10'}`}
            >
              <p className={`font-medium ${selectedAnswer === current.correct ? 'text-green-600' : 'text-amber-600'}`}>
                {selectedAnswer === current.correct ? '✓ Correct!' : `The correct answer is: ${current.options[current.correct]}`}
              </p>
            </motion.div>
          )}

          {showResult && (
            <Button onClick={goNext} className="w-full gap-2">
              {currentIndex < saojinVideos.length - 1 ? (
                <>Next <ChevronRight className="w-4 h-4" /></>
              ) : (
                <><Check className="w-4 h-4" /> Complete</>
              )}
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SaojinNeighborQuiz;
