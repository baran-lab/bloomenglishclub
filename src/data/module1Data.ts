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
  type: 'video' | 'vocabulary' | 'practice' | 'speaking' | 'review' | 'video-series' | 'sentences' | 'numbers-practice' | 'listening-writing' | 'fill-in-blank' | 'smart-practice' | 'interactive-form' | 'listening-fill-in-blank';
  videoUrl?: string;
  videos?: { url: string; title: string; subtitle?: string }[];
  content?: VocabularyItem[];
  phrases?: PhraseItem[];
  sentences?: SentenceItem[];
  questions?: QuestionItem[];
  smartQuestions?: SmartQuestion[];
  fillInBlankItems?: FillInBlankItem[];
  listeningFillInBlankItems?: ListeningFillInBlankItem[];
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

// Jobs and Workplaces Vocabulary
export const jobsVocabulary: VocabularyItem[] = [
  { id: 'job-construction-worker', english: 'construction worker', pronunciation: 'kon-STRUK-shun WER-ker', translations: { arabic: 'عامل بناء', bengali: 'নির্মাণ শ্রমিক', korean: '건설 노동자', spanish: 'trabajador de construcción', turkish: 'inşaat işçisi' } },
  { id: 'job-construction-site', english: 'construction site', pronunciation: 'kon-STRUK-shun sahyt', translations: { arabic: 'موقع بناء', bengali: 'নির্মাণ সাইট', korean: '건설 현장', spanish: 'sitio de construcción', turkish: 'inşaat alanı' } },
  { id: 'job-building', english: 'building', pronunciation: 'BIL-ding', translations: { arabic: 'مبنى', bengali: 'বিল্ডিং', korean: '건물', spanish: 'edificio', turkish: 'bina' } },
  { id: 'job-house', english: 'house', pronunciation: 'haus', translations: { arabic: 'منزل', bengali: 'বাড়ি', korean: '집', spanish: 'casa', turkish: 'ev' } },
  { id: 'job-cook', english: 'cook', pronunciation: 'kuk', translations: { arabic: 'طباخ', bengali: 'রাঁধুনি', korean: '요리사', spanish: 'cocinero/a', turkish: 'aşçı' } },
  { id: 'job-restaurant', english: 'restaurant', pronunciation: 'RES-tuh-rahnt', translations: { arabic: 'مطعم', bengali: 'রেস্তোরাঁ', korean: '식당', spanish: 'restaurante', turkish: 'restoran' } },
  { id: 'job-driver', english: 'driver', pronunciation: 'DRAHYV-er', translations: { arabic: 'سائق', bengali: 'চালক', korean: '운전사', spanish: 'conductor', turkish: 'sürücü' } },
  { id: 'job-car', english: 'car', pronunciation: 'kar', translations: { arabic: 'سيارة', bengali: 'গাড়ি', korean: '자동차', spanish: 'carro/coche', turkish: 'araba' } },
  { id: 'job-bus', english: 'bus', pronunciation: 'bus', translations: { arabic: 'حافلة', bengali: 'বাস', korean: '버스', spanish: 'autobús', turkish: 'otobüs' } },
  { id: 'job-delivery-driver', english: 'delivery driver', pronunciation: 'di-LIV-uh-ree DRAHYV-er', translations: { arabic: 'سائق توصيل', bengali: 'ডেলিভারি ড্রাইভার', korean: '배달 기사', spanish: 'repartidor', turkish: 'kurye' } },
  { id: 'job-electrician', english: 'electrician', pronunciation: 'i-lek-TRISH-un', translations: { arabic: 'كهربائي', bengali: 'ইলেকট্রিশিয়ান', korean: '전기 기사', spanish: 'electricista', turkish: 'elektrikçi' } },
  { id: 'job-home-health-aide', english: 'home health aide', pronunciation: 'hohm helth ayd', translations: { arabic: 'مساعد صحي منزلي', bengali: 'হোম হেলথ এইড', korean: '가정 간병인', spanish: 'asistente de salud en el hogar', turkish: 'evde bakım yardımcısı' } },
  { id: 'job-nurse', english: 'nurse', pronunciation: 'ners', translations: { arabic: 'ممرض/ممرضة', bengali: 'নার্স', korean: '간호사', spanish: 'enfermero/a', turkish: 'hemşire' } },
  { id: 'job-hospital', english: 'hospital', pronunciation: 'HOS-pi-tul', translations: { arabic: 'مستشفى', bengali: 'হাসপাতাল', korean: '병원', spanish: 'hospital', turkish: 'hastane' } },
  { id: 'job-urgent-care', english: 'urgent care', pronunciation: 'UR-jent ker', translations: { arabic: 'رعاية عاجلة', bengali: 'জরুরি যত্ন', korean: '응급 진료소', spanish: 'atención de urgencia', turkish: 'acil bakım' } },
  { id: 'job-pharmacist', english: 'pharmacist', pronunciation: 'FAR-muh-sist', translations: { arabic: 'صيدلي', bengali: 'ফার্মাসিস্ট', korean: '약사', spanish: 'farmacéutico/a', turkish: 'eczacı' } },
  { id: 'job-pharmacist-assistant', english: 'pharmacist assistant', pronunciation: 'FAR-muh-sist uh-SIS-tunt', translations: { arabic: 'مساعد صيدلي', bengali: 'ফার্মাসিস্ট সহকারী', korean: '약사 보조', spanish: 'asistente de farmacéutico', turkish: 'eczacı asistanı' } },
  { id: 'job-pharmacy', english: 'pharmacy', pronunciation: 'FAR-muh-see', translations: { arabic: 'صيدلية', bengali: 'ফার্মেসি', korean: '약국', spanish: 'farmacia', turkish: 'eczane' } },
];

