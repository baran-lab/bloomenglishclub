// Module 2 - Names and Dates Content Data

import { SupportedLanguage, VocabularyItem, QuizQuestion } from './module1Data';

// Alphabet Data
export const alphabetData = [
  { letter: 'A', phonetic: 'ay' },
  { letter: 'B', phonetic: 'bee' },
  { letter: 'C', phonetic: 'see' },
  { letter: 'D', phonetic: 'dee' },
  { letter: 'E', phonetic: 'ee' },
  { letter: 'F', phonetic: 'ef' },
  { letter: 'G', phonetic: 'jee' },
  { letter: 'H', phonetic: 'aych' },
  { letter: 'I', phonetic: 'eye' },
  { letter: 'J', phonetic: 'jay' },
  { letter: 'K', phonetic: 'kay' },
  { letter: 'L', phonetic: 'el' },
  { letter: 'M', phonetic: 'em' },
  { letter: 'N', phonetic: 'en' },
  { letter: 'O', phonetic: 'oh' },
  { letter: 'P', phonetic: 'pee' },
  { letter: 'Q', phonetic: 'kyoo' },
  { letter: 'R', phonetic: 'ar' },
  { letter: 'S', phonetic: 'es' },
  { letter: 'T', phonetic: 'tee' },
  { letter: 'U', phonetic: 'yoo' },
  { letter: 'V', phonetic: 'vee' },
  { letter: 'W', phonetic: 'double-yoo' },
  { letter: 'X', phonetic: 'eks' },
  { letter: 'Y', phonetic: 'why' },
  { letter: 'Z', phonetic: 'zee' },
];

// Module 2 Vocabulary 1
export const module2Vocabulary: VocabularyItem[] = [
  { id: 'm2-address', english: 'Address', pronunciation: '', translations: { arabic: 'عنوان', bengali: 'ঠিকানা', korean: '주소', spanish: 'Dirección', turkish: 'Adres' } },
  { id: 'm2-birthday', english: 'Birthday', pronunciation: '', translations: { arabic: 'عيد ميلاد', bengali: 'জন্মদিন', korean: '생일', spanish: 'Cumpleaños', turkish: 'Doğum günü' } },
  { id: 'm2-date', english: 'Date', pronunciation: '', translations: { arabic: 'تاريخ', bengali: 'তারিখ', korean: '날짜', spanish: 'Fecha', turkish: 'Tarih' } },
  { id: 'm2-day', english: 'Day', pronunciation: '', translations: { arabic: 'يوم', bengali: 'দিন', korean: '일', spanish: 'Día', turkish: 'Gün' } },
  { id: 'm2-month', english: 'Month', pronunciation: '', translations: { arabic: 'شهر', bengali: 'মাস', korean: '월', spanish: 'Mes', turkish: 'Ay' } },
  { id: 'm2-my', english: 'my', pronunciation: '', translations: { arabic: 'ملكي', bengali: 'আমার', korean: '나의', spanish: 'mi', turkish: 'benim' } },
  { id: 'm2-number', english: 'Number', pronunciation: '', translations: { arabic: 'رقم', bengali: 'সংখ্যা', korean: '번호', spanish: 'Número', turkish: 'Numara' } },
  { id: 'm2-i', english: 'I', pronunciation: '', translations: { arabic: 'أنا', bengali: 'আমি', korean: '나', spanish: 'Yo', turkish: 'Ben' } },
  { id: 'm2-today', english: 'Today', pronunciation: '', translations: { arabic: 'اليوم', bengali: 'আজ', korean: '오늘', spanish: 'Hoy', turkish: 'Bugün' } },
  { id: 'm2-week', english: 'Week', pronunciation: '', translations: { arabic: 'أسبوع', bengali: 'সপ্তাহ', korean: '주', spanish: 'Semana', turkish: 'Hafta' } },
  { id: 'm2-year', english: 'Year', pronunciation: '', translations: { arabic: 'سنة', bengali: 'বছর', korean: '년', spanish: 'Año', turkish: 'Yıl' } },
  { id: 'm2-you', english: 'You', pronunciation: '', translations: { arabic: 'أنت', bengali: 'তুমি', korean: '너', spanish: 'Tú', turkish: 'Sen' } },
  { id: 'm2-your', english: 'your', pronunciation: '', translations: { arabic: 'ملكك', bengali: 'তোমার', korean: '너의', spanish: 'tu', turkish: 'senin' } },
];

