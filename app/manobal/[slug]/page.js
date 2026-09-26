import { notFound } from 'next/navigation';
import { CHAPTERS, CHAPTER_CARDS, getChapter } from '@/lib/manobal/chapters';
import ChapterView from './ChapterView';

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ch = getChapter(slug);
  if (!ch) return {};
  return {
    title: `${ch.title.hi} · ${ch.title.en} — मनोबल`,
    description: `${ch.subtitle.hi} | ${ch.subtitle.en}`,
  };
}

export default async function ChapterPage({ params }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const i = CHAPTER_CARDS.findIndex((c) => c.slug === slug);
  const prev = i > 0 ? CHAPTER_CARDS[i - 1] : null;
  const next = i < CHAPTER_CARDS.length - 1 ? CHAPTER_CARDS[i + 1] : null;

  return <ChapterView chapter={chapter} prev={prev} next={next} total={CHAPTER_CARDS.length} />;
}
