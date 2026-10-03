'use client';

import { useState } from 'react';
import { Mail, Smartphone, ShieldCheck } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { useLang } from '@/lib/i18n';
import PhoneOtpForm from './PhoneOtpForm';
import EmailAuthForm from './EmailAuthForm';
import SocialButtons, { hasSocial } from './SocialButtons';
import { authErrorMessage } from './errors';
import styles from './auth.module.css';

function NameStep({ user, onDone }) {
  const { t } = useLang();
  const { setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError({ en: 'Please enter your name.', hi: 'कृपया अपना नाम दर्ज करें।' });
      return;
    }
    setBusy(true);
    try {
      const { data } = await api('/users/me', { method: 'PATCH', body: { name: name.trim() } });
      setUser(data);
      onDone(data);
    } catch (err) {
      setError(authErrorMessage(err));
      setBusy(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={save} noValidate>
      <p className={styles.welcome}>{t({ en: 'Welcome! What should we call you?', hi: 'स्वागत है! हम आपको किस नाम से पुकारें?' })}</p>
      <label htmlFor="auth-newname" className={styles.label}>
        {t({ en: 'Your name', hi: 'आपका नाम' })}
      </label>
      <input
        id="auth-newname"
        autoFocus
        className={`input ${error ? 'invalid' : ''}`}
        autoComplete="name"
        maxLength={80}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {error && (
        <p className="error-text" role="alert">
          {t(error)}
        </p>
      )}
      <button className="btn btn-primary btn-block btn-lg" disabled={busy}>
        {t({ en: 'Continue', hi: 'आगे बढ़ें' })}
      </button>
      <button type="button" className={styles.linkBtn} onClick={() => onDone(user)}>
        {t({ en: 'Skip for now', hi: 'अभी छोड़ें' })}
      </button>
    </form>
  );
}

/**
 * Complete sign-in UI shared by the modal and the /login page.
 * Shows only the methods enabled in GET /auth/providers.
 *
 * @param {object}   props
 * @param {(user) => void} props.onSuccess   after sign-in (and the optional name step)
 * @param {'phone'|'email'|'register'} [props.initialMode]
 * @param {() => void} [props.onNavigate]    called when a link leaves the form (e.g. to close the modal)
 */
export default function AuthForm({ onSuccess, initialMode, onNavigate }) {
  const { t } = useLang();
  const { providers, completeSignIn } = useAuth();
  const phoneOn = providers?.phoneOtp?.enabled;
  const emailOn = providers?.emailPassword?.enabled;
  const canRegister = Boolean(providers?.registration);

  const [tab, setTab] = useState(initialMode === 'email' || initialMode === 'register' ? 'email' : 'phone');
  const [emailMode, setEmailMode] = useState(initialMode === 'register' ? 'register' : 'signin');
  const [pendingUser, setPendingUser] = useState(null);
  const [socialBusy, setSocialBusy] = useState(false);
  const [socialError, setSocialError] = useState(null);

  if (!providers) {
    return (
      <div className={styles.skeleton} aria-busy="true" aria-label={t({ en: 'Loading sign-in options', hi: 'साइन-इन विकल्प लोड हो रहे हैं' })}>
        <span />
        <span />
        <span />
      </div>
    );
  }

  const activeTab = tab === 'phone' && !phoneOn ? 'email' : tab === 'email' && !emailOn ? 'phone' : tab;

  const authenticated = (data) => {
    completeSignIn(data);
    if (data.isNewUser && !data.user?.name) setPendingUser(data.user);
    else onSuccess?.(data.user);
  };

  const onSocialToken = async (provider, payload, sdkError) => {
    setSocialError(null);
    if (sdkError || !payload) {
      setSocialError({ en: 'Sign-in was not completed. Please try again.', hi: 'साइन-इन पूरा नहीं हुआ। कृपया पुनः प्रयास करें।' });
      return;
    }
    setSocialBusy(true);
    try {
      const { data } = await api(`/auth/social/${provider}`, { method: 'POST', body: payload, auth: false });
      authenticated(data);
    } catch (err) {
      setSocialError(authErrorMessage(err));
    } finally {
      setSocialBusy(false);
    }
  };

  if (pendingUser) return <NameStep user={pendingUser} onDone={(u) => onSuccess?.(u)} />;

  if (!phoneOn && !emailOn && !hasSocial(providers)) {
    return <p className="muted">{t({ en: 'Sign-in is temporarily unavailable. Please try again later.', hi: 'साइन-इन अस्थायी रूप से उपलब्ध नहीं है। कृपया बाद में प्रयास करें।' })}</p>;
  }

  return (
    <div className={styles.authForm}>
      {phoneOn && emailOn && (
        <div className={styles.tabs} role="tablist" aria-label={t({ en: 'Sign-in method', hi: 'साइन-इन विधि' })}>
          <button
            type="button"
            role="tab"
            id="auth-tab-phone"
            aria-selected={activeTab === 'phone'}
            aria-controls="auth-panel"
            className={activeTab === 'phone' ? styles.tabOn : ''}
            onClick={() => setTab('phone')}
          >
            <Smartphone size={16} aria-hidden="true" /> {t({ en: 'Mobile OTP', hi: 'मोबाइल OTP' })}
          </button>
          <button
            type="button"
            role="tab"
            id="auth-tab-email"
            aria-selected={activeTab === 'email'}
            aria-controls="auth-panel"
            className={activeTab === 'email' ? styles.tabOn : ''}
            onClick={() => setTab('email')}
          >
            <Mail size={16} aria-hidden="true" /> {t({ en: 'Email', hi: 'ईमेल' })}
          </button>
        </div>
      )}

      <div id="auth-panel" role={phoneOn && emailOn ? 'tabpanel' : undefined} aria-labelledby={phoneOn && emailOn ? `auth-tab-${activeTab}` : undefined}>
        {activeTab === 'phone' && phoneOn && <PhoneOtpForm config={providers.phoneOtp} onAuthenticated={authenticated} />}
        {activeTab === 'email' && emailOn && (
          <EmailAuthForm
            mode={emailMode}
            onModeChange={setEmailMode}
            allowRegister={canRegister}
            onAuthenticated={authenticated}
            onNavigate={onNavigate}
          />
        )}
      </div>

      {hasSocial(providers) && (
        <>
          {(phoneOn || emailOn) && (
            <div className={styles.divider}>
              <span>{t({ en: 'or', hi: 'या' })}</span>
            </div>
          )}
          <SocialButtons providers={providers} onToken={onSocialToken} disabled={socialBusy} />
          {socialError && (
            <p className="error-text" role="alert">
              {t(socialError)}
            </p>
          )}
        </>
      )}

      <p className={styles.secure}>
        <ShieldCheck size={14} aria-hidden="true" /> {t({ en: '100% private & secure', hi: '100% निजी और सुरक्षित' })}
      </p>
      <p className={styles.terms}>
        {t({
          en: 'By continuing you agree to our Terms and Privacy Policy.',
          hi: 'आगे बढ़कर आप हमारी शर्तों और गोपनीयता नीति से सहमत होते हैं।',
        })}
      </p>
    </div>
  );
}
