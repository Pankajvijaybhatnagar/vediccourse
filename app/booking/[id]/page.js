import { Suspense } from 'react';
import { Skeleton } from '@/components/booking/PageStates';
import BookingStatus from './BookingStatus';

export const metadata = {
  title: 'Your booking · आपकी बुकिंग',
  robots: { index: false, follow: false }, // personal page
};

// Booking pages are personal and fetched in the browser; nothing to prerender.
export function generateStaticParams() {
  return [];
}

export default async function BookingPage({ params }) {
  const { id } = await params;
  return (
    <section className="page-top section" style={{ paddingTop: 'calc(var(--header-h) + 24px)' }}>
      <Suspense fallback={<Skeleton rows={6} />}>
        <BookingStatus id={id} />
      </Suspense>
    </section>
  );
}
