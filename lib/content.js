const p = (en, hi) => ({ en, hi });

export const HERO_SLIDES = [
  {
    id: 'love',
    title: p('Enjoy your relationship', 'अपने रिश्ते का आनंद लें'),
    sub: p("don't stress over it", 'चिंता छोड़ें, सितारों से पूछें'),
    cta: p('Consult for FREE', 'मुफ़्त परामर्श लें'),
    href: '/astrologers',
    tone: 'saffron',
    art: 'love',
  },
  {
    id: 'kundli',
    title: p('Your Kundli, decoded', 'आपकी कुंडली, सरल भाषा में'),
    sub: p('Free Janam Kundli in 30 seconds', '30 सेकंड में मुफ़्त जन्म कुंडली'),
    cta: p('Generate Free Kundli', 'मुफ़्त कुंडली बनाएँ'),
    href: '/birth-chart',
    tone: 'night',
    art: 'wheel',
  },
  {
    id: 'panchang',
    title: p('Every day, an auspicious start', 'हर दिन, एक शुभ शुरुआत'),
    sub: p('Tithi, Nakshatra, Rahu Kaal & Muhurat', 'तिथि, नक्षत्र, राहु काल और शुभ मुहूर्त'),
    cta: p("See Today's Panchang", 'आज का पंचांग देखें'),
    href: '/panchang',
    tone: 'sunrise',
    art: 'diya',
  },
];

export const QUICK_ACTIONS = [
  { key: 'talk', icon: 'PhoneCall', label: p('Talk to Astrologer', 'ज्योतिषी से बात'), href: '/astrologers' },
  { key: 'love', icon: 'Heart', label: p('Love', 'प्रेम'), href: '/compatibility' },
  { key: 'horoscope', icon: 'Sun', label: p('Horoscope', 'राशिफल'), href: '/horoscope' },
  { key: 'kundli', icon: 'Grid3x3', label: p('Kundli', 'कुंडली'), href: '/birth-chart' },
];

export const APPOINTMENTS = [
  { icon: 'Hand', label: p('Reiki Healer', 'रेकी हीलर'), href: '/contact' },
  { icon: 'Star', label: p('Popular Astrologers', 'लोकप्रिय ज्योतिषी'), href: '/astrologers' },
  { icon: 'Layers', label: p('Learn Tarot', 'टैरो सीखें'), href: '/tarot' },
  { icon: 'om', label: p('Rudra Abhishek Pooja', 'रुद्राभिषेक पूजा'), href: '/karmkand/pooja-paddhati/rudrabhishek' },
  { icon: 'Eye', label: p('Palm Reader', 'हस्तरेखा विशेषज्ञ'), href: '/contact' },
];

// Free readings grid — each tile gets a painted gradient "scene" in CSS.
export const READINGS = [
  { key: 'match', icon: 'Gem', label: p('Match Making', 'कुंडली मिलान'), href: '/kundli-milan' },
  { key: 'kundli', icon: 'Grid3x3', label: p('Kundli', 'कुंडली'), href: '/birth-chart' },
  { key: 'transit', icon: 'Orbit', label: p('Planet Transits', 'ग्रह गोचर'), href: '/horoscope?period=monthly' },
  { key: 'remedies', icon: 'Flame', label: p('Havan & Remedies', 'हवन एवं उपाय'), href: '/karmkand/pooja-paddhati/havan-vidhi' },
  { key: 'love', icon: 'Heart', label: p('Love', 'प्रेम'), href: '/compatibility' },
  { key: 'panchang', icon: 'CalendarDays', label: p('Panchang', 'पंचांग'), href: '/panchang' },
  { key: 'tarot', icon: 'Layers', label: p('Tarot Reading', 'टैरो रीडिंग'), href: '/tarot' },
  { key: 'numerology', icon: 'Hash', label: p('Numerology', 'अंक ज्योतिष'), href: '/numerology' },
  { key: 'vastu', icon: 'House', label: p('Vastu', 'वास्तु'), href: '/contact' },
  { key: 'zodiac', icon: 'Sun', label: p('Zodiac Signs', 'राशियाँ'), href: '/zodiac' },
  { key: 'festivals', icon: 'Sparkles', label: p('Festivals', 'त्योहार'), href: '/karmkand/pooja-paddhati/lakshmi-poojan' },
  { key: 'spirituality', icon: 'Flower2', label: p('Pooja Vidhi', 'पूजा विधि'), href: '/karmkand' },
];

export const CONSULT_TOPICS = [
  { key: 'love', icon: 'Heart', label: p('Love & Relationship', 'प्रेम और संबंध') },
  { key: 'marriage', icon: 'Users', label: p('Marriage & Kundli', 'विवाह और कुंडली') },
  { key: 'career', icon: 'Briefcase', label: p('Career', 'करियर') },
  { key: 'woman', icon: 'Venus', label: p('Woman Astrologer', 'महिला ज्योतिषी') },
  { key: 'business', icon: 'BrainCircuit', label: p('Business', 'व्यापार') },
  { key: 'money', icon: 'IndianRupee', label: p('Money', 'धन') },
];

