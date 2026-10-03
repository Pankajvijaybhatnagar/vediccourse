'use client';

import { AlertTriangle, Loader2, Lock, RefreshCw } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import styles from './booking.module.css';

const BUSY = {
  creating: { en: 'Preparing secure checkout…', hi: 'सुरक्षित चेकआउट तैयार हो रहा है…' },
  open: { en: 'Complete the payment in the Razorpay window…', hi: 'Razorpay विंडो में भुगतान पूरा करें…' },
  verifying: { en: 'Confirming your payment…', hi: 'आपका भुगतान सत्यापित हो रहा है…' },
};

/**
 * Status + retry for a Razorpay payment driven by usePayment().
 * Shows nothing when idle; a pay button is rendered by the caller where appropriate.
 */
export default function PaymentNotice({ payment, onRetry, amountLabel }) {
  const { t } = useLang();
  const { status, message, busy } = payment;

  if (status === 'idle' || status === 'paid' || status === 'pending') return null;

  if (busy) {
    return (
      <p className={styles.notice} role="status" aria-live="polite">
        <Loader2 size={18} className={styles.spin} /> {t(BUSY[status])}
      </p>
    );
  }

  const text =
    status === 'dismissed'
      ? t({ en: 'Payment was not completed. Your booking is saved — pay now to confirm your slot.', hi: 'भुगतान पूरा नहीं हुआ। आपकी बुकिंग सहेजी गई है — अपना समय पक्का करने के लिए अभी भुगतान करें।' })
      : status === 'failed'
        ? `${t({ en: 'Payment failed', hi: 'भुगतान विफल रहा' })}: ${message} ${t({ en: 'No money was taken. Please try again or use another method.', hi: 'कोई राशि नहीं कटी। कृपया पुनः प्रयास करें या दूसरा तरीका चुनें।' })}`
        : message || t({ en: 'Could not start the payment. Please try again.', hi: 'भुगतान शुरू नहीं हो सका। कृपया पुनः प्रयास करें।' });

  return (
    <div className={`${styles.notice} ${styles.noticeWarn}`} role="alert">
      <p>
        <AlertTriangle size={18} /> {text}
      </p>
      <button type="button" className="btn btn-primary" onClick={onRetry}>
        {status === 'dismissed' ? <Lock size={16} /> : <RefreshCw size={16} />}{' '}
        {status === 'dismissed' ? t({ en: 'Pay now', hi: 'अभी भुगतान करें' }) : t({ en: 'Try again', hi: 'पुनः प्रयास करें' })}
        {amountLabel ? ` · ${amountLabel}` : ''}
      </button>
    </div>
  );
}
