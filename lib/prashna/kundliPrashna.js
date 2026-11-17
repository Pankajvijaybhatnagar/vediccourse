// Prashna Kundali (horary) analysis — simplified rules from Prashna Marga, Prashna Tantra and Tajik Neelakanthi.
// Works on the output of buildKundli() (lib/kundli.js), cast for the moment of the question.
import { SIGNS } from '../zodiac';
import { GRAHAS, buildKundli } from '../kundli';
import { NAKSHATRAS } from '../panchang';
import { getCategory, verdictFromScore } from './categories';

const p = (en, hi) => ({ en, hi });

// Sign lords, indexed from Aries.
export const SIGN_LORD = ['mars', 'venus', 'mercury', 'moon', 'sun', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'saturn', 'jupiter'];
export const SIGN_NAME = [
  p('Aries', 'मेष'), p('Taurus', 'वृषभ'), p('Gemini', 'मिथुन'), p('Cancer', 'कर्क'), p('Leo', 'सिंह'), p('Virgo', 'कन्या'),
  p('Libra', 'तुला'), p('Scorpio', 'वृश्चिक'), p('Sagittarius', 'धनु'), p('Capricorn', 'मकर'), p('Aquarius', 'कुंभ'), p('Pisces', 'मीन'),
];
const EXALT = { sun: 0, moon: 1, mars: 9, mercury: 5, jupiter: 3, venus: 11, saturn: 6 };
const BENEFICS = ['jupiter', 'venus', 'mercury'];
const MALEFICS = ['sun', 'mars', 'saturn', 'rahu', 'ketu'];
// Shirshodaya signs rise "head first" (favourable for prashna); Pisces rises both ways.
const SHIRSHODAYA = [2, 4, 5, 6, 7, 10];
const PRISHTODAYA = [0, 1, 3, 8, 9];

const gName = (key) => GRAHAS.find((g) => g.key === key).name;
const houseName = (h) => p(`house ${h}`, `${h}वें भाव`);

export const HOUSE_MEANING = {
  1: p('self, body, health', 'स्वयं, शरीर, स्वास्थ्य'),
  2: p('wealth, family, valuables', 'धन, कुटुंब, मूल्यवान वस्तुएँ'),
  3: p('courage, siblings, short trips', 'पराक्रम, भाई-बहन, छोटी यात्रा'),
  4: p('home, mother, land, vehicle', 'घर, माता, भूमि, वाहन'),
  5: p('children, studies, love', 'संतान, विद्या, प्रेम'),
  6: p('enemies, disease, disputes', 'शत्रु, रोग, विवाद'),
  7: p('spouse, partner, opponent', 'जीवनसाथी, साझेदार, विरोधी'),
  8: p('obstacles, sudden events', 'बाधाएँ, अचानक घटनाएँ'),
  9: p('fortune, long journeys, dharma', 'भाग्य, लंबी यात्रा, धर्म'),
  10: p('career, status, work', 'करियर, पद, कर्म'),
  11: p('gains, fulfilment of wishes', 'लाभ, मनोकामना पूर्ति'),
  12: p('expenses, foreign lands, loss', 'व्यय, विदेश, हानि'),
};

const signIdx = (sign) => SIGNS.indexOf(sign);

