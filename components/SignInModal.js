'use client';

import { useEffect, useRef, useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import styles from './SignInModal.module.css';

// Phone + OTP sign-in UI. There is no backend yet, so the OTP step is simulated.
export default function SignInModal({ open, onClose }) {
  const { t } = useLang();
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setStep('phone');
    setPhone('');
    setOtp('');
    setError('');
    const id = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(id);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const sendOtp = (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError(t({ en: 'Enter a valid 10-digit mobile number.', hi: 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।' }));
      return;
    }
    setError('');
    setStep('otp');
  };

  const verify = (e) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(otp)) {
      setError(t({ en: 'Enter the 4-digit OTP.', hi: '4 अंकों का OTP दर्ज करें।' }));
      return;
    }
    setError('');
    setStep('done');
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="signin-title" onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label={t({ en: 'Close', hi: 'बंद करें' })}>
          <X size={18} />
        </button>
        <div className={styles.art} aria-hidden="true">
          <span>ॐ</span>
        </div>
        <h2 id="signin-title">
          {step === 'done' ? t({ en: 'Welcome to VedicDhaam!', hi: 'वैदिकधाम में आपका स्वागत है!' }) : t({ en: 'Sign in to VedicDhaam', hi: 'वैदिकधाम में साइन इन करें' })}
        </h2>
        <p className="muted">
          {step === 'done'
            ? t({ en: 'You are signed in. Your first consultation is on us.', hi: 'आप साइन इन हो गए हैं। आपका पहला परामर्श हमारी ओर से मुफ़्त है।' })
            : t({ en: 'Get your first consultation FREE.', hi: 'अपना पहला परामर्श मुफ़्त पाएँ।' })}
        </p>

        {step === 'phone' && (
          <form onSubmit={sendOtp} noValidate>
            <label htmlFor="signin-phone" className="sr-only">
              {t({ en: 'Mobile number', hi: 'मोबाइल नंबर' })}
            </label>
            <div className={styles.phone}>
              <span>+91</span>
              <input
                ref={inputRef}
                id="signin-phone"
                inputMode="numeric"
                maxLength={10}
                className="input"
                placeholder={t({ en: 'Mobile number', hi: 'मोबाइल नंबर' })}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            {error && <p className="error-text">{error}</p>}
            <button className="btn btn-primary btn-block btn-lg">{t({ en: 'Get OTP', hi: 'OTP प्राप्त करें' })}</button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={verify} noValidate>
            <p className={styles.sent}>
              {t({ en: 'OTP sent to', hi: 'OTP भेजा गया' })} +91 {phone}{' '}
              <button type="button" onClick={() => setStep('phone')}>
                {t({ en: 'Change', hi: 'बदलें' })}
              </button>
            </p>
            <label htmlFor="signin-otp" className="sr-only">
              OTP
            </label>
            <input
              id="signin-otp"
              autoFocus
              inputMode="numeric"
              maxLength={4}
              className={`input ${styles.otp}`}
              placeholder="• • • •"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            />
            {error && <p className="error-text">{error}</p>}
            <button className="btn btn-primary btn-block btn-lg">{t({ en: 'Verify & Continue', hi: 'सत्यापित करें' })}</button>
          </form>
        )}

        {step === 'done' && (
          <button className="btn btn-primary btn-block btn-lg" onClick={onClose}>
            {t({ en: 'Start Exploring', hi: 'शुरू करें' })}
          </button>
        )}

        <p className={styles.secure}>
          <ShieldCheck size={14} /> {t({ en: '100% private & secure', hi: '100% निजी और सुरक्षित' })}
        </p>
      </div>
    </div>
  );
}
