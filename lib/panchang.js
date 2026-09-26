import { SIGNS } from './zodiac';
import { sunLongitude, moonLongitude } from './astro';

const p = (en, hi) => ({ en, hi });
const norm360 = (d) => ((d % 360) + 360) % 360;
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;

/** Lahiri ayanamsa, linear approximation (good to a few arc-minutes for 1900–2100). */
export function ayanamsa(date) {
  const years = (date.getTime() - Date.UTC(2000, 0, 1, 12)) / (365.25 * 86400000);
  return 23.853 + years * 0.013969;
}

export const sidereal = (tropicalLon, date) => norm360(tropicalLon - ayanamsa(date));

export const NAKSHATRAS = [
  p('Ashwini', 'अश्विनी'), p('Bharani', 'भरणी'), p('Krittika', 'कृत्तिका'), p('Rohini', 'रोहिणी'), p('Mrigashira', 'मृगशिरा'),
  p('Ardra', 'आर्द्रा'), p('Punarvasu', 'पुनर्वसु'), p('Pushya', 'पुष्य'), p('Ashlesha', 'आश्लेषा'), p('Magha', 'मघा'),
  p('Purva Phalguni', 'पूर्व फाल्गुनी'), p('Uttara Phalguni', 'उत्तर फाल्गुनी'), p('Hasta', 'हस्त'), p('Chitra', 'चित्रा'),
  p('Swati', 'स्वाति'), p('Vishakha', 'विशाखा'), p('Anuradha', 'अनुराधा'), p('Jyeshtha', 'ज्येष्ठा'), p('Mula', 'मूल'),
  p('Purva Ashadha', 'पूर्वाषाढ़ा'), p('Uttara Ashadha', 'उत्तराषाढ़ा'), p('Shravana', 'श्रवण'), p('Dhanishta', 'धनिष्ठा'),
  p('Shatabhisha', 'शतभिषा'), p('Purva Bhadrapada', 'पूर्व भाद्रपद'), p('Uttara Bhadrapada', 'उत्तर भाद्रपद'), p('Revati', 'रेवती'),
];

const TITHIS = [
  p('Pratipada', 'प्रतिपदा'), p('Dwitiya', 'द्वितीया'), p('Tritiya', 'तृतीया'), p('Chaturthi', 'चतुर्थी'), p('Panchami', 'पंचमी'),
  p('Shashthi', 'षष्ठी'), p('Saptami', 'सप्तमी'), p('Ashtami', 'अष्टमी'), p('Navami', 'नवमी'), p('Dashami', 'दशमी'),
  p('Ekadashi', 'एकादशी'), p('Dwadashi', 'द्वादशी'), p('Trayodashi', 'त्रयोदशी'), p('Chaturdashi', 'चतुर्दशी'),
];

const YOGAS = [
  p('Vishkambha', 'विष्कुम्भ'), p('Priti', 'प्रीति'), p('Ayushman', 'आयुष्मान'), p('Saubhagya', 'सौभाग्य'), p('Shobhana', 'शोभन'),
  p('Atiganda', 'अतिगण्ड'), p('Sukarma', 'सुकर्मा'), p('Dhriti', 'धृति'), p('Shula', 'शूल'), p('Ganda', 'गण्ड'), p('Vriddhi', 'वृद्धि'),
  p('Dhruva', 'ध्रुव'), p('Vyaghata', 'व्याघात'), p('Harshana', 'हर्षण'), p('Vajra', 'वज्र'), p('Siddhi', 'सिद्धि'), p('Vyatipata', 'व्यतीपात'),
  p('Variyana', 'वरीयान'), p('Parigha', 'परिघ'), p('Shiva', 'शिव'), p('Siddha', 'सिद्ध'), p('Sadhya', 'साध्य'), p('Shubha', 'शुभ'),
  p('Shukla', 'शुक्ल'), p('Brahma', 'ब्रह्म'), p('Indra', 'इन्द्र'), p('Vaidhriti', 'वैधृति'),
];

const MOVABLE_KARANAS = [p('Bava', 'बव'), p('Balava', 'बालव'), p('Kaulava', 'कौलव'), p('Taitila', 'तैतिल'), p('Gara', 'गर'), p('Vanija', 'वणिज'), p('Vishti (Bhadra)', 'विष्टि (भद्रा)')];

export const VAARA = [
  p('Sunday (Ravivar)', 'रविवार'), p('Monday (Somvar)', 'सोमवार'), p('Tuesday (Mangalvar)', 'मंगलवार'), p('Wednesday (Budhvar)', 'बुधवार'),
  p('Thursday (Guruvar)', 'गुरुवार'), p('Friday (Shukravar)', 'शुक्रवार'), p('Saturday (Shanivar)', 'शनिवार'),
];

