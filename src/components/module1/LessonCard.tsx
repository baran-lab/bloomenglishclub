import React from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Mic, CheckCircle, RotateCw, Video, Hash, MessageSquare, Headphones } from 'lucide-react';
import { Lesson } from '@/data/module1Data';

interface LessonCardProps {
  lesson: Lesson;
  index: number;
  onClick: () => void;
  isActive?: boolean;
}

const lessonIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  video: Video,
  'video-series': Video,
  vocabulary: BookOpen,
  practice: RotateCw,
  speaking: Mic,
  review: Play,
  sentences: MessageSquare,
  'numbers-practice': Hash,
  'listening-writing': Headphones,
};

export const LessonCard = React.forwardRef<HTMLButtonElement, LessonCardProps>(({ 
  lesson, 
  index, 
  onClick,
  isActive = false 
}, ref) => {
  const Icon = lessonIcons[lesson.type] || BookOpen;

  return (
    <motion.button
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left
        ${isActive 
          ? 'border-primary bg-primary/10 shadow-md' 
          : lesson.isCompleted
            ? 'border-green-500/50 bg-green-500/5'
            : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
        }
      `}
    >
      {/* Icon */}
      <div className={`
        w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
        ${lesson.isCompleted 
          ? 'bg-green-500 text-white' 
          : isActive
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-muted-foreground'
        }
      `}>
        {lesson.isCompleted ? (
          <CheckCircle className="w-6 h-6" />
        ) : (
          <Icon className="w-6 h-6" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-foreground truncate">{lesson.title}</h4>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
            {lesson.type}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{lesson.description}</p>
      </div>

      {/* Duration */}
      {lesson.duration && (
        <span className="text-sm text-muted-foreground flex-shrink-0">
          {lesson.duration}
        </span>
      )}
    </motion.button>
  );
});

LessonCard.displayName = 'LessonCard';
