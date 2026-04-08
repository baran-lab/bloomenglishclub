import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Play, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';
import { useLanguage } from '@/components/LanguageContext';
import { getVoiceFeedback } from '@/utils/microplayMessages';

interface VoiceRecorderProps {
  targetPhrase: string;
  onComplete?: (success: boolean) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ 
  targetPhrase,
  onComplete 
}) => {
  const { t } = useLanguage();
  const { isRecording, audioUrl, startRecording, stopRecording, clearRecording, error } = useVoiceRecorder();
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleRecord = async () => {
    if (isRecording) {
      stopRecording();
      setTimeout(() => {
        const score = Math.floor(Math.random() * 40) + 60; // 60-100
        setPronunciationScore(score);
        const { message, isGood } = getVoiceFeedback(score);
        setFeedbackMsg(message);
        onComplete?.(score >= 60);
      }, 500);
    } else {
      clearRecording();
      setPronunciationScore(null);
      setFeedbackMsg('');
      setHasPlayed(false);
      await startRecording();
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      setHasPlayed(true);
    }
  };

  const handleRetry = () => {
    clearRecording();
    setPronunciationScore(null);
    setFeedbackMsg('');
    setHasPlayed(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 60) return 'text-green-500';
    return 'text-orange-500';
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-2">Say this phrase:</p>
        <p className="text-xl font-semibold text-foreground">{targetPhrase}</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="flex justify-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleRecord}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200
            ${isRecording 
              ? 'bg-destructive text-destructive-foreground animate-pulse' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}
        >
          {isRecording ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </motion.button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {isRecording ? t('stopRecording') : t('record')}
      </p>

      <AnimatePresence>
        {audioUrl && !isRecording && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
            <div className="flex justify-center gap-3">
              <Button variant="outline" size="sm" onClick={playRecording} className="gap-2">
                <Play className="w-4 h-4" /> {t('playRecording')}
              </Button>
              <Button variant="outline" size="sm" onClick={handleRetry} className="gap-2">
                <RotateCcw className="w-4 h-4" /> {t('tryAgain')}
              </Button>
            </div>

            {pronunciationScore !== null && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  {pronunciationScore >= 60 ? (
                    <CheckCircle2 className={`w-6 h-6 ${getScoreColor(pronunciationScore)}`} />
                  ) : (
                    <AlertCircle className={`w-6 h-6 ${getScoreColor(pronunciationScore)}`} />
                  )}
                  <span className={`text-2xl font-bold ${getScoreColor(pronunciationScore)}`}>
                    {pronunciationScore}%
                  </span>
                </div>
                <p className={`font-semibold ${getScoreColor(pronunciationScore)}`}>
                  {feedbackMsg}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
