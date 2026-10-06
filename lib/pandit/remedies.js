// Remedy & reminder engine for a yajman: works from the family's own traditions (कुल परंपरा),
// their ancestors' tithis and, if known, the yajman's rashi. Pure functions, no React.
import { getPanchang, CITIES } from '@/lib/panchang';
import { GOTRAS, RASHI_REMEDY, RASHIS, RELATIONS, TITHIS, TRADITIONS } from './catalog';

const DAY = 86400000;
const DELHI = CITIES[0];
const VIRGO = 5;

const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const pakshaCache = new Map();

/**
 * Pitru Paksha days for the coming season: the 15 Krishna-paksha days ending on the Amavasya
 * that falls while the Sun is in sidereal Kanya (Sarvapitri Amavasya). Computed for New Delhi,
 * so a day's edge can differ by place; the UI says "check your local Panchang".
 * @returns {{ date: Date, tithi: number }[]} tithi 1..14 = Krishna Pratipada..Chaturdashi, 15 = Amavasya, 0 = Purnima shraddh
 */
export function pitruPakshaDays(from = new Date()) {
  const startKey = ymd(from);
  if (pakshaCache.has(startKey)) return pakshaCache.get(startKey);

  const base = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let days = [];
  for (let i = -16; i < 400 && !days.length; i++) {
    const d = new Date(base.getTime() + i * DAY);
    const pc = getPanchang(ymd(d), DELHI);
    const amavasya = pc.tithi.number === 15 && pc.tithi.paksha.en.startsWith('Krishna');
    if (!amavasya || SIGN_INDEX(pc.sunSign) !== VIRGO) continue;
    // Walk back to the preceding Purnima; label each day with the tithi prevailing at sunrise.
    const season = [];
    for (let k = 0; k <= 17; k++) {
      const dd = new Date(d.getTime() - k * DAY);
      const pk = getPanchang(ymd(dd), DELHI);
      const krishna = pk.tithi.paksha.en.startsWith('Krishna');
      if (!krishna) {
        if (pk.tithi.number === 15) season.unshift({ date: dd, tithi: 0 });
        break;
      }
      if (!season.some((s) => s.tithi === pk.tithi.number)) season.unshift({ date: dd, tithi: pk.tithi.number });
    }
    if (season.at(-1).date.getTime() < base.getTime()) {
      i += 20; // this season is already over; keep looking for next year's
      continue;
    }
    days = season;
  }
  pakshaCache.set(startKey, days);
  return days;
}

function SIGN_INDEX(sign) {
  const order = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  return order.indexOf(typeof sign?.name === 'string' ? sign.name : sign?.name?.en ?? '');
}

/** Date of an ancestor's Mahalaya (Pitru Paksha) shraddh. tithi: 1..15, or 0 for Purnima. */
export function shraddhDate(tithi, from = new Date()) {
  const t = Number(tithi);
  // A kshaya (skipped) tithi begins and ends within the day labelled with the previous tithi.
  const pick = (days) => days.find((d) => d.tithi === t)?.date ?? days.findLast((d) => d.tithi < t)?.date ?? days[0]?.date ?? null;
  const date = pick(pitruPakshaDays(from));
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  if (!date || date >= today) return date;
  // This year's tithi has passed: use next year's Pitru Paksha.
  return pick(pitruPakshaDays(new Date(today.getTime() + 40 * DAY)));
}

const monthsSince = (iso, now) => (iso ? (now - new Date(iso)) / (DAY * 30.44) : Infinity);

/**
 * Builds a prioritised list of suggestions for one yajman.
 * Each item: { id, kind: 'shraddh'|'tradition'|'rashi'|'gotra'|'general', priority: 1..3, title, text, due?: Date }
 */
