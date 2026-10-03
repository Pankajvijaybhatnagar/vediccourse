'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { api } from '@/lib/api';
import { useLang } from '@/lib/i18n';
import { PasswordInput } from '@/components/auth/EmailAuthForm';
import PasswordStrength, { isStrongPassword } from '@/components/auth/PasswordStrength';
import { authErrorMessage } from '@/components/auth/errors';
import styles from '../login/login.module.css';

export default function ResetPasswordForm({ token }) {
  const { t } = useLang();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!isStrongPassword(password)) {
      setError({ en: 'Choose a password that meets all the rules.', hi: 'ऐसा पासवर्ड चुनें जो सभी नियमों को पूरा करे।' });
      return;
    }
    if (password !== confirm) {
      setError({ en: 'Passwords do not match.', hi: 'पासवर्ड मेल नहीं खाते।' });
      return;
    }
    setError(null);
    setBusy(true);
    try {
      await api('/auth/reset-password', { method: 'POST', body: { token, password }, auth: false });
      setDone(true);
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
          <h1>{t({ en: 'Set a new password', hi: 'नया पासवर्ड सेट करें' })}</h1>

          {!token ? (
            <div className={styles.notice}>
              <p className="error-text">{t({ en: 'This reset link is invalid or incomplete.', hi: 'यह रीसेट लिंक अमान्य या अधूरा है।' })}</p>
              <Link href="/forgot-password" className="btn btn-primary">
                {t({ en: 'Request a new link', hi: 'नया लिंक मँगाएँ' })}
              </Link>
            </div>
          ) : done ? (
            <div className={styles.notice} role="status">
              <CheckCircle2 size={48} aria-hidden="true" />
              <p>{t({ en: 'Your password has been reset. All devices were signed out for safety.', hi: 'आपका पासवर्ड रीसेट हो गया है। सुरक्षा हेतु सभी डिवाइस से साइन आउट कर दिया गया है।' })}</p>
              <Link href="/login?mode=email" className="btn btn-primary">
                {t({ en: 'Sign in', hi: 'साइन इन करें' })}
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <label htmlFor="rp-password">{t({ en: 'New password', hi: 'नया पासवर्ड' })}</label>
              <PasswordInput id="rp-password" value={password} onChange={setPassword} autoComplete="new-password" describedBy="rp-rules" />
              <PasswordStrength password={password} id="rp-rules" />
              <label htmlFor="rp-confirm">{t({ en: 'Confirm password', hi: 'पासवर्ड की पुष्टि करें' })}</label>
              <PasswordInput id="rp-confirm" value={confirm} onChange={setConfirm} autoComplete="new-password" invalid={Boolean(confirm) && confirm !== password} />
              {error && (
                <p className="error-text" role="alert">
                  {t(error)}
                </p>
              )}
              {error && /expired|invalid/i.test(error.en) && (
                <Link href="/forgot-password" className={styles.back}>
                  {t({ en: 'Request a new link', hi: 'नया लिंक मँगाएँ' })}
                </Link>
              )}
              <button className="btn btn-primary btn-block btn-lg" disabled={busy}>
                {busy ? t({ en: 'Saving…', hi: 'सहेजा जा रहा है…' }) : t({ en: 'Reset password', hi: 'पासवर्ड रीसेट करें' })}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
