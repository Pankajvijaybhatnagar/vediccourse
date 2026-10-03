import { SIGNS } from './zodiac';

// Signs in zodiacal order starting at 0° Aries, used for longitude → sign lookups.
const ZODIAC_ORDER = SIGNS;
const rad = (deg) => (deg * Math.PI) / 180;
const norm360 = (deg) => ((deg % 360) + 360) % 360;

function daysSinceJ2000(utcDate) {
  return utcDate.getTime() / 86400000 + 2440587.5 - 2451545.0;
}

/** Apparent solar ecliptic longitude (low-precision, ~0.01°). */
export function sunLongitude(utcDate) {
  const d = daysSinceJ2000(utcDate);
  const L = norm360(280.46 + 0.9856474 * d);
  const g = rad(norm360(357.528 + 0.9856003 * d));
  return norm360(L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g));
}

// Periodic terms for the Moon's longitude (Meeus, Astronomical Algorithms, table 47.A): [D, M, M', F, Σl in 1e-6°].
const MOON_TERMS = [
  [0, 0, 1, 0, 6288774], [2, 0, -1, 0, 1274027], [2, 0, 0, 0, 658314], [0, 0, 2, 0, 213618], [0, 1, 0, 0, -185116],
  [0, 0, 0, 2, -114332], [2, 0, -2, 0, 58793], [2, -1, -1, 0, 57066], [2, 0, 1, 0, 53322], [2, -1, 0, 0, 45758],
  [0, 1, -1, 0, -40923], [1, 0, 0, 0, -34720], [0, 1, 1, 0, -30383], [2, 0, 0, -2, 15327], [0, 0, 1, 2, -12528],
  [0, 0, 1, -2, 10980], [4, 0, -1, 0, 10675], [0, 0, 3, 0, 10034], [4, 0, -2, 0, 8548], [2, 1, -1, 0, -7888],
  [2, 1, 0, 0, -6766], [1, 0, -1, 0, -5163], [1, 1, 0, 0, 4987], [2, -1, 1, 0, 4036], [2, 0, 2, 0, 3994],
  [4, 0, 0, 0, 3861], [2, 0, -3, 0, 3665], [0, 1, -2, 0, -2689], [2, 0, -1, 2, -2602], [2, -1, -2, 0, 2390],
  [1, 0, 1, 0, -2348], [2, -2, 0, 0, 2236], [0, 1, 2, 0, -2120], [0, 2, 0, 0, -2069], [2, -2, -1, 0, 2048],
  [2, 0, 1, -2, -1773], [2, 0, 0, 2, -1595], [4, -1, -1, 0, 1215], [0, 0, 2, 2, -1110], [3, 0, -1, 0, -892],
  [2, 1, 1, 0, -810], [4, -1, -2, 0, 759], [0, 2, -1, 0, -713], [2, 2, -1, 0, -700], [2, 1, -2, 0, 691],
  [2, -1, 0, -2, 596], [4, 0, 1, 0, 549], [0, 0, 4, 0, 537], [4, -1, 0, 0, 520], [1, 0, -2, 0, -487],
  [2, 1, 0, -2, -399], [0, 0, 2, -2, -381], [1, 1, 1, 0, 351], [3, 0, -2, 0, -340], [4, 0, -3, 0, 330],
  [2, -1, 2, 0, 327], [0, 2, 1, 0, -323], [1, 1, -1, 0, 299], [2, 0, 3, 0, 294],
];

/** ΔT = TT − UT in seconds (Espenak & Meeus polynomials, 1900–2050). */
function deltaT(utcDate) {
  const y = utcDate.getUTCFullYear() + utcDate.getUTCMonth() / 12;
  let t;
  if (y < 1900) return 0;
  if (y < 1920) return (t = y - 1900), -2.79 + 1.494119 * t - 0.0598939 * t ** 2 + 0.0061966 * t ** 3 - 0.000197 * t ** 4;
  if (y < 1941) return (t = y - 1920), 21.2 + 0.84493 * t - 0.0761 * t ** 2 + 0.0020936 * t ** 3;
  if (y < 1961) return (t = y - 1950), 29.07 + 0.407 * t - t ** 2 / 233 + t ** 3 / 2547;
  if (y < 1986) return (t = y - 1975), 45.45 + 1.067 * t - t ** 2 / 260 - t ** 3 / 718;
  if (y < 2005) return (t = y - 2000), 63.86 + 0.3345 * t - 0.060374 * t ** 2 + 0.0017275 * t ** 3 + 0.000651814 * t ** 4 + 0.00002373599 * t ** 5;
  return (t = y - 2000), 62.92 + 0.32217 * t + 0.005589 * t ** 2;
}

