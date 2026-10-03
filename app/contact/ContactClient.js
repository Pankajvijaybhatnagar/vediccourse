'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { MessageCircle, PhoneCall, Video, Mail, Clock, Check, ShieldCheck, Lock, Send, CalendarCheck } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { usePayment } from '@/components/booking/usePayment';
import PaymentNotice from '@/components/booking/PaymentNotice';
import { SLOTS, addDaysIso, fieldErrors, money, previewPrice, rememberGuestBooking, todayIST } from '@/components/booking/format';
import EnquiryForm, { TOPICS } from './EnquiryForm';
import styles from './contact.module.css';

const MODES = [
  { id: 'chat', Icon: MessageCircle, label: { en: 'Chat', hi: 'चैट' } },
  { id: 'call', Icon: PhoneCall, label: { en: 'Call', hi: 'कॉल' } },
  { id: 'video', Icon: Video, label: { en: 'Video', hi: 'वीडियो' } },
];

const FAQS = [
  { q: { en: 'Do I need my exact birth time?', hi: 'क्या सही जन्म समय ज़रूरी है?' }, a: { en: 'An exact time gives the most precise Lagna and house placements, but we can still give a rich reading with just your birth date.', hi: 'सही समय से लग्न और भाव सबसे सटीक होते हैं, पर केवल जन्म तिथि से भी अच्छा विश्लेषण संभव है।' } },
  { q: { en: 'Which languages are available?', hi: 'कौन-सी भाषाएँ उपलब्ध हैं?' }, a: { en: 'Consultations are available in Hindi and English, and many astrologers also speak Punjabi, Marathi, Gujarati or Bengali.', hi: 'परामर्श हिंदी और अंग्रेज़ी में उपलब्ध है, और कई ज्योतिषी पंजाबी, मराठी, गुजराती या बांग्ला भी बोलते हैं।' } },
  { q: { en: 'Can I reschedule or cancel?', hi: 'क्या समय बदला या रद्द किया जा सकता है?' }, a: { en: 'Yes, free of charge up to 24 hours before your session, from your booking page.', hi: 'हाँ, सत्र से 24 घंटे पहले तक, अपने बुकिंग पृष्ठ से, बिना शुल्क के।' } },
  { q: { en: 'Can I pay from outside India?', hi: 'क्या भारत के बाहर से भुगतान कर सकते हैं?' }, a: { en: 'Yes. Choose your currency before paying; international cards are accepted through our secure Razorpay checkout.', hi: 'हाँ। भुगतान से पहले अपनी मुद्रा चुनें; हमारे सुरक्षित Razorpay चेकआउट से अंतरराष्ट्रीय कार्ड स्वीकार हैं।' } },
  { q: { en: 'Is astrology a substitute for professional advice?', hi: 'क्या ज्योतिष पेशेवर सलाह का विकल्प है?' }, a: { en: 'No. Readings are for guidance and reflection and do not replace medical, legal or financial advice.', hi: 'नहीं। परामर्श मार्गदर्शन के लिए है, यह चिकित्सा, कानूनी या वित्तीय सलाह का विकल्प नहीं है।' } },
];

const EMPTY = { name: '', phone: '', email: '', dob: '', birthTime: '', birthPlace: '', preferred: '', preferredSlot: 'any', message: '' };

