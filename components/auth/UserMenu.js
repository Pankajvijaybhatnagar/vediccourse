'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarCheck2, ChevronDown, Grid3x3, LogOut, UserRound } from 'lucide-react';
import { useAuth, displayName, initials } from '@/lib/auth';
import { useLang } from '@/lib/i18n';
import styles from '../Header.module.css';

export const ACCOUNT_LINKS = [
  { href: '/account', icon: UserRound, label: { en: 'My Account', hi: 'मेरा खाता' } },
  { href: '/account?tab=bookings', icon: CalendarCheck2, label: { en: 'My Bookings', hi: 'मेरी बुकिंग' } },
  { href: '/account?tab=kundlis', icon: Grid3x3, label: { en: 'Saved Kundlis', hi: 'सहेजी कुंडलियाँ' } },
];

export function Avatar({ user, size = 36 }) {
  const url = user?.avatar?.url;
  return (
    <span className={styles.avatar} style={{ width: size, height: size, fontSize: size * 0.38 }} aria-hidden="true">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" referrerPolicy="no-referrer" />
      ) : (
        initials(user)
      )}
    </span>
  );
}

/** Signed-in account dropdown for the desktop header. */
export default function UserMenu() {
  const { t } = useLang();
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!user) return null;

  return (
    <div className={styles.userWrap} ref={ref}>
      <button
        className={styles.userBtn}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t({ en: `Account menu for ${displayName(user)}`, hi: `${displayName(user)} का खाता मेनू` })}
        onClick={() => setOpen((o) => !o)}
      >
        <Avatar user={user} />
        <ChevronDown size={14} className={`${styles.userChev} ${open ? styles.rot : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div className={styles.userMenu} role="menu">
          <div className={styles.userHead}>
            <Avatar user={user} size={42} />
            <div>
              <strong>{user.name || t({ en: 'Welcome!', hi: 'स्वागत है!' })}</strong>
              <small>{user.email || (user.phone ? `+91 ${user.phone}` : '')}</small>
            </div>
          </div>
          {ACCOUNT_LINKS.map(({ href, icon: Icon, label }) => (
            <Link key={href} href={href} className={styles.userLink} role="menuitem" onClick={() => setOpen(false)}>
              <Icon size={16} aria-hidden="true" /> {t(label)}
            </Link>
          ))}
          <button
            type="button"
            role="menuitem"
            className={`${styles.userLink} ${styles.userSignOut}`}
            onClick={() => {
              setOpen(false);
              signOut();
            }}
          >
            <LogOut size={16} aria-hidden="true" /> {t({ en: 'Sign out', hi: 'साइन आउट' })}
          </button>
        </div>
      )}
    </div>
  );
}
