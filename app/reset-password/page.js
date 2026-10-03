import ResetPasswordForm from './ResetPasswordForm';

export const metadata = {
  title: 'Reset password · पासवर्ड रीसेट',
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({ searchParams }) {
  const sp = await searchParams;
  const token = Array.isArray(sp?.token) ? sp.token[0] : sp?.token;
  return <ResetPasswordForm token={/^[a-f0-9]{64}$/.test(token || '') ? token : null} />;
}
