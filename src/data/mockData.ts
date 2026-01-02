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
    title: "Personal Information",
    description: "Share your phone number, address, and email",
    icon: "clipboard",
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    tasks: [
      { id: "2-1", title: "Learn number words 0-100", isCompleted: false },
      { id: "2-2", title: "Practice spelling your address", isCompleted: false },
      { id: "2-3", title: "Fill out a simple form", isCompleted: false },
    ],
    quote: "Your information opens doors to new opportunities! 📋",
  },
  {
    id: 3,
    title: "Directions",
    description: "Find your way around town and help others too",
    icon: "map",
    isUnlocked: false,
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
    isUnlocked: false,
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
    title: "Shopping",
    description: "Buy what you need and understand prices",
    icon: "shopping-bag",
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    tasks: [
      { id: "5-1", title: "Learn money vocabulary", isCompleted: false },
      { id: "5-2", title: "Ask 'How much is this?'", isCompleted: false },
      { id: "5-3", title: "Complete a shopping dialogue", isCompleted: false },
    ],
    quote: "Shopping is a skill - practice makes perfect! 🛍️",
  },
  {
    id: 6,
    title: "Job Application",
    description: "Apply for jobs and talk about your skills",
    icon: "briefcase",
    isUnlocked: false,
    isCompleted: false,
    progress: 0,
    tasks: [
      { id: "6-1", title: "Write a simple resume", isCompleted: false },
      { id: "6-2", title: "Practice interview questions", isCompleted: false },
      { id: "6-3", title: "Learn workplace vocabulary", isCompleted: false },
    ],
    quote: "Every expert was once a beginner! 💼",
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
};

export const characters = [
  { name: "Maria", country: "Mexico", flag: "🇲🇽" },
  { name: "Ahmed", country: "Egypt", flag: "🇪🇬" },
  { name: "Yuki", country: "Japan", flag: "🇯🇵" },
  { name: "Priya", country: "India", flag: "🇮🇳" },
  { name: "Carlos", country: "Brazil", flag: "🇧🇷" },
  { name: "Fatima", country: "Morocco", flag: "🇲🇦" },
];
