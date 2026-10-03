'use client';

import Link from 'next/link';
import { Grid3x3, MapPin } from 'lucide-react';
import { api } from '@/lib/api';
import { useLang } from '@/lib/i18n';
import { ConfirmButton, EmptyState, ErrorState, ListSkeleton, LoadMore, formatDate, useApiList } from '../ui';
import styles from '../account.module.css';

const RELATION = {
  self: { en: 'Self', hi: 'स्वयं' },
  family: { en: 'Family', hi: 'परिवार' },
  friend: { en: 'Friend', hi: 'मित्र' },
  other: { en: 'Other', hi: 'अन्य' },
};

export default function KundlisSection() {
  const { t, lang } = useLang();
  const list = useApiList('/kundli', { limit: 12 });

  const remove = async (id) => {
    await api(`/kundli/${id}`, { method: 'DELETE' });
    list.setItems((items) => items.filter((k) => k.id !== id));
  };

  if (list.status === 'loading') return <ListSkeleton />;
  if (list.status === 'error') return <ErrorState error={list.error} onRetry={list.reload} />;
  if (!list.items.length) {
    return (
      <EmptyState
        icon={Grid3x3}
        title={{ en: 'No saved kundlis', hi: 'कोई सहेजी कुंडली नहीं' }}
        text={{ en: 'Generate a free Janam Kundli and save it for quick access.', hi: 'मुफ़्त जन्म कुंडली बनाएँ और त्वरित उपयोग हेतु सहेजें।' }}
        href="/birth-chart"
        cta={{ en: 'Create a kundli', hi: 'कुंडली बनाएँ' }}
      />
    );
  }

  return (
    <>
      <div className={styles.cardsHead}>
        <Link href="/birth-chart" className="btn btn-primary btn-sm">
          {t({ en: '+ New kundli', hi: '+ नई कुंडली' })}
        </Link>
      </div>
      <ul className={styles.tiles}>
        {list.items.map((k) => (
          <li key={k.id} className={styles.tile}>
            <div className={styles.tileTop}>
              <strong>{k.name}</strong>
              <span className={styles.chip}>{t(RELATION[k.relation] || RELATION.other)}</span>
            </div>
            <p className={styles.tileMeta}>
              {formatDate(k.birth?.date, lang)}
              {k.birth?.time ? ` · ${k.birth.time}` : ''}
            </p>
            {k.birth?.place?.name && (
              <p className={styles.tileMeta}>
                <MapPin size={13} aria-hidden="true" /> {k.birth.place.name}
              </p>
            )}
            <div className={styles.btnRow}>
              <Link href={`/birth-chart?saved=${k.id}`} className="btn btn-primary btn-sm">
                {t({ en: 'Open chart', hi: 'कुंडली देखें' })}
              </Link>
              <ConfirmButton onConfirm={() => remove(k.id)} confirmLabel={t({ en: 'Delete?', hi: 'हटाएँ?' })}>
                {t({ en: 'Delete', hi: 'हटाएँ' })}
              </ConfirmButton>
            </div>
          </li>
        ))}
      </ul>
      <LoadMore list={list} />
    </>
  );
}
