import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, X, Play, ArrowRight, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/LanguageContext';
import { playSuccessSound, playErrorSound, playRecordingSuccessSound } from '@/utils/soundEffects';
import { QuizQuestion } from '@/data/module1Data';

interface VideoSlideWithQuiz {
  url: string;
  title: string;
  subtitle?: string;
  quizQuestion: QuizQuestion;
}

interface VideoPracticeQuizProps {
  slides: VideoSlideWithQuiz[];
  onComplete: () => void;
  onContinue?: () => void;
  lessonTitle: string;
}

const VideoPracticeQuiz = ({ slides, onComplete, onContinue, lessonTitle }: VideoPracticeQuizProps) => {
  const { selectedLanguage } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedSlides, setCompletedSlides] = useState<Set<number>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);

  const slide = slides[currentSlide];
  const question = slide.quizQuestion;
  const isLastSlide = currentSlide === slides.length - 1;
  const allCompleted = completedSlides.size === slides.length;

  const handleVideoEnded = () => {
    setHasWatched(true);
  };

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      playRecordingSuccessSound();
      setCompletedSlides(prev => new Set([...prev, currentSlide]));
    } else {
      playErrorSound();
    }
  };

  const handleNextSlide = () => {
    if (isLastSlide) {
      playSuccessSound();
      onComplete();
    } else {
      setCurrentSlide(prev => prev + 1);
      setHasWatched(false);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  const replayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">{lessonTitle}</h3>
        <span className="text-sm text-muted-foreground">
          Slide {currentSlide + 1} of {slides.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 mb-6">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-colors ${
              completedSlides.has(index)
                ? 'bg-green-500'
                : index === currentSlide
                ? 'bg-primary'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Video Section */}
      <Card className="overflow-hidden">
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={slide.url}
            className="w-full h-full object-contain"
            controls
            onEnded={handleVideoEnded}
          />
        </div>
        <div className="p-4 bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground">{slide.title}</h4>
              {slide.subtitle && (
                <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={replayVideo}
              className="gap-2"
            >
              <Volume2 className="h-4 w-4" />
              Replay
            </Button>
          </div>
        </div>
      </Card>

      {/* Quiz Section */}
      <AnimatePresence mode="wait">
        {hasWatched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h4 className="text-lg font-medium mb-4">
                {question.question}
              </h4>
              {selectedLanguage !== 'spanish' && question.translations[selectedLanguage] && (
                <p className="text-sm text-muted-foreground mb-4">
                  {question.translations[selectedLanguage]}
                </p>
              )}

              <div className="space-y-3 mb-6">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      selectedAnswer === index
                        ? showResult
                          ? isCorrect && index === question.correctAnswer
                            ? 'border-green-500 bg-green-50 dark:bg-green-950'
                            : !isCorrect && index === selectedAnswer
                            ? 'border-red-500 bg-red-50 dark:bg-red-950'
                            : 'border-primary bg-primary/10'
                          : 'border-primary bg-primary/10'
                        : showResult && index === question.correctAnswer
                        ? 'border-green-500 bg-green-50 dark:bg-green-950'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option}</span>
                      {showResult && index === question.correctAnswer && (
                        <Check className="h-5 w-5 text-green-600" />
                      )}
                      {showResult && !isCorrect && index === selectedAnswer && (
                        <X className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {!showResult ? (
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full"
                >
                  Submit Answer
                </Button>
              ) : isCorrect ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-green-700 dark:text-green-300 font-medium flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      Correct! Great job!
                    </p>
                  </div>
                  <Button onClick={handleNextSlide} className="w-full gap-2">
                    {isLastSlide ? 'Complete Lesson' : 'Next Slide'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-red-700 dark:text-red-300 font-medium flex items-center gap-2">
                      <X className="h-5 w-5" />
                      Not quite. Try again!
                    </p>
                  </div>
                  <Button onClick={handleTryAgain} variant="outline" className="w-full">
                    Try Again
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Watch video prompt */}
      {!hasWatched && (
        <Card className="p-6 text-center">
          <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">
            Watch the video above, then answer the question.
          </p>
        </Card>
      )}

      {/* Completion section */}
      {allCompleted && onContinue && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button onClick={onContinue} size="lg" className="gap-2">
            Continue to Next Lesson
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default VideoPracticeQuiz;
