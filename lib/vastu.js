// Vastu self-check questionnaire.
// `chart` picks the direction diagram shown beside each question: c8 / c16 compass, wall, pair, door or plain. Every question and option is bilingual { en, hi }.
// `stars` is 1–5 (5 = सर्वोत्तम). Questions with `scored: false` are informational only.
// `tip` is the traditional remedy shown when the chosen option scores 2★ or less.

// `dirs` (space-separated) marks where an option sits on the question's direction chart:
// compass keys (N, NNE … NNW, C = centre), wall padas (p1–p9, corner), or `high>low` for slope.
const o = (hi, en, stars, dirs = '') => ({ hi, en, stars, dirs: dirs ? dirs.split(' ') : [] });

export const STAR_LEGEND = [
  { stars: 5, label: { en: 'Excellent', hi: 'सर्वोत्तम' } },
  { stars: 4, label: { en: 'Auspicious', hi: 'शुभ' } },
  { stars: 3, label: { en: 'Moderate', hi: 'मध्यम' } },
  { stars: 2, label: { en: 'Inauspicious', hi: 'अशुभ' } },
  { stars: 1, label: { en: 'Highly inauspicious', hi: 'अत्यंत अशुभ' } },
];

export const SECTIONS = [
  { key: 'entry', label: { en: 'Entrance & Facing', hi: 'द्वार एवं मुख' } },
  { key: 'corners', label: { en: 'The Four Corners', hi: 'चारों कोण' } },
  { key: 'rooms', label: { en: 'Rooms', hi: 'कक्ष व्यवस्था' } },
  { key: 'elements', label: { en: 'Water, Weight & Slope', hi: 'जल, भार एवं ढलान' } },
  { key: 'surround', label: { en: 'Light & Surroundings', hi: 'प्रकाश एवं परिवेश' } },
  { key: 'experience', label: { en: 'Experience & Kundli', hi: 'अनुभव एवं कुंडली' } },
];

