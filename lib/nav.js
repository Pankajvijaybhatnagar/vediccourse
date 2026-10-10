// Site navigation. Labels are bilingual { en, hi }.
export const NAV = [
  { href: '/', label: { en: 'Home', hi: 'होम' } },
  {
    label: { en: 'Consult Now', hi: 'परामर्श लें' },
    children: [
      { href: '/astrologers', label: { en: 'Chat with Astrologer', hi: 'ज्योतिषी से चैट करें' } },
      { href: '/astrologers', label: { en: 'Talk to Astrologer', hi: 'ज्योतिषी से बात करें' } },
      { href: '/contact', label: { en: 'Book a Reading', hi: 'परामर्श बुक करें' } },
    ],
  },
  { href: '/horoscope', label: { en: 'Horoscope', hi: 'राशिफल' } },
  {
    label: { en: 'Year 2026', hi: 'वर्ष 2026' },
    children: [
      { href: '/horoscope?period=monthly', label: { en: 'Rashifal 2026', hi: 'राशिफल 2026' } },
      { href: '/compatibility', label: { en: 'Love Horoscope 2026', hi: 'प्रेम राशिफल 2026' } },
      { href: '/numerology', label: { en: 'Numerology 2026', hi: 'अंक ज्योतिष 2026' } },
    ],
  },
  {
    label: { en: 'Panchang', hi: 'पंचांग' },
    children: [
      { href: '/panchang', label: { en: "Today's Panchang", hi: 'आज का पंचांग' } },
      { href: '/panchang#choghadiya', label: { en: 'Choghadiya', hi: 'चौघड़िया' } },
      { href: '/panchang#muhurat', label: { en: 'Rahu Kaal & Muhurat', hi: 'राहु काल और मुहूर्त' } },
    ],
  },
  {
    label: { en: 'Kundli', hi: 'कुंडली' },
    children: [
      { href: '/birth-chart', label: { en: 'Free Kundli', hi: 'मुफ़्त कुंडली' } },
      { href: '/kundli-milan', label: { en: 'Kundli Milan (Guna Milan)', hi: 'कुंडली मिलान (गुण मिलान)' } },
      { href: '/zodiac', label: { en: 'Zodiac Signs', hi: 'राशियाँ' } },
    ],
  },
  {
    label: { en: 'Karmkand', hi: 'कर्मकांड' },
    children: [
      { href: '/karmkand', label: { en: 'What is Karmkand', hi: 'कर्मकांड परिचय' } },
      { href: '/karmkand/pooja-paddhati', label: { en: 'Pooja Paddhati (Rituals)', hi: 'पूजा पद्धति' } },
      { href: '/karmkand/pooja-samagri', label: { en: 'Pooja Samagri (Items)', hi: 'पूजा सामग्री' } },
      { href: '/karmkand/pooja-paddhati/dainik-pooja', label: { en: 'Daily Pooja Vidhi', hi: 'दैनिक पूजा विधि' } },
      { href: '/karmkand/pooja-paddhati/havan-vidhi', label: { en: 'Havan Vidhi', hi: 'हवन विधि' } },
    ],
  },
  { href: '/jyotish-seekhen', label: { en: 'Learn Astrology', hi: 'ज्योतिष सीखें' }, badge: { en: 'Free', hi: 'मुफ़्त' } },
  {
    label: { en: 'Free Readings', hi: 'मुफ़्त रीडिंग' },
    children: [
      { href: '/birth-chart', label: { en: 'Birth Chart', hi: 'जन्म कुंडली' } },
      { href: '/kundli-milan', label: { en: 'Kundli Milan', hi: 'कुंडली मिलान' } },
      { href: '/compatibility', label: { en: 'Love Compatibility', hi: 'प्रेम अनुकूलता' } },
      { href: '/tarot', label: { en: 'Tarot Reading', hi: 'टैरो रीडिंग' } },
      { href: '/numerology', label: { en: 'Numerology', hi: 'अंक ज्योतिष' } },
      { href: '/vastu', label: { en: 'Vastu Check', hi: 'वास्तु जाँच' } },
      { href: '/zodiac', label: { en: 'Zodiac Signs', hi: 'राशियाँ' } },
    ],
  },
  { href: '/#live', label: { en: 'Live', hi: 'लाइव' }, badge: { en: 'Watch', hi: 'देखें' }, badgeTone: 'red' },
  {
    label: { en: 'Manobal', hi: 'मनोबल' },
    badge: { en: 'New', hi: 'नया' },
    badgeTone: 'teal',
    children: [
      { href: '/manobal', label: { en: 'Mind & Career Guidance', hi: 'मन एवं करियर मार्गदर्शन' } },
      { href: '/manobal/man-ko-samjhen', label: { en: 'Start the 12 chapters', hi: '12 अध्याय आरंभ करें' } },
      { href: '/manobal/career-compass', label: { en: 'Career Compass', hi: 'करियर कम्पास' } },
      { href: '/manobal/self-check', label: { en: 'Anxiety & Mood Self-Check', hi: 'चिंता एवं मनोदशा स्व-जाँच' } },
      { href: '/manobal/pariksha-ka-tanav', label: { en: 'Exam Stress Help', hi: 'परीक्षा तनाव सहायता' } },
    ],
  },
  {
    label: { en: 'Pandit Sangh', hi: 'पंडित संघ' },
    badge: { en: 'New', hi: 'नया' },
    badgeTone: 'teal',
    children: [
      { href: '/pandit-sangh', label: { en: 'About Pandit Sangh', hi: 'पंडित संघ परिचय' } },
      { href: '/pandit-sangh/dashboard', label: { en: 'My Workspace', hi: 'मेरा कार्यक्षेत्र' } },
      { href: '/pandit-sangh/yajman', label: { en: 'Yajman Register', hi: 'यजमान बही' } },
      { href: '/pandit-sangh/network', label: { en: 'Pandit Network', hi: 'पंडित नेटवर्क' } },
      { href: '/pandit-sangh/kaam', label: { en: 'Work Board', hi: 'कार्य बोर्ड' } },
    ],
  },
  {
    label: { en: 'Calculators', hi: 'कैलकुलेटर' },
    badge: { en: 'New', hi: 'नया' },
    children: [
      { href: '/numerology', label: { en: 'Life Path Number', hi: 'मूलांक / भाग्यांक' } },
      { href: '/compatibility', label: { en: 'Love Calculator', hi: 'लव कैलकुलेटर' } },
      { href: '/birth-chart', label: { en: 'Moon Sign Calculator', hi: 'चंद्र राशि कैलकुलेटर' } },
      { href: '/panchang', label: { en: 'Nakshatra Finder', hi: 'नक्षत्र खोजें' } },
      { href: '/vastu', label: { en: 'Home Vastu Score', hi: 'गृह वास्तु अंक' } },
    ],
  },
];

