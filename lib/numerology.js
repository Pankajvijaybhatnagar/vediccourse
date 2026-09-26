const MASTER = new Set([11, 22, 33]);

function reduce(n) {
  while (n > 9 && !MASTER.has(n)) {
    n = String(n)
      .split('')
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return n;
}

// Pythagorean letter values: A=1 … I=9, J=1 …
const letterValue = (ch) => ((ch.charCodeAt(0) - 97) % 9) + 1;
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

export function lifePath(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return reduce(reduce(y) + reduce(m) + reduce(d));
}

function fromName(name, filter) {
  const letters = name.toLowerCase().replace(/[^a-z]/g, '').split('').filter(filter);
  return letters.length ? reduce(letters.reduce((s, ch) => s + letterValue(ch), 0)) : null;
}

export const expression = (name) => fromName(name, () => true);
export const soulUrge = (name) => fromName(name, (ch) => VOWELS.has(ch));
export const personality = (name) => fromName(name, (ch) => !VOWELS.has(ch));

// Bilingual meanings: title/text are { en, hi }, keywords is { en: [], hi: [] }.
const m = (titleEn, titleHi, kwEn, kwHi, textEn, textHi) => ({ title: { en: titleEn, hi: titleHi }, keywords: { en: kwEn, hi: kwHi }, text: { en: textEn, hi: textHi } });

export const MEANINGS = {
  1: m('The Leader', 'नेतृत्वकर्ता', ['Independent', 'Ambitious', 'Pioneering'], ['स्वतंत्र', 'महत्वाकांक्षी', 'अग्रणी'], 'You are driven by a desire to lead and create. Original and self-reliant, you forge paths others later follow.', 'आप नेतृत्व और सृजन की इच्छा से प्रेरित हैं। मौलिक और आत्मनिर्भर, आप ऐसे रास्ते बनाते हैं जिन पर बाद में दूसरे चलते हैं। इस अंक का स्वामी सूर्य है।'),
  2: m('The Peacemaker', 'शांतिदूत', ['Diplomatic', 'Sensitive', 'Cooperative'], ['कूटनीतिक', 'संवेदनशील', 'सहयोगी'], 'You bring harmony wherever you go. Gentle and intuitive, you excel in partnerships and quietly hold everything together.', 'आप जहाँ जाते हैं वहाँ सामंजस्य लाते हैं। सौम्य और अंतर्ज्ञानी, आप साझेदारी में उत्कृष्ट हैं। इस अंक का स्वामी चंद्रमा है।'),
  3: m('The Creator', 'सृजनकर्ता', ['Expressive', 'Joyful', 'Artistic'], ['अभिव्यक्तिशील', 'आनंदित', 'कलात्मक'], 'Creativity flows through you. Charismatic and optimistic, you inspire others through words, art and laughter.', 'आपमें रचनात्मकता प्रवाहित होती है। आकर्षक और आशावादी, आप शब्दों, कला और हँसी से दूसरों को प्रेरित करते हैं। इस अंक का स्वामी गुरु है।'),
  4: m('The Builder', 'निर्माता', ['Practical', 'Loyal', 'Disciplined'], ['व्यावहारिक', 'वफ़ादार', 'अनुशासित'], 'You build lasting foundations. Hardworking and dependable, you turn dreams into solid, tangible reality.', 'आप स्थायी नींव बनाते हैं। मेहनती और भरोसेमंद, आप सपनों को ठोस वास्तविकता में बदलते हैं। इस अंक का स्वामी राहु है।'),
  5: m('The Adventurer', 'साहसी यात्री', ['Free', 'Curious', 'Dynamic'], ['स्वतंत्र', 'जिज्ञासु', 'गतिशील'], 'Freedom is your oxygen. Versatile and adventurous, you crave experience and embrace change fearlessly.', 'स्वतंत्रता आपकी प्राणवायु है। बहुमुखी और साहसी, आप अनुभवों के प्रेमी हैं और परिवर्तन को निडरता से अपनाते हैं। इस अंक का स्वामी बुध है।'),
  6: m('The Nurturer', 'पालनकर्ता', ['Caring', 'Responsible', 'Harmonious'], ['देखभाल करने वाले', 'ज़िम्मेदार', 'सामंजस्यपूर्ण'], 'Love and responsibility guide you. You are the protector of home and community, devoted to those you cherish.', 'प्रेम और ज़िम्मेदारी आपका मार्गदर्शन करते हैं। आप घर और समाज के रक्षक हैं। इस अंक का स्वामी शुक्र है।'),
  7: m('The Seeker', 'साधक', ['Wise', 'Analytical', 'Spiritual'], ['ज्ञानी', 'विश्लेषणात्मक', 'आध्यात्मिक'], 'You search for deeper truths. Introspective and intuitive, you are drawn to mysteries, knowledge and the sacred.', 'आप गहरे सत्य की खोज में रहते हैं। आत्मचिंतनशील और अंतर्ज्ञानी, आप रहस्य, ज्ञान और आध्यात्म की ओर आकर्षित होते हैं। इस अंक का स्वामी केतु है।'),
  8: m('The Powerhouse', 'शक्तिशाली', ['Ambitious', 'Authoritative', 'Abundant'], ['महत्वाकांक्षी', 'प्रभावशाली', 'समृद्ध'], 'You are destined for achievement. Strong and strategic, you understand the flow of power and material success.', 'आप उपलब्धियों के लिए बने हैं। दृढ़ और रणनीतिक, आप शक्ति और भौतिक सफलता के प्रवाह को समझते हैं। इस अंक का स्वामी शनि है।'),
  9: m('The Humanitarian', 'मानवतावादी', ['Compassionate', 'Generous', 'Idealistic'], ['करुणामय', 'उदार', 'आदर्शवादी'], 'Your heart belongs to the world. Wise and compassionate, you are here to serve, heal and uplift humanity.', 'आपका हृदय पूरे संसार के लिए है। ज्ञानी और करुणामय, आप मानवता की सेवा के लिए आए हैं। इस अंक का स्वामी मंगल है।'),
  11: m('The Intuitive (Master)', 'अंतर्ज्ञानी (मास्टर अंक)', ['Visionary', 'Inspired', 'Illuminating'], ['दूरदर्शी', 'प्रेरित', 'प्रकाशमान'], 'A master number of spiritual insight. You channel inspiration and are here to illuminate the path for others.', 'आध्यात्मिक अंतर्दृष्टि का मास्टर अंक। आप प्रेरणा के वाहक हैं और दूसरों का मार्ग प्रकाशित करने आए हैं।'),
  22: m('The Master Builder', 'महान निर्माता (मास्टर अंक)', ['Visionary', 'Practical', 'Powerful'], ['दूरदर्शी', 'व्यावहारिक', 'शक्तिशाली'], 'The most powerful number. You can turn grand visions into reality that benefits generations to come.', 'सबसे शक्तिशाली अंक। आप बड़े सपनों को ऐसी वास्तविकता में बदल सकते हैं जो पीढ़ियों तक लाभ दे।'),
  33: m('The Master Teacher', 'महान गुरु (मास्टर अंक)', ['Selfless', 'Healing', 'Uplifting'], ['निःस्वार्थ', 'उपचारक', 'उत्थानकारी'], 'A rare master number of compassion. Your purpose is to uplift humanity through love and selfless guidance.', 'करुणा का दुर्लभ मास्टर अंक। आपका उद्देश्य प्रेम और निःस्वार्थ मार्गदर्शन से मानवता का उत्थान है।'),
};

/** Mulank (psychic number): the birth day reduced to a single digit. */
export function mulank(dateStr) {
  let n = Number(dateStr.split('-')[2]);
  while (n > 9) n = String(n).split('').reduce((s, dg) => s + Number(dg), 0);
  return n;
}
