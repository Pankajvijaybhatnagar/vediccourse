'use client';

import { useEffect, useRef, useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import AuthForm from '@/components/auth/AuthForm';
import styles from './SignInModal.module.css';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

/**
 * Global sign-in dialog (mounted once by AuthProvider; open it with useAuth().openSignIn()).
 * Focus is trapped while open and restored to the trigger on close.
 */
export default function SignInModal({ open, mode, onClose, onSignedIn }) {
  const { t } = useLang();
  const dialogRef = useRef(null);
  const [doneUser, setDoneUser] = useState(null);
  const [instance, setInstance] = useState(0);

  useEffect(() => {
    if (!open) return;
    setDoneUser(null);
    setInstance((i) => i + 1); // fresh form state every time it opens
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFirst = setTimeout(() => {
      const el = dialogRef.current?.querySelector('input, button:not([data-close])');
      (el || dialogRef.current)?.focus();
    }, 60);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const nodes = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null || n === document.activeElement);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(focusFirst);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open, onClose]);

  // Close shortly after a successful sign-in so the user sees the confirmation.
  useEffect(() => {
    if (!doneUser) return;
    const id = setTimeout(onClose, 1400);
    return () => clearTimeout(id);
  }, [doneUser, onClose]);

  if (!open) return null;

  const success = (user) => {
    setDoneUser(user || {});
    onSignedIn?.(user);
  };

  const firstName = doneUser?.name?.split(' ')[0];

  return (
    <div className={styles.backdrop} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="signin-title" tabIndex={-1}>
        <button className={styles.close} onClick={onClose} aria-label={t({ en: 'Close', hi: 'बंद करें' })} data-close>
          <X size={18} />
        </button>

        {doneUser ? (
          <div className={styles.done} role="status">
            <CheckCircle2 size={56} className={styles.doneIcon} aria-hidden="true" />
            <h2 id="signin-title">
              {firstName ? t({ en: `Welcome, ${firstName}!`, hi: `स्वागत है, ${firstName}!` }) : t({ en: 'Welcome to VedicDhaam!', hi: 'वैदिकधाम में आपका स्वागत है!' })}
            </h2>
            <p className="muted">{t({ en: 'You are signed in.', hi: 'आप साइन इन हो गए हैं।' })}</p>
            <button className="btn btn-primary btn-block btn-lg" onClick={onClose}>
              {t({ en: 'Continue', hi: 'आगे बढ़ें' })}
            </button>
          </div>
        ) : (
          <>
            <div className={styles.art} aria-hidden="true">
              <span>ॐ</span>
            </div>
            <h2 id="signin-title">{t({ en: 'Sign in to VedicDhaam', hi: 'वैदिकधाम में साइन इन करें' })}</h2>
            <p className="muted">{t({ en: 'Get your first consultation FREE.', hi: 'अपना पहला परामर्श मुफ़्त पाएँ।' })}</p>
            <div className={styles.body}>
              <AuthForm key={instance} initialMode={mode} onSuccess={success} onNavigate={onClose} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
