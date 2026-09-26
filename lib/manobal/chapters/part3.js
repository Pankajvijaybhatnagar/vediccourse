// मनोबल — अध्याय 9–12 (bilingual { en, hi })
const b = (en, hi) => ({ en, hi });

export const PART3 = [
  /* ===================================================================== 9 */
  {
    slug: 'sambandh-aur-samvad',
    number: 9,
    icon: '🤝',
    tone: 'rose',
    minutes: 15,
    audience: b('All ages', 'सभी आयु'),
    title: b('Relationships & Communication', 'संबंध और संवाद'),
    subtitle: b('Family, friends, loneliness and asking for help', 'परिवार, मित्र, अकेलापन और सहायता माँगना'),
    intro: b(
      'Humans are wired for connection. Good relationships are one of the strongest protectors of mental health, while conflict and loneliness can drain us. The good news is that communication is a skill — and skills can be learned. This chapter gives simple tools for family conflict, friendships, boundaries, breakups, peer pressure and bullying.',
      'मनुष्य संबंधों के लिए बना है। अच्छे संबंध मानसिक स्वास्थ्य के सबसे बड़े रक्षकों में से एक हैं, जबकि कलह और अकेलापन हमें थका देते हैं। शुभ समाचार यह है कि संवाद एक कौशल है — और कौशल सीखे जा सकते हैं। यह अध्याय पारिवारिक कलह, मित्रता, सीमाएँ, संबंध टूटना, साथियों का दबाव और उत्पीड़न के लिए सरल उपाय देता है।'
    ),
    sections: [
      {
        heading: b('Speak with “I” statements', '“मैं” वाले वाक्यों में बोलें'),
        paragraphs: [
          b('“You never listen!” makes people defensive. “I feel hurt when I’m interrupted; I’d like to finish my point” invites understanding. The formula: I feel ___ when ___ because ___. I would like ___.', '“तुम कभी सुनते ही नहीं!” से सामने वाला रक्षात्मक हो जाता है। “जब मुझे बीच में टोका जाता है तो मुझे दुख होता है; मैं अपनी बात पूरी करना चाहता/चाहती हूँ” — इससे समझ बढ़ती है। सूत्र: मुझे ___ अनुभव होता है जब ___ क्योंकि ___। मैं चाहता/चाहती हूँ कि ___।'),
        ],
        example: b(
          'Instead of “Mummy, you always compare me with Didi,” try: “Mummy, I feel small when I’m compared with Didi, because I’m trying my best in my own way. I’d love it if you noticed my progress.”',
          '“मम्मी, आप हमेशा मेरी तुलना दीदी से करती हो” के बजाय कहें: “मम्मी, जब मेरी तुलना दीदी से होती है तो मैं स्वयं को छोटा अनुभव करता/करती हूँ, क्योंकि मैं अपने ढंग से पूरा प्रयास कर रहा/रही हूँ। मुझे अच्छा लगेगा अगर आप मेरी प्रगति पर ध्यान दें।”'
        ),
      },
      {
        heading: b('Active listening', 'सक्रिय श्रवण'),
        paragraphs: [b('Most conflicts soften when people feel truly heard.', 'जब लोगों को लगता है कि उन्हें सच में सुना गया, तो अधिकतर विवाद नरम पड़ जाते हैं।')],
        points: [
          b('Put the phone down and look at the person.', 'फ़ोन रखें और व्यक्ति की ओर देखें।'),
          b('Let them finish before replying.', 'उत्तर देने से पहले उन्हें बात पूरी करने दें।'),
          b('Reflect back: “So you felt ignored when…”', 'दोहराकर बताएँ: “तो आपको लगा कि आपकी उपेक्षा हुई जब…”'),
          b('Ask: “What would help right now?”', 'पूछें: “अभी किस बात से सहायता मिलेगी?”'),
        ],
      },
      {
        heading: b('Healthy boundaries', 'स्वस्थ सीमाएँ'),
        paragraphs: [
          b('A boundary is a kind but clear line that protects your time, energy and values. Saying “no” to one thing is saying “yes” to your wellbeing. Boundaries are not walls; they make relationships more honest.', 'सीमा एक विनम्र पर स्पष्ट रेखा है जो आपके समय, ऊर्जा और मूल्यों की रक्षा करती है। किसी एक बात को “ना” कहना अपने कल्याण को “हाँ” कहना है। सीमाएँ दीवारें नहीं हैं; वे संबंधों को अधिक सच्चा बनाती हैं।'),
        ],
        points: [
          b('“I can help with this on Sunday, not tonight.”', '“मैं इसमें रविवार को सहायता कर सकता/सकती हूँ, आज रात नहीं।”'),
          b('“I’m not comfortable discussing my marks with relatives.”', '“मुझे रिश्तेदारों से अपने अंकों पर चर्चा करना ठीक नहीं लगता।”'),
          b('“I need an hour to myself after work, then let’s talk.”', '“काम के बाद मुझे एक घंटा अपने लिए चाहिए, फिर बात करते हैं।”'),
        ],
      },
      {
        heading: b('Loneliness', 'अकेलापन'),
        paragraphs: [
          b('You can feel lonely even in a full house. Loneliness is a signal — like hunger — that we need connection. Start small: reply to a group message, join a class, club, satsang or volunteering group, call an old friend, or talk to a neighbour. Quality matters more than numbers — one trusted person makes a big difference.', 'भरे घर में भी अकेलापन अनुभव हो सकता है। अकेलापन एक संकेत है — भूख की तरह — कि हमें जुड़ाव चाहिए। छोटे से आरंभ करें: समूह संदेश का उत्तर दें, किसी कक्षा, क्लब, सत्संग या सेवा समूह से जुड़ें, पुराने मित्र को फ़ोन करें, या पड़ोसी से बात करें। संख्या से अधिक गुणवत्ता महत्वपूर्ण है — एक विश्वसनीय व्यक्ति बड़ा अंतर ला देता है।'),
        ],
      },
      {
        heading: b('Breakups and loss', 'संबंध टूटना और खोना'),
        paragraphs: [
          b('The end of a relationship can hurt like physical pain — the same brain areas are involved. Allow yourself to grieve. Limit checking their social media, lean on friends, keep your routine and sleep, and avoid big decisions for a few weeks. Healing is not a straight line, but it does come.', 'किसी संबंध का अंत शारीरिक पीड़ा जैसा दुख दे सकता है — मस्तिष्क के वही भाग सक्रिय होते हैं। स्वयं को शोक करने दें। उनका सोशल मीडिया देखना सीमित करें, मित्रों का सहारा लें, दिनचर्या और नींद बनाए रखें, और कुछ सप्ताह बड़े निर्णयों से बचें। घाव भरना सीधी रेखा नहीं है, पर वह भरता अवश्य है।'),
        ],
      },
      {
        heading: b('Peer pressure', 'साथियों का दबाव'),
        paragraphs: [b('Wanting to belong is natural, but real friends accept your “no”.', 'समूह का हिस्सा बनने की इच्छा स्वाभाविक है, पर सच्चे मित्र आपकी “ना” को स्वीकार करते हैं।')],
        points: [
          b('Prepare a simple line: “No thanks, not my thing.”', 'एक सरल वाक्य तैयार रखें: “नहीं धन्यवाद, यह मेरे लिए नहीं है।”'),
          b('Suggest an alternative plan.', 'कोई दूसरी योजना सुझाएँ।'),
          b('Stay with friends who share your values.', 'उन मित्रों के साथ रहें जो आपके मूल्यों को मानते हैं।'),
          b('It’s okay to leave a situation that feels wrong.', 'जो स्थिति गलत लगे, उसे छोड़ देना ठीक है।'),
        ],
      },
      {
        heading: b('Bullying and online harassment', 'उत्पीड़न और ऑनलाइन परेशान करना'),
        paragraphs: [
          b('Bullying — in person or online — is never your fault. Do not reply to the bully. Save screenshots as evidence, block and report the account, and tell a trusted adult, teacher or HR. In India, cyber harassment can be reported at cybercrime.gov.in or the national helpline 1930.', 'उत्पीड़न — आमने-सामने या ऑनलाइन — कभी आपकी गलती नहीं है। परेशान करने वाले को उत्तर न दें। प्रमाण के रूप में स्क्रीनशॉट सहेजें, खाते को ब्लॉक और रिपोर्ट करें, और किसी विश्वसनीय बड़े, शिक्षक या कार्यालय के HR को बताएँ। भारत में साइबर उत्पीड़न की शिकायत cybercrime.gov.in पर या राष्ट्रीय हेल्पलाइन 1930 पर की जा सकती है।'),
        ],
        tip: b('Asking for help is brave. Talk to someone the same day things feel unsafe.', 'सहायता माँगना साहस है। जिस दिन असुरक्षित लगे, उसी दिन किसी से बात करें।'),
      },
    ],
    astro: {
      heading: b('Astrological view: Venus, the 7th house and harmony', 'ज्योतिष दृष्टि: शुक्र, सप्तम भाव और सामंजस्य'),
      paragraphs: [
        b('In the chart, the 4th house relates to mother and home, the 7th to partnerships, the 11th to friends, and Venus (शुक्र) to love and harmony. Mars and Saturn influences are often linked with friction. Astrology can make us aware of patterns in relationships — but it is kind words and patience that heal them. Many families find that praying together or sharing a meal daily brings closeness.', 'कुंडली में चतुर्थ भाव माता और घर से, सप्तम साझेदारी से, एकादश मित्रों से, और शुक्र प्रेम तथा सामंजस्य से जुड़ा है। मंगल और शनि के प्रभाव को प्रायः टकराव से जोड़ा जाता है। ज्योतिष संबंधों के पैटर्न के प्रति जागरूक कर सकता है — पर उन्हें मधुर वचन और धैर्य ही ठीक करते हैं। बहुत से परिवार पाते हैं कि साथ में प्रार्थना करना या प्रतिदिन साथ भोजन करना निकटता लाता है।'),
      ],
      mantra: { text: 'ॐ शुं शुक्राय नमः॥', meaning: b('Salutations to Shukra (Venus) — traditionally chanted for harmony and affection.', 'शुक्र को नमस्कार — परंपरागत रूप से सामंजस्य और स्नेह के लिए जपा जाता है।') },
    },
    practice: {
      tool: null,
      title: b('One conversation this week', 'इस सप्ताह एक बातचीत'),
      steps: [
        b('Pick one relationship you want to improve.', 'एक संबंध चुनें जिसे आप सुधारना चाहते हैं।'),
        b('Write your “I feel… when… because… I’d like…” sentence.', 'अपना “मुझे… अनुभव होता है जब… क्योंकि… मैं चाहता/चाहती हूँ…” वाक्य लिखें।'),
        b('Choose a calm time, speak it, and then listen actively.', 'शांत समय चुनें, उसे कहें, और फिर सक्रिय रूप से सुनें।'),
      ],
    },
    reflect: [
      b('Which relationship in my life needs the most care right now?', 'मेरे जीवन में इस समय किस संबंध को सबसे अधिक देखभाल की आवश्यकता है?'),
      b('Where do I need to set a kind boundary?', 'मुझे कहाँ एक विनम्र सीमा तय करनी है?'),
      b('Who are the people I can call when things are hard?', 'कठिन समय में मैं किन लोगों को फ़ोन कर सकता/सकती हूँ?'),
    ],
    summary: [
      b('Use “I” statements and active listening to reduce conflict.', 'विवाद घटाने के लिए “मैं” वाले वाक्य और सक्रिय श्रवण अपनाएँ।'),
      b('Boundaries protect wellbeing and make relationships honest.', 'सीमाएँ कल्याण की रक्षा करती हैं और संबंधों को सच्चा बनाती हैं।'),
      b('Loneliness is a signal to connect — start small.', 'अकेलापन जुड़ने का संकेत है — छोटे से आरंभ करें।'),
      b('Bullying is never your fault — save evidence, block, report and tell someone.', 'उत्पीड़न कभी आपकी गलती नहीं — प्रमाण सहेजें, ब्लॉक करें, रिपोर्ट करें और किसी को बताएँ।'),
    ],
  },

  /* ===================================================================== 10 */
  {
    slug: 'grah-aur-man',
    number: 10,
    icon: '🪐',
    tone: 'indigo',
    minutes: 16,
    audience: b('All ages', 'सभी आयु'),
    title: b('The Planets & the Mind', 'ग्रह और मन'),
    subtitle: b('What Jyotish says about emotions — and calming remedies', 'भावनाओं के बारे में ज्योतिष क्या कहता है — और शांतिदायक उपाय'),
    intro: b(
      'Vedic astrology has always paid deep attention to the mind. Each planet is linked with certain qualities of thought and emotion. Understanding these can help you know yourself better and choose supportive practices. This chapter explains the key planets for mental wellbeing with a balanced, fear-free approach: planets show tendencies and seasons of life, and our actions shape how we move through them.',
      'वैदिक ज्योतिष ने सदा मन पर गहरा ध्यान दिया है। हर ग्रह विचार और भावना के कुछ गुणों से जुड़ा है। इन्हें समझने से आप स्वयं को बेहतर जान सकते हैं और सहायक अभ्यास चुन सकते हैं। यह अध्याय मानसिक कल्याण के प्रमुख ग्रहों को संतुलित और भयमुक्त दृष्टि से समझाता है: ग्रह प्रवृत्तियाँ और जीवन के मौसम दिखाते हैं, और हमारे कर्म तय करते हैं कि हम उनसे कैसे गुज़रें।'
    ),
    sections: [
      {
        heading: b('Chandra (Moon) — the mind itself', 'चंद्रमा — स्वयं मन'),
        paragraphs: [
          b('The Moon is the कारक (significator) of मन. Your Moon sign (राशि) describes your emotional nature — a Moon in Cancer may be deeply caring and sensitive, a Moon in Aquarius more detached and idealistic. A waxing, bright Moon at birth is traditionally linked with emotional resilience, while a Moon close to Rahu, Ketu or Saturn is linked with sensitivity and worry.', 'चंद्रमा मन का कारक है। आपकी चंद्र राशि आपके भावनात्मक स्वभाव का वर्णन करती है — कर्क का चंद्रमा अत्यंत देखभाल करने वाला और संवेदनशील, कुंभ का चंद्रमा अधिक तटस्थ और आदर्शवादी हो सकता है। जन्म के समय शुक्ल पक्ष का उज्ज्वल चंद्रमा परंपरागत रूप से भावनात्मक दृढ़ता से, जबकि राहु, केतु या शनि के निकट चंद्रमा संवेदनशीलता और चिंता से जोड़ा जाता है।'),
          b('Many people notice feeling more emotional around the full moon (पूर्णिमा) and new moon (अमावस्या). Being aware of this can help you plan rest and be gentle with yourself.', 'बहुत से लोग पूर्णिमा और अमावस्या के आसपास अधिक भावुक अनुभव करते हैं। इसके प्रति जागरूक रहकर आप विश्राम की योजना बना सकते हैं और स्वयं के प्रति कोमल रह सकते हैं।'),
        ],
      },
      {
        heading: b('Budh (Mercury) — intellect and nerves', 'बुध — बुद्धि और तंत्रिकाएँ'),
        paragraphs: [
          b('Mercury governs reasoning, speech, learning and the nervous system. A strong Mercury helps us think clearly under pressure; a stressed Mercury is linked with overthinking and nervousness. Journaling, puzzles, learning and CBT-style thinking (Chapter 3) are natural ways to “strengthen Budh”.', 'बुध तर्क, वाणी, अध्ययन और तंत्रिका तंत्र का स्वामी है। बलवान बुध दबाव में स्पष्ट सोचने में सहायता करता है; पीड़ित बुध अत्यधिक सोचने और घबराहट से जोड़ा जाता है। डायरी लेखन, पहेलियाँ, अध्ययन और विचार जाँचने का अभ्यास (अध्याय 3) “बुध को बल देने” के स्वाभाविक उपाय हैं।'),
        ],
      },
      {
        heading: b('Shani (Saturn) — Sade Sati as a teacher, not a punishment', 'शनि — साढ़ेसाती दंड नहीं, शिक्षक है'),
        paragraphs: [
          b('Sade Sati is the roughly 7½-year period when Saturn transits the signs before, on and after your Moon sign; Dhaiya (ढैया) is a 2½-year period when Saturn transits the 4th or 8th from the Moon. These periods are famous for being difficult, and many people fear them.', 'साढ़ेसाती वह लगभग साढ़े सात वर्ष की अवधि है जब शनि आपकी चंद्र राशि से पहले, उस पर और उसके बाद वाली राशि में गोचर करता है; ढैया ढाई वर्ष की अवधि है जब शनि चंद्रमा से चौथे या आठवें भाव में होता है। ये अवधियाँ कठिन मानी जाती हैं और बहुत से लोग इनसे डरते हैं।'),
          b('A balanced view: Saturn is the planet of discipline, patience and maturity. These periods often bring responsibility and slower results — but also lasting growth, especially for those who work honestly and serve others. Everyone goes through Sade Sati two or three times in life; it is a season, not a sentence.', 'संतुलित दृष्टि: शनि अनुशासन, धैर्य और परिपक्वता का ग्रह है। ये अवधियाँ प्रायः ज़िम्मेदारी और धीमे परिणाम लाती हैं — पर स्थायी विकास भी, विशेषकर उनके लिए जो ईमानदारी से कर्म और दूसरों की सेवा करते हैं। हर व्यक्ति जीवन में दो-तीन बार साढ़ेसाती से गुज़रता है; यह एक मौसम है, दंड नहीं।'),
        ],
        tip: b('Saturn rewards routine, hard work, humility and service to those in need.', 'शनि दिनचर्या, परिश्रम, विनम्रता और ज़रूरतमंदों की सेवा को पुरस्कृत करता है।'),
      },
      {
        heading: b('Rahu & Ketu — restlessness and detachment', 'राहु और केतु — बेचैनी और वैराग्य'),
        paragraphs: [
          b('Rahu is linked with desire, obsession, confusion and a restless, anxious mind — and also with innovation and ambition. Ketu is linked with detachment, spirituality and sometimes a sense of emptiness or confusion about direction. Grounding practices, routine, meditation and serving others are the classical ways to balance both.', 'राहु इच्छा, जुनून, भ्रम और बेचैन, चिंतित मन से — और नवाचार तथा महत्वाकांक्षा से भी — जुड़ा है। केतु वैराग्य, अध्यात्म और कभी-कभी खालीपन या दिशा के भ्रम से जुड़ा है। स्थिरता देने वाले अभ्यास, दिनचर्या, ध्यान और सेवा दोनों को संतुलित करने के शास्त्रीय उपाय हैं।'),
        ],
      },
      {
        heading: b('Guru (Jupiter) — hope and wisdom', 'गुरु (बृहस्पति) — आशा और ज्ञान'),
        paragraphs: [
          b('Jupiter is the great benefic — the planet of faith, optimism, wisdom and good guidance. A well-placed Jupiter is said to protect the mind in hard times. Spending time with wise elders and teachers, studying scriptures and practising gratitude are ways to invite Guru’s qualities into life.', 'गुरु महान शुभ ग्रह है — श्रद्धा, आशावाद, ज्ञान और सही मार्गदर्शन का ग्रह। शुभ स्थित गुरु कठिन समय में मन की रक्षा करता है, ऐसा माना जाता है। बुद्धिमान बड़ों और शिक्षकों के साथ समय बिताना, ग्रंथों का अध्ययन और कृतज्ञता का अभ्यास — ये जीवन में गुरु के गुणों को आमंत्रित करने के उपाय हैं।'),
        ],
      },
      {
        heading: b('Supportive remedies (उपाय)', 'सहायक उपाय'),
        paragraphs: [b('These traditional practices are calming rituals that can complement — but never replace — medical care or therapy.', 'ये परंपरागत अभ्यास शांतिदायक अनुष्ठान हैं जो चिकित्सा या थेरेपी के पूरक हो सकते हैं — पर उनका स्थान कभी नहीं ले सकते।')],
        table: {
          columns: [b('Planet', 'ग्रह'), b('Simple remedy', 'सरल उपाय')],
          rows: [
            [b('Moon', 'चंद्र'), b('Chant “ॐ सों सोमाय नमः”, Monday fast or prayer, drink water from a silver glass, respect and care for your mother.', '“ॐ सों सोमाय नमः” जप, सोमवार व्रत या प्रार्थना, चाँदी के गिलास से जल, माता का सम्मान और सेवा।')],
            [b('Mercury', 'बुध'), b('Chant “ॐ बुं बुधाय नमः”, feed green grass to cows, read and write daily.', '“ॐ बुं बुधाय नमः” जप, गाय को हरी घास, प्रतिदिन पढ़ना-लिखना।')],
            [b('Saturn', 'शनि'), b('Chant “ॐ शं शनैश्चराय नमः”, serve workers and the elderly, keep a disciplined routine, Hanuman Chalisa on Saturdays.', '“ॐ शं शनैश्चराय नमः” जप, श्रमिकों और वृद्धों की सेवा, अनुशासित दिनचर्या, शनिवार को हनुमान चालीसा।')],
            [b('Rahu/Ketu', 'राहु/केतु'), b('Meditation, Ganesh worship, feeding dogs and birds, limiting screen addiction.', 'ध्यान, गणेश पूजा, कुत्तों और पक्षियों को भोजन, स्क्रीन की लत सीमित करना।')],
            [b('Jupiter', 'गुरु'), b('Chant “ॐ बृं बृहस्पतये नमः”, respect teachers, donate books, Thursday prayer.', '“ॐ बृं बृहस्पतये नमः” जप, शिक्षकों का सम्मान, पुस्तकों का दान, गुरुवार की प्रार्थना।')],
          ],
        },
        tip: b('Be cautious of anyone who creates fear or demands large sums for remedies. Genuine guidance empowers you; it doesn’t frighten you.', 'जो भय उत्पन्न करे या उपायों के नाम पर बड़ी राशि माँगे, उनसे सावधान रहें। सच्चा मार्गदर्शन सशक्त करता है, डराता नहीं।'),
      },
    ],
    astro: {
      heading: b('The universal mantras for a peaceful mind', 'शांत मन के लिए सार्वभौमिक मंत्र'),
      paragraphs: [
        b('Two mantras are treasured across India for steadying the mind: the Gayatri mantra for clarity and wisdom, and the Mahamrityunjaya mantra for courage and healing. Chanting slowly also slows the breath — so the ritual and the science meet.', 'मन को स्थिर करने के लिए पूरे भारत में दो मंत्र संजोए जाते हैं: स्पष्टता और ज्ञान के लिए गायत्री मंत्र, और साहस तथा स्वास्थ्य के लिए महामृत्युंजय मंत्र। धीरे-धीरे जप करने से श्वास भी धीमी होती है — इस प्रकार अनुष्ठान और विज्ञान मिल जाते हैं।'),
      ],
      mantra: { text: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥', meaning: b('We meditate on the divine light of the Sun; may it inspire and guide our intellect.', 'हम सविता देव के दिव्य तेज का ध्यान करते हैं; वह हमारी बुद्धि को सन्मार्ग पर प्रेरित करे।') },
    },
    practice: {
      tool: null,
      title: b('Know your Moon', 'अपने चंद्रमा को जानें'),
      steps: [
        b('Generate your free Kundli on VedicDhaam and note your Moon sign (राशि) and Nakshatra.', 'वैदिकधाम पर अपनी मुफ़्त कुंडली बनाएँ और अपनी चंद्र राशि व नक्षत्र लिखें।'),
        b('Read about your Rashi in the Zodiac section — which traits feel true?', 'राशियों वाले खंड में अपनी राशि के बारे में पढ़ें — कौन-से गुण सही लगते हैं?'),
        b('Choose one planet remedy from the table and practise it for 21 days alongside your other habits.', 'तालिका से एक ग्रह उपाय चुनें और अपनी अन्य आदतों के साथ 21 दिन उसका अभ्यास करें।'),
      ],
    },
    reflect: [
      b('Which planet’s description felt most like me?', 'किस ग्रह का वर्णन मुझे सबसे अधिक अपने जैसा लगा?'),
      b('Have I been afraid of any astrological period? How can I see it as a season of growth?', 'क्या मैं किसी ज्योतिषीय अवधि से डरता/डरती रहा/रही हूँ? मैं उसे विकास के मौसम के रूप में कैसे देख सकता/सकती हूँ?'),
      b('Which calming ritual will I add to my day?', 'मैं अपने दिन में कौन-सा शांतिदायक अनुष्ठान जोड़ूँगा/जोड़ूँगी?'),
    ],
    summary: [
      b('The Moon is the mind; Mercury is intellect; Jupiter brings hope.', 'चंद्रमा मन है; बुध बुद्धि है; गुरु आशा लाता है।'),
      b('Sade Sati and Dhaiya are seasons of discipline and growth, not doom.', 'साढ़ेसाती और ढैया अनुशासन और विकास के मौसम हैं, विनाश के नहीं।'),
      b('Remedies are calming rituals that complement, never replace, medical care.', 'उपाय शांतिदायक अनुष्ठान हैं जो चिकित्सा के पूरक हैं, विकल्प नहीं।'),
      b('Genuine astrology empowers — it never frightens.', 'सच्चा ज्योतिष सशक्त करता है — कभी डराता नहीं।'),
    ],
  },

  /* ===================================================================== 11 */
  {
    slug: 'dhyan-aur-kritagyata',
    number: 11,
    icon: '🪷',
    tone: 'green',
    minutes: 14,
    audience: b('All ages', 'सभी आयु'),
    title: b('Meditation & Gratitude', 'ध्यान और कृतज्ञता'),
    subtitle: b('Training attention, kindness and contentment', 'ध्यान, दया और संतोष का प्रशिक्षण'),
    intro: b(
      'Meditation is simply training attention — the way exercise trains muscles. Research shows regular meditation can reduce stress and anxiety and even strengthen areas of the brain linked with focus and emotional control. Gratitude, practised daily, shifts the brain’s habit of scanning for problems towards noticing what is good. Both are ancient Indian treasures now studied in laboratories worldwide.',
      'ध्यान केवल अवधान (ध्यान देने की क्षमता) का प्रशिक्षण है — जैसे व्यायाम मांसपेशियों को प्रशिक्षित करता है। शोध बताते हैं कि नियमित ध्यान तनाव और चिंता घटा सकता है और एकाग्रता तथा भावनात्मक नियंत्रण से जुड़े मस्तिष्क के भागों को भी बल देता है। प्रतिदिन कृतज्ञता का अभ्यास मस्तिष्क की समस्याएँ खोजने की आदत को अच्छाई देखने की ओर मोड़ता है। दोनों प्राचीन भारतीय धरोहर हैं जिनका अब विश्वभर की प्रयोगशालाओं में अध्ययन हो रहा है।'
    ),
    sections: [
      {
        heading: b('A simple 5-minute meditation', 'सरल 5 मिनट का ध्यान'),
        paragraphs: [b('You don’t need to empty the mind. The practice is noticing when you wander and gently coming back.', 'मन को खाली करने की आवश्यकता नहीं। अभ्यास यह है कि जब मन भटके तो उसे देखें और कोमलता से वापस लाएँ।')],
        points: [
          b('Sit comfortably with a straight but relaxed spine. Close your eyes or lower your gaze.', 'रीढ़ सीधी पर शिथिल रखकर आराम से बैठें। आँखें बंद करें या दृष्टि नीचे रखें।'),
          b('Notice the breath at the nostrils or belly.', 'नासिका या पेट पर श्वास को देखें।'),
          b('When a thought comes, silently say “thinking” and return to the breath.', 'जब कोई विचार आए, मन में कहें “विचार” और श्वास पर लौट आएँ।'),
          b('Each return is one “rep” for your brain — wandering is not failure.', 'हर बार लौटना मस्तिष्क के लिए एक “अभ्यास” है — भटकना असफलता नहीं है।'),
        ],
      },
      {
        heading: b('Body scan', 'शरीर का अवलोकन (बॉडी स्कैन)'),
        paragraphs: [
          b('Lying down, move your attention slowly from the toes to the top of the head, noticing each part without trying to change anything. Where you find tension, breathe into it and let it soften. This is similar to योग निद्रा and is excellent before sleep.', 'लेटकर अपना ध्यान धीरे-धीरे पैरों की उँगलियों से सिर के शीर्ष तक ले जाएँ, हर अंग को बिना बदलने का प्रयास किए देखें। जहाँ खिंचाव मिले, वहाँ श्वास भेजें और उसे ढीला होने दें। यह योग निद्रा के समान है और सोने से पहले उत्तम है।'),
        ],
      },
      {
        heading: b('Mantra japa as a focus anchor', 'एकाग्रता के आधार के रूप में मंत्र जप'),
        paragraphs: [
          b('For many, repeating a mantra is easier than watching the breath. Chanting ॐ, the Gayatri mantra or your इष्ट mantra gives the wandering mind a gentle anchor. Using a mala of 108 beads adds a physical rhythm that further calms the body.', 'बहुत से लोगों के लिए श्वास देखने से मंत्र दोहराना आसान होता है। ॐ, गायत्री मंत्र या अपने इष्ट मंत्र का जप भटकते मन को कोमल आधार देता है। 108 मनकों की माला से एक शारीरिक लय जुड़ती है जो शरीर को और शांत करती है।'),
        ],
      },
      {
        heading: b('The science of gratitude', 'कृतज्ञता का विज्ञान'),
        paragraphs: [
          b('Our brains have a “negativity bias” — they notice threats more than blessings. Studies show that writing down three good things each day for a few weeks can improve mood, sleep and relationships. Gratitude trains the brain to notice what is going right.', 'हमारे मस्तिष्क में “नकारात्मकता का झुकाव” होता है — वह आशीर्वादों से अधिक खतरों पर ध्यान देता है। अध्ययन बताते हैं कि कुछ सप्ताह तक प्रतिदिन तीन अच्छी बातें लिखने से मनोदशा, नींद और संबंध सुधर सकते हैं। कृतज्ञता मस्तिष्क को सिखाती है कि क्या अच्छा हो रहा है।'),
        ],
        points: [
          b('Be specific: “Maa made my favourite dal” is better than “my family”.', 'विशिष्ट रहें: “माँ ने मेरी पसंदीदा दाल बनाई” — “मेरा परिवार” से बेहतर है।'),
          b('Include small things: a cool breeze, a kind word, a good cup of chai.', 'छोटी बातें भी जोड़ें: ठंडी हवा, एक मधुर शब्द, अच्छी चाय।'),
          b('Once a week, thank someone directly.', 'सप्ताह में एक बार किसी को सीधे धन्यवाद दें।'),
        ],
      },
      {
        heading: b('Digital detox', 'डिजिटल उपवास'),
        paragraphs: [b('Constant notifications keep the brain in alert mode. Give your mind regular rest.', 'लगातार सूचनाएँ मस्तिष्क को सतर्क अवस्था में रखती हैं। मन को नियमित विश्राम दें।')],
        points: [
          b('No phone for the first 30 minutes after waking.', 'उठने के बाद पहले 30 मिनट फ़ोन नहीं।'),
          b('Turn off non-essential notifications.', 'अनावश्यक सूचनाएँ बंद करें।'),
          b('Phone-free meals with family.', 'परिवार के साथ बिना फ़ोन के भोजन।'),
          b('One screen-free evening a week — try एकादशी or Sunday.', 'सप्ताह में एक शाम बिना स्क्रीन — एकादशी या रविवार आज़माएँ।'),
        ],
      },
    ],
    astro: {
      heading: b('Astrological view: meditation and the 12th house', 'ज्योतिष दृष्टि: ध्यान और द्वादश भाव'),
      paragraphs: [
        b('In Jyotish, the 12th house relates to meditation, liberation and inner peace, and Ketu and Jupiter to spiritual insight. Meditation is considered a universal remedy that calms every planet — especially the Moon. The best time traditionally is ब्रह्म मुहूर्त or संध्या (sunrise and sunset).', 'ज्योतिष में द्वादश भाव ध्यान, मोक्ष और आंतरिक शांति से, तथा केतु और गुरु आध्यात्मिक अंतर्दृष्टि से जुड़े हैं। ध्यान को हर ग्रह — विशेषकर चंद्रमा — को शांत करने वाला सार्वभौमिक उपाय माना जाता है। परंपरा में सबसे उत्तम समय ब्रह्म मुहूर्त या संध्या (सूर्योदय और सूर्यास्त) है।'),
      ],
      mantra: { text: 'ॐ शान्तिः शान्तिः शान्तिः॥', meaning: b('Peace in body, peace in mind, peace in the world around.', 'शरीर में शांति, मन में शांति, चारों ओर के संसार में शांति।') },
    },
    practice: {
      tool: 'gratitude',
      title: b('Gratitude journal', 'कृतज्ञता डायरी'),
      steps: [
        b('Each night, write three specific good things from your day.', 'हर रात अपने दिन की तीन विशिष्ट अच्छी बातें लिखें।'),
        b('For each, add one line on why it happened or why it mattered.', 'हर एक के लिए एक पंक्ति जोड़ें कि वह क्यों हुई या क्यों महत्वपूर्ण थी।'),
        b('Keep going for 21 days and read back your entries on a hard day.', '21 दिन तक जारी रखें और किसी कठिन दिन अपनी प्रविष्टियाँ पढ़ें।'),
      ],
    },
    reflect: [
      b('What is one small good thing I usually overlook?', 'ऐसी कौन-सी छोटी अच्छी बात है जिसे मैं प्रायः अनदेखा कर देता/देती हूँ?'),
      b('When in my day can I sit quietly for 5 minutes?', 'दिन में कब मैं 5 मिनट शांत बैठ सकता/सकती हूँ?'),
      b('Who deserves a thank-you from me this week?', 'इस सप्ताह किसे मुझसे धन्यवाद मिलना चाहिए?'),
    ],
    summary: [
      b('Meditation trains attention; wandering and returning is the practice.', 'ध्यान अवधान का प्रशिक्षण है; भटकना और लौटना ही अभ्यास है।'),
      b('Body scan and mantra japa are gentle ways to calm the body and mind.', 'बॉडी स्कैन और मंत्र जप शरीर और मन को शांत करने के कोमल उपाय हैं।'),
      b('Three good things a day rewires the brain towards contentment.', 'प्रतिदिन तीन अच्छी बातें मस्तिष्क को संतोष की ओर मोड़ती हैं।'),
      b('Regular digital breaks give the mind real rest.', 'नियमित डिजिटल विराम मन को सच्चा विश्राम देते हैं।'),
    ],
  },

  /* ===================================================================== 12 */
  {
    slug: 'jeevan-path',
    number: 12,
    icon: '🌄',
    tone: 'saffron',
    minutes: 15,
    audience: b('All ages', 'सभी आयु'),
    title: b('Your Path Forward', 'जीवन पथ'),
    subtitle: b('Build your personal wellbeing plan and keep growing', 'अपनी व्यक्तिगत कल्याण योजना बनाएँ और आगे बढ़ते रहें'),
    intro: b(
      'You have learned how the mind works, how to calm the body, challenge thoughts, face fears, lift low mood, sleep better, study smarter, choose a direction, connect with others and see the planets with balance. Now let us bring it all together into a simple plan you can return to whenever life gets hard. Resilience is not never falling — it is knowing how to rise again.',
      'आपने सीखा कि मन कैसे काम करता है, शरीर को कैसे शांत करें, विचारों को कैसे जाँचें, भय का सामना कैसे करें, उदासी से कैसे उबरें, बेहतर नींद, समझदारी से अध्ययन, दिशा चुनना, दूसरों से जुड़ना और ग्रहों को संतुलन से देखना। अब इन सबको एक सरल योजना में जोड़ते हैं जिसे आप कठिन समय में बार-बार देख सकें। दृढ़ता का अर्थ कभी न गिरना नहीं — फिर से उठना जानना है।'
    ),
    sections: [
      {
        heading: b('Your personal wellbeing plan', 'आपकी व्यक्तिगत कल्याण योजना'),
        paragraphs: [b('Write your answers somewhere you can see them — a diary, your phone, or the reflection boxes below.', 'अपने उत्तर किसी ऐसी जगह लिखें जहाँ आप उन्हें देख सकें — डायरी, फ़ोन, या नीचे दिए चिंतन खानों में।')],
        table: {
          columns: [b('Part of the plan', 'योजना का भाग'), b('Examples', 'उदाहरण')],
          rows: [
            [b('Daily anchors', 'दैनिक आधार'), b('Fixed wake time, 5 min breathing, walk, 3 good things', 'उठने का निश्चित समय, 5 मिनट श्वास, सैर, तीन अच्छी बातें')],
            [b('My early warning signs', 'मेरे प्रारंभिक चेतावनी संकेत'), b('Sleeping badly, skipping meals, avoiding friends, irritability', 'खराब नींद, भोजन छोड़ना, मित्रों से बचना, चिड़चिड़ापन')],
            [b('What helps me', 'मुझे क्या सहायता करता है'), b('Box breathing, grounding, music, talking to Didi, prayer', 'बॉक्स श्वास, ग्राउंडिंग, संगीत, दीदी से बात, प्रार्थना')],
            [b('People I can call', 'जिन्हें मैं फ़ोन कर सकता/सकती हूँ'), b('Two friends, a family member, a teacher or mentor', 'दो मित्र, एक परिवारजन, एक शिक्षक या मार्गदर्शक')],
            [b('Professional help', 'विशेषज्ञ सहायता'), b('Family doctor, counsellor, a helpline number saved in my phone', 'पारिवारिक चिकित्सक, परामर्शदाता, फ़ोन में सहेजा हेल्पलाइन नंबर')],
          ],
        },
      },
      {
        heading: b('Setting SMART goals', 'SMART लक्ष्य निर्धारण'),
        paragraphs: [b('Vague goals (“be happier”) are hard to act on. SMART goals are clear and doable.', 'अस्पष्ट लक्ष्य (“अधिक खुश रहना”) पर काम करना कठिन है। SMART लक्ष्य स्पष्ट और करने योग्य होते हैं।')],
        points: [
          b('Specific — what exactly? (“Walk after dinner”)', 'विशिष्ट — ठीक-ठीक क्या? (“रात के भोजन के बाद टहलना”)'),
          b('Measurable — how much? (“20 minutes”)', 'मापने योग्य — कितना? (“20 मिनट”)'),
          b('Achievable — realistic for me now?', 'प्राप्य — क्या यह अभी मेरे लिए व्यावहारिक है?'),
          b('Relevant — does it matter to my wellbeing?', 'प्रासंगिक — क्या यह मेरे कल्याण के लिए महत्वपूर्ण है?'),
          b('Time-bound — by when? (“5 days a week for a month”)', 'समयबद्ध — कब तक? (“एक महीने तक सप्ताह में 5 दिन”)'),
        ],
      },
      {
        heading: b('Setbacks are part of the path', 'रुकावटें मार्ग का हिस्सा हैं'),
        paragraphs: [
          b('Progress is never a straight line. You will have days when old worries return or you skip your practice. That is normal — the old brain pathways are still there, just weaker. Treat a setback as information, not failure: “What triggered this? What helped last time?” Then restart with the smallest step.', 'प्रगति कभी सीधी रेखा नहीं होती। ऐसे दिन आएँगे जब पुरानी चिंताएँ लौटेंगी या आप अभ्यास छोड़ देंगे। यह सामान्य है — मस्तिष्क के पुराने मार्ग अभी भी हैं, बस कमज़ोर हो गए हैं। रुकावट को असफलता नहीं, जानकारी मानें: “इसका कारण क्या था? पिछली बार किससे सहायता मिली थी?” फिर सबसे छोटे कदम से फिर आरंभ करें।'),
        ],
        tip: b('Missing one day doesn’t break a habit. Missing the restart does. Always come back.', 'एक दिन छूटने से आदत नहीं टूटती। फिर से आरंभ न करने से टूटती है। सदा लौट आएँ।'),
      },
      {
        heading: b('Celebrate progress', 'प्रगति का उत्सव मनाएँ'),
        paragraphs: [
          b('Every week, notice what has improved — even slightly. Sleeping 30 minutes more, speaking up once in class, facing one fear. The brain learns through reward; celebrating small wins strengthens the new pathways. Share your progress with someone who cares.', 'हर सप्ताह देखें कि क्या सुधरा है — चाहे थोड़ा ही। 30 मिनट अधिक नींद, कक्षा में एक बार बोलना, एक भय का सामना। मस्तिष्क पुरस्कार से सीखता है; छोटी जीतों का उत्सव नए मार्गों को पक्का करता है। अपनी प्रगति किसी ऐसे व्यक्ति के साथ साझा करें जो आपकी परवाह करता है।'),
        ],
      },
      {
        heading: b('Keep learning and getting support', 'सीखते रहें और सहायता लेते रहें'),
        paragraphs: [
          b('Revisit any chapter whenever you need it. If problems feel too big to handle alone, speaking to a counsellor, psychologist or doctor is a wise and courageous step. On VedicDhaam you can also consult an astrologer for guidance on career and life decisions — alongside, not instead of, professional mental health care.', 'जब भी आवश्यकता हो, किसी भी अध्याय पर लौटें। यदि समस्याएँ अकेले सँभालने के लिए बहुत बड़ी लगें, तो परामर्शदाता, मनोवैज्ञानिक या चिकित्सक से बात करना एक बुद्धिमान और साहसी कदम है। वैदिकधाम पर आप करियर और जीवन के निर्णयों में मार्गदर्शन के लिए ज्योतिषी से भी परामर्श कर सकते हैं — विशेषज्ञ मानसिक स्वास्थ्य देखभाल के साथ, उसके स्थान पर नहीं।'),
        ],
      },
    ],
    astro: {
      heading: b('Karma and free will', 'कर्म और स्वतंत्र इच्छा'),
      paragraphs: [
        b('Jyotish teaches that the chart shows the seeds of karma, but present action — पुरुषार्थ — decides how they grow. The planets may set the weather; you still choose how to sail. Every calm breath, kind thought and brave step is a new karma you are creating today.', 'ज्योतिष सिखाता है कि कुंडली कर्म के बीज दिखाती है, पर वर्तमान कर्म — पुरुषार्थ — तय करता है कि वे कैसे विकसित हों। ग्रह मौसम तय कर सकते हैं; नाव कैसे चलानी है, यह आप चुनते हैं। हर शांत श्वास, हर दयालु विचार और हर साहसी कदम एक नया कर्म है जो आप आज रच रहे हैं।'),
      ],
      mantra: { text: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥', meaning: b('Lift yourself by your own self; do not let yourself sink. You alone are your friend, and you alone can be your enemy. — Bhagavad Gita 6.5', 'स्वयं अपना उद्धार करें, स्वयं को गिरने न दें। आप ही अपने मित्र हैं और आप ही अपने शत्रु। — श्रीमद्भगवद्गीता 6.5') },
    },
    practice: {
      tool: null,
      title: b('Write your plan today', 'आज अपनी योजना लिखें'),
      steps: [
        b('Fill in the five parts of the wellbeing plan above.', 'ऊपर दी गई कल्याण योजना के पाँचों भाग भरें।'),
        b('Set one SMART goal for the next 30 days.', 'अगले 30 दिनों के लिए एक SMART लक्ष्य तय करें।'),
        b('Save a helpline number in your phone and share your plan with one trusted person.', 'फ़ोन में एक हेल्पलाइन नंबर सहेजें और अपनी योजना किसी एक विश्वसनीय व्यक्ति से साझा करें।'),
      ],
    },
    reflect: [
      b('What are my three daily anchors?', 'मेरे तीन दैनिक आधार क्या हैं?'),
      b('What are my early warning signs, and what will I do when I notice them?', 'मेरे प्रारंभिक चेतावनी संकेत क्या हैं, और उन्हें देखने पर मैं क्या करूँगा/करूँगी?'),
      b('What is the one change from this course I am most proud of?', 'इस पाठ्यक्रम से आया कौन-सा एक बदलाव मुझे सबसे अधिक गर्व देता है?'),
    ],
    summary: [
      b('A written wellbeing plan guides you on hard days.', 'लिखी हुई कल्याण योजना कठिन दिनों में मार्ग दिखाती है।'),
      b('SMART goals turn good intentions into daily action.', 'SMART लक्ष्य अच्छे संकल्पों को दैनिक कर्म में बदलते हैं।'),
      b('Setbacks are normal — always restart with the smallest step.', 'रुकावटें सामान्य हैं — सदा सबसे छोटे कदम से फिर आरंभ करें।'),
      b('You are your own best friend — keep practising, keep asking for help.', 'आप ही अपने सबसे अच्छे मित्र हैं — अभ्यास करते रहें, सहायता माँगते रहें।'),
    ],
  },
];
