// Module 1 - Introduce Yourself Content Data

export type SupportedLanguage = 'arabic' | 'bengali' | 'korean' | 'spanish' | 'turkish';

export interface Character {
  id: string;
  name: string;
  country: string;
  flag: string;
  avatar: string;
  job: string;
  apartment: string;
}

export const characters: Character[] = [
  { id: 'ahmet', name: 'Ahmet El-Masri', country: 'Egypt', flag: '🇪🇬', avatar: '👨‍🦱', job: 'Uber Driver', apartment: 'Apt 3A' },
  { id: 'heba', name: 'Heba El-Masri', country: 'Egypt', flag: '🇪🇬', avatar: '👩', job: 'Homemaker', apartment: 'Apt 3A' },
  { id: 'marisol', name: 'Marisol Rivera', country: 'Peru', flag: '🇵🇪', avatar: '👩‍🦰', job: 'Cashier', apartment: 'Apt 1A' },
  { id: 'saojin', name: 'Saojin Lee', country: 'Korea', flag: '🇰🇷', avatar: '👩‍💼', job: 'Nurse', apartment: 'Apt 1B' },
  { id: 'fatima', name: 'Fatima Hassan', country: 'Bangladesh', flag: '🇧🇩', avatar: '🧕', job: 'Home Health Aide', apartment: 'Apt 2B' },
  { id: 'dmitry', name: 'Dmitry Ivanov', country: 'Russia', flag: '🇷🇺', avatar: '👨', job: 'Student & Delivery Driver', apartment: 'Apt 4A' },
  { id: 'rosa', name: 'Rosa Silva', country: 'Dominican Republic', flag: '🇩🇴', avatar: '👩‍🦱', job: 'Housekeeper', apartment: 'Apt 3B' },
  { id: 'ali', name: 'Ali Demir', country: 'Türkiye', flag: '🇹🇷', avatar: '👨‍🦳', job: 'Electrician', apartment: 'Apt 4B' },
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
  type: 'video' | 'vocabulary' | 'practice' | 'speaking' | 'review' | 'video-series' | 'sentences' | 'numbers-practice' | 'numbers-matching' | 'listening-writing' | 'fill-in-blank' | 'smart-practice' | 'interactive-form' | 'listening-fill-in-blank' | 'quiz' | 'practice-quiz';
  videoUrl?: string;
  videos?: { url: string; title: string; subtitle?: string; listenOnly?: boolean }[];
  content?: VocabularyItem[];
  phrases?: PhraseItem[];
  sentences?: SentenceItem[];
  questions?: QuestionItem[];
  smartQuestions?: SmartQuestion[];
  fillInBlankItems?: FillInBlankItem[];
  listeningFillInBlankItems?: ListeningFillInBlankItem[];
  quizQuestions?: QuizQuestion[];
  practiceQuizSlides?: VideoSlideWithQuiz[];
  formType?: 'doctor-intake' | 'job-application' | 'insurance';
  embedUrl?: string;
  isCompleted: boolean;
  duration?: string;
}

export interface ListeningFillInBlankItem {
  id: string;
  fullSentence: string;
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswer: string;
  acceptedAnswers: string[];
  audioUrl?: string;
  translations: Record<SupportedLanguage, string>;
  blankCount?: number; // For sentences with multiple blanks
  correctAnswers?: string[]; // For multiple blanks
  acceptedAnswersPerBlank?: string[][]; // For multiple blanks
}

export interface SmartQuestion {
  id: string;
  question: string;
  audioQuestion?: string;
  translations: Record<SupportedLanguage, string>;
  validationPattern: 'name' | 'country' | 'age' | 'marital' | 'job' | 'workplace';
  acceptedPrefixes: string[];
}

export interface FillInBlankItem {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  correctAnswers: string[];
  audioUrl?: string;
  translations: Record<SupportedLanguage, string>;
}

export interface PhraseItem {
  id: string;
  english: string;
  pronunciation: string;
  translations: Record<SupportedLanguage, string>;
  context?: string;
  speaker?: string;
}

export interface SentenceItem {
  id: string;
  english: string;
  pronunciation: string;
  translations: Record<SupportedLanguage, string>;
}

