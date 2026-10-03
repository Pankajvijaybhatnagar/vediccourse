// Turns a Kundli (from lib/kundli.js) into readable Phaladesh and a prioritised list of Upay.
// The rules are the common classical ones (dignity, combustion, dusthana, dasha lords,
// Manglik / Kaal Sarp / Grahan / Sade Sati); they give guidance, not certainties.
import { SIGNS } from '../zodiac';
import { grahaLongitudes } from '../astro';
import { sidereal } from '../panchang';
import { HOUSE_PHAL, HOUSE_TOPICS } from './houses';
import { LAGNA_PHAL, RASHI_PHAL, DASHA_PHAL } from './signs';

const p = (en, hi) => ({ en, hi });

// Lord of each sign, Aries … Pisces.
export const SIGN_LORD = ['mars', 'venus', 'mercury', 'moon', 'sun', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'saturn', 'jupiter'];
const EXALT = { sun: 0, moon: 1, mars: 9, mercury: 5, jupiter: 3, venus: 11, saturn: 6 };
const OWN = { sun: [4], moon: [3], mars: [0, 7], mercury: [2, 5], jupiter: [8, 11], venus: [1, 6], saturn: [9, 10] };
// Degrees from the Sun within which a graha is combust (asta).
const COMBUST = { moon: 12, mars: 17, mercury: 14, jupiter: 11, venus: 10, saturn: 15 };
const BENEFIC = ['moon', 'mercury', 'jupiter', 'venus'];
const KENDRA = [1, 4, 7, 10];
const DASHA = [['ketu', 7], ['venus', 20], ['sun', 6], ['moon', 10], ['mars', 7], ['rahu', 18], ['jupiter', 16], ['saturn', 19], ['mercury', 17]];
const YEAR_MS = 365.25 * 86400000;

const gap = (a, b) => {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
};
const signIdx = (sign) => SIGNS.indexOf(sign);
const ord = (n) => ({ en: `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`, hi: `${n}वें` });

function dignity(key, sIdx) {
  if (!(key in EXALT)) return null;
  if (EXALT[key] === sIdx) return 'exalted';
  if ((EXALT[key] + 6) % 12 === sIdx) return 'debilitated';
  if (OWN[key].includes(sIdx)) return 'own';
  return null;
}

export const DIGNITY_LABEL = {
  exalted: p('Exalted', 'उच्च'),
  debilitated: p('Debilitated', 'नीच'),
  own: p('Own sign', 'स्वराशि'),
  combust: p('Combust', 'अस्त'),
  retro: p('Retrograde', 'वक्री'),
};

const DIGNITY_NOTE = {
  exalted: p('It is exalted here, so it gives its best and strongest results.', 'यह यहाँ उच्च का है, इसलिए श्रेष्ठ और प्रबल फल देता है।'),
  debilitated: p('It is debilitated here, so its results come with struggle; its upay are recommended.', 'यह यहाँ नीच का है, इसलिए इसके फल संघर्ष के बाद मिलते हैं; इसके उपाय करना उचित है।'),
  own: p('It is in its own sign, so it is strong and stable.', 'यह स्वराशि में है, इसलिए बलवान और स्थिर है।'),
  combust: p('It is combust (too close to the Sun), which weakens its results.', 'यह अस्त है (सूर्य के बहुत निकट), जिससे इसके फल कमज़ोर होते हैं।'),
  retro: p('It is retrograde, so its results turn inward and may come after delays or second attempts.', 'यह वक्री है, इसलिए इसके फल भीतर की ओर मुड़ते हैं और देरी या दूसरे प्रयास के बाद मिल सकते हैं।'),
};

function antardasha(md, now) {
  if (!md) return null;
  const start = md.end.getTime() - md.years * YEAR_MS; // true start, even for the birth dasha
  const i0 = DASHA.findIndex(([lord]) => lord === md.lord);
  let cursor = start;
  for (let i = 0; i < 9; i++) {
    const [lord, years] = DASHA[(i0 + i) % 9];
    const end = cursor + (md.years * years * YEAR_MS) / 120;
    if (now >= cursor && now < end) return { lord, start: new Date(cursor), end: new Date(end) };
    cursor = end;
  }
  return null;
}

