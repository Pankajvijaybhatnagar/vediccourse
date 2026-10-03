import { SIGNS } from './zodiac';
import { GRAHAS } from './kundli';
import { NAKSHATRAS } from './panchang';

/*
 * Ashtakoot Guna Milan (North Indian kundli matching, 36 gunas) from the
 * Moon's sidereal position of the boy (vara) and the girl (kanya), plus
 * Nadi/Bhakoot/Gana exceptions, Vedha and a Manglik (Kuja) dosha comparison.
 * Tables follow the standard Muhurta Chintamani / Brihat Jyotish Saar scheme
 * used by most Indian panchang makers.
 */

const p = (en, hi) => ({ en, hi });
const NAK_SPAN = 360 / 27;
const graha = (key) => GRAHAS.find((g) => g.key === key).name;

// Sign lords, Aries → Pisces.
const SIGN_LORD = ['mars', 'venus', 'mercury', 'moon', 'sun', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'saturn', 'jupiter'];

/* ---------------------------------------------------------------- 1. Varna */
const VARNAS = [p('Shudra', 'शूद्र'), p('Vaishya', 'वैश्य'), p('Kshatriya', 'क्षत्रिय'), p('Brahmin', 'ब्राह्मण')];
// Rank per sign (0 Shudra … 3 Brahmin): water signs Brahmin, fire Kshatriya, earth Vaishya, air Shudra.
const SIGN_VARNA = [2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0, 3];

/* --------------------------------------------------------------- 2. Vashya */
const VASHYAS = [p('Chatushpad (quadruped)', 'चतुष्पद'), p('Manav (human)', 'मानव (द्विपद)'), p('Jalachar (water)', 'जलचर'), p('Vanachar (wild)', 'वनचर'), p('Keet (insect)', 'कीट')];
const VASHYA_SCORE = [
  // girl:  Chatu Manav Jala Vana Keet      (rows = boy)
  [2, 1, 1, 0.5, 1],
  [1, 2, 0.5, 0, 1],
  [1, 0.5, 2, 1, 1],
  [0.5, 0, 1, 2, 0],
  [1, 1, 1, 0, 2],
];
function vashyaOf(lon) {
  const sign = Math.floor(lon / 30);
  const firstHalf = lon % 30 < 15;
  if (sign === 8) return firstHalf ? 1 : 0; // Sagittarius: human half, then horse half
  if (sign === 9) return firstHalf ? 0 : 2; // Capricorn: goat half, then crocodile half
  return [0, 0, 1, 2, 3, 1, 1, 4, null, null, 1, 2][sign];
}

/* ----------------------------------------------------------------- 3. Tara */
const TARAS = [
  p('Janma', 'जन्म'), p('Sampat', 'सम्पत'), p('Vipat', 'विपत'), p('Kshema', 'क्षेम'), p('Pratyari', 'प्रत्यरि'),
  p('Sadhaka', 'साधक'), p('Vadha', 'वध'), p('Mitra', 'मित्र'), p('Ati-Mitra', 'अति मित्र'),
];
function tara(fromNak, toNak) {
  const count = ((toNak - fromNak + 27) % 27) + 1;
  const n = ((count - 1) % 9) + 1;
  return { count, n, name: TARAS[n - 1], good: ![3, 5, 7].includes(n) };
}