export interface QuestionItem {
  id: string;
  question: string;
  audioQuestion?: string;
  translations: Record<SupportedLanguage, string>;
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
    congratulations: 'تهانينا! 🎉',
    lessonComplete: 'لقد أكملت هذا الدرس!',
    keepGoing: 'استمر في العمل الرائع!',
    almostThere: 'أنت على وشك الانتهاء!',
    greatProgress: 'تقدم رائع!',
    youCanDoIt: 'يمكنك فعل ذلك!',
    listen: 'استمع',
    repeat: 'كرر',
    typeAnswer: 'اكتب إجابتك',
    submit: 'إرسال',
    correct: 'صحيح!',
    tryAgainMessage: 'حاول مرة أخرى!',
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
    congratulations: 'অভিনন্দন! 🎉',
    lessonComplete: 'আপনি এই পাঠ শেষ করেছেন!',
    keepGoing: 'দারুণ কাজ চালিয়ে যান!',
    almostThere: 'আপনি প্রায় সেখানে!',
    greatProgress: 'দারুণ অগ্রগতি!',
    youCanDoIt: 'আপনি এটা করতে পারেন!',
    listen: 'শুনুন',
    repeat: 'পুনরাবৃত্তি করুন',
    typeAnswer: 'আপনার উত্তর লিখুন',
    submit: 'জমা দিন',
    correct: 'সঠিক!',
    tryAgainMessage: 'আবার চেষ্টা করুন!',
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
    congratulations: '축하합니다! 🎉',
    lessonComplete: '이 수업을 완료했습니다!',
    keepGoing: '계속 잘하고 있어요!',
    almostThere: '거의 다 왔어요!',
    greatProgress: '훌륭한 진전!',
    youCanDoIt: '할 수 있어요!',
    listen: '듣기',
    repeat: '따라하기',
    typeAnswer: '답을 입력하세요',
    submit: '제출',
    correct: '정답!',
    tryAgainMessage: '다시 시도해보세요!',
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
    congratulations: '¡Felicidades! 🎉',
    lessonComplete: '¡Has completado esta lección!',
    keepGoing: '¡Sigue con el gran trabajo!',
    almostThere: '¡Ya casi llegas!',
    greatProgress: '¡Gran progreso!',
    youCanDoIt: '¡Tú puedes!',
    listen: 'Escuchar',
    repeat: 'Repetir',
    typeAnswer: 'Escribe tu respuesta',
    submit: 'Enviar',
    correct: '¡Correcto!',
    tryAgainMessage: '¡Inténtalo de nuevo!',
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
    congratulations: 'Tebrikler! 🎉',
    lessonComplete: 'Bu dersi tamamladın!',
    keepGoing: 'Harika gidiyorsun!',
    almostThere: 'Neredeyse bitirdin!',
    greatProgress: 'Harika ilerleme!',
    youCanDoIt: 'Yapabilirsin!',
    listen: 'Dinle',
    repeat: 'Tekrarla',
    typeAnswer: 'Cevabını yaz',
    submit: 'Gönder',
    correct: 'Doğru!',
    tryAgainMessage: 'Tekrar dene!',
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

// Encouraging messages
export const encouragingMessages = [
  { english: "You're doing great!", translations: { arabic: 'أنت تفعل بشكل رائع!', bengali: 'আপনি দারুণ করছেন!', korean: '잘하고 있어요!', spanish: '¡Lo estás haciendo genial!', turkish: 'Harika gidiyorsun!' } },
  { english: "Keep up the good work!", translations: { arabic: 'استمر في العمل الجيد!', bengali: 'ভালো কাজ চালিয়ে যান!', korean: '계속 잘해봐요!', spanish: '¡Sigue así!', turkish: 'Böyle devam et!' } },
  { english: "You can do it!", translations: { arabic: 'يمكنك فعل ذلك!', bengali: 'আপনি এটা করতে পারেন!', korean: '할 수 있어요!', spanish: '¡Tú puedes!', turkish: 'Yapabilirsin!' } },
  { english: "Every step counts!", translations: { arabic: 'كل خطوة مهمة!', bengali: 'প্রতিটি পদক্ষেপ গুরুত্বপূর্ণ!', korean: '모든 단계가 중요해요!', spanish: '¡Cada paso cuenta!', turkish: 'Her adım önemli!' } },
  { english: "Practice makes perfect!", translations: { arabic: 'الممارسة تصنع الكمال!', bengali: 'অনুশীলনই নিখুঁততা!', korean: '연습이 완벽을 만들어요!', spanish: '¡La práctica hace al maestro!', turkish: 'Pratik mükemmelleştirir!' } },
];

// Congratulatory messages
export const congratulatoryMessages = [
  { english: "Excellent work! 🌟", translations: { arabic: 'عمل ممتاز! 🌟', bengali: 'চমৎকার কাজ! 🌟', korean: '훌륭해요! 🌟', spanish: '¡Excelente trabajo! 🌟', turkish: 'Mükemmel iş! 🌟' } },
  { english: "You're a star! ⭐", translations: { arabic: 'أنت نجم! ⭐', bengali: 'আপনি একটি তারকা! ⭐', korean: '당신은 스타예요! ⭐', spanish: '¡Eres una estrella! ⭐', turkish: 'Sen bir yıldızsın! ⭐' } },
  { english: "Amazing progress! 🎉", translations: { arabic: 'تقدم مذهل! 🎉', bengali: 'আশ্চর্যজনক অগ্রগতি! 🎉', korean: '놀라운 진전! 🎉', spanish: '¡Progreso increíble! 🎉', turkish: 'Harika ilerleme! 🎉' } },
  { english: "You did it! 🏆", translations: { arabic: 'لقد فعلتها! 🏆', bengali: 'আপনি করেছেন! 🏆', korean: '해냈어요! 🏆', spanish: '¡Lo lograste! 🏆', turkish: 'Başardın! 🏆' } },
];

// Vocabulary Set 1 - Basic Introduction Words
export const vocabulary1: VocabularyItem[] = [
  { id: 'v1-apartment', english: 'apartment', pronunciation: 'uh-PART-ment', translations: { arabic: 'شقة', bengali: 'অ্যাপার্টমেন্ট', korean: '아파트', spanish: 'apartamento', turkish: 'daire' } },
  { id: 'v1-apartment-building', english: 'apartment building', pronunciation: 'uh-PART-ment BIL-ding', translations: { arabic: 'مبنى سكني', bengali: 'অ্যাপার্টমেন্ট বিল্ডিং', korean: '아파트 건물', spanish: 'edificio de apartamentos', turkish: 'apartman' } },
  { id: 'v1-cashier', english: 'cashier', pronunciation: 'ka-SHEER', translations: { arabic: 'أمين الصندوق', bengali: 'ক্যাশিয়ার', korean: '계산원', spanish: 'cajero/a', turkish: 'kasiyer' } },
  { id: 'v1-divorced', english: 'divorced', pronunciation: 'di-VORSD', translations: { arabic: 'مطلق/مطلقة', bengali: 'তালাকপ্রাপ্ত', korean: '이혼한', spanish: 'divorciado/a', turkish: 'boşanmış' } },
  { id: 'v1-from', english: 'from', pronunciation: 'from', translations: { arabic: 'من', bengali: 'থেকে', korean: '~에서', spanish: 'de', turkish: '-den/-dan' } },
  { id: 'v1-have', english: 'have', pronunciation: 'hav', translations: { arabic: 'لديه/لديها', bengali: 'আছে', korean: '가지다', spanish: 'tener', turkish: 'sahip olmak' } },
  { id: 'v1-in', english: 'in', pronunciation: 'in', translations: { arabic: 'في', bengali: 'মধ্যে', korean: '~안에', spanish: 'en', turkish: '-de/-da' } },
  { id: 'v1-live', english: 'live', pronunciation: 'liv', translations: { arabic: 'يعيش', bengali: 'বাস করা', korean: '살다', spanish: 'vivir', turkish: 'yaşamak' } },
  { id: 'v1-married', english: 'married', pronunciation: 'MAR-eed', translations: { arabic: 'متزوج/متزوجة', bengali: 'বিবাহিত', korean: '결혼한', spanish: 'casado/a', turkish: 'evli' } },
  { id: 'v1-single', english: 'single', pronunciation: 'SING-gul', translations: { arabic: 'أعزب/عزباء', bengali: 'অবিবাহিত', korean: '미혼', spanish: 'soltero/a', turkish: 'bekar' } },
  { id: 'v1-supermarket', english: 'supermarket', pronunciation: 'SOO-per-mar-kit', translations: { arabic: 'سوبرماركت', bengali: 'সুপারমার্কেট', korean: '슈퍼마켓', spanish: 'supermercado', turkish: 'süpermarket' } },
  { id: 'v1-work', english: 'work', pronunciation: 'werk', translations: { arabic: 'يعمل', bengali: 'কাজ করা', korean: '일하다', spanish: 'trabajar', turkish: 'çalışmak' } },
];

// Vocabulary Set 2 - Neighborhood and Questions
export const vocabulary2: VocabularyItem[] = [
  { id: 'v2-children', english: 'children', pronunciation: 'CHIL-dren', translations: { arabic: 'أطفال', bengali: 'বাচ্চারা', korean: '아이들', spanish: 'niños', turkish: 'çocuklar' } },
  { id: 'v2-hotel', english: 'hotel', pronunciation: 'hoh-TEL', translations: { arabic: 'فندق', bengali: 'হোটেল', korean: '호텔', spanish: 'hotel', turkish: 'otel' } },
  { id: 'v2-housekeeper', english: 'housekeeper', pronunciation: 'HOUS-kee-per', translations: { arabic: 'عامل/ة نظافة', bengali: 'গৃহপরিচারিকা', korean: '가정부', spanish: 'ama de llaves', turkish: 'temizlikçi' } },
  { id: 'v2-job', english: 'job', pronunciation: 'job', translations: { arabic: 'وظيفة', bengali: 'চাকরি', korean: '직업', spanish: 'trabajo', turkish: 'iş' } },
  { id: 'v2-neighbor', english: 'neighbor', pronunciation: 'NAY-ber', translations: { arabic: 'جار', bengali: 'প্রতিবেশী', korean: '이웃', spanish: 'vecino/a', turkish: 'komşu' } },
  { id: 'v2-neighborhood', english: 'neighborhood', pronunciation: 'NAY-ber-hood', translations: { arabic: 'حي', bengali: 'পাড়া', korean: '동네', spanish: 'vecindario', turkish: 'mahalle' } },
  { id: 'v2-new', english: 'new', pronunciation: 'noo', translations: { arabic: 'جديد', bengali: 'নতুন', korean: '새로운', spanish: 'nuevo/a', turkish: 'yeni' } },
  { id: 'v2-what', english: 'what', pronunciation: 'wut', translations: { arabic: 'ماذا', bengali: 'কি', korean: '무엇', spanish: 'qué', turkish: 'ne' } },
  { id: 'v2-where', english: 'where', pronunciation: 'wer', translations: { arabic: 'أين', bengali: 'কোথায়', korean: '어디', spanish: 'dónde', turkish: 'nerede' } },
  { id: 'v2-with', english: 'with', pronunciation: 'with', translations: { arabic: 'مع', bengali: 'সাথে', korean: '~와 함께', spanish: 'con', turkish: 'ile' } },
];

// Questions Vocabulary - What to ask people
export const questionsVocabulary: VocabularyItem[] = [
  { id: 'q-what-is-your-name', english: 'What is your name?', pronunciation: 'wut iz yor naym', translations: { arabic: 'ما اسمك؟', bengali: 'তোমার নাম কি?', korean: '이름이 뭐예요?', spanish: '¿Cuál es tu nombre?', turkish: 'Adın ne?' } },
  { id: 'q-where-are-you-from', english: 'Where are you from?', pronunciation: 'wer ar yoo from', translations: { arabic: 'من أين أنت؟', bengali: 'তুমি কোথা থেকে?', korean: '어디에서 왔어요?', spanish: '¿De dónde eres?', turkish: 'Nerelisin?' } },
  { id: 'q-how-old-are-you', english: 'How old are you?', pronunciation: 'how ohld ar yoo', translations: { arabic: 'كم عمرك؟', bengali: 'তোমার বয়স কত?', korean: '몇 살이에요?', spanish: '¿Cuántos años tienes?', turkish: 'Kaç yaşındasın?' } },
  { id: 'q-are-you-married', english: 'Are you married or single?', pronunciation: 'ar yoo MAR-eed or SING-gul', translations: { arabic: 'هل أنت متزوج أم أعزب؟', bengali: 'তুমি কি বিবাহিত না অবিবাহিত?', korean: '결혼했어요, 아니면 미혼이에요?', spanish: '¿Estás casado/a o soltero/a?', turkish: 'Evli misin bekar mı?' } },
  { id: 'q-do-you-have-children', english: 'Do you have children?', pronunciation: 'doo yoo hav CHIL-dren', translations: { arabic: 'هل لديك أطفال؟', bengali: 'তোমার কি বাচ্চা আছে?', korean: '아이가 있으세요?', spanish: '¿Tienes hijos?', turkish: 'Çocuğun var mı?' } },
  { id: 'q-do-you-work', english: 'Do you work?', pronunciation: 'doo yoo werk', translations: { arabic: 'هل تعمل؟', bengali: 'তুমি কি কাজ কর?', korean: '일을 하세요?', spanish: '¿Trabajas?', turkish: 'Çalışıyor musun?' } },
  { id: 'q-what-do-you-do', english: 'What do you do?', pronunciation: 'wut doo yoo doo', translations: { arabic: 'ماذا تعمل؟', bengali: 'তুমি কি কর?', korean: '무슨 일을 해요?', spanish: '¿A qué te dedicas?', turkish: 'Ne iş yapıyorsun?' } },
  { id: 'q-where-do-you-work', english: 'Where do you work?', pronunciation: 'wer doo yoo werk', translations: { arabic: 'أين تعمل؟', bengali: 'তুমি কোথায় কাজ কর?', korean: '어디서 일해요?', spanish: '¿Dónde trabajas?', turkish: 'Nerede çalışıyorsun?' } },
];

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
];