export const BLOGS = [
  {
    art: 'weekly',
    kicker: p('Weekly Horoscope', 'साप्ताहिक राशिफल'),
    title: p('Weekly Horoscope: Is there something important you are about to miss?', 'साप्ताहिक राशिफल: क्या आप कुछ महत्वपूर्ण चूकने वाले हैं?'),
    author: p('Tarot Meenakshi', 'टैरो मीनाक्षी'),
    daysAgo: 5,
    href: '/horoscope?period=weekly',
  },
  {
    art: 'palm',
    kicker: p('Palmistry', 'हस्तरेखा'),
    title: p('What does a mole on the right hand mean?', 'दाहिने हाथ पर तिल का क्या अर्थ है?'),
    author: p('Team VedicDhaam', 'टीम वैदिकधाम'),
    daysAgo: 4,
    href: '/contact',
  },
  {
    art: 'ganesh',
    kicker: p('Festivals', 'त्योहार'),
    title: p('Why should we not see the Moon on Ganesh Chaturthi?', 'गणेश चतुर्थी पर चंद्रमा क्यों नहीं देखना चाहिए?'),
    author: p('Team VedicDhaam', 'टीम वैदिकधाम'),
    daysAgo: 4,
    href: '/panchang',
  },
];

export const VIDEOS = [
  { tone: 'indigo', title: p('VedicDhaam: Your guide to love and success!', 'वैदिकधाम: प्रेम और सफलता का आपका मार्गदर्शक!'), duration: '2:14' },
  { tone: 'rose', title: p("Give your marriage problems 'The End' with the right guidance", 'सही मार्गदर्शन से अपनी वैवाहिक समस्याओं का अंत करें'), duration: '4:52' },
  { tone: 'saffron', title: p('Your life director is now yours | First chat free', 'अब आपका जीवन मार्गदर्शक आपके साथ | पहली चैट मुफ़्त'), duration: '3:08' },
];

export const NEWS = [
  { source: 'The Daily Star Times', tone: 'rose', title: p('How modern couples are embracing Kundli matching before weddings', 'कैसे आधुनिक जोड़े विवाह से पहले कुंडली मिलान अपना रहे हैं'), daysAgo: 24 },
  { source: 'Lifestyle Weekly', tone: 'plum', title: p('Gemstones and purpose: the rise of spiritual jewellery', 'रत्न और उद्देश्य: आध्यात्मिक आभूषणों का बढ़ता चलन'), daysAgo: 24 },
  { source: 'Startup Chronicle', tone: 'saffron', title: p('How VedicDhaam blends technology with ancient Vedic wisdom', 'कैसे वैदिकधाम तकनीक को प्राचीन वैदिक ज्ञान से जोड़ रहा है'), daysAgo: 134 },
];

export const STATS = [
  { value: p('5,000+', '5,000+'), label: p('Verified Astrologers', 'सत्यापित ज्योतिषी'), icon: 'Users' },
  { value: p('25+ Years', '25+ वर्ष'), label: p('Of Excellence', 'उत्कृष्टता के'), icon: 'Award' },
  { value: p('4 Crore+', '4 करोड़+'), label: p('Happy Customers', 'संतुष्ट ग्राहक'), icon: 'Heart' },
  { value: p('85+', '85+'), label: p('Countries', 'देशों में'), icon: 'Globe' },
];

export const TESTIMONIALS = [
  { name: 'Shalini K.', city: p('Delhi', 'दिल्ली'), text: p('The best astrologer I have spoken to. She not only showed me the path but also explained why that path was chosen for me. Thank you!', 'अब तक की सबसे अच्छी ज्योतिषी। उन्होंने न केवल रास्ता दिखाया बल्कि यह भी समझाया कि वह रास्ता मेरे लिए क्यों चुना गया। धन्यवाद!') },
  { name: 'Nikhil R.', city: p('Pune', 'पुणे'), text: p('A very thoughtful and patient person who listens carefully and gives prompt, valuable suggestions. I recommend everyone get their chart read here.', 'बहुत विचारशील और धैर्यवान व्यक्ति जो ध्यान से सुनते हैं और तुरंत मूल्यवान सुझाव देते हैं। मैं सबको यहाँ कुंडली दिखाने की सलाह दूँगा।') },
  { name: 'Deepa P.', city: p('Jaipur', 'जयपुर'), text: p('The session felt like a conversation about growing in life and becoming a better version of myself. Never felt so much at ease with anyone.', 'यह सत्र जीवन में आगे बढ़ने और बेहतर इंसान बनने की बातचीत जैसा लगा। किसी के साथ इतना सहज पहले कभी महसूस नहीं किया।') },
  { name: 'Arjun M.', city: p('Lucknow', 'लखनऊ'), text: p('Kundli matching for my wedding was explained so clearly. Both our families were satisfied and at peace.', 'मेरी शादी के लिए कुंडली मिलान इतनी स्पष्टता से समझाया गया। दोनों परिवार संतुष्ट और निश्चिंत थे।') },
  { name: 'Priya S.', city: p('Mumbai', 'मुंबई'), text: p('The Vastu tips for my new office were simple and practical. Business has genuinely picked up since.', 'मेरे नए ऑफिस के लिए वास्तु सुझाव सरल और व्यावहारिक थे। तब से व्यापार में सच में बढ़ोतरी हुई है।') },
  { name: 'Rahul T.', city: p('Indore', 'इंदौर'), text: p('I check the daily rashifal every morning. The Hindi option makes it perfect for my parents too.', 'मैं हर सुबह दैनिक राशिफल देखता हूँ। हिंदी विकल्प से मेरे माता-पिता के लिए भी यह बिल्कुल सही है।') },
];

