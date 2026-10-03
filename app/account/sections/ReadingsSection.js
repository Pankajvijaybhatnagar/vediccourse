'use client';

import { Layers } from 'lucide-react';
import { api } from '@/lib/api';
import { useLang } from '@/lib/i18n';
import { ConfirmButton, EmptyState, ErrorState, ListSkeleton, LoadMore, formatDateTime, useApiList } from '../ui';
import styles from '../account.module.css';

export default function ReadingsSection() {
  const { t, lang } = useLang();
  const list = useApiList('/tarot/readings');

  const remove = async (id) => {
    await api(`/tarot/readings/${id}`, { method: 'DELETE' });
    list.setItems((items) => items.filter((r) => r.id !== id));
  };

  if (list.status === 'loading') return <ListSkeleton />;
  if (list.status === 'error') return <ErrorState error={list.error} onRetry={list.reload} />;
  if (!list.items.length) {
    return (
      <EmptyState
        icon={Layers}
        title={{ en: 'No saved readings', hi: 'कोई सहेजी रीडिंग नहीं' }}
        text={{ en: 'Draw cards on the Tarot page and save the reading to revisit it here.', hi: 'टैरो पेज पर कार्ड निकालें और रीडिंग सहेजें, फिर यहाँ देखें।' }}
        href="/tarot"
        cta={{ en: 'Get a tarot reading', hi: 'टैरो रीडिंग लें' }}
      />
    );
  }

  return (
    <>
      <ul className={styles.list}>
        {list.items.map((r) => (
          <li key={r.id} className={styles.reading}>
            <div className={styles.readingHead}>
              <div>
                <strong>{r.question || t({ en: 'General reading', hi: 'सामान्य रीडिंग' })}</strong>
                <small className="muted">{formatDateTime(r.createdAt, lang)}</small>
              </div>
              <ConfirmButton onConfirm={() => remove(r.id)} confirmLabel={t({ en: 'Delete?', hi: 'हटाएँ?' })}>
                {t({ en: 'Delete', hi: 'हटाएँ' })}
              </ConfirmButton>
            </div>
            <ol className={styles.cardsDrawn}>
              {(r.cards || []).map((c, i) => (
                <li key={i}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    {c.icon || '✦'}
                  </span>
                  <span>
                    {c.position && <small>{t(c.position)}</small>}
                    <b>
                      {t(c.name)}
                      {c.isReversed ? ` (${t({ en: 'reversed', hi: 'उलटा' })})` : ''}
                    </b>
                    {c.meaning && <span className="muted">{t(c.meaning)}</span>}
                  </span>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
      <LoadMore list={list} />
    </>
  );
}
