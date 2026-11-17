// Nakshatra helpers for Naam (name) and Ank Prashna:
// avakahada chakra (first syllable → nakshatra), nakshatra nature (muhurta groups) and tara bala.
import { NAKSHATRAS, sidereal } from '../panchang';
import { moonLongitude } from '../astro';

const p = (en, hi) => ({ en, hi });

// Avakahada chakra: the 4 pada syllables of each nakshatra (Ashwini … Revati).
export const AVAKAHADA = [
  ['चु', 'चे', 'चो', 'ला'], ['ली', 'लू', 'ले', 'लो'], ['अ', 'इ', 'उ', 'ए'], ['ओ', 'वा', 'वी', 'वु'],
  ['वे', 'वो', 'का', 'की'], ['कु', 'घ', 'ङ', 'छ'], ['के', 'को', 'हा', 'ही'], ['हु', 'हे', 'हो', 'डा'],
  ['डी', 'डू', 'डे', 'डो'], ['मा', 'मी', 'मू', 'मे'], ['मो', 'टा', 'टी', 'टू'], ['टे', 'टो', 'पा', 'पी'],
  ['पू', 'ष', 'ण', 'ठ'], ['पे', 'पो', 'रा', 'री'], ['रू', 'रे', 'रो', 'ता'], ['ती', 'तू', 'ते', 'तो'],
  ['ना', 'नी', 'नू', 'ने'], ['नो', 'या', 'यी', 'यू'], ['ये', 'यो', 'भा', 'भी'], ['भू', 'धा', 'फा', 'ढा'],
  ['भे', 'भो', 'जा', 'जी'], ['खी', 'खू', 'खे', 'खो'], ['गा', 'गी', 'गु', 'गे'], ['गो', 'सा', 'सी', 'सु'],
  ['से', 'सो', 'दा', 'दी'], ['दु', 'थ', 'झ', 'ञ'], ['दे', 'दो', 'चा', 'ची'],
];

// Muhurta nature of each nakshatra.
export const NATURE = {
  kshipra: { name: p('Kshipra (swift)', 'क्षिप्र / लघु'), score: 2, text: p('Quick success — trade, medicine, learning and new starts go well.', 'शीघ्र सिद्धि — व्यापार, चिकित्सा, विद्या और नए आरम्भ शुभ।') },
  mridu: { name: p('Mridu (gentle)', 'मृदु / मैत्र'), score: 2, text: p('Gentle and friendly — love, marriage, friendship and arts succeed.', 'कोमल और मैत्रीपूर्ण — प्रेम, विवाह, मित्रता और कला में सफलता।') },
  dhruva: { name: p('Dhruva (fixed)', 'ध्रुव / स्थिर'), score: 2, text: p('Stable and lasting — house, marriage, foundations and long-term plans are blessed.', 'स्थिर और स्थायी — घर, विवाह, नींव और दीर्घकालीन योजनाएँ शुभ।') },
  chara: { name: p('Chara (movable)', 'चर / चल'), score: 1, text: p('Movement and change — travel, vehicles, job change succeed; other work keeps shifting.', 'गति और परिवर्तन — यात्रा, वाहन, नौकरी परिवर्तन शुभ; अन्य कार्यों में अस्थिरता।') },
  mishra: { name: p('Mishra (mixed)', 'मिश्र / साधारण'), score: 0, text: p('Mixed — routine work goes on, big results need effort.', 'मिश्रित — सामान्य कार्य चलेंगे, बड़े परिणाम के लिए प्रयास चाहिए।') },
  ugra: { name: p('Ugra (fierce)', 'उग्र / क्रूर'), score: -1, text: p('Fierce — good for competition and bold action, but gentle matters meet obstacles.', 'उग्र — प्रतियोगिता और साहसिक कार्य में ठीक, पर कोमल कार्यों में बाधा।') },
  tikshna: { name: p('Tikshna (sharp)', 'तीक्ष्ण / दारुण'), score: -2, text: p('Sharp — delays and hurdles; finish pending matters and do remedies first.', 'तीक्ष्ण — विलम्ब और अड़चनें; पहले अधूरे कार्य पूरे करें और उपाय करें।') },
};

