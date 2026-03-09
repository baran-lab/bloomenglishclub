import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Play, Volume2, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { playCorrectSound, playIncorrectSound } from '@/utils/soundEffects';

export interface Practice3FillBlank {
  videoUrl: string;
  words: string[]; // available words to drag
  sentenceParts: string[]; // sentence with blanks, e.g. ["_____ to Bliss Avenue. _____ Main Street. It's on the _____ of Bliss Avenue and Main Street."]
  correctAnswers: string[]; // ordered answers for blanks
}

export interface Practice3ReadAlong {
  videoUrl: string;
  sentence: string; // full sentence to read/highlight
}

export interface Practice3Item {
  type: 'fill-blank' | 'read-along';
  fillBlank?: Practice3FillBlank;
  readAlong?: Practice3ReadAlong;
}

interface Practice3QuizProps {
  items: Practice3Item[];
  onComplete: () => void;
  title?: string;
}

// Fill-blank sub-component
const FillBlankExercise: React.FC<{
  data: Practice3FillBlank;
  onDone: () => void;
  isLast: boolean;
}> = ({ data, onDone, isLast }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasWatched, setHasWatched] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [filledBlanks, setFilledBlanks] = useState<(string | null)[]>(
    new Array(data.correctAnswers.length).fill(null)
  );
  const [availableWords, setAvailableWords] = useState<string[]>([...data.words]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setVideoPlaying(false);
    setHasWatched(true);
  };

  const handleWordClick = (word: string, wordIndex: number) => {
    if (showResult) return;
    // Find first empty blank
    const blankIndex = filledBlanks.findIndex(b => b === null);
    if (blankIndex === -1) return;
    const newBlanks = [...filledBlanks];
    newBlanks[blankIndex] = word;
    setFilledBlanks(newBlanks);
    const newAvailable = [...availableWords];
    newAvailable.splice(wordIndex, 1);
    setAvailableWords(newAvailable);
  };

  const handleBlankClick = (blankIndex: number) => {
    if (showResult) return;
    const word = filledBlanks[blankIndex];
    if (!word) return;
    const newBlanks = [...filledBlanks];
    newBlanks[blankIndex] = null;
    setFilledBlanks(newBlanks);
    setAvailableWords([...availableWords, word]);
  };

  const handleCheck = () => {
    const correct = filledBlanks.every(
      (word, i) => word?.toLowerCase() === data.correctAnswers[i].toLowerCase()
    );
    setIsCorrect(correct);
    setShowResult(true);
    correct ? playCorrectSound() : playIncorrectSound();
  };

  const handleRetry = () => {
    setFilledBlanks(new Array(data.correctAnswers.length).fill(null));
    setAvailableWords([...data.words]);
    setShowResult(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    if (showResult && isCorrect) {
      const timer = setTimeout(onDone, 1500);
      return () => clearTimeout(timer);
    }
  }, [showResult, isCorrect]);

  // Render sentence with blanks
  const renderSentence = () => {
    const text = data.sentenceParts[0];
    const parts = text.split('_____');
    return (
      <p className="text-lg leading-relaxed">
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            <span>{part}</span>
            {i < parts.length - 1 && (
              <button
                onClick={() => handleBlankClick(i)}
                className={`inline-block min-w-[80px] px-3 py-1 mx-1 rounded-lg border-2 border-dashed text-center font-bold transition-all ${
                  filledBlanks[i]
                    ? showResult
                      ? filledBlanks[i]?.toLowerCase() === data.correctAnswers[i].toLowerCase()
                        ? 'border-green-500 bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300'
                        : 'border-red-500 bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                      : 'border-primary bg-primary/10 text-primary cursor-pointer'
                    : 'border-muted-foreground/30 bg-muted/50 text-muted-foreground'
                }`}
                disabled={showResult}
              >
                {filledBlanks[i] || '______'}
              </button>
            )}
          </React.Fragment>
        ))}
      </p>
    );
  };

  return (
    <div className="space-y-4">
      {/* Video */}
      <Card className="overflow-hidden">
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={data.videoUrl}
            className="w-full h-full object-contain"
            onEnded={handleVideoEnd}
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            playsInline
          />
          {!videoPlaying && (
            <button
              onClick={handlePlayVideo}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
            </button>
          )}
        </div>
        <div className="p-3 flex justify-end">
          <Button variant="outline" size="sm" onClick={handlePlayVideo} className="gap-2">
            <Volume2 className="w-4 h-4" /> Replay
          </Button>
        </div>
      </Card>

      {hasWatched && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 space-y-4">
            <h4 className="text-lg font-medium">Drag the words to complete the sentence:</h4>
            
            <div className="bg-muted/30 p-4 rounded-lg">{renderSentence()}</div>

            {/* Available words */}
            <div className="flex flex-wrap gap-2">
              {availableWords.map((word, i) => (
                <motion.button
                  key={`word-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => handleWordClick(word, i)}
                  disabled={showResult}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  {word}
                </motion.button>
              ))}
            </div>

            {!showResult ? (
              <Button
                onClick={handleCheck}
                disabled={filledBlanks.some(b => b === null)}
                className="w-full"
              >
                Check Answer
              </Button>
            ) : isCorrect ? (
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-700 dark:text-green-300 font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Correct! {!isLast && 'Moving to next...'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-red-700 dark:text-red-300 font-medium flex items-center gap-2">
                    <XCircle className="h-5 w-5" /> Not quite. Answers: {data.correctAnswers.join(' / ')}
                  </p>
                </div>
                <Button onClick={handleRetry} variant="outline" className="w-full gap-2">
                  <RotateCcw className="h-4 w-4" /> Try Again
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {!hasWatched && (
        <Card className="p-6 text-center">
          <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Listen to the video, then fill in the blanks.</p>
        </Card>
      )}
    </div>
  );
};

// Read-along sub-component
const ReadAlongExercise: React.FC<{
  data: Practice3ReadAlong;
  onDone: () => void;
  isLast: boolean;
}> = ({ data, onDone, isLast }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasWatched, setHasWatched] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [readingDone, setReadingDone] = useState(false);

  const words = data.sentence.split(' ');

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoPlaying(true);
    }
  };

  const handleVideoEnd = () => {
    setVideoPlaying(false);
    setHasWatched(true);
  };

  const startReading = () => {
    setIsReading(true);
    setHighlightIndex(0);
  };

  useEffect(() => {
    if (!isReading || highlightIndex < 0) return;
    if (highlightIndex >= words.length) {
      setIsReading(false);
      setReadingDone(true);
      playCorrectSound();
      const timer = setTimeout(onDone, 1500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setHighlightIndex(prev => prev + 1);
    }, 500);
    return () => clearTimeout(timer);
  }, [highlightIndex, isReading]);

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={data.videoUrl}
            className="w-full h-full object-contain"
            onEnded={handleVideoEnd}
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            playsInline
          />
          {!videoPlaying && (
            <button
              onClick={handlePlayVideo}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
            </button>
          )}
        </div>
        <div className="p-3 flex justify-end">
          <Button variant="outline" size="sm" onClick={handlePlayVideo} className="gap-2">
            <Volume2 className="w-4 h-4" /> Replay
          </Button>
        </div>
      </Card>

      {hasWatched && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 space-y-4">
            <h4 className="text-lg font-medium">Read the directions aloud:</h4>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-xl leading-relaxed">
                {words.map((word, i) => (
                  <span
                    key={i}
                    className={`transition-colors duration-200 ${
                      i < highlightIndex
                        ? 'text-primary font-bold'
                        : i === highlightIndex
                        ? 'text-primary font-bold bg-primary/20 px-1 rounded'
                        : 'text-foreground'
                    }`}
                  >
                    {word}{' '}
                  </span>
                ))}
              </p>
            </div>

            {!isReading && !readingDone && (
              <Button onClick={startReading} className="w-full gap-2">
                <Mic className="h-5 w-5" /> Start Reading
              </Button>
            )}

            {readingDone && (
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-700 dark:text-green-300 font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Great reading! {!isLast && 'Moving to next...'}
                </p>
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {!hasWatched && (
        <Card className="p-6 text-center max-w-lg mx-auto">
          <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Listen to the video, then read the directions aloud.</p>
        </Card>
      )}
    </div>
  );
};

// Main component
export const Practice3Quiz: React.FC<Practice3QuizProps> = ({ items, onComplete, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const item = items[currentIndex];
  const isLast = currentIndex === items.length - 1;

  const handleItemDone = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">Listen and complete the exercises</p>
        </div>
      )}

      <div className="flex gap-1">
        {items.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < currentIndex ? 'bg-green-500' : i === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-center text-muted-foreground">
        Exercise {currentIndex + 1} of {items.length}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          {item.type === 'fill-blank' && item.fillBlank && (
            <FillBlankExercise data={item.fillBlank} onDone={handleItemDone} isLast={isLast} />
          )}
          {item.type === 'read-along' && item.readAlong && (
            <ReadAlongExercise data={item.readAlong} onDone={handleItemDone} isLast={isLast} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