// Module 2 Vocabulary 2
export const module2Vocabulary2: VocabularyItem[] = [
  { id: 'm2v2-area-code', english: 'area code', pronunciation: '', translations: { arabic: 'رمز المنطقة', bengali: 'এরিয়া কোড', korean: '지역 번호', spanish: 'código de área', turkish: 'alan kodu' } },
  { id: 'm2v2-avenue', english: 'avenue', pronunciation: '', translations: { arabic: 'شارع', bengali: 'এভিনিউ', korean: '대로', spanish: 'avenida', turkish: 'cadde' } },
  { id: 'm2v2-boulevard', english: 'boulevard', pronunciation: '', translations: { arabic: 'بوليفارد', bengali: 'বুলেভার্ড', korean: '대로', spanish: 'bulevar', turkish: 'bulvar' } },
  { id: 'm2v2-city', english: 'city', pronunciation: '', translations: { arabic: 'مدينة', bengali: 'শহর', korean: '도시', spanish: 'ciudad', turkish: 'şehir' } },
  { id: 'm2v2-country', english: 'country', pronunciation: '', translations: { arabic: 'بلد', bengali: 'দেশ', korean: '나라', spanish: 'país', turkish: 'ülke' } },
  { id: 'm2v2-county', english: 'county', pronunciation: '', translations: { arabic: 'مقاطعة', bengali: 'কাউন্টি', korean: '군', spanish: 'condado', turkish: 'ilçe' } },
  { id: 'm2v2-he', english: 'he', pronunciation: '', translations: { arabic: 'هو', bengali: 'সে (পুরুষ)', korean: '그', spanish: 'él', turkish: 'o (erkek)' } },
  { id: 'm2v2-she', english: 'she', pronunciation: '', translations: { arabic: 'هي', bengali: 'সে (মহিলা)', korean: '그녀', spanish: 'ella', turkish: 'o (kadın)' } },
  { id: 'm2v2-her', english: 'her', pronunciation: '', translations: { arabic: 'لها', bengali: 'তার (মহিলা)', korean: '그녀의', spanish: 'su (de ella)', turkish: 'onun (kadın)' } },
  { id: 'm2v2-his', english: 'his', pronunciation: '', translations: { arabic: 'له', bengali: 'তার (পুরুষ)', korean: '그의', spanish: 'su (de él)', turkish: 'onun (erkek)' } },
  { id: 'm2v2-state', english: 'state', pronunciation: '', translations: { arabic: 'ولاية', bengali: 'রাজ্য', korean: '주', spanish: 'estado', turkish: 'eyalet' } },
  { id: 'm2v2-street', english: 'street', pronunciation: '', translations: { arabic: 'شارع', bengali: 'রাস্তা', korean: '거리', spanish: 'calle', turkish: 'sokak' } },
  { id: 'm2v2-zip-code', english: 'zip code', pronunciation: '', translations: { arabic: 'الرمز البريدي', bengali: 'জিপ কোড', korean: '우편번호', spanish: 'código postal', turkish: 'posta kodu' } },
];

// Ordinal Numbers 1-7
export const ordinalNumbers1to7: VocabularyItem[] = [
  { id: 'ord-1', english: '1st - First', pronunciation: '', translations: { arabic: 'الأول', bengali: 'প্রথম', korean: '첫 번째', spanish: 'Primero', turkish: 'Birinci' } },
  { id: 'ord-2', english: '2nd - Second', pronunciation: '', translations: { arabic: 'الثاني', bengali: 'দ্বিতীয়', korean: '두 번째', spanish: 'Segundo', turkish: 'İkinci' } },
  { id: 'ord-3', english: '3rd - Third', pronunciation: '', translations: { arabic: 'الثالث', bengali: 'তৃতীয়', korean: '세 번째', spanish: 'Tercero', turkish: 'Üçüncü' } },
  { id: 'ord-4', english: '4th - Fourth', pronunciation: '', translations: { arabic: 'الرابع', bengali: 'চতুর্থ', korean: '네 번째', spanish: 'Cuarto', turkish: 'Dördüncü' } },
  { id: 'ord-5', english: '5th - Fifth', pronunciation: '', translations: { arabic: 'الخامس', bengali: 'পঞ্চম', korean: '다섯 번째', spanish: 'Quinto', turkish: 'Beşinci' } },
  { id: 'ord-6', english: '6th - Sixth', pronunciation: '', translations: { arabic: 'السادس', bengali: 'ষষ্ঠ', korean: '여섯 번째', spanish: 'Sexto', turkish: 'Altıncı' } },
  { id: 'ord-7', english: '7th - Seventh', pronunciation: '', translations: { arabic: 'السابع', bengali: 'সপ্তম', korean: '일곱 번째', spanish: 'Séptimo', turkish: 'Yedinci' } },
];

// Ordinal Numbers 8-15
export const ordinalNumbers8to15: VocabularyItem[] = [
  { id: 'ord-8', english: '8th - Eighth', pronunciation: '', translations: { arabic: 'الثامن', bengali: 'অষ্টম', korean: '여덟 번째', spanish: 'Octavo', turkish: 'Sekizinci' } },
  { id: 'ord-9', english: '9th - Ninth', pronunciation: '', translations: { arabic: 'التاسع', bengali: 'নবম', korean: '아홉 번째', spanish: 'Noveno', turkish: 'Dokuzuncu' } },
  { id: 'ord-10', english: '10th - Tenth', pronunciation: '', translations: { arabic: 'العاشر', bengali: 'দশম', korean: '열 번째', spanish: 'Décimo', turkish: 'Onuncu' } },
  { id: 'ord-11', english: '11th - Eleventh', pronunciation: '', translations: { arabic: 'الحادي عشر', bengali: 'একাদশ', korean: '열한 번째', spanish: 'Undécimo', turkish: 'On birinci' } },
  { id: 'ord-12', english: '12th - Twelfth', pronunciation: '', translations: { arabic: 'الثاني عشر', bengali: 'দ্বাদশ', korean: '열두 번째', spanish: 'Duodécimo', turkish: 'On ikinci' } },
  { id: 'ord-13', english: '13th - Thirteenth', pronunciation: '', translations: { arabic: 'الثالث عشر', bengali: 'ত্রয়োদশ', korean: '열세 번째', spanish: 'Decimotercero', turkish: 'On üçüncü' } },
  { id: 'ord-14', english: '14th - Fourteenth', pronunciation: '', translations: { arabic: 'الرابع عشر', bengali: 'চতুর্দশ', korean: '열네 번째', spanish: 'Decimocuarto', turkish: 'On dördüncü' } },
  { id: 'ord-15', english: '15th - Fifteenth', pronunciation: '', translations: { arabic: 'الخامس عشر', bengali: 'পঞ্চদশ', korean: '열다섯 번째', spanish: 'Decimoquinto', turkish: 'On beşinci' } },
];

