import Link from 'next/link';
import { T } from '@/lib/i18n';

export default function NotFound() {
  return (
    <section className="page-top section text-center" style={{ minHeight: '70vh' }}>
      <div className="container">
        <span className="eyebrow">
          <T en="Lost among the stars" hi="सितारों में खो गए" />
        </span>
        <h1 style={{ fontSize: 'clamp(5rem, 14vw, 9rem)', margin: 0 }}>
          <span className="gold-text">404</span>
        </h1>
        <p className="muted" style={{ maxWidth: 480, margin: '0 auto 32px', fontSize: '1.1rem' }}>
          <T
            en="This page has drifted beyond the known constellations. Let's guide you back home."
            hi="यह पृष्ठ ज्ञात नक्षत्रों से परे चला गया है। आइए आपको वापस ले चलें।"
          />
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">
            <T en="Return Home" hi="होम पर जाएँ" />
          </Link>
          <Link href="/horoscope" className="btn btn-ghost">
            <T en="Today's Horoscope" hi="आज का राशिफल" />
          </Link>
        </div>
      </div>
    </section>
  );
}
