// Module 1 - Introduce Yourself Content Data

export type SupportedLanguage = 'arabic' | 'bengali' | 'korean' | 'spanish' | 'turkish';

export interface Character {
  id: string;
  name: string;
  country: string;
  flag: string;
  avatar: string;
  job?: string;
  apartment?: string;
}

export const characters: Character[] = [
  { id: 'ahmet', name: 'Ahmet El-Masri', country: 'Egypt', flag: '🇪🇬', avatar: '👨‍🦱', job: 'Engineer', apartment: 'Apt 101' },
  { id: 'heba', name: 'Heba El-Masri', country: 'Egypt', flag: '🇪🇬', avatar: '👩', job: 'Teacher', apartment: 'Apt 101' },
  { id: 'marisol', name: 'Marisol Rivera', country: 'Peru', flag: '🇵🇪', avatar: '👩‍🦰', job: 'Nurse', apartment: 'Apt 102' },
  { id: 'saojin', name: 'Saojin Lee', country: 'Korea', flag: '🇰🇷', avatar: '👩‍💼', job: 'Chef', apartment: 'Apt 103' },
  { id: 'fatima', name: 'Fatima Hassan', country: 'Bangladesh', flag: '🇧🇩', avatar: '🧕', job: 'Doctor', apartment: 'Apt 104' },
  { id: 'dmitry', name: 'Dmitry Ivanov', country: 'Russia', flag: '🇷🇺', avatar: '👨', job: 'Driver', apartment: 'Apt 105' },
  { id: 'rosa', name: 'Rosa Silva', country: 'Dominican Republic', flag: '🇩🇴', avatar: '👩‍🦱', job: 'Store Clerk', apartment: 'Apt 106' },
  { id: 'ali', name: 'Ali Demir', country: 'Türkiye', flag: '🇹🇷', avatar: '👨‍🦳', job: 'Mechanic', apartment: 'Apt 107' },
];

export interface VocabularyItem {
  id: string;
  english: string;
  pronunciation: string;
  translations: Record<SupportedLanguage, string>;
  audioExample?: string;
  image?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'vocabulary' | 'practice' | 'speaking' | 'review';
  videoUrl?: string;
  content?: VocabularyItem[];
  phrases?: PhraseItem[];
  isCompleted: boolean;
  duration?: string;
}

export interface PhraseItem {
  id: string;
  english: string;
  pronunciation: string;
  translations: Record<SupportedLanguage, string>;
  context?: string;
  speaker?: string;
}

// Translations for UI elements
export const uiTranslations: Record<SupportedLanguage, Record<string, string>> = {
  arabic: {
    showTranslation: 'إظهار الترجمة',
    hideTranslation: 'إخفاء الترجمة',
    record: 'تسجيل',
    stopRecording: 'إيقاف التسجيل',
    playRecording: 'تشغيل التسجيل',
    tryAgain: 'حاول مرة أخرى',
    goodJob: 'أحسنت!',
    keepPracticing: 'استمر في الممارسة',
    excellent: 'ممتاز!',
    next: 'التالي',
    previous: 'السابق',
    needHelp: 'هل تحتاج مساعدة؟',
  },
  bengali: {
    showTranslation: 'অনুবাদ দেখান',
    hideTranslation: 'অনুবাদ লুকান',
    record: 'রেকর্ড',
    stopRecording: 'রেকর্ডিং বন্ধ করুন',
    playRecording: 'রেকর্ডিং চালান',
    tryAgain: 'আবার চেষ্টা করুন',
    goodJob: 'সাবাশ!',
    keepPracticing: 'অনুশীলন চালিয়ে যান',
    excellent: 'চমৎকার!',
    next: 'পরবর্তী',
    previous: 'পূর্ববর্তী',
    needHelp: 'সাহায্য দরকার?',
  },
  korean: {
    showTranslation: '번역 보기',
    hideTranslation: '번역 숨기기',
    record: '녹음',
    stopRecording: '녹음 중지',
    playRecording: '녹음 재생',
    tryAgain: '다시 시도',
    goodJob: '잘했어요!',
    keepPracticing: '계속 연습하세요',
    excellent: '훌륭해요!',
    next: '다음',
    previous: '이전',
    needHelp: '도움이 필요하세요?',
  },
  spanish: {
    showTranslation: 'Mostrar traducción',
    hideTranslation: 'Ocultar traducción',
    record: 'Grabar',
    stopRecording: 'Detener grabación',
    playRecording: 'Reproducir grabación',
    tryAgain: 'Inténtalo de nuevo',
    goodJob: '¡Buen trabajo!',
    keepPracticing: 'Sigue practicando',
    excellent: '¡Excelente!',
    next: 'Siguiente',
    previous: 'Anterior',
    needHelp: '¿Necesitas ayuda?',
  },
  turkish: {
    showTranslation: 'Çeviriyi göster',
    hideTranslation: 'Çeviriyi gizle',
    record: 'Kaydet',
    stopRecording: 'Kaydı durdur',
    playRecording: 'Kaydı oynat',
    tryAgain: 'Tekrar dene',
    goodJob: 'Aferin!',
    keepPracticing: 'Pratik yapmaya devam et',
    excellent: 'Mükemmel!',
    next: 'Sonraki',
    previous: 'Önceki',
    needHelp: 'Yardıma mı ihtiyacın var?',
  },
};

