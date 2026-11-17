import PageHeader from '@/components/PageHeader';
import SwarPrashnaClient from './SwarPrashnaClient';

export const metadata = {
  title: 'Swar Prashna · Shiva Swarodaya · स्वर प्रश्न',
  description:
    'Answer a question from the breath: check whether Ida (left), Pingala (right) or Sushumna (both) is flowing, as taught in Shiva Swarodaya.',
};

export default function SwarPrashnaPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Prashna · Swar Shastra', hi: 'प्रश्न · स्वर शास्त्र' }}
        title={{ en: 'Swar', hi: 'स्वर' }}
        highlight={{ en: 'Prashna', hi: 'प्रश्न' }}
        crumb={{ en: 'Swar Prashna', hi: 'स्वर प्रश्न' }}
        lead={{
          en: 'Your breath at the moment of asking is the answer — Ida, Pingala or Sushumna.',
          hi: 'प्रश्न के क्षण आपकी श्वास ही उत्तर है — इड़ा, पिंगला या सुषुम्ना।',
        }}
      />
      <SwarPrashnaClient />
    </>
  );
}
