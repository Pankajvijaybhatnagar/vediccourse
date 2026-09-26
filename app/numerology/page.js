import PageHeader from '@/components/PageHeader';
import NumerologyClient from './NumerologyClient';

export const metadata = {
  title: 'Numerology Calculator · अंक ज्योतिष',
  description: 'Calculate your Mulank, Bhagyank (Life Path), Name Number, Soul Urge and Personality numbers.',
};

export default function NumerologyPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'The language of numbers', hi: 'अंकों की भाषा' }}
        title={{ en: 'Numerology', hi: 'अंक ज्योतिष' }}
        highlight={{ en: 'Calculator', hi: 'कैलकुलेटर' }}
        crumb={{ en: 'Numerology', hi: 'अंक ज्योतिष' }}
        lead={{
          en: 'Every letter and date vibrates with meaning. Uncover your Mulank, Bhagyank and the numbers hidden in your name.',
          hi: 'हर अक्षर और तिथि का अपना अर्थ होता है। अपना मूलांक, भाग्यांक और नाम में छिपे अंक जानें।',
        }}
      />
      <NumerologyClient />
    </>
  );
}
