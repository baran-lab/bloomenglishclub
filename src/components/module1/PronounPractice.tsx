import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, ChevronRight, CheckCircle2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { playSuccessSound, playErrorSound } from '@/utils/soundEffects';
import { useNavigate } from 'react-router-dom';

interface PronounQuestion {
  id: string;
  audioText: string;
  sentenceBefore: string;
  sentenceAfter: string;
  options: string[];
  correctIndex: number;
}

const pronounQuestions: PronounQuestion[] = [
  {
    id: 'pq-1',
    audioText: "What's your name?",
    sentenceBefore: 'What is',
    sentenceAfter: 'name?',
    options: ['your', 'his', 'her'],
    correctIndex: 0, // Answer: A - your
  },
  {
    id: 'pq-2',
    audioText: 'My name is Peter.',
    sentenceBefore: '',
    sentenceAfter: 'name is Peter.',
    options: ['Her', 'My', 'His'],
    correctIndex: 1, // Answer: B - My
  },
  {
    id: 'pq-3',
    audioText: 'Where is he from?',
    sentenceBefore: 'Where is',
    sentenceAfter: 'from?',
    options: ['he', 'she', 'you'],
    correctIndex: 0, // Answer: A - he
  },
  {
    id: 'pq-4',
    audioText: 'He is from Korea.',
    sentenceBefore: '',
    sentenceAfter: 'is from Korea.',
    options: ['I', 'She', 'He'],
    correctIndex: 2, // Answer: C - He
  },
  {
    id: 'pq-5',
    audioText: 'How old is she?',
    sentenceBefore: 'How old is',
    sentenceAfter: '?',
    options: ['she', 'he', 'I'],
    correctIndex: 0, // Answer: A - she
  },
  {
    id: 'pq-6',
    audioText: 'What is her name?',
    sentenceBefore: 'What is',
    sentenceAfter: 'name?',
    options: ['your', 'her', 'his'],
    correctIndex: 1, // Answer: B - her
  },
  {
    id: 'pq-7',
    audioText: 'Where do you work?',
    sentenceBefore: 'Where',
    sentenceAfter: 'you work?',
    options: ['do', 'does', 'are'],
    correctIndex: 0, // Answer: A - do
  },
  {
    id: 'pq-8',
    audioText: 'I work in a supermarket.',
    sentenceBefore: 'I',
    sentenceAfter: 'in a supermarket.',
    options: ['work', 'works'],
    correctIndex: 0, // Answer: A - work
  },
  {
    id: 'pq-9',
    audioText: "What's his name?",
    sentenceBefore: "What's",
    sentenceAfter: 'name?',
    options: ['your', 'her', 'his'],
    correctIndex: 2, // Answer: C - his
  },
  {
    id: 'pq-10',
    audioText: 'His name is Mark.',
    sentenceBefore: '',
    sentenceAfter: 'name is Mark.',
    options: ['My', 'Her', 'His'],
    correctIndex: 2, // Answer: C - His
  },
];

// Grammar table data
const grammarTable = [
  { subject: 'I', am: 'am', work: 'work', have: 'have' },
  { subject: 'He', am: 'is', work: 'works', have: 'has' },
  { subject: 'She', am: 'is', work: 'works', have: 'has' },
];

interface PronounPracticeProps {
  onComplete: () => void;
  userName?: string;
}