/** Placement strength of a planet: house quality + dignity. Range about −3 … +3. */
function strength(pl) {
  const s = signIdx(pl.sign);
  let score = 0;
  const notes = [];
  if ([1, 4, 7, 10].includes(pl.house)) {
    score += 2;
    notes.push(p('in a kendra', 'केंद्र में'));
  } else if ([5, 9].includes(pl.house)) {
    score += 2;
    notes.push(p('in a trikona', 'त्रिकोण में'));
  } else if (pl.house === 11) {
    score += 1;
    notes.push(p('in the house of gains', 'लाभ भाव में'));
  } else if ([6, 8, 12].includes(pl.house)) {
    score -= 2;
    notes.push(p('in a dusthana (6/8/12)', 'दुःस्थान (6/8/12) में'));
  }
  if (EXALT[pl.key] === s) {
    score += 1;
    notes.push(p('exalted', 'उच्च का'));
  } else if (EXALT[pl.key] !== undefined && (EXALT[pl.key] + 6) % 12 === s) {
    score -= 1;
    notes.push(p('debilitated', 'नीच का'));
  } else if (SIGN_LORD[s] === pl.key) {
    score += 1;
    notes.push(p('in its own sign', 'स्वराशि में'));
  }
  if (pl.retro) notes.push(p('retrograde', 'वक्री'));
  return { score, notes };
}

/** Does planet `pl` cast a full Vedic aspect on house `target`? */
export function aspects(pl, target) {
  const nth = ((target - pl.house + 12) % 12) + 1;
  if (nth === 7) return true;
  if (pl.key === 'mars') return nth === 4 || nth === 8;
  if (pl.key === 'jupiter') return nth === 5 || nth === 9;
  if (pl.key === 'saturn') return nth === 3 || nth === 10;
  return false;
}

const joinNotes = (notes, lang) => notes.map((n) => n[lang]).join(', ');
const describe = (pl, notes) => ({
  en: `${gName(pl.key).en} sits in ${houseName(pl.house).en} (${SIGN_NAME[signIdx(pl.sign)].en})${notes.length ? `, ${joinNotes(notes, 'en')}` : ''}`,
  hi: `${gName(pl.key).hi} ${houseName(pl.house).hi} (${SIGN_NAME[signIdx(pl.sign)].hi}) में${notes.length ? `, ${joinNotes(notes, 'hi')}` : ''}`,
});

/**
 * Analyse a prashna chart for a question category.
 * @returns {{ verdict, score, reasons: {good: boolean|null, text}[], timing, extra: {title, text}[], karyaHouse, lagnesh, karyesh }}
 */
