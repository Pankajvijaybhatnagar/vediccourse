// Reference data for the Pandit Sangh workspace. Every label is bilingual { en, hi }.
const p = (en, hi) => ({ en, hi });

/** Platform commission taken from every job paid through Pandit Sangh. */
export const COMMISSION_RATE = 0.1;

export const SPECIALITIES = {
  karmkand: p('Karmkand', 'कर्मकांड'),
  jyotish: p('Jyotish', 'ज्योतिष'),
  vivah: p('Vivah Sanskar', 'विवाह संस्कार'),
  shraddh: p('Shraddh & Pitru Karya', 'श्राद्ध एवं पितृ कार्य'),
  katha: p('Katha Vachan', 'कथा वाचन'),
  path: p('Path (Sundarkand, Gita, Chandi)', 'पाठ (सुंदरकांड, गीता, चंडी)'),
  havan: p('Havan & Yagya', 'हवन एवं यज्ञ'),
  rudra: p('Rudrabhishek', 'रुद्राभिषेक'),
  grahShanti: p('Grah Shanti', 'ग्रह शांति'),
  vastu: p('Vastu & Bhoomi Pujan', 'वास्तु एवं भूमि पूजन'),
  sanskar: p('Sanskar (Mundan, Janeu, Namkaran)', 'संस्कार (मुंडन, जनेऊ, नामकरण)'),
};

export const LANGUAGES = {
  hi: p('Hindi', 'हिंदी'),
  sa: p('Sanskrit', 'संस्कृत'),
  en: p('English', 'अंग्रेज़ी'),
  bh: p('Bhojpuri', 'भोजपुरी'),
  mr: p('Marathi', 'मराठी'),
  gu: p('Gujarati', 'गुजराती'),
  pa: p('Punjabi', 'पंजाबी'),
  bn: p('Bengali', 'बंगाली'),
};

/** Rituals a job can be posted for, with a typical dakshina range (₹) as a guide only. */
export const RITUALS = {
  satyanarayan: { label: p('Satyanarayan Katha', 'सत्यनारायण कथा'), min: 2100, max: 5100, pandits: 1 },
  griha: { label: p('Griha Pravesh', 'गृह प्रवेश'), min: 5100, max: 21000, pandits: 2 },
  vivah: { label: p('Vivah (Wedding)', 'विवाह'), min: 11000, max: 51000, pandits: 3 },
  rudrabhishek: { label: p('Rudrabhishek', 'रुद्राभिषेक'), min: 3100, max: 11000, pandits: 2 },
  sundarkand: { label: p('Sundarkand Path', 'सुंदरकांड पाठ'), min: 2100, max: 5100, pandits: 2 },
  navgrah: { label: p('Navgrah Shanti', 'नवग्रह शांति'), min: 5100, max: 15000, pandits: 2 },
  mahamrityunjay: { label: p('Mahamrityunjay Jaap (1.25 lakh)', 'महामृत्युंजय जाप (सवा लाख)'), min: 21000, max: 61000, pandits: 5 },
  shraddh: { label: p('Shraddh / Pitru Tarpan', 'श्राद्ध / पितृ तर्पण'), min: 1100, max: 5100, pandits: 1 },
  narayanBali: { label: p('Narayan Bali', 'नारायण बलि'), min: 11000, max: 31000, pandits: 3 },
  mundan: { label: p('Mundan Sanskar', 'मुंडन संस्कार'), min: 1100, max: 5100, pandits: 1 },
  janeu: { label: p('Yagyopavit (Janeu)', 'यज्ञोपवीत (जनेऊ)'), min: 3100, max: 11000, pandits: 2 },
  bhagwat: { label: p('Bhagwat Saptah', 'भागवत सप्ताह'), min: 51000, max: 251000, pandits: 5 },
  havan: { label: p('Havan', 'हवन'), min: 1100, max: 5100, pandits: 1 },
  other: { label: p('Other', 'अन्य'), min: 1100, max: 11000, pandits: 1 },
};

/** Roles inside a multi-pandit job. Default share weights drive the "suggested split". */
export const JOB_ROLES = {
  acharya: { label: p('Mukhya Acharya (lead)', 'मुख्य आचार्य'), weight: 2 },
  brahma: { label: p('Brahma / Ritvik', 'ब्रह्मा / ऋत्विक'), weight: 1.5 },
  sahayak: { label: p('Sahayak Pandit', 'सहायक पंडित'), weight: 1 },
  path: { label: p('Path Karta (reciter)', 'पाठ कर्ता'), weight: 1 },
};

/**
 * Family traditions (कुल परंपरा) a yajman's ancestors kept.
 * `every` is in months (0 = once in a lifetime / on occasion); it drives the "due" reminder.
 */
