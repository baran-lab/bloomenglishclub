import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { playSuccessSound } from '@/utils/soundEffects';

interface InfoField {
  id: string;
  label: string;
  correctAnswer: string;
  acceptedAnswers?: string[];
}

interface FillInfoQuizProps {
  fields: InfoField[];
  onComplete: () => void;
  title?: string;
  characterName?: string;
}

// Function to check if answer is close enough (allows typos)
const isCloseEnough = (input: string, correct: string, accepted?: string[]): boolean => {
  const normalize = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9\s]/g, '');
  const normalInput = normalize(input);
  const normalCorrect = normalize(correct);
  
  // Exact match
  if (normalInput === normalCorrect) return true;
  
  // Check accepted answers
  if (accepted?.some(a => normalize(a) === normalInput)) return true;
  
  // Allow one letter missing (for typos like "wok" instead of "work")
  if (Math.abs(normalInput.length - normalCorrect.length) <= 1) {
    let differences = 0;
    const longer = normalInput.length >= normalCorrect.length ? normalInput : normalCorrect;
    const shorter = normalInput.length < normalCorrect.length ? normalInput : normalCorrect;
    
    let j = 0;
    for (let i = 0; i < longer.length && j < shorter.length; i++) {
      if (longer[i] === shorter[j]) {
        j++;
      } else {
        differences++;
        if (longer.length === shorter.length) j++;
      }
    }
    differences += shorter.length - j;
    
    return differences <= 1;
  }
  
  return false;
};

export const FillInfoQuiz: React.FC<FillInfoQuizProps> = ({
  fields,
  onComplete,
  title = 'Complete the Information',
  characterName = 'Ali',
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});

  const handleInputChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const newResults: Record<string, boolean> = {};
    fields.forEach(field => {
      const answer = answers[field.id] || '';
      newResults[field.id] = isCloseEnough(answer, field.correctAnswer, field.acceptedAnswers);
    });
    setResults(newResults);
    setShowResult(true);
    
    if (Object.values(newResults).every(Boolean)) {
      playSuccessSound();
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setResults({});
    setShowResult(false);
  };

  const allCorrect = Object.values(results).length > 0 && Object.values(results).every(Boolean);
  const allFilled = fields.every(f => answers[f.id]?.trim());

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">{title}</h2>
        <p className="text-muted-foreground mt-2">
          Fill in the information you learned about {characterName}
        </p>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border space-y-4">
        {fields.map((field) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-2"
          >
            <label className="font-medium text-foreground">{field.label}</label>
            <div className="relative">
              <Input
                value={answers[field.id] || ''}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                disabled={showResult}
                className={`
                  rounded-xl text-lg
                  ${showResult && results[field.id] 
                    ? 'border-success bg-success/10' 
                    : showResult && !results[field.id]
                      ? 'border-destructive bg-destructive/10'
                      : ''
                  }
                `}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
              {showResult && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {results[field.id] ? (
                    <Check className="w-5 h-5 text-success" />
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      ({field.correctAnswer})
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {!showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center"
          >
            <Button 
              onClick={handleSubmit} 
              disabled={!allFilled}
              className="gap-2 rounded-xl bg-gradient-primary text-primary-foreground px-8"
            >
              Check Answers
              <Check className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            {allCorrect ? (
              <div className="bg-success/20 rounded-2xl p-6 border-2 border-success">
                <div className="flex items-center justify-center gap-2 text-success mb-2">
                  <Check className="w-6 h-6" />
                  <span className="font-fredoka text-xl font-bold">Great Job! 🎉</span>
                </div>
                <p className="text-foreground">All information is correct!</p>
              </div>
            ) : (
              <div className="bg-accent/20 rounded-2xl p-6 border-2 border-accent">
                <span className="font-fredoka text-xl font-bold text-accent-foreground">
                  Good try! 💪 Check the answers above and try again.
                </span>
              </div>
            )}

            <div className="flex justify-center gap-4">
              {!allCorrect && (
                <Button variant="outline" onClick={handleRetry} className="gap-2 rounded-xl">
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
              )}
              <Button onClick={onComplete} className="gap-2 rounded-xl bg-gradient-primary text-primary-foreground">
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FillInfoQuiz;