// Numbers 0-10
export const numbers0to10: VocabularyItem[] = [
  { id: 'num-0', english: 'zero', pronunciation: 'ZEE-roh', translations: { arabic: 'صفر', bengali: 'শূন্য', korean: '영', spanish: 'cero', turkish: 'sıfır' } },
  { id: 'num-1', english: 'one', pronunciation: 'wun', translations: { arabic: 'واحد', bengali: 'এক', korean: '일', spanish: 'uno', turkish: 'bir' } },
  { id: 'num-2', english: 'two', pronunciation: 'too', translations: { arabic: 'اثنان', bengali: 'দুই', korean: '이', spanish: 'dos', turkish: 'iki' } },
  { id: 'num-3', english: 'three', pronunciation: 'three', translations: { arabic: 'ثلاثة', bengali: 'তিন', korean: '삼', spanish: 'tres', turkish: 'üç' } },
  { id: 'num-4', english: 'four', pronunciation: 'for', translations: { arabic: 'أربعة', bengali: 'চার', korean: '사', spanish: 'cuatro', turkish: 'dört' } },
  { id: 'num-5', english: 'five', pronunciation: 'fahyv', translations: { arabic: 'خمسة', bengali: 'পাঁচ', korean: '오', spanish: 'cinco', turkish: 'beş' } },
  { id: 'num-6', english: 'six', pronunciation: 'siks', translations: { arabic: 'ستة', bengali: 'ছয়', korean: '육', spanish: 'seis', turkish: 'altı' } },
  { id: 'num-7', english: 'seven', pronunciation: 'SEV-en', translations: { arabic: 'سبعة', bengali: 'সাত', korean: '칠', spanish: 'siete', turkish: 'yedi' } },
  { id: 'num-8', english: 'eight', pronunciation: 'ayt', translations: { arabic: 'ثمانية', bengali: 'আট', korean: '팔', spanish: 'ocho', turkish: 'sekiz' } },
  { id: 'num-9', english: 'nine', pronunciation: 'nahyn', translations: { arabic: 'تسعة', bengali: 'নয়', korean: '구', spanish: 'nueve', turkish: 'dokuz' } },
  { id: 'num-10', english: 'ten', pronunciation: 'ten', translations: { arabic: 'عشرة', bengali: 'দশ', korean: '십', spanish: 'diez', turkish: 'on' } },
];

