import { PanditStoreProvider } from '@/lib/pandit/store';
import SanghNav from '@/components/pandit/SanghNav';
import s from '@/components/pandit/sangh.module.css';

export const metadata = {
  title: {
    default: 'Pandit Sangh — network & workspace for pandits · पंडित संघ',
    template: '%s · Pandit Sangh',
  },
  description:
    'A professional network for pandits and astrologers: keep your yajman register with gotra and family traditions, send remedies, share anushthans with other pandits and get paid fairly.',
};

export default function PanditSanghLayout({ children }) {
  return (
    <PanditStoreProvider>
      <div className={s.root}>
        <SanghNav />
        {children}
      </div>
    </PanditStoreProvider>
  );
}
