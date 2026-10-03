'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { T } from '@/lib/i18n';

// Fallback for any page without its own error.js (e.g. the backend is briefly unreachable).
export default function Error({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="page-top section text-center" style={{ minHeight: '60vh' }}>
      <div className="container">
        <span className="eyebrow">
          <T en="A cloud passed over the stars" hi="सितारों पर बादल छा गए" />
        </span>
        <h1 style={{ margin: '8px 0 12px' }}>
          <T en="Something went wrong" hi="कुछ गड़बड़ हो गई" />
        </h1>
        <p className="muted" style={{ maxWidth: 480, margin: '0 auto 28px' }}>
          <T
            en="We couldn't load this page right now. Please try again in a moment."
            hi="हम अभी यह पृष्ठ लोड नहीं कर सके। कृपया कुछ क्षण बाद पुनः प्रयास करें।"
          />
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => retry()}>
            <T en="Try again" hi="पुनः प्रयास करें" />
          </button>
          <Link href="/" className="btn btn-ghost">
            <T en="Go Home" hi="होम पर जाएँ" />
          </Link>
        </div>
      </div>
    </section>
  );
}
