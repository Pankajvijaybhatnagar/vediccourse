import { apiGet } from '@/lib/server-api';
import ManobalHub from './ManobalHub';

export const metadata = {
  title: 'मनोबल — मन, करियर एवं जीवन मार्गदर्शन · Manobal: Mind, Career & Life Guidance',
  description:
    'Chapter-wise guidance for students and people of all ages dealing with stress, anxiety and low mood — breathing, CBT tools, sleep, exam stress, and astrology-based career guidance, in Hindi and English.',
};

// Chapters are edited in the backend; the cached page refreshes every 5 minutes.
export const revalidate = 300;

export default async function ManobalPage() {
  const res = await apiGet('/manobal/chapters?limit=100');
  return <ManobalHub chapters={res?.data ?? []} />;
}