export const QUESTIONS = [
  {
    id: 1, chart: 'c16', section: 'entry', icon: 'DoorOpen',
    q: { hi: 'मुख्य द्वार किस दिशा में है?', en: 'Which direction does the main door face?' },
    options: [
      o('उत्तर (North)', 'North', 5, 'N'),
      o('उत्तर-ईशान (NNE)', 'North-north-east (NNE)', 4, 'NNE'),
      o('पूर्व (East)', 'East', 5, 'E'),
      o('पूर्व-ईशान (ENE)', 'East-north-east (ENE)', 4, 'ENE'),
      o('दक्षिण (South)', 'South', 3, 'S'),
      o('दक्षिण-आग्नेय (SSE)', 'South-south-east (SSE)', 2, 'SSE'),
      o('पश्चिम (West)', 'West', 4, 'W'),
      o('पश्चिम-वायव्य (WNW)', 'West-north-west (WNW)', 3, 'WNW'),
    ],
    tip: {
      hi: 'द्वार पर स्वस्तिक व शुभ-लाभ अंकित करें, तांबे/पीतल की दहलीज़ लगाएँ और द्वार के ऊपर वास्तु पिरामिड या गणेश प्रतिमा स्थापित करें।',
      en: 'Mark a Swastik and Shubh-Labh at the door, fit a copper or brass threshold, and place a Vastu pyramid or Ganesh idol above the door.',
    },
  },
  {
    id: 2, chart: 'wall', section: 'entry', icon: 'DoorOpen',
    q: { hi: 'मुख्य द्वार उस दिशा के किस भाग में है?', en: 'Where along that wall is the main door placed?' },
    hint: { hi: 'घर के अंदर से बाहर की ओर देखते हुए', en: 'As seen from inside, looking out' },
    options: [
      o('एकदम बाएँ छोर पर', 'At the extreme left end', 2, 'p1'),
      o('बाएँ भाग में पर कोने से हटकर', 'Left side, away from the corner', 4, 'p3'),
      o('एकदम मध्य में', 'Exactly in the centre', 3, 'p5'),
      o('दाएँ भाग में पर कोने से हटकर', 'Right side, away from the corner', 5, 'p7'),
      o('एकदम दाएँ छोर पर', 'At the extreme right end', 2, 'p9'),
      o('कोने को काटता हुआ', 'Cutting across the corner', 1, 'corner'),
    ],
    tip: {
      hi: 'कोने पर बने द्वार के दोषपूर्ण भाग की ओर धातु की पट्टी या वास्तु हेलिक्स लगाएँ; संभव हो तो द्वार को कोने से हटाकर शुभ पद में लाएँ।',
      en: 'Fix a metal strip or Vastu helix on the defective side of a corner door; if possible, shift the door away from the corner into an auspicious pada.',
    },
  },
  {
    id: 3, chart: 'c8', section: 'entry', icon: 'Compass',
    q: { hi: 'घर का मुख किस दिशा में है?', en: 'Which direction does the house face?' },
    options: [
      o('उत्तरमुखी', 'North-facing', 5, 'N'),
      o('उत्तर-पूर्वमुखी', 'North-east-facing', 5, 'NE'),
      o('पूर्वमुखी', 'East-facing', 5, 'E'),
      o('दक्षिण-पूर्वमुखी', 'South-east-facing', 3, 'SE'),
      o('दक्षिणमुखी', 'South-facing', 3, 'S'),
      o('दक्षिण-पश्चिममुखी', 'South-west-facing', 2, 'SW'),
      o('पश्चिममुखी', 'West-facing', 4, 'W'),
      o('उत्तर-पश्चिममुखी', 'North-west-facing', 4, 'NW'),
    ],
    tip: {
      hi: 'नैऋत्यमुखी घर में दक्षिण-पश्चिम की दीवारें ऊँची व मोटी रखें, उस ओर भारी गमले/पत्थर रखें और द्वार पर पंचमुखी हनुमान का चित्र लगाएँ।',
      en: 'For a south-west-facing home keep the SW walls high and thick, place heavy planters or stones there, and put a Panchmukhi Hanuman image at the door.',
    },
  },
  {
    id: 4, chart: 'c8', section: 'corners', icon: 'Sparkles', zone: 'NE',
    q: { hi: 'ईशान कोण (NE) में क्या है?', en: 'What is in the north-east (Ishaan) corner?' },
    options: [
      o('पूजा स्थल', 'Prayer room / altar', 5),
      o('खाली / खुला स्थान', 'Empty / open space', 5),
      o('बच्चों का कमरा', "Children's room", 3),
      o('बोरवेल / भूमिगत टैंक', 'Borewell / underground tank', 5),
      o('रसोई', 'Kitchen', 1),
      o('Toilet / Bathroom', 'Toilet / bathroom', 1),
      o('सीढ़ियाँ', 'Staircase', 1),
      o('मुख्य द्वार', 'Main door', 4),
    ],
    tip: {
      hi: 'ईशान को सबसे हल्का, स्वच्छ और खुला रखें। रसोई हो तो चूल्हा रसोई के आग्नेय भाग में ले जाएँ; शौचालय हो तो उसका प्रयोग सीमित कर, समुद्री नमक की कटोरी रखें और ढक्कन बंद रखें।',
      en: 'Keep the NE the lightest, cleanest and most open zone. If a kitchen is here, move the stove to the kitchen’s SE part; if a toilet, limit its use, keep a bowl of sea salt and the lid closed.',
    },
  },
  {
    id: 5, chart: 'c8', section: 'corners', icon: 'Mountain', zone: 'SW',
    q: { hi: 'नैऋत्य कोण (SW) में क्या है?', en: 'What is in the south-west (Nairitya) corner?' },
    options: [
      o('Master Bedroom', 'Master bedroom', 5),
      o('भारी Storage / तिजोरी', 'Heavy storage / safe', 5),
      o('Overhead Water Tank', 'Overhead water tank', 4),
      o('सीढ़ियाँ', 'Staircase', 4),
      o('रसोई', 'Kitchen', 2),
      o('Toilet / Bathroom', 'Toilet / bathroom', 2),
      o('पूजा स्थल', 'Prayer room / altar', 1),
      o('खाली स्थान', 'Empty space', 1),
    ],
    tip: {
      hi: 'नैऋत्य को सबसे भारी और ऊँचा रखें — भारी अलमारी या तिजोरी रखें। यहाँ खालीपन हो तो पत्थर/सीसे का भार रखें; पूजा स्थल को ईशान में स्थानांतरित करें।',
      en: 'Keep the SW the heaviest and highest zone — place a heavy almirah or safe. If it is empty, add stone or lead weights; move the altar to the NE.',
    },
  },
  {
    id: 6, chart: 'c8', section: 'corners', icon: 'Flame', zone: 'SE',
    q: { hi: 'आग्नेय कोण (SE) में क्या है?', en: 'What is in the south-east (Agneya) corner?' },
    options: [
      o('रसोई', 'Kitchen', 5),
      o('इन्वर्टर / बिजली मीटर', 'Inverter / electricity meter', 4),
      o('शयनकक्ष', 'Bedroom', 3),
      o('Toilet / Bathroom', 'Toilet / bathroom', 2),
      o('पूजा स्थल', 'Prayer room / altar', 2),
      o('मुख्य द्वार', 'Main door', 3),
      o('ड्राइंग रूम', 'Drawing room', 3),
    ],
    tip: {
      hi: 'आग्नेय अग्नि तत्व का स्थान है। यहाँ लाल/नारंगी रंग का बल्ब या दीपक जलाएँ, और विद्युत उपकरण इसी कोण में रखें।',
      en: 'The SE is the seat of fire. Keep a red or orange lamp burning here and place electrical appliances in this corner.',
    },
  },
  {
    id: 7, chart: 'c8', section: 'corners', icon: 'Wind', zone: 'NW',
    q: { hi: 'वायव्य कोण (NW) में क्या है?', en: 'What is in the north-west (Vayavya) corner?' },
    options: [
      o('अतिथि कक्ष', 'Guest room', 5),
      o('बच्चों का कमरा', "Children's room", 4),
      o('Toilet / Bathroom', 'Toilet / bathroom', 4),
      o('रसोई', 'Kitchen', 4),
      o('Store Room', 'Store room', 3),
      o('Master Bedroom', 'Master bedroom', 2),
      o('गैराज', 'Garage', 4),
    ],
    tip: {
      hi: 'वायव्य में शयन करने से अस्थिरता बढ़ती है। संभव हो तो मुखिया नैऋत्य कक्ष में सोएँ; यहाँ विंड चाइम और चाँदी/सफ़ेद रंग का प्रयोग करें।',
      en: 'Sleeping in the NW brings restlessness. If possible, the head of the family should sleep in the SW; use a wind chime and silver/white tones here.',
    },
  },
  {
    id: 8, chart: 'c16', section: 'rooms', icon: 'CookingPot',
    q: { hi: 'रसोई किस दिशा में है?', en: 'In which direction is the kitchen?' },
    options: [
      o('आग्नेय (SE)', 'South-east (SE)', 5, 'SE'),
      o('दक्षिण-आग्नेय (SSE)', 'South-south-east (SSE)', 4, 'SSE'),
      o('वायव्य (NW)', 'North-west (NW)', 4, 'NW'),
      o('उत्तर-पश्चिम', 'North-west side', 3, 'NW'),
      o('ईशान (NE)', 'North-east (NE)', 1, 'NE'),
      o('नैऋत्य (SW)', 'South-west (SW)', 2, 'SW'),
      o('उत्तर', 'North', 2, 'N'),
      o('पश्चिम', 'West', 3, 'W'),
    ],
    tip: {
      hi: 'रसोई बदलना संभव न हो तो चूल्हा रसोई के आग्नेय भाग में रखें, पीने का पानी ईशान भाग में रखें और रसोई में पीला/नारंगी रंग प्रयोग करें।',
      en: 'If the kitchen cannot move, put the stove in the kitchen’s own SE part, drinking water in its NE part, and use yellow or orange colours.',
    },
  },
  {
    id: 9, chart: 'c8', section: 'rooms', icon: 'ChefHat',
    q: { hi: 'खाना बनाते समय मुख किस दिशा में रहता है?', en: 'Which direction do you face while cooking?' },
    options: [
      o('पूर्व की ओर', 'East', 5, 'E'),
      o('उत्तर की ओर', 'North', 4, 'N'),
      o('उत्तर-पूर्व की ओर', 'North-east', 4, 'NE'),
      o('दक्षिण की ओर', 'South', 2, 'S'),
      o('पश्चिम की ओर', 'West', 3, 'W'),
      o('आग्नेय की ओर', 'South-east', 2, 'SE'),
    ],
    tip: {
      hi: 'चूल्हे की स्थिति ऐसी करें कि भोजन बनाते समय मुख पूर्व की ओर रहे। संभव न हो तो रसोई में पूर्व दिशा में सूर्य का चित्र लगाएँ।',
      en: 'Reposition the stove so you face east while cooking. If that is not possible, hang a picture of the rising sun on the kitchen’s east wall.',
    },
  },
  {
    id: 10, chart: 'c8', section: 'rooms', icon: 'BedDouble',
    q: { hi: 'Master Bedroom किस दिशा में है?', en: 'In which direction is the master bedroom?' },
    options: [
      o('नैऋत्य (SW)', 'South-west (SW)', 5, 'SW'),
      o('दक्षिण', 'South', 4, 'S'),
      o('पश्चिम', 'West', 4, 'W'),
      o('वायव्य (NW)', 'North-west (NW)', 2, 'NW'),
      o('आग्नेय (SE)', 'South-east (SE)', 2, 'SE'),
      o('ईशान (NE)', 'North-east (NE)', 1, 'NE'),
    ],
    tip: {
      hi: 'सोते समय सिर दक्षिण या पूर्व की ओर रखें। पलंग कमरे के नैऋत्य भाग में रखें, और कक्ष में हल्के मिट्टी जैसे (earthy) रंग प्रयोग करें।',
      en: 'Sleep with your head to the south or east. Place the bed in the room’s SW part and use soft earthy colours.',
    },
  },
  {
    id: 11, chart: 'c16', section: 'rooms', icon: 'Baby',
    q: { hi: 'बच्चों का कमरा किस दिशा में है?', en: "In which direction is the children's room?" },
    options: [
      o('उत्तर', 'North', 5, 'N'),
      o('उत्तर-वायव्य', 'North-north-west', 4, 'NNW'),
      o('वायव्य (NW)', 'North-west (NW)', 5, 'NW'),
      o('पश्चिम', 'West', 4, 'W'),
      o('पूर्व', 'East', 4, 'E'),
      o('ईशान (NE)', 'North-east (NE)', 2, 'NE'),
      o('अलग कमरा नहीं है', 'No separate room', 3),
    ],
    tip: {
      hi: 'ईशान कक्ष में बच्चों का भारी फ़र्नीचर न रखें; पढ़ाई की मेज़ ऐसे रखें कि मुख पूर्व या उत्तर की ओर रहे।',
      en: 'Avoid heavy furniture in an NE children’s room; set the study desk so the child faces east or north.',
    },
  },
  {
    id: 12, chart: 'c8', section: 'rooms', icon: 'Flower2',
    q: { hi: 'पूजा स्थल किस दिशा में है?', en: 'In which direction is the prayer space?' },
    options: [
      o('ईशान (NE)', 'North-east (NE)', 5, 'NE'),
      o('उत्तर', 'North', 4, 'N'),
      o('पूर्व', 'East', 4, 'E'),
      o('उत्तर-ईशान कमरे में', 'In a north/north-east room', 5, 'N NE'),
      o('रसोई में ही', 'Inside the kitchen', 2),
      o('शयनकक्ष में ही', 'Inside the bedroom', 2),
      o('पूजा स्थल नहीं है', 'No prayer space', 1),
    ],
    tip: {
      hi: 'घर के ईशान में छोटा-सा पूजा स्थल अवश्य बनाएँ। शयनकक्ष में हो तो रात में पर्दा डालें; रसोई में हो तो उसे चूल्हे से दूर ईशान भाग में रखें।',
      en: 'Set up even a small altar in the home’s NE. If it is in a bedroom, curtain it at night; if in the kitchen, keep it in the NE part away from the stove.',
    },
  },
  {
    id: 13, chart: 'c16', section: 'rooms', icon: 'Bath',
    q: { hi: 'Toilet / Bathroom किस दिशा में है?', en: 'In which direction is the toilet / bathroom?' },
    options: [
      o('वायव्य (NW)', 'North-west (NW)', 5, 'NW'),
      o('पश्चिम', 'West', 4, 'W'),
      o('दक्षिण', 'South', 4, 'S'),
      o('दक्षिण-नैऋत्य (SSW)', 'South-south-west (SSW)', 4, 'SSW'),
      o('आग्नेय (SE)', 'South-east (SE)', 3, 'SE'),
      o('ईशान (NE)', 'North-east (NE)', 1, 'NE'),
      o('ब्रह्मस्थान (मध्य) में', 'In the Brahmasthan (centre)', 1, 'C'),
    ],
    tip: {
      hi: 'शौचालय का द्वार सदैव बंद रखें, उसमें समुद्री नमक की कटोरी रखें (सप्ताह में बदलें) और एग्ज़ॉस्ट फ़ैन चलाएँ। ब्रह्मस्थान का शौचालय विशेषज्ञ परामर्श से हटाएँ।',
      en: 'Always keep the toilet door shut, keep a bowl of sea salt inside (change weekly) and run an exhaust fan. Get expert advice to relocate a toilet in the Brahmasthan.',
    },
  },
  {
    id: 14, chart: 'c8', section: 'rooms', icon: 'Footprints',
    q: { hi: 'सीढ़ियाँ किस दिशा में हैं?', en: 'In which direction is the staircase?' },
    options: [
      o('दक्षिण में (Clockwise चढ़ती)', 'South (climbing clockwise)', 5, 'S'),
      o('पश्चिम में', 'West', 4, 'W'),
      o('नैऋत्य में', 'South-west', 4, 'SW'),
      o('आग्नेय में', 'South-east', 3, 'SE'),
      o('वायव्य में', 'North-west', 3, 'NW'),
      o('ईशान में', 'North-east', 1, 'NE'),
      o('उत्तर / पूर्व में', 'North / East', 2, 'N E'),
    ],
    tip: {
      hi: 'ईशान की सीढ़ियों के नीचे कोई भारी या गंदा सामान न रखें; सीढ़ी के आरंभ में तुलसी या मनी प्लांट रखें और सीढ़ियों की संख्या विषम रखें।',
      en: 'Keep nothing heavy or dirty under NE stairs; place a tulsi or money plant at the foot of the stairs and keep an odd number of steps.',
    },
  },
  {
    id: 15, chart: 'c8', section: 'elements', icon: 'Waves',
    q: { hi: 'Borewell / Underground Tank किस दिशा में है?', en: 'Where is the borewell / underground tank?' },
    options: [
      o('ईशान (NE)', 'North-east (NE)', 5, 'NE'),
      o('उत्तर', 'North', 5, 'N'),
      o('पूर्व', 'East', 4, 'E'),
      o('वायव्य (NW)', 'North-west (NW)', 3, 'NW'),
      o('आग्नेय (SE)', 'South-east (SE)', 2, 'SE'),
      o('नैऋत्य (SW)', 'South-west (SW)', 1, 'SW'),
      o('नहीं है', 'None', 3),
    ],
    tip: {
      hi: 'नैऋत्य या आग्नेय का भूमिगत जल-स्रोत गंभीर दोष है। प्रयोग बंद कर उसे भरवाने पर विचार करें और नया स्रोत ईशान/उत्तर में बनवाएँ।',
      en: 'An underground water source in the SW or SE is a serious defect. Consider sealing it and creating a new one in the NE or north.',
    },
  },
  {
    id: 16, chart: 'c8', section: 'elements', icon: 'Container',
    q: { hi: 'Overhead Water Tank किस दिशा में है?', en: 'Where is the overhead water tank?' },
    options: [
      o('नैऋत्य (SW)', 'South-west (SW)', 5, 'SW'),
      o('पश्चिम', 'West', 4, 'W'),
      o('दक्षिण', 'South', 4, 'S'),
      o('वायव्य (NW)', 'North-west (NW)', 3, 'NW'),
      o('ईशान (NE)', 'North-east (NE)', 1, 'NE'),
      o('आग्नेय (SE)', 'South-east (SE)', 2, 'SE'),
      o('छत के मध्य में', 'Middle of the roof', 2, 'C'),
    ],
    tip: {
      hi: 'ओवरहेड टंकी को नैऋत्य में ऊँचे प्लेटफ़ॉर्म पर स्थानांतरित करें। ईशान की टंकी घर पर भार बनाती है — इसे शीघ्र हटाना उचित है।',
      en: 'Shift the overhead tank to a raised platform in the SW. A tank in the NE weighs down the home — move it as soon as practical.',
    },
  },
  {
    id: 17, chart: 'c8', section: 'elements', icon: 'Sun',
    q: { hi: 'सबसे अधिक खुला स्थान किस दिशा में है?', en: 'Where is the most open space around the house?' },
    options: [
      o('ईशान', 'North-east', 5, 'NE'),
      o('उत्तर', 'North', 5, 'N'),
      o('पूर्व', 'East', 4, 'E'),
      o('वायव्य', 'North-west', 3, 'NW'),
      o('दक्षिण', 'South', 2, 'S'),
      o('पश्चिम', 'West', 2, 'W'),
      o('नैऋत्य', 'South-west', 1, 'SW'),
      o('कोई खुला स्थान नहीं', 'No open space', 2),
    ],
    tip: {
      hi: 'दक्षिण/पश्चिम के खुले भाग में ऊँचे पेड़ लगाएँ या ऊँची चारदीवारी बनवाएँ; उत्तर-पूर्व में हल्के पौधे और खुलापन रखें।',
      en: 'Plant tall trees or raise the boundary wall in an open south/west side; keep the north-east open with only light plants.',
    },
  },
  {
    id: 18, chart: 'c8', section: 'elements', icon: 'Vault',
    q: { hi: 'भारी सामान / तिजोरी किस दिशा में है?', en: 'Where are heavy items / the safe kept?' },
    options: [
      o('नैऋत्य (SW)', 'South-west (SW)', 5, 'SW'),
      o('दक्षिण', 'South', 4, 'S'),
      o('पश्चिम', 'West', 4, 'W'),
      o('वायव्य (NW)', 'North-west (NW)', 3, 'NW'),
      o('ईशान (NE)', 'North-east (NE)', 1, 'NE'),
      o('उत्तर', 'North', 2, 'N'),
    ],
    tip: {
      hi: 'तिजोरी को नैऋत्य कक्ष में दक्षिण दीवार से सटाकर रखें ताकि वह उत्तर की ओर (कुबेर दिशा) खुले।',
      en: 'Place the safe in the SW room against the south wall so that it opens towards the north (Kuber’s direction).',
    },
  },
  {
    id: 19, chart: 'pair', section: 'elements', icon: 'MoveVertical',
    q: { hi: 'घर का सबसे ऊँचा और सबसे नीचा भाग कहाँ है?', en: 'Where are the highest and lowest parts of the house?' },
    options: [
      o('ऊँचा-नैऋत्य, नीचा-ईशान', 'High SW, low NE', 5, 'SW>NE'),
      o('ऊँचा-दक्षिण, नीचा-उत्तर', 'High south, low north', 4, 'S>N'),
      o('ऊँचा-पश्चिम, नीचा-पूर्व', 'High west, low east', 4, 'W>E'),
      o('ऊँचा-ईशान, नीचा-नैऋत्य', 'High NE, low SW', 1, 'NE>SW'),
      o('ऊँचा-आग्नेय, नीचा-वायव्य', 'High SE, low NW', 2, 'SE>NW'),
      o('सभी समान', 'All level', 3),
    ],
    tip: {
      hi: 'नैऋत्य में चबूतरा या ऊँची मुंडेर बनवाकर उसे ऊँचा करें, और ईशान की ओर फ़र्श का ढलान दें।',
      en: 'Raise the SW with a platform or a higher parapet, and slope the floor towards the NE.',
    },
  },
  {
    id: 20, chart: 'c8', section: 'elements', icon: 'CloudRain',
    q: { hi: 'छत का पानी किस दिशा में निकलता है?', en: 'Which way does rainwater drain off the roof?' },
    options: [
      o('ईशान की ओर', 'Towards the north-east', 5, 'NE'),
      o('उत्तर की ओर', 'Towards the north', 5, 'N'),
      o('पूर्व की ओर', 'Towards the east', 4, 'E'),
      o('वायव्य की ओर', 'Towards the north-west', 3, 'NW'),
      o('दक्षिण की ओर', 'Towards the south', 2, 'S'),
      o('पश्चिम की ओर', 'Towards the west', 2, 'W'),
      o('नैऋत्य की ओर', 'Towards the south-west', 1, 'SW'),
    ],
    tip: {
      hi: 'छत का ढलान ठीक कराकर जल-निकासी पाइप उत्तर या ईशान की ओर मोड़ें।',
      en: 'Correct the roof slope and reroute the drain pipes towards the north or north-east.',
    },
  },
  {
    id: 21, chart: 'c8', section: 'surround', icon: 'AppWindow',
    q: { hi: 'सबसे अधिक खिड़कियाँ किस दिशा में हैं?', en: 'Which side has the most windows?' },
    options: [
      o('उत्तर', 'North', 5, 'N'),
      o('पूर्व', 'East', 5, 'E'),
      o('ईशान', 'North-east', 5, 'NE'),
      o('दक्षिण', 'South', 3, 'S'),
      o('पश्चिम', 'West', 3, 'W'),
      o('सभी बराबर', 'Evenly spread', 4, 'N E S W'),
      o('बहुत कम / नहीं', 'Very few / none', 2),
    ],
    tip: {
      hi: 'उत्तर-पूर्व की ओर रोशनदान या खिड़की बढ़ाएँ ताकि प्रातःकालीन सूर्य प्रकाश भीतर आए; दक्षिण-पश्चिम की खिड़कियों पर भारी पर्दे लगाएँ।',
      en: 'Add ventilators or windows on the north-east to let in morning sunlight; use heavy curtains on south-west windows.',
    },
  },
  {
    id: 22, chart: 'door', section: 'surround', icon: 'TriangleAlert',
    q: { hi: 'मुख्य द्वार के सामने कोई बाधा (वेध)?', en: 'Any obstruction (vedha) in front of the main door?' },
    options: [
      o('कोई बाधा नहीं', 'No obstruction', 5),
      o('पेड़ / पौधा', 'A tree / plant', 2),
      o('बिजली खंभा / ट्रांसफार्मर', 'Electric pole / transformer', 1),
      o('दूसरे घर की दीवार / कोना', "Another building's wall / corner", 2),
      o('मंदिर', 'A temple', 3),
      o('गड्ढा / नाला', 'A pit / drain', 1),
      o('अंदर खंभा / सीढ़ी', 'A pillar / stairs just inside', 2),
    ],
    tip: {
      hi: 'द्वार-वेध के निवारण हेतु द्वार के ऊपर बाहर की ओर पाकुआ दर्पण या गणेश प्रतिमा लगाएँ, और द्वार के दोनों ओर गमले रखें।',
      en: 'To counter a door obstruction, fix a Pa-kua mirror or Ganesh idol facing outwards above the door, and place planters on both sides.',
    },
  },
  {
    id: 23, chart: 'c8', section: 'surround', icon: 'Route',
    q: { hi: 'घर के आसपास सड़कें किस ओर हैं?', en: 'Which sides of the plot have roads?' },
    options: [
      o('केवल पूर्व में', 'East only', 4, 'E'),
      o('केवल उत्तर में', 'North only', 4, 'N'),
      o('केवल दक्षिण में', 'South only', 3, 'S'),
      o('केवल पश्चिम में', 'West only', 3, 'W'),
      o('पूर्व और उत्तर में', 'East and north', 5, 'E N'),
      o('दो दिशाओं में (L-shape)', 'Two sides (L-shaped)', 4),
      o('तीन दिशाओं में', 'Three sides', 4),
      o('चारों दिशाओं में', 'All four sides', 5, 'N E S W'),
    ],
    tip: {
      hi: 'मार्ग-प्रहार (T-junction) हो तो द्वार के सामने ऊँची दीवार या झाड़ीदार पौधों की बाड़ लगाएँ।',
      en: 'If a road hits the plot head-on (T-junction), build a tall wall or hedge in front of the entrance.',
    },
  },
  {
    id: 24, chart: 'plain', section: 'experience', icon: 'HeartPulse',
    q: { hi: 'इस घर में रहने के बाद प्रमुख समस्या?', en: 'The main problem since living in this house?' },
    hint: { hi: 'यह उत्तर वास्तु दोषों का संकेत देता है', en: 'This answer hints at underlying Vastu defects' },
    options: [
      o('स्वास्थ्य समस्या', 'Health problems', 1),
      o('धन हानि / कर्ज', 'Financial loss / debt', 1),
      o('नौकरी / व्यापार रुकावट', 'Job / business obstacles', 2),
      o('पारिवारिक विवाद', 'Family disputes', 2),
      o('बच्चों की समस्या', "Children's problems", 2),
      o('मानसिक तनाव / नींद', 'Mental stress / sleep', 2),
      o('कानूनी विवाद', 'Legal disputes', 1),
      o('कोई समस्या नहीं', 'No problems', 5),
    ],
    tip: {
      hi: 'समस्या का संबंध प्रायः किसी विशेष दिशा से होता है (स्वास्थ्य–ईशान/ब्रह्मस्थान, धन–उत्तर/नैऋत्य, विवाद–आग्नेय/नैऋत्य)। ऊपर बताए दोषों को प्राथमिकता से सुधारें और विशेषज्ञ से घर का नक्शा दिखवाएँ।',
      en: 'Problems usually tie to a zone (health – NE/Brahmasthan, money – north/SW, disputes – SE/SW). Fix the defects above first and have an expert review your floor plan.',
    },
  },
  {
    id: 25, chart: 'plain', section: 'experience', icon: 'ScrollText', scored: false,
    q: { hi: 'घर के मुखिया का जन्म विवरण?', en: "Birth details of the head of the family?" },
    hint: { hi: 'इसमें अंक नहीं — यह कुंडली मिलान के लिए है', en: 'Not scored — used to match the house with the kundli' },
    options: [
      o('तिथि + समय + स्थान याद है', 'Know date, time and place', null),
      o('तिथि याद है, समय नहीं', 'Know the date, not the time', null),
      o('कुंडली बनी हुई है', 'Have a kundli already made', null),
      o('याद नहीं', "Don't remember", null),
      o('बताना नहीं चाहते', 'Prefer not to say', null),
    ],
  },
];

