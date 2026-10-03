'use client';

import { AlertTriangle, RefreshCw, Inbox } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import styles from './states.module.css';

/** Bilingual, user-friendly message for an ApiError. */
export function errorMessage(error) {
  if (!error) return null;
  if (error.status === 0) return { en: 'Could not reach the server. Check your connection and try again.', hi: 'सर्वर से संपर्क नहीं हो सका। अपना इंटरनेट जाँचें और पुनः प्रयास करें।' };
  if (error.status === 429) return { en: 'Too many calculations in a short time. Please wait a minute and try again.', hi: 'कम समय में बहुत अधिक गणनाएँ। कृपया एक मिनट रुककर पुनः प्रयास करें।' };
  if (error.status === 422 || error.status === 400) return { en: error.details?.[0]?.message || error.message || 'Please check the details you entered.', hi: 'कृपया दर्ज की गई जानकारी जाँचें।' };
  if (error.status >= 500) return { en: 'Something went wrong on our side. Please try again shortly.', hi: 'हमारी ओर से कुछ गड़बड़ हुई। कृपया थोड़ी देर बाद पुनः प्रयास करें।' };
  return { en: error.message || 'Something went wrong.', hi: 'कुछ गड़बड़ हो गई।' };
}

export function Loading({ label, compact = false }) {
  const { t } = useLang();
  return (
    <div className={`${styles.loading} ${compact ? styles.compact : ''}`} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span>{t(label || { en: 'Consulting the stars…', hi: 'सितारों से परामर्श हो रहा है…' })}</span>
    </div>
  );
}

/** Shimmering placeholder blocks while content loads. */
export function Skeleton({ lines = 3, height }) {
  return (
    <div className={styles.skeleton} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <span key={i} style={{ width: `${100 - (i % 3) * 14}%`, ...(height && { height }) }} />
      ))}
    </div>
  );
}

export function ErrorState({ error, onRetry, compact = false }) {
  const { t } = useLang();
  if (!error) return null;
  return (
    <div className={`${styles.error} ${compact ? styles.compact : ''}`} role="alert">
      <AlertTriangle size={20} aria-hidden="true" />
      <p>{t(errorMessage(error))}</p>
      {onRetry && error.status !== 400 && error.status !== 422 && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={onRetry}>
          <RefreshCw size={14} aria-hidden="true" /> {t({ en: 'Try again', hi: 'पुनः प्रयास करें' })}
        </button>
      )}
    </div>
  );
}

export function EmptyState({ title, children }) {
  const { t } = useLang();
  return (
    <div className={styles.empty}>
      <Inbox size={22} aria-hidden="true" />
      <p>{t(title)}</p>
      {children}
    </div>
  );
}
