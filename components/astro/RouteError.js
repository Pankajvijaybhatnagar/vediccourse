'use client';

import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useLang } from '@/lib/i18n';

/** Body for a route's error.js (Next 16 passes `retry`, which re-fetches and re-renders the segment). */
export default function RouteError({ retry }) {
  const { t } = useLang();
  return (
    <section className="page-top section text-center" style={{ minHeight: '55vh' }}>
      <div className="container" style={{ maxWidth: 560 }}>
        <AlertTriangle size={36} color="var(--maroon)" aria-hidden="true" />
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', margin: '14px 0 10px' }}>
          {t({ en: 'The stars are briefly out of reach', hi: 'सितारे कुछ क्षणों के लिए पहुँच से बाहर हैं' })}
        </h1>
        <p className="muted" style={{ marginBottom: 26 }}>
          {t({
            en: 'We could not load this page right now. Please try again in a moment.',
            hi: 'यह पृष्ठ अभी लोड नहीं हो सका। कृपया थोड़ी देर में पुनः प्रयास करें।',
          })}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={() => retry?.()}>
            <RefreshCw size={16} aria-hidden="true" /> {t({ en: 'Try again', hi: 'पुनः प्रयास करें' })}
          </button>
          <Link href="/" className="btn btn-ghost">
            {t({ en: 'Go home', hi: 'होम पर जाएँ' })}
          </Link>
        </div>
      </div>
    </section>
  );
}
