// Core zodiac reference data. Glyphs use U+FE0E so they render as text, not emoji.

export const ELEMENTS = {
  Fire: { color: '#ff8a5c', description: 'Passionate, dynamic and bold' },
  Earth: { color: '#9bd17a', description: 'Grounded, practical and patient' },
  Air: { color: '#8ec5ff', description: 'Intellectual, social and curious' },
  Water: { color: '#b99bff', description: 'Intuitive, emotional and deep' },
};

export const SIGNS = [
  {
    slug: 'aries',
    name: 'Aries',
    glyph: '♈︎',
    dates: 'Mar 21 – Apr 19',
    start: [3, 21],
    element: 'Fire',
    modality: 'Cardinal',
    ruler: 'Mars',
    symbol: 'The Ram',
    luckyNumber: 9,
    luckyColor: 'Scarlet',
    traits: ['Courageous', 'Energetic', 'Pioneering', 'Impulsive'],
    strengths: 'Brave, determined, confident, enthusiastic, optimistic and honest.',
    weaknesses: 'Impatient, moody, short-tempered and occasionally aggressive.',
    summary:
      'As the first sign of the zodiac, Aries charges forward with the raw energy of new beginnings. Ruled by Mars, you are a natural leader who thrives on challenge, competition and bold action.',
  },
  {
    slug: 'taurus',
    name: 'Taurus',
    glyph: '♉︎',
    dates: 'Apr 20 – May 20',
    start: [4, 20],
    element: 'Earth',
    modality: 'Fixed',
    ruler: 'Venus',
    symbol: 'The Bull',
    luckyNumber: 6,
    luckyColor: 'Emerald',
    traits: ['Reliable', 'Sensual', 'Patient', 'Stubborn'],
    strengths: 'Reliable, patient, practical, devoted, responsible and stable.',
    weaknesses: 'Stubborn, possessive and uncompromising.',
    summary:
      'Taurus is the steady heartbeat of the zodiac. Guided by Venus, you cherish beauty, comfort and loyalty, building lasting foundations with unmatched patience and determination.',
  },
  {
    slug: 'gemini',
    name: 'Gemini',
    glyph: '♊︎',
    dates: 'May 21 – Jun 20',
    start: [5, 21],
    element: 'Air',
    modality: 'Mutable',
    ruler: 'Mercury',
    symbol: 'The Twins',
    luckyNumber: 5,
    luckyColor: 'Yellow',
    traits: ['Curious', 'Witty', 'Adaptable', 'Restless'],
    strengths: 'Gentle, affectionate, curious, adaptable and quick to learn.',
    weaknesses: 'Nervous, inconsistent and indecisive.',
    summary:
      'Gemini sparkles with curiosity and conversation. Ruled by Mercury, your quick mind and dual nature let you see every side of a story and connect effortlessly with others.',
  },
  {
    slug: 'cancer',
    name: 'Cancer',
    glyph: '♋︎',
    dates: 'Jun 21 – Jul 22',
    start: [6, 21],
    element: 'Water',
    modality: 'Cardinal',
    ruler: 'Moon',
    symbol: 'The Crab',
    luckyNumber: 2,
    luckyColor: 'Silver',
    traits: ['Nurturing', 'Intuitive', 'Loyal', 'Sensitive'],
    strengths: 'Tenacious, imaginative, loyal, emotional, sympathetic and persuasive.',
    weaknesses: 'Moody, pessimistic, suspicious and insecure.',
    summary:
      'Cancer is the nurturer of the zodiac. Guided by the Moon, you feel deeply, protect fiercely and create a sense of home wherever you go.',
  },
  {
    slug: 'leo',
    name: 'Leo',
    glyph: '♌︎',
    dates: 'Jul 23 – Aug 22',
    start: [7, 23],
    element: 'Fire',
    modality: 'Fixed',
    ruler: 'Sun',
    symbol: 'The Lion',
    luckyNumber: 1,
    luckyColor: 'Gold',
    traits: ['Radiant', 'Generous', 'Creative', 'Proud'],
    strengths: 'Creative, passionate, generous, warm-hearted, cheerful and humorous.',
    weaknesses: 'Arrogant, stubborn, self-centered and inflexible.',
    summary:
      'Leo shines with the warmth of the Sun itself. Charismatic and big-hearted, you are born to create, perform and inspire everyone lucky enough to orbit you.',
  },
  {
    slug: 'virgo',
    name: 'Virgo',
    glyph: '♍︎',
    dates: 'Aug 23 – Sep 22',
    start: [8, 23],
    element: 'Earth',
    modality: 'Mutable',
    ruler: 'Mercury',
    symbol: 'The Maiden',
    luckyNumber: 5,
    luckyColor: 'Navy',
    traits: ['Analytical', 'Kind', 'Diligent', 'Perfectionist'],
    strengths: 'Loyal, analytical, kind, hardworking and practical.',
    weaknesses: 'Shy, worrisome and overly critical of self and others.',
    summary:
      'Virgo brings order to chaos with grace. Ruled by Mercury, your sharp eye for detail and quiet devotion to service make you the healer and helper of the zodiac.',
  },
  {
    slug: 'libra',
    name: 'Libra',
    glyph: '♎︎',
    dates: 'Sep 23 – Oct 22',
    start: [9, 23],
    element: 'Air',
    modality: 'Cardinal',
    ruler: 'Venus',
    symbol: 'The Scales',
    luckyNumber: 7,
    luckyColor: 'Rose',
    traits: ['Diplomatic', 'Charming', 'Fair', 'Indecisive'],
    strengths: 'Cooperative, diplomatic, gracious, fair-minded and social.',
    weaknesses: 'Indecisive, avoids confrontations and can carry grudges.',
    summary:
      'Libra seeks harmony in all things. Guided by Venus, you are an artist of balance, beauty and partnership, always striving to make the world a fairer place.',
  },
  {
    slug: 'scorpio',
    name: 'Scorpio',
    glyph: '♏︎',
    dates: 'Oct 23 – Nov 21',
    start: [10, 23],
    element: 'Water',
    modality: 'Fixed',
    ruler: 'Pluto',
    symbol: 'The Scorpion',
    luckyNumber: 8,
    luckyColor: 'Crimson',
    traits: ['Passionate', 'Magnetic', 'Resourceful', 'Secretive'],
    strengths: 'Resourceful, brave, passionate, stubborn and a true friend.',
    weaknesses: 'Distrusting, jealous, secretive and occasionally ruthless.',
    summary:
      'Scorpio dives beneath the surface. Ruled by Pluto, you possess magnetic intensity, unwavering loyalty and a profound capacity for transformation.',
  },
  {
    slug: 'sagittarius',
    name: 'Sagittarius',
    glyph: '♐︎',
    dates: 'Nov 22 – Dec 21',
    start: [11, 22],
    element: 'Fire',
    modality: 'Mutable',
    ruler: 'Jupiter',
    symbol: 'The Archer',
    luckyNumber: 3,
    luckyColor: 'Purple',
    traits: ['Adventurous', 'Optimistic', 'Honest', 'Restless'],
    strengths: 'Generous, idealistic and blessed with a great sense of humor.',
    weaknesses: 'Promises more than can be delivered, impatient and tactless.',
    summary:
      'Sagittarius aims its arrow at the horizon. Guided by expansive Jupiter, you are the eternal explorer, philosopher and optimist of the zodiac.',
  },
  {
    slug: 'capricorn',
    name: 'Capricorn',
    glyph: '♑︎',
    dates: 'Dec 22 – Jan 19',
    start: [12, 22],
    element: 'Earth',
    modality: 'Cardinal',
    ruler: 'Saturn',
    symbol: 'The Sea-Goat',
    luckyNumber: 4,
    luckyColor: 'Charcoal',
    traits: ['Ambitious', 'Disciplined', 'Wise', 'Reserved'],
    strengths: 'Responsible, disciplined, self-controlled and a good manager.',
    weaknesses: 'Know-it-all, unforgiving, condescending and pessimistic.',
    summary:
      'Capricorn climbs every mountain with patience. Ruled by Saturn, you master time, structure and ambition, building legacies that stand the test of ages.',
  },
  {
    slug: 'aquarius',
    name: 'Aquarius',
    glyph: '♒︎',
    dates: 'Jan 20 – Feb 18',
    start: [1, 20],
    element: 'Air',
    modality: 'Fixed',
    ruler: 'Uranus',
    symbol: 'The Water-Bearer',
    luckyNumber: 11,
    luckyColor: 'Electric Blue',
    traits: ['Visionary', 'Independent', 'Humanitarian', 'Aloof'],
    strengths: 'Progressive, original, independent and humanitarian.',
    weaknesses: 'Runs from emotional expression, temperamental and uncompromising.',
    summary:
      'Aquarius pours the waters of innovation onto the world. Guided by Uranus, you are the visionary rebel who dreams of a brighter future for all.',
  },
  {
    slug: 'pisces',
    name: 'Pisces',
    glyph: '♓︎',
    dates: 'Feb 19 – Mar 20',
    start: [2, 19],
    element: 'Water',
    modality: 'Mutable',
    ruler: 'Neptune',
    symbol: 'The Fish',
    luckyNumber: 12,
    luckyColor: 'Sea Green',
    traits: ['Compassionate', 'Artistic', 'Dreamy', 'Escapist'],
    strengths: 'Compassionate, artistic, intuitive, gentle, wise and musical.',
    weaknesses: 'Fearful, overly trusting, sad and desires to escape reality.',
    summary:
      'Pisces swims between dream and reality. Ruled by Neptune, you are the mystic and artist of the zodiac, blessed with boundless empathy and imagination.',
  },
];