export function nakshatraOf(siderealLon) {
  const span = 360 / 27;
  const i = Math.floor(siderealLon / span);
  return { index: i, name: NAKSHATRAS[i], pada: Math.floor((siderealLon % span) / (span / 4)) + 1 };
}

function karanaOf(diff) {
  const half = Math.floor(diff / 6); // 0..59
  if (half === 0) return p('Kimstughna', 'किंस्तुघ्न');
  if (half === 57) return p('Shakuni', 'शकुनि');
  if (half === 58) return p('Chatushpada', 'चतुष्पद');
  if (half === 59) return p('Naga', 'नाग');
  return MOVABLE_KARANAS[(half - 1) % 7];
}

/** Sunrise & sunset (NOAA approximation) in minutes after local midnight. */
export function sunTimes(y, m, d, lat, lon, tz) {
  const start = Date.UTC(y, 0, 1);
  const n = Math.round((Date.UTC(y, m - 1, d) - start) / 86400000) + 1;
  const g = ((2 * Math.PI) / 365) * (n - 1);
  const eqtime = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const cosHa = Math.cos(rad(90.833)) / (Math.cos(rad(lat)) * Math.cos(decl)) - Math.tan(rad(lat)) * Math.tan(decl);
  const ha = deg(Math.acos(Math.max(-1, Math.min(1, cosHa))));
  return {
    sunrise: 720 - 4 * (lon + ha) - eqtime + tz * 60,
    sunset: 720 - 4 * (lon - ha) - eqtime + tz * 60,
    noon: 720 - 4 * lon - eqtime + tz * 60,
  };
}

export const fmtMinutes = (mins) => {
  const t = ((Math.round(mins) % 1440) + 1440) % 1440;
  const h = Math.floor(t / 60);
  const mm = String(t % 60).padStart(2, '0');
  return `${((h + 11) % 12) + 1}:${mm} ${h < 12 ? 'AM' : 'PM'}`;
};

// Order of the day's eighth-parts ruled by Rahu, Yamaganda and Gulika (index 0 = first part), by weekday (0 = Sunday).
const RAHU = [7, 1, 6, 4, 5, 3, 2];
const YAMA = [4, 3, 2, 1, 0, 6, 5];
const GULIKA = [6, 5, 4, 3, 2, 1, 0];

const CHOG = {
  udveg: { name: p('Udveg', 'उद्वेग'), tone: 'bad' },
  chal: { name: p('Chal', 'चल'), tone: 'neutral' },
  labh: { name: p('Labh', 'लाभ'), tone: 'good' },
  amrit: { name: p('Amrit', 'अमृत'), tone: 'good' },
  kaal: { name: p('Kaal', 'काल'), tone: 'bad' },
  shubh: { name: p('Shubh', 'शुभ'), tone: 'good' },
  rog: { name: p('Rog', 'रोग'), tone: 'bad' },
};
const DAY_CYCLE = ['udveg', 'chal', 'labh', 'amrit', 'kaal', 'shubh', 'rog'];
const NIGHT_CYCLE = ['shubh', 'amrit', 'chal', 'rog', 'kaal', 'labh', 'udveg'];
const DAY_START = ['udveg', 'amrit', 'rog', 'labh', 'shubh', 'chal', 'kaal'];
const NIGHT_START = ['shubh', 'chal', 'kaal', 'udveg', 'amrit', 'rog', 'labh'];

function choghadiya(startMins, endMins, first, cycle) {
  const seg = (endMins - startMins) / 8;
  const i0 = cycle.indexOf(first);
  return Array.from({ length: 8 }, (_, i) => ({
    ...CHOG[cycle[(i0 + i) % 7]],
    start: startMins + i * seg,
    end: startMins + (i + 1) * seg,
  }));
}

/**
 * Daily Panchang for a place. Tithi, Nakshatra, Yoga and Karana are taken at local sunrise, as is traditional.
 * @param {string} dateStr yyyy-mm-dd
 */
