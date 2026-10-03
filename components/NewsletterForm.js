'use client';

import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import styles from './Footer.module.css';

export default function NewsletterForm() {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('done');
    setEmail('');
  };

  if (status === 'done') {
    return <p className={styles.success}>✦ {t({ en: "You're subscribed! Watch your inbox every Monday.", hi: 'सदस्यता सफल! हर सोमवार अपना इनबॉक्स देखें।' })}</p>;
  }

  return (
    <form className={styles.newsletter} onSubmit={submit} noValidate>
      <label htmlFor="newsletter-email" className={styles.srOnly}>
        {t({ en: 'Email address', hi: 'ईमेल पता' })}
      </label>
      <input
        id="newsletter-email"
        type="email"
        className={`input ${status === 'error' ? 'invalid' : ''}`}
        placeholder={t({ en: 'Your email', hi: 'आपका ईमेल' })}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setStatus('idle');
        }}
      />
      <button type="submit" className="btn btn-primary btn-sm">
        {t({ en: 'Subscribe', hi: 'सब्सक्राइब' })}
      </button>
      {status === 'error' && <span className="error-text">{t({ en: 'Please enter a valid email.', hi: 'कृपया सही ईमेल दर्ज करें।' })}</span>}
    </form>
  );
}
