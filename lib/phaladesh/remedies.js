// Traditional upay (remedies) for each graha and for common doshas.
// Mantras are the standard Navagraha beej mantras; japa counts follow the common
// tradition (complete over 40 days, or in one anushthan with a pandit).
const p = (en, hi) => ({ en, hi });

export const GRAHA_UPAY = {
  sun: {
    mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः',
    japa: 7000,
    day: p('Sunday', 'रविवार'),
    deity: p('Surya Dev · Aditya Hridaya Stotra', 'सूर्य देव · आदित्य हृदय स्तोत्र'),
    color: p('Red, saffron', 'लाल, केसरिया'),
    gem: p('Ruby (Manik) in gold or copper, ring finger, on a Sunday morning', 'माणिक्य, सोने या तांबे में, अनामिका में, रविवार प्रातः'),
    daan: p('Wheat, jaggery, copper, red cloth or red lentils on Sunday', 'रविवार को गेहूँ, गुड़, तांबा, लाल वस्त्र या मसूर का दान'),
    actions: [
      p('Offer water (arghya) to the rising Sun daily from a copper pot, with a pinch of roli and red flowers.', 'प्रतिदिन उगते सूर्य को तांबे के लोटे से जल अर्पित करें, उसमें रोली और लाल फूल डालें।'),
      p('Respect and serve your father and elders; seek their blessings before important work.', 'पिता और बड़ों का सम्मान व सेवा करें; महत्वपूर्ण कार्य से पहले उनका आशीर्वाद लें।'),
      p('Wake up before sunrise and practise Surya Namaskar.', 'सूर्योदय से पहले उठें और सूर्य नमस्कार करें।'),
      p('Keep a fast on Sundays if possible, taking food once, without salt.', 'संभव हो तो रविवार का व्रत रखें, एक समय बिना नमक का भोजन करें।'),
    ],
  },
  moon: {
    mantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः',
    japa: 11000,
    day: p('Monday', 'सोमवार'),
    deity: p('Lord Shiva · Shiva Chalisa / Om Namah Shivaya', 'भगवान शिव · शिव चालीसा / ॐ नमः शिवाय'),
    color: p('White, silver', 'सफ़ेद, चाँदी'),
    gem: p('Pearl (Moti) in silver, little finger, on a Monday evening', 'मोती, चाँदी में, कनिष्ठिका में, सोमवार संध्या'),
    daan: p('Rice, milk, curd, sugar, white cloth or silver on Monday', 'सोमवार को चावल, दूध, दही, शक्कर, सफ़ेद वस्त्र या चाँदी का दान'),
    actions: [
      p('Offer water or milk on a Shivling every Monday.', 'हर सोमवार शिवलिंग पर जल या दूध चढ़ाएँ।'),
      p('Respect your mother, touch her feet and take her blessings.', 'माता का सम्मान करें, चरण स्पर्श कर आशीर्वाद लें।'),
      p('Drink water from a silver glass and keep a regular sleep routine.', 'चाँदी के गिलास में पानी पिएँ और नियमित समय पर सोएँ।'),
      p('Meditate for 10 minutes daily and spend time near water or nature.', 'प्रतिदिन 10 मिनट ध्यान करें और जल या प्रकृति के पास समय बिताएँ।'),
    ],
  },
  mars: {
    mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः',
    japa: 10000,
    day: p('Tuesday', 'मंगलवार'),
    deity: p('Lord Hanuman · Hanuman Chalisa / Sundar Kand', 'हनुमान जी · हनुमान चालीसा / सुंदरकांड'),
    color: p('Red, coral', 'लाल, मूंगिया'),
    gem: p('Red Coral (Moonga) in gold or copper, ring finger, on a Tuesday morning', 'मूंगा, सोने या तांबे में, अनामिका में, मंगलवार प्रातः'),
    daan: p('Red lentils (masoor), jaggery, red cloth or copper on Tuesday', 'मंगलवार को मसूर दाल, गुड़, लाल वस्त्र या तांबे का दान'),
    actions: [
      p('Recite Hanuman Chalisa daily, and Sundar Kand on Tuesdays.', 'प्रतिदिन हनुमान चालीसा और मंगलवार को सुंदरकांड का पाठ करें।'),
      p('Offer sindoor and jasmine oil to Hanuman ji on Tuesday.', 'मंगलवार को हनुमान जी को सिंदूर और चमेली का तेल अर्पित करें।'),
      p('Control anger; exercise or play a sport regularly to use Mars’s energy well.', 'क्रोध पर नियंत्रण रखें; मंगल की ऊर्जा के सदुपयोग के लिए नियमित व्यायाम या खेल करें।'),
      p('Maintain good relations with brothers, and help soldiers or police where you can.', 'भाइयों से अच्छे संबंध रखें और यथासंभव सैनिकों या पुलिस की सहायता करें।'),
    ],
  },
  mercury: {
    mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः',
    japa: 9000,
    day: p('Wednesday', 'बुधवार'),
    deity: p('Lord Ganesha · Vishnu Sahasranama', 'श्री गणेश · विष्णु सहस्रनाम'),
    color: p('Green', 'हरा'),
    gem: p('Emerald (Panna) in gold, little finger, on a Wednesday morning', 'पन्ना, सोने में, कनिष्ठिका में, बुधवार प्रातः'),
    daan: p('Green moong, green vegetables, green cloth or books on Wednesday', 'बुधवार को हरी मूंग, हरी सब्ज़ियाँ, हरा वस्त्र या पुस्तकों का दान'),
    actions: [
      p('Offer durva grass to Lord Ganesha on Wednesdays.', 'बुधवार को श्री गणेश को दूर्वा अर्पित करें।'),
      p('Feed green grass to cows.', 'गायों को हरा चारा खिलाएँ।'),
      p('Speak truthfully and politely; keep your word in business dealings.', 'सत्य और विनम्रता से बोलें; व्यापार में अपनी बात पर टिके रहें।'),
      p('Respect your sisters, aunts and young girls; help students with books.', 'बहनों, बुआ-मौसी और कन्याओं का सम्मान करें; विद्यार्थियों को पुस्तकें दें।'),
    ],
  },
  jupiter: {
    mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः',
    japa: 19000,
    day: p('Thursday', 'गुरुवार'),
    deity: p('Lord Vishnu · Guru / Brihaspati', 'भगवान विष्णु · गुरु / बृहस्पति देव'),
    color: p('Yellow', 'पीला'),
    gem: p('Yellow Sapphire (Pukhraj) in gold, index finger, on a Thursday morning', 'पुखराज, सोने में, तर्जनी में, गुरुवार प्रातः'),
    daan: p('Chana dal, turmeric, yellow cloth, bananas or religious books on Thursday', 'गुरुवार को चने की दाल, हल्दी, पीला वस्त्र, केले या धार्मिक पुस्तकों का दान'),
    actions: [
      p('Worship Lord Vishnu on Thursday and water a banana plant.', 'गुरुवार को भगवान विष्णु की पूजा करें और केले के पौधे में जल दें।'),
      p('Apply a tilak of turmeric or saffron on the forehead.', 'माथे पर हल्दी या केसर का तिलक लगाएँ।'),
      p('Respect teachers, priests and elders; never insult your guru.', 'गुरुजनों, पुरोहितों और बड़ों का सम्मान करें; गुरु का अपमान कभी न करें।'),
      p('Keep a Thursday fast with one meal of yellow food.', 'गुरुवार का व्रत रखें और एक समय पीला भोजन करें।'),
    ],
  },
  venus: {
    mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः',
    japa: 16000,
    day: p('Friday', 'शुक्रवार'),
    deity: p('Goddess Lakshmi · Shri Suktam', 'माता लक्ष्मी · श्री सूक्त'),
    color: p('White, pink', 'सफ़ेद, गुलाबी'),
    gem: p('Diamond (Heera) or Opal in silver or platinum, middle or ring finger, on a Friday', 'हीरा या ओपल, चाँदी या प्लैटिनम में, मध्यमा या अनामिका में, शुक्रवार'),
    daan: p('Rice, sugar, curd, white clothes, perfume or cosmetics to women on Friday', 'शुक्रवार को चावल, शक्कर, दही, सफ़ेद वस्त्र, इत्र या शृंगार सामग्री का दान'),
    actions: [
      p('Worship Goddess Lakshmi on Friday and offer white flowers and kheer.', 'शुक्रवार को माता लक्ष्मी की पूजा करें, सफ़ेद फूल और खीर अर्पित करें।'),
      p('Respect women, especially your wife; keep relationships loyal and honest.', 'स्त्रियों का, विशेषकर पत्नी का सम्मान करें; संबंधों में निष्ठा और ईमानदारी रखें।'),
      p('Keep yourself and your home clean and fragrant; wear clean, bright clothes.', 'स्वयं और घर को स्वच्छ व सुगंधित रखें; साफ़, उजले वस्त्र पहनें।'),
      p('Feed cows and help in the marriage of a poor girl if possible.', 'गायों को भोजन दें और संभव हो तो किसी निर्धन कन्या के विवाह में सहायता करें।'),
    ],
  },
  saturn: {
    mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः',
    japa: 23000,
    day: p('Saturday', 'शनिवार'),
    deity: p('Shani Dev and Hanuman ji · Shani Chalisa / Hanuman Chalisa', 'शनि देव और हनुमान जी · शनि चालीसा / हनुमान चालीसा'),
    color: p('Black, dark blue', 'काला, गहरा नीला'),
    gem: p('Blue Sapphire (Neelam) in silver or panchdhatu, middle finger, on a Saturday — wear only after a trial and expert advice, as it acts strongly', 'नीलम, चाँदी या पंचधातु में, मध्यमा में, शनिवार — इसका प्रभाव तीव्र होता है, इसलिए परीक्षण और विशेषज्ञ सलाह के बाद ही पहनें'),
    daan: p('Black sesame, urad dal, mustard oil, iron, black cloth or blankets to the needy on Saturday', 'शनिवार को काले तिल, उड़द, सरसों का तेल, लोहा, काला वस्त्र या कंबल ज़रूरतमंदों को दान'),
    actions: [
      p('Light a mustard-oil lamp under a peepal tree on Saturday evening.', 'शनिवार शाम पीपल के पेड़ के नीचे सरसों के तेल का दीपक जलाएँ।'),
      p('Recite Hanuman Chalisa and Shani Chalisa on Saturdays.', 'शनिवार को हनुमान चालीसा और शनि चालीसा का पाठ करें।'),
      p('Serve the elderly, labourers and the poor; treat employees fairly.', 'बुज़ुर्गों, श्रमिकों और गरीबों की सेवा करें; कर्मचारियों के साथ न्याय करें।'),
      p('Avoid alcohol, non-vegetarian food on Saturdays, lying and cheating.', 'शनिवार को मद्य और मांसाहार से बचें; झूठ और धोखे से दूर रहें।'),
    ],
  },
  rahu: {
    mantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः',
    japa: 18000,
    day: p('Saturday', 'शनिवार'),
    deity: p('Goddess Durga · Durga Saptashati / Durga Chalisa', 'माँ दुर्गा · दुर्गा सप्तशती / दुर्गा चालीसा'),
    color: p('Dark blue, smoky grey', 'गहरा नीला, धूसर'),
    gem: p('Hessonite (Gomed) in silver or panchdhatu, middle finger, on a Saturday — only after expert advice', 'गोमेद, चाँदी या पंचधातु में, मध्यमा में, शनिवार — केवल विशेषज्ञ सलाह के बाद'),
    daan: p('Blanket, coconut, mustard, black sesame or blue cloth on Saturday', 'शनिवार को कंबल, नारियल, सरसों, काले तिल या नीले वस्त्र का दान'),
    actions: [
      p('Worship Goddess Durga and recite Durga Chalisa, especially during Navratri.', 'माँ दुर्गा की उपासना करें और दुर्गा चालीसा पढ़ें, विशेषकर नवरात्रि में।'),
      p('Float a coconut or a few coal pieces in flowing water on a Saturday.', 'शनिवार को बहते जल में नारियल या कोयले के कुछ टुकड़े प्रवाहित करें।'),
      p('Stay away from intoxicants, gambling and shortcuts.', 'नशे, जुए और शॉर्टकट से दूर रहें।'),
      p('Keep good relations with in-laws and maternal grandparents.', 'ससुराल पक्ष और ननिहाल से अच्छे संबंध रखें।'),
    ],
  },
  ketu: {
    mantra: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः',
    japa: 17000,
    day: p('Tuesday or Saturday', 'मंगलवार या शनिवार'),
    deity: p('Lord Ganesha · Ganesh Atharvashirsha', 'श्री गणेश · गणेश अथर्वशीर्ष'),
    color: p('Grey, multicoloured', 'धूसर, चितकबरा'),
    gem: p('Cat’s Eye (Lahsuniya) in silver, little or middle finger — only after expert advice', 'लहसुनिया, चाँदी में, कनिष्ठिका या मध्यमा में — केवल विशेषज्ञ सलाह के बाद'),
    daan: p('Multicoloured blanket, sesame seeds or seven grains (saptadhanya)', 'चितकबरा कंबल, तिल या सप्तधान्य का दान'),
    actions: [
      p('Worship Lord Ganesha daily and recite Ganesh Atharvashirsha on Tuesdays.', 'प्रतिदिन श्री गणेश की पूजा करें और मंगलवार को गणेश अथर्वशीर्ष का पाठ करें।'),
      p('Feed stray dogs, especially black-and-white ones.', 'आवारा कुत्तों को, विशेषकर काले-सफ़ेद कुत्तों को भोजन दें।'),
      p('Practise meditation and spend time on spiritual study.', 'ध्यान करें और आध्यात्मिक अध्ययन में समय दें।'),
      p('Help sick people and donate to temples or ashrams.', 'रोगियों की सहायता करें और मंदिर या आश्रम में दान दें।'),
    ],
  },
};

