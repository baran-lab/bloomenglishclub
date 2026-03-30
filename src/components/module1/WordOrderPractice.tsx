import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, X, Play, ArrowRight, Volume2, RotateCcw, ArrowLeft, Home } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { playSuccessSound, playErrorSound, playRecordingSuccessSound } from '@/utils/soundEffects';
import { SupportedLanguage } from '@/data/module1Data';

interface WordOrderSlide {
  url: string;
  title: string;
  subtitle?: string;
  correctSentence: string;
  jumbledWords: string[];
  translations: Partial<Record<SupportedLanguage, string>>;
}

interface WordOrderPracticeProps {
  slides: WordOrderSlide[];
  onComplete: () => void;
  onContinue?: () => void;
  onBackToDashboard?: () => void;
  lessonTitle: string;
  lessonDescription?: string;
}

const WordOrderPractice: React.FC<WordOrderPracticeProps> = ({ 
  slides, 
  onComplete, 
  onContinue,
  onBackToDashboard,
  lessonTitle,
  lessonDescription 
}) => {
  const { selectedLanguage } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasWatched, setHasWatched] = useState(false);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedSlides, setCompletedSlides] = useState<Set<number>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === slides.length - 1;
  const allCompleted = completedSlides.size === slides.length;

  // Initialize available words when slide changes
  useEffect(() => {
    if (slide) {
      setAvailableWords([...slide.jumbledWords]);
      setSelectedWords([]);
      setShowResult(false);
      setIsCorrect(false);
      setHasWatched(false);
    }
  }, [currentSlide, slide]);

  // Auto-play video when slide changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay might be blocked
      });
    }
  }, [currentSlide]);

  const handleVideoEnded = () => {
    setHasWatched(true);
  };

  const handleWordClick = (word: string, index: number) => {
    if (showResult) return;
    
    // Remove word from available and add to selected
    const newAvailable = [...availableWords];
    newAvailable.splice(index, 1);
    setAvailableWords(newAvailable);
    setSelectedWords([...selectedWords, word]);
  };

  const handleSelectedWordClick = (word: string, index: number) => {
    if (showResult) return;
    
    // Remove word from selected and add back to available
    const newSelected = [...selectedWords];
    newSelected.splice(index, 1);
    setSelectedWords(newSelected);
    setAvailableWords([...availableWords, word]);
  };

  const handleCheckAnswer = () => {
    const userSentence = selectedWords.join(' ');
    const correct = userSentence.toLowerCase() === slide.correctSentence.toLowerCase();
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
    }
  };

  // Auto-advance after correct answer
  useEffect(() => {
    if (showResult && isCorrect) {
      const timer = setTimeout(() => {
        handleNextSlide();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showResult, isCorrect]);

  const handleTryAgain = () => {
    setAvailableWords([...slide.jumbledWords]);
    setSelectedWords([]);
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
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {onBackToDashboard && (
            <Button variant="ghost" size="icon" onClick={onBackToDashboard}>
              <Home className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h3 className="text-lg font-semibold text-foreground">{lessonTitle}</h3>
            {lessonDescription && (
              <p className="text-sm text-muted-foreground">{lessonDescription}</p>
            )}
          </div>
        </div>
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

      {/* Word Ordering Section */}
      <AnimatePresence mode="wait">
        {hasWatched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h4 className="text-lg font-medium mb-2">
                Put the words in the correct order:
              </h4>
              {selectedLanguage && slide.translations[selectedLanguage] && (
                <p className="text-sm text-muted-foreground mb-4">
                  {slide.translations[selectedLanguage]}
                </p>
              )}

              {/* Selected Words Area */}
              <div className="min-h-16 p-4 bg-muted/50 rounded-lg border-2 border-dashed border-border mb-4 flex flex-wrap gap-2">
                {selectedWords.length === 0 ? (
                  <span className="text-muted-foreground text-sm">Click the words below to build your sentence...</span>
                ) : (
                  selectedWords.map((word, index) => (
                    <motion.button
                      key={`selected-${index}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => handleSelectedWordClick(word, index)}
                      disabled={showResult}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        showResult
                          ? isCorrect
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {word}
                    </motion.button>
                  ))
                )}
              </div>

              {/* Available Words */}
              <div className="flex flex-wrap gap-2 mb-6">
                {availableWords.map((word, index) => (
                  <motion.button
                    key={`available-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => handleWordClick(word, index)}
                    disabled={showResult}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                  >
                    {word}
                  </motion.button>
                ))}
              </div>

              {/* Actions */}
              {!showResult ? (
                <Button
                  onClick={handleCheckAnswer}
                  disabled={selectedWords.length === 0}
                  className="w-full"
                >
                  Check Answer
                </Button>
              ) : isCorrect ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <p className="text-green-700 dark:text-green-300 font-medium flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      Correct! "{slide.correctSentence}" {!isLastSlide && 'Moving to next...'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="text-red-700 dark:text-red-300 font-medium flex items-center gap-2">
                      <X className="h-5 w-5" />
                      Not quite. The correct answer is: "{slide.correctSentence}"
                    </p>
                  </div>
                  <Button onClick={handleTryAgain} variant="outline" className="w-full gap-2">
                    <RotateCcw className="h-4 w-4" />
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
            Watch the video above, then put the words in order.
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

export default WordOrderPractice;