function saturnTransit(moonSign, now) {
  const satSign = Math.floor(sidereal(grahaLongitudes(now).saturn.lon, now) / 30);
  const rel = (satSign - moonSign + 12) % 12;
  const phase = { 11: 1, 0: 2, 1: 3 }[rel];
  if (phase) return { type: 'sadesati', phase, sign: SIGNS[satSign] };
  if (rel === 3) return { type: 'kantak', sign: SIGNS[satSign] };
  if (rel === 7) return { type: 'ashtam', sign: SIGNS[satSign] };
  return { type: 'none', sign: SIGNS[satSign] };
}

export function analyse(kundli, now = new Date()) {
  const by = Object.fromEntries(kundli.planets.map((pl) => [pl.key, pl]));
  const lagnaIdx = signIdx(kundli.lagna.sign);
  const moonIdx = signIdx(kundli.rashi);

  // ---- Graha phal -------------------------------------------------------
  const grahas = kundli.planets.map((pl) => {
    const sIdx = signIdx(pl.sign);
    const dig = dignity(pl.key, sIdx);
    const combust = pl.key in COMBUST && gap(pl.lon, by.sun.lon) < COMBUST[pl.key];
    const tags = [dig, combust && 'combust', pl.retro && 'retro'].filter(Boolean);
    const lordOf = [];
    for (let h = 1; h <= 12; h++) if (SIGN_LORD[(lagnaIdx + h - 1) % 12] === pl.key) lordOf.push(h);
    return { key: pl.key, name: pl.name, sign: pl.sign, house: pl.house, lordOf, tags, phal: HOUSE_PHAL[pl.key][pl.house - 1], notes: tags.map((tg) => DIGNITY_NOTE[tg]) };
  });
  const g = Object.fromEntries(grahas.map((x) => [x.key, x]));

  // ---- Lagna & Rashi ----------------------------------------------------
  const lagnaLord = SIGN_LORD[lagnaIdx];
  const llHouse = by[lagnaLord].house;
  const lagna = {
    phal: LAGNA_PHAL[lagnaIdx],
    lord: lagnaLord,
    lordHouse: llHouse,
    lordNote: p(
      `Your lagna lord sits in the ${ord(llHouse).en} house, so your life’s energy flows towards ${HOUSE_TOPICS[llHouse - 1].en}.`,
      `आपके लग्नेश ${ord(llHouse).hi} भाव में हैं, इसलिए जीवन की ऊर्जा ${HOUSE_TOPICS[llHouse - 1].hi} की ओर प्रवाहित होती है।`
    ),
  };
  const rashi = { phal: RASHI_PHAL[moonIdx] };

  // ---- Dasha ------------------------------------------------------------
  const md = kundli.currentDasha;
  const ad = antardasha(md, now.getTime());
  const dashaFor = (lord) => {
    const h = by[lord].house;
    return {
      lord,
      phal: DASHA_PHAL[lord],
      focus: p(
        `It sits in your ${ord(h).en} house, so this period especially affects ${HOUSE_TOPICS[h - 1].en}.`,
        `यह आपके ${ord(h).hi} भाव में है, इसलिए यह समय विशेष रूप से ${HOUSE_TOPICS[h - 1].hi} को प्रभावित करता है।`
      ),
    };
  };
  const dasha = md && { md: { ...dashaFor(md.lord), start: md.start, end: md.end }, ad: ad && { ...dashaFor(ad.lord), start: ad.start, end: ad.end } };

  // ---- Yogas ------------------------------------------------------------
  const yogas = [];
  const fromMoon = (key) => ((signIdx(by[key].sign) - moonIdx + 12) % 12) + 1;
  if (KENDRA.includes(fromMoon('jupiter'))) {
    yogas.push({ name: p('Gajakesari Yoga', 'गजकेसरी योग'), text: p('Jupiter is in a kendra from the Moon. This gives wisdom, respect, a good reputation and the ability to overcome obstacles.', 'गुरु चंद्रमा से केंद्र में है। यह ज्ञान, सम्मान, अच्छी प्रतिष्ठा और बाधाओं पर विजय की क्षमता देता है।') });
  }
  if (by.sun.house === by.mercury.house) {
    yogas.push({ name: p('Budhaditya Yoga', 'बुधादित्य योग'), text: p('The Sun and Mercury are together. This sharpens intelligence and communication and helps in education, business and administration.', 'सूर्य और बुध एक साथ हैं। यह बुद्धि और वाणी को तीक्ष्ण बनाता है तथा शिक्षा, व्यापार और प्रशासन में सहायक है।') });
  }
  if (by.moon.house === by.mars.house) {
    yogas.push({ name: p('Chandra-Mangal Yoga', 'चंद्र-मंगल योग'), text: p('The Moon and Mars are together. This gives drive to earn money and success through bold effort, though emotions can run hot.', 'चंद्रमा और मंगल एक साथ हैं। यह धन कमाने की लगन और साहसिक प्रयास से सफलता देता है, यद्यपि भावनाएँ उग्र हो सकती हैं।') });
  }
  const MAHAPURUSH = {
    mars: p('Ruchaka Yoga', 'रुचक योग'),
    mercury: p('Bhadra Yoga', 'भद्र योग'),
    jupiter: p('Hamsa Yoga', 'हंस योग'),
    venus: p('Malavya Yoga', 'मालव्य योग'),
    saturn: p('Shasha Yoga', 'शश योग'),
  };
  Object.entries(MAHAPURUSH).forEach(([key, name]) => {
    const x = g[key];
    if (KENDRA.includes(x.house) && (x.tags.includes('exalted') || x.tags.includes('own'))) {
      yogas.push({ name, text: p(`One of the five Panch Mahapurush yogas: ${x.name.en} is strong in a kendra. It raises you above the ordinary in the qualities of this planet.`, `पंच महापुरुष योगों में से एक: ${x.name.hi} केंद्र में बलवान है। यह इस ग्रह के गुणों में आपको सामान्य से ऊपर उठाता है।`) });
    }
  });

  // ---- Doshas -----------------------------------------------------------
  const doshas = [];
  if (kundli.manglik) {
    const mild = g.mars.tags.includes('own') || g.mars.tags.includes('exalted');
    doshas.push({
      key: 'manglik',
      name: p('Manglik Dosha', 'मांगलिक दोष'),
      level: mild ? 'mild' : 'present',
      text: p(
        `Mars is in the ${ord(by.mars.house).en} house from the Lagna.${mild ? ' Because Mars is in its own or exalted sign, the dosha is considered mild.' : ''} It mainly affects marriage and temperament.`,
        `मंगल लग्न से ${ord(by.mars.house).hi} भाव में है।${mild ? ' मंगल के स्वराशि या उच्च में होने से दोष हल्का माना जाता है।' : ''} यह मुख्य रूप से विवाह और स्वभाव को प्रभावित करता है।`
      ),
    });
  }
  const others = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn'];
  const side = others.map((key) => (by[key].lon - by.rahu.lon + 360) % 360 < 180);
  if (side.every(Boolean) || side.every((s) => !s)) {
    doshas.push({
      key: 'kaalsarp',
      name: p('Kaal Sarp Dosha', 'कालसर्प दोष'),
      level: 'present',
      text: p(
        `All seven planets lie on one side of the Rahu–Ketu axis (Rahu in house ${by.rahu.house}, Ketu in house ${by.ketu.house}). It can bring delays and sudden ups and downs until effort and faith break through.`,
        `सातों ग्रह राहु-केतु अक्ष के एक ओर हैं (राहु ${by.rahu.house}वें और केतु ${by.ketu.house}वें भाव में)। प्रयास और आस्था से बाधा टूटने तक यह देरी और अचानक उतार-चढ़ाव दे सकता है।`
      ),
    });
  }
  const grahanWith = ['sun', 'moon'].filter((l) => ['rahu', 'ketu'].some((n) => by[n].sign === by[l].sign));
  if (grahanWith.length) {
    doshas.push({
      key: 'grahan',
      name: p('Grahan Dosha', 'ग्रहण दोष'),
      level: 'present',
      text: p(
        `${grahanWith.map((l) => by[l].name.en).join(' and ')} is together with Rahu or Ketu. This can cloud confidence or peace of mind at times.`,
        `${grahanWith.map((l) => by[l].name.hi).join(' और ')} राहु या केतु के साथ है। इससे कभी-कभी आत्मविश्वास या मन की शांति पर असर पड़ सकता है।`
      ),
    });
  }
  const sat = saturnTransit(moonIdx, now);
  if (sat.type !== 'none') {
    const label = {
      sadesati: p(`Shani Sade Sati — phase ${sat.phase} of 3`, `शनि की साढ़ेसाती — ${sat.phase}/3 चरण`),
      kantak: p('Shani Dhaiya (Kantak)', 'शनि की ढैया (कंटक)'),
      ashtam: p('Shani Dhaiya (Ashtam)', 'शनि की ढैया (अष्टम)'),
    }[sat.type];
    doshas.push({
      key: 'sadesati',
      name: label,
      level: 'running',
      text: p(
        `Saturn is now transiting ${sat.sign.name}, ${sat.type === 'sadesati' ? 'close to your Moon sign' : sat.type === 'kantak' ? 'the 4th sign from your Moon' : 'the 8th sign from your Moon'}. This is a time of hard work, responsibility and lessons; patience and honesty turn it into lasting growth.`,
        `शनि अभी ${sat.type === 'sadesati' ? 'आपकी चंद्र राशि के निकट' : sat.type === 'kantak' ? 'आपकी चंद्र राशि से चौथी राशि' : 'आपकी चंद्र राशि से आठवीं राशि'} में गोचर कर रहे हैं। यह परिश्रम, ज़िम्मेदारी और सीख का समय है; धैर्य और ईमानदारी इसे स्थायी उन्नति में बदल देते हैं।`
      ),
    });
  }

  // ---- Upay priorities --------------------------------------------------
  const reasons = {};
  const add = (key, weight, why) => ((reasons[key] ||= { key, weight: 0, why: [] }), (reasons[key].weight += weight), reasons[key].why.push(why));
  grahas.forEach((x) => {
    if (x.tags.includes('debilitated')) add(x.key, 3, p('Debilitated', 'नीच का'));
    if (x.tags.includes('combust')) add(x.key, 2, p('Combust', 'अस्त'));
    const strong = x.tags.includes('exalted') || x.tags.includes('own');
    if (!strong && ([8, 12].includes(x.house) || (x.house === 6 && BENEFIC.includes(x.key)))) add(x.key, 1, p(`In the ${ord(x.house).en} house`, `${ord(x.house).hi} भाव में`));
  });
  const llStrong = g[lagnaLord].tags.includes('exalted') || g[lagnaLord].tags.includes('own');
  if (g[lagnaLord].tags.includes('debilitated') || (!llStrong && [6, 8, 12].includes(llHouse))) add(lagnaLord, 2, p('Weak lagna lord', 'कमज़ोर लग्नेश'));
  grahanWith.forEach((l) => add(l, 2, p('With Rahu/Ketu', 'राहु/केतु के साथ')));
  if (kundli.manglik) add('mars', 2, p('Manglik dosha', 'मांगलिक दोष'));
  if (sat.type !== 'none') add('saturn', 2, p('Sade Sati / Dhaiya', 'साढ़ेसाती / ढैया'));
  if (md) add(md.lord, 2, p('Running Mahadasha', 'वर्तमान महादशा'));
  if (ad && ad.lord !== md?.lord) add(ad.lord, 1, p('Running Antardasha', 'वर्तमान अंतर्दशा'));
  const upay = Object.values(reasons).sort((a, b) => b.weight - a.weight).slice(0, 4);

  return {
    lagna,
    rashi,
    grahas,
    dasha,
    yogas,
    doshas,
    upay,
    luckyGemLord: lagnaLord,
  };
}
