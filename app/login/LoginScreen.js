'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CalendarCheck2, Grid3x3, Sparkles, BookOpen } from 'lucide-react';
import { useAuth, safeNext } from '@/lib/auth';
import { useLang } from '@/lib/i18n';
import AuthForm from '@/components/auth/AuthForm';
import styles from './login.module.css';

const PERKS = [
  { icon: CalendarCheck2, text: { en: 'Book and track consultations with expert astrologers', hi: 'विशेषज्ञ ज्योतिषियों से परामर्श बुक करें और ट्रैक करें' } },
  { icon: Grid3x3, text: { en: 'Save kundlis for yourself and your family', hi: 'अपनी और परिवार की कुंडली सहेजें' } },
  { icon: BookOpen, text: { en: 'Keep your Jyotish & Manobal learning progress', hi: 'ज्योतिष और मनोबल सीखने की प्रगति सुरक्षित रखें' } },
  { icon: Sparkles, text: { en: 'Your first consultation is FREE', hi: 'आपका पहला परामर्श मुफ़्त' } },
];

export default function LoginScreen({ next, mode }) {
  const { t } = useLang();
  const { user, ready } = useAuth();
  const router = useRouter();
  const target = safeNext(next, '/account');

  // Already signed in (or just signed in): go where the user was heading.
  useEffect(() => {
    if (ready && user) router.replace(target);
  }, [ready, user, router, target]);

  return (
    <section className={`${styles.wrap} page-top`}>
      <div className={`container ${styles.grid}`}>
        <aside className={styles.brand} aria-hidden="false">
          <div className={styles.om} aria-hidden="true">
            ॐ
          </div>
          <h1>
            {t({ en: 'Welcome to', hi: 'स्वागत है' })} <span className="gold-text">{t({ en: 'VedicDhaam', hi: 'वैदिकधाम' })}</span>
          </h1>
          <p className={styles.lead}>{t({ en: 'Ancient wisdom, modern guidance. One account for everything.', hi: 'प्राचीन ज्ञान, आधुनिक मार्गदर्शन। सब कुछ एक ही खाते में।' })}</p>
          <ul className={styles.perks}>
            {PERKS.map(({ icon: Icon, text }) => (
              <li key={text.en}>
                <span>
                  <Icon size={18} aria-hidden="true" />
                </span>
                {t(text)}
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.card}>
          <h2>{mode === 'register' ? t({ en: 'Create your account', hi: 'अपना खाता बनाएँ' }) : t({ en: 'Sign in', hi: 'साइन इन करें' })}</h2>
          <p className="muted">{t({ en: 'Use your mobile number, email or a social account.', hi: 'अपने मोबाइल नंबर, ईमेल या सोशल खाते का उपयोग करें।' })}</p>
          <div className={styles.formSlot}>
            {ready && user ? (
              <p className="muted" role="status">
                {t({ en: 'Signed in. Redirecting…', hi: 'साइन इन हो गया। आगे ले जा रहे हैं…' })}
              </p>
            ) : (
              <AuthForm initialMode={mode} onSuccess={() => router.replace(target)} />
            )}
          </div>
          <p className={styles.back}>
            <Link href="/">{t({ en: '← Back to home', hi: '← होम पर वापस' })}</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