/* ----------------------------------------------------------------- 4. Yoni */
const YONIS = [
  p('Horse', 'अश्व'), p('Elephant', 'गज'), p('Sheep', 'मेष (भेड़)'), p('Serpent', 'सर्प'), p('Dog', 'श्वान'), p('Cat', 'मार्जार'), p('Rat', 'मूषक'),
  p('Cow', 'गौ'), p('Buffalo', 'महिष'), p('Tiger', 'व्याघ्र'), p('Deer', 'मृग'), p('Monkey', 'वानर'), p('Mongoose', 'नकुल'), p('Lion', 'सिंह'),
];
// Yoni of each nakshatra, Ashwini → Revati.
const NAK_YONI = [0, 1, 2, 3, 3, 4, 5, 2, 5, 6, 6, 7, 8, 9, 8, 9, 10, 10, 4, 11, 12, 11, 13, 0, 13, 7, 1];
// Male (true) / female yoni of each nakshatra, shown for information.
const NAK_YONI_MALE = [1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0].map(Boolean);
const YONI_SCORE = [
  // Ho El Sh Se Do Ca Ra Co Bu Ti De Mo Mn Li
  [4, 2, 2, 3, 2, 2, 2, 1, 0, 1, 3, 3, 2, 1],
  [2, 4, 3, 3, 2, 2, 2, 2, 3, 1, 2, 3, 2, 0],
  [2, 3, 4, 2, 1, 2, 1, 3, 3, 1, 2, 0, 3, 1],
  [3, 3, 2, 4, 2, 1, 1, 1, 1, 2, 2, 2, 0, 2],
  [2, 2, 1, 2, 4, 2, 1, 2, 2, 1, 0, 2, 1, 1],
  [2, 2, 2, 1, 2, 4, 0, 2, 2, 1, 3, 3, 2, 1],
  [2, 2, 1, 1, 1, 0, 4, 2, 2, 2, 2, 2, 1, 2],
  [1, 2, 3, 1, 2, 2, 2, 4, 3, 0, 3, 2, 2, 1],
  [0, 3, 3, 1, 2, 2, 2, 3, 4, 1, 2, 2, 2, 1],
  [1, 1, 1, 2, 1, 1, 2, 0, 1, 4, 1, 1, 2, 1],
  [3, 2, 2, 2, 0, 3, 2, 3, 2, 1, 4, 2, 2, 1],
  [3, 3, 0, 2, 2, 3, 2, 2, 2, 1, 2, 4, 3, 2],
  [2, 2, 3, 0, 1, 2, 1, 2, 2, 2, 2, 3, 4, 2],
  [1, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 2, 4],
];

/* --------------------------------------------------------- 5. Graha Maitri */
// Naisargika (natural) relationships: [friends, neutrals]; everything else is an enemy.
const RELATION = {
  sun: [['moon', 'mars', 'jupiter'], ['mercury']],
  moon: [['sun', 'mercury'], ['mars', 'jupiter', 'venus', 'saturn']],
  mars: [['sun', 'moon', 'jupiter'], ['venus', 'saturn']],
  mercury: [['sun', 'venus'], ['mars', 'jupiter', 'saturn']],
  jupiter: [['sun', 'moon', 'mars'], ['saturn']],
  venus: [['mercury', 'saturn'], ['mars', 'jupiter']],
  saturn: [['mercury', 'venus'], ['jupiter']],
};
const REL_NAMES = { friend: p('Friend', 'मित्र'), neutral: p('Neutral', 'सम'), enemy: p('Enemy', 'शत्रु'), same: p('Same lord', 'एक ही स्वामी') };
function relation(a, b) {
  if (a === b) return 'same';
  const [friends, neutrals] = RELATION[a];
  return friends.includes(b) ? 'friend' : neutrals.includes(b) ? 'neutral' : 'enemy';
}
function maitriScore(lordA, lordB) {
  if (lordA === lordB) return 5;
  const key = [relation(lordA, lordB), relation(lordB, lordA)].sort().join('-');
  return { 'friend-friend': 5, 'friend-neutral': 4, 'neutral-neutral': 3, 'enemy-friend': 1, 'enemy-neutral': 0.5, 'enemy-enemy': 0 }[key];
}

