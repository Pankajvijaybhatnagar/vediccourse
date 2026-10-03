// Display helpers for astrologer records from the API (GET /astrologers).
// Also tolerate the legacy shape (numeric `id`) so older callers keep working.

const p = (en, hi) => ({ en, hi });

/** Labels for every skill key the backend allows (ASTRO_SKILLS). */
export const SKILL_LABELS = {
  counseling: p('Counselling', 'काउंसलिंग'),
  palm: p('Palmistry', 'हस्तरेखा'),
  tantra: p('Tantra Vigyan', 'तंत्र-विज्ञान'),
  shastra: p('Shastra', 'शास्त्र'),
  jyotish: p('Jyotish', 'ज्योतिष'),
  karmkand: p('Karmkand', 'कर्मकांड'),
  prashna: p('Prashna Jyotish', 'प्रश्न ज्योतिष'),
  vastu: p('Vastu', 'वास्तु'),
  tarot: p('Tarot', 'टैरो'),
  numerology: p('Numerology', 'अंक ज्योतिष'),
};

/** Public id used in booking links (?astro=). The numeric legacy id keeps old links working. */
export const astroRef = (astro) => astro?.legacyId ?? astro?.id;

/** Two-digit expert number shown on cards. */
export const expertNo = (astro) => String(astro?.legacyId ?? astro?.sortOrder ?? '').padStart(2, '0');

export const initials = (name = '') =>
  name
    .replace(/^(Acharya|Pandit|Dr\.)\s+/g, '')
    .replace(/\s+Ji$/, '')
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('');
