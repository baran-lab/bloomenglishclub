// Daily Task Content - rotates by day

export interface ListenRepeatContent {
  type: 'listen-repeat';
  instruction: string;
  words: string[];
}

export interface DialogueContent {
  type: 'dialogue';
  instruction: string;
  lines: { speaker: string; text: string }[];
  question?: string;
}

export interface RepeatSentenceContent {
  type: 'repeat-sentence';
  instruction: string;
  sentence: string;
}

export interface ListenChooseContent {
  type: 'listen-choose';
  instruction: string;
  dialogue: { speaker: string; text: string }[];
  question: string;
  options: string[];
  correctIndex: number;
}

export interface VocabularyContent {
  type: 'vocabulary';
  instruction: string;
  words: { word: string; meaning: string; emoji: string }[];
}

export interface UseSentencesContent {
  type: 'use-sentences';
  instruction: string;
  words: string[];
  exampleSentences: { word: string; sentence: string }[];
}

export interface PronunciationContent {
  type: 'pronunciation';
  instruction: string;
  words: string[];
}

export interface ReadSignContent {
  type: 'read-sign';
  instruction: string;
  sign: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface FillFormContent {
  type: 'fill-form';
  instruction: string;
  fields: { label: string; placeholder: string }[];
}

export interface CountingContent {
  type: 'counting';
  instruction: string;
  from: number;
  to: number;
}

export interface MatchWordsContent {
  type: 'match-words';
  instruction: string;
  pairs: { word: string; emoji: string }[];
}

export interface ReviewWordsContent {
  type: 'review-words';
  instruction: string;
  words: { word: string; emoji: string }[];
}

export interface SayWordsContent {
  type: 'say-words';
  instruction: string;
  words: string[];
}

export type DailyTaskContent =
  | ListenRepeatContent
  | DialogueContent
  | RepeatSentenceContent
  | ListenChooseContent
  | VocabularyContent
  | UseSentencesContent
  | PronunciationContent
  | ReadSignContent
  | FillFormContent
  | CountingContent
  | MatchWordsContent
  | ReviewWordsContent
  | SayWordsContent;

export interface DailyTaskSet {
  dayLabel: string;
  tasks: DailyTaskContent[];
}

export const dailyTaskSets: DailyTaskSet[] = [
  // Day 1
  {
    dayLabel: "Day 1",
    tasks: [
      {
        type: 'listen-repeat',
        instruction: '🎧 Listen and repeat these 5 words.',
        words: ['name', 'city', 'job', 'phone', 'address'],
      },
      {
        type: 'dialogue',
        instruction: '🎧 Listen to this short dialogue.',
        lines: [
          { speaker: 'A', text: 'Hello! What is your name?' },
          { speaker: 'B', text: 'My name is Maria.' },
          { speaker: 'A', text: 'Nice to meet you, Maria!' },
          { speaker: 'B', text: 'Nice to meet you too!' },
        ],
      },
      {
        type: 'repeat-sentence',
        instruction: '🎤 Listen and repeat this sentence.',
        sentence: 'My name is Anna.',
      },
      {
        type: 'listen-choose',
        instruction: '🎧 Listen and choose the correct answer.',
        dialogue: [
          { speaker: 'A', text: 'What is your name?' },
          { speaker: 'B', text: 'My name is Carlos.' },
        ],
        question: 'What is his name?',
        options: ['Maria', 'Carlos', 'Anna'],
        correctIndex: 1,
      },
      {
        type: 'vocabulary',
        instruction: '📚 Learn these 5 new words.',
        words: [
          { word: 'teacher', meaning: 'A person who teaches', emoji: '👩‍🏫' },
          { word: 'doctor', meaning: 'A person who helps sick people', emoji: '👨‍⚕️' },
          { word: 'student', meaning: 'A person who studies', emoji: '🧑‍🎓' },
          { word: 'nurse', meaning: 'A person who helps in a hospital', emoji: '👩‍⚕️' },
          { word: 'driver', meaning: 'A person who drives', emoji: '🚗' },
        ],
      },
    ],
  },
  // Day 2
  {
    dayLabel: "Day 2",
    tasks: [
      {
        type: 'listen-repeat',
        instruction: '🎧 Listen and repeat these 5 words.',
        words: ['hello', 'goodbye', 'please', 'thank you', 'sorry'],
      },
      {
        type: 'dialogue',
        instruction: '🎧 Listen to this short dialogue.',
        lines: [
          { speaker: 'A', text: 'Where are you from?' },
          { speaker: 'B', text: 'I am from Mexico.' },
          { speaker: 'A', text: 'That is nice! I am from Canada.' },
        ],
      },
      {
        type: 'repeat-sentence',
        instruction: '🎤 Listen and repeat this sentence.',
        sentence: 'I am from Mexico.',
      },
      {
        type: 'listen-choose',
        instruction: '🎧 Listen and choose the correct answer.',
        dialogue: [
          { speaker: 'A', text: 'Where are you from?' },
          { speaker: 'B', text: 'I am from Brazil.' },
        ],
        question: 'Where is she from?',
        options: ['Canada', 'Mexico', 'Brazil'],
        correctIndex: 2,
      },
      {
        type: 'use-sentences',
        instruction: '📚 Use these words in sentences.',
        words: ['morning', 'afternoon', 'night'],
        exampleSentences: [
          { word: 'morning', sentence: 'Good morning!' },
          { word: 'afternoon', sentence: 'Good afternoon!' },
          { word: 'night', sentence: 'Good night!' },
        ],
      },
    ],
  },
  // Day 3
  {
    dayLabel: "Day 3",
    tasks: [
      {
        type: 'listen-repeat',
        instruction: '🎧 Listen and repeat these 5 words.',
        words: ['morning', 'afternoon', 'evening', 'night', 'today'],
      },
      {
        type: 'dialogue',
        instruction: '🎧 Listen to this short dialogue.',
        lines: [
          { speaker: 'A', text: 'Good morning! How are you?' },
          { speaker: 'B', text: 'I am fine, thank you.' },
          { speaker: 'A', text: 'That is good!' },
        ],
      },
      {
        type: 'repeat-sentence',
        instruction: '🎤 Listen and repeat this sentence.',
        sentence: 'Good morning! How are you?',
      },
      {
        type: 'listen-choose',
        instruction: '🎧 Listen and choose the correct answer.',
        dialogue: [
          { speaker: 'A', text: 'How are you?' },
          { speaker: 'B', text: 'I am fine, thank you.' },
        ],
        question: 'How is she?',
        options: ['She is sad.', 'She is fine.', 'She is hungry.'],
        correctIndex: 1,
      },
      {
        type: 'fill-form',
        instruction: '📝 Fill out this simple form.',
        fields: [
          { label: 'First Name', placeholder: 'e.g. Maria' },
          { label: 'Last Name', placeholder: 'e.g. Garcia' },
          { label: 'Phone Number', placeholder: 'e.g. 555-1234' },
        ],
      },
    ],
  },
  // Day 4
  {
    dayLabel: "Day 4",
    tasks: [
      {
        type: 'listen-repeat',
        instruction: '🎧 Listen and repeat these 5 words.',
        words: ['water', 'food', 'house', 'school', 'work'],
      },
      {
        type: 'dialogue',
        instruction: '🎧 Listen to this short dialogue.',
        lines: [
          { speaker: 'A', text: 'What is your phone number?' },
          { speaker: 'B', text: 'My phone number is 555-1234.' },
          { speaker: 'A', text: 'Thank you!' },
        ],
      },
      {
        type: 'repeat-sentence',
        instruction: '🎤 Listen and repeat this sentence.',
        sentence: 'My phone number is 555-1234.',
      },
      {
        type: 'match-words',
        instruction: '🧩 Match the words with the pictures.',
        pairs: [
          { word: 'apple', emoji: '🍎' },
          { word: 'book', emoji: '📖' },
          { word: 'car', emoji: '🚗' },
          { word: 'dog', emoji: '🐕' },
          { word: 'egg', emoji: '🥚' },
        ],
      },
      {
        type: 'counting',
        instruction: '🔢 Count from 1 to 20 out loud. Record your voice!',
        from: 1,
        to: 20,
      },
    ],
  },
  // Day 5
  {
    dayLabel: "Day 5",
    tasks: [
      {
        type: 'pronunciation',
        instruction: '🎤 Practice saying these words clearly.',
        words: ['the', 'this', 'that', 'three', 'think'],
      },
      {
        type: 'dialogue',
        instruction: '🎧 Listen to this short dialogue.',
        lines: [
          { speaker: 'A', text: 'Can I help you?' },
          { speaker: 'B', text: 'Yes, I need a pen, please.' },
          { speaker: 'A', text: 'Here you go!' },
          { speaker: 'B', text: 'Thank you!' },
        ],
      },
      {
        type: 'repeat-sentence',
        instruction: '🎤 Listen and repeat this sentence.',
        sentence: 'Can I have some water, please?',
      },
      {
        type: 'listen-choose',
        instruction: '🎧 Listen and choose the correct answer.',
        dialogue: [
          { speaker: 'A', text: 'What do you need?' },
          { speaker: 'B', text: 'I need a pen.' },
        ],
        question: 'What does he need?',
        options: ['A book', 'A pen', 'A phone'],
        correctIndex: 1,
      },
      {
        type: 'read-sign',
        instruction: '📝 Read this sign and answer the question.',
        sign: '🚪 EXIT',
        question: 'What does this sign mean?',
        options: ['Go inside', 'Go out', 'Stop'],
        correctIndex: 1,
      },
    ],
  },
  // Day 6
  {
    dayLabel: "Day 6",
    tasks: [
      {
        type: 'listen-repeat',
        instruction: '🎧 Listen and repeat these 5 words.',
        words: ['family', 'mother', 'father', 'sister', 'brother'],
      },
      {
        type: 'vocabulary',
        instruction: '📚 Learn these 5 new words.',
        words: [
          { word: 'bus', meaning: 'A big vehicle for many people', emoji: '🚌' },
          { word: 'train', meaning: 'Travels on tracks', emoji: '🚆' },
          { word: 'taxi', meaning: 'A car you pay to ride', emoji: '🚕' },
          { word: 'walk', meaning: 'Move with your feet', emoji: '🚶' },
          { word: 'bike', meaning: 'Two wheels', emoji: '🚲' },
        ],
      },
      {
        type: 'repeat-sentence',
        instruction: '🎤 Listen and repeat this sentence.',
        sentence: 'I take the bus to school.',
      },
      {
        type: 'say-words',
        instruction: '🎤 Say these words out loud and record your voice.',
        words: ['bus', 'train', 'taxi', 'walk', 'bike'],
      },
      {
        type: 'review-words',
        instruction: '🔁 Review these words from yesterday. Listen and repeat each one.',
        words: [
          { word: 'water', emoji: '💧' },
          { word: 'food', emoji: '🍕' },
          { word: 'house', emoji: '🏠' },
          { word: 'school', emoji: '🏫' },
          { word: 'work', emoji: '💼' },
        ],
      },
    ],
  },
  // Day 7
  {
    dayLabel: "Day 7",
    tasks: [
      {
        type: 'listen-repeat',
        instruction: '🎧 Listen and repeat these 5 words.',
        words: ['happy', 'sad', 'tired', 'hungry', 'cold'],
      },
      {
        type: 'dialogue',
        instruction: '🎧 Listen to this short dialogue.',
        lines: [
          { speaker: 'A', text: 'How do you feel today?' },
          { speaker: 'B', text: 'I am tired.' },
          { speaker: 'A', text: 'You should rest!' },
          { speaker: 'B', text: 'Yes, thank you.' },
        ],
      },
      {
        type: 'repeat-sentence',
        instruction: '🎤 Listen and repeat this sentence.',
        sentence: 'I feel happy today.',
      },
      {
        type: 'listen-choose',
        instruction: '🎧 Listen and choose the correct answer.',
        dialogue: [
          { speaker: 'A', text: 'How do you feel?' },
          { speaker: 'B', text: 'I am hungry.' },
        ],
        question: 'How does she feel?',
        options: ['Happy', 'Hungry', 'Tired'],
        correctIndex: 1,
      },
      {
        type: 'fill-form',
        instruction: '📝 Write your name and address.',
        fields: [
          { label: 'Full Name', placeholder: 'e.g. Maria Garcia' },
          { label: 'Street Address', placeholder: 'e.g. 123 Main Street' },
          { label: 'City', placeholder: 'e.g. Toronto' },
          { label: 'Phone', placeholder: 'e.g. 416-555-1234' },
        ],
      },
    ],
  },
];

export function getTodayTaskSet(): DailyTaskSet {
  const start = new Date(2025, 0, 1);
  const now = new Date();
  const daysSinceStart = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return dailyTaskSets[daysSinceStart % dailyTaskSets.length];
}

export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
