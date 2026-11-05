import PageHeader from '@/components/PageHeader';
import PalmistryClient from './PalmistryClient';

export const metadata = {
  title: 'AI Palmistry · Hast Rekha Reading · हस्त रेखा',
  description: 'Upload a photo of your palm for a full AI hast rekha reading: life, head, heart, fate, sun and marriage lines, mounts, special signs, and simple remedies. Right hand for men, left hand for women.',
};

export default function PalmistryPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Samudrik Shastra · AI reading', hi: 'सामुद्रिक शास्त्र · AI रीडिंग' }}
        title={{ en: 'AI', hi: 'AI' }}
        highlight={{ en: 'Palmistry', hi: 'हस्त रेखा' }}
        crumb={{ en: 'Palmistry', hi: 'हस्त रेखा' }}
        lead={{
          en: 'Upload a clear photo of your palm and get a full reading of your lines, mounts and signs.',
          hi: 'अपनी हथेली की साफ़ फ़ोटो अपलोड करें और पाएँ रेखाओं, पर्वतों और चिह्नों का पूरा विश्लेषण।',
        }}
      />
      <PalmistryClient />
    </>
  );
}
