// मनोबल — अध्याय 5–8 (bilingual { en, hi })
const b = (en, hi) => ({ en, hi });

export const PART2 = [
  /* ===================================================================== 5 */
  {
    slug: 'udasi-se-bahar',
    number: 5,
    icon: '🌅',
    tone: 'saffron',
    minutes: 16,
    audience: b('All ages', 'सभी आयु'),
    title: b('Rising Out of Low Mood', 'उदासी से बाहर'),
    subtitle: b('Small actions that lift the heaviness of depression', 'छोटे कदम जो अवसाद के भारीपन को हल्का करते हैं'),
    intro: b(
      'Depression can make everything feel grey and heavy — even getting out of bed. It is one of the most common health conditions in the world, and it is treatable. This chapter explains why low mood tends to feed itself and shares a proven method called behavioural activation: when motivation is missing, action comes first and motivation follows.',
      'अवसाद में सब कुछ धूसर और भारी लगने लगता है — बिस्तर से उठना भी। यह विश्व की सबसे सामान्य स्वास्थ्य समस्याओं में से एक है, और इसका उपचार संभव है। यह अध्याय बताता है कि उदासी स्वयं को क्यों बढ़ाती है, और व्यवहार सक्रियता (Behavioural Activation) नामक एक प्रमाणित विधि सिखाता है: जब प्रेरणा न हो, तो पहले कर्म आता है और प्रेरणा बाद में।'
    ),
    sections: [
      {
        heading: b('The low mood cycle', 'उदासी का चक्र'),
        paragraphs: [
          b('When we feel low, we do less — we skip friends, hobbies and walks. Doing less means fewer good moments and more time with heavy thoughts, which makes us feel lower still. The cycle tightens.', 'जब हम उदास होते हैं, तो कम करते हैं — मित्रों, शौक और सैर को छोड़ देते हैं। कम करने से अच्छे क्षण घटते हैं और भारी विचारों के साथ समय बढ़ता है, जिससे उदासी और गहरी होती है। चक्र कसता जाता है।'),
          b('The good news: the cycle also works in reverse. Even a small activity creates a small lift, which makes the next activity a little easier.', 'शुभ समाचार: यह चक्र उल्टी दिशा में भी चलता है। एक छोटा-सा कार्य भी थोड़ा उत्साह देता है, जिससे अगला कार्य थोड़ा आसान हो जाता है।'),
        ],
        tip: b('Don’t wait to “feel like it”. Act first, feelings follow.', '“मन करने” की प्रतीक्षा न करें। पहले करें, भाव पीछे आएँगे।'),
      },
      {
        heading: b('Behavioural activation — start tiny', 'व्यवहार सक्रियता — बहुत छोटे से आरंभ'),
        paragraphs: [b('Choose actions so small that they feel almost too easy. Success builds momentum.', 'इतने छोटे कार्य चुनें कि वे लगभग बहुत आसान लगें। सफलता से गति बनती है।')],
        points: [
          b('Open the curtains and sit in sunlight for 5 minutes.', 'पर्दे खोलें और 5 मिनट धूप में बैठें।'),
          b('Take a 10-minute walk, even around the building.', '10 मिनट टहलें, चाहे भवन के चारों ओर ही।'),
          b('Shower and wear fresh clothes.', 'स्नान करें और साफ़ वस्त्र पहनें।'),
          b('Send one message to a friend or relative.', 'किसी मित्र या संबंधी को एक संदेश भेजें।'),
          b('Water a plant, cook one simple dish, tidy one shelf.', 'पौधे को पानी दें, एक सरल व्यंजन बनाएँ, एक अलमारी सजाएँ।'),
        ],
      },
      {
        heading: b('Pleasure and mastery', 'आनंद और उपलब्धि'),
        paragraphs: [
          b('Plan two kinds of activities each day. Pleasure activities bring enjoyment (music, a favourite snack, time with a pet). Mastery activities bring a sense of achievement (finishing a task, learning a skill, paying a bill). Depression steals both — we deliberately put them back.', 'हर दिन दो प्रकार के कार्य योजना में रखें। आनंद के कार्य सुख देते हैं (संगीत, पसंदीदा नाश्ता, पालतू के साथ समय)। उपलब्धि के कार्य सफलता का भाव देते हैं (कोई काम पूरा करना, नया कौशल सीखना, बिल भरना)। अवसाद दोनों छीन लेता है — हम सोच-समझकर उन्हें वापस लाते हैं।'),
        ],
        example: b(
          'Amit, 45, stopped going to his evening satsang after a job loss. His plan: Monday — 15-minute walk (pleasure), update CV for 20 minutes (mastery). Tuesday — call his brother (pleasure), fix the leaking tap (mastery). By week three he was back at satsang.',
          'अमित (45 वर्ष) ने नौकरी छूटने के बाद शाम का सत्संग जाना छोड़ दिया। उनकी योजना: सोमवार — 15 मिनट सैर (आनंद), 20 मिनट बायोडाटा सुधारना (उपलब्धि)। मंगलवार — भाई को फ़ोन (आनंद), टपकता नल ठीक करना (उपलब्धि)। तीसरे सप्ताह तक वे फिर सत्संग जाने लगे।'
        ),
      },
      {
        heading: b('Self-compassion', 'स्वयं के प्रति करुणा'),
        paragraphs: [
          b('Depression often comes with a harsh inner critic. Self-compassion means treating yourself like you would treat a dear friend who is struggling — with patience, not punishment. Research shows self-compassion reduces depression and increases motivation.', 'अवसाद के साथ प्रायः एक कठोर भीतरी आलोचक आता है। स्वयं के प्रति करुणा का अर्थ है स्वयं से वैसा व्यवहार करना जैसा आप कठिनाई में पड़े किसी प्रिय मित्र से करते — धैर्य से, दंड से नहीं। शोध बताते हैं कि आत्म-करुणा अवसाद घटाती है और प्रेरणा बढ़ाती है।'),
        ],
        points: [
          b('Place a hand on your heart and say: “This is a hard moment. I am not alone in this. May I be kind to myself.”', 'हृदय पर हाथ रखकर कहें: “यह कठिन क्षण है। मैं इसमें अकेला/अकेली नहीं हूँ। मैं स्वयं के प्रति दयालु रहूँ।”'),
          b('Replace “I’m lazy” with “I’m unwell and doing my best today.”', '“मैं आलसी हूँ” के स्थान पर कहें “मैं अस्वस्थ हूँ और आज अपना सर्वश्रेष्ठ कर रहा/रही हूँ।”'),
        ],
      },
      {
        heading: b('Supporting a loved one', 'अपने प्रियजन का साथ कैसे दें'),
        paragraphs: [b('If someone you love seems low, your presence matters more than perfect words.', 'यदि आपका कोई प्रियजन उदास लगे, तो उत्तम शब्दों से अधिक आपकी उपस्थिति मायने रखती है।')],
        points: [
          b('Listen without rushing to fix or judge.', 'बिना जल्दबाज़ी में समाधान दिए या आलोचना किए सुनें।'),
          b('Avoid “Just cheer up” or “Others have it worse”.', '“बस खुश रहो” या “दूसरों की हालत तुमसे बुरी है” कहने से बचें।'),
          b('Offer practical help: a walk together, a meal, going to the doctor with them.', 'व्यावहारिक सहायता दें: साथ में सैर, भोजन, उनके साथ चिकित्सक के पास जाना।'),
          b('Check in regularly — a short message says “I haven’t forgotten you”.', 'नियमित हालचाल पूछें — एक छोटा संदेश कहता है “मैं तुम्हें भूला नहीं हूँ”।'),
        ],
      },
      {
        heading: b('Red flags — when to seek professional help', 'चेतावनी के संकेत — कब विशेषज्ञ की सहायता लें'),
        paragraphs: [
          b('Please see a doctor, psychologist or counsellor if low mood lasts more than two weeks, affects work or studies, or if there are thoughts of self-harm or that life is not worth living. If you or someone is in immediate danger, call emergency services or a helpline right away.', 'यदि उदासी दो सप्ताह से अधिक रहे, काम या पढ़ाई प्रभावित हो, या स्वयं को हानि पहुँचाने अथवा जीवन व्यर्थ लगने के विचार आएँ, तो कृपया चिकित्सक, मनोवैज्ञानिक या परामर्शदाता से मिलें। यदि आप या कोई और तत्काल खतरे में है, तो तुरंत आपातकालीन सेवा या हेल्पलाइन पर फ़ोन करें।'),
          b('Depression is treatable. Talking therapy, and when needed medicines prescribed by a doctor, help most people recover. Taking treatment is as normal as treating a fever.', 'अवसाद का उपचार संभव है। बातचीत आधारित चिकित्सा, और आवश्यकता होने पर चिकित्सक द्वारा दी गई दवाएँ, अधिकांश लोगों को स्वस्थ होने में सहायता करती हैं। उपचार लेना उतना ही सामान्य है जितना बुखार का इलाज।'),
        ],
        tip: b('This course supports wellbeing; it does not replace diagnosis or treatment by a qualified professional.', 'यह पाठ्यक्रम मानसिक कल्याण में सहायक है; यह योग्य विशेषज्ञ के निदान या उपचार का विकल्प नहीं है।'),
      },
    ],
    astro: {
      heading: b('Astrological view: Sun, Moon and Guru — light, mind and hope', 'ज्योतिष दृष्टि: सूर्य, चंद्र और गुरु — प्रकाश, मन और आशा'),
      paragraphs: [
        b('A weak Sun is linked with low confidence and energy, a troubled Moon with sadness, and Jupiter (गुरु) is the planet of hope and wisdom. Traditional supportive practices: offering water to the rising Sun (सूर्य अर्घ्य) — which also gives morning sunlight, known to lift mood — spending time with elders or a guru, and reading uplifting scriptures.', 'निर्बल सूर्य को आत्मविश्वास और ऊर्जा की कमी से, पीड़ित चंद्रमा को उदासी से, और गुरु (बृहस्पति) को आशा और ज्ञान से जोड़ा जाता है। परंपरागत सहायक उपाय: उगते सूर्य को जल अर्पित करना (सूर्य अर्घ्य) — जिससे सुबह की धूप भी मिलती है, जो मनोदशा सुधारने के लिए जानी जाती है — बड़ों या गुरु के साथ समय बिताना, और प्रेरणादायक ग्रंथ पढ़ना।'),
      ],
      mantra: { text: 'ॐ घृणि सूर्याय नमः॥', meaning: b('Salutations to the radiant Sun — chanted while offering morning arghya.', 'तेजस्वी सूर्य को नमस्कार — सुबह अर्घ्य देते समय जपें।') },
    },
    practice: {
      tool: 'mood',
      title: b('Mood & activity tracker', 'मनोदशा एवं कार्य पत्रिका'),
      steps: [
        b('Each evening, rate your mood from 1 to 5.', 'हर शाम अपनी मनोदशा को 1 से 5 तक अंक दें।'),
        b('Note one pleasure and one mastery activity you did.', 'एक आनंद का और एक उपलब्धि का कार्य लिखें जो आपने किया।'),
        b('After a week, look at the pattern: which activities lifted your mood?', 'एक सप्ताह बाद पैटर्न देखें: किन कार्यों से मनोदशा अच्छी हुई?'),
      ],
    },
    reflect: [
      b('What activities did I enjoy before I started feeling low?', 'उदास होने से पहले मुझे किन कार्यों में आनंद आता था?'),
      b('What is the smallest step I can take tomorrow morning?', 'कल सुबह मैं सबसे छोटा कौन-सा कदम उठा सकता/सकती हूँ?'),
      b('Who is one person I could reach out to this week?', 'इस सप्ताह मैं किस एक व्यक्ति से संपर्क कर सकता/सकती हूँ?'),
    ],
    summary: [
      b('Low mood feeds inactivity, and inactivity feeds low mood — break the cycle with tiny actions.', 'उदासी निष्क्रियता बढ़ाती है और निष्क्रियता उदासी — छोटे कदमों से चक्र तोड़ें।'),
      b('Plan daily pleasure and mastery activities.', 'प्रतिदिन आनंद और उपलब्धि के कार्य योजना में रखें।'),
      b('Speak to yourself with compassion.', 'स्वयं से करुणा से बात करें।'),
      b('Depression is treatable — seek professional help when red flags appear.', 'अवसाद का उपचार संभव है — चेतावनी संकेत दिखें तो विशेषज्ञ से मिलें।'),
    ],
  },

  /* ===================================================================== 6 */
  {
    slug: 'neend-aur-dinacharya',
    number: 6,
    icon: '🌙',
    tone: 'indigo',
    minutes: 13,
    audience: b('All ages', 'सभी आयु'),
    title: b('Sleep & Daily Routine', 'नींद और दिनचर्या'),
    subtitle: b('The foundation of a steady mind', 'स्थिर मन की नींव'),
    intro: b(
      'Sleep is when the brain cleans itself, stores memories and resets emotions. After a poor night, the alarm system (amygdala) becomes much more reactive — small problems feel huge. A regular routine is one of the simplest and most powerful tools for mental health. Ayurveda called this दिनचर्या centuries ago.',
      'नींद में मस्तिष्क स्वयं को साफ़ करता है, स्मृतियाँ सहेजता है और भावनाओं को संतुलित करता है। खराब रात के बाद अलार्म तंत्र (एमिग्डाला) कहीं अधिक प्रतिक्रियाशील हो जाता है — छोटी समस्याएँ बहुत बड़ी लगती हैं। नियमित दिनचर्या मानसिक स्वास्थ्य के सबसे सरल और प्रभावशाली उपायों में से एक है। आयुर्वेद ने सदियों पहले इसे दिनचर्या कहा था।'
    ),
    sections: [
      {
        heading: b('How much sleep do we need?', 'हमें कितनी नींद चाहिए?'),
        paragraphs: [b('Needs vary a little from person to person, but these are the usual guidelines.', 'आवश्यकता व्यक्ति के अनुसार थोड़ी अलग होती है, पर सामान्य दिशानिर्देश ये हैं।')],
        table: {
          columns: [b('Age', 'आयु'), b('Recommended sleep', 'अनुशंसित नींद')],
          rows: [
            [b('6–12 years', '6–12 वर्ष'), b('9–12 hours', '9–12 घंटे')],
            [b('13–18 years', '13–18 वर्ष'), b('8–10 hours', '8–10 घंटे')],
            [b('Adults', 'वयस्क'), b('7–9 hours', '7–9 घंटे')],
            [b('65+ years', '65+ वर्ष'), b('7–8 hours', '7–8 घंटे')],
          ],
        },
      },
      {
        heading: b('Sleep hygiene — habits for better sleep', 'अच्छी नींद की आदतें'),
        paragraphs: [b('Small changes add up. Try a few at a time.', 'छोटे बदलाव मिलकर बड़ा परिणाम देते हैं। कुछ-कुछ करके अपनाएँ।')],
        points: [
          b('Wake up at the same time every day, even on holidays — this anchors your body clock.', 'हर दिन एक ही समय पर उठें, छुट्टी के दिन भी — इससे शरीर की घड़ी स्थिर होती है।'),
          b('Get morning sunlight within an hour of waking.', 'उठने के एक घंटे के भीतर सुबह की धूप लें।'),
          b('Keep screens away for 30–60 minutes before bed; blue light and scrolling keep the brain alert.', 'सोने से 30–60 मिनट पहले स्क्रीन दूर रखें; नीली रोशनी और स्क्रॉलिंग मस्तिष्क को जगाए रखते हैं।'),
          b('Avoid tea, coffee and cola after 2–3 pm.', 'दोपहर 2–3 बजे के बाद चाय, कॉफ़ी और कोला से बचें।'),
          b('Keep the bedroom cool, dark and quiet; use the bed only for sleep.', 'शयनकक्ष ठंडा, अँधेरा और शांत रखें; बिस्तर का प्रयोग केवल सोने के लिए करें।'),
          b('If you can’t sleep in 20 minutes, get up, do something calm in dim light, and return when sleepy.', '20 मिनट में नींद न आए तो उठें, धीमी रोशनी में कुछ शांत करें, और नींद आने पर लौटें।'),
          b('Keep naps short (under 30 minutes) and before 3 pm.', 'दोपहर की झपकी छोटी (30 मिनट से कम) और 3 बजे से पहले रखें।'),
        ],
      },
      {
        heading: b('A wind-down routine', 'सोने से पहले की शांत दिनचर्या'),
        paragraphs: [b('The brain needs a signal that the day is ending. Repeat the same gentle sequence every night.', 'मस्तिष्क को संकेत चाहिए कि दिन समाप्त हो रहा है। हर रात वही कोमल क्रम दोहराएँ।')],
        points: [
          b('Dim the lights an hour before bed.', 'सोने से एक घंटा पहले रोशनी धीमी करें।'),
          b('Write tomorrow’s to-do list to empty the mind.', 'मन खाली करने के लिए कल के कार्यों की सूची लिखें।'),
          b('Warm bath or wash face, hands and feet.', 'गुनगुने पानी से स्नान या हाथ-पैर-मुँह धोएँ।'),
          b('Light reading, prayer or 4-7-8 breathing.', 'हल्का पठन, प्रार्थना या 4-7-8 श्वास।'),
          b('Write three good things from the day.', 'दिन की तीन अच्छी बातें लिखें।'),
        ],
      },
      {
        heading: b('Ayurvedic दिनचर्या — timeless supportive habits', 'आयुर्वेदिक दिनचर्या — कालजयी सहायक आदतें'),
        paragraphs: [
          b('Ayurveda recommends living in rhythm with nature. Many of these habits match modern research on body clocks.', 'आयुर्वेद प्रकृति की लय के साथ जीने की सलाह देता है। इनमें से कई आदतें शरीर की घड़ी पर आधुनिक शोध से मेल खाती हैं।'),
        ],
        points: [
          b('Brahma Muhurta: waking about 1.5 hours before sunrise is ideal for study, prayer and meditation — the mind is fresh and quiet.', 'ब्रह्म मुहूर्त: सूर्योदय से लगभग डेढ़ घंटा पहले उठना अध्ययन, प्रार्थना और ध्यान के लिए उत्तम — मन ताज़ा और शांत रहता है।'),
          b('सूर्य दर्शन: seeing the morning Sun sets the body clock and lifts mood.', 'सूर्य दर्शन: सुबह के सूर्य के दर्शन से शरीर की घड़ी ठीक होती है और मनोदशा अच्छी रहती है।'),
          b('Largest meal at midday, when digestion is strongest; a light dinner 2–3 hours before sleep.', 'सबसे भारी भोजन दोपहर में जब पाचन सबसे प्रबल हो; रात का भोजन हल्का और सोने से 2–3 घंटे पहले।'),
          b('Sleep by about 10 pm.', 'रात लगभग 10 बजे तक सो जाएँ।'),
          b('Oil massage of feet (पादाभ्यंग) before sleep is traditionally calming.', 'सोने से पहले पैरों की तेल मालिश (पादाभ्यंग) परंपरागत रूप से शांतिदायक मानी जाती है।'),
        ],
        tip: b('Start by shifting your wake time 15 minutes earlier each week rather than changing everything at once.', 'सब कुछ एक साथ बदलने के बजाय हर सप्ताह उठने का समय 15 मिनट पहले करें।'),
      },
      {
        heading: b('Movement, food and the mind', 'व्यायाम, भोजन और मन'),
        paragraphs: [
          b('Regular movement — even a brisk 30-minute walk five days a week — is shown to reduce anxiety and depression. Balanced meals, enough water and limiting sugar and junk food keep energy and mood more stable.', 'नियमित व्यायाम — सप्ताह में पाँच दिन 30 मिनट तेज़ चलना भी — चिंता और अवसाद घटाने में सहायक सिद्ध हुआ है। संतुलित भोजन, पर्याप्त पानी और चीनी व जंक फ़ूड कम करने से ऊर्जा और मनोदशा अधिक स्थिर रहती है।'),
        ],
      },
    ],
    astro: {
      heading: b('Astrological view: living with the Sun and Moon', 'ज्योतिष दृष्टि: सूर्य और चंद्र के साथ जीवन'),
      paragraphs: [
        b('Jyotish sees the day as ruled by the Sun (activity, clarity) and the night by the Moon (rest, emotion). Honouring this rhythm — active by day, restful by night — is itself considered strengthening for both. Many families still begin the day with सूर्य अर्घ्य and end it with संध्या दीप — beautiful anchors of routine.', 'ज्योतिष दिन को सूर्य (क्रियाशीलता, स्पष्टता) और रात्रि को चंद्रमा (विश्राम, भावना) के अधीन मानता है। इस लय का सम्मान — दिन में सक्रिय, रात में विश्राम — दोनों ग्रहों को बल देने वाला माना गया है। बहुत से परिवार आज भी दिन का आरंभ सूर्य अर्घ्य से और अंत संध्या दीप से करते हैं — दिनचर्या के सुंदर आधार।'),
      ],
    },
    practice: {
      tool: null,
      title: b('My 7-day routine challenge', 'मेरी 7-दिवसीय दिनचर्या चुनौती'),
      steps: [
        b('Fix one wake-up time and keep it for 7 days.', 'उठने का एक समय तय करें और 7 दिन तक उसका पालन करें।'),
        b('Get 10 minutes of morning sunlight daily.', 'प्रतिदिन 10 मिनट सुबह की धूप लें।'),
        b('Screens off 45 minutes before bed.', 'सोने से 45 मिनट पहले स्क्रीन बंद।'),
        b('No tea or coffee after 2 pm.', 'दोपहर 2 बजे के बाद चाय या कॉफ़ी नहीं।'),
        b('Write three good things before sleeping.', 'सोने से पहले तीन अच्छी बातें लिखें।'),
      ],
    },
    reflect: [
      b('How many hours do I actually sleep on most nights?', 'अधिकतर रातों में मैं वास्तव में कितने घंटे सोता/सोती हूँ?'),
      b('What keeps me awake — screens, worries, caffeine, noise?', 'मुझे क्या जगाए रखता है — स्क्रीन, चिंताएँ, चाय-कॉफ़ी, शोर?'),
      b('Which one habit from this chapter will I start tonight?', 'इस अध्याय की कौन-सी एक आदत मैं आज रात से आरंभ करूँगा/करूँगी?'),
    ],
    summary: [
      b('Poor sleep makes the brain’s alarm more reactive; good sleep resets emotions.', 'कम नींद मस्तिष्क के अलार्म को अधिक प्रतिक्रियाशील बनाती है; अच्छी नींद भावनाओं को संतुलित करती है।'),
      b('A fixed wake time and morning sunlight are the two strongest habits.', 'उठने का निश्चित समय और सुबह की धूप — ये दो सबसे प्रभावी आदतें हैं।'),
      b('Ayurvedic दिनचर्या and modern sleep science point in the same direction.', 'आयुर्वेदिक दिनचर्या और आधुनिक नींद विज्ञान एक ही दिशा दिखाते हैं।'),
    ],
  },

  /* ===================================================================== 7 */
  {
    slug: 'pariksha-ka-tanav',
    number: 7,
    icon: '📚',
    tone: 'saffron',
    minutes: 17,
    audience: b('Students & parents', 'विद्यार्थी एवं अभिभावक'),
    title: b('Beating Exam Stress', 'परीक्षा का तनाव'),
    subtitle: b('Study smarter, handle pressure, and bounce back from results', 'समझदारी से पढ़ें, दबाव सँभालें और परिणाम के बाद फिर उठें'),
    intro: b(
      'Board exams, entrance tests, competitive exams — Indian students face enormous pressure. A little stress keeps you alert, but too much blocks memory and focus. This chapter gives you science-backed study methods, ways to handle comparison and results, and a special section for parents.',
      'बोर्ड परीक्षा, प्रवेश परीक्षा, प्रतियोगी परीक्षा — भारतीय विद्यार्थी भारी दबाव का सामना करते हैं। थोड़ा तनाव सतर्क रखता है, पर अधिक तनाव स्मृति और एकाग्रता को रोक देता है। यह अध्याय आपको विज्ञान-सम्मत अध्ययन विधियाँ, तुलना और परिणाम को सँभालने के उपाय, और अभिभावकों के लिए एक विशेष खंड देता है।'
    ),
    sections: [
      {
        heading: b('Why stress blocks memory', 'तनाव स्मृति को क्यों रोकता है'),
        paragraphs: [
          b('Under high stress, the alarm system takes over and the thinking brain (prefrontal cortex) and memory centre (hippocampus) work less efficiently. That is why you “go blank” in an exam even after studying. Calming the body before and during the exam literally unlocks your memory.', 'अधिक तनाव में अलार्म तंत्र नियंत्रण ले लेता है और सोचने वाला मस्तिष्क (प्रीफ़्रंटल कॉर्टेक्स) तथा स्मृति केंद्र (हिप्पोकैम्पस) कम कुशलता से काम करते हैं। इसीलिए पढ़ने के बाद भी परीक्षा में मन “खाली” हो जाता है। परीक्षा से पहले और दौरान शरीर को शांत करना वास्तव में आपकी स्मृति के द्वार खोलता है।'),
        ],
        tip: b('In the exam hall: three slow out-breaths before you open the paper, and again whenever you feel stuck.', 'परीक्षा कक्ष में: प्रश्नपत्र खोलने से पहले तीन बार धीरे-धीरे श्वास छोड़ें, और जब भी अटकें तो फिर से।'),
      },
      {
        heading: b('The Pomodoro method for focus', 'एकाग्रता के लिए पोमोडोरो विधि'),
        paragraphs: [b('Short, focused bursts beat long, distracted hours.', 'लंबे, भटके हुए घंटों से छोटे, केंद्रित सत्र बेहतर हैं।')],
        points: [
          b('Choose one task. Put the phone in another room.', 'एक कार्य चुनें। फ़ोन दूसरे कमरे में रखें।'),
          b('Study with full focus for 25 minutes.', '25 मिनट पूरी एकाग्रता से पढ़ें।'),
          b('Take a 5-minute break — stretch, drink water, look outside.', '5 मिनट विराम लें — अंगड़ाई, पानी, बाहर देखना।'),
          b('After four rounds, take a longer 15–30 minute break.', 'चार चक्र के बाद 15–30 मिनट का लंबा विराम लें।'),
        ],
      },
      {
        heading: b('Study methods that actually work', 'अध्ययन की विधियाँ जो वास्तव में काम करती हैं'),
        paragraphs: [b('Re-reading and highlighting feel productive but are among the weakest methods. Research favours these:', 'दोबारा पढ़ना और रेखांकित करना उपयोगी लगता है पर यह सबसे कमज़ोर विधियों में है। शोध इनका समर्थन करते हैं:')],
        table: {
          columns: [b('Method', 'विधि'), b('How to do it', 'कैसे करें')],
          rows: [
            [b('Active recall', 'सक्रिय स्मरण'), b('Close the book and write or say everything you remember; then check.', 'पुस्तक बंद करके जो याद है वह लिखें या बोलें; फिर जाँचें।')],
            [b('Spaced revision', 'अंतराल पर दोहराव'), b('Revise after 1 day, 3 days, 1 week, 1 month.', '1 दिन, 3 दिन, 1 सप्ताह, 1 महीने बाद दोहराएँ।')],
            [b('Practice tests', 'अभ्यास परीक्षा'), b('Solve previous years’ papers under timed conditions.', 'पिछले वर्षों के प्रश्नपत्र समय-सीमा में हल करें।')],
            [b('Teach it', 'पढ़ाकर सीखें'), b('Explain a topic to a sibling, friend or an empty chair.', 'कोई विषय भाई-बहन, मित्र या खाली कुर्सी को समझाएँ।')],
            [b('Mix topics', 'विषय मिलाएँ'), b('Alternate between chapters instead of one topic for hours.', 'घंटों एक ही विषय के बजाय अध्याय बदल-बदलकर पढ़ें।')],
          ],
        },
      },
      {
        heading: b('Comparison and social media', 'तुलना और सोशल मीडिया'),
        paragraphs: [
          b('“Sharma ji ka beta got 98%” — comparison is one of the biggest stress sources for Indian students. Remember: you see others’ highlights, not their struggles. Compare yourself only with who you were last month.', '“शर्मा जी के बेटे के 98% आए” — तुलना भारतीय विद्यार्थियों के तनाव के सबसे बड़े कारणों में है। याद रखें: आप दूसरों की उपलब्धियाँ देखते हैं, उनके संघर्ष नहीं। स्वयं की तुलना केवल पिछले महीने के स्वयं से करें।'),
        ],
        points: [
          b('Mute or unfollow accounts that make you feel inadequate.', 'जो खाते आपको हीन अनुभव कराते हैं उन्हें म्यूट या अनफ़ॉलो करें।'),
          b('Set app time limits during exam months.', 'परीक्षा के महीनों में ऐप के समय की सीमा तय करें।'),
          b('Keep one day a week mostly offline.', 'सप्ताह में एक दिन अधिकतर ऑफ़लाइन रहें।'),
        ],
      },
      {
        heading: b('Talking to parents', 'अभिभावकों से बात करना'),
        paragraphs: [
          b('Parents usually worry because they care. Choose a calm moment, and speak about your feelings, not their faults: “I feel very anxious about the exam. It helps me when you ask how I am, rather than how many chapters are left.” If talking is hard, write a letter.', 'अभिभावक प्रायः इसलिए चिंता करते हैं क्योंकि वे प्रेम करते हैं। शांत समय चुनें, और उनकी गलतियों पर नहीं, अपने भावों पर बात करें: “मुझे परीक्षा को लेकर बहुत घबराहट होती है। जब आप पूछते हैं कि मैं कैसा हूँ, न कि कितने अध्याय बाकी हैं, तो मुझे सहायता मिलती है।” बोलना कठिन हो तो पत्र लिखें।'),
        ],
      },
      {
        heading: b('Results, failure and bouncing back', 'परिणाम, असफलता और फिर से उठना'),
        paragraphs: [
          b('A result is feedback about one exam on one day — not a verdict on your worth or future. Many successful people failed exams, changed streams or took a drop year. After a disappointing result: feel it, talk to someone, then ask “What can I learn? What is my next step?”', 'परिणाम एक दिन की एक परीक्षा के बारे में प्रतिक्रिया है — आपके मूल्य या भविष्य पर निर्णय नहीं। बहुत से सफल लोग परीक्षाओं में असफल हुए, विषय बदले या एक वर्ष रुके। निराशाजनक परिणाम के बाद: भाव को स्वीकारें, किसी से बात करें, फिर पूछें “मैं इससे क्या सीख सकता/सकती हूँ? मेरा अगला कदम क्या है?”'),
        ],
        tip: b('If you ever feel you can’t face the result or life, please talk to a parent, teacher or helpline immediately — you matter far more than any mark sheet.', 'यदि कभी लगे कि आप परिणाम या जीवन का सामना नहीं कर पाएँगे, तो कृपया तुरंत अभिभावक, शिक्षक या हेल्पलाइन से बात करें — आप किसी भी अंकपत्र से कहीं अधिक मूल्यवान हैं।'),
      },
      {
        heading: b('For parents', 'अभिभावकों के लिए'),
        paragraphs: [b('Your support is the strongest protection your child has.', 'आपका साथ आपके बच्चे की सबसे बड़ी सुरक्षा है।')],
        points: [
          b('Praise effort and progress, not only marks.', 'केवल अंकों की नहीं, प्रयास और प्रगति की प्रशंसा करें।'),
          b('Avoid comparisons with siblings, cousins or neighbours.', 'भाई-बहन, रिश्तेदारों या पड़ोसियों से तुलना न करें।'),
          b('Protect their sleep and meals during exams.', 'परीक्षा के दिनों में उनकी नींद और भोजन का ध्यान रखें।'),
          b('Say clearly: “We love you whatever the result.”', 'स्पष्ट कहें: “परिणाम जो भी हो, हम तुमसे प्रेम करते हैं।”'),
          b('Watch for withdrawal, not eating, or hopeless talk — and seek help early.', 'अलग-थलग रहना, भोजन न करना या निराशा की बातें — इन पर ध्यान दें और शीघ्र सहायता लें।'),
        ],
      },
    ],
    astro: {
      heading: b('Astrological view: Budh, Guru and the 5th house', 'ज्योतिष दृष्टि: बुध, गुरु और पंचम भाव'),
      paragraphs: [
        b('In the birth chart, the 4th house relates to schooling, the 5th house to intelligence and learning, and Budh (Mercury) and Guru (Jupiter) to intellect and wisdom. Maa Saraswati is the deity of learning. Many students chant her mantra before studying — a simple ritual that also works as a focus anchor.', 'जन्म कुंडली में चतुर्थ भाव शिक्षा से, पंचम भाव बुद्धि और विद्या से, और बुध तथा गुरु बुद्धि व ज्ञान से संबंधित हैं। माँ सरस्वती विद्या की देवी हैं। बहुत से विद्यार्थी पढ़ने से पहले उनका मंत्र जपते हैं — यह सरल अनुष्ठान एकाग्रता का आधार भी बनता है।'),
      ],
      mantra: { text: 'ॐ ऐं सरस्वत्यै नमः॥', meaning: b('Salutations to Goddess Saraswati, giver of knowledge — chant 11 times before study.', 'ज्ञान देने वाली माँ सरस्वती को नमस्कार — पढ़ाई से पहले 11 बार जपें।') },
    },
    practice: {
      tool: 'focus-timer',
      title: b('Pomodoro focus timer', 'पोमोडोरो एकाग्रता टाइमर'),
      steps: [
        b('Write the one topic you will study.', 'वह एक विषय लिखें जो आप पढ़ेंगे।'),
        b('Start the 25-minute timer and study without the phone.', '25 मिनट का टाइमर आरंभ करें और फ़ोन के बिना पढ़ें।'),
        b('When the break starts, move your body and breathe.', 'विराम आरंभ होने पर शरीर हिलाएँ और श्वास लें।'),
      ],
    },
    reflect: [
      b('What exactly worries me most about my exams?', 'परीक्षा के बारे में मुझे सबसे अधिक किस बात की चिंता है?'),
      b('Which study method will I try this week instead of re-reading?', 'दोबारा पढ़ने के बजाय इस सप्ताह मैं कौन-सी विधि आज़माऊँगा/आज़माऊँगी?'),
      b('What would I say to a younger student who failed an exam?', 'परीक्षा में असफल हुए किसी छोटे विद्यार्थी से मैं क्या कहूँगा/कहूँगी?'),
    ],
    summary: [
      b('A calm body unlocks memory — breathe before and during exams.', 'शांत शरीर स्मृति के द्वार खोलता है — परीक्षा से पहले और दौरान श्वास पर ध्यान दें।'),
      b('Use Pomodoro, active recall, spaced revision and practice tests.', 'पोमोडोरो, सक्रिय स्मरण, अंतराल पर दोहराव और अभ्यास परीक्षा अपनाएँ।'),
      b('Compare yourself only with your past self.', 'स्वयं की तुलना केवल अपने पुराने स्वयं से करें।'),
      b('A result is feedback, not your identity.', 'परिणाम प्रतिक्रिया है, आपकी पहचान नहीं।'),
    ],
  },

  /* ===================================================================== 8 */
  {
    slug: 'career-ki-disha',
    number: 8,
    icon: '🧭',
    tone: 'violet',
    minutes: 18,
    audience: b('Students & professionals', 'विद्यार्थी एवं कार्यरत'),
    title: b('Finding Your Career Direction', 'करियर की दिशा'),
    subtitle: b('Know yourself, explore options, and see what your chart suggests', 'स्वयं को जानें, विकल्प खोजें, और देखें आपकी कुंडली क्या संकेत देती है'),
    intro: b(
      'Choosing a career is one of life’s biggest decisions, and confusion about it causes a lot of stress — for students choosing a stream and for adults thinking of a change. The best choices come from combining three lenses: who you are (interests, strengths, values), what the world offers, and — for those who wish — the guidance of Vedic astrology.',
      'करियर चुनना जीवन के सबसे बड़े निर्णयों में से एक है, और इसे लेकर भ्रम बहुत तनाव देता है — विषय चुनते विद्यार्थियों को भी और बदलाव सोचते वयस्कों को भी। सर्वश्रेष्ठ निर्णय तीन दृष्टियों को मिलाकर होते हैं: आप कौन हैं (रुचि, क्षमता, मूल्य), संसार क्या अवसर देता है, और — जो चाहें उनके लिए — वैदिक ज्योतिष का मार्गदर्शन।'
    ),
    sections: [
      {
        heading: b('Step 1 — Know yourself', 'चरण 1 — स्वयं को जानें'),
        paragraphs: [b('Ask yourself honestly — not what others expect of you.', 'स्वयं से ईमानदारी से पूछें — दूसरे आपसे क्या अपेक्षा रखते हैं, वह नहीं।')],
        points: [
          b('Interests: What do I enjoy so much that I lose track of time?', 'रुचि: मुझे किस काम में इतना आनंद आता है कि समय का पता नहीं चलता?'),
          b('Strengths: What do people often praise me for? Which subjects come easily?', 'क्षमता: लोग प्रायः किस बात के लिए मेरी प्रशंसा करते हैं? कौन-से विषय आसानी से आते हैं?'),
          b('Values: What matters most — security, creativity, helping people, money, freedom, respect?', 'मूल्य: मेरे लिए सबसे महत्वपूर्ण क्या है — सुरक्षा, रचनात्मकता, लोगों की सहायता, धन, स्वतंत्रता, सम्मान?'),
          b('Work style: Do I prefer people or things, routine or variety, indoors or outdoors?', 'कार्यशैली: मुझे लोग पसंद हैं या वस्तुएँ, नियमित काम या विविधता, भीतर या बाहर?'),
        ],
      },
      {
        heading: b('Step 2 — The six personality types (RIASEC)', 'चरण 2 — छह व्यक्तित्व प्रकार (RIASEC)'),
        paragraphs: [b('Career psychologist John Holland found that people and jobs can be grouped into six types. Most of us are a mix of two or three.', 'करियर मनोवैज्ञानिक जॉन हॉलैंड ने पाया कि लोगों और नौकरियों को छह प्रकारों में बाँटा जा सकता है। हममें से अधिकतर दो या तीन का मिश्रण होते हैं।')],
        table: {
          columns: [b('Type', 'प्रकार'), b('Enjoys', 'पसंद'), b('Example careers', 'उदाहरण करियर')],
          rows: [
            [b('Realistic (Doer)', 'यथार्थवादी (कर्ता)'), b('Hands-on work, machines, outdoors', 'हाथ से काम, मशीनें, बाहर का काम'), b('Engineer, pilot, farmer, chef, athlete', 'इंजीनियर, पायलट, किसान, रसोइया, खिलाड़ी')],
            [b('Investigative (Thinker)', 'अन्वेषक (विचारक)'), b('Research, puzzles, science', 'शोध, पहेलियाँ, विज्ञान'), b('Doctor, scientist, data analyst', 'चिकित्सक, वैज्ञानिक, डेटा विश्लेषक')],
            [b('Artistic (Creator)', 'कलात्मक (सर्जक)'), b('Self-expression, design, ideas', 'अभिव्यक्ति, डिज़ाइन, विचार'), b('Designer, writer, musician, architect', 'डिज़ाइनर, लेखक, संगीतकार, वास्तुकार')],
            [b('Social (Helper)', 'सामाजिक (सहायक)'), b('Teaching, caring, guiding', 'पढ़ाना, देखभाल, मार्गदर्शन'), b('Teacher, nurse, counsellor, social worker', 'शिक्षक, नर्स, परामर्शदाता, समाजसेवी')],
            [b('Enterprising (Persuader)', 'उद्यमी (प्रेरक)'), b('Leading, selling, deciding', 'नेतृत्व, बिक्री, निर्णय'), b('Entrepreneur, manager, lawyer, politician', 'उद्यमी, प्रबंधक, वकील, राजनेता')],
            [b('Conventional (Organiser)', 'व्यवस्थित (संगठक)'), b('Order, numbers, systems', 'व्यवस्था, संख्याएँ, प्रणालियाँ'), b('Accountant, banker, administrator', 'लेखाकार, बैंकर, प्रशासक')],
          ],
        },
        tip: b('Try the career quiz below to find your top types.', 'अपने प्रमुख प्रकार जानने के लिए नीचे दी गई करियर प्रश्नोत्तरी आज़माएँ।'),
      },
      {
        heading: b('Step 3 — How Vedic astrology views career', 'चरण 3 — वैदिक ज्योतिष करियर को कैसे देखता है'),
        paragraphs: [
          b('In Jyotish, the 10th house (दशम भाव) is called the कर्म भाव — the house of action, profession and status. Astrologers study the sign on the 10th house, its lord (दशमेश) and where it sits, planets placed in or aspecting the 10th, and the strongest planet in the chart. The divisional chart D10 (दशमांश) is used for finer detail.', 'ज्योतिष में दशम भाव को कर्म भाव कहते हैं — कर्म, व्यवसाय और प्रतिष्ठा का भाव। ज्योतिषी दशम भाव की राशि, उसके स्वामी (दशमेश) और उसकी स्थिति, दशम में स्थित या उस पर दृष्टि डालने वाले ग्रह, और कुंडली के सबसे बलवान ग्रह का अध्ययन करते हैं। अधिक सूक्ष्मता के लिए दशमांश (D10) वर्ग कुंडली देखी जाती है।'),
          b('Other houses add detail: the 2nd house shows earnings and speech, the 6th house service, jobs and competition, and the 11th house gains and income. The running Mahadasha shows when career changes are likely.', 'अन्य भाव भी जानकारी देते हैं: द्वितीय भाव आय और वाणी, षष्ठ भाव सेवा, नौकरी और प्रतियोगिता, तथा एकादश भाव लाभ और आय दर्शाता है। चल रही महादशा बताती है कि करियर में परिवर्तन कब संभावित है।'),
        ],
        table: {
          columns: [b('Planet', 'ग्रह'), b('Career fields traditionally associated', 'परंपरागत रूप से जुड़े करियर क्षेत्र')],
          rows: [
            [b('Sun (सूर्य)', 'सूर्य'), b('Government, administration, leadership, politics, medicine', 'सरकारी सेवा, प्रशासन, नेतृत्व, राजनीति, चिकित्सा')],
            [b('Moon (चंद्र)', 'चंद्र'), b('Care, nursing, hospitality, food, public dealing, psychology', 'देखभाल, नर्सिंग, आतिथ्य, भोजन, जनसंपर्क, मनोविज्ञान')],
            [b('Mars (मंगल)', 'मंगल'), b('Defence, police, engineering, sports, surgery, real estate', 'सेना, पुलिस, इंजीनियरिंग, खेल, शल्य चिकित्सा, भूमि-भवन')],
            [b('Mercury (बुध)', 'बुध'), b('Commerce, IT, writing, accounts, communication, trade', 'वाणिज्य, सूचना प्रौद्योगिकी, लेखन, लेखा, संचार, व्यापार')],
            [b('Jupiter (गुरु)', 'गुरु'), b('Teaching, law, finance, banking, counselling, priesthood', 'अध्यापन, विधि, वित्त, बैंकिंग, परामर्श, पुरोहित')],
            [b('Venus (शुक्र)', 'शुक्र'), b('Arts, design, media, fashion, beauty, luxury, entertainment', 'कला, डिज़ाइन, मीडिया, फ़ैशन, सौंदर्य, विलासिता, मनोरंजन')],
            [b('Saturn (शनि)', 'शनि'), b('Research, labour-intensive industries, mining, judiciary, long-term service', 'शोध, श्रम-प्रधान उद्योग, खनन, न्यायपालिका, दीर्घकालीन सेवा')],
            [b('Rahu (राहु)', 'राहु'), b('Technology, foreign lands, aviation, unconventional and new-age fields', 'तकनीक, विदेश, विमानन, अपरंपरागत और नए युग के क्षेत्र')],
            [b('Ketu (केतु)', 'केतु'), b('Spirituality, research, coding, healing, alternative medicine', 'अध्यात्म, शोध, कोडिंग, उपचार, वैकल्पिक चिकित्सा')],
          ],
        },
      },
      {
        heading: b('Astrology is one lens — not the only one', 'ज्योतिष एक दृष्टि है — एकमात्र नहीं'),
        paragraphs: [
          b('A chart shows tendencies and timing; your interests and abilities show what you can pursue with joy. The wisest approach is to look for overlap. If your chart points to Mercury fields and you love coding, that is a strong match. But never give up a genuine passion only because of a chart — effort, skill and dedication shape destiny too. As the Gita says, “कर्मण्येवाधिकारस्ते” — your right is to action.', 'कुंडली प्रवृत्तियाँ और समय दिखाती है; आपकी रुचि और क्षमता बताती है कि आप आनंद से क्या कर सकते हैं। सबसे बुद्धिमान मार्ग दोनों का मेल खोजना है। यदि कुंडली बुध के क्षेत्र दिखाए और आपको कोडिंग पसंद हो, तो यह प्रबल मेल है। पर केवल कुंडली के कारण सच्ची लगन कभी न छोड़ें — परिश्रम, कौशल और समर्पण भी भाग्य गढ़ते हैं। गीता कहती है, “कर्मण्येवाधिकारस्ते” — आपका अधिकार कर्म पर है।'),
        ],
        tip: b('Get your free Kundli on VedicDhaam to see your 10th house, then discuss it with an astrologer and a career counsellor.', 'वैदिकधाम पर अपनी मुफ़्त कुंडली बनाकर दशम भाव देखें, फिर ज्योतिषी और करियर परामर्शदाता से चर्चा करें।'),
      },
      {
        heading: b('Step 4 — Explore before you decide', 'चरण 4 — निर्णय से पहले खोजें'),
        paragraphs: [b('Test your options in the real world with low-risk experiments.', 'कम जोखिम वाले प्रयोगों से वास्तविक संसार में अपने विकल्प परखें।')],
        points: [
          b('Talk to 3 people working in the field — ask what a normal day looks like.', 'उस क्षेत्र में काम करने वाले 3 लोगों से बात करें — पूछें कि एक सामान्य दिन कैसा होता है।'),
          b('Try a short online course, internship or project.', 'कोई छोटा ऑनलाइन पाठ्यक्रम, इंटर्नशिप या परियोजना करके देखें।'),
          b('Shadow someone at work for a day if possible.', 'संभव हो तो किसी के साथ एक दिन कार्यस्थल पर रहकर देखें।'),
          b('Keep a “career journal” of what energises and drains you.', 'एक “करियर डायरी” रखें कि किस काम से ऊर्जा मिलती है और किससे थकान।'),
        ],
      },
      {
        heading: b('Handling career confusion and pressure', 'करियर के भ्रम और दबाव को सँभालना'),
        paragraphs: [
          b('It is normal not to know at 16 or even at 30. Careers today are rarely a straight line — people switch fields, study again and build unique paths. Make the next good decision, not the “forever” decision. If family expectations differ from your wishes, share your research and feelings calmly, and suggest a trial period.', '16 या 30 वर्ष की आयु में भी स्पष्ट न होना सामान्य है। आज करियर शायद ही सीधी रेखा होते हैं — लोग क्षेत्र बदलते हैं, फिर से पढ़ते हैं और अपना अनूठा मार्ग बनाते हैं। “हमेशा के लिए” का नहीं, अगला अच्छा निर्णय लें। यदि परिवार की अपेक्षाएँ आपकी इच्छा से अलग हों, तो अपनी खोज और भाव शांति से साझा करें, और एक परीक्षण अवधि का सुझाव दें।'),
        ],
      },
    ],
    astro: {
      heading: b('A simple ritual for career clarity', 'करियर की स्पष्टता के लिए एक सरल अनुष्ठान'),
      paragraphs: [
        b('Traditionally, Thursday (गुरुवार) is considered good for starting studies or new ventures, and Guru is invoked for right guidance. Offering water to the Sun daily is said to strengthen confidence and recognition at work. Use such rituals to begin your day with intention — then follow with honest effort.', 'परंपरा में गुरुवार अध्ययन या नए कार्य आरंभ करने के लिए शुभ माना जाता है, और सही मार्गदर्शन के लिए गुरु का स्मरण किया जाता है। प्रतिदिन सूर्य को जल अर्पित करना आत्मविश्वास और कार्यस्थल पर पहचान को बल देने वाला माना गया है। ऐसे अनुष्ठानों से दिन का आरंभ संकल्प के साथ करें — फिर पूरी ईमानदारी से प्रयास करें।'),
      ],
      mantra: { text: 'ॐ बृं बृहस्पतये नमः॥', meaning: b('Salutations to Brihaspati (Jupiter), the guru of the gods — for wisdom and right direction.', 'देवगुरु बृहस्पति को नमस्कार — ज्ञान और सही दिशा के लिए।') },
    },
    practice: {
      tool: 'career',
      title: b('Career interest quiz (RIASEC)', 'करियर रुचि प्रश्नोत्तरी (RIASEC)'),
      steps: [
        b('Answer each statement honestly — there are no right answers.', 'हर कथन का ईमानदारी से उत्तर दें — कोई उत्तर सही या गलत नहीं।'),
        b('See your top two or three personality types and example careers.', 'अपने प्रमुख दो-तीन व्यक्तित्व प्रकार और उदाहरण करियर देखें।'),
        b('Compare them with your Kundli’s 10th house for a fuller picture.', 'पूरी तस्वीर के लिए इन्हें अपनी कुंडली के दशम भाव से मिलाएँ।'),
      ],
    },
    reflect: [
      b('If money and others’ opinions didn’t matter, what work would I choose?', 'यदि धन और दूसरों की राय मायने न रखती, तो मैं कौन-सा काम चुनता/चुनती?'),
      b('Which three careers from this chapter excite me most?', 'इस अध्याय के कौन-से तीन करियर मुझे सबसे अधिक उत्साहित करते हैं?'),
      b('Who is one person I can talk to this month about a field I’m curious about?', 'इस महीने मैं किस एक व्यक्ति से उस क्षेत्र के बारे में बात कर सकता/सकती हूँ जिसमें मेरी रुचि है?'),
    ],
    summary: [
      b('Good career choices combine interests, strengths, values and real-world exploration.', 'अच्छे करियर निर्णय रुचि, क्षमता, मूल्य और वास्तविक खोज का मेल होते हैं।'),
      b('RIASEC groups people and jobs into six types — most of us are a mix.', 'RIASEC लोगों और नौकरियों को छह प्रकारों में बाँटता है — हम प्रायः मिश्रण होते हैं।'),
      b('In Jyotish, the 10th house (कर्म भाव), its lord and D10 guide career insights.', 'ज्योतिष में दशम भाव (कर्म भाव), उसका स्वामी और दशमांश करियर की जानकारी देते हैं।'),
      b('Astrology is a guiding lens — never abandon a true passion only because of a chart.', 'ज्योतिष मार्गदर्शक दृष्टि है — केवल कुंडली के कारण सच्ची लगन कभी न छोड़ें।'),
    ],
  },
];
