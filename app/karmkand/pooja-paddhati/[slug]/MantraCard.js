'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import styles from '../../karmkand.module.css';

export default function MantraCard({ mantra }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(`${mantra.name}\n\n${mantra.text}\n\nअर्थ: ${mantra.meaning}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <article className={styles.mantraCard}>
      <div className={styles.mantraTop}>
        <h3>{mantra.name}</h3>
        <button className={styles.copyBtn} onClick={copy} aria-label={`${mantra.name} कॉपी करें`}>
          {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'कॉपी हो गया' : 'कॉपी करें'}
        </button>
      </div>
      <p className={styles.mantraText}>{mantra.text}</p>
      <p className={styles.mantraMeaning}>
        <b>अर्थ — </b>
        {mantra.meaning}
      </p>
    </article>
  );
}
