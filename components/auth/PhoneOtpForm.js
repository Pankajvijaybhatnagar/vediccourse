'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageSquareText, Smartphone } from 'lucide-react';
import { api } from '@/lib/api';
import { useLang } from '@/lib/i18n';
import { authErrorMessage } from './errors';
import styles from './auth.module.css';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1c-.2.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3z"
    />
  </svg>
);

/**
 * Phone + OTP sign-in. `config` is providers.phoneOtp from GET /auth/providers.
 * Calls onAuthenticated(data) with the /auth/otp/verify response data.
 */
export default function PhoneOtpForm({ config, onAuthenticated, autoFocus = true }) {
  const { t } = useLang();
  const length = config?.length || 4;
  const [step, setStep] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [channel, setChannel] = useState(config?.defaultChannel || 'sms');
  const [sentVia, setSentVia] = useState(null);
  const [devOtp, setDevOtp] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const phoneRef = useRef(null);
  const otpRef = useRef(null);

  useEffect(() => {
    if (autoFocus) (step === 'phone' ? phoneRef : otpRef).current?.focus();
  }, [step, autoFocus]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const send = async (e) => {
    e?.preventDefault();
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError({ en: 'Enter a valid 10-digit mobile number.', hi: 'कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।' });
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const body = { phone, ...(config?.allowChoice && { channel }) };
      const { data } = await api('/auth/otp/send', { method: 'POST', body, auth: false });
      setSentVia(data.channel);
      setDevOtp(data.devOtp || ''); // only a local backend with OTP_DEV_ECHO=true returns this
      setCooldown(data.resendInSeconds ?? 30);
      setOtp('');
      setStep('otp');
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const verify = async (e) => {
    e.preventDefault();
    if (!new RegExp(`^\\d{${length}}$`).test(otp)) {
      setError({ en: `Enter the ${length}-digit OTP.`, hi: `${length} अंकों का OTP दर्ज करें।` });
      return;
    }
    setError(null);
    setBusy(true);
    try {
      const { data } = await api('/auth/otp/verify', { method: 'POST', body: { phone, otp }, auth: false });
      onAuthenticated(data);
    } catch (err) {
      setError(authErrorMessage(err));
      if (err.code === 'OTP_EXPIRED' || err.code === 'OTP_LOCKED') setOtp('');
    } finally {
      setBusy(false);
    }
  };

  if (step === 'phone') {
    return (
      <form className={styles.form} onSubmit={send} noValidate>
        <label htmlFor="auth-phone" className={styles.label}>
          {t({ en: 'Mobile number', hi: 'मोबाइल नंबर' })}
        </label>
        <div className={styles.phone}>
          <span aria-hidden="true">+{config?.countryCode || '91'}</span>
          <input
            ref={phoneRef}
            id="auth-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={10}
            className={`input ${error ? 'invalid' : ''}`}
            placeholder="98XXXXXXXX"
            value={phone}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'auth-phone-error' : undefined}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
          />
        </div>

        {config?.allowChoice && config.channels?.length > 1 && (
          <fieldset className={styles.channels}>
            <legend className={styles.label}>{t({ en: 'Send code via', hi: 'कोड भेजें' })}</legend>
            <div role="radiogroup">
              {config.channels.map((c) => (
                <label key={c} className={`${styles.channel} ${channel === c ? styles.channelOn : ''}`}>
                  <input type="radio" name="otp-channel" value={c} checked={channel === c} onChange={() => setChannel(c)} />
                  {c === 'whatsapp' ? <WhatsAppIcon /> : <MessageSquareText size={16} aria-hidden="true" />}
                  {c === 'whatsapp' ? 'WhatsApp' : 'SMS'}
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {error && (
          <p className="error-text" id="auth-phone-error" role="alert">
            {t(error)}
          </p>
        )}
        <button className="btn btn-primary btn-block btn-lg" disabled={busy}>
          {busy ? t({ en: 'Sending…', hi: 'भेजा जा रहा है…' }) : t({ en: 'Get OTP', hi: 'OTP प्राप्त करें' })}
        </button>
      </form>
    );
  }

  return (
    <form className={styles.form} onSubmit={verify} noValidate>
      <p className={styles.sent}>
        {sentVia === 'whatsapp' ? <WhatsAppIcon /> : <Smartphone size={15} aria-hidden="true" />}
        <span>
          {sentVia === 'whatsapp'
            ? t({ en: 'Code sent on WhatsApp to', hi: 'WhatsApp पर कोड भेजा गया' })
            : t({ en: 'Code sent by SMS to', hi: 'SMS से कोड भेजा गया' })}{' '}
          <b>+{config?.countryCode || '91'} {phone}</b>
        </span>
        <button type="button" className={styles.linkBtn} onClick={() => { setStep('phone'); setError(null); }}>
          {t({ en: 'Change', hi: 'बदलें' })}
        </button>
      </p>
      <label htmlFor="auth-otp" className={styles.label}>
        {t({ en: 'Enter OTP', hi: 'OTP दर्ज करें' })}
      </label>
      <input
        ref={otpRef}
        id="auth-otp"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={length}
        className={`input ${styles.otp} ${error ? 'invalid' : ''}`}
        placeholder={'•'.repeat(length).split('').join(' ')}
        value={otp}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'auth-otp-error' : undefined}
        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, length))}
      />
      {devOtp && (
        <p className={styles.devHint}>
          {t({ en: 'Development code:', hi: 'डेवलपमेंट कोड:' })} <b>{devOtp}</b>
        </p>
      )}
      {error && (
        <p className="error-text" id="auth-otp-error" role="alert">
          {t(error)}
        </p>
      )}
      <button className="btn btn-primary btn-block btn-lg" disabled={busy}>
        {busy ? t({ en: 'Verifying…', hi: 'सत्यापित हो रहा है…' }) : t({ en: 'Verify & Continue', hi: 'सत्यापित करें' })}
      </button>
      <p className={styles.resend}>
        {cooldown > 0 ? (
          t({ en: `Resend code in ${cooldown}s`, hi: `${cooldown} सेकंड में पुनः भेजें` })
        ) : (
          <button type="button" className={styles.linkBtn} onClick={send} disabled={busy}>
            {t({ en: "Didn't get it? Resend code", hi: 'कोड नहीं मिला? पुनः भेजें' })}
          </button>
        )}
      </p>
    </form>
  );
}