const MSG = {
  name: { en: 'Please enter your name.', hi: 'कृपया अपना नाम दर्ज करें।' },
  phone: { en: 'Please enter a valid 10-digit mobile number.', hi: 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।' },
  email: { en: 'Please enter a valid email address.', hi: 'कृपया सही ईमेल दर्ज करें।' },
  dob: { en: 'Date of birth cannot be in the future.', hi: 'जन्म तिथि भविष्य की नहीं हो सकती।' },
  birthTime: { en: 'Use a time like 14:30.', hi: '14:30 जैसा समय लिखें।' },
  preferred: { en: 'Please choose a preferred date.', hi: 'कृपया पसंदीदा तिथि चुनें।' },
  preferredRange: { en: 'Choose a date from today up to 180 days ahead.', hi: 'आज से 180 दिनों के भीतर की तिथि चुनें।' },
  message: { en: 'Please keep your message under 2000 characters.', hi: 'कृपया संदेश 2000 अक्षरों से कम रखें।' },
};

const tenDigits = (v) => v.replace(/\D/g, '').slice(-10);

/** Mirrors the backend's bookingCreateSchema so most mistakes are caught before a round trip. */
function validate(form, today) {
  const e = {};
  if (form.name.trim().length < 2 || form.name.trim().length > 80) e.name = MSG.name;
  if (!/^[6-9]\d{9}$/.test(tenDigits(form.phone))) e.phone = MSG.phone;
  if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) e.email = MSG.email;
  if (form.dob && form.dob > today) e.dob = MSG.dob;
  if (form.birthTime && !/^([01]\d|2[0-3]):[0-5]\d$/.test(form.birthTime)) e.birthTime = MSG.birthTime;
  if (!form.preferred) e.preferred = MSG.preferred;
  else if (form.preferred < today || form.preferred > addDaysIso(today, 180)) e.preferred = MSG.preferredRange;
  if (form.message.length > 2000) e.message = MSG.message;
  return e;
}

/** Matches ?astro= against the numeric legacy id, slug or Mongo id. */
const findAstro = (list, ref) => (ref ? list.find((a) => String(a.legacyId) === ref || a.slug === ref || a.id === ref) : null);

export default function ContactClient({ plans = [], astrologers = [], paymentConfig }) {
  const { t } = useLang();
  const params = useSearchParams();
  const topicParam = params.get('topic');
  const [tab, setTab] = useState(topicParam && TOPICS.some((x) => x.id === topicParam) ? 'enquiry' : 'book');

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.tabs} role="tablist" aria-label={t({ en: 'Contact options', hi: 'संपर्क विकल्प' })}>
          <button role="tab" id="tab-book" aria-controls="panel-book" aria-selected={tab === 'book'} onClick={() => setTab('book')}>
            <CalendarCheck size={18} /> {t({ en: 'Book a consultation', hi: 'परामर्श बुक करें' })}
          </button>
          <button role="tab" id="tab-enquiry" aria-controls="panel-enquiry" aria-selected={tab === 'enquiry'} onClick={() => setTab('enquiry')}>
            <Send size={18} /> {t({ en: 'Send an enquiry', hi: 'पूछताछ भेजें' })}
          </button>
        </div>

        {tab === 'book' ? (
          <div id="panel-book" role="tabpanel" aria-labelledby="tab-book">
            <BookingSection plans={plans} astrologers={astrologers} paymentConfig={paymentConfig} />
          </div>
        ) : (
          <div id="panel-enquiry" role="tabpanel" aria-labelledby="tab-enquiry" className={styles.layout}>
            <div className={`card card-glow ${styles.formCard}`}>
              <EnquiryForm initialTopic={topicParam} />
            </div>
            <ContactAside />
          </div>
        )}
      </div>
    </section>
  );
}

