// Module 4 - Health Problems Content Data
// Main characters: Saojin (Nurse) and Fatima (Home Health Aide)
// Supporting: Rosa (gets sick), Marisol (at pharmacy)

import { VocabularyItem, SupportedLanguage, PhraseItem } from './module1Data';

// ============================================
// VOCABULARY 1 - BODY PARTS - HEAD & FACE
// ============================================
export const module4Vocabulary1: VocabularyItem[] = [
  { id: 'm4-head', english: 'head', pronunciation: 'hed', translations: { arabic: 'رأس', bengali: 'মাথা', chinese: '头', hebrew: 'ראש', korean: '머리', spanish: 'cabeza', turkish: 'baş' } },
  { id: 'm4-eye', english: 'eye', pronunciation: 'ay', translations: { arabic: 'عين', bengali: 'চোখ', chinese: '眼睛', hebrew: 'עין', korean: '눈', spanish: 'ojo', turkish: 'göz' } },
  { id: 'm4-ear', english: 'ear', pronunciation: 'iir', translations: { arabic: 'أذن', bengali: 'কান', chinese: '耳朵', hebrew: 'אוזן', korean: '귀', spanish: 'oreja', turkish: 'kulak' } },
  { id: 'm4-nose', english: 'nose', pronunciation: 'nowz', translations: { arabic: 'أنف', bengali: 'নাক', chinese: '鼻子', hebrew: 'אף', korean: '코', spanish: 'nariz', turkish: 'burun' } },
  { id: 'm4-mouth', english: 'mouth', pronunciation: 'mauth', translations: { arabic: 'فم', bengali: 'মুখ', chinese: '嘴', hebrew: 'פה', korean: '입', spanish: 'boca', turkish: 'ağız' } },
  { id: 'm4-tooth', english: 'tooth', pronunciation: 'tuuth', translations: { arabic: 'سن', bengali: 'দাঁত', chinese: '牙齿', hebrew: 'שן', korean: '이', spanish: 'diente', turkish: 'diş' } },
  { id: 'm4-throat', english: 'throat', pronunciation: 'throwt', translations: { arabic: 'حلق', bengali: 'গলা', chinese: '喉咙', hebrew: 'גרון', korean: '목', spanish: 'garganta', turkish: 'boğaz' } },
];

// ============================================
// VOCABULARY 2 - BODY PARTS - ARMS, LEGS, BODY
// ============================================
export const module4Vocabulary2: VocabularyItem[] = [
  { id: 'm4-neck', english: 'neck', pronunciation: 'nek', translations: { arabic: 'رقبة', bengali: 'ঘাড়', chinese: '脖子', hebrew: 'צוואר', korean: '목', spanish: 'cuello', turkish: 'boyun' } },
  { id: 'm4-shoulder', english: 'shoulder', pronunciation: 'SHOWL-der', translations: { arabic: 'كتف', bengali: 'কাঁধ', chinese: '肩膀', hebrew: 'כתף', korean: '어깨', spanish: 'hombro', turkish: 'omuz' } },
  { id: 'm4-arm', english: 'arm', pronunciation: 'aarm', translations: { arabic: 'ذراع', bengali: 'বাহু', chinese: '手臂', hebrew: 'זרוע', korean: '팔', spanish: 'brazo', turkish: 'kol' } },
  { id: 'm4-hand', english: 'hand', pronunciation: 'hand', translations: { arabic: 'يد', bengali: 'হাত', chinese: '手', hebrew: 'יד', korean: '손', spanish: 'mano', turkish: 'el' } },
  { id: 'm4-chest', english: 'chest', pronunciation: 'chest', translations: { arabic: 'صدر', bengali: 'বুক', chinese: '胸', hebrew: 'חזה', korean: '가슴', spanish: 'pecho', turkish: 'göğüs' } },
  { id: 'm4-stomach', english: 'stomach', pronunciation: 'STUM-ak', translations: { arabic: 'معدة', bengali: 'পেট', chinese: '胃', hebrew: 'בטן', korean: '위', spanish: 'estómago', turkish: 'mide' } },
  { id: 'm4-back', english: 'back', pronunciation: 'bak', translations: { arabic: 'ظهر', bengali: 'পিঠ', chinese: '背', hebrew: 'גב', korean: '등', spanish: 'espalda', turkish: 'sırt' } },
  { id: 'm4-leg', english: 'leg', pronunciation: 'leg', translations: { arabic: 'ساق', bengali: 'পা', chinese: '腿', hebrew: 'רגל', korean: '다리', spanish: 'pierna', turkish: 'bacak' } },
  { id: 'm4-knee', english: 'knee', pronunciation: 'nii', translations: { arabic: 'ركبة', bengali: 'হাঁটু', chinese: '膝盖', hebrew: 'ברך', korean: '무릎', spanish: 'rodilla', turkish: 'diz' } },
  { id: 'm4-foot', english: 'foot', pronunciation: 'fuut', translations: { arabic: 'قدم', bengali: 'পা', chinese: '脚', hebrew: 'כף רגל', korean: '발', spanish: 'pie', turkish: 'ayak' } },
];