/* ----------------------------------------------------------------- 6. Gana */
const GANAS = [p('Deva', 'देव'), p('Manushya', 'मनुष्य'), p('Rakshasa', 'राक्षस')];
const NAK_GANA = [0, 1, 2, 1, 0, 1, 0, 0, 2, 2, 1, 1, 0, 2, 0, 2, 0, 2, 2, 1, 1, 0, 2, 2, 1, 1, 0];
const GANA_SCORE = [
  // girl: Deva Manushya Rakshasa   (rows = boy)
  [6, 6, 0],
  [5, 6, 0],
  [1, 0, 6],
];

/* -------------------------------------------------------------- 7. Bhakoot */
const BHAKOOT_NAMES = {
  1: p('Same rashi (1/1)', 'एक ही राशि (1/1)'),
  2: p('Dwi-Dwadash (2/12)', 'द्वि-द्वादश (2/12)'),
  3: p('Tri-Ekadash (3/11)', 'त्रि-एकादश (3/11)'),
  4: p('Chatur-Dasham (4/10)', 'चतुर्थ-दशम (4/10)'),
  5: p('Nav-Pancham (5/9)', 'नव-पंचम (5/9)'),
  6: p('Shadashtak (6/8)', 'षडाष्टक (6/8)'),
  7: p('Sama-Saptak (7/7)', 'सम-सप्तक (7/7)'),
};

/* ----------------------------------------------------------------- 8. Nadi */
const NADIS = [p('Adi (Vata)', 'आदि (वात)'), p('Madhya (Pitta)', 'मध्य (पित्त)'), p('Antya (Kapha)', 'अन्त्य (कफ)')];
const nadiOf = (nak) => [0, 1, 2, 2, 1, 0][nak % 6];

/* ---------------------------------------------------------------- Vedha */
// Nakshatra pairs that obstruct each other; Mrigashira, Chitra and Dhanishta are mutually vedha.
const VEDHA = [[0, 17], [1, 16], [2, 15], [3, 14], [5, 21], [6, 20], [7, 19], [8, 18], [9, 26], [10, 25], [11, 24], [12, 23], [4, 13], [4, 22], [13, 22]];
const hasVedha = (a, b) => VEDHA.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

/* ------------------------------------------------------------- Manglik */
const MANGLIK_HOUSES = [1, 2, 4, 7, 8, 12];
const houseFrom = (fromSign, sign) => ((sign - fromSign + 12) % 12) + 1;

function manglikOf(kundli) {
  const pl = Object.fromEntries(kundli.planets.map((x) => [x.key, x]));
  const marsSign = Math.floor(pl.mars.lon / 30);
  const fromLagna = houseFrom(Math.floor(kundli.lagna.lon / 30), marsSign);
  const fromMoon = houseFrom(Math.floor(pl.moon.lon / 30), marsSign);
  const fromVenus = houseFrom(Math.floor(pl.venus.lon / 30), marsSign);
  const sources = [];
  if (MANGLIK_HOUSES.includes(fromLagna)) sources.push('lagna');
  if (MANGLIK_HOUSES.includes(fromMoon)) sources.push('moon');

  // Common self-cancellations (parihara).
  const cancel = [];
  if ([0, 7].includes(marsSign)) cancel.push(p('Mars is in its own sign (Aries/Scorpio)', 'मंगल स्वराशि (मेष/वृश्चिक) में है'));
  if (marsSign === 9) cancel.push(p('Mars is exalted in Capricorn', 'मंगल मकर राशि में उच्च का है'));
  const jupSign = Math.floor(pl.jupiter.lon / 30);
  const jupToMars = houseFrom(jupSign, marsSign);
  if (jupToMars === 1) cancel.push(p('Mars is conjunct Jupiter', 'मंगल की गुरु से युति है'));
  else if ([5, 7, 9].includes(jupToMars)) cancel.push(p('Jupiter aspects Mars', 'मंगल पर गुरु की दृष्टि है'));

  const present = sources.length > 0;
  return {
    marsSign: SIGNS[marsSign],
    fromLagna,
    fromMoon,
    fromVenus,
    sources,
    present,
    cancel: present ? cancel : [],
    effective: present && cancel.length === 0,
    // Dosha from both Lagna and Moon is considered stronger (poorna); from one only, partial (anshik).
    strength: sources.length === 2 ? 'full' : sources.length === 1 ? 'partial' : 'none',
  };
}