function BookingSection({ plans, astrologers, paymentConfig }) {
  const { t, lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const payment = usePayment();
  const formRef = useRef(null);

  const preset = findAstro(astrologers, params.get('astro'));
  const initialPlan = plans.find((p) => p.key === params.get('plan'))?.key ?? plans.find((p) => p.isPopular)?.key ?? plans[0]?.key;
  const [planKey, setPlanKey] = useState(initialPlan);
  const [mode, setMode] = useState(MODES.some((m) => m.id === params.get('mode')) ? params.get('mode') : 'call');
  const [astroId, setAstroId] = useState(preset?.id ?? 'any');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | created
  const [booking, setBooking] = useState(null);
  const [today, setToday] = useState('');

  const payEnabled = Boolean(paymentConfig?.enabled);
  const currencies = paymentConfig?.currencies?.length ? paymentConfig.currencies : ['INR'];
  const [currency, setCurrency] = useState(paymentConfig?.baseCurrency || 'INR');

  // Dates depend on the visitor's clock, so resolve after mount (no hydration mismatch).
  useEffect(() => setToday(todayIST()), []);

  // Prefill from the signed-in account, without overwriting anything already typed.
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({
      ...f,
      name: f.name || user.name || '',
      phone: f.phone || user.phone || '',
      email: f.email || user.email || '',
      dob: f.dob || user.birthDetails?.date || '',
      birthTime: f.birthTime || user.birthDetails?.time || '',
      birthPlace: f.birthPlace || user.birthDetails?.place?.name || '',
    }));
  }, [user]);

  const selected = plans.find((p) => p.key === planKey) ?? plans[0];
  const astro = astrologers.find((a) => a.id === astroId);
  const priceLabel = (plan) => {
    const p = payEnabled ? previewPrice(plan, currency, paymentConfig) : null;
    if (!p) return money(plan.price, paymentConfig?.baseCurrency || 'INR', lang);
    return `${p.approx ? '≈ ' : ''}${money(p.amount, currency, lang)}`;
  };
  const approx = payEnabled && selected && previewPrice(selected, currency, paymentConfig)?.approx;

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const startPayment = async (b) => {
    const result = await payment.pay({ bookingId: b.id, currency, phone: b.user ? undefined : b.contact.phone });
    if (result.status === 'paid' || result.status === 'pending') router.push(`/booking/${b.id}?paid=1`);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setFormError('');
    const next = validate(form, today || todayIST());
    setErrors(next);
    if (Object.keys(next).length) {
      formRef.current?.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }

    setStatus('sending');
    try {
      const body = {
        plan: selected.key,
        mode,
        astrologer: astroId === 'any' ? 'any' : astroId,
        name: form.name.trim(),
        phone: tenDigits(form.phone),
        preferred: form.preferred,
        preferredSlot: form.preferredSlot,
        ...(form.email.trim() && { email: form.email.trim() }),
        ...(form.dob && { dob: form.dob }),
        ...(form.birthTime && { birthTime: form.birthTime }),
        ...(form.birthPlace.trim() && { birthPlace: form.birthPlace.trim() }),
        ...(form.message.trim() && { message: form.message.trim() }),
      };
      const { data } = await api('/consultations/bookings', { method: 'POST', body });
      if (!data.user) rememberGuestBooking(data);
      setBooking(data);
      setStatus('created');

      if (payEnabled) await startPayment(data);
      else router.push(`/booking/${data.id}?new=1`);
    } catch (err) {
      setStatus('idle');
      if (err.status === 422) {
        const fe = fieldErrors(err);
        const mapped = {};
        for (const [k, v] of Object.entries(fe)) mapped[k] = { en: v, hi: v };
        setErrors(mapped);
        setFormError(t({ en: 'Please correct the highlighted fields.', hi: 'कृपया चिह्नित फ़ील्ड ठीक करें।' }));
      } else if (err.code === 'DATE_IN_PAST') {
        setErrors({ preferred: MSG.preferredRange });
      } else if (err.code === 'ASTROLOGER_UNAVAILABLE') {
        setAstroId('any');
        setFormError(t({ en: 'That astrologer is not available right now — we switched to “any available astrologer”. Please submit again.', hi: 'वह ज्योतिषी अभी उपलब्ध नहीं हैं — हमने “कोई भी उपलब्ध ज्योतिषी” चुन लिया है। कृपया पुनः सबमिट करें।' }));
      } else if (err.status === 429) {
        setFormError(t({ en: 'Too many attempts. Please wait a few minutes and try again.', hi: 'बहुत अधिक प्रयास। कृपया कुछ मिनट बाद पुनः प्रयास करें।' }));
      } else {
        setFormError(err.message);
      }
    }
  };

  if (!plans.length) {
    return (
      <div className={`card ${styles.formCard} ${styles.success}`}>
        <p className="muted">{t({ en: 'Online booking is temporarily unavailable. Please send us an enquiry and we will call you back.', hi: 'ऑनलाइन बुकिंग अभी उपलब्ध नहीं है। कृपया पूछताछ भेजें, हम आपको कॉल करेंगे।' })}</p>
      </div>
    );
  }

  const locked = status !== 'idle'; // once a booking exists, never create a second one by accident

  return (
    <>
      <div className={styles.plans} role="radiogroup" aria-label={t({ en: 'Choose a session', hi: 'सत्र चुनें' })}>
        {plans.map((p) => (
          <button
            key={p.key}
            type="button"
            role="radio"
            aria-checked={planKey === p.key}
            disabled={locked}
            className={`card ${styles.plan} ${planKey === p.key ? styles.planActive : ''}`}
            onClick={() => setPlanKey(p.key)}
          >
            {p.isPopular && <span className={styles.badge}>{t({ en: 'Most popular', hi: 'सबसे लोकप्रिय' })}</span>}
            <span className={styles.planName}>{t(p.name)}</span>
            <span className={styles.price}>{priceLabel(p)}</span>
            <span className={styles.duration}>
              <Clock size={14} /> {p.duration ? t(p.duration) : t({ en: `${p.durationMinutes} min`, hi: `${p.durationMinutes} मिनट` })}
            </span>
            {p.features?.length > 0 && (
              <ul>
                {p.features.map((f) => (
                  <li key={f.en}>
                    <Check size={15} /> {t(f)}
                  </li>
                ))}
              </ul>
            )}
            <span className={styles.check} aria-hidden="true">
              {planKey === p.key ? `✓ ${t({ en: 'Selected', hi: 'चुना गया' })}` : t({ en: 'Select', hi: 'चुनें' })}
            </span>
          </button>
        ))}
      </div>

      <div className={styles.layout}>
        <div className={`card card-glow ${styles.formCard}`}>
          {status === 'created' && booking ? (
            <div className={`${styles.success} fade-up`}>
              <div className={styles.successIcon}>ॐ</div>
              <h2>{t({ en: 'Your booking is saved', hi: 'आपकी बुकिंग सहेज ली गई है' })}</h2>
              <p className="muted">
                {t({ en: 'Booking number', hi: 'बुकिंग संख्या' })}: <strong>{booking.bookingNo}</strong>
              </p>
              {payEnabled && (
                <PaymentNotice
                  payment={payment}
                  onRetry={() => startPayment(booking)}
                  amountLabel={priceLabel(selected)}
                />
              )}
              <Link href={`/booking/${booking.id}`} className="btn btn-ghost">
                {t({ en: 'View booking', hi: 'बुकिंग देखें' })}
              </Link>
            </div>
          ) : (
            <form ref={formRef} onSubmit={submit} noValidate>
              <h2 className={styles.formTitle}>
                <span className="gold-text">{t(selected.name)}</span> · {priceLabel(selected)}
              </h2>

              <div className={styles.modes} role="radiogroup" aria-label={t({ en: 'Consultation mode', hi: 'परामर्श माध्यम' })}>
                {MODES.map((m) => (
                  <button type="button" key={m.id} role="radio" aria-checked={mode === m.id} className={mode === m.id ? styles.modeOn : ''} onClick={() => setMode(m.id)}>
                    <m.Icon size={18} /> {t(m.label)}
                  </button>
                ))}
              </div>

              <div className={styles.fields}>
                <div className={`field ${styles.full}`}>
                  <label htmlFor="c-astro">{t({ en: 'Astrologer', hi: 'ज्योतिषी' })}</label>
                  <select id="c-astro" className="input" value={astroId} onChange={(e) => setAstroId(e.target.value)}>
                    <option value="any">{t({ en: 'Any available astrologer (fastest)', hi: 'कोई भी उपलब्ध ज्योतिषी (सबसे जल्दी)' })}</option>
                    {astrologers.map((a) => (
                      <option key={a.id} value={a.id}>
                        {t(a.name)}
                        {a.title ? ` · ${t(a.title)}` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <Field id="name" label={{ en: 'Full name', hi: 'पूरा नाम' }} error={errors.name}>
                  <input id="c-name" autoComplete="name" className={`input ${errors.name ? 'invalid' : ''}`} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'c-name-err' : undefined} value={form.name} onChange={update('name')} maxLength={80} />
                </Field>
                <Field id="phone" label={{ en: 'Mobile number', hi: 'मोबाइल नंबर' }} error={errors.phone}>
                  <input id="c-phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="98XXXXXXXX" className={`input ${errors.phone ? 'invalid' : ''}`} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'c-phone-err' : undefined} value={form.phone} onChange={update('phone')} maxLength={14} />
                </Field>
                <Field id="email" label={{ en: 'Email (optional)', hi: 'ईमेल (वैकल्पिक)' }} error={errors.email}>
                  <input id="c-email" type="email" autoComplete="email" className={`input ${errors.email ? 'invalid' : ''}`} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'c-email-err' : undefined} value={form.email} onChange={update('email')} />
                </Field>
                <Field id="dob" label={{ en: 'Date of birth', hi: 'जन्म तिथि' }} error={errors.dob}>
                  <input id="c-dob" type="date" max={today || undefined} suppressHydrationWarning className={`input ${errors.dob ? 'invalid' : ''}`} aria-invalid={Boolean(errors.dob)} value={form.dob} onChange={update('dob')} />
                </Field>
                <Field id="birthTime" label={{ en: 'Birth time (if known)', hi: 'जन्म समय (यदि ज्ञात हो)' }} error={errors.birthTime}>
                  <input id="c-birthTime" type="time" className={`input ${errors.birthTime ? 'invalid' : ''}`} aria-invalid={Boolean(errors.birthTime)} value={form.birthTime} onChange={update('birthTime')} />
                </Field>
                <Field id="birthPlace" label={{ en: 'Birth place', hi: 'जन्म स्थान' }} error={errors.birthPlace}>
                  <input id="c-birthPlace" className="input" placeholder={t({ en: 'City, State', hi: 'शहर, राज्य' })} value={form.birthPlace} onChange={update('birthPlace')} maxLength={120} />
                </Field>
                <Field id="preferred" label={{ en: 'Preferred session date', hi: 'पसंदीदा सत्र तिथि' }} error={errors.preferred}>
                  <input id="c-preferred" type="date" min={today || undefined} max={today ? addDaysIso(today, 180) : undefined} suppressHydrationWarning className={`input ${errors.preferred ? 'invalid' : ''}`} aria-invalid={Boolean(errors.preferred)} aria-describedby={errors.preferred ? 'c-preferred-err' : undefined} value={form.preferred} onChange={update('preferred')} />
                </Field>
                <div className="field">
                  <label htmlFor="c-slot">{t({ en: 'Preferred time', hi: 'पसंदीदा समय' })}</label>
                  <select id="c-slot" className="input" value={form.preferredSlot} onChange={update('preferredSlot')}>
                    {SLOTS.map((s) => (
                      <option key={s.id} value={s.id}>
                        {t(s.label)}
                      </option>
                    ))}
                  </select>
                </div>
                <Field id="message" full label={{ en: 'What would you like guidance on?', hi: 'आप किस विषय पर मार्गदर्शन चाहते हैं?' }} error={errors.message}>
                  <textarea id="c-message" className={`input ${errors.message ? 'invalid' : ''}`} aria-invalid={Boolean(errors.message)} value={form.message} onChange={update('message')} maxLength={2000} placeholder={t({ en: 'Career, marriage, health, a big decision…', hi: 'करियर, विवाह, स्वास्थ्य, कोई बड़ा निर्णय…' })} />
                </Field>

                {payEnabled && currencies.length > 1 && (
                  <div className={`field ${styles.full}`}>
                    <label htmlFor="c-currency">{t({ en: 'Pay in', hi: 'भुगतान मुद्रा' })}</label>
                    <select id="c-currency" className="input" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                      {currencies.map((c) => {
                        const p = previewPrice(selected, c, paymentConfig);
                        return (
                          <option key={c} value={c}>
                            {p ? `${c} · ${p.approx ? '≈ ' : ''}${money(p.amount, c, lang)}` : c}
                          </option>
                        );
                      })}
                    </select>
                    {approx && (
                      <span className={styles.hint}>
                        {t({ en: 'Converted from INR at today’s rate. The exact amount is shown in the secure checkout.', hi: 'आज की दर से INR से परिवर्तित। सटीक राशि सुरक्षित चेकआउट में दिखाई जाएगी।' })}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {formError && (
                <p className={`error-text ${styles.formError}`} role="alert">
                  {formError}
                </p>
              )}

              <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
                {status === 'sending'
                  ? t({ en: 'Booking your session…', hi: 'सत्र बुक हो रहा है…' })
                  : payEnabled
                    ? `${t({ en: 'Book & Pay', hi: 'बुक करें और भुगतान करें' })} · ${priceLabel(selected)}`
                    : `${t({ en: 'Book Now', hi: 'अभी बुक करें' })} · ${priceLabel(selected)}`}
              </button>
              <p className={styles.secure}>
                {payEnabled ? <Lock size={14} /> : <ShieldCheck size={14} />}{' '}
                {payEnabled
                  ? t({ en: 'Secure payment by Razorpay · UPI, cards, netbanking & international cards', hi: 'Razorpay द्वारा सुरक्षित भुगतान · UPI, कार्ड, नेटबैंकिंग और अंतरराष्ट्रीय कार्ड' })
                  : t({ en: 'No payment now — we confirm your slot first, then share payment details.', hi: 'अभी कोई भुगतान नहीं — पहले हम आपका समय पक्का करेंगे, फिर भुगतान विवरण भेजेंगे।' })}
              </p>
              {astro && (
                <p className={styles.hint}>
                  {t({ en: 'With', hi: 'ज्योतिषी' })}: <strong>{t(astro.name)}</strong>
                </p>
              )}
            </form>
          )}
        </div>
        <ContactAside withFaq />
      </div>
    </>
  );
}

function Field({ id, label, error, full, children }) {
  const { t } = useLang();
  return (
    <div className={`field ${full ? styles.full : ''}`}>
      <label htmlFor={`c-${id}`}>{t(label)}</label>
      {children}
      {error && (
        <span id={`c-${id}-err`} className="error-text">
          {t(error)}
        </span>
      )}
    </div>
  );
}

function ContactAside({ withFaq = false }) {
  const { t } = useLang();
  const [openFaq, setOpenFaq] = useState(0);
  const faqs = useMemo(() => FAQS, []);
  return (
    <aside className={styles.faq}>
      {withFaq && (
        <>
          <h3>{t({ en: 'Frequently asked', hi: 'सामान्य प्रश्न' })}</h3>
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q.en} className={`${styles.faqItem} ${open ? styles.faqOpen : ''}`}>
                <button className={styles.faqQ} onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open} aria-controls={`faq-${i}`}>
                  {t(f.q)}
                  <span aria-hidden="true">+</span>
                </button>
                <div id={`faq-${i}`} className={styles.faqA} role="region">
                  <div>
                    <p>{t(f.a)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
      <div className={styles.contactInfo}>
        <p>
          <Mail size={16} /> <a href="mailto:namaste@vedicdhaam.com">namaste@vedicdhaam.com</a>
        </p>
        <p>
          <Clock size={16} /> {t({ en: 'Every day · 6 AM – 11 PM IST', hi: 'प्रतिदिन · सुबह 6 से रात 11 बजे' })}
        </p>
      </div>
    </aside>
  );
}