// Ordinal Numbers 16-22
export const ordinalNumbers16to22: VocabularyItem[] = [
  { id: 'ord-16', english: '16th - Sixteenth', pronunciation: '', translations: { arabic: 'السادس عشر', bengali: 'ষোড়শ', korean: '열여섯 번째', spanish: 'Decimosexto', turkish: 'On altıncı' } },
  { id: 'ord-17', english: '17th - Seventeenth', pronunciation: '', translations: { arabic: 'السابع عشر', bengali: 'সপ্তদশ', korean: '열일곱 번째', spanish: 'Decimoséptimo', turkish: 'On yedinci' } },
  { id: 'ord-18', english: '18th - Eighteenth', pronunciation: '', translations: { arabic: 'الثامن عشر', bengali: 'অষ্টাদশ', korean: '열여덟 번째', spanish: 'Decimoctavo', turkish: 'On sekizinci' } },
  { id: 'ord-19', english: '19th - Nineteenth', pronunciation: '', translations: { arabic: 'التاسع عشر', bengali: 'ঊনবিংশ', korean: '열아홉 번째', spanish: 'Decimonoveno', turkish: 'On dokuzuncu' } },
  { id: 'ord-20', english: '20th - Twentieth', pronunciation: '', translations: { arabic: 'العشرون', bengali: 'বিংশ', korean: '스무 번째', spanish: 'Vigésimo', turkish: 'Yirminci' } },
  { id: 'ord-21', english: '21st - Twenty-first', pronunciation: '', translations: { arabic: 'الحادي والعشرون', bengali: 'একুশতম', korean: '스물한 번째', spanish: 'Vigésimo primero', turkish: 'Yirmi birinci' } },
  { id: 'ord-22', english: '22nd - Twenty-second', pronunciation: '', translations: { arabic: 'الثاني والعشرون', bengali: 'বাইশতম', korean: '스물두 번째', spanish: 'Vigésimo segundo', turkish: 'Yirmi ikinci' } },
];

// Ordinal Numbers 23-31
export const ordinalNumbers23to31: VocabularyItem[] = [
  { id: 'ord-23', english: '23rd - Twenty-third', pronunciation: '', translations: { arabic: 'الثالث والعشرون', bengali: 'তেইশতম', korean: '스물세 번째', spanish: 'Vigésimo tercero', turkish: 'Yirmi üçüncü' } },
  { id: 'ord-24', english: '24th - Twenty-fourth', pronunciation: '', translations: { arabic: 'الرابع والعشرون', bengali: 'চব্বিশতম', korean: '스물네 번째', spanish: 'Vigésimo cuarto', turkish: 'Yirmi dördüncü' } },
  { id: 'ord-25', english: '25th - Twenty-fifth', pronunciation: '', translations: { arabic: 'الخامس والعشرون', bengali: 'পঁচিশতম', korean: '스물다섯 번째', spanish: 'Vigésimo quinto', turkish: 'Yirmi beşinci' } },
  { id: 'ord-26', english: '26th - Twenty-sixth', pronunciation: '', translations: { arabic: 'السادس والعشرون', bengali: 'ছাব্বিশতম', korean: '스물여섯 번째', spanish: 'Vigésimo sexto', turkish: 'Yirmi altıncı' } },
  { id: 'ord-27', english: '27th - Twenty-seventh', pronunciation: '', translations: { arabic: 'السابع والعشرون', bengali: 'সাতাশতম', korean: '스물일곱 번째', spanish: 'Vigésimo séptimo', turkish: 'Yirmi yedinci' } },
  { id: 'ord-28', english: '28th - Twenty-eighth', pronunciation: '', translations: { arabic: 'الثامن والعشرون', bengali: 'আটাশতম', korean: '스물여덟 번째', spanish: 'Vigésimo octavo', turkish: 'Yirmi sekizinci' } },
  { id: 'ord-29', english: '29th - Twenty-ninth', pronunciation: '', translations: { arabic: 'التاسع والعشرون', bengali: 'ঊনত্রিশতম', korean: '스물아홉 번째', spanish: 'Vigésimo noveno', turkish: 'Yirmi dokuzuncu' } },
  { id: 'ord-30', english: '30th - Thirtieth', pronunciation: '', translations: { arabic: 'الثلاثون', bengali: 'ত্রিংশ', korean: '서른 번째', spanish: 'Trigésimo', turkish: 'Otuzuncu' } },
  { id: 'ord-31', english: '31st - Thirty-first', pronunciation: '', translations: { arabic: 'الحادي والثلاثون', bengali: 'একত্রিংশ', korean: '서른한 번째', spanish: 'Trigésimo primero', turkish: 'Otuz birinci' } },
];