/* ------------------------------------------------------------- Helpers */
function moonInfo(kundli) {
  const lon = kundli.planets.find((x) => x.key === 'moon').lon;
  const nak = Math.floor(lon / NAK_SPAN);
  const sign = Math.floor(lon / 30);
  const inNak = lon % NAK_SPAN;
  const inSign = lon % 30;
  // Moon moves ~0.55° per hour: within ~0.25° of a boundary, a 25-minute birth-time error can change the result.
  const nearEdge = Math.min(inNak, NAK_SPAN - inNak) < 0.25 || Math.min(inSign, 30 - inSign) < 0.25;
  return {
    lon,
    nak,
    sign,
    pada: Math.floor(inNak / (NAK_SPAN / 4)) + 1,
    nakshatra: NAKSHATRAS[nak],
    rashi: SIGNS[sign],
    lord: SIGN_LORD[sign],
    nearEdge,
  };
}

const VERDICTS = [
  { min: 33, tone: 'great', title: p('Excellent match', 'अति उत्तम मिलान'), text: p('A rare, highly auspicious union. The couple is very well matched on nearly every count.', 'अत्यंत शुभ और दुर्लभ मिलान। लगभग हर कूट में वर-कन्या का उत्तम तालमेल है।') },
  { min: 25, tone: 'good', title: p('Very good match', 'उत्तम मिलान'), text: p('A strong match. The marriage is considered auspicious and harmonious.', 'उत्तम मिलान। यह विवाह शुभ और सुखद माना जाता है।') },
  { min: 18, tone: 'ok', title: p('Average match', 'मध्यम मिलान'), text: p('Acceptable for marriage (18 or more gunas). Look closely at the kootas that scored low and at any doshas below.', 'विवाह हेतु स्वीकार्य (18 या अधिक गुण)। कम अंक वाले कूटों और नीचे दिए दोषों पर ध्यान दें।') },
  { min: 0, tone: 'bad', title: p('Not recommended', 'मिलान अनुकूल नहीं'), text: p('Fewer than 18 gunas match. Traditionally this match is not recommended without a detailed reading by an astrologer.', '18 से कम गुण मिले हैं। परंपरा के अनुसार किसी ज्योतिषी से विस्तृत विश्लेषण के बिना यह विवाह उचित नहीं माना जाता।') },
];

/**
 * Full Ashtakoot match.
 * @param {object} boy kundli from buildKundli()
 * @param {object} girl kundli from buildKundli()
 */
