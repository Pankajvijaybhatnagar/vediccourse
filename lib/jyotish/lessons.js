import { PART1 } from './part1';
import { PART2 } from './part2';
import { PART3 } from './part3';

// "ज्योतिष सीखें" पाठ्यक्रम — 12 पाठ, प्रारंभिक से मध्यम स्तर तक।
export const LESSONS = [...PART1, ...PART2, ...PART3].sort((a, b) => a.number - b.number);

export const getLesson = (slug) => LESSONS.find((l) => l.slug === slug);

export const TOTAL_MINUTES = LESSONS.reduce((sum, l) => sum + l.minutes, 0);

/** हब पेज के लिए हल्का सारांश (क्लाइंट घटक को भेजने योग्य)। */
export const LESSON_CARDS = LESSONS.map(({ slug, number, title, subtitle, icon, level, minutes }) => ({
  slug,
  number,
  title,
  subtitle,
  icon,
  level,
  minutes,
}));

export { hindiNum } from './num';
