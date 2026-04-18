// Module 4 - Health Problems Content Data
// Ana karakterler: Saojin (Nurse) ve Fatima (Home Health Aide)
// Diğer karakterler: Rosa, Marisol, Dmitry, Ahmet (hastalar olarak)

import { VocabularyItem, PhraseItem, QuestionItem, Lesson } from './module1Data';

// ============================================
// VOCABULARY 1 - BODY PARTS (Vücut Bölümleri)
// ============================================
export const module4Vocabulary1: VocabularyItem[] = [
  { id: 'm4-head', english: 'head', pronunciation: 'hed', translations: { arabic: 'رأس', bengali: 'মাথা', chinese: '头', hebrew: 'ראש', korean: '머리', spanish: 'cabeza', turkish: 'baş' } },
  { id: 'm4-eye', english: 'eye', pronunciation: 'ay', translations: { arabic: 'عين', bengali: 'চোখ', chinese: '眼睛', hebrew: 'עין', korean: '눈', spanish: 'ojo', turkish: 'göz' } },
  { id: 'm4-ear', english: 'ear', pronunciation: 'iir', translations: { arabic: 'أذن', bengali: 'কান', chinese: '耳朵', hebrew: 'אוזן', korean: '귀', spanish: 'oreja', turkish: 'kulak' } },
  { id: 'm4-nose', english: 'nose', pronunciation: 'nowz', translations: { arabic: 'أنف', bengali: 'নাক', chinese: '鼻子', hebrew: 'אף', korean: '코', spanish: 'nariz', turkish: 'burun' } },
  { id: 'm4-mouth', english: 'mouth', pronunciation: 'mauth', translations: { arabic: 'فم', bengali: 'মুখ', chinese: '嘴', hebrew: 'פה', korean: '입', spanish: 'boca', turkish: 'ağız' } },
  { id: 'm4-tooth', english: 'tooth', pronunciation: 'tuuth', translations: { arabic: 'سن', bengali: 'দাঁত', chinese: '牙齿', hebrew: 'שן', korean: '이', spanish: 'diente', turkish: 'diş' } },
  { id: 'm4-throat', english: 'throat', pronunciation: 'throwt', translations: { arabic: 'حلق', bengali: 'গলা', chinese: '喉咙', hebrew: 'גרון', korean: '목', spanish: 'garganta', turkish: 'boğaz' } },
  { id: 'm4-neck', english: 'neck', pronunciation: 'nek', translations: { arabic: 'رقبة', bengali: 'ঘাড়', chinese: '脖子', hebrew: 'צוואר', korean: '목', spanish: 'cuello', turkish: 'boyun' } },
  { id: 'm4-shoulder', english: 'shoulder', pronunciation: 'SHOWL-der', translations: { arabic: 'كتف', bengali: 'কাঁধ', chinese: '肩膀', hebrew: 'כתף', korean: '어깨', spanish: 'hombro', turkish: 'omuz' } },
  { id: 'm4-arm', english: 'arm', pronunciation: 'aarm', translations: { arabic: 'ذراع', bengali: 'বাহু', chinese: '手臂', hebrew: 'זרוע', korean: '팔', spanish: 'brazo', turkish: 'kol' } },
  { id: 'm4-hand', english: 'hand', pronunciation: 'hand', translations: { arabic: 'يد', bengali: 'হাত', chinese: '手', hebrew: 'יד', korean: '손', spanish: 'mano', turkish: 'el' } },
  { id: 'm4-finger', english: 'finger', pronunciation: 'FING-ger', translations: { arabic: 'إصبع', bengali: 'আঙুল', chinese: '手指', hebrew: 'אצבע', korean: '손가락', spanish: 'dedo', turkish: 'parmak' } },
  { id: 'm4-chest', english: 'chest', pronunciation: 'chest', translations: { arabic: 'صدر', bengali: 'বুক', chinese: '胸', hebrew: 'חזה', korean: '가슴', spanish: 'pecho', turkish: 'göğüs' } },
  { id: 'm4-stomach', english: 'stomach', pronunciation: 'STUM-ak', translations: { arabic: 'معدة', bengali: 'পেট', chinese: '胃', hebrew: 'בטן', korean: '위', spanish: 'estómago', turkish: 'mide' } },
  { id: 'm4-back', english: 'back', pronunciation: 'bak', translations: { arabic: 'ظهر', bengali: 'পিঠ', chinese: '背', hebrew: 'גב', korean: '등', spanish: 'espalda', turkish: 'sırt' } },
  { id: 'm4-leg', english: 'leg', pronunciation: 'leg', translations: { arabic: 'ساق', bengali: 'পা', chinese: '腿', hebrew: 'רגל', korean: '다리', spanish: 'pierna', turkish: 'bacak' } },
  { id: 'm4-knee', english: 'knee', pronunciation: 'nii', translations: { arabic: 'ركبة', bengali: 'হাঁটু', chinese: '膝盖', hebrew: 'ברך', korean: '무릎', spanish: 'rodilla', turkish: 'diz' } },
  { id: 'm4-foot', english: 'foot', pronunciation: 'fuut', translations: { arabic: 'قدم', bengali: 'পা', chinese: '脚', hebrew: 'כף רגל', korean: '발', spanish: 'pie', turkish: 'ayak' } },
];