// Jobs and Workplaces Sentences
export const jobsSentences: SentenceItem[] = [
  { id: 'sent-1', english: 'I am a construction worker. I work at a construction site.', pronunciation: 'ai am uh kon-STRUK-shun WER-ker. ai werk at uh kon-STRUK-shun sahyt.', translations: { arabic: 'أنا عامل بناء. أعمل في موقع بناء.', bengali: 'আমি একজন নির্মাণ শ্রমিক। আমি একটি নির্মাণ সাইটে কাজ করি।', korean: '저는 건설 노동자입니다. 저는 건설 현장에서 일합니다.', spanish: 'Soy trabajador de construcción. Trabajo en un sitio de construcción.', turkish: 'Ben bir inşaat işçisiyim. Bir inşaat alanında çalışıyorum.' } },
  { id: 'sent-2', english: 'I am a cook. I work in a restaurant.', pronunciation: 'ai am uh kuk. ai werk in uh RES-tuh-rahnt.', translations: { arabic: 'أنا طباخ. أعمل في مطعم.', bengali: 'আমি একজন রাঁধুনি। আমি একটি রেস্তোরাঁয় কাজ করি।', korean: '저는 요리사입니다. 저는 식당에서 일합니다.', spanish: 'Soy cocinero/a. Trabajo en un restaurante.', turkish: 'Ben bir aşçıyım. Bir restoranda çalışıyorum.' } },
  { id: 'sent-3', english: 'I am a driver. I drive a bus.', pronunciation: 'ai am uh DRAHYV-er. ai drahyv uh bus.', translations: { arabic: 'أنا سائق. أقود حافلة.', bengali: 'আমি একজন চালক। আমি বাস চালাই।', korean: '저는 운전사입니다. 저는 버스를 운전합니다.', spanish: 'Soy conductor. Manejo un autobús.', turkish: 'Ben bir sürücüyüm. Otobüs sürerim.' } },
  { id: 'sent-4', english: 'I am a delivery driver. I work for Amazon.', pronunciation: 'ai am uh di-LIV-uh-ree DRAHYV-er. ai werk for AM-uh-zon.', translations: { arabic: 'أنا سائق توصيل. أعمل لدى أمازون.', bengali: 'আমি একজন ডেলিভারি ড্রাইভার। আমি আমাজনের জন্য কাজ করি।', korean: '저는 배달 기사입니다. 저는 아마존에서 일합니다.', spanish: 'Soy repartidor. Trabajo para Amazon.', turkish: 'Ben bir kuryeyim. Amazon için çalışıyorum.' } },
  { id: 'sent-5', english: 'I am an electrician. I fix lights in buildings.', pronunciation: 'ai am an i-lek-TRISH-un. ai fiks lahyts in BIL-dings.', translations: { arabic: 'أنا كهربائي. أصلح الأضواء في المباني.', bengali: 'আমি একজন ইলেকট্রিশিয়ান। আমি বিল্ডিংগুলিতে লাইট ঠিক করি।', korean: '저는 전기 기사입니다. 저는 건물의 조명을 고칩니다.', spanish: 'Soy electricista. Arreglo las luces en los edificios.', turkish: 'Ben bir elektrikçiyim. Binalardaki lambaları tamir ederim.' } },
  { id: 'sent-6', english: 'I am a home health aide. I help the elderly.', pronunciation: 'ai am uh hohm helth ayd. ai help thee EL-der-lee.', translations: { arabic: 'أنا مساعد صحي منزلي. أساعد كبار السن.', bengali: 'আমি একজন হোম হেলথ এইড। আমি বয়স্কদের সাহায্য করি।', korean: '저는 가정 간병인입니다. 저는 노인분들을 돕습니다.', spanish: 'Soy asistente de salud en el hogar. Ayudo a los ancianos.', turkish: 'Ben bir evde bakım yardımcısıyım. Yaşlılara yardım ederim.' } },
  { id: 'sent-7', english: 'I am a nurse. I work in a hospital.', pronunciation: 'ai am uh ners. ai werk in uh HOS-pi-tul.', translations: { arabic: 'أنا ممرض/ممرضة. أعمل في مستشفى.', bengali: 'আমি একজন নার্স। আমি একটি হাসপাতালে কাজ করি।', korean: '저는 간호사입니다. 저는 병원에서 일합니다.', spanish: 'Soy enfermero/a. Trabajo en un hospital.', turkish: 'Ben bir hemşireyim. Bir hastanede çalışıyorum.' } },
  { id: 'sent-8', english: 'I am a pharmacist. I work in a pharmacy.', pronunciation: 'ai am uh FAR-muh-sist. ai werk in uh FAR-muh-see.', translations: { arabic: 'أنا صيدلي. أعمل في صيدلية.', bengali: 'আমি একজন ফার্মাসিস্ট। আমি একটি ফার্মেসিতে কাজ করি।', korean: '저는 약사입니다. 저는 약국에서 일합니다.', spanish: 'Soy farmacéutico/a. Trabajo en una farmacia.', turkish: 'Ben bir eczacıyım. Bir eczanede çalışıyorum.' } },
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
    context: "Asking someone's name",
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
    context: "Asking about someone's wellbeing",
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
      turkish: "Ben...'danım / ...'lıyım",
    },
    context: 'Saying where you are from',
  },
];

