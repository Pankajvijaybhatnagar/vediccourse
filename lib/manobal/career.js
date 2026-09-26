// Career compass: an interest profile (Holland RIASEC) combined with Vedic 10th-house indicators.
const p = (en, hi) => ({ en, hi });

export const RIASEC = {
  R: { name: p('Realistic — the Doer', 'व्यावहारिक — कर्मठ'), icon: '🛠️', desc: p('You enjoy working with your hands, tools, machines, nature and the physical world.', 'आपको हाथों से, उपकरणों, मशीनों, प्रकृति और भौतिक कार्यों में आनंद आता है।'), careers: p(['Engineering', 'Architecture', 'Agriculture & food tech', 'Defence & police', 'Sports & fitness', 'Aviation', 'Electrician / mechanic trades'], ['अभियांत्रिकी (इंजीनियरिंग)', 'वास्तुकला', 'कृषि एवं खाद्य प्रौद्योगिकी', 'रक्षा एवं पुलिस सेवा', 'खेल एवं फ़िटनेस', 'विमानन', 'तकनीकी व्यवसाय']) },
  I: { name: p('Investigative — the Thinker', 'अन्वेषक — चिंतक'), icon: '🔬', desc: p('You love ideas, questions, research, data and solving puzzles.', 'आपको विचार, प्रश्न, शोध, आँकड़े और पहेलियाँ सुलझाना प्रिय है।'), careers: p(['Medicine & pharmacy', 'Scientific research', 'Data science & AI', 'Software development', 'Psychology', 'Economics', 'Astronomy & Jyotish research'], ['चिकित्सा एवं औषधि विज्ञान', 'वैज्ञानिक शोध', 'डेटा विज्ञान एवं कृत्रिम बुद्धि', 'सॉफ़्टवेयर विकास', 'मनोविज्ञान', 'अर्थशास्त्र', 'खगोल एवं ज्योतिष शोध']) },
  A: { name: p('Artistic — the Creator', 'कलात्मक — सृजनकर्ता'), icon: '🎨', desc: p('You express yourself through art, words, music, design and imagination.', 'आप कला, शब्द, संगीत, डिज़ाइन और कल्पना से स्वयं को अभिव्यक्त करते हैं।'), careers: p(['Design (graphic, fashion, interior)', 'Writing & journalism', 'Music & performing arts', 'Film & animation', 'Photography', 'Advertising & content creation'], ['डिज़ाइन (ग्राफ़िक, फ़ैशन, इंटीरियर)', 'लेखन एवं पत्रकारिता', 'संगीत एवं प्रदर्शन कला', 'फ़िल्म एवं एनिमेशन', 'छायांकन', 'विज्ञापन एवं सामग्री निर्माण']) },
  S: { name: p('Social — the Helper', 'सामाजिक — सहायक'), icon: '🤝', desc: p('You feel fulfilled teaching, healing, guiding and caring for people.', 'आपको पढ़ाने, उपचार करने, मार्गदर्शन और लोगों की सेवा में संतोष मिलता है।'), careers: p(['Teaching & education', 'Counselling & psychology', 'Nursing & healthcare', 'Social work & NGOs', 'Human resources', 'Yoga & wellness coaching'], ['शिक्षण', 'परामर्श एवं मनोविज्ञान', 'नर्सिंग एवं स्वास्थ्य सेवा', 'समाज सेवा एवं स्वयंसेवी संस्थाएँ', 'मानव संसाधन', 'योग एवं स्वास्थ्य प्रशिक्षण']) },
  E: { name: p('Enterprising — the Leader', 'उद्यमी — नेतृत्वकर्ता'), icon: '🚀', desc: p('You like to lead, persuade, take risks, sell ideas and build things.', 'आपको नेतृत्व करना, प्रभावित करना, जोखिम लेना और कुछ नया खड़ा करना पसंद है।'), careers: p(['Entrepreneurship & business', 'Management (MBA)', 'Law & advocacy', 'Civil services & politics', 'Sales & marketing', 'Event & hospitality management'], ['उद्यमिता एवं व्यापार', 'प्रबंधन (MBA)', 'विधि एवं वकालत', 'प्रशासनिक सेवाएँ एवं राजनीति', 'विक्रय एवं विपणन', 'आयोजन एवं आतिथ्य प्रबंधन']) },
  C: { name: p('Conventional — the Organiser', 'व्यवस्थित — संयोजक'), icon: '📊', desc: p('You enjoy order, accuracy, numbers, planning and clear systems.', 'आपको व्यवस्था, शुद्धता, अंक, योजना और स्पष्ट नियम प्रिय हैं।'), careers: p(['Chartered accountancy & finance', 'Banking', 'Government exams (SSC, banking)', 'Actuarial science', 'Company secretary', 'Logistics & operations'], ['चार्टर्ड अकाउंटेंसी एवं वित्त', 'बैंकिंग', 'सरकारी परीक्षाएँ (SSC, बैंक)', 'बीमांकिक विज्ञान', 'कंपनी सचिव', 'लॉजिस्टिक्स एवं संचालन']) },
};

