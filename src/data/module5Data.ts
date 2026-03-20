// Module 5 - Food & Cooking Content Data
import { VocabularyItem, SupportedLanguage } from './module1Data';

// Vocabulary Set 1 - Cooking Verbs & Food Basics
export const module5Vocabulary1: VocabularyItem[] = [
  { id: 'm5v1-add', english: 'add', pronunciation: 'ad', translations: { arabic: 'أضف', bengali: 'যোগ করুন', korean: '추가하다', spanish: 'añadir', turkish: 'eklemek' } },
  { id: 'm5v1-beat', english: 'beat', pronunciation: 'beet', translations: { arabic: 'اخفق', bengali: 'ফেটান', korean: '치다', spanish: 'batir', turkish: 'çırpmak' } },
  { id: 'm5v1-break', english: 'break', pronunciation: 'brayk', translations: { arabic: 'اكسر', bengali: 'ভাঙা', korean: '깨다', spanish: 'romper', turkish: 'kırmak' } },
  { id: 'm5v1-cook', english: 'cook', pronunciation: 'kuk', translations: { arabic: 'اطبخ', bengali: 'রান্না করা', korean: '요리하다', spanish: 'cocinar', turkish: 'pişirmek' } },
  { id: 'm5v1-dessert', english: 'dessert', pronunciation: 'dih-ZERT', translations: { arabic: 'حلوى', bengali: 'মিষ্টান্ন', korean: '디저트', spanish: 'postre', turkish: 'tatlı' } },
  { id: 'm5v1-eat', english: 'eat', pronunciation: 'eet', translations: { arabic: 'كل', bengali: 'খাওয়া', korean: '먹다', spanish: 'comer', turkish: 'yemek' } },
];

// Vocabulary Set 2 - More Cooking & Food Words
export const module5Vocabulary2: VocabularyItem[] = [
  { id: 'm5v2-ingredient', english: 'ingredient', pronunciation: 'in-GREE-dee-ent', translations: { arabic: 'مكوّن', bengali: 'উপকরণ', korean: '재료', spanish: 'ingrediente', turkish: 'malzeme' } },
  { id: 'm5v2-mix', english: 'mix', pronunciation: 'miks', translations: { arabic: 'اخلط', bengali: 'মেশান', korean: '섞다', spanish: 'mezclar', turkish: 'karıştırmak' } },
  { id: 'm5v2-omelet', english: 'omelet', pronunciation: 'AHM-let', translations: { arabic: 'عجة', bengali: 'অমলেট', korean: '오믈렛', spanish: 'tortilla', turkish: 'omlet' } },
  { id: 'm5v2-put', english: 'put', pronunciation: 'put', translations: { arabic: 'ضع', bengali: 'রাখুন', korean: '놓다', spanish: 'poner', turkish: 'koymak' } },
  { id: 'm5v2-recipe', english: 'recipe', pronunciation: 'REH-suh-pee', translations: { arabic: 'وصفة', bengali: 'রেসিপি', korean: '레시피', spanish: 'receta', turkish: 'tarif' } },
  { id: 'm5v2-salad', english: 'salad', pronunciation: 'SAL-ud', translations: { arabic: 'سلطة', bengali: 'সালাদ', korean: '샐러드', spanish: 'ensalada', turkish: 'salata' } },
  { id: 'm5v2-sandwich', english: 'sandwich', pronunciation: 'SAND-wich', translations: { arabic: 'شطيرة', bengali: 'স্যান্ডউইচ', korean: '샌드위치', spanish: 'sándwich', turkish: 'sandviç' } },
  { id: 'm5v2-serve', english: 'serve', pronunciation: 'serv', translations: { arabic: 'قدّم', bengali: 'পরিবেশন করা', korean: '대접하다', spanish: 'servir', turkish: 'servis yapmak' } },
  { id: 'm5v2-soup', english: 'soup', pronunciation: 'soop', translations: { arabic: 'حساء', bengali: 'স্যুপ', korean: '수프', spanish: 'sopa', turkish: 'çorba' } },
  { id: 'm5v2-vegetable', english: 'vegetable', pronunciation: 'VEJ-tuh-bul', translations: { arabic: 'خضروات', bengali: 'সবজি', korean: '채소', spanish: 'verdura', turkish: 'sebze' } },
  { id: 'm5v2-wash', english: 'wash', pronunciation: 'wosh', translations: { arabic: 'اغسل', bengali: 'ধোয়া', korean: '씻다', spanish: 'lavar', turkish: 'yıkamak' } },
];

