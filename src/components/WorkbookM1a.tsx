import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ChevronRight, ChevronLeft, Check, X, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { playSuccessSound, playErrorSound } from "@/utils/soundEffects";

const countries = ["Canada", "Somalia", "Russia", "Ecuador", "China", "Mexico", "South Korea", "Brazil", "India", "Egypt"];

interface Section {
  id: string;
  title: string;
  questions: Question[];
}

type Question = 
  | { type: 'text'; id: string; label: string; correctAnswers: string[] }
  | { type: 'country'; id: string; label: string; correctAnswer: string }
  | { type: 'yesno'; id: string; label: string; correctAnswer: 'yes' | 'no'; followUp?: string; followUpAnswer?: string }
  | { type: 'names'; id: string; label: string; correctAnswers: string[] };

const sections: Section[] = [
  {
    id: 'section1',
    title: 'WHERE ARE THEY FROM? — Part 1',
    questions: [
      { type: 'text', id: 'mark-name', label: "What's his name? (Mark — Canada 🇨🇦)", correctAnswers: ['Mark'] },
      { type: 'country', id: 'mark-country', label: "Where is he from?", correctAnswer: 'Canada' },
      { type: 'text', id: 'aaden-name', label: "What's his name? (Aaden — Somalia 🇸🇴)", correctAnswers: ['Aaden'] },
      { type: 'country', id: 'aaden-country', label: "Where is he from?", correctAnswer: 'Somalia' },
      { type: 'names', id: 'boris-sofia-names', label: "What are their names? (Boris & Sofia — Russia 🇷🇺)", correctAnswers: ['Boris', 'Sofia'] },
      { type: 'country', id: 'boris-sofia-country', label: "Where are they from?", correctAnswer: 'Russia' },
    ]
  },
  {
    id: 'section2',
    title: 'WHERE ARE THEY FROM? — Yes/No Questions',
    questions: [
      { type: 'yesno', id: 'mark-canada', label: "Is Mark from Canada?", correctAnswer: 'yes' },
      { type: 'yesno', id: 'aaden-canada', label: "Is Aaden from Canada?", correctAnswer: 'no', followUp: "Where is he from?", followUpAnswer: 'Somalia' },
      { type: 'yesno', id: 'boris-sofia-russia', label: "Are Boris and Sofia from Russia?", correctAnswer: 'yes' },
    ]
  },
  {
    id: 'section3',
    title: 'WHERE ARE THEY FROM? — Part 2',
    questions: [
      { type: 'yesno', id: 'mark-canada2', label: "Is Mark from Canada?", correctAnswer: 'yes' },
      { type: 'yesno', id: 'aaden-canada2', label: "Is Aaden from Canada?", correctAnswer: 'no', followUp: "Where is he from?", followUpAnswer: 'Somalia' },
      { type: 'yesno', id: 'boris-sofia-russia2', label: "Are Boris and Sofia from Russia?", correctAnswer: 'yes' },
      { type: 'yesno', id: 'garcia-russia', label: "Is the Garcia family from Russia?", correctAnswer: 'no', followUp: "Where are they from?", followUpAnswer: 'Ecuador' },
    ]
  },
  {
    id: 'section4',
    title: 'WHERE ARE THEY FROM? — Part 3',
    questions: [
      { type: 'yesno', id: 'jing-china', label: "Is Jing from China?", correctAnswer: 'yes' },
      { type: 'yesno', id: 'valentina-china', label: "Is Valentina from China?", correctAnswer: 'no', followUp: "Where is she from?", followUpAnswer: 'Mexico' },
      { type: 'yesno', id: 'minju-korea', label: "Is Minju from South Korea?", correctAnswer: 'yes' },
      { type: 'yesno', id: 'alice-miguel-korea', label: "Are Alice and Miguel from South Korea?", correctAnswer: 'no', followUp: "Where are they from?", followUpAnswer: 'Brazil' },
    ]
  },
  {
    id: 'section5',
    title: 'Personal Information',
    questions: [
      { type: 'text', id: 'garcia-lastname', label: "What is the Garcia family's last name?", correctAnswers: ['Garcia'] },
      { type: 'country', id: 'garcia-country', label: "Where are they from?", correctAnswer: 'Ecuador' },
      { type: 'text', id: 'jing-name', label: "What's her name? (China 🇨🇳)", correctAnswers: ['Jing'] },
      { type: 'country', id: 'jing-country', label: "Where is she from?", correctAnswer: 'China' },
      { type: 'text', id: 'valentina-name', label: "What's her name? (Mexico 🇲🇽)", correctAnswers: ['Valentina'] },
      { type: 'country', id: 'valentina-country', label: "Where is she from?", correctAnswer: 'Mexico' },
    ]
  },
  {
    id: 'section6',
    title: 'More Yes/No Questions',
    questions: [
      { type: 'yesno', id: 'garcia-russia2', label: "Is the Garcia family from Russia?", correctAnswer: 'no', followUp: "Where are they from?", followUpAnswer: 'Ecuador' },
      { type: 'yesno', id: 'jing-china2', label: "Is Jing from China?", correctAnswer: 'yes' },
      { type: 'yesno', id: 'valentina-china2', label: "Is Valentina from China?", correctAnswer: 'no', followUp: "Where is she from?", followUpAnswer: 'Mexico' },
    ]
  },
  {
    id: 'section7',
    title: 'More People',
    questions: [
      { type: 'text', id: 'minju-name', label: "What's her name? (South Korea 🇰🇷)", correctAnswers: ['Minju'] },
      { type: 'country', id: 'minju-country', label: "Where is she from?", correctAnswer: 'South Korea' },
      { type: 'names', id: 'alice-miguel-names', label: "What are their names? (Brazil 🇧🇷)", correctAnswers: ['Alice', 'Miguel'] },
      { type: 'country', id: 'alice-miguel-country', label: "Where are they from?", correctAnswer: 'Brazil' },
      { type: 'text', id: 'belinda-name', label: "What's her name? (India 🇮🇳)", correctAnswers: ['Belinda'] },
      { type: 'country', id: 'belinda-country', label: "Where is she from?", correctAnswer: 'India' },
    ]
  },
  {
    id: 'section8',
    title: 'Final Yes/No Questions',
    questions: [
      { type: 'yesno', id: 'minju-korea2', label: "Is Minju from South Korea?", correctAnswer: 'yes' },
      { type: 'yesno', id: 'alice-miguel-mexico', label: "Are Alice and Miguel from Mexico?", correctAnswer: 'no', followUp: "Where are they from?", followUpAnswer: 'Brazil' },
      { type: 'yesno', id: 'belinda-egypt', label: "Is Belinda from Egypt?", correctAnswer: 'no', followUp: "Where is she from?", followUpAnswer: 'India' },
    ]
  },
];

