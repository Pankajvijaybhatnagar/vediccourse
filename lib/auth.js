'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import SignInModal from '@/components/SignInModal';
import { api, refreshSession, setAccessToken } from './api';
import { useLang } from './i18n';

/**
 * Auth contract used across the app:
 *   const { user, ready, openSignIn, closeSignIn, signOut, completeSignIn, refreshUser, setUser, providers } = useAuth();
 *   - ready:      false until the session has been restored from the refresh cookie
 *   - openSignIn({ onSuccess, mode }): opens the global sign-in modal; onSuccess(user) runs after sign-in
 *   - providers:  GET /auth/providers (which sign-in methods are enabled), null while loading
 */
const AuthContext = createContext({
  user: null,
  ready: false,
  providers: null,
  openSignIn: () => {},
  closeSignIn: () => {},
  signOut: async () => {},
  completeSignIn: () => {},
  refreshUser: async () => null,
  setUser: () => {},
});

// Sensible fallback if /auth/providers can't be reached: offer phone OTP and email only.
const FALLBACK_PROVIDERS = {
  registration: true,
  phoneOtp: { enabled: true, defaultChannel: 'sms', channels: ['sms'], allowChoice: false, length: 4, countryCode: '91' },
  emailPassword: { enabled: true },
  google: { enabled: false },
  facebook: { enabled: false },
  apple: { enabled: false },
};

export function AuthProvider({ children }) {
  const { lang, setLang } = useLang();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [providers, setProviders] = useState(null);
  const [modal, setModal] = useState(null); // { onSuccess, mode } while open

  // Restore the session from the refresh cookie on first load.
  useEffect(() => {
    refreshSession()
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    api('/auth/providers', { auth: false })
      .then((res) => setProviders(res.data))
      .catch(() => setProviders(FALLBACK_PROVIDERS));
  }, []);

  /* ---------- language preference sync ----------
     On sign-in the account's saved language wins; later toggles by a signed-in user are saved to the account. */
  const userRef = useRef(null);
  const appliedFor = useRef(null);
  const langRef = useRef(lang);
  userRef.current = user;
  langRef.current = lang;

  useEffect(() => {
    if (!user) {
      appliedFor.current = null;
      return;
    }
    if (appliedFor.current !== user.id) {
      appliedFor.current = user.id;
      if (user.language && user.language !== lang) setLang(user.language);
    }
    // Only re-run when the signed-in identity changes, not on every language toggle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    const u = userRef.current;
    if (!u || appliedFor.current !== u.id || u.language === lang) return;
    setUser((prev) => (prev ? { ...prev, language: lang } : prev));
    api('/users/me', { method: 'PATCH', body: { language: lang } }).catch(() => {});
  }, [lang]);

  /** Call with the `data` of a successful sign-in response. */
  const completeSignIn = useCallback((data) => {
    setAccessToken(data.accessToken);
    if (data.isNewUser && data.user && data.user.language !== langRef.current) {
      // A brand-new account adopts the language the visitor was already browsing in.
      const language = langRef.current;
      appliedFor.current = data.user.id;
      setUser({ ...data.user, language });
      api('/users/me', { method: 'PATCH', body: { language } }).catch(() => {});
      return;
    }
    setUser(data.user);
  }, []);

  const refreshUser = useCallback(async () => {
    const { data } = await api('/auth/me');
    setUser(data);
    return data;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await api('/auth/logout', { method: 'POST', body: {}, auth: false });
    } catch {}
    setAccessToken(null);
    setUser(null);
  }, []);

  const openSignIn = useCallback((opts = {}) => setModal(opts), []);
  const closeSignIn = useCallback(() => setModal(null), []);

  const onSignedIn = useCallback((signedInUser) => modal?.onSuccess?.(signedInUser), [modal]);

  return (
    <AuthContext.Provider value={{ user, ready, providers, completeSignIn, refreshUser, signOut, setUser, openSignIn, closeSignIn }}>
      {children}
      <SignInModal open={Boolean(modal)} mode={modal?.mode} onClose={closeSignIn} onSignedIn={onSignedIn} />
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

/** Display helpers shared by the header and account pages. */
export const displayName = (user) => user?.name || user?.email || (user?.phone ? `+91 ${user.phone}` : '');

export const initials = (user) => {
  const src = user?.name || user?.email || '';
  const parts = src.replace(/@.*/, '').split(/[\s._-]+/).filter(Boolean);
  if (parts.length) return parts.slice(0, 2).map((p) => p[0].toUpperCase()).join('');
  return user?.phone ? user.phone.slice(-2) : '?';
};

/** Only allow same-site relative redirects (blocks //evil.com and javascript: URLs). */
export function safeNext(next, fallback = '/') {
  if (typeof next !== 'string') return fallback;
  if (!next.startsWith('/') || next.startsWith('//') || next.startsWith('/\\')) return fallback;
  return next;
}
