const p = (en, hi) => ({ en, hi });

// Major Arcana. `name`, `upright` and `reversed` are bilingual { en, hi }.
export const MAJOR_ARCANA = [
  { numeral: '0', icon: '✧', name: p('The Fool', 'द फ़ूल (मूर्ख)'), upright: p('New beginnings, spontaneity and a leap of faith.', 'नई शुरुआत, सहजता और विश्वास की छलांग।'), reversed: p('Recklessness, hesitation and fear of the unknown.', 'लापरवाही, झिझक और अनजाने का भय।') },
  { numeral: 'I', icon: '✦', name: p('The Magician', 'द मैजिशियन (जादूगर)'), upright: p('Manifestation, skill and inspired action.', 'इच्छा पूर्ति, कौशल और प्रेरित कर्म।'), reversed: p('Manipulation, untapped talent and poor planning.', 'छल, अप्रयुक्त प्रतिभा और कमज़ोर योजना।') },
  { numeral: 'II', icon: '☾', name: p('The High Priestess', 'द हाई प्रीस्टेस (महापुजारिन)'), upright: p('Intuition, mystery and the subconscious mind.', 'अंतर्ज्ञान, रहस्य और अवचेतन मन।'), reversed: p('Secrets, disconnection and withdrawn intuition.', 'रहस्य, अलगाव और दबा हुआ अंतर्ज्ञान।') },
  { numeral: 'III', icon: '♀', name: p('The Empress', 'द एम्प्रेस (महारानी)'), upright: p('Abundance, nurturing and creative fertility.', 'समृद्धि, पोषण और रचनात्मक उर्वरता।'), reversed: p('Creative block and dependence on others.', 'रचनात्मक रुकावट और दूसरों पर निर्भरता।') },
  { numeral: 'IV', icon: '♂', name: p('The Emperor', 'द एम्परर (सम्राट)'), upright: p('Authority, structure and a solid foundation.', 'अधिकार, व्यवस्था और मज़बूत नींव।'), reversed: p('Domination, rigidity and loss of control.', 'प्रभुत्व, कठोरता और नियंत्रण खोना।') },
  { numeral: 'V', icon: '⚷', name: p('The Hierophant', 'द हायरोफ़ेंट (धर्मगुरु)'), upright: p('Tradition, wisdom and spiritual guidance.', 'परंपरा, ज्ञान और आध्यात्मिक मार्गदर्शन।'), reversed: p('Rebellion, subversion and new approaches.', 'विद्रोह और नए तरीके अपनाना।') },
  { numeral: 'VI', icon: '♡', name: p('The Lovers', 'द लवर्स (प्रेमी)'), upright: p('Love, harmony and meaningful choices.', 'प्रेम, सामंजस्य और सार्थक चुनाव।'), reversed: p('Imbalance, misalignment and disharmony.', 'असंतुलन, मतभेद और असामंजस्य।') },
  { numeral: 'VII', icon: '⛭', name: p('The Chariot', 'द चैरियट (रथ)'), upright: p('Willpower, determination and victory.', 'इच्छाशक्ति, दृढ़ संकल्प और विजय।'), reversed: p('Lack of direction and self-discipline.', 'दिशा और आत्म-अनुशासन की कमी।') },
  { numeral: 'VIII', icon: '∞', name: p('Strength', 'स्ट्रेंथ (शक्ति)'), upright: p('Courage, compassion and inner strength.', 'साहस, करुणा और आंतरिक शक्ति।'), reversed: p('Self-doubt, weakness and insecurity.', 'आत्म-संदेह, कमज़ोरी और असुरक्षा।') },
  { numeral: 'IX', icon: '✺', name: p('The Hermit', 'द हर्मिट (साधु)'), upright: p('Soul-searching, introspection and guidance.', 'आत्म-खोज, आत्मचिंतन और मार्गदर्शन।'), reversed: p('Isolation, loneliness and withdrawal.', 'एकांत, अकेलापन और दूरी।') },
  { numeral: 'X', icon: '☸', name: p('Wheel of Fortune', 'व्हील ऑफ़ फ़ॉर्च्यून (भाग्य चक्र)'), upright: p('Cycles, destiny and a turning point.', 'जीवन चक्र, भाग्य और निर्णायक मोड़।'), reversed: p('Bad luck and resistance to change.', 'दुर्भाग्य और परिवर्तन का विरोध।') },
  { numeral: 'XI', icon: '⚖', name: p('Justice', 'जस्टिस (न्याय)'), upright: p('Fairness, truth and cause and effect.', 'निष्पक्षता, सत्य और कर्म का फल।'), reversed: p('Unfairness, dishonesty and lack of accountability.', 'अन्याय, बेईमानी और जवाबदेही की कमी।') },
  { numeral: 'XII', icon: '⟁', name: p('The Hanged Man', 'द हैंग्ड मैन (उलटा लटका पुरुष)'), upright: p('Surrender, new perspectives and pause.', 'समर्पण, नया दृष्टिकोण और ठहराव।'), reversed: p('Stalling, resistance and indecision.', 'टालमटोल, विरोध और अनिर्णय।') },
  { numeral: 'XIII', icon: '✝', name: p('Death', 'डेथ (परिवर्तन)'), upright: p('Endings, transformation and transition.', 'अंत, रूपांतरण और बदलाव।'), reversed: p('Resistance to change and stagnation.', 'बदलाव का विरोध और ठहराव।') },
  { numeral: 'XIV', icon: '◬', name: p('Temperance', 'टेम्परेंस (संयम)'), upright: p('Balance, moderation and patience.', 'संतुलन, संयम और धैर्य।'), reversed: p('Imbalance, excess and lack of harmony.', 'असंतुलन, अति और असामंजस्य।') },
  { numeral: 'XV', icon: '⛧', name: p('The Devil', 'द डेविल (बंधन)'), upright: p('Attachment, temptation and the shadow self.', 'मोह, प्रलोभन और छाया स्वरूप।'), reversed: p('Release, breaking free and reclaiming power.', 'मुक्ति, बंधन तोड़ना और शक्ति वापस पाना।') },
  { numeral: 'XVI', icon: 'ᛉ', name: p('The Tower', 'द टावर (मीनार)'), upright: p('Sudden upheaval, revelation and awakening.', 'अचानक उथल-पुथल, रहस्योद्घाटन और जागृति।'), reversed: p('Averted disaster and fear of change.', 'टली हुई विपदा और परिवर्तन का भय।') },
  { numeral: 'XVII', icon: '★', name: p('The Star', 'द स्टार (तारा)'), upright: p('Hope, renewal and spiritual serenity.', 'आशा, नवीनीकरण और आध्यात्मिक शांति।'), reversed: p('Despair, disconnection and lack of faith.', 'निराशा, अलगाव और विश्वास की कमी।') },
  { numeral: 'XVIII', icon: '☽', name: p('The Moon', 'द मून (चंद्रमा)'), upright: p('Illusion, dreams and the unconscious.', 'भ्रम, स्वप्न और अचेतन मन।'), reversed: p('Release of fear and clarity emerging.', 'भय से मुक्ति और स्पष्टता का उदय।') },
  { numeral: 'XIX', icon: '☀', name: p('The Sun', 'द सन (सूर्य)'), upright: p('Joy, success, vitality and positivity.', 'आनंद, सफलता, ऊर्जा और सकारात्मकता।'), reversed: p('Temporary sadness and dimmed enthusiasm.', 'अस्थायी उदासी और कम उत्साह।') },
  { numeral: 'XX', icon: '♆', name: p('Judgement', 'जजमेंट (निर्णय)'), upright: p('Rebirth, inner calling and absolution.', 'पुनर्जन्म, आंतरिक पुकार और मुक्ति।'), reversed: p('Self-doubt and ignoring the call.', 'आत्म-संदेह और भीतरी पुकार की अनदेखी।') },
  { numeral: 'XXI', icon: '⊕', name: p('The World', 'द वर्ल्ड (संसार)'), upright: p('Completion, accomplishment and wholeness.', 'पूर्णता, उपलब्धि और संपूर्णता।'), reversed: p('Incompletion and seeking closure.', 'अधूरापन और समापन की तलाश।') },
];

export const SPREAD_POSITIONS = [
  { label: p('Past', 'भूतकाल'), hint: p('What has shaped you', 'जिसने आपको आकार दिया') },
  { label: p('Present', 'वर्तमान'), hint: p('Where you stand now', 'आप अभी कहाँ हैं') },
  { label: p('Future', 'भविष्य'), hint: p('What is unfolding', 'आगे क्या हो रहा है') },
];

export function drawCards(count = 3) {
  const deck = [...MAJOR_ARCANA];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.slice(0, count).map((card) => ({ ...card, isReversed: Math.random() < 0.3 }));
}
