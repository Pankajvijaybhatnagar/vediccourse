'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, X, Sparkles, HandHelping, TriangleAlert, BookOpen } from 'lucide-react';
import styles from '../karmkand.module.css';

/** Samagri kosh. `items`, `categories` and `poojas` (cards with samagriItems) come from the API. */
export default function SamagriKosh({ items = [], categories = [], poojas = [] }) {
  const bySlug = useMemo(() => new Map(items.map((s) => [s.slug, s])), [items]);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [open, setOpen] = useState(null);

  // Deep links like /karmkand/pooja-samagri#kalash open that item directly.
  useEffect(() => {
    const fromHash = () => {
      const slug = decodeURIComponent(window.location.hash.slice(1));
      if (bySlug.has(slug)) setOpen(slug);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, [bySlug]);

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
      items.filter(
        (s) =>
          (cat === 'all' || s.category === cat) &&
          (!q || s.name?.includes(q) || s.alt?.includes(q) || s.significance?.includes(q) || s.slug.includes(q.toLowerCase()))
      ),
    [items, q, cat]
  );

  const item = open && bySlug.get(open);
  const usedIn = item ? poojas.filter((p) => p.samagriItems?.includes(item.slug)) : [];

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
            सभी ({items.length})
          </button>
          {categories.map((c) => (
            <button key={c.key} className={styles.chip} aria-pressed={cat === c.key} onClick={() => setCat(c.key)}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={`card ${styles.empty}`} role="status">
            {items.length === 0 ? 'अभी सामग्री कोश उपलब्ध नहीं है। कृपया कुछ समय बाद पुनः देखें।' : <>&quot;{q}&quot; से संबंधित कोई सामग्री नहीं मिली। कोई दूसरा शब्द आज़माएँ।</>}
          </div>
        )}

        {categories.filter((c) => cat === 'all' || c.key === cat).map((c) => {
          const list = filtered.filter((s) => s.category === c.key);
          if (!list.length) return null;
          return (
            <div key={c.key}>
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
                        {s.image?.url ? <img src={s.image.url} alt="" width={44} height={44} loading="lazy" style={{ borderRadius: 12, objectFit: 'cover' }} /> : s.icon}
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
                {item.image?.url ? <img src={item.image.url} alt="" width={56} height={56} style={{ borderRadius: 14, objectFit: 'cover' }} /> : item.icon}
              </span>
              <div>
                <h2 id="samagri-title">{item.name}</h2>
                <small>
                  {categories.find((c) => c.key === item.category)?.name}
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
            {item.usage && (
              <div className={styles.modalSection}>
                <h3>
                  <HandHelping size={18} /> प्रयोग की विधि
                </h3>
                <p>{item.usage}</p>
              </div>
            )}
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
