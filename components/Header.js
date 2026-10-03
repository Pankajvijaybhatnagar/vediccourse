'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, ChevronDown, Languages, Menu, X, Sun, CalendarDays, Sparkles } from 'lucide-react';
import { NAV } from '@/lib/nav';
import { useLang } from '@/lib/i18n';
import Logo from './Logo';
import SignInModal from './SignInModal';
import styles from './Header.module.css';

const NOTIFICATIONS = [
  { icon: Sun, text: { en: "Your daily horoscope is ready. See what today holds!", hi: 'आपका आज का राशिफल तैयार है। देखें आज क्या खास है!' }, href: '/horoscope', time: { en: 'Just now', hi: 'अभी' } },
  { icon: CalendarDays, text: { en: "Check today's Panchang, Rahu Kaal and auspicious muhurat.", hi: 'आज का पंचांग, राहु काल और शुभ मुहूर्त देखें।' }, href: '/panchang', time: { en: '1h ago', hi: '1 घंटा पहले' } },
  { icon: Sparkles, text: { en: 'New: Free Kundli matching for marriage.', hi: 'नया: विवाह के लिए मुफ़्त कुंडली मिलान।' }, href: '/kundli-milan', time: { en: 'Today', hi: 'आज' } },
];

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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [bellOpen, setBellOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const bellRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setBellOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setBellOpen(false);
      }
    };
    const onClick = (e) => bellRef.current && !bellRef.current.contains(e.target) && setBellOpen(false);
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
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
            <div className={styles.bellWrap} ref={bellRef}>
              <button
                className={styles.iconBtn}
                aria-label={t({ en: 'Notifications', hi: 'सूचनाएँ' })}
                aria-expanded={bellOpen}
                onClick={() => setBellOpen((o) => !o)}
              >
                <Bell size={18} />
                <span className={styles.dot} />
              </button>
              {bellOpen && (
                <div className={styles.bellMenu} role="menu">
                  <p className={styles.bellTitle}>{t({ en: 'Notifications', hi: 'सूचनाएँ' })}</p>
                  {NOTIFICATIONS.map((n, i) => {
                    const Icon = n.icon;
                    return (
                      <Link key={i} href={n.href} className={styles.note} role="menuitem">
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
                </div>
              )}
            </div>
            <button className={`btn btn-primary btn-sm ${styles.signIn}`} onClick={() => setSignIn(true)}>
              {t({ en: 'Sign In', hi: 'साइन इन' })}
            </button>
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
        <button
          className="btn btn-primary btn-block"
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => {
            setMenuOpen(false);
            setSignIn(true);
          }}
        >
          {t({ en: 'Sign In', hi: 'साइन इन' })}
        </button>
      </aside>

      <SignInModal open={signIn} onClose={() => setSignIn(false)} />
    </>
  );
}