// ============================================
// VOCABULARY 3 - SYMPTOMS
// ============================================
export const module4Vocabulary3: VocabularyItem[] = [
  { id: 'm4-pain', english: 'pain', pronunciation: 'peyn', translations: { arabic: 'ألم', bengali: 'ব্যথা', chinese: '疼痛', hebrew: 'כאב', korean: '통증', spanish: 'dolor', turkish: 'ağrı' } },
  { id: 'm4-sick', english: 'sick', pronunciation: 'sik', translations: { arabic: 'مريض', bengali: 'অসুস্থ', chinese: '生病', hebrew: 'חולה', korean: '아픈', spanish: 'enfermo', turkish: 'hasta' } },
  { id: 'm4-fever', english: 'fever', pronunciation: 'FII-ver', translations: { arabic: 'حمى', bengali: 'জ্বর', chinese: '发烧', hebrew: 'חום', korean: '열', spanish: 'fiebre', turkish: 'ateş' } },
  { id: 'm4-cough', english: 'cough', pronunciation: 'kof', translations: { arabic: 'سعال', bengali: 'কাশি', chinese: '咳嗽', hebrew: 'שיעול', korean: '기침', spanish: 'tos', turkish: 'öksürük' } },
  { id: 'm4-cold', english: 'cold', pronunciation: 'kowld', translations: { arabic: 'برد', bengali: 'ঠান্ডা', chinese: '感冒', hebrew: 'הצטננות', korean: '감기', spanish: 'resfriado', turkish: 'soğuk algınlığı' } },
  { id: 'm4-headache', english: 'headache', pronunciation: 'HED-eyk', translations: { arabic: 'صداع', bengali: 'মাথা ব্যথা', chinese: '头痛', hebrew: 'כאב ראש', korean: '두통', spanish: 'dolor de cabeza', turkish: 'baş ağrısı' } },
  { id: 'm4-stomachache', english: 'stomachache', pronunciation: 'STUM-ak-eyk', translations: { arabic: 'ألم معدة', bengali: 'পেট ব্যথা', chinese: '胃痛', hebrew: 'כאב בטן', korean: '복통', spanish: 'dolor de estómago', turkish: 'mide ağrısı' } },
  { id: 'm4-toothache', english: 'toothache', pronunciation: 'TUUTH-eyk', translations: { arabic: 'ألم أسنان', bengali: 'দাঁত ব্যথা', chinese: '牙痛', hebrew: 'כאב שיניים', korean: '치통', spanish: 'dolor de muelas', turkish: 'diş ağrısı' } },
  { id: 'm4-sore-throat', english: 'sore throat', pronunciation: 'SORE throwt', translations: { arabic: 'التهاب حلق', bengali: 'গলা ব্যথা', chinese: '喉咙痛', hebrew: 'כאב גרון', korean: '목 아픔', spanish: 'dolor de garganta', turkish: 'boğaz ağrısı' } },
  { id: 'm4-tired', english: 'tired', pronunciation: 'TAY-erd', translations: { arabic: 'متعب', bengali: 'ক্লান্ত', chinese: '累', hebrew: 'עייף', korean: '피곤한', spanish: 'cansado', turkish: 'yorgun' } },
  { id: 'm4-dizzy', english: 'dizzy', pronunciation: 'DIH-zii', translations: { arabic: 'دوار', bengali: 'মাথা ঘোরা', chinese: '头晕', hebrew: 'סחרחורת', korean: '어지러운', spanish: 'mareado', turkish: 'baş dönmesi' } },
];