// Language display names
export const languageNames: Record<SupportedLanguage, { native: string; english: string; flag: string }> = {
  arabic: { native: 'العربية', english: 'Arabic', flag: '🇸🇦' },
  bengali: { native: 'বাংলা', english: 'Bengali', flag: '🇧🇩' },
  korean: { native: '한국어', english: 'Korean', flag: '🇰🇷' },
  spanish: { native: 'Español', english: 'Spanish', flag: '🇪🇸' },
  turkish: { native: 'Türkçe', english: 'Turkish', flag: '🇹🇷' },
};

// Greetings and Introduction Phrases
export const greetingPhrases: PhraseItem[] = [
  {
    id: 'hello',
    english: 'Hello!',
    pronunciation: 'heh-LOH',
    translations: {
      arabic: 'مرحبا!',
      bengali: 'হ্যালো!',
      korean: '안녕하세요!',
      spanish: '¡Hola!',
      turkish: 'Merhaba!',
    },
    context: 'A friendly greeting',
  },
  {
    id: 'hi',
    english: 'Hi!',
    pronunciation: 'hai',
    translations: {
      arabic: 'مرحبا!',
      bengali: 'হাই!',
      korean: '안녕!',
      spanish: '¡Hola!',
      turkish: 'Selam!',
    },
    context: 'Informal greeting',
  },
  {
    id: 'good-morning',
    english: 'Good morning!',
    pronunciation: 'gud MOR-ning',
    translations: {
      arabic: 'صباح الخير!',
      bengali: 'সুপ্রভাত!',
      korean: '좋은 아침이에요!',
      spanish: '¡Buenos días!',
      turkish: 'Günaydın!',
    },
    context: 'Morning greeting (before noon)',
  },
  {
    id: 'good-afternoon',
    english: 'Good afternoon!',
    pronunciation: 'gud af-ter-NOON',
    translations: {
      arabic: 'مساء الخير!',
      bengali: 'শুভ অপরাহ্ন!',
      korean: '안녕하세요! (오후)',
      spanish: '¡Buenas tardes!',
      turkish: 'Tünaydın!',
    },
    context: 'Afternoon greeting (noon to 6pm)',
  },
  {
    id: 'good-evening',
    english: 'Good evening!',
    pronunciation: 'gud EEV-ning',
    translations: {
      arabic: 'مساء الخير!',
      bengali: 'শুভ সন্ধ্যা!',
      korean: '좋은 저녁이에요!',
      spanish: '¡Buenas noches!',
      turkish: 'İyi akşamlar!',
    },
    context: 'Evening greeting (after 6pm)',
  },
  {
    id: 'my-name-is',
    english: 'My name is...',
    pronunciation: 'mai naym iz',
    translations: {
      arabic: 'اسمي...',
      bengali: 'আমার নাম...',
      korean: '제 이름은...입니다',
      spanish: 'Mi nombre es... / Me llamo...',
      turkish: 'Benim adım...',
    },
    context: 'Introducing yourself',
  },
  {
    id: 'what-is-your-name',
    english: 'What is your name?',
    pronunciation: 'wut iz yor naym',
    translations: {
      arabic: 'ما اسمك؟',
      bengali: 'তোমার নাম কি?',
      korean: '이름이 뭐예요?',
      spanish: '¿Cómo te llamas? / ¿Cuál es tu nombre?',
      turkish: 'Adın ne?',
    },
    context: 'Asking someone\'s name',
  },
  {
    id: 'nice-to-meet-you',
    english: 'Nice to meet you!',
    pronunciation: 'nais tu meet yoo',
    translations: {
      arabic: 'سعيد بلقائك!',
      bengali: 'আপনার সাথে পরিচিত হয়ে খুশি হলাম!',
      korean: '만나서 반가워요!',
      spanish: '¡Mucho gusto! / ¡Encantado/a!',
      turkish: 'Tanıştığımıza memnun oldum!',
    },
    context: 'After meeting someone new',
  },
  {
    id: 'how-are-you',
    english: 'How are you?',
    pronunciation: 'hau ar yoo',
    translations: {
      arabic: 'كيف حالك؟',
      bengali: 'তুমি কেমন আছ?',
      korean: '어떻게 지내세요?',
      spanish: '¿Cómo estás?',
      turkish: 'Nasılsın?',
    },
    context: 'Asking about someone\'s wellbeing',
  },
  {
    id: 'im-fine',
    english: "I'm fine, thank you.",
    pronunciation: 'aim fain, thenk yoo',
    translations: {
      arabic: 'أنا بخير، شكراً',
      bengali: 'আমি ভালো আছি, ধন্যবাদ',
      korean: '잘 지내요, 감사합니다',
      spanish: 'Estoy bien, gracias',
      turkish: 'İyiyim, teşekkürler',
    },
    context: 'Response to "How are you?"',
  },
  {
    id: 'where-are-you-from',
    english: 'Where are you from?',
    pronunciation: 'wer ar yoo from',
    translations: {
      arabic: 'من أين أنت؟',
      bengali: 'তুমি কোথা থেকে এসেছ?',
      korean: '어디에서 왔어요?',
      spanish: '¿De dónde eres?',
      turkish: 'Nerelisin?',
    },
    context: 'Asking about origin',
  },
  {
    id: 'im-from',
    english: "I'm from...",
    pronunciation: 'aim from',
    translations: {
      arabic: 'أنا من...',
      bengali: 'আমি... থেকে এসেছি',
      korean: '저는...에서 왔어요',
      spanish: 'Soy de...',
      turkish: 'Ben...\'danım / ...\'lıyım',
    },
    context: 'Saying where you are from',
  },
];

