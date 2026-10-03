'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Languages, LogOut, Menu, X } from 'lucide-react';
import { NAV } from '@/lib/nav';
import { useLang } from '@/lib/i18n';
import { useAuth, displayName } from '@/lib/auth';
import NotificationBell from './auth/NotificationBell';
import UserMenu, { ACCOUNT_LINKS, Avatar } from './auth/UserMenu';
import Logo from './Logo';
import styles from './Header.module.css';

function LangToggle({ className = '' }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`${styles.lang} ${className}`} role="group" aria-label="Language / भाषा">
      <Languages size={16} aria-hidden="true" />
      <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
        Eng
      </button>
      <button aria-pressed={lang === 'hi'} onClick={() => setLang('hi')}>
        हिंदी
      </button>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { t } = useLang();
  const { user, signOut, openSignIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (item) => {
    const hrefs = item.children ? item.children.map((c) => c.href) : [item.href];
    return hrefs.some((h) => {
      const path = h.split(/[?#]/)[0];
      return path === '/' ? pathname === '/' && h === '/' : pathname.startsWith(path);
    });
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.top}`}>
          <Logo />
          <div className={styles.actions}>
            <LangToggle className={styles.hideXs} />
            <NotificationBell />
            {user ? (
              <UserMenu />
            ) : (
              <button className={`btn btn-primary btn-sm ${styles.signIn}`} onClick={() => openSignIn()}>
                {t({ en: 'Sign In', hi: 'साइन इन' })}
              </button>
            )}
            <button
              className={`${styles.iconBtn} ${styles.burger}`}
              onClick={() => setMenuOpen(true)}
              aria-label={t({ en: 'Open menu', hi: 'मेनू खोलें' })}
              aria-expanded={menuOpen}
              aria-controls="mobile-drawer"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Main">
          <ul className={`container ${styles.navList}`}>
            {NAV.map((item) => (
              <li key={item.label.en} className={styles.navItem}>
                {item.children ? (
                  <button className={`${styles.navLink} ${isActive(item) ? styles.active : ''}`} aria-haspopup="true">
                    {t(item.label)}
                    <ChevronDown size={14} className={styles.chev} />
                    {item.badge && <span className={`${styles.badge} ${item.badgeTone === 'red' ? styles.badgeRed : item.badgeTone === 'teal' ? styles.badgeTeal : ''}`}>{t(item.badge)}</span>}
                  </button>
                ) : (
                  <Link href={item.href} className={`${styles.navLink} ${isActive(item) ? styles.active : ''}`}>
                    {t(item.label)}
                    {item.badge && <span className={`${styles.badge} ${item.badgeTone === 'red' ? styles.badgeRed : item.badgeTone === 'teal' ? styles.badgeTeal : ''}`}>{t(item.badge)}</span>}
                  </Link>
                )}
                {item.children && (
                  <div className={styles.dropdown}>
                    {item.children.map((c) => (
                      <Link key={c.label.en} href={c.href} className={styles.dropLink}>
                        {t(c.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ''}`} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      <aside id="mobile-drawer" className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`} aria-hidden={!menuOpen}>
        <div className={styles.drawerHead}>
          <Logo />
          <button className={styles.iconBtn} onClick={() => setMenuOpen(false)} aria-label={t({ en: 'Close menu', hi: 'मेनू बंद करें' })}>
            <X size={20} />
          </button>
        </div>
        <LangToggle className={styles.drawerLang} />
        <nav className={styles.drawerNav} aria-label="Mobile">
          {NAV.map((item, i) =>
            item.children ? (
              <div key={item.label.en} className={styles.drawerGroup}>
                <button
                  className={styles.drawerLink}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  aria-expanded={expanded === i}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  {t(item.label)}
                  <ChevronDown size={16} className={expanded === i ? styles.rot : ''} />
                </button>
                <div className={`${styles.drawerSub} ${expanded === i ? styles.drawerSubOpen : ''}`}>
                  <div>
                    {item.children.map((c) => (
                      <Link key={c.label.en} href={c.href} tabIndex={menuOpen && expanded === i ? 0 : -1} onClick={() => setMenuOpen(false)}>
                        {t(c.label)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.label.en} href={item.href} className={styles.drawerLink} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
                {t(item.label)}
                {item.badge && <span className={`${styles.badge} ${styles.badgeInline} ${item.badgeTone === 'red' ? styles.badgeRed : item.badgeTone === 'teal' ? styles.badgeTeal : ''}`}>{t(item.badge)}</span>}
              </Link>
            )
          )}
        </nav>
        {user ? (
          <div className={styles.drawerUser}>
            <div className={styles.userHead}>
              <Avatar user={user} size={42} />
              <div>
                <strong>{user.name || displayName(user)}</strong>
                <small>{user.email || (user.phone ? `+91 ${user.phone}` : '')}</small>
              </div>
            </div>
            {ACCOUNT_LINKS.map(({ href, icon: Icon, label }) => (
              <Link key={href} href={href} className={styles.userLink} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>
                <Icon size={16} aria-hidden="true" /> {t(label)}
              </Link>
            ))}
            <button
              type="button"
              className={`${styles.userLink} ${styles.userSignOut}`}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                setMenuOpen(false);
                signOut();
              }}
            >
              <LogOut size={16} aria-hidden="true" /> {t({ en: 'Sign out', hi: 'साइन आउट' })}
            </button>
          </div>
        ) : (
          <button
            className="btn btn-primary btn-block"
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => {
              setMenuOpen(false);
              openSignIn();
            }}
          >
            {t({ en: 'Sign In', hi: 'साइन इन' })}
          </button>
        )}
      </aside>

    </>
  );
}
