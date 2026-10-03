import AccountClient from './AccountClient';

export const metadata = {
  title: 'My Account · मेरा खाता',
  description: 'Manage your VedicDhaam profile, bookings, payments, saved kundlis and security settings.',
  robots: { index: false, follow: false },
};

const TABS =['profile', 'bookings', 'payments', 'kundlis', 'readings', 'learning', 'security'];

export default async function AccountPage({ searchParams }) {
  const sp = await searchParams;
  const tab = Array.isArray(sp?.tab) ? sp.tab[0] : sp?.tab;
  return <AccountClient initialTab={TABS.includes(tab) ? tab : 'profile'} />;
}