const NATURE_OF = [
  'kshipra', 'ugra', 'mishra', 'dhruva', 'mridu', 'tikshna', 'chara', 'kshipra', 'tikshna', 'ugra', 'ugra', 'dhruva', 'kshipra', 'mridu',
  'chara', 'mishra', 'mridu', 'tikshna', 'tikshna', 'ugra', 'dhruva', 'chara', 'chara', 'chara', 'ugra', 'dhruva', 'mridu',
];
export const natureOf = (nak) => NATURE[NATURE_OF[nak]];

// Nakshatra lords (Vimshottari order from Ashwini).
const LORDS = ['ketu', 'venus', 'sun', 'moon', 'mars', 'rahu', 'jupiter', 'saturn', 'mercury'];
export const nakLord = (nak) => LORDS[nak % 9];

// Tara bala: count from the Moon's nakshatra at the moment of the question.
export const TARAS = [
  { name: p('Janma', 'जन्म'), score: 0, text: p('Same star as the Moon — mixed, depends on your effort.', 'चंद्र नक्षत्र से जन्म तारा — मिश्रित, प्रयास पर निर्भर।') },
  { name: p('Sampat', 'सम्पत'), score: 2, text: p('Wealth star — gain and success.', 'सम्पत तारा — लाभ और सफलता।') },
  { name: p('Vipat', 'विपत'), score: -2, text: p('Danger star — obstacles; proceed carefully.', 'विपत तारा — बाधाएँ; सावधानी से आगे बढ़ें।') },
  { name: p('Kshema', 'क्षेम'), score: 1, text: p('Well-being star — safe and comfortable outcome.', 'क्षेम तारा — कुशल और सुखद परिणाम।') },
  { name: p('Pratyari', 'प्रत्यरि'), score: -1, text: p('Opposing star — someone may stand against you.', 'प्रत्यरि तारा — कोई विरोध कर सकता है।') },
  { name: p('Sadhana', 'साधना'), score: 2, text: p('Achievement star — the goal is reached.', 'साधना तारा — लक्ष्य सिद्ध होगा।') },
  { name: p('Naidhana', 'नैधन / वध'), score: -2, text: p('Destruction star — not favourable now; wait.', 'नैधन तारा — अभी अनुकूल नहीं; प्रतीक्षा करें।') },
  { name: p('Mitra', 'मित्र'), score: 1, text: p('Friend star — help from friends.', 'मित्र तारा — मित्रों से सहायता।') },
  { name: p('Param Mitra', 'परम मित्र'), score: 2, text: p('Best-friend star — very favourable.', 'परम मित्र तारा — अत्यंत अनुकूल।') },
];

export function taraFrom(moonNak, targetNak) {
  const count = ((targetNak - moonNak + 27) % 27) + 1;
  return { count, ...TARAS[(count - 1) % 9] };
}

/** Sidereal nakshatra index of the Moon right now. */
export function moonNakshatraNow(date = new Date()) {
  const lon = sidereal(moonLongitude(date), date);
  return Math.floor(lon / (360 / 27));
}

// ---------------------------------------------------------------------------
// Devanagari helpers
// ---------------------------------------------------------------------------
const VIRAMA = '्';
const NUKTA = '़';
const isConsonant = (ch) => (ch >= 'क' && ch <= 'ह') || (ch >= 'क़' && ch <= 'य़');
const isVowel = (ch) => ch >= 'ऄ' && ch <= 'औ';
const isMatra = (ch) => (ch >= 'ा' && ch <= 'ौ') || ch === 'ॢ' || ch === 'ॣ';
const NUKTA_FORMS = { 'क़': 'क', 'ख़': 'ख', 'ग़': 'ग', 'ज़': 'ज', 'ड़': 'ड', 'ढ़': 'ढ', 'फ़': 'फ', 'य़': 'य' };

export const isDevanagari = (s) => /[ऀ-ॿ]/.test(s);