// Legacy ordinal numbers for compatibility
export const ordinalNumbers1to15: VocabularyItem[] = [...ordinalNumbers1to7, ...ordinalNumbers8to15];
export const ordinalNumbers16to31: VocabularyItem[] = [...ordinalNumbers16to22, ...ordinalNumbers23to31];
export const ordinalNumbers: VocabularyItem[] = [...ordinalNumbers1to15, ...ordinalNumbers16to31];

// Heba Video Series - Part 1 (First Name) - Updated sentences
export const hebaVideos = [
  { url: '/videos/module2/heba-1.mp4', title: "What's your first name?", subtitle: 'Watch and listen', sentenceToRecord: "What's your first name?" },
  { url: '/videos/module2/heba-1b.mp4', title: 'My first name is _____', subtitle: 'Practice', sentenceToRecord: 'My first name is _____' },
  { url: '/videos/module2/heba-2.mp4', title: 'How do you spell that?', subtitle: 'Watch and listen', sentenceToRecord: 'How do you spell that?' },
  { url: '/videos/module2/heba-2b.mp4', title: 'H-E-B-A', subtitle: 'Practice', sentenceToRecord: 'H-E-B-A' },
  { url: '/videos/module2/heba-3.mp4', title: "What's your last name?", subtitle: 'Watch and listen', sentenceToRecord: "What's your last name?" },
  { url: '/videos/module2/heba-3b.mp4', title: 'My last name is El-Masri', subtitle: 'Practice', sentenceToRecord: 'My last name is El-Masri' },
  { url: '/videos/module2/heba-4.mp4', title: 'Can you spell that, please?', subtitle: 'Watch and listen', sentenceToRecord: 'Can you spell that, please?' },
  { url: '/videos/module2/heba-4b.mp4', title: 'E-L-M-A-S-R-I', subtitle: 'Practice', sentenceToRecord: 'E-L-M-A-S-R-I' },
];

// Heba Video Series - Date of Birth (Heba 5-8) - Listening only, separated
export const hebaDateOfBirthVideos = [
  { url: '/videos/module2/heba-5.mp4', title: 'Date of birth', subtitle: "What's your date of birth?", listenOnly: true },
  { url: '/videos/module2/heba-6.mp4', title: 'Practice', subtitle: 'Listen and learn', listenOnly: true },
  { url: '/videos/module2/heba-7.mp4', title: 'Watch and listen', subtitle: 'Date format', listenOnly: true },
  { url: '/videos/module2/heba-8.mp4', title: 'Practice', subtitle: 'Complete the conversation', listenOnly: true },
];

// Heba Video Series - Telephone Number - Updated with new video
export const hebaTelephoneVideos = [
  { url: '/videos/module2/heba-9.mp4', title: "What's your telephone number?", subtitle: 'Telephone number', sentenceToRecord: "What's your telephone number?" },
  { url: '/videos/module2/heba-tel-no.mp4', title: 'My telephone number is...', subtitle: 'Practice', sentenceToRecord: 'My telephone number is...' },
];

// Heba Video Series - Address (Videos 11-12) - Video 2 replaced with M2 Heba Address
export const hebaAddressVideos = [
  { url: '/videos/module2/heba-11.mp4', title: "What's your address?", subtitle: "What's your address?", sentenceToRecord: "What's your address?" },
  { url: '/videos/module2/m2-heba-address.mp4', title: 'My address is...', subtitle: 'Listen and learn', listenOnly: true },
];

// Heba Video Series - How to say your address - Updated with new M2 Heba videos
export const hebaAddressHowToVideos = [
  { url: '/videos/module2/heba-13.mp4', title: 'I live at...', subtitle: 'Note: "live" (verb) rhymes with "give"', listenOnly: true },
  { url: '/videos/module2/m2-heba-street.mp4', title: 'Street', subtitle: 'Street number and name', listenOnly: true },
  { url: '/videos/module2/m2-heba-apartment.mp4', title: 'Apartment', subtitle: 'Apartment number', listenOnly: true },
  { url: '/videos/module2/m2-heba-city.mp4', title: 'City', subtitle: 'City name', listenOnly: true },
  { url: '/videos/module2/m2-heba-state.mp4', title: 'State', subtitle: 'State name', listenOnly: true },
  { url: '/videos/module2/m2-heba-zip-code.mp4', title: 'Zip Code', subtitle: 'Note: "live" (verb) rhymes with "give", not "five"', listenOnly: true },
];