export const TRADITIONS = {
  kuldeviDarshan: {
    label: p('Kuldevi / Kuldevta darshan (jaat)', 'कुलदेवी / कुलदेवता दर्शन (जात)'),
    every: 12,
    remedy: p(
      'Visit the Kuldevi/Kuldevta temple with family, offer chunri, coconut and sweets, and take blessings for the household as your ancestors did.',
      'परिवार सहित कुलदेवी/कुलदेवता के स्थान पर जाकर चुनरी, नारियल और प्रसाद अर्पित करें तथा पूर्वजों की भाँति घर-परिवार के लिए आशीर्वाद लें।'
    ),
  },
  pitruShraddh: {
    label: p('Annual Shraddh on death tithi', 'पुण्यतिथि पर वार्षिक श्राद्ध'),
    every: 12,
    remedy: p(
      'Perform Shraddh on the ancestor\'s tithi: tarpan with til-jal, pind daan, and feed a Brahmin, a cow, a dog and crows.',
      'पूर्वज की तिथि पर श्राद्ध करें — तिल-जल से तर्पण, पिंडदान, तथा ब्राह्मण, गौ, श्वान और कौए के लिए भोजन निकालें।'
    ),
  },
  pitruPaksha: {
    label: p('Pitru Paksha tarpan', 'पितृ पक्ष तर्पण'),
    every: 12,
    remedy: p(
      'During Pitru Paksha offer daily tarpan facing south with black sesame and water, and do Shraddh on the ancestor\'s tithi or on Sarvapitri Amavasya.',
      'पितृ पक्ष में प्रतिदिन दक्षिण दिशा की ओर मुख करके काले तिल और जल से तर्पण करें, तथा पूर्वज की तिथि या सर्वपितृ अमावस्या को श्राद्ध करें।'
    ),
  },
  gayaShraddh: {
    label: p('Gaya Shraddh', 'गया श्राद्ध'),
    every: 0,
    remedy: p(
      'The family has a tradition of Gaya Shraddh. If it has not been done for the recent generation, plan pind daan at Gaya ji.',
      'परिवार में गया श्राद्ध की परंपरा है। यदि हाल की पीढ़ी के लिए नहीं हुआ है तो गया जी में पिंडदान की योजना बनाएँ।'
    ),
  },
  satyanarayan: {
    label: p('Satyanarayan Katha on Purnima', 'पूर्णिमा पर सत्यनारायण कथा'),
    every: 1,
    remedy: p(
      'Keep the family tradition of Satyanarayan Katha on Purnima; distribute panjiri and charnamrit to neighbours.',
      'पूर्णिमा को सत्यनारायण कथा की कुल परंपरा बनाए रखें; पंजीरी और चरणामृत का प्रसाद पड़ोसियों में बाँटें।'
    ),
  },
  rudrabhishekShravan: {
    label: p('Rudrabhishek in Shravan', 'श्रावण में रुद्राभिषेक'),
    every: 12,
    remedy: p(
      'Perform Rudrabhishek on a Shravan Monday with milk, curd, honey, ghee and Ganga jal, chanting Om Namah Shivaya.',
      'श्रावण के सोमवार को दूध, दही, शहद, घी और गंगाजल से "ॐ नमः शिवाय" जपते हुए रुद्राभिषेक करें।'
    ),
  },
  navratriJyoti: {
    label: p('Navratri Akhand Jyoti & Kanya Pujan', 'नवरात्रि अखंड ज्योति एवं कन्या पूजन'),
    every: 6,
    remedy: p(
      'Light the Akhand Jyoti for Navratri, read Durga Saptashati if possible, and do Kanya Pujan on Ashtami/Navami.',
      'नवरात्रि में अखंड ज्योति जलाएँ, संभव हो तो दुर्गा सप्तशती का पाठ करें और अष्टमी/नवमी को कन्या पूजन करें।'
    ),
  },
  mundanKuldevi: {
    label: p('Mundan at Kuldevi temple', 'कुलदेवी स्थान पर मुंडन'),
    every: 0,
    remedy: p(
      'The family does Mundan at the Kuldevi temple. For any child in the house who is due, plan Mundan there in the 1st, 3rd or 5th year.',
      'परिवार में मुंडन कुलदेवी स्थान पर होता है। घर में जिस बच्चे का मुंडन बाकी हो, उसका पहले, तीसरे या पाँचवें वर्ष में वहीं मुंडन कराएँ।'
    ),
  },
  annualHavan: {
    label: p('Annual family Havan', 'वार्षिक पारिवारिक हवन'),
    every: 12,
    remedy: p(
      'Hold the yearly family Havan with Navgrah and Kuldevta ahutis to keep the household peaceful.',
      'घर की सुख-शांति के लिए नवग्रह और कुलदेवता की आहुतियों सहित वार्षिक पारिवारिक हवन करें।'
    ),
  },
  kartikSnan: {
    label: p('Kartik snan & Deepdaan', 'कार्तिक स्नान एवं दीपदान'),
    every: 12,
    remedy: p(
      'In Kartik take an early bath (Ganga or at home with Ganga jal) and offer lamps at Tulsi and the temple every evening.',
      'कार्तिक मास में प्रातः स्नान (गंगा अथवा घर पर गंगाजल मिलाकर) करें और प्रतिदिन संध्या को तुलसी व मंदिर में दीपदान करें।'
    ),
  },
  gauDaan: {
    label: p('Gau seva / Gau daan', 'गौ सेवा / गौ दान'),
    every: 12,
    remedy: p(
      'Continue the ancestral practice of Gau seva: feed a cow green fodder and jaggery, especially on Amavasya.',
      'पूर्वजों की गौ सेवा की परंपरा निभाएँ — विशेषकर अमावस्या को गाय को हरा चारा और गुड़ खिलाएँ।'
    ),
  },
  narayanBali: {
    label: p('Narayan Bali / Tripindi', 'नारायण बलि / त्रिपिंडी'),
    every: 0,
    remedy: p(
      'The family has done Narayan Bali / Tripindi Shraddh before. If an untimely death has happened in the family, consult about doing it again at Trimbakeshwar or a tirth.',
      'परिवार में पहले नारायण बलि / त्रिपिंडी श्राद्ध हुआ है। यदि परिवार में कोई अकाल मृत्यु हुई हो तो त्र्यंबकेश्वर या किसी तीर्थ पर पुनः कराने पर विचार करें।'
    ),
  },
};

