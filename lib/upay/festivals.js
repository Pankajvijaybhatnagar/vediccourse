// Festivals (keys match FESTIVAL_DAYS in lib/hinduCalendar.js) and recurring vrats, each with its upay.

const p = (en, hi) => ({ en, hi });

export const FESTIVALS = {
  navVarsh: {
    name: p('Hindu Nav Varsh · Gudi Padwa · Ugadi', 'हिंदू नववर्ष · गुड़ी पड़वा · उगादि'),
    deity: p('Brahma ji, Maa Durga', 'ब्रह्मा जी, माँ दुर्गा'),
    about: p('The Vikram Samvat new year and the first day of Chaitra Navratri — Brahma began creation today.', 'विक्रम संवत का नववर्ष और चैत्र नवरात्रि का पहला दिन — आज ब्रह्मा जी ने सृष्टि की रचना आरंभ की।'),
    mantra: 'ॐ ब्रह्मणे नमः॥',
    upay: [
      p('Hoist a saffron flag or gudi at home and eat neem leaves with mishri for health all year.', 'घर पर भगवा ध्वज या गुड़ी लगाएँ और वर्ष भर स्वास्थ्य के लिए नीम की पत्ती मिश्री के साथ खाएँ।'),
      p('Listen to the new year’s panchang phal (samvatsar phal) and perform Ghatasthapana.', 'नववर्ष का पंचांग फल (संवत्सर फल) सुनें और घटस्थापना करें।'),
    ],
  },
  gangaur: {
    name: p('Gangaur', 'गणगौर'),
    deity: p('Shiva (Gan) & Parvati (Gaur)', 'शिव (गण) एवं पार्वती (गौर)'),
    about: p('Women worship Gauri for a long married life; girls pray for a good husband.', 'सुहागिनें अखंड सौभाग्य और कन्याएँ अच्छे वर के लिए गौरी पूजन करती हैं।'),
    mantra: 'ॐ गौर्यै नमः॥',
    upay: [p('Offer 16 shringar items to Gauri and tie the sacred thread after the katha.', 'गौरी माँ को सोलह श्रृंगार अर्पित करें और कथा के बाद पवित्र धागा बाँधें।')],
  },
  ramNavami: {
    name: p('Shri Ram Navami', 'श्री राम नवमी'),
    deity: p('Lord Rama', 'भगवान श्रीराम'),
    about: p('Birth of Lord Rama at noon (madhyahna) and the last day of Chaitra Navratri.', 'मध्याह्न में भगवान श्रीराम का जन्म और चैत्र नवरात्रि का अंतिम दिन।'),
    mantra: 'श्री राम जय राम जय जय राम॥',
    upay: [
      p('Recite the Ramraksha Stotra or Sunderkand and offer panjiri and panchamrit at noon.', 'रामरक्षा स्तोत्र या सुंदरकांड का पाठ करें और मध्याह्न में पंजीरी व पंचामृत का भोग लगाएँ।'),
      p('Chant “श्री राम जय राम जय जय राम” 108 times for peace in the family.', 'परिवार की शांति के लिए “श्री राम जय राम जय जय राम” 108 बार जपें।'),
    ],
  },
  hanumanJayanti: {
    name: p('Hanuman Jayanti', 'हनुमान जयंती'),
    deity: p('Hanuman ji', 'हनुमान जी'),
    about: p('Birth of Pavanputra Hanuman — the remover of fear, illness and Shani troubles.', 'पवनपुत्र हनुमान का जन्मोत्सव — भय, रोग और शनि पीड़ा हरने वाले।'),
    mantra: 'ॐ हं हनुमते नमः॥',
    upay: [
      p('Offer sindoor with jasmine oil, a red chola and boondi laddoo; recite the Hanuman Chalisa 11 times.', 'चमेली के तेल के साथ सिंदूर, लाल चोला और बूंदी के लड्डू चढ़ाएँ; हनुमान चालीसा के 11 पाठ करें।'),
      p('Read the Sunderkand at home for removing obstacles.', 'बाधाएँ दूर करने के लिए घर में सुंदरकांड का पाठ करें।'),
    ],
  },
  akshayaTritiya: {
    name: p('Akshaya Tritiya', 'अक्षय तृतीया'),
    deity: p('Lord Vishnu, Maa Lakshmi, Parshuram', 'भगवान विष्णु, माँ लक्ष्मी, परशुराम'),
    about: p('A self-auspicious (abujh) muhurat — whatever good is done today never decays.', 'स्वयंसिद्ध (अबूझ) मुहूर्त — आज किया गया शुभ कार्य कभी क्षय नहीं होता।'),
    mantra: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः॥',
    upay: [
      p('Buy gold or silver (even a small coin) and worship it with Lakshmi-Narayan.', 'सोना या चाँदी (छोटा सिक्का भी) खरीदें और लक्ष्मी-नारायण के साथ उसकी पूजा करें।'),
      p('Donate a water pot (matka), sattu, fan or umbrella — this daan gives lasting merit.', 'जल से भरा मटका, सत्तू, पंखा या छाता दान करें — यह दान अक्षय पुण्य देता है।'),
    ],
  },
  narasimhaJayanti: {
    name: p('Narasimha Jayanti', 'नृसिंह जयंती'),
    deity: p('Lord Narasimha', 'भगवान नृसिंह'),
    about: p('Vishnu appeared as Narasimha at dusk to protect Prahlad.', 'प्रह्लाद की रक्षा हेतु विष्णु जी संध्या समय नृसिंह रूप में प्रकट हुए।'),
    mantra: 'ॐ उग्रं वीरं महाविष्णुं ज्वलन्तं सर्वतोमुखम्। नृसिंहं भीषणं भद्रं मृत्युमृत्युं नमाम्यहम्॥',
    upay: [p('Worship at sunset and chant the Narasimha mantra for protection from enemies and fear.', 'सूर्यास्त के समय पूजा करें और शत्रु व भय से रक्षा के लिए नृसिंह मंत्र का जाप करें।')],
  },
  buddhaPurnima: {
    name: p('Buddha Purnima · Vaishakha Purnima', 'बुद्ध पूर्णिमा · वैशाख पूर्णिमा'),
    deity: p('Lord Vishnu, Gautam Buddha', 'भगवान विष्णु, गौतम बुद्ध'),
    about: p('Birth, enlightenment and nirvana of the Buddha; a holy day for bathing and charity.', 'बुद्ध का जन्म, ज्ञान और निर्वाण; स्नान-दान का पवित्र दिन।'),
    mantra: 'ॐ नमो भगवते वासुदेवाय॥',
    upay: [p('Donate water, sattu, sugar and white clothes; light a lamp under a peepal tree.', 'जल, सत्तू, शक्कर और सफ़ेद वस्त्र दान करें; पीपल के नीचे दीपक जलाएँ।')],
  },
  shaniJayanti: {
    name: p('Shani Jayanti · Vat Savitri Vrat', 'शनि जयंती · वट सावित्री व्रत'),
    deity: p('Shani Dev, Savitri-Satyavan', 'शनि देव, सावित्री-सत्यवान'),
    about: p('Birth of Shani Dev; married women worship the banyan tree for their husband’s long life.', 'शनि देव का जन्मोत्सव; सुहागिनें पति की दीर्घायु के लिए वट वृक्ष की पूजा करती हैं।'),
    mantra: 'ॐ शं शनैश्चराय नमः॥',
    upay: [
      p('Offer mustard oil and black til to Shani Dev and donate shoes, umbrella or black blanket.', 'शनि देव को सरसों का तेल और काले तिल चढ़ाएँ तथा जूते, छाता या काला कंबल दान करें।'),
      p('Women tie raw cotton thread around the banyan 7 times and hear the Savitri katha.', 'स्त्रियाँ वट वृक्ष पर 7 बार कच्चा सूत लपेटें और सावित्री कथा सुनें।'),
    ],
  },
  gangaDussehra: {
    name: p('Ganga Dussehra', 'गंगा दशहरा'),
    deity: p('Maa Ganga', 'माँ गंगा'),
    about: p('Descent of the Ganga to earth — a bath in her removes ten kinds of sins.', 'गंगा जी का पृथ्वी पर अवतरण — गंगा स्नान से दस प्रकार के पाप नष्ट होते हैं।'),
    mantra: 'ॐ नमो गङ्गायै विश्वरूपिण्यै नारायण्यै नमो नमः॥',
    upay: [p('Bathe with a little Gangajal in the water and donate ten items (fruits, fans, water pots).', 'स्नान के जल में थोड़ा गंगाजल मिलाएँ और दस वस्तुएँ (फल, पंखे, जलपात्र) दान करें।')],
  },
  rathYatra: {
    name: p('Jagannath Rath Yatra', 'जगन्नाथ रथ यात्रा'),
    deity: p('Lord Jagannath, Balabhadra, Subhadra', 'भगवान जगन्नाथ, बलभद्र, सुभद्रा'),
    about: p('The Lord comes out of the temple on his chariot to meet his devotees.', 'भगवान रथ पर सवार होकर भक्तों से मिलने मंदिर से बाहर आते हैं।'),
    mantra: 'जगन्नाथ स्वामी नयनपथगामी भवतु मे॥',
    upay: [p('Offer khichdi or sweet rice and chant “Jai Jagannath”; help in a community kitchen.', 'खिचड़ी या मीठे चावल का भोग लगाएँ और “जय जगन्नाथ” बोलें; किसी भंडारे में सेवा करें।')],
  },
  guruPurnima: {
    name: p('Guru Purnima (Vyas Purnima)', 'गुरु पूर्णिमा (व्यास पूर्णिमा)'),
    deity: p('Maharshi Ved Vyas, your guru', 'महर्षि वेदव्यास, अपने गुरु'),
    about: p('Day of gratitude to the guru; birth of Ved Vyas.', 'गुरु के प्रति कृतज्ञता का दिन; वेदव्यास जी का जन्मदिवस।'),
    mantra: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात् परब्रह्म तस्मै श्रीगुरवे नमः॥',
    upay: [p('Touch your guru’s or teacher’s feet, offer yellow clothes and dakshina; donate books for Jupiter.', 'गुरु या शिक्षक के चरण स्पर्श करें, पीले वस्त्र और दक्षिणा भेंट करें; बृहस्पति के लिए पुस्तकें दान करें।')],
  },
  hariyaliTeej: {
    name: p('Hariyali Teej', 'हरियाली तीज'),
    deity: p('Shiva-Parvati', 'शिव-पार्वती'),
    about: p('Celebrates the reunion of Shiva and Parvati; women fast for marital bliss.', 'शिव-पार्वती के पुनर्मिलन का उत्सव; स्त्रियाँ सौभाग्य के लिए व्रत रखती हैं।'),
    mantra: 'ॐ उमामहेश्वराभ्यां नमः॥',
    upay: [p('Wear green, apply mehendi and offer suhaag items to Parvati; swing on a jhoola.', 'हरे वस्त्र पहनें, मेहंदी लगाएँ और माँ पार्वती को सुहाग सामग्री चढ़ाएँ; झूला झूलें।')],
  },
  nagPanchami: {
    name: p('Nag Panchami', 'नाग पंचमी'),
    deity: p('Nag Devta', 'नाग देवता'),
    about: p('Worship of serpent deities — the best day for Kaal Sarp dosha remedies.', 'नाग देवताओं की पूजा — कालसर्प दोष निवारण के लिए सर्वोत्तम दिन।'),
    mantra: 'ॐ नवकुलाय विद्महे विषदन्ताय धीमहि तन्नो सर्पः प्रचोदयात्॥',
    upay: [
      p('Offer milk, rice and flowers to a Nag idol or the Shivling; draw a Nag on the door with cow dung or turmeric.', 'नाग प्रतिमा या शिवलिंग पर दूध, चावल और पुष्प चढ़ाएँ; दरवाज़े पर गोबर या हल्दी से नाग बनाएँ।'),
      p('Offer a silver Nag-Nagin pair at a Shiva temple for Kaal Sarp dosha.', 'कालसर्प दोष के लिए शिव मंदिर में चाँदी का नाग-नागिन जोड़ा अर्पित करें।'),
    ],
  },
  rakshaBandhan: {
    name: p('Raksha Bandhan · Shravani Purnima', 'रक्षाबंधन · श्रावणी पूर्णिमा'),
    deity: p('Lord Vishnu, Hayagriva', 'भगवान विष्णु, हयग्रीव'),
    about: p('Sisters tie rakhi; brahmins change the yajnopavit (Shravani Upakarma).', 'बहनें राखी बाँधती हैं; ब्राह्मण यज्ञोपवीत बदलते हैं (श्रावणी उपाकर्म)।'),
    mantra: 'येन बद्धो बली राजा दानवेन्द्रो महाबलः। तेन त्वामनुबध्नामि रक्षे मा चल मा चल॥',
    upay: [p('Tie the rakhi outside the Bhadra period with the raksha mantra; first offer a rakhi to your ishta devta.', 'भद्रा काल के बाहर रक्षा मंत्र के साथ राखी बाँधें; पहली राखी अपने इष्ट देव को अर्पित करें।')],
  },
  kajariTeej: {
    name: p('Kajari Teej', 'कजरी तीज'),
    deity: p('Maa Parvati (Neemadi Mata)', 'माँ पार्वती (नीमड़ी माता)'),
    about: p('Women fast for their husband’s long life and worship the neem.', 'स्त्रियाँ पति की दीर्घायु के लिए व्रत रखकर नीम की पूजा करती हैं।'),
    mantra: 'ॐ उमायै नमः॥',
    upay: [p('Worship Neemadi Mata, offer sattu and break the fast after offering arghya to the Moon.', 'नीमड़ी माता की पूजा करें, सत्तू अर्पित करें और चंद्रमा को अर्घ्य देकर व्रत खोलें।')],
  },
  janmashtami: {
    name: p('Shri Krishna Janmashtami', 'श्री कृष्ण जन्माष्टमी'),
    deity: p('Lord Krishna', 'भगवान श्रीकृष्ण'),
    about: p('Birth of Lord Krishna at midnight in Rohini nakshatra.', 'रोहिणी नक्षत्र में मध्यरात्रि को भगवान श्रीकृष्ण का जन्म।'),
    mantra: 'ॐ नमो भगवते वासुदेवाय॥ · ॐ क्लीं कृष्णाय नमः॥',
    upay: [
      p('Fast till midnight, bathe Laddu Gopal with panchamrit and offer makhan-mishri and tulsi.', 'मध्यरात्रि तक व्रत रखें, लड्डू गोपाल को पंचामृत से स्नान कराएँ और माखन-मिश्री व तुलसी का भोग लगाएँ।'),
      p('Couples wishing for a child recite the Santan Gopal mantra: “ॐ देवकीसुत गोविन्द वासुदेव जगत्पते। देहि मे तनयं कृष्ण त्वामहं शरणं गतः॥”', 'संतान की कामना वाले दंपति संतान गोपाल मंत्र जपें: “ॐ देवकीसुत गोविन्द वासुदेव जगत्पते। देहि मे तनयं कृष्ण त्वामहं शरणं गतः॥”'),
    ],
  },
  hartalikaTeej: {
    name: p('Hartalika Teej', 'हरतालिका तीज'),
    deity: p('Shiva-Parvati', 'शिव-पार्वती'),
    about: p('A nirjala fast by women for marital bliss; girls fast for a husband like Shiva.', 'सौभाग्य के लिए स्त्रियों का निर्जला व्रत; कन्याएँ शिव जैसे वर के लिए व्रत रखती हैं।'),
    mantra: 'ॐ उमामहेश्वराभ्यां नमः॥',
    upay: [p('Make Shiva-Parvati of sand/ clay, worship in all four prahars of the night and offer suhaag items.', 'रेत/ मिट्टी से शिव-पार्वती बनाकर रात्रि के चारों प्रहर पूजा करें और सुहाग सामग्री चढ़ाएँ।')],
  },
  ganeshChaturthi: {
    name: p('Ganesh Chaturthi', 'गणेश चतुर्थी'),
    deity: p('Shri Ganesh', 'श्री गणेश'),
    about: p('Birth of Ganesh ji; Ganpati sthapana begins the 10-day festival till Anant Chaturdashi.', 'गणेश जी का जन्मोत्सव; गणपति स्थापना से अनंत चतुर्दशी तक दस दिन का उत्सव।'),
    mantra: 'ॐ गं गणपतये नमः॥ · वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    upay: [
      p('Install Ganpati in the madhyahna muhurat and offer 21 modak and 21 durva.', 'मध्याह्न मुहूर्त में गणपति स्थापना करें और 21 मोदक व 21 दूर्वा अर्पित करें।'),
      p('Do not look at the Moon tonight (mithya dosh); if seen, hear the Syamantak mani katha.', 'आज रात चंद्र दर्शन न करें (मिथ्या दोष); हो जाए तो स्यमंतक मणि कथा सुनें।'),
    ],
  },
  rishiPanchami: {
    name: p('Rishi Panchami', 'ऋषि पंचमी'),
    deity: p('Saptarishi', 'सप्तऋषि'),
    about: p('Worship of the seven sages, mainly by women, to wash away unknowing faults.', 'सप्तऋषियों की पूजा, मुख्यतः स्त्रियों द्वारा, अनजाने दोषों की शुद्धि हेतु।'),
    mantra: 'ॐ सप्तऋषिभ्यो नमः॥',
    upay: [p('Bathe with apamarg (chirchita) datun and worship the Saptarishi; eat only uncultivated food.', 'अपामार्ग (चिरचिटा) की दातुन से स्नान कर सप्तऋषि पूजन करें; बिना जुते खेत का अन्न ही खाएँ।')],
  },
  radhaAshtami: {
    name: p('Radha Ashtami', 'राधा अष्टमी'),
    deity: p('Shri Radha Rani', 'श्री राधा रानी'),
    about: p('Birth of Shri Radha in Barsana; worship brings Krishna’s grace too.', 'बरसाना में श्री राधा का जन्म; उनकी पूजा से कृष्ण कृपा भी मिलती है।'),
    mantra: 'ॐ वृषभानुजायै विद्महे कृष्णप्रियायै धीमहि तन्नो राधा प्रचोदयात्॥',
    upay: [p('Offer pink lotus and kheer to Radha-Krishna for love and harmony in marriage.', 'प्रेम और दाम्पत्य सामंजस्य के लिए राधा-कृष्ण को गुलाबी कमल और खीर अर्पित करें।')],
  },
  anantChaturdashi: {
    name: p('Anant Chaturdashi · Ganesh Visarjan', 'अनंत चतुर्दशी · गणेश विसर्जन'),
    deity: p('Lord Anant (Vishnu), Ganesh', 'भगवान अनंत (विष्णु), गणेश'),
    about: p('Worship of the eternal Vishnu and immersion of Ganpati.', 'अनंत विष्णु की पूजा और गणपति विसर्जन।'),
    mantra: 'अनन्तसंसारमहासमुद्रे मग्नान् समभ्युद्धर वासुदेव॥',
    upay: [p('Tie the 14-knot Anant sutra on the arm (men right, women left) after the puja.', 'पूजा के बाद 14 गाँठों वाला अनंत सूत्र बाँह पर बाँधें (पुरुष दाएँ, स्त्री बाएँ)।')],
  },
  pitruPaksha: {
    name: p('Pitru Paksha (Shraddh)', 'पितृ पक्ष (श्राद्ध)'),
    deity: p('Pitru (ancestors)', 'पितृ (पूर्वज)'),
    about: p('Sixteen days for the ancestors — shraddh is done on the tithi of each ancestor’s passing.', 'पितरों के सोलह दिन — प्रत्येक पूर्वज का श्राद्ध उनकी मृत्यु तिथि पर किया जाता है।'),
    mantra: 'ॐ पितृगणाय विद्महे जगत्धारिणी धीमहि तन्नो पितृो प्रचोदयात्॥',
    upay: [
      p('Offer til-water tarpan facing south and feed a brahmin; give food to a cow, crow and dog.', 'दक्षिण मुख होकर तिल-जल तर्पण करें और ब्राह्मण भोजन कराएँ; गाय, कौए और कुत्ते को भोजन दें।'),
      p('Avoid buying new things, starting auspicious work and cutting hair during these days.', 'इन दिनों नई वस्तु खरीदने, शुभ कार्य शुरू करने और बाल कटवाने से बचें।'),
    ],
  },
  sarvaPitruAmavasya: {
    name: p('Sarva Pitru Amavasya (Mahalaya)', 'सर्वपितृ अमावस्या (महालया)'),
    deity: p('All ancestors', 'सभी पितर'),
    about: p('Shraddh for all ancestors, including those whose tithi is unknown; Pitru Paksha ends.', 'सभी पितरों का श्राद्ध, जिनकी तिथि ज्ञात न हो उनका भी; पितृ पक्ष का समापन।'),
    mantra: 'ॐ सर्व पितृ देवताभ्यो नमः॥',
    upay: [p('Do tarpan and shraddh, light a lamp facing south at the door in the evening to see the ancestors off.', 'तर्पण और श्राद्ध करें, शाम को पितरों की विदाई के लिए द्वार पर दक्षिण मुखी दीपक जलाएँ।')],
  },
  vijayadashami: {
    name: p('Vijayadashami · Dussehra', 'विजयादशमी · दशहरा'),
    deity: p('Lord Rama, Maa Durga, Aparajita', 'भगवान राम, माँ दुर्गा, अपराजिता'),
    about: p('Victory of Rama over Ravana and of the Devi over Mahishasura; an abujh muhurat.', 'रावण पर राम और महिषासुर पर देवी की विजय; अबूझ मुहूर्त।'),
    mantra: 'ॐ अपराजितायै नमः॥',
    upay: [
      p('Do Shami puja and Aparajita puja in the afternoon (vijay muhurat); give shami leaves as “gold” to elders.', 'दोपहर विजय मुहूर्त में शमी पूजन और अपराजिता पूजन करें; बड़ों को शमी पत्र “सोना” मानकर दें।'),
      p('Worship weapons, tools and vehicles (Shastra puja) and immerse the Navratri jau.', 'शस्त्र, औज़ार और वाहन पूजन करें तथा नवरात्रि के जौ का विसर्जन करें।'),
    ],
  },
  sharadPurnima: {
    name: p('Sharad Purnima (Kojagari)', 'शरद पूर्णिमा (कोजागरी)'),
    deity: p('Maa Lakshmi, Chandra Dev', 'माँ लक्ष्मी, चंद्र देव'),
    about: p('The Moon shines with all 16 kalas and showers amrit; Lakshmi asks “Ko jagarti?” — who is awake?', 'चंद्रमा सोलह कलाओं से पूर्ण होकर अमृत बरसाता है; लक्ष्मी जी पूछती हैं “को जागर्ति?” — कौन जाग रहा है?'),
    mantra: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद॥',
    upay: [
      p('Keep kheer in the moonlight overnight and eat it as prasad in the morning.', 'खीर को रात भर चाँदनी में रखें और सुबह प्रसाद रूप में ग्रहण करें।'),
      p('Stay awake and worship Lakshmi at night for wealth all year.', 'वर्ष भर धन के लिए रात्रि जागरण कर लक्ष्मी पूजन करें।'),
    ],
  },
  karwaChauth: {
    name: p('Karwa Chauth', 'करवा चौथ'),
    deity: p('Maa Parvati, Shiva, Ganesh, Kartikeya, Chandra', 'माँ पार्वती, शिव, गणेश, कार्तिकेय, चंद्र'),
    about: p('A nirjala fast by married women for their husband’s long life, broken at moonrise.', 'पति की दीर्घायु के लिए सुहागिनों का निर्जला व्रत, चंद्रोदय पर खोला जाता है।'),
    mantra: 'ॐ शिवायै नमः॥',
    upay: [p('Eat sargi before dawn, hear the Karwa katha and offer arghya to the Moon through a sieve.', 'भोर से पहले सरगी खाएँ, करवा कथा सुनें और छलनी से चंद्रमा को अर्घ्य दें।')],
  },
  ahoiAshtami: {
    name: p('Ahoi Ashtami', 'अहोई अष्टमी'),
    deity: p('Ahoi Mata (Parvati)', 'अहोई माता (पार्वती)'),
    about: p('Mothers fast for the long life and well-being of their children.', 'माताएँ संतान की दीर्घायु और कल्याण के लिए व्रत रखती हैं।'),
    mantra: 'ॐ पार्वतीप्रियनन्दनाय नमः॥',
    upay: [p('Draw Ahoi Mata, worship in the evening and break the fast after seeing the stars.', 'अहोई माता का चित्र बनाकर शाम को पूजा करें और तारे देखकर व्रत खोलें।')],
  },
  govatsaDwadashi: {
    name: p('Govatsa Dwadashi (Vagh Baras)', 'गोवत्स द्वादशी (वाघ बारस)'),
    deity: p('Cow and calf (Kamdhenu)', 'गाय और बछड़ा (कामधेनु)'),
    about: p('Worship of the cow and calf; Diwali festivities begin.', 'गाय-बछड़े की पूजा; दीपावली उत्सव का आरंभ।'),
    mantra: 'ॐ सुरभ्यै नमः॥',
    upay: [p('Feed a cow and calf with green fodder and jaggery; avoid wheat and milk products today.', 'गाय और बछड़े को हरा चारा और गुड़ खिलाएँ; आज गेहूँ और दूध से बनी वस्तुएँ न लें।')],
  },
  dhanteras: {
    name: p('Dhanteras · Dhanvantari Jayanti', 'धनतेरस · धन्वंतरि जयंती'),
    deity: p('Lord Dhanvantari, Kuber, Lakshmi, Yama', 'भगवान धन्वंतरि, कुबेर, लक्ष्मी, यम'),
    about: p('Dhanvantari emerged with amrit; buying metal today brings thirteen-fold prosperity.', 'धन्वंतरि अमृत कलश लेकर प्रकट हुए; आज धातु खरीदने से तेरह गुना समृद्धि आती है।'),
    mantra: 'ॐ यक्षाय कुबेराय वैश्रवणाय धनधान्याधिपतये धनधान्यसमृद्धिं मे देहि दापय स्वाहा॥',
    upay: [
      p('Buy silver, a brass/ steel vessel or a broom; worship Kuber and Dhanvantari in the pradosh kaal.', 'चाँदी, पीतल/ स्टील का बर्तन या झाड़ू खरीदें; प्रदोष काल में कुबेर और धन्वंतरि की पूजा करें।'),
      p('Light a four-faced lamp facing south (Yam deep) outside the door for protection from untimely death.', 'अकाल मृत्यु से रक्षा के लिए द्वार के बाहर दक्षिण मुखी चौमुखा दीपक (यम दीप) जलाएँ।'),
    ],
  },
  narakChaturdashi: {
    name: p('Narak Chaturdashi · Roop Chaudas · Choti Diwali', 'नरक चतुर्दशी · रूप चौदस · छोटी दिवाली'),
    deity: p('Lord Krishna, Yama, Hanuman ji', 'भगवान कृष्ण, यम, हनुमान जी'),
    about: p('Krishna slew Narakasura; abhyang snan before sunrise brings beauty and health.', 'कृष्ण ने नरकासुर का वध किया; सूर्योदय से पहले अभ्यंग स्नान रूप और स्वास्थ्य देता है।'),
    mantra: 'ॐ यमाय नमः॥',
    upay: [p('Apply ubtan and oil before sunrise and bathe; light 14 lamps in the evening, one facing south for Yama.', 'सूर्योदय से पहले उबटन और तेल लगाकर स्नान करें; शाम को 14 दीपक जलाएँ, एक यम के लिए दक्षिण मुखी।')],
  },
  diwali: {
    name: p('Deepawali · Lakshmi Puja', 'दीपावली · लक्ष्मी पूजा'),
    deity: p('Maa Lakshmi, Shri Ganesh, Kuber', 'माँ लक्ष्मी, श्री गणेश, कुबेर'),
    about: p('The festival of lights — Lakshmi puja in the sthir lagna of Pradosh kaal brings lasting wealth.', 'प्रकाश का पर्व — प्रदोष काल की स्थिर लग्न में लक्ष्मी पूजा स्थायी धन देती है।'),
    mantra: 'ॐ श्रीं ह्रीं श्रीं कमले कमलालये प्रसीद प्रसीद श्रीं ह्रीं श्रीं ॐ महालक्ष्म्यै नमः॥',
    upay: [
      p('Worship Lakshmi-Ganesh with lotus, kheel-batashe and a Shri Yantra; keep a ghee lamp burning all night.', 'कमल, खील-बताशे और श्रीयंत्र के साथ लक्ष्मी-गणेश पूजा करें; घी का दीपक रात भर जलाए रखें।'),
      p('Place 11 gomti chakras and a few kauris wrapped in red cloth in your cash box after the puja.', 'पूजा के बाद लाल कपड़े में 11 गोमती चक्र और कुछ कौड़ियाँ लपेटकर तिजोरी में रखें।'),
      p('Light a lamp at the Tulsi, the main door, the kitchen, the water source and under a peepal.', 'तुलसी, मुख्य द्वार, रसोई, जल स्थान और पीपल के नीचे दीपक जलाएँ।'),
    ],
  },
  govardhan: {
    name: p('Govardhan Puja · Annakut', 'गोवर्धन पूजा · अन्नकूट'),
    deity: p('Lord Krishna (Giriraj)', 'भगवान कृष्ण (गिरिराज)'),
    about: p('Krishna lifted the Govardhan hill; 56 bhog (annakut) is offered.', 'कृष्ण ने गोवर्धन पर्वत उठाया; छप्पन भोग (अन्नकूट) अर्पित होता है।'),
    mantra: 'गोवर्धन धराधार गोकुल त्राणकारक। विष्णुबाहु कृतोच्छ्राय गवां कोटिप्रदो भव॥',
    upay: [p('Make Govardhan of cow dung, do parikrama and offer annakut; serve cows.', 'गोबर से गोवर्धन बनाकर परिक्रमा करें और अन्नकूट अर्पित करें; गौसेवा करें।')],
  },
  bhaiDooj: {
    name: p('Bhai Dooj · Yama Dwitiya', 'भाई दूज · यम द्वितीया'),
    deity: p('Yama and Yamuna', 'यम और यमुना'),
    about: p('Sisters apply tilak for their brother’s long life, as Yamuna did for Yama.', 'बहनें भाई की दीर्घायु के लिए तिलक करती हैं, जैसे यमुना ने यम का किया था।'),
    mantra: 'ॐ यमाय नमः॥',
    upay: [p('Brothers eat at their sister’s home and give a gift; worship Chitragupta (pen and books) too.', 'भाई बहन के घर भोजन कर उपहार दें; चित्रगुप्त पूजा (कलम-दवात) भी करें।')],
  },
  chhath: {
    name: p('Chhath Puja', 'छठ पूजा'),
    deity: p('Surya Dev & Chhathi Maiya', 'सूर्य देव एवं छठी मैया'),
    about: p('Arghya to the setting Sun today and to the rising Sun tomorrow; for health and children.', 'आज डूबते सूर्य को और कल उगते सूर्य को अर्घ्य; स्वास्थ्य और संतान के लिए।'),
    mantra: 'ॐ घृणि सूर्याय नमः॥',
    upay: [p('Offer arghya with thekua, sugarcane and fruits in a bamboo soop while standing in water.', 'जल में खड़े होकर बाँस के सूप में ठेकुआ, गन्ना और फलों के साथ अर्घ्य दें।')],
  },
  amlaNavami: {
    name: p('Akshaya (Amla) Navami', 'अक्षय (आँवला) नवमी'),
    deity: p('Lord Vishnu in the amla tree', 'आँवला वृक्ष में विष्णु'),
    about: p('Worship and a meal under the amla tree give undecaying merit.', 'आँवले के वृक्ष की पूजा और उसके नीचे भोजन से अक्षय पुण्य मिलता है।'),
    mantra: 'ॐ धात्र्यै नमः॥',
    upay: [p('Tie a thread around the amla tree, do parikrama and have a meal under it with family.', 'आँवले के वृक्ष पर सूत लपेटकर परिक्रमा करें और परिवार सहित उसके नीचे भोजन करें।')],
  },
  tulsiVivah: {
    name: p('Tulsi Vivah · after Dev Uthani Ekadashi', 'तुलसी विवाह · देवउठनी एकादशी के बाद'),
    deity: p('Tulsi & Shaligram (Vishnu)', 'तुलसी एवं शालिग्राम (विष्णु)'),
    about: p('Vishnu awakes; the marriage of Tulsi and Shaligram opens the wedding season.', 'विष्णु जी जागते हैं; तुलसी-शालिग्राम विवाह से विवाह का मौसम शुरू होता है।'),
    mantra: 'ॐ तुलस्यै नमः॥',
    upay: [p('Decorate the tulsi as a bride with a red chunri and perform her marriage with Shaligram — blessing for marriage of daughters.', 'तुलसी को लाल चुनरी से दुल्हन सजाकर शालिग्राम से विवाह कराएँ — कन्याओं के विवाह हेतु आशीर्वाद।')],
  },
  kartikPurnima: {
    name: p('Kartik Purnima · Dev Deepawali', 'कार्तिक पूर्णिमा · देव दीपावली'),
    deity: p('Lord Shiva (Tripurari), Vishnu', 'भगवान शिव (त्रिपुरारी), विष्णु'),
    about: p('Shiva destroyed Tripurasur; the gods celebrate Diwali in Kashi; Guru Nanak Jayanti.', 'शिव ने त्रिपुरासुर का वध किया; देवता काशी में दीवाली मनाते हैं; गुरु नानक जयंती।'),
    mantra: 'ॐ नमः शिवाय॥',
    upay: [p('Bathe in a holy river or with Gangajal, do deep daan at a river or temple and donate food and blankets.', 'पवित्र नदी में या गंगाजल से स्नान करें, नदी/ मंदिर में दीपदान करें और अन्न व कंबल दान करें।')],
  },
  kalBhairavJayanti: {
    name: p('Kaal Bhairav Jayanti', 'काल भैरव जयंती'),
    deity: p('Kaal Bhairav', 'काल भैरव'),
    about: p('Appearance of Kaal Bhairav, the fierce form of Shiva and kotwal of Kashi.', 'शिव के उग्र रूप और काशी के कोतवाल काल भैरव का प्राकट्य।'),
    mantra: 'ॐ कालभैरवाय नमः॥',
    upay: [p('Light a mustard-oil lamp at a Bhairav temple, offer imarti/ jalebi and feed a black dog.', 'भैरव मंदिर में सरसों के तेल का दीपक जलाएँ, इमरती/ जलेबी चढ़ाएँ और काले कुत्ते को भोजन दें।')],
  },
  vivahPanchami: {
    name: p('Vivah Panchami', 'विवाह पंचमी'),
    deity: p('Shri Ram & Sita', 'श्री राम एवं सीता'),
    about: p('The wedding day of Ram and Sita.', 'राम-सीता का विवाह दिवस।'),
    mantra: 'ॐ जानकीवल्लभाय नमः॥',
    upay: [p('Recite the Ram-Sita vivah prasang of the Ramcharitmanas for an early and harmonious marriage.', 'शीघ्र और सुखद विवाह के लिए रामचरितमानस के राम-सीता विवाह प्रसंग का पाठ करें।')],
  },
  gitaJayanti: {
    name: p('Gita Jayanti · Mokshada Ekadashi', 'गीता जयंती · मोक्षदा एकादशी'),
    deity: p('Lord Krishna, Shrimad Bhagavad Gita', 'भगवान कृष्ण, श्रीमद्भगवद्गीता'),
    about: p('Krishna spoke the Gita to Arjuna at Kurukshetra.', 'कुरुक्षेत्र में कृष्ण ने अर्जुन को गीता का उपदेश दिया।'),
    mantra: 'ॐ नमो भगवते वासुदेवाय॥',
    upay: [p('Read at least one chapter (ideally chapter 11 or 18) of the Gita and gift a Gita to someone.', 'गीता का कम से कम एक अध्याय (विशेषकर 11वाँ या 18वाँ) पढ़ें और किसी को गीता भेंट करें।')],
  },
  dattaJayanti: {
    name: p('Dattatreya Jayanti', 'दत्तात्रेय जयंती'),
    deity: p('Lord Dattatreya', 'भगवान दत्तात्रेय'),
    about: p('Birth of Dattatreya — the combined form of Brahma, Vishnu and Mahesh.', 'ब्रह्मा, विष्णु, महेश के संयुक्त रूप भगवान दत्तात्रेय का जन्म।'),
    mantra: 'ॐ द्रां दत्तात्रेयाय नमः॥',
    upay: [p('Feed a cow and a dog, and recite the Guru Charitra or the Datta stotra.', 'गाय और कुत्ते को भोजन दें तथा गुरुचरित्र या दत्त स्तोत्र का पाठ करें।')],
  },
  mauniAmavasya: {
    name: p('Mauni Amavasya', 'मौनी अमावस्या'),
    deity: p('Pitru, Maa Ganga', 'पितर, माँ गंगा'),
    about: p('Silence (maun), a holy bath and charity today give manifold merit.', 'आज मौन, पवित्र स्नान और दान का कई गुना फल मिलता है।'),
    mantra: 'ॐ नमः शिवाय॥',
    upay: [p('Keep silence till the bath, then donate til, blankets and food; offer tarpan to ancestors.', 'स्नान तक मौन रखें, फिर तिल, कंबल और अन्न दान करें; पितरों को तर्पण दें।')],
  },
  vasantPanchami: {
    name: p('Vasant Panchami · Saraswati Puja', 'वसंत पंचमी · सरस्वती पूजा'),
    deity: p('Maa Saraswati', 'माँ सरस्वती'),
    about: p('Birth of the goddess of learning; an abujh muhurat for vidyarambh and weddings.', 'विद्या की देवी का प्राकट्य; विद्यारंभ और विवाह के लिए अबूझ मुहूर्त।'),
    mantra: 'ॐ ऐं सरस्वत्यै नमः॥',
    upay: [
      p('Wear yellow, offer yellow sweets, books and pens to Saraswati and begin a child’s first lesson.', 'पीले वस्त्र पहनें, सरस्वती जी को पीली मिठाई, पुस्तकें और कलम अर्पित करें और बच्चे का विद्यारंभ कराएँ।'),
      p('Students chant “ॐ ऐं सरस्वत्यै नमः” 108 times and write it on the first page of a notebook.', 'विद्यार्थी “ॐ ऐं सरस्वत्यै नमः” 108 बार जपें और कॉपी के पहले पृष्ठ पर लिखें।'),
    ],
  },
  rathaSaptami: {
    name: p('Ratha Saptami (Achala Saptami)', 'रथ सप्तमी (अचला सप्तमी)'),
    deity: p('Surya Dev', 'सूर्य देव'),
    about: p('The Sun’s birthday — his chariot turns north.', 'सूर्य देव का जन्मदिवस — उनका रथ उत्तर की ओर मुड़ता है।'),
    mantra: 'ॐ घृणि सूर्याय नमः॥',
    upay: [p('Bathe at sunrise with seven aak (arka) leaves on the head and offer arghya to the Sun.', 'सूर्योदय पर सिर पर आक के सात पत्ते रखकर स्नान करें और सूर्य को अर्घ्य दें।')],
  },
  maghPurnima: {
    name: p('Magh Purnima', 'माघ पूर्णिमा'),
    deity: p('Lord Vishnu', 'भगवान विष्णु'),
    about: p('End of Kalpavas at Prayag; bathing and charity are highly meritorious.', 'प्रयाग में कल्पवास का समापन; स्नान-दान अत्यंत पुण्यदायी।'),
    mantra: 'ॐ नमो नारायणाय॥',
    upay: [p('Donate til, jaggery, blankets and ghee; do the Satyanarayan katha.', 'तिल, गुड़, कंबल और घी दान करें; सत्यनारायण कथा करें।')],
  },
  mahashivratri: {
    name: p('Mahashivratri', 'महाशिवरात्रि'),
    deity: p('Lord Shiva', 'भगवान शिव'),
    about: p('The great night of Shiva — his marriage with Parvati and appearance as the Jyotirlinga.', 'शिव की महान रात्रि — पार्वती से विवाह और ज्योतिर्लिंग रूप में प्राकट्य।'),
    mantra: 'ॐ नमः शिवाय॥ · ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्। उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥',
    upay: [
      p('Keep the fast and do abhishek in all four prahars of the night with water, milk, curd, honey and ghee.', 'व्रत रखें और रात्रि के चारों प्रहर जल, दूध, दही, शहद और घी से अभिषेक करें।'),
      p('Offer bel patra (with “ॐ नमः शिवाय” written in sandal), dhatura and bhang; stay awake in bhajan.', 'बेलपत्र (चंदन से “ॐ नमः शिवाय” लिखकर), धतूरा और भांग चढ़ाएँ; भजन में जागरण करें।'),
    ],
  },
  holikaDahan: {
    name: p('Holika Dahan · Phalguna Purnima', 'होलिका दहन · फाल्गुन पूर्णिमा'),
    deity: p('Bhakt Prahlad, Lord Narasimha', 'भक्त प्रह्लाद, भगवान नृसिंह'),
    about: p('Victory of devotion over evil — Holika burned while Prahlad was saved.', 'बुराई पर भक्ति की विजय — होलिका जली और प्रह्लाद बचे।'),
    mantra: 'ॐ नृसिंहाय नमः॥',
    upay: [p('Do parikrama of the Holika 7 times offering raw cotton, wheat ears and coconut; take home its ash for protection.', 'कच्चा सूत, गेहूँ की बालियाँ और नारियल अर्पित करते हुए होलिका की 7 परिक्रमा करें; रक्षा के लिए उसकी भस्म घर लाएँ।')],
  },
  holi: {
    name: p('Holi (Dhulandi)', 'होली (धुलेंडी)'),
    deity: p('Radha-Krishna', 'राधा-कृष्ण'),
    about: p('The festival of colours, love and forgiveness.', 'रंगों, प्रेम और क्षमा का पर्व।'),
    mantra: 'ॐ क्लीं कृष्णाय नमः॥',
    upay: [p('First offer gulal to your ishta devta and elders; end old quarrels today.', 'पहले अपने इष्ट देव और बड़ों को गुलाल लगाएँ; आज पुराने गिले-शिकवे मिटाएँ।')],
  },
  makarSankranti: {
    name: p('Makar Sankranti · Uttarayan', 'मकर संक्रांति · उत्तरायण'),
    deity: p('Surya Dev', 'सूर्य देव'),
    about: p('The Sun enters Capricorn and begins its northward journey; the day of til and khichdi.', 'सूर्य मकर राशि में प्रवेश कर उत्तरायण होते हैं; तिल और खिचड़ी का पर्व।'),
    mantra: 'ॐ घृणि सूर्याय नमः॥',
    upay: [p('Bathe with til in the water, offer arghya and donate til-gud, khichdi and blankets.', 'जल में तिल डालकर स्नान करें, अर्घ्य दें और तिल-गुड़, खिचड़ी व कंबल दान करें।')],
  },
};

