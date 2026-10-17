import { getHinduDay, navratriSpan } from '../hinduCalendar';
import { getDailyRashifal } from '../rashifal';
import { NAVDURGA, MAHAVIDYA, NAVRATRI_RULES } from './navratri';
import { tithiUpayFor } from './tithi';
import { VAAR_UPAY } from './vaar';
import { NAKSHATRA_UPAY } from './nakshatra';
import { FESTIVALS, vratInfo } from './festivals';

export { NAVDURGA, NAVRATRI_RULES, FESTIVALS, vratInfo };

const p = (en, hi) => ({ en, hi });

const INAUSPICIOUS_YOGAS = ['Vyatipata', 'Vaidhriti', 'Vishkambha', 'Atiganda', 'Shula', 'Ganda', 'Vyaghata', 'Vajra', 'Parigha'];

/**
 * The complete "Aaj ka Upay" for a date and city: Navratri / festival / vrat upay first,
 * then the tithi, vaar and nakshatra remedies, cautions, best timings and rashi-wise upay.
 */
export function getDailyUpay(dateStr, city) {
  const day = getHinduDay(dateStr, city);
  const { panchang: pc } = day;

  const navratri = day.navratri
    ? {
        ...day.navratri,
        devi: NAVDURGA[day.navratri.day - 1],
        mahavidya: day.navratri.gupt ? MAHAVIDYA[day.navratri.day - 1] : null,
        span: navratriSpan(dateStr, city, day.navratri.key),
      }
    : null;

  const festivals = day.festivals.map((k) => ({ key: k, ...FESTIVALS[k] })).filter((f) => f.name);
  const vrats = day.vrats.map((v) => ({ key: v.key, ...vratInfo(v) })).filter((v) => v.name);

  const tithiBase = tithiUpayFor(day.tithi, day.shukla);
  const tithi = {
    ...tithiBase,
    name: pc.tithi.name,
    paksha: pc.tithi.paksha,
    note: day.shukla ? tithiBase.shukla : tithiBase.krishna,
  };
  const vaar = { ...VAAR_UPAY[day.weekday], name: pc.vaara };
  const nakshatra = { ...NAKSHATRA_UPAY[pc.nakshatra.index], name: pc.nakshatra.name, pada: pc.nakshatra.pada };

  // Things to be careful about today.
  const cautions = [];
  cautions.push({ tone: 'bad', title: p('Rahu Kaal', 'राहु काल'), time: pc.rahu, text: p('Do not begin any upay, puja sankalp, purchase or journey in this window.', 'इस समय कोई उपाय, पूजा संकल्प, खरीदारी या यात्रा आरंभ न करें।') });
  if (pc.karana.en.startsWith('Vishti')) cautions.push({ tone: 'bad', title: p('Bhadra (Vishti karana)', 'भद्रा (विष्टि करण)'), text: p('Bhadra is active at sunrise — avoid auspicious ceremonies, rakhi and griha pravesh during it.', 'सूर्योदय पर भद्रा है — इस दौरान मांगलिक कार्य, राखी और गृह प्रवेश से बचें।') });
  if (day.panchak) cautions.push({ tone: 'warn', title: p('Panchak', 'पंचक'), text: p('Avoid collecting wood, building a roof, buying a bed and travelling south during Panchak.', 'पंचक में लकड़ी इकट्ठा करने, छत डालने, पलंग खरीदने और दक्षिण यात्रा से बचें।') });
  if (nakshatra.gandmool) cautions.push({ tone: 'warn', title: p('Gandmool nakshatra', 'गंडमूल नक्षत्र'), text: p(`${pc.nakshatra.name.en} is a Gandmool nakshatra — a child born today may need Gandmool shanti on the 27th day.`, `${pc.nakshatra.name.hi} गंडमूल नक्षत्र है — आज जन्मे बच्चे की 27वें दिन मूल शांति कराई जाती है।`) });
  if (INAUSPICIOUS_YOGAS.includes(pc.yoga.en)) cautions.push({ tone: 'warn', title: p(`${pc.yoga.en} yoga`, `${pc.yoga.hi} योग`), text: p('An inauspicious yoga at sunrise — prefer worship and charity over new beginnings.', 'सूर्योदय पर अशुभ योग — नए आरंभ के बजाय पूजा और दान को प्राथमिकता दें।') });
  if (day.chaturmas) cautions.push({ tone: 'info', title: p('Chaturmas', 'चातुर्मास'), text: p('Lord Vishnu is in yoga-nidra — weddings, griha pravesh and mundan are not done; a time for vrat, satsang and discipline.', 'भगवान विष्णु योगनिद्रा में हैं — विवाह, गृह प्रवेश और मुंडन नहीं होते; व्रत, सत्संग और संयम का समय।') });
  if (day.month.adhik) cautions.push({ tone: 'info', title: p('Adhik Maas (Purushottam Maas)', 'अधिक मास (पुरुषोत्तम मास)'), text: p('No marriages or new ventures; excellent for Vishnu bhakti, daan and Bhagavat katha.', 'विवाह और नए कार्य नहीं; विष्णु भक्ति, दान और भागवत कथा के लिए उत्तम।') });
  if (day.festivals.includes('pitruPaksha')) cautions.push({ tone: 'info', title: p('Pitru Paksha', 'पितृ पक्ष'), text: p('Avoid new purchases and auspicious beginnings; do shraddh on your ancestor’s tithi.', 'नई खरीदारी और शुभ आरंभ से बचें; पूर्वज की तिथि पर श्राद्ध करें।') });

  // Best times to perform today's upay.
  const timings = [
    { key: 'brahma', label: p('Brahma Muhurat', 'ब्रह्म मुहूर्त'), start: pc.sunrise - 96, end: pc.sunrise - 48, use: p('Mantra jaap & meditation', 'मंत्र जाप एवं ध्यान') },
    { key: 'sunrise', label: p('Sunrise arghya', 'सूर्योदय अर्घ्य'), start: pc.sunrise, end: pc.sunrise + 48, use: p('Surya arghya & puja', 'सूर्य अर्घ्य एवं पूजा') },
    { key: 'abhijit', label: p('Abhijit Muhurat', 'अभिजित मुहूर्त'), start: pc.abhijit.start, end: pc.abhijit.end, use: p('Any auspicious upay', 'कोई भी शुभ उपाय') },
    { key: 'pradosh', label: p('Pradosh / Sandhya', 'प्रदोष / संध्या'), start: pc.sunset, end: pc.sunset + 90, use: p('Deep daan, Shiva & Lakshmi puja', 'दीपदान, शिव एवं लक्ष्मी पूजा') },
  ];

  const rashi = getDailyRashifal(pc, dateStr).map((r) => ({
    slug: r.slug, glyph: r.glyph, name: r.name, sign: r.sign, element: r.element, stars: r.stars, lord: r.lord, remedy: r.remedy, lucky: r.lucky, houseLabel: r.houseLabel, chandrashtama: r.chandrashtama,
  }));

  // The single headline upay for the day, in priority order.
  let headline;
  if (navratri) headline = { kind: 'navratri', title: navratri.devi.name, subtitle: navratri.name };
  else if (festivals.length) headline = { kind: 'festival', title: festivals[0].name, subtitle: festivals[0].deity };
  else if (vrats.length) headline = { kind: 'vrat', title: vrats[0].name, subtitle: vrats[0].deity };
  else headline = { kind: 'tithi', title: tithi.name, subtitle: tithi.deity };

  return { day, navratri, festivals, vrats, tithi, vaar, nakshatra, cautions, timings, rashi, headline, rules: NAVRATRI_RULES };
}

/** One short line for upcoming-calendar rows. */
export function dayHighlights(h) {
  const out = [];
  if (h.navratri) out.push({ tone: 'devi', label: p(`${h.navratri.name.en} · Day ${h.navratri.day} · ${NAVDURGA[h.navratri.day - 1].name.en}`, `${h.navratri.name.hi} · दिन ${h.navratri.day} · ${NAVDURGA[h.navratri.day - 1].name.hi}`) });
  h.festivals.forEach((k) => FESTIVALS[k] && out.push({ tone: 'fest', label: FESTIVALS[k].name }));
  h.vrats.forEach((v) => {
    const info = vratInfo(v);
    if (info) out.push({ tone: 'vrat', label: info.name });
  });
  return out;
}
