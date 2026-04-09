import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home, CheckCircle, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';
import { useLanguage } from '@/components/LanguageContext';

interface ReceiptQuizProps {
  onComplete: () => void;
}

export const ReceiptQuiz: React.FC<ReceiptQuizProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const correctIndex = 1;
  const options = [
    'One dollar eleven and eight cents',
    'One hundred eleven dollars and eight cents',
  ];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === correctIndex) {
      playSuccessSound();
    } else {
      playErrorSound();
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
        <Home className="w-4 h-4" /> Dashboard
      </Button>

      <h2 className="font-fredoka text-xl font-bold text-foreground">🧾 Receipt</h2>
      <p className="text-muted-foreground text-sm">{t('watchVideoChooseAnswer')}</p>

      <div className="rounded-xl overflow-hidden border border-border">
        <video ref={videoRef} src="/videos/module5/m5-total.mp4" controls autoPlay playsInline className="w-full" />
      </div>

      <div className="space-y-3 pt-2">
        <p className="font-medium text-foreground">{t('whatIsTheTotal')}</p>
        {options.map((opt, idx) => (
          <motion.button
            key={idx}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(idx)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium ${
              showResult && idx === correctIndex
                ? 'border-green-500 bg-green-50 dark:bg-green-950'
                : showResult && idx === selected && idx !== correctIndex
                ? 'border-red-500 bg-red-50 dark:bg-red-950'
                : selected === idx
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
            disabled={showResult}
          >
            <span className="flex items-center gap-2">
              {showResult && idx === correctIndex && <CheckCircle className="w-5 h-5 text-green-500" />}
              {showResult && idx === selected && idx !== correctIndex && <XCircle className="w-5 h-5 text-red-500" />}
              {String.fromCharCode(65 + idx)}) {opt}
            </span>
          </motion.button>
        ))}
      </div>

      {showResult && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center pt-4">
          <Button size="lg" onClick={onComplete} className="gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-8">
            {selected === correctIndex ? '✅ ' : ''}{t('next')}
          </Button>
        </motion.div>
      )}
    </div>
  );
};
