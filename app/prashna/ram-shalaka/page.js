import PageHeader from '@/components/PageHeader';
import RamShalakaClient from './RamShalakaClient';

export const metadata = {
  title: 'Shri Ram Shalaka Prashnavali · श्रीराम शलाका प्रश्नावली',
  description:
    'Ask your question with Shri Ram in mind and touch any of the 225 letters. Every 9th letter forms a chaupai from the Ramcharitmanas that answers you — the Gita Press Ram Shalaka Prashnavali.',
};

export default function RamShalakaPage() {
  return (
    <>
      <PageHeader
        eyebrow={{ en: 'Prashna · Ramcharitmanas', hi: 'प्रश्न · श्रीरामचरितमानस' }}
        title={{ en: 'Shri Ram', hi: 'श्रीराम' }}
        highlight={{ en: 'Shalaka Prashnavali', hi: 'शलाका प्रश्नावली' }}
        crumb={{ en: 'Ram Shalaka', hi: 'राम शलाका' }}
        lead={{
          en: 'Hold your question in mind, remember Shri Ram and touch one letter — a chaupai of Goswami Tulsidas will answer.',
          hi: 'प्रश्न मन में रखें, श्रीराम का स्मरण करें और एक अक्षर स्पर्श करें — गोस्वामी तुलसीदासजी की चौपाई उत्तर देगी।',
        }}
      />
      <RamShalakaClient />
    </>
  );
}
