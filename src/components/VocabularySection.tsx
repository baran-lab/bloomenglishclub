import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';
import { FamilyMembersLesson } from '@/components/vocabulary/FamilyMembersLesson';
import { DmitryFamilyQuiz } from '@/components/vocabulary/DmitryFamilyQuiz';
import { FamilyQuizTime } from '@/components/vocabulary/FamilyQuizTime';
import { MoreFamilyMembers } from '@/components/vocabulary/MoreFamilyMembers';
import { SupportedLanguage } from '@/data/module1Data';

interface VocabularyLesson {
  id: string;
  title: string;
  description: string;
  moduleId: number;
}

const vocabularyLessons: VocabularyLesson[] = [
  { id: 'family-members', title: '1. Family Members', description: 'Learn family vocabulary with listen & repeat + matching', moduleId: 1 },
  { id: 'dmitry-family', title: "2. Dmitry's Family", description: 'Watch videos and complete drag-and-drop sentences', moduleId: 1 },
  { id: 'quiz-time', title: '3. Quiz Time', description: 'Watch, record your answer, then see the correct answer', moduleId: 1 },
  { id: 'more-family', title: '4. More Family Members', description: 'Watch videos and fill in the blanks', moduleId: 1 },
];

export function VocabularySection() {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([1]));
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem('englishville_language') as SupportedLanguage) || 'spanish';
  });

  const toggleModule = (moduleId: number) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  const moduleGroups = [
    { moduleId: 1, title: 'Module 1', lessons: vocabularyLessons.filter(l => l.moduleId === 1) },
  ];

  if (activeLesson === 'family-members') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-5 shadow-soft">
        <FamilyMembersLesson
          selectedLanguage={selectedLanguage}
          onComplete={() => setActiveLesson(null)}
          onBack={() => setActiveLesson(null)}
        />
      </motion.div>
    );
  }

  if (activeLesson === 'dmitry-family') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-5 shadow-soft">
        <DmitryFamilyQuiz
          onComplete={() => setActiveLesson(null)}
          onBack={() => setActiveLesson(null)}
        />
      </motion.div>
    );
  }

  if (activeLesson === 'quiz-time') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-5 shadow-soft">
        <FamilyQuizTime
          onComplete={() => setActiveLesson(null)}
          onBack={() => setActiveLesson(null)}
        />
      </motion.div>
    );
  }

  if (activeLesson === 'more-family') {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl p-5 shadow-soft">
        <MoreFamilyMembers
          onComplete={() => setActiveLesson(null)}
          onBack={() => setActiveLesson(null)}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-card rounded-2xl p-5 shadow-soft"
    >
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-5 h-5 text-primary" />
        <h3 className="font-fredoka text-lg font-semibold">Vocabulary</h3>
      </div>

      <div className="space-y-3">
        {moduleGroups.map((group) => {
          const isExpanded = expandedModules.has(group.moduleId);
          return (
            <div key={group.moduleId} className="rounded-xl border border-border overflow-hidden">
              <button
                onClick={() => toggleModule(group.moduleId)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
              >
                <span className="font-fredoka font-semibold text-foreground">{group.title}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>

              {isExpanded && (
                <div className="border-t border-border p-2 space-y-1">
                  {group.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson.id)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-primary/10 transition-all text-left"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground">{lesson.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
