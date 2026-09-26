'use client';

import { useState } from 'react';
import { POOJAS, POOJA_CATEGORIES } from '@/lib/karmkand/poojas';
import PoojaCard from '../PoojaCard';
import styles from '../karmkand.module.css';

export default function PoojaList() {
  const [cat, setCat] = useState('all');
  const list = cat === 'all' ? POOJAS : POOJAS.filter((p) => p.category === cat);

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.filterRow} role="group" aria-label="पूजा का प्रकार">
          {POOJA_CATEGORIES.map((c) => (
            <button key={c.id} className={styles.chip} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.name}
            </button>
          ))}
        </div>
        <div className={styles.poojaGrid}>
          {list.map((p, i) => (
            <div key={p.slug} className="fade-up" style={{ animationDelay: `${i * 60}ms` }}>
              <PoojaCard pooja={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
