import PageHeader from '@/components/PageHeader';
import KundliMilanClient from './KundliMilanClient';

export const metadata = {
  title: 'Kundli Milan · Ashtakoot Guna Milan · कुंडली मिलान',
  description: 'Free Vedic kundli matching for marriage: 36-guna Ashtakoot milan (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi) with Nadi/Bhakoot dosha exceptions and Manglik check.',
};

export default function KundliMilanPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Vivah milan · Ashtakoot', hi: 'विवाह मिलान · अष्टकूट' }}
        title={{ en: 'Kundli', hi: 'कुंडली' }}
        highlight={{ en: 'Milan', hi: 'मिलान' }}
        crumb={{ en: 'Kundli Milan', hi: 'कुंडली मिलान' }}
        lead={{
          en: 'Enter the birth details of the boy and the girl for a full 36-guna Ashtakoot match, with dosha exceptions and a Manglik check.',
          hi: 'वर और कन्या का जन्म विवरण भरें और पाएँ पूर्ण 36 गुणों का अष्टकूट मिलान, दोष परिहार और मांगलिक जाँच सहित।',
        }}
      />
      <KundliMilanClient />
    </>
  );
}
