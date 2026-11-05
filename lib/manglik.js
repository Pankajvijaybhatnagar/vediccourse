// Manglik (Mangal / Kuja) dosha, scored in three steps:
//
//   1. From Lagna:  Mars in house 1, 4, 7, 8 or 12  → 40%. If not, the person is NOT Manglik and
//                   the Moon and Venus are not checked.
//   2. From Moon:   Mars in house 1, 4, 7, 8 or 12  → +30%
//   3. From Venus:  Mars in house 1, 4, 7, 8 or 12  → +30%
//
//   40% / 70% = Anshik (partial) Manglik, 100% = Poorna (full) Manglik.
//
// Houses are counted whole-sign: the sign of the reference point is house 1.

import { SIGNS } from './zodiac';

export const MANGLIK_HOUSES = [1, 4, 7, 8, 12];

const STEPS = [
  { from: 'lagna', points: 40, name: { en: 'Lagna', hi: 'लग्न' } },
  { from: 'moon', points: 30, name: { en: 'Moon', hi: 'चंद्र' } },
  { from: 'venus', points: 30, name: { en: 'Venus', hi: 'शुक्र' } },
];

const signOf = (lon) => Math.floor((((lon % 360) + 360) % 360) / 30);
const houseFrom = (fromSign, sign) => ((sign - fromSign + 12) % 12) + 1;

/**
 * @param {{ lagna: { lon: number }, planets: { key: string, lon: number }[] }} kundli
 */
export function manglikDosha(kundli) {
  const lon = Object.fromEntries(kundli.planets.map((x) => [x.key, x.lon]));
  const marsSign = signOf(lon.mars);
  const refSign = { lagna: signOf(kundli.lagna.lon), moon: signOf(lon.moon), venus: signOf(lon.venus) };

  const lagnaHit = MANGLIK_HOUSES.includes(houseFrom(refSign.lagna, marsSign));
  let percent = 0;
  const steps = STEPS.map((s) => {
    const house = houseFrom(refSign[s.from], marsSign);
    const hit = MANGLIK_HOUSES.includes(house);
    // Moon and Venus are only checked once the Lagna check is positive.
    const checked = s.from === 'lagna' || lagnaHit;
    const points = checked && hit ? s.points : 0;
    percent += points;
    return { ...s, house, hit, checked, points };
  });

  const level = percent === 0 ? 'none' : percent === 100 ? 'poorna' : 'anshik';
  return {
    present: percent > 0,
    percent,
    level,
    steps,
    marsSign: SIGNS[marsSign],
    fromLagna: steps[0].house,
    fromMoon: steps[1].house,
    fromVenus: steps[2].house,
    label: LABEL[level](percent),
  };
}

const LABEL = {
  none: () => ({ en: 'Not Manglik', hi: 'मांगलिक नहीं' }),
  anshik: (pc) => ({ en: `Anshik (partial) Manglik · ${pc}%`, hi: `आंशिक मांगलिक · ${pc}%` }),
  poorna: () => ({ en: 'Poorna Manglik · 100%', hi: 'पूर्ण मांगलिक · 100%' }),
};

/** One-line bilingual explanation of how the percentage was reached. */
export function manglikExplain(m) {
  const [l, mo, v] = m.steps;
  if (!l.hit) {
    return {
      en: `Mars is in the ${l.house}${ordSuffix(l.house)} house from the Lagna, not in 1, 4, 7, 8 or 12, so there is no Manglik dosha and the Moon and Venus need not be checked.`,
      hi: `मंगल लग्न से ${l.house}वें भाव में है, 1, 4, 7, 8 या 12 में नहीं, इसलिए मांगलिक दोष नहीं है और चंद्र व शुक्र से जाँच की आवश्यकता नहीं।`,
    };
  }
  const part = (s) => (s.hit ? `+${s.points}%` : '+0%');
  return {
    en: `Lagna: house ${l.house} (40%) · Moon: house ${mo.house} (${part(mo)}) · Venus: house ${v.house} (${part(v)}) = ${m.percent}%.`,
    hi: `लग्न: ${l.house}वाँ भाव (40%) · चंद्र: ${mo.house}वाँ भाव (${part(mo)}) · शुक्र: ${v.house}वाँ भाव (${part(v)}) = ${m.percent}%।`,
  };
}

const ordSuffix = (n) => (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th');
