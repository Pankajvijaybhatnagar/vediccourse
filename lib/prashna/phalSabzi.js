// Phal-Sabzi-Pushp (Naam) Prashna — the querent says the first fruit, vegetable or flower that comes to mind.
// The answer combines four traditional checks:
//   1. Akshar ganana  — (letters in the Hindi name + weekday number) ÷ 3, remainder decides.
//   2. Namakshar      — first syllable → nakshatra (avakahada chakra) → nakshatra nature.
//   3. Tara bala      — that nakshatra counted from the Moon's nakshatra at the moment of asking.
//   4. Swabhav        — the item's ruling planet and taste (rasa), as in folk tradition.
import { countAkshar, nakshatraForName, natureOf, taraFrom, moonNakshatraNow, nakLord } from './nakshatra';
import { verdictFromScore } from './categories';

const p = (en, hi) => ({ en, hi });

// [id, Hindi, English, emoji, planet, rasa]
const FRUITS = [
  ['aam', 'आम', 'Mango', '🥭', 'sun', 'madhur'],
  ['kela', 'केला', 'Banana', '🍌', 'jupiter', 'madhur'],
  ['seb', 'सेब', 'Apple', '🍎', 'venus', 'madhur'],
  ['anar', 'अनार', 'Pomegranate', '🔴', 'mars', 'khattaMeetha'],
  ['angoor', 'अंगूर', 'Grapes', '🍇', 'venus', 'khattaMeetha'],
  ['nariyal', 'नारियल', 'Coconut', '🥥', 'moon', 'madhur'],
  ['santra', 'संतरा', 'Orange', '🍊', 'jupiter', 'khattaMeetha'],
  ['papita', 'पपीता', 'Papaya', '🧡', 'jupiter', 'madhur'],
  ['amrood', 'अमरूद', 'Guava', '🍐', 'mercury', 'madhur'],
  ['tarbooz', 'तरबूज़', 'Watermelon', '🍉', 'moon', 'madhur'],
  ['kharbooja', 'ख़रबूज़ा', 'Muskmelon', '🍈', 'moon', 'madhur'],
  ['nashpati', 'नाशपाती', 'Pear', '🍐', 'venus', 'madhur'],
  ['chiku', 'चीकू', 'Sapota (Chikoo)', '🟤', 'saturn', 'madhur'],
  ['amla', 'आँवला', 'Indian gooseberry (Amla)', '🟢', 'jupiter', 'kashaya'],
  ['jamun', 'जामुन', 'Jamun (Java plum)', '🫐', 'saturn', 'kashaya'],
  ['ber', 'बेर', 'Ber (Jujube)', '🟠', 'saturn', 'khattaMeetha'],
  ['nimbu', 'नींबू', 'Lemon', '🍋', 'sun', 'amla'],
  ['ananas', 'अनानास', 'Pineapple', '🍍', 'mars', 'khattaMeetha'],
  ['litchi', 'लीची', 'Litchi', '⚪', 'venus', 'madhur'],
  ['strawberry', 'स्ट्रॉबेरी', 'Strawberry', '🍓', 'mars', 'khattaMeetha'],
  ['khajoor', 'खजूर', 'Dates', '🟫', 'sun', 'madhur'],
  ['anjeer', 'अंजीर', 'Fig', '🟣', 'jupiter', 'madhur'],
  ['mausami', 'मौसमी', 'Sweet lime', '🟡', 'moon', 'khattaMeetha'],
  ['sitaphal', 'सीताफल', 'Custard apple', '💚', 'mercury', 'madhur'],
  ['kathal', 'कटहल', 'Jackfruit', '🟩', 'jupiter', 'madhur'],
  ['bel', 'बेल', 'Bael (Wood apple)', '🟤', 'sun', 'kashaya'],
  ['imli', 'इमली', 'Tamarind', '🤎', 'saturn', 'amla'],
  ['kiwi', 'कीवी', 'Kiwi', '🥝', 'mercury', 'khattaMeetha'],
  ['cherry', 'चेरी', 'Cherry', '🍒', 'mars', 'madhur'],
  ['aloobukhara', 'आलूबुख़ारा', 'Plum', '🟣', 'venus', 'khattaMeetha'],
  ['dragon', 'ड्रैगन फ्रूट', 'Dragon fruit', '🩷', 'rahu', 'madhur'],
  ['shahtoot', 'शहतूत', 'Mulberry', '⚫', 'saturn', 'madhur'],
  ['phalsa', 'फालसा', 'Phalsa', '🟪', 'mars', 'khattaMeetha'],
  ['khubani', 'ख़ुबानी', 'Apricot', '🟠', 'sun', 'madhur'],
  ['singhara', 'सिंघाड़ा', 'Water chestnut', '🖤', 'moon', 'madhur'],
  ['kamrakh', 'कमरख', 'Star fruit', '⭐', 'mercury', 'amla'],
  ['blueberry', 'ब्लूबेरी', 'Blueberry', '🫐', 'saturn', 'khattaMeetha'],
  ['avocado', 'एवोकाडो', 'Avocado', '🥑', 'venus', 'madhur'],
];