// ---------------------------------------------------------------------------
// Recurring vrats
// ---------------------------------------------------------------------------
const PRADOSH_NAMES = [
  p('Ravi Pradosh — health and long life', 'रवि प्रदोष — स्वास्थ्य और दीर्घायु'),
  p('Som Pradosh — wishes fulfilled, peace of mind', 'सोम प्रदोष — मनोकामना पूर्ति, मन की शांति'),
  p('Bhaum Pradosh — freedom from debt and illness', 'भौम प्रदोष — कर्ज़ और रोग से मुक्ति'),
  p('Budh Pradosh — success and intelligence', 'बुध प्रदोष — सफलता और बुद्धि'),
  p('Guru Pradosh — victory over enemies, guru’s grace', 'गुरु प्रदोष — शत्रु पर विजय, गुरु कृपा'),
  p('Shukra Pradosh — good fortune and marital happiness', 'शुक्र प्रदोष — सौभाग्य और दाम्पत्य सुख'),
  p('Shani Pradosh — blessing of children, relief from Shani', 'शनि प्रदोष — संतान सुख, शनि पीड़ा से राहत'),
];

const AMAVASYA_SPECIAL = {
  1: p('Somvati Amavasya — married women walk 108 times around the peepal for their husband’s long life.', 'सोमवती अमावस्या — सुहागिनें पति की दीर्घायु के लिए पीपल की 108 परिक्रमा करती हैं।'),
  2: p('Bhaumvati Amavasya — recite the Hanuman Chalisa for relief from debt.', 'भौमवती अमावस्या — कर्ज़ मुक्ति के लिए हनुमान चालीसा का पाठ करें।'),
  6: p('Shani Amavasya — the strongest day for Shani remedies: oil abhishek and chhaya daan.', 'शनि अमावस्या — शनि उपायों का सबसे प्रबल दिन: तेल अभिषेक और छाया दान।'),
};