export const PronounPractice: React.FC<PronounPracticeProps> = ({ onComplete, userName = 'friend' }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showGrammarTable, setShowGrammarTable] = useState(false);

  const currentQuestion = pronounQuestions[currentIndex];
  const isComplete = currentIndex >= pronounQuestions.length;
  const progress = (currentIndex / pronounQuestions.length) * 100;

  const speakText = (text: string) => {
    speakText(text, 0.7);
  };

  const handleOptionClick = (index: number) => {
    if (showResult) return;
    
    setSelectedOption(index);
    setShowResult(true);
    
    if (index === currentQuestion.correctIndex) {
      playSuccessSound();
      setCorrectCount(prev => prev + 1);
    } else {
      playErrorSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < pronounQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setShowGrammarTable(true);
    }
  };

  const handleFinish = () => {
    onComplete();
  };

  const speakGrammarCell = (subject: string, verb: string) => {
    speakText(`${subject} ${verb}`);
  };

  if (showGrammarTable) {
    return (
      <div className="space-y-6">
        {/* Dashboard Button */}
        <div className="flex justify-start">
          <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
            <Home className="w-4 h-4" />
            Dashboard
          </Button>
        </div>

        <div className="text-center">
          <h3 className="font-fredoka text-xl font-bold text-foreground">Grammar Summary</h3>
          <p className="text-sm text-muted-foreground mt-1">Tap any cell to hear the pronunciation</p>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-primary/10">
                <th className="p-3 text-left font-semibold"></th>
                <th className="p-3 text-center font-semibold">be</th>
                <th className="p-3 text-center font-semibold">work</th>
                <th className="p-3 text-center font-semibold">have</th>
              </tr>
            </thead>
            <tbody>
              {grammarTable.map((row, idx) => (
                <tr key={row.subject} className={idx % 2 === 0 ? 'bg-muted/30' : ''}>
                  <td className="p-3 font-bold text-primary">{row.subject}</td>
                  <td 
                    className="p-3 text-center cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => speakGrammarCell(row.subject, row.am)}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Volume2 className="w-3 h-3 text-muted-foreground" />
                      <span>{row.am}</span>
                    </div>
                  </td>
                  <td 
                    className="p-3 text-center cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => speakGrammarCell(row.subject, row.work)}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Volume2 className="w-3 h-3 text-muted-foreground" />
                      <span>{row.work}</span>
                    </div>
                  </td>
                  <td 
                    className="p-3 text-center cursor-pointer hover:bg-primary/10 transition-colors"
                    onClick={() => speakGrammarCell(row.subject, row.have)}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <Volume2 className="w-3 h-3 text-muted-foreground" />
                      <span>{row.have}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center p-4 bg-green-500/10 rounded-xl border border-green-500/30">
          <p className="text-lg font-bold text-green-600">
            Great job, {userName}! 🎉
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            You got {correctCount} out of {pronounQuestions.length} correct!
          </p>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleFinish} className="gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Button */}
      <div className="flex justify-start">
        <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-4 h-4" />
          Dashboard
        </Button>
      </div>

      {/* Header */}
      <div className="text-center">
        <h3 className="font-fredoka text-xl font-bold text-foreground">Pronoun Practice</h3>
        <p className="text-sm text-muted-foreground mt-1">
          I / my / he / his / she / her
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {currentIndex + 1} / {pronounQuestions.length}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-card rounded-2xl border border-border p-6 space-y-6"
        >
          {/* Listen button */}
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => speakText(currentQuestion.audioText)}
              className="gap-2"
            >
              <Volume2 className="w-5 h-5" />
              Listen
            </Button>
          </div>

          {/* Sentence with blank */}
          <div className="text-center text-xl">
            <span>{currentQuestion.sentenceBefore} </span>
            <span className="inline-block min-w-[80px] border-b-2 border-primary mx-1 text-primary font-bold">
              {showResult ? currentQuestion.options[currentQuestion.correctIndex] : '_______'}
            </span>
            <span> {currentQuestion.sentenceAfter}</span>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = idx === currentQuestion.correctIndex;
              const isSelected = idx === selectedOption;
              
              let buttonClass = 'w-full p-4 rounded-xl border-2 text-left font-medium transition-all ';
              
              if (showResult) {
                if (isCorrect) {
                  buttonClass += 'border-green-500 bg-green-500/10 text-green-700';
                } else if (isSelected && !isCorrect) {
                  buttonClass += 'border-red-500 bg-red-500/10 text-red-700';
                } else {
                  buttonClass += 'border-border bg-muted/50 text-muted-foreground';
                }
              } else {
                buttonClass += 'border-border hover:border-primary hover:bg-primary/5';
              }

              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick(idx)}
                  className={buttonClass}
                  disabled={showResult}
                >
                  <span className="text-lg">{option}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Result and Next */}
          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center"
            >
              <Button onClick={handleNext} className="gap-2">
                {currentIndex < pronounQuestions.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    See Grammar Table
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PronounPractice;