// Numbers 0-30
export const numbers0to30: VocabularyItem[] = [
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
  { id: 'num-21', english: 'twenty-one', pronunciation: 'TWEN-tee-wun', translations: { arabic: 'واحد وعشرون', bengali: 'একুশ', korean: '이십일', spanish: 'veintiuno', turkish: 'yirmi bir' } },
  { id: 'num-22', english: 'twenty-two', pronunciation: 'TWEN-tee-too', translations: { arabic: 'اثنان وعشرون', bengali: 'বাইশ', korean: '이십이', spanish: 'veintidós', turkish: 'yirmi iki' } },
  { id: 'num-23', english: 'twenty-three', pronunciation: 'TWEN-tee-three', translations: { arabic: 'ثلاثة وعشرون', bengali: 'তেইশ', korean: '이십삼', spanish: 'veintitrés', turkish: 'yirmi üç' } },
  { id: 'num-24', english: 'twenty-four', pronunciation: 'TWEN-tee-for', translations: { arabic: 'أربعة وعشرون', bengali: 'চব্বিশ', korean: '이십사', spanish: 'veinticuatro', turkish: 'yirmi dört' } },
  { id: 'num-25', english: 'twenty-five', pronunciation: 'TWEN-tee-fahyv', translations: { arabic: 'خمسة وعشرون', bengali: 'পঁচিশ', korean: '이십오', spanish: 'veinticinco', turkish: 'yirmi beş' } },
  { id: 'num-26', english: 'twenty-six', pronunciation: 'TWEN-tee-siks', translations: { arabic: 'ستة وعشرون', bengali: 'ছাব্বিশ', korean: '이십육', spanish: 'veintiséis', turkish: 'yirmi altı' } },
  { id: 'num-27', english: 'twenty-seven', pronunciation: 'TWEN-tee-SEV-en', translations: { arabic: 'سبعة وعشرون', bengali: 'সাতাশ', korean: '이십칠', spanish: 'veintisiete', turkish: 'yirmi yedi' } },
  { id: 'num-28', english: 'twenty-eight', pronunciation: 'TWEN-tee-ayt', translations: { arabic: 'ثمانية وعشرون', bengali: 'আটাশ', korean: '이십팔', spanish: 'veintiocho', turkish: 'yirmi sekiz' } },
  { id: 'num-29', english: 'twenty-nine', pronunciation: 'TWEN-tee-nahyn', translations: { arabic: 'تسعة وعشرون', bengali: 'উনত্রিশ', korean: '이십구', spanish: 'veintinueve', turkish: 'yirmi dokuz' } },
  { id: 'num-30', english: 'thirty', pronunciation: 'THER-tee', translations: { arabic: 'ثلاثون', bengali: 'ত্রিশ', korean: '삼십', spanish: 'treinta', turkish: 'otuz' } },
];

