import { apiGet } from '@/lib/server-api';
import SubPage from '../SubPage';

export const metadata = {
  title: 'करियर कम्पास · Career Compass — Interests + Kundli',
  description: 'Find your career direction by combining an interest profile (RIASEC) with your Vedic birth chart’s 10th house. In Hindi and English.',
};

export const revalidate = 3600;

export default async function CareerCompassPage() {
  // Falls back to loading in the browser if the API is briefly unreachable.
  const res = await apiGet('/manobal/career/questions', { revalidate: 3600 }).catch(() => null);
  return <SubPage kind="career" initialData={res?.data ?? null} />;
}
