import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChecklistItem {
  id: string;
  question: string;
  skill: string;
}

const module1ChecklistItems: ChecklistItem[] = [
  { id: 'c1', question: "What's your name?", skill: 'Say your name' },
  { id: 'c2', question: 'Where are you from?', skill: 'Tell your country of origin' },
  { id: 'c3', question: 'How old are you?', skill: 'Say your age' },
  { id: 'c4', question: 'Are you married or single?', skill: 'Tell your marital status' },
  { id: 'c5', question: 'Do you have children?', skill: 'Talk about family' },
  { id: 'c6', question: 'Do you work?', skill: 'Talk about employment' },
  { id: 'c7', question: 'What do you do?', skill: 'Tell your occupation' },
  { id: 'c8', question: 'Where do you work?', skill: 'Tell your workplace' },
];

interface Module1ChecklistProps {
  onComplete: () => void;
  userName?: string;
}

export const Module1Checklist: React.FC<Module1ChecklistProps> = ({ 
  onComplete, 
  userName = 'friend' 
}) => {
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
          You've completed Module 1! Here's what you can now do:
        </p>
      </div>

      {/* Checklist */}
      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <h3 className="font-fredoka text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          You can ask and answer:
        </h3>
        
        <div className="space-y-3">
          {module1ChecklistItems.map((item, index) => (
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
          You're ready for Module 2! 🚀
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Next, you'll learn about dates, birthdays, and more!
        </p>
      </motion.div>

      {/* Continue button */}
      <div className="flex justify-center">
        <Button onClick={onComplete} size="lg" className="gap-2">
          Continue to Module 2
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Module1Checklist;
