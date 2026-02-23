import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageCircle, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ChecklistItem {
  id: string;
  question: string;
  skill: string;
}

const module2ChecklistItems: ChecklistItem[] = [
  { id: 'c1', question: "What's your first name?", skill: 'Say and spell your first name' },
  { id: 'c2', question: "What's your last name?", skill: 'Say and spell your last name' },
  { id: 'c3', question: "What's your date of birth?", skill: 'Say your date of birth using ordinal numbers' },
  { id: 'c4', question: "What's your telephone number?", skill: 'Say your telephone number' },
  { id: 'c5', question: "What's your address?", skill: 'Say your full address' },
  { id: 'c6', question: 'Can you spell that, please?', skill: 'Spell names and words using the alphabet' },
  { id: 'c7', question: 'What month is it?', skill: 'Say the months of the year' },
  { id: 'c8', question: 'What are ordinal numbers?', skill: 'Use ordinal numbers 1st–31st' },
];

interface Module2ChecklistProps {
  onComplete: () => void;
  userName?: string;
}

export const Module2Checklist: React.FC<Module2ChecklistProps> = ({ 
  onComplete, 
  userName = 'friend' 
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-5xl mb-4"
        >
          🎉
        </motion.div>
        <h2 className="font-fredoka text-2xl font-bold text-foreground">
          Congratulations, {userName}!
        </h2>
        <p className="text-muted-foreground mt-2">
          You've completed Module 2! Here's what you can now do:
        </p>
      </div>

      {/* Checklist */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <h3 className="font-fredoka text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          You can ask and answer:
        </h3>
        
        <div className="space-y-3">
          {module2ChecklistItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-green-500/5 rounded-xl border border-green-500/20"
            >
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">{item.question}</p>
                <p className="text-sm text-muted-foreground">{item.skill}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Celebration message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20"
      >
        <p className="text-lg font-medium text-foreground">
          Amazing work! You've mastered names, dates, and addresses! 🚀
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          You're building strong English foundations!
        </p>
      </motion.div>

      {/* Action buttons */}
      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-5 h-5" />
          Dashboard
        </Button>
        <Button onClick={onComplete} size="lg" className="gap-2">
          Finish Module 2
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Module2Checklist;
