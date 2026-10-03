import LoginScreen from './LoginScreen';

export const metadata = {
  title: 'Sign in · साइन इन',
  description: 'Sign in to VedicDhaam with your mobile number, email or social account to manage consultations, saved kundlis and more.',
  robots: { index: false, follow: true },
};

export default async function LoginPage({ searchParams }) {
  const sp = await searchParams;
  const one = (v) => (Array.isArray(v) ? v[0] : v);
  const mode = one(sp?.mode);
  return <LoginScreen next={one(sp?.next)} mode={['phone', 'email', 'register'].includes(mode) ? mode : undefined} />;
}
