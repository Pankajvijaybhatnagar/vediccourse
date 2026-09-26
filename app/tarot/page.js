import PageHeader from '@/components/PageHeader';
import TarotClient from './TarotClient';

export const metadata = {
  title: 'Tarot Reading · टैरो रीडिंग',
  description: 'Draw a free three-card tarot spread revealing your past, present and future.',
};

export default function TarotPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'The cards await', hi: 'कार्ड आपकी प्रतीक्षा में' }}
        title={{ en: 'Free', hi: 'मुफ़्त' }}
        highlight={{ en: 'Tarot Reading', hi: 'टैरो रीडिंग' }}
        crumb={{ en: 'Tarot', hi: 'टैरो' }}
        lead={{
          en: 'Hold your question in mind, take a deep breath, and let the Major Arcana reveal your path.',
          hi: 'अपना प्रश्न मन में रखें, गहरी साँस लें और मेजर आर्काना को आपका मार्ग दिखाने दें।',
        }}
      />
      <TarotClient />
    </>
  );
}