// ============================================
// VOCABULARY 4 - MEDICAL PLACES & PEOPLE
// ============================================
export const module4Vocabulary4: VocabularyItem[] = [
  { id: 'm4-doctor', english: 'doctor', pronunciation: 'DOK-ter', translations: { arabic: 'طبيب', bengali: 'ডাক্তার', chinese: '医生', hebrew: 'רופא', korean: '의사', spanish: 'doctor', turkish: 'doktor' } },
  { id: 'm4-nurse', english: 'nurse', pronunciation: 'nörs', translations: { arabic: 'ممرضة', bengali: 'নার্স', chinese: '护士', hebrew: 'אחות', korean: '간호사', spanish: 'enfermera', turkish: 'hemşire' } },
  { id: 'm4-patient', english: 'patient', pronunciation: 'PEY-shent', translations: { arabic: 'مريض', bengali: 'রোগী', chinese: '病人', hebrew: 'חולה', korean: '환자', spanish: 'paciente', turkish: 'hasta' } },
  { id: 'm4-hospital', english: 'hospital', pronunciation: 'HOS-pi-tal', translations: { arabic: 'مستشفى', bengali: 'হাসপাতাল', chinese: '医院', hebrew: 'בית חולים', korean: '병원', spanish: 'hospital', turkish: 'hastane' } },
  { id: 'm4-clinic', english: 'clinic', pronunciation: 'KLI-nik', translations: { arabic: 'عيادة', bengali: 'ক্লিনিক', chinese: '诊所', hebrew: 'מרפאה', korean: '진료소', spanish: 'clínica', turkish: 'klinik' } },
  { id: 'm4-pharmacy', english: 'pharmacy', pronunciation: 'FAR-ma-sii', translations: { arabic: 'صيدلية', bengali: 'ফার্মেসি', chinese: '药店', hebrew: 'בית מרקחת', korean: '약국', spanish: 'farmacia', turkish: 'eczane' } },
  { id: 'm4-medicine', english: 'medicine', pronunciation: 'MED-i-sin', translations: { arabic: 'دواء', bengali: 'ঔষধ', chinese: '药', hebrew: 'תרופה', korean: '약', spanish: 'medicina', turkish: 'ilaç' } },
  { id: 'm4-prescription', english: 'prescription', pronunciation: 'pri-SKRIP-shen', translations: { arabic: 'وصفة طبية', bengali: 'প্রেসক্রিপশন', chinese: '处方', hebrew: 'מרשם', korean: '처방전', spanish: 'receta', turkish: 'reçete' } },
  { id: 'm4-appointment', english: 'appointment', pronunciation: 'a-POYNT-ment', translations: { arabic: 'موعد', bengali: 'অ্যাপয়েন্টমেন্ট', chinese: '预约', hebrew: 'תור', korean: '예약', spanish: 'cita', turkish: 'randevu' } },
  { id: 'm4-emergency', english: 'emergency', pronunciation: 'i-MER-jen-sii', translations: { arabic: 'طوارئ', bengali: 'জরুরি', chinese: '紧急', hebrew: 'חירום', korean: '응급', spanish: 'emergencia', turkish: 'acil' } },
  { id: 'm4-ambulance', english: 'ambulance', pronunciation: 'AM-byoo-lens', translations: { arabic: 'سيارة إسعاف', bengali: 'অ্যাম্বুলেন্স', chinese: '救护车', hebrew: 'אמבולנס', korean: '구급차', spanish: 'ambulancia', turkish: 'ambulans' } },
];

// ============================================
// KEY PHRASES - Health
// ============================================
export const module4Phrases: PhraseItem[] = [
  { id: 'm4-p1', english: 'I am sick.', pronunciation: 'ay am sik', translations: { arabic: 'أنا مريض', bengali: 'আমি অসুস্থ', chinese: '我生病了', hebrew: 'אני חולה', korean: '저는 아파요', spanish: 'Estoy enfermo', turkish: 'Ben hastayım' } },
  { id: 'm4-p2', english: 'I have a headache.', pronunciation: 'ay hav a HED-eyk', translations: { arabic: 'عندي صداع', bengali: 'আমার মাথা ব্যথা', chinese: '我头痛', hebrew: 'יש לי כאב ראש', korean: '머리가 아파요', spanish: 'Tengo dolor de cabeza', turkish: 'Başım ağrıyor' } },
  { id: 'm4-p3', english: 'My stomach hurts.', pronunciation: 'may STUM-ak hörts', translations: { arabic: 'معدتي تؤلمني', bengali: 'আমার পেট ব্যথা করছে', chinese: '我的胃疼', hebrew: 'הבטן שלי כואבת', korean: '배가 아파요', spanish: 'Me duele el estómago', turkish: 'Midem ağrıyor' } },
  { id: 'm4-p4', english: 'I need a doctor.', pronunciation: 'ay niid a DOK-ter', translations: { arabic: 'أحتاج طبيباً', bengali: 'আমার ডাক্তার দরকার', chinese: '我需要医生', hebrew: 'אני צריך רופא', korean: '의사가 필요해요', spanish: 'Necesito un doctor', turkish: 'Doktora ihtiyacım var' } },
  { id: 'm4-p5', english: 'I have an appointment.', pronunciation: 'ay hav an a-POYNT-ment', translations: { arabic: 'لدي موعد', bengali: 'আমার অ্যাপয়েন্টমেন্ট আছে', chinese: '我有预约', hebrew: 'יש לי תור', korean: '예약이 있어요', spanish: 'Tengo una cita', turkish: 'Randevum var' } },
  { id: 'm4-p6', english: "I don't feel well.", pronunciation: 'ay dont fiil wel', translations: { arabic: 'لا أشعر بخير', bengali: 'আমি ভালো বোধ করছি না', chinese: '我感觉不好', hebrew: 'אני לא מרגיש טוב', korean: '몸이 안 좋아요', spanish: 'No me siento bien', turkish: 'Kendimi iyi hissetmiyorum' } },
  { id: 'm4-p7', english: 'Call 911!', pronunciation: 'kol nayn-wan-wan', translations: { arabic: 'اتصل بـ 911!', bengali: '911 কল করুন!', chinese: '拨打911！', hebrew: 'תתקשר ל-911!', korean: '911에 전화하세요!', spanish: '¡Llame al 911!', turkish: '911\'i ara!' } },
];