export const SANKRANTI_NAMES = [
  p('Mesha', 'मेष'), p('Vrishabha', 'वृषभ'), p('Mithuna', 'मिथुन'), p('Karka', 'कर्क'), p('Simha', 'सिंह'), p('Kanya', 'कन्या'),
  p('Tula', 'तुला'), p('Vrishchika', 'वृश्चिक'), p('Dhanu', 'धनु'), p('Makara', 'मकर'), p('Kumbha', 'कुंभ'), p('Meena', 'मीन'),
];

/** Bilingual card for a vrat object produced by getHinduDay(). */
export function vratInfo(v) {
  switch (v.key) {
    case 'ekadashi':
      return {
        name: p(`${v.name.en} Ekadashi`, `${v.name.hi} एकादशी`),
        deity: p('Lord Vishnu', 'भगवान विष्णु'),
        about: p('Fast on fruits or water; worship Vishnu with tulsi. Break the fast (paran) tomorrow after sunrise within the Dwadashi.', 'फलाहार या निर्जल व्रत; तुलसी से विष्णु पूजा। कल सूर्योदय के बाद द्वादशी में व्रत का पारण करें।'),
        mantra: 'ॐ नमो भगवते वासुदेवाय॥',
        upay: [
          p('No rice today. Offer yellow flowers, tulsi and panchamrit and read the Ekadashi katha.', 'आज चावल वर्जित। पीले पुष्प, तुलसी और पंचामृत अर्पित कर एकादशी कथा पढ़ें।'),
          p('Light a ghee lamp at the tulsi in the evening (do not pluck its leaves today).', 'शाम को तुलसी पर घी का दीपक जलाएँ (आज तुलसी दल न तोड़ें)।'),
        ],
      };
    case 'pradosh':
      return {
        name: PRADOSH_NAMES[v.weekday],
        deity: p('Lord Shiva', 'भगवान शिव'),
        about: p('Worship Shiva in the Pradosh kaal — from sunset for about 1½ hours.', 'प्रदोष काल — सूर्यास्त से लगभग डेढ़ घंटे — में शिव पूजा करें।'),
        mantra: 'ॐ नमः शिवाय॥',
        upay: [p('Do abhishek with water, milk and honey; offer bel patra and recite the Shiv Chalisa.', 'जल, दूध और शहद से अभिषेक करें; बेलपत्र चढ़ाकर शिव चालीसा पढ़ें।')],
      };
    case 'sankashti':
      return {
        name: v.angarki ? p('Angarki Sankashti Chaturthi', 'अंगारकी संकष्टी चतुर्थी') : p('Sankashti Chaturthi', 'संकष्टी चतुर्थी'),
        deity: p('Shri Ganesh', 'श्री गणेश'),
        about: p(`Fast for Ganesh ji until moonrise and offer arghya to the Moon.${v.angarki ? ' Falling on Tuesday, it equals the merit of all Sankashtis of the year.' : ''}`, `चंद्रोदय तक गणेश जी का व्रत रखें और चंद्रमा को अर्घ्य दें।${v.angarki ? ' मंगलवार को पड़ने से यह वर्ष भर की संकष्टियों के बराबर फल देती है।' : ''}`),
        mantra: 'ॐ गं गणपतये नमः॥',
        upay: [p('Offer 21 durva, sesame-jaggery laddoo and recite the Sankat Nashan stotra.', '21 दूर्वा, तिल-गुड़ के लड्डू अर्पित करें और संकटनाशन स्तोत्र पढ़ें।')],
      };
    case 'vinayakaChaturthi':
      return {
        name: p('Vinayaka Chaturthi', 'विनायक चतुर्थी'),
        deity: p('Shri Ganesh', 'श्री गणेश'),
        about: p('Monthly Ganesh vrat — worship at midday; avoid seeing the Moon tonight.', 'मासिक गणेश व्रत — मध्याह्न में पूजा करें; आज रात चंद्र दर्शन से बचें।'),
        mantra: 'ॐ गं गणपतये नमः॥',
        upay: [p('Offer modak and durva for the success of new work.', 'नए कार्य की सफलता के लिए मोदक और दूर्वा अर्पित करें।')],
      };
    case 'masikShivratri':
      return {
        name: p('Masik Shivratri', 'मासिक शिवरात्रि'),
        deity: p('Lord Shiva', 'भगवान शिव'),
        about: p('Monthly night of Shiva — worship at midnight (nishita kaal).', 'शिव की मासिक रात्रि — निशीथ काल में पूजा करें।'),
        mantra: 'ॐ नमः शिवाय॥',
        upay: [p('Offer water, bel patra and dhatura; chant “ॐ नमः शिवाय” for one mala at night.', 'जल, बेलपत्र और धतूरा चढ़ाएँ; रात में “ॐ नमः शिवाय” की एक माला जपें।')],
      };
    case 'purnima':
      return {
        name: p('Purnima Vrat', 'पूर्णिमा व्रत'),
        deity: p('Lord Satyanarayan, Chandra', 'भगवान सत्यनारायण, चंद्र'),
        about: p('Satyanarayan katha and arghya to the full Moon.', 'सत्यनारायण कथा और पूर्ण चंद्र को अर्घ्य।'),
        mantra: 'ॐ सों सोमाय नमः॥',
        upay: [p('Hold the Satyanarayan katha and distribute panjiri prasad.', 'सत्यनारायण कथा कराएँ और पंजीरी प्रसाद बाँटें।')],
      };
    case 'amavasya':
      return {
        name: p('Amavasya', 'अमावस्या'),
        deity: p('Pitru (ancestors)', 'पितृ (पूर्वज)'),
        about: AMAVASYA_SPECIAL[v.weekday] || p('Day for tarpan, charity and quiet reflection.', 'तर्पण, दान और शांत चिंतन का दिन।'),
        mantra: 'ॐ पितृदेवताभ्यो नमः॥',
        upay: [p('Offer til-water to ancestors and a mustard-oil lamp under a peepal in the evening.', 'पितरों को तिल-जल और शाम को पीपल के नीचे सरसों के तेल का दीपक अर्पित करें।')],
      };
    case 'durgashtami':
      return {
        name: p('Masik Durgashtami', 'मासिक दुर्गाष्टमी'),
        deity: p('Maa Durga', 'माँ दुर्गा'),
        about: p('Monthly day of Durga — fast and worship for protection and strength.', 'दुर्गा जी का मासिक दिन — रक्षा और शक्ति के लिए व्रत व पूजा।'),
        mantra: 'ॐ दुं दुर्गायै नमः॥',
        upay: [p('Offer a red chunri and recite the Durga Chalisa; feed a young girl.', 'लाल चुनरी चढ़ाकर दुर्गा चालीसा पढ़ें; किसी कन्या को भोजन कराएँ।')],
      };
    case 'kalashtami':
      return {
        name: p('Kalashtami', 'कालाष्टमी'),
        deity: p('Kaal Bhairav', 'काल भैरव'),
        about: p('Monthly day of Kaal Bhairav — protection from fear, enemies and negativity.', 'काल भैरव का मासिक दिन — भय, शत्रु और नकारात्मकता से रक्षा।'),
        mantra: 'ॐ कालभैरवाय नमः॥',
        upay: [p('Feed a black dog and light a mustard-oil lamp at a Bhairav temple.', 'काले कुत्ते को भोजन दें और भैरव मंदिर में सरसों के तेल का दीपक जलाएँ।')],
      };
    case 'skandaShashthi':
      return {
        name: p('Skanda Shashthi', 'स्कंद षष्ठी'),
        deity: p('Lord Kartikeya (Murugan)', 'भगवान कार्तिकेय (मुरुगन)'),
        about: p('Monthly vrat of Kartikeya for courage and children’s well-being.', 'साहस और संतान कल्याण के लिए कार्तिकेय जी का मासिक व्रत।'),
        mantra: 'ॐ शरवणभवाय नमः॥',
        upay: [p('Offer red flowers and recite the Skanda Shashthi Kavacham.', 'लाल पुष्प अर्पित कर स्कंद षष्ठी कवच का पाठ करें।')],
      };
    case 'sankranti':
      return {
        name: p(`${SANKRANTI_NAMES[v.sign].en} Sankranti`, `${SANKRANTI_NAMES[v.sign].hi} संक्रांति`),
        deity: p('Surya Dev', 'सूर्य देव'),
        about: p(`The Sun enters ${SANKRANTI_NAMES[v.sign].en} — the punya kaal around the transit is ideal for bathing and charity.`, `सूर्य ${SANKRANTI_NAMES[v.sign].hi} राशि में प्रवेश करते हैं — संक्रमण के आसपास का पुण्य काल स्नान-दान के लिए उत्तम है।`),
        mantra: 'ॐ घृणि सूर्याय नमः॥',
        upay: [p('Offer arghya to the Sun and donate wheat, jaggery and red cloth.', 'सूर्य को अर्घ्य दें और गेहूँ, गुड़ व लाल वस्त्र दान करें।')],
      };
    case 'guruPushya':
    case 'raviPushya':
      return {
        name: v.key === 'guruPushya' ? p('Guru Pushya Yoga', 'गुरु पुष्य योग') : p('Ravi Pushya Yoga', 'रवि पुष्य योग'),
        deity: p('Brihaspati, Maa Lakshmi', 'बृहस्पति, माँ लक्ष्मी'),
        about: p('Pushya nakshatra on this weekday makes one of the most auspicious yogas — ideal for buying gold, property and starting lasting work.', 'इस वार पर पुष्य नक्षत्र अत्यंत शुभ योग बनाता है — सोना, संपत्ति खरीदने और स्थायी कार्य आरंभ करने के लिए उत्तम।'),
        mantra: 'ॐ बृं बृहस्पतये नमः॥',
        upay: [p('Buy gold or silver, start a savings account or a new venture; worship Lakshmi with yellow flowers.', 'सोना या चाँदी खरीदें, बचत खाता या नया उद्यम शुरू करें; पीले पुष्पों से लक्ष्मी पूजा करें।')],
      };
    default:
      return null;
  }
}