// Numbers 11-20
export const numbers11to20: VocabularyItem[] = [
  { id: 'num-11', english: 'eleven', pronunciation: 'i-LEV-en', translations: { arabic: 'أحد عشر', bengali: 'এগারো', korean: '십일', spanish: 'once', turkish: 'on bir' } },
  { id: 'num-12', english: 'twelve', pronunciation: 'twelv', translations: { arabic: 'اثنا عشر', bengali: 'বারো', korean: '십이', spanish: 'doce', turkish: 'on iki' } },
  { id: 'num-13', english: 'thirteen', pronunciation: 'ther-TEEN', translations: { arabic: 'ثلاثة عشر', bengali: 'তেরো', korean: '십삼', spanish: 'trece', turkish: 'on üç' } },
  { id: 'num-14', english: 'fourteen', pronunciation: 'for-TEEN', translations: { arabic: 'أربعة عشر', bengali: 'চৌদ্দ', korean: '십사', spanish: 'catorce', turkish: 'on dört' } },
  { id: 'num-15', english: 'fifteen', pronunciation: 'fif-TEEN', translations: { arabic: 'خمسة عشر', bengali: 'পনেরো', korean: '십오', spanish: 'quince', turkish: 'on beş' } },
  { id: 'num-16', english: 'sixteen', pronunciation: 'siks-TEEN', translations: { arabic: 'ستة عشر', bengali: 'ষোল', korean: '십육', spanish: 'dieciséis', turkish: 'on altı' } },
  { id: 'num-17', english: 'seventeen', pronunciation: 'sev-en-TEEN', translations: { arabic: 'سبعة عشر', bengali: 'সতেরো', korean: '십칠', spanish: 'diecisiete', turkish: 'on yedi' } },
  { id: 'num-18', english: 'eighteen', pronunciation: 'ay-TEEN', translations: { arabic: 'ثمانية عشر', bengali: 'আঠারো', korean: '십팔', spanish: 'dieciocho', turkish: 'on sekiz' } },
  { id: 'num-19', english: 'nineteen', pronunciation: 'nahyn-TEEN', translations: { arabic: 'تسعة عشر', bengali: 'উনিশ', korean: '십구', spanish: 'diecinueve', turkish: 'on dokuz' } },
  { id: 'num-20', english: 'twenty', pronunciation: 'TWEN-tee', translations: { arabic: 'عشرون', bengali: 'বিশ', korean: '이십', spanish: 'veinte', turkish: 'yirmi' } },
];

// Module 1 Intro video URL (shown after login/language selection)
export const module1IntroVideoUrl = '/videos/module1/m1-l1-s1.mp4';

// Marisol Videos - Reordered: My name, From Peru, Cashier, Supermarket, Single, 28 years old
export const marisolVideos = [
  { url: '/videos/module1/m1-l1-s2.mp4', title: 'My name is Marisol Rivera.', subtitle: 'Introducing yourself' },
  { url: '/videos/module1/m1-l1-s3.mp4', title: 'I am from Peru.', subtitle: 'Telling where you are from' },
  { url: '/videos/module1/m1-l1-s4.mp4', title: 'I am a cashier.', subtitle: 'Saying your job' },
  { url: '/videos/module1/m1-l1-s5.mp4', title: 'I work in a supermarket.', subtitle: 'Saying where you work' },
  { url: '/videos/module1/m1-l1-s6.mp4', title: 'I am single.', subtitle: 'Telling your marital status' },
  { url: '/videos/module1/m1-l1-s7.mp4', title: 'I am 28 years old.', subtitle: 'Saying your age' },
];

// Rosa Videos - M1 L2 S1-S8 - Revised: Slides 1 & 8 are listen-only, others practice answers only
export const rosaVideos = [
  { url: '/videos/module1/m1-l2-s1.mp4', title: 'Hi! I am your new neighbor.', subtitle: 'Listen only', listenOnly: true },
  { url: '/videos/module1/m1-l2-s2.mp4', title: 'My name is Rosa Silva.', subtitle: 'Practice' },
  { url: '/videos/module1/m1-l2-s3.mp4', title: 'I am from the Dominican Republic.', subtitle: 'Practice' },
  { url: '/videos/module1/m1-l2-s4.mp4', title: 'I am 30 years old.', subtitle: 'Practice' },
  { url: '/videos/module1/m1-l2-s5.mp4', title: 'I am a housekeeper.', subtitle: 'Practice' },
  { url: '/videos/module1/m1-l2-s6.mp4', title: 'I work in a hotel.', subtitle: 'Practice' },
  { url: '/videos/module1/m1-l2-s7.mp4', title: 'I am married.', subtitle: 'Practice' },
  { url: '/videos/module1/m1-l2-s8.mp4', title: '', subtitle: 'Listen only', listenOnly: true },
];

// Practice 1 - Video slides with quiz questions (no voice recording)
export interface VideoSlideWithQuiz {
  url: string;
  title: string;
  subtitle?: string;
  quizQuestion: QuizQuestion;
}

// Grammar explanations for Practice 1
export interface GrammarRule {
  english: string;
  example: string;
  translations: Record<SupportedLanguage, { rule: string; example: string }>;
}

