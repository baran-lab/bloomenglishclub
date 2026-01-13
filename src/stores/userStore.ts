// User Store - Manages user preferences and data
import { useState, useEffect } from 'react';

export interface UserData {
  name: string;
  language: string;
  completedLessons: string[];
  currentLessonIndex: number;
  currentModuleId: number;
  totalTimeSpent: number; // in seconds
  sessionsCount: number;
  lastSessionDate: string;
  streak: number;
  points: number;
  achievements: string[];
  realLifeTasks: RealLifeTask[];
  macroWins: MacroWin[];
}

export interface RealLifeTask {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  completedDate?: string;
}

export interface MacroWin {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedDate?: string;
  isUnlocked: boolean;
}

const defaultUserData: UserData = {
  name: '',
  language: 'spanish',
  completedLessons: [],
  currentLessonIndex: 0,
  currentModuleId: 1,
  totalTimeSpent: 0,
  sessionsCount: 0,
  lastSessionDate: '',
  streak: 0,
  points: 0,
  achievements: [],
  realLifeTasks: [
    { id: 'task-1', title: 'Say "Hello" to someone', description: 'Greet someone in English today', isCompleted: false },
    { id: 'task-2', title: 'Introduce yourself', description: 'Tell someone your name in English', isCompleted: false },
  ],
  macroWins: [
    { id: 'first-lesson', title: 'First Lesson Complete!', description: 'You completed your first lesson', icon: '🎯', isUnlocked: false },
    { id: 'vocabulary-master', title: '10 Words Learned!', description: 'You learned 10 new vocabulary words', icon: '📚', isUnlocked: false },
    { id: 'speaking-star', title: 'Speaking Star!', description: 'You practiced speaking 5 times', icon: '🌟', isUnlocked: false },
    { id: 'module-complete', title: 'Module 1 Complete!', description: 'You finished all lessons in Module 1', icon: '🏆', isUnlocked: false },
  ],
};

const STORAGE_KEY = 'englishville_user_data';

export const useUserStore = () => {
  const [userData, setUserData] = useState<UserData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultUserData, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.error('Error loading user data:', e);
    }
    return defaultUserData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  }, [userData]);

  const setUserName = (name: string) => {
    setUserData(prev => ({ ...prev, name }));
  };

  const setLanguage = (language: string) => {
    setUserData(prev => ({ ...prev, language }));
  };

  const completeLesson = (lessonId: string) => {
    setUserData(prev => {
      const newCompleted = prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];
      
      return {
        ...prev,
        completedLessons: newCompleted,
        currentLessonIndex: prev.currentLessonIndex + 1,
        points: prev.points + 10,
      };
    });
  };

  const addPoints = (points: number) => {
    setUserData(prev => ({ ...prev, points: prev.points + points }));
  };

  const completeRealLifeTask = (taskId: string) => {
    setUserData(prev => ({
      ...prev,
      realLifeTasks: prev.realLifeTasks.map(task =>
        task.id === taskId ? { ...task, isCompleted: true, completedDate: new Date().toISOString() } : task
      ),
      points: prev.points + 20,
    }));
  };

  const unlockMacroWin = (winId: string) => {
    setUserData(prev => ({
      ...prev,
      macroWins: prev.macroWins.map(win =>
        win.id === winId ? { ...win, isUnlocked: true, unlockedDate: new Date().toISOString() } : win
      ),
    }));
  };

  const updateSessionTime = (seconds: number) => {
    setUserData(prev => ({ ...prev, totalTimeSpent: prev.totalTimeSpent + seconds }));
  };

  const startNewSession = () => {
    const today = new Date().toDateString();
    setUserData(prev => {
      const isNewDay = prev.lastSessionDate !== today;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const wasYesterday = prev.lastSessionDate === yesterday.toDateString();
      
      return {
        ...prev,
        sessionsCount: prev.sessionsCount + 1,
        lastSessionDate: today,
        streak: isNewDay ? (wasYesterday ? prev.streak + 1 : 1) : prev.streak,
      };
    });
  };

  const resetProgress = () => {
    setUserData(defaultUserData);
  };

  return {
    userData,
    setUserName,
    setLanguage,
    completeLesson,
    addPoints,
    completeRealLifeTask,
    unlockMacroWin,
    updateSessionTime,
    startNewSession,
    resetProgress,
  };
};
