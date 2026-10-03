'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="page-top section text-center" style={{ minHeight: '60vh' }}>
      <div className="container">
        <span className="eyebrow">ज्योतिष सीखें</span>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>पाठ इस समय लोड नहीं हो सका</h1>
        <p className="muted" style={{ maxWidth: 520, margin: '0 auto 28px' }}>
          सर्वर से संपर्क में अस्थायी समस्या है। कृपया कुछ क्षण बाद पुनः प्रयास करें।
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={() => retry()}>
            पुनः प्रयास करें
          </button>
          <Link href="/" className="btn btn-ghost">
            होम पर जाएँ
          </Link>
        </div>
      </div>
    </section>
  );
}