// Flat list used by the footer.
export const NAV_LINKS = [
  { href: '/horoscope', label: { en: 'Horoscope', hi: 'राशिफल' } },
  { href: '/panchang', label: { en: 'Panchang', hi: 'पंचांग' } },
  { href: '/birth-chart', label: { en: 'Free Kundli', hi: 'मुफ़्त कुंडली' } },
  { href: '/kundli-milan', label: { en: 'Kundli Milan', hi: 'कुंडली मिलान' } },
  { href: '/zodiac', label: { en: 'Zodiac Signs', hi: 'राशियाँ' } },
  { href: '/tarot', label: { en: 'Tarot Reading', hi: 'टैरो रीडिंग' } },
  { href: '/numerology', label: { en: 'Numerology', hi: 'अंक ज्योतिष' } },
  { href: '/vastu', label: { en: 'Vastu Check', hi: 'वास्तु जाँच' } },
  { href: '/karmkand/pooja-paddhati', label: { en: 'Pooja Vidhi', hi: 'पूजा विधि' } },
  { href: '/karmkand/pooja-samagri', label: { en: 'Pooja Samagri', hi: 'पूजा सामग्री' } },
  { href: '/jyotish-seekhen', label: { en: 'Learn Astrology', hi: 'ज्योतिष सीखें' } },
  { href: '/manobal', label: { en: 'Manobal — Mind & Career', hi: 'मनोबल — मन एवं करियर' } },
  { href: '/manobal/career-compass', label: { en: 'Career Compass', hi: 'करियर कम्पास' } },
  { href: '/pandit-sangh', label: { en: 'Pandit Sangh — for pandits', hi: 'पंडित संघ — पंडितों के लिए' } },
];
