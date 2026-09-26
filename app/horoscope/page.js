import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import HoroscopeClient from './HoroscopeClient';

export const metadata = {
  title: 'Horoscope · राशिफल',
  description: 'Free daily, weekly and monthly horoscope (rashifal) for all 12 zodiac signs in Hindi and English.',
};

export default function HoroscopePage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Your cosmic forecast', hi: 'आपका दिव्य पूर्वानुमान' }}
        title={{ en: 'Daily', hi: 'दैनिक' }}
        highlight={{ en: 'Horoscope', hi: 'राशिफल' }}
        crumb={{ en: 'Horoscope', hi: 'राशिफल' }}
        lead={{
          en: 'Select your sign and discover what the planets have in store for your love life, career and wellbeing.',
          hi: 'अपनी राशि चुनें और जानें कि ग्रह आपके प्रेम, करियर और स्वास्थ्य के लिए क्या संकेत दे रहे हैं।',
        }}
      />
      <Suspense fallback={null}>
        <HoroscopeClient />
      </Suspense>
    </>
  );
}
