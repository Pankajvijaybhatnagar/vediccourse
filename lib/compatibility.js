import { SIGNS } from './zodiac';

const ELEMENT_MATRIX = {
  Fire: { Fire: 82, Air: 90, Earth: 55, Water: 48 },
  Earth: { Earth: 80, Water: 88, Fire: 55, Air: 50 },
  Air: { Air: 78, Fire: 90, Water: 52, Earth: 50 },
  Water: { Water: 84, Earth: 88, Air: 52, Fire: 48 },
};

const VERDICTS = [
  { min: 85, title: { en: 'Written in the Stars', hi: 'सितारों में लिखी जोड़ी' }, text: { en: 'A rare and luminous connection. You understand each other intuitively and bring out the very best in one another.', hi: 'एक दुर्लभ और उज्ज्वल संबंध। आप एक-दूसरे को सहज रूप से समझते हैं और एक-दूसरे का सर्वश्रेष्ठ सामने लाते हैं।' } },
  { min: 72, title: { en: 'Harmonious Match', hi: 'सामंजस्यपूर्ण जोड़ी' }, text: { en: 'Strong natural chemistry with plenty of common ground. With open communication, this bond can flourish beautifully.', hi: 'स्वाभाविक आकर्षण और कई समानताएँ। खुले संवाद से यह रिश्ता खूबसूरती से फल-फूल सकता है।' } },
  { min: 60, title: { en: 'Promising Potential', hi: 'आशाजनक संभावना' }, text: { en: 'Different rhythms that can complement each other. Growth comes from embracing what makes you unique.', hi: 'अलग-अलग स्वभाव जो एक-दूसरे के पूरक बन सकते हैं। एक-दूसरे की विशेषताओं को अपनाने से रिश्ता बढ़ेगा।' } },
  { min: 0, title: { en: 'Challenging Chemistry', hi: 'चुनौतीपूर्ण संबंध' }, text: { en: 'Opposing energies create friction, but also fascination. Patience and compromise can turn tension into passion.', hi: 'विपरीत ऊर्जाएँ टकराव भी लाती हैं और आकर्षण भी। धैर्य और समझौते से तनाव को प्रेम में बदला जा सकता है।' } },
];

export function getCompatibility(slugA, slugB) {
  const a = SIGNS.find((s) => s.slug === slugA);
  const b = SIGNS.find((s) => s.slug === slugB);
  const base = ELEMENT_MATRIX[a.element][b.element];

  const distance = Math.abs(SIGNS.indexOf(a) - SIGNS.indexOf(b));
  const aspect = Math.min(distance, 12 - distance);
  // Traditional aspects: trine (4) and sextile (2) are harmonious, square (3) is tense, opposition (6) magnetic.
  const aspectBonus = { 0: 2, 1: -4, 2: 6, 3: -8, 4: 8, 5: -6, 6: 4 }[aspect];
  const modalityBonus = a.modality === b.modality ? -2 : 3;

  const overall = Math.max(30, Math.min(98, base + aspectBonus + modalityBonus));
  const vary = (offset) => Math.max(25, Math.min(99, overall + offset));

  return {
    a,
    b,
    overall,
    categories: [
      { label: { en: 'Love & Romance', hi: 'प्रेम और रोमांस' }, value: vary(((SIGNS.indexOf(a) * 7 + SIGNS.indexOf(b) * 3) % 15) - 6) },
      { label: { en: 'Friendship', hi: 'मित्रता' }, value: vary(((SIGNS.indexOf(a) * 5 + SIGNS.indexOf(b) * 11) % 13) - 4) },
      { label: { en: 'Communication', hi: 'संवाद' }, value: vary(((SIGNS.indexOf(a) * 3 + SIGNS.indexOf(b) * 7) % 17) - 8) },
      { label: { en: 'Trust', hi: 'विश्वास' }, value: vary(((SIGNS.indexOf(a) * 11 + SIGNS.indexOf(b) * 5) % 11) - 5) },
    ],
    verdict: VERDICTS.find((v) => overall >= v.min),
    // Rough Ashtakoot-style guna figure out of 36, for readers used to Vedic matching.
    gunas: Math.round((overall / 100) * 36),
  };
}
