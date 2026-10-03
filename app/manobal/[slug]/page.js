import { notFound } from 'next/navigation';
import { apiGet } from '@/lib/server-api';
import ChapterView from './ChapterView';

export const revalidate = 300;

// Chapters render on first visit and are then cached (ISR), so builds don't depend on the API.
export async function generateStaticParams() {
  return [];
}

const getChapter = (slug) => apiGet(`/manobal/chapters/${encodeURIComponent(slug)}`).then((res) => res?.data ?? null);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ch = await getChapter(slug);
  if (!ch) return {};
  return {
    title: `${ch.title?.hi ?? ''} · ${ch.title?.en ?? ''} — मनोबल`,
    description: [ch.subtitle?.hi, ch.subtitle?.en].filter(Boolean).join(' | '),
  };
}

export default async function ChapterPage({ params }) {
  const { slug } = await params;
  const chapter = await getChapter(slug);
  if (!chapter) notFound();

  const { prev = null, next = null, total, ...rest } = chapter;
  return <ChapterView chapter={rest} prev={prev} next={next} total={total} />;
}
