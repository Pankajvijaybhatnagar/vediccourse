'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Bell, CalendarDays, CalendarCheck2, Megaphone, Radio, Sparkles, Sun, Info } from 'lucide-react';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { useLang } from '@/lib/i18n';
import styles from '../Header.module.css';

// Shown to signed-out visitors: evergreen prompts, not account notifications.
const PROMOS = [
  { icon: Sun, text: { en: 'Your daily horoscope is ready. See what today holds!', hi: 'आपका आज का राशिफल तैयार है। देखें आज क्या खास है!' }, href: '/horoscope', time: { en: 'Today', hi: 'आज' } },
  { icon: CalendarDays, text: { en: "Check today's Panchang, Rahu Kaal and auspicious muhurat.", hi: 'आज का पंचांग, राहु काल और शुभ मुहूर्त देखें।' }, href: '/panchang', time: { en: 'Today', hi: 'आज' } },
  { icon: Sparkles, text: { en: 'New: Free Kundli matching for marriage.', hi: 'नया: विवाह के लिए मुफ़्त कुंडली मिलान।' }, href: '/kundli-milan', time: { en: 'New', hi: 'नया' } },
];

const TYPE_ICON = { booking: CalendarCheck2, horoscope: Sun, panchang: CalendarDays, live: Radio, offer: Megaphone, general: Bell, system: Info };

const POLL_MS = 2 * 60 * 1000;

function timeAgo(iso, lang) {
  const diff = (new Date(iso).getTime() - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', { numeric: 'auto' });
  const steps = [
    [60, 'second'],
    [3600, 'minute', 60],
    [86400, 'hour', 3600],
    [604800, 'day', 86400],
    [Infinity, 'week', 604800],
  ];
  for (const [limit, unit, div = 1] of steps) {
    if (Math.abs(diff) < limit) return rtf.format(Math.round(diff / div), unit);
  }
  return '';
}

/** Internal links navigate client-side; anything else is ignored for safety. */
const isInternal = (href) => typeof href === 'string' && href.startsWith('/') && !href.startsWith('//');

export default function NotificationBell() {
  const { t, lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const wrapRef = useRef(null);

  const load = useCallback(async () => {
    if (!user) return;
    setStatus((s) => (s === 'ready' ? s : 'loading'));
    try {
      const res = await api('/notifications?limit=15');
      setItems(res.data);
      setUnread(res.meta?.unreadCount ?? res.data.filter((n) => !n.read).length);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, [user]);

  // Badge count on sign-in, then poll while the tab is visible.
  useEffect(() => {
    if (!user) {
      setItems([]);
      setUnread(0);
      setStatus('idle');
      return;
    }
    load();
    const id = setInterval(() => document.visibilityState === 'visible' && load(), POLL_MS);
    return () => clearInterval(id);
  }, [user, load]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => wrapRef.current && !wrapRef.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const toggle = () => {
    setOpen((o) => !o);
    if (!open && user) load();
  };

  const markRead = async (n) => {
    if (!n.read) {
      setItems((list) => list.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
      setUnread((c) => Math.max(0, c - 1));
      api(`/notifications/${n.id}/read`, { method: 'PATCH' }).catch(() => {});
    }
    if (isInternal(n.href)) {
      setOpen(false);
      router.push(n.href);
    }
  };

  const markAll = async () => {
    setItems((list) => list.map((x) => ({ ...x, read: true })));
    setUnread(0);
    try {
      await api('/notifications/read-all', { method: 'PATCH' });
    } catch {
      load();
    }
  };

  const label = user && unread
    ? t({ en: `Notifications, ${unread} unread`, hi: `सूचनाएँ, ${unread} अपठित` })
    : t({ en: 'Notifications', hi: 'सूचनाएँ' });

  return (
    <div className={styles.bellWrap} ref={wrapRef}>
      <button className={styles.iconBtn} aria-label={label} aria-expanded={open} aria-haspopup="true" onClick={toggle}>
        <Bell size={18} />
        {user ? unread > 0 && <span className={styles.count}>{unread > 9 ? '9+' : unread}</span> : <span className={styles.dot} />}
      </button>

      {open && (
        <div className={styles.bellMenu} role="menu" aria-label={t({ en: 'Notifications', hi: 'सूचनाएँ' })}>
          <div className={styles.bellHead}>
            <p className={styles.bellTitle}>{t({ en: 'Notifications', hi: 'सूचनाएँ' })}</p>
            {user && unread > 0 && (
              <button type="button" className={styles.bellAction} onClick={markAll}>
                {t({ en: 'Mark all read', hi: 'सभी पढ़े गए' })}
              </button>
            )}
          </div>

          {!user &&
            PROMOS.map((n) => {
              const Icon = n.icon;
              return (
                <Link key={n.href} href={n.href} className={styles.note} role="menuitem">
                  <span className={styles.noteIcon}>
                    <Icon size={16} />
                  </span>
                  <span>
                    {t(n.text)}
                    <small>{t(n.time)}</small>
                  </span>
                </Link>
              );
            })}

          {user && status === 'loading' && items.length === 0 && (
            <div className={styles.bellSkeleton} aria-busy="true">
              <span />
              <span />
            </div>
          )}

          {user && status === 'error' && items.length === 0 && (
            <p className={styles.bellEmpty}>
              {t({ en: "Couldn't load notifications.", hi: 'सूचनाएँ लोड नहीं हो सकीं।' })}{' '}
              <button type="button" className={styles.bellAction} onClick={load}>
                {t({ en: 'Retry', hi: 'पुनः प्रयास' })}
              </button>
            </p>
          )}

          {user && status === 'ready' && items.length === 0 && (
            <p className={styles.bellEmpty}>{t({ en: "You're all caught up.", hi: 'कोई नई सूचना नहीं है।' })}</p>
          )}

          {user &&
            items.map((n) => {
              const Icon = TYPE_ICON[n.type] || Bell;
              return (
                <button key={n.id} type="button" role="menuitem" className={`${styles.note} ${n.read ? '' : styles.noteUnread}`} onClick={() => markRead(n)}>
                  <span className={styles.noteIcon}>
                    <Icon size={16} />
                  </span>
                  <span>
                    <b className={styles.noteTitle}>{t(n.title)}</b>
                    {n.body && <span className={styles.noteBody}>{t(n.body)}</span>}
                    <small>{timeAgo(n.createdAt, lang)}</small>
                  </span>
                  {!n.read && <span className={styles.unreadDot} aria-label={t({ en: 'Unread', hi: 'अपठित' })} />}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