// Grocery Items for drag-and-drop exercise
export interface GroceryItem {
  id: string;
  name: string;
  emoji: string;
  category: 'how-many' | 'how-much';
}

// Items in the correct display order (left to right, top to bottom as shown in the image)
export const groceryItemsCorrectOrder: GroceryItem[] = [
  { id: 'gi-tomatoes', name: 'Tomatoes', emoji: '🍅🍅', category: 'how-many' },
  { id: 'gi-eggs', name: 'Eggs', emoji: '🥚🥚', category: 'how-many' },
  { id: 'gi-onions', name: 'Onions', emoji: '🧅🧅', category: 'how-many' },
  { id: 'gi-carrots', name: 'Carrots', emoji: '🥕🥕', category: 'how-many' },
  { id: 'gi-bread', name: 'Bread', emoji: '🍞', category: 'how-much' },
  { id: 'gi-salt', name: 'Salt', emoji: '🧂', category: 'how-much' },
  { id: 'gi-milk', name: 'Milk', emoji: '🥛', category: 'how-much' },
  { id: 'gi-juice', name: 'Juice', emoji: '🧃', category: 'how-much' },
  { id: 'gi-green-peppers', name: 'Green peppers', emoji: '🫑🫑', category: 'how-many' },
  { id: 'gi-apples', name: 'Apples', emoji: '🍎🍎', category: 'how-many' },
  { id: 'gi-cherries', name: 'Cherries', emoji: '🍒🍒', category: 'how-many' },
  { id: 'gi-potatoes', name: 'Potatoes', emoji: '🥔🥔', category: 'how-many' },
  { id: 'gi-coffee', name: 'Coffee', emoji: '☕', category: 'how-much' },
  { id: 'gi-rice', name: 'Rice', emoji: '🍚', category: 'how-much' },
  { id: 'gi-meat', name: 'Meat', emoji: '🥩', category: 'how-much' },
  { id: 'gi-water', name: 'Water', emoji: '💧', category: 'how-much' },
  { id: 'gi-oranges', name: 'Oranges', emoji: '🍊🍊', category: 'how-many' },
  { id: 'gi-pies', name: 'Pies', emoji: '🥧🥧', category: 'how-many' },
  { id: 'gi-pineapples', name: 'Pineapples', emoji: '🍍🍍', category: 'how-many' },
  { id: 'gi-bananas', name: 'Bananas', emoji: '🍌🍌', category: 'how-many' },
  { id: 'gi-tea', name: 'Tea', emoji: '🍵', category: 'how-much' },
  { id: 'gi-sugar', name: 'Sugar', emoji: '🫙', category: 'how-much' },
  { id: 'gi-soda', name: 'Soda', emoji: '🥤', category: 'how-much' },
  { id: 'gi-cheese', name: 'Cheese', emoji: '🧀', category: 'how-much' },
];

// Alphabetical list that users start with
export const groceryItemsAlphabetical: string[] = [
  'apples', 'bananas', 'bread', 'carrots', 'cheese', 'cherries', 'coffee',
  'eggs', 'green peppers', 'juice', 'meat', 'milk', 'onions', 'oranges',
  'pies', 'pineapples', 'potatoes', 'rice', 'salt', 'soda', 'sugar',
  'tea', 'tomatoes', 'water',
];

