// श्रीराम शलाका प्रश्नावली — as given in the Gita Press Ramcharitmanas.
//
// The 15×15 grid (225 cells) is built from 9 chaupais of 25 letters each: cell i holds letter
// floor(i / 9) of chaupai (i % 9). Starting from any cell and reading every 9th cell (wrapping
// round after the last cell) therefore always spells exactly one chaupai.
// Letters are separated by spaces; a lone "ा" is its own cell, as in the printed grid.
const p = (en, hi) => ({ en, hi });

export const CHAUPAIS = [
  {
    letters: 'सु नु सि य स त्य अ सी स ह म ा री पू जि हि म न का म न ा तु म्हा री',
    line1: 'सुनु सिय सत्य असीस हमारी।',
    line2: 'पूजिहि मन कामना तुम्हारी॥',
    kand: p('Balkand', 'बालकाण्ड'),
    context: p(
      'Goddess Gauri blesses Sita in the Pushpavatika, when Sita prays for Shri Ram as her husband.',
      'पुष्पवाटिका प्रसंग में श्रीसीताजी के गौरी-पूजन पर माता पार्वती का आशीर्वाद।',
    ),
    meaning: p('"Listen, Sita, my blessing is true: the wish of your heart will be fulfilled."', '"हे सीते! हमारी सच्ची आशीष सुनो — तुम्हारी मनोकामना पूरी होगी।"'),
    phal: p('The question is excellent. The work will succeed.', 'प्रश्न उत्तम है, कार्य सिद्ध होगा।'),
    verdict: 'yes',
  },
  {
    letters: 'प्र बि सि न ग र की जे स ब का जा हृ द यँ रा खि को स ल पु र र ा जा',
    line1: 'प्रबिसि नगर कीजे सब काजा।',
    line2: 'हृदयँ राखि कोसलपुर राजा॥',
    kand: p('Sundarkand', 'सुन्दरकाण्ड'),
    context: p('Hanuman enters Lanka keeping Shri Ram in his heart.', 'हनुमानजी लंका में प्रवेश करते समय श्रीराम का स्मरण करते हैं।'),
    meaning: p('"Enter the city and do all your work, keeping the King of Kosalpur (Shri Ram) in your heart."', '"कोसलपुर के राजा श्रीराम को हृदय में रखकर नगर में प्रवेश करो और सब काम करो।"'),
    phal: p('Begin the work remembering God; you will succeed.', 'भगवान का स्मरण करके कार्य आरम्भ करें, सफलता मिलेगी।'),
    verdict: 'yes',
  },
  {
    letters: 'उ घ रहिं अं त न हो इ नि ब ा हू का ल ने मि जि मि र ा व न र ा हू',
    line1: 'उघरहिं अंत न होइ निबाहू।',
    line2: 'कालनेमि जिमि रावन राहू॥',
    kand: p('Balkand', 'बालकाण्ड'),
    context: p('From the praise of good company: a deceiver is exposed in the end, like Kalanemi, Ravana and Rahu.', 'सत्संग-महिमा प्रसंग: कपटी का भेद अंत में खुल ही जाता है, जैसे कालनेमि, रावण और राहु का।'),
    meaning: p('"In the end the truth comes out and deceit cannot last — like Kalanemi, Ravana and Rahu."', '"अंत में भेद खुल जाता है, कपट का निर्वाह नहीं होता — जैसे कालनेमि, रावण और राहु।"'),
    phal: p('There is no good in this work; its success is doubtful.', 'इस कार्य में भलाई नहीं है, कार्य की सफलता में संदेह है।'),
    verdict: 'no',
  },
  {
    letters: 'बि धि बस सुज न कु सं ग त प र हीं फ नि मनि स म निज गु न अ नु स र हीं',
    line1: 'बिधि बस सुजन कुसंगत परहीं।',
    line2: 'फनि मनि सम निज गुन अनुसरहीं॥',
    kand: p('Balkand', 'बालकाण्ड'),
    context: p('From the praise of good company: good people who fall into bad company keep their virtue, like the jewel on a serpent.', 'सत्संग-महिमा प्रसंग: सज्जन कुसंग में पड़कर भी साँप की मणि की तरह अपना गुण नहीं छोड़ते।'),
    meaning: p('"By fate the good sometimes fall into bad company, yet like the jewel on a serpent\'s hood they keep their own virtue."', '"विधिवश सज्जन कुसंगति में पड़ जाते हैं, पर साँप की मणि के समान अपने गुण का ही अनुसरण करते हैं।"'),
    phal: p('Leave the company of wrong people. Success of the work is doubtful.', 'खोटे मनुष्यों का संग छोड़ दें। कार्य की सफलता में संदेह है।'),
    verdict: 'mixed',
  },
  {
    letters: 'हो इ हि सो इ जो रा म र चि र ा खा को क रि त र्क ब ढ़ ा वै स ा खा',
    line1: 'होइहि सोइ जो राम रचि राखा।',
    line2: 'को करि तर्क बढ़ावै साखा॥',
    kand: p('Balkand', 'बालकाण्ड'),
    context: p('Lord Shiva\'s words when Sati goes to test Shri Ram.', 'सतीजी के श्रीराम की परीक्षा लेने जाने पर भगवान शिव के वचन।'),
    meaning: p('"Whatever Ram has ordained will happen. Why argue and add more branches to it?"', '"जो कुछ राम ने रच रखा है वही होगा। तर्क करके कौन बात की शाखा बढ़ाए?"'),
    phal: p('The outcome is doubtful, so it is best to leave it to God.', 'कार्य होने में संदेह है, अतः उसे भगवान पर छोड़ देना श्रेयस्कर है।'),
    verdict: 'mixed',
  },
  {
    letters: 'मु द मं ग ल म य सं त स म ा जू जो ज ग जं ग म ती र थ र ा जू',
    line1: 'मुद मंगलमय संत समाजू।',
    line2: 'जो जग जंगम तीरथराजू॥',
    kand: p('Balkand', 'बालकाण्ड'),
    context: p('The gathering of saints is praised as a moving Prayagraj, the king of pilgrimages.', 'संत-समाज को चलता-फिरता तीर्थराज प्रयाग कहा गया है।'),
    meaning: p('"The company of saints is full of joy and blessings — it is the moving king of pilgrimages in this world."', '"संतों का समाज आनंद और मंगल से भरा है, जो जगत में चलता-फिरता तीर्थराज (प्रयाग) है।"'),
    phal: p('The question is excellent. The work will succeed.', 'प्रश्न उत्तम है, कार्य सिद्ध होगा।'),
    verdict: 'yes',
  },
  {
    letters: 'ग र ल सु धा रि पु क र हिं मि ता ई गो प द सिं धु अ न ल सि त ला ई',
    line1: 'गरल सुधा रिपु करहिं मिताई।',
    line2: 'गोपद सिंधु अनल सितलाई॥',
    kand: p('Sundarkand', 'सुन्दरकाण्ड'),
    context: p('When Hanuman enters Lanka remembering Shri Ram, everything turns in his favour.', 'श्रीराम का स्मरण कर लंका में प्रवेश करने पर हनुमानजी के लिए सब अनुकूल हो जाता है।'),
    meaning: p('"For one who remembers Ram, poison becomes nectar, enemies become friends, the ocean shrinks to a hoof-print and fire turns cool."', '"(रामनाम लेने वाले के लिए) विष अमृत हो जाता है, शत्रु मित्र बन जाते हैं, समुद्र गाय के खुर जितना और अग्नि शीतल हो जाती है।"'),
    phal: p('The question is very good. The work will succeed.', 'प्रश्न बहुत श्रेष्ठ है, कार्य सफल होगा।'),
    verdict: 'yes',
  },
  {
    letters: 'ब रु न कु बे र सु रे स स मी रा र न स न मु ख ध रि का हुँ न धी रा',
    line1: 'बरुन कुबेर सुरेस समीरा।',
    line2: 'रन सनमुख धरि काहुँ न धीरा॥',
    kand: p('Lankakand', 'लंकाकाण्ड'),
    context: p('Mandodari laments after Ravana falls: even the gods could not stand before him in battle.', 'रावण की मृत्यु के पश्चात मन्दोदरी का विलाप: युद्ध में देवता भी उसके सामने टिक न सके।'),
    meaning: p('"Varun, Kuber, Indra and Vayu — none of them could keep courage facing you in battle."', '"वरुण, कुबेर, इन्द्र और वायु — इनमें से किसी ने भी रण में तुम्हारे सामने धैर्य धारण नहीं किया।"'),
    phal: p('Completion of the work is doubtful.', 'कार्य पूर्ण होने में संदेह है।'),
    verdict: 'no',
  },
  {
    letters: 'सु फ ल म नो र थ हो हुँ तु म्हा रे रा म ल ख नु सु नि भ ए सु ख ा रे',
    line1: 'सुफल मनोरथ होहुँ तुम्हारे।',
    line2: 'राम लखनु सुनि भए सुखारे॥',
    kand: p('Balkand', 'बालकाण्ड'),
    context: p('Sage Vishwamitra blesses Ram and Lakshman when they bring flowers from the Pushpavatika.', 'पुष्पवाटिका से फूल लाने पर विश्वामित्रजी का श्रीराम-लक्ष्मण को आशीर्वाद।'),
    meaning: p('"May all your wishes bear fruit." Hearing this, Ram and Lakshman were delighted.', '"तुम्हारे मनोरथ सफल हों।" यह सुनकर श्रीराम-लक्ष्मण प्रसन्न हुए।'),
    phal: p('The question is very good. The work will succeed.', 'प्रश्न बहुत उत्तम है, कार्य सिद्ध होगा।'),
    verdict: 'yes',
  },
].map((c, i) => ({ ...c, index: i, units: c.letters.split(' ') }));

