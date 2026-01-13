import React from 'react';
import { motion } from 'framer-motion';
import { Check, Circle, Share2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RealLifeTask } from '@/stores/userStore';

interface RealLifeTasksProps {
  tasks: RealLifeTask[];
  userName?: string;
  onToggleTask: (taskId: string) => void;
  onShare?: () => void;
}

export const RealLifeTasks: React.FC<RealLifeTasksProps> = ({
  tasks,
  userName = '',
  onToggleTask,
  onShare,
}) => {
  const completedCount = tasks.filter(t => t.isCompleted).length;

  const handleShare = async () => {
    if (navigator.share && completedCount > 0) {
      try {
        await navigator.share({
          title: '🎯 Real-Life English Practice',
          text: `I completed ${completedCount} real-life English tasks on Englishville! Practice makes perfect! 💪`,
          url: window.location.origin,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
    onShare?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-3xl p-6 shadow-card border border-border"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <Target className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-fredoka font-semibold text-foreground">Real-Life Tasks</h3>
            <p className="text-sm text-muted-foreground">
              Practice English in the real world!
            </p>
          </div>
        </div>

        {completedCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className="gap-1 text-primary"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        )}
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <motion.button
            key={task.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onToggleTask(task.id)}
            className={`w-full flex items-start gap-3 p-4 rounded-2xl text-left transition-all ${
              task.isCompleted 
                ? 'bg-success/10 border-2 border-success/20' 
                : 'bg-secondary/50 border-2 border-transparent hover:border-primary/20'
            }`}
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                task.isCompleted 
                  ? 'bg-success text-success-foreground' 
                  : 'bg-muted text-muted-foreground border-2 border-muted-foreground/30'
              }`}
            >
              {task.isCompleted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </motion.div>
            
            <div className="flex-1">
              <p className={`font-medium ${
                task.isCompleted ? 'text-foreground line-through' : 'text-foreground'
              }`}>
                {task.title}
              </p>
              <p className={`text-sm mt-1 ${
                task.isCompleted ? 'text-muted-foreground' : 'text-muted-foreground'
              }`}>
                {task.description}
              </p>
              {task.isCompleted && task.completedDate && (
                <p className="text-xs text-success mt-2 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Completed {new Date(task.completedDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Encouragement */}
      {completedCount === tasks.length && tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-gradient-accent rounded-2xl text-center"
        >
          <p className="font-fredoka font-semibold text-accent-foreground">
            🌟 Wow {userName || 'friend'}! You completed all tasks today!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RealLifeTasks;