// Spelling Practice Data
export const spellingPracticeData = [
  { 
    id: 'spell-1', 
    spelling: 'F-A-T-I-M-A', 
    correctAnswer: 'Fatima', 
    options: ['Fatima', 'Emily', 'Ahmet'] 
  },
  { 
    id: 'spell-2', 
    spelling: 'W-A-N-G', 
    correctAnswer: 'Wang', 
    options: ['Sofia', 'Chen', 'Wang'] 
  },
  { 
    id: 'spell-3', 
    spelling: 'P-A-R-K-E-R', 
    correctAnswer: 'Parker', 
    options: ['Carlos', 'Parker', 'Juan'] 
  },
  { 
    id: 'spell-4', 
    spelling: 'J-A-C-O-B', 
    correctAnswer: 'Jacob', 
    options: ['Nasima', 'Michael', 'Jacob'] 
  },
];

// Months Data
export const monthsData: VocabularyItem[] = [
  { id: 'month-1', english: 'January', pronunciation: '', translations: { arabic: 'يناير', bengali: 'জানুয়ারি', korean: '1월', spanish: 'Enero', turkish: 'Ocak' } },
  { id: 'month-2', english: 'February', pronunciation: '', translations: { arabic: 'فبراير', bengali: 'ফেব্রুয়ারি', korean: '2월', spanish: 'Febrero', turkish: 'Şubat' } },
  { id: 'month-3', english: 'March', pronunciation: '', translations: { arabic: 'مارس', bengali: 'মার্চ', korean: '3월', spanish: 'Marzo', turkish: 'Mart' } },
  { id: 'month-4', english: 'April', pronunciation: '', translations: { arabic: 'أبريل', bengali: 'এপ্রিল', korean: '4월', spanish: 'Abril', turkish: 'Nisan' } },
  { id: 'month-5', english: 'May', pronunciation: '', translations: { arabic: 'مايو', bengali: 'মে', korean: '5월', spanish: 'Mayo', turkish: 'Mayıs' } },
  { id: 'month-6', english: 'June', pronunciation: '', translations: { arabic: 'يونيو', bengali: 'জুন', korean: '6월', spanish: 'Junio', turkish: 'Haziran' } },
  { id: 'month-7', english: 'July', pronunciation: '', translations: { arabic: 'يوليو', bengali: 'জুলাই', korean: '7월', spanish: 'Julio', turkish: 'Temmuz' } },
  { id: 'month-8', english: 'August', pronunciation: '', translations: { arabic: 'أغسطس', bengali: 'আগস্ট', korean: '8월', spanish: 'Agosto', turkish: 'Ağustos' } },
  { id: 'month-9', english: 'September', pronunciation: '', translations: { arabic: 'سبتمبر', bengali: 'সেপ্টেম্বর', korean: '9월', spanish: 'Septiembre', turkish: 'Eylül' } },
  { id: 'month-10', english: 'October', pronunciation: '', translations: { arabic: 'أكتوبر', bengali: 'অক্টোবর', korean: '10월', spanish: 'Octubre', turkish: 'Ekim' } },
  { id: 'month-11', english: 'November', pronunciation: '', translations: { arabic: 'نوفمبر', bengali: 'নভেম্বর', korean: '11월', spanish: 'Noviembre', turkish: 'Kasım' } },
  { id: 'month-12', english: 'December', pronunciation: '', translations: { arabic: 'ديسمبر', bengali: 'ডিসেম্বর', korean: '12월', spanish: 'Diciembre', turkish: 'Aralık' } },
];

// Numbers 61-70
export const numbers61to70: VocabularyItem[] = [
  { id: 'n61', english: '61 - sixty-one', pronunciation: '', translations: { arabic: 'واحد وستون', bengali: 'একষট্টি', korean: '육십일', spanish: 'sesenta y uno', turkish: 'altmış bir' } },
  { id: 'n62', english: '62 - sixty-two', pronunciation: '', translations: { arabic: 'اثنان وستون', bengali: 'বাষট্টি', korean: '육십이', spanish: 'sesenta y dos', turkish: 'altmış iki' } },
  { id: 'n63', english: '63 - sixty-three', pronunciation: '', translations: { arabic: 'ثلاثة وستون', bengali: 'তেষট্টি', korean: '육십삼', spanish: 'sesenta y tres', turkish: 'altmış üç' } },
  { id: 'n64', english: '64 - sixty-four', pronunciation: '', translations: { arabic: 'أربعة وستون', bengali: 'চৌষট্টি', korean: '육십사', spanish: 'sesenta y cuatro', turkish: 'altmış dört' } },
  { id: 'n65', english: '65 - sixty-five', pronunciation: '', translations: { arabic: 'خمسة وستون', bengali: 'পঁয়ষট্টি', korean: '육십오', spanish: 'sesenta y cinco', turkish: 'altmış beş' } },
  { id: 'n66', english: '66 - sixty-six', pronunciation: '', translations: { arabic: 'ستة وستون', bengali: 'ছেষট্টি', korean: '육십육', spanish: 'sesenta y seis', turkish: 'altmış altı' } },
  { id: 'n67', english: '67 - sixty-seven', pronunciation: '', translations: { arabic: 'سبعة وستون', bengali: 'সাতষট্টি', korean: '육십칠', spanish: 'sesenta y siete', turkish: 'altmış yedi' } },
  { id: 'n68', english: '68 - sixty-eight', pronunciation: '', translations: { arabic: 'ثمانية وستون', bengali: 'আটষট্টি', korean: '육십팔', spanish: 'sesenta y ocho', turkish: 'altmış sekiz' } },
  { id: 'n69', english: '69 - sixty-nine', pronunciation: '', translations: { arabic: 'تسعة وستون', bengali: 'ঊনসত্তর', korean: '육십구', spanish: 'sesenta y nueve', turkish: 'altmış dokuz' } },
  { id: 'n70', english: '70 - seventy', pronunciation: '', translations: { arabic: 'سبعون', bengali: 'সত্তর', korean: '칠십', spanish: 'setenta', turkish: 'yetmiş' } },
];

