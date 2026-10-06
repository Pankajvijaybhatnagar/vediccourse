// CSV import/export for the yajman register. Works with files saved from Excel or Google Sheets.
import { GOTRAS, RASHIS, TRADITIONS } from './catalog';

/** Column order for the downloadable template and for export. */
export const CSV_COLUMNS = [
  ['name', 'Name / नाम'],
  ['phone', 'Phone / फ़ोन'],
  ['city', 'City / शहर'],
  ['address', 'Address / पता'],
  ['gotra', 'Gotra / गोत्र'],
  ['pravar', 'Pravar / प्रवर'],
  ['kuldevi', 'Kuldevi-Kuldevta / कुलदेवी-कुलदेवता'],
  ['nativePlace', 'Native place / मूल स्थान'],
  ['dob', 'Date of birth (YYYY-MM-DD) / जन्म तिथि'],
  ['rashi', 'Rashi / राशि'],
  ['father', 'Father (late) — tithi / पिता (स्व.) — तिथि'],
  ['grandfather', 'Grandfather (late) — tithi / दादा (स्व.) — तिथि'],
  ['traditions', 'Family traditions (; separated) / कुल परंपराएँ'],
  ['notes', 'Notes / टिप्पणी'],
];

/** RFC-4180-ish parser: quoted fields, escaped quotes, CRLF, BOM. */
export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  const s = text.replace(/^﻿/, '');
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (quoted) {
      if (c === '"' && s[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && s[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((v) => v.trim()));
}

const esc = (v) => {
  const s = String(v ?? '');
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

const norm = (s) => String(s || '').trim().toLowerCase().replace(/[^a-zऀ-ॿ]/g, '');

/** Matches a typed gotra ("Kashyap", "कश्यप", "kashyapa") to a GOTRAS key. */
export function matchGotra(input) {
  const n = norm(input);
  if (!n) return { gotra: '', gotraOther: '' };
  const hit = Object.entries(GOTRAS).find(([k, g]) => k !== 'other' && (norm(g.label.en) === n || norm(g.label.hi) === n || n.startsWith(norm(g.label.en)) || norm(k) === n));
  return hit ? { gotra: hit[0], gotraOther: '' } : { gotra: 'other', gotraOther: String(input).trim() };
}

function matchRashi(input) {
  const n = norm(input);
  if (!n) return '';
  const i = RASHIS.findIndex((r) => norm(r.en) === n || norm(r.hi) === n);
  return i >= 0 ? String(i) : '';
}

function matchTraditions(input) {
  return String(input || '')
    .split(/[;|]/)
    .map((s) => norm(s))
    .filter(Boolean)
    .map((n) => Object.entries(TRADITIONS).find(([k, d]) => norm(k) === n || norm(d.label.en).includes(n) || norm(d.label.hi).includes(n))?.[0])
    .filter(Boolean)
    .map((key) => ({ key, lastDone: '', note: '' }));
}

/** "Ramesh Sharma - 7" / "Ramesh Sharma (Saptami)" → { name, tithi } */
function parseAncestor(cell, relation, idx) {
  const s = String(cell || '').trim();
  if (!s) return null;
  const m = s.match(/^(.*?)[\s\-–—(,]+(\d{1,2})\)?\s*$/);
  return { id: `a${Date.now().toString(36)}${idx}${relation}`, name: (m ? m[1] : s).trim(), relation, tithi: m ? String(Math.min(15, Number(m[2]))) : '' };
}

/** Maps a header cell (English, Hindi or our template label) to a field key. */
function headerKey(h) {
  const n = norm(h);
  const col = CSV_COLUMNS.find(([key, label]) => norm(key) === n || label.split('/').some((part) => norm(part) === n) || norm(label) === n);
  if (col) return col[0];
  if (/mobile|phone|फ़ोन|फोन|मोबाइल/.test(h.toLowerCase())) return 'phone';
  if (/gotra|गोत्र/.test(h.toLowerCase())) return 'gotra';
  if (/name|नाम/.test(h.toLowerCase())) return 'name';
  return null;
}

/** Converts parsed CSV rows into yajman drafts. Returns { yajmans, skipped } */
export function rowsToYajmans(rows) {
  if (rows.length < 2) return { yajmans: [], skipped: 0 };
  const keys = rows[0].map(headerKey);
  let skipped = 0;
  const yajmans = [];
  rows.slice(1).forEach((r, i) => {
    const get = (k) => {
      const idx = keys.indexOf(k);
      return idx >= 0 ? (r[idx] || '').trim() : '';
    };
    const name = get('name');
    if (!name) {
      skipped++;
      return;
    }
    yajmans.push({
      name,
      phone: get('phone').replace(/[^\d+]/g, ''),
      city: get('city'),
      address: get('address'),
      ...matchGotra(get('gotra')),
      pravar: get('pravar'),
      kuldevi: get('kuldevi'),
      nativePlace: get('nativePlace'),
      dob: /^\d{4}-\d{2}-\d{2}$/.test(get('dob')) ? get('dob') : '',
      rashi: matchRashi(get('rashi')),
      ancestors: [parseAncestor(get('father'), 'father', i), parseAncestor(get('grandfather'), 'grandfather', i)].filter(Boolean),
      traditions: matchTraditions(get('traditions')),
      notes: get('notes'),
    });
  });
  return { yajmans, skipped };
}

export function templateCsv() {
  const header = CSV_COLUMNS.map(([, l]) => esc(l)).join(',');
  const sample = ['Ramesh Sharma', '9876543210', 'Varanasi', 'Assi Ghat', 'Kashyap', '', 'Vindhyavasini', 'Mirzapur', '1975-04-12', 'Kanya', 'Shivprasad Sharma - 7', 'Ramnath Sharma - 15', 'Kuldevi darshan; Satyanarayan Katha; Gaya Shraddh', ''].map(esc).join(',');
  return `﻿${header}\r\n${sample}\r\n`;
}

export function yajmansToCsv(list) {
  const ancestor = (y, rel) => {
    const a = (y.ancestors || []).find((x) => x.relation === rel);
    return a ? `${a.name}${a.tithi !== '' ? ` - ${a.tithi}` : ''}` : '';
  };
  const lines = list.map((y) =>
    [
      y.name,
      y.phone,
      y.city,
      y.address,
      y.gotra === 'other' ? y.gotraOther : GOTRAS[y.gotra]?.label.en || '',
      y.pravar,
      y.kuldevi,
      y.nativePlace,
      y.dob,
      y.rashi !== '' && y.rashi != null ? RASHIS[Number(y.rashi)]?.en : '',
      ancestor(y, 'father'),
      ancestor(y, 'grandfather'),
      (y.traditions || []).map((t) => TRADITIONS[t.key]?.label.en).filter(Boolean).join('; '),
      y.notes,
    ]
      .map(esc)
      .join(',')
  );
  return `﻿${CSV_COLUMNS.map(([, l]) => esc(l)).join(',')}\r\n${lines.join('\r\n')}\r\n`;
}

export function downloadText(filename, text, type = 'text/csv;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
