import PageHeader from '@/components/PageHeader';
import ZodiacGrid from './ZodiacGrid';

export const metadata = {
  title: 'Zodiac Signs · राशियाँ',
  description: 'Explore all twelve zodiac signs (rashi): elements, ruling planets, traits, strengths and weaknesses.',
};

export default function ZodiacPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'The twelve rashis', hi: 'बारह राशियाँ' }}
        title={{ en: 'Explore the', hi: 'जानिए' }}
        highlight={{ en: 'Zodiac', hi: 'राशिचक्र' }}
        crumb={{ en: 'Zodiac Signs', hi: 'राशियाँ' }}
        lead={{
          en: 'Each sign carries a unique energy shaped by its element, modality and ruling planet. Find yours and discover what makes it shine.',
          hi: 'हर राशि की अपनी विशेष ऊर्जा होती है जो उसके तत्व, स्वभाव और स्वामी ग्रह से बनती है। अपनी राशि खोजें और उसकी विशेषताएँ जानें।',
        }}
      />
      <ZodiacGrid />
    </>
  );
}