// ============================================
// VOCABULARY 2 - SYMPTOMS (Belirtiler)
// ============================================
export const module4Vocabulary2: VocabularyItem[] = [
  { id: 'm4-pain', english: 'pain', pronunciation: 'peyn', translations: { arabic: 'ألم', bengali: 'ব্যথা', chinese: '疼痛', hebrew: 'כאב', korean: '통증', spanish: 'dolor', turkish: 'ağrı' } },
  { id: 'm4-hurt', english: 'hurt', pronunciation: 'hört', translations: { arabic: 'يؤلم', bengali: 'ব্যথা লাগা', chinese: '疼', hebrew: 'כואב', korean: '아프다', spanish: 'doler', turkish: 'acıtmak' } },
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
// VOCABULARY 3 - MEDICAL PLACES & PEOPLE
// ============================================
export const module4Vocabulary3: VocabularyItem[] = [
  { id: 'm4-doctor', english: 'doctor', pronunciation: 'DOK-ter', translations: { arabic: 'طبيب', bengali: 'ডাক্তার', chinese: '医生', hebrew: 'רופא', korean: '의사', spanish: 'doctor', turkish: 'doktor' } },
  { id: 'm4-nurse', english: 'nurse', pronunciation: 'nörs', translations: { arabic: 'ممرضة', bengali: 'নার্স', chinese: '护士', hebrew: 'אחות', korean: '간호사', spanish: 'enfermera', turkish: 'hemşire' } },
  { id: 'm4-patient', english: 'patient', pronunciation: 'PEY-shent', translations: { arabic: 'مريض', bengali: 'রোগী', chinese: '病人', hebrew: 'חולה', korean: '환자', spanish: 'paciente', turkish: 'hasta' } },
  { id: 'm4-hospital', english: 'hospital', pronunciation: 'HOS-pi-tal', translations: { arabic: 'مستشفى', bengali: 'হাসপাতাল', chinese: '医院', hebrew: 'בית חולים', korean: '병원', spanish: 'hospital', turkish: 'hastane' } },
  { id: 'm4-clinic', english: 'clinic', pronunciation: 'KLI-nik', translations: { arabic: 'عيادة', bengali: 'ক্লিনিক', chinese: '诊所', hebrew: 'מרפאה', korean: '진료소', spanish: 'clínica', turkish: 'klinik' } },
  { id: 'm4-pharmacy', english: 'pharmacy', pronunciation: 'FAR-ma-sii', translations: { arabic: 'صيدلية', bengali: 'ফার্মেসি', chinese: '药店', hebrew: 'בית מרקחת', korean: '약국', spanish: 'farmacia', turkish: 'eczane' } },
  { id: 'm4-medicine', english: 'medicine', pronunciation: 'MED-i-sin', translations: { arabic: 'دواء', bengali: 'ঔষধ', chinese: '药', hebrew: 'תרופה', korean: '약', spanish: 'medicina', turkish: 'ilaç' } },
  { id: 'm4-prescription', english: 'prescription', pronunciation: 'pri-SKRIP-shen', translations: { arabic: 'وصفة طبية', bengali: 'প্রেসক্রিপশন', chinese: '处方', hebrew: 'מרשם', korean: '처방전', spanish: 'receta', turkish: 'reçete' } },
  { id: 'm4-appointment', english: 'appointment', pronunciation: 'a-POYNT-ment', translations: { arabic: 'موعد', bengali: 'অ্যাপয়েন্টমেন্ট', chinese: '预约', hebrew: 'תור', korean: '예약', spanish: 'cita', turkish: 'randevu' } },
  { id: 'm4-insurance', english: 'insurance', pronunciation: 'in-SHUR-ens', translations: { arabic: 'تأمين', bengali: 'বীমা', chinese: '保险', hebrew: 'ביטוח', korean: '보험', spanish: 'seguro', turkish: 'sigorta' } },
  { id: 'm4-emergency', english: 'emergency', pronunciation: 'i-MER-jen-sii', translations: { arabic: 'طوارئ', bengali: 'জরুরি', chinese: '紧急', hebrew: 'חירום', korean: '응급', spanish: 'emergencia', turkish: 'acil' } },
  { id: 'm4-ambulance', english: 'ambulance', pronunciation: 'AM-byoo-lens', translations: { arabic: 'سيارة إسعاف', bengali: 'অ্যাম্বুলেন্স', chinese: '救护车', hebrew: 'אמבולנס', korean: '구급차', spanish: 'ambulancia', turkish: 'ambulans' } },
];

// ============================================
// VIDEO SERIES - Saojin explains body parts
// ============================================
export const saojinBodyPartsVideos = [
  { url: '/videos/module4/saojin-body-1.mp4', title: 'Head and Face', subtitle: 'Head, eyes, nose, mouth' },
  { url: '/videos/module4/saojin-body-2.mp4', title: 'Upper Body', subtitle: 'Shoulder, arm, hand, chest' },
  { url: '/videos/module4/saojin-body-3.mp4', title: 'Lower Body', subtitle: 'Stomach, back, leg, foot' },
];

// Rosa describes her symptoms - listening practice
export const rosaSymptomsVideos = [
  { url: '/videos/module4/rosa-sick-1.mp4', title: 'Rosa feels sick', subtitle: 'Listen and understand' },
  { url: '/videos/module4/rosa-sick-2.mp4', title: 'Rosa calls the clinic', subtitle: 'Making an appointment' },
];

// Fatima at the doctor's office (her work)
export const fatimaClinicVideos = [
  { url: '/videos/module4/fatima-clinic-1.mp4', title: 'At the Reception', subtitle: 'Do you have an appointment?' },
  { url: '/videos/module4/fatima-clinic-2.mp4', title: 'With the Nurse', subtitle: 'Taking vital signs' },
  { url: '/videos/module4/fatima-clinic-3.mp4', title: 'With the Doctor', subtitle: 'Describing symptoms' },
];

// Marisol at the pharmacy
export const marisolPharmacyVideos = [
  { url: '/videos/module4/marisol-pharm-1.mp4', title: 'Picking up medicine', subtitle: 'Prescription pickup' },
  { url: '/videos/module4/marisol-pharm-2.mp4', title: 'Asking about side effects', subtitle: 'Important questions' },
];

// ============================================
// KEY PHRASES
// ============================================
export const module4Phrases: PhraseItem[] = [
  { id: 'm4-p1', english: 'I am sick.', pronunciation: 'ay am sik', translations: { arabic: 'أنا مريض', bengali: 'আমি অসুস্থ', chinese: '我生病了', hebrew: 'אני חולה', korean: '저는 아파요', spanish: 'Estoy enfermo', turkish: 'Ben hastayım' } },
  { id: 'm4-p2', english: 'I have a headache.', pronunciation: 'ay hav a HED-eyk', translations: { arabic: 'عندي صداع', bengali: 'আমার মাথা ব্যথা', chinese: '我头痛', hebrew: 'יש לי כאב ראש', korean: '머리가 아파요', spanish: 'Tengo dolor de cabeza', turkish: 'Başım ağrıyor' } },
  { id: 'm4-p3', english: 'My stomach hurts.', pronunciation: 'may STUM-ak hörts', translations: { arabic: 'معدتي تؤلمني', bengali: 'আমার পেট ব্যথা করছে', chinese: '我的胃疼', hebrew: 'הבטן שלי כואבת', korean: '배가 아파요', spanish: 'Me duele el estómago', turkish: 'Midem ağrıyor' } },
  { id: 'm4-p4', english: 'I need a doctor.', pronunciation: 'ay niid a DOK-ter', translations: { arabic: 'أحتاج طبيباً', bengali: 'আমার ডাক্তার দরকার', chinese: '我需要医生', hebrew: 'אני צריך רופא', korean: '의사가 필요해요', spanish: 'Necesito un doctor', turkish: 'Doktora ihtiyacım var' } },
  { id: 'm4-p5', english: 'I have an appointment.', pronunciation: 'ay hav an a-POYNT-ment', translations: { arabic: 'لدي موعد', bengali: 'আমার অ্যাপয়েন্টমেন্ট আছে', chinese: '我有预约', hebrew: 'יש לי תור', korean: '예약이 있어요', spanish: 'Tengo una cita', turkish: 'Randevum var' } },
  { id: 'm4-p6', english: 'How do you feel?', pronunciation: 'hau du yuu fiil', translations: { arabic: 'كيف تشعر؟', bengali: 'আপনি কেমন বোধ করছেন?', chinese: '你感觉怎么样？', hebrew: 'איך אתה מרגיש?', korean: '어떻게 느끼세요?', spanish: '¿Cómo se siente?', turkish: 'Nasıl hissediyorsun?' } },
  { id: 'm4-p7', english: "I don't feel well.", pronunciation: 'ay dont fiil wel', translations: { arabic: 'لا أشعر بخير', bengali: 'আমি ভালো বোধ করছি না', chinese: '我感觉不好', hebrew: 'אני לא מרגיש טוב', korean: '몸이 안 좋아요', spanish: 'No me siento bien', turkish: 'Kendimi iyi hissetmiyorum' } },
  { id: 'm4-p8', english: 'Call 911!', pronunciation: 'kol nayn-wan-wan', translations: { arabic: 'اتصل بـ 911!', bengali: '911 কল করুন!', chinese: '拨打911！', hebrew: 'תתקשר ל-911!', korean: '911에 전화하세요!', spanish: '¡Llame al 911!', turkish: '911\'i ara!' } },
  { id: 'm4-p9', english: 'I am allergic to...', pronunciation: 'ay am a-LER-jik tu', translations: { arabic: 'أنا حساس من', bengali: 'আমার অ্যালার্জি আছে', chinese: '我对...过敏', hebrew: 'יש לי אלרגיה ל', korean: '...에 알레르기가 있어요', spanish: 'Soy alérgico a', turkish: 'Alerjim var' } },
  { id: 'm4-p10', english: 'Take this medicine twice a day.', pronunciation: 'teyk this MED-i-sin tways a dey', translations: { arabic: 'خذ هذا الدواء مرتين في اليوم', bengali: 'এই ঔষধ দিনে দুবার খান', chinese: '这种药一天吃两次', hebrew: 'קח את התרופה הזו פעמיים ביום', korean: '이 약을 하루에 두 번 드세요', spanish: 'Tome esta medicina dos veces al día', turkish: 'Bu ilacı günde iki kere alın' } },
];

// ============================================
// QUIZ QUESTIONS
// ============================================
export const module4Questions1: QuestionItem[] = [
  {
    id: 'm4-q1',
    question: 'What do you say when you have pain in your head?',
    options: ['I have a stomachache', 'I have a headache', 'I have a sore throat', 'I am tired'],
    correctAnswer: 'I have a headache',
    explanation: 'Head + ache = headache (baş ağrısı)',
  },
  {
    id: 'm4-q2',
    question: 'Where do you go to buy medicine?',
    options: ['Hospital', 'Pharmacy', 'Clinic', 'School'],
    correctAnswer: 'Pharmacy',
    explanation: 'Pharmacy is where you buy medicine with a prescription',
  },
  {
    id: 'm4-q3',
    question: 'What emergency number do you call in America?',
    options: ['112', '911', '119', '100'],
    correctAnswer: '911',
    explanation: 'In America, 911 is the emergency number',
  },
  {
    id: 'm4-q4',
    question: 'What is a "prescription"?',
    options: ['A sickness', 'A doctor', 'A note from the doctor for medicine', 'A bandage'],
    correctAnswer: 'A note from the doctor for medicine',
    explanation: 'Doctors write prescriptions so you can buy medicine',
  },
  {
    id: 'm4-q5',
    question: 'Fatima says "I don\'t feel well." What does she mean?',
    options: ['She is happy', 'She is sick', 'She is hungry', 'She is tired'],
    correctAnswer: 'She is sick',
    explanation: '"I don\'t feel well" = I am sick',
  },
];

// Symptom matching quiz
export const module4SymptomMatch = [
  { id: 'sm1', body: 'head', symptom: 'headache' },
  { id: 'sm2', body: 'stomach', symptom: 'stomachache' },
  { id: 'sm3', body: 'tooth', symptom: 'toothache' },
  { id: 'sm4', body: 'throat', symptom: 'sore throat' },
  { id: 'sm5', body: 'back', symptom: 'back pain' },
];

// ============================================
// SPEAKING TEST - "I have a..."
// ============================================
export const module4SpeakingSlides = [
  {
    id: 'm4-sp1',
    videoUrl: '/videos/module4/doctor-asks-1.mp4',
    questionToAsk: 'I have a headache.',
    hint: 'Describe your head pain',
    translations: {
      turkish: { question: 'Başım ağrıyor.', hint: 'Baş ağrını tarif et' },
      spanish: { question: 'Tengo dolor de cabeza.', hint: 'Describe tu dolor de cabeza' },
      arabic: { question: 'عندي صداع.', hint: 'صف ألم رأسك' },
      chinese: { question: '我头痛。', hint: '描述你的头痛' },
      korean: { question: '머리가 아파요.', hint: '두통을 설명하세요' },
      bengali: { question: 'আমার মাথা ব্যথা।', hint: 'মাথা ব্যথা বর্ণনা করুন' },
      hebrew: { question: 'יש לי כאב ראש.', hint: 'תאר את כאב הראש שלך' },
    }
  },
  {
    id: 'm4-sp2',
    videoUrl: '/videos/module4/doctor-asks-2.mp4',
    questionToAsk: 'My stomach hurts.',
    hint: 'Describe stomach pain',
    translations: {
      turkish: { question: 'Midem ağrıyor.', hint: 'Mide ağrını tarif et' },
      spanish: { question: 'Me duele el estómago.', hint: 'Describe el dolor de estómago' },
      arabic: { question: 'معدتي تؤلمني.', hint: 'صف ألم المعدة' },
      chinese: { question: '我的胃疼。', hint: '描述胃痛' },
      korean: { question: '배가 아파요.', hint: '복통을 설명하세요' },
      bengali: { question: 'আমার পেট ব্যথা।', hint: 'পেট ব্যথা বর্ণনা করুন' },
      hebrew: { question: 'הבטן שלי כואבת.', hint: 'תאר את כאב הבטן' },
    }
  },
  {
    id: 'm4-sp3',
    videoUrl: '/videos/module4/doctor-asks-3.mp4',
    questionToAsk: 'I have a fever.',
    hint: 'Tell about your fever',
    translations: {
      turkish: { question: 'Ateşim var.', hint: 'Ateşinden bahset' },
      spanish: { question: 'Tengo fiebre.', hint: 'Habla de tu fiebre' },
      arabic: { question: 'عندي حمى.', hint: 'أخبر عن الحمى' },
      chinese: { question: '我发烧了。', hint: '说说你的发烧' },
      korean: { question: '열이 있어요.', hint: '열에 대해 말하세요' },
      bengali: { question: 'আমার জ্বর।', hint: 'জ্বর সম্পর্কে বলুন' },
      hebrew: { question: 'יש לי חום.', hint: 'ספר על החום' },
    }
  },
];

// ============================================
// INTERACTIVE FORM - Doctor Intake (already exists in codebase)
// ============================================
export const doctorIntakeForm = {
  type: 'doctor-intake' as const,
  fields: [
    { id: 'first-name', label: 'First Name', placeholder: 'Type your first name' },
    { id: 'last-name', label: 'Last Name', placeholder: 'Type your last name' },
    { id: 'birth-date', label: 'Date of Birth', placeholder: 'MM/DD/YYYY' },
    { id: 'phone', label: 'Phone Number', placeholder: '555-555-5555' },
    { id: 'address', label: 'Address', placeholder: 'Street, City, State, ZIP' },
    { id: 'insurance', label: 'Insurance Company', placeholder: 'Type your insurance name' },
    { id: 'symptom', label: 'Main Symptom', placeholder: 'Describe what hurts' },
    { id: 'allergies', label: 'Allergies', placeholder: 'Any allergies?' },
  ]
};

// ============================================
// WORD ORDER PRACTICE - Build sentences
// ============================================
export const module4WordOrderSlides = [
  {
    id: 'm4-wo1',
    videoUrl: '/videos/module4/build-1.mp4',
    sentence: 'I have a headache',
    words: ['headache', 'I', 'have', 'a'],
    correctOrder: ['I', 'have', 'a', 'headache'],
    translations: {
      turkish: 'Başım ağrıyor',
      spanish: 'Tengo dolor de cabeza',
      arabic: 'عندي صداع',
      chinese: '我头痛',
      korean: '머리가 아파요',
    }
  },
  {
    id: 'm4-wo2',
    videoUrl: '/videos/module4/build-2.mp4',
    sentence: 'My stomach hurts',
    words: ['hurts', 'My', 'stomach'],
    correctOrder: ['My', 'stomach', 'hurts'],
    translations: {
      turkish: 'Midem ağrıyor',
      spanish: 'Me duele el estómago',
      arabic: 'معدتي تؤلمني',
      chinese: '我的胃疼',
      korean: '배가 아파요',
    }
  },
  {
    id: 'm4-wo3',
    videoUrl: '/videos/module4/build-3.mp4',
    sentence: 'I need a doctor',
    words: ['doctor', 'I', 'need', 'a'],
    correctOrder: ['I', 'need', 'a', 'doctor'],
    translations: {
      turkish: 'Doktora ihtiyacım var',
      spanish: 'Necesito un doctor',
      arabic: 'أحتاج طبيباً',
      chinese: '我需要医生',
      korean: '의사가 필요해요',
    }
  },
  {
    id: 'm4-wo4',
    videoUrl: '/videos/module4/build-4.mp4',
    sentence: 'I have an appointment at 10',
    words: ['appointment', 'I', 'have', 'at', '10', 'an'],
    correctOrder: ['I', 'have', 'an', 'appointment', 'at', '10'],
    translations: {
      turkish: '10\'da randevum var',
      spanish: 'Tengo una cita a las 10',
      arabic: 'لدي موعد في الساعة 10',
      chinese: '我10点有预约',
      korean: '10시에 예약이 있어요',
    }
  },
];

// ============================================
// LISTENING FILL IN BLANK - Doctor conversation
// ============================================
export const module4ListeningFillItems = [
  {
    id: 'm4-lfb1',
    audioUrl: '/audio/module4/doctor-1.mp3',
    audioText: 'Good morning. How can I help you today?',
    sentence: 'Good ___ How can I ___ you today?',
    blanks: ['morning', 'help'],
    translations: {
      turkish: 'Günaydın. Size nasıl yardımcı olabilirim?',
      spanish: 'Buenos días. ¿Cómo puedo ayudarle?',
      arabic: 'صباح الخير. كيف يمكنني مساعدتك؟',
      chinese: '早上好。我能怎么帮您？',
    }
  },
  {
    id: 'm4-lfb2',
    audioUrl: '/audio/module4/doctor-2.mp3',
    audioText: 'I have a headache and fever',
    sentence: 'I have a ___ and ___',
    blanks: ['headache', 'fever'],
    translations: {
      turkish: 'Başım ağrıyor ve ateşim var',
      spanish: 'Tengo dolor de cabeza y fiebre',
      arabic: 'عندي صداع وحمى',
      chinese: '我头痛发烧',
    }
  },
  {
    id: 'm4-lfb3',
    audioUrl: '/audio/module4/doctor-3.mp3',
    audioText: 'Take this medicine twice a day with food',
    sentence: 'Take this ___ twice a day with ___',
    blanks: ['medicine', 'food'],
    translations: {
      turkish: 'Bu ilacı günde iki kere yemekle alın',
      spanish: 'Tome esta medicina dos veces al día con comida',
      arabic: 'خذ هذا الدواء مرتين في اليوم مع الطعام',
      chinese: '这种药一天吃两次，随餐服用',
    }
  },
];

// ============================================
// MATCHING QUIZ - Symptom to body part
// ============================================
export const module4MatchingPairs = [
  { id: 'mp1', question: 'headache', answer: 'head' },
  { id: 'mp2', question: 'stomachache', answer: 'stomach' },
  { id: 'mp3', question: 'toothache', answer: 'tooth' },
  { id: 'mp4', question: 'sore throat', answer: 'throat' },
  { id: 'mp5', question: 'backache', answer: 'back' },
];

// ============================================
// NEIGHBOR QUIZ - Rosa is sick
// ============================================
export const rosaSickVideoQuiz = {
  videoUrl: '/videos/module4/rosa-sick-scene.mp4',
  characterName: 'Rosa',
  quizType: 'multiple-choice' as const,
  quizData: {
    questions: [
      {
        id: 'rosa-q1',
        question: 'What is wrong with Rosa?',
        options: ['She is hungry', 'She has a headache', 'She is happy', 'She is cold'],
        correctAnswer: 'She has a headache',
      },
      {
        id: 'rosa-q2',
        question: 'Who helps Rosa?',
        options: ['Ahmet', 'Saojin (the nurse)', 'Dmitry', 'No one'],
        correctAnswer: 'Saojin (the nurse)',
      },
      {
        id: 'rosa-q3',
        question: 'What does Saojin give Rosa?',
        options: ['Food', 'Money', 'Medicine', 'A phone'],
        correctAnswer: 'Medicine',
      },
    ]
  }
};

// ============================================
// FILL IN THE BLANK - Complete the dialogue
// ============================================
export const module4FillInBlankItems = [
  {
    id: 'm4-fib1',
    sentence: 'I have a ___ and I need to see a doctor.',
    options: ['fever', 'food', 'phone', 'friend'],
    correctAnswer: 'fever',
    translations: {
      turkish: 'Ateşim var ve doktora görünmem gerek.',
      spanish: 'Tengo fiebre y necesito ver al doctor.',
    }
  },
  {
    id: 'm4-fib2',
    sentence: 'Where is the ___? I need medicine.',
    options: ['school', 'pharmacy', 'park', 'bank'],
    correctAnswer: 'pharmacy',
    translations: {
      turkish: 'Eczane nerede? İlaca ihtiyacım var.',
      spanish: '¿Dónde está la farmacia? Necesito medicina.',
    }
  },
  {
    id: 'm4-fib3',
    sentence: 'In an emergency, call ___!',
    options: ['411', '911', '611', '711'],
    correctAnswer: '911',
    translations: {
      turkish: 'Acil durumda 911\'i ara!',
      spanish: '¡En una emergencia, llame al 911!',
    }
  },
  {
    id: 'm4-fib4',
    sentence: 'Dr. Smith, I have an ___ at 10 AM.',
    options: ['apple', 'appointment', 'address', 'answer'],
    correctAnswer: 'appointment',
    translations: {
      turkish: 'Dr. Smith, sabah 10\'da randevum var.',
      spanish: 'Dr. Smith, tengo una cita a las 10 AM.',
    }
  },
  {
    id: 'm4-fib5',
    sentence: 'My ___ hurts. I can\'t walk.',
    options: ['head', 'ear', 'leg', 'eye'],
    correctAnswer: 'leg',
    translations: {
      turkish: 'Bacağım ağrıyor. Yürüyemiyorum.',
      spanish: 'Me duele la pierna. No puedo caminar.',
    }
  },
];

// ============================================
// CULTURAL NOTES / GRAMMAR
// ============================================
export const module4GrammarRules = [
  {
    id: 'm4-g1',
    title: 'Using "I have a..." for symptoms',
    explanation: 'In English, we say "I HAVE a headache" not "My head has pain". This is different from many languages!',
    examples: [
      { wrong: 'My head has pain', correct: 'I have a headache' },
      { wrong: 'My stomach is pain', correct: 'My stomach hurts' },
      { wrong: 'I am fever', correct: 'I have a fever' },
    ],
    translations: {
      turkish: 'İngilizce\'de "başım ağrıyor" demek için "I HAVE a headache" deriz. Yani "benim bir baş ağrım var" gibi düşün.',
      spanish: 'En inglés decimos "I HAVE a headache" (Tengo un dolor de cabeza).',
      arabic: 'في الإنجليزية نقول "لدي صداع" (I have a headache).',
    }
  },
  {
    id: 'm4-g2',
    title: 'Emergency Culture in America',
    explanation: 'In the US, always call 911 for emergencies. Ambulance rides can be expensive, but in a real emergency, always call!',
    tips: [
      '🚨 911 is free to call',
      '🏥 ER = Emergency Room (always open)',
      '💊 Over-the-counter medicine does not need a prescription',
      '🆔 Always bring your ID and insurance card',
    ],
    translations: {
      turkish: 'Amerika\'da her zaman acil durumlar için 911\'i arayın. Ambulans pahalı olabilir ama gerçek acil durumda mutlaka arayın!',
      spanish: 'En EE.UU., siempre llame al 911 para emergencias. Las ambulancias pueden ser caras, ¡pero en una emergencia real siempre llame!',
    }
  },
];

// ============================================
// MODULE 4 LESSONS ARRAY
// ============================================
export interface Module4Lesson {
  id: string;
  title: string;
  description: string;
  type: 'vocabulary' | 'vocabulary-matching' | 'video-series' | 'phrases' | 'quiz' | 'word-order' | 'listening-fill-in-blank' | 'fill-in-blank' | 'matching' | 'speaking-test' | 'interactive-form' | 'neighbor-video-quiz' | 'grammar' | 'module-checklist';
  content?: VocabularyItem[];
  phrases?: PhraseItem[];
  videos?: { url: string; title: string; subtitle?: string }[];
  questions?: QuestionItem[];
  isCompleted: boolean;
  duration?: string;
}

export const module4Lessons: Module4Lesson[] = [
  {
    id: 'm4-lesson-1',
    title: 'Body Parts - Head & Face',
    description: 'Learn words for head, eyes, nose, mouth, ears',
    type: 'vocabulary',
    content: module4Vocabulary1.slice(0, 7),
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm4-lesson-1b',
    title: 'Body Parts - Matching',
    description: 'Match body part pictures with words',
    type: 'vocabulary-matching',
    content: module4Vocabulary1.slice(0, 7),
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm4-lesson-2',
    title: 'Body Parts - Arms, Legs, Body',
    description: 'Learn shoulder, arm, hand, stomach, back, leg, foot',
    type: 'vocabulary',
    content: module4Vocabulary1.slice(7),
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm4-lesson-2b',
    title: 'Body Parts - Video with Saojin',
    description: 'Watch Saojin (the nurse) teach body parts',
    type: 'video-series',
    videos: saojinBodyPartsVideos,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-3',
    title: 'Symptoms Vocabulary',
    description: 'Learn to describe pain and sickness',
    type: 'vocabulary',
    content: module4Vocabulary2,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-3b',
    title: 'Symptoms - Matching',
    description: 'Match symptoms with body parts',
    type: 'matching',
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm4-lesson-4',
    title: 'Essential Health Phrases',
    description: 'Learn: "I have a...", "I need a doctor", "Call 911"',
    type: 'phrases',
    phrases: module4Phrases,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-5',
    title: 'Build Sentences',
    description: 'Put words in the right order',
    type: 'word-order',
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-6',
    title: 'Rosa is Sick - Video',
    description: 'Watch Rosa describe her symptoms. Help her!',
    type: 'neighbor-video-quiz',
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm4-lesson-7',
    title: 'At the Doctor with Fatima',
    description: 'Watch Fatima (Home Health Aide) at the clinic',
    type: 'video-series',
    videos: fatimaClinicVideos,
    isCompleted: false,
    duration: '12 min',
  },
  {
    id: 'm4-lesson-8',
    title: 'Medical Places & People',
    description: 'Doctor, nurse, hospital, pharmacy, prescription',
    type: 'vocabulary',
    content: module4Vocabulary3,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-9',
    title: 'Listen to the Doctor',
    description: 'Listening practice - fill in the blanks',
    type: 'listening-fill-in-blank',
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-10',
    title: 'At the Pharmacy',
    description: 'Watch Marisol pick up medicine',
    type: 'video-series',
    videos: marisolPharmacyVideos,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm4-lesson-11',
    title: 'Doctor Intake Form',
    description: 'Fill out a real doctor intake form',
    type: 'interactive-form',
    isCompleted: false,
    duration: '15 min',
  },
  {
    id: 'm4-lesson-12',
    title: 'Grammar - "I have a..."',
    description: 'Learn the difference from your native language',
    type: 'grammar',
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm4-lesson-13',
    title: 'Health Quiz',
    description: 'Test what you learned',
    type: 'quiz',
    questions: module4Questions1,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-14',
    title: 'Speaking Practice',
    description: 'Tell the doctor how you feel',
    type: 'speaking-test',
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm4-lesson-15',
    title: 'Fill in the Blanks',
    description: 'Complete the health dialogues',
    type: 'fill-in-blank',
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm4-lesson-16',
    title: 'Module 4 Complete!',
    description: 'Review and celebrate',
    type: 'module-checklist',
    isCompleted: false,
    duration: '5 min',
  },
];

// ============================================
// VIDEO SCRIPTS FOR NIHAN (Canva production)
// ============================================
export const videoScripts = {
  'saojin-body-1': {
    title: 'Saojin teaches: Head and Face',
    duration: '30-40 seconds',
    setting: 'Saojin at the clinic, pointing to body parts on a chart or her own body',
    script: `
      Saojin (slowly, clearly):
      "Hello! I'm Saojin. I'm a nurse.
      Today we learn body parts.
      
      This is my head. [points to head]
      These are my eyes. [points to eyes]
      This is my nose. [points to nose]
      This is my mouth. [points to mouth]
      These are my ears. [points to ears]
      
      Head, eyes, nose, mouth, ears.
      Let's say it together!"
    `,
    captionsLanguages: ['English', 'Turkish', 'Spanish', 'Arabic', 'Chinese', 'Korean', 'Bengali', 'Hebrew'],
  },
  
  'rosa-sick-scene': {
    title: 'Rosa is sick and Saojin helps',
    duration: '45-60 seconds',
    setting: 'Rosa knocks on Saojin\'s door. Rosa looks sick.',
    script: `
      Rosa (weak voice): "Saojin... I don't feel well."
      Saojin: "Oh no! What's wrong?"
      Rosa: "I have a headache. And a fever."
      Saojin: "Let me check. [touches forehead] You are hot!"
      Saojin: "Come in. Sit down."
      Saojin: "Here, take this medicine. Two times a day."
      Rosa: "Thank you, Saojin!"
      Saojin: "If you feel worse, go to the doctor."
    `,
    learningPoints: [
      '"I don\'t feel well"',
      '"I have a headache"',
      '"I have a fever"',
      '"Take this medicine"',
      '"Two times a day"',
    ],
  },
  
  'fatima-clinic-1': {
    title: 'Fatima at the reception',
    duration: '30-40 seconds',
    setting: 'Clinic reception desk. Fatima approaches.',
    script: `
      Fatima: "Good morning."
      Receptionist: "Good morning. Do you have an appointment?"
      Fatima: "Yes, I have an appointment at 10."
      Receptionist: "Your name, please?"
      Fatima: "Fatima Hassan. F-A-T-I-M-A."
      Receptionist: "Yes, I see it. Please sit down. The doctor will call you."
      Fatima: "Thank you."
    `,
    learningPoints: [
      'Good morning',
      '"I have an appointment at [time]"',
      'Spelling your name',
      'Following instructions',
    ],
  },
  
  'fatima-clinic-2': {
    title: 'With the nurse',
    duration: '40-50 seconds',
    setting: 'Nurse\'s station. Saojin (nurse) weighs Fatima.',
    script: `
      Saojin: "Hi Fatima. I'm Saojin. I'll take your vital signs."
      Saojin: "Please step on the scale."
      Saojin: "Okay, now let me take your temperature."
      Saojin: "Open your mouth. [uses thermometer]"
      Saojin: "Your temperature is 99. A little high."
      Saojin: "Now your blood pressure. [uses BP cuff]"
      Saojin: "Follow me. The doctor is ready."
    `,
  },
  
  'fatima-clinic-3': {
    title: 'With the doctor',
    duration: '50-60 seconds',
    setting: 'Doctor\'s office.',
    script: `
      Doctor: "Hi Fatima. How can I help you today?"
      Fatima: "I have a stomachache. And I am tired."
      Doctor: "For how long?"
      Fatima: "Three days."
      Doctor: "Any fever?"
      Fatima: "A little."
      Doctor: "Let me check. [examines] Your stomach is tender."
      Doctor: "I'll give you a prescription. Take this medicine twice a day."
      Doctor: "Drink lots of water. Rest for two days."
      Fatima: "Thank you, doctor."
    `,
  },
  
  'marisol-pharm-1': {
    title: 'Marisol at the pharmacy',
    duration: '30-40 seconds',
    setting: 'Pharmacy counter. Marisol approaches.',
    script: `
      Marisol: "Hi. I need to pick up a prescription."
      Pharmacist: "Your name, please?"
      Marisol: "Marisol Rivera. R-I-V-E-R-A."
      Pharmacist: "Date of birth?"
      Marisol: "March 15, 1985."
      Pharmacist: "Here you go. Take one pill twice a day with food."
      Marisol: "Thank you!"
    `,
  },
};

// ============================================
// EXPORT ALL
// ============================================
export default {
  module4Vocabulary1,
  module4Vocabulary2,
  module4Vocabulary3,
  module4Phrases,
  module4Questions1,
  module4Lessons,
  videoScripts,
  saojinBodyPartsVideos,
  rosaSymptomsVideos,
  fatimaClinicVideos,
  marisolPharmacyVideos,
};