/** Lunar ecliptic longitude, mean equinox of date (Meeus ch. 47, ~10″ accuracy). */
export function moonLongitude(utcDate) {
  const T = (daysSinceJ2000(utcDate) + deltaT(utcDate) / 86400) / 36525;
  const Lp = norm360(218.3164477 + 481267.88123421 * T - 0.0015786 * T ** 2 + T ** 3 / 538841 - T ** 4 / 65194000);
  const D = rad(norm360(297.8501921 + 445267.1114034 * T - 0.0018819 * T ** 2 + T ** 3 / 545868 - T ** 4 / 113065000));
  const M = rad(norm360(357.5291092 + 35999.0502909 * T - 0.0001536 * T ** 2 + T ** 3 / 24490000));
  const Mp = rad(norm360(134.9633964 + 477198.8675055 * T + 0.0087414 * T ** 2 + T ** 3 / 69699 - T ** 4 / 14712000));
  const F = rad(norm360(93.272095 + 483202.0175233 * T - 0.0036539 * T ** 2 - T ** 3 / 3526000 + T ** 4 / 863310000));
  const A1 = rad(norm360(119.75 + 131.849 * T));
  const A2 = rad(norm360(53.09 + 479264.29 * T));
  const E = 1 - 0.002516 * T - 0.0000074 * T ** 2;

  let sum = 0;
  for (const [d, m, mp, f, coef] of MOON_TERMS) {
    const e = m === 0 ? 1 : Math.abs(m) === 1 ? E : E * E;
    sum += coef * e * Math.sin(d * D + m * M + mp * Mp + f * F);
  }
  sum += 3958 * Math.sin(A1) + 1962 * Math.sin(rad(Lp) - F) + 318 * Math.sin(A2);
  return norm360(Lp + sum / 1e6);
}

export function signFromLongitude(lon) {
  return ZODIAC_ORDER[Math.floor(norm360(lon) / 30)];
}

const PHASES = [
  { max: 22.5, name: { en: 'New Moon', hi: 'अमावस्या' }, icon: '🌑', meaning: { en: 'A natural initiator, driven by instinct and fresh beginnings.', hi: 'स्वाभाविक आरंभकर्ता, जो अंतर्ज्ञान और नई शुरुआत से प्रेरित होते हैं।' } },
  { max: 67.5, name: { en: 'Waxing Crescent', hi: 'शुक्ल पक्ष का बढ़ता चंद्र' }, icon: '🌒', meaning: { en: 'The courage to break from the past and forge your own path.', hi: 'अतीत से आगे बढ़कर अपना मार्ग बनाने का साहस।' } },
  { max: 112.5, name: { en: 'First Quarter', hi: 'शुक्ल अष्टमी' }, icon: '🌓', meaning: { en: 'A builder who thrives on action and overcoming obstacles.', hi: 'कर्मठ निर्माता, जो बाधाओं को पार करने में आनंद पाते हैं।' } },
  { max: 157.5, name: { en: 'Waxing Gibbous', hi: 'पूर्णिमा की ओर बढ़ता चंद्र' }, icon: '🌔', meaning: { en: 'A seeker who is always refining and improving.', hi: 'सदा सुधार और परिष्कार की खोज में रहने वाले।' } },
  { max: 202.5, name: { en: 'Full Moon', hi: 'पूर्णिमा' }, icon: '🌕', meaning: { en: 'Illuminated by relationships, seeking balance and fulfilment.', hi: 'संबंधों से प्रकाशित, संतुलन और पूर्णता की खोज में।' } },
  { max: 247.5, name: { en: 'Waning Gibbous', hi: 'कृष्ण पक्ष का घटता चंद्र' }, icon: '🌖', meaning: { en: 'A teacher at heart, eager to share wisdom.', hi: 'हृदय से शिक्षक, ज्ञान बाँटने को उत्सुक।' } },
  { max: 292.5, name: { en: 'Last Quarter', hi: 'कृष्ण अष्टमी' }, icon: '🌗', meaning: { en: 'A reformer who questions old structures and reinvents them.', hi: 'सुधारक, जो पुरानी व्यवस्थाओं पर प्रश्न उठाकर उन्हें नया रूप देते हैं।' } },
  { max: 337.5, name: { en: 'Waning Crescent', hi: 'अमावस्या की ओर घटता चंद्र' }, icon: '🌘', meaning: { en: 'A mystic visionary, deeply attuned to endings and renewal.', hi: 'रहस्यदर्शी, जो अंत और नवीनीकरण से गहराई से जुड़े हैं।' } },
  { max: 360, name: { en: 'New Moon', hi: 'अमावस्या' }, icon: '🌑', meaning: { en: 'A natural initiator, driven by instinct and fresh beginnings.', hi: 'स्वाभाविक आरंभकर्ता, जो अंतर्ज्ञान और नई शुरुआत से प्रेरित होते हैं।' } },
];

