import PageHeader from '@/components/PageHeader';
import HastRekhaPrashnaClient from './HastRekhaPrashnaClient';

export const metadata = {
  title: 'Hast Rekha Prashna · Ask your palm · हस्त रेखा प्रश्न',
  description:
    'Ask one question and get an answer from your palm photo — the lines and mounts that rule your topic are read by AI. Or use the traditional Anguli (finger) Prashna without a photo.',
};

export default function HastRekhaPrashnaPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Prashna · Samudrik Shastra', hi: 'प्रश्न · सामुद्रिक शास्त्र' }}
        title={{ en: 'Hast Rekha', hi: 'हस्त रेखा' }}
        highlight={{ en: 'Prashna', hi: 'प्रश्न' }}
        crumb={{ en: 'Hast Rekha Prashna', hi: 'हस्त रेखा प्रश्न' }}
        lead={{
          en: 'Your question, answered by the lines of your own hand.',
          hi: 'आपका प्रश्न, आपके ही हाथ की रेखाओं से उत्तरित।',
        }}
      />
      <HastRekhaPrashnaClient />
    </>
  );
}
