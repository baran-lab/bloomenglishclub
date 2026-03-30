import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, CheckCircle, XCircle, ArrowRight, RotateCcw, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/components/LanguageContext';
import { SupportedLanguage } from '@/data/module1Data';

interface SmartQuestion {
  id: string;
  question: string;
  audioQuestion?: string;
  translations: Partial<Record<SupportedLanguage, string>>;
  validationPattern: 'name' | 'country' | 'age' | 'marital' | 'job' | 'workplace';
  acceptedPrefixes: string[];
}

interface SmartAnswerPracticeProps {
  questions: SmartQuestion[];
  onComplete: () => void;
  title?: string;
  userName?: string;
}

// Smart validation patterns
const validateAnswer = (answer: string, pattern: SmartQuestion['validationPattern'], prefixes: string[]): { isValid: boolean; feedback: string } => {
  const normalizedAnswer = answer.trim().toLowerCase();
  
  // Check if answer starts with an accepted prefix
  const hasValidPrefix = prefixes.some(prefix => 
    normalizedAnswer.startsWith(prefix.toLowerCase())
  );
  
  if (!hasValidPrefix) {
    const examplePrefix = prefixes[0];
    return { 
      isValid: false, 
      feedback: `Start your answer with "${examplePrefix}..."` 
    };
  }

  // Extract the content after the prefix
  let content = normalizedAnswer;
  for (const prefix of prefixes) {
    if (normalizedAnswer.startsWith(prefix.toLowerCase())) {
      content = normalizedAnswer.slice(prefix.length).trim();
      break;
    }
  }

  // Pattern-specific validation
  switch (pattern) {
    case 'name':
      // Accept any name with proper prefix
      if (content.length < 1) {
        return { isValid: false, feedback: 'Please include your name.' };
      }
      return { isValid: true, feedback: 'Great job!' };

    case 'country':
      // Accept any country name with proper prefix
      if (content.length < 2) {
        return { isValid: false, feedback: 'Please include your country.' };
      }
      return { isValid: true, feedback: 'Perfect!' };

    case 'age':
      // Accept numbers or written numbers
      const hasNumber = /\d+/.test(content) || 
        /one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety/i.test(content);
      if (!hasNumber) {
        return { isValid: false, feedback: 'Please include your age as a number.' };
      }
      return { isValid: true, feedback: 'Excellent!' };

    case 'marital':
      // Accept married, single, divorced, widowed
      const maritalTerms = ['married', 'single', 'divorced', 'widowed'];
      const hasMaritalStatus = maritalTerms.some(term => content.includes(term));
      if (!hasMaritalStatus) {
        return { isValid: false, feedback: 'Say "married", "single", "divorced", or "widowed".' };
      }
      return { isValid: true, feedback: 'Great answer!' };

    case 'job':
      // Accept any job title with proper prefix
      if (content.length < 2) {
        return { isValid: false, feedback: 'Please include your job.' };
      }
      return { isValid: true, feedback: 'Well done!' };

    case 'workplace':
      // Accept any workplace with proper prefix
      if (content.length < 2) {
        return { isValid: false, feedback: 'Please include your workplace.' };
      }
      return { isValid: true, feedback: 'Perfect answer!' };

    default:
      return { isValid: content.length > 0, feedback: content.length > 0 ? 'Good!' : 'Please provide an answer.' };
  }
};

