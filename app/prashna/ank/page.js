import PageHeader from '@/components/PageHeader';
import AnkPrashnaClient from './AnkPrashnaClient';

export const metadata = {
  title: 'Ank Prashna (1–108) · Number Horary · अंक प्रश्न',
  description:
    'Think of a number from 1 to 108. It fixes the Prashna Lagna in one of the 108 nakshatra padas and today\'s planets answer your question from there.',
};

export default function AnkPrashnaPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Prashna · 108 navamsha', hi: 'प्रश्न · 108 नवांश' }}
        title={{ en: 'Ank', hi: 'अंक' }}
        highlight={{ en: 'Prashna', hi: 'प्रश्न' }}
        crumb={{ en: 'Ank Prashna', hi: 'अंक प्रश्न' }}
        lead={{
          en: 'One number from your heart, 108 padas of the sky.',
          hi: 'मन से एक अंक, आकाश के 108 चरण।',
        }}
      />
      <AnkPrashnaClient />
    </>
  );
}