// ============================================
// VIDEO SERIES - For Nihan to record in Canva
// All videos go in /public/videos/module4/
// ============================================

export const saojinBodyPartsVideos = [
  { url: '/videos/module4/saojin-body-1.mp4', title: 'Head and Face', subtitle: 'Head, eyes, nose, mouth' },
  { url: '/videos/module4/saojin-body-2.mp4', title: 'Upper Body', subtitle: 'Shoulder, arm, hand, chest' },
  { url: '/videos/module4/saojin-body-3.mp4', title: 'Lower Body', subtitle: 'Stomach, back, leg, foot' },
];

export const rosaSymptomsVideos = [
  { url: '/videos/module4/rosa-sick-1.mp4', title: 'Rosa feels sick', subtitle: 'Listen and understand' },
  { url: '/videos/module4/rosa-sick-2.mp4', title: 'Rosa calls the clinic', subtitle: 'Making an appointment' },
];

export const fatimaClinicVideos = [
  { url: '/videos/module4/fatima-clinic-1.mp4', title: 'At the Reception', subtitle: 'Do you have an appointment?' },
  { url: '/videos/module4/fatima-clinic-2.mp4', title: 'With the Nurse', subtitle: 'Taking vital signs' },
  { url: '/videos/module4/fatima-clinic-3.mp4', title: 'With the Doctor', subtitle: 'Describing symptoms' },
];

export const marisolPharmacyVideos = [
  { url: '/videos/module4/marisol-pharm-1.mp4', title: 'Picking up medicine', subtitle: 'Prescription pickup' },
  { url: '/videos/module4/marisol-pharm-2.mp4', title: 'Asking about side effects', subtitle: 'Important questions' },
];

// ============================================
// QUIZ QUESTIONS - Multiple Choice
// ============================================
export const module4QuizQuestions = [
  {
    id: 'm4-q1',
    question: 'What do you say when you have pain in your head?',
    options: ['I have a stomachache', 'I have a headache', 'I have a sore throat', 'I am tired'],
    correctAnswer: 1,
    translations: { 
      turkish: 'Başın ağrıdığında ne dersin?',
      spanish: '¿Qué dices cuando te duele la cabeza?',
      arabic: 'ماذا تقول عندما يؤلم رأسك؟',
      chinese: '头痛时你说什么？',
      korean: '머리가 아플 때 뭐라고 하나요?',
      bengali: 'মাথা ব্যথা হলে কি বলবেন?',
      hebrew: 'מה אומרים כשכואב ראש?',
    },
  },
  {
    id: 'm4-q2',
    question: 'Where do you go to buy medicine?',
    options: ['Hospital', 'Pharmacy', 'Clinic', 'School'],
    correctAnswer: 1,
    translations: { 
      turkish: 'İlaç almak için nereye gidersin?',
      spanish: '¿A dónde vas a comprar medicina?',
      arabic: 'إلى أين تذهب لشراء الدواء؟',
      chinese: '去哪里买药？',
      korean: '약을 사러 어디 가요?',
      bengali: 'ঔষধ কিনতে কোথায় যান?',
      hebrew: 'לאן הולכים לקנות תרופות?',
    },
  },
  {
    id: 'm4-q3',
    question: 'What emergency number do you call in America?',
    options: ['112', '911', '119', '100'],
    correctAnswer: 1,
    translations: { 
      turkish: 'Amerika\'da acil numara nedir?',
      spanish: '¿Qué número de emergencia llamas en EE.UU.?',
      arabic: 'ما رقم الطوارئ في أمريكا؟',
      chinese: '在美国紧急电话是多少？',
      korean: '미국에서 응급 번호는 무엇인가요?',
      bengali: 'আমেরিকায় জরুরি নম্বর কি?',
      hebrew: 'מה מספר החירום באמריקה?',
    },
  },
  {
    id: 'm4-q4',
    question: 'What is a "prescription"?',
    options: ['A sickness', 'A doctor', 'A note from the doctor for medicine', 'A bandage'],
    correctAnswer: 2,
    translations: { 
      turkish: '"Prescription" nedir?',
      spanish: '¿Qué es una "prescription"?',
      arabic: 'ما هو "prescription"؟',
      chinese: '什么是"prescription"？',
      korean: '"Prescription"이 무엇인가요?',
      bengali: '"Prescription" কি?',
      hebrew: 'מה זה "prescription"?',
    },
  },
  {
    id: 'm4-q5',
    question: 'Fatima says "I don\'t feel well." What does she mean?',
    options: ['She is happy', 'She is sick', 'She is hungry', 'She is tired'],
    correctAnswer: 1,
    translations: { 
      turkish: 'Fatima "I don\'t feel well" diyor. Ne demek?',
      spanish: 'Fátima dice "I don\'t feel well". ¿Qué significa?',
      arabic: 'فاطمة تقول "I don\'t feel well". ماذا تعني؟',
      chinese: 'Fatima说"I don\'t feel well"。是什么意思？',
      korean: 'Fatima가 "I don\'t feel well"이라고 해요. 무슨 뜻인가요?',
      bengali: 'Fatima বলছেন "I don\'t feel well"। মানে কি?',
      hebrew: 'פאטימה אומרת "I don\'t feel well". מה המשמעות?',
    },
  },
];

