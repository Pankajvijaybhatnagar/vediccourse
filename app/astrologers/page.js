import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import AstrologersClient from './AstrologersClient';

export const metadata = {
  title: 'Talk to Astrologer · ज्योतिषी से बात करें',
  description: 'Chat or call verified Vedic astrologers, tarot readers, numerologists and Vastu experts. First consultation free.',
};

export default function AstrologersPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Verified experts', hi: 'सत्यापित विशेषज्ञ' }}
        title={{ en: 'Talk to an', hi: 'विशेषज्ञ' }}
        highlight={{ en: 'Astrologer', hi: 'ज्योतिषी से बात करें' }}
        crumb={{ en: 'Astrologers', hi: 'ज्योतिषी' }}
        lead={{
          en: 'Chat or call India’s most trusted astrologers for love, career, marriage and money. Your first consultation is FREE.',
          hi: 'प्रेम, करियर, विवाह और धन के लिए भारत के विश्वसनीय ज्योतिषियों से चैट या कॉल करें। पहला परामर्श मुफ़्त।',
        }}
      />
      <Suspense fallback={null}>
        <AstrologersClient />
      </Suspense>
    </>
  );
}
