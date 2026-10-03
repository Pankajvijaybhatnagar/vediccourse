import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import { Skeleton } from '@/components/booking/PageStates';
import { apiGet, apiGetAll } from '@/lib/server-api';
import ContactClient from './ContactClient';

export const revalidate = 300;

export const metadata = {
  title: 'Book a Consultation · परामर्श बुक करें',
  description: 'Book a private astrology consultation by chat, call or video with an expert astrologer. Secure online payment in INR or your local currency.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const [plans, astrologers, payments] = await Promise.all([
    apiGet('/consultations/plans?limit=50'),
    apiGetAll('/astrologers?sort=sortOrder'),
    apiGet('/payments/config', { revalidate: 60 }).catch(() => null),
  ]);

  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Personal guidance', hi: 'व्यक्तिगत मार्गदर्शन' }}
        title={{ en: 'Book a', hi: 'परामर्श' }}
        highlight={{ en: 'Consultation', hi: 'बुक करें' }}
        crumb={{ en: 'Book a Reading', hi: 'परामर्श बुक करें' }}
        lead={{
          en: 'Connect one-on-one with an experienced astrologer for a reading crafted around your chart and your questions.',
          hi: 'अपनी कुंडली और प्रश्नों के अनुसार व्यक्तिगत परामर्श के लिए अनुभवी ज्योतिषी से सीधे जुड़ें।',
        }}
      />
      <Suspense fallback={<Skeleton cards={3} rows={4} />}>
        <ContactClient
          plans={plans?.data ?? []}
          astrologers={astrologers}
          paymentConfig={payments?.data ?? { enabled: false, currencies: ['INR'], baseCurrency: 'INR', fxRates: {} }}
        />
      </Suspense>
    </>
  );
}
