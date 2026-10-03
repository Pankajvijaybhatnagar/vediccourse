import PageHeader from '@/components/PageHeader';
import PoojaList from './PoojaList';
import { getPoojaCategories, getPoojas } from '../data';

export const metadata = {
  title: 'पूजा पद्धति — चरणबद्ध पूजा विधि',
  description: 'दैनिक पूजा, षोडशोपचार, गणेश पूजन, लक्ष्मी पूजन, सत्यनारायण, रुद्राभिषेक, नवग्रह शांति, हवन, नवरात्रि और गृह प्रवेश की सम्पूर्ण विधि।',
};

export default async function PoojaPaddhatiPage() {
  const [poojas, categories] = await Promise.all([getPoojas(), getPoojaCategories()]);

  return (
    <>
      <PageHeader
        eyebrow="कर्मकांड · प्रथम अंग"
        title="पूजा"
        highlight="पद्धति"
        crumb="पूजा पद्धति"
        lead="प्रत्येक पूजा की सम्पूर्ण विधि — शुभ समय, आवश्यक सामग्री, तैयारी, चरणबद्ध क्रम, मंत्र और उनका अर्थ, नियम तथा लाभ।"
      />
      <PoojaList poojas={poojas} categories={categories} />
    </>
  );
}