export const SCORED = QUESTIONS.filter((q) => q.scored !== false);

export const ZONES = [
  { key: 'NW', name: { en: 'North-west', hi: 'वायव्य' }, deity: { en: 'Vayu · Air', hi: 'वायु' } },
  { key: 'N', name: { en: 'North', hi: 'उत्तर' }, deity: { en: 'Kuber · Wealth', hi: 'कुबेर' } },
  { key: 'NE', name: { en: 'North-east', hi: 'ईशान' }, deity: { en: 'Shiva · Water', hi: 'ईश · जल' } },
  { key: 'W', name: { en: 'West', hi: 'पश्चिम' }, deity: { en: 'Varun', hi: 'वरुण' } },
  { key: 'C', name: { en: 'Centre', hi: 'ब्रह्मस्थान' }, deity: { en: 'Brahma · Space', hi: 'ब्रह्मा · आकाश' } },
  { key: 'E', name: { en: 'East', hi: 'पूर्व' }, deity: { en: 'Surya / Indra', hi: 'सूर्य / इंद्र' } },
  { key: 'SW', name: { en: 'South-west', hi: 'नैऋत्य' }, deity: { en: 'Nairiti · Earth', hi: 'नैऋति · पृथ्वी' } },
  { key: 'S', name: { en: 'South', hi: 'दक्षिण' }, deity: { en: 'Yama', hi: 'यम' } },
  { key: 'SE', name: { en: 'South-east', hi: 'आग्नेय' }, deity: { en: 'Agni · Fire', hi: 'अग्नि' } },
];

