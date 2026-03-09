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

const module3ChecklistItems: ChecklistItem[] = [
  { id: 'c1', question: 'Where is the park?', skill: 'Ask and answer about locations using prepositions' },
  { id: 'c2', question: 'Is there a pharmacy near here?', skill: 'Ask about nearby places' },
  { id: 'c3', question: 'The gym is next to the school.', skill: 'Describe where places are using prepositions' },
  { id: 'c4', question: 'How can I get to the hospital?', skill: 'Ask for and give directions' },
  { id: 'c5', question: 'Go straight ahead and turn left.', skill: 'Give step-by-step directions' },
  { id: 'c6', question: 'Which bus goes to New York?', skill: 'Ask about public transportation' },
  { id: 'c7', question: 'How much is the ticket?', skill: 'Ask about fares and prices' },
  { id: 'c8', question: 'It\'s across from the library.', skill: 'Use location vocabulary in context' },
];

interface Module3ChecklistProps {
  onComplete: () => void;
  userName?: string;
}

export const Module3Checklist: React.FC<Module3ChecklistProps> = ({ 
  onComplete, 
  userName = 'friend' 
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-5xl mb-4">
          🎉
        </motion.div>
        <h2 className="font-fredoka text-2xl font-bold text-foreground">
          Congratulations, {userName}!
        </h2>
        <p className="text-muted-foreground mt-2">
          You've completed Module 3! Here's what you can now do:
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
        <h3 className="font-fredoka text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          You can ask and answer:
        </h3>
        <div className="space-y-3">
          {module3ChecklistItems.map((item, index) => (
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl border border-primary/20"
      >
        <p className="text-lg font-medium text-foreground">
          Amazing work! You can navigate around town like a pro! 🗺️
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          You've mastered directions, locations, and travel vocabulary!
        </p>
      </motion.div>

      <div className="flex justify-center gap-3">
        <Button variant="outline" onClick={() => navigate('/')} className="gap-2">
          <Home className="w-5 h-5" />
          Dashboard
        </Button>
        <Button onClick={onComplete} size="lg" className="gap-2">
          Finish Module 3
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default Module3Checklist;
