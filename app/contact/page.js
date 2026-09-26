import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Book a Consultation · परामर्श बुक करें',
  description: 'Book a private astrology consultation by chat, call or video with an expert astrologer.',
};

export default function ContactPage() {
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
      <Suspense fallback={null}>
        <ContactClient />
      </Suspense>
    </>
  );
}
