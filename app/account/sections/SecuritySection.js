'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Laptop, LogOut, ShieldAlert, Smartphone } from 'lucide-react';
import { api, setAccessToken } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { useLang } from '@/lib/i18n';
import { PasswordInput } from '@/components/auth/EmailAuthForm';
import PasswordStrength, { isStrongPassword } from '@/components/auth/PasswordStrength';
import SocialButtons from '@/components/auth/SocialButtons';
import { authErrorMessage } from '@/components/auth/errors';
import { ConfirmButton, ErrorState, ListSkeleton, Notice, formatDateTime } from '../ui';
import styles from '../account.module.css';

/** "Chrome on Windows" from a user-agent string (best effort, display only). */
function deviceLabel(ua = '') {
  const browser = /Edg\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /Chrome\//.test(ua) ? 'Chrome' : /Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : /curl|node|okhttp|Dart/i.test(ua) ? 'App / API' : 'Browser';
  const os = /Windows/.test(ua) ? 'Windows' : /Android/.test(ua) ? 'Android' : /iPhone|iPad|iOS/.test(ua) ? 'iOS' : /Mac OS X/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : '';
  return { text: os ? `${browser} · ${os}` : browser, mobile: /Android|iPhone|iPad|Mobile/.test(ua) };
}

function PasswordCard({ hasPassword, onChanged }) {
  const { t } = useLang();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (hasPassword && !current) return setNotice({ type: 'error', text: { en: 'Enter your current password.', hi: 'अपना वर्तमान पासवर्ड दर्ज करें।' } });
    if (!isStrongPassword(next)) return setNotice({ type: 'error', text: { en: 'Choose a password that meets all the rules.', hi: 'ऐसा पासवर्ड चुनें जो सभी नियमों को पूरा करे।' } });
    if (next !== confirm) return setNotice({ type: 'error', text: { en: 'Passwords do not match.', hi: 'पासवर्ड मेल नहीं खाते।' } });
    setBusy(true);
    setNotice(null);
    try {
      const { data } = await api('/auth/change-password', { method: 'PATCH', body: { ...(hasPassword && { currentPassword: current }), newPassword: next } });
      setAccessToken(data.accessToken); // other sessions were revoked; this device gets fresh tokens
      setCurrent('');
      setNext('');
      setConfirm('');
      setNotice({ type: 'ok', text: { en: 'Password updated. Other devices have been signed out.', hi: 'पासवर्ड अपडेट हो गया। अन्य डिवाइस से साइन आउट कर दिया गया है।' } });
      onChanged();
    } catch (err) {
      setNotice({ type: 'error', text: authErrorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={styles.card}>
      <h3>{hasPassword ? t({ en: 'Change password', hi: 'पासवर्ड बदलें' }) : t({ en: 'Set a password', hi: 'पासवर्ड सेट करें' })}</h3>
      {!hasPassword && <p className="muted">{t({ en: 'Add a password to also sign in with your email.', hi: 'ईमेल से भी साइन इन करने के लिए पासवर्ड जोड़ें।' })}</p>}
      <form className={styles.form} onSubmit={submit} noValidate>
        {hasPassword && (
          <div className={styles.field}>
            <label htmlFor="sec-current">{t({ en: 'Current password', hi: 'वर्तमान पासवर्ड' })}</label>
            <PasswordInput id="sec-current" value={current} onChange={setCurrent} autoComplete="current-password" />
          </div>
        )}
        <div className={styles.field}>
          <label htmlFor="sec-new">{t({ en: 'New password', hi: 'नया पासवर्ड' })}</label>
          <PasswordInput id="sec-new" value={next} onChange={setNext} autoComplete="new-password" describedBy="sec-rules" />
          <PasswordStrength password={next} id="sec-rules" />
        </div>
        <div className={styles.field}>
          <label htmlFor="sec-confirm">{t({ en: 'Confirm new password', hi: 'नए पासवर्ड की पुष्टि करें' })}</label>
          <PasswordInput id="sec-confirm" value={confirm} onChange={setConfirm} autoComplete="new-password" invalid={Boolean(confirm) && confirm !== next} />
        </div>
        <Notice notice={notice} />
        <div>
          <button className="btn btn-primary btn-sm" disabled={busy}>
            {busy ? t({ en: 'Saving…', hi: 'सहेजा जा रहा है…' }) : hasPassword ? t({ en: 'Update password', hi: 'पासवर्ड अपडेट करें' }) : t({ en: 'Set password', hi: 'पासवर्ड सेट करें' })}
          </button>
        </div>
      </form>
    </section>
  );
}

function SessionsCard({ onSignedOutEverywhere }) {
  const { t, lang } = useLang();
  const [sessions, setSessions] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);

  const load = useCallback(async () => {
    setStatus('loading');
    try {
      const { data } = await api('/auth/sessions');
      setSessions(data);
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const revoke = async (id) => {
    try {
      await api(`/auth/sessions/${id}`, { method: 'DELETE' });
      setSessions((list) => list.filter((s) => s.id !== id));
    } catch (err) {
      setNotice({ type: 'error', text: authErrorMessage(err) });
    }
  };

  const signOutAll = async () => {
    try {
      await api('/auth/logout-all', { method: 'POST' });
      onSignedOutEverywhere();
    } catch (err) {
      setNotice({ type: 'error', text: authErrorMessage(err) });
    }
  };

  return (
    <section className={styles.card}>
      <h3>{t({ en: 'Where you are signed in', hi: 'आप कहाँ साइन इन हैं' })}</h3>
      {status === 'loading' && <ListSkeleton rows={2} />}
      {status === 'error' && <ErrorState error={error} onRetry={load} />}
      {status === 'ready' && (
        <ul className={styles.sessions}>
          {sessions.map((s) => {
            const d = deviceLabel(s.userAgent);
            const Icon = d.mobile ? Smartphone : Laptop;
            return (
              <li key={s.id}>
                <Icon size={20} aria-hidden="true" />
                <div>
                  <strong>
                    {d.text} {s.current && <span className={styles.current}>{t({ en: 'This device', hi: 'यह डिवाइस' })}</span>}
                  </strong>
                  <small>
                    {t({ en: 'Last active', hi: 'अंतिम सक्रिय' })}: {formatDateTime(s.lastActiveAt, lang)}
                    {s.ip ? ` · ${s.ip}` : ''}
                  </small>
                </div>
                {!s.current && (
                  <ConfirmButton onConfirm={() => revoke(s.id)} confirmLabel={t({ en: 'Confirm', hi: 'पुष्टि करें' })}>
                    {t({ en: 'Sign out', hi: 'साइन आउट' })}
                  </ConfirmButton>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <Notice notice={notice} />
      <div>
        <ConfirmButton onConfirm={signOutAll} className="btn btn-ghost btn-sm" confirmLabel={t({ en: 'Sign out of every device?', hi: 'सभी डिवाइस से साइन आउट करें?' })}>
          <LogOut size={15} aria-hidden="true" /> {t({ en: 'Sign out of all devices', hi: 'सभी डिवाइस से साइन आउट करें' })}
        </ConfirmButton>
      </div>
    </section>
  );
}

const PROVIDER_NAMES = { google: 'Google', facebook: 'Facebook', apple: 'Apple' };

function LinkedAccountsCard({ me, onChange }) {
  const { t } = useLang();
  const { providers, setUser } = useAuth();
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);
  const enabled = Object.keys(PROVIDER_NAMES).filter((p) => providers?.[p]?.enabled);
  if (!enabled.length) return null;

  const linked = new Set((me.socialAccounts || []).map((a) => a.provider));
  const unlinkedProviders = Object.fromEntries(enabled.filter((p) => !linked.has(p)).map((p) => [p, providers[p]]));

  const link = async (provider, payload, sdkError) => {
    if (sdkError || !payload) return setNotice({ type: 'error', text: { en: 'Linking was not completed.', hi: 'लिंक करना पूरा नहीं हुआ।' } });
    setBusy(true);
    setNotice(null);
    try {
      const { data } = await api(`/auth/social/${provider}/link`, { method: 'POST', body: payload });
      setUser(data);
      onChange();
      setNotice({ type: 'ok', text: { en: `${PROVIDER_NAMES[provider]} account linked.`, hi: `${PROVIDER_NAMES[provider]} खाता जुड़ गया।` } });
    } catch (err) {
      setNotice({ type: 'error', text: authErrorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  const unlink = async (provider) => {
    setNotice(null);
    try {
      const { data } = await api(`/auth/social/${provider}`, { method: 'DELETE' });
      setUser(data);
      onChange();
    } catch (err) {
      setNotice({ type: 'error', text: authErrorMessage(err) });
    }
  };

  return (
    <section className={styles.card}>
      <h3>{t({ en: 'Linked accounts', hi: 'जुड़े हुए खाते' })}</h3>
      <ul className={styles.sessions}>
        {enabled
          .filter((p) => linked.has(p))
          .map((p) => (
            <li key={p}>
              <span className={styles.providerName}>{PROVIDER_NAMES[p]}</span>
              <small className="muted">{(me.socialAccounts || []).find((a) => a.provider === p)?.email}</small>
              <ConfirmButton onConfirm={() => unlink(p)} confirmLabel={t({ en: 'Confirm unlink', hi: 'हटाने की पुष्टि करें' })}>
                {t({ en: 'Unlink', hi: 'हटाएँ' })}
              </ConfirmButton>
            </li>
          ))}
      </ul>
      {Object.keys(unlinkedProviders).length > 0 && (
        <>
          <p className="muted">{t({ en: 'Link another account for one-tap sign-in:', hi: 'एक-टैप साइन-इन के लिए अन्य खाता जोड़ें:' })}</p>
          <div className={styles.socialLink}>
            <SocialButtons providers={unlinkedProviders} onToken={link} disabled={busy} />
          </div>
        </>
      )}
      <Notice notice={notice} />
    </section>
  );
}

function DangerCard({ onDeactivated }) {
  const { t } = useLang();
  const [confirmText, setConfirmText] = useState('');
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);
  const word = 'DELETE';

  const deactivate = async (e) => {
    e.preventDefault();
    if (confirmText.trim().toUpperCase() !== word) return;
    setBusy(true);
    try {
      await api('/users/me', { method: 'DELETE' });
      onDeactivated();
    } catch (err) {
      setNotice({ type: 'error', text: authErrorMessage(err) });
      setBusy(false);
    }
  };

  return (
    <section className={`${styles.card} ${styles.danger}`}>
      <h3>
        <ShieldAlert size={18} aria-hidden="true" /> {t({ en: 'Close account', hi: 'खाता बंद करें' })}
      </h3>
      <p className="muted">
        {t({
          en: 'Your account will be deactivated and you will be signed out everywhere. Contact support to restore it.',
          hi: 'आपका खाता निष्क्रिय कर दिया जाएगा और सभी डिवाइस से साइन आउट हो जाएगा। पुनः सक्रिय करने के लिए सहायता से संपर्क करें।',
        })}
      </p>
      <form className={styles.inline} onSubmit={deactivate}>
        <label htmlFor="sec-delete" className="sr-only">
          {t({ en: `Type ${word} to confirm`, hi: `पुष्टि हेतु ${word} लिखें` })}
        </label>
        <input id="sec-delete" className="input" placeholder={t({ en: `Type ${word} to confirm`, hi: `पुष्टि हेतु ${word} लिखें` })} value={confirmText} onChange={(e) => setConfirmText(e.target.value)} autoComplete="off" />
        <button className="btn btn-sm btn-dark" disabled={busy || confirmText.trim().toUpperCase() !== word}>
          {t({ en: 'Close my account', hi: 'मेरा खाता बंद करें' })}
        </button>
      </form>
      <Notice notice={notice} />
    </section>
  );
}

export default function SecuritySection() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [me, setMe] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    try {
      const { data } = await api('/auth/me');
      setMe(data);
      setStatus('ready');
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const clearLocalSession = () => {
    setAccessToken(null);
    setUser(null);
    router.replace('/');
  };

  if (status === 'loading') return <ListSkeleton rows={3} />;
  if (status === 'error') return <ErrorState error={error} onRetry={load} />;

  return (
    <div className={styles.stack}>
      <PasswordCard hasPassword={me.hasPassword} onChanged={load} />
      <SessionsCard onSignedOutEverywhere={clearLocalSession} />
      <LinkedAccountsCard me={me} onChange={load} />
      <DangerCard onDeactivated={clearLocalSession} />
    </div>
  );
}