// Numbers 71-80
export const numbers71to80: VocabularyItem[] = [
  { id: 'n71', english: '71 - seventy-one', pronunciation: '', translations: { arabic: 'واحد وسبعون', bengali: 'একাত্তর', korean: '칠십일', spanish: 'setenta y uno', turkish: 'yetmiş bir' } },
  { id: 'n72', english: '72 - seventy-two', pronunciation: '', translations: { arabic: 'اثنان وسبعون', bengali: 'বাহাত্তর', korean: '칠십이', spanish: 'setenta y dos', turkish: 'yetmiş iki' } },
  { id: 'n73', english: '73 - seventy-three', pronunciation: '', translations: { arabic: 'ثلاثة وسبعون', bengali: 'তেয়াত্তর', korean: '칠십삼', spanish: 'setenta y tres', turkish: 'yetmiş üç' } },
  { id: 'n74', english: '74 - seventy-four', pronunciation: '', translations: { arabic: 'أربعة وسبعون', bengali: 'চুয়াত্তর', korean: '칠십사', spanish: 'setenta y cuatro', turkish: 'yetmiş dört' } },
  { id: 'n75', english: '75 - seventy-five', pronunciation: '', translations: { arabic: 'خمسة وسبعون', bengali: 'পঁচাত্তর', korean: '칠십오', spanish: 'setenta y cinco', turkish: 'yetmiş beş' } },
  { id: 'n76', english: '76 - seventy-six', pronunciation: '', translations: { arabic: 'ستة وسبعون', bengali: 'ছিয়াত্তর', korean: '칠십육', spanish: 'setenta y seis', turkish: 'yetmiş altı' } },
  { id: 'n77', english: '77 - seventy-seven', pronunciation: '', translations: { arabic: 'سبعة وسبعون', bengali: 'সাতাত্তর', korean: '칠십칠', spanish: 'setenta y siete', turkish: 'yetmiş yedi' } },
  { id: 'n78', english: '78 - seventy-eight', pronunciation: '', translations: { arabic: 'ثمانية وسبعون', bengali: 'আটাত্তর', korean: '칠십팔', spanish: 'setenta y ocho', turkish: 'yetmiş sekiz' } },
  { id: 'n79', english: '79 - seventy-nine', pronunciation: '', translations: { arabic: 'تسعة وسبعون', bengali: 'ঊনআশি', korean: '칠십구', spanish: 'setenta y nueve', turkish: 'yetmiş dokuz' } },
  { id: 'n80', english: '80 - eighty', pronunciation: '', translations: { arabic: 'ثمانون', bengali: 'আশি', korean: '팔십', spanish: 'ochenta', turkish: 'seksen' } },
];

// Combined 61-80 for legacy
export const numbers61to80: VocabularyItem[] = [...numbers61to70, ...numbers71to80];

// Numbers 81-90
export const numbers81to90: VocabularyItem[] = [
  { id: 'n81', english: '81 - eighty-one', pronunciation: '', translations: { arabic: 'واحد وثمانون', bengali: 'একাশি', korean: '팔십일', spanish: 'ochenta y uno', turkish: 'seksen bir' } },
  { id: 'n82', english: '82 - eighty-two', pronunciation: '', translations: { arabic: 'اثنان وثمانون', bengali: 'বিরাশি', korean: '팔십이', spanish: 'ochenta y dos', turkish: 'seksen iki' } },
  { id: 'n83', english: '83 - eighty-three', pronunciation: '', translations: { arabic: 'ثلاثة وثمانون', bengali: 'তিরাশি', korean: '팔십삼', spanish: 'ochenta y tres', turkish: 'seksen üç' } },
  { id: 'n84', english: '84 - eighty-four', pronunciation: '', translations: { arabic: 'أربعة وثمانون', bengali: 'চুরাশি', korean: '팔십사', spanish: 'ochenta y cuatro', turkish: 'seksen dört' } },
  { id: 'n85', english: '85 - eighty-five', pronunciation: '', translations: { arabic: 'خمسة وثمانون', bengali: 'পঁচাশি', korean: '팔십오', spanish: 'ochenta y cinco', turkish: 'seksen beş' } },
  { id: 'n86', english: '86 - eighty-six', pronunciation: '', translations: { arabic: 'ستة وثمانون', bengali: 'ছিয়াশি', korean: '팔십육', spanish: 'ochenta y seis', turkish: 'seksen altı' } },
  { id: 'n87', english: '87 - eighty-seven', pronunciation: '', translations: { arabic: 'سبعة وثمانون', bengali: 'সাতাশি', korean: '팔십칠', spanish: 'ochenta y siete', turkish: 'seksen yedi' } },
  { id: 'n88', english: '88 - eighty-eight', pronunciation: '', translations: { arabic: 'ثمانية وثمانون', bengali: 'আটাশি', korean: '팔십팔', spanish: 'ochenta y ocho', turkish: 'seksen sekiz' } },
  { id: 'n89', english: '89 - eighty-nine', pronunciation: '', translations: { arabic: 'تسعة وثمانون', bengali: 'ঊননব্বই', korean: '팔십구', spanish: 'ochenta y nueve', turkish: 'seksen dokuz' } },
  { id: 'n90', english: '90 - ninety', pronunciation: '', translations: { arabic: 'تسعون', bengali: 'নব্বই', korean: '구십', spanish: 'noventa', turkish: 'doksan' } },
];

