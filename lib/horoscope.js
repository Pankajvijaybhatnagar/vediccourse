import { SIGNS } from './zodiac';

// Deterministic PRNG so every visitor sees the same reading for a given sign + day.
function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (rand, arr) => arr[Math.floor(rand() * arr.length)];
const p = (en, hi) => ({ en, hi });

const OPENERS = [
  p('The cosmos lines up in your favor today.', 'आज ब्रह्मांड आपके पक्ष में है।'),
  p('A gentle shift in planetary energy invites reflection.', 'ग्रहों की ऊर्जा में सौम्य बदलाव आत्मचिंतन का अवसर देता है।'),
  p('The Moon illuminates a part of life you have been neglecting.', 'चंद्रमा जीवन के उस पहलू को रोशन करता है जिसे आप अनदेखा कर रहे थे।'),
  p('Mercury sharpens your words and your wit.', 'बुध आपके शब्दों और बुद्धि को धार देता है।'),
  p('Venus softens the edges of your day.', 'शुक्र आपके दिन को मधुरता से भर देता है।'),
  p('Mars lends you a burst of determined energy.', 'मंगल आपको दृढ़ ऊर्जा का उत्साह देता है।'),
  p('Jupiter expands your horizons in unexpected ways.', 'बृहस्पति अप्रत्याशित तरीकों से आपके क्षितिज का विस्तार करता है।'),
  p('Saturn asks you to slow down and build with intention.', 'शनि आपसे धीमे चलकर सोच-समझकर निर्माण करने को कहता है।'),
  p('A quiet cosmic whisper nudges you toward change.', 'एक शांत दिव्य संकेत आपको परिवर्तन की ओर प्रेरित करता है।'),
  p('The stars favor bold moves and honest conversations.', 'सितारे साहसिक कदमों और ईमानदार बातचीत के पक्ष में हैं।'),
];

const MIDDLES = [
  p('Trust your instincts when an opportunity appears out of nowhere.', 'जब अचानक कोई अवसर आए तो अपनी अंतरात्मा पर भरोसा करें।'),
  p('Someone from your past may resurface with a meaningful message.', 'अतीत का कोई व्यक्ति कोई सार्थक संदेश लेकर लौट सकता है।'),
  p('Focus on finishing what you started before chasing something new.', 'कुछ नया शुरू करने से पहले अधूरे काम पूरे करने पर ध्यान दें।'),
  p('Your creativity is heightened, so make space for inspired ideas.', 'आपकी रचनात्मकता चरम पर है, नए विचारों के लिए जगह बनाएँ।'),
  p('A small act of kindness will return to you tenfold.', 'दया का एक छोटा सा कार्य आपको दस गुना होकर लौटेगा।'),
  p('Clear communication will dissolve a lingering misunderstanding.', 'स्पष्ट संवाद से पुरानी गलतफ़हमी दूर हो जाएगी।'),
  p('Take a moment to celebrate how far you have already come.', 'एक पल रुककर अपनी अब तक की उपलब्धियों का उत्सव मनाएँ।'),
  p('Your intuition is especially strong, so listen to that inner voice.', 'आपका अंतर्ज्ञान विशेष रूप से प्रबल है, अपनी भीतरी आवाज़ सुनें।'),
  p('Collaboration brings better results than going it alone.', 'अकेले चलने की बजाय मिलकर काम करने से बेहतर परिणाम मिलेंगे।'),
  p('Let go of what no longer serves you to make room for growth.', 'जो अब आपके काम का नहीं उसे छोड़ें, ताकि विकास के लिए जगह बने।'),
];

const CLOSERS = [
  p('Evening hours bring calm and clarity.', 'शाम का समय शांति और स्पष्टता लाएगा।'),
  p('End the day with gratitude and rest.', 'दिन का अंत कृतज्ञता और विश्राम के साथ करें।'),
  p('A pleasant surprise awaits before nightfall.', 'रात होने से पहले एक सुखद आश्चर्य आपका इंतज़ार कर रहा है।'),
  p('Keep your heart open and your plans flexible.', 'अपना दिल खुला और योजनाएँ लचीली रखें।'),
  p('Patience will prove to be your greatest ally.', 'धैर्य आपका सबसे बड़ा साथी साबित होगा।'),
  p('Your confidence is magnetic, so let it shine.', 'आपका आत्मविश्वास आकर्षक है, उसे चमकने दें।'),
  p('Small steps today create big changes tomorrow.', 'आज के छोटे कदम कल बड़े बदलाव लाएँगे।'),
  p('Balance work and play for the best outcome.', 'सर्वश्रेष्ठ परिणाम के लिए काम और आराम में संतुलन रखें।'),
];

