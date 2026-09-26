import { SIGNS } from './zodiac';
import { grahaLongitudes, ascendant, moonPhase } from './astro';
import { sidereal, nakshatraOf, ayanamsa } from './panchang';

const p = (en, hi) => ({ en, hi });

export const GRAHAS = [
  { key: 'sun', name: p('Sun', 'सूर्य'), abbr: p('Su', 'सू') },
  { key: 'moon', name: p('Moon', 'चंद्र'), abbr: p('Mo', 'चं') },
  { key: 'mars', name: p('Mars', 'मंगल'), abbr: p('Ma', 'मं') },
  { key: 'mercury', name: p('Mercury', 'बुध'), abbr: p('Me', 'बु') },
  { key: 'jupiter', name: p('Jupiter', 'गुरु'), abbr: p('Ju', 'गु') },
  { key: 'venus', name: p('Venus', 'शुक्र'), abbr: p('Ve', 'शु') },
  { key: 'saturn', name: p('Saturn', 'शनि'), abbr: p('Sa', 'श') },
  { key: 'rahu', name: p('Rahu', 'राहु'), abbr: p('Ra', 'रा') },
  { key: 'ketu', name: p('Ketu', 'केतु'), abbr: p('Ke', 'के') },
];

// Vimshottari order, starting from Ketu (lord of Ashwini), with period in years.
const DASHA = [
  ['ketu', 7], ['venus', 20], ['sun', 6], ['moon', 10], ['mars', 7], ['rahu', 18], ['jupiter', 16], ['saturn', 19], ['mercury', 17],
];

const YEAR_MS = 365.25 * 86400000;

function vimshottari(moonSid, birthUtc) {
  const span = 360 / 27;
  const nak = Math.floor(moonSid / span);
  const traversed = (moonSid % span) / span;
  const startIdx = nak % 9;
  const periods = [];
  let cursor = birthUtc.getTime() - traversed * DASHA[startIdx][1] * YEAR_MS; // back-date to the dasha's true start
  for (let i = 0; i < 9; i++) {
    const [lord, years] = DASHA[(startIdx + i) % 9];
    const end = cursor + years * YEAR_MS;
    periods.push({ lord, years, start: new Date(Math.max(cursor, birthUtc.getTime())), end: new Date(end) });
    cursor = end;
  }
  return periods;
}

/**
 * Builds a sidereal (Lahiri) Vedic birth chart with whole-sign houses.
 * @param {{date: string, time: string, lat: number, lon: number, tz: number}} input
 */
export function buildKundli({ date, time, lat, lon, tz }) {
  const [y, m, d] = date.split('-').map(Number);
  const [hh, mm] = (time || '12:00').split(':').map(Number);
  const utc = new Date(Date.UTC(y, m - 1, d, hh, mm) - tz * 3600000);

  const tropical = grahaLongitudes(utc);
  const lagnaLon = sidereal(ascendant(utc, lat, lon), utc);
  const lagnaSign = Math.floor(lagnaLon / 30);

  const planets = GRAHAS.map((g) => {
    const lon = sidereal(tropical[g.key].lon, utc);
    const signIdx = Math.floor(lon / 30);
    return {
      ...g,
      lon,
      sign: SIGNS[signIdx],
      degree: lon % 30,
      nakshatra: nakshatraOf(lon),
      house: ((signIdx - lagnaSign + 12) % 12) + 1,
      retro: tropical[g.key].retro && !['rahu', 'ketu'].includes(g.key),
    };
  });

  const moon = planets.find((pl) => pl.key === 'moon');
  const mars = planets.find((pl) => pl.key === 'mars');
  const dashas = vimshottari(moon.lon, utc);
  const now = Date.now();

  return {
    utc,
    ayanamsa: ayanamsa(utc),
    lagna: { lon: lagnaLon, sign: SIGNS[lagnaSign], degree: lagnaLon % 30, nakshatra: nakshatraOf(lagnaLon) },
    planets,
    rashi: moon.sign,
    nakshatra: moon.nakshatra,
    westernSun: SIGNS[Math.floor(tropical.sun.lon / 30)],
    phase: moonPhase(tropical.sun.lon, tropical.moon.lon),
    manglik: [1, 2, 4, 7, 8, 12].includes(mars.house),
    marsHouse: mars.house,
    dashas,
    currentDasha: dashas.find((ds) => ds.start.getTime() <= now && ds.end.getTime() > now),
  };
}
