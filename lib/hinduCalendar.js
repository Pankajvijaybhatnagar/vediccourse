import { sunLongitude, moonLongitude } from './astro';
import { getPanchang, sidereal } from './panchang';

// Hindu lunar calendar on top of getPanchang: lunar month (amanta & purnimanta), adhik maas,
// Vikram Samvat, Navratri day, festivals and recurring vrats for a date.
// Month indices run 0 = Chaitra … 11 = Phalguna. Tithi numbers within a paksha run 1–15
// (15 = Purnima in Shukla, Amavasya in Krishna).

const p = (en, hi) => ({ en, hi });
const norm360 = (d) => ((d % 360) + 360) % 360;
const DAY = 86400000;
const SYNODIC_RATE = 12.190749; // mean elongation gain, degrees per day

export const MONTHS = [
  p('Chaitra', 'चैत्र'), p('Vaishakha', 'वैशाख'), p('Jyeshtha', 'ज्येष्ठ'), p('Ashadha', 'आषाढ़'),
  p('Shravana', 'श्रावण'), p('Bhadrapada', 'भाद्रपद'), p('Ashwin', 'आश्विन'), p('Kartik', 'कार्तिक'),
  p('Margashirsha', 'मार्गशीर्ष'), p('Pausha', 'पौष'), p('Magha', 'माघ'), p('Phalguna', 'फाल्गुन'),
];

const elongation = (date) => norm360(moonLongitude(date) - sunLongitude(date));

/** Refine a guess to the exact new moon (elongation 0°) nearest to it. */
function refineNewMoon(guess) {
  let t = guess.getTime();
  for (let i = 0; i < 6; i++) {
    let e = elongation(new Date(t));
    if (e > 180) e -= 360;
    t -= (e / SYNODIC_RATE) * DAY;
  }
  return new Date(t);
}

const siderealSign = (date) => Math.floor(sidereal(sunLongitude(date), date) / 30);

/** Lunar month containing the instant, named by the Sun's sidereal sign at the preceding new moon. */
export function lunarMonth(date) {
  const e = elongation(date);
  const prev = refineNewMoon(new Date(date.getTime() - (e / SYNODIC_RATE) * DAY));
  const next = refineNewMoon(new Date(date.getTime() + ((360 - e) / SYNODIC_RATE) * DAY));
  const s1 = siderealSign(prev);
  const s2 = siderealSign(next);
  return { index: (s1 + 1) % 12, adhik: s1 === s2, start: prev, end: next };
}

// ---------------------------------------------------------------------------
// Navratri
// ---------------------------------------------------------------------------
export const NAVRATRI_KINDS = {
  0: { key: 'chaitra', name: p('Chaitra Navratri', 'चैत्र नवरात्रि'), gupt: false },
  3: { key: 'ashadha', name: p('Ashadha Gupt Navratri', 'आषाढ़ गुप्त नवरात्रि'), gupt: true },
  6: { key: 'sharad', name: p('Sharad Navratri', 'शारदीय नवरात्रि'), gupt: false },
  10: { key: 'magha', name: p('Magha Gupt Navratri', 'माघ गुप्त नवरात्रि'), gupt: true },
};

// ---------------------------------------------------------------------------
// Festivals keyed by amanta month - paksha - tithi
// ---------------------------------------------------------------------------
export const FESTIVAL_DAYS = {
  '0-s-1': ['navVarsh'],
  '0-s-3': ['gangaur'],
  '0-s-9': ['ramNavami'],
  '0-s-15': ['hanumanJayanti'],
  '1-s-3': ['akshayaTritiya'],
  '1-s-14': ['narasimhaJayanti'],
  '1-s-15': ['buddhaPurnima'],
  '1-k-15': ['shaniJayanti'],
  '2-s-10': ['gangaDussehra'],
  '3-s-2': ['rathYatra'],
  '3-s-15': ['guruPurnima'],
  '4-s-3': ['hariyaliTeej'],
  '4-s-5': ['nagPanchami'],
  '4-s-15': ['rakshaBandhan'],
  '4-k-3': ['kajariTeej'],
  '4-k-8': ['janmashtami'],
  '5-s-3': ['hartalikaTeej'],
  '5-s-4': ['ganeshChaturthi'],
  '5-s-5': ['rishiPanchami'],
  '5-s-8': ['radhaAshtami'],
  '5-s-14': ['anantChaturdashi'],
  '5-k-15': ['sarvaPitruAmavasya'],
  '6-s-10': ['vijayadashami'],
  '6-s-15': ['sharadPurnima'],
  '6-k-4': ['karwaChauth'],
  '6-k-8': ['ahoiAshtami'],
  '6-k-12': ['govatsaDwadashi'],
  '6-k-13': ['dhanteras'],
  '6-k-14': ['narakChaturdashi'],
  '6-k-15': ['diwali'],
  '7-s-1': ['govardhan'],
  '7-s-2': ['bhaiDooj'],
  '7-s-6': ['chhath'],
  '7-s-9': ['amlaNavami'],
  '7-s-12': ['tulsiVivah'],
  '7-s-15': ['kartikPurnima'],
  '7-k-8': ['kalBhairavJayanti'],
  '8-s-5': ['vivahPanchami'],
  '8-s-11': ['gitaJayanti'],
  '8-s-15': ['dattaJayanti'],
  '9-k-15': ['mauniAmavasya'],
  '10-s-5': ['vasantPanchami'],
  '10-s-7': ['rathaSaptami'],
  '10-s-15': ['maghPurnima'],
  '10-k-14': ['mahashivratri'],
  '11-s-15': ['holikaDahan'],
  '11-k-1': ['holi'],
};

