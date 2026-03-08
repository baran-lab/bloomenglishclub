// Module 3 - Directions Content Data

import { SupportedLanguage, VocabularyItem } from './module1Data';

// Vocabulary 1 - Prepositions of location
export const module3Vocabulary1: VocabularyItem[] = [
  { id: 'm3-on', english: 'On', pronunciation: 'ahn', translations: { arabic: 'على', bengali: 'উপরে', korean: '위에', spanish: 'En / Sobre', turkish: 'Üzerinde' } },
  { id: 'm3-next-to', english: 'Next to', pronunciation: 'nekst too', translations: { arabic: 'بجانب', bengali: 'পাশে', korean: '옆에', spanish: 'Al lado de', turkish: 'Yanında' } },
  { id: 'm3-between', english: 'Between', pronunciation: 'bih-TWEEN', translations: { arabic: 'بين', bengali: 'মধ্যে', korean: '사이에', spanish: 'Entre', turkish: 'Arasında' } },
  { id: 'm3-on-the-corner-of', english: 'On the corner of', pronunciation: 'ahn thuh KOR-ner uhv', translations: { arabic: 'على زاوية', bengali: 'কোণায়', korean: '모퉁이에', spanish: 'En la esquina de', turkish: 'Köşesinde' } },
  { id: 'm3-across-from', english: 'Across from', pronunciation: 'uh-KRAWS fruhm', translations: { arabic: 'مقابل', bengali: 'এর বিপরীতে', korean: '건너편에', spanish: 'Enfrente de', turkish: 'Karşısında' } },
  { id: 'm3-behind', english: 'Behind', pronunciation: 'bih-HYND', translations: { arabic: 'خلف', bengali: 'পিছনে', korean: '뒤에', spanish: 'Detrás de', turkish: 'Arkasında' } },
  { id: 'm3-in-front-of', english: 'In front of', pronunciation: 'in fruhnt uhv', translations: { arabic: 'أمام', bengali: 'সামনে', korean: '앞에', spanish: 'Delante de', turkish: 'Önünde' } },
  { id: 'm3-near', english: 'Near', pronunciation: 'neer', translations: { arabic: 'بالقرب من', bengali: 'কাছে', korean: '근처에', spanish: 'Cerca de', turkish: 'Yakınında' } },
];

// Vocabulary 2 - Places
export const module3Vocabulary2: VocabularyItem[] = [
  { id: 'm3-bench', english: 'Bench', pronunciation: 'bench', translations: { arabic: 'مقعد', bengali: 'বেঞ্চ', korean: '벤치', spanish: 'Banco', turkish: 'Bank' } },
  { id: 'm3-bus-stop', english: 'Bus stop', pronunciation: 'buhs stahp', translations: { arabic: 'موقف الحافلة', bengali: 'বাস স্টপ', korean: '버스 정류장', spanish: 'Parada de autobús', turkish: 'Otobüs durağı' } },
  { id: 'm3-coffee-shop', english: 'Coffee shop', pronunciation: 'KAW-fee shahp', translations: { arabic: 'مقهى', bengali: 'কফি শপ', korean: '커피숍', spanish: 'Cafetería', turkish: 'Kahve dükkanı' } },
  { id: 'm3-gym', english: 'Gym', pronunciation: 'jim', translations: { arabic: 'صالة رياضية', bengali: 'জিম', korean: '체육관', spanish: 'Gimnasio', turkish: 'Spor salonu' } },
  { id: 'm3-hospital', english: 'Hospital', pronunciation: 'HAHS-pih-tuhl', translations: { arabic: 'مستشفى', bengali: 'হাসপাতাল', korean: '병원', spanish: 'Hospital', turkish: 'Hastane' } },
  { id: 'm3-park', english: 'Park', pronunciation: 'pahrk', translations: { arabic: 'حديقة', bengali: 'পার্ক', korean: '공원', spanish: 'Parque', turkish: 'Park' } },
  { id: 'm3-parking-lot', english: 'Parking lot', pronunciation: 'PAHR-king laht', translations: { arabic: 'موقف سيارات', bengali: 'পার্কিং লট', korean: '주차장', spanish: 'Estacionamiento', turkish: 'Otopark' } },
  { id: 'm3-pharmacy', english: 'Pharmacy', pronunciation: 'FAHR-muh-see', translations: { arabic: 'صيدلية', bengali: 'ফার্মেসি', korean: '약국', spanish: 'Farmacia', turkish: 'Eczane' } },
];