export const GRADES = [
  { min: 85, tone: 'great', label: { en: 'Excellent Vastu', hi: 'उत्तम वास्तु' }, text: { en: 'Your home is aligned with Vastu principles in nearly every way. Keep the north-east clean and open to preserve this.', hi: 'आपका घर लगभग हर दृष्टि से वास्तु के अनुरूप है। इसे बनाए रखने के लिए ईशान को स्वच्छ और खुला रखें।' } },
  { min: 70, tone: 'good', label: { en: 'Auspicious Vastu', hi: 'शुभ वास्तु' }, text: { en: 'A well-balanced home with a few small defects. The simple remedies below can make it even better.', hi: 'संतुलित घर, कुछ छोटे दोषों के साथ। नीचे दिए सरल उपाय इसे और बेहतर बना सकते हैं।' } },
  { min: 55, tone: 'mid', label: { en: 'Moderate Vastu', hi: 'मध्यम वास्तु' }, text: { en: 'Some important zones need attention. Start with the highlighted defects — most can be corrected without construction.', hi: 'कुछ महत्वपूर्ण दिशाओं पर ध्यान देने की आवश्यकता है। चिह्नित दोषों से आरंभ करें — अधिकांश बिना तोड़-फोड़ के सुधर सकते हैं।' } },
  { min: 40, tone: 'low', label: { en: 'Needs Correction', hi: 'सुधार आवश्यक' }, text: { en: 'Several defects are present. Apply the remedies below and consider an expert review of your floor plan.', hi: 'कई वास्तु दोष उपस्थित हैं। नीचे दिए उपाय अपनाएँ और विशेषज्ञ से घर का नक्शा दिखवाने पर विचार करें।' } },
  { min: 0, tone: 'bad', label: { en: 'Serious Vastu Defects', hi: 'गंभीर वास्तु दोष' }, text: { en: 'Major zones are disturbed. We strongly recommend a personal consultation with a Vastu expert.', hi: 'प्रमुख दिशाएँ प्रभावित हैं। वास्तु विशेषज्ञ से व्यक्तिगत परामर्श की प्रबल अनुशंसा है।' } },
];