// ============================================
// MATCHING QUIZ - Symptom to Body Part
// ============================================
export const module4MatchingPairs = [
  { id: 'mp1', question: 'headache', answer: 'head' },
  { id: 'mp2', question: 'stomachache', answer: 'stomach' },
  { id: 'mp3', question: 'toothache', answer: 'tooth' },
  { id: 'mp4', question: 'sore throat', answer: 'throat' },
  { id: 'mp5', question: 'backache', answer: 'back' },
  { id: 'mp6', question: 'earache', answer: 'ear' },
];

// ============================================
// FILL IN THE BLANK
// ============================================
export const module4FillInBlankItems = [
  {
    id: 'm4-fib1',
    sentenceBefore: 'I have a ',
    sentenceAfter: ' and I need to see a doctor.',
    correctAnswers: ['fever', 'headache', 'cold'],
    translations: {
      turkish: 'Bir ___ var ve doktora görünmem gerek.',
      spanish: 'Tengo ___ y necesito ver al doctor.',
      arabic: 'عندي ___ وأحتاج لرؤية الطبيب.',
      chinese: '我有___，需要看医生。',
      korean: '저는 ___이 있고 의사를 만나야 해요.',
      bengali: 'আমার ___ আছে এবং ডাক্তার দরকার।',
      hebrew: 'יש לי ___ ואני צריך לראות רופא.',
    }
  },
  {
    id: 'm4-fib2',
    sentenceBefore: 'Where is the ',
    sentenceAfter: '? I need medicine.',
    correctAnswers: ['pharmacy'],
    translations: {
      turkish: '___ nerede? İlaca ihtiyacım var.',
      spanish: '¿Dónde está la ___? Necesito medicina.',
      arabic: 'أين ___؟ أحتاج دواء.',
      chinese: '___在哪里？我需要药。',
      korean: '___이 어디예요? 약이 필요해요.',
      bengali: '___ কোথায়? ঔষধ দরকার।',
      hebrew: 'איפה ה___? אני צריך תרופה.',
    }
  },
  {
    id: 'm4-fib3',
    sentenceBefore: 'In an emergency, call ',
    sentenceAfter: '!',
    correctAnswers: ['911'],
    translations: {
      turkish: 'Acil durumda ___ ara!',
      spanish: '¡En emergencia, llame al ___!',
      arabic: 'في حالة الطوارئ، اتصل بـ ___!',
      chinese: '紧急情况拨打___！',
      korean: '응급 상황에는 ___에 전화하세요!',
      bengali: 'জরুরি অবস্থায় ___ কল করুন!',
      hebrew: 'במקרה חירום תתקשר ל-___!',
    }
  },
  {
    id: 'm4-fib4',
    sentenceBefore: 'I have an ',
    sentenceAfter: ' at 10 AM.',
    correctAnswers: ['appointment'],
    translations: {
      turkish: 'Sabah 10\'da ___ var.',
      spanish: 'Tengo una ___ a las 10 AM.',
      arabic: 'لدي ___ في الساعة 10 صباحاً.',
      chinese: '我上午10点有___。',
      korean: '오전 10시에 ___이 있어요.',
      bengali: 'সকাল 10টায় আমার ___ আছে।',
      hebrew: 'יש לי ___ בשעה 10 בבוקר.',
    }
  },
];