// How much? How many? Practice - Sentence ordering exercises
export interface SentenceOrderData {
  correctSentence: string;
  jumbledWords: string[];
}

export const howMuchManySentences: SentenceOrderData[] = [
  { correctSentence: 'How many tomatoes do you need?', jumbledWords: ['need?', 'How', 'do', 'tomatoes', 'many', 'you'] },
  { correctSentence: 'How much sugar do you need?', jumbledWords: ['you', 'much', 'How', 'need?', 'sugar', 'do'] },
  { correctSentence: 'How many onions do you need?', jumbledWords: ['do', 'onions', 'How', 'you', 'many', 'need?'] },
  { correctSentence: 'How much coffee do you need?', jumbledWords: ['coffee', 'How', 'need?', 'much', 'you', 'do'] },
  { correctSentence: 'How many apples do you need?', jumbledWords: ['many', 'you', 'apples', 'How', 'do', 'need?'] },
  { correctSentence: 'How much salt do you need?', jumbledWords: ['do', 'salt', 'need?', 'How', 'much', 'you'] },
];

// Vocabulary Set 3 - Containers & Measurements
export const module5Vocabulary3: VocabularyItem[] = [
  { id: 'm5v3-bag', english: 'bag', pronunciation: 'bag', translations: { arabic: 'كيس', bengali: 'ব্যাগ', korean: '봉지', spanish: 'bolsa', turkish: 'torba' } },
  { id: 'm5v3-bottle', english: 'bottle', pronunciation: 'BAH-tul', translations: { arabic: 'زجاجة', bengali: 'বোতল', korean: '병', spanish: 'botella', turkish: 'şişe' } },
  { id: 'm5v3-box', english: 'box', pronunciation: 'boks', translations: { arabic: 'صندوق', bengali: 'বাক্স', korean: '상자', spanish: 'caja', turkish: 'kutu' } },
  { id: 'm5v3-can', english: 'can', pronunciation: 'kan', translations: { arabic: 'علبة', bengali: 'ক্যান', korean: '캔', spanish: 'lata', turkish: 'konserve kutusu' } },
  { id: 'm5v3-carton', english: 'carton', pronunciation: 'KAR-tun', translations: { arabic: 'كرتونة', bengali: 'কার্টন', korean: '팩', spanish: 'cartón', turkish: 'karton' } },
  { id: 'm5v3-cup', english: 'cup', pronunciation: 'kup', translations: { arabic: 'كوب', bengali: 'কাপ', korean: '컵', spanish: 'taza', turkish: 'fincan' } },
  { id: 'm5v3-dozen', english: 'dozen', pronunciation: 'DUZ-en', translations: { arabic: 'دزينة', bengali: 'ডজন', korean: '다스', spanish: 'docena', turkish: 'düzine' } },
  { id: 'm5v3-gallon', english: 'gallon', pronunciation: 'GAL-un', translations: { arabic: 'غالون', bengali: 'গ্যালন', korean: '갤런', spanish: 'galón', turkish: 'galon' } },
  { id: 'm5v3-loaf', english: 'loaf', pronunciation: 'lohf', translations: { arabic: 'رغيف', bengali: 'পাউরুটি', korean: '덩어리', spanish: 'barra', turkish: 'somun' } },
  { id: 'm5v3-package', english: 'package', pronunciation: 'PAK-ij', translations: { arabic: 'حزمة', bengali: 'প্যাকেজ', korean: '패키지', spanish: 'paquete', turkish: 'paket' } },
  { id: 'm5v3-slice', english: 'slice', pronunciation: 'slahs', translations: { arabic: 'شريحة', bengali: 'টুকরা', korean: '조각', spanish: 'rebanada', turkish: 'dilim' } },
  { id: 'm5v3-tablespoon', english: 'tablespoon', pronunciation: 'TAY-bul-spoon', translations: { arabic: 'ملعقة كبيرة', bengali: 'টেবিল চামচ', korean: '큰 숟가락', spanish: 'cucharada', turkish: 'yemek kaşığı' } },
];

