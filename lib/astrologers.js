const p = (en, hi) => ({ en, hi });

export const SKILLS = {
  counseling: p('Counselling', 'काउंसलिंग'),
  palm: p('Palmistry', 'हस्तरेखा'),
  tantra: p('Tantra Vigyan', 'तंत्र-विज्ञान'),
  shastra: p('Shastra', 'शास्त्र'),
  jyotish: p('Jyotish', 'ज्योतिष'),
  karmkand: p('Karmkand', 'कर्मकांड'),
  prashna: p('Prashna Jyotish', 'प्रश्न ज्योतिष'),
  vastu: p('Vastu', 'वास्तु'),
};

export const PANEL_INTRO = p(
  'Our panel of experts brings together experienced guides and specialists in various Indian knowledge traditions. You can benefit from their knowledge and guidance across fields such as Jyotish, Shastra, Karmkand, Vastu, Tantra Vigyan, Palmistry and Counselling.',
  'हमारे विशेषज्ञ मंडल में विभिन्न भारतीय ज्ञान-विधाओं के अनुभवी एवं विषय-विशेषज्ञ मार्गदर्शक सम्मिलित हैं। ज्योतिष, शास्त्र, कर्मकांड, वास्तु, तंत्र-विज्ञान, हस्तरेखा तथा काउंसलिंग जैसे विविध क्षेत्रों में इनके ज्ञान एवं मार्गदर्शन का लाभ प्राप्त किया जा सकता है।'
);

// Our panel of experts (हमारे विशेषज्ञ मंडल).
export const ASTROLOGERS = [
  {
    id: 1,
    name: p('Ashish Kumar Ji', 'आशीष कुमार जी'),
    title: p('Counselling & Guidance Expert', 'काउंसलिंग एवं परामर्श विशेषज्ञ'),
    bio: p('Expert in personal guidance, consultation and counselling.', 'व्यक्तिगत मार्गदर्शन, परामर्श एवं काउंसलिंग के क्षेत्र में विशेषज्ञ।'),
    skills: ['counseling'],
    hue: 200,
  },
  {
    id: 2,
    name: p('Puneet Sharma Ji', 'पुनीत शर्मा जी'),
    title: p('Palmistry Expert', 'हस्तरेखा विशेषज्ञ'),
    bio: p('Expert in palmistry and related guidance.', 'हस्तरेखा शास्त्र एवं उससे संबंधित मार्गदर्शन के विशेषज्ञ।'),
    skills: ['palm'],
    hue: 330,
  },
  {
    id: 3,
    name: p('Pankaj Kumar Ji', 'पंकज कुमार जी'),
    title: p('Tantra Vigyan Expert', 'तंत्र-विज्ञान विशेषज्ञ'),
    bio: p('Expert in Tantra Shastra and Tantra Vigyan.', 'तंत्र शास्त्र एवं तंत्र-विज्ञान के क्षेत्र में विशेषज्ञ।'),
    skills: ['tantra'],
    hue: 280,
  },
  {
    id: 4,
    name: p('Dr. Umesh Kumar', 'डॉ. उमेश कुमार'),
    title: p('Shastra Expert', 'शास्त्र विशेषज्ञ'),
    bio: p('Expert in Indian scriptures and traditional knowledge systems.', 'भारतीय शास्त्रों एवं पारंपरिक ज्ञान-विधाओं के विशेषज्ञ।'),
    skills: ['shastra'],
    hue: 18,
  },
  {
    id: 5,
    name: p('Dr. Dinesh Shastri', 'डॉ. दिनेश शास्त्री'),
    title: p('Jyotish Expert', 'ज्योतिष विशेषज्ञ'),
    bio: p('Expert and guide in Jyotish Shastra.', 'ज्योतिष शास्त्र के विशेषज्ञ एवं मार्गदर्शक।'),
    skills: ['jyotish'],
    hue: 28,
  },
  {
    id: 6,
    name: p('Acharya Nishant Sharma Ji', 'आचार्य निशांत शर्मा जी'),
    title: p('Jyotish & Karmkand Expert', 'ज्योतिष एवं कर्मकांड विशेषज्ञ'),
    bio: p('Expert in Jyotish Shastra and Vedic Karmkand.', 'ज्योतिष शास्त्र तथा वैदिक कर्मकांड के क्षेत्र में विशेषज्ञ।'),
    skills: ['jyotish', 'karmkand'],
    hue: 45,
  },
  {
    id: 7,
    name: p('Dr. Tushar Sharma', 'डॉ. तुषार शर्मा'),
    title: p('Prashna Jyotish & Vastu Expert', 'प्रश्न ज्योतिष एवं वास्तु विशेषज्ञ'),
    bio: p('Expert and guide in Prashna Jyotish and Vastu Shastra.', 'प्रश्न ज्योतिष तथा वास्तु शास्त्र के विशेषज्ञ एवं मार्गदर्शक।'),
    skills: ['prashna', 'vastu'],
    hue: 160,
  },
  {
    id: 8,
    name: p('Dr. Tarun Shastri', 'डॉ. तरुण शास्त्री'),
    title: p('Jyotish Alankar & Shastra Expert', 'ज्योतिष अलंकार एवं शास्त्र विशेषज्ञ'),
    bio: p('Expert and scholar of Jyotish and the Indian Shastra tradition.', 'ज्योतिष एवं भारतीय शास्त्र-परंपरा के विशेषज्ञ एवं अध्येता।'),
    skills: ['jyotish', 'shastra'],
    hue: 10,
  },
];

export const LIVE_SESSIONS = [
  { astro: 5, topic: p('What does your planet say?', 'आपका ग्रह क्या कहता है?') },
  { astro: 7, topic: p('Vastu for a happy home', 'सुखी घर के लिए वास्तु') },
  { astro: 2, topic: p('What do your palm lines say?', 'आपकी हस्तरेखा क्या कहती है?') },
  { astro: 6, topic: p('Pitru Paksha remedies', 'पितृ पक्ष के उपाय') },
  { astro: 1, topic: p('Finding clarity in tough times', 'कठिन समय में स्पष्टता') },
];

export const getAstrologer = (id) => ASTROLOGERS.find((a) => a.id === id);

export const expertNo = (astro) => String(astro.id).padStart(2, '0');

export const initials = (name) =>
  name
    .replace(/^(Acharya|Pandit|Dr\.)\s+/g, '')
    .replace(/\s+Ji$/, '')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
