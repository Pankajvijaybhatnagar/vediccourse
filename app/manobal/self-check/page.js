import SubPage from '../SubPage';

export const metadata = {
  title: 'स्व-जाँच · Confidential Self-Check (GAD-7, PHQ-9)',
  description: 'A private anxiety and mood self-check using the GAD-7 and PHQ-9 questionnaires, with clear next steps and helplines. Nothing is saved.',
};

export default function SelfCheckPage() {
  return <SubPage kind="self-check" />;
}
