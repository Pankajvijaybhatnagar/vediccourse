'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { api } from '@/lib/api';
import { useLang } from '@/lib/i18n';
import PasswordStrength, { isStrongPassword } from './PasswordStrength';
import { authErrorMessage } from './errors';
import styles from './auth.module.css';

const EMAIL_RX = /^\S+@\S+\.\S+$/;

export function PasswordInput({ id, value, onChange, autoComplete, invalid, describedBy, placeholder }) {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  return (
    <div className={styles.pwWrap}>
      <input
        id={id}
        type={show ? 'text' : 'password'}
        className={`input ${invalid ? 'invalid' : ''}`}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        maxLength={128}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        className={styles.pwToggle}
        onClick={() => setShow((s) => !s)}
        aria-label={show ? t({ en: 'Hide password', hi: 'पासवर्ड छिपाएँ' }) : t({ en: 'Show password', hi: 'पासवर्ड दिखाएँ' })}
        aria-pressed={show}
      >
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
}

/**
 * Email sign-in and registration. `mode` is 'signin' | 'register'.
 * Calls onAuthenticated(data) with the /auth/login or /auth/register response data.
 */
export default function EmailAuthForm({ mode, onModeChange, allowRegister, onAuthenticated, onNavigate }) {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [busy, setBusy] = useState(false);
  const register = mode === 'register';

  const submit = async (e) => {
    e.preventDefault();
    const next = {};
    if (register && name.trim().length < 2) next.name = { en: 'Please enter your name.', hi: 'कृपया अपना नाम दर्ज करें।' };
    if (!EMAIL_RX.test(email.trim())) next.email = { en: 'Enter a valid email address.', hi: 'कृपया सही ईमेल दर्ज करें।' };
    if (register ? !isStrongPassword(password) : !password) {
      next.password = register
        ? { en: 'Choose a password that meets all the rules below.', hi: 'ऐसा पासवर्ड चुनें जो नीचे दिए सभी नियमों को पूरा करे।' }
        : { en: 'Enter your password.', hi: 'अपना पासवर्ड दर्ज करें।' };
    }
    setErrors(next);
    setFormError(null);
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      const path = register ? '/auth/register' : '/auth/login';
      const body = register ? { name: name.trim(), email: email.trim(), password } : { email: email.trim(), password };
      const { data } = await api(path, { method: 'POST', body, auth: false });
      onAuthenticated({ ...data, isNewUser: register });
    } catch (err) {
      setFormError(authErrorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      {register && (
        <div className={styles.field}>
          <label htmlFor="auth-name" className={styles.label}>
            {t({ en: 'Full name', hi: 'पूरा नाम' })}
          </label>
          <input
            id="auth-name"
            className={`input ${errors.name ? 'invalid' : ''}`}
            autoComplete="name"
            maxLength={80}
            value={name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'auth-name-error' : undefined}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <p className="error-text" id="auth-name-error">
              {t(errors.name)}
            </p>
          )}
        </div>
      )}

      <div className={styles.field}>
        <label htmlFor="auth-email" className={styles.label}>
          {t({ en: 'Email', hi: 'ईमेल' })}
        </label>
        <input
          id="auth-email"
          type="email"
          className={`input ${errors.email ? 'invalid' : ''}`}
          autoComplete="email"
          maxLength={254}
          value={email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'auth-email-error' : undefined}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="error-text" id="auth-email-error">
            {t(errors.email)}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <div className={styles.labelRow}>
          <label htmlFor="auth-password" className={styles.label}>
            {t({ en: 'Password', hi: 'पासवर्ड' })}
          </label>
          {!register && (
            <Link href="/forgot-password" className={styles.smallLink} onClick={onNavigate}>
              {t({ en: 'Forgot password?', hi: 'पासवर्ड भूल गए?' })}
            </Link>
          )}
        </div>
        <PasswordInput
          id="auth-password"
          value={password}
          onChange={setPassword}
          autoComplete={register ? 'new-password' : 'current-password'}
          invalid={Boolean(errors.password)}
          describedBy={register ? 'auth-pw-rules' : errors.password ? 'auth-password-error' : undefined}
        />
        {errors.password && (
          <p className="error-text" id="auth-password-error">
            {t(errors.password)}
          </p>
        )}
        {register && <PasswordStrength password={password} id="auth-pw-rules" />}
      </div>

      {formError && (
        <p className="error-text" role="alert">
          {t(formError)}
        </p>
      )}

      <button className="btn btn-primary btn-block btn-lg" disabled={busy}>
        {busy
          ? t({ en: 'Please wait…', hi: 'कृपया प्रतीक्षा करें…' })
          : register
            ? t({ en: 'Create account', hi: 'खाता बनाएँ' })
            : t({ en: 'Sign in', hi: 'साइन इन' })}
      </button>

      {allowRegister && (
        <p className={styles.switch}>
          {register ? t({ en: 'Already have an account?', hi: 'पहले से खाता है?' }) : t({ en: 'New to VedicDhaam?', hi: 'वैदिकधाम पर नए हैं?' })}{' '}
          <button type="button" className={styles.linkBtn} onClick={() => onModeChange(register ? 'signin' : 'register')}>
            {register ? t({ en: 'Sign in', hi: 'साइन इन करें' }) : t({ en: 'Create an account', hi: 'खाता बनाएँ' })}
          </button>
        </p>
      )}
    </form>
  );
}
