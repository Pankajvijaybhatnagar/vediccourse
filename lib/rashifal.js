import { SIGNS } from './zodiac';

// Daily rashifal for all 12 Vedic rashis, driven by Chandra gochar: the house the Moon
// transits counted from each rashi (Moon's sidereal sign comes from getPanchang).
// Every text field is bilingual { en, hi }.

const p = (en, hi) => ({ en, hi });

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
const seeded = (key) => {
  let s = hash(key);
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
const pick = (rand, arr) => arr[Math.floor(rand() * arr.length)];

const PLANETS = {
  sun: { name: p('Sun', 'सूर्य'), number: 1, colors: [p('Orange', 'नारंगी'), p('Copper red', 'ताम्र लाल')], mantra: 'ॐ घृणि सूर्याय नमः', act: p('Offer water to the rising Sun.', 'उगते सूर्य को जल अर्पित करें।') },
  moon: { name: p('Moon', 'चंद्र'), number: 2, colors: [p('White', 'सफ़ेद'), p('Silver', 'चाँदी')], mantra: 'ॐ सों सोमाय नमः', act: p('Drink water from a silver glass and respect your mother.', 'चाँदी के गिलास में जल पिएँ और माता का आशीर्वाद लें।') },
  mars: { name: p('Mars', 'मंगल'), number: 9, colors: [p('Red', 'लाल'), p('Maroon', 'मैरून')], mantra: 'ॐ अं अंगारकाय नमः', act: p('Recite the Hanuman Chalisa.', 'हनुमान चालीसा का पाठ करें।') },
  mercury: { name: p('Mercury', 'बुध'), number: 5, colors: [p('Green', 'हरा'), p('Parrot green', 'तोतई हरा')], mantra: 'ॐ बुं बुधाय नमः', act: p('Feed green grass to a cow.', 'गाय को हरा चारा खिलाएँ।') },
  jupiter: { name: p('Jupiter', 'बृहस्पति'), number: 3, colors: [p('Yellow', 'पीला'), p('Saffron', 'केसरिया')], mantra: 'ॐ बृं बृहस्पतये नमः', act: p('Apply a saffron or turmeric tilak.', 'केसर या हल्दी का तिलक लगाएँ।') },
  venus: { name: p('Venus', 'शुक्र'), number: 6, colors: [p('Pink', 'गुलाबी'), p('Cream', 'क्रीम')], mantra: 'ॐ शुं शुक्राय नमः', act: p('Offer white flowers to Maa Lakshmi.', 'माँ लक्ष्मी को सफ़ेद पुष्प अर्पित करें।') },
  saturn: { name: p('Saturn', 'शनि'), number: 8, colors: [p('Blue', 'नीला'), p('Navy', 'गहरा नीला')], mantra: 'ॐ शं शनैश्चराय नमः', act: p('Light a mustard-oil lamp under a peepal tree.', 'पीपल के नीचे सरसों के तेल का दीपक जलाएँ।') },
};

// Vedic rashi data, in zodiac order (matches SIGNS).
const RASHI = [
  { hi: 'मेष', en: 'Mesh', lord: 'mars', letters: 'चू, चे, चो, ला, ली, लू, ले, लो, अ', dir: p('East', 'पूर्व') },
  { hi: 'वृषभ', en: 'Vrishabh', lord: 'venus', letters: 'इ, उ, ए, ओ, वा, वी, वू, वे, वो', dir: p('South', 'दक्षिण') },
  { hi: 'मिथुन', en: 'Mithun', lord: 'mercury', letters: 'का, की, कू, घ, ङ, छ, के, को, ह', dir: p('West', 'पश्चिम') },
  { hi: 'कर्क', en: 'Kark', lord: 'moon', letters: 'ही, हू, हे, हो, डा, डी, डू, डे, डो', dir: p('North', 'उत्तर') },
  { hi: 'सिंह', en: 'Simha', lord: 'sun', letters: 'मा, मी, मू, मे, मो, टा, टी, टू, टे', dir: p('East', 'पूर्व') },
  { hi: 'कन्या', en: 'Kanya', lord: 'mercury', letters: 'टो, पा, पी, पू, ष, ण, ठ, पे, पो', dir: p('South', 'दक्षिण') },
  { hi: 'तुला', en: 'Tula', lord: 'venus', letters: 'रा, री, रू, रे, रो, ता, ती, तू, ते', dir: p('West', 'पश्चिम') },
  { hi: 'वृश्चिक', en: 'Vrishchik', lord: 'mars', letters: 'तो, ना, नी, नू, ने, नो, या, यी, यू', dir: p('North', 'उत्तर') },
  { hi: 'धनु', en: 'Dhanu', lord: 'jupiter', letters: 'ये, यो, भा, भी, भू, धा, फा, ढा, भे', dir: p('East', 'पूर्व') },
  { hi: 'मकर', en: 'Makar', lord: 'saturn', letters: 'भो, जा, जी, खी, खू, खे, खो, गा, गी', dir: p('South', 'दक्षिण') },
  { hi: 'कुंभ', en: 'Kumbh', lord: 'saturn', letters: 'गू, गे, गो, सा, सी, सू, से, सो, दा', dir: p('West', 'पश्चिम') },
  { hi: 'मीन', en: 'Meen', lord: 'jupiter', letters: 'दी, दू, थ, झ, ञ, दे, दो, चा, ची', dir: p('North', 'उत्तर') },
];

// What the Moon's transit through each house (counted from the rashi) brings for the day.
const HOUSES = {
  1: {
    stars: 4,
    theme: p('Moon in your own sign — confident and in the spotlight', 'चंद्रमा आपकी ही राशि में — आत्मविश्वास और आकर्षण का दिन'),
    overview: [
      p('The Moon passes through your own sign, so your mood and energy set the tone for everyone around you. Ideas come quickly and people listen when you speak. Start something that matters to you.', 'चंद्रमा आपकी ही राशि में गोचर कर रहा है, इसलिए आपका मन और ऊर्जा आसपास के माहौल को दिशा देंगे। विचार शीघ्र आएँगे और लोग आपकी बात ध्यान से सुनेंगे। कोई महत्वपूर्ण काम आज आरंभ करें।'),
      p('A fresh, self-assured day. You feel more like yourself, and your presence is noticed at home and at work. Avoid being too emotional over small things and the day stays bright.', 'ताज़गी और आत्मविश्वास भरा दिन है। आप स्वयं को सहज महसूस करेंगे और घर-बाहर आपकी उपस्थिति सराही जाएगी। छोटी बातों पर भावुक होने से बचें, दिन उज्ज्वल रहेगा।'),
    ],
    career: p('Good day to present your plans; seniors notice your initiative.', 'अपनी योजनाएँ प्रस्तुत करने का अच्छा दिन है; वरिष्ठ आपकी पहल को सराहेंगे।'),
    money: p('Income stays steady; avoid impulse spending on yourself.', 'आय स्थिर रहेगी; स्वयं पर अचानक खर्च करने से बचें।'),
    love: p('Your warmth draws people close; a good day for a heart-to-heart talk.', 'आपकी आत्मीयता लोगों को पास लाएगी; मन की बात कहने का अच्छा दिन है।'),
    health: p('Energy is high, but eat on time and stay hydrated.', 'ऊर्जा अच्छी रहेगी, पर भोजन समय पर करें और पानी भरपूर पिएँ।'),
    caution: p('Don’t let moodiness decide important matters.', 'मनोदशा के आधार पर बड़े निर्णय न लें।'),
  },
  2: {
    stars: 3,
    theme: p('Focus on family, money and speech', 'परिवार, धन और वाणी पर ध्यान'),
    overview: [
      p('The Moon in your second house turns attention to money and family. Speak gently — your words carry more weight than usual today. A good day to review savings and household needs.', 'चंद्रमा दूसरे भाव में होने से ध्यान धन और परिवार की ओर रहेगा। मधुर बोलें — आज आपके शब्दों का प्रभाव सामान्य से अधिक होगा। बचत और घर की आवश्यकताओं की समीक्षा के लिए अच्छा दिन है।'),
      p('A mixed but manageable day. Family conversations may revolve around finances. Tasty food and time with relatives lift your mood; keep a check on sharp words.', 'मिश्रित पर संभलने योग्य दिन है। परिवार में धन से जुड़ी बातें हो सकती हैं। स्वादिष्ट भोजन और परिजनों का साथ मन प्रसन्न करेगा; कटु वचनों पर नियंत्रण रखें।'),
    ],
    career: p('Steady progress; avoid arguing with colleagues over small details.', 'काम में स्थिर प्रगति; छोटी बातों पर सहकर्मियों से बहस न करें।'),
    money: p('Plan a budget — unplanned family expenses may come up.', 'बजट बनाकर चलें — परिवार पर अचानक खर्च आ सकता है।'),
    love: p('Sweet words strengthen bonds; avoid sarcasm with your partner.', 'मीठे बोल रिश्ते मज़बूत करेंगे; साथी से व्यंग्य में बात न करें।'),
    health: p('Take care of throat, teeth and eyes; avoid overeating.', 'गले, दाँत और आँखों का ध्यान रखें; अधिक भोजन से बचें।'),
    caution: p('Don’t lend money or make promises you can’t keep.', 'उधार देने या ऐसे वादे करने से बचें जो निभा न सकें।'),
  },
  3: {
    stars: 5,
    theme: p('Courage, effort and good news', 'पराक्रम, प्रयास और शुभ समाचार'),
    overview: [
      p('One of the best Moon positions of the month. Your courage and initiative are strong, short trips go well, and siblings or friends support you. Efforts made today bring quick results.', 'महीने की सबसे शुभ चंद्र स्थितियों में से एक। आपका साहस और पहल प्रबल रहेगी, छोटी यात्राएँ सफल होंगी और भाई-बहन व मित्रों का सहयोग मिलेगा। आज किए प्रयास शीघ्र फल देंगे।'),
      p('An energetic, productive day. Calls, messages and meetings bring good news. Take the first step on something you have been postponing — luck is with the brave today.', 'ऊर्जावान और उत्पादक दिन है। फ़ोन, संदेश और मुलाकातें शुभ समाचार लाएँगी। जो काम टाल रहे थे उसकी पहली सीढ़ी आज चढ़ें — आज भाग्य साहसी का साथ देगा।'),
    ],
    career: p('Bold moves pay off; pitch, negotiate and follow up.', 'साहसिक कदम लाभ देंगे; प्रस्ताव रखें, बातचीत करें और काम आगे बढ़ाएँ।'),
    money: p('Gains through your own effort; a good day for small investments.', 'अपने परिश्रम से लाभ; छोटे निवेश के लिए अच्छा दिन है।'),
    love: p('Playful, confident energy; a short outing with your partner is favoured.', 'हल्का-फुल्का, आत्मविश्वास भरा माहौल; साथी के साथ छोटी सैर शुभ है।'),
    health: p('Strong stamina — a great day for exercise or yoga.', 'शक्ति और स्फूर्ति अच्छी — व्यायाम या योग के लिए उत्तम दिन।'),
    caution: p('Don’t overcommit just because you feel unstoppable.', 'उत्साह में आकर क्षमता से अधिक ज़िम्मेदारी न लें।'),
  },
  4: {
    stars: 2,
    theme: p('Emotions run deep — find peace at home', 'मन भावुक रहेगा — घर में शांति खोजें'),
    overview: [
      p('The Moon in your fourth house can make the mind restless or nostalgic. Home and mother come into focus. Keep the day simple, avoid big decisions, and spend quiet time with family.', 'चंद्रमा चौथे भाव में होने से मन बेचैन या भावुक रह सकता है। घर और माता से जुड़ी बातें प्रमुख रहेंगी। दिन को सरल रखें, बड़े निर्णय टालें और परिवार के साथ शांत समय बिताएँ।'),
      p('A slower, inward day. Domestic chores or property matters may take your time. Small irritations at home pass quickly if you stay patient.', 'धीमा और अंतर्मुखी दिन है। घरेलू कार्य या संपत्ति से जुड़े विषय समय लेंगे। धैर्य रखें तो घर की छोटी खटपट जल्दी शांत हो जाएगी।'),
    ],
    career: p('Work from a calm space; postpone signing major papers if you can.', 'शांत मन से काम करें; संभव हो तो बड़े कागज़ों पर हस्ताक्षर टालें।'),
    money: p('Expenses on home or vehicle are possible; keep a buffer.', 'घर या वाहन पर खर्च संभव है; कुछ राशि सुरक्षित रखें।'),
    love: p('You need reassurance — say so gently rather than withdrawing.', 'आपको अपनापन चाहिए — चुप रहने के बजाय प्रेम से कहें।'),
    health: p('Watch chest and digestion; avoid late nights.', 'छाती और पाचन का ध्यान रखें; देर रात तक न जागें।'),
    caution: p('Avoid travel by road in a hurry; drive carefully.', 'जल्दबाज़ी में सड़क यात्रा न करें; वाहन सावधानी से चलाएँ।'),
  },
  5: {
    stars: 3,
    theme: p('Creativity, children and learning', 'रचनात्मकता, संतान और विद्या'),
    overview: [
      p('The Moon in your fifth house sparks creativity and romance. Students can study well and children bring joy. Avoid speculation — the heart is strong today but judgement needs care.', 'चंद्रमा पाँचवें भाव में रचनात्मकता और प्रेम को जगाता है। विद्यार्थी अच्छा अध्ययन कर पाएँगे और संतान से सुख मिलेगा। सट्टे या जोखिम से बचें — आज मन प्रबल है पर विवेक से काम लें।'),
      p('A pleasant, expressive day. Hobbies, art and time with children refresh you. Think twice before risky financial decisions.', 'सुखद और अभिव्यक्ति भरा दिन है। शौक, कला और बच्चों के साथ समय मन को ताज़ा करेगा। जोखिम भरे आर्थिक निर्णय से पहले दो बार सोचें।'),
    ],
    career: p('New ideas impress; good for planning and teaching roles.', 'नए विचार प्रभावित करेंगे; योजना और शिक्षण कार्यों के लिए अच्छा।'),
    money: p('Avoid shares, lottery or speculation today.', 'आज शेयर, लॉटरी या सट्टे से दूर रहें।'),
    love: p('Romance blossoms; singles may feel a new attraction.', 'प्रेम संबंधों में मधुरता; अविवाहितों को नया आकर्षण महसूस हो सकता है।'),
    health: p('Mild acidity possible — eat light and on time.', 'हल्की एसिडिटी संभव — हल्का और समय पर भोजन करें।'),
    caution: p('Don’t let emotions override facts in decisions.', 'निर्णयों में भावनाओं को तथ्यों पर हावी न होने दें।'),
  },
  6: {
    stars: 4,
    theme: p('Victory over obstacles and rivals', 'बाधाओं और विरोधियों पर विजय'),
    overview: [
      p('The Moon in your sixth house helps you beat pending problems. Competitors back off, health improves and you clear old tasks efficiently. A practical, winning day.', 'चंद्रमा छठे भाव में होने से रुकी हुई समस्याएँ सुलझेंगी। विरोधी पीछे हटेंगे, स्वास्थ्य सुधरेगा और पुराने काम कुशलता से निपटेंगे। व्यावहारिक और विजयी दिन है।'),
      p('Hard work is rewarded today. Debts, disputes or court matters move in your favour. Helping someone selflessly brings extra blessings.', 'आज परिश्रम का पूरा फल मिलेगा। कर्ज़, विवाद या कानूनी मामले आपके पक्ष में बढ़ेंगे। निःस्वार्थ भाव से किसी की सहायता करना विशेष शुभ रहेगा।'),
    ],
    career: p('You outperform rivals; good for exams, interviews and service jobs.', 'प्रतिस्पर्धा में आगे रहेंगे; परीक्षा, साक्षात्कार और नौकरी के लिए अच्छा।'),
    money: p('Good day to repay loans or settle dues.', 'कर्ज़ चुकाने या बकाया निपटाने के लिए अच्छा दिन।'),
    love: p('Minor misunderstandings clear up with practical help, not words.', 'छोटी गलतफ़हमियाँ बातों से नहीं, व्यावहारिक सहयोग से दूर होंगी।'),
    health: p('Recovery from old ailments; start a healthy routine.', 'पुरानी बीमारी में सुधार; स्वस्थ दिनचर्या आरंभ करें।'),
    caution: p('Don’t be overly critical of co-workers.', 'सहकर्मियों की अधिक आलोचना न करें।'),
  },
  7: {
    stars: 4,
    theme: p('Partnerships and relationships shine', 'साझेदारी और दांपत्य में सुख'),
    overview: [
      p('The Moon in your seventh house brings people towards you. Marriage, partnerships and client dealings go smoothly. A good day for meetings, agreements and social outings.', 'चंद्रमा सातवें भाव में लोगों को आपकी ओर आकर्षित करता है। विवाह, साझेदारी और ग्राहकों से व्यवहार सहज रहेगा। बैठकों, समझौतों और मेल-मिलाप के लिए अच्छा दिन है।'),
      p('Teamwork wins today. Your spouse or business partner is supportive, and travel for work can be fruitful. Listen as much as you speak.', 'आज मिलकर काम करने में सफलता है। जीवनसाथी या व्यापारिक साझेदार का सहयोग मिलेगा और काम से जुड़ी यात्रा लाभदायक हो सकती है। जितना बोलें उतना सुनें भी।'),
    ],
    career: p('Deals and collaborations are favoured; close pending agreements.', 'सौदे और सहयोग शुभ; लंबित समझौते पूरे करें।'),
    money: p('Gains through partners or clients.', 'साझेदारों या ग्राहकों के माध्यम से लाभ।'),
    love: p('Romantic and harmonious; marriage talks progress.', 'प्रेम और सामंजस्य; विवाह की बात आगे बढ़ सकती है।'),
    health: p('Generally good; avoid irregular meals while socialising.', 'स्वास्थ्य सामान्यतः अच्छा; मेल-जोल में अनियमित भोजन से बचें।'),
    caution: p('Don’t depend entirely on others’ promises.', 'दूसरों के वादों पर पूरी तरह निर्भर न रहें।'),
  },
  8: {
    stars: 1,
    theme: p('Chandrashtama — go slow and stay careful', 'चंद्राष्टम — धीमे चलें, सावधान रहें'),
    overview: [
      p('The Moon is in your eighth house (Chandrashtama), traditionally the most sensitive day of the month. Avoid new ventures, risky travel and arguments. Spend time in prayer, rest and routine work.', 'चंद्रमा आपके आठवें भाव में है (चंद्राष्टम), जो परंपरा से महीने का सबसे संवेदनशील दिन माना जाता है। नए काम, जोखिम भरी यात्रा और विवाद से बचें। पूजा, विश्राम और नियमित कार्यों में समय बिताएँ।'),
      p('A day for patience. Unexpected delays or worries may surface, but they pass. Keep your plans simple, double-check documents and avoid confrontation.', 'धैर्य का दिन है। अचानक देरी या चिंताएँ उभर सकती हैं, पर वे टल जाएँगी। योजनाएँ सरल रखें, दस्तावेज़ दोबारा जाँचें और टकराव से बचें।'),
    ],
    career: p('Stick to routine; don’t start new projects or change jobs today.', 'नियमित काम ही करें; आज नया प्रोजेक्ट या नौकरी परिवर्तन न करें।'),
    money: p('Avoid lending, borrowing and big purchases.', 'उधार लेन-देन और बड़ी खरीदारी से बचें।'),
    love: p('Sensitive emotions — be gentle and avoid old grievances.', 'भावनाएँ संवेदनशील — कोमल रहें, पुरानी शिकायतें न दोहराएँ।'),
    health: p('Rest well; take extra care while driving or around fire and water.', 'भरपूर विश्राम करें; वाहन, अग्नि और जल के पास विशेष सावधानी रखें।'),
    caution: p('Postpone important decisions to tomorrow if possible.', 'संभव हो तो महत्वपूर्ण निर्णय कल तक टालें।'),
  },
  9: {
    stars: 3,
    theme: p('Faith, fortune and guidance from elders', 'धर्म, भाग्य और गुरुजनों का आशीर्वाद'),
    overview: [
      p('The Moon in your ninth house turns the mind towards dharma, learning and long-term plans. Blessings of elders and teachers help. Results may come a little slowly but are lasting.', 'चंद्रमा नवें भाव में मन को धर्म, ज्ञान और दीर्घकालिक योजनाओं की ओर ले जाता है। बड़ों और गुरुजनों का आशीर्वाद सहायक होगा। परिणाम थोड़े धीमे पर स्थायी होंगे।'),
      p('A thoughtful, spiritual day. A visit to a temple or a talk with a mentor brings clarity. Luck supports honest effort rather than shortcuts.', 'विचारशील और आध्यात्मिक दिन है। मंदिर दर्शन या किसी मार्गदर्शक से बातचीत स्पष्टता देगी। भाग्य शॉर्टकट नहीं, ईमानदार प्रयास का साथ देगा।'),
    ],
    career: p('Good for higher studies, legal work and planning ahead.', 'उच्च शिक्षा, कानूनी कार्य और आगे की योजना के लिए अच्छा।'),
    money: p('Moderate gains; donate a little for lasting good fortune.', 'सामान्य लाभ; स्थायी सौभाग्य हेतु थोड़ा दान करें।'),
    love: p('Shared values matter; plan a pilgrimage or trip together.', 'साझा मूल्य महत्वपूर्ण; साथ में तीर्थ या यात्रा की योजना बनाएँ।'),
    health: p('Mild fatigue; a walk in nature restores you.', 'हल्की थकान; प्रकृति में टहलने से ताज़गी मिलेगी।'),
    caution: p('Don’t argue with father figures or teachers.', 'पिता या गुरुजनों से वाद-विवाद न करें।'),
  },
  10: {
    stars: 5,
    theme: p('Career peak — recognition and success', 'कर्म क्षेत्र में उन्नति और सम्मान'),
    overview: [
      p('The Moon at the top of your chart lights up career and reputation. Work gets noticed, authority figures are supportive and pending tasks finish smoothly. Make your important moves today.', 'चंद्रमा दसवें भाव में आपके कार्य और प्रतिष्ठा को चमकाता है। आपके काम पर सबका ध्यान जाएगा, अधिकारी सहयोग करेंगे और रुके काम सहजता से पूरे होंगे। महत्वपूर्ण कदम आज ही उठाएँ।'),
      p('A highly productive, respected day. Promotions, new responsibilities or business growth are indicated. Balance work with a little family time in the evening.', 'उत्पादक और सम्मान भरा दिन है। पदोन्नति, नई ज़िम्मेदारी या व्यापार वृद्धि के संकेत हैं। शाम को परिवार के लिए भी थोड़ा समय निकालें।'),
    ],
    career: p('Excellent for interviews, launches and meeting seniors.', 'साक्षात्कार, नई शुरुआत और वरिष्ठों से भेंट के लिए उत्तम।'),
    money: p('Income through work rises; a good day for business decisions.', 'कार्य से आय बढ़ेगी; व्यापारिक निर्णयों के लिए अच्छा दिन।'),
    love: p('Busy schedule — a small gesture keeps your partner happy.', 'व्यस्त दिन — एक छोटा-सा स्नेह भरा कदम साथी को प्रसन्न रखेगा।'),
    health: p('Good vitality; avoid work stress by taking short breaks.', 'अच्छी स्फूर्ति; बीच-बीच में विराम लेकर तनाव से बचें।'),
    caution: p('Stay humble — ego can spoil a great day.', 'विनम्र रहें — अहंकार अच्छे दिन को बिगाड़ सकता है।'),
  },
  11: {
    stars: 5,
    theme: p('Gains, wishes fulfilled and friends', 'लाभ, इच्छापूर्ति और मित्रों का साथ'),
    overview: [
      p('The Moon in your eleventh house is the classic sign of gains. Wishes come true, friends and elder siblings help, and money flows in. One of the luckiest days of the month.', 'चंद्रमा ग्यारहवें भाव में लाभ का प्रमुख संकेत है। इच्छाएँ पूरी होंगी, मित्र और बड़े भाई-बहन सहायता करेंगे और धन का आगमन होगा। महीने के सबसे भाग्यशाली दिनों में से एक।'),
      p('A rewarding, social day. Networking opens doors, pending payments arrive and good news reaches you. Celebrate with friends and share your joy.', 'लाभदायक और मिलनसार दिन है। नए संपर्क अवसर खोलेंगे, अटका पैसा मिलेगा और शुभ समाचार आएगा। मित्रों के साथ खुशी बाँटें।'),
    ],
    career: p('Targets are met; good for sales, networking and seeking favours.', 'लक्ष्य पूरे होंगे; बिक्री, संपर्क और सहायता माँगने के लिए अच्छा।'),
    money: p('Strong financial gains; a good day to invest wisely.', 'अच्छा आर्थिक लाभ; सोच-समझकर निवेश के लिए शुभ।'),
    love: p('Joyful time with loved ones; friendships may turn special.', 'प्रियजनों के साथ आनंद; मित्रता किसी विशेष रिश्ते में बदल सकती है।'),
    health: p('Cheerful mood keeps you healthy and active.', 'प्रसन्न मन से स्वास्थ्य अच्छा और सक्रिय रहेगा।'),
    caution: p('Don’t overspend in celebration.', 'खुशी में अनावश्यक खर्च न करें।'),
  },
  12: {
    stars: 2,
    theme: p('Expenses, rest and spiritual retreat', 'व्यय, विश्राम और आध्यात्मिकता'),
    overview: [
      p('The Moon in your twelfth house can bring tiredness and extra expenses. It is a better day for rest, meditation, charity and finishing old work than for starting anything new.', 'चंद्रमा बारहवें भाव में थकान और अतिरिक्त खर्च ला सकता है। आज नया आरंभ करने की बजाय विश्राम, ध्यान, दान और पुराने काम पूरे करना बेहतर रहेगा।'),
      p('A quiet, introspective day. Sleep may be disturbed and money may slip away on small things. Spiritual practice and helping others bring peace.', 'शांत और आत्मचिंतन का दिन है। नींद में बाधा और छोटी-छोटी चीज़ों पर खर्च संभव है। साधना और दूसरों की सहायता से मन को शांति मिलेगी।'),
    ],
    career: p('Work behind the scenes; avoid confrontations with authority.', 'पर्दे के पीछे रहकर काम करें; अधिकारियों से टकराव न करें।'),
    money: p('Expenses exceed income — avoid shopping sprees.', 'खर्च आय से अधिक — अनावश्यक खरीदारी से बचें।'),
    love: p('Quiet intimacy over outings; avoid suspicion.', 'घूमने से अधिक शांत निकटता; संदेह से बचें।'),
    health: p('Prioritise sleep; take care of eyes and feet.', 'नींद को प्राथमिकता दें; आँखों और पैरों का ध्यान रखें।'),
    caution: p('Be careful with belongings while travelling.', 'यात्रा में अपने सामान का ध्यान रखें।'),
  },
};

export const RATING_LABEL = {
  5: p('Excellent', 'उत्तम'),
  4: p('Good', 'शुभ'),
  3: p('Mixed', 'मिश्रित'),
  2: p('Careful', 'सावधानी'),
  1: p('Challenging', 'कठिन'),
};

const ORDINAL_HI = ['', 'पहले', 'दूसरे', 'तीसरे', 'चौथे', 'पाँचवें', 'छठे', 'सातवें', 'आठवें', 'नवें', 'दसवें', 'ग्यारहवें', 'बारहवें'];
const ordinalEn = (n) => `${n}${n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th'}`;

/**
 * @param {object} panchang result of getPanchang (uses moonSign + dayChoghadiya)
 * @param {string} dateStr yyyy-mm-dd, seeds the small daily variations
 */
export function getDailyRashifal(panchang, dateStr) {
  const moonIndex = SIGNS.indexOf(panchang.moonSign);
  const goodSlots = panchang.dayChoghadiya.filter((c) => c.tone === 'good');

  return SIGNS.map((sign, i) => {
    const rashi = RASHI[i];
    const house = ((moonIndex - i + 12) % 12) + 1;
    const h = HOUSES[house];
    const rand = seeded(`${dateStr}:${sign.slug}`);
    const lord = PLANETS[rashi.lord];
    const score = (base) => Math.max(25, Math.min(98, base + Math.round((rand() - 0.5) * 24)));
    const base = 30 + h.stars * 13;

    return {
      sign,
      slug: sign.slug,
      glyph: sign.glyph,
      element: sign.element,
      name: p(`${sign.name} (${rashi.en})`, rashi.hi),
      letters: rashi.letters,
      house,
      houseLabel: p(`Moon in ${ordinalEn(house)} house`, `चंद्रमा ${ORDINAL_HI[house]} भाव में`),
      stars: h.stars,
      rating: RATING_LABEL[h.stars],
      chandrashtama: house === 8,
      theme: h.theme,
      overview: pick(rand, h.overview),
      career: h.career,
      money: h.money,
      love: h.love,
      health: h.health,
      caution: h.caution,
      scores: { career: score(base), money: score(base), love: score(base), health: score(base) },
      lucky: {
        color: pick(rand, lord.colors),
        number: `${lord.number}, ${lord.number + 9 * (1 + Math.floor(rand() * 9))}`,
        direction: rashi.dir,
        time: goodSlots.length ? pick(rand, goodSlots) : null,
      },
      lord: lord.name,
      remedy: { mantra: lord.mantra, act: house === 8 ? PLANETS.moon.act : lord.act, extra: house === 8 ? PLANETS.moon.mantra : null },
    };
  });
}