// Ekadashi names by amanta month: [Shukla, Krishna].
export const EKADASHI_NAMES = [
  [p('Kamada', 'कामदा'), p('Varuthini', 'वरूथिनी')],
  [p('Mohini', 'मोहिनी'), p('Apara', 'अपरा')],
  [p('Nirjala', 'निर्जला'), p('Yogini', 'योगिनी')],
  [p('Devshayani', 'देवशयनी'), p('Kamika', 'कामिका')],
  [p('Shravana Putrada', 'श्रावण पुत्रदा'), p('Aja', 'अजा')],
  [p('Parivartini', 'परिवर्तिनी'), p('Indira', 'इंदिरा')],
  [p('Papankusha', 'पापांकुशा'), p('Rama', 'रमा')],
  [p('Devutthana (Prabodhini)', 'देवउठनी (प्रबोधिनी)'), p('Utpanna', 'उत्पन्ना')],
  [p('Mokshada', 'मोक्षदा'), p('Saphala', 'सफला')],
  [p('Pausha Putrada', 'पौष पुत्रदा'), p('Shattila', 'षटतिला')],
  [p('Jaya', 'जया'), p('Vijaya', 'विजया')],
  [p('Amalaki', 'आमलकी'), p('Papmochani', 'पापमोचिनी')],
];
const ADHIK_EKADASHI = [p('Padmini', 'पद्मिनी'), p('Parama', 'परमा')];

// Festivals observed when their tithi prevails at a particular time of day rather than at sunrise
// (e.g. Diwali in Pradosh kaal, Janmashtami at midnight). Value = local minutes from that day's sun times.
const OBSERVANCE = {
  ramNavami: 'noon', ganeshChaturthi: 'noon',
  vijayadashami: 'aparahna',
  diwali: 'pradosh', dhanteras: 'pradosh', narasimhaJayanti: 'pradosh', ahoiAshtami: 'pradosh', kalBhairavJayanti: 'pradosh',
  karwaChauth: 'moonrise',
  janmashtami: 'midnight', mahashivratri: 'midnight', sharadPurnima: 'midnight',
};
const TIMED_KEYS = Object.entries(FESTIVAL_DAYS).filter(([, keys]) => keys.some((k) => OBSERVANCE[k]));

function minutesFor(when, pc) {
  const day = pc.sunset - pc.sunrise;
  if (when === 'noon') return pc.sunrise + day / 2;
  if (when === 'aparahna') return pc.sunrise + day * 0.7;
  if (when === 'pradosh') return pc.sunset + 48;
  if (when === 'moonrise') return pc.sunset + 150;
  return pc.sunset + (1440 - day) / 2; // midnight (nishita)
}

/** amanta month-paksha-tithi key at an instant. */
function tithiKeyAt(date) {
  const e = elongation(date);
  const i = Math.floor(e / 12);
  const month = lunarMonth(date);
  return { key: `${month.index}-${i < 15 ? 's' : 'k'}-${(i % 15) + 1}`, adhik: month.adhik };
}

function timedFestivals(dateStr, city, sunriseKey) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const prev = shiftIso(dateStr, -1);
  const [py, pm, pd] = prev.split('-').map(Number);
  const pcToday = getPanchang(dateStr, city);
  const pcPrev = getPanchang(prev, city);
  const at = (Y, M, D, mins) => new Date(Date.UTC(Y, M - 1, D) + (mins - city.tz * 60) * 60000);
  const out = [];
  for (const [key, keys] of TIMED_KEYS) {
    for (const k of keys) {
      const when = OBSERVANCE[k];
      if (!when) continue;
      const today = tithiKeyAt(at(y, m, d, minutesFor(when, pcToday)));
      if (today.adhik) continue;
      const before = tithiKeyAt(at(py, pm, pd, minutesFor(when, pcPrev)));
      // Observed when the tithi first prevails at its time; if a short tithi never does, fall back to sunrise.
      if ((today.key === key && before.key !== key) || (sunriseKey === key && today.key !== key && before.key !== key)) out.push(k);
    }
  }
  return out;
}