// Numbers 31-60
export const numbers31to60: VocabularyItem[] = [
  { id: 'num-31', english: 'thirty-one', pronunciation: 'THER-tee-wun', translations: { arabic: 'واحد وثلاثون', bengali: 'একত্রিশ', korean: '삼십일', spanish: 'treinta y uno', turkish: 'otuz bir' } },
  { id: 'num-32', english: 'thirty-two', pronunciation: 'THER-tee-too', translations: { arabic: 'اثنان وثلاثون', bengali: 'বত্রিশ', korean: '삼십이', spanish: 'treinta y dos', turkish: 'otuz iki' } },
  { id: 'num-33', english: 'thirty-three', pronunciation: 'THER-tee-three', translations: { arabic: 'ثلاثة وثلاثون', bengali: 'তেত্রিশ', korean: '삼십삼', spanish: 'treinta y tres', turkish: 'otuz üç' } },
  { id: 'num-34', english: 'thirty-four', pronunciation: 'THER-tee-for', translations: { arabic: 'أربعة وثلاثون', bengali: 'চৌত্রিশ', korean: '삼십사', spanish: 'treinta y cuatro', turkish: 'otuz dört' } },
  { id: 'num-35', english: 'thirty-five', pronunciation: 'THER-tee-fahyv', translations: { arabic: 'خمسة وثلاثون', bengali: 'পঁয়ত্রিশ', korean: '삼십오', spanish: 'treinta y cinco', turkish: 'otuz beş' } },
  { id: 'num-36', english: 'thirty-six', pronunciation: 'THER-tee-siks', translations: { arabic: 'ستة وثلاثون', bengali: 'ছত্রিশ', korean: '삼십육', spanish: 'treinta y seis', turkish: 'otuz altı' } },
  { id: 'num-37', english: 'thirty-seven', pronunciation: 'THER-tee-SEV-en', translations: { arabic: 'سبعة وثلاثون', bengali: 'সাঁইত্রিশ', korean: '삼십칠', spanish: 'treinta y siete', turkish: 'otuz yedi' } },
  { id: 'num-38', english: 'thirty-eight', pronunciation: 'THER-tee-ayt', translations: { arabic: 'ثمانية وثلاثون', bengali: 'আটত্রিশ', korean: '삼십팔', spanish: 'treinta y ocho', turkish: 'otuz sekiz' } },
  { id: 'num-39', english: 'thirty-nine', pronunciation: 'THER-tee-nahyn', translations: { arabic: 'تسعة وثلاثون', bengali: 'উনচল্লিশ', korean: '삼십구', spanish: 'treinta y nueve', turkish: 'otuz dokuz' } },
  { id: 'num-40', english: 'forty', pronunciation: 'FOR-tee', translations: { arabic: 'أربعون', bengali: 'চল্লিশ', korean: '사십', spanish: 'cuarenta', turkish: 'kırk' } },
  { id: 'num-41', english: 'forty-one', pronunciation: 'FOR-tee-wun', translations: { arabic: 'واحد وأربعون', bengali: 'একচল্লিশ', korean: '사십일', spanish: 'cuarenta y uno', turkish: 'kırk bir' } },
  { id: 'num-42', english: 'forty-two', pronunciation: 'FOR-tee-too', translations: { arabic: 'اثنان وأربعون', bengali: 'বিয়াল্লিশ', korean: '사십이', spanish: 'cuarenta y dos', turkish: 'kırk iki' } },
  { id: 'num-43', english: 'forty-three', pronunciation: 'FOR-tee-three', translations: { arabic: 'ثلاثة وأربعون', bengali: 'তেতাল্লিশ', korean: '사십삼', spanish: 'cuarenta y tres', turkish: 'kırk üç' } },
  { id: 'num-44', english: 'forty-four', pronunciation: 'FOR-tee-for', translations: { arabic: 'أربعة وأربعون', bengali: 'চুয়াল্লিশ', korean: '사십사', spanish: 'cuarenta y cuatro', turkish: 'kırk dört' } },
  { id: 'num-45', english: 'forty-five', pronunciation: 'FOR-tee-fahyv', translations: { arabic: 'خمسة وأربعون', bengali: 'পঁয়তাল্লিশ', korean: '사십오', spanish: 'cuarenta y cinco', turkish: 'kırk beş' } },
  { id: 'num-46', english: 'forty-six', pronunciation: 'FOR-tee-siks', translations: { arabic: 'ستة وأربعون', bengali: 'ছেচল্লিশ', korean: '사십육', spanish: 'cuarenta y seis', turkish: 'kırk altı' } },
  { id: 'num-47', english: 'forty-seven', pronunciation: 'FOR-tee-SEV-en', translations: { arabic: 'سبعة وأربعون', bengali: 'সাতচল্লিশ', korean: '사십칠', spanish: 'cuarenta y siete', turkish: 'kırk yedi' } },
  { id: 'num-48', english: 'forty-eight', pronunciation: 'FOR-tee-ayt', translations: { arabic: 'ثمانية وأربعون', bengali: 'আটচল্লিশ', korean: '사십팔', spanish: 'cuarenta y ocho', turkish: 'kırk sekiz' } },
  { id: 'num-49', english: 'forty-nine', pronunciation: 'FOR-tee-nahyn', translations: { arabic: 'تسعة وأربعون', bengali: 'উনপঞ্চাশ', korean: '사십구', spanish: 'cuarenta y nueve', turkish: 'kırk dokuz' } },
  { id: 'num-50', english: 'fifty', pronunciation: 'FIF-tee', translations: { arabic: 'خمسون', bengali: 'পঞ্চাশ', korean: '오십', spanish: 'cincuenta', turkish: 'elli' } },
  { id: 'num-51', english: 'fifty-one', pronunciation: 'FIF-tee-wun', translations: { arabic: 'واحد وخمسون', bengali: 'একান্ন', korean: '오십일', spanish: 'cincuenta y uno', turkish: 'elli bir' } },
  { id: 'num-52', english: 'fifty-two', pronunciation: 'FIF-tee-too', translations: { arabic: 'اثنان وخمسون', bengali: 'বায়ান্ন', korean: '오십이', spanish: 'cincuenta y dos', turkish: 'elli iki' } },
  { id: 'num-53', english: 'fifty-three', pronunciation: 'FIF-tee-three', translations: { arabic: 'ثلاثة وخمسون', bengali: 'তিপ্পান্ন', korean: '오십삼', spanish: 'cincuenta y tres', turkish: 'elli üç' } },
  { id: 'num-54', english: 'fifty-four', pronunciation: 'FIF-tee-for', translations: { arabic: 'أربعة وخمسون', bengali: 'চুয়ান্ন', korean: '오십사', spanish: 'cincuenta y cuatro', turkish: 'elli dört' } },
  { id: 'num-55', english: 'fifty-five', pronunciation: 'FIF-tee-fahyv', translations: { arabic: 'خمسة وخمسون', bengali: 'পঞ্চান্ন', korean: '오십오', spanish: 'cincuenta y cinco', turkish: 'elli beş' } },
  { id: 'num-56', english: 'fifty-six', pronunciation: 'FIF-tee-siks', translations: { arabic: 'ستة وخمسون', bengali: 'ছাপ্পান্ন', korean: '오십육', spanish: 'cincuenta y seis', turkish: 'elli altı' } },
  { id: 'num-57', english: 'fifty-seven', pronunciation: 'FIF-tee-SEV-en', translations: { arabic: 'سبعة وخمسون', bengali: 'সাতান্ন', korean: '오십칠', spanish: 'cincuenta y siete', turkish: 'elli yedi' } },
  { id: 'num-58', english: 'fifty-eight', pronunciation: 'FIF-tee-ayt', translations: { arabic: 'ثمانية وخمسون', bengali: 'আটান্ন', korean: '오십팔', spanish: 'cincuenta y ocho', turkish: 'elli sekiz' } },
  { id: 'num-59', english: 'fifty-nine', pronunciation: 'FIF-tee-nahyn', translations: { arabic: 'تسعة وخمسون', bengali: 'ঊনষাট', korean: '오십구', spanish: 'cincuenta y nueve', turkish: 'elli dokuz' } },
  { id: 'num-60', english: 'sixty', pronunciation: 'SIK-stee', translations: { arabic: 'ستون', bengali: 'ষাট', korean: '육십', spanish: 'sesenta', turkish: 'altmış' } },
];

