import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, CheckCircle2, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FamilyQuizItem {
  videoUrl: string;
  sentence: string;
  blank: string;
  options: string[];
  correctAnswer: string;
}

const quizItems: FamilyQuizItem[] = [
  { videoUrl: '/videos/module1/M1_V_D_Mother.mp4', sentence: "Sofiya is Dmitry's __________.", blank: '', options: ['mother', 'sister', 'sister-in-law'], correctAnswer: 'mother' },
  { videoUrl: '/videos/module1/M1_V_D_Father.mp4', sentence: "Vladimir is Dmitry's __________.", blank: '', options: ['brother', 'nephew', 'father'], correctAnswer: 'father' },
  { videoUrl: '/videos/module1/M1_V_D_Brother.mp4', sentence: "Alex is Dmitry's __________.", blank: '', options: ['brother', 'nephew', 'father'], correctAnswer: 'brother' },
  { videoUrl: '/videos/module1/M1_V_D_Sister-in-law.mp4', sentence: "Sara is Dmitry's __________.", blank: '', options: ['sister', 'niece', 'sister-in-law'], correctAnswer: 'sister-in-law' },
  { videoUrl: '/videos/module1/M1_V_D_Nephews.mp4', sentence: "Leo and Lev are Dmitry's __________.", blank: '', options: ['nieces', 'nephews', 'brothers'], correctAnswer: 'nephews' },
  { videoUrl: '/videos/module1/M1_V_D_Sister.mp4', sentence: "Elena is Dmitry's __________.", blank: '', options: ['mother', 'sister-in-law', 'sister'], correctAnswer: 'sister' },
  { videoUrl: '/videos/module1/M1_V_D_Brother-in-law.mp4', sentence: "Davis is Dmitry's __________.", blank: '', options: ['brother-in-law', 'brother', 'nephew'], correctAnswer: 'brother-in-law' },
  { videoUrl: '/videos/module1/M1_V_D_Nephew.mp4', sentence: "Noah is Dmitry's __________.", blank: '', options: ['brother-in-law', 'brother', 'nephew'], correctAnswer: 'nephew' },
  { videoUrl: '/videos/module1/M1_V_D_Nieces.mp4', sentence: "Vera and Olga are Dmitry's __________.", blank: '', options: ['nieces', 'nephews', 'sisters'], correctAnswer: 'nieces' },
];

interface DmitryFamilyQuizProps {
  onComplete: () => void;
  onBack: () => void;
}

export const DmitryFamilyQuiz: React.FC<DmitryFamilyQuizProps> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const current = quizItems[currentIndex];
  const progress = ((currentIndex + (showResult ? 1 : 0)) / quizItems.length) * 100;

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
    setVideoEnded(true);
  };

  const handleDrop = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === current.correctAnswer) {
      setCorrectCount(prev => prev + 1);
      try { new Audio('/sounds/success.mp3').play(); } catch {}
    }
  };

  // Auto-play video when question changes
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const goNext = () => {
    if (currentIndex < quizItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setVideoEnded(false);
      setIsPlaying(false);
    } else {
      onComplete();
    }
  };

  const isCorrect = selectedAnswer === current.correctAnswer;

  // Split sentence around blank
  const parts = current.sentence.split('__________');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <h3 className="font-fredoka text-xl font-bold text-foreground">Dmitry's Family</h3>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary" animate={{ width: `${progress}%` }} />
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Question {currentIndex + 1} of {quizItems.length}
      </p>

      {/* Video */}
      <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
        <video
          ref={videoRef}
          src={current.videoUrl}
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
        >
          {!isPlaying && (
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
              <Play className="w-6 h-6 text-primary-foreground ml-1" />
            </div>
          )}
        </button>
      </div>

      {/* Sentence with blank */}
      <div className="bg-card rounded-2xl border border-border p-5">
        <p className="text-lg font-medium text-foreground text-center">
          {parts[0]}
          <span className={`inline-block min-w-[120px] mx-1 px-3 py-1 rounded-lg border-2 border-dashed text-center font-bold
            ${showResult ? (isCorrect ? 'bg-green-500/20 border-green-500 text-green-600' : 'bg-destructive/20 border-destructive text-destructive') : 'border-primary/50 bg-primary/5'}`}>
            {selectedAnswer || '___'}
          </span>
          {parts[1]}
        </p>

        {showResult && !isCorrect && (
          <p className="text-sm text-center mt-2 text-green-600 font-medium">
            Correct answer: {current.correctAnswer}
          </p>
        )}
      </div>

      {/* Options - drag & drop style (tap to select) */}
      {!showResult && (
        <div className="flex flex-wrap justify-center gap-3">
          {current.options.map((option) => (
            <motion.button
              key={option}
              onClick={() => handleDrop(option)}
              className="px-5 py-3 rounded-xl bg-muted hover:bg-primary/10 border border-border font-medium text-foreground transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      )}

      {/* Next button */}
      {showResult && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
          <Button onClick={goNext} className="gap-2">
            {currentIndex < quizItems.length - 1 ? (
              <>Next <ChevronRight className="w-4 h-4" /></>
            ) : (
              <><CheckCircle2 className="w-4 h-4" /> Complete</>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
};