// Visual Vocabulary - Grocery Shopping with Containers (Singular - PDF1)
export interface VisualVocabularyItem {
  id: string;
  phrase: string;
  emoji: string;
}

export const module5VisualVocab1: VisualVocabularyItem[] = [
  { id: 'vv1-can-soda', phrase: 'a can of soda', emoji: '🥫' },
  { id: 'vv1-carton-juice', phrase: 'a carton of juice', emoji: '🧃' },
  { id: 'vv1-gallon-milk', phrase: 'a gallon of milk', emoji: '🥛' },
  { id: 'vv1-package-meat', phrase: 'a package of meat', emoji: '🥩' },
  { id: 'vv1-loaf-bread', phrase: 'a loaf of bread', emoji: '🍞' },
  { id: 'vv1-bag-flour', phrase: 'a bag of flour', emoji: '🌾' },
  { id: 'vv1-bag-sugar', phrase: 'a bag of sugar', emoji: '🫙' },
  { id: 'vv1-package-cheese', phrase: 'a package of cheese', emoji: '🧀' },
  { id: 'vv1-bag-rice', phrase: 'a bag of rice', emoji: '🍚' },
  { id: 'vv1-box-tea', phrase: 'a box of tea', emoji: '🍵' },
  { id: 'vv1-bottle-water', phrase: 'a bottle of water', emoji: '💧' },
];

// Visual Vocabulary - Grocery Shopping with Containers (Plural - PDF2)
export const module5VisualVocab2: VisualVocabularyItem[] = [
  { id: 'vv2-bags-rice', phrase: 'two bags of rice', emoji: '🍚🍚' },
  { id: 'vv2-boxes-tea', phrase: 'three boxes of tea', emoji: '🍵🍵🍵' },
  { id: 'vv2-bottles-water', phrase: 'four bottles of water', emoji: '💧💧💧💧' },
  { id: 'vv2-cans-soda', phrase: 'three cans of soda', emoji: '🥫🥫🥫' },
  { id: 'vv2-cartons-juice', phrase: 'two cartons of juice', emoji: '🧃🧃' },
  { id: 'vv2-gallons-milk', phrase: 'two gallons of milk', emoji: '🥛🥛' },
  { id: 'vv2-packages-meat', phrase: 'three packages of meat', emoji: '🥩🥩🥩' },
  { id: 'vv2-loaves-bread', phrase: 'two loaves of bread', emoji: '🍞🍞' },
  { id: 'vv2-bags-flour', phrase: 'two bags of flour', emoji: '🌾🌾' },
  { id: 'vv2-bags-sugar', phrase: 'two bags of sugar', emoji: '🫙🫙' },
  { id: 'vv2-packages-cheese', phrase: 'two packages of cheese', emoji: '🧀🧀' },
];

// Fatima's Vegetable Omelet videos
export const fatimaOmeletVideos = [
  { url: '/videos/module5/M5_Fatima_1.mp4', title: 'Vegetable Omelet - Part 1', listenOnly: true },
  { url: '/videos/module5/M5_Fatima_2.mp4', title: 'Vegetable Omelet - Part 2', sentenceToRecord: 'I need two eggs.' },
  { url: '/videos/module5/M5_Fatima_3.mp4', title: 'Vegetable Omelet - Part 3', sentenceToRecord: 'I need one onion.' },
  { url: '/videos/module5/M5_Fatima_4.mp4', title: 'Vegetable Omelet - Part 4', sentenceToRecord: 'I need two tomatoes.' },
  { url: '/videos/module5/M5_Fatima_5.mp4', title: 'Vegetable Omelet - Part 5', sentenceToRecord: 'I need one green pepper.' },
  { url: '/videos/module5/M5_Fatima_6.mp4', title: 'Vegetable Omelet - Part 6', sentenceToRecord: 'I need one carrot.' },
  { url: '/videos/module5/M5_Fatima_7.mp4', title: 'Vegetable Omelet - Part 7', sentenceToRecord: 'I need one slice of bread.' },
  { url: '/videos/module5/M5_Fatima_8.mp4', title: 'Vegetable Omelet - Part 8', sentenceToRecord: 'I need one tablespoon olive oil.' },
];