export function kundliMilan(boy, girl) {
  const B = moonInfo(boy);
  const G = moonInfo(girl);

  // 1. Varna
  const vB = SIGN_VARNA[B.sign];
  const vG = SIGN_VARNA[G.sign];
  const varna = {
    key: 'varna', max: 1, score: vB >= vG ? 1 : 0,
    boy: VARNAS[vB], girl: VARNAS[vG],
  };

  // 2. Vashya
  const wB = vashyaOf(B.lon);
  const wG = vashyaOf(G.lon);
  const vashya = { key: 'vashya', max: 2, score: VASHYA_SCORE[wB][wG], boy: VASHYAS[wB], girl: VASHYAS[wG] };

  // 3. Tara — counted from the girl's nakshatra to the boy's, and back.
  const tGB = tara(G.nak, B.nak);
  const tBG = tara(B.nak, G.nak);
  const taraK = {
    key: 'tara', max: 3, score: tGB.good && tBG.good ? 3 : tGB.good || tBG.good ? 1.5 : 0,
    // Each partner's tara is where their nakshatra falls, counted from the other's.
    boy: p(`${tGB.name.en} (${tGB.n})`, `${tGB.name.hi} (${tGB.n})`),
    girl: p(`${tBG.name.en} (${tBG.n})`, `${tBG.name.hi} (${tBG.n})`),
  };

  // 4. Yoni
  const yB = NAK_YONI[B.nak];
  const yG = NAK_YONI[G.nak];
  const sex = (nak) => (NAK_YONI_MALE[nak] ? p('male', 'पुरुष') : p('female', 'स्त्री'));
  const yoni = {
    key: 'yoni', max: 4, score: YONI_SCORE[yB][yG],
    boy: { en: `${YONIS[yB].en} (${sex(B.nak).en})`, hi: `${YONIS[yB].hi} (${sex(B.nak).hi})` },
    girl: { en: `${YONIS[yG].en} (${sex(G.nak).en})`, hi: `${YONIS[yG].hi} (${sex(G.nak).hi})` },
  };

  // 5. Graha Maitri
  const maitriPts = maitriScore(B.lord, G.lord);
  const maitri = { key: 'maitri', max: 5, score: maitriPts, boy: graha(B.lord), girl: graha(G.lord), relation: { boyToGirl: REL_NAMES[relation(B.lord, G.lord)], girlToBoy: REL_NAMES[relation(G.lord, B.lord)] } };

  // 6. Gana
  const gB = NAK_GANA[B.nak];
  const gG = NAK_GANA[G.nak];
  const gana = { key: 'gana', max: 6, score: GANA_SCORE[gB][gG], boy: GANAS[gB], girl: GANAS[gG] };

  // 7. Bhakoot — position of the boy's rashi counted from the girl's.
  const dist = houseFrom(G.sign, B.sign);
  const bhakootPair = dist === 1 ? 1 : dist === 7 ? 7 : Math.min(dist, 14 - dist);
  const bhakoot = {
    key: 'bhakoot', max: 7, score: [2, 5, 6].includes(bhakootPair) ? 0 : 7,
    boy: B.rashi, girl: G.rashi, pair: BHAKOOT_NAMES[bhakootPair],
  };

  // 8. Nadi
  const nB = nadiOf(B.nak);
  const nG = nadiOf(G.nak);
  const nadi = { key: 'nadi', max: 8, score: nB === nG ? 0 : 8, boy: NADIS[nB], girl: NADIS[nG] };

  const kootas = [varna, vashya, taraK, yoni, maitri, gana, bhakoot, nadi];
  const total = kootas.reduce((s, k) => s + k.score, 0);

  /* Doshas and their recognised exceptions (parihara). */
  const doshas = [];
  const lordsFriendly = maitriPts >= 4; // same lord, or friendly both ways / friend–neutral

  if (nadi.score === 0) {
    const cancel = [];
    if (B.sign === G.sign && B.nak !== G.nak) cancel.push(p('Same rashi but different nakshatras', 'राशि एक है पर नक्षत्र भिन्न हैं'));
    if (B.nak === G.nak && B.sign !== G.sign) cancel.push(p('Same nakshatra but different rashis', 'नक्षत्र एक है पर राशियाँ भिन्न हैं'));
    if (B.nak === G.nak && B.pada !== G.pada) cancel.push(p('Same nakshatra but different charan (pada)', 'नक्षत्र एक है पर चरण भिन्न हैं'));
    doshas.push({
      key: 'nadi', name: p('Nadi Dosha', 'नाड़ी दोष'), cancel, cancelled: cancel.length > 0,
      text: p('Both share the same Nadi. Traditionally linked with health and progeny concerns; it is the most serious dosha in Ashtakoot.', 'दोनों की नाड़ी एक है। परंपरा में इसे स्वास्थ्य और संतान से जोड़ा जाता है; अष्टकूट में यह सबसे गंभीर दोष है।'),
    });
  }
  if (bhakoot.score === 0) {
    const cancel = [];
    if (B.lord === G.lord) cancel.push(p(`Both rashis are ruled by the same planet (${graha(B.lord).en})`, `दोनों राशियों का स्वामी एक ही ग्रह (${graha(B.lord).hi}) है`));
    else if (maitriPts === 5) cancel.push(p('The rashi lords are mutual friends', 'दोनों राशि स्वामी परस्पर मित्र हैं'));
    doshas.push({
      key: 'bhakoot', name: p('Bhakoot Dosha', 'भकूट दोष'), cancel, cancelled: cancel.length > 0,
      text: p(`The rashis are in ${bhakoot.pair.en} relation, traditionally linked with friction in finances, family and well-being.`, `राशियाँ ${bhakoot.pair.hi} स्थिति में हैं, जिसे परंपरा में धन, परिवार और कुशलता में बाधा से जोड़ा जाता है।`),
    });
  }
  if (gana.score === 0) {
    const cancel = [];
    if (lordsFriendly) cancel.push(p('The rashi lords are friendly (Graha Maitri is strong)', 'राशि स्वामी मित्र हैं (ग्रह मैत्री प्रबल है)'));
    if (bhakoot.score === 7) cancel.push(p('Bhakoot is favourable', 'भकूट अनुकूल है'));
    doshas.push({
      key: 'gana', name: p('Gana Dosha', 'गण दोष'), cancel, cancelled: cancel.length > 0,
      text: p('Temperaments clash (Rakshasa with Deva/Manushya). Can show up as differences in nature and day-to-day behaviour.', 'स्वभाव में टकराव (राक्षस गण का देव/मनुष्य से)। यह स्वभाव और व्यवहार में भिन्नता के रूप में दिख सकता है।'),
    });
  }
  const vedha = hasVedha(B.nak, G.nak);
  if (vedha) {
    doshas.push({
      key: 'vedha', name: p('Vedha Dosha', 'वेध दोष'), cancel: [], cancelled: false,
      text: p(`${B.nakshatra.en} and ${G.nakshatra.en} are vedha (mutually obstructing) nakshatras.`, `${B.nakshatra.hi} और ${G.nakshatra.hi} परस्पर वेध नक्षत्र हैं।`),
    });
  }

  /* Manglik comparison. */
  const mB = manglikOf(boy);
  const mG = manglikOf(girl);
  let manglik;
  if (!mB.effective && !mG.effective) {
    manglik = { status: 'ok', text: mB.present || mG.present ? p('Mangal dosha is present but cancelled in the chart concerned, so no Manglik mismatch.', 'मंगल दोष है, पर संबंधित कुंडली में ही उसका परिहार हो जाता है, इसलिए मांगलिक असंतुलन नहीं है।') : p('Neither chart has Mangal dosha.', 'किसी भी कुंडली में मंगल दोष नहीं है।') };
  } else if (mB.effective && mG.effective) {
    manglik = { status: 'ok', text: p('Both are Manglik, so the dosha cancels out (Manglik samya). This is considered a compatible pairing.', 'दोनों मांगलिक हैं, अतः दोष का परस्पर परिहार हो जाता है (मांगलिक साम्य)। यह अनुकूल जोड़ी मानी जाती है।') };
  } else {
    manglik = { status: 'bad', text: p(`Only the ${mB.effective ? 'boy' : 'girl'} is Manglik. This mismatch is traditionally addressed with remedies or by consulting an astrologer before marriage.`, `केवल ${mB.effective ? 'वर' : 'कन्या'} मांगलिक है। परंपरा में विवाह से पूर्व इसके लिए उपाय या ज्योतिषी से परामर्श किया जाता है।`) };
  }
  manglik.boy = mB;
  manglik.girl = mG;

  const activeDoshas = doshas.filter((d) => !d.cancelled);
  const verdict = VERDICTS.find((v) => total >= v.min);
  const recommended = total >= 18 && !activeDoshas.some((d) => d.key === 'nadi' || d.key === 'bhakoot') && manglik.status === 'ok';

  return { boy: B, girl: G, kootas, total, verdict, doshas, manglik, recommended, nearEdge: B.nearEdge || G.nearEdge };
}

