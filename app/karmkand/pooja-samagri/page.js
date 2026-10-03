import PageHeader from '@/components/PageHeader';
import SamagriKosh from './SamagriKosh';

export const metadata = {
  title: 'पूजा सामग्री कोश — महत्व एवं प्रयोग विधि',
  description: 'कलश, दीपक, अक्षत, तुलसी, बेलपत्र, पंचामृत, कलावा सहित पूजा की हर सामग्री का आध्यात्मिक महत्व, प्रयोग की विधि और सावधानियाँ।',
};

export default function PoojaSamagriPage() {
  return (
    <>
      <PageHeader
        eyebrow="कर्मकांड · द्वितीय अंग"
        title="पूजा सामग्री"
        highlight="कोश"
        crumb="पूजा सामग्री"
        lead="पूजा की प्रत्येक वस्तु के पीछे गहरा अर्थ छिपा है। जानिए हर सामग्री क्यों प्रयोग होती है, कैसे प्रयोग करें और किन बातों का ध्यान रखें।"
      />
      <SamagriKosh />
    </>
  );
}