// Vocabulary Set 4 - Kitchen Items
export const module5Vocabulary4: VocabularyItem[] = [
  { id: 'm5v4-blender', english: 'blender', pronunciation: 'BLEN-der', translations: { arabic: 'خلاط', bengali: 'ব্লেন্ডার', korean: '블렌더', spanish: 'licuadora', turkish: 'blender' } },
  { id: 'm5v4-bowl', english: 'bowl', pronunciation: 'bohl', translations: { arabic: 'وعاء', bengali: 'বাটি', korean: '그릇', spanish: 'tazón', turkish: 'kase' } },
  { id: 'm5v4-fork', english: 'fork', pronunciation: 'fork', translations: { arabic: 'شوكة', bengali: 'কাঁটাচামচ', korean: '포크', spanish: 'tenedor', turkish: 'çatal' } },
  { id: 'm5v4-glass', english: 'glass', pronunciation: 'glas', translations: { arabic: 'كأس', bengali: 'গ্লাস', korean: '유리잔', spanish: 'vaso', turkish: 'bardak' } },
  { id: 'm5v4-knife', english: 'knife', pronunciation: 'nahyf', translations: { arabic: 'سكين', bengali: 'ছুরি', korean: '칼', spanish: 'cuchillo', turkish: 'bıçak' } },
  { id: 'm5v4-oven', english: 'oven', pronunciation: 'UH-ven', translations: { arabic: 'فرن', bengali: 'ওভেন', korean: '오븐', spanish: 'horno', turkish: 'fırın' } },
  { id: 'm5v4-pan', english: 'pan', pronunciation: 'pan', translations: { arabic: 'مقلاة', bengali: 'প্যান', korean: '팬', spanish: 'sartén', turkish: 'tava' } },
  { id: 'm5v4-plate', english: 'plate', pronunciation: 'playt', translations: { arabic: 'طبق', bengali: 'প্লেট', korean: '접시', spanish: 'plato', turkish: 'tabak' } },
  { id: 'm5v4-spoon', english: 'spoon', pronunciation: 'spoon', translations: { arabic: 'ملعقة', bengali: 'চামচ', korean: '숟가락', spanish: 'cuchara', turkish: 'kaşık' } },
  { id: 'm5v4-stove', english: 'stove', pronunciation: 'stohv', translations: { arabic: 'موقد', bengali: 'চুলা', korean: '스토브', spanish: 'estufa', turkish: 'ocak' } },
];

// Module 5 Lesson interface
export interface Module5Lesson {
  id: string;
  title: string;
  description: string;
  type: 'vocabulary' | 'vocabulary-matching' | 'grocery-drag-drop' | 'video-series' | 'how-much-many' | 'sentence-order' | 'visual-vocabulary' | 'visual-matching';
  content?: VocabularyItem[];
  visualContent?: VisualVocabularyItem[];
  videos?: { url: string; title: string; subtitle?: string }[];
  isCompleted: boolean;
  duration?: string;
}