export function getPanchang(dateStr, { lat, lon, tz }) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const weekday = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const today = sunTimes(y, m, d, lat, lon, tz);
  const next = sunTimes(y, m, d + 1, lat, lon, tz);

  const sunriseUtc = new Date(Date.UTC(y, m - 1, d) + (today.sunrise - tz * 60) * 60000);
  const sunTrop = sunLongitude(sunriseUtc);
  const moonTrop = moonLongitude(sunriseUtc);
  const sunSid = sidereal(sunTrop, sunriseUtc);
  const moonSid = sidereal(moonTrop, sunriseUtc);
  const diff = norm360(moonTrop - sunTrop);

  const tithiIndex = Math.floor(diff / 12); // 0..29
  const shukla = tithiIndex < 15;
  const tithiName = tithiIndex === 14 ? p('Purnima', 'पूर्णिमा') : tithiIndex === 29 ? p('Amavasya', 'अमावस्या') : TITHIS[tithiIndex % 15];

  const dayLen = today.sunset - today.sunrise;
  const part = dayLen / 8;
  const window = (i) => ({ start: today.sunrise + i * part, end: today.sunrise + (i + 1) * part });
  const muhurta = dayLen / 15;

  return {
    weekday,
    vaara: VAARA[weekday],
    sunrise: today.sunrise,
    sunset: today.sunset,
    tithi: { name: tithiName, paksha: shukla ? p('Shukla Paksha', 'शुक्ल पक्ष') : p('Krishna Paksha', 'कृष्ण पक्ष'), number: (tithiIndex % 15) + 1, progress: (diff % 12) / 12 },
    nakshatra: nakshatraOf(moonSid),
    yoga: YOGAS[Math.floor(norm360(sunSid + moonSid) / (360 / 27))],
    karana: karanaOf(diff),
    moonSign: SIGNS[Math.floor(moonSid / 30)],
    sunSign: SIGNS[Math.floor(sunSid / 30)],
    ayanamsa: ayanamsa(sunriseUtc),
    rahu: window(RAHU[weekday]),
    yamaganda: window(YAMA[weekday]),
    gulika: window(GULIKA[weekday]),
    abhijit: { start: today.noon - muhurta / 2, end: today.noon + muhurta / 2 },
    dayChoghadiya: choghadiya(today.sunrise, today.sunset, DAY_START[weekday], DAY_CYCLE),
    nightChoghadiya: choghadiya(today.sunset, next.sunrise + 1440, NIGHT_START[weekday], NIGHT_CYCLE),
  };
}

export const CITIES = [
  { id: 'delhi', name: p('New Delhi', 'नई दिल्ली'), lat: 28.6139, lon: 77.209, tz: 5.5 },
  { id: 'mumbai', name: p('Mumbai', 'मुंबई'), lat: 19.076, lon: 72.8777, tz: 5.5 },
  { id: 'kolkata', name: p('Kolkata', 'कोलकाता'), lat: 22.5726, lon: 88.3639, tz: 5.5 },
  { id: 'chennai', name: p('Chennai', 'चेन्नई'), lat: 13.0827, lon: 80.2707, tz: 5.5 },
  { id: 'bengaluru', name: p('Bengaluru', 'बेंगलुरु'), lat: 12.9716, lon: 77.5946, tz: 5.5 },
  { id: 'hyderabad', name: p('Hyderabad', 'हैदराबाद'), lat: 17.385, lon: 78.4867, tz: 5.5 },
  { id: 'ahmedabad', name: p('Ahmedabad', 'अहमदाबाद'), lat: 23.0225, lon: 72.5714, tz: 5.5 },
  { id: 'pune', name: p('Pune', 'पुणे'), lat: 18.5204, lon: 73.8567, tz: 5.5 },
  { id: 'jaipur', name: p('Jaipur', 'जयपुर'), lat: 26.9124, lon: 75.7873, tz: 5.5 },
  { id: 'lucknow', name: p('Lucknow', 'लखनऊ'), lat: 26.8467, lon: 80.9462, tz: 5.5 },
  { id: 'varanasi', name: p('Varanasi', 'वाराणसी'), lat: 25.3176, lon: 82.9739, tz: 5.5 },
  { id: 'ujjain', name: p('Ujjain', 'उज्जैन'), lat: 23.1765, lon: 75.7885, tz: 5.5 },
  { id: 'patna', name: p('Patna', 'पटना'), lat: 25.5941, lon: 85.1376, tz: 5.5 },
  { id: 'kathmandu', name: p('Kathmandu', 'काठमांडू'), lat: 27.7172, lon: 85.324, tz: 5.75 },
  { id: 'dubai', name: p('Dubai', 'दुबई'), lat: 25.2048, lon: 55.2708, tz: 4 },
  { id: 'london', name: p('London (GMT)', 'लंदन (GMT)'), lat: 51.5074, lon: -0.1278, tz: 0 },
];
