import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import CompatibilityClient from './CompatibilityClient';

export const metadata = {
  title: 'Love Compatibility · प्रेम अनुकूलता',
  description: 'Discover how compatible two zodiac signs are in love, friendship, communication and trust.',
};

export default function CompatibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Written in the stars', hi: 'सितारों में लिखा रिश्ता' }}
        title={{ en: 'Love', hi: 'प्रेम' }}
        highlight={{ en: 'Compatibility', hi: 'अनुकूलता' }}
        crumb={{ en: 'Compatibility', hi: 'प्रेम अनुकूलता' }}
        lead={{
          en: 'Choose two signs to reveal their cosmic chemistry across love, friendship, communication and trust.',
          hi: 'दो राशियाँ चुनें और प्रेम, मित्रता, संवाद और विश्वास में उनका तालमेल जानें।',
        }}
      />
      <Suspense fallback={null}>
        <CompatibilityClient />
      </Suspense>
    </>
  );
}
