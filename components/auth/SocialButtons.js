'use client';

import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n';
import { loadScript, makeNonce } from './loadScript';
import styles from './auth.module.css';

/*
 * Social sign-in with each provider's official web SDK. The SDK returns a token, which is
 * verified by the backend (POST /auth/social/:provider). Scripts load only for enabled providers.
 *
 *   Google:   Google Identity Services: renders Google's own button, returns an ID token (JWT)
 *   Facebook: Facebook JS SDK FB.login: returns a user access token
 *   Apple:    Sign in with Apple JS (popup mode): returns an identity token (+ name on first sign-in)
 *
 * onToken(provider, payload) must return a promise; while it runs the buttons are disabled.
 */

function GoogleButton({ clientId, onToken, disabled, lang }) {
  const ref = useRef(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadScript('https://accounts.google.com/gsi/client', 'google-gsi')
      .then(() => {
        if (cancelled || !ref.current || !window.google?.accounts?.id) return;
        const nonce = makeNonce();
        window.google.accounts.id.initialize({
          client_id: clientId,
          nonce,
          ux_mode: 'popup',
          context: 'signin',
          itp_support: true,
          callback: (resp) => resp?.credential && onTokenRef.current('google', { idToken: resp.credential, nonce }),
        });
        const width = Math.min(400, Math.max(200, ref.current.offsetWidth || 320));
        window.google.accounts.id.renderButton(ref.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          logo_alignment: 'left',
          width,
          locale: lang === 'hi' ? 'hi' : 'en',
        });
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [clientId, lang]);

  if (failed) return null;
  return <div ref={ref} className={`${styles.googleSlot} ${disabled ? styles.dim : ''}`} aria-busy={disabled || undefined} />;
}

function FacebookButton({ appId, version, onToken, disabled }) {
  const { t } = useLang();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // FB.login must run synchronously inside the click handler (popup blockers), so preload and init now.
    window.fbAsyncInit = () => {
      window.FB.init({ appId, cookie: false, xfbml: false, version: version || 'v21.0' });
      if (!cancelled) setReady(true);
    };
    loadScript('https://connect.facebook.net/en_US/sdk.js', 'facebook-jssdk', { crossorigin: 'anonymous' })
      .then(() => {
        if (window.FB && !cancelled) {
          window.FB.init({ appId, cookie: false, xfbml: false, version: version || 'v21.0' });
          setReady(true);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [appId, version]);

  const click = () => {
    if (!window.FB) return;
    window.FB.login(
      (resp) => {
        const token = resp?.authResponse?.accessToken;
        if (token) onToken('facebook', { accessToken: token });
      },
      { scope: 'public_profile,email' }
    );
  };

  return (
    <button type="button" className={`${styles.socialBtn} ${styles.facebook}`} onClick={click} disabled={disabled || !ready}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z" />
      </svg>
      {t({ en: 'Continue with Facebook', hi: 'Facebook से जारी रखें' })}
    </button>
  );
}

function AppleButton({ clientId, onToken, disabled }) {
  const { t } = useLang();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadScript('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js', 'apple-signin')
      .then(() => !cancelled && setReady(Boolean(window.AppleID)))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const click = async () => {
    if (!window.AppleID) return;
    const nonce = makeNonce();
    try {
      window.AppleID.auth.init({
        clientId,
        scope: 'name email',
        // Must be registered as a Return URL on the Services ID, even in popup mode.
        redirectURI: `${window.location.origin}/login`,
        state: makeNonce(8),
        nonce,
        usePopup: true,
      });
      const res = await window.AppleID.auth.signIn();
      const idToken = res?.authorization?.id_token;
      if (!idToken) return;
      const n = res.user?.name;
      const name = n ? [n.firstName, n.lastName].filter(Boolean).join(' ') : undefined;
      onToken('apple', { idToken, nonce, ...(name && { name }) });
    } catch (err) {
      // popup_closed_by_user / user_cancelled_authorize are not errors worth showing.
      if (!/cancel|closed/i.test(String(err?.error || err?.message || ''))) onToken('apple', null, err);
    }
  };

  return (
    <button type="button" className={`${styles.socialBtn} ${styles.apple}`} onClick={click} disabled={disabled || !ready}>
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"
        />
      </svg>
      {t({ en: 'Continue with Apple', hi: 'Apple से जारी रखें' })}
    </button>
  );
}

/** Renders nothing when no social provider is enabled. */
export default function SocialButtons({ providers, onToken, disabled }) {
  const { lang } = useLang();
  if (!providers) return null;
  const google = providers.google?.enabled && providers.google.clientId;
  const facebook = providers.facebook?.enabled && providers.facebook.appId;
  const apple = providers.apple?.enabled && providers.apple.clientId;
  if (!google && !facebook && !apple) return null;

  return (
    <div className={styles.social}>
      {google && <GoogleButton clientId={providers.google.clientId} onToken={onToken} disabled={disabled} lang={lang} />}
      {facebook && <FacebookButton appId={providers.facebook.appId} version={providers.facebook.graphVersion} onToken={onToken} disabled={disabled} />}
      {apple && <AppleButton clientId={providers.apple.clientId} onToken={onToken} disabled={disabled} />}
    </div>
  );
}

export const hasSocial = (p) => Boolean(p?.google?.enabled || p?.facebook?.enabled || p?.apple?.enabled);
