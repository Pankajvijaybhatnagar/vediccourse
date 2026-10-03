'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n';
import HelpBanner from '@/components/manobal/HelpBanner';

export default function Error({ error, retry }) {
  const { t } = useLang();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="page-top section" style={{ minHeight: '60vh' }}>
      <div className="container text-center">
        <span className="eyebrow">{t({ en: 'Manobal', hi: 'मनोबल' })}</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>
          {t({ en: 'This page could not load right now', hi: 'यह पृष्ठ इस समय लोड नहीं हो सका' })}
        </h1>
        <p className="muted" style={{ maxWidth: 520, margin: '0 auto 28px' }}>
          {t({
            en: 'We are having a temporary problem reaching our server. Please try again in a moment.',
            hi: 'सर्वर से संपर्क में अस्थायी समस्या है। कृपया कुछ क्षण बाद पुनः प्रयास करें।',
          })}
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          <button type="button" className="btn btn-primary" onClick={() => retry()}>
            {t({ en: 'Try again', hi: 'पुनः प्रयास करें' })}
          </button>
          <Link href="/" className="btn btn-ghost">
            {t({ en: 'Go home', hi: 'होम पर जाएँ' })}
          </Link>
        </div>
      </div>
      {/* Help must stay reachable even when the content can't load. */}
      <div className="container">
        <HelpBanner />
      </div>
    </section>
  );
}