export const SmartAnswerPractice: React.FC<SmartAnswerPracticeProps> = ({
  questions,
  onComplete,
  title = 'Practice Session',
  userName = '',
}) => {
  const { selectedLanguage, t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [validation, setValidation] = useState<{ isValid: boolean; feedback: string } | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<Set<string>>(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((completedQuestions.size) / questions.length) * 100;
  const allComplete = completedQuestions.size === questions.length;

  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentQuestion.question);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = () => {
    const result = validateAnswer(userAnswer, currentQuestion.validationPattern, currentQuestion.acceptedPrefixes);
    setValidation(result);
    
    if (result.isValid) {
      setCompletedQuestions(prev => new Set([...prev, currentQuestion.id]));
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setValidation(null);
      setShowTranslation(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else if (allComplete) {
      onComplete();
    }
  };

  const handleRetry = () => {
    setUserAnswer('');
    setValidation(null);
    inputRef.current?.focus();
  };

  const congratsMessages = [
    `Great job, ${userName || 'friend'}! 🌟`,
    `Excellent work, ${userName || 'friend'}! ✨`,
    `Perfect answer, ${userName || 'friend'}! 🎯`,
    `Clear pronunciation, ${userName || 'friend'}! 🗣️`,
  ];

  const encourageMessages = [
    `Good job trying, ${userName || 'friend'}!`,
    `It's okay to repeat lessons, ${userName || 'friend'}.`,
    `Learning English takes time, ${userName || 'friend'}.`,
    `Keep practicing, ${userName || 'friend'}!`,
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground px-3 py-1 bg-muted rounded-full">
          {currentIndex + 1}/{questions.length}
        </span>
      </div>

      {/* Progress */}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-primary" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-card rounded-3xl p-6 shadow-card border border-border space-y-6"
        >
          {/* Question Badge */}
          <div className="flex justify-center">
            <span className="px-5 py-2 bg-gradient-primary text-primary-foreground rounded-full font-bold text-lg">
              Q{currentIndex + 1}
            </span>
          </div>

          {/* Question Text */}
          <div className="text-center space-y-4">
            <p className="text-2xl font-bold text-foreground">{currentQuestion.question}</p>
            
            {/* Listen Button */}
            <Button 
              onClick={speakQuestion} 
              variant="outline"
              size="lg"
              className="gap-2 rounded-full px-6"
            >
              <Volume2 className="w-5 h-5" />
              Listen
            </Button>
          </div>

          {/* Translation Help */}
          <div className="text-center">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-sm text-primary hover:underline"
            >
              {showTranslation ? 'Hide translation' : 'Need help?'}
            </button>
            
            <AnimatePresence>
              {showTranslation && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 p-3 bg-muted/50 rounded-xl text-muted-foreground italic"
                  dir={selectedLanguage === 'arabic' ? 'rtl' : 'ltr'}
                >
                  {currentQuestion.translations[selectedLanguage]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Answer Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground block text-center">
              Type your answer:
            </label>
            <div className="flex gap-3 max-w-lg mx-auto">
              <Input
                ref={inputRef}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !validation?.isValid && handleSubmit()}
                placeholder={`${currentQuestion.acceptedPrefixes[0]}...`}
                disabled={validation?.isValid}
                className="text-center text-lg rounded-xl flex-1"
              />
              {!validation?.isValid && (
                <Button 
                  onClick={handleSubmit} 
                  disabled={!userAnswer.trim()}
                  className="gap-2 rounded-xl px-6"
                >
                  <Send className="w-4 h-4" />
                  Submit
                </Button>
              )}
            </div>
          </div>

          {/* Validation Feedback */}
          <AnimatePresence>
            {validation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl text-center ${
                  validation.isValid ? 'bg-success/10' : 'bg-accent/10'
                }`}
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  {validation.isValid ? (
                    <CheckCircle className="w-6 h-6 text-success" />
                  ) : (
                    <XCircle className="w-6 h-6 text-accent" />
                  )}
                  <span className={`font-semibold ${validation.isValid ? 'text-success' : 'text-accent-foreground'}`}>
                    {validation.isValid 
                      ? congratsMessages[Math.floor(Math.random() * congratsMessages.length)]
                      : encourageMessages[Math.floor(Math.random() * encourageMessages.length)]
                    }
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {validation.feedback}
                </p>
                {validation.isValid && (
                  <p className="text-sm font-medium text-foreground mt-2">
                    Your answer: "{userAnswer}"
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-3 pt-4">
            {validation && !validation.isValid && (
              <Button variant="outline" onClick={handleRetry} className="gap-2 rounded-xl">
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
            )}
            {validation?.isValid && (
              <Button 
                onClick={handleNext} 
                className="gap-2 rounded-xl bg-gradient-primary px-8"
              >
                {allComplete && currentIndex === questions.length - 1 ? 'Complete' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Completion Celebration */}
      <AnimatePresence>
        {allComplete && currentIndex === questions.length - 1 && validation?.isValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-6 bg-gradient-to-br from-success/20 to-success/10 rounded-3xl border border-success/30"
          >
            <p className="text-3xl mb-2">🎉</p>
            <p className="text-xl font-bold text-success">
              Congratulations, {userName || 'friend'}!
            </p>
            <p className="text-muted-foreground mt-2">
              You answered all {questions.length} questions correctly!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SmartAnswerPractice;