export function getSign(slug) {
  return SIGNS.find((s) => s.slug === slug);
}

/** Sun sign from a month (1-12) and day. */
export function sunSignFor(month, day) {
  // Walk backwards through the year to find the latest sign start on/before the date.
  const ordered = [...SIGNS].sort((a, b) => a.start[0] - b.start[0] || a.start[1] - b.start[1]);
  let result = ordered[ordered.length - 1]; // Capricorn wraps Dec -> Jan
  for (const sign of ordered) {
    const [m, d] = sign.start;
    if (month > m || (month === m && day >= d)) result = sign;
  }
  return result;
}

/* --------------------------------------------------------------------------
   Hindi (हिंदी) content
   -------------------------------------------------------------------------- */
const MONTHS_HI = { Jan: 'जन', Feb: 'फ़र', Mar: 'मार्च', Apr: 'अप्रै', May: 'मई', Jun: 'जून', Jul: 'जुला', Aug: 'अग', Sep: 'सित', Oct: 'अक्टू', Nov: 'नव', Dec: 'दिस' };
export const ELEMENT_HI = { Fire: 'अग्नि', Earth: 'पृथ्वी', Air: 'वायु', Water: 'जल' };
const MODALITY_HI = { Cardinal: 'चर', Fixed: 'स्थिर', Mutable: 'द्विस्वभाव' };
const PLANET_HI = { Mars: 'मंगल', Venus: 'शुक्र', Mercury: 'बुध', Moon: 'चंद्र', Sun: 'सूर्य', Pluto: 'प्लूटो', Jupiter: 'बृहस्पति', Saturn: 'शनि', Uranus: 'यूरेनस', Neptune: 'नेपच्यून' };