// ============================================
// WORD ORDER PRACTICE
// ============================================
export const module4WordOrderSlides = [
  {
    url: '/videos/module4/build-1.mp4',
    title: 'Describing a Headache',
    subtitle: 'Listen and build the sentence',
    correctSentence: 'I have a headache',
    jumbledWords: ['headache', 'I', 'have', 'a'],
    translations: {
      turkish: 'Başım ağrıyor',
      spanish: 'Tengo dolor de cabeza',
      arabic: 'عندي صداع',
      chinese: '我头痛',
      korean: '머리가 아파요',
      bengali: 'আমার মাথা ব্যথা',
      hebrew: 'יש לי כאב ראש',
    }
  },
  {
    url: '/videos/module4/build-2.mp4',
    title: 'Stomach Pain',
    subtitle: 'Listen and build the sentence',
    correctSentence: 'My stomach hurts',
    jumbledWords: ['hurts', 'My', 'stomach'],
    translations: {
      turkish: 'Midem ağrıyor',
      spanish: 'Me duele el estómago',
      arabic: 'معدتي تؤلمني',
      chinese: '我的胃疼',
      korean: '배가 아파요',
      bengali: 'আমার পেট ব্যথা',
      hebrew: 'הבטן שלי כואבת',
    }
  },
  {
    url: '/videos/module4/build-3.mp4',
    title: 'Need a Doctor',
    subtitle: 'Listen and build the sentence',
    correctSentence: 'I need a doctor',
    jumbledWords: ['doctor', 'I', 'need', 'a'],
    translations: {
      turkish: 'Doktora ihtiyacım var',
      spanish: 'Necesito un doctor',
      arabic: 'أحتاج طبيباً',
      chinese: '我需要医生',
      korean: '의사가 필요해요',
      bengali: 'আমার ডাক্তার দরকার',
      hebrew: 'אני צריך רופא',
    }
  },
  {
    url: '/videos/module4/build-4.mp4',
    title: 'Making an Appointment',
    subtitle: 'Listen and build the sentence',
    correctSentence: 'I have an appointment at 10',
    jumbledWords: ['appointment', 'I', 'have', 'at', '10', 'an'],
    translations: {
      turkish: 'Saat 10\'da randevum var',
      spanish: 'Tengo una cita a las 10',
      arabic: 'لدي موعد في الساعة 10',
      chinese: '我10点有预约',
      korean: '10시에 예약이 있어요',
      bengali: 'সকাল 10টায় আমার অ্যাপয়েন্টমেন্ট',
      hebrew: 'יש לי תור בשעה 10',
    }
  },
];

// ============================================
// MODULE 4 LESSONS
// ============================================
export interface Module4Lesson {
  id: string;
  title: string;
  description: string;
  type: 'vocabulary' | 'vocabulary-matching' | 'video-series' | 'phrases' | 'quiz' | 'word-order' | 'fill-in-blank' | 'matching' | 'speaking-test' | 'interactive-form' | 'module-checklist';
  content?: VocabularyItem[];
  phrases?: PhraseItem[];
  videos?: { url: string; title: string; subtitle?: string }[];
  isCompleted: boolean;
  duration?: string;
}