export const gradeFor = (pct) => GRADES.find((g) => pct >= g.min);

/** answers: { [questionId]: optionIndex } */
export function scoreAnswers(answers) {
  const picked = SCORED.filter((q) => answers[q.id] != null).map((q) => ({ q, opt: q.options[answers[q.id]] }));
  const total = picked.reduce((s, p) => s + p.opt.stars, 0);
  const pct = picked.length ? Math.round((total / (picked.length * 5)) * 100) : 0;
  const bySection = SECTIONS.map((s) => {
    const items = picked.filter((p) => p.q.section === s.key);
    const sum = items.reduce((a, p) => a + p.opt.stars, 0);
    return { ...s, count: items.length, pct: items.length ? Math.round((sum / (items.length * 5)) * 100) : null };
  }).filter((s) => s.count);
  const distribution = [5, 4, 3, 2, 1].map((n) => ({ stars: n, count: picked.filter((p) => p.opt.stars === n).length }));
  return {
    pct,
    total,
    max: picked.length * 5,
    grade: gradeFor(pct),
    bySection,
    distribution,
    defects: picked.filter((p) => p.opt.stars <= 2).sort((a, b) => a.opt.stars - b.opt.stars),
    strengths: picked.filter((p) => p.opt.stars === 5),
  };
}