// Marisol Introduction Video Series (using new uploaded videos)
export const marisolVideos = [
  { url: '/videos/module1/m1-l1-s1.mp4', title: 'My name is Marisol Rivera.', subtitle: 'Introduction' },
  { url: '/videos/module1/m1-l1-s2.mp4', title: 'I am from Peru.', subtitle: 'Country of origin' },
  { url: '/videos/module1/m1-l1-s3.mp4', title: 'I am 28 years old.', subtitle: 'Age' },
  { url: '/videos/module1/m1-l1-s4.mp4', title: 'I am single.', subtitle: 'Marital status' },
  { url: '/videos/module1/m1-l1-s5.mp4', title: 'I am a cashier.', subtitle: 'Occupation' },
  { url: '/videos/module1/m1-l1-s6.mp4', title: 'I work in a supermarket.', subtitle: 'Workplace' },
  { url: '/videos/module1/m1-l1-s7.mp4', title: 'Nice to meet you!', subtitle: 'Greeting' },
];

// Rosa Introduction Video Series - "What is your name?"
export const rosaVideos = [
  { url: '/videos/module1/m1-l2-s1.mp4', title: 'Hello! What is your name?', subtitle: 'Greeting' },
  { url: '/videos/module1/m1-l2-s2.mp4', title: 'My name is Rosa Silva.', subtitle: 'Name' },
  { url: '/videos/module1/m1-l2-s3.mp4', title: 'I am from the Dominican Republic.', subtitle: 'Country' },
];

// Marisol Listening + Fill-in-Blank Exercise
export const marisolListeningFillInBlank: ListeningFillInBlankItem[] = [
  { 
    id: 'mlfib-1', 
    fullSentence: 'My name is Marisol Rivera.',
    sentenceBefore: 'My name', 
    sentenceAfter: 'Marisol Rivera.', 
    correctAnswer: 'is',
    acceptedAnswers: ['is', 'IS', 'Is', 'iS'],
    translations: { arabic: 'اسمي ماريسول ريفيرا.', bengali: 'আমার নাম মারিসোল রিভেরা।', korean: '제 이름은 마리솔 리베라입니다.', spanish: 'Mi nombre es Marisol Rivera.', turkish: 'Adım Marisol Rivera.' } 
  },
  { 
    id: 'mlfib-2', 
    fullSentence: 'I am from Peru.',
    sentenceBefore: 'I', 
    sentenceAfter: 'from Peru.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM'],
    translations: { arabic: 'أنا من بيرو.', bengali: 'আমি পেরু থেকে।', korean: '저는 페루에서 왔어요.', spanish: 'Soy de Perú.', turkish: 'Peru\'luyum.' } 
  },
  { 
    id: 'mlfib-3', 
    fullSentence: 'I am 28 years old.',
    sentenceBefore: 'I', 
    sentenceAfter: '28 years old.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM'],
    translations: { arabic: 'عمري 28 سنة.', bengali: 'আমার বয়স 28 বছর।', korean: '저는 28살이에요.', spanish: 'Tengo 28 años.', turkish: '28 yaşındayım.' } 
  },
  { 
    id: 'mlfib-4', 
    fullSentence: 'I am single.',
    sentenceBefore: 'I', 
    sentenceAfter: 'single.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM'],
    translations: { arabic: 'أنا أعزب.', bengali: 'আমি অবিবাহিত।', korean: '저는 미혼이에요.', spanish: 'Soy soltero/a.', turkish: 'Bekarım.' } 
  },
  { 
    id: 'mlfib-5', 
    fullSentence: 'I am a cashier.',
    sentenceBefore: 'I', 
    sentenceAfter: 'a cashier.', 
    correctAnswer: 'am',
    acceptedAnswers: ['am', 'AM', 'Am', 'aM'],
    translations: { arabic: 'أنا أمين صندوق.', bengali: 'আমি একজন ক্যাশিয়ার।', korean: '저는 계산원이에요.', spanish: 'Soy cajero/a.', turkish: 'Ben kasiyerim.' } 
  },
  { 
    id: 'mlfib-6', 
    fullSentence: 'I work in a supermarket.',
    sentenceBefore: 'I', 
    sentenceAfter: 'in a supermarket.', 
    correctAnswer: 'work',
    acceptedAnswers: ['work', 'Work', 'WORK'],
    translations: { arabic: 'أعمل في سوبرماركت.', bengali: 'আমি একটা সুপারমার্কেটে কাজ করি।', korean: '저는 슈퍼마켓에서 일해요.', spanish: 'Trabajo en un supermercado.', turkish: 'Bir süpermarkette çalışıyorum.' } 
  },
];