export const grammarExplanations: GrammarRule[] = [
  {
    english: 'I am → She is / He is',
    example: 'I am Marisol. → She is Marisol.',
    translations: {
      arabic: { rule: 'أنا → هي / هو', example: 'أنا ماريسول. → هي ماريسول.' },
      bengali: { rule: 'আমি → সে (মহিলা/পুরুষ)', example: 'আমি মারিসল। → সে মারিসল।' },
      korean: { rule: '나는 → 그녀는 / 그는', example: '나는 마리솔이에요. → 그녀는 마리솔이에요.' },
      spanish: { rule: 'Yo soy → Ella es / Él es', example: 'Yo soy Marisol. → Ella es Marisol.' },
      turkish: { rule: 'Ben → O (kadın/erkek)', example: 'Ben Marisol. → O Marisol.' }
    }
  },
  {
    english: 'I have → She has / He has',
    example: 'I have a cat. → She has a cat.',
    translations: {
      arabic: { rule: 'لدي → لديها / لديه', example: 'لدي قطة. → لديها قطة.' },
      bengali: { rule: 'আমার আছে → তার আছে', example: 'আমার একটি বিড়াল আছে। → তার একটি বিড়াল আছে।' },
      korean: { rule: '나는 있어요 → 그녀는 있어요', example: '나는 고양이가 있어요. → 그녀는 고양이가 있어요.' },
      spanish: { rule: 'Yo tengo → Ella tiene', example: 'Yo tengo un gato. → Ella tiene un gato.' },
      turkish: { rule: 'Benim var → Onun var', example: 'Benim bir kedim var. → Onun bir kedisi var.' }
    }
  },
  {
    english: 'I work → She works / He works',
    example: 'I work in a hotel. → She works in a hotel.',
    translations: {
      arabic: { rule: 'أعمل → تعمل (هي) / يعمل (هو)', example: 'أعمل في فندق. → تعمل في فندق.' },
      bengali: { rule: 'আমি কাজ করি → সে কাজ করে', example: 'আমি হোটেলে কাজ করি। → সে হোটেলে কাজ করে।' },
      korean: { rule: '나는 일해요 → 그녀는 일해요', example: '나는 호텔에서 일해요. → 그녀는 호텔에서 일해요.' },
      spanish: { rule: 'Yo trabajo → Ella trabaja', example: 'Yo trabajo en un hotel. → Ella trabaja en un hotel.' },
      turkish: { rule: 'Ben çalışıyorum → O çalışıyor', example: 'Bir otelde çalışıyorum. → O bir otelde çalışıyor.' }
    }
  },
];

export const practice1Slides: VideoSlideWithQuiz[] = [
  { 
    url: '/videos/module1/m1-l3-s1.mp4', 
    title: 'Listen to Marisol', 
    subtitle: 'Listen and answer',
    quizQuestion: {
      id: 'p1-q1',
      question: 'What is her name?',
      options: ['Marisol Rivera', 'Rosa Silva'],
      correctAnswer: 0,
      translations: { arabic: 'ما اسمها؟', bengali: 'তার নাম কি?', korean: '그녀의 이름은 뭔가요?', spanish: '¿Cuál es su nombre?', turkish: 'Adı ne?' }
    }
  },
  { 
    url: '/videos/module1/m1-l3-s2.mp4', 
    title: 'Listen to Marisol', 
    subtitle: 'Listen and answer',
    quizQuestion: {
      id: 'p1-q2',
      question: 'Where is Marisol from?',
      options: ['The Dominican Republic', 'Peru'],
      correctAnswer: 1,
      translations: { arabic: 'من أين ماريسول؟', bengali: 'মারিসল কোথা থেকে?', korean: '마리솔은 어디 출신인가요?', spanish: '¿De dónde es Marisol?', turkish: 'Marisol nereli?' }
    }
  },
  { 
    url: '/videos/module1/m1-l3-s3.mp4', 
    title: 'Listen to Marisol', 
    subtitle: 'Listen and answer',
    quizQuestion: {
      id: 'p1-q3',
      question: 'How old is Marisol?',
      options: ['28 years old', '30 years old'],
      correctAnswer: 0,
      translations: { arabic: 'كم عمر ماريسول؟', bengali: 'মারিসলের বয়স কত?', korean: '마리솔은 몇 살인가요?', spanish: '¿Cuántos años tiene Marisol?', turkish: 'Marisol kaç yaşında?' }
    }
  },
  { 
    url: '/videos/module1/m1-l3-s4.mp4', 
    title: 'Listen to Marisol', 
    subtitle: 'Listen and answer',
    quizQuestion: {
      id: 'p1-q4',
      question: 'Is Marisol single or married?',
      options: ['Single', 'Married'],
      correctAnswer: 0,
      translations: { arabic: 'هل ماريسول عزباء أم متزوجة؟', bengali: 'মারিসল কি অবিবাহিত না বিবাহিত?', korean: '마리솔은 미혼인가요, 결혼했나요?', spanish: '¿Marisol es soltera o casada?', turkish: 'Marisol bekar mı evli mi?' }
    }
  },
  { 
    url: '/videos/module1/m1-l3-s5.mp4', 
    title: 'Listen to Marisol', 
    subtitle: 'Fill in the blank',
    quizQuestion: {
      id: 'p1-q5',
      question: 'Marisol ______ a cat.',
      options: ['have', 'has'],
      correctAnswer: 0,
      translations: { arabic: 'ماريسول ______ قطة.', bengali: 'মারিসল ______ একটি বিড়াল।', korean: '마리솔은 고양이가 _______.', spanish: 'Marisol ______ un gato.', turkish: 'Marisol\'un bir kedisi ______.' }
    }
  },
  { 
    url: '/videos/module1/m1-l3-s6.mp4', 
    title: 'Listen to Marisol', 
    subtitle: 'Listen and answer',
    quizQuestion: {
      id: 'p1-q6',
      question: 'What does Marisol do?',
      options: ['Cashier', 'Housekeeper'],
      correctAnswer: 0,
      translations: { arabic: 'ماذا تعمل ماريسول؟', bengali: 'মারিসল কি করে?', korean: '마리솔은 무슨 일을 하나요?', spanish: '¿Qué hace Marisol?', turkish: 'Marisol ne iş yapıyor?' }
    }
  },
  { 
    url: '/videos/module1/m1-l3-s7.mp4', 
    title: 'Listen to Marisol', 
    subtitle: 'Listen and answer',
    quizQuestion: {
      id: 'p1-q7',
      question: 'Where does Marisol work?',
      options: ['Hotel', 'Supermarket'],
      correctAnswer: 1,
      translations: { arabic: 'أين تعمل ماريسول؟', bengali: 'মারিসল কোথায় কাজ করে?', korean: '마리솔은 어디서 일하나요?', spanish: '¿Dónde trabaja Marisol?', turkish: 'Marisol nerede çalışıyor?' }
    }
  },
];