// Module 5 Lessons - Full ordered list
export const module5Lessons: Module5Lesson[] = [
  // 1
  {
    id: 'm5-vocab-1',
    title: 'Vocabulary Part 1',
    description: 'Learn cooking verbs and food basics',
    type: 'vocabulary',
    content: module5Vocabulary1,
    isCompleted: false,
    duration: '5 min',
  },
  // 2
  {
    id: 'm5-vocab-match-1',
    title: 'Vocabulary Matching 1',
    description: 'Match cooking words with translations',
    type: 'vocabulary-matching',
    content: module5Vocabulary1,
    isCompleted: false,
    duration: '5 min',
  },
  // 3
  {
    id: 'm5-vocab-2',
    title: 'Vocabulary Part 2',
    description: 'Learn more cooking and food words',
    type: 'vocabulary',
    content: module5Vocabulary2,
    isCompleted: false,
    duration: '5 min',
  },
  // 4
  {
    id: 'm5-vocab-match-2',
    title: 'Vocabulary Matching 2',
    description: 'Match food words with translations',
    type: 'vocabulary-matching',
    content: module5Vocabulary2,
    isCompleted: false,
    duration: '5 min',
  },
  // 5
  {
    id: 'm5-grocery-items',
    title: 'Grocery Items',
    description: 'Learn grocery item names with drag and drop',
    type: 'grocery-drag-drop',
    isCompleted: false,
    duration: '10 min',
  },
  // 6
  {
    id: 'm5-how-much-many',
    title: 'How much? How many?',
    description: 'Sort grocery items into countable and uncountable',
    type: 'how-much-many',
    isCompleted: false,
    duration: '8 min',
  },
  // 7
  {
    id: 'm5-how-much-many-practice',
    title: 'How much? How many? Practice',
    description: 'Listen and put words in the correct order',
    type: 'sentence-order',
    isCompleted: false,
    duration: '5 min',
  },
  // 8
  {
    id: 'm5-vocab-3',
    title: 'Vocabulary Part 3',
    description: 'Learn containers and measurements',
    type: 'vocabulary',
    content: module5Vocabulary3,
    isCompleted: false,
    duration: '5 min',
  },
  // 9
  {
    id: 'm5-vocab-match-3',
    title: 'Vocabulary Matching 3',
    description: 'Match container words with translations',
    type: 'vocabulary-matching',
    content: module5Vocabulary3,
    isCompleted: false,
    duration: '5 min',
  },
  // 10
  {
    id: 'm5-visual-vocab-1',
    title: 'Grocery Shopping Vocabulary',
    description: 'Learn container + food phrases with visuals',
    type: 'visual-vocabulary',
    visualContent: module5VisualVocab1,
    isCompleted: false,
    duration: '5 min',
  },
  // 11
  {
    id: 'm5-visual-match-1',
    title: 'Grocery Shopping Matching',
    description: 'Match visuals with vocabulary phrases',
    type: 'visual-matching',
    visualContent: module5VisualVocab1,
    isCompleted: false,
    duration: '5 min',
  },
  // 12
  {
    id: 'm5-visual-vocab-2',
    title: 'Grocery Shopping Vocabulary 2',
    description: 'Learn plural container phrases with visuals',
    type: 'visual-vocabulary',
    visualContent: module5VisualVocab2,
    isCompleted: false,
    duration: '5 min',
  },
  // 13
  {
    id: 'm5-visual-match-2',
    title: 'Grocery Shopping Matching 2',
    description: 'Match plural visuals with vocabulary phrases',
    type: 'visual-matching',
    visualContent: module5VisualVocab2,
    isCompleted: false,
    duration: '5 min',
  },
  // 14
  {
    id: 'm5-vegetable-omelet',
    title: 'Vegetable Omelet',
    description: "Watch Fatima make a vegetable omelet",
    type: 'video-series',
    videos: fatimaOmeletVideos,
    isCompleted: false,
    duration: '10 min',
  },
  // 15
  {
    id: 'm5-vocab-4',
    title: 'Vocabulary Part 4',
    description: 'Learn kitchen items',
    type: 'vocabulary',
    content: module5Vocabulary4,
    isCompleted: false,
    duration: '5 min',
  },
  // 16
  {
    id: 'm5-vocab-match-4',
    title: 'Vocabulary Matching 4',
    description: 'Match kitchen items with translations',
    type: 'vocabulary-matching',
    content: module5Vocabulary4,
    isCompleted: false,
    duration: '5 min',
  },
];
