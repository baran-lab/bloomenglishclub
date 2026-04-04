import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Mic, MicOff, Square, CheckCircle2, ChevronRight, RotateCcw, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { playSuccessSound } from '@/utils/soundEffects';

interface QuizPair {
  questionVideo: string;
  answerVideo: string;
  correctAnswer: string;
  questionLabel: string;
}

const quizPairs: QuizPair[] = [
  {
    questionVideo: '/videos/vocabulary/M1_V_Who_is_Sara.mp4',
    answerVideo: '/videos/vocabulary/M1_V_Sister-in-law.mp4',
    correctAnswer: 'Sister-in-law',
    questionLabel: 'Who is Sara?',
  },
  {
    questionVideo: '/videos/vocabulary/M1_V_Who_is_Elena.mp4',
    answerVideo: '/videos/vocabulary/M1_V_Sister.mp4',
    correctAnswer: 'Sister',
    questionLabel: 'Who is Elena?',
  },
  {
    questionVideo: '/videos/vocabulary/M1_V_Who_is_Vera.mp4',
    answerVideo: '/videos/vocabulary/M1_V_Niece.mp4',
    correctAnswer: 'Niece',
    questionLabel: 'Who is Vera?',
  },
  {
    questionVideo: '/videos/vocabulary/M1_V_Who_is_Lev.mp4',
    answerVideo: '/videos/vocabulary/M1_V_Nephew.mp4',
    correctAnswer: 'Nephew',
    questionLabel: 'Who is Lev?',
  },
  {
    questionVideo: '/videos/vocabulary/M1_V_Who_is_Alex.mp4',
    answerVideo: '/videos/vocabulary/M1_V_Brother.mp4',
    correctAnswer: 'Brother',
    questionLabel: 'Who is Alex?',
  },
];

interface FamilyQuizTimeProps {
  onComplete: () => void;
  onBack: () => void;
}

type Phase = 'question' | 'record' | 'reveal';

export const FamilyQuizTime: React.FC<FamilyQuizTimeProps> = ({ onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('question');
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [videoEnded, setVideoEnded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const pair = quizPairs[currentIndex];
  const progress = ((currentIndex + 1) / quizPairs.length) * 100;

  // Auto-play video when phase or index changes
  useEffect(() => {
    setVideoEnded(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentIndex, phase]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
    if (phase === 'question') {
      setPhase('record');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      console.error('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleReveal = () => {
    playSuccessSound();
    setPhase('reveal');
  };

  const handleNext = () => {
    if (currentIndex < quizPairs.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setPhase('question');
      setAudioUrl(null);
    } else {
      onComplete();
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      new Audio(audioUrl).play();
    }
  };

  const currentVideoSrc = phase === 'reveal' ? pair.answerVideo : pair.questionVideo;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h2 className="font-fredoka text-lg font-bold text-foreground">Quiz Time</h2>
          <p className="text-xs text-muted-foreground">
            Question {currentIndex + 1} of {quizPairs.length}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Video */}
      <div className="rounded-xl overflow-hidden bg-black aspect-video">
        <video preload="metadata"
          ref={videoRef}
          src={currentVideoSrc}
          className="w-full h-full object-contain"
          onEnded={handleVideoEnd}
          playsInline
          controls={false}
        />
      </div>

      {/* Phase content */}
      <AnimatePresence mode="wait">
        {phase === 'question' && (
          <motion.div
            key="question"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center p-4 bg-primary/5 rounded-xl"
          >
            <p className="font-fredoka text-lg font-semibold text-foreground">{pair.questionLabel}</p>
            <p className="text-sm text-muted-foreground mt-1">Watch the video...</p>
          </motion.div>
        )}

        {phase === 'record' && (
          <motion.div
            key="record"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <div className="text-center p-4 bg-accent/10 rounded-xl">
              <p className="font-fredoka text-base font-semibold text-foreground">
                🎤 Record your answer
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Who is this person? Say the answer!
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              {!isRecording && !audioUrl && (
                <Button
                  onClick={startRecording}
                  className="rounded-full h-14 w-14 bg-destructive hover:bg-destructive/90"
                >
                  <Mic className="w-6 h-6" />
                </Button>
              )}

              {isRecording && (
                <Button
                  onClick={stopRecording}
                  className="rounded-full h-14 w-14 bg-destructive hover:bg-destructive/90 animate-pulse"
                >
                  <Square className="w-5 h-5" />
                </Button>
              )}

              {audioUrl && !isRecording && (
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" onClick={playAudio} className="rounded-full h-12 w-12">
                    <Volume2 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => { setAudioUrl(null); }}
                    className="rounded-full h-12 w-12"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={handleReveal}
                    className="rounded-full px-6 h-12 gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    See Answer
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {phase === 'reveal' && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <div className="text-center p-5 bg-primary/10 rounded-xl border border-primary/20">
              <p className="text-sm text-muted-foreground">The answer is:</p>
              <p className="font-fredoka text-2xl font-bold text-primary mt-1">
                {pair.correctAnswer}
              </p>
            </div>

            <div className="flex justify-center">
              <Button onClick={handleNext} className="rounded-full px-8 h-12 gap-2">
                {currentIndex < quizPairs.length - 1 ? (
                  <>Next <ChevronRight className="w-4 h-4" /></>
                ) : (
                  <>Complete 🎉</>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
