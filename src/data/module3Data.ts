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
  { url: '/videos/module3/m3-on.mp4', title: 'On', subtitle: 'On', sentenceToRecord: 'On' },
  { url: '/videos/module3/m3-next-to.mp4', title: 'Next to', subtitle: 'Next to', sentenceToRecord: 'Next to' },
  { url: '/videos/module3/m3-on-the-corner-of.mp4', title: 'On the corner of', subtitle: 'On the corner of', sentenceToRecord: 'On the corner of' },
  { url: '/videos/module3/m3-between.mp4', title: 'Between', subtitle: 'Between', sentenceToRecord: 'Between' },
  { url: '/videos/module3/m3-in-front-of.mp4', title: 'In front of', subtitle: 'In front of', sentenceToRecord: 'In front of' },
  { url: '/videos/module3/m3-behind.mp4', title: 'Behind', subtitle: 'Behind', sentenceToRecord: 'Behind' },
  { url: '/videos/module3/m3-across-from.mp4', title: 'Across from', subtitle: 'Across from', sentenceToRecord: 'Across from' },
  { url: '/videos/module3/m3-near.mp4', title: 'Near', subtitle: 'Near', sentenceToRecord: 'Near' },
];

// Ali's Neighborhood Videos (Lesson 6)
export const aliNeighborhoodVideos = [
  { url: '/videos/module3/m3-ali-1.mp4', title: 'Ali\'s Neighborhood', subtitle: 'Listen to Ali describe his neighborhood', listenOnly: true },
  { url: '/videos/module3/m3-on-1.mp4', title: 'On', subtitle: 'On', sentenceToRecord: 'On' },
  { url: '/videos/module3/m3-next-to-2.mp4', title: 'Next to', subtitle: 'Next to', sentenceToRecord: 'Next to' },
  { url: '/videos/module3/m3-on-the-corner-of-3.mp4', title: 'On the corner of', subtitle: 'On the corner of', sentenceToRecord: 'On the corner of' },
  { url: '/videos/module3/m3-between-4.mp4', title: 'Between', subtitle: 'Between', sentenceToRecord: 'Between' },
  { url: '/videos/module3/m3-across-from-5.mp4', title: 'Across from', subtitle: 'Across from', sentenceToRecord: 'Across from' },
  { url: '/videos/module3/m3-behind-6.mp4', title: 'Behind', subtitle: 'Behind', sentenceToRecord: 'Behind' },
  { url: '/videos/module3/m3-in-front-of-7.mp4', title: 'In front of', subtitle: 'In front of', sentenceToRecord: 'In front of' },
  { url: '/videos/module3/m3-near-8.mp4', title: 'Near', subtitle: 'Near', sentenceToRecord: 'Near' },
];

// Module 3 Lesson interface
export interface Module3Lesson {
  id: string;
  title: string;
  description: string;
  type: 'vocabulary' | 'vocabulary-matching' | 'video-series';
  content?: VocabularyItem[];
  videos?: { url: string; title: string; subtitle?: string; sentenceToRecord?: string; listenOnly?: boolean; showTranslation?: boolean }[];
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
];