export function WorkbookM1a() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [followUpAnswers, setFollowUpAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState<number | null>(null);

  const section = sections[currentSection];

  const updateAnswer = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
    if (checked) setChecked(false);
  };

  const updateFollowUp = (id: string, value: string) => {
    setFollowUpAnswers(prev => ({ ...prev, [id]: value }));
    if (checked) setChecked(false);
  };

  const checkAnswers = () => {
    const newResults: Record<string, boolean> = {};
    let correct = 0;
    let total = 0;

    section.questions.forEach(q => {
      total++;
      const userAnswer = (answers[q.id] || '').trim().toLowerCase();

      if (q.type === 'text') {
        const isCorrect = q.correctAnswers.some(a => a.toLowerCase() === userAnswer);
        newResults[q.id] = isCorrect;
        if (isCorrect) correct++;
      } else if (q.type === 'country') {
        newResults[q.id] = userAnswer === q.correctAnswer.toLowerCase();
        if (newResults[q.id]) correct++;
      } else if (q.type === 'yesno') {
        newResults[q.id] = userAnswer === q.correctAnswer;
        if (newResults[q.id]) correct++;
        if (q.followUp && userAnswer === 'no' && q.correctAnswer === 'no') {
          total++;
          const followUpVal = (followUpAnswers[q.id] || '').trim().toLowerCase();
          const isFollowUpCorrect = followUpVal === (q.followUpAnswer || '').toLowerCase();
          newResults[q.id + '-followup'] = isFollowUpCorrect;
          if (isFollowUpCorrect) correct++;
        }
      } else if (q.type === 'names') {
        const parts = userAnswer.split(/[,&\s]+/).filter(Boolean);
        const isCorrect = q.correctAnswers.every(name => 
          parts.some(p => p.toLowerCase() === name.toLowerCase())
        );
        newResults[q.id] = isCorrect;
        if (isCorrect) correct++;
      }
    });

    setResults(newResults);
    setChecked(true);

    const allCorrect = Object.values(newResults).every(v => v);
    if (allCorrect) {
      playSuccessSound();
    } else {
      playErrorSound();
    }

    if (currentSection === sections.length - 1) {
      setScore(correct);
    }
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(prev => prev + 1);
      setChecked(false);
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      setChecked(false);
    }
  };

  const handleRetry = () => {
    setAnswers({});
    setFollowUpAnswers({});
    setResults({});
    setChecked(false);
    setScore(null);
    setCurrentSection(0);
  };

  const getInputClass = (id: string) => {
    if (!checked) return "border-input";
    return results[id] ? "border-success bg-success/10" : "border-destructive bg-destructive/10";
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-5 shadow-soft cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-fredoka text-lg font-semibold">Workbook</h3>
            <p className="text-sm text-muted-foreground">Module 1: Where Are They From?</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-5 shadow-soft"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-fredoka text-lg font-semibold">Workbook — Module 1</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>✕</Button>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-4">
        {sections.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i <= currentSection ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={section.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h4 className="font-fredoka text-base font-semibold text-foreground mb-4">
            {section.title}
          </h4>

          <div className="space-y-4">
            {section.questions.map((q) => (
              <div key={q.id} className="space-y-2">
                <Label className="text-sm font-medium">{q.label}</Label>

                {q.type === 'text' && (
                  <div className="relative">
                    <Input
                      value={answers[q.id] || ''}
                      onChange={(e) => updateAnswer(q.id, e.target.value)}
                      className={getInputClass(q.id)}
                      placeholder="Type your answer..."
                    />
                    {checked && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2">
                        {results[q.id] ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-destructive" />}
                      </span>
                    )}
                    {checked && !results[q.id] && (
                      <p className="text-xs text-success mt-1">Correct: {q.correctAnswers.join(' / ')}</p>
                    )}
                  </div>
                )}

                {q.type === 'names' && (
                  <div className="relative">
                    <Input
                      value={answers[q.id] || ''}
                      onChange={(e) => updateAnswer(q.id, e.target.value)}
                      className={getInputClass(q.id)}
                      placeholder="Type names separated by commas..."
                    />
                    {checked && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2">
                        {results[q.id] ? <Check className="w-4 h-4 text-success" /> : <X className="w-4 h-4 text-destructive" />}
                      </span>
                    )}
                    {checked && !results[q.id] && (
                      <p className="text-xs text-success mt-1">Correct: {q.correctAnswers.join(' & ')}</p>
                    )}
                  </div>
                )}

                {q.type === 'country' && (
                  <div>
                    <Select value={answers[q.id] || ''} onValueChange={(v) => updateAnswer(q.id, v)}>
                      <SelectTrigger className={getInputClass(q.id)}>
                        <SelectValue placeholder="Select a country..." />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(c => (
                          <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {checked && !results[q.id] && (
                      <p className="text-xs text-success mt-1">Correct: {q.correctAnswer}</p>
                    )}
                  </div>
                )}

                {q.type === 'yesno' && (
                  <div className="space-y-2">
                    <RadioGroup
                      value={answers[q.id] || ''}
                      onValueChange={(v) => updateAnswer(q.id, v)}
                      className="flex gap-4"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="yes" id={`${q.id}-yes`} />
                        <Label htmlFor={`${q.id}-yes`}>Yes</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="no" id={`${q.id}-no`} />
                        <Label htmlFor={`${q.id}-no`}>No</Label>
                      </div>
                    </RadioGroup>
                    {checked && !results[q.id] && (
                      <p className="text-xs text-success">Correct: {q.correctAnswer === 'yes' ? 'Yes' : 'No'}</p>
                    )}
                    {q.followUp && answers[q.id] === 'no' && q.correctAnswer === 'no' && (
                      <div className="ml-4 space-y-1">
                        <Label className="text-xs">{q.followUp}</Label>
                        <Input
                          value={followUpAnswers[q.id] || ''}
                          onChange={(e) => updateFollowUp(q.id, e.target.value)}
                          className={`text-sm ${checked ? (results[q.id + '-followup'] ? 'border-success bg-success/10' : 'border-destructive bg-destructive/10') : ''}`}
                          placeholder="Type the country..."
                        />
                        {checked && !results[q.id + '-followup'] && (
                          <p className="text-xs text-success">Correct: {q.followUpAnswer}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrev}
              disabled={currentSection === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>

            <div className="flex gap-2">
              {!checked ? (
                <Button size="sm" onClick={checkAnswers}>
                  <Check className="w-4 h-4 mr-1" /> Check Answers
                </Button>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleRetry}>
                    <RotateCcw className="w-4 h-4 mr-1" /> Retry
                  </Button>
                  {currentSection < sections.length - 1 && (
                    <Button size="sm" onClick={handleNext}>
                      Next <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Score display on last section */}
          {checked && currentSection === sections.length - 1 && score !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-primary/10 text-center"
            >
              <p className="font-fredoka text-lg font-semibold text-primary">
                🎉 Workbook Complete!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Great job working through the exercises!
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