const LOVE = [
  p('Romance feels effortless when you drop your guard.', 'जब आप मन के द्वार खोलेंगे तो प्रेम सहज लगेगा।'),
  p('Single signs may meet someone intriguing through friends.', 'अविवाहित जातक मित्रों के माध्यम से किसी दिलचस्प व्यक्ति से मिल सकते हैं।'),
  p('Plan something thoughtful for the person you cherish.', 'अपने प्रिय व्यक्ति के लिए कुछ विशेष योजना बनाएँ।'),
  p('An honest conversation deepens emotional intimacy.', 'ईमानदार बातचीत भावनात्मक निकटता को गहरा करेगी।'),
  p('Give your partner space and the bond will grow stronger.', 'साथी को थोड़ा समय दें, रिश्ता और मज़बूत होगा।'),
  p('Flirtation is in the air, so enjoy the attention.', 'माहौल में रोमांस है, इस ध्यान का आनंद लें।'),
];

const CAREER = [
  p('A project gains momentum thanks to your leadership.', 'आपके नेतृत्व से किसी परियोजना को गति मिलेगी।'),
  p('Recognition for past efforts may finally arrive.', 'पिछले प्रयासों की सराहना आखिरकार मिल सकती है।'),
  p('Double-check details before signing anything important.', 'किसी भी महत्वपूर्ण दस्तावेज़ पर हस्ताक्षर से पहले विवरण ध्यान से जाँचें।'),
  p('Networking opens a door you did not expect.', 'नए संपर्क एक अप्रत्याशित द्वार खोलेंगे।'),
  p('Your fresh perspective impresses decision makers.', 'आपका नया दृष्टिकोण निर्णयकर्ताओं को प्रभावित करेगा।'),
  p('It is a good day to organize and plan long-term goals.', 'दीर्घकालिक लक्ष्यों की योजना बनाने के लिए आज अच्छा दिन है।'),
];

const HEALTH = [
  p('Hydrate well and keep your energy steady.', 'भरपूर पानी पिएँ और ऊर्जा स्थिर रखें।'),
  p('A walk outdoors will refresh both body and mind.', 'बाहर टहलने से तन और मन दोनों तरोताज़ा होंगे।'),
  p('Prioritize sleep to recharge your inner battery.', 'अपनी ऊर्जा को फिर से भरने के लिए नींद को प्राथमिकता दें।'),
  p('Try a new form of movement that feels joyful.', 'योग या व्यायाम का कोई नया आनंददायक रूप आज़माएँ।'),
  p('Mindful breathing helps release built-up tension.', 'प्राणायाम से जमा हुआ तनाव दूर होगा।'),
  p('Nourish yourself with wholesome, colorful foods.', 'पौष्टिक और सात्विक भोजन से स्वयं को पोषित करें।'),
];

const MOODS = [p('Inspired', 'प्रेरित'), p('Serene', 'शांत'), p('Adventurous', 'साहसी'), p('Romantic', 'रोमांटिक'), p('Focused', 'एकाग्र'), p('Playful', 'चंचल'), p('Reflective', 'चिंतनशील'), p('Confident', 'आत्मविश्वासी')];
const COLORS = [p('Gold', 'सुनहरा'), p('Lavender', 'बैंगनी'), p('Teal', 'फ़िरोज़ी'), p('Coral', 'मूंगा'), p('Saffron', 'केसरिया'), p('Rose', 'गुलाबी'), p('Emerald', 'पन्ना हरा'), p('Silver', 'चाँदी'), p('Amber', 'अंबर')];
const TIMES = ['7:00 AM', '9:30 AM', '11:15 AM', '1:45 PM', '3:20 PM', '5:00 PM', '7:40 PM', '9:10 PM'];

/** Returns a stable key for the given period so readings change daily/weekly/monthly. */
function periodKey(period, date = new Date()) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  if (period === 'monthly') return `${y}-${m}`;
  if (period === 'weekly') {
    const start = new Date(y, 0, 1);
    const week = Math.ceil(((date - start) / 86400000 + start.getDay() + 1) / 7);
    return `${y}-w${week}`;
  }
  return `${y}-${m}-${date.getDate()}`;
}

/** Text fields are { en, hi } objects — render them with `t()` from useLang. */
export function getHoroscope(slug, period = 'daily', date = new Date()) {
  const rand = mulberry32(hashString(`${slug}:${period}:${periodKey(period, date)}`));
  const scoreRange = () => 55 + Math.floor(rand() * 45);
  const others = SIGNS.filter((s) => s.slug !== slug);
  const [o, m, c] = [pick(rand, OPENERS), pick(rand, MIDDLES), pick(rand, CLOSERS)];

  return {
    text: { en: `${o.en} ${m.en} ${c.en}`, hi: `${o.hi} ${m.hi} ${c.hi}` },
    love: pick(rand, LOVE),
    career: pick(rand, CAREER),
    health: pick(rand, HEALTH),
    scores: { love: scoreRange(), career: scoreRange(), health: scoreRange(), luck: scoreRange() },
    mood: pick(rand, MOODS),
    color: pick(rand, COLORS),
    number: 1 + Math.floor(rand() * 99),
    time: pick(rand, TIMES),
    match: pick(rand, others),
  };
}