// Numbers 91-100
export const numbers91to100: VocabularyItem[] = [
  { id: 'n91', english: '91 - ninety-one', pronunciation: '', translations: { arabic: 'واحد وتسعون', bengali: 'একানব্বই', korean: '구십일', spanish: 'noventa y uno', turkish: 'doksan bir' } },
  { id: 'n92', english: '92 - ninety-two', pronunciation: '', translations: { arabic: 'اثنان وتسعون', bengali: 'বিরানব্বই', korean: '구십이', spanish: 'noventa y dos', turkish: 'doksan iki' } },
  { id: 'n93', english: '93 - ninety-three', pronunciation: '', translations: { arabic: 'ثلاثة وتسعون', bengali: 'তিরানব্বই', korean: '구십삼', spanish: 'noventa y tres', turkish: 'doksan üç' } },
  { id: 'n94', english: '94 - ninety-four', pronunciation: '', translations: { arabic: 'أربعة وتسعون', bengali: 'চুরানব্বই', korean: '구십사', spanish: 'noventa y cuatro', turkish: 'doksan dört' } },
  { id: 'n95', english: '95 - ninety-five', pronunciation: '', translations: { arabic: 'خمسة وتسعون', bengali: 'পঁচানব্বই', korean: '구십오', spanish: 'noventa y cinco', turkish: 'doksan beş' } },
  { id: 'n96', english: '96 - ninety-six', pronunciation: '', translations: { arabic: 'ستة وتسعون', bengali: 'ছিয়ানব্বই', korean: '구십육', spanish: 'noventa y seis', turkish: 'doksan altı' } },
  { id: 'n97', english: '97 - ninety-seven', pronunciation: '', translations: { arabic: 'سبعة وتسعون', bengali: 'সাতানব্বই', korean: '구십칠', spanish: 'noventa y siete', turkish: 'doksan yedi' } },
  { id: 'n98', english: '98 - ninety-eight', pronunciation: '', translations: { arabic: 'ثمانية وتسعون', bengali: 'আটানব্বই', korean: '구십팔', spanish: 'noventa y ocho', turkish: 'doksan sekiz' } },
  { id: 'n99', english: '99 - ninety-nine', pronunciation: '', translations: { arabic: 'تسعة وتسعون', bengali: 'নিরানব্বই', korean: '구십구', spanish: 'noventa y nueve', turkish: 'doksan dokuz' } },
  { id: 'n100', english: '100 - one hundred', pronunciation: '', translations: { arabic: 'مائة', bengali: 'একশ', korean: '백', spanish: 'cien', turkish: 'yüz' } },
];

// Combined 81-100 for legacy
export const numbers81to100: VocabularyItem[] = [...numbers81to90, ...numbers91to100];

// Name Recording Practice Questions - Updated
export const nameRecordingQuestions = [
  { id: 'name-q1', question: "What's your first name?", hint: 'Answer: "My first name is ..."', expectedStart: 'my first name is' },
  { id: 'name-q2', question: 'How do you spell that?', hint: 'Spell your name letter by letter' },
];

// Telephone Number Practice
export const telephoneNumberInfo = {
  example: '(773) 555-1109',
  spoken: 'Seven-seven-three, five-five-five, one-one-zero-nine',
  alternativeSpoken: 'Seven-seven-three, five-five-five, one-one-oh-nine',
  tip: 'You can use "oh" instead of "zero"',
};

// Module 2 Lessons
export interface Module2Lesson {
  id: string;
  title: string;
  description: string;
  type: 'alphabet' | 'alphabet-matching' | 'vocabulary' | 'vocabulary-matching' | 'ordinal-numbers' | 'ordinal-audio-matching' | 'video-series' | 'name-recording' | 'spelling-practice' | 'numbers-matching' | 'numbers-audio-matching' | 'months' | 'months-order' | 'telephone-practice' | 'date-of-birth-practice' | 'address-video-series' | 'listening-lesson' | 'address-word-order' | 'module-complete';
  content?: VocabularyItem[];
  videos?: { url: string; title: string; subtitle?: string; sentenceToRecord?: string; listenOnly?: boolean; showTranslation?: boolean }[];
  spellingData?: typeof spellingPracticeData;
  isCompleted: boolean;
  duration?: string;
}

