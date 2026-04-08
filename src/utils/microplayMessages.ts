// Microplay Message Library - used throughout the app for consistent encouraging feedback

export const microplay = {
  // Voice recording feedback
  voiceGood: [
    "Great job! That was clear. 👏",
    "Well done! Your pronunciation is great! 🌟",
    "Excellent! Keep it up! ✨",
    "Nice! That sounded really good! 💪",
  ],
  voiceNeedsWork: [
    "Nice try! Let's try one more time. 🔁",
    "Good effort! Try again — you're close! 💪",
    "Almost there! One more try! ✨",
    "Keep going! Practice makes perfect! 🌟",
  ],

  // General encouragement
  success: [
    "Great job! 🎉",
    "Nice try! 👏",
    "You're improving! 📈",
    "Keep going! 💪",
  ],
  retry: [
    "Try one more time. 🔁",
    "You're close! 💫",
    "Almost! Let's try again. ✨",
  ],
  motivation: [
    "Small steps every day. 🌱",
    "You can do this. 💪",
    "Every word counts. ⭐",
    "You're building confidence. 🌟",
  ],

  // Mini success celebrations
  miniCelebrations: {
    firstLesson: "You completed your first lesson! 🎉",
    firstSentence: "You said your first sentence! 🗣️",
    wordsLearned: (count: number) => `You learned ${count} new words! 📚`,
    lessonsCompleted: (count: number) => `You completed ${count} lessons! 🏆`,
    streakMilestone: (days: number) => `${days}-day streak! You're on fire! 🔥`,
    firstRecording: "You made your first recording! 🎤",
    firstTask: "You completed your first daily task! ✅",
  },

  // Real-life connection suggestions per module
  realLifeSuggestions: [
    { module: 1, text: "Try introducing yourself to someone today.", emoji: "👋" },
    { module: 1, text: "Say 'Hello, my name is...' to a neighbor.", emoji: "🏠" },
    { module: 2, text: "Practice spelling your name out loud.", emoji: "🔤" },
    { module: 2, text: "Say today's date in English.", emoji: "📅" },
    { module: 3, text: "Ask someone for directions in English.", emoji: "🗺️" },
    { module: 5, text: "Name 5 items in your kitchen in English.", emoji: "🍳" },
  ],

  // Progress narrative messages
  progressStory: {
    speaking: "You are improving. 🗣️",
    listening: "You understand more. 👂",
    vocabulary: "You know more words. 📚",
    realLife: "You're using English in real life. 🌍",
  },
};

export function getRandomMessage(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

export function getVoiceFeedback(score: number): { message: string; isGood: boolean } {
  if (score >= 60) {
    return { message: getRandomMessage(microplay.voiceGood), isGood: true };
  }
  return { message: getRandomMessage(microplay.voiceNeedsWork), isGood: false };
}
