// Question categories shared by every Prashna method.
// house  = karya bhava (the house that "owns" the question) used by Prashna Kundali and Ank Prashna.
// swar   = which breath (swar) suits this kind of work in Swar Prashna: 'moon' (calm, lasting) or 'sun' (hard, quick).
const p = (en, hi) => ({ en, hi });

export const CATEGORIES = [
  { key: 'general', icon: '🙏', house: 11, swar: 'moon', label: p('Any wish / general', 'सामान्य मनोकामना') },
  { key: 'marriage', icon: '💍', house: 7, swar: 'moon', label: p('Marriage', 'विवाह') },
  { key: 'love', icon: '💞', house: 5, swar: 'moon', label: p('Love & relationship', 'प्रेम संबंध') },
  { key: 'career', icon: '💼', house: 10, swar: 'sun', label: p('Job & career', 'नौकरी / करियर') },
  { key: 'business', icon: '📈', house: 7, swar: 'sun', label: p('Business & deal', 'व्यापार / सौदा') },
  { key: 'money', icon: '💰', house: 11, swar: 'sun', label: p('Money & gains', 'धन लाभ') },
  { key: 'health', icon: '🩺', house: 1, swar: 'moon', label: p('Health & recovery', 'स्वास्थ्य / रोग मुक्ति') },
  { key: 'education', icon: '📚', house: 5, swar: 'sun', label: p('Exam & education', 'परीक्षा / शिक्षा') },
  { key: 'children', icon: '👶', house: 5, swar: 'moon', label: p('Children', 'संतान') },
  { key: 'travel', icon: '✈️', house: 9, swar: 'moon', label: p('Travel & foreign', 'यात्रा / विदेश') },
  { key: 'property', icon: '🏠', house: 4, swar: 'moon', label: p('House, land & vehicle', 'घर, भूमि, वाहन') },
  { key: 'court', icon: '⚖️', house: 6, swar: 'sun', label: p('Court case & dispute', 'मुकदमा / विवाद') },
  { key: 'lost', icon: '🔍', house: 2, swar: 'moon', label: p('Lost or stolen item', 'खोई / चोरी हुई वस्तु') },
  { key: 'return', icon: '🚪', house: 7, swar: 'moon', label: p('Will someone return?', 'क्या कोई लौटेगा?') },
];

export const getCategory = (key) => CATEGORIES.find((c) => c.key === key) || CATEGORIES[0];

/** The four answers every method reduces to. */
export const VERDICTS = {
  yes: { tone: 'yes', icon: '✅', label: p('Yes — the work will succeed', 'हाँ — कार्य सिद्ध होगा') },
  likely: { tone: 'likely', icon: '🌤️', label: p('Likely — succeeds with effort', 'संभावना अच्छी — प्रयास से सिद्धि') },
  mixed: { tone: 'mixed', icon: '⏳', label: p('Mixed — delay or doubt', 'मिश्रित — विलम्ब या संदेह') },
  no: { tone: 'no', icon: '🛑', label: p('Not now — obstacles', 'अभी नहीं — बाधाएँ हैं') },
};

/** Turn a numeric score into a verdict key. */
export function verdictFromScore(score, { yes = 5, likely = 2, mixed = -1 } = {}) {
  if (score >= yes) return 'yes';
  if (score >= likely) return 'likely';
  if (score >= mixed) return 'mixed';
  return 'no';
}

/** All Prashna methods, used by the hub, the homepage and the method switcher. */
export const METHODS = [
  {
    slug: 'ram-shalaka',
    icon: '🏹',
    title: p('Ram Shalaka Prashnavali', 'श्रीराम शलाका प्रश्नावली'),
    short: p('Ramcharitmanas chaupai', 'रामचरितमानस की चौपाई'),
    text: p(
      'Touch one of 225 letters with Shri Ram in mind; every 9th letter forms one of 9 chaupais from the Ramcharitmanas, and the chaupai gives the answer.',
      'श्रीराम का ध्यान कर 225 अक्षरों में से एक पर अँगुली रखें; हर नौवाँ अक्षर रामचरितमानस की 9 में से एक चौपाई बनाता है और वही चौपाई उत्तर देती है।',
    ),
  },
  {
    slug: 'kundali',
    icon: '🪐',
    title: p('Prashna Kundali', 'प्रश्न कुंडली'),
    short: p('Chart of the moment you ask', 'प्रश्न के क्षण की कुंडली'),
    text: p(
      'No birth details needed. A chart is cast for the exact moment and place of your question; Lagna, the house of the question, their lords and the Moon give the answer.',
      'जन्म विवरण की आवश्यकता नहीं। प्रश्न के ठीक समय और स्थान की कुंडली बनती है; लग्न, कार्य भाव, उनके स्वामी और चंद्रमा उत्तर देते हैं।',
    ),
  },
  {
    slug: 'hast-rekha',
    icon: '✋',
    title: p('Hast Rekha Prashna', 'हस्त रेखा प्रश्न'),
    short: p('Palm photo + Anguli prashna', 'हथेली की फ़ोटो + अंगुली प्रश्न'),
    text: p(
      'Ask your question and upload a palm photo for an AI answer from your lines and mounts, or use the traditional finger (anguli) method without a photo.',
      'अपना प्रश्न लिखें और हथेली की फ़ोटो से AI द्वारा रेखाओं-पर्वतों के आधार पर उत्तर पाएँ, या बिना फ़ोटो पारम्परिक अंगुली प्रश्न विधि अपनाएँ।',
    ),
  },
  {
    slug: 'phal-sabzi',
    icon: '🥭',
    title: p('Fruit, Vegetable & Flower Prashna', 'फल-सब्ज़ी-पुष्प प्रश्न'),
    short: p('Name the first one that comes to mind', 'मन में आया पहला नाम बोलें'),
    text: p(
      'Say the first fruit, vegetable or flower that comes to mind. Its letters, its first syllable (nakshatra) and its nature answer your question.',
      'मन में आया पहला फल, सब्ज़ी या फूल बोलें। उसके अक्षर, पहला अक्षर (नक्षत्र) और उसका स्वभाव आपके प्रश्न का उत्तर देते हैं।',
    ),
  },
  {
    slug: 'ank',
    icon: '🔢',
    title: p('Ank Prashna (1–108)', 'अंक प्रश्न (1–108)'),
    short: p('Think of a number', 'एक अंक सोचें'),
    text: p(
      'Think of any number from 1 to 108. It fixes the Prashna Lagna (one of the 108 navamsha padas) and the current planets answer from there.',
      '1 से 108 तक कोई भी अंक सोचें। वह 108 नवांश चरणों में से प्रश्न लग्न तय करता है और वर्तमान ग्रह वहीं से उत्तर देते हैं।',
    ),
  },
  {
    slug: 'swar',
    icon: '🌬️',
    title: p('Swar Prashna', 'स्वर प्रश्न'),
    short: p('Which nostril is flowing?', 'कौन-सा स्वर चल रहा है?'),
    text: p(
      'From Shiva Swarodaya: check which nostril is flowing at the moment of the question. Ida (left), Pingala (right) or Sushumna (both) gives the answer.',
      'शिव स्वरोदय से: प्रश्न के क्षण कौन-सा स्वर चल रहा है देखें। इड़ा (बायाँ), पिंगला (दायाँ) या सुषुम्ना (दोनों) उत्तर देता है।',
    ),
  },
];
