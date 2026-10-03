'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RotateCw } from 'lucide-react';
import { useLang } from '@/lib/i18n';

/**
 * Shared route-level UI states for loading.js / error.js files.
 *   export default function Loading() { return <RouteLoading /> }
 *   export default function Error(props) { return <RouteError {...props} /> }
 */

export function RouteLoading({ label }) {
  const { t } = useLang();
  return (
    <section className="page-top section" aria-busy="true" aria-live="polite" style={{ minHeight: '60vh' }}>
      <div className="container" style={{ display: 'grid', gap: 18 }}>
        <span className="sr-only">{label ? t(label) : t({ en: 'Loading…', hi: 'लोड हो रहा है…' })}</span>
        <div className="skeleton" style={{ height: 150, borderRadius: 24 }} />
        <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="skeleton" style={{ height: 180, borderRadius: 16 }} />
          ))}
        </div>
        <style>{`
          .skeleton { background: linear-gradient(90deg, var(--bg-soft) 25%, var(--bg-cream) 50%, var(--bg-soft) 75%); background-size: 200% 100%; animation: vd-shimmer 1.4s ease-in-out infinite; }
          @keyframes vd-shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
          @media (prefers-reduced-motion: reduce) { .skeleton { animation: none } }
        `}</style>
      </div>
    </section>
  );
}

export function RouteError({ error, retry, reset, homeHref = '/' }) {
  const { t } = useLang();

  useEffect(() => {
    console.error(error);
  }, [error]);

  const tryAgain = retry ?? reset;

  return (
    <section className="page-top section text-center" role="alert" style={{ minHeight: '60vh' }}>
      <div className="container" style={{ maxWidth: 560 }}>
        <span className="eyebrow">{t({ en: 'Something went wrong', hi: 'कुछ गड़बड़ हो गई' })}</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.3rem)' }}>
          {t({ en: 'We could not load this page', hi: 'यह पृष्ठ लोड नहीं हो सका' })}
        </h1>
        <p className="muted" style={{ margin: '0 auto 28px' }}>
          {t({
            en: 'The service may be busy or your connection dropped. Please try again in a moment.',
            hi: 'सेवा व्यस्त हो सकती है या आपका कनेक्शन टूट गया। कृपया कुछ क्षण बाद पुनः प्रयास करें।',
          })}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {tryAgain && (
            <button className="btn btn-primary" onClick={() => tryAgain()}>
              <RotateCw size={16} /> {t({ en: 'Try again', hi: 'पुनः प्रयास करें' })}
            </button>
          )}
          <Link href={homeHref} className="btn btn-ghost">
            {t({ en: 'Go back', hi: 'वापस जाएँ' })}
          </Link>
        </div>
        {error?.digest && <p className="muted" style={{ marginTop: 20, fontSize: '0.8rem' }}>Ref: {error.digest}</p>}
      </div>
    </section>
  );
}
