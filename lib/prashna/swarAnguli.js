// Swar Prashna (Shiva Swarodaya) and Anguli Prashna (finger method from Samudrik tradition).
import { getCategory } from './categories';

const p = (en, hi) => ({ en, hi });

export const SWARS = {
  ida: {
    key: 'ida',
    icon: '🌙',
    name: p('Ida — left nostril (Chandra swar)', 'इड़ा — बायाँ स्वर (चंद्र स्वर)'),
    nature: p('Cool, calm, steady', 'शीतल, शांत, स्थिर'),
    good: p(
      'Marriage, friendship, house entry, buying jewellery or a home, starting a long journey, charity, worship, medicine, learning music — gentle and lasting work.',
      'विवाह, मित्रता, गृह प्रवेश, आभूषण या घर ख़रीदना, लंबी यात्रा आरम्भ, दान, पूजा, औषधि, संगीत सीखना — कोमल और स्थायी कार्य।',
    ),
  },
  pingala: {
    key: 'pingala',
    icon: '☀️',
    name: p('Pingala — right nostril (Surya swar)', 'पिंगला — दायाँ स्वर (सूर्य स्वर)'),
    nature: p('Hot, active, sharp', 'उष्ण, सक्रिय, तीव्र'),
    good: p(
      'Exams, debate, court case, competition, hard physical work, a quick business deal, vehicles, eating, studying difficult subjects — bold and quick work.',
      'परीक्षा, वाद-विवाद, मुकदमा, प्रतियोगिता, कठिन परिश्रम, जल्दी का सौदा, वाहन, भोजन, कठिन विषय पढ़ना — साहसिक और शीघ्र कार्य।',
    ),
  },
  sushumna: {
    key: 'sushumna',
    icon: '🕉️',
    name: p('Sushumna — both nostrils', 'सुषुम्ना — दोनों स्वर'),
    nature: p('Balanced, inward', 'संतुलित, अंतर्मुखी'),
    good: p('Meditation, japa and prayer only. Worldly work started now tends to fail.', 'केवल ध्यान, जप और प्रार्थना। इस समय आरम्भ किए सांसारिक कार्य प्रायः सफल नहीं होते।'),
  },
};

export const SIDES = [
  { key: 'left', label: p('From my left', 'मेरे बाएँ से') },
  { key: 'right', label: p('From my right', 'मेरे दाएँ से') },
  { key: 'front', label: p('From the front', 'सामने से') },
  { key: 'self', label: p('I am asking myself', 'मैं स्वयं पूछ रहा/रही हूँ') },
];

export const HOW_TO_CHECK = [
  p('Sit calmly and breathe normally through the nose for a few breaths.', 'शांत बैठें और कुछ साँसें सामान्य रूप से नाक से लें।'),
  p('Hold the back of your hand (or a cool mirror) just below the nose and breathe out.', 'हाथ का पिछला भाग (या ठंडा दर्पण) नाक के ठीक नीचे रखें और साँस छोड़ें।'),
  p('Feel which side the air comes out more strongly — or close one nostril at a time and see which one breathes freely.', 'देखें किस ओर से हवा अधिक ज़ोर से निकलती है — या एक-एक नथुना बंद कर देखें कौन-सा खुलकर चल रहा है।'),
  p('Left stronger = Ida, right stronger = Pingala, both equal = Sushumna.', 'बायाँ अधिक = इड़ा, दायाँ अधिक = पिंगला, दोनों बराबर = सुषुम्ना।'),
];