// Ahmet videos for Meet Your Neighbor lesson
export const ahmetNeighborVideos = [
  { url: '/videos/module1/ahmet-intro.mp4', title: 'Hi! I am Ahmet.', subtitle: 'Introduction', listenOnly: true },
];

// Marisol videos for Meet Your Neighbor lesson  
export const marisolNeighborVideos = [
  { url: '/videos/module1/marisol-intro.mp4', title: 'Hi! I am Marisol.', subtitle: 'Introduction', listenOnly: true },
];

// Saojin videos for Meet Your Neighbor lesson
export const saojinNeighborVideos = [
  { url: '/videos/module1/saojin-intro.mp4', title: 'Hi! I am Saojin.', subtitle: 'Introduction', listenOnly: true },
];

// Quiz interface
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  translations: Record<SupportedLanguage, string>;
}

// Quiz for Ahmet
export const ahmetQuiz: QuizQuestion[] = [
  {
    id: 'ahmet-q1',
    question: 'Where is Ahmet from?',
    options: ['Egypt', 'Turkey'],
    correctAnswer: 0,
    translations: { arabic: 'من أين أحمد؟', bengali: 'আহমেদ কোথা থেকে?', korean: '아흐메드는 어디 출신인가요?', spanish: '¿De dónde es Ahmet?', turkish: 'Ahmet nereli?' }
  },
  {
    id: 'ahmet-q2',
    question: 'What does Ahmet do?',
    options: ['Uber Driver', 'Teacher'],
    correctAnswer: 0,
    translations: { arabic: 'ماذا يعمل أحمد؟', bengali: 'আহমেদ কি করে?', korean: '아흐메드는 무슨 일을 하나요?', spanish: '¿Qué hace Ahmet?', turkish: 'Ahmet ne iş yapıyor?' }
  },
];

// Quiz for Marisol
export const marisolQuiz: QuizQuestion[] = [
  {
    id: 'marisol-q1',
    question: 'Where is Marisol from?',
    options: ['Peru', 'Mexico'],
    correctAnswer: 0,
    translations: { arabic: 'من أين ماريسول؟', bengali: 'মারিসল কোথা থেকে?', korean: '마리솔은 어디 출신인가요?', spanish: '¿De dónde es Marisol?', turkish: 'Marisol nereli?' }
  },
  {
    id: 'marisol-q2',
    question: 'What does Marisol do?',
    options: ['Cashier', 'Nurse'],
    correctAnswer: 0,
    translations: { arabic: 'ماذا تعمل ماريسول؟', bengali: 'মারিসল কি করে?', korean: '마리솔은 무슨 일을 하나요?', spanish: '¿Qué hace Marisol?', turkish: 'Marisol ne iş yapıyor?' }
  },
];

// Quiz for Saojin
export const saojinQuiz: QuizQuestion[] = [
  {
    id: 'saojin-q1',
    question: 'Where is Saojin from?',
    options: ['Korea', 'Japan'],
    correctAnswer: 0,
    translations: { arabic: 'من أين ساوجين؟', bengali: 'সাওজিন কোথা থেকে?', korean: '사오진은 어디 출신인가요?', spanish: '¿De dónde es Saojin?', turkish: 'Saojin nereli?' }
  },
  {
    id: 'saojin-q2',
    question: 'What does Saojin do?',
    options: ['Nurse', 'Doctor'],
    correctAnswer: 0,
    translations: { arabic: 'ماذا تعمل ساوجين؟', bengali: 'সাওজিন কি করে?', korean: '사오진은 무슨 일을 하나요?', spanish: '¿Qué hace Saojin?', turkish: 'Saojin ne iş yapıyor?' }
  },
];

// Let's Review Part 1 - Marisol's sentences (listening fill in the blank)
export const letsReviewPart1: ListeningFillInBlankItem[] = [
  { 
    id: 'review1-a', 
    fullSentence: 'Hi! My name is Marisol Rivera.',
    sentenceBefore: 'Hi! My name', 
    sentenceAfter: 'Marisol Rivera.', 
    correctAnswer: 'is',
    acceptedAnswers: ['is', 'IS', 'Is', 'iS', "'s", "s"],
    translations: { arabic: 'مرحبا! اسمي ماريسول ريفيرا.', bengali: 'হাই! আমার নাম মারিসোল রিভেরা।', korean: '안녕하세요! 제 이름은 마리솔 리베라입니다.', spanish: '¡Hola! Mi nombre es Marisol Rivera.', turkish: 'Merhaba! Adım Marisol Rivera.' } 
  },
  { 
    id: 'review1-b', 
    fullSentence: 'I am from Peru.',
    sentenceBefore: 'I', 
    sentenceAfter: 'from Peru.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM', "'m", "m"],
    translations: { arabic: 'أنا من بيرو.', bengali: 'আমি পেরু থেকে।', korean: '저는 페루에서 왔어요.', spanish: 'Soy de Perú.', turkish: 'Peru\'luyum.' } 
  },
  { 
    id: 'review1-c', 
    fullSentence: 'I am 28 years old.',
    sentenceBefore: 'I', 
    sentenceAfter: '28 years old.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM', "'m", "m"],
    translations: { arabic: 'عمري 28 سنة.', bengali: 'আমার বয়স 28 বছর।', korean: '저는 28살이에요.', spanish: 'Tengo 28 años.', turkish: '28 yaşındayım.' } 
  },
  { 
    id: 'review1-d', 
    fullSentence: 'I am single.',
    sentenceBefore: 'I', 
    sentenceAfter: 'single.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM', "'m", "m"],
    translations: { arabic: 'أنا أعزب.', bengali: 'আমি অবিবাহিত।', korean: '저는 미혼이에요.', spanish: 'Soy soltero/a.', turkish: 'Bekarım.' } 
  },
  { 
    id: 'review1-e', 
    fullSentence: 'I have a cat.',
    sentenceBefore: 'I', 
    sentenceAfter: 'a cat.', 
    correctAnswer: 'have',
    acceptedAnswers: ['have', 'HAVE', 'Have', 'hAVE'],
    translations: { arabic: 'لدي قطة.', bengali: 'আমার একটা বিড়াল আছে।', korean: '저는 고양이가 있어요.', spanish: 'Tengo un gato.', turkish: 'Bir kedim var.' } 
  },
  { 
    id: 'review1-f', 
    fullSentence: 'I am a cashier.',
    sentenceBefore: 'I', 
    sentenceAfter: 'a cashier.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM', "'m", "m"],
    translations: { arabic: 'أنا أمين صندوق.', bengali: 'আমি একজন ক্যাশিয়ার।', korean: '저는 계산원이에요.', spanish: 'Soy cajero/a.', turkish: 'Ben kasiyerim.' } 
  },
  { 
    id: 'review1-g', 
    fullSentence: 'I work in a supermarket.',
    sentenceBefore: 'I', 
    sentenceAfter: 'in a supermarket.', 
    correctAnswer: 'work',
    acceptedAnswers: ['work', 'WORK', 'Work', 'wORK'],
    translations: { arabic: 'أعمل في سوبرماركت.', bengali: 'আমি একটা সুপারমার্কেটে কাজ করি।', korean: '저는 슈퍼마켓에서 일해요.', spanish: 'Trabajo en un supermercado.', turkish: 'Bir süpermarkette çalışıyorum.' } 
  },
];

