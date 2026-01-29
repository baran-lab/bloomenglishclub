import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronRight, CheckCircle2, XCircle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RosaNeighborQuizProps {
  onComplete: () => void;
}

const rosaQuizQuestions = [
  { question: 'What is Rosa\'s full name?', options: ['Rosa Silva', 'Rosa Rivera'], correctAnswer: 0 },
  { question: 'Where is Rosa from?', options: ['Peru', 'Dominican Republic'], correctAnswer: 1 },
  { question: 'How old is Rosa?', options: ['30 years old', '28 years old'], correctAnswer: 0 },
  { question: 'Is Rosa married or single?', options: ['Married', 'Single'], correctAnswer: 0 },
  { question: 'What does Rosa do?', options: ['Housekeeper', 'Cashier'], correctAnswer: 0 },
  { question: 'Where does Rosa work?', options: ['Hotel', 'Supermarket'], correctAnswer: 0 },
];

export const RosaNeighborQuiz: React.FC<RosaNeighborQuizProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  // Auto-play video
  useEffect(() => {
    if (videoRef.current && !showQuiz) {
      videoRef.current.play().catch(() => {});
    }
  }, [showQuiz]);

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

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === rosaQuizQuestions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
      playSuccessSound();
    }
  };

  const handleNext = () => {
    if (currentQuestion < rosaQuizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete();
    }
  };

  const current = rosaQuizQuestions[currentQuestion];
  const isCorrect = selectedAnswer === current.correctAnswer;
  const progress = ((currentQuestion + 1) / rosaQuizQuestions.length) * 100;

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">Meet Rosa Silva 👩‍🦱</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {showQuiz ? `Question ${currentQuestion + 1} of ${rosaQuizQuestions.length}` : 'Watch the video, then take the quiz'}
        </p>
      </div>

      {!showQuiz ? (
        <>
          {/* Video Player */}
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
            <video
              ref={videoRef}
              src="/videos/module1/rosa-silva.mp4"
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
              <Button onClick={() => setShowQuiz(true)} size="lg" className="gap-2">
                Start Quiz
                <ChevronRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </>
      ) : (
        <>
          {/* Progress bar */}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
          </div>

          {/* Quiz Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl border p-6 space-y-4"
          >
            <h4 className="text-lg font-semibold text-center">{current.question}</h4>
            
            <div className="grid grid-cols-1 gap-3">
              {current.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={`
                    p-4 rounded-xl font-medium text-lg transition-all text-left
                    ${showResult 
                      ? idx === current.correctAnswer 
                        ? 'bg-green-500/20 border-2 border-green-500 text-green-700'
                        : selectedAnswer === idx 
                          ? 'bg-red-500/20 border-2 border-red-500 text-red-700'
                          : 'bg-muted border-2 border-transparent'
                      : 'bg-card border-2 border-border hover:border-primary'
                    }
                  `}
                  whileTap={{ scale: showResult ? 1 : 0.98 }}
                >
                  {showResult && idx === current.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 inline mr-2 text-green-500" />
                  )}
                  {showResult && selectedAnswer === idx && idx !== current.correctAnswer && (
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
                  {isCorrect ? '🎉 Correct!' : `The answer is: ${current.options[current.correctAnswer]}`}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Score: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
            
            {showResult && (
              <Button onClick={handleNext} className="gap-2">
                {currentQuestion < rosaQuizQuestions.length - 1 ? 'Next Question' : 'Complete'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>

          {currentQuestion === rosaQuizQuestions.length - 1 && showResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
            >
              <p className="text-2xl mb-2">🎉</p>
              <p className="text-lg font-bold text-green-600">
                You scored {score} out of {rosaQuizQuestions.length}!
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default RosaNeighborQuiz;
