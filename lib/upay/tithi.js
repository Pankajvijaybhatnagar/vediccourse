// Tithi upay. Each tithi has a presiding deity (tithi swami); the remedy is the same in both
// pakshas except where `shukla`/`krishna` adds a paksha-specific note. Index 1–14 by tithi
// number, plus `purnima` and `amavasya`.

const p = (en, hi) => ({ en, hi });

export const TITHI_UPAY = {
  1: {
    deity: p('Agni Dev', 'अग्नि देव'),
    nature: p('Nanda (joyful) — good for beginnings', 'नंदा तिथि — शुभ आरंभ के लिए उत्तम'),
    mantra: 'ॐ अग्नये नमः॥',
    upay: [
      p('Light a ghee lamp at dawn and offer a little ghee into a havan or the lamp flame.', 'प्रातः घी का दीपक जलाएँ और थोड़ा घी हवन या दीपक की लौ में अर्पित करें।'),
      p('Start any new resolution, study or savings plan today.', 'कोई नया संकल्प, अध्ययन या बचत योजना आज आरंभ करें।'),
    ],
    daan: p('Ghee, wheat or a lamp in a temple', 'घी, गेहूँ या मंदिर में दीपदान'),
    avoid: p('Kushmanda (petha / ash gourd) is traditionally not eaten today.', 'परंपरा अनुसार आज कूष्माण्ड (पेठा / कुम्हड़ा) नहीं खाया जाता।'),
    shukla: p('Shukla Pratipada begins the new lunar month — perfect for planning the month ahead.', 'शुक्ल प्रतिपदा से नया चंद्र मास आरंभ होता है — महीने की योजना बनाने के लिए उत्तम।'),
  },
  2: {
    deity: p('Brahma Ji', 'ब्रह्मा जी'),
    nature: p('Bhadra (gentle) — good for building and buying', 'भद्रा तिथि — निर्माण और खरीदारी के लिए अच्छी'),
    mantra: 'ॐ ब्रह्मणे नमः॥',
    upay: [
      p('Seek the blessings of a teacher or an elder and gift them something useful.', 'किसी गुरु या बुज़ुर्ग का आशीर्वाद लें और उन्हें कोई उपयोगी वस्तु भेंट करें।'),
      p('Begin construction, a new course or a creative work today.', 'आज निर्माण कार्य, नया पाठ्यक्रम या कोई रचनात्मक कार्य शुरू करें।'),
    ],
    daan: p('Books, stationery or white sweets', 'पुस्तकें, लेखन सामग्री या सफ़ेद मिठाई'),
    avoid: p('Brihati (small brinjal) is traditionally avoided today.', 'परंपरा अनुसार आज बृहती (छोटा बैंगन) नहीं खाया जाता।'),
    shukla: p('Shukla Dwitiya: sight the new crescent Moon in the evening and pray for prosperity.', 'शुक्ल द्वितीया: शाम को नए चंद्रमा का दर्शन कर समृद्धि की प्रार्थना करें।'),
  },
  3: {
    deity: p('Maa Gauri (Parvati)', 'माँ गौरी (पार्वती)'),
    nature: p('Jaya (victorious) — good for women’s vrats and marriage matters', 'जया तिथि — स्त्रियों के व्रत और विवाह संबंधी कार्यों के लिए शुभ'),
    mantra: 'ॐ गौर्यै नमः॥',
    upay: [
      p('Offer sindoor, a red chunri and bangles to Maa Gauri for a happy married life.', 'सुखी वैवाहिक जीवन के लिए माँ गौरी को सिंदूर, लाल चुनरी और चूड़ियाँ अर्पित करें।'),
      p('Unmarried girls can worship Shiva-Parvati together for a suitable match.', 'अविवाहित कन्याएँ योग्य वर के लिए शिव-पार्वती की संयुक्त पूजा करें।'),
    ],
    daan: p('Suhaag items to a married woman', 'किसी सुहागिन को सुहाग सामग्री'),
    avoid: p('Parval (pointed gourd) is traditionally avoided today.', 'परंपरा अनुसार आज परवल नहीं खाया जाता।'),
  },
  4: {
    deity: p('Shri Ganesh', 'श्री गणेश'),
    nature: p('Rikta (empty) — avoid new beginnings; good for removing obstacles', 'रिक्ता तिथि — नए आरंभ से बचें; विघ्न दूर करने के लिए उत्तम'),
    mantra: 'ॐ गं गणपतये नमः॥',
    upay: [
      p('Offer 21 blades of durva grass and modak or laddoo to Ganesh ji.', 'गणेश जी को 21 दूर्वा और मोदक या लड्डू अर्पित करें।'),
      p('Recite the Sankat Nashan Ganesh Stotra to remove obstacles in work.', 'कार्यों की बाधा दूर करने के लिए संकटनाशन गणेश स्तोत्र का पाठ करें।'),
    ],
    daan: p('Green moong, laddoo or durva to a temple', 'हरी मूँग, लड्डू या मंदिर में दूर्वा'),
    avoid: p('Radish (mooli) is traditionally avoided today. Do not look at the Moon on Bhadrapada Shukla Chaturthi.', 'परंपरा अनुसार आज मूली नहीं खाई जाती। भाद्रपद शुक्ल चतुर्थी को चंद्र दर्शन न करें।'),
    krishna: p('Krishna Chaturthi is Sankashti — fast till moonrise and offer arghya to the Moon.', 'कृष्ण चतुर्थी संकष्टी है — चंद्रोदय तक व्रत रखकर चंद्रमा को अर्घ्य दें।'),
  },
  5: {
    deity: p('Nag Devta', 'नाग देवता'),
    nature: p('Purna (complete) — good for most auspicious work', 'पूर्णा तिथि — अधिकांश शुभ कार्यों के लिए अच्छी'),
    mantra: 'ॐ नागदेवताय नमः॥',
    upay: [
      p('Offer milk and white flowers at a Shiva temple or to a Nag idol — helpful for Kaal Sarp dosha.', 'शिव मंदिर में या नाग प्रतिमा पर दूध और सफ़ेद पुष्प अर्पित करें — कालसर्प दोष में सहायक।'),
      p('Worship Maa Saraswati or Lakshmi for knowledge and wealth.', 'ज्ञान और धन के लिए माँ सरस्वती या लक्ष्मी की पूजा करें।'),
    ],
    daan: p('Milk, rice or silver', 'दूध, चावल या चाँदी'),
    avoid: p('Bel fruit is traditionally avoided today; never harm snakes.', 'परंपरा अनुसार आज बेल फल नहीं खाया जाता; कभी भी सर्प को हानि न पहुँचाएँ।'),
  },
  6: {
    deity: p('Lord Kartikeya (Skanda)', 'भगवान कार्तिकेय (स्कंद)'),
    nature: p('Nanda — good for courage, health and children', 'नंदा तिथि — साहस, स्वास्थ्य और संतान के लिए शुभ'),
    mantra: 'ॐ स्कन्दाय नमः॥',
    upay: [
      p('Worship Kartikeya with red flowers for health and the well-being of children.', 'स्वास्थ्य और संतान के कल्याण के लिए कार्तिकेय जी की लाल पुष्पों से पूजा करें।'),
      p('Light a lamp of mustard oil and pray to Shashthi Mata for children’s protection.', 'सरसों के तेल का दीपक जलाकर बच्चों की रक्षा हेतु षष्ठी माता से प्रार्थना करें।'),
    ],
    daan: p('Red lentils (masoor) or fruits to children', 'लाल मसूर या बच्चों को फल'),
    avoid: p('Neem leaves are traditionally not eaten today.', 'परंपरा अनुसार आज नीम का सेवन नहीं किया जाता।'),
  },
  7: {
    deity: p('Surya Dev', 'सूर्य देव'),
    nature: p('Bhadra — good for travel, health and government work', 'भद्रा तिथि — यात्रा, स्वास्थ्य और सरकारी कार्यों के लिए शुभ'),
    mantra: 'ॐ घृणि सूर्याय नमः॥',
    upay: [
      p('Offer arghya to the rising Sun from a copper lota with red flowers, roli and a pinch of jaggery.', 'ताँबे के लोटे में लाल पुष्प, रोली और थोड़ा गुड़ डालकर उगते सूर्य को अर्घ्य दें।'),
      p('Recite the Aditya Hridaya Stotra for confidence, health and success with authorities.', 'आत्मविश्वास, स्वास्थ्य और अधिकारियों से सफलता के लिए आदित्य हृदय स्तोत्र का पाठ करें।'),
    ],
    daan: p('Wheat, jaggery or copper', 'गेहूँ, गुड़ या ताँबा'),
    avoid: p('Taal (palm) fruit is traditionally avoided; avoid salt in the vrat if keeping it.', 'परंपरा अनुसार आज ताड़ फल नहीं खाया जाता; व्रत रखें तो नमक न लें।'),
  },
  8: {
    deity: p('Lord Shiva (Rudra) and Maa Durga', 'भगवान शिव (रुद्र) और माँ दुर्गा'),
    nature: p('Jaya — good for Devi worship and overcoming difficulties', 'जया तिथि — देवी पूजा और कठिनाइयों पर विजय के लिए शुभ'),
    mantra: 'ॐ दुं दुर्गायै नमः॥',
    upay: [
      p('Offer a red chunri and recite the Durga Chalisa or Devi Kavach.', 'लाल चुनरी अर्पित कर दुर्गा चालीसा या देवी कवच का पाठ करें।'),
      p('Light a lamp before Kaal Bhairav and feed a black dog (especially on Krishna Ashtami).', 'काल भैरव के सामने दीपक जलाएँ और काले कुत्ते को भोजन दें (विशेषकर कृष्ण अष्टमी को)।'),
    ],
    daan: p('Red cloth, chana or halwa', 'लाल वस्त्र, चना या हलवा'),
    avoid: p('Coconut is traditionally not eaten today (it may be offered).', 'परंपरा अनुसार आज नारियल नहीं खाया जाता (अर्पित किया जा सकता है)।'),
    shukla: p('Shukla Ashtami is Masik Durgashtami.', 'शुक्ल अष्टमी मासिक दुर्गाष्टमी है।'),
    krishna: p('Krishna Ashtami is Kalashtami — Kaal Bhairav worship protects from fear and enemies.', 'कृष्ण अष्टमी कालाष्टमी है — काल भैरव की पूजा भय और शत्रुओं से रक्षा करती है।'),
  },
  9: {
    deity: p('Maa Durga (Ambika)', 'माँ दुर्गा (अंबिका)'),
    nature: p('Rikta — good for overcoming enemies, not for new beginnings', 'रिक्ता तिथि — शत्रु पर विजय के लिए, नए आरंभ के लिए नहीं'),
    mantra: 'ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे॥',
    upay: [
      p('Recite the Navarna mantra 108 times and offer halwa-chana.', 'नवार्ण मंत्र का 108 बार जाप करें और हलवा-चना अर्पित करें।'),
      p('Worship Hanuman ji or Lord Rama for strength and protection.', 'बल और रक्षा के लिए हनुमान जी या भगवान राम की पूजा करें।'),
    ],
    daan: p('Red fruits or sweets to girls', 'कन्याओं को लाल फल या मिठाई'),
    avoid: p('Lauki (bottle gourd) is traditionally avoided today.', 'परंपरा अनुसार आज लौकी नहीं खाई जाती।'),
  },
  10: {
    deity: p('Yama (Dharmaraj)', 'यमराज (धर्मराज)'),
    nature: p('Purna — good for travel, vehicles and righteous work', 'पूर्णा तिथि — यात्रा, वाहन और धर्म कार्यों के लिए अच्छी'),
    mantra: 'ॐ यमाय धर्मराजाय नमः॥',
    upay: [
      p('Light a lamp facing south in the evening for the peace of ancestors and protection from mishaps.', 'पितरों की शांति और अनहोनी से रक्षा के लिए शाम को दक्षिण दिशा की ओर दीपक जलाएँ।'),
      p('Settle pending dues and keep your word — Dharmaraj rewards honesty.', 'बकाया चुकाएँ और वचन निभाएँ — धर्मराज ईमानदारी का फल देते हैं।'),
    ],
    daan: p('Food to the hungry, or an umbrella / shoes to a needy person', 'भूखे को भोजन, या किसी ज़रूरतमंद को छाता / जूते'),
    avoid: p('Kalambi (water spinach) is traditionally avoided; eat light food as Ekadashi preparation.', 'परंपरा अनुसार कलंबी साग वर्जित; एकादशी की तैयारी में हल्का भोजन लें।'),
  },
  11: {
    deity: p('Lord Vishnu', 'भगवान विष्णु'),
    nature: p('Nanda — the most sacred vrat tithi', 'नंदा तिथि — सबसे पवित्र व्रत तिथि'),
    mantra: 'ॐ नमो भगवते वासुदेवाय॥',
    upay: [
      p('Keep the Ekadashi vrat (fruits / phalahar) and offer tulsi leaves (plucked the day before) to Vishnu.', 'एकादशी व्रत (फलाहार) रखें और विष्णु जी को तुलसी दल (एक दिन पहले तोड़ा हुआ) अर्पित करें।'),
      p('Read the Vishnu Sahasranama or the Ekadashi katha and stay awake in bhajan at night if possible.', 'विष्णु सहस्रनाम या एकादशी कथा पढ़ें और संभव हो तो रात्रि जागरण में भजन करें।'),
    ],
    daan: p('Fruits, yellow cloth or grains (give, do not eat)', 'फल, पीला वस्त्र या अन्न (दान करें, खाएँ नहीं)'),
    avoid: p('No rice or grains today; do not pluck tulsi leaves on Ekadashi.', 'आज चावल और अन्न वर्जित; एकादशी को तुलसी न तोड़ें।'),
  },
  12: {
    deity: p('Lord Vishnu (Hari)', 'भगवान विष्णु (हरि)'),
    nature: p('Bhadra — good for daan and religious work', 'भद्रा तिथि — दान और धर्म कार्यों के लिए शुभ'),
    mantra: 'ॐ विष्णवे नमः॥',
    upay: [
      p('Break the Ekadashi fast (paran) after sunrise within the paran time, first with tulsi water.', 'सूर्योदय के बाद पारण समय में, पहले तुलसी जल से, एकादशी व्रत का पारण करें।'),
      p('Feed a brahmin or a cow before eating yourself.', 'स्वयं भोजन से पहले किसी ब्राह्मण या गाय को भोजन कराएँ।'),
    ],
    daan: p('Food, yellow sweets or a brass vessel', 'अन्न, पीली मिठाई या पीतल का बर्तन'),
    avoid: p('Poi (Malabar spinach) is traditionally avoided; do not delay the paran.', 'परंपरा अनुसार पोई साग वर्जित; पारण में देरी न करें।'),
  },
  13: {
    deity: p('Kamdev, and Lord Shiva (Pradosh)', 'कामदेव, और भगवान शिव (प्रदोष)'),
    nature: p('Jaya — good for love, harmony and Shiva worship', 'जया तिथि — प्रेम, सामंजस्य और शिव पूजा के लिए शुभ'),
    mantra: 'ॐ नमः शिवाय॥',
    upay: [
      p('In the Pradosh period (about 1½ hours after sunset) offer water, bel patra and white flowers to the Shivling.', 'प्रदोष काल (सूर्यास्त के लगभग डेढ़ घंटे बाद तक) में शिवलिंग पर जल, बेलपत्र और सफ़ेद पुष्प अर्पित करें।'),
      p('Light a ghee lamp at the Shiva temple for harmony in married life.', 'वैवाहिक सामंजस्य के लिए शिव मंदिर में घी का दीपक जलाएँ।'),
    ],
    daan: p('White clothes, rice or milk', 'सफ़ेद वस्त्र, चावल या दूध'),
    avoid: p('Brinjal is traditionally avoided today.', 'परंपरा अनुसार आज बैंगन नहीं खाया जाता।'),
  },
  14: {
    deity: p('Lord Shiva', 'भगवान शिव'),
    nature: p('Rikta — good for Shiva and Hanuman worship, not for new beginnings', 'रिक्ता तिथि — शिव और हनुमान पूजा के लिए, नए आरंभ के लिए नहीं'),
    mantra: 'ॐ नमः शिवाय॥ · महामृत्युंजय: ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥',
    upay: [
      p('Do Rudrabhishek or offer milk and water to the Shivling and chant the Mahamrityunjaya mantra 108 times.', 'रुद्राभिषेक करें या शिवलिंग पर दूध-जल अर्पित कर महामृत्युंजय मंत्र का 108 बार जाप करें।'),
      p('Recite the Hanuman Chalisa to remove fear and negativity.', 'भय और नकारात्मकता दूर करने के लिए हनुमान चालीसा का पाठ करें।'),
    ],
    daan: p('Black til, blanket or food to the poor', 'काले तिल, कंबल या गरीबों को भोजन'),
    avoid: p('Avoid oil massage, haircut and tamasic food today.', 'आज तेल मालिश, बाल कटवाना और तामसिक भोजन से बचें।'),
    krishna: p('Krishna Chaturdashi is Masik Shivratri — keep the night vigil for Shiva.', 'कृष्ण चतुर्दशी मासिक शिवरात्रि है — शिव के लिए रात्रि जागरण करें।'),
  },
  purnima: {
    deity: p('Chandra Dev, Lord Vishnu (Satyanarayan)', 'चंद्र देव, भगवान विष्णु (सत्यनारायण)'),
    nature: p('Purna — the Moon at full strength', 'पूर्णा तिथि — चंद्रमा पूर्ण बल में'),
    mantra: 'ॐ सों सोमाय नमः॥',
    upay: [
      p('Do the Satyanarayan katha or Vishnu puja and offer panchamrit and tulsi.', 'सत्यनारायण कथा या विष्णु पूजा करें और पंचामृत व तुलसी अर्पित करें।'),
      p('At moonrise offer arghya of raw milk mixed with water and rice to the Moon — calms the mind.', 'चंद्रोदय पर कच्चा दूध, जल और चावल मिलाकर चंद्रमा को अर्घ्य दें — मन शांत होता है।'),
      p('Light a ghee lamp under a peepal tree and offer kheer to Maa Lakshmi for lasting wealth.', 'पीपल के नीचे घी का दीपक जलाएँ और स्थायी धन के लिए माँ लक्ष्मी को खीर अर्पित करें।'),
    ],
    daan: p('Rice, milk, white cloth or silver', 'चावल, दूध, सफ़ेद वस्त्र या चाँदी'),
    avoid: p('Avoid meat, alcohol, anger and physical intimacy today.', 'आज मांस, मदिरा, क्रोध और शारीरिक संबंध से बचें।'),
  },
  amavasya: {
    deity: p('Pitru Dev (ancestors)', 'पितृ देव (पूर्वज)'),
    nature: p('Purna — the day of ancestors and inner work', 'पूर्णा तिथि — पितरों और आत्मचिंतन का दिन'),
    mantra: 'ॐ पितृदेवताभ्यो नमः॥ · ॐ सर्व पितृ देवताभ्यो नमः॥',
    upay: [
      p('Offer water with black til facing south (tarpan) for the peace of your ancestors.', 'पितरों की शांति के लिए दक्षिण दिशा की ओर काले तिल मिले जल से तर्पण करें।'),
      p('Light a mustard-oil lamp under a peepal tree in the evening and walk around it 7 times.', 'शाम को पीपल के नीचे सरसों के तेल का दीपक जलाकर 7 परिक्रमा करें।'),
      p('Feed a cow, a crow and a dog a part of your meal (Panchbali) — helpful for Pitru dosha.', 'अपने भोजन का अंश गाय, कौए और कुत्ते को दें (पंचबलि) — पितृ दोष में सहायक।'),
    ],
    daan: p('Food, black til, clothes or a meal to a brahmin', 'अन्न, काले तिल, वस्त्र या ब्राह्मण भोजन'),
    avoid: p('Avoid starting new work, buying a vehicle, meat and alcohol; avoid lonely places at night.', 'नया कार्य शुरू करने, वाहन खरीदने, मांस और मदिरा से बचें; रात में सुनसान स्थान से बचें।'),
  },
};

export const tithiUpayFor = (tithi, shukla) => (tithi === 15 ? TITHI_UPAY[shukla ? 'purnima' : 'amavasya'] : TITHI_UPAY[tithi]);
