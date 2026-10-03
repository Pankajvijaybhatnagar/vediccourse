'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MessageCircle, PhoneCall, Video, Mail, Clock, Check } from 'lucide-react';
import { ASTROLOGERS, getAstrologer } from '@/lib/astrologers';
import { useLang } from '@/lib/i18n';
import styles from './contact.module.css';

const PLANS = [
  { id: 'essential', name: { en: 'Essential', hi: 'बेसिक' }, price: 499, duration: { en: '20 min', hi: '20 मिनट' }, features: [{ en: 'Lagna, Rashi & Nakshatra overview', hi: 'लग्न, राशि और नक्षत्र का परिचय' }, { en: 'One focus question', hi: 'एक मुख्य प्रश्न' }, { en: 'Simple remedies', hi: 'सरल उपाय' }] },
  { id: 'signature', name: { en: 'Complete Kundli', hi: 'संपूर्ण कुंडली' }, price: 999, duration: { en: '45 min', hi: '45 मिनट' }, popular: true, features: [{ en: 'Full Janam Kundli analysis', hi: 'पूर्ण जन्म कुंडली विश्लेषण' }, { en: 'Career, marriage & finance', hi: 'करियर, विवाह और धन' }, { en: 'Mahadasha & yearly forecast', hi: 'महादशा और वार्षिक भविष्यफल' }, { en: 'Personalised remedies', hi: 'व्यक्तिगत उपाय' }] },
  { id: 'matching', name: { en: 'Kundli Milan', hi: 'कुंडली मिलान' }, price: 1499, duration: { en: '60 min', hi: '60 मिनट' }, features: [{ en: 'Ashtakoot Guna Milan (36 gunas)', hi: 'अष्टकूट गुण मिलान (36 गुण)' }, { en: 'Manglik & dosha check', hi: 'मांगलिक और दोष जाँच' }, { en: 'Muhurat suggestion', hi: 'शुभ मुहूर्त सुझाव' }, { en: 'Follow-up Q&A', hi: 'बाद में प्रश्नोत्तर' }] },
];

const MODES = [
  { id: 'chat', Icon: MessageCircle, label: { en: 'Chat', hi: 'चैट' } },
  { id: 'call', Icon: PhoneCall, label: { en: 'Call', hi: 'कॉल' } },
  { id: 'video', Icon: Video, label: { en: 'Video', hi: 'वीडियो' } },
];

const FAQS = [
  { q: { en: 'Do I need my exact birth time?', hi: 'क्या सही जन्म समय ज़रूरी है?' }, a: { en: 'An exact time gives the most precise Lagna and house placements, but we can still give a rich reading with just your birth date.', hi: 'सही समय से लग्न और भाव सबसे सटीक होते हैं, पर केवल जन्म तिथि से भी अच्छा विश्लेषण संभव है।' } },
  { q: { en: 'Which languages are available?', hi: 'कौन-सी भाषाएँ उपलब्ध हैं?' }, a: { en: 'Consultations are available in Hindi and English, and many astrologers also speak Punjabi, Marathi, Gujarati or Bengali.', hi: 'परामर्श हिंदी और अंग्रेज़ी में उपलब्ध है, और कई ज्योतिषी पंजाबी, मराठी, गुजराती या बांग्ला भी बोलते हैं।' } },
  { q: { en: 'Can I reschedule?', hi: 'क्या समय बदला जा सकता है?' }, a: { en: 'Yes, free of charge up to 24 hours before your session.', hi: 'हाँ, सत्र से 24 घंटे पहले तक बिना शुल्क के।' } },
  { q: { en: 'Is astrology a substitute for professional advice?', hi: 'क्या ज्योतिष पेशेवर सलाह का विकल्प है?' }, a: { en: 'No. Readings are for guidance and reflection and do not replace medical, legal or financial advice.', hi: 'नहीं। परामर्श मार्गदर्शन के लिए है, यह चिकित्सा, कानूनी या वित्तीय सलाह का विकल्प नहीं है।' } },
];

const EMPTY = { name: '', phone: '', email: '', dob: '', preferred: '', message: '' };

