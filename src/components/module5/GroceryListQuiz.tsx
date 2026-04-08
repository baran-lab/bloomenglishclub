import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Home, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';
import { speakText } from '@/utils/speechUtils';

interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

const questions: QuizQuestion[] = [
  { question: 'Do they need soda?', options: ['Yes', 'No'], correctIndex: 0 },
  { question: 'Do they need carrots?', options: ['Yes', 'No'], correctIndex: 1 },
  { question: 'How much milk do they need?', options: ['One gallon', 'Two gallons'], correctIndex: 1 },
  { question: 'How many bananas do they need?', options: ['1 banana', '4 bananas'], correctIndex: 1 },
  { question: 'Do they need coffee?', options: ['Yes', 'No'], correctIndex: 0 },
  { question: 'How many onions do they need?', options: ['3 onions', '5 onions'], correctIndex: 1 },
  { question: 'Do they need sugar?', options: ['Yes', 'No'], correctIndex: 0 },
  { question: 'Do they need apples?', options: ['Yes', 'No'], correctIndex: 1 },
];

interface GroceryListQuizProps {
  onComplete: () => void;
}

export const GroceryListQuiz: React.FC<GroceryListQuizProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    speakText(questions[0].question, 0.8);
  };

  const handleAnswer = (idx: number) => {
    if (showResult) return;
    setSelectedAnswer(idx);
    const correct = idx === questions[currentQ].correctIndex;
    setShowResult(true);
    if (correct) {
      playSuccessSound();
      setCorrectCount(prev => prev + 1);
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      const nextQ = currentQ + 1;
      setCurrentQ(nextQ);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeout(() => speakText(questions[nextQ].question, 0.8), 300);
    } else {
      setIsComplete(true);
    }
  };

  const playQuestion = () => {
    speakText(questions[currentQ].question, 0.8);
  };

  if (isComplete) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 p-6 bg-accent rounded-xl border border-border">
          <div className="text-4xl">🎉</div>
          <h3 className="font-fredoka text-xl font-bold text-primary">
            Quiz Complete! {correctCount}/{questions.length} correct
          </h3>
          <p className="text-muted-foreground">Great job understanding the grocery list!</p>
          <Button onClick={onComplete} className="gap-2">
            Continue <ArrowRight className="w-4 h-4" />
          </Button>
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
        {quizStarted && (
          <span className="text-sm text-muted-foreground">{currentQ + 1}/{questions.length}</span>
        )}
      </div>

      <div className="text-center space-y-2">
        <h2 className="font-fredoka text-2xl font-bold text-foreground">📝 Grocery List</h2>
        <p className="text-muted-foreground text-sm">
          {quizStarted ? 'Listen to the question and choose the correct answer.' : 'Watch the video, then answer questions about the grocery list.'}
        </p>
      </div>

      {!quizStarted && (
        <>
          <div className="rounded-2xl overflow-hidden bg-black shadow-lg">
            <video preload="metadata" ref={videoRef} src="/videos/module5/m5-grocery-list.mp4"
              controls className="w-full aspect-video" onEnded={() => setVideoEnded(true)} />
          </div>
          <div className="flex justify-center">
            <Button onClick={handleStartQuiz} className="gap-2 px-8">
              Start Quiz <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </>
      )}

      {quizStarted && (
        <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          className="space-y-6">
          {/* Progress */}
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div className="h-full bg-primary rounded-full"
              animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
          </div>

          {/* Question */}
          <div className="bg-card rounded-xl border border-border p-6 text-center space-y-4">
            <Button variant="ghost" size="sm" onClick={playQuestion} className="gap-2">
              <Volume2 className="w-5 h-5" /> Listen Again
            </Button>
            <h3 className="font-fredoka text-xl font-semibold text-foreground">
              {questions[currentQ].question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {questions[currentQ].options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrectOption = idx === questions[currentQ].correctIndex;
              return (
                <motion.button key={idx} onClick={() => handleAnswer(idx)}
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className={`p-4 rounded-xl border-2 text-lg font-medium transition-all ${
                    showResult && isCorrectOption
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700'
                      : showResult && isSelected && !isCorrectOption
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700'
                      : isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-card hover:bg-accent'
                  }`}>
                  {opt}
                </motion.button>
              );
            })}
          </div>

          {showResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex justify-center">
              <Button onClick={handleNext} className="gap-2 px-8">
                {currentQ < questions.length - 1 ? 'Next Question' : 'See Results'} <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};