export const QUESTIONS = [
  { type: 'R', text: p('I enjoy fixing or building things with my hands.', 'मुझे हाथों से चीज़ें बनाना या ठीक करना अच्छा लगता है।') },
  { type: 'R', text: p('I prefer being outdoors or active over sitting at a desk.', 'मुझे मेज़ पर बैठने से अधिक बाहर या सक्रिय रहना पसंद है।') },
  { type: 'R', text: p('I like understanding how machines or gadgets work.', 'मुझे यह समझना अच्छा लगता है कि मशीनें कैसे काम करती हैं।') },
  { type: 'I', text: p('I enjoy solving maths, science or logic puzzles.', 'मुझे गणित, विज्ञान या तर्क की पहेलियाँ सुलझाना पसंद है।') },
  { type: 'I', text: p('I often ask "why?" and like to research answers.', 'मैं अक्सर "क्यों?" पूछता/पूछती हूँ और उत्तर खोजना पसंद करता/करती हूँ।') },
  { type: 'I', text: p('I can spend hours learning a topic deeply.', 'मैं किसी विषय को गहराई से समझने में घंटों लगा सकता/सकती हूँ।') },
  { type: 'A', text: p('I love drawing, writing, music or acting.', 'मुझे चित्रकारी, लेखन, संगीत या अभिनय बहुत पसंद है।') },
  { type: 'A', text: p('I like to do things in my own original way.', 'मुझे काम अपने मौलिक ढंग से करना पसंद है।') },
  { type: 'A', text: p('I notice colours, design and beauty around me.', 'मैं अपने आसपास के रंग, डिज़ाइन और सौंदर्य पर ध्यान देता/देती हूँ।') },
  { type: 'S', text: p('Friends come to me when they need to talk.', 'मित्र मन की बात कहने के लिए मेरे पास आते हैं।') },
  { type: 'S', text: p('I enjoy teaching or explaining things to others.', 'मुझे दूसरों को पढ़ाना या समझाना अच्छा लगता है।') },
  { type: 'S', text: p('Helping people makes me feel truly happy.', 'लोगों की सहायता करके मुझे सच्ची प्रसन्नता मिलती है।') },
  { type: 'E', text: p('I like taking charge and leading a group.', 'मुझे ज़िम्मेदारी लेना और समूह का नेतृत्व करना पसंद है।') },
  { type: 'E', text: p('I can convince people and enjoy debates.', 'मैं लोगों को मना लेता/लेती हूँ और वाद-विवाद में आनंद आता है।') },
  { type: 'E', text: p('I dream of starting my own business someday.', 'मैं एक दिन अपना व्यवसाय आरंभ करने का सपना देखता/देखती हूँ।') },
  { type: 'C', text: p('I like keeping things neat, planned and organised.', 'मुझे चीज़ें साफ़-सुथरी, योजनाबद्ध और व्यवस्थित रखना पसंद है।') },
  { type: 'C', text: p('I am comfortable working with numbers and details.', 'मुझे अंकों और बारीकियों के साथ काम करने में सहजता है।') },
  { type: 'C', text: p('I prefer clear rules and step-by-step instructions.', 'मुझे स्पष्ट नियम और क्रमबद्ध निर्देश पसंद हैं।') },
];

export const SCALE = [
  { v: 0, label: p('Not me', 'बिल्कुल नहीं') },
  { v: 1, label: p('A little', 'थोड़ा') },
  { v: 2, label: p('Mostly', 'अधिकतर') },
  { v: 3, label: p('Very much me', 'बिल्कुल सही') },
];

