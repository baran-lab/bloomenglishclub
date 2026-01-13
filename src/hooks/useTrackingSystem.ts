// Tracking System Hook - Records user activity and progress
import { useState, useEffect, useCallback, useRef } from 'react';

export interface TrackingEvent {
  type: 'lesson_start' | 'lesson_complete' | 'practice_attempt' | 'voice_recording' | 'mistake' | 'correct_answer' | 'session_start' | 'session_end';
  timestamp: string;
  lessonId?: string;
  data?: Record<string, unknown>;
}

export interface SessionStats {
  startTime: string;
  endTime?: string;
  duration: number; // in seconds
  lessonsCompleted: number;
  practiceAttempts: number;
  correctAnswers: number;
  mistakes: number;
  voiceRecordings: number;
}

const EVENTS_KEY = 'englishville_tracking_events';
const STATS_KEY = 'englishville_session_stats';

export const useTrackingSystem = () => {
  const [events, setEvents] = useState<TrackingEvent[]>(() => {
    try {
      const stored = localStorage.getItem(EVENTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [currentSession, setCurrentSession] = useState<SessionStats | null>(null);
  const sessionStartRef = useRef<Date | null>(null);

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-100))); // Keep last 100 events
  }, [events]);

  const trackEvent = useCallback((type: TrackingEvent['type'], lessonId?: string, data?: Record<string, unknown>) => {
    const event: TrackingEvent = {
      type,
      timestamp: new Date().toISOString(),
      lessonId,
      data,
    };
    setEvents(prev => [...prev, event]);
  }, []);

  const startSession = useCallback(() => {
    sessionStartRef.current = new Date();
    setCurrentSession({
      startTime: new Date().toISOString(),
      duration: 0,
      lessonsCompleted: 0,
      practiceAttempts: 0,
      correctAnswers: 0,
      mistakes: 0,
      voiceRecordings: 0,
    });
    trackEvent('session_start');
  }, [trackEvent]);

  const endSession = useCallback(() => {
    if (currentSession && sessionStartRef.current) {
      const duration = Math.floor((Date.now() - sessionStartRef.current.getTime()) / 1000);
      const finalSession = {
        ...currentSession,
        endTime: new Date().toISOString(),
        duration,
      };
      
      // Save session to history
      try {
        const historyKey = 'englishville_session_history';
        const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
        history.push(finalSession);
        localStorage.setItem(historyKey, JSON.stringify(history.slice(-30))); // Keep last 30 sessions
      } catch (e) {
        console.error('Error saving session history:', e);
      }
      
      trackEvent('session_end', undefined, { duration });
      setCurrentSession(null);
      sessionStartRef.current = null;
      return duration;
    }
    return 0;
  }, [currentSession, trackEvent]);

  const trackLessonStart = useCallback((lessonId: string) => {
    trackEvent('lesson_start', lessonId);
  }, [trackEvent]);

  const trackLessonComplete = useCallback((lessonId: string) => {
    trackEvent('lesson_complete', lessonId);
    setCurrentSession(prev => prev ? { ...prev, lessonsCompleted: prev.lessonsCompleted + 1 } : null);
  }, [trackEvent]);

  const trackPracticeAttempt = useCallback((lessonId: string, isCorrect: boolean) => {
    trackEvent(isCorrect ? 'correct_answer' : 'mistake', lessonId);
    setCurrentSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        practiceAttempts: prev.practiceAttempts + 1,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        mistakes: !isCorrect ? prev.mistakes + 1 : prev.mistakes,
      };
    });
  }, [trackEvent]);

  const trackVoiceRecording = useCallback((lessonId: string) => {
    trackEvent('voice_recording', lessonId);
    setCurrentSession(prev => prev ? { ...prev, voiceRecordings: prev.voiceRecordings + 1 } : null);
  }, [trackEvent]);

  const getSessionDuration = useCallback(() => {
    if (sessionStartRef.current) {
      return Math.floor((Date.now() - sessionStartRef.current.getTime()) / 1000);
    }
    return 0;
  }, []);

  const getMonthlyStats = useCallback(() => {
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    
    try {
      const history = JSON.parse(localStorage.getItem('englishville_session_history') || '[]') as SessionStats[];
      const monthSessions = history.filter(s => s.startTime.startsWith(thisMonth));
      
      return {
        totalSessions: monthSessions.length,
        totalDuration: monthSessions.reduce((sum, s) => sum + s.duration, 0),
        totalLessons: monthSessions.reduce((sum, s) => sum + s.lessonsCompleted, 0),
        totalPractice: monthSessions.reduce((sum, s) => sum + s.practiceAttempts, 0),
        accuracy: monthSessions.length > 0
          ? Math.round((monthSessions.reduce((sum, s) => sum + s.correctAnswers, 0) /
              Math.max(1, monthSessions.reduce((sum, s) => sum + s.practiceAttempts, 0))) * 100)
          : 0,
      };
    } catch {
      return { totalSessions: 0, totalDuration: 0, totalLessons: 0, totalPractice: 0, accuracy: 0 };
    }
  }, []);

  return {
    events,
    currentSession,
    startSession,
    endSession,
    trackLessonStart,
    trackLessonComplete,
    trackPracticeAttempt,
    trackVoiceRecording,
    getSessionDuration,
    getMonthlyStats,
  };
};