export default function ContactClient() {
  const { t } = useLang();
  const params = useSearchParams();
  const preset = getAstrologer(Number(params.get('astro')));
  const [plan, setPlan] = useState('signature');
  const [mode, setMode] = useState(MODES.some((m) => m.id === params.get('mode')) ? params.get('mode') : 'call');
  const [astroId, setAstroId] = useState(preset ? String(preset.id) : 'any');
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [openFaq, setOpenFaq] = useState(0);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (form.name.trim().length < 2) next.name = { en: 'Please enter your name.', hi: 'कृपया अपना नाम दर्ज करें।' };
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10))) next.phone = { en: 'Please enter a valid 10-digit mobile number.', hi: 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।' };
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = { en: 'Please enter a valid email address.', hi: 'कृपया सही ईमेल दर्ज करें।' };
    if (!form.preferred) next.preferred = { en: 'Please choose a preferred date.', hi: 'कृपया पसंदीदा तिथि चुनें।' };
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1000);
  };

  const selected = PLANS.find((p) => p.id === plan);
  const astro = getAstrologer(Number(astroId));
  const todayIso = new Date().toISOString().slice(0, 10);
  const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.plans} role="radiogroup" aria-label={t({ en: 'Choose a session', hi: 'सत्र चुनें' })}>
          {PLANS.map((p) => (
            <button key={p.id} role="radio" aria-checked={plan === p.id} className={`card ${styles.plan} ${plan === p.id ? styles.planActive : ''}`} onClick={() => setPlan(p.id)}>
              {p.popular && <span className={styles.badge}>{t({ en: 'Most popular', hi: 'सबसे लोकप्रिय' })}</span>}
              <span className={styles.planName}>{t(p.name)}</span>
              <span className={styles.price}>{inr(p.price)}</span>
              <span className={styles.duration}>
                <Clock size={14} /> {t(p.duration)}
              </span>
              <ul>
                {p.features.map((f) => (
                  <li key={f.en}>
                    <Check size={15} /> {t(f)}
                  </li>
                ))}
              </ul>
              <span className={styles.check} aria-hidden="true">
                {plan === p.id ? `✓ ${t({ en: 'Selected', hi: 'चुना गया' })}` : t({ en: 'Select', hi: 'चुनें' })}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.layout}>
          <div className={`card card-glow ${styles.formCard}`}>
            {status === 'sent' ? (
              <div className={`${styles.success} fade-up`}>
                <div className={styles.successIcon}>ॐ</div>
                <h2>{t({ en: 'Your consultation is booked!', hi: 'आपका परामर्श बुक हो गया!' })}</h2>
                <p className="muted">
                  {t({
                    en: `Thank you, ${form.name.split(' ')[0]}. Your ${selected.name.en} session${astro ? ` with ${astro.name.en}` : ''} is reserved. We will confirm the time on +91 ${form.phone.slice(-10)}.`,
                    hi: `धन्यवाद, ${form.name.split(' ')[0]}। आपका ${selected.name.hi} सत्र${astro ? ` ${astro.name.hi} के साथ` : ''} आरक्षित है। हम +91 ${form.phone.slice(-10)} पर समय की पुष्टि करेंगे।`,
                  })}
                </p>
                <button className="btn btn-ghost" onClick={() => { setForm(EMPTY); setStatus('idle'); }}>
                  {t({ en: 'Book another session', hi: 'एक और सत्र बुक करें' })}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 className={styles.formTitle}>
                  <span className="gold-text">{t(selected.name)}</span> · {inr(selected.price)}
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
                      {ASTROLOGERS.map((a) => (
                        <option key={a.id} value={a.id}>
                          {t(a.name)} · {t(a.title)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="c-name">{t({ en: 'Full name', hi: 'पूरा नाम' })}</label>
                    <input id="c-name" className={`input ${errors.name ? 'invalid' : ''}`} value={form.name} onChange={update('name')} />
                    {errors.name && <span className="error-text">{t(errors.name)}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="c-phone">{t({ en: 'Mobile number', hi: 'मोबाइल नंबर' })}</label>
                    <input id="c-phone" type="tel" inputMode="numeric" placeholder="98XXXXXXXX" className={`input ${errors.phone ? 'invalid' : ''}`} value={form.phone} onChange={update('phone')} />
                    {errors.phone && <span className="error-text">{t(errors.phone)}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="c-email">{t({ en: 'Email (optional)', hi: 'ईमेल (वैकल्पिक)' })}</label>
                    <input id="c-email" type="email" className={`input ${errors.email ? 'invalid' : ''}`} value={form.email} onChange={update('email')} />
                    {errors.email && <span className="error-text">{t(errors.email)}</span>}
                  </div>
                  <div className="field">
                    <label htmlFor="c-dob">{t({ en: 'Date of birth', hi: 'जन्म तिथि' })}</label>
                    <input id="c-dob" type="date" className="input" value={form.dob} onChange={update('dob')} />
                  </div>
                  <div className={`field ${styles.full}`}>
                    <label htmlFor="c-pref">{t({ en: 'Preferred session date', hi: 'पसंदीदा सत्र तिथि' })}</label>
                    <input id="c-pref" type="date" min={todayIso} suppressHydrationWarning className={`input ${errors.preferred ? 'invalid' : ''}`} value={form.preferred} onChange={update('preferred')} />
                    {errors.preferred && <span className="error-text">{t(errors.preferred)}</span>}
                  </div>
                  <div className={`field ${styles.full}`}>
                    <label htmlFor="c-msg">{t({ en: 'What would you like guidance on?', hi: 'आप किस विषय पर मार्गदर्शन चाहते हैं?' })}</label>
                    <textarea id="c-msg" className="input" value={form.message} onChange={update('message')} placeholder={t({ en: 'Career, marriage, health, a big decision…', hi: 'करियर, विवाह, स्वास्थ्य, कोई बड़ा निर्णय…' })} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
                  {status === 'sending' ? t({ en: 'Booking your session…', hi: 'सत्र बुक हो रहा है…' }) : `${t({ en: 'Book Now', hi: 'अभी बुक करें' })} · ${inr(selected.price)}`}
                </button>
              </form>
            )}
          </div>

          <aside className={styles.faq}>
            <h3>{t({ en: 'Frequently asked', hi: 'सामान्य प्रश्न' })}</h3>
            {FAQS.map((f, i) => {
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
            <div className={styles.contactInfo}>
              <p>
                <Mail size={16} /> namaste@vedicdhaam.com
              </p>
              <p>
                <Clock size={16} /> {t({ en: 'Every day · 6 AM – 11 PM IST', hi: 'प्रतिदिन · सुबह 6 से रात 11 बजे' })}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
