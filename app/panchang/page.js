import PageHeader from '@/components/PageHeader';
import PanchangClient from './PanchangClient';

export const metadata = {
  title: "Today's Panchang · आज का पंचांग",
  description: 'Daily Hindu Panchang: Tithi, Nakshatra, Yoga, Karana, sunrise, sunset, Rahu Kaal, Abhijit Muhurat and Choghadiya for Indian cities.',
};

export default function PanchangPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Vedic calendar', hi: 'वैदिक पंचांग' }}
        title={{ en: "Today's", hi: 'आज का' }}
        highlight={{ en: 'Panchang', hi: 'पंचांग' }}
        crumb={{ en: 'Panchang', hi: 'पंचांग' }}
        lead={{
          en: 'Tithi, Nakshatra, Yoga, Karana and Vaar along with sunrise, Rahu Kaal, Abhijit Muhurat and Choghadiya for your city.',
          hi: 'आपके शहर के लिए तिथि, नक्षत्र, योग, करण और वार के साथ सूर्योदय, राहु काल, अभिजित मुहूर्त और चौघड़िया।',
        }}
      />
      <PanchangClient />
    </>
  );
}