export function buildRemedies(yajman, now = new Date()) {
  const out = [];
  const traditions = yajman.traditions || [];
  const ancestors = yajman.ancestors || [];

  // 1. Pitru Paksha shraddh for each ancestor with a known tithi.
  ancestors
    .filter((a) => a.tithi !== '' && a.tithi != null)
    .forEach((a) => {
      const due = shraddhDate(a.tithi, now);
      const tithiName = Number(a.tithi) === 0 ? { en: 'Purnima', hi: 'पूर्णिमा' } : TITHIS[Number(a.tithi) - 1];
      const rel = RELATIONS[a.relation] || RELATIONS.other;
      out.push({
        id: `shraddh-${a.id}`,
        kind: 'shraddh',
        priority: due && due - now < 30 * DAY ? 1 : 2,
        due,
        title: {
          en: `Shraddh of ${a.name} (${rel.en}) — ${tithiName.en}`,
          hi: `${a.name} (${rel.hi}) का श्राद्ध — ${tithiName.hi}`,
        },
        text: TRADITIONS.pitruShraddh.remedy,
      });
    });

  // 2. Traditions the ancestors kept: continue them; flag overdue ones.
  traditions.forEach((tr) => {
    const def = TRADITIONS[tr.key];
    if (!def) return;
    const since = monthsSince(tr.lastDone, now);
    const overdue = def.every > 0 && since > def.every;
    const never = !tr.lastDone;
    out.push({
      id: `trad-${tr.key}`,
      kind: 'tradition',
      priority: overdue ? 1 : never && def.every === 0 ? 2 : 3,
      overdue,
      title: def.label,
      text: def.remedy,
      note: tr.note,
      lastDone: tr.lastDone,
    });
  });

  // 3. No pitru tradition recorded at all → suggest starting one.
  const hasPitru = traditions.some((t) => ['pitruShraddh', 'pitruPaksha', 'gayaShraddh'].includes(t.key)) || ancestors.some((a) => a.tithi !== '' && a.tithi != null);
  if (!hasPitru) {
    out.push({
      id: 'pitru-start',
      kind: 'general',
      priority: 2,
      title: { en: 'Begin Pitru Paksha tarpan', hi: 'पितृ पक्ष तर्पण आरंभ करें' },
      text: TRADITIONS.pitruPaksha.remedy,
    });
  }

  // 4. Kuldevta known but no darshan tradition logged.
  if ((yajman.kuldevi || yajman.kuldevta) && !traditions.some((t) => t.key === 'kuldeviDarshan')) {
    const deity = yajman.kuldevi || yajman.kuldevta;
    out.push({
      id: 'kuldevi',
      kind: 'tradition',
      priority: 2,
      title: { en: `Darshan of Kuldevi/Kuldevta: ${deity}`, hi: `कुलदेवी/कुलदेवता दर्शन: ${deity}` },
      text: TRADITIONS.kuldeviDarshan.remedy,
    });
  }

  // 5. Gotra rishi smaran in the daily sankalp.
  const gotra = GOTRAS[yajman.gotra];
  if (gotra && yajman.gotra !== 'other') {
    out.push({
      id: 'gotra',
      kind: 'gotra',
      priority: 3,
      title: { en: `Remember the ${gotra.label.en} gotra rishi`, hi: `${gotra.label.hi} गोत्र के ऋषि का स्मरण` },
      text: {
        en: `Begin daily worship with sankalp naming your gotra (${gotra.label.en}) and on every Amavasya offer one anjali of water to rishi ${gotra.label.en}.`,
        hi: `दैनिक पूजा का आरंभ अपने गोत्र (${gotra.label.hi}) के नाम सहित संकल्प से करें और प्रत्येक अमावस्या को ${gotra.label.hi} ऋषि को एक अंजलि जल अर्पित करें।`,
      },
    });
  }

  // 6. Rashi lord.
  const r = Number(yajman.rashi);
  if (yajman.rashi !== '' && yajman.rashi != null && RASHIS[r]) {
    out.push({
      id: 'rashi',
      kind: 'rashi',
      priority: 3,
      title: { en: `Rashi ${RASHIS[r].en}`, hi: `राशि ${RASHIS[r].hi}` },
      text: RASHI_REMEDY[r],
    });
  }

  return out.sort((a, b) => a.priority - b.priority || (a.due?.getTime() ?? Infinity) - (b.due?.getTime() ?? Infinity));
}

/** Sankalp opening line with the yajman's gotra and pravar, in Sanskrit. */
export function sankalpLine(yajman) {
  const g = GOTRAS[yajman.gotra];
  const gotraName = g && yajman.gotra !== 'other' ? g.label.hi : yajman.gotraOther || 'अमुक';
  const pravar = yajman.pravar || g?.pravar?.join('-') || '';
  return `ॐ विष्णुर्विष्णुर्विष्णुः … ${gotraName}गोत्रोत्पन्नः${pravar ? ` ${pravar}-प्रवरान्वितः` : ''} ${yajman.name || 'अमुक'} नामाहं …`;
}

/** Plain-text message for WhatsApp / SMS. */
export function remedyMessage({ yajman, items, pandit, t }) {
  const lines = [
    t({ en: `🙏 Namaste ${yajman.name} ji,`, hi: `🙏 नमस्ते ${yajman.name} जी,` }),
    '',
    t({ en: 'As per your family traditions, here is guidance for the coming days:', hi: 'आपकी कुल परंपरा के अनुसार आने वाले दिनों के लिए मार्गदर्शन:' }),
    '',
  ];
  items.forEach((it, i) => {
    const due = it.due ? ` (${it.due.toLocaleDateString(t({ en: 'en-IN', hi: 'hi-IN' }), { day: 'numeric', month: 'long' })})` : '';
    lines.push(`${i + 1}. *${t(it.title)}*${due}`);
    lines.push(`   ${t(it.text)}`);
  });
  lines.push('', t({ en: 'Please check exact timings in your local Panchang.', hi: 'सटीक समय के लिए अपना स्थानीय पंचांग अवश्य देखें।' }));
  if (pandit?.name) lines.push('', `— ${pandit.name}${pandit.phone ? ` · ${pandit.phone}` : ''}`);
  return lines.join('\n');
}

/** wa.me link; Indian 10-digit numbers get the 91 prefix. */
export function whatsappLink(phone, text) {
  let digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 10) digits = `91${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
