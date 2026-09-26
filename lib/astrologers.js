const p = (en, hi) => ({ en, hi });

export const SKILLS = {
  vedic: p('Vedic', 'वैदिक'),
  tarot: p('Tarot Reading', 'टैरो रीडिंग'),
  vastu: p('Vastu Shastra', 'वास्तु शास्त्र'),
  numerology: p('Numerology', 'अंक ज्योतिष'),
  kp: p('KP System', 'केपी पद्धति'),
  palm: p('Palmistry', 'हस्तरेखा'),
  prashna: p('Prashna', 'प्रश्न कुंडली'),
  reiki: p('Reiki Healing', 'रेकी हीलिंग'),
  lalkitab: p('Lal Kitab', 'लाल किताब'),
  face: p('Face Reading', 'मुख पठन'),
};

export const LANGS = { en: p('English', 'अंग्रेज़ी'), hi: p('Hindi', 'हिंदी'), pa: p('Punjabi', 'पंजाबी'), mr: p('Marathi', 'मराठी'), bn: p('Bengali', 'बांग्ला'), gu: p('Gujarati', 'गुजराती') };

// Fictional astrologer profiles used across the site.
export const ASTROLOGERS = [
  { id: 1, name: p('Acharya Raghav Shastri', 'आचार्य राघव शास्त्री'), skills: ['vedic', 'kp', 'prashna'], langs: ['hi', 'en'], exp: 18, rating: 4.96, orders: 12840, price: 25, oldPrice: 45, online: true, hue: 28, focus: ['career', 'marriage'] },
  { id: 2, name: p('Tarot Meenakshi', 'टैरो मीनाक्षी'), skills: ['tarot', 'reiki'], langs: ['en', 'hi'], exp: 7, rating: 4.93, orders: 7686, price: 12, oldPrice: 30, online: true, hue: 330, focus: ['love', 'woman'] },
  { id: 3, name: p('Pandit Devendra Mishra', 'पंडित देवेंद्र मिश्रा'), skills: ['vedic', 'lalkitab', 'vastu'], langs: ['hi'], exp: 24, rating: 4.92, orders: 13820, price: 39, online: true, hue: 18, focus: ['marriage', 'money'] },
  { id: 4, name: p('Dr. Ananya Joshi', 'डॉ. अनन्या जोशी'), skills: ['vedic', 'numerology'], langs: ['en', 'hi', 'mr'], exp: 11, rating: 4.95, orders: 9210, price: 30, oldPrice: 50, online: false, hue: 280, focus: ['career', 'woman', 'business'] },
  { id: 5, name: p('Numerologist Rohit Verma', 'अंकशास्त्री रोहित वर्मा'), skills: ['numerology', 'vastu'], langs: ['hi', 'en', 'pa'], exp: 9, rating: 4.89, orders: 5530, price: 18, online: true, hue: 200, focus: ['business', 'money'] },
  { id: 6, name: p('Vastu Acharya Sunita', 'वास्तु आचार्या सुनीता'), skills: ['vastu', 'face'], langs: ['hi', 'gu'], exp: 15, rating: 4.9, orders: 6120, price: 28, online: true, hue: 45, focus: ['money', 'woman'] },
  { id: 7, name: p('Tarot Ishita', 'टैरो इशिता'), skills: ['tarot', 'numerology'], langs: ['en', 'hi', 'bn'], exp: 4, rating: 4.94, orders: 1367, price: 12, oldPrice: 22, online: true, hue: 350, focus: ['love'] },
  { id: 8, name: p('Pandit Harish Tiwari', 'पंडित हरीश तिवारी'), skills: ['vedic', 'palm', 'prashna'], langs: ['hi'], exp: 30, rating: 4.97, orders: 21450, price: 49, online: false, hue: 10, focus: ['marriage', 'career'] },
  { id: 9, name: p('Astro Kavya', 'एस्ट्रो काव्या'), skills: ['vedic', 'tarot'], langs: ['en', 'hi'], exp: 6, rating: 4.88, orders: 3290, price: 15, online: true, hue: 300, focus: ['love', 'woman'] },
];

export const LIVE_SESSIONS = [
  { astro: 1, topic: p('What does your planet say?', 'आपका ग्रह क्या कहता है?') },
  { astro: 7, topic: p('Money horoscope this week', 'इस सप्ताह का धन राशिफल') },
  { astro: 2, topic: p('Pick a card: what’s coming?', 'एक कार्ड चुनें: आगे क्या है?') },
  { astro: 4, topic: p('Pitru Paksha remedies', 'पितृ पक्ष के उपाय') },
  { astro: 9, topic: p('Will your ex come back?', 'क्या आपका पुराना प्यार लौटेगा?') },
];

export const getAstrologer = (id) => ASTROLOGERS.find((a) => a.id === id);

export const initials = (name) =>
  name
    .replace(/^(Acharya|Pandit|Tarot|Dr\.|Numerologist|Vastu|Astro)\s+/g, '')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