// Vocabulary 3 - Geographic Areas
export const module3Vocabulary3: VocabularyItem[] = [
  { id: 'm3-borough', english: 'Borough', pronunciation: 'BUR-oh', translations: { arabic: 'حي / بلدة', bengali: 'বরো', korean: '자치구', spanish: 'Distrito', turkish: 'İlçe' } },
  { id: 'm3-city', english: 'City', pronunciation: 'SIH-tee', translations: { arabic: 'مدينة', bengali: 'শহর', korean: '도시', spanish: 'Ciudad', turkish: 'Şehir' } },
  { id: 'm3-county', english: 'County', pronunciation: 'KOWN-tee', translations: { arabic: 'مقاطعة', bengali: 'কাউন্টি', korean: '군', spanish: 'Condado', turkish: 'İlçe / Kaza' } },
  { id: 'm3-country', english: 'Country', pronunciation: 'KUHN-tree', translations: { arabic: 'بلد', bengali: 'দেশ', korean: '나라', spanish: 'País', turkish: 'Ülke' } },
  { id: 'm3-state', english: 'State', pronunciation: 'stayt', translations: { arabic: 'ولاية', bengali: 'রাজ্য', korean: '주', spanish: 'Estado', turkish: 'Eyalet' } },
  { id: 'm3-town', english: 'Town', pronunciation: 'town', translations: { arabic: 'بلدة', bengali: 'শহর', korean: '마을', spanish: 'Pueblo', turkish: 'Kasaba' } },
];

// Where is the ...? Videos
export const whereIsTheVideos = [
  { url: '/videos/module3/m3-on-the.mp4', title: 'On the', subtitle: 'On the', sentenceToRecord: 'On the' },
  { url: '/videos/module3/m3-next-to-the.mp4', title: 'Next to the', subtitle: 'Next to the', sentenceToRecord: 'Next to the' },
  { url: '/videos/module3/m3-on-the-corner.mp4', title: 'On the corner of the', subtitle: 'On the corner of the', sentenceToRecord: 'On the corner of the' },
  { url: '/videos/module3/m3-between-the.mp4', title: 'Between the', subtitle: 'Between the', sentenceToRecord: 'Between the' },
  { url: '/videos/module3/m3-in-front-of-the.mp4', title: 'In front of the', subtitle: 'In front of the', sentenceToRecord: 'In front of the' },
  { url: '/videos/module3/m3-across-from-the.mp4', title: 'Across from the', subtitle: 'Across from the', sentenceToRecord: 'Across from the' },
  { url: '/videos/module3/m3-behind-the.mp4', title: 'Behind the', subtitle: 'Behind the', sentenceToRecord: 'Behind the' },
  { url: '/videos/module3/m3-near-the.mp4', title: 'Near the', subtitle: 'Near the', sentenceToRecord: 'Near the' },
];

// Ali's Neighborhood Videos (Lesson 6)
export const aliNeighborhoodVideos = [
  { url: '/videos/module3/m3-ali-1.mp4', title: 'Ali\'s Neighborhood', subtitle: 'Listen to Ali describe his neighborhood', listenOnly: true },
  { url: '/videos/module3/m3-on-1.mp4', title: 'On', subtitle: 'The gym is on Main Street.', sentenceToRecord: 'The gym is on Main Street.' },
  { url: '/videos/module3/m3-next-to-2.mp4', title: 'Next to', subtitle: 'The coffee shop is next to the pharmacy.', sentenceToRecord: 'The coffee shop is next to the pharmacy.' },
  { url: '/videos/module3/m3-on-the-corner-of-3.mp4', title: 'On the corner of', subtitle: 'The hospital is on the corner of Main Street and First Avenue.', sentenceToRecord: 'The hospital is on the corner of Main Street and First Avenue.' },
  { url: '/videos/module3/m3-between-4.mp4', title: 'Between', subtitle: 'The park is between the hospital and the school.', sentenceToRecord: 'The park is between the hospital and the school.' },
  { url: '/videos/module3/m3-across-from-5.mp4', title: 'Across from', subtitle: 'The bus stop is across from the park.', sentenceToRecord: 'The bus stop is across from the park.' },
  { url: '/videos/module3/m3-behind-6.mp4', title: 'Behind', subtitle: 'The parking lot is behind the gym.', sentenceToRecord: 'The parking lot is behind the gym.' },
  { url: '/videos/module3/m3-in-front-of-7.mp4', title: 'In front of', subtitle: 'The bench is in front of the coffee shop.', sentenceToRecord: 'The bench is in front of the coffee shop.' },
  { url: '/videos/module3/m3-near-8.mp4', title: 'Near', subtitle: 'The pharmacy is near the hospital.', sentenceToRecord: 'The pharmacy is near the hospital.' },
];

// Where is the...? Practice 1 - Listening Quiz
export interface ListeningQuizQuestion {
  videoUrl: string;
  correctAnswer: string;
  options: string[];
}

