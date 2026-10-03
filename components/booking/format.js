// Shared formatting and pricing helpers for booking & checkout.

const ZERO_DECIMAL = new Set(['BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF']);
const THREE_DECIMAL = new Set(['BHD', 'JOD', 'KWD', 'OMR', 'TND']);
const exponentOf = (c) => (ZERO_DECIMAL.has(c) ? 0 : THREE_DECIMAL.has(c) ? 3 : 2);

/** Formats an amount in major units, e.g. money(999, 'INR') → ₹999, money(11.99, 'USD') → $11.99. */
export function money(amount, currency = 'INR', lang = 'en') {
  if (amount == null || Number.isNaN(Number(amount))) return '';
  try {
    return new Intl.NumberFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', {
      style: 'currency',
      currency,
      maximumFractionDigits: Number.isInteger(Number(amount)) ? 0 : exponentOf(currency),
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

/**
 * Preview price of a plan in a checkout currency. Mirrors the backend's priceIn():
 * explicit plan.prices[CUR] first, else base × fxRate rounded up. The server still decides the charged amount.
 * @returns {{ amount: number, approx: boolean } | null}
 */
export function previewPrice(plan, currency, config) {
  if (!plan) return null;
  const base = config?.baseCurrency || 'INR';
  if (!currency || currency === base) return { amount: plan.price, approx: false };
  const fixed = plan.prices?.[currency];
  if (fixed > 0) return { amount: fixed, approx: false };
  const rate = config?.fxRates?.[currency];
  if (!rate) return null;
  const unit = 10 ** exponentOf(currency);
  return { amount: Math.ceil(Number((plan.price * rate * unit).toFixed(6))) / unit, approx: true };
}

/** Today's date (YYYY-MM-DD) in India, where consultations take place, matching the backend's check. */
export const todayIST = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

export function addDaysIso(iso, days) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Displays a booking date (stored as midnight IST) without timezone drift. */
export function formatDate(value, lang = 'en', opts = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!value) return '';
  return new Date(value).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', { timeZone: 'Asia/Kolkata', ...opts });
}

export function formatDateTime(value, lang = 'en') {
  if (!value) return '';
  return new Date(value).toLocaleString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export const SLOTS = [
  { id: 'any', label: { en: 'Any time', hi: 'कोई भी समय' } },
  { id: 'morning', label: { en: 'Morning (6–12)', hi: 'सुबह (6–12)' } },
  { id: 'afternoon', label: { en: 'Afternoon (12–4)', hi: 'दोपहर (12–4)' } },
  { id: 'evening', label: { en: 'Evening (4–8)', hi: 'शाम (4–8)' } },
  { id: 'night', label: { en: 'Night (8–11)', hi: 'रात (8–11)' } },
];

export const MODE_LABELS = {
  chat: { en: 'Chat', hi: 'चैट' },
  call: { en: 'Call', hi: 'कॉल' },
  video: { en: 'Video', hi: 'वीडियो' },
};

export const STATUS_LABELS = {
  pending: { en: 'Awaiting confirmation', hi: 'पुष्टि की प्रतीक्षा' },
  confirmed: { en: 'Confirmed', hi: 'पक्का' },
  rescheduled: { en: 'Rescheduled', hi: 'समय बदला गया' },
  completed: { en: 'Completed', hi: 'पूर्ण' },
  cancelled: { en: 'Cancelled', hi: 'रद्द' },
};

export const PAYMENT_LABELS = {
  unpaid: { en: 'Unpaid', hi: 'भुगतान बाकी' },
  paid: { en: 'Paid', hi: 'भुगतान हो गया' },
  refunded: { en: 'Refunded', hi: 'धनवापसी हो गई' },
  partially_refunded: { en: 'Partly refunded', hi: 'आंशिक धनवापसी' },
};

/** Expertise labels (mirror of the backend's ASTRO_SKILLS). */
export const SKILLS = {
  jyotish: { en: 'Jyotish', hi: 'ज्योतिष' },
  karmkand: { en: 'Karmkand', hi: 'कर्मकांड' },
  shastra: { en: 'Shastra', hi: 'शास्त्र' },
  vastu: { en: 'Vastu', hi: 'वास्तु' },
  prashna: { en: 'Prashna Jyotish', hi: 'प्रश्न ज्योतिष' },
  palm: { en: 'Palmistry', hi: 'हस्तरेखा' },
  tantra: { en: 'Tantra Vigyan', hi: 'तंत्र-विज्ञान' },
  counseling: { en: 'Counselling', hi: 'काउंसलिंग' },
  tarot: { en: 'Tarot', hi: 'टैरो' },
  numerology: { en: 'Numerology', hi: 'अंक ज्योतिष' },
};

// Guest bookings: a summary kept in this tab so the confirmation page works without an account.
const GUEST_KEY = (id) => `vd-booking-${id}`;

export function rememberGuestBooking(booking) {
  try {
    sessionStorage.setItem(GUEST_KEY(booking.id), JSON.stringify(booking));
  } catch {}
}

export function recallGuestBooking(id) {
  try {
    const raw = sessionStorage.getItem(GUEST_KEY(id));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Maps a 422 response's details to { field: message }. */
export function fieldErrors(err) {
  const out = {};
  for (const d of err?.details ?? []) {
    const key = String(d.path || '').split('.')[0];
    if (key && !out[key]) out[key] = d.message;
  }
  return out;
}
