'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import PoojaCard from '../PoojaCard';
import styles from '../karmkand.module.css';

/** Filterable pooja grid. `poojas` and `categories` come from the API (server-rendered). */
export default function PoojaList({ poojas = [], categories = [] }) {
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');

  const q = query.trim();
  const list = useMemo(
    () =>
      poojas.filter(
        (p) =>
          (cat === 'all' || p.category === cat) &&
          (!q || [p.name, p.deity, p.short].some((field) => field?.includes(q)) || p.slug.includes(q.toLowerCase()))
      ),
    [poojas, cat, q]
  );

  // Only offer categories that actually contain a pooja.
  const usedCategories = categories.filter((c) => poojas.some((p) => p.category === c.key));

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.samagriTools}>
          <div className={styles.search}>
            <Search size={18} />
            <label htmlFor="pooja-search" className="sr-only">
              पूजा खोजें
            </label>
            <input id="pooja-search" className="input" placeholder="पूजा खोजें… जैसे गणेश, हवन, लक्ष्मी" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
        </div>
        <div className={styles.filterRow} role="group" aria-label="पूजा का प्रकार">
          <button className={styles.chip} aria-pressed={cat === 'all'} onClick={() => setCat('all')}>
            सभी पूजाएँ ({poojas.length})
          </button>
          {usedCategories.map((c) => (
            <button key={c.key} className={styles.chip} aria-pressed={cat === c.key} onClick={() => setCat(c.key)}>
              {c.name}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className={`card ${styles.empty}`} role="status">
            {poojas.length === 0 ? 'अभी कोई पूजा विधि उपलब्ध नहीं है। कृपया कुछ समय बाद पुनः देखें।' : `"${q}" से संबंधित कोई पूजा नहीं मिली। कोई दूसरा शब्द या श्रेणी आज़माएँ।`}
          </div>
        ) : (
          <div className={styles.poojaGrid}>
            {list.map((p, i) => (
              <div key={p.slug} className="fade-up" style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}>
                <PoojaCard pooja={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