/** Count aksharas (syllables): every vowel or consonant that is not joined to the previous one by a halant. */
export function countAkshar(word) {
  const s = String(word || '').normalize('NFC');
  if (!isDevanagari(s)) {
    // Latin fallback: count vowel groups.
    return Math.max(1, (s.toLowerCase().match(/[aeiouy]+/g) || []).length);
  }
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (isVowel(ch)) n++;
    else if (isConsonant(ch) && s[i - 1] !== VIRAMA) n++;
  }
  return n;
}

/** Split the first akshara into [base consonant or vowel, matra]. */
function firstSyllable(word) {
  let s = String(word || '').normalize('NFC').trim();
  for (const [k, v] of Object.entries(NUKTA_FORMS)) s = s.replaceAll(k, v);
  s = s.replaceAll(NUKTA, '');
  if (s.startsWith('क्ष')) s = 'क' + s.slice(3);
  if (s.startsWith('त्र')) s = 'त' + s.slice(3);
  if (s.startsWith('ज्ञ')) s = 'ग' + s.slice(3);
  if (s.startsWith('श्र')) s = 'स' + s.slice(3);
  const first = s[0];
  if (!first) return null;
  if (isVowel(first)) return { base: first, matra: '' };
  if (!isConsonant(first)) return null;
  // Skip a conjunct: take the consonant after the last halant of the first cluster for the vowel sound.
  let i = 1;
  while (s[i] === VIRAMA && isConsonant(s[i + 1])) i += 2;
  return { base: first, matra: isMatra(s[i]) ? s[i] : '' };
}

const VOWEL_TO_GROUP = { 'अ': 'अ', 'आ': 'अ', 'इ': 'इ', 'ई': 'इ', 'उ': 'उ', 'ऊ': 'उ', 'ऋ': 'रि', 'ए': 'ए', 'ऐ': 'ए', 'ओ': 'ओ', 'औ': 'ओ' };
const CONS_ALIAS = { 'ब': 'व', 'श': 'स', 'ष': 'ष', 'ञ': 'ञ', 'ङ': 'ङ', 'ळ': 'ल', 'ऱ': 'र' };
// Nearest matra when the exact syllable is not in the chakra.
const MATRA_ALIAS = { 'ै': 'े', 'ौ': 'ो', 'ृ': 'ि', 'ॅ': 'े', 'ॉ': 'ो' };
const MATRA_FALLBACK = { '': ['ा', 'ि', 'ु', 'े', 'ो'], 'ा': ['', 'ि'], 'ि': ['ी', ''], 'ी': ['ि', ''], 'ु': ['ू', ''], 'ू': ['ु', ''], 'े': ['ै', 'ि', ''], 'ो': ['ौ', 'ु', ''] };

const LOOKUP = new Map();
AVAKAHADA.forEach((padas, nak) => padas.forEach((syl, i) => LOOKUP.set(syl, { nak, pada: i + 1, syllable: syl })));

/**
 * Find the nakshatra for a name from its first syllable (avakahada chakra).
 * @returns {{ nak, pada, syllable, name } | null}
 */
export function nakshatraForName(word) {
  const fs = firstSyllable(word);
  if (!fs) return null;
  const done = (hit) => (hit ? { ...hit, name: NAKSHATRAS[hit.nak], rashi: Math.floor((hit.nak * 4 + hit.pada - 1) / 9) } : null);
  if (isVowel(fs.base)) return done(LOOKUP.get(VOWEL_TO_GROUP[fs.base] || 'अ'));
  const base = CONS_ALIAS[fs.base] || fs.base;
  const matra = MATRA_ALIAS[fs.matra] ?? fs.matra;
  const tries = [matra, ...(MATRA_FALLBACK[matra] || [])];
  for (const m of tries) {
    const hit = LOOKUP.get(base + m);
    if (hit) return done(hit);
  }
  // Any syllable starting with this consonant.
  for (const [syl, hit] of LOOKUP) if (syl[0] === base) return done(hit);
  return null;
}
