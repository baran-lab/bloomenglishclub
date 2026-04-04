import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronLeft, ChevronRight, CheckCircle2, Eye, EyeOff, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuestionItem, congratulatoryMessages } from '@/data/module1Data';
import { useLanguage } from '@/components/LanguageContext';
import { speakText } from '@/utils/speechUtils';

interface ListeningWritingPracticeProps {
  questions: QuestionItem[];
  onComplete: () => void;
  title?: string;
}

export const ListeningWritingPractice: React.FC<ListeningWritingPracticeProps> = ({ 
  questions, 
  onComplete,
  title = 'Listen and Write'
}) => {
  const { selectedLanguage, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Set<string>>(new Set());
  const [showTranslation, setShowTranslation] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = (submittedQuestions.size / questions.length) * 100;
  const allCompleted = submittedQuestions.size === questions.length;

  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleSubmit = () => {
    if (answers[currentQuestion.id]?.trim()) {
      setSubmittedQuestions(prev => new Set([...prev, currentQuestion.id]));
    }
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowTranslation(false);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setShowTranslation(false);
    }
  };

  const getRandomCongrats = () => {
    const msg = congratulatoryMessages[Math.floor(Math.random() * congratulatoryMessages.length)];
    return msg.translations[selectedLanguage] || msg.english;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Question {currentIndex + 1} of {questions.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-module-4"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-br from-module-4/20 to-module-4/10 rounded-2xl p-6 border border-module-4/30"
        >
          <div className="space-y-6">
            {/* Question number badge */}
            <div className="flex justify-center">
              <span className="px-4 py-2 bg-module-4 text-white rounded-full font-bold text-lg">
                Q{currentIndex + 1}
              </span>
            </div>

            {/* Question */}
            <div className="text-center">
              <p className="text-xl font-bold text-foreground mb-4">{currentQuestion.question}</p>
              
              {/* Listen button */}
              <Button onClick={speakQuestion} className="gap-2 bg-module-4 hover:bg-module-4/90">
                <Volume2 className="w-5 h-5" />
                {t('listen')}
              </Button>
            </div>

            {/* Translation help */}
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTranslation(!showTranslation)}
                className="gap-2 text-muted-foreground"
              >
                {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showTranslation ? t('hideTranslation') : t('needHelp')}
              </Button>
              
              <AnimatePresence>
                {showTranslation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 p-3 bg-muted/50 rounded-lg"
                  >
                    <p 
                      className="text-foreground"
                      dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
                    >
                      {currentQuestion.translations[selectedLanguage]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Answer input */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                {t('typeAnswer')}:
              </label>
              <div className="flex gap-2">
                <Input
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder="Type your answer here..."
                  className="flex-1"
                  disabled={submittedQuestions.has(currentQuestion.id)}
                />
                <Button 
                  onClick={handleSubmit}
                  disabled={!answers[currentQuestion.id]?.trim() || submittedQuestions.has(currentQuestion.id)}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  {t('submit')}
                </Button>
              </div>
            </div>

            {/* Submitted confirmation */}
            {submittedQuestions.has(currentQuestion.id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center gap-2 p-4 bg-green-500/20 rounded-xl"
              >
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-600">{t('goodJob')}</p>
                  <p className="text-sm text-green-600/80">Your answer: "{answers[currentQuestion.id]}"</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={goPrev} disabled={currentIndex === 0} className="gap-2">
          <ChevronLeft className="w-4 h-4" />
          {t('previous')}
        </Button>

        {allCompleted && currentIndex === questions.length - 1 ? (
          <Button onClick={onComplete} className="gap-2 bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="w-4 h-4" />
            Complete
          </Button>
        ) : (
          <Button onClick={goNext} disabled={currentIndex === questions.length - 1} className="gap-2">
            {t('next')}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Completion celebration */}
      <AnimatePresence>
        {allCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-2xl border border-green-500/30"
          >
            <p className="text-2xl mb-2">🎉</p>
            <p className="text-lg font-bold text-green-600">{getRandomCongrats()}</p>
            <p className="text-sm text-muted-foreground mt-2">
              You answered all {questions.length} questions!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
