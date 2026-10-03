import ForgotPasswordForm from './ForgotPasswordForm';

export const metadata = {
  title: 'Forgot password · पासवर्ड भूल गए',
  robots: { index: false, follow: true },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
