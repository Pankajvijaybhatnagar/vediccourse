// Upay for each weekday (0 = Sunday), by its ruling planet and deity.

const p = (en, hi) => ({ en, hi });

export const VAAR_UPAY = [
  {
    planet: p('Sun', 'सूर्य'),
    deity: p('Surya Dev', 'सूर्य देव'),
    color: { name: p('Orange / red', 'नारंगी / लाल'), hex: '#f0782a' },
    mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः॥',
    count: 7000,
    upay: [
      p('Offer water to the rising Sun from a copper lota with red flowers and roli.', 'ताँबे के लोटे में लाल पुष्प और रोली डालकर उगते सूर्य को जल दें।'),
      p('Recite the Aditya Hridaya Stotra; touch your father’s feet for blessings.', 'आदित्य हृदय स्तोत्र का पाठ करें; पिता के चरण स्पर्श कर आशीर्वाद लें।'),
    ],
    daan: p('Wheat, jaggery, copper or red cloth', 'गेहूँ, गुड़, ताँबा या लाल वस्त्र'),
    avoid: p('Avoid salt in the vrat, blue/black clothes and selling copper today.', 'व्रत में नमक, नीले/काले वस्त्र और आज ताँबा बेचने से बचें।'),
  },
  {
    planet: p('Moon', 'चंद्र'),
    deity: p('Lord Shiva', 'भगवान शिव'),
    color: { name: p('White', 'सफ़ेद'), hex: '#eef0f3' },
    mantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः॥',
    count: 11000,
    upay: [
      p('Offer raw milk mixed with water and bel patra on the Shivling and chant “ॐ नमः शिवाय”.', 'शिवलिंग पर जल मिला कच्चा दूध और बेलपत्र चढ़ाएँ तथा “ॐ नमः शिवाय” का जाप करें।'),
      p('Keep the Somvar vrat for peace of mind and a good life partner.', 'मन की शांति और योग्य जीवनसाथी के लिए सोमवार व्रत रखें।'),
    ],
    daan: p('Rice, milk, curd, white cloth or silver', 'चावल, दूध, दही, सफ़ेद वस्त्र या चाँदी'),
    avoid: p('Avoid quarrelling with your mother and travelling north-west without need.', 'माता से विवाद और बिना आवश्यकता उत्तर-पश्चिम यात्रा से बचें।'),
  },
  {
    planet: p('Mars', 'मंगल'),
    deity: p('Hanuman ji', 'हनुमान जी'),
    color: { name: p('Red', 'लाल'), hex: '#d3352e' },
    mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः॥',
    count: 10000,
    upay: [
      p('Recite the Hanuman Chalisa or Sunderkand and offer sindoor with jasmine oil and a red chola.', 'हनुमान चालीसा या सुंदरकांड का पाठ करें और चमेली के तेल के साथ सिंदूर व लाल चोला अर्पित करें।'),
      p('Offer boondi or besan laddoo — helpful for Mangal dosha, debt and land disputes.', 'बूंदी या बेसन के लड्डू का भोग लगाएँ — मंगल दोष, कर्ज़ और भूमि विवाद में सहायक।'),
    ],
    daan: p('Red lentils (masoor), jaggery or red cloth', 'लाल मसूर, गुड़ या लाल वस्त्र'),
    avoid: p('Avoid haircut, shaving, buying iron/ sharp items, meat and alcohol; do not lend money today.', 'बाल-दाढ़ी कटवाने, लोहा/ धारदार वस्तु खरीदने, मांस और मदिरा से बचें; आज उधार न दें।'),
  },
  {
    planet: p('Mercury', 'बुध'),
    deity: p('Shri Ganesh', 'श्री गणेश'),
    color: { name: p('Green', 'हरा'), hex: '#3a9a4b' },
    mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः॥',
    count: 9000,
    upay: [
      p('Offer durva and modak to Ganesh ji and feed green grass to a cow.', 'गणेश जी को दूर्वा और मोदक अर्पित करें और गाय को हरा चारा खिलाएँ।'),
      p('Good for starting business deals, studies and paperwork.', 'व्यापारिक सौदे, अध्ययन और लिखा-पढ़ी शुरू करने के लिए अच्छा दिन।'),
    ],
    daan: p('Green moong, green vegetables or books to students', 'हरी मूँग, हरी सब्ज़ियाँ या विद्यार्थियों को पुस्तकें'),
    avoid: p('Avoid lending money and travelling north-east; respect sisters and daughters.', 'उधार देने और उत्तर-पूर्व यात्रा से बचें; बहन-बेटियों का सम्मान करें।'),
  },
  {
    planet: p('Jupiter', 'बृहस्पति'),
    deity: p('Lord Vishnu & Brihaspati Dev', 'भगवान विष्णु एवं बृहस्पति देव'),
    color: { name: p('Yellow', 'पीला'), hex: '#f2bd2c' },
    mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः॥',
    count: 19000,
    upay: [
      p('Offer chana dal, jaggery and yellow flowers to Vishnu ji and water the banana tree.', 'विष्णु जी को चने की दाल, गुड़ और पीले पुष्प अर्पित करें तथा केले के पेड़ में जल दें।'),
      p('Apply a turmeric or saffron tilak; read the Brihaspativar vrat katha.', 'हल्दी या केसर का तिलक लगाएँ; बृहस्पतिवार व्रत कथा पढ़ें।'),
    ],
    daan: p('Chana dal, turmeric, yellow cloth or religious books', 'चने की दाल, हल्दी, पीला वस्त्र या धार्मिक पुस्तकें'),
    avoid: p('Avoid washing hair, cutting nails, shaving and lending money; do not disrespect teachers.', 'बाल धोने, नाखून काटने, दाढ़ी बनाने और उधार देने से बचें; गुरुओं का अनादर न करें।'),
  },
  {
    planet: p('Venus', 'शुक्र'),
    deity: p('Maa Lakshmi & Santoshi Mata', 'माँ लक्ष्मी एवं संतोषी माता'),
    color: { name: p('White / pink', 'सफ़ेद / गुलाबी'), hex: '#f3a9c4' },
    mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः॥',
    count: 16000,
    upay: [
      p('Offer kheer, white flowers and perfume to Maa Lakshmi and recite the Shri Suktam.', 'माँ लक्ष्मी को खीर, सफ़ेद पुष्प और इत्र अर्पित कर श्री सूक्त का पाठ करें।'),
      p('Keep a small amount of rice and a silver coin in the cash box for steady income.', 'स्थिर आय के लिए तिजोरी में थोड़े चावल और चाँदी का सिक्का रखें।'),
    ],
    daan: p('Rice, sugar, curd, white cloth or perfume to a woman', 'चावल, चीनी, दही, सफ़ेद वस्त्र या किसी महिला को इत्र'),
    avoid: p('Those keeping the Santoshi vrat must avoid anything sour; do not insult women.', 'संतोषी व्रत रखने वाले खट्टी चीज़ों से बचें; महिलाओं का अपमान न करें।'),
  },
  {
    planet: p('Saturn', 'शनि'),
    deity: p('Shani Dev & Hanuman ji', 'शनि देव एवं हनुमान जी'),
    color: { name: p('Black / dark blue', 'काला / गहरा नीला'), hex: '#2d3a5a' },
    mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥',
    count: 23000,
    upay: [
      p('Light a mustard-oil lamp under a peepal tree in the evening and recite the Shani Chalisa.', 'शाम को पीपल के नीचे सरसों के तेल का दीपक जलाकर शनि चालीसा का पाठ करें।'),
      p('Do “chhaya daan”: see your face in mustard oil in a steel bowl and donate it — eases sade-sati and dhaiyya.', '“छाया दान” करें: स्टील की कटोरी में सरसों के तेल में अपना चेहरा देखकर दान करें — साढ़ेसाती और ढैय्या में राहत।'),
      p('Serve workers, labourers or the elderly — Shani is pleased by humility.', 'मज़दूरों, श्रमिकों या बुज़ुर्गों की सेवा करें — शनि विनम्रता से प्रसन्न होते हैं।'),
    ],
    daan: p('Black til, urad, mustard oil, iron or black blanket', 'काले तिल, उड़द, सरसों का तेल, लोहा या काला कंबल'),
    avoid: p('Do not buy oil, iron, salt or black shoes today; avoid meat and alcohol.', 'आज तेल, लोहा, नमक या काले जूते न खरीदें; मांस और मदिरा से बचें।'),
  },
];