// Let's Review Part 2 - Rosa's sentences (listening fill in the blank)
export const letsReviewPart2: ListeningFillInBlankItem[] = [
  { 
    id: 'review2-a', 
    fullSentence: 'What is your name?',
    sentenceBefore: 'What', 
    sentenceAfter: 'your name?', 
    correctAnswer: 'is',
    acceptedAnswers: ['is', 'IS', 'Is', 'iS', "'s", "s"],
    translations: { arabic: 'ما اسمك؟', bengali: 'তোমার নাম কি?', korean: '이름이 뭐예요?', spanish: '¿Cuál es tu nombre?', turkish: 'Adın ne?' } 
  },
  { 
    id: 'review2-b', 
    fullSentence: 'My name is Rosa Silva.',
    sentenceBefore: 'My name', 
    sentenceAfter: 'Rosa Silva.', 
    correctAnswer: 'is',
    acceptedAnswers: ['is', 'IS', 'Is', 'iS', "'s", "s"],
    translations: { arabic: 'اسمي روزا سيلفا.', bengali: 'আমার নাম রোজা সিলভা।', korean: '제 이름은 로사 실바입니다.', spanish: 'Mi nombre es Rosa Silva.', turkish: 'Adım Rosa Silva.' } 
  },
  { 
    id: 'review2-c', 
    fullSentence: 'Where are you from?',
    sentenceBefore: 'Where', 
    sentenceAfter: 'you from?', 
    correctAnswer: 'are',
    acceptedAnswers: ['are', 'ARE', 'Are', 'aRE'],
    translations: { arabic: 'من أين أنت؟', bengali: 'তুমি কোথা থেকে?', korean: '어디에서 왔어요?', spanish: '¿De dónde eres?', turkish: 'Nerelisin?' } 
  },
  { 
    id: 'review2-d', 
    fullSentence: 'I am from the Dominican Republic.',
    sentenceBefore: 'I', 
    sentenceAfter: 'from the Dominican Republic.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM', "'m", "m"],
    translations: { arabic: 'أنا من جمهورية الدومينيكان.', bengali: 'আমি ডোমিনিকান প্রজাতন্ত্র থেকে।', korean: '저는 도미니카 공화국에서 왔어요.', spanish: 'Soy de la República Dominicana.', turkish: 'Dominik Cumhuriyeti\'ndenim.' } 
  },
  { 
    id: 'review2-e', 
    fullSentence: 'How old are you?',
    sentenceBefore: 'How old', 
    sentenceAfter: 'you?', 
    correctAnswer: 'are',
    acceptedAnswers: ['are', 'ARE', 'Are', 'aRE'],
    translations: { arabic: 'كم عمرك؟', bengali: 'তোমার বয়স কত?', korean: '몇 살이에요?', spanish: '¿Cuántos años tienes?', turkish: 'Kaç yaşındasın?' } 
  },
  { 
    id: 'review2-f', 
    fullSentence: 'I am 30 years old.',
    sentenceBefore: 'I', 
    sentenceAfter: '30 years old.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM', "'m", "m"],
    translations: { arabic: 'عمري 30 سنة.', bengali: 'আমার বয়স 30 বছর।', korean: '저는 30살이에요.', spanish: 'Tengo 30 años.', turkish: '30 yaşındayım.' } 
  },
  { 
    id: 'review2-g', 
    fullSentence: 'Are you married or single?',
    sentenceBefore: '', 
    sentenceAfter: 'you married or single?', 
    correctAnswer: 'Are',
    acceptedAnswers: ['Are', 'are', 'ARE', 'aRE'],
    translations: { arabic: 'هل أنت متزوج أم أعزب؟', bengali: 'তুমি কি বিবাহিত না অবিবাহিত?', korean: '결혼했어요, 아니면 미혼이에요?', spanish: '¿Estás casado/a o soltero/a?', turkish: 'Evli misin bekar mı?' } 
  },
  { 
    id: 'review2-h', 
    fullSentence: 'I am married.',
    sentenceBefore: 'I', 
    sentenceAfter: 'married.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM', "'m", "m"],
    translations: { arabic: 'أنا متزوج.', bengali: 'আমি বিবাহিত।', korean: '저는 기혼이에요.', spanish: 'Estoy casado/a.', turkish: 'Evliyim.' } 
  },
  { 
    id: 'review2-i', 
    fullSentence: 'Do you have children?',
    sentenceBefore: '', 
    sentenceAfter: 'you have children?', 
    correctAnswer: 'Do',
    acceptedAnswers: ['Do', 'do', 'DO'],
    translations: { arabic: 'هل لديك أطفال؟', bengali: 'তোমার কি বাচ্চা আছে?', korean: '아이가 있으세요?', spanish: '¿Tienes hijos?', turkish: 'Çocuğun var mı?' } 
  },
  { 
    id: 'review2-j', 
    fullSentence: "No, I don't.",
    sentenceBefore: "No, I", 
    sentenceAfter: '.', 
    correctAnswer: "don't",
    acceptedAnswers: ["don't", "do not", "DON'T", "Don't", "DO NOT"],
    translations: { arabic: 'لا، ليس لدي.', bengali: 'না, আমার নেই।', korean: '아니요, 없어요.', spanish: 'No, no tengo.', turkish: 'Hayır, yok.' } 
  },
  { 
    id: 'review2-k', 
    fullSentence: 'What do you do?',
    sentenceBefore: 'What', 
    sentenceAfter: 'you do?', 
    correctAnswer: 'do',
    acceptedAnswers: ['do', 'DO', 'Do'],
    translations: { arabic: 'ماذا تعمل؟', bengali: 'তুমি কি কর?', korean: '무슨 일을 해요?', spanish: '¿Qué haces?', turkish: 'Ne iş yapıyorsun?' } 
  },
  { 
    id: 'review2-l', 
    fullSentence: 'I am a housekeeper.',
    sentenceBefore: 'I', 
    sentenceAfter: 'a housekeeper.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM', "'m", "m"],
    translations: { arabic: 'أنا عاملة نظافة.', bengali: 'আমি একজন গৃহপরিচারিকা।', korean: '저는 가정부예요.', spanish: 'Soy ama de llaves.', turkish: 'Ben temizlikçiyim.' } 
  },
  { 
    id: 'review2-m', 
    fullSentence: 'Where do you work?',
    sentenceBefore: 'Where', 
    sentenceAfter: 'you work?', 
    correctAnswer: 'do',
    acceptedAnswers: ['do', 'DO', 'Do'],
    translations: { arabic: 'أين تعمل؟', bengali: 'তুমি কোথায় কাজ কর?', korean: '어디서 일해요?', spanish: '¿Dónde trabajas?', turkish: 'Nerede çalışıyorsun?' } 
  },
  { 
    id: 'review2-n', 
    fullSentence: 'I work in a hotel.',
    sentenceBefore: 'I', 
    sentenceAfter: 'in a hotel.', 
    correctAnswer: 'work',
    acceptedAnswers: ['work', 'WORK', 'Work'],
    translations: { arabic: 'أعمل في فندق.', bengali: 'আমি একটা হোটেলে কাজ করি।', korean: '저는 호텔에서 일해요.', spanish: 'Trabajo en un hotel.', turkish: 'Bir otelde çalışıyorum.' } 
  },
];

