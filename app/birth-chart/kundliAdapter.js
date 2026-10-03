import { SIGNS } from '@/lib/zodiac';

const BY_SLUG = Object.fromEntries(SIGNS.map((s) => [s.slug, s]));
const sign = (s) => (s && BY_SLUG[s.slug]) || s;

/**
 * Turns the JSON chart from POST /kundli/generate (or GET /kundli/:id) back into the shape
 * lib/kundli's buildKundli() produced, which the chart UI and lib/phaladesh rely on:
 *  - sign objects are the shared SIGNS instances (code compares them by identity / SIGNS.indexOf)
 *  - dasha dates are Date objects, and currentDasha is the same object as its entry in `dashas`
 */
export function chartFromApi(chart) {
  if (!chart) return null;
  const dashas = (chart.dashas ?? []).map((d) => ({ ...d, start: new Date(d.start), end: new Date(d.end) }));
  const cur = chart.currentDasha;
  const currentDasha = cur ? dashas.find((d) => d.lord === cur.lord && d.start.getTime() === new Date(cur.start).getTime()) ?? null : null;

  return {
    ...chart,
    utc: new Date(chart.utc),
    lagna: { ...chart.lagna, sign: sign(chart.lagna.sign) },
    planets: chart.planets.map((pl) => ({ ...pl, sign: sign(pl.sign) })),
    rashi: sign(chart.rashi),
    westernSun: sign(chart.westernSun),
    dashas,
    currentDasha,
  };
}

/** API place payload: { lat, lon, tz, name } (name must be a plain string), or { city } for a known city id. */
export function placePayload(place) {
  if (!place) return null;
  if (place.city && place.lat === undefined) return { city: place.city };
  const name = typeof place.name === 'string' ? place.name : place.name?.en;
  return {
    lat: Number(place.lat),
    lon: Number(place.lon),
    tz: Number(place.tz),
    ...(name && { name: name.slice(0, 120) }),
    ...(place.city && { city: place.city }),
  };
}
