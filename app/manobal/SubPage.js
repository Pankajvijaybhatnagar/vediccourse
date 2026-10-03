'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import HelpBanner from '@/components/manobal/HelpBanner';
import SelfCheck from '@/components/manobal/SelfCheck';
import CareerCompass from '@/components/manobal/CareerCompass';
import styles from './manobal.module.css';

const COPY = {
  'self-check': {
    title: { en: 'Confidential Self-Check', hi: 'गोपनीय स्व-जाँच' },
    lead: {
      en: 'Two short questionnaires used by doctors worldwide help you understand how anxiety or low mood may be affecting you, and what to do next.',
      hi: 'विश्व भर में डॉक्टरों द्वारा प्रयुक्त दो छोटी प्रश्नावलियाँ आपको समझने में सहायता करती हैं कि चिंता या उदासी आपको कितना प्रभावित कर रही है, और आगे क्या करें।',
    },
  },
  career: {
    title: { en: 'Career Compass', hi: 'करियर कम्पास' },
    lead: {
      en: 'Discover what naturally interests you, then see what your birth chart’s 10th house (Karma Bhava) suggests. Together they point to directions worth exploring.',
      hi: 'जानिए आपकी स्वाभाविक रुचि किसमें है, फिर देखें कि आपकी कुंडली का दशम भाव (कर्म भाव) क्या संकेत देता है। दोनों मिलकर खोजने योग्य दिशाएँ दिखाते हैं।',
    },
  },
};

export default function SubPage({ kind }) {
  const { t } = useLang();
  const c = COPY[kind];
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={`${styles.subHero} fade-up`}>
          <nav className={styles.crumbs} aria-label="Breadcrumb">
            <Link href="/">{t({ en: 'Home', hi: 'होम' })}</Link> › <Link href="/manobal">{t({ en: 'Manobal', hi: 'मनोबल' })}</Link> ›{' '}
            <span>{t(c.title)}</span>
          </nav>
          <h1>{t(c.title)}</h1>
          <p>{t(c.lead)}</p>
        </header>
        <HelpBanner compact />
        <div className={styles.panel}>{kind === 'career' ? <CareerCompass /> : <SelfCheck />}</div>
        {kind === 'career' && (
          <div className={styles.block}>
            <HelpBanner />
          </div>
        )}
      </div>
    </div>
  );
}