// Module 1 Lessons - Restructured
export const module1Lessons: Lesson[] = [
  // 1. Vocabulary Part 1 - Basic intro words
  {
    id: 'lesson-1',
    title: 'Vocabulary Part 1',
    description: 'Learn basic introduction words',
    type: 'vocabulary',
    content: vocabulary1,
    isCompleted: false,
    duration: '8 min',
  },
  // 2. My Name is Marisol - Video series with pronunciation
  {
    id: 'lesson-2',
    title: 'My Name is Marisol',
    description: 'Watch and repeat with Marisol',
    type: 'video-series',
    videos: marisolVideos,
    isCompleted: false,
    duration: '10 min',
  },
  // 3. Vocabulary Part 2 - Neighborhood words
  {
    id: 'lesson-3',
    title: 'Vocabulary Part 2',
    description: 'Learn neighborhood words',
    type: 'vocabulary',
    content: vocabulary2,
    isCompleted: false,
    duration: '8 min',
  },
  // 4. Questions - Learn to ask questions
  {
    id: 'lesson-4',
    title: 'Questions',
    description: 'Learn questions to ask people',
    type: 'vocabulary',
    content: questionsVocabulary,
    isCompleted: false,
    duration: '8 min',
  },
  // 5. Numbers 0-10 (matching exercise)
  {
    id: 'lesson-5',
    title: 'Numbers 0-10',
    description: 'Match numbers with their written forms',
    type: 'numbers-matching',
    content: numbers0to10,
    isCompleted: false,
    duration: '8 min',
  },
  // 6. Numbers 11-20 (matching exercise)
  {
    id: 'lesson-6',
    title: 'Numbers 11-20',
    description: 'Match numbers with their written forms',
    type: 'numbers-matching',
    content: numbers11to20,
    isCompleted: false,
    duration: '8 min',
  },
  // 7. Meet Rosa - Video series with pronunciation (M1 L2 S1-S8)
  {
    id: 'lesson-7',
    title: 'Meet Rosa',
    description: 'Watch and repeat with Rosa',
    type: 'video-series',
    videos: rosaVideos,
    isCompleted: false,
    duration: '12 min',
  },
  // 8. Practice 1 - Listen and Quiz (no voice recording)
  {
    id: 'lesson-8',
    title: 'Practice 1',
    description: 'Listen to Marisol and answer the questions',
    type: 'practice-quiz',
    practiceQuizSlides: practice1Slides,
    isCompleted: false,
    duration: '10 min',
  },
  // 9. Meet Your Neighbor: Ahmet El-Masri
  {
    id: 'lesson-9',
    title: 'Meet Your Neighbor: Ahmet El-Masri',
    description: 'Watch and repeat with Ahmet',
    type: 'video-series',
    videos: ahmetNeighborVideos,
    quizQuestions: ahmetQuiz,
    isCompleted: false,
    duration: '8 min',
  },
  // 10. Meet Your Neighbor: Marisol Rivera
  {
    id: 'lesson-10',
    title: 'Meet Your Neighbor: Marisol Rivera',
    description: 'Watch and repeat with Marisol',
    type: 'video-series',
    videos: marisolNeighborVideos,
    quizQuestions: marisolQuiz,
    isCompleted: false,
    duration: '8 min',
  },
  // 11. Meet Your Neighbor: Saojin Lee
  {
    id: 'lesson-11',
    title: 'Meet Your Neighbor: Saojin Lee',
    description: 'Watch and repeat with Saojin',
    type: 'video-series',
    videos: saojinNeighborVideos,
    quizQuestions: saojinQuiz,
    isCompleted: false,
    duration: '8 min',
  },
  // 12. Let's Review Part 1 - Listening fill in the blank
  {
    id: 'lesson-12',
    title: "Let's Review Part 1",
    description: 'Listen and fill in the blanks (Marisol)',
    type: 'listening-fill-in-blank',
    listeningFillInBlankItems: letsReviewPart1,
    isCompleted: false,
    duration: '10 min',
  },
  // 13. Let's Review Part 2 - Listening fill in the blank
  {
    id: 'lesson-13',
    title: "Let's Review Part 2",
    description: 'Listen and fill in the blanks (Rosa)',
    type: 'listening-fill-in-blank',
    listeningFillInBlankItems: letsReviewPart2,
    isCompleted: false,
    duration: '12 min',
  },
];
