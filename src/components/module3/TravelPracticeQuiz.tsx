import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, Play, Volume2, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { playCorrectSound, playIncorrectSound } from '@/utils/soundEffects';
import { useLanguage } from '@/components/LanguageContext';
import { TravelSentence } from '@/data/module3Data';

interface TravelPracticeQuizProps {
  travelVideoUrl: string;
  sentences: TravelSentence[];
  onComplete: () => void;
  title?: string;
  /** If true, show full video + repeat mode. If false, show word-order practice per sentence. */
  mode: 'listen-repeat' | 'word-order';
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ─── Listen & Repeat mode ──────────────────────────────────────────────────
const ListenRepeatMode: React.FC<{
  videoUrl: string;
  sentences: TravelSentence[];
  onComplete: () => void;
}> = ({ videoUrl, sentences, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showTranslations, setShowTranslations] = useState<boolean[]>(sentences.map(() => false));
  const { selectedLanguage } = useLanguage();

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setVideoPlaying(true);
    }
  };

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      setTimeout(() => {
        videoRef.current?.play().catch(() => {});
        setVideoPlaying(true);
      }, 300);
    }
  }, []);

  const toggleTranslation = (i: number) => {
    setShowTranslations(prev => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div className="space-y-4">
      {/* Full conversation video */}
      <Card className="overflow-hidden">
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            onPlay={() => setVideoPlaying(true)}
            onPause={() => setVideoPlaying(false)}
            onEnded={() => setVideoPlaying(false)}
            playsInline
          />
          {!videoPlaying && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </div>
            </button>
          )}
        </div>
        <div className="p-3 flex justify-end">
          <Button variant="outline" size="sm" onClick={handlePlay} className="gap-2">
            <Volume2 className="w-4 h-4" /> Replay
          </Button>
        </div>
      </Card>

      {/* Sentence list with translations */}
      <Card className="p-6 space-y-3">
        <h4 className="text-lg font-medium mb-2">Conversation:</h4>
        {sentences.map((s, i) => (
          <div key={s.id} className="border border-border rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleTranslation(i)}
            >
              <p className="text-base font-medium">{s.text}</p>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${showTranslations[i] ? 'rotate-180' : ''}`}
              />
            </div>
            <AnimatePresence>
              {showTranslations[i] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-3 pb-3 text-sm text-muted-foreground italic">
                    {s.translations[selectedLanguage as keyof typeof s.translations] || s.translations.spanish}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </Card>

      <Button size="lg" onClick={onComplete} className="w-full gap-2">
        <CheckCircle2 className="h-5 w-5" /> Done
      </Button>
    </div>
  );
};

// ─── Word-Order mode (one sentence at a time) ──────────────────────────────
const WordOrderMode: React.FC<{
  sentences: TravelSentence[];
  onComplete: () => void;
}> = ({ sentences, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { selectedLanguage } = useLanguage();

  const sentence = sentences[currentIndex];
  const correctWords = sentence.text.replace(/[?.!,]$/g, '').split(' ');

  useEffect(() => {
    setSelectedWords([]);
    setShowResult(false);
    setIsCorrect(false);
    setShowTranslation(false);
    setAudioPlayed(false);
    setIsPlayingAudio(false);
    // Auto-play audio when sentence loads
    if (sentence.audioUrl) {
      const timer = setTimeout(() => {
        playAudio();
      }, 400);
      return () => clearTimeout(timer);
    } else {
      // No audio, show words immediately
      const words = sentence.text.replace(/[?.!,]/g, '').split(' ');
      setAvailableWords(shuffleArray(words));
      setAudioPlayed(true);
    }
  }, [currentIndex]);

  const playAudio = () => {
    if (audioRef.current && sentence.audioUrl) {
      setIsPlayingAudio(true);
      audioRef.current.src = sentence.audioUrl;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        setIsPlayingAudio(false);
        const words = sentence.text.replace(/[?.!,]/g, '').split(' ');
        setAvailableWords(shuffleArray(words));
        setAudioPlayed(true);
      });
    }
  };

  const handleAudioEnded = () => {
    setIsPlayingAudio(false);
    if (!audioPlayed) {
      setAudioPlayed(true);
      const words = sentence.text.replace(/[?.!,]/g, '').split(' ');
      setAvailableWords(shuffleArray(words));
    }
  };

  const handleWordClick = (word: string, idx: number) => {
    if (showResult) return;
    const newAvail = [...availableWords];
    newAvail.splice(idx, 1);
    setAvailableWords(newAvail);
    setSelectedWords(prev => [...prev, word]);
  };

  const handleSelectedClick = (word: string, idx: number) => {
    if (showResult) return;
    const newSel = [...selectedWords];
    newSel.splice(idx, 1);
    setSelectedWords(newSel);
    setAvailableWords(prev => [...prev, word]);
  };

  const handleCheck = () => {
    const user = selectedWords.join(' ').toLowerCase().replace(/[?.!,]/g, '');
    const correct = correctWords.join(' ').toLowerCase().replace(/[?.!,]/g, '');
    const ok = user === correct;
    setIsCorrect(ok);
    setShowResult(true);
    ok ? playCorrectSound() : playIncorrectSound();
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleRetry = () => {
    const words = sentence.text.replace(/[?.!,]/g, '').split(' ');
    setAvailableWords(shuffleArray(words));
    setSelectedWords([]);
    setShowResult(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    if (showResult && isCorrect) {
      const timer = setTimeout(handleNext, 1500);
      return () => clearTimeout(timer);
    }
  }, [showResult, isCorrect]);

  return (
    <div className="space-y-6">
      <audio ref={audioRef} onEnded={handleAudioEnded} />
      
      {/* Progress */}
      <div className="flex gap-1">
        {sentences.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < currentIndex ? 'bg-green-500' : i === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <p className="text-sm text-center text-muted-foreground">
        Sentence {currentIndex + 1} of {sentences.length}
      </p>

      <Card className="p-6 space-y-4">
        {/* Audio play section */}
        {!audioPlayed ? (
          <div className="text-center space-y-4">
            <h4 className="text-lg font-medium">Listen to the sentence:</h4>
            <motion.div
              animate={isPlayingAudio ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={playAudio}
                disabled={isPlayingAudio}
                className="gap-2 text-lg px-8 py-6"
              >
                <Volume2 className={`w-6 h-6 ${isPlayingAudio ? 'text-primary animate-pulse' : ''}`} />
                {isPlayingAudio ? 'Playing…' : 'Play Audio'}
              </Button>
            </motion.div>
            <p className="text-sm text-muted-foreground">Listen carefully, then arrange the words</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium">Put the words in the correct order:</h4>
              {sentence.audioUrl && (
                <Button variant="ghost" size="sm" onClick={playAudio} className="gap-1">
                  <Volume2 className="w-4 h-4" /> Replay
                </Button>
              )}
            </div>

            {/* Selected words */}
            <div className="min-h-14 p-4 bg-muted/50 rounded-lg border-2 border-dashed border-border flex flex-wrap gap-2">
              {selectedWords.length === 0 ? (
                <span className="text-muted-foreground text-sm">Tap words below to build the sentence…</span>
              ) : (
                selectedWords.map((word, i) => (
                  <motion.button
                    key={`sel-${i}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => handleSelectedClick(word, i)}
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

            {/* Available words */}
            <div className="flex flex-wrap gap-2">
              {availableWords.map((word, i) => (
                <motion.button
                  key={`avail-${i}`}
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

            {/* Translation toggle */}
            <button
              onClick={() => setShowTranslation(v => !v)}
              className="text-xs text-muted-foreground underline"
            >
              {showTranslation ? 'Hide' : 'Show'} translation
            </button>
            <AnimatePresence>
              {showTranslation && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-sm italic text-muted-foreground"
                >
                  {sentence.translations[selectedLanguage as keyof typeof sentence.translations] || sentence.translations.spanish}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Actions */}
            {!showResult ? (
              <Button onClick={handleCheck} disabled={selectedWords.length === 0} className="w-full">
                Check Answer
              </Button>
            ) : isCorrect ? (
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-700 dark:text-green-300 font-medium flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  Correct! "{sentence.text}" {currentIndex < sentences.length - 1 && 'Moving to next…'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                  <p className="text-red-700 dark:text-red-300 font-medium flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    The correct sentence is: "{sentence.text}"
                  </p>
                </div>
                <Button onClick={handleRetry} variant="outline" className="w-full gap-2">
                  <RotateCcw className="h-4 w-4" /> Try Again
                </Button>
                <Button onClick={handleNext} variant="ghost" className="w-full text-muted-foreground">
                  Skip
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

// ─── Main export ───────────────────────────────────────────────────────────
export const TravelPracticeQuiz: React.FC<TravelPracticeQuizProps> = ({
  travelVideoUrl,
  sentences,
  onComplete,
  title,
  mode,
}) => {
  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === 'listen-repeat'
              ? 'Listen to the conversation and repeat. Tap any sentence to see its translation.'
              : 'Listen to each sentence and put the words in the correct order.'}
          </p>
        </div>
      )}

      {mode === 'listen-repeat' ? (
        <ListenRepeatMode videoUrl={travelVideoUrl} sentences={sentences} onComplete={onComplete} />
      ) : (
        <WordOrderMode sentences={sentences} onComplete={onComplete} />
      )}
    </div>
  );
};
