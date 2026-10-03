'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeftRight } from 'lucide-react';
import { SIGNS, getSign, ELEMENTS, localizeSign } from '@/lib/zodiac';
import { useLang } from '@/lib/i18n';
import { api } from '@/lib/api';
import { ErrorState, Loading } from '@/components/astro/States';
import styles from './compatibility.module.css';

function SignSelect({ id, label, value, onChange }) {
  const { t, lang } = useLang();
  const sign = localizeSign(getSign(value), lang);
  return (
    <div className={styles.selector}>
      <div className={styles.selectorGlyph} key={value}>
        <span className="glyph">{sign.glyph}</span>
      </div>
      <label htmlFor={id} className={styles.selectorLabel}>
        {t(label)}
      </label>
      <select id={id} className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        {SIGNS.map((s) => (
          <option key={s.slug} value={s.slug}>
            {localizeSign(s, lang).name}
          </option>
        ))}
      </select>
      <span className={styles.selectorMeta} style={{ color: ELEMENTS[sign.element].color }}>
        {sign.elementLabel} · {sign.dates}
      </span>
    </div>
  );
}

function ScoreRing({ value }) {
  const { t } = useLang();
  const [display, setDisplay] = useState(0);
  const r = 88;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1400, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <div className={styles.ring}>
      <svg viewBox="0 0 200 200">
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffd65a" />
            <stop offset="0.6" stopColor="#f6a609" />
            <stop offset="1" stopColor="#ef4b3f" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={r} fill="none" stroke="#f5ecd6" strokeWidth="12" />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ - (circ * display) / 100}
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div className={styles.ringValue}>
        <strong className="gold-text">{display}%</strong>
        <span>{t({ en: 'match', hi: 'मिलान' })}</span>
      </div>
    </div>
  );
}

export default function CompatibilityClient() {
  const params = useSearchParams();
  const { t, lang } = useLang();
  const valid = (s, fallback) => (getSign(s) ? s : fallback);
  const [a, setA] = useState(valid(params.get('a'), 'leo'));
  const [b, setB] = useState(valid(params.get('b'), 'libra'));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const resultRef = useRef(null);
  const statusRef = useRef(null);

  const fetchMatch = async (sa, sb, scroll) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api(`/compatibility?a=${sa}&b=${sb}`, { auth: false });
      setResult(data);
      if (scroll) requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    } catch (err) {
      setResult(null);
      setError(err);
      requestAnimationFrame(() => statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    } finally {
      setLoading(false);
    }
  };

  // Auto-reveal when arriving from a shared link with both signs.
  useEffect(() => {
    if (params.get('a') && params.get('b')) fetchMatch(a, b, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reveal = () => fetchMatch(a, b, true);

  const reset = () => {
    setResult(null);
    setError(null);
  };

  const swap = () => {
    setA(b);
    setB(a);
    reset();
  };

  const ra = result && localizeSign(getSign(result.a.slug), lang);
  const rb = result && localizeSign(getSign(result.b.slug), lang);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={`card card-glow ${styles.picker}`}>
          <SignSelect id="sign-a" label={{ en: 'Your sign', hi: 'आपकी राशि' }} value={a} onChange={(v) => { setA(v); reset(); }} />
          <button className={styles.swap} onClick={swap} aria-label={t({ en: 'Swap signs', hi: 'राशियाँ बदलें' })}>
            <span className={styles.heart}>♥</span>
            <small>
              <ArrowLeftRight size={13} /> {t({ en: 'swap', hi: 'बदलें' })}
            </small>
          </button>
          <SignSelect id="sign-b" label={{ en: "Partner's sign", hi: 'साथी की राशि' }} value={b} onChange={(v) => { setB(v); reset(); }} />
        </div>

        <div className={styles.revealRow}>
          <button className="btn btn-primary btn-lg" onClick={reveal} disabled={loading} aria-busy={loading}>
            ✦ {loading ? t({ en: 'Reading the stars…', hi: 'सितारे पढ़े जा रहे हैं…' }) : t({ en: 'Reveal Compatibility', hi: 'अनुकूलता देखें' })}
          </button>
        </div>

        <div ref={statusRef}>
          {loading && !result && <Loading />}
          <ErrorState error={error} onRetry={reveal} />
        </div>

        {result && (
          <div ref={resultRef} className={`card ${styles.result} fade-up`} key={`${result.a.slug}-${result.b.slug}`}>
            <div className={styles.resultTop}>
              <ScoreRing value={result.overall} />
              <div>
                <p className={styles.pair}>
                  <span className="glyph">{ra.glyph}</span> {ra.name}
                  <span className={styles.amp}>&</span>
                  <span className="glyph">{rb.glyph}</span> {rb.name}
                </p>
                <h2 className={styles.verdictTitle}>{t(result.verdict.title)}</h2>
                <p className="muted">{t(result.verdict.text)}</p>
                <div className={styles.guna}>
                  <strong>
                    {result.gunas}/36
                  </strong>
                  <span>{t({ en: 'Guna Milan (sign-based estimate)', hi: 'गुण मिलान (राशि आधारित अनुमान)' })}</span>
                </div>
              </div>
            </div>

            <div className={styles.categories}>
              {result.categories.map((c) => (
                <div key={c.label.en} className={styles.category}>
                  <div className={styles.categoryHead}>
                    <span>{t(c.label)}</span>
                    <strong>{c.value}%</strong>
                  </div>
                  <div className="meter">
                    <span style={{ width: `${c.value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <p className={styles.note}>
              {t({
                en: 'For complete Ashtakoot Kundli matching with birth details, ',
                hi: 'जन्म विवरण के साथ पूर्ण अष्टकूट कुंडली मिलान के लिए ',
              })}
              <Link href="/astrologers?focus=marriage">{t({ en: 'consult a marriage astrologer', hi: 'विवाह ज्योतिषी से परामर्श लें' })}</Link>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
