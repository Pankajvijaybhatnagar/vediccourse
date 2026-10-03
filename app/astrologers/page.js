import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import { apiGet, apiGetAll } from '@/lib/server-api';
import AstrologersClient, { AstrologersWithFocus } from './AstrologersClient';

export const revalidate = 300;

export const metadata = {
  title: 'Our Panel of Experts · हमारे विशेषज्ञ मंडल',
  description: 'Experienced guides in Jyotish, Shastra, Karmkand, Vastu, Tantra Vigyan, Palmistry and Counselling. Book a chat, call or video consultation.',
  alternates: { canonical: '/astrologers' },
};

export default async function AstrologersPage() {
  const [astrologers, live] = await Promise.all([
    apiGetAll('/astrologers?sort=sortOrder'),
    // Live sessions are a nice-to-have; never fail the page because of them.
    apiGet('/live-sessions?limit=12', { revalidate: 60 }).catch(() => null),
  ]);

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
      {/* useSearchParams (?focus=) needs a Suspense boundary to keep the page statically cacheable. */}
      <Suspense fallback={<AstrologersClient astrologers={astrologers} live={live?.data ?? []} />}>
        <AstrologersWithFocus astrologers={astrologers} live={live?.data ?? []} />
      </Suspense>
    </>
  );
}