/** Swar Prashna verdict. */
export function readSwar({ swar, side, categoryKey }) {
  const cat = getCategory(categoryKey);
  const reasons = [];
  let score = 0;
  if (swar === 'sushumna') {
    return {
      verdict: 'no',
      reasons: [{ good: false, text: p('Sushumna is flowing: the moment is for prayer, not for worldly questions. Wait a little, check again and then ask.', 'सुषुम्ना चल रही है: यह समय प्रार्थना का है, सांसारिक प्रश्न का नहीं। थोड़ी देर रुककर पुनः स्वर देखें, फिर पूछें।') }],
    };
  }
  const suits = (swar === 'ida' && cat.swar === 'moon') || (swar === 'pingala' && cat.swar === 'sun');
  if (suits) {
    score += 2;
    reasons.push({ good: true, text: p(`The flowing swar suits this kind of question (${cat.label.en}).`, `चलता स्वर इस प्रकार के प्रश्न (${cat.label.hi}) के अनुकूल है।`) });
  } else {
    score -= 1;
    reasons.push({
      good: false,
      text: swar === 'ida'
        ? p('Ida (calm) is flowing, but this matter needs bold action — success comes slowly.', 'इड़ा (शांत) स्वर चल रहा है, पर इस कार्य में साहस चाहिए — सफलता धीरे आएगी।')
        : p('Pingala (sharp) is flowing, but this matter needs calm and patience — avoid haste.', 'पिंगला (तीव्र) स्वर चल रहा है, पर इस कार्य में धैर्य चाहिए — जल्दबाज़ी न करें।'),
    });
  }
  if (side === 'self' || side === 'front') {
    score += 1;
    reasons.push({ good: true, text: p('Asked by yourself or from the front — the flowing swar alone decides.', 'स्वयं या सामने से पूछा गया — केवल चलता स्वर निर्णय करता है।') });
  } else {
    const full = (side === 'left' && swar === 'ida') || (side === 'right' && swar === 'pingala');
    if (full) {
      score += 2;
      reasons.push({ good: true, text: p('The question came from the side of the flowing nostril (purna disha) — success.', 'प्रश्न चलते स्वर की ओर (पूर्ण दिशा) से आया — सफलता।') });
    } else {
      score -= 2;
      reasons.push({ good: false, text: p('The question came from the empty side (shunya disha) — obstacles or failure.', 'प्रश्न ख़ाली स्वर की ओर (शून्य दिशा) से आया — बाधा या असफलता।') });
    }
  }
  const verdict = score >= 4 ? 'yes' : score >= 2 ? 'likely' : score >= 0 ? 'mixed' : 'no';
  return { verdict, reasons };
}

// Anguli Prashna: the querent closes the eyes and touches one finger of the other hand without choosing.
export const FINGERS = [
  {
    key: 'thumb',
    name: p('Thumb (Angushtha)', 'अंगूठा (अंगुष्ठ)'),
    planet: p('Venus mount · will-power', 'शुक्र पर्वत · इच्छा-शक्ति'),
    verdict: 'likely',
    text: p('Your own will decides. The work succeeds through your effort and determination; do not depend on others.', 'आपकी इच्छा-शक्ति निर्णायक है। कार्य आपके प्रयास और दृढ़ता से सिद्ध होगा; दूसरों पर निर्भर न रहें।'),
    upay: p('Offer white sweets to Goddess Lakshmi on Friday.', 'शुक्रवार को माता लक्ष्मी को सफ़ेद मिठाई अर्पित करें।'),
  },
  {
    key: 'index',
    name: p('Index finger (Tarjani)', 'तर्जनी'),
    planet: p('Jupiter (Guru)', 'गुरु (बृहस्पति)'),
    verdict: 'yes',
    text: p('Jupiter\'s finger — very auspicious. Respect, guidance from elders and success in the matter.', 'गुरु की अंगुली — अति शुभ। सम्मान, बड़ों का मार्गदर्शन और कार्य में सफलता।'),
    upay: p('On Thursday offer yellow flowers or chana dal at a temple.', 'गुरुवार को मंदिर में पीले फूल या चने की दाल अर्पित करें।'),
  },
  {
    key: 'middle',
    name: p('Middle finger (Madhyama)', 'मध्यमा'),
    planet: p('Saturn (Shani)', 'शनि'),
    verdict: 'mixed',
    text: p('Saturn\'s finger — delay and hard work. The result comes, but late; patience and honesty are needed.', 'शनि की अंगुली — विलम्ब और परिश्रम। परिणाम आएगा पर देर से; धैर्य और ईमानदारी चाहिए।'),
    upay: p('Light a mustard-oil lamp under a peepal tree on Saturday.', 'शनिवार को पीपल के नीचे सरसों के तेल का दीपक जलाएँ।'),
  },
  {
    key: 'ring',
    name: p('Ring finger (Anamika)', 'अनामिका'),
    planet: p('Sun (Surya)', 'सूर्य'),
    verdict: 'yes',
    text: p('Sun\'s finger — fame and success. Government or senior people support you.', 'सूर्य की अंगुली — यश और सफलता। सरकार या वरिष्ठ लोग सहयोग करेंगे।'),
    upay: p('Offer water to the rising Sun with a little red sandalwood or roli.', 'उगते सूर्य को रोली या लाल चंदन मिला जल अर्पित करें।'),
  },
  {
    key: 'little',
    name: p('Little finger (Kanishthika)', 'कनिष्ठिका'),
    planet: p('Mercury (Budh)', 'बुध'),
    verdict: 'likely',
    text: p('Mercury\'s finger — success through talk, writing and smart planning. Business questions are favoured; avoid changing your mind often.', 'बुध की अंगुली — बातचीत, लेखन और चतुर योजना से सफलता। व्यापार के प्रश्न शुभ; बार-बार मन न बदलें।'),
    upay: p('Feed green grass to a cow on Wednesday.', 'बुधवार को गाय को हरा चारा खिलाएँ।'),
  },
];