export const module2Lessons: Module2Lesson[] = [
  {
    id: 'm2-lesson-1',
    title: 'Alphabet',
    description: 'Listen and repeat the alphabet',
    type: 'alphabet',
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm2-lesson-1b',
    title: 'Alphabet Practice',
    description: 'Match letters with their sounds',
    type: 'alphabet-matching',
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-2',
    title: 'Vocabulary 1',
    description: 'Learn words for dates and personal information',
    type: 'vocabulary',
    content: module2Vocabulary,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-2b',
    title: 'Vocabulary 1 - Matching',
    description: 'Match English words with translations',
    type: 'vocabulary-matching',
    content: module2Vocabulary,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm2-lesson-3a',
    title: 'Ordinal Numbers 1-7',
    description: 'Listen and match ordinal numbers',
    type: 'ordinal-audio-matching',
    content: ordinalNumbers1to7,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-3b',
    title: 'Ordinal Numbers 8-15',
    description: 'Listen and match ordinal numbers',
    type: 'ordinal-audio-matching',
    content: ordinalNumbers8to15,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-4',
    title: "What's Your Name? - Part 1",
    description: 'Learn to ask and answer about first names',
    type: 'video-series',
    videos: hebaVideos.slice(0, 2),
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-5',
    title: "What's Your Name? - Part 2",
    description: 'Learn to spell your name',
    type: 'video-series',
    videos: hebaVideos.slice(2, 4),
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-6',
    title: 'Name Practice',
    description: 'Record your name and check pronunciation',
    type: 'name-recording',
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'm2-lesson-7',
    title: "What's Your Name? - Part 3",
    description: 'Learn about last names',
    type: 'video-series',
    videos: hebaVideos.slice(4, 6),
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-8',
    title: "What's Your Name? - Part 4",
    description: 'Spelling last names',
    type: 'video-series',
    videos: hebaVideos.slice(6, 8),
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-9',
    title: 'Spelling Practice',
    description: 'Listen to spellings and pick the correct name',
    type: 'spelling-practice',
    spellingData: spellingPracticeData,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm2-lesson-10',
    title: 'Numbers 61-70',
    description: 'Match audio with numbers',
    type: 'numbers-audio-matching',
    content: numbers61to70,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-11',
    title: 'Numbers 71-80',
    description: 'Match audio with numbers',
    type: 'numbers-audio-matching',
    content: numbers71to80,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-12',
    title: "What's Your Telephone Number?",
    description: 'Learn to say telephone numbers',
    type: 'video-series',
    videos: hebaTelephoneVideos,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-13',
    title: 'Telephone Number Practice',
    description: 'Practice saying your telephone number',
    type: 'telephone-practice',
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'm2-lesson-14a',
    title: 'Ordinal Numbers 16-22',
    description: 'Listen and match ordinal numbers',
    type: 'ordinal-audio-matching',
    content: ordinalNumbers16to22,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-14b',
    title: 'Ordinal Numbers 23-31',
    description: 'Listen and match ordinal numbers',
    type: 'ordinal-audio-matching',
    content: ordinalNumbers23to31,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-15',
    title: 'Months of the Year',
    description: 'Learn the 12 months',
    type: 'months',
    content: monthsData,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-16',
    title: 'Months in Order',
    description: 'Put the months in the correct order',
    type: 'months-order',
    content: monthsData,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm2-lesson-17',
    title: 'Vocabulary 2',
    description: 'Learn address and location words',
    type: 'vocabulary',
    content: module2Vocabulary2,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-17b',
    title: 'Vocabulary 2 - Matching',
    description: 'Match English words with translations',
    type: 'vocabulary-matching',
    content: module2Vocabulary2,
    isCompleted: false,
    duration: '6 min',
  },
  {
    id: 'm2-lesson-18',
    title: 'Numbers 81-90',
    description: 'Match audio with numbers',
    type: 'numbers-audio-matching',
    content: numbers81to90,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-19',
    title: 'Numbers 91-100',
    description: 'Match audio with numbers',
    type: 'numbers-audio-matching',
    content: numbers91to100,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-20',
    title: "What's Your Date of Birth?",
    description: 'Listen and learn about date of birth',
    type: 'listening-lesson',
    videos: hebaDateOfBirthVideos,
    isCompleted: false,
    duration: '10 min',
  },
  {
    id: 'm2-lesson-21',
    title: 'Date of Birth Practice',
    description: 'Practice saying your date of birth',
    type: 'date-of-birth-practice',
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'm2-lesson-22',
    title: "What's Your Address?",
    description: 'Learn to talk about your address',
    type: 'video-series',
    videos: hebaAddressVideos,
    isCompleted: false,
    duration: '8 min',
  },
  {
    id: 'm2-lesson-23',
    title: 'How to Say Your Address',
    description: 'Learn step-by-step how to say your full address',
    type: 'address-video-series',
    videos: hebaAddressHowToVideos,
    isCompleted: false,
    duration: '12 min',
  },
  {
    id: 'm2-lesson-24',
    title: 'Address Word Order Practice',
    description: "Put Heba's address in the correct order",
    type: 'address-word-order',
    isCompleted: false,
    duration: '5 min',
  },
  {
    id: 'm2-lesson-25',
    title: 'Module 2 Complete!',
    description: 'Review everything you learned in Module 2',
    type: 'module-complete',
    isCompleted: false,
    duration: '2 min',
  },
];
