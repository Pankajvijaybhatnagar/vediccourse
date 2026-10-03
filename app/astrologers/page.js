import PageHeader from '@/components/PageHeader';
import AstrologersClient from './AstrologersClient';

export const metadata = {
  title: 'Our Panel of Experts · हमारे विशेषज्ञ मंडल',
  description: 'Experienced guides in Jyotish, Shastra, Karmkand, Vastu, Tantra Vigyan, Palmistry and Counselling.',
};

export default function AstrologersPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Our experts', hi: 'हमारे विशेषज्ञ' }}
        title={{ en: 'Our Panel of', hi: 'हमारे' }}
        highlight={{ en: 'Experts', hi: 'विशेषज्ञ मंडल' }}
        crumb={{ en: 'Experts', hi: 'विशेषज्ञ' }}
        lead={{
          en: 'Experienced guides across Indian knowledge traditions — Jyotish, Shastra, Karmkand, Vastu, Tantra Vigyan, Palmistry and Counselling.',
          hi: 'ज्योतिष, शास्त्र, कर्मकांड, वास्तु, तंत्र-विज्ञान, हस्तरेखा तथा काउंसलिंग — विविध भारतीय ज्ञान-विधाओं के अनुभवी मार्गदर्शक।',
        }}
      />
      <AstrologersClient />
    </>
  );
}