// Numbers 0-20
export const numbers0to20 = numbers0to30.slice(0, 21);

// Numbers 21-40  
export const numbers21to40 = [...numbers0to30.slice(21), ...numbers31to60.slice(0, 10)];

// Numbers 41-60
export const numbers41to60 = numbers31to60.slice(10);

// Smart Practice Questions for Part 2
export const smartPracticeQuestions: SmartQuestion[] = [
  { 
    id: 'sq1', 
    question: "What's your name?", 
    translations: { arabic: 'ما اسمك؟', bengali: 'তোমার নাম কি?', korean: '이름이 뭐예요?', spanish: '¿Cómo te llamas?', turkish: 'Adın ne?' },
    validationPattern: 'name',
    acceptedPrefixes: ['My name is', "My name's", 'I am', "I'm"]
  },
  { 
    id: 'sq2', 
    question: 'Where are you from?', 
    translations: { arabic: 'من أين أنت؟', bengali: 'তুমি কোথা থেকে?', korean: '어디에서 왔어요?', spanish: '¿De dónde eres?', turkish: 'Nerelisin?' },
    validationPattern: 'country',
    acceptedPrefixes: ['I am from', "I'm from"]
  },
  { 
    id: 'sq3', 
    question: 'How old are you?', 
    translations: { arabic: 'كم عمرك؟', bengali: 'তোমার বয়স কত?', korean: '몇 살이에요?', spanish: '¿Cuántos años tienes?', turkish: 'Kaç yaşındasın?' },
    validationPattern: 'age',
    acceptedPrefixes: ['I am', "I'm"]
  },
  { 
    id: 'sq4', 
    question: 'Are you married or single?', 
    translations: { arabic: 'هل أنت متزوج أم أعزب؟', bengali: 'তুমি কি বিবাহিত না অবিবাহিত?', korean: '결혼했어요, 아니면 미혼이에요?', spanish: '¿Estás casado/a o soltero/a?', turkish: 'Evli misin yoksa bekar mı?' },
    validationPattern: 'marital',
    acceptedPrefixes: ['I am', "I'm"]
  },
  { 
    id: 'sq5', 
    question: 'What do you do?', 
    translations: { arabic: 'ماذا تعمل؟', bengali: 'তুমি কি কর?', korean: '무슨 일을 해요?', spanish: '¿A qué te dedicas?', turkish: 'Ne iş yapıyorsun?' },
    validationPattern: 'job',
    acceptedPrefixes: ['I am a', "I'm a", 'I am an', "I'm an"]
  },
  { 
    id: 'sq6', 
    question: 'Where do you work?', 
    translations: { arabic: 'أين تعمل؟', bengali: 'তুমি কোথায় কাজ কর?', korean: '어디서 일해요?', spanish: '¿Dónde trabajas?', turkish: 'Nerede çalışıyorsun?' },
    validationPattern: 'workplace',
    acceptedPrefixes: ['I work in', 'I work at', 'I work in a', 'I work at a']
  },
];