const VEGETABLES = [
  ['aloo', 'आलू', 'Potato', '🥔', 'moon', 'madhur'],
  ['tamatar', 'टमाटर', 'Tomato', '🍅', 'mars', 'amla'],
  ['pyaz', 'प्याज़', 'Onion', '🧅', 'rahu', 'katu'],
  ['lahsun', 'लहसुन', 'Garlic', '🧄', 'ketu', 'katu'],
  ['gajar', 'गाजर', 'Carrot', '🥕', 'mars', 'madhur'],
  ['mooli', 'मूली', 'Radish', '⚪', 'moon', 'katu'],
  ['gobhi', 'गोभी', 'Cauliflower', '🥦', 'moon', 'madhur'],
  ['pattagobhi', 'पत्तागोभी', 'Cabbage', '🥬', 'moon', 'madhur'],
  ['bhindi', 'भिंडी', 'Okra (Lady finger)', '🟢', 'mercury', 'madhur'],
  ['baingan', 'बैंगन', 'Brinjal', '🍆', 'saturn', 'katu'],
  ['lauki', 'लौकी', 'Bottle gourd', '🟩', 'moon', 'madhur'],
  ['karela', 'करेला', 'Bitter gourd', '🥒', 'saturn', 'tikta'],
  ['torai', 'तोरई', 'Ridge gourd', '🥒', 'mercury', 'madhur'],
  ['kaddu', 'कद्दू', 'Pumpkin', '🎃', 'jupiter', 'madhur'],
  ['palak', 'पालक', 'Spinach', '🥬', 'mercury', 'kashaya'],
  ['matar', 'मटर', 'Peas', '🫛', 'mercury', 'madhur'],
  ['shimla', 'शिमला मिर्च', 'Capsicum', '🫑', 'mars', 'madhur'],
  ['mirch', 'हरी मिर्च', 'Green chilli', '🌶️', 'mars', 'katu'],
  ['kheera', 'खीरा', 'Cucumber', '🥒', 'moon', 'madhur'],
  ['adrak', 'अदरक', 'Ginger', '🫚', 'sun', 'katu'],
  ['chukandar', 'चुकंदर', 'Beetroot', '🟥', 'mars', 'madhur'],
  ['shakarkand', 'शकरकंद', 'Sweet potato', '🍠', 'venus', 'madhur'],
  ['arbi', 'अरबी', 'Taro (Arbi)', '🟤', 'moon', 'madhur'],
  ['parwal', 'परवल', 'Pointed gourd', '🟢', 'mercury', 'madhur'],
  ['tinda', 'टिंडा', 'Round gourd (Tinda)', '🟢', 'mercury', 'madhur'],
  ['sem', 'सेम', 'Flat beans', '🫛', 'mercury', 'kashaya'],
  ['mushroom', 'मशरूम', 'Mushroom', '🍄', 'rahu', 'madhur'],
  ['dhaniya', 'धनिया', 'Coriander', '🌿', 'mercury', 'kashaya'],
  ['methi', 'मेथी', 'Fenugreek', '🌱', 'ketu', 'tikta'],
  ['shalgam', 'शलजम', 'Turnip', '🟣', 'moon', 'madhur'],
  ['sahjan', 'सहजन', 'Drumstick', '🥢', 'mars', 'katu'],
  ['gwar', 'ग्वार फली', 'Cluster beans', '🫛', 'mercury', 'kashaya'],
  ['kachchakela', 'कच्चा केला', 'Raw banana', '🍌', 'jupiter', 'kashaya'],
  ['bhutta', 'भुट्टा', 'Corn', '🌽', 'sun', 'madhur'],
  ['suran', 'सूरन', 'Elephant yam', '🟫', 'rahu', 'katu'],
  ['petha', 'पेठा', 'Ash gourd', '⚪', 'moon', 'madhur'],
  ['kundru', 'कुंदरू', 'Ivy gourd', '🟢', 'mercury', 'madhur'],
  ['sarson', 'सरसों का साग', 'Mustard greens', '🥬', 'saturn', 'katu'],
];

