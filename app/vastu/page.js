import PageHeader from '@/components/PageHeader';
import VastuCheck from './VastuCheck';

export const metadata = {
  title: 'Vastu Check · वास्तु जाँच — Free Home Vastu Score',
  description: 'Answer 25 simple questions about your home — main door, corners, kitchen, bedroom, water tanks and more — and get a free Vastu score with the defects and traditional remedies.',
};

export default function VastuPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Vastu Shastra · the science of space', hi: 'वास्तु शास्त्र · स्थान का विज्ञान' }}
        title={{ en: 'Free Home', hi: 'निःशुल्क गृह' }}
        highlight={{ en: 'Vastu Check', hi: 'वास्तु जाँच' }}
        crumb={{ en: 'Vastu Check', hi: 'वास्तु जाँच' }}
        lead={{
          en: 'Answer 25 simple questions about your home and get an instant Vastu score — with the defects to fix and traditional remedies for each.',
          hi: 'अपने घर के बारे में 25 सरल प्रश्नों के उत्तर दें और तुरंत वास्तु अंक पाएँ — साथ में सुधारने योग्य दोष और हर दोष के पारंपरिक उपाय।',
        }}
      />
      <VastuCheck />
    </>
  );
}
