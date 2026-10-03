'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BookOpen, CalendarCheck2, CreditCard, Grid3x3, Layers, LockKeyhole, LogIn, UserRound } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useLang } from '@/lib/i18n';
import { Avatar } from '@/components/auth/UserMenu';
import ProfileSection from './sections/ProfileSection';
import SecuritySection from './sections/SecuritySection';
import BookingsSection from './sections/BookingsSection';
import PaymentsSection from './sections/PaymentsSection';
import KundlisSection from './sections/KundlisSection';
import ReadingsSection from './sections/ReadingsSection';
import LearningSection from './sections/LearningSection';
import { ListSkeleton } from './ui';
import styles from './account.module.css';

const SECTIONS = [
  { id: 'profile', icon: UserRound, label: { en: 'Profile', hi: 'प्रोफ़ाइल' }, Cmp: ProfileSection },
  { id: 'bookings', icon: CalendarCheck2, label: { en: 'My Bookings', hi: 'मेरी बुकिंग' }, Cmp: BookingsSection },
  { id: 'payments', icon: CreditCard, label: { en: 'Payments', hi: 'भुगतान' }, Cmp: PaymentsSection },
  { id: 'kundlis', icon: Grid3x3, label: { en: 'Saved Kundlis', hi: 'सहेजी कुंडलियाँ' }, Cmp: KundlisSection },
  { id: 'readings', icon: Layers, label: { en: 'Tarot Readings', hi: 'टैरो रीडिंग' }, Cmp: ReadingsSection },
  { id: 'learning', icon: BookOpen, label: { en: 'Learning', hi: 'अध्ययन प्रगति' }, Cmp: LearningSection },
  { id: 'security', icon: LockKeyhole, label: { en: 'Security', hi: 'सुरक्षा' }, Cmp: SecuritySection },
];

export default function AccountClient({ initialTab }) {
  const { t } = useLang();
  const { user, ready, openSignIn } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState(initialTab);

  // Header links (e.g. "My Bookings") change ?tab= while this page is already open.
  useEffect(() => setTab(initialTab), [initialTab]);

  const select = (id) => {
    setTab(id);
    router.replace(id === 'profile' ? '/account' : `/account?tab=${id}`, { scroll: false });
  };

  if (!ready) {
    return (
      <section className={`${styles.page} page-top`}>
        <div className="container">
          <ListSkeleton rows={4} />
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className={`${styles.page} page-top`}>
        <div className="container">
          <div className={styles.gate}>
            <LogIn size={40} aria-hidden="true" />
            <h1>{t({ en: 'Sign in to view your account', hi: 'अपना खाता देखने के लिए साइन इन करें' })}</h1>
            <p className="muted">{t({ en: 'Your bookings, saved kundlis and settings are available after signing in.', hi: 'आपकी बुकिंग, सहेजी कुंडलियाँ और सेटिंग्स साइन इन के बाद उपलब्ध हैं।' })}</p>
            <div className={styles.gateBtns}>
              <button type="button" className="btn btn-primary" onClick={() => openSignIn()}>
                {t({ en: 'Sign in', hi: 'साइन इन करें' })}
              </button>
              <Link href={`/login?next=${encodeURIComponent(tab === 'profile' ? '/account' : `/account?tab=${tab}`)}`} className="btn btn-ghost">
                {t({ en: 'Open full sign-in page', hi: 'पूरा साइन-इन पेज खोलें' })}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const active = SECTIONS.find((s) => s.id === tab) || SECTIONS[0];
  const Active = active.Cmp;

  return (
    <section className={`${styles.page} page-top`}>
      <div className="container">
        <header className={styles.hero}>
          <Avatar user={user} size={64} />
          <div>
            <span className="eyebrow">{t({ en: 'My Account', hi: 'मेरा खाता' })}</span>
            <h1>{user.name ? t({ en: `Namaste, ${user.name.split(' ')[0]}`, hi: `नमस्ते, ${user.name.split(' ')[0]}` }) : t({ en: 'Namaste!', hi: 'नमस्ते!' })}</h1>
            <p className="muted">{user.email || (user.phone ? `+91 ${user.phone}` : '')}</p>
          </div>
        </header>

        <div className={styles.layout}>
          <nav className={styles.tabs} aria-label={t({ en: 'Account sections', hi: 'खाता अनुभाग' })}>
            {SECTIONS.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                className={`${styles.tab} ${tab === id ? styles.tabOn : ''}`}
                aria-current={tab === id ? 'page' : undefined}
                onClick={() => select(id)}
              >
                <Icon size={17} aria-hidden="true" />
                {t(label)}
              </button>
            ))}
          </nav>

          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>{t(active.label)}</h2>
            <Active />
          </div>
        </div>
      </div>
    </section>
  );
}