const FLOWERS = [
  ['gulab', 'गुलाब', 'Rose', '🌹', 'venus', 'madhur'],
  ['kamal', 'कमल', 'Lotus', '🪷', 'sun', 'madhur'],
  ['genda', 'गेंदा', 'Marigold', '🌼', 'jupiter', 'tikta'],
  ['chameli', 'चमेली', 'Jasmine', '🤍', 'moon', 'madhur'],
  ['mogra', 'मोगरा', 'Mogra (Arabian jasmine)', '💮', 'venus', 'madhur'],
  ['gudhal', 'गुड़हल', 'Hibiscus', '🌺', 'mars', 'kashaya'],
  ['rajnigandha', 'रजनीगंधा', 'Tuberose', '🌾', 'venus', 'madhur'],
  ['surajmukhi', 'सूरजमुखी', 'Sunflower', '🌻', 'sun', 'madhur'],
  ['kaner', 'कनेर', 'Oleander (Kaner)', '🌸', 'jupiter', 'tikta'],
  ['parijat', 'पारिजात', 'Night jasmine (Harsingar)', '🏵️', 'moon', 'tikta'],
  ['champa', 'चंपा', 'Champa (Frangipani)', '🌼', 'jupiter', 'madhur'],
  ['bela', 'बेला', 'Bela (Jasmine)', '🤍', 'moon', 'madhur'],
  ['aparajita', 'अपराजिता', 'Butterfly pea', '💙', 'saturn', 'kashaya'],
  ['dhatura', 'धतूरा', 'Datura', '🤍', 'rahu', 'tikta'],
  ['madar', 'मदार', 'Aak (Crown flower)', '💜', 'sun', 'katu'],
  ['kumudini', 'कुमुदिनी', 'Water lily', '🪷', 'moon', 'madhur'],
  ['palash', 'पलाश', 'Palash (Flame of the forest)', '🔥', 'mars', 'kashaya'],
  ['tulsi', 'तुलसी मंजरी', 'Tulsi manjari', '🌿', 'jupiter', 'katu'],
];

const toItems = (rows, kind) => rows.map(([id, hi, en, emoji, planet, rasa]) => ({ id, kind, name: { en, hi }, emoji, planet, rasa }));

export const KINDS = [
  { key: 'fruit', label: p('Fruits', 'फल'), icon: '🍎', items: toItems(FRUITS, 'fruit') },
  { key: 'vegetable', label: p('Vegetables', 'सब्ज़ियाँ'), icon: '🥕', items: toItems(VEGETABLES, 'vegetable') },
  { key: 'flower', label: p('Flowers', 'फूल'), icon: '🌸', items: toItems(FLOWERS, 'flower') },
];
export const ALL_ITEMS = KINDS.flatMap((k) => k.items);