export const module4Lessons: Module4Lesson[] = [
  {
    id: 'm4-lesson-1',
    title: 'Body Parts - Head & Face',
    description: 'Learn: head, eyes, nose, mouth, ears',
    type: 'vocabulary',
    content: module4Vocabulary1,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm4-lesson-1b',
    title: 'Body Parts - Matching',
    description: 'Match body part words with translations',
    type: 'vocabulary-matching',
    content: module4Vocabulary1,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm4-lesson-2',
    title: 'Body Parts - Arms, Legs, Body',
    description: 'Learn: shoulder, arm, hand, stomach, back, leg',
    type: 'vocabulary',
    content: module4Vocabulary2,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm4-lesson-2b',
    title: 'Body Parts - Matching 2',
    description: 'Match arm, leg, body part words',
    type: 'vocabulary-matching',
    content: module4Vocabulary2,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm4-lesson-3',
    title: 'Learn with Saojin (Nurse) - Video',
    description: 'Watch Saojin teach body parts',
    type: 'video-series',
    videos: saojinBodyPartsVideos,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-4',
    title: 'Symptoms - How Do You Feel?',
    description: 'Pain, fever, cough, headache, tired',
    type: 'vocabulary',
    content: module4Vocabulary3,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-4b',
    title: 'Match Symptoms to Body Parts',
    description: 'headache → head, stomachache → stomach',
    type: 'matching',
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm4-lesson-5',
    title: 'Essential Health Phrases',
    description: '"I have a...", "I need a doctor", "Call 911"',
    type: 'phrases',
    phrases: module4Phrases,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-6',
    title: 'Build Sentences About Pain',
    description: 'Put words in the right order',
    type: 'word-order',
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-7',
    title: 'Rosa Gets Sick - Video Story',
    description: 'Watch Rosa describe her symptoms. Saojin helps!',
    type: 'video-series',
    videos: rosaSymptomsVideos,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm4-lesson-8',
    title: 'Medical Places & People',
    description: 'Doctor, nurse, hospital, pharmacy, prescription',
    type: 'vocabulary',
    content: module4Vocabulary4,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-9',
    title: 'At the Doctor - Video with Fatima',
    description: 'Watch Fatima go from reception to doctor visit',
    type: 'video-series',
    videos: fatimaClinicVideos,
    isCompleted: false,
    duration: '12 min',
  },
  {
    id: 'm4-lesson-10',
    title: 'Fill in the Blanks - Health',
    description: 'Complete the health dialogues',
    type: 'fill-in-blank',
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-11',
    title: 'At the Pharmacy - Video',
    description: 'Watch Marisol pick up medicine',
    type: 'video-series',
    videos: marisolPharmacyVideos,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm4-lesson-12',
    title: 'Health Quiz',
    description: 'Test what you learned',
    type: 'quiz',
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-13',
    title: 'Speaking Practice - Describe Symptoms',
    description: 'Practice saying "I have a..."',
    type: 'speaking-test',
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-14',
    title: 'Module 4 Complete!',
    description: 'Celebrate your progress',
    type: 'module-checklist',
    isCompleted: false,
    duration: '5 min',
  },
];

// ============================================
// VIDEO SCRIPTS FOR NIHAN (Canva Production Guide)
// ============================================
// These are the scripts Nihan will use to record videos in Canva.
// Each video features characters consistent with other modules.

