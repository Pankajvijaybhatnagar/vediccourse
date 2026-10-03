'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import { NAV_LINKS } from '@/lib/nav';
import Logo from './Logo';
import NewsletterForm from './NewsletterForm';
import styles from './Footer.module.css';

const QUICK = [
  { href: '/astrologers', label: { en: 'Astrologers', hi: 'ज्योतिषी' } },
  { href: '/astrologers?focus=love', label: { en: 'Love Astrologer', hi: 'प्रेम ज्योतिषी' } },
  { href: '/astrologers?focus=marriage', label: { en: 'Marriage Astrologer', hi: 'विवाह ज्योतिषी' } },
  { href: '/astrologers?focus=career', label: { en: 'Career Astrologer', hi: 'करियर ज्योतिषी' } },
  { href: '/astrologers?focus=money', label: { en: 'Financial Astrologer', hi: 'वित्तीय ज्योतिषी' } },
  { href: '/tarot', label: { en: 'Tarot Readers', hi: 'टैरो रीडर' } },
  { href: '/numerology', label: { en: 'Numerologist', hi: 'अंकशास्त्री' } },
  { href: '/contact?topic=vastu', label: { en: 'Vastu Experts', hi: 'वास्तु विशेषज्ञ' } },
  { href: '/contact', label: { en: 'Free Astrology Consultation', hi: 'मुफ़्त ज्योतिष परामर्श' } },
];

const USEFUL = [
  { href: '/contact?topic=general', label: { en: 'About Us', hi: 'हमारे बारे में' } },
  { href: '/contact?topic=general', label: { en: 'Contact Us', hi: 'संपर्क करें' } },
  { href: '/contact?topic=astrologer-registration', label: { en: 'Astrologer Registration', hi: 'ज्योतिषी पंजीकरण' } },
  { href: '/contact?topic=partnership', label: { en: 'Partner With Us', hi: 'साझेदार बनें' } },
  { href: '/contact?topic=careers', label: { en: 'Careers', hi: 'करियर' } },
  { href: '/contact?topic=refund', label: { en: 'Refund Policy', hi: 'रिफ़ंड नीति' } },
  { href: '/#news', label: { en: 'Media Coverage', hi: 'मीडिया कवरेज' } },
  { href: '/#videos', label: { en: 'Videos', hi: 'वीडियो' } },
  { href: '/blog', label: { en: 'Blog', hi: 'ब्लॉग' } },
];

const SOCIAL = [
  { name: 'Facebook', color: '#1877f2', path: 'M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z' },
  { name: 'YouTube', color: '#ff0000', path: 'M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8zM10 15V9l5.2 3z' },
  { name: 'Instagram', color: '#e1306c', path: 'M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.3-3.3a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z' },
  { name: 'X', color: '#111', path: 'M17.5 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5 21H1.9l7.3-8.3L1.5 3H8l4.4 5.8zm-1.1 16.2h1.7L7.2 4.7H5.4z' },
  { name: 'LinkedIn', color: '#0a66c2', path: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z' },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className={styles.footer}>
      <div className={styles.band}>
        <div className="container">
          <div className={styles.top}>
            <div className={styles.brand}>
              <Logo light />
              <p>
                {t({
                  en: 'Trusted Vedic astrology, daily rashifal, Kundli, Panchang and expert consultations in Hindi and English.',
                  hi: 'विश्वसनीय वैदिक ज्योतिष, दैनिक राशिफल, कुंडली, पंचांग और हिंदी व अंग्रेज़ी में विशेषज्ञ परामर्श।',
                })}
              </p>

              <h4>{t({ en: 'VedicDhaam Mobile Apps', hi: 'वैदिकधाम मोबाइल ऐप' })}</h4>
              <div className={styles.apps}>
                <span className={styles.store} aria-label="Get it on Google Play">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path d="M3.6 2.3 13.4 12l-9.8 9.7c-.4-.2-.6-.6-.6-1.1V3.4c0-.5.2-.9.6-1.1z" fill="#00d7fe" />
                    <path d="m16.8 8.6-3.4 3.4-9.8-9.7c.2-.1.5-.2.8-.2.3 0 .5.1.8.2z" fill="#00f076" />
                    <path d="m16.8 15.4-11.6 6.1c-.3.1-.5.2-.8.2-.3 0-.6-.1-.8-.2l9.8-9.5z" fill="#ff3a44" />
                    <path d="M20.4 12c0 .6-.3 1.1-.9 1.5l-2.7 1.9-3.4-3.4 3.4-3.4 2.7 1.9c.6.4.9.9.9 1.5z" fill="#ffd400" />
                  </svg>
                  <span>
                    <small>GET IT ON</small>Google Play
                  </span>
                </span>
                <span className={styles.store} aria-label="Download on the App Store">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff" aria-hidden="true">
                    <path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z" />
                  </svg>
                  <span>
                    <small>Download on the</small>App Store
                  </span>
                </span>
              </div>

              <h4>{t({ en: 'Follow us on', hi: 'हमें फ़ॉलो करें' })}</h4>
              <div className={styles.social}>
                {SOCIAL.map((s) => (
                  <a key={s.name} href="#" aria-label={s.name} style={{ '--brand': s.color }} onClick={(e) => e.preventDefault()}>
                    <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
                      <path d={s.path} fill="currentColor" fillRule="evenodd" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div className={styles.col}>
              <h4>{t({ en: 'Quick Links', hi: 'त्वरित लिंक' })}</h4>
              {QUICK.map((l) => (
                <Link key={l.label.en} href={l.href}>
                  {t(l.label)}
                </Link>
              ))}
            </div>

            <div className={styles.col}>
              <h4>{t({ en: 'Free Services', hi: 'मुफ़्त सेवाएँ' })}</h4>
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href}>
                  {t(l.label)}
                </Link>
              ))}
            </div>

            <div className={styles.col}>
              <h4>{t({ en: 'Useful Links', hi: 'उपयोगी लिंक' })}</h4>
              {USEFUL.map((l) => (
                <Link key={l.label.en} href={l.href}>
                  {t(l.label)}
                </Link>
              ))}
              <h4 className={styles.newsTitle}>{t({ en: 'Weekly Rashifal by Email', hi: 'ईमेल पर साप्ताहिक राशिफल' })}</h4>
              <NewsletterForm />
            </div>
          </div>

          <div className={styles.bottom}>
            <span>© {new Date().getFullYear()} VedicDhaam. {t({ en: 'All rights reserved.', hi: 'सर्वाधिकार सुरक्षित।' })}</span>
            <nav aria-label="Legal">
              <Link href="/contact">{t({ en: 'Privacy Policy', hi: 'गोपनीयता नीति' })}</Link>
              <Link href="/#blogs">{t({ en: 'FAQs', hi: 'सामान्य प्रश्न' })}</Link>
              <Link href="/contact">{t({ en: 'T&C', hi: 'नियम व शर्तें' })}</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
