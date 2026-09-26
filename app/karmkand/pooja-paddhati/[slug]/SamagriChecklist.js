'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Printer, RotateCcw } from 'lucide-react';
import styles from '../../karmkand.module.css';

const KEY = (slug) => `vedicdhaam-samagri-${slug}`;

// Tick-off list so people can gather everything before starting; remembered per pooja on this device.
export default function SamagriChecklist({ slug, items }) {
  const [done, setDone] = useState({});

  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem(KEY(slug)) || '{}'));
    } catch {}
  }, [slug]);

  const toggle = (s) => {
    setDone((d) => {
      const next = { ...d, [s]: !d[s] };
      try {
        localStorage.setItem(KEY(slug), JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const reset = () => {
    setDone({});
    try {
      localStorage.removeItem(KEY(slug));
    } catch {}
  };

  const count = items.filter((i) => done[i.slug]).length;

  return (
    <div>
      <div className={styles.checkHead}>
        <span className={styles.progressText}>
          {count === items.length ? '✅ सारी सामग्री तैयार है!' : `${count} / ${items.length} सामग्री तैयार`}
        </span>
        <span style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost btn-sm" onClick={reset} disabled={!count}>
            <RotateCcw size={14} /> पुनः आरंभ
          </button>
          <button className="btn btn-ghost btn-sm" onClick={() => window.print()}>
            <Printer size={14} /> सूची छापें
          </button>
        </span>
      </div>
      <div className={styles.progressBar} aria-hidden="true">
        <span style={{ width: `${(count / items.length) * 100}%` }} />
      </div>
      <div className={styles.checklist}>
        {items.map((it) => (
          <label key={it.slug} className={`${styles.checkItem} ${done[it.slug] ? styles.done : ''}`}>
            <input type="checkbox" checked={!!done[it.slug]} onChange={() => toggle(it.slug)} />
            <span className={styles.itemEmoji} aria-hidden="true">
              {it.icon}
            </span>
            <span className={styles.itemName}>
              {it.name}
              <br />
              <span className={styles.itemQty}>मात्रा: {it.qty}</span>
            </span>
            <Link href={`/karmkand/pooja-samagri#${it.slug}`} className={styles.itemLink} onClick={(e) => e.stopPropagation()}>
              महत्व ›
            </Link>
          </label>
        ))}
      </div>
    </div>
  );
}
