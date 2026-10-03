import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import BirthChartClient from './BirthChartClient';

export const metadata = {
  title: 'Free Janam Kundli · मुफ़्त जन्म कुंडली',
  description: 'Free Vedic birth chart: Lagna, Rashi, Nakshatra, planetary positions, Vimshottari Dasha and Manglik check.',
};

export default function BirthChartPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Your cosmic blueprint', hi: 'आपका दिव्य मानचित्र' }}
        title={{ en: 'Free Janam', hi: 'मुफ़्त जन्म' }}
        highlight={{ en: 'Kundli', hi: 'कुंडली' }}
        crumb={{ en: 'Free Kundli', hi: 'मुफ़्त कुंडली' }}
        lead={{
          en: 'Enter your birth details to generate your Vedic birth chart with Lagna, Rashi, Nakshatra, planetary positions and Mahadasha.',
          hi: 'अपना जन्म विवरण दर्ज करें और लग्न, राशि, नक्षत्र, ग्रह स्थिति और महादशा सहित अपनी वैदिक जन्म कुंडली पाएँ।',
        }}
      />
      <Suspense fallback={null}>
        <BirthChartClient />
      </Suspense>
    </>
  );
}
