// मनोबल — अध्याय 1–4 (bilingual { en, hi })
const b = (en, hi) => ({ en, hi });

export const PART1 = [
  /* ===================================================================== 1 */
  {
    slug: 'man-ko-samjhen',
    number: 1,
    icon: '🧠',
    tone: 'teal',
    minutes: 14,
    audience: b('All ages', 'सभी आयु'),
    title: b('Understanding Your Mind', 'मन को समझें'),
    subtitle: b('Stress, anxiety, low mood — and how the brain can be retrained', 'तनाव, चिंता, उदासी — और मस्तिष्क को नए सिरे से कैसे प्रशिक्षित करें'),
    intro: b(
      'Before we can calm the mind, it helps to understand it. Stress, worry and sadness are not signs of weakness — they are signals from a brain that is trying to protect you. In this chapter you will learn, in simple words, how your brain works, why it sometimes gets stuck in fear or heaviness, and the most hopeful fact of modern science: the brain can change with practice at any age.',
      'मन को शांत करने से पहले उसे समझना आवश्यक है। तनाव, चिंता और उदासी कमज़ोरी के लक्षण नहीं हैं — ये उस मस्तिष्क के संकेत हैं जो आपकी रक्षा करने का प्रयास कर रहा है। इस अध्याय में आप सरल शब्दों में जानेंगे कि मस्तिष्क कैसे काम करता है, वह कभी-कभी भय या भारीपन में क्यों अटक जाता है, और आधुनिक विज्ञान का सबसे आशाजनक सत्य — अभ्यास से मस्तिष्क किसी भी आयु में बदल सकता है।'
    ),
    sections: [
      {
        heading: b('Stress, anxiety and depression — what is the difference?', 'तनाव, चिंता और अवसाद — इनमें क्या अंतर है?'),
        paragraphs: [
          b('These three words are often used as if they mean the same thing, but they are different experiences. Knowing which one you are facing helps you choose the right tool.', 'ये तीनों शब्द प्रायः एक ही अर्थ में प्रयोग होते हैं, पर ये अलग-अलग अनुभव हैं। आप किसका सामना कर रहे हैं, यह जानने से सही उपाय चुनना आसान हो जाता है।'),
        ],
        table: {
          columns: [b('Experience', 'अनुभव'), b('What it feels like', 'कैसा लगता है'), b('Usually linked to', 'प्रायः किससे जुड़ा')],
          rows: [
            [b('Stress (तनाव)', 'तनाव (Stress)'), b('Pressure, tension, “too much to do”', 'दबाव, खिंचाव, “बहुत कुछ करना है”'), b('A present, real demand — exams, work, money', 'वर्तमान की वास्तविक माँग — परीक्षा, काम, धन')],
            [b('Anxiety (चिंता)', 'चिंता (Anxiety)'), b('Fear, restlessness, racing heart, “what if…”', 'भय, बेचैनी, धड़कन तेज़, “अगर ऐसा हो गया तो…”'), b('An imagined future threat', 'भविष्य का कल्पित खतरा')],
            [b('Depression (अवसाद)', 'अवसाद (Depression)'), b('Heaviness, emptiness, no interest, tiredness', 'भारीपन, खालीपन, किसी चीज़ में रुचि नहीं, थकान'), b('Loss, long stress, biology — often no single reason', 'हानि, लंबा तनाव, शारीरिक कारण — अक्सर कोई एक कारण नहीं')],
          ],
        },
        tip: b('Short-term stress can even help us perform. It becomes a problem when it never switches off.', 'थोड़े समय का तनाव हमें बेहतर करने में सहायता भी करता है। समस्या तब बनती है जब वह कभी बंद ही न हो।'),
      },
      {
        heading: b('Meet three parts of your brain', 'अपने मस्तिष्क के तीन भागों से मिलिए'),
        paragraphs: [
          b('Think of your brain as a home with three helpful members. When they work together, you feel balanced. When the alarm rings too often, the wise guide goes quiet.', 'अपने मस्तिष्क को एक घर समझिए जिसमें तीन सहायक सदस्य रहते हैं। जब तीनों मिलकर काम करते हैं तो आप संतुलित अनुभव करते हैं। जब अलार्म बार-बार बजता है, तो बुद्धिमान मार्गदर्शक चुप हो जाता है।'),
        ],
        points: [
          b('Amygdala — the alarm. It scans for danger and triggers fear in a split second, even before you think.', 'एमिग्डाला (Amygdala) — अलार्म। यह खतरे को खोजता है और सोचने से पहले ही पल भर में भय जगा देता है।'),
          b('Prefrontal cortex — the wise guide. It plans, reasons, calms the alarm and helps you choose a response.', 'प्रीफ़्रंटल कॉर्टेक्स — बुद्धिमान मार्गदर्शक। यह योजना बनाता है, विवेक से सोचता है, अलार्म को शांत करता है और सही प्रतिक्रिया चुनने में सहायता करता है।'),
          b('Hippocampus — the memory keeper. It stores experiences and tells the alarm “this is past, you are safe now”.', 'हिप्पोकैम्पस — स्मृति का रखवाला। यह अनुभवों को सहेजता है और अलार्म को बताता है कि “यह बीत चुका, अब तुम सुरक्षित हो”।'),
        ],
        example: b(
          'Riya hears her name called in class and her heart pounds — the alarm fired. A moment later her wise guide reminds her, “It’s only attendance.” Her body relaxes. With long stress, that second step becomes slower. Practice makes it faster again.',
          'कक्षा में रिया का नाम पुकारा गया और उसकी धड़कन तेज़ हो गई — अलार्म बज गया। एक क्षण बाद उसके बुद्धिमान मार्गदर्शक ने याद दिलाया, “यह तो केवल उपस्थिति है।” शरीर शांत हो गया। लंबे तनाव में यह दूसरा चरण धीमा पड़ जाता है। अभ्यास से वह फिर तेज़ हो जाता है।'
        ),
      },
      {
        heading: b('Fight, flight or freeze', 'लड़ो, भागो या जम जाओ'),
        paragraphs: [
          b('When the alarm rings, the body prepares to survive: the heart beats faster, breathing becomes quick, muscles tighten and digestion slows. This was perfect for escaping a tiger. Today the “tiger” is a deadline or a message — but the body reacts the same way.', 'जब अलार्म बजता है, शरीर बचाव की तैयारी करता है: धड़कन तेज़ होती है, साँस छोटी हो जाती है, मांसपेशियाँ कस जाती हैं और पाचन धीमा पड़ जाता है। बाघ से बचने के लिए यह उत्तम था। आज “बाघ” कोई समय-सीमा या संदेश है — पर शरीर वैसी ही प्रतिक्रिया करता है।'),
          b('Some people freeze instead — the mind goes blank in an exam or conversation. This is not laziness; it is the same protective system.', 'कुछ लोग जम जाते हैं — परीक्षा या बातचीत में मन खाली हो जाता है। यह आलस्य नहीं है; यह वही रक्षा प्रणाली है।'),
        ],
        tip: b('You cannot argue with the alarm, but you can calm the body — slow breathing is the fastest switch (Chapter 2).', 'अलार्म से बहस नहीं की जा सकती, पर शरीर को शांत किया जा सकता है — धीमी साँस सबसे तेज़ उपाय है (अध्याय 2)।'),
      },
      {
        heading: b('Neuroplasticity — your brain can be retrained', 'न्यूरोप्लास्टिसिटी — मस्तिष्क को फिर से प्रशिक्षित किया जा सकता है'),
        paragraphs: [
          b('Your brain has around 86 billion neurons (nerve cells). Every thought and habit is a pathway between them. Scientists say: “Neurons that fire together, wire together.” The more you repeat a thought or action, the stronger that path becomes — like a footpath formed by walking across grass every day.', 'आपके मस्तिष्क में लगभग 86 अरब न्यूरॉन (तंत्रिका कोशिकाएँ) हैं। हर विचार और आदत उनके बीच एक मार्ग है। वैज्ञानिक कहते हैं: “जो न्यूरॉन साथ सक्रिय होते हैं, वे साथ जुड़ जाते हैं।” जितना अधिक आप किसी विचार या क्रिया को दोहराते हैं, वह मार्ग उतना ही पक्का होता जाता है — जैसे घास पर प्रतिदिन चलने से पगडंडी बन जाती है।'),
          b('Worry repeated daily becomes an easy road. The good news: calm breathing, kind self-talk and small brave actions, repeated daily, build new roads. Old paths slowly fade when unused. This is why this course is chapter-wise and practice-based — we are training the neurons.', 'प्रतिदिन दोहराई गई चिंता एक आसान सड़क बन जाती है। शुभ समाचार यह है कि शांत साँस, स्वयं से प्रेमपूर्ण बात और छोटे साहसी कदम प्रतिदिन दोहराने से नई सड़कें बनती हैं। पुराने मार्ग प्रयोग न होने पर धीरे-धीरे मिट जाते हैं। इसीलिए यह पाठ्यक्रम अध्यायवार और अभ्यास-आधारित है — हम न्यूरॉन को प्रशिक्षित कर रहे हैं।'),
        ],
        points: [
          b('Change needs repetition, not perfection — 10 minutes daily beats 2 hours once.', 'परिवर्तन के लिए पूर्णता नहीं, दोहराव चाहिए — प्रतिदिन 10 मिनट, एक बार के 2 घंटे से बेहतर है।'),
          b('New habits usually feel natural after 6–8 weeks of regular practice.', 'नियमित अभ्यास के 6–8 सप्ताह बाद नई आदतें प्रायः स्वाभाविक लगने लगती हैं।'),
          b('Sleep, movement and learning new skills all support brain growth.', 'नींद, व्यायाम और नए कौशल सीखना — ये सभी मस्तिष्क के विकास में सहायक हैं।'),
        ],
      },
      {
        heading: b('Signs to watch — in yourself or someone you love', 'ध्यान देने योग्य संकेत — स्वयं में या अपनों में'),
        paragraphs: [b('Everyone has hard days. If several of these continue for more than two weeks and affect daily life, it is time to talk to someone.', 'हर किसी के कठिन दिन आते हैं। यदि इनमें से कई संकेत दो सप्ताह से अधिक बने रहें और दैनिक जीवन प्रभावित हो, तो किसी से बात करने का समय है।')],
        points: [
          b('Sleeping far more or far less than usual', 'सामान्य से बहुत अधिक या बहुत कम सोना'),
          b('Loss of interest in things once enjoyed', 'पहले पसंद आने वाली चीज़ों में रुचि समाप्त होना'),
          b('Constant worry, irritability or feeling on edge', 'लगातार चिंता, चिड़चिड़ापन या हर समय घबराहट'),
          b('Changes in appetite, or frequent headaches and stomach aches', 'भूख में बदलाव, या बार-बार सिर और पेट दर्द'),
          b('Pulling away from friends and family', 'मित्रों और परिवार से दूरी बनाना'),
          b('Feeling hopeless or thinking of self-harm — seek help today', 'निराशा अनुभव करना या स्वयं को हानि पहुँचाने के विचार — आज ही सहायता लें'),
        ],
      },
      {
        heading: b('Myth vs fact', 'भ्रम बनाम सत्य'),
        paragraphs: [b('Wrong beliefs stop many people from getting help. Let us clear a few.', 'गलत धारणाएँ बहुत से लोगों को सहायता लेने से रोकती हैं। आइए कुछ भ्रम दूर करें।')],
        table: {
          columns: [b('Myth', 'भ्रम'), b('Fact', 'सत्य')],
          rows: [
            [b('“It’s all in your head, just be strong.”', '“यह सब मन का वहम है, बस मज़बूत बनो।”'), b('Anxiety and depression involve real changes in the brain and body. Strength is asking for help.', 'चिंता और अवसाद में मस्तिष्क और शरीर में वास्तविक परिवर्तन होते हैं। सहायता माँगना ही सच्ची शक्ति है।')],
            [b('“Only weak people get depressed.”', '“केवल कमज़ोर लोग उदास होते हैं।”'), b('It can affect anyone — toppers, athletes, leaders, parents.', 'यह किसी को भी हो सकता है — टॉपर, खिलाड़ी, नेता, माता-पिता।')],
            [b('“Talking about it makes it worse.”', '“इसके बारे में बात करने से बढ़ता है।”'), b('Talking to a trusted person usually brings relief and perspective.', 'किसी विश्वसनीय व्यक्ति से बात करने से प्रायः राहत और नई दृष्टि मिलती है।')],
            [b('“Medicines or therapy mean you are ‘mad’.”', '“दवा या थेरेपी का अर्थ है आप ‘पागल’ हैं।”'), b('They are normal health care, just like treatment for diabetes or a fracture.', 'ये सामान्य स्वास्थ्य देखभाल हैं, जैसे मधुमेह या हड्डी टूटने का उपचार।')],
          ],
        },
      },
    ],
    astro: {
      heading: b('Astrological view: Chandra — the lord of the mind', 'ज्योतिष दृष्टि: चंद्रमा — मन का स्वामी'),
      paragraphs: [
        b('Vedic astrology says “चन्द्रमा मनसो जातः” — the Moon is born of the mind. The Moon in your birth chart shows your emotional nature: how you feel, react and recover. A strong, well-placed Moon is linked with emotional steadiness, while an afflicted Moon is linked with sensitivity and mood swings.', 'वेद में कहा गया है “चन्द्रमा मनसो जातः” — चंद्रमा मन से उत्पन्न हुआ। जन्म कुंडली में चंद्रमा आपके भावनात्मक स्वभाव को दर्शाता है: आप कैसा अनुभव करते हैं, कैसी प्रतिक्रिया देते हैं और कैसे सँभलते हैं। बलवान चंद्रमा को भावनात्मक स्थिरता से और पीड़ित चंद्रमा को संवेदनशीलता व मनोदशा के उतार-चढ़ाव से जोड़ा जाता है।'),
        b('Astrology can help you understand your tendencies — it does not decide your fate. Awareness plus practice is what changes the mind.', 'ज्योतिष आपकी प्रवृत्तियों को समझने में सहायक है — यह आपका भाग्य तय नहीं करता। जागरूकता और अभ्यास ही मन को बदलते हैं।'),
      ],
      mantra: { text: 'ॐ सों सोमाय नमः॥', meaning: b('Salutations to Soma, the Moon — chanted softly to steady the mind.', 'सोम (चंद्रमा) को नमस्कार — मन को स्थिर करने के लिए धीरे-धीरे जपें।') },
    },
    practice: {
      tool: null,
      title: b('Today’s practice: name it to tame it', 'आज का अभ्यास: नाम दें, शांत करें'),
      steps: [
        b('Three times today, pause and ask: “What am I feeling right now?”', 'आज तीन बार रुककर स्वयं से पूछें: “मैं अभी क्या अनुभव कर रहा/रही हूँ?”'),
        b('Name the feeling in one word — worried, tired, calm, irritated.', 'उस भाव को एक शब्द में नाम दें — चिंतित, थका, शांत, चिड़चिड़ा।'),
        b('Research shows that simply naming an emotion reduces the alarm’s activity.', 'शोध बताते हैं कि भाव को केवल नाम देने से ही अलार्म (एमिग्डाला) की सक्रियता घटती है।'),
      ],
    },
    reflect: [
      b('Which of the three — stress, anxiety or low mood — do I experience most often?', 'तनाव, चिंता या उदासी — इन तीनों में से मुझे सबसे अधिक क्या अनुभव होता है?'),
      b('What situations usually ring my brain’s alarm?', 'कौन-सी परिस्थितियाँ प्रायः मेरे मस्तिष्क का अलार्म बजाती हैं?'),
      b('Which one new “road” (habit) would I like to build in my brain?', 'मैं अपने मस्तिष्क में कौन-सी एक नई “सड़क” (आदत) बनाना चाहता/चाहती हूँ?'),
    ],
    summary: [
      b('Stress is about now, anxiety about the future, depression is heaviness and loss of interest.', 'तनाव वर्तमान से, चिंता भविष्य से जुड़ी है, और अवसाद भारीपन व रुचि की कमी है।'),
      b('The amygdala is the alarm; the prefrontal cortex is the wise guide that calms it.', 'एमिग्डाला अलार्म है; प्रीफ़्रंटल कॉर्टेक्स वह बुद्धिमान मार्गदर्शक है जो उसे शांत करता है।'),
      b('Neurons that fire together wire together — daily practice builds new pathways.', 'जो न्यूरॉन साथ सक्रिय होते हैं वे साथ जुड़ते हैं — दैनिक अभ्यास नए मार्ग बनाता है।'),
      b('Asking for help is a sign of strength, never weakness.', 'सहायता माँगना शक्ति का लक्षण है, कमज़ोरी का नहीं।'),
    ],
  },

  /* ===================================================================== 2 */
  {
    slug: 'shwas-se-shanti',
    number: 2,
    icon: '🌬️',
    tone: 'green',
    minutes: 12,
    audience: b('All ages', 'सभी आयु'),
    title: b('Peace Through Breath', 'श्वास से शांति'),
    subtitle: b('The quickest way to calm your nervous system', 'तंत्रिका तंत्र को शांत करने का सबसे तेज़ उपाय'),
    intro: b(
      'Breath is the only automatic body function you can also control. That makes it a bridge between body and mind. When you slow your breath — especially the out-breath — you send a direct message to the brain: “We are safe.” Our ancient yogis knew this as प्राणायाम; modern science now explains why it works.',
      'श्वास शरीर की एकमात्र स्वचालित क्रिया है जिसे आप नियंत्रित भी कर सकते हैं। इसलिए यह शरीर और मन के बीच का सेतु है। जब आप श्वास को धीमा करते हैं — विशेषकर छोड़ने वाली श्वास को — तो मस्तिष्क को सीधा संदेश जाता है: “हम सुरक्षित हैं।” हमारे प्राचीन योगी इसे प्राणायाम कहते थे; आधुनिक विज्ञान अब बताता है कि यह क्यों काम करता है।'
    ),
    sections: [
      {
        heading: b('Why a slow out-breath calms you', 'धीमी छोड़ने वाली श्वास क्यों शांत करती है'),
        paragraphs: [
          b('Your nervous system has an accelerator (the sympathetic system — fight or flight) and a brake (the parasympathetic system — rest and digest). A long nerve called the vagus nerve is the main brake cable. When you breathe out slowly, the vagus nerve becomes more active and the heart rate gently drops.', 'आपके तंत्रिका तंत्र में एक एक्सीलरेटर है (सिम्पैथेटिक तंत्र — लड़ो या भागो) और एक ब्रेक (पैरासिम्पैथेटिक तंत्र — विश्राम और पाचन)। वेगस नर्व (Vagus Nerve) नामक एक लंबी तंत्रिका मुख्य ब्रेक का तार है। जब आप धीरे-धीरे श्वास छोड़ते हैं, तो वेगस नर्व अधिक सक्रिय होती है और हृदय गति कोमलता से घटती है।'),
          b('Rule of thumb: make the out-breath longer than the in-breath. Breathe through the nose and let the belly, not the shoulders, rise.', 'सरल नियम: श्वास छोड़ने का समय श्वास लेने से अधिक रखें। नाक से श्वास लें और कंधे नहीं, पेट ऊपर उठे।'),
        ],
        tip: b('Just 2–5 minutes of slow breathing can noticeably lower tension.', 'केवल 2–5 मिनट की धीमी श्वास से तनाव में स्पष्ट कमी आ सकती है।'),
      },
      {
        heading: b('Technique 1 — Box breathing (4-4-4-4)', 'विधि 1 — बॉक्स श्वास (4-4-4-4)'),
        paragraphs: [b('Used by athletes and soldiers to stay calm under pressure. Imagine tracing the four sides of a square.', 'दबाव में शांत रहने के लिए खिलाड़ी और सैनिक इसका प्रयोग करते हैं। कल्पना करें कि आप एक वर्ग की चारों भुजाएँ बना रहे हैं।')],
        points: [
          b('Breathe in through the nose for 4 counts.', 'नाक से 4 गिनती तक श्वास लें।'),
          b('Hold gently for 4 counts.', '4 गिनती तक कोमलता से रोकें।'),
          b('Breathe out slowly for 4 counts.', '4 गिनती तक धीरे-धीरे श्वास छोड़ें।'),
          b('Hold empty for 4 counts. Repeat 4–6 rounds.', '4 गिनती तक खाली रुकें। 4–6 चक्र दोहराएँ।'),
        ],
      },
      {
        heading: b('Technique 2 — 4-7-8 breathing for sleep', 'विधि 2 — नींद के लिए 4-7-8 श्वास'),
        paragraphs: [b('The very long exhale makes this especially good before sleep or after an upsetting moment.', 'बहुत लंबी छोड़ने वाली श्वास के कारण यह सोने से पहले या किसी परेशान करने वाले क्षण के बाद विशेष रूप से उपयोगी है।')],
        points: [
          b('Breathe in quietly through the nose for 4 counts.', 'नाक से शांतिपूर्वक 4 गिनती तक श्वास लें।'),
          b('Hold for 7 counts.', '7 गिनती तक रोकें।'),
          b('Breathe out through the mouth with a soft “whoosh” for 8 counts.', 'मुँह से हल्की “फ़ू” ध्वनि के साथ 8 गिनती तक श्वास छोड़ें।'),
          b('Start with 4 rounds only; you may feel light-headed at first.', 'आरंभ में केवल 4 चक्र करें; पहले थोड़ा हल्कापन लग सकता है।'),
        ],
      },
      {
        heading: b('Technique 3 — Anulom-Vilom (alternate nostril breathing)', 'विधि 3 — अनुलोम-विलोम (नाड़ी शोधन)'),
        paragraphs: [b('A classical प्राणायाम that balances and settles the mind. Sit upright with a relaxed spine.', 'एक शास्त्रीय प्राणायाम जो मन को संतुलित और स्थिर करता है। रीढ़ सीधी और शिथिल रखकर बैठें।')],
        points: [
          b('Close the right nostril with the right thumb; breathe in through the left.', 'दाहिने अंगूठे से दाहिनी नासिका बंद करें; बाईं नासिका से श्वास लें।'),
          b('Close the left nostril with the ring finger; release the thumb and breathe out through the right.', 'अनामिका से बाईं नासिका बंद करें; अंगूठा हटाकर दाहिनी नासिका से श्वास छोड़ें।'),
          b('Breathe in through the right, then switch and breathe out through the left. That is one round.', 'दाहिनी से श्वास लें, फिर बदलकर बाईं से छोड़ें। यह एक चक्र हुआ।'),
          b('Continue for 5 minutes, keeping the breath soft and unforced.', '5 मिनट तक जारी रखें, श्वास कोमल और बिना ज़ोर के रहे।'),
        ],
      },
      {
        heading: b('Technique 4 — Bhramari (humming bee breath)', 'विधि 4 — भ्रामरी प्राणायाम'),
        paragraphs: [b('The gentle humming vibration is deeply soothing and is loved by children and adults alike.', 'कोमल गुंजन का कंपन अत्यंत सुखदायक है और बच्चों तथा बड़ों — सभी को प्रिय है।')],
        points: [
          b('Sit comfortably, close your eyes and gently close your ears with your thumbs.', 'आराम से बैठें, आँखें बंद करें और अंगूठों से कानों को हल्के से बंद करें।'),
          b('Breathe in through the nose.', 'नाक से श्वास लें।'),
          b('Breathe out slowly while making a steady “mmmm” humming sound like a bee.', 'धीरे-धीरे श्वास छोड़ते हुए भौंरे जैसी लगातार “म्म्म्म” गुंजन करें।'),
          b('Feel the vibration in your head. Repeat 5–7 times.', 'सिर में कंपन को अनुभव करें। 5–7 बार दोहराएँ।'),
        ],
      },
      {
        heading: b('Cautions', 'सावधानियाँ'),
        paragraphs: [b('Breathing practices are safe for most people, but go gently.', 'श्वास अभ्यास अधिकतर लोगों के लिए सुरक्षित हैं, पर कोमलता से करें।')],
        points: [
          b('Never force or strain; stop if you feel dizzy.', 'कभी ज़ोर न लगाएँ; चक्कर आए तो रुक जाएँ।'),
          b('Skip long breath-holds if you are pregnant, have high blood pressure, heart or lung conditions — ask your doctor.', 'गर्भावस्था, उच्च रक्तचाप, हृदय या फेफड़ों की समस्या में लंबे समय तक श्वास रोकने से बचें — चिकित्सक से पूछें।'),
          b('Practice on an empty or light stomach.', 'खाली या हल्के पेट अभ्यास करें।'),
        ],
      },
    ],
    astro: {
      heading: b('Astrological view: Prana and the Moon', 'ज्योतिष दृष्टि: प्राण और चंद्रमा'),
      paragraphs: [
        b('In yogic thought the left nostril (इड़ा नाड़ी) is cooling and lunar, and the right (पिंगला नाड़ी) is warming and solar. Anulom-Vilom balances these two currents — the Moon (mind) and the Sun (energy). A calm breath is the simplest daily remedy for a restless Moon.', 'योग परंपरा में बाईं नासिका (इड़ा नाड़ी) शीतल और चंद्र स्वभाव की, तथा दाहिनी (पिंगला नाड़ी) उष्ण और सूर्य स्वभाव की मानी गई है। अनुलोम-विलोम इन दोनों प्रवाहों — चंद्रमा (मन) और सूर्य (ऊर्जा) — को संतुलित करता है। शांत श्वास बेचैन चंद्रमा का सबसे सरल दैनिक उपाय है।'),
      ],
      mantra: { text: 'ॐ॥', meaning: b('Chant a long, soft “Om” on the out-breath — it naturally lengthens the exhale.', 'छोड़ने वाली श्वास पर लंबा और कोमल “ॐ” जपें — यह स्वाभाविक रूप से श्वास छोड़ने का समय बढ़ाता है।') },
    },
    practice: {
      tool: 'breathing',
      title: b('Guided breathing — follow the circle', 'मार्गदर्शित श्वास — वृत्त के साथ चलें'),
      steps: [
        b('Choose a pattern below and press Start.', 'नीचे एक पद्धति चुनें और आरंभ दबाएँ।'),
        b('Breathe in as the circle grows, hold when it pauses, breathe out as it shrinks.', 'वृत्त बड़ा हो तो श्वास लें, रुके तो रोकें, छोटा हो तो श्वास छोड़ें।'),
        b('Do at least 3 minutes, twice a day — morning and before sleep.', 'दिन में दो बार — सुबह और सोने से पहले — कम से कम 3 मिनट करें।'),
      ],
    },
    reflect: [
      b('How did my body feel before and after 3 minutes of slow breathing?', '3 मिनट की धीमी श्वास से पहले और बाद में मेरा शरीर कैसा अनुभव कर रहा था?'),
      b('When in my day would a breathing break help the most?', 'मेरे दिन में कब श्वास-विराम सबसे अधिक सहायक होगा?'),
      b('Which technique felt most natural to me, and why?', 'कौन-सी विधि मुझे सबसे स्वाभाविक लगी, और क्यों?'),
    ],
    summary: [
      b('A longer out-breath activates the vagus nerve — the body’s calming brake.', 'लंबी छोड़ने वाली श्वास वेगस नर्व को सक्रिय करती है — शरीर का शांत करने वाला ब्रेक।'),
      b('Box breathing for focus, 4-7-8 for sleep, Anulom-Vilom for balance, Bhramari for soothing.', 'एकाग्रता के लिए बॉक्स श्वास, नींद के लिए 4-7-8, संतुलन के लिए अनुलोम-विलोम, सुकून के लिए भ्रामरी।'),
      b('A few minutes daily retrains the nervous system over weeks.', 'प्रतिदिन कुछ मिनट का अभ्यास सप्ताहों में तंत्रिका तंत्र को नया रूप देता है।'),
    ],
  },

  /* ===================================================================== 3 */
  {
    slug: 'vicharon-ko-pehchanen',
    number: 3,
    icon: '💭',
    tone: 'violet',
    minutes: 16,
    audience: b('All ages', 'सभी आयु'),
    title: b('Recognising Your Thoughts', 'विचारों को पहचानें'),
    subtitle: b('Thinking traps and how to step out of them', 'विचारों के जाल और उनसे बाहर निकलने का उपाय'),
    intro: b(
      'Thoughts feel like facts, but they are often guesses — especially when we are tired, stressed or low. Cognitive Behavioural Therapy (CBT), one of the most researched approaches in psychology, teaches a simple skill: notice the thought, check it, and choose a more balanced one. It is like cleaning your spectacles so you see life more clearly.',
      'विचार तथ्य जैसे लगते हैं, पर वे प्रायः अनुमान होते हैं — विशेषकर जब हम थके, तनावग्रस्त या उदास हों। संज्ञानात्मक व्यवहार चिकित्सा (CBT), मनोविज्ञान की सबसे अधिक शोधित पद्धतियों में से एक, एक सरल कौशल सिखाती है: विचार को पहचानो, उसे जाँचो, और अधिक संतुलित विचार चुनो। यह अपने चश्मे को साफ़ करने जैसा है ताकि जीवन अधिक स्पष्ट दिखे।'
    ),
    sections: [
      {
        heading: b('The thought–feeling–action triangle', 'विचार–भाव–क्रिया त्रिकोण'),
        paragraphs: [
          b('What we think affects how we feel; how we feel affects what we do; and what we do affects what we think next. It is a loop. The same event can lead to very different days depending on the thought in the middle.', 'हम जो सोचते हैं उससे हमारा भाव बनता है; भाव से हमारी क्रिया बनती है; और क्रिया से अगला विचार। यह एक चक्र है। एक ही घटना बीच के विचार के अनुसार बिल्कुल अलग दिन बना सकती है।'),
        ],
        example: b(
          'Event: a friend doesn’t reply for a day. Thought A: “She’s angry with me.” → feeling hurt → you avoid her. Thought B: “She’s probably busy.” → feeling fine → you message again tomorrow. Same event, different outcome.',
          'घटना: मित्र ने एक दिन उत्तर नहीं दिया। विचार क: “वह मुझसे नाराज़ है।” → दुख → आप उससे बचने लगते हैं। विचार ख: “वह शायद व्यस्त है।” → सामान्य भाव → आप कल फिर संदेश भेजते हैं। घटना एक, परिणाम अलग।'
        ),
      },
      {
        heading: b('Ten common thinking traps', 'दस सामान्य विचार-जाल'),
        paragraphs: [b('Everyone falls into these sometimes. Learning their names helps you catch them quickly.', 'हर कोई कभी न कभी इनमें फँसता है। इनके नाम जानने से आप इन्हें जल्दी पकड़ पाते हैं।')],
        table: {
          columns: [b('Trap', 'जाल'), b('What it sounds like', 'कैसा सुनाई देता है')],
          rows: [
            [b('All-or-nothing', 'सब या कुछ नहीं'), b('“If I don’t get 95%, I’m a failure.”', '“95% नहीं आए तो मैं असफल हूँ।”')],
            [b('Catastrophising', 'विपत्ति की कल्पना'), b('“One bad interview — my career is finished.”', '“एक साक्षात्कार बिगड़ा — मेरा करियर समाप्त।”')],
            [b('Mind reading', 'मन पढ़ना'), b('“Everyone at the wedding thought I looked silly.”', '“शादी में सबने सोचा कि मैं अजीब लग रहा था।”')],
            [b('Fortune telling', 'भविष्यवाणी'), b('“I just know I’ll fail the exam.”', '“मुझे पता है मैं परीक्षा में फेल हो जाऊँगा।”')],
            [b('Labelling', 'ठप्पा लगाना'), b('“I made a mistake, I’m stupid.”', '“मुझसे गलती हुई, मैं मूर्ख हूँ।”')],
            [b('Should statements', '“चाहिए” वाले विचार'), b('“I should never feel sad.”', '“मुझे कभी उदास नहीं होना चाहिए।”')],
            [b('Overgeneralising', 'अति-सामान्यीकरण'), b('“I always mess things up.”', '“मैं हमेशा सब बिगाड़ देता हूँ।”')],
            [b('Mental filter', 'मानसिक छलनी'), b('Remembering one criticism and forgetting ten compliments.', 'दस प्रशंसाएँ भूलकर एक आलोचना याद रखना।')],
            [b('Personalising', 'सब अपने ऊपर लेना'), b('“Papa is in a bad mood — it must be because of me.”', '“पापा का मूड खराब है — ज़रूर मेरी वजह से।”')],
            [b('Emotional reasoning', 'भावनात्मक तर्क'), b('“I feel worthless, so I must be worthless.”', '“मैं स्वयं को बेकार अनुभव करता हूँ, इसलिए मैं बेकार हूँ।”')],
          ],
        },
        tip: b('Notice the words “always”, “never”, “everyone”, “should” — they often signal a trap.', '“हमेशा”, “कभी नहीं”, “सब”, “चाहिए” जैसे शब्दों पर ध्यान दें — ये प्रायः जाल के संकेत होते हैं।'),
      },
      {
        heading: b('How to challenge a thought', 'विचार को कैसे जाँचें'),
        paragraphs: [b('You don’t have to force positive thinking. The aim is balanced, realistic thinking. Ask yourself these questions like a fair judge:', 'आपको ज़बरदस्ती सकारात्मक सोचने की आवश्यकता नहीं। लक्ष्य संतुलित, यथार्थवादी सोच है। एक निष्पक्ष न्यायाधीश की तरह स्वयं से ये प्रश्न पूछें:')],
        points: [
          b('What is the evidence for this thought? What is the evidence against it?', 'इस विचार के पक्ष में क्या प्रमाण है? विपक्ष में क्या प्रमाण है?'),
          b('Which thinking trap might this be?', 'यह कौन-सा विचार-जाल हो सकता है?'),
          b('What would I say to a close friend who had this thought?', 'यदि मेरे प्रिय मित्र को यह विचार आता, तो मैं उससे क्या कहता/कहती?'),
          b('What is the worst, best and most likely outcome?', 'सबसे बुरा, सबसे अच्छा और सबसे संभावित परिणाम क्या है?'),
          b('Will this matter in 5 years?', 'क्या 5 वर्ष बाद इसका कोई महत्व होगा?'),
        ],
        example: b(
          'Thought: “I failed the maths test, I’m useless.” Balanced thought: “I scored low in one test. I did well in science. I can ask my teacher which chapters to revise. One test doesn’t define me.”',
          'विचार: “गणित की परीक्षा में फेल हो गया, मैं किसी काम का नहीं।” संतुलित विचार: “एक परीक्षा में अंक कम आए। विज्ञान में अच्छा किया। मैं शिक्षक से पूछ सकता हूँ कि कौन-से अध्याय दोहराऊँ। एक परीक्षा मुझे परिभाषित नहीं करती।”'
        ),
      },
      {
        heading: b('Thoughts are visitors, not orders', 'विचार अतिथि हैं, आदेश नहीं'),
        paragraphs: [
          b('Sometimes a thought keeps returning. Instead of fighting it, try saying: “I’m having the thought that…” This small gap between you and the thought reduces its power. Like clouds passing across the sky, thoughts come and go — you are the sky.', 'कभी-कभी कोई विचार बार-बार लौटता है। उससे लड़ने के बजाय कहें: “मुझे यह विचार आ रहा है कि…” आपके और विचार के बीच की यह छोटी दूरी उसकी शक्ति घटा देती है। आकाश में बादलों की तरह विचार आते-जाते हैं — आप आकाश हैं।'),
        ],
      },
    ],
    astro: {
      heading: b('Astrological view: Budh — the planet of intellect', 'ज्योतिष दृष्टि: बुध — बुद्धि का ग्रह'),
      paragraphs: [
        b('In Vedic astrology, Budh (Mercury) rules बुद्धि — reasoning, speech and the nervous system — while Chandra rules feelings. When emotions cloud reasoning, it is said the Moon overpowers Mercury. CBT is in a way strengthening your inner Budh: using clear reasoning to guide feelings.', 'वैदिक ज्योतिष में बुध बुद्धि — तर्क, वाणी और तंत्रिका तंत्र — का कारक है, जबकि चंद्रमा भावों का। जब भावनाएँ तर्क पर हावी हो जाती हैं, तो कहा जाता है कि चंद्र बुध पर भारी पड़ रहा है। CBT एक प्रकार से अपने भीतर के बुध को बलवान करना है: स्पष्ट तर्क से भावों का मार्गदर्शन।'),
      ],
      mantra: { text: 'ॐ बुं बुधाय नमः॥', meaning: b('Salutations to Budh — a simple chant traditionally used for clarity of thought and speech.', 'बुध को नमस्कार — विचार और वाणी की स्पष्टता के लिए परंपरागत सरल जप।') },
    },
    practice: {
      tool: 'thought-record',
      title: b('Thought record — challenge one thought today', 'विचार पत्रिका — आज एक विचार को जाँचें'),
      steps: [
        b('Write the situation and the automatic thought.', 'परिस्थिति और अपने आप आया विचार लिखें।'),
        b('Rate how strongly you believe it and how you feel (0–100).', 'आप उस पर कितना विश्वास करते हैं और कैसा अनुभव करते हैं (0–100) — अंक दें।'),
        b('Pick the thinking trap and write a balanced thought. Rate again.', 'विचार-जाल चुनें और संतुलित विचार लिखें। फिर से अंक दें।'),
      ],
    },
    reflect: [
      b('Which thinking trap do I fall into most often?', 'मैं सबसे अधिक किस विचार-जाल में फँसता/फँसती हूँ?'),
      b('What is one harsh thing I say to myself that I would never say to a friend?', 'मैं स्वयं से कौन-सी कठोर बात कहता/कहती हूँ जो किसी मित्र से कभी नहीं कहूँगा/कहूँगी?'),
      b('What balanced thought can replace it?', 'उसके स्थान पर कौन-सा संतुलित विचार रखा जा सकता है?'),
    ],
    summary: [
      b('Thoughts shape feelings and actions — change the thought, change the loop.', 'विचार भाव और क्रिया को आकार देते हैं — विचार बदलें, चक्र बदलेगा।'),
      b('Learn the ten thinking traps so you can spot them fast.', 'दस विचार-जाल पहचानना सीखें ताकि उन्हें शीघ्र पकड़ सकें।'),
      b('Aim for balanced, not forced-positive, thinking.', 'ज़बरदस्ती सकारात्मक नहीं, संतुलित सोच का लक्ष्य रखें।'),
      b('Thoughts are visitors — you can notice them without obeying them.', 'विचार अतिथि हैं — आप उन्हें देख सकते हैं, मानना आवश्यक नहीं।'),
    ],
  },

  /* ===================================================================== 4 */
  {
    slug: 'chinta-se-mukti',
    number: 4,
    icon: '🌿',
    tone: 'teal',
    minutes: 15,
    audience: b('All ages', 'सभी आयु'),
    title: b('Freedom from Anxiety', 'चिंता से मुक्ति'),
    subtitle: b('Understanding panic, grounding yourself and facing fears', 'घबराहट को समझना, वर्तमान में लौटना और भय का सामना करना'),
    intro: b(
      'Anxiety is the brain’s alarm ringing when there is no fire. It can show up as a racing heart, sweaty palms, a knot in the stomach or endless “what-ifs”. The goal is not to never feel anxious — that is impossible — but to stop anxiety from running your life. The skills in this chapter are used by therapists worldwide.',
      'चिंता मस्तिष्क का वह अलार्म है जो आग न होने पर भी बजता है। यह तेज़ धड़कन, पसीने से भीगी हथेलियाँ, पेट में गाँठ या अंतहीन “अगर ऐसा हुआ तो” के रूप में आती है। लक्ष्य कभी चिंता न होना नहीं है — वह असंभव है — बल्कि चिंता को अपना जीवन चलाने से रोकना है। इस अध्याय के कौशल विश्वभर के चिकित्सक प्रयोग करते हैं।'
    ),
    sections: [
      {
        heading: b('How anxiety shows up in the body', 'शरीर में चिंता कैसे प्रकट होती है'),
        paragraphs: [b('These signs are uncomfortable but they are the body preparing to protect you, not signs of danger.', 'ये संकेत असहज हैं, पर यह शरीर का आपकी रक्षा की तैयारी करना है, खतरे का संकेत नहीं।')],
        points: [
          b('Fast heartbeat, chest tightness', 'तेज़ धड़कन, छाती में जकड़न'),
          b('Quick, shallow breathing; feeling you can’t get enough air', 'तेज़, उथली श्वास; पर्याप्त हवा न मिलने का अनुभव'),
          b('Butterflies or cramps in the stomach', 'पेट में गुदगुदी या ऐंठन'),
          b('Shaking, sweating, dry mouth', 'काँपना, पसीना, मुँह सूखना'),
          b('Racing thoughts, difficulty concentrating', 'दौड़ते विचार, ध्यान केंद्रित करने में कठिनाई'),
        ],
      },
      {
        heading: b('Panic attacks — frightening but not dangerous', 'घबराहट के दौरे (Panic Attack) — डरावने, पर खतरनाक नहीं'),
        paragraphs: [
          b('A panic attack is a sudden rush of intense fear with strong body sensations. Many people fear they are having a heart attack or “going crazy”. In reality, the body’s alarm has fired at full volume. A panic attack usually peaks within about 10 minutes and then passes on its own.', 'घबराहट का दौरा तीव्र भय की अचानक लहर है जिसमें शरीर में तेज़ संवेदनाएँ होती हैं। बहुत से लोग डरते हैं कि उन्हें दिल का दौरा पड़ रहा है या वे “पागल हो रहे हैं”। वास्तव में शरीर का अलार्म पूरी आवाज़ में बज गया है। घबराहट का दौरा प्रायः लगभग 10 मिनट में चरम पर पहुँचकर अपने आप शांत हो जाता है।'),
          b('What helps: slow the out-breath, remind yourself “This is panic, it will pass”, and let the wave rise and fall without fighting it.', 'क्या सहायक है: श्वास धीरे छोड़ें, स्वयं को याद दिलाएँ “यह घबराहट है, यह बीत जाएगी”, और लहर को बिना लड़े उठने और गिरने दें।'),
        ],
        tip: b('If you have chest pain for the first time or have heart problems, always get checked by a doctor to be safe.', 'यदि पहली बार छाती में दर्द हो या हृदय रोग हो, तो सुरक्षा के लिए सदैव चिकित्सक से जाँच कराएँ।'),
      },
      {
        heading: b('5-4-3-2-1 grounding', '5-4-3-2-1 ग्राउंडिंग (वर्तमान में लौटना)'),
        paragraphs: [b('Anxiety lives in the future. Your senses live in the present. Grounding pulls attention back to now.', 'चिंता भविष्य में रहती है। आपकी इंद्रियाँ वर्तमान में रहती हैं। ग्राउंडिंग ध्यान को वर्तमान में वापस लाती है।')],
        points: [
          b('5 things you can see', '5 चीज़ें जो आप देख सकते हैं'),
          b('4 things you can touch', '4 चीज़ें जिन्हें आप छू सकते हैं'),
          b('3 things you can hear', '3 ध्वनियाँ जो आप सुन सकते हैं'),
          b('2 things you can smell', '2 गंध जो आप सूँघ सकते हैं'),
          b('1 thing you can taste', '1 स्वाद जो आप चख सकते हैं'),
        ],
      },
      {
        heading: b('Worry time', 'चिंता का समय'),
        paragraphs: [
          b('Instead of worrying all day, give worry an appointment: 15 minutes at the same time daily (not near bedtime). When a worry pops up at other times, jot it down and tell it, “I’ll see you at 6 pm.” During worry time, sort each worry: can I do something about it? If yes, plan one step. If no, practise letting it go.', 'दिन भर चिंता करने के बजाय चिंता को एक समय दें: प्रतिदिन एक ही समय पर 15 मिनट (सोने के समय के पास नहीं)। किसी और समय चिंता आए तो उसे लिख लें और कहें, “शाम 6 बजे मिलते हैं।” चिंता के समय हर चिंता को छाँटें: क्या मैं इसके लिए कुछ कर सकता/सकती हूँ? हाँ तो एक कदम की योजना बनाएँ। नहीं तो उसे छोड़ने का अभ्यास करें।'),
        ],
      },
      {
        heading: b('Facing fears step by step', 'भय का धीरे-धीरे सामना'),
        paragraphs: [
          b('Avoidance gives quick relief but makes fear grow. Gradual exposure teaches the brain that the feared thing is manageable. Make a “fear ladder” from easiest to hardest and climb one step at a time, staying until the anxiety drops by about half.', 'बचना तुरंत राहत देता है पर भय को बढ़ाता है। धीरे-धीरे सामना करने से मस्तिष्क सीखता है कि वह स्थिति सँभाली जा सकती है। सबसे आसान से सबसे कठिन तक एक “भय की सीढ़ी” बनाएँ और एक-एक सीढ़ी चढ़ें, तब तक रुकें जब तक चिंता लगभग आधी न हो जाए।'),
        ],
        example: b(
          'Fear of speaking in class: 1) Ask a question to one friend. 2) Answer a question in a small group. 3) Ask the teacher a question after class. 4) Raise your hand once in class. 5) Give a 2-minute presentation.',
          'कक्षा में बोलने का भय: 1) एक मित्र से प्रश्न पूछें। 2) छोटे समूह में उत्तर दें। 3) कक्षा के बाद शिक्षक से प्रश्न पूछें। 4) कक्षा में एक बार हाथ उठाएँ। 5) 2 मिनट की प्रस्तुति दें।'
        ),
      },
      {
        heading: b('Go easy on reassurance-seeking', 'बार-बार आश्वासन माँगना कम करें'),
        paragraphs: [
          b('Repeatedly asking “Are you sure it’s fine?” or checking the internet for symptoms calms anxiety for a moment but keeps the cycle going. Try delaying the check by 10 minutes, then 20, and notice the worry fading on its own.', 'बार-बार “पक्का सब ठीक है न?” पूछना या इंटरनेट पर लक्षण खोजना क्षण भर के लिए चिंता शांत करता है, पर चक्र चलता रहता है। जाँचने को पहले 10 मिनट, फिर 20 मिनट टालें, और देखें कि चिंता अपने आप कैसे कम होती है।'),
        ],
      },
    ],
    astro: {
      heading: b('Astrological view: Rahu and restlessness', 'ज्योतिष दृष्टि: राहु और बेचैनी'),
      paragraphs: [
        b('Rahu is associated with the unknown, sudden events and an anxious, restless mind, especially when linked with the Moon. Astrology suggests Rahu is best handled with discipline, routine and grounding — exactly what psychology recommends for anxiety. Traditional remedies include chanting, helping others and regular meditation.', 'राहु को अज्ञात, अचानक घटनाओं और चिंतित, बेचैन मन से जोड़ा जाता है, विशेषकर जब वह चंद्रमा से संबंध बनाए। ज्योतिष कहता है कि राहु को अनुशासन, नियमित दिनचर्या और स्थिरता से साधा जाता है — ठीक वही जो मनोविज्ञान चिंता के लिए सुझाता है। परंपरागत उपायों में जप, दूसरों की सहायता और नियमित ध्यान सम्मिलित हैं।'),
      ],
      mantra: { text: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।\nउर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्॥', meaning: b('The Mahamrityunjaya mantra — chanted for courage and freedom from fear.', 'महामृत्युंजय मंत्र — साहस और भय से मुक्ति के लिए जपा जाता है।') },
    },
    practice: {
      tool: 'grounding',
      title: b('Guided 5-4-3-2-1 grounding', 'मार्गदर्शित 5-4-3-2-1 ग्राउंडिंग'),
      steps: [
        b('Use this whenever anxiety rises — at home, in class, in the office.', 'जब भी चिंता बढ़े — घर, कक्षा या कार्यालय में — इसका प्रयोग करें।'),
        b('Go slowly; name each item in your mind or aloud.', 'धीरे-धीरे करें; हर वस्तु का नाम मन में या बोलकर लें।'),
        b('Finish with three slow out-breaths.', 'अंत में तीन बार धीरे-धीरे श्वास छोड़ें।'),
      ],
    },
    reflect: [
      b('Where do I feel anxiety first in my body?', 'मैं अपने शरीर में चिंता सबसे पहले कहाँ अनुभव करता/करती हूँ?'),
      b('What do I usually avoid because of fear? What would be step one of my fear ladder?', 'भय के कारण मैं प्रायः किससे बचता/बचती हूँ? मेरी भय की सीढ़ी का पहला कदम क्या होगा?'),
      b('What time can I set aside as my daily “worry time”?', 'मैं अपने दैनिक “चिंता के समय” के लिए कौन-सा समय निश्चित कर सकता/सकती हूँ?'),
    ],
    summary: [
      b('Anxiety is a false alarm — uncomfortable, not dangerous.', 'चिंता एक झूठा अलार्म है — असहज, पर खतरनाक नहीं।'),
      b('Panic peaks in about 10 minutes and passes; don’t fight the wave.', 'घबराहट लगभग 10 मिनट में चरम पर पहुँचकर बीत जाती है; लहर से न लड़ें।'),
      b('Grounding, worry time and gradual exposure retrain the alarm.', 'ग्राउंडिंग, चिंता का समय और धीरे-धीरे सामना — ये अलार्म को फिर से प्रशिक्षित करते हैं।'),
    ],
  },
];