/**
 * Commonly cited gotra → rishi and pravar. Families sometimes follow a different pravar,
 * so the UI always asks the pandit to confirm against the family's own records.
 */
export const GOTRAS = {
  kashyap: { label: p('Kashyap', 'कश्यप'), pravar: ['काश्यप', 'आवत्सार', 'नैध्रुव'] },
  bharadwaj: { label: p('Bharadwaj', 'भारद्वाज'), pravar: ['आंगिरस', 'बार्हस्पत्य', 'भारद्वाज'] },
  vashishtha: { label: p('Vashishtha', 'वसिष्ठ'), pravar: ['वासिष्ठ', 'ऐन्द्रप्रमद', 'आभरद्वसव्य'] },
  vishwamitra: { label: p('Vishwamitra', 'विश्वामित्र'), pravar: ['वैश्वामित्र', 'देवरात', 'औदल'] },
  gautam: { label: p('Gautam', 'गौतम'), pravar: ['आंगिरस', 'आयास्य', 'गौतम'] },
  jamadagni: { label: p('Jamadagni', 'जमदग्नि'), pravar: ['भार्गव', 'च्यावन', 'आप्नवान', 'और्व', 'जामदग्न्य'] },
  atri: { label: p('Atri', 'अत्रि'), pravar: ['आत्रेय', 'आर्चनानस', 'श्यावाश्व'] },
  agastya: { label: p('Agastya', 'अगस्त्य'), pravar: ['आगस्त्य', 'दार्ढच्युत', 'इध्मवाह'] },
  shandilya: { label: p('Shandilya', 'शांडिल्य'), pravar: ['शांडिल्य', 'असित', 'देवल'] },
  garg: { label: p('Garg', 'गर्ग'), pravar: ['आंगिरस', 'बार्हस्पत्य', 'भारद्वाज', 'शैन्य', 'गार्ग्य'] },
  kaushik: { label: p('Kaushik', 'कौशिक'), pravar: ['वैश्वामित्र', 'आघमर्षण', 'कौशिक'] },
  vatsa: { label: p('Vatsa', 'वत्स'), pravar: ['भार्गव', 'च्यावन', 'आप्नवान', 'और्व', 'जामदग्न्य'] },
  parashar: { label: p('Parashar', 'पराशर'), pravar: ['वासिष्ठ', 'शाक्त्य', 'पाराशर्य'] },
  kaundinya: { label: p('Kaundinya', 'कौंडिन्य'), pravar: ['वासिष्ठ', 'मैत्रावरुण', 'कौंडिन्य'] },
  sankrit: { label: p('Sankrit', 'सांकृत्य'), pravar: ['आंगिरस', 'गौरुवीत', 'सांकृत्य'] },
  upmanyu: { label: p('Upmanyu', 'उपमन्यु'), pravar: ['वासिष्ठ', 'ऐन्द्रप्रमद', 'आभरद्वसव्य'] },
  other: { label: p('Other', 'अन्य'), pravar: [] },
};

export const VEDAS = {
  rig: p('Rigveda', 'ऋग्वेद'),
  yajur: p('Yajurveda (Shukla)', 'शुक्ल यजुर्वेद'),
  krishnaYajur: p('Krishna Yajurveda', 'कृष्ण यजुर्वेद'),
  sam: p('Samaveda', 'सामवेद'),
  atharva: p('Atharvaveda', 'अथर्ववेद'),
};

