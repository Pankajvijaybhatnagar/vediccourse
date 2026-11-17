import PageHeader from '@/components/PageHeader';
import KundaliPrashnaClient from './KundaliPrashnaClient';

export const metadata = {
  title: 'Prashna Kundali · Horary Astrology · प्रश्न कुंडली',
  description:
    'Ask a question and get a Prashna Kundali cast for this very moment — no birth details needed. Lagna, the house of the question, their lords and the Moon give a yes/no answer with timing.',
};

export default function KundaliPrashnaPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Prashna Shastra · Horary', hi: 'प्रश्न शास्त्र · तात्कालिक कुंडली' }}
        title={{ en: 'Prashna', hi: 'प्रश्न' }}
        highlight={{ en: 'Kundali', hi: 'कुंडली' }}
        crumb={{ en: 'Prashna Kundali', hi: 'प्रश्न कुंडली' }}
        lead={{
          en: 'No birth time? No problem. The sky at the moment you ask holds the answer.',
          hi: 'जन्म समय नहीं पता? कोई बात नहीं। प्रश्न के क्षण का आकाश ही उत्तर देता है।',
        }}
      />
      <KundaliPrashnaClient />
    </>
  );
}
