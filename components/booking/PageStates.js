'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import styles from './states.module.css';

/** Shimmering placeholder blocks while data loads. */
export function Skeleton({ rows = 3, cards = 0, className = '' }) {
  return (
    <div className={`container ${styles.skeleton} ${className}`} aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      {cards > 0 && (
        <div className={styles.cards}>
          {Array.from({ length: cards }, (_, i) => (
            <div key={i} className={styles.card} />
          ))}
        </div>
      )}
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className={styles.line} style={{ width: `${90 - i * 12}%` }} />
      ))}
    </div>
  );
}

/** Body for a route's error.js: friendly message + retry. */
export function RouteError({ error, retry, title }) {
  const { t } = useLang();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className={`container ${styles.error}`} role="alert">
      <span className={styles.om} aria-hidden="true">
        ॐ
      </span>
      <h2>{title ? t(title) : t({ en: 'Something went wrong', hi: 'कुछ गड़बड़ हो गई' })}</h2>
      <p className="muted">
        {t({
          en: 'We could not load this page right now. Please check your connection and try again.',
          hi: 'यह पृष्ठ अभी लोड नहीं हो सका। कृपया अपना कनेक्शन जाँचें और पुनः प्रयास करें।',
        })}
      </p>
      <div className={styles.actions}>
        {retry && (
          <button className="btn btn-primary" onClick={() => retry()}>
            <RefreshCw size={16} /> {t({ en: 'Try again', hi: 'पुनः प्रयास करें' })}
          </button>
        )}
        <Link href="/" className="btn btn-ghost">
          {t({ en: 'Go home', hi: 'होम पर जाएँ' })}
        </Link>
      </div>
    </section>
  );
}
