import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Home, Mic, Square, RotateCcw, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';
import { speakText } from '@/utils/speechUtils';
import { useLanguage } from '@/components/LanguageContext';

interface SupermarketFlyerQuizProps {
  onComplete: () => void;
}

const questions = [
  {
    video: '/videos/module5/m5-flyer-soda.mp4',
    question: 'How much is a can of soda?',
    acceptedAnswers: [
      'it is one dollar and ninety-nine cents',
      "it's one dollar and ninety-nine cents",
      'one dollar and ninety-nine cents',
      'one ninety-nine',
      'it is one ninety-nine',
      "it's one ninety-nine",
    ],
  },
  {
    video: '/videos/module5/m5-flyer-bread.mp4',
    question: 'How much is a loaf of bread?',
    acceptedAnswers: [
      "it's one dollar and nine cents",
      'it is one dollar and nine cents',
      'one dollar and nine cents',
    ],
  },
  {
    video: '/videos/module5/m5-flyer-cilantro.mp4',
    question: 'How much is a bunch of cilantro?',
    acceptedAnswers: [
      "it's one dollar and nineteen cents",
      'it is one dollar and nineteen cents',
      'one dollar and nineteen cents',
      "it's one nineteen",
      'it is one nineteen',
      'one nineteen',
    ],
  },
  {
    video: '/videos/module5/m5-flyer-apples.mp4',
    question: 'How much are the apples?',
    acceptedAnswers: [
      'it is ninety-nine cents',
      "it's ninety-nine cents",
      'it is ninety-nine cents each',
      "it's ninety-nine cents each",
      'ninety-nine cents',
      'ninety-nine cents each',
    ],
  },
];

function normalize(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}

function isCloseEnough(input: string, target: string): boolean {
  const a = normalize(input);
  const b = normalize(target);
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 3) return false;
  let diff = 0;
  const longer = a.length >= b.length ? a : b;
  const shorter = a.length < b.length ? a : b;
  let j = 0;
  for (let i = 0; i < longer.length && j < shorter.length; i++) {
    if (longer[i] !== shorter[j]) {
      diff++;
      if (a.length !== b.length) continue;
    }
    j++;
  }
  diff += longer.length - j;
  return diff <= 3;
}

export const SupermarketFlyerQuiz: React.FC<SupermarketFlyerQuizProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const recognitionRef = useRef<any>(null);

  const q = questions[currentIdx];

  const handleListen = () => {
    speakText(q.question, 0.8);
  };

  const handleRecord = async () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setFeedback({ correct: false, message: "Speech recognition isn't supported in this browser. Try Chrome." });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
      const results: string[] = [];
      for (let i = 0; i < event.results[0].length; i++) {
        results.push(event.results[0][i].transcript);
      }

      const bestMatch = results.find(r =>
        q.acceptedAnswers.some(a => isCloseEnough(r, a))
      );

      if (bestMatch) {
        setTranscript(bestMatch);
        setFeedback({ correct: true, message: 'Great job! That was clear. 🎉' });
        playSuccessSound();
        setCorrectCount(prev => prev + 1);
      } else {
        setTranscript(results[0] || '');
        setFeedback({
          correct: false,
          message: "You're doing great! Keep practicing — you're getting closer! 💪",
        });
        playErrorSound();
      }
    };

    recognition.onerror = () => {
      setIsRecording(false);
      setFeedback({ correct: false, message: "I couldn't hear you. Try again!" });
    };

    recognition.onend = () => setIsRecording(false);

    setTranscript('');
    setFeedback(null);
    setIsRecording(true);
    recognition.start();
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setTranscript('');
      setFeedback(null);
    } else {
      setIsComplete(true);
    }
  };

  const handleRetry = () => {
    setTranscript('');
    setFeedback(null);
  };

  if (isComplete) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 p-6 bg-accent rounded-xl border border-border">
          <div className="text-4xl">🛒</div>
          <h3 className="font-fredoka text-xl font-bold text-primary">
            Supermarket Flyer Complete!
          </h3>
          <p className="text-muted-foreground">
            You answered {correctCount}/{questions.length} correctly on the first try!
          </p>
          <Button onClick={onComplete} className="gap-2">{t('next')} <ArrowRight className="w-4 h-4" /></Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" /> Dashboard
        </Button>
        <span className="text-sm text-muted-foreground">{currentIdx + 1}/{questions.length}</span>
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">🛒 Supermarket Flyer</h2>
        <p className="text-muted-foreground text-sm">{t('watchVideoRecordAnswer')}</p>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full"
          animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="rounded-2xl overflow-hidden bg-black shadow-lg">
        <video ref={videoRef} src={q.video} controls autoPlay className="w-full aspect-video" key={q.video} />
      </div>

      <div className="text-center space-y-3">
        <Button variant="outline" onClick={handleListen} className="gap-2">
          🔊 {t('hearQuestion')}
        </Button>
        <p className="font-medium text-foreground text-lg">"{q.question}"</p>
      </div>

      <div className="flex justify-center">
        <motion.button
          onClick={handleRecord}
          whileTap={{ scale: 0.95 }}
          className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all ${
            isRecording
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-primary text-primary-foreground hover:opacity-90'
          }`}
        >
          {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </motion.button>
      </div>

      {transcript && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-center p-3 bg-card rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">You said:</p>
          <p className="font-medium text-foreground">"{transcript}"</p>
        </motion.div>
      )}

      {feedback && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className={`text-center p-4 rounded-xl border-2 ${
            feedback.correct
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700'
              : 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700'
          }`}>
          <p className="font-medium">{feedback.message}</p>
        </motion.div>
      )}

      {feedback && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center gap-3">
          {!feedback.correct && (
            <Button variant="outline" onClick={handleRetry} className="gap-2">
              <RotateCcw className="w-4 h-4" /> {t('tryAgain')}
            </Button>
          )}
          <Button onClick={handleNext} className="gap-2">
            {feedback.correct ? (
              <>{currentIdx < questions.length - 1 ? t('next') : 'See Results'} <ArrowRight className="w-4 h-4" /></>
            ) : (
              <><SkipForward className="w-4 h-4" /> Skip</>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
};