const HI = {
  aries: { name: 'मेष', symbol: 'मेढ़ा', luckyColor: 'लाल', traits: ['साहसी', 'ऊर्जावान', 'अग्रणी', 'आवेगी'], strengths: 'बहादुर, दृढ़ निश्चयी, आत्मविश्वासी, उत्साही, आशावादी और ईमानदार।', weaknesses: 'अधीर, मूडी, जल्दी क्रोधित होने वाले और कभी-कभी आक्रामक।', summary: 'राशिचक्र की पहली राशि के रूप में मेष नई शुरुआत की ऊर्जा से भरपूर है। मंगल द्वारा शासित, आप जन्मजात नेता हैं जो चुनौतियों और साहसिक कार्यों में आगे रहते हैं।' },
  taurus: { name: 'वृषभ', symbol: 'बैल', luckyColor: 'पन्ना हरा', traits: ['विश्वसनीय', 'कलाप्रिय', 'धैर्यवान', 'ज़िद्दी'], strengths: 'विश्वसनीय, धैर्यवान, व्यावहारिक, समर्पित, ज़िम्मेदार और स्थिर।', weaknesses: 'ज़िद्दी, अधिकार जताने वाले और समझौता न करने वाले।', summary: 'वृषभ राशिचक्र की स्थिर धड़कन है। शुक्र के मार्गदर्शन में आप सुंदरता, सुख और वफादारी को महत्व देते हैं और अद्भुत धैर्य से मज़बूत नींव बनाते हैं।' },
  gemini: { name: 'मिथुन', symbol: 'जुड़वाँ', luckyColor: 'पीला', traits: ['जिज्ञासु', 'हाज़िरजवाब', 'अनुकूलनशील', 'चंचल'], strengths: 'सौम्य, स्नेही, जिज्ञासु, अनुकूलनशील और जल्दी सीखने वाले।', weaknesses: 'घबराहट, असंगति और अनिर्णय।', summary: 'मिथुन जिज्ञासा और संवाद से चमकता है। बुध द्वारा शासित, आपका तेज़ दिमाग हर पहलू को देख लेता है और आप सहजता से लोगों से जुड़ जाते हैं।' },
  cancer: { name: 'कर्क', symbol: 'केकड़ा', luckyColor: 'चाँदी', traits: ['पालनकर्ता', 'अंतर्ज्ञानी', 'वफ़ादार', 'संवेदनशील'], strengths: 'दृढ़, कल्पनाशील, वफ़ादार, भावुक, सहानुभूतिपूर्ण और प्रभावशाली।', weaknesses: 'मूडी, निराशावादी, शंकालु और असुरक्षित।', summary: 'कर्क राशिचक्र का पालनकर्ता है। चंद्रमा के मार्गदर्शन में आप गहराई से महसूस करते हैं, पूरी शिद्दत से रक्षा करते हैं और जहाँ जाते हैं वहाँ घर जैसा अपनापन बनाते हैं।' },
  leo: { name: 'सिंह', symbol: 'शेर', luckyColor: 'सुनहरा', traits: ['तेजस्वी', 'उदार', 'रचनात्मक', 'स्वाभिमानी'], strengths: 'रचनात्मक, जोशीले, उदार, दयालु, प्रसन्नचित्त और विनोदी।', weaknesses: 'अहंकारी, ज़िद्दी, आत्मकेंद्रित और अडिग।', summary: 'सिंह स्वयं सूर्य की गर्माहट से चमकता है। करिश्माई और बड़े दिल वाले, आप सृजन करने, प्रदर्शन करने और सबको प्रेरित करने के लिए जन्मे हैं।' },
  virgo: { name: 'कन्या', symbol: 'कन्या', luckyColor: 'नीला', traits: ['विश्लेषणात्मक', 'दयालु', 'परिश्रमी', 'पूर्णतावादी'], strengths: 'वफ़ादार, विश्लेषणात्मक, दयालु, मेहनती और व्यावहारिक।', weaknesses: 'शर्मीले, चिंतित और स्वयं व दूसरों के प्रति अत्यधिक आलोचनात्मक।', summary: 'कन्या अव्यवस्था में सौम्यता से व्यवस्था लाती है। बुध द्वारा शासित, बारीकियों पर आपकी पैनी नज़र और सेवा भाव आपको राशिचक्र का उपचारक बनाते हैं।' },
  libra: { name: 'तुला', symbol: 'तराज़ू', luckyColor: 'गुलाबी', traits: ['कूटनीतिक', 'आकर्षक', 'न्यायप्रिय', 'अनिर्णायक'], strengths: 'सहयोगी, कूटनीतिक, शालीन, निष्पक्ष और मिलनसार।', weaknesses: 'अनिर्णायक, टकराव से बचने वाले और मन में बात रखने वाले।', summary: 'तुला हर चीज़ में संतुलन चाहती है। शुक्र के मार्गदर्शन में आप सुंदरता, संतुलन और साझेदारी के कलाकार हैं जो दुनिया को अधिक न्यायपूर्ण बनाना चाहते हैं।' },
  scorpio: { name: 'वृश्चिक', symbol: 'बिच्छू', luckyColor: 'गहरा लाल', traits: ['जोशीले', 'चुंबकीय', 'साधन-संपन्न', 'रहस्यमय'], strengths: 'साधन-संपन्न, बहादुर, जोशीले, दृढ़ और सच्चे मित्र।', weaknesses: 'अविश्वासी, ईर्ष्यालु, रहस्यमय और कभी-कभी कठोर।', summary: 'वृश्चिक सतह के नीचे गहराई तक जाता है। प्लूटो द्वारा शासित, आपमें चुंबकीय तीव्रता, अटूट वफ़ादारी और परिवर्तन की गहरी क्षमता है।' },
  sagittarius: { name: 'धनु', symbol: 'धनुर्धर', luckyColor: 'बैंगनी', traits: ['साहसिक', 'आशावादी', 'ईमानदार', 'बेचैन'], strengths: 'उदार, आदर्शवादी और अद्भुत हास्य-बोध वाले।', weaknesses: 'क्षमता से अधिक वादे करने वाले, अधीर और स्पष्टवादी।', summary: 'धनु अपना तीर क्षितिज की ओर साधता है। विस्तारवादी बृहस्पति के मार्गदर्शन में आप राशिचक्र के शाश्वत खोजी, दार्शनिक और आशावादी हैं।' },
  capricorn: { name: 'मकर', symbol: 'मकर', luckyColor: 'स्लेटी', traits: ['महत्वाकांक्षी', 'अनुशासित', 'बुद्धिमान', 'संयमी'], strengths: 'ज़िम्मेदार, अनुशासित, आत्म-नियंत्रित और अच्छे प्रबंधक।', weaknesses: 'सर्वज्ञ बनने वाले, क्षमा न करने वाले और निराशावादी।', summary: 'मकर धैर्य से हर पर्वत चढ़ता है। शनि द्वारा शासित, आप समय, संरचना और महत्वाकांक्षा के स्वामी हैं जो युगों तक टिकने वाली विरासत बनाते हैं।' },
  aquarius: { name: 'कुंभ', symbol: 'कुंभ (घड़ा)', luckyColor: 'बिजली नीला', traits: ['दूरदर्शी', 'स्वतंत्र', 'मानवतावादी', 'अलग-थलग'], strengths: 'प्रगतिशील, मौलिक, स्वतंत्र और मानवतावादी।', weaknesses: 'भावनाएँ व्यक्त करने से बचने वाले, मनमौजी और अडिग।', summary: 'कुंभ दुनिया पर नवाचार का जल बरसाता है। यूरेनस के मार्गदर्शन में आप वह दूरदर्शी विद्रोही हैं जो सबके लिए उज्ज्वल भविष्य का सपना देखता है।' },
  pisces: { name: 'मीन', symbol: 'मछलियाँ', luckyColor: 'समुद्री हरा', traits: ['करुणामय', 'कलात्मक', 'स्वप्नदर्शी', 'पलायनवादी'], strengths: 'करुणामय, कलात्मक, अंतर्ज्ञानी, सौम्य, बुद्धिमान और संगीतप्रेमी।', weaknesses: 'भयभीत, अति विश्वासी, उदास और वास्तविकता से भागने की इच्छा।', summary: 'मीन सपने और यथार्थ के बीच तैरती है। नेपच्यून द्वारा शासित, आप राशिचक्र के रहस्यदर्शी और कलाकार हैं, असीम सहानुभूति और कल्पना से धन्य।' },
};

const translateDates = (dates) => dates.replace(/[A-Z][a-z]{2}/g, (m) => MONTHS_HI[m] || m);

/** Returns the sign with display fields in the requested language (keys like `element` stay English for lookups). */
export function localizeSign(sign, lang) {
  if (!sign) return sign;
  const base = { ...sign, elementLabel: sign.element, modalityLabel: sign.modality, rulerLabel: sign.ruler, englishName: sign.name };
  if (lang !== 'hi') return base;
  const hi = HI[sign.slug];
  return {
    ...base,
    ...hi,
    dates: translateDates(sign.dates),
    elementLabel: ELEMENT_HI[sign.element],
    modalityLabel: MODALITY_HI[sign.modality],
    rulerLabel: PLANET_HI[sign.ruler],
  };
}

export const signNameHi = (slug) => HI[slug]?.name;
