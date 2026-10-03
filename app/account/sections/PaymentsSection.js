'use client';

import Link from 'next/link';
import { CreditCard, Globe } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { EmptyState, ErrorState, ListSkeleton, LoadMore, StatusBadge, formatDateTime, formatMoney, minorToMajor, useApiList } from '../ui';
import styles from '../account.module.css';

export default function PaymentsSection() {
  const { t, lang } = useLang();
  const list = useApiList('/payments/mine');

  if (list.status === 'loading') return <ListSkeleton />;
  if (list.status === 'error') return <ErrorState error={list.error} onRetry={list.reload} />;
  if (!list.items.length) {
    return (
      <EmptyState
        icon={CreditCard}
        title={{ en: 'No payments yet', hi: 'अभी तक कोई भुगतान नहीं' }}
        text={{ en: 'Payments for your consultations will appear here.', hi: 'आपके परामर्शों के भुगतान यहाँ दिखाई देंगे।' }}
      />
    );
  }

  return (
    <>
      <ul className={styles.list}>
        {list.items.map((p) => {
          const booking = p.booking && typeof p.booking === 'object' ? p.booking : null;
          const bookingId = booking?.id || booking?._id || (typeof p.booking === 'string' ? p.booking : null);
          const refunded = (p.refunds || []).reduce((s, r) => s + (r.status !== 'failed' ? r.amount || 0 : 0), 0);
          return (
            <li key={p.id} className={styles.row}>
              <span className={styles.rowIcon}>{p.international ? <Globe size={18} aria-hidden="true" /> : <CreditCard size={18} aria-hidden="true" />}</span>
              <span className={styles.rowMain}>
                <strong>{formatMoney(minorToMajor(p.amount, p.currency), p.currency, lang)}</strong>
                <small>
                  {booking?.bookingNo ? `#${booking.bookingNo}` : t({ en: 'Consultation', hi: 'परामर्श' })}
                  {p.method ? ` · ${p.method.toUpperCase()}` : ''} · {formatDateTime(p.createdAt, lang)}
                </small>
                {refunded > 0 && (
                  <small>
                    {t({ en: 'Refunded', hi: 'वापसी' })}: {formatMoney(minorToMajor(refunded, p.currency), p.currency, lang)}
                  </small>
                )}
                {p.status === 'failed' && p.failureReason && <small className="error-text">{p.failureReason}</small>}
              </span>
              <span className={styles.rowSide}>
                <StatusBadge status={p.status} />
                {bookingId && (
                  <Link href={`/booking/${bookingId}`} className={styles.linkBtn}>
                    {t({ en: 'View booking', hi: 'बुकिंग देखें' })}
                  </Link>
                )}
              </span>
            </li>
          );
        })}
      </ul>
      <LoadMore list={list} />
    </>
  );
}