// The 16 compass directions, clockwise from north, plus the centre (Brahmasthan).
export const COMPASS = [
  { key: 'N', name: { en: 'North', hi: 'उत्तर' } },
  { key: 'NNE', name: { en: 'North-north-east', hi: 'उत्तर-ईशान' } },
  { key: 'NE', name: { en: 'North-east', hi: 'ईशान' } },
  { key: 'ENE', name: { en: 'East-north-east', hi: 'पूर्व-ईशान' } },
  { key: 'E', name: { en: 'East', hi: 'पूर्व' } },
  { key: 'ESE', name: { en: 'East-south-east', hi: 'पूर्व-आग्नेय' } },
  { key: 'SE', name: { en: 'South-east', hi: 'आग्नेय' } },
  { key: 'SSE', name: { en: 'South-south-east', hi: 'दक्षिण-आग्नेय' } },
  { key: 'S', name: { en: 'South', hi: 'दक्षिण' } },
  { key: 'SSW', name: { en: 'South-south-west', hi: 'दक्षिण-नैऋत्य' } },
  { key: 'SW', name: { en: 'South-west', hi: 'नैऋत्य' } },
  { key: 'WSW', name: { en: 'West-south-west', hi: 'पश्चिम-नैऋत्य' } },
  { key: 'W', name: { en: 'West', hi: 'पश्चिम' } },
  { key: 'WNW', name: { en: 'West-north-west', hi: 'पश्चिम-वायव्य' } },
  { key: 'NW', name: { en: 'North-west', hi: 'वायव्य' } },
  { key: 'NNW', name: { en: 'North-north-west', hi: 'उत्तर-वायव्य' } },
];
export const CENTRE = { key: 'C', name: { en: 'Centre (Brahmasthan)', hi: 'ब्रह्मस्थान (मध्य)' } };