export const DOSHA_UPAY = {
  manglik: [
    p('Recite Hanuman Chalisa daily and Sundar Kand on Tuesdays; offer sindoor to Hanuman ji.', 'प्रतिदिन हनुमान चालीसा और मंगलवार को सुंदरकांड का पाठ करें; हनुमान जी को सिंदूर चढ़ाएँ।'),
    p('Match the Kundli carefully before marriage; Manglik dosha is often cancelled when the partner is also Manglik.', 'विवाह से पहले कुंडली मिलान ध्यान से कराएँ; जीवनसाथी के भी मांगलिक होने पर दोष प्रायः निरस्त हो जाता है।'),
    p('Perform Mangal Shanti or Mangal-Chandika path, or Kumbh Vivah, with a learned pandit if advised.', 'सलाह मिलने पर विद्वान पंडित से मंगल शांति, मंगल-चंडिका पाठ या कुंभ विवाह कराएँ।'),
    p('Keep a Tuesday fast and donate red lentils and jaggery.', 'मंगलवार का व्रत रखें और मसूर दाल व गुड़ का दान करें।'),
  ],
  kaalsarp: [
    p('Chant "ॐ नमः शिवाय" daily and offer water and milk to the Shivling on Mondays.', 'प्रतिदिन "ॐ नमः शिवाय" का जाप करें और सोमवार को शिवलिंग पर जल व दूध चढ़ाएँ।'),
    p('Recite the Maha Mrityunjaya mantra 108 times daily.', 'प्रतिदिन 108 बार महामृत्युंजय मंत्र का जाप करें।'),
    p('Offer a pair of silver snakes at a Shiva temple on Nag Panchami.', 'नाग पंचमी पर शिव मंदिर में चाँदी के नाग-नागिन का जोड़ा अर्पित करें।'),
    p('Kaal Sarp Shanti puja at Trimbakeshwar or Ujjain can be done with expert guidance.', 'विशेषज्ञ मार्गदर्शन में त्र्यंबकेश्वर या उज्जैन में कालसर्प शांति पूजा कराई जा सकती है।'),
  ],
  grahan: [
    p('Chant the Maha Mrityunjaya mantra or Aditya Hridaya Stotra regularly.', 'महामृत्युंजय मंत्र या आदित्य हृदय स्तोत्र का नियमित पाठ करें।'),
    p('Donate on eclipse days and take a bath after the eclipse ends.', 'ग्रहण के दिन दान करें और ग्रहण समाप्त होने पर स्नान करें।'),
    p('Worship Lord Shiva on Mondays and Goddess Durga on Saturdays.', 'सोमवार को भगवान शिव और शनिवार को माँ दुर्गा की उपासना करें।'),
  ],
  sadesati: [
    p('Light a mustard-oil lamp under a peepal tree every Saturday evening.', 'हर शनिवार शाम पीपल के नीचे सरसों के तेल का दीपक जलाएँ।'),
    p('Recite Hanuman Chalisa daily; Hanuman ji protects from Shani’s hardships.', 'प्रतिदिन हनुमान चालीसा का पाठ करें; हनुमान जी शनि के कष्टों से रक्षा करते हैं।'),
    p('Donate black sesame, urad dal, mustard oil or blankets on Saturday.', 'शनिवार को काले तिल, उड़द, सरसों का तेल या कंबल दान करें।'),
    p('Be honest, patient and hardworking; Shani rewards discipline and punishes shortcuts.', 'ईमानदार, धैर्यवान और परिश्रमी रहें; शनि अनुशासन का फल देते हैं और शॉर्टकट का दंड।'),
  ],
};

export const GENERAL_UPAY = [
  p('Start the day with a short prayer or the Gayatri mantra, and offer water to the Sun.', 'दिन की शुरुआत छोटी प्रार्थना या गायत्री मंत्र से करें और सूर्य को जल अर्पित करें।'),
  p('Respect parents, teachers and elders — this strengthens the Sun, Moon and Jupiter together.', 'माता-पिता, गुरुजनों और बड़ों का सम्मान करें — इससे सूर्य, चंद्र और गुरु एक साथ बलवान होते हैं।'),
  p('Feed birds, cows or dogs regularly and donate according to your means.', 'पक्षियों, गायों या कुत्तों को नियमित भोजन दें और सामर्थ्य अनुसार दान करें।'),
  p('Chant the Navagraha mantra on your birthday and during your dasha changes.', 'जन्मदिन पर और दशा बदलने के समय नवग्रह मंत्र का जाप करें।'),
];