// Let's Review Part 1 - Marisol's sentences (fill in the blank)
export const letsReviewPart1: FillInBlankItem[] = [
  { id: 'review1-1', sentenceBefore: 'Hi. My name', sentenceAfter: 'Marisol Rivera.', correctAnswers: ['is', "'s"], translations: { arabic: 'مرحبا. اسمي ماريسول ريفيرا.', bengali: 'হাই। আমার নাম মারিসোল রিভেরা।', korean: '안녕하세요. 제 이름은 마리솔 리베라입니다.', spanish: 'Hola. Mi nombre es Marisol Rivera.', turkish: 'Merhaba. Adım Marisol Rivera.' } },
  { id: 'review1-2', sentenceBefore: 'I', sentenceAfter: 'from Peru.', correctAnswers: ['am', "'m"], translations: { arabic: 'أنا من بيرو.', bengali: 'আমি পেরু থেকে।', korean: '저는 페루에서 왔어요.', spanish: 'Soy de Perú.', turkish: 'Peru\'luyum.' } },
  { id: 'review1-3', sentenceBefore: 'I', sentenceAfter: '28 years old.', correctAnswers: ['am', "'m"], translations: { arabic: 'عمري 28 سنة.', bengali: 'আমার বয়স 28 বছর।', korean: '저는 28살이에요.', spanish: 'Tengo 28 años.', turkish: '28 yaşındayım.' } },
  { id: 'review1-4', sentenceBefore: 'I', sentenceAfter: 'single.', correctAnswers: ['am', "'m"], translations: { arabic: 'أنا أعزب.', bengali: 'আমি অবিবাহিত।', korean: '저는 미혼이에요.', spanish: 'Soy soltero/a.', turkish: 'Bekarım.' } },
  { id: 'review1-5', sentenceBefore: 'I', sentenceAfter: 'a cat.', correctAnswers: ['have'], translations: { arabic: 'لدي قطة.', bengali: 'আমার একটা বিড়াল আছে।', korean: '저는 고양이가 있어요.', spanish: 'Tengo un gato.', turkish: 'Bir kedim var.' } },
  { id: 'review1-6', sentenceBefore: 'I', sentenceAfter: 'a cashier.', correctAnswers: ['am', "'m"], translations: { arabic: 'أنا أمين صندوق.', bengali: 'আমি একজন ক্যাশিয়ার।', korean: '저는 계산원이에요.', spanish: 'Soy cajero/a.', turkish: 'Ben kasiyerim.' } },
  { id: 'review1-7', sentenceBefore: 'I', sentenceAfter: 'in a supermarket.', correctAnswers: ['work'], translations: { arabic: 'أعمل في سوبرماركت.', bengali: 'আমি একটা সুপারমার্কেটে কাজ করি।', korean: '저는 슈퍼마켓에서 일해요.', spanish: 'Trabajo en un supermercado.', turkish: 'Bir süpermarkette çalışıyorum.' } },
];

// Let's Review Part 2 - Rosa's sentences (fill in the blank with questions)
export const letsReviewPart2: FillInBlankItem[] = [
  { id: 'review2-1', sentenceBefore: 'What', sentenceAfter: 'your name?', correctAnswers: ['is', "'s"], translations: { arabic: 'ما اسمك؟', bengali: 'তোমার নাম কি?', korean: '이름이 뭐예요?', spanish: '¿Cuál es tu nombre?', turkish: 'Adın ne?' } },
  { id: 'review2-1b', sentenceBefore: 'My name', sentenceAfter: 'Rosa Silva.', correctAnswers: ['is', "'s"], translations: { arabic: 'اسمي روزا سيلفا.', bengali: 'আমার নাম রোজা সিলভা।', korean: '제 이름은 로사 실바입니다.', spanish: 'Mi nombre es Rosa Silva.', turkish: 'Adım Rosa Silva.' } },
  { id: 'review2-2', sentenceBefore: 'Where', sentenceAfter: 'you from?', correctAnswers: ['are'], translations: { arabic: 'من أين أنت؟', bengali: 'তুমি কোথা থেকে?', korean: '어디에서 왔어요?', spanish: '¿De dónde eres?', turkish: 'Nerelisin?' } },
  { id: 'review2-2b', sentenceBefore: 'I', sentenceAfter: 'from the Dominican Republic.', correctAnswers: ['am', "'m"], translations: { arabic: 'أنا من جمهورية الدومينيكان.', bengali: 'আমি ডোমিনিকান প্রজাতন্ত্র থেকে।', korean: '저는 도미니카 공화국에서 왔어요.', spanish: 'Soy de la República Dominicana.', turkish: 'Dominik Cumhuriyeti\'ndenim.' } },
  { id: 'review2-3', sentenceBefore: 'How old', sentenceAfter: 'you?', correctAnswers: ['are'], translations: { arabic: 'كم عمرك؟', bengali: 'তোমার বয়স কত?', korean: '몇 살이에요?', spanish: '¿Cuántos años tienes?', turkish: 'Kaç yaşındasın?' } },
  { id: 'review2-3b', sentenceBefore: 'I', sentenceAfter: '30 years old.', correctAnswers: ['am', "'m"], translations: { arabic: 'عمري 30 سنة.', bengali: 'আমার বয়স 30 বছর।', korean: '저는 30살이에요.', spanish: 'Tengo 30 años.', turkish: '30 yaşındayım.' } },
  { id: 'review2-4', sentenceBefore: '', sentenceAfter: 'you married or single?', correctAnswers: ['Are', 'are'], translations: { arabic: 'هل أنت متزوج أم أعزب؟', bengali: 'তুমি কি বিবাহিত না অবিবাহিত?', korean: '결혼했어요, 아니면 미혼이에요?', spanish: '¿Estás casado/a o soltero/a?', turkish: 'Evli misin bekar mı?' } },
  { id: 'review2-4b', sentenceBefore: 'I', sentenceAfter: 'married.', correctAnswers: ['am', "'m"], translations: { arabic: 'أنا متزوج.', bengali: 'আমি বিবাহিত।', korean: '저는 기혼이에요.', spanish: 'Estoy casado/a.', turkish: 'Evliyim.' } },
  { id: 'review2-5', sentenceBefore: '', sentenceAfter: 'you have children?', correctAnswers: ['Do'], translations: { arabic: 'هل لديك أطفال؟', bengali: 'তোমার কি বাচ্চা আছে?', korean: '아이가 있으세요?', spanish: '¿Tienes hijos?', turkish: 'Çocuğun var mı?' } },
  { id: 'review2-5b', sentenceBefore: "No, I", sentenceAfter: '.', correctAnswers: ["don't", 'do not'], translations: { arabic: 'لا، ليس لدي.', bengali: 'না, আমার নেই।', korean: '아니요, 없어요.', spanish: 'No, no tengo.', turkish: 'Hayır, yok.' } },
  { id: 'review2-6', sentenceBefore: 'What', sentenceAfter: 'you do?', correctAnswers: ['do'], translations: { arabic: 'ماذا تعمل؟', bengali: 'তুমি কি কর?', korean: '무슨 일을 해요?', spanish: '¿Qué haces?', turkish: 'Ne iş yapıyorsun?' } },
  { id: 'review2-6b', sentenceBefore: 'I', sentenceAfter: 'a housekeeper.', correctAnswers: ['am', "'m"], translations: { arabic: 'أنا عاملة نظافة.', bengali: 'আমি একজন গৃহপরিচারিকা।', korean: '저는 가정부예요.', spanish: 'Soy ama de llaves.', turkish: 'Ben temizlikçiyim.' } },
  { id: 'review2-7', sentenceBefore: 'Where', sentenceAfter: 'you work?', correctAnswers: ['do'], translations: { arabic: 'أين تعمل؟', bengali: 'তুমি কোথায় কাজ কর?', korean: '어디서 일해요?', spanish: '¿Dónde trabajas?', turkish: 'Nerede çalışıyorsun?' } },
  { id: 'review2-7b', sentenceBefore: 'I', sentenceAfter: 'in a hotel.', correctAnswers: ['work'], translations: { arabic: 'أعمل في فندق.', bengali: 'আমি একটা হোটেলে কাজ করি।', korean: '저는 호텔에서 일해요.', spanish: 'Trabajo en un hotel.', turkish: 'Bir otelde çalışıyorum.' } },
];

