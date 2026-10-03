import { apiGet } from '@/lib/server-api';
import SubPage from '../SubPage';

export const metadata = {
  title: 'स्व-जाँच · Confidential Self-Check (GAD-7, PHQ-9)',
  description: 'A private anxiety and mood self-check using the GAD-7 and PHQ-9 questionnaires, with clear next steps and helplines. Nothing is saved.',
};

export const revalidate = 3600;

export default async function SelfCheckPage() {
  // If the API is briefly unreachable the questionnaire loads in the browser instead; this page must never fail.
  const res = await apiGet('/manobal/self-check/tests', { revalidate: 3600 }).catch(() => null);
  return <SubPage kind="self-check" initialData={res?.data ?? null} />;
}