export const PLANET_PHAL = {
  sun: { score: 1, name: p('Sun', 'सूर्य'), text: p('Honour, government work and father — success with dignity.', 'मान-सम्मान, सरकारी कार्य, पिता — प्रतिष्ठा के साथ सफलता।') },
  moon: { score: 1, name: p('Moon', 'चंद्र'), text: p('Mind, water, mother and travel — good, but the mind may waver.', 'मन, जल, माता, यात्रा — शुभ, पर मन डगमगा सकता है।') },
  mars: { score: 0, name: p('Mars', 'मंगल'), text: p('Courage, land and struggle — success after a fight or effort.', 'साहस, भूमि, संघर्ष — प्रयास या संघर्ष के बाद सफलता।') },
  mercury: { score: 1, name: p('Mercury', 'बुध'), text: p('Intellect, speech and trade — talk and planning bring success.', 'बुद्धि, वाणी, व्यापार — बातचीत और योजना से सफलता।') },
  jupiter: { score: 2, name: p('Jupiter', 'गुरु'), text: p('Wisdom, marriage, children and dharma — very auspicious.', 'ज्ञान, विवाह, संतान, धर्म — अति शुभ।') },
  venus: { score: 2, name: p('Venus', 'शुक्र'), text: p('Love, beauty and comfort — happy and pleasant result.', 'प्रेम, सौंदर्य, सुख — सुखद परिणाम।') },
  saturn: { score: -1, name: p('Saturn', 'शनि'), text: p('Patience and hard work — result comes late but lasts.', 'धैर्य और परिश्रम — परिणाम देर से, पर टिकाऊ।') },
  rahu: { score: -1, name: p('Rahu', 'राहु'), text: p('Confusion, foreign links, sudden turns — check facts carefully.', 'भ्रम, विदेश संबंध, अचानक मोड़ — तथ्य ध्यान से जाँचें।') },
  ketu: { score: -1, name: p('Ketu', 'केतु'), text: p('Detachment and hidden matters — something is not yet clear.', 'वैराग्य और छिपी बातें — अभी कुछ स्पष्ट नहीं।') },
};

export const RASA = {
  madhur: { score: 2, name: p('Sweet (madhur)', 'मधुर (मीठा)'), text: p('Sweet taste — sweet result.', 'मीठा स्वाद — मीठा परिणाम।') },
  khattaMeetha: { score: 1, name: p('Sweet-sour', 'खट्टा-मीठा'), text: p('Sweet and sour — some ups and downs, then success.', 'खट्टा-मीठा — कुछ उतार-चढ़ाव, फिर सफलता।') },
  amla: { score: 0, name: p('Sour (amla)', 'अम्ल (खट्टा)'), text: p('Sour taste — small disputes or changes on the way.', 'खट्टा स्वाद — रास्ते में छोटे विवाद या बदलाव।') },
  kashaya: { score: -1, name: p('Astringent (kashaya)', 'कषाय (कसैला)'), text: p('Astringent — slow, needs patience.', 'कसैला — धीमी गति, धैर्य चाहिए।') },
  katu: { score: -1, name: p('Pungent (katu)', 'कटु (तीखा)'), text: p('Pungent — sharp words or heat; stay calm.', 'तीखा — कटु वचन या गर्मी; शांत रहें।') },
  tikta: { score: -2, name: p('Bitter (tikta)', 'तिक्त (कड़वा)'), text: p('Bitter — obstacles first; remedies help.', 'कड़वा — पहले बाधाएँ; उपाय लाभ देंगे।') },
};

const AKSHAR_RESULT = [
  { score: -2, text: p('Remainder 0 — the work is difficult right now.', 'शेष 0 — अभी कार्य कठिन है।') },
  { score: 2, text: p('Remainder 1 — quick success.', 'शेष 1 — शीघ्र सिद्धि।') },
  { score: 0, text: p('Remainder 2 — success after delay or effort.', 'शेष 2 — विलम्ब या प्रयास से सिद्धि।') },
];

export const VAAR_HI = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
export const VAAR_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Read a name.
 * @param {string} hiName Hindi (or English) name the querent said
 * @param {object|null} item the matching list item, if any (gives planet and taste)
 */
export function readName(hiName, item, date = new Date()) {
  const akshar = countAkshar(hiName);
  const vaar = date.getDay() + 1; // Sunday = 1
  const rem = (akshar + vaar) % 3;
  const ak = AKSHAR_RESULT[rem];

  const nm = nakshatraForName(hiName);
  const nature = nm ? natureOf(nm.nak) : null;
  const moonNak = moonNakshatraNow(date);
  const tara = nm ? taraFrom(moonNak, nm.nak) : null;
  const planet = item ? PLANET_PHAL[item.planet] : nm ? PLANET_PHAL[nakLord(nm.nak)] : null;
  const rasa = item ? RASA[item.rasa] : null;

  const score = ak.score + (nature?.score || 0) + (tara?.score || 0) + (planet?.score || 0) + (rasa?.score || 0);
  return {
    akshar,
    vaar,
    rem,
    ak,
    nm,
    nature,
    moonNak,
    tara,
    planet,
    planetFromNakshatra: !item && Boolean(nm),
    rasa,
    score,
    verdict: verdictFromScore(score, { yes: 5, likely: 2, mixed: -1 }),
  };
}
