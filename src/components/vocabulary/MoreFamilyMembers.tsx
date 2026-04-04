import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { playSuccessSound } from '@/utils/soundEffects';

interface FamilyItem {
  videoUrl: string;
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswers: string[];
  blanksCount: number;
}

const familyItems: FamilyItem[] = [
  {
    videoUrl: '/videos/vocabulary/M1_V_Cousins.mp4',
    sentenceBefore: 'Vera and Lev are ',
    sentenceAfter: '.',
    correctAnswers: ['cousins'],
    blanksCount: 1,
  },
  {
    videoUrl: '/videos/vocabulary/M1_V_Husband_and_Wife.mp4',
    sentenceBefore: 'Vladimir and Sofiya are ',
    sentenceAfter: '.',
    correctAnswers: ['husband', 'wife'],
    blanksCount: 2,
  },
  {
    videoUrl: '/videos/vocabulary/M1_V_Brothers.mp4',
    sentenceBefore: 'Dmitry and Alex are ',
    sentenceAfter: '.',
    correctAnswers: ['brothers'],
    blanksCount: 1,
  },
  {
    videoUrl: '/videos/vocabulary/M1_V_Uncle.mp4',
    sentenceBefore: "Dmitry is Olga's ",
    sentenceAfter: '.',
    correctAnswers: ['uncle'],
    blanksCount: 1,
  },
  {
    videoUrl: '/videos/vocabulary/M1_V_Aunt.mp4',
    sentenceBefore: "Elena is Leo's ",
    sentenceAfter: '.',
    correctAnswers: ['aunt'],
    blanksCount: 1,
  },
  {
    videoUrl: '/videos/vocabulary/M1_V_Grandmother.mp4',
    sentenceBefore: "Sofiya is Lev's ",
    sentenceAfter: '.',
    correctAnswers: ['grandmother'],
    blanksCount: 1,
  },
  {
    videoUrl: '/videos/vocabulary/M1_V_Grandfather.mp4',
    sentenceBefore: "Vladimir is Noah, Vera, Olga, Leo and Lev's ",
    sentenceAfter: '.',
    correctAnswers: ['grandfather'],
    blanksCount: 1,
  },
  {
    videoUrl: '/videos/vocabulary/M1_V_Grandchildren.mp4',
    sentenceBefore: "Noah, Vera, Olga, Leo and Lev are Vladimir's ",
    sentenceAfter: '.',
    correctAnswers: ['grandchildren'],
    blanksCount: 1,
  },
];

interface MoreFamilyMembersProps {
  onComplete: () => void;
  onBack: () => void;
}

const isCloseEnough = (input: string, correct: string): { match: boolean; hasTip: boolean; tip: string } => {
  const a = input.toLowerCase().trim();
  const b = correct.toLowerCase().trim();
  
  if (a === b) return { match: true, hasTip: false, tip: '' };
  
  // Check for one missing letter
  if (Math.abs(a.length - b.length) <= 1) {
    let diffs = 0;
    const longer = a.length >= b.length ? a : b;
    const shorter = a.length >= b.length ? b : a;
    let j = 0;
    for (let i = 0; i < longer.length; i++) {
      if (shorter[j] !== longer[i]) {
        diffs++;
        if (a.length >= b.length) continue;
      }
      j++;
    }
    if (diffs <= 1) {
      return { match: true, hasTip: true, tip: `Almost! The correct spelling is "${correct}".` };
    }
  }
  
  return { match: false, hasTip: false, tip: '' };
};