// Numbers vocabulary
export const numbersVocabulary: VocabularyItem[] = [
  { id: 'num-0', english: 'zero', pronunciation: 'ZEE-roh', translations: { arabic: 'صفر', bengali: 'শূন্য', korean: '영', spanish: 'cero', turkish: 'sıfır' } },
  { id: 'num-1', english: 'one', pronunciation: 'wun', translations: { arabic: 'واحد', bengali: 'এক', korean: '일', spanish: 'uno', turkish: 'bir' } },
  { id: 'num-2', english: 'two', pronunciation: 'too', translations: { arabic: 'اثنان', bengali: 'দুই', korean: '이', spanish: 'dos', turkish: 'iki' } },
  { id: 'num-3', english: 'three', pronunciation: 'three', translations: { arabic: 'ثلاثة', bengali: 'তিন', korean: '삼', spanish: 'tres', turkish: 'üç' } },
  { id: 'num-4', english: 'four', pronunciation: 'for', translations: { arabic: 'أربعة', bengali: 'চার', korean: '사', spanish: 'cuatro', turkish: 'dört' } },
  { id: 'num-5', english: 'five', pronunciation: 'faiv', translations: { arabic: 'خمسة', bengali: 'পাঁচ', korean: '오', spanish: 'cinco', turkish: 'beş' } },
  { id: 'num-6', english: 'six', pronunciation: 'siks', translations: { arabic: 'ستة', bengali: 'ছয়', korean: '육', spanish: 'seis', turkish: 'altı' } },
  { id: 'num-7', english: 'seven', pronunciation: 'SEV-en', translations: { arabic: 'سبعة', bengali: 'সাত', korean: '칠', spanish: 'siete', turkish: 'yedi' } },
  { id: 'num-8', english: 'eight', pronunciation: 'ayt', translations: { arabic: 'ثمانية', bengali: 'আট', korean: '팔', spanish: 'ocho', turkish: 'sekiz' } },
  { id: 'num-9', english: 'nine', pronunciation: 'nain', translations: { arabic: 'تسعة', bengali: 'নয়', korean: '구', spanish: 'nueve', turkish: 'dokuz' } },
  { id: 'num-10', english: 'ten', pronunciation: 'ten', translations: { arabic: 'عشرة', bengali: 'দশ', korean: '십', spanish: 'diez', turkish: 'on' } },
];

