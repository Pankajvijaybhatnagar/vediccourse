import { PART1 } from './part1';
import { PART2 } from './part2';
import { PART3 } from './part3';

// मनोबल course — 12 bilingual chapters.
export const CHAPTERS = [...PART1, ...PART2, ...PART3];

export const getChapter = (slug) => CHAPTERS.find((c) => c.slug === slug);

// Lightweight card data for listings (no section content).
export const CHAPTER_CARDS = CHAPTERS.map(({ slug, number, icon, tone, title, subtitle, minutes, audience }) => ({
  slug,
  number,
  icon,
  tone,
  title,
  subtitle,
  minutes,
  audience,
}));

export const TOTAL_MINUTES = CHAPTERS.reduce((sum, c) => sum + c.minutes, 0);