export const MoreFamilyMembers: React.FC<MoreFamilyMembersProps> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<({ match: boolean; tip: string } | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const currentItem = familyItems[currentIndex];
  const progress = ((currentIndex) / familyItems.length) * 100;

  useEffect(() => {
    setAnswers(Array(currentItem.blanksCount).fill(''));
    setResults(Array(currentItem.blanksCount).fill(null));
    setShowResult(false);
    setIsPlaying(false);
    
    // Auto-play video
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [currentIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleCheck = () => {
    const newResults = answers.map((answer, i) => {
      const result = isCloseEnough(answer, currentItem.correctAnswers[i]);
      return { match: result.match, tip: result.hasTip ? result.tip : result.match ? '' : `The correct answer is "${currentItem.correctAnswers[i]}".` };
    });
    setResults(newResults);
    setShowResult(true);
    
    if (newResults.every(r => r?.match)) {
      playSuccessSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < familyItems.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleRetry = () => {
    setAnswers(Array(currentItem.blanksCount).fill(''));
    setResults(Array(currentItem.blanksCount).fill(null));
    setShowResult(false);
    inputRefs.current[0]?.focus();
  };

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const allCorrect = results.every(r => r?.match);
  const allFilled = answers.every(a => a.trim().length > 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h3 className="font-fredoka text-lg font-semibold">More Family Members</h3>
          <p className="text-xs text-muted-foreground">{currentIndex + 1} of {familyItems.length}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Video */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-4"
        >
          <div className="relative rounded-xl overflow-hidden bg-black aspect-video">
            <video preload="metadata"
              ref={videoRef}
              src={currentItem.videoUrl}
              className="w-full h-full object-contain"
              onEnded={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              playsInline
            />
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
            >
              {isPlaying ? (
                <Pause className="w-12 h-12 text-primary-foreground" />
              ) : (
                <Play className="w-12 h-12 text-primary-foreground" />
              )}
            </button>
          </div>

          {/* Sentence with blanks */}
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-base font-medium text-foreground leading-relaxed flex flex-wrap items-center gap-1">
              <span>{currentItem.sentenceBefore}</span>
              {currentItem.blanksCount === 1 ? (
                <Input
                  ref={(el) => { inputRefs.current[0] = el; }}
                  value={answers[0] || ''}
                  onChange={(e) => updateAnswer(0, e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && allFilled && !showResult && handleCheck()}
                  placeholder="________"
                  disabled={showResult && allCorrect}
                  className={`inline-block w-40 text-center font-semibold ${
                    showResult && results[0]
                      ? results[0].match
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-destructive bg-destructive/10 text-destructive'
                      : ''
                  }`}
                />
              ) : (
                <>
                  <Input
                    ref={(el) => { inputRefs.current[0] = el; }}
                    value={answers[0] || ''}
                    onChange={(e) => updateAnswer(0, e.target.value)}
                    placeholder="________"
                    disabled={showResult && allCorrect}
                    className={`inline-block w-32 text-center font-semibold ${
                      showResult && results[0]
                        ? results[0].match
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-destructive bg-destructive/10 text-destructive'
                        : ''
                    }`}
                  />
                  <span className="text-muted-foreground">and</span>
                  <Input
                    ref={(el) => { inputRefs.current[1] = el; }}
                    value={answers[1] || ''}
                    onChange={(e) => updateAnswer(1, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && allFilled && !showResult && handleCheck()}
                    placeholder="________"
                    disabled={showResult && allCorrect}
                    className={`inline-block w-32 text-center font-semibold ${
                      showResult && results[1]
                        ? results[1].match
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-destructive bg-destructive/10 text-destructive'
                        : ''
                    }`}
                  />
                </>
              )}
              <span>{currentItem.sentenceAfter}</span>
            </p>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-3 rounded-xl flex items-start gap-2 ${
                  allCorrect ? 'bg-green-50 border border-green-200' : 'bg-destructive/10 border border-destructive/20'
                }`}
              >
                {allCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                )}
                <div className="text-sm">
                  {allCorrect ? (
                    <span className="text-green-700 font-medium">
                      {results.some(r => r?.tip) ? results.find(r => r?.tip)?.tip : '✅ Correct! Great job!'}
                    </span>
                  ) : (
                    <div className="space-y-1">
                      {results.map((r, i) => r && !r.match && (
                        <p key={i} className="text-destructive">{r.tip}</p>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons */}
          <div className="flex gap-2">
            {!showResult ? (
              <Button onClick={handleCheck} disabled={!allFilled} className="flex-1">
                Check Answer
              </Button>
            ) : allCorrect ? (
              <Button onClick={handleNext} className="flex-1 gap-2">
                {currentIndex < familyItems.length - 1 ? 'Next' : 'Complete'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleRetry} variant="outline" className="flex-1">
                Try Again
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