export const GRID_SIZE = 15;
export const CELL_COUNT = GRID_SIZE * GRID_SIZE; // 225 = 9 chaupais × 25 letters

/** The 225 grid letters in reading order (row by row). */
export const GRID = Array.from({ length: CELL_COUNT }, (_, i) => CHAUPAIS[i % 9].units[Math.floor(i / 9)]);

/**
 * Read the chaupai starting from a cell: every 9th cell from the chosen one, wrapping round,
 * exactly as the Gita Press instructions say.
 * @returns {{ chaupai, cells: number[], letters: string[] }}
 */
export function readFromCell(start) {
  const cells = [];
  for (let k = 0; k < 25; k++) cells.push((start + k * 9) % CELL_COUNT);
  return { chaupai: CHAUPAIS[start % 9], cells, letters: cells.map((c) => GRID[c]) };
}

export const RULES = [
  p('Bathe or wash your hands and feet, sit calmly and remember Shri Ram (chant "Shri Ram" a few times).', 'स्नान करके या हाथ-पैर धोकर शांत बैठें और श्रीराम का स्मरण करें (कुछ बार "श्रीराम" जपें)।'),
  p('Hold one clear question in your mind. Ask only one question at a time.', 'मन में एक स्पष्ट प्रश्न रखें। एक बार में एक ही प्रश्न पूछें।'),
  p('Without thinking, place your finger (click) on any one cell of the grid.', 'बिना सोचे-विचारे यंत्र के किसी एक कोष्ठ पर अँगुली रखें (क्लिक करें)।'),
  p('Starting from that letter, every 9th letter is written down until you return to it — 25 letters form a chaupai.', 'उस अक्षर से आरम्भ कर हर नौवाँ अक्षर लिखते जाएँ, जब तक पुनः उसी कोष्ठ पर न पहुँचें — 25 अक्षरों से एक चौपाई बनती है।'),
  p('The chaupai and its phal (result) are the answer. Do not ask the same question again the same day.', 'वह चौपाई और उसका फल ही उत्तर है। उसी दिन वही प्रश्न दोबारा न पूछें।'),
];
