'use client';

import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { api } from '@/lib/api';
import styles from './Footer.module.css';

export default function NewsletterForm() {
  const { t, lang } = useLang();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | done | invalid | error
  const [message, setMessage] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const value = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      setStatus('invalid');
      return;
    }
    setStatus('sending');
    try {
      await api('/newsletter/subscribe', { method: 'POST', body: { email: value, language: lang, source: 'footer' }, auth: false });
      setStatus('done');
      setEmail('');
    } catch (err) {
      setStatus(err.status === 422 ? 'invalid' : 'error');
      setMessage(err.status === 429 ? t({ en: 'Too many attempts. Please try again later.', hi: 'बहुत अधिक प्रयास। कृपया बाद में प्रयास करें।' }) : err.message);
    }
  };

  if (status === 'done') {
    return (
      <p className={styles.success} role="status">
        ✦ {t({ en: "You're subscribed! Watch your inbox every Monday.", hi: 'सदस्यता सफल! हर सोमवार अपना इनबॉक्स देखें।' })}
      </p>
    );
  }

  return (
    <form className={styles.newsletter} onSubmit={submit} noValidate>
      <label htmlFor="newsletter-email" className={styles.srOnly}>
        {t({ en: 'Email address', hi: 'ईमेल पता' })}
      </label>
      <input
        id="newsletter-email"
        type="email"
        autoComplete="email"
        className={`input ${status === 'invalid' ? 'invalid' : ''}`}
        aria-invalid={status === 'invalid'}
        placeholder={t({ en: 'Your email', hi: 'आपका ईमेल' })}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status !== 'sending') setStatus('idle');
        }}
      />
      <button type="submit" className="btn btn-primary btn-sm" disabled={status === 'sending'}>
        {status === 'sending' ? t({ en: 'Subscribing…', hi: 'सब्सक्राइब हो रहा है…' }) : t({ en: 'Subscribe', hi: 'सब्सक्राइब' })}
      </button>
      {status === 'invalid' && (
        <span className="error-text" role="alert">
          {t({ en: 'Please enter a valid email.', hi: 'कृपया सही ईमेल दर्ज करें।' })}
        </span>
      )}
      {status === 'error' && (
        <span className="error-text" role="alert">
          {message}
        </span>
      )}
    </form>
  );
}
