import PageHeader from '@/components/PageHeader';
import { apiGet } from '@/lib/server-api';
import ZodiacGrid from './ZodiacGrid';

export const metadata = {
  title: 'Zodiac Signs · राशियाँ',
  description: 'Explore all twelve zodiac signs (rashi): elements, ruling planets, traits, strengths and weaknesses.',
};

// Sign profiles rarely change: revalidate once a day.
const DAY = 86400;

export default async function ZodiacPage() {
  const [en, hi] = await Promise.all([apiGet('/zodiac?lang=en', { revalidate: DAY }), apiGet('/zodiac?lang=hi', { revalidate: DAY })]);

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
      <ZodiacGrid signs={{ en: en?.data ?? [], hi: hi?.data ?? [] }} />
    </>
  );
}
