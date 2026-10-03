import { notFound } from 'next/navigation';
import { apiGet } from '@/lib/server-api';
import SignDetail from './SignDetail';

const DAY = 86400;
const SLUGS = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];

// The twelve signs are a fixed set; anything else 404s without hitting the API.
export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((sign) => ({ sign }));
}

async function loadSign(slug) {
  const [en, hi] = await Promise.all([apiGet(`/zodiac/${slug}?lang=en`, { revalidate: DAY }), apiGet(`/zodiac/${slug}?lang=hi`, { revalidate: DAY })]);
  return en && hi ? { en: en.data, hi: hi.data } : null;
}

export async function generateMetadata({ params }) {
  const { sign: slug } = await params;
  const sign = await loadSign(slug).catch(() => null);
  if (!sign) return {};
  return {
    title: `${sign.en.name} · ${sign.hi.name} (${sign.en.dates})`,
    description: `${sign.en.name} (${sign.hi.name}) zodiac sign: traits, strengths, weaknesses, compatibility and more.`,
  };
}

export default async function SignPage({ params }) {
  const { sign: slug } = await params;
  const [sign, listEn, listHi, best] = await Promise.all([
    loadSign(slug),
    apiGet('/zodiac?lang=en', { revalidate: DAY }),
    apiGet('/zodiac?lang=hi', { revalidate: DAY }),
    apiGet(`/compatibility/best?sign=${slug}&limit=3`, { revalidate: DAY }),
  ]);
  if (!sign) notFound();

  return <SignDetail slug={slug} sign={sign} signs={{ en: listEn?.data ?? [], hi: listHi?.data ?? [] }} bestMatches={best?.data ?? []} />;
}
