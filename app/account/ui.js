'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, Inbox } from 'lucide-react';
import { api } from '@/lib/api';
import { useLang } from '@/lib/i18n';
import styles from './account.module.css';

/**
 * Paginated list from the API with "load more".
 * @returns {{ items, meta, status: 'loading'|'ready'|'error', error, reload, loadMore, loadingMore, setItems }}
 */
export function useApiList(path, { limit = 10 } = {}) {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const sep = path.includes('?') ? '&' : '?';
  const reqId = useRef(0);

  const reload = useCallback(async () => {
    const id = ++reqId.current;
    setStatus('loading');
    try {
      const res = await api(`${path}${sep}limit=${limit}&page=1`);
      if (id !== reqId.current) return;
      setItems(res.data || []);
      setMeta(res.meta || null);
      setStatus('ready');
    } catch (err) {
      if (id !== reqId.current) return;
      setError(err);
      setStatus('error');
    }
  }, [path, sep, limit]);

  const loadMore = useCallback(async () => {
    if (!meta?.hasNext) return;
    setLoadingMore(true);
    try {
      const res = await api(`${path}${sep}limit=${limit}&page=${meta.page + 1}`);
      setItems((prev) => [...prev, ...(res.data || [])]);
      setMeta(res.meta || null);
    } catch (err) {
      setError(err);
    } finally {
      setLoadingMore(false);
    }
  }, [meta, path, sep, limit]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { items, meta, status, error, reload, loadMore, loadingMore, setItems };
}

export function ListSkeleton({ rows = 3 }) {
  return (
    <div className={styles.skeleton} aria-busy="true">
      {Array.from({ length: rows }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

export function ErrorState({ error, onRetry }) {
  const { t } = useLang();
  const offline = error?.status === 0;
  return (
    <div className={styles.state} role="alert">
      <AlertTriangle size={32} aria-hidden="true" />
      <p>
        {offline
          ? t({ en: 'Could not reach the server. Check your connection.', hi: 'सर्वर से संपर्क नहीं हो सका। अपना इंटरनेट जाँचें।' })
          : t({ en: 'Something went wrong while loading this section.', hi: 'यह भाग लोड करते समय कुछ गलत हो गया।' })}
      </p>
      {onRetry && (
        <button type="button" className="btn btn-ghost btn-sm" onClick={onRetry}>
          {t({ en: 'Try again', hi: 'पुनः प्रयास करें' })}
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon: Icon = Inbox, title, text, href, cta }) {
  const { t } = useLang();
  return (
    <div className={styles.state}>
      <Icon size={36} aria-hidden="true" />
      <p className={styles.stateTitle}>{t(title)}</p>
      {text && <p className="muted">{t(text)}</p>}
      {href && (
        <Link href={href} className="btn btn-primary btn-sm">
          {t(cta)}
        </Link>
      )}
    </div>
  );
}

export function LoadMore({ list }) {
  const { t } = useLang();
  if (!list.meta?.hasNext) return null;
  return (
    <div className={styles.more}>
      <button type="button" className="btn btn-ghost btn-sm" onClick={list.loadMore} disabled={list.loadingMore}>
        {list.loadingMore ? t({ en: 'Loading…', hi: 'लोड हो रहा है…' }) : t({ en: 'Load more', hi: 'और देखें' })}
      </button>
    </div>
  );
}

const TONES = {
  pending: 'amber',
  created: 'amber',
  authorized: 'amber',
  rescheduled: 'amber',
  unpaid: 'amber',
  confirmed: 'green',
  completed: 'green',
  captured: 'green',
  paid: 'green',
  cancelled: 'red',
  failed: 'red',
  refunded: 'grey',
  partially_refunded: 'grey',
};

const STATUS_LABELS = {
  pending: { en: 'Pending', hi: 'लंबित' },
  confirmed: { en: 'Confirmed', hi: 'पुष्ट' },
  rescheduled: { en: 'Rescheduled', hi: 'पुनर्निर्धारित' },
  completed: { en: 'Completed', hi: 'पूर्ण' },
  cancelled: { en: 'Cancelled', hi: 'रद्द' },
  created: { en: 'Awaiting payment', hi: 'भुगतान प्रतीक्षित' },
  authorized: { en: 'Authorised', hi: 'अधिकृत' },
  captured: { en: 'Paid', hi: 'भुगतान हुआ' },
  paid: { en: 'Paid', hi: 'भुगतान हुआ' },
  unpaid: { en: 'Unpaid', hi: 'भुगतान बाकी' },
  failed: { en: 'Failed', hi: 'असफल' },
  refunded: { en: 'Refunded', hi: 'वापस किया गया' },
  partially_refunded: { en: 'Partly refunded', hi: 'आंशिक रूप से वापस' },
};

export function StatusBadge({ status }) {
  const { t } = useLang();
  if (!status) return null;
  return <span className={`${styles.badge} ${styles[`tone_${TONES[status] || 'grey'}`]}`}>{t(STATUS_LABELS[status] || { en: status, hi: status })}</span>;
}

export const formatDate = (value, lang, opts = { day: 'numeric', month: 'short', year: 'numeric' }) => {
  if (!value) return '';
  const d = typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date(value);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', opts);
};

export const formatDateTime = (value, lang) =>
  formatDate(value, lang, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });

// Razorpay amounts are in the currency's minor unit.
const ZERO_DECIMAL = ['JPY', 'KRW', 'VND', 'CLP', 'PYG', 'UGX', 'XAF', 'XOF', 'RWF', 'GNF', 'KMF', 'MGA', 'VUV', 'XPF', 'BIF', 'DJF'];
const THREE_DECIMAL = ['KWD', 'BHD', 'OMR', 'JOD', 'TND', 'IQD', 'LYD'];
export const minorToMajor = (amount, currency = 'INR') =>
  amount / 10 ** (ZERO_DECIMAL.includes(currency) ? 0 : THREE_DECIMAL.includes(currency) ? 3 : 2);

export const formatMoney = (major, currency = 'INR', lang = 'en') => {
  try {
    return new Intl.NumberFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', { style: 'currency', currency, maximumFractionDigits: 2 }).format(major);
  } catch {
    return `${currency} ${major}`;
  }
};

/** Two-step destructive button: first click arms, second click confirms. */
export function ConfirmButton({ onConfirm, children, confirmLabel, className = 'btn btn-ghost btn-sm', disabled }) {
  const { t } = useLang();
  const [armed, setArmed] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const id = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(id);
  }, [armed]);

  const click = async () => {
    if (!armed) return setArmed(true);
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
      setArmed(false);
    }
  };

  return (
    <button type="button" className={`${className} ${armed ? styles.armed : ''}`} onClick={click} disabled={disabled || busy} aria-live="polite">
      {busy ? t({ en: 'Please wait…', hi: 'कृपया प्रतीक्षा करें…' }) : armed ? confirmLabel || t({ en: 'Click again to confirm', hi: 'पुष्टि हेतु पुनः क्लिक करें' }) : children}
    </button>
  );
}

/** Inline success / error message that announces itself to screen readers. */
export function Notice({ notice }) {
  const { t } = useLang();
  if (!notice) return null;
  return (
    <p className={notice.type === 'error' ? 'error-text' : styles.success} role={notice.type === 'error' ? 'alert' : 'status'}>
      {t(notice.text)}
    </p>
  );
}
