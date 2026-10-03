'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X, Sparkles, HandHelping, TriangleAlert, BookOpen } from 'lucide-react';
import { SAMAGRI, SAMAGRI_CATEGORIES, getSamagri } from '@/lib/karmkand/samagri';
import { POOJAS } from '@/lib/karmkand/poojas';
import styles from '../karmkand.module.css';

export default function SamagriKosh() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [open, setOpen] = useState(null);

  // Deep links like /karmkand/pooja-samagri#kalash open that item directly.
  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (getSamagri(slug)) setOpen(slug);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    if (window.location.hash) history.replaceState(null, '', window.location.pathname);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  const q = query.trim();
  const filtered = useMemo(
    () =>
      SAMAGRI.filter(
        (s) =>
          (cat === 'all' || s.category === cat) &&
          (!q || s.name.includes(q) || (s.alt && s.alt.includes(q)) || s.significance.includes(q))
      ),
    [q, cat]
  );

  const item = open && getSamagri(open);
  const usedIn = item ? POOJAS.filter((p) => p.samagri.some(([s]) => s === item.slug)) : [];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.samagriTools}>
          <div className={styles.search}>
            <Search size={18} />
            <label htmlFor="samagri-search" className="sr-only">
              सामग्री खोजें
            </label>
            <input id="samagri-search" className="input" placeholder="सामग्री खोजें… जैसे कलश, तुलसी, दीपक" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
        <div className={styles.filterRow} role="group" aria-label="श्रेणी">
          <button className={styles.chip} aria-pressed={cat === 'all'} onClick={() => setCat('all')}>
            सभी ({SAMAGRI.length})
          </button>
          {SAMAGRI_CATEGORIES.map((c) => (
            <button key={c.id} className={styles.chip} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>

        {filtered.length === 0 && <div className={`card ${styles.empty}`}>&quot;{q}&quot; से संबंधित कोई सामग्री नहीं मिली। कोई दूसरा शब्द आज़माएँ।</div>}

        {SAMAGRI_CATEGORIES.filter((c) => cat === 'all' || c.id === cat).map((c) => {
          const list = filtered.filter((s) => s.category === c.id);
          if (!list.length) return null;
          return (
            <div key={c.id}>
              <div className={styles.catHead}>
                <span aria-hidden="true">{c.icon}</span>
                <div>
                  <h2>{c.name}</h2>
                  <p>{c.desc}</p>
                </div>
              </div>
              <div className={styles.samagriGrid}>
                {list.map((s) => (
                  <button key={s.slug} id={s.slug} className={styles.sCard} onClick={() => setOpen(s.slug)}>
                    <span className={styles.sTop}>
                      <span className={styles.sEmoji} aria-hidden="true">
                        {s.icon}
                      </span>
                      <span>
                        <h3>{s.name}</h3>
                        {s.alt && <small>अन्य नाम: {s.alt}</small>}
                      </span>
                    </span>
                    <p>{s.significance}</p>
                    <span className={styles.sMore}>पूरी जानकारी पढ़ें ›</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {item && (
        <div className={styles.backdrop} onClick={close}>
          <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="samagri-title" onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={close} aria-label="बंद करें">
              <X size={18} />
            </button>
            <div className={styles.modalHead}>
              <span className={styles.sEmoji} aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <h2 id="samagri-title">{item.name}</h2>
                <small>
                  {SAMAGRI_CATEGORIES.find((c) => c.id === item.category)?.name}
                  {item.alt && ` · अन्य नाम: ${item.alt}`}
                </small>
              </div>
            </div>
            <div className={styles.modalSection}>
              <h3>
                <Sparkles size={18} /> आध्यात्मिक महत्व
              </h3>
              <p>{item.significance}</p>
            </div>
            <div className={styles.modalSection}>
              <h3>
                <HandHelping size={18} /> प्रयोग की विधि
              </h3>
              <p>{item.usage}</p>
            </div>
            {item.tip && (
              <div className={`${styles.modalSection} ${styles.tipBox}`}>
                <h3>
                  <TriangleAlert size={18} /> ध्यान दें
                </h3>
                <p>{item.tip}</p>
              </div>
            )}
            {usedIn.length > 0 && (
              <div className={styles.modalSection}>
                <h3>
                  <BookOpen size={18} /> इन पूजाओं में प्रयोग होती है
                </h3>
                <div className={styles.usedIn}>
                  {usedIn.map((p) => (
                    <Link key={p.slug} href={`/karmkand/pooja-paddhati/${p.slug}`}>
                      {p.icon} {p.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
