'use client';

import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { fieldErrors } from '@/components/booking/format';
import styles from './contact.module.css';

/** Mirrors the backend's INQUIRY_TOPICS. Footer links deep-link with /contact?topic=<id>. */
export const TOPICS = [
  { id: 'general', label: { en: 'General question / About us', hi: 'सामान्य प्रश्न / हमारे बारे में' } },
  { id: 'astrologer-registration', label: { en: 'Astrologer registration', hi: 'ज्योतिषी पंजीकरण' } },
  { id: 'partnership', label: { en: 'Partner with us', hi: 'साझेदार बनें' } },
  { id: 'careers', label: { en: 'Careers', hi: 'करियर' } },
  { id: 'refund', label: { en: 'Refund or payment issue', hi: 'रिफ़ंड या भुगतान समस्या' } },
  { id: 'vastu', label: { en: 'Vastu consultation', hi: 'वास्तु परामर्श' } },
  { id: 'other', label: { en: 'Something else', hi: 'अन्य' } },
];

const tenDigits = (v) => v.replace(/\D/g, '').slice(-10);

export default function EnquiryForm({ initialTopic }) {
  const { t } = useLang();
  const { user } = useAuth();
  const [form, setForm] = useState(() => ({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    topic: TOPICS.some((x) => x.id === initialTopic) ? initialTopic : 'general',
    message: '',
    website: '', // honeypot
  }));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [formError, setFormError] = useState('');

  // The session restores after mount; fill contact details then without overwriting typed values.
  useEffect(() => {
    if (!user) return;
    setForm((f) => ({ ...f, name: f.name || user.name || '', phone: f.phone || user.phone || '', email: f.email || user.email || '' }));
  }, [user]);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    setFormError('');
    const next = {};
    if (form.name.trim().length < 2) next.name = t({ en: 'Please enter your name.', hi: 'कृपया अपना नाम दर्ज करें।' });
    const phone = tenDigits(form.phone);
    if (form.phone && !/^[6-9]\d{9}$/.test(phone)) next.phone = t({ en: 'Enter a valid 10-digit mobile number.', hi: 'सही 10 अंकों का मोबाइल नंबर दर्ज करें।' });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = t({ en: 'Enter a valid email address.', hi: 'सही ईमेल दर्ज करें।' });
    if (!form.phone && !form.email) next.phone = t({ en: 'Give us a phone number or an email to reply to.', hi: 'उत्तर के लिए फ़ोन नंबर या ईमेल दें।' });
    if (form.message.trim().length < 5) next.message = t({ en: 'Please write a short message.', hi: 'कृपया छोटा सा संदेश लिखें।' });
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('sending');
    try {
      await api('/contact', {
        method: 'POST',
        body: {
          name: form.name.trim(),
          topic: form.topic,
          message: form.message.trim(),
          ...(form.phone && { phone }),
          ...(form.email.trim() && { email: form.email.trim() }),
          ...(form.website && { website: form.website }),
        },
      });
      setStatus('sent');
    } catch (err) {
      setStatus('idle');
      if (err.status === 422) setErrors(fieldErrors(err));
      setFormError(err.status === 429 ? t({ en: 'Too many messages. Please try again later.', hi: 'बहुत अधिक संदेश। कृपया बाद में प्रयास करें।' }) : err.message);
    }
  };

  if (status === 'sent') {
    return (
      <div className={`${styles.success} fade-up`} role="status">
        <div className={styles.successIcon}>ॐ</div>
        <h2>{t({ en: 'Message received!', hi: 'संदेश प्राप्त हुआ!' })}</h2>
        <p className="muted">{t({ en: 'Thank you for writing to us. Our team usually replies within one working day.', hi: 'हमें लिखने के लिए धन्यवाद। हमारी टीम सामान्यतः एक कार्यदिवस में उत्तर देती है।' })}</p>
        <button className="btn btn-ghost" onClick={() => { setForm((f) => ({ ...f, message: '' })); setStatus('idle'); }}>
          {t({ en: 'Send another message', hi: 'एक और संदेश भेजें' })}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <h2 className={styles.formTitle}>{t({ en: 'How can we help?', hi: 'हम आपकी क्या सहायता करें?' })}</h2>
      <div className={styles.fields}>
        <div className={`field ${styles.full}`}>
          <label htmlFor="q-topic">{t({ en: 'Topic', hi: 'विषय' })}</label>
          <select id="q-topic" className="input" value={form.topic} onChange={update('topic')}>
            {TOPICS.map((x) => (
              <option key={x.id} value={x.id}>
                {t(x.label)}
              </option>
            ))}
          </select>
        </div>
        <div className={`field ${styles.full}`}>
          <label htmlFor="q-name">{t({ en: 'Full name', hi: 'पूरा नाम' })}</label>
          <input id="q-name" autoComplete="name" className={`input ${errors.name ? 'invalid' : ''}`} aria-invalid={Boolean(errors.name)} value={form.name} onChange={update('name')} maxLength={80} />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="field">
          <label htmlFor="q-phone">{t({ en: 'Mobile number', hi: 'मोबाइल नंबर' })}</label>
          <input id="q-phone" type="tel" inputMode="numeric" autoComplete="tel-national" className={`input ${errors.phone ? 'invalid' : ''}`} aria-invalid={Boolean(errors.phone)} value={form.phone} onChange={update('phone')} maxLength={14} />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>
        <div className="field">
          <label htmlFor="q-email">{t({ en: 'Email', hi: 'ईमेल' })}</label>
          <input id="q-email" type="email" autoComplete="email" className={`input ${errors.email ? 'invalid' : ''}`} aria-invalid={Boolean(errors.email)} value={form.email} onChange={update('email')} />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className={`field ${styles.full}`}>
          <label htmlFor="q-message">{t({ en: 'Message', hi: 'संदेश' })}</label>
          <textarea id="q-message" rows={5} className={`input ${errors.message ? 'invalid' : ''}`} aria-invalid={Boolean(errors.message)} value={form.message} onChange={update('message')} maxLength={5000} />
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>
        {/* Honeypot: invisible to people, irresistible to bots. */}
        <div className={styles.hp} aria-hidden="true">
          <label htmlFor="q-website">Website</label>
          <input id="q-website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
        </div>
      </div>
      {formError && (
        <p className={`error-text ${styles.formError}`} role="alert">
          {formError}
        </p>
      )}
      <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={status === 'sending'}>
        <Send size={16} /> {status === 'sending' ? t({ en: 'Sending…', hi: 'भेजा जा रहा है…' }) : t({ en: 'Send message', hi: 'संदेश भेजें' })}
      </button>
    </form>
  );
}
