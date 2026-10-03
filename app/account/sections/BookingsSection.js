'use client';

import Link from 'next/link';
import { CalendarCheck2, ChevronRight, MessageCircle, PhoneCall, Video } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { EmptyState, ErrorState, ListSkeleton, LoadMore, StatusBadge, formatDate, useApiList } from '../ui';
import styles from '../account.module.css';

const MODE = {
  chat: { icon: MessageCircle, label: { en: 'Chat', hi: 'चैट' } },
  call: { icon: PhoneCall, label: { en: 'Call', hi: 'कॉल' } },
  video: { icon: Video, label: { en: 'Video', hi: 'वीडियो' } },
};

export default function BookingsSection() {
  const { t, lang } = useLang();
  const list = useApiList('/consultations/bookings/mine');

  if (list.status === 'loading') return <ListSkeleton />;
  if (list.status === 'error') return <ErrorState error={list.error} onRetry={list.reload} />;
  if (!list.items.length) {
    return (
      <EmptyState
        icon={CalendarCheck2}
        title={{ en: 'No consultations booked yet', hi: 'अभी तक कोई परामर्श बुक नहीं किया गया' }}
        text={{ en: 'Book a session with one of our expert astrologers.', hi: 'हमारे विशेषज्ञ ज्योतिषियों से सत्र बुक करें।' }}
        href="/contact"
        cta={{ en: 'Book a consultation', hi: 'परामर्श बुक करें' }}
      />
    );
  }

  return (
    <>
      <ul className={styles.list}>
        {list.items.map((b) => {
          const mode = MODE[b.mode] || MODE.call;
          const ModeIcon = mode.icon;
          return (
            <li key={b.id}>
              <Link href={`/booking/${b.id}`} className={styles.row}>
                <span className={styles.rowIcon}>
                  <ModeIcon size={18} aria-hidden="true" />
                </span>
                <span className={styles.rowMain}>
                  <strong>{t(b.planSnapshot?.name) || t({ en: 'Consultation', hi: 'परामर्श' })}</strong>
                  <small>
                    #{b.bookingNo} · {t(mode.label)} · {b.astrologer ? t(b.astrologer.name) : t({ en: 'Any available astrologer', hi: 'कोई भी उपलब्ध ज्योतिषी' })}
                  </small>
                  <small>
                    {b.scheduledAt
                      ? `${t({ en: 'Scheduled', hi: 'निर्धारित' })}: ${formatDate(b.scheduledAt, lang, { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })}`
                      : `${t({ en: 'Preferred date', hi: 'पसंदीदा तिथि' })}: ${formatDate(b.preferredDate, lang)}`}
                  </small>
                </span>
                <span className={styles.rowSide}>
                  <StatusBadge status={b.status} />
                  {b.payment?.status && b.payment.status !== 'unpaid' && <StatusBadge status={b.payment.status} />}
                  <ChevronRight size={18} aria-hidden="true" className={styles.chev} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <LoadMore list={list} />
    </>
  );
}