export function moonPhase(sunLon, moonLon) {
  const angle = norm360(moonLon - sunLon);
  return PHASES.find((p) => angle < p.max);
}

/* --------------------------------------------------------------------------
   Planets (JPL "Approximate Positions of the Planets", valid 1800–2050)
   -------------------------------------------------------------------------- */
// [a, e, I, L, longPeri, longNode] and their per-century rates
const ELEMENTS = {
  mercury: [[0.38709927, 0.20563593, 7.00497902, 252.2503235, 77.45779628, 48.33076593], [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081]],
  venus: [[0.72333566, 0.00677672, 3.39467605, 181.9790995, 131.60246718, 76.67984255], [0.0000039, -0.00004107, -0.0007889, 58517.81538729, 0.00268329, -0.27769418]],
  earth: [[1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0], [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0]],
  mars: [[1.52371034, 0.0933941, 1.84969142, -4.55343205, -23.94362959, 49.55953891], [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343]],
  jupiter: [[5.202887, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909], [-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106]],
  saturn: [[9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448], [-0.0012506, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794]],
};

function heliocentric(name, T) {
  const [base, rate] = ELEMENTS[name];
  const [a, e, I, L, peri, node] = base.map((v, i) => v + rate[i] * T);
  const w = rad(peri - node);
  const M = rad(norm360(L - peri));
  let E = M + e * Math.sin(M);
  for (let i = 0; i < 8; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  const xp = a * (Math.cos(E) - e);
  const yp = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const O = rad(node);
  const inc = rad(I);
  return [
    (Math.cos(w) * Math.cos(O) - Math.sin(w) * Math.sin(O) * Math.cos(inc)) * xp + (-Math.sin(w) * Math.cos(O) - Math.cos(w) * Math.sin(O) * Math.cos(inc)) * yp,
    (Math.cos(w) * Math.sin(O) + Math.sin(w) * Math.cos(O) * Math.cos(inc)) * xp + (-Math.sin(w) * Math.sin(O) + Math.cos(w) * Math.cos(O) * Math.cos(inc)) * yp,
  ];
}

function geocentricLon(name, utcDate) {
  const T = daysSinceJ2000(utcDate) / 36525;
  const [px, py] = heliocentric(name, T);
  const [ex, ey] = heliocentric('earth', T);
  return norm360((Math.atan2(py - ey, px - ex) * 180) / Math.PI);
}

/** Tropical longitudes of the nine Vedic grahas, with retrograde flags. */
export function grahaLongitudes(utcDate) {
  const later = new Date(utcDate.getTime() + 86400000);
  const d = daysSinceJ2000(utcDate);
  const rahu = norm360(125.04452 - 0.0529538083 * d); // mean lunar node
  const out = {
    sun: { lon: sunLongitude(utcDate), retro: false },
    moon: { lon: moonLongitude(utcDate), retro: false },
  };
  for (const name of ['mars', 'mercury', 'jupiter', 'venus', 'saturn']) {
    const now = geocentricLon(name, utcDate);
    const next = geocentricLon(name, later);
    out[name] = { lon: now, retro: norm360(next - now) > 180 };
  }
  out.rahu = { lon: rahu, retro: true };
  out.ketu = { lon: norm360(rahu + 180), retro: true };
  return out;
}

/** Tropical ascendant for a UTC instant and geographic position. */
export function ascendant(utcDate, lat, lon) {
  const d = daysSinceJ2000(utcDate);
  const gmst = norm360(280.46061837 + 360.98564736629 * d);
  const ramc = rad(norm360(gmst + lon));
  const eps = rad(23.4393 - 0.0000004 * d);
  const asc = Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(rad(lat)) * Math.sin(eps)));
  return norm360((asc * 180) / Math.PI);
}