export const RELATIONS = {
  self: p('Self', 'स्वयं'),
  wife: p('Wife', 'पत्नी'),
  husband: p('Husband', 'पति'),
  son: p('Son', 'पुत्र'),
  daughter: p('Daughter', 'पुत्री'),
  father: p('Father', 'पिता'),
  mother: p('Mother', 'माता'),
  grandfather: p('Grandfather', 'दादा / पितामह'),
  grandmother: p('Grandmother', 'दादी / पितामही'),
  greatGrandfather: p('Great-grandfather', 'परदादा / प्रपितामह'),
  greatGrandmother: p('Great-grandmother', 'परदादी / प्रपितामही'),
  brother: p('Brother', 'भाई'),
  other: p('Other', 'अन्य'),
};

export const PAKSHA = { shukla: p('Shukla', 'शुक्ल'), krishna: p('Krishna', 'कृष्ण') };

export const TITHIS = [
  p('Pratipada', 'प्रतिपदा'), p('Dwitiya', 'द्वितीया'), p('Tritiya', 'तृतीया'), p('Chaturthi', 'चतुर्थी'),
  p('Panchami', 'पंचमी'), p('Shashthi', 'षष्ठी'), p('Saptami', 'सप्तमी'), p('Ashtami', 'अष्टमी'),
  p('Navami', 'नवमी'), p('Dashami', 'दशमी'), p('Ekadashi', 'एकादशी'), p('Dwadashi', 'द्वादशी'),
  p('Trayodashi', 'त्रयोदशी'), p('Chaturdashi', 'चतुर्दशी'), p('Purnima / Amavasya', 'पूर्णिमा / अमावस्या'),
];

export const RASHIS = [
  p('Mesh', 'मेष'), p('Vrishabh', 'वृषभ'), p('Mithun', 'मिथुन'), p('Kark', 'कर्क'),
  p('Simha', 'सिंह'), p('Kanya', 'कन्या'), p('Tula', 'तुला'), p('Vrishchik', 'वृश्चिक'),
  p('Dhanu', 'धनु'), p('Makar', 'मकर'), p('Kumbh', 'कुंभ'), p('Meen', 'मीन'),
];

/** Rashi lord remedy (index matches RASHIS). */
export const RASHI_REMEDY = [
  p('Lord Mars — Hanuman Chalisa on Tuesdays, offer red lentils.', 'स्वामी मंगल — मंगलवार को हनुमान चालीसा, मसूर दाल का दान।'),
  p('Lord Venus — worship Lakshmi on Fridays, donate white sweets.', 'स्वामी शुक्र — शुक्रवार को लक्ष्मी पूजन, सफ़ेद मिठाई का दान।'),
  p('Lord Mercury — feed green fodder to a cow on Wednesdays, worship Ganesh.', 'स्वामी बुध — बुधवार को गाय को हरा चारा, गणेश पूजन।'),
  p('Lord Moon — offer water to Shiva on Mondays, respect your mother.', 'स्वामी चंद्र — सोमवार को शिव पर जल, माता का सम्मान।'),
  p('Lord Sun — offer arghya to the Sun at sunrise, recite Aditya Hridayam.', 'स्वामी सूर्य — सूर्योदय पर अर्घ्य, आदित्य हृदय स्तोत्र।'),
  p('Lord Mercury — chant Om Budhaya Namah, donate green moong.', 'स्वामी बुध — "ॐ बुधाय नमः" जप, हरी मूंग का दान।'),
  p('Lord Venus — chant Om Shukraya Namah on Fridays, donate rice and curd.', 'स्वामी शुक्र — शुक्रवार को "ॐ शुक्राय नमः", चावल-दही का दान।'),
  p('Lord Mars — Sunderkand on Tuesdays, donate jaggery.', 'स्वामी मंगल — मंगलवार को सुंदरकांड, गुड़ का दान।'),
  p('Lord Jupiter — worship Vishnu on Thursdays, donate chana dal and turmeric.', 'स्वामी गुरु — गुरुवार को विष्णु पूजन, चने की दाल व हल्दी का दान।'),
  p('Lord Saturn — light a mustard-oil lamp under Peepal on Saturdays.', 'स्वामी शनि — शनिवार को पीपल के नीचे सरसों के तेल का दीपक।'),
  p('Lord Saturn — serve the elderly and labourers, donate black sesame.', 'स्वामी शनि — वृद्धों व श्रमिकों की सेवा, काले तिल का दान।'),
  p('Lord Jupiter — read Vishnu Sahasranama, feed Brahmins on Thursdays.', 'स्वामी गुरु — विष्णु सहस्रनाम पाठ, गुरुवार को ब्राह्मण भोजन।'),
];