export const whereIsThePractice1: ListeningQuizQuestion[] = [
  {
    videoUrl: '/videos/module3/m3-p1.mp4',
    correctAnswer: 'The apartment building is ON Bliss Avenue.',
    options: [
      'The pharmacy is BETWEEN the bus stop and the grocery store.',
      'The apartment building is ON Bliss Avenue.',
      'The mailbox is IN FRONT OF the park.',
    ],
  },
  {
    videoUrl: '/videos/module3/m3-p2.mp4',
    correctAnswer: 'The grocery store is NEXT TO the apartment building.',
    options: [
      'The grocery store is NEXT TO the apartment building.',
      'The pharmacy is BETWEEN the bus stop and the grocery store.',
      'The mailbox is IN FRONT OF the park.',
    ],
  },
  {
    videoUrl: '/videos/module3/m3-p3.mp4',
    correctAnswer: 'The bus stop is ON THE CORNER OF Bliss Avenue and Main Street.',
    options: [
      'The museum is ACROSS FROM the grocery store.',
      'The bus stop is ON THE CORNER OF Bliss Avenue and Main Street.',
      'The school is BEHIND the bus stop.',
    ],
  },
  {
    videoUrl: '/videos/module3/m3-p4.mp4',
    correctAnswer: 'The pharmacy is BETWEEN the bus stop and the grocery store.',
    options: [
      'The school is BEHIND the bus stop.',
      'The museum is ACROSS FROM the grocery store.',
      'The pharmacy is BETWEEN the bus stop and the grocery store.',
    ],
  },
  {
    videoUrl: '/videos/module3/m3-p5.mp4',
    correctAnswer: 'The museum is ACROSS FROM the grocery store.',
    options: [
      'The museum is ACROSS FROM the grocery store.',
      'The bus stop is ON THE CORNER OF Bliss Avenue and Main Street.',
      'The parking lot is NEAR the school.',
    ],
  },
  {
    videoUrl: '/videos/module3/m3-p6.mp4',
    correctAnswer: 'The school is BEHIND the bus stop.',
    options: [
      'The apartment building is ON Bliss Avenue.',
      'The bus stop is ON THE CORNER OF Bliss Avenue and Main Street.',
      'The school is BEHIND the bus stop.',
    ],
  },
  {
    videoUrl: '/videos/module3/m3-p7.mp4',
    correctAnswer: 'The mailbox is IN FRONT OF the park.',
    options: [
      'The school is BEHIND the bus stop.',
      'The mailbox is IN FRONT OF the park.',
      'The museum is ACROSS FROM the grocery store.',
    ],
  },
  {
    videoUrl: '/videos/module3/m3-p8.mp4',
    correctAnswer: 'The parking lot is NEAR the school.',
    options: [
      'The pharmacy is BETWEEN the bus stop and the grocery store.',
      'The museum is ACROSS FROM the grocery store.',
      'The parking lot is NEAR the school.',
    ],
  },
];

// Module 3 Lesson interface
export interface Module3Lesson {
  id: string;
  title: string;
  description: string;
  type: 'vocabulary' | 'vocabulary-matching' | 'video-series' | 'listening-quiz';
  content?: VocabularyItem[];
  videos?: { url: string; title: string; subtitle?: string; sentenceToRecord?: string; listenOnly?: boolean; showTranslation?: boolean }[];
  listeningQuestions?: ListeningQuizQuestion[];
  isCompleted: boolean;
  duration?: string;
}

// Module 3 Lessons
export const module3Lessons: Module3Lesson[] = [
  {
    id: 'm3-lesson-1',
    title: 'Vocabulary 1 – Prepositions',
    description: 'Learn words for locations: on, next to, between, and more',
    type: 'vocabulary',
    content: module3Vocabulary1,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm3-lesson-2',
    title: 'Vocabulary 1 – Matching',
    description: 'Match prepositions with their translations',
    type: 'vocabulary-matching',
    content: module3Vocabulary1,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm3-lesson-3',
    title: 'Vocabulary 2 – Places',
    description: 'Learn words for places around town',
    type: 'vocabulary',
    content: module3Vocabulary2,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm3-lesson-4',
    title: 'Vocabulary 2 – Matching',
    description: 'Match places with their translations',
    type: 'vocabulary-matching',
    content: module3Vocabulary2,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm3-lesson-5',
    title: 'Where is the …?',
    description: 'Watch videos and practice saying location phrases',
    type: 'video-series',
    videos: whereIsTheVideos,
    isCompleted: false,
    duration: '12 min',
  },
  {
    id: 'm3-lesson-6',
    title: 'Ali\'s Neighborhood',
    description: 'Listen and repeat preposition phrases with Ali',
    type: 'video-series',
    videos: aliNeighborhoodVideos,
    isCompleted: false,
    duration: '15 min',
  },
  {
    id: 'm3-lesson-7',
    title: 'Vocabulary 3 – Geographic Areas',
    description: 'Learn words for geographic areas: borough, city, county, and more',
    type: 'vocabulary',
    content: module3Vocabulary3,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm3-lesson-8',
    title: 'Vocabulary 3 – Matching',
    description: 'Match geographic area words with their translations',
    type: 'vocabulary-matching',
    content: module3Vocabulary3,
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'm3-lesson-9',
    title: 'Where is the…? Practice 1',
    description: 'Listen and choose the sentence you hear',
    type: 'listening-quiz',
    listeningQuestions: whereIsThePractice1,
    isCompleted: false,
    duration: '10 min',
  },
];