// Parashari career significations of the grahas.
export const GRAHA_CAREERS = {
  sun: { fields: p('Government, administration, politics, leadership, medicine', 'सरकारी सेवा, प्रशासन, राजनीति, नेतृत्व, चिकित्सा'), riasec: ['E', 'I'] },
  moon: { fields: p('Hospitality, nursing, food, dairy, public relations, psychology', 'आतिथ्य, नर्सिंग, खाद्य, डेयरी, जनसंपर्क, मनोविज्ञान'), riasec: ['S', 'A'] },
  mars: { fields: p('Defence, police, engineering, surgery, sports, real estate', 'रक्षा, पुलिस, अभियांत्रिकी, शल्य चिकित्सा, खेल, भूमि-भवन'), riasec: ['R', 'E'] },
  mercury: { fields: p('Commerce, accounts, IT, writing, media, communication, trade', 'वाणिज्य, लेखा, सूचना प्रौद्योगिकी, लेखन, मीडिया, संचार, व्यापार'), riasec: ['C', 'I'] },
  jupiter: { fields: p('Teaching, law, finance, banking, counselling, spiritual guidance', 'शिक्षण, विधि, वित्त, बैंकिंग, परामर्श, आध्यात्मिक मार्गदर्शन'), riasec: ['S', 'C'] },
  venus: { fields: p('Arts, design, fashion, film, music, beauty, luxury, hospitality', 'कला, डिज़ाइन, फ़ैशन, फ़िल्म, संगीत, सौंदर्य, विलासिता, आतिथ्य'), riasec: ['A', 'E'] },
  saturn: { fields: p('Research, judiciary, mining, labour-intensive industry, long-term public service', 'शोध, न्यायपालिका, खनन, श्रम-प्रधान उद्योग, दीर्घकालीन जनसेवा'), riasec: ['C', 'R'] },
  rahu: { fields: p('Technology, foreign lands, aviation, research, unconventional and new-age fields', 'प्रौद्योगिकी, विदेश, विमानन, शोध, नवीन और अपरंपरागत क्षेत्र'), riasec: ['I', 'E'] },
  ketu: { fields: p('Coding, research, spirituality, alternative healing, deep technical skills', 'कोडिंग, शोध, अध्यात्म, वैकल्पिक चिकित्सा, गहन तकनीकी कौशल'), riasec: ['I', 'R'] },
};

// Rulers of the twelve signs, Aries → Pisces.
export const SIGN_LORD = ['mars', 'venus', 'mercury', 'moon', 'sun', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'saturn', 'jupiter'];

// What the 10th lord's house placement suggests.
export const LORD_IN_HOUSE = {
  1: p('Self-made career; your personality is your brand.', 'स्वनिर्मित करियर; आपका व्यक्तित्व ही आपकी पहचान है।'),
  2: p('Career linked to finance, family business, speech or food.', 'वित्त, पारिवारिक व्यवसाय, वाणी या भोजन से जुड़ा करियर।'),
  3: p('Communication, media, writing, travel, own initiative.', 'संचार, मीडिया, लेखन, यात्रा और स्वयं के प्रयास।'),
  4: p('Real estate, education, vehicles, working from a home base.', 'भूमि-भवन, शिक्षा, वाहन, घर से जुड़ा कार्य।'),
  5: p('Creativity, teaching, advisory roles, speculation and intellect.', 'रचनात्मकता, शिक्षण, सलाहकार भूमिका और बौद्धिक कार्य।'),
  6: p('Service, healthcare, law, competitive exams, problem-solving.', 'सेवा, स्वास्थ्य, विधि, प्रतियोगी परीक्षाएँ, समस्या समाधान।'),
  7: p('Partnerships, business, client-facing and public dealing.', 'साझेदारी, व्यापार, ग्राहक एवं जनसंपर्क से जुड़े कार्य।'),
  8: p('Research, investigation, insurance, occult sciences, sudden changes.', 'शोध, अन्वेषण, बीमा, गूढ़ विद्या, अचानक परिवर्तन।'),
  9: p('Higher education, law, teaching, dharma, foreign connections.', 'उच्च शिक्षा, विधि, शिक्षण, धर्म, विदेश संबंध।'),
  10: p('Strong career focus; authority and recognition in your field.', 'करियर पर प्रबल ध्यान; अपने क्षेत्र में अधिकार और प्रतिष्ठा।'),
  11: p('Networks, large organisations, steady gains and ambitions fulfilled.', 'संपर्क, बड़े संस्थान, निरंतर लाभ और इच्छापूर्ति।'),
  12: p('Foreign lands, MNCs, hospitals, spiritual or behind-the-scenes work.', 'विदेश, बहुराष्ट्रीय कंपनियाँ, चिकित्सालय, आध्यात्मिक या पर्दे के पीछे का कार्य।'),
};
