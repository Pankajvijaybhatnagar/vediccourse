import PageHeader from '@/components/PageHeader';
import PrashnaHub from './PrashnaHub';

export const metadata = {
  title: 'Prashna Kundali · Ask a Question · प्रश्न कुंडली',
  description:
    'Ask any question and get an answer through Prashna Shastra: Prashna Kundali, Shri Ram Shalaka Prashnavali (Ramcharitmanas chaupai), Hast Rekha, fruit-vegetable-flower names, Ank (1–108) and Swar Prashna.',
};

export default function PrashnaPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Prashna Shastra', hi: 'प्रश्न शास्त्र' }}
        title={{ en: 'Prashna', hi: 'प्रश्न' }}
        highlight={{ en: 'Kundali', hi: 'कुंडली' }}
        crumb={{ en: 'Prashna', hi: 'प्रश्न' }}
        lead={{
          en: 'Ask the question in your heart. Get the answer through the Ramcharitmanas, your palm, the stars of this moment, or a simple fruit name.',
          hi: 'मन का प्रश्न पूछें। उत्तर पाएँ रामचरितमानस की चौपाई, अपनी हस्त रेखा, इस क्षण के ग्रहों या किसी फल-सब्ज़ी के नाम से।',
        }}
      />
      <PrashnaHub />
    </>
  );
}
