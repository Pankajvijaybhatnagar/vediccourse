'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MailCheck } from 'lucide-react';
import { api } from '@/lib/api';
import { useLang } from '@/lib/i18n';
import { authErrorMessage } from '@/components/auth/errors';
import styles from '../login/login.module.css';

export default function ForgotPasswordForm() {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError({ en: 'Enter a valid email address.', hi: 'कृपया सही ईमेल दर्ज करें।' });
      return;
    }
    setError(null);
    setBusy(true);
    try {
      await api('/auth/forgot-password', { method: 'POST', body: { email: email.trim() }, auth: false });
      setSent(true);
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={`${styles.wrap} page-top`}>
      <div className="container">
        <div className={styles.single}>
          <h1>{t({ en: 'Forgot your password?', hi: 'पासवर्ड भूल गए?' })}</h1>
          {sent ? (
            <div className={styles.notice} role="status">
              <MailCheck size={48} aria-hidden="true" />
              <p>
                {t({
                  en: 'If an account exists for this email, we have sent a reset link. It is valid for 30 minutes. Check your spam folder too.',
                  hi: 'यदि इस ईमेल से खाता है, तो हमने रीसेट लिंक भेज दिया है। यह 30 मिनट तक मान्य है। स्पैम फ़ोल्डर भी देखें।',
                })}
              </p>
              <Link href="/login?mode=email" className="btn btn-primary">
                {t({ en: 'Back to sign in', hi: 'साइन इन पर वापस' })}
              </Link>
            </div>
          ) : (
            <>
              <p className="muted">{t({ en: "Enter your account email and we'll send you a link to set a new password.", hi: 'अपना खाता ईमेल दर्ज करें, हम नया पासवर्ड सेट करने का लिंक भेजेंगे।' })}</p>
              <form onSubmit={submit} noValidate>
                <label htmlFor="fp-email">{t({ en: 'Email', hi: 'ईमेल' })}</label>
                <input
                  id="fp-email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                  className={`input ${error ? 'invalid' : ''}`}
                  value={email}
                  aria-invalid={Boolean(error)}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {error && (
                  <p className="error-text" role="alert">
                    {t(error)}
                  </p>
                )}
                <button className="btn btn-primary btn-block btn-lg" disabled={busy}>
                  {busy ? t({ en: 'Sending…', hi: 'भेजा जा रहा है…' }) : t({ en: 'Send reset link', hi: 'रीसेट लिंक भेजें' })}
                </button>
              </form>
              <p className={styles.back}>
                <Link href="/login?mode=email">{t({ en: '← Back to sign in', hi: '← साइन इन पर वापस' })}</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