// Module 1 Lessons - New structured sequence
export const module1Lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Vocabulary Part 1',
    description: 'Learn basic introduction words',
    type: 'vocabulary',
    content: vocabulary1,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'lesson-2',
    title: 'My Name is Marisol',
    description: 'Watch and repeat with Marisol',
    type: 'video-series',
    videos: marisolVideos,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'lesson-3',
    title: 'Listening Practice: Marisol',
    description: 'Listen and fill in the blanks',
    type: 'listening-fill-in-blank',
    listeningFillInBlankItems: marisolListeningFillInBlank,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'lesson-4',
    title: 'Vocabulary Part 2',
    description: 'Learn neighborhood words',
    type: 'vocabulary',
    content: vocabulary2,
    isCompleted: false,
    duration: '8 min',
  },
  {
    title: 'Numbers 0-20',
    description: 'Learn to count from 0 to 20',
    type: 'numbers-practice',
    content: numbers0to20,
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'lesson-5',
    title: 'Greetings & Introductions',
    description: 'Learn common greeting phrases',
    type: 'vocabulary',
    phrases: greetingPhrases,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'lesson-6',
    title: 'Numbers 21-40',
    description: 'Continue learning numbers',
    type: 'numbers-practice',
    content: numbers21to40,
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'lesson-7',
    title: 'Jobs and Workplaces Part 1',
    description: 'Learn job vocabulary',
    type: 'vocabulary',
    content: jobsVocabulary,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'lesson-8',
    title: 'Jobs and Workplaces Part 2',
    description: 'Listen and repeat job sentences',
    type: 'sentences',
    sentences: jobsSentences,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'lesson-9',
    title: 'Numbers 41-60',
    description: 'Master higher numbers',
    type: 'numbers-practice',
    content: numbers41to60,
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'lesson-10',
    title: 'What is Your Name?',
    description: "Meet Rosa, your new neighbor",
    type: 'video-series',
    videos: rosaVideos,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'lesson-11',
    title: 'Speaking Practice',
    description: 'Practice speaking introduction phrases',
    type: 'speaking',
    phrases: greetingPhrases.slice(0, 6),
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'lesson-12',
    title: 'Practice Session Part 1',
    description: 'Interactive listening exercise',
    type: 'practice',
    embedUrl: 'https://www.educaplay.com/game/27271340-listen_and_order.html',
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'lesson-13',
    title: 'Practice Session Part 2',
    description: 'Answer questions about yourself',
    type: 'smart-practice',
    smartQuestions: smartPracticeQuestions,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'lesson-14',
    title: "Let's Review Part 1",
    description: 'Fill in the blanks with Marisol',
    type: 'fill-in-blank',
    fillInBlankItems: letsReviewPart1,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'lesson-15',
    title: "Let's Review Part 2",
    description: 'Complete Rosa\'s conversation',
    type: 'fill-in-blank',
    fillInBlankItems: letsReviewPart2,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'lesson-16',
    title: 'Doctor Intake Form',
    description: 'Practice filling out a real U.S. form',
    type: 'interactive-form',
    formType: 'doctor-intake',
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'lesson-17',
    title: 'Job Application',
    description: 'Practice applying for a job',
    type: 'interactive-form',
    formType: 'job-application',
    isCompleted: false,
    duration: '10 min',
  },
];