export function analyzePrashna(kundli, categoryKey) {
  const cat = getCategory(categoryKey);
  const lagnaSign = signIdx(kundli.lagna.sign);
  const P = Object.fromEntries(kundli.planets.map((pl) => [pl.key, pl]));
  const reasons = [];
  let score = 0;
  const add = (pts, en, hi) => {
    score += pts;
    reasons.push({ good: pts > 0 ? true : pts < 0 ? false : null, pts, text: p(en, hi) });
  };

  const karyaHouse = cat.house;
  const karyaSign = (lagnaSign + karyaHouse - 1) % 12;
  const lagnesh = P[SIGN_LORD[lagnaSign]];
  const karyesh = P[SIGN_LORD[karyaSign]];

  // 1. Lagna lord — the querent.
  const ls = strength(lagnesh);
  const d1 = describe(lagnesh, ls.notes);
  add(
    Math.max(-3, Math.min(3, ls.score)),
    `Lagna lord (you): ${d1.en}.`,
    `लग्नेश (आप): ${d1.hi}।`,
  );

  // 2. Karyesh — lord of the house of the question.
  if (karyaHouse !== 1 && karyesh.key !== lagnesh.key) {
    const ks = strength(karyesh);
    const d2 = describe(karyesh, ks.notes);
    add(
      Math.max(-3, Math.min(3, ks.score)),
      `Karyesh, lord of house ${karyaHouse} (${HOUSE_MEANING[karyaHouse].en}): ${d2.en}.`,
      `कार्येश, ${karyaHouse}वें भाव (${HOUSE_MEANING[karyaHouse].hi}) का स्वामी: ${d2.hi}।`,
    );

    // 3. Connection between the two (Ithasala-like yoga).
    const sameSign = lagnesh.sign === karyesh.sign;
    const exchange = SIGN_LORD[signIdx(lagnesh.sign)] === karyesh.key && SIGN_LORD[signIdx(karyesh.sign)] === lagnesh.key;
    const mutual = aspects(lagnesh, karyesh.house) && aspects(karyesh, lagnesh.house);
    if (sameSign) add(3, 'Lagna lord and karyesh are together in one sign — a strong yoga for success (Ithasala-like).', 'लग्नेश और कार्येश एक ही राशि में साथ हैं — कार्य सिद्धि का प्रबल योग (इत्थशाल समान)।');
    else if (exchange) add(3, 'Lagna lord and karyesh have exchanged signs (parivartan) — the two sides work together.', 'लग्नेश और कार्येश में राशि परिवर्तन है — दोनों पक्ष मिलकर काम करते हैं।');
    else if (mutual) add(2, 'Lagna lord and karyesh aspect each other — the matter connects with you.', 'लग्नेश और कार्येश की परस्पर दृष्टि है — कार्य आपसे जुड़ता है।');
    else if (lagnesh.house === karyaHouse) add(2, 'Lagna lord has gone to the house of the question — you reach the goal by your own effort.', 'लग्नेश कार्य भाव में गया है — आप अपने प्रयास से लक्ष्य तक पहुँचेंगे।');
    else if (karyesh.house === 1) add(2, 'Karyesh has come to the Lagna — the matter comes to you by itself.', 'कार्येश लग्न में आया है — कार्य स्वयं चलकर आपके पास आएगा।');
    else add(-1, 'No direct link between the Lagna lord and the karyesh — expect delay or extra effort.', 'लग्नेश और कार्येश में सीधा संबंध नहीं — विलम्ब या अधिक प्रयास की संभावना।');
  }

  // 4. Moon — the mind of the querent and the flow of events.
  const moon = P.moon;
  const sun = P.sun;
  const shukla = (moon.lon - sun.lon + 360) % 360 < 180;
  if ([6, 8, 12].includes(moon.house)) add(-2, `Moon is in house ${moon.house} — worry, hidden obstacles or loss of energy.`, `चंद्रमा ${moon.house}वें भाव में है — चिंता, छिपी बाधाएँ या ऊर्जा की कमी।`);
  else if ([1, 4, 7, 10, 5, 9, 11].includes(moon.house)) add(1, `Moon is well placed in house ${moon.house} — the mind is supported.`, `चंद्रमा ${moon.house}वें भाव में शुभ स्थित है — मन को बल मिलता है।`);
  if (shukla) add(1, 'Waxing Moon (Shukla Paksha) — things grow and improve.', 'शुक्ल पक्ष का बढ़ता चंद्रमा — कार्य बढ़ेगा और सुधरेगा।');
  else add(-1, 'Waning Moon (Krishna Paksha) — slower results.', 'कृष्ण पक्ष का घटता चंद्रमा — परिणाम धीमे।');
  if (aspects(moon, karyaHouse) || moon.house === karyaHouse) add(1, `Moon touches house ${karyaHouse} — the mind is set on this matter and it moves.`, `चंद्रमा का ${karyaHouse}वें भाव से संबंध है — कार्य में गति आएगी।`);

  // 5. Benefics and malefics in Lagna and the house of the question.
  let bm = 0;
  const benIn = [];
  const malIn = [];
  for (const pl of kundli.planets) {
    const isBen = BENEFICS.includes(pl.key) || (pl.key === 'moon' && shukla);
    const isMal = MALEFICS.includes(pl.key);
    const houses = karyaHouse === 1 ? [1] : [1, karyaHouse];
    for (const h of houses) {
      if (pl.house !== h) continue;
      if (isBen) {
        bm += 1;
        benIn.push(`${gName(pl.key).hi}`);
      } else if (isMal) {
        bm -= 1;
        malIn.push(`${gName(pl.key).hi}`);
      }
    }
  }
  bm = Math.max(-3, Math.min(3, bm));
  if (bm > 0) add(bm, `Benefic planets sit in the Lagna or house ${karyaHouse}.`, `लग्न या ${karyaHouse}वें भाव में शुभ ग्रह (${benIn.join(', ')}) हैं।`);
  else if (bm < 0) add(bm, `Malefic planets sit in the Lagna or house ${karyaHouse} — obstacles to clear.`, `लग्न या ${karyaHouse}वें भाव में पाप ग्रह (${malIn.join(', ')}) हैं — बाधाएँ दूर करनी होंगी।`);

  // 6. Jupiter's aspect protects.
  if (karyaHouse !== 1 && (aspects(P.jupiter, karyaHouse) || P.jupiter.house === karyaHouse)) add(1, `Jupiter blesses house ${karyaHouse} with its aspect.`, `गुरु की ${karyaHouse}वें भाव पर शुभ दृष्टि है।`);
  if (aspects(P.jupiter, 1) || P.jupiter.house === 1) add(1, 'Jupiter blesses the Lagna — divine help is with you.', 'गुरु की लग्न पर दृष्टि है — ईश्वरीय सहायता साथ है।');

  // 7. Rising of the Lagna sign.
  if (SHIRSHODAYA.includes(lagnaSign)) add(1, `${SIGN_NAME[lagnaSign].en} Lagna rises head-first (shirshodaya) — favourable for prashna.`, `${SIGN_NAME[lagnaSign].hi} लग्न शीर्षोदय है — प्रश्न के लिए शुभ।`);
  else if (PRISHTODAYA.includes(lagnaSign)) add(-1, `${SIGN_NAME[lagnaSign].en} Lagna rises back-first (prishtodaya) — success comes late.`, `${SIGN_NAME[lagnaSign].hi} लग्न पृष्ठोदय है — सफलता देर से।`);

  // Category-specific rules.
  const extra = [];
  if (categoryKey === 'health') {
    const l6 = P[SIGN_LORD[(lagnaSign + 5) % 12]];
    if ([6, 8, 12].includes(l6.house)) add(1, 'Lord of disease (6th) is weak in a dusthana — the illness loses strength.', 'रोगेश (6वें भाव का स्वामी) दुःस्थान में निर्बल है — रोग का बल घटेगा।');
    else if ([1, 4, 7, 10].includes(l6.house)) add(-1, 'Lord of disease (6th) is strong in a kendra — treatment needs patience.', 'रोगेश केंद्र में बली है — उपचार में धैर्य चाहिए।');
  }
  if (categoryKey === 'court') {
    const l7 = P[SIGN_LORD[(lagnaSign + 6) % 12]];
    const you = strength(lagnesh).score;
    const them = strength(l7).score;
    if (lagnesh.key !== l7.key) {
      if (you > them) add(2, 'Your Lagna lord is stronger than the 7th lord (opponent) — victory is indicated.', 'आपका लग्नेश सप्तमेश (विरोधी) से बली है — विजय के संकेत।');
      else if (you < them) add(-2, 'The 7th lord (opponent) is stronger than your Lagna lord — try settlement.', 'सप्तमेश (विरोधी) आपके लग्नेश से बली है — समझौते का प्रयास करें।');
      else add(0, 'You and the opponent are equally strong — the case may drag on.', 'आप और विरोधी समान बली हैं — मामला लंबा खिंच सकता है।');
    }
  }
  if (categoryKey === 'return') {
    const in4 = kundli.planets.filter((pl) => pl.house === 4 && !['rahu', 'ketu'].includes(pl.key));
    if (in4.length) add(1, 'Planets in the 4th house (home) — the person is drawn back home.', 'चौथे भाव (घर) में ग्रह हैं — व्यक्ति घर की ओर लौटेगा।');
    if (karyesh.retro) add(1, 'Karyesh is retrograde — a sign of coming back.', 'कार्येश वक्री है — लौटने का संकेत।');
  }
  if (categoryKey === 'lost') {
    const mod = lagnaSign % 3; // 0 movable, 1 fixed, 2 dual
    const dir = [p('East', 'पूर्व'), p('South', 'दक्षिण'), p('West', 'पश्चिम'), p('North', 'उत्तर')][lagnaSign % 4];
    extra.push({
      title: p('Where is it?', 'वस्तु कहाँ है?'),
      text: [
        p('Movable Lagna: the item has moved away from where it was kept, or someone has taken it.', 'चर लग्न: वस्तु अपने स्थान से हट चुकी है या कोई ले गया है।'),
        p('Fixed Lagna: the item is still inside the house or the same place — search carefully.', 'स्थिर लग्न: वस्तु घर या उसी स्थान पर ही है — ध्यान से खोजें।'),
        p('Dual Lagna: the item is nearby, just outside or around the place.', 'द्विस्वभाव लग्न: वस्तु पास ही, स्थान के बाहर या आसपास है।'),
      ][mod],
    });
    extra.push({ title: p('Direction to search', 'खोजने की दिशा'), text: p(`Look first towards the ${dir.en}.`, `पहले ${dir.hi} दिशा में खोजें।`) });
    if ([1, 2, 11].includes(moon.house)) add(1, 'Moon in the 1st, 2nd or 11th — good chance of getting the item back.', 'चंद्रमा 1, 2 या 11वें भाव में — वस्तु वापस मिलने की अच्छी संभावना।');
  }

  // Timing from the nature of the Lagna sign.
  const mod = lagnaSign % 3;
  const timing = [
    p('Movable (chara) Lagna — results come quickly, within days or a few weeks.', 'चर लग्न — परिणाम शीघ्र, कुछ दिनों या सप्ताहों में।'),
    p('Fixed (sthira) Lagna — results come slowly, in months; stay patient.', 'स्थिर लग्न — परिणाम धीरे, महीनों में; धैर्य रखें।'),
    p('Dual (dwiswabhava) Lagna — results in weeks to a few months, possibly in two stages.', 'द्विस्वभाव लग्न — परिणाम सप्ताहों से कुछ महीनों में, संभवतः दो चरणों में।'),
  ][mod];

  return {
    score,
    verdict: verdictFromScore(score, { yes: 6, likely: 2, mixed: -1 }),
    reasons,
    timing,
    extra,
    karyaHouse,
    karyaSign,
    lagnaSign,
    lagnesh: lagnesh.key,
    karyesh: karyesh.key,
    shukla,
  };
}

