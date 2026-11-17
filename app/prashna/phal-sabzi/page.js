import PageHeader from '@/components/PageHeader';
import PhalSabziClient from './PhalSabziClient';

export const metadata = {
  title: 'Fruit, Vegetable & Flower Prashna · फल-सब्ज़ी प्रश्न',
  description:
    'Say the first fruit, vegetable or flower that comes to mind. Its letter count, first syllable nakshatra, tara bala from today\'s Moon, ruling planet and taste answer your question.',
};

export default function PhalSabziPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Prashna · Naam & Nimitta', hi: 'प्रश्न · नाम एवं निमित्त' }}
        title={{ en: 'Fruit, Vegetable &', hi: 'फल-सब्ज़ी-पुष्प' }}
        highlight={{ en: 'Flower Prashna', hi: 'प्रश्न' }}
        crumb={{ en: 'Fruit & Vegetable Prashna', hi: 'फल-सब्ज़ी प्रश्न' }}
        lead={{
          en: 'The first name that rises in your mind carries the answer.',
          hi: 'मन में उठा पहला नाम ही उत्तर लेकर आता है।',
        }}
      />
      <PhalSabziClient />
    </>
  );
}
