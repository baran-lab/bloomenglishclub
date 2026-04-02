import { User, Lock, Check, Star, Trophy, Target, MessageCircle, Headphones, Mic, Gamepad2, BookOpen } from "lucide-react";

export interface Module {
  id: number;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  progress: number;
  tasks: Task[];
  quote: string;
}

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface UserProgress {
  name: string;
  avatar: string;
  level: number;
  points: number;
  badges: Badge[];
  modulesCompleted: number;
  totalModules: number;
  vocabulary: { current: number; total: number };
  everydayEnglish: { current: number; total: number };
  listening: { current: number; total: number };
  speaking: { current: number; total: number };
  streak: number;
  totalTimeSpent?: number; // in seconds
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  isEarned: boolean;
}

export const mockModules: Module[] = [
  {
    id: 1,
    title: "Introduce Yourself",
    description: "Learn to greet people and tell them about yourself",
    icon: "user",
    isUnlocked: true,
    isCompleted: false,
    progress: 60,
    tasks: [
      { id: "1-1", title: "Learn 5 greeting phrases", isCompleted: true },
      { id: "1-2", title: "Practice saying your name", isCompleted: true },
      { id: "1-3", title: "Ask someone 'How are you?'", isCompleted: false },
      { id: "1-4", title: "Complete the introduction quiz", isCompleted: false },
    ],
    quote: "Every conversation begins with 'Hello!' 🌟",
  },
  {
    id: 2,
    title: "Names and Dates",
    description: "Learn the alphabet, spelling, and dates",
    icon: "clipboard",
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    tasks: [
      { id: "2-1", title: "Learn the alphabet", isCompleted: false },
      { id: "2-2", title: "Practice spelling names", isCompleted: false },
      { id: "2-3", title: "Learn ordinal numbers", isCompleted: false },
      { id: "2-4", title: "Learn the months", isCompleted: false },
    ],
    quote: "Every name tells a story! 📝",
  },
  {
    id: 3,
    title: "Directions",
    description: "Find your way around town and help others too",
    icon: "map",
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    tasks: [
      { id: "3-1", title: "Learn left, right, straight", isCompleted: false },
      { id: "3-2", title: "Ask 'Where is the...?'", isCompleted: false },
      { id: "3-3", title: "Give directions to a place", isCompleted: false },
    ],
    quote: "Getting lost is just another adventure! 🗺️",
  },
  {
    id: 4,
    title: "Health Problems",
    description: "Describe how you feel and understand health advice",
    icon: "heart",
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    tasks: [
      { id: "4-1", title: "Learn body part vocabulary", isCompleted: false },
      { id: "4-2", title: "Describe common symptoms", isCompleted: false },
      { id: "4-3", title: "Role-play a doctor visit", isCompleted: false },
    ],
    quote: "Your health matters - speaking up helps! ❤️",
  },
  {
    id: 5,
    title: "Food & Cooking",
    description: "Learn food vocabulary, grocery items, and kitchen words",
    icon: "utensils",
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    tasks: [
      { id: "5-1", title: "Learn cooking vocabulary", isCompleted: false },
      { id: "5-2", title: "Identify grocery items", isCompleted: false },
      { id: "5-3", title: "Learn kitchen items", isCompleted: false },
    ],
    quote: "Cooking brings people together! 🍳",
  },
  {
    id: 6,
    title: "Daily Routines",
    description: "Talk about your daily activities and schedule",
    icon: "clock",
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    tasks: [
      { id: "6-1", title: "Learn daily activity words", isCompleted: false },
      { id: "6-2", title: "Describe your morning routine", isCompleted: false },
      { id: "6-3", title: "Tell time and schedules", isCompleted: false },
    ],
    quote: "Every day is a chance to learn! ☀️",
  },
  {
    id: 7,
    title: "Current Activities",
    description: "Describe what is happening right now",
    icon: "activity",
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    tasks: [
      { id: "7-1", title: "Learn present continuous", isCompleted: false },
      { id: "7-2", title: "Describe actions happening now", isCompleted: false },
      { id: "7-3", title: "Ask 'What are you doing?'", isCompleted: false },
    ],
    quote: "What are you doing right now? 🎬",
  },
  {
    id: 8,
    title: "Simple Past",
    description: "Talk about things that happened before",
    icon: "history",
    isUnlocked: true,
    isCompleted: false,
    progress: 0,
    tasks: [
      { id: "8-1", title: "Learn past tense verbs", isCompleted: false },
      { id: "8-2", title: "Tell a simple story", isCompleted: false },
      { id: "8-3", title: "Ask about past events", isCompleted: false },
    ],
    quote: "Yesterday's lessons build tomorrow's fluency! 📖",
  },
];

export const mockUserProgress: UserProgress = {
  name: "Maria",
  avatar: "",
  level: 3,
  points: 450,
  badges: [
    { id: "first-step", name: "First Step", icon: "star", description: "Complete your first lesson", isEarned: true },
    { id: "week-streak", name: "Week Warrior", icon: "flame", description: "7 day streak", isEarned: true },
    { id: "vocab-master", name: "Word Collector", icon: "book", description: "Learn 50 words", isEarned: false },
    { id: "speaker", name: "Brave Speaker", icon: "mic", description: "Complete 10 speaking exercises", isEarned: false },
  ],
  modulesCompleted: 0,
  totalModules: 6,
  vocabulary: { current: 20, total: 500 },
  everydayEnglish: { current: 10, total: 50 },
  listening: { current: 5, total: 30 },
  speaking: { current: 3, total: 20 },
  streak: 5,
  totalTimeSpent: 600, // 10 minutes in seconds
};

export const characters = [
  { name: "Ahmet", country: "Egypt", flag: "🇪🇬" },
  { name: "Marisol", country: "Peru", flag: "🇵🇪" },
  { name: "Saojin", country: "Korea", flag: "🇰🇷" },
  { name: "Fatima", country: "Bangladesh", flag: "🇧🇩" },
  { name: "Dmitry", country: "Russia", flag: "🇷🇺" },
  { name: "Rosa", country: "Dominican Rep.", flag: "🇩🇴" },
  { name: "Ali", country: "Türkiye", flag: "🇹🇷" },
];