/** Date & time strings for "now" in a city's time zone. */
export function nowInZone(tz) {
  const d = new Date(Date.now() + tz * 3600000);
  const pad = (n) => String(n).padStart(2, '0');
  return {
    date: `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`,
    time: `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`,
  };
}

/** Cast the prashna chart for the current moment in a city. */
export function castNow(city) {
  const { date, time } = nowInZone(city.tz);
  return { date, time, kundli: buildKundli({ date, time, lat: city.lat, lon: city.lon, tz: city.tz }) };
}

/**
 * Re-house a chart around a different Lagna sign (used by Ank Prashna, where the number fixes the Lagna).
 * @param {object} kundli  chart from buildKundli
 * @param {number} lagnaLon sidereal longitude of the new Lagna
 */
export function withLagna(kundli, lagnaLon) {
  const lagnaSign = Math.floor(lagnaLon / 30);
  const nak = Math.floor(lagnaLon / (360 / 27));
  return {
    ...kundli,
    lagna: {
      lon: lagnaLon,
      sign: SIGNS[lagnaSign],
      degree: lagnaLon % 30,
      nakshatra: { index: nak, name: NAKSHATRAS[nak], pada: Math.floor((lagnaLon % (360 / 27)) / (360 / 108)) + 1 },
    },
    planets: kundli.planets.map((pl) => ({ ...pl, house: ((signIdx(pl.sign) - lagnaSign + 12) % 12) + 1 })),
  };
}