/** Descriptive text for each koota. */
export const KOOTA_INFO = {
  varna: { name: p('Varna', 'वर्ण'), area: p('Spiritual & work compatibility', 'आध्यात्मिक एवं कार्य अनुकूलता'), about: p("Compares the spiritual temperament of the two Moon signs. The boy's varna should be equal to or higher than the girl's.", 'दोनों चंद्र राशियों के आध्यात्मिक स्वभाव की तुलना। वर का वर्ण कन्या के बराबर या उससे ऊँचा होना चाहिए।') },
  vashya: { name: p('Vashya', 'वश्य'), area: p('Mutual attraction & influence', 'परस्पर आकर्षण एवं प्रभाव'), about: p('Shows how naturally the partners are drawn to, and can influence, each other.', 'दर्शाता है कि दोनों एक-दूसरे की ओर कितने स्वाभाविक रूप से आकर्षित होते हैं और एक-दूसरे को कितना प्रभावित करते हैं।') },
  tara: { name: p('Tara', 'तारा'), area: p('Destiny, health & well-being', 'भाग्य, स्वास्थ्य एवं कुशलता'), about: p('Counts nakshatras from each partner to the other. Vipat (3), Pratyari (5) and Vadha (7) are inauspicious.', 'एक-दूसरे के नक्षत्र तक गणना। विपत (3), प्रत्यरि (5) और वध (7) तारा अशुभ हैं।') },
  yoni: { name: p('Yoni', 'योनि'), area: p('Physical & intimate compatibility', 'शारीरिक एवं दाम्पत्य अनुकूलता'), about: p('Each nakshatra has an animal yoni. Same yoni is best; natural enemies (e.g. cat–rat, cow–tiger) score zero.', 'प्रत्येक नक्षत्र की एक पशु योनि होती है। समान योनि सर्वोत्तम है; स्वाभाविक शत्रु (जैसे बिल्ली–चूहा, गौ–व्याघ्र) को शून्य अंक।') },
  maitri: { name: p('Graha Maitri', 'ग्रह मैत्री'), area: p('Mental compatibility & friendship', 'मानसिक अनुकूलता एवं मित्रता'), about: p('Natural friendship between the lords of the two Moon signs, the basis of understanding between the couple.', 'दोनों चंद्र राशियों के स्वामियों की नैसर्गिक मित्रता, जो दंपति की आपसी समझ का आधार है।') },
  gana: { name: p('Gana', 'गण'), area: p('Temperament & behaviour', 'स्वभाव एवं व्यवहार'), about: p('Classifies nature as Deva (divine), Manushya (human) or Rakshasa (fierce).', 'स्वभाव को देव, मनुष्य या राक्षस गण में बाँटता है।') },
  bhakoot: { name: p('Bhakoot', 'भकूट'), area: p('Love, family & prosperity', 'प्रेम, परिवार एवं समृद्धि'), about: p('Relative position of the two Moon signs. 2/12, 5/9 and 6/8 placements give zero points.', 'दोनों चंद्र राशियों की परस्पर स्थिति। 2/12, 5/9 और 6/8 स्थिति में शून्य अंक।') },
  nadi: { name: p('Nadi', 'नाड़ी'), area: p('Health & progeny', 'स्वास्थ्य एवं संतान'), about: p('Adi, Madhya or Antya nadi. Partners should have different nadis; the same nadi gives zero points (Nadi Dosha).', 'आदि, मध्य या अन्त्य नाड़ी। वर-कन्या की नाड़ी भिन्न होनी चाहिए; एक नाड़ी होने पर शून्य अंक (नाड़ी दोष)।') },
};
