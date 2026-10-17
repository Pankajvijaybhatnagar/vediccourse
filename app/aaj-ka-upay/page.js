import PageHeader from '@/components/PageHeader';
import UpayClient from './UpayClient';

export const metadata = {
  title: "Aaj ka Upay · आज का उपाय — Today's Remedy by Tithi, Navratri & Rashi",
  description:
    "Today's upay as per the Hindu panchang: Navratri day and Devi puja, festival and vrat remedies, tithi, vaar and nakshatra upay, auspicious timings, cautions and rashi-wise remedies for all 12 signs — in Hindi and English.",
};

export default function AajKaUpayPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Daily remedies', hi: 'दैनिक उपाय' }}
        title={{ en: "Today's", hi: 'आज का' }}
        highlight={{ en: 'Upay', hi: 'उपाय' }}
        crumb={{ en: 'Aaj ka Upay', hi: 'आज का उपाय' }}
        lead={{
          en: 'Remedies that change every day with the panchang — the Navratri Devi of the day, festivals and vrats, tithi, vaar and nakshatra upay, the best time to do them and an upay for every rashi.',
          hi: 'पंचांग के साथ हर दिन बदलने वाले उपाय — आज की नवरात्रि देवी, पर्व और व्रत, तिथि, वार और नक्षत्र के उपाय, उन्हें करने का शुभ समय और हर राशि के लिए उपाय।',
        }}
      />
      <UpayClient />
    </>
  );
}