export const FAQS = [
  { q: p('What is Astrology?', 'ज्योतिष क्या है?'), a: p('Astrology is the ancient study of how the positions and movements of the Sun, Moon, planets and stars relate to events and personality on Earth. Vedic astrology (Jyotish) is one of its oldest living traditions.', 'ज्योतिष सूर्य, चंद्रमा, ग्रहों और नक्षत्रों की स्थिति व गति का पृथ्वी पर घटनाओं और व्यक्तित्व से संबंध का प्राचीन अध्ययन है। वैदिक ज्योतिष इसकी सबसे पुरानी जीवित परंपराओं में से एक है।') },
  { q: p('How to calculate Zodiac or Astrology sign?', 'राशि की गणना कैसे करें?'), a: p('Your Sun sign comes from your date of birth. In Vedic astrology, your Rashi is usually your Moon sign, which needs your date, time and place of birth. Use our free Kundli tool to find both.', 'आपकी सूर्य राशि जन्म तिथि से निकलती है। वैदिक ज्योतिष में आपकी राशि सामान्यतः चंद्र राशि होती है, जिसके लिए जन्म तिथि, समय और स्थान चाहिए। दोनों जानने के लिए हमारी मुफ़्त कुंडली का उपयोग करें।') },
  { q: p('Are astrology predictions true?', 'क्या ज्योतिष भविष्यवाणियाँ सच होती हैं?'), a: p('Astrology offers guidance on tendencies and timing rather than fixed outcomes. Many people find it valuable for self-reflection and decision making. Your free will always matters.', 'ज्योतिष निश्चित परिणामों की बजाय प्रवृत्तियों और समय पर मार्गदर्शन देता है। बहुत से लोग इसे आत्मचिंतन और निर्णय लेने में उपयोगी पाते हैं। आपकी स्वतंत्र इच्छा हमेशा मायने रखती है।') },
  { q: p("What are the benefits of VedicDhaam's consultation services?", 'वैदिकधाम परामर्श सेवाओं के क्या लाभ हैं?'), a: p('You get verified astrologers, transparent per-minute pricing, complete privacy, consultations in Hindi and English, and your first consultation free.', 'आपको सत्यापित ज्योतिषी, पारदर्शी प्रति-मिनट शुल्क, पूर्ण गोपनीयता, हिंदी और अंग्रेज़ी में परामर्श और पहला परामर्श मुफ़्त मिलता है।') },
  { q: p('Is astrology real?', 'क्या ज्योतिष वास्तविक है?'), a: p('Astrology has been practised for thousands of years across cultures. It is best seen as a symbolic language for understanding life and not as a replacement for medical, legal or financial advice.', 'ज्योतिष हज़ारों वर्षों से विभिन्न संस्कृतियों में प्रचलित है। इसे जीवन को समझने की प्रतीकात्मक भाषा के रूप में देखना चाहिए, न कि चिकित्सा, कानूनी या वित्तीय सलाह के विकल्प के रूप में।') },
  { q: p('What is my astrological sign?', 'मेरी राशि क्या है?'), a: p('Enter your birth details on our free Kundli page to instantly see your Sun sign, Moon sign (Rashi) and Ascendant (Lagna).', 'अपनी सूर्य राशि, चंद्र राशि और लग्न तुरंत जानने के लिए हमारे मुफ़्त कुंडली पेज पर जन्म विवरण दर्ज करें।') },
  { q: p('How do I find astrology with my date of birth?', 'जन्म तिथि से ज्योतिष कैसे जानें?'), a: p('Your date of birth reveals your Sun sign and Life Path number. Add your time and place of birth for a complete Janam Kundli.', 'आपकी जन्म तिथि से सूर्य राशि और भाग्यांक पता चलता है। पूरी जन्म कुंडली के लिए जन्म समय और स्थान भी जोड़ें।') },
  { q: p('What is the meaning of astrology?', 'ज्योतिष का अर्थ क्या है?'), a: p("The word comes from Greek 'astron' (star) and 'logia' (study). In Sanskrit it is called Jyotish, meaning 'the science of light'.", "यह शब्द ग्रीक 'एस्ट्रॉन' (तारा) और 'लोगिया' (अध्ययन) से बना है। संस्कृत में इसे ज्योतिष कहते हैं, जिसका अर्थ है 'प्रकाश का विज्ञान'।") },
];