const toIso = (d) => `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
export const shiftIso = (iso, days) => {
  const [y, m, d] = iso.split('-').map(Number);
  return toIso(new Date(Date.UTC(y, m - 1, d + days)));
};

/**
 * Everything the calendar knows about one civil day at one place.
 * Tithi, paksha and month are taken at local sunrise, as printed panchangs do.
 */
export function getHinduDay(dateStr, city) {
  const panchang = getPanchang(dateStr, city);
  const [y, m, d] = dateStr.split('-').map(Number);
  const sunriseUtc = new Date(Date.UTC(y, m - 1, d) + (panchang.sunrise - city.tz * 60) * 60000);
  const month = lunarMonth(sunriseUtc);
  const shukla = panchang.tithi.paksha.en.startsWith('Shukla');
  const paksha = shukla ? 's' : 'k';
  const tithi = panchang.tithi.number; // 1..15
  const weekday = panchang.weekday;

  // North Indian (purnimanta) months begin after Purnima, so Krishna paksha belongs to the next month.
  const purnimantaIndex = shukla ? month.index : (month.index + 1) % 12;
  const samvat = y + (month.index >= 9 && m <= 4 ? 56 : 57);

  // Sankranti: the Sun changes sidereal sign between today's and tomorrow's sunrise.
  const nextSunrise = new Date(sunriseUtc.getTime() + DAY);
  const signToday = siderealSign(sunriseUtc);
  const signNext = siderealSign(nextSunrise);
  const sankranti = signToday !== signNext ? signNext : null;

  // Navratri (never in an adhik month). Day 10 of Sharad is Vijayadashami, handled as a festival.
  const kind = !month.adhik && shukla && tithi <= 9 ? NAVRATRI_KINDS[month.index] : null;
  const navratri = kind ? { ...kind, day: tithi } : null;

  const festivals = month.adhik ? [] : (FESTIVAL_DAYS[`${month.index}-${paksha}-${tithi}`] || []).filter((k) => !OBSERVANCE[k]);
  if (!month.adhik) festivals.push(...timedFestivals(dateStr, city, `${month.index}-${paksha}-${tithi}`));
  if (!month.adhik && month.index === 5 && !shukla && tithi < 15) festivals.push('pitruPaksha');
  if (sankranti === 9) festivals.unshift('makarSankranti');

  // Recurring vrats, in the order they matter for the day.
  const vrats = [];
  if (tithi === 11) vrats.push({ key: 'ekadashi', name: month.adhik ? ADHIK_EKADASHI[shukla ? 0 : 1] : EKADASHI_NAMES[month.index][shukla ? 0 : 1] });
  if (tithi === 13) vrats.push({ key: 'pradosh', weekday });
  if (tithi === 4) vrats.push({ key: shukla ? 'vinayakaChaturthi' : 'sankashti', angarki: weekday === 2 });
  if (!shukla && tithi === 14) vrats.push({ key: 'masikShivratri' });
  if (shukla && tithi === 15) vrats.push({ key: 'purnima' });
  if (!shukla && tithi === 15) vrats.push({ key: 'amavasya', weekday });
  if (shukla && tithi === 8) vrats.push({ key: 'durgashtami' });
  if (!shukla && tithi === 8) vrats.push({ key: 'kalashtami' });
  if (shukla && tithi === 6) vrats.push({ key: 'skandaShashthi' });
  if (sankranti != null) vrats.push({ key: 'sankranti', sign: sankranti });
  if (panchang.nakshatra.index === 7 && (weekday === 4 || weekday === 0)) vrats.push({ key: weekday === 4 ? 'guruPushya' : 'raviPushya' });

  // Chaturmas: from Devshayani Ekadashi (Ashadha S11) to Devutthana Ekadashi (Kartik S11).
  const mi = month.index;
  const chaturmas = ((mi === 3 && shukla && tithi >= 11) || (mi === 3 && !shukla) || (mi > 3 && mi < 7) || (mi === 7 && shukla && tithi < 11));
  // Panchak: Moon in Dhanishta (second half) through Revati.
  const moonDeg = panchang.nakshatra.index * (360 / 27) + ((panchang.nakshatra.pada - 1) * 360) / 108;
  const panchak = moonDeg >= 23 * (360 / 27) - 360 / 54;

  return {
    date: dateStr,
    panchang,
    month: { ...month, name: MONTHS[month.index], purnimanta: MONTHS[purnimantaIndex] },
    shukla,
    paksha,
    tithi,
    tithiIndex: shukla ? tithi : tithi + 15, // 1..30
    weekday,
    samvat,
    sankranti,
    navratri,
    festivals,
    vrats,
    chaturmas,
    panchak,
  };
}

/** All dates of the Navratri that `dateStr` falls in or just before (up to 10 days ahead), plus Dashami. */
export function navratriSpan(dateStr, city, key) {
  const days = [];
  for (let i = -10; i <= 12; i++) {
    const iso = shiftIso(dateStr, i);
    const h = getHinduDay(iso, city);
    if (h.navratri?.key === key) days.push({ date: iso, day: h.navratri.day });
    else if (key === 'sharad' && h.festivals.includes('vijayadashami')) days.push({ date: iso, day: 10 });
  }
  return days;
}

/** Festivals, Navratri and vrats over the next `count` days (today included). */
export function upcoming(dateStr, city, count = 21) {
  const out = [];
  for (let i = 0; i < count; i++) {
    const iso = shiftIso(dateStr, i);
    out.push(getHinduDay(iso, city));
  }
  return out;
}
