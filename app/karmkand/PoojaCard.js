import Link from 'next/link';
import { Clock, Signal } from 'lucide-react';
import styles from './karmkand.module.css';

export default function PoojaCard({ pooja }) {
  return (
    <Link href={`/karmkand/pooja-paddhati/${pooja.slug}`} className={`${styles.poojaCard} ${styles[`tone_${pooja.tone}`]}`}>
      <span className={styles.poojaArt}>
        <span className={styles.poojaEmoji} aria-hidden="true">
          {pooja.icon}
        </span>
      </span>
      <span className={styles.poojaBody}>
        <h3>{pooja.name}</h3>
        <span className={styles.poojaDeity}>{pooja.deity}</span>
        <p>{pooja.short}</p>
        <span className={styles.meta}>
          <span>
            <Signal size={13} /> {pooja.level}
          </span>
          <span>
            <Clock size={13} /> {pooja.duration}
          </span>
          <span>{pooja.stepCount ?? pooja.steps?.length ?? 0} चरण</span>
        </span>
      </span>
    </Link>
  );
}