export const videoScripts = {
  'saojin-body-1': {
    title: 'Saojin teaches: Head and Face',
    duration: '30-40 seconds',
    setting: 'Saojin in nurse uniform at the clinic, pointing to body parts',
    script: `Saojin (slowly, clearly):
"Hello! I'm Saojin. I'm a nurse.
Today we learn body parts.

This is my head. [points to head]
These are my eyes. [points to eyes]
This is my nose. [points to nose]
This is my mouth. [points to mouth]
These are my ears. [points to ears]

Head, eyes, nose, mouth, ears.
Let's say it together!"`,
    learningPoints: ['head', 'eyes', 'nose', 'mouth', 'ears'],
  },
  'saojin-body-2': {
    title: 'Saojin teaches: Upper Body',
    duration: '30-40 seconds',
    setting: 'Same setting as saojin-body-1',
    script: `Saojin:
"Now, the upper body.

This is my neck. [points]
These are my shoulders. [points]
This is my arm. [raises arm]
This is my hand. [shows hand]
This is my chest. [gestures]

Neck, shoulders, arm, hand, chest.
Great job!"`,
    learningPoints: ['neck', 'shoulders', 'arm', 'hand', 'chest'],
  },
  'saojin-body-3': {
    title: 'Saojin teaches: Lower Body',
    duration: '30-40 seconds',
    setting: 'Same setting as before',
    script: `Saojin:
"Now, the lower body.

This is my stomach. [points]
This is my back. [turns to show back]
This is my leg. [points to leg]
This is my knee. [touches knee]
This is my foot. [shows foot]

Stomach, back, leg, knee, foot.
Well done!"`,
    learningPoints: ['stomach', 'back', 'leg', 'knee', 'foot'],
  },
  'rosa-sick-1': {
    title: 'Rosa is sick',
    duration: '45-60 seconds',
    setting: 'Rosa knocks on Saojin\'s apartment door (Apt 1B). Rosa looks tired.',
    script: `Rosa (weak voice): "Saojin... I don't feel well."
Saojin: "Oh no! What's wrong?"
Rosa: "I have a headache. And a fever."
Saojin: "Let me check. [touches forehead] You are hot!"
Saojin: "Come in. Sit down."`,
    learningPoints: ["I don't feel well", "I have a headache", "I have a fever"],
  },
  'rosa-sick-2': {
    title: 'Rosa calls the clinic',
    duration: '30-45 seconds',
    setting: 'Rosa sitting on couch, phone to ear. Saojin nearby.',
    script: `Rosa: "Hello, I need to make an appointment."
Receptionist (voice): "What's wrong?"
Rosa: "I have a headache and fever."
Receptionist: "Can you come tomorrow at 10?"
Rosa: "Yes, thank you!"
Saojin: "Good. Now, rest."`,
    learningPoints: ['Make an appointment', 'Can you come tomorrow', 'Thank you'],
  },
  'fatima-clinic-1': {
    title: 'Fatima at reception',
    duration: '30-40 seconds',
    setting: 'Clinic reception desk',
    script: `Fatima: "Good morning."
Receptionist: "Good morning. Do you have an appointment?"
Fatima: "Yes, I have an appointment at 10."
Receptionist: "Your name, please?"
Fatima: "Fatima Hassan. F-A-T-I-M-A."
Receptionist: "Yes, I see it. Please sit down. The doctor will call you."
Fatima: "Thank you."`,
    learningPoints: ['I have an appointment at [time]', 'Spelling your name', 'Please sit down'],
  },
  'fatima-clinic-2': {
    title: 'Fatima with the nurse',
    duration: '40-50 seconds',
    setting: 'Nurse\'s station. Saojin is the nurse.',
    script: `Saojin: "Hi Fatima. I'm Saojin. I'll take your vital signs."
Saojin: "Please step on the scale."
Saojin: "Now let me take your temperature."
Saojin: "Open your mouth. [uses thermometer]"
Saojin: "Your temperature is 99. A little high."
Saojin: "Follow me. The doctor is ready."`,
    learningPoints: ['Vital signs', 'Step on the scale', 'Temperature', 'Follow me'],
  },
  'fatima-clinic-3': {
    title: 'Fatima with the doctor',
    duration: '50-60 seconds',
    setting: 'Doctor\'s office',
    script: `Doctor: "Hi Fatima. How can I help you today?"
Fatima: "I have a stomachache. And I am tired."
Doctor: "For how long?"
Fatima: "Three days."
Doctor: "Any fever?"
Fatima: "A little."
Doctor: "I'll give you a prescription. Take this medicine twice a day."
Doctor: "Drink lots of water. Rest for two days."
Fatima: "Thank you, doctor."`,
    learningPoints: ['How can I help you?', 'For how long?', 'Prescription', 'Twice a day'],
  },
  'marisol-pharm-1': {
    title: 'Marisol picks up medicine',
    duration: '30-40 seconds',
    setting: 'Pharmacy counter',
    script: `Marisol: "Hi. I need to pick up a prescription."
Pharmacist: "Your name, please?"
Marisol: "Marisol Rivera. R-I-V-E-R-A."
Pharmacist: "Date of birth?"
Marisol: "March 15, 1985."
Pharmacist: "Here you go. Take one pill twice a day with food."
Marisol: "Thank you!"`,
    learningPoints: ['Pick up a prescription', 'Date of birth', 'Twice a day with food'],
  },
  'marisol-pharm-2': {
    title: 'Marisol asks about side effects',
    duration: '30-40 seconds',
    setting: 'Pharmacy counter',
    script: `Marisol: "Are there any side effects?"
Pharmacist: "It may make you sleepy. Don't drive."
Marisol: "Can I take it with food?"
Pharmacist: "Yes, it's better with food."
Marisol: "Thank you for your help!"`,
    learningPoints: ['Side effects', 'May make you sleepy', "Don't drive", 'With food'],
  },
  'build-1': {
    title: 'Build: I have a headache',
    duration: '15-20 seconds',
    setting: 'Saojin speaking directly to camera',
    script: `Saojin: "Listen carefully. Then build the sentence."
[Pause 1 second]
Saojin (slowly): "I... have... a... headache."
[Pause]
Saojin: "I have a headache."`,
  },
  'build-2': {
    title: 'Build: My stomach hurts',
    duration: '15-20 seconds',
    script: `Saojin: "Listen and build."
Saojin (slowly): "My... stomach... hurts."
Saojin: "My stomach hurts."`,
  },
  'build-3': {
    title: 'Build: I need a doctor',
    duration: '15-20 seconds',
    script: `Saojin: "Listen and build."
Saojin (slowly): "I... need... a... doctor."
Saojin: "I need a doctor."`,
  },
  'build-4': {
    title: 'Build: I have an appointment at 10',
    duration: '20-25 seconds',
    script: `Saojin: "Listen and build."
Saojin (slowly): "I... have... an... appointment... at... ten."
Saojin: "I have an appointment at 10."`,
  },
};
