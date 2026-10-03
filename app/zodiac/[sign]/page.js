import { notFound } from 'next/navigation';
import { SIGNS, getSign, signNameHi } from '@/lib/zodiac';
import SignDetail from './SignDetail';

export function generateStaticParams() {
  return SIGNS.map((s) => ({ sign: s.slug }));
}

export async function generateMetadata({ params }) {
  const { sign: slug } = await params;
  const sign = getSign(slug);
  if (!sign) return {};
  return {
    title: `${sign.name} · ${signNameHi(slug)} (${sign.dates})`,
    description: `${sign.name} (${signNameHi(slug)}) zodiac sign: traits, strengths, weaknesses, compatibility and more.`,
  };
}

export default async function SignPage({ params }) {
  const { sign: slug } = await params;
  if (!getSign(slug)) notFound();
  return <SignDetail slug={slug} />;
}