// Jobs vocabulary
export const jobsVocabulary: VocabularyItem[] = [
  { id: 'job-teacher', english: 'teacher', pronunciation: 'TEE-cher', translations: { arabic: 'معلم/معلمة', bengali: 'শিক্ষক', korean: '선생님', spanish: 'maestro/a', turkish: 'öğretmen' } },
  { id: 'job-doctor', english: 'doctor', pronunciation: 'DOK-ter', translations: { arabic: 'طبيب/طبيبة', bengali: 'ডাক্তার', korean: '의사', spanish: 'doctor/a', turkish: 'doktor' } },
  { id: 'job-nurse', english: 'nurse', pronunciation: 'ners', translations: { arabic: 'ممرض/ممرضة', bengali: 'নার্স', korean: '간호사', spanish: 'enfermero/a', turkish: 'hemşire' } },
  { id: 'job-engineer', english: 'engineer', pronunciation: 'en-ji-NEER', translations: { arabic: 'مهندس/مهندسة', bengali: 'প্রকৌশলী', korean: '엔지니어', spanish: 'ingeniero/a', turkish: 'mühendis' } },
  { id: 'job-driver', english: 'driver', pronunciation: 'DRAI-ver', translations: { arabic: 'سائق', bengali: 'চালক', korean: '운전사', spanish: 'conductor/a', turkish: 'şoför' } },
  { id: 'job-chef', english: 'chef', pronunciation: 'shef', translations: { arabic: 'طباخ/طباخة', bengali: 'রাঁধুনি', korean: '요리사', spanish: 'chef', turkish: 'şef' } },
  { id: 'job-mechanic', english: 'mechanic', pronunciation: 'meh-KAN-ik', translations: { arabic: 'ميكانيكي', bengali: 'মেকানিক', korean: '정비사', spanish: 'mecánico/a', turkish: 'tamirci' } },
  { id: 'job-clerk', english: 'store clerk', pronunciation: 'stor klerk', translations: { arabic: 'بائع/بائعة', bengali: 'দোকানদার', korean: '점원', spanish: 'dependiente', turkish: 'tezgahtar' } },
];

// Module 1 Lessons
export const module1Lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'My Name is Marisol',
    description: 'Learn how to introduce yourself',
    type: 'video',
    videoUrl: '/videos/module1/my-name-is-marisol.mp4',
    isCompleted: false,
    duration: '3 min',
  },
  {
    id: 'lesson-2',
    title: 'What is Your Name?',
    description: 'Learn to ask someone\'s name',
    type: 'video',
    videoUrl: '/videos/module1/what-is-your-name.mp4',
    isCompleted: false,
    duration: '4 min',
  },
  {
    id: 'lesson-3',
    title: 'Greetings & Introductions',
    description: 'Practice greeting phrases',
    type: 'vocabulary',
    phrases: greetingPhrases,
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'lesson-4',
    title: 'Numbers 0-30',
    description: 'Learn numbers in English',
    type: 'video',
    videoUrl: '/videos/module1/numbers-0-30.mp4',
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'lesson-5',
    title: 'Numbers 31-60',
    description: 'Continue learning numbers',
    type: 'video',
    videoUrl: '/videos/module1/numbers-31-60.mp4',
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'lesson-6',
    title: 'Jobs and Workplaces',
    description: 'Learn about jobs',
    type: 'vocabulary',
    content: jobsVocabulary,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'lesson-7',
    title: 'Speaking Practice',
    description: 'Record yourself speaking',
    type: 'speaking',
    phrases: greetingPhrases.slice(0, 5),
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'lesson-8',
    title: 'Practice Session',
    description: 'Practice what you learned',
    type: 'practice',
    videoUrl: '/videos/module1/welcome-practice.mp4',
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'lesson-9',
    title: "Let's Review",
    description: 'Review all Module 1 content',
    type: 'review',
    videoUrl: '/videos/module1/welcome-review.mp4',
    isCompleted: false,
    duration: '5 min',
  },
];
