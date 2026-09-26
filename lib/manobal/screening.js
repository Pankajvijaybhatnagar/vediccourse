// PHQ-9 and GAD-7 screening questionnaires (Spitzer, Williams, Kroenke et al.; free to use, no permission required).
// These screen for symptoms; they do not diagnose.
const p = (en, hi) => ({ en, hi });

export const OPTIONS = [
  { v: 0, label: p('Not at all', 'बिल्कुल नहीं') },
  { v: 1, label: p('Several days', 'कुछ दिन') },
  { v: 2, label: p('More than half the days', 'आधे से अधिक दिन') },
  { v: 3, label: p('Nearly every day', 'लगभग प्रतिदिन') },
];

export const TESTS = {
  gad7: {
    id: 'gad7',
    name: p('Anxiety check (GAD-7)', 'चिंता जाँच (GAD-7)'),
    icon: '🌊',
    intro: p('Over the last 2 weeks, how often have you been bothered by the following?', 'पिछले 2 सप्ताह में, निम्नलिखित बातों से आप कितनी बार परेशान रहे?'),
    items: [
      p('Feeling nervous, anxious or on edge', 'घबराहट, चिंता या बेचैनी अनुभव करना'),
      p('Not being able to stop or control worrying', 'चिंता को रोक या नियंत्रित न कर पाना'),
      p('Worrying too much about different things', 'अलग-अलग बातों की बहुत अधिक चिंता करना'),
      p('Trouble relaxing', 'विश्राम करने में कठिनाई'),
      p('Being so restless that it is hard to sit still', 'इतनी बेचैनी कि शांत बैठना कठिन हो'),
      p('Becoming easily annoyed or irritable', 'जल्दी खीझ जाना या चिड़चिड़ा होना'),
      p('Feeling afraid, as if something awful might happen', 'डर लगना, जैसे कुछ बुरा होने वाला है'),
    ],
    bands: [
      { max: 4, level: 'minimal', label: p('Minimal anxiety', 'न्यूनतम चिंता'), advice: p('Your answers suggest little anxiety right now. Keep up healthy routines like breathing practice, sleep and movement.', 'आपके उत्तर इस समय बहुत कम चिंता दर्शाते हैं। श्वास अभ्यास, नींद और व्यायाम जैसी अच्छी आदतें बनाए रखें।') },
      { max: 9, level: 'mild', label: p('Mild anxiety', 'हल्की चिंता'), advice: p('Some anxiety symptoms are present. The breathing, grounding and thought-journal tools in Manobal can help. Watch how you feel over the next few weeks.', 'कुछ चिंता के लक्षण हैं। मनोबल के श्वास, ग्राउंडिंग और विचार-डायरी अभ्यास सहायक होंगे। अगले कुछ सप्ताह अपनी स्थिति पर ध्यान दें।') },
      { max: 14, level: 'moderate', label: p('Moderate anxiety', 'मध्यम चिंता'), advice: p('Anxiety seems to be affecting your daily life. Talking to a counsellor or doctor is recommended — therapy for anxiety works very well.', 'चिंता आपके दैनिक जीवन को प्रभावित कर रही लगती है। परामर्शदाता या डॉक्टर से बात करने की सलाह है — चिंता का उपचार बहुत प्रभावी होता है।') },
      { max: 21, level: 'severe', label: p('Severe anxiety', 'गंभीर चिंता'), advice: p('Your answers suggest significant anxiety. Please reach out to a mental health professional soon. You can call Tele-MANAS (14416) for free guidance today.', 'आपके उत्तर गंभीर चिंता दर्शाते हैं। कृपया शीघ्र किसी मानसिक स्वास्थ्य विशेषज्ञ से संपर्क करें। आज ही निःशुल्क मार्गदर्शन के लिए टेली-मानस (14416) पर कॉल कर सकते हैं।') },
    ],
  },
  phq9: {
    id: 'phq9',
    name: p('Mood check (PHQ-9)', 'मनोदशा जाँच (PHQ-9)'),
    icon: '🌤️',
    intro: p('Over the last 2 weeks, how often have you been bothered by any of the following problems?', 'पिछले 2 सप्ताह में, निम्नलिखित समस्याओं से आप कितनी बार परेशान रहे?'),
    items: [
      p('Little interest or pleasure in doing things', 'कामों में रुचि या आनंद की कमी'),
      p('Feeling down, depressed or hopeless', 'उदासी, निराशा या हताशा अनुभव करना'),
      p('Trouble falling or staying asleep, or sleeping too much', 'नींद आने या बनाए रखने में कठिनाई, या बहुत अधिक सोना'),
      p('Feeling tired or having little energy', 'थकान या ऊर्जा की कमी'),
      p('Poor appetite or overeating', 'भूख कम लगना या बहुत अधिक खाना'),
      p('Feeling bad about yourself — or that you are a failure or have let yourself or your family down', 'स्वयं के बारे में बुरा लगना — या लगना कि आप असफल हैं या आपने स्वयं को या परिवार को निराश किया है'),
      p('Trouble concentrating on things, such as reading or watching TV', 'पढ़ने या टीवी देखने जैसे कामों में ध्यान लगाने में कठिनाई'),
      p('Moving or speaking so slowly that others could notice — or being so restless that you move around much more than usual', 'इतनी धीमी गति से चलना या बोलना कि दूसरे नोटिस करें — या इतनी बेचैनी कि सामान्य से बहुत अधिक हिलना-डुलना'),
      p('Thoughts that you would be better off dead, or of hurting yourself in some way', 'यह विचार कि मर जाना बेहतर होगा, या किसी प्रकार स्वयं को हानि पहुँचाने के विचार'),
    ],
    riskItem: 8,
    bands: [
      { max: 4, level: 'minimal', label: p('Minimal symptoms', 'न्यूनतम लक्षण'), advice: p('Your answers suggest few symptoms of low mood right now. Keep nurturing sleep, connection and activities you enjoy.', 'आपके उत्तर इस समय उदासी के बहुत कम लक्षण दर्शाते हैं। अच्छी नींद, अपनों से जुड़ाव और रुचि के कामों को बनाए रखें।') },
      { max: 9, level: 'mild', label: p('Mild symptoms', 'हल्के लक्षण'), advice: p('Some low-mood symptoms are present. Try the mood tracker and small daily actions from Chapter 5. If it continues beyond a few weeks, talk to someone.', 'उदासी के कुछ लक्षण हैं। मनोदशा ट्रैकर और अध्याय 5 के छोटे दैनिक कदम आज़माएँ। कुछ सप्ताह से अधिक बने रहें तो किसी से बात करें।') },
      { max: 14, level: 'moderate', label: p('Moderate symptoms', 'मध्यम लक्षण'), advice: p('Low mood seems to be affecting your life. Please consider speaking with a counsellor, psychologist or doctor — depression is common and treatable.', 'उदासी आपके जीवन को प्रभावित कर रही लगती है। कृपया किसी परामर्शदाता, मनोवैज्ञानिक या डॉक्टर से बात करें — अवसाद सामान्य है और इसका उपचार संभव है।') },
      { max: 19, level: 'severe', label: p('Moderately severe symptoms', 'मध्यम-गंभीर लक्षण'), advice: p('Your answers suggest significant depression symptoms. Please see a mental health professional soon. Tele-MANAS (14416) can guide you for free.', 'आपके उत्तर अवसाद के गंभीर लक्षण दर्शाते हैं। कृपया शीघ्र किसी मानसिक स्वास्थ्य विशेषज्ञ से मिलें। टेली-मानस (14416) निःशुल्क मार्गदर्शन दे सकता है।') },
      { max: 27, level: 'severe', label: p('Severe symptoms', 'गंभीर लक्षण'), advice: p('Your answers suggest severe depression symptoms. Please reach out to a doctor or mental health professional as soon as possible, and let someone close to you know how you are feeling.', 'आपके उत्तर अवसाद के अत्यंत गंभीर लक्षण दर्शाते हैं। कृपया जल्द से जल्द डॉक्टर या विशेषज्ञ से संपर्क करें, और किसी अपने को बताएँ कि आप कैसा अनुभव कर रहे हैं।') },
    ],
  },
};
