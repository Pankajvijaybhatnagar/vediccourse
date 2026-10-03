'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CalendarDays, CheckCircle2, Clock, CreditCard, Lock, MessageCircle, PhoneCall, Search, Sparkles, User, Video, XCircle } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { useAuth } from '@/lib/auth';
import { api } from '@/lib/api';
import { Skeleton } from '@/components/booking/PageStates';
import { AstroAvatar } from '@/components/booking/AstrologerCard';
import PaymentNotice from '@/components/booking/PaymentNotice';
import { usePayment, usePaymentConfig } from '@/components/booking/usePayment';
import {
  MODE_LABELS,
  PAYMENT_LABELS,
  SLOTS,
  STATUS_LABELS,
  addDaysIso,
  formatDate,
  formatDateTime,
  money,
  previewPrice,
  recallGuestBooking,
  rememberGuestBooking,
  todayIST,
} from '@/components/booking/format';
import styles from '@/components/booking/booking.module.css';

const MODE_ICON = { chat: MessageCircle, call: PhoneCall, video: Video };
const DAY_MS = 24 * 60 * 60 * 1000;
const OPEN = ['pending', 'confirmed', 'rescheduled'];

export default function BookingStatus({ id }) {
  const { t } = useLang();
  const { user, ready, openSignIn } = useAuth();
  const params = useSearchParams();
  const [booking, setBooking] = useState(null);
  const [state, setState] = useState('loading'); // loading | ready | lookup | error
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setError('');
    const guest = recallGuestBooking(id);
    try {
      if (user) {
        try {
          const { data } = await api(`/consultations/bookings/${id}`);
          setBooking(data);
          setState('ready');
          return;
        } catch (err) {
          if (err.status !== 404) throw err;
        }
      }
      if (guest?.contact?.phone) {
        // Refresh the live status; fall back to the saved copy if offline.
        try {
          const { data } = await api('/consultations/bookings/lookup', { method: 'POST', body: { id, phone: guest.contact.phone }, auth: false });
          rememberGuestBooking(data);
          setBooking(data);
        } catch (err) {
          if (err.status === 404) throw err;
          setBooking(guest);
        }
        setState('ready');
        return;
      }
      setState('lookup');
    } catch (err) {
      if (err.status === 404) setState('lookup');
      else {
        setError(err.message);
        setState('error');
      }
    }
  }, [id, user]);

  useEffect(() => {
    if (ready) load();
  }, [ready, load]);

  if (!ready || state === 'loading') return <Skeleton rows={6} />;

  if (state === 'error') {
    return (
      <div className={`container ${styles.narrow}`}>
        <div className={`card ${styles.panel}`} role="alert">
          <h1 className={styles.h1}>{t({ en: 'Could not load your booking', hi: 'आपकी बुकिंग लोड नहीं हो सकी' })}</h1>
          <p className="muted">{error}</p>
          <button className="btn btn-primary" onClick={() => { setState('loading'); load(); }}>
            {t({ en: 'Try again', hi: 'पुनः प्रयास करें' })}
          </button>
        </div>
      </div>
    );
  }

  if (state === 'lookup') {
    return (
      <Lookup
        id={id}
        signedIn={Boolean(user)}
        onFound={(b) => {
          rememberGuestBooking(b);
          setBooking(b);
          setState('ready');
        }}
        onSignIn={() => openSignIn({ onSuccess: () => setState('loading') })}
      />
    );
  }

  return <BookingView booking={booking} onChange={setBooking} reload={load} justPaid={params.get('paid') === '1'} isNew={params.get('new') === '1'} />;
}

/* ------------------------------------------------------------------------ */

function Lookup({ id, signedIn, onFound, onSignIn }) {
  const { t } = useLang();
  const [bookingNo, setBookingNo] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, '').slice(-10);
    if (!/^[6-9]\d{9}$/.test(digits)) {
      setError(t({ en: 'Enter the 10-digit mobile number used for booking.', hi: 'बुकिंग में दिया गया 10 अंकों का मोबाइल नंबर दर्ज करें।' }));
      return;
    }
    setBusy(true);
    setError('');
    try {
      const body = bookingNo.trim() ? { bookingNo: bookingNo.trim().toUpperCase(), phone: digits } : { id, phone: digits };
      const { data } = await api('/consultations/bookings/lookup', { method: 'POST', body, auth: false });
      onFound(data);
    } catch (err) {
      setError(
        err.status === 404
          ? t({ en: 'No booking matches these details. Check the booking number and phone.', hi: 'इन विवरणों से कोई बुकिंग नहीं मिली। बुकिंग संख्या और फ़ोन जाँचें।' })
          : err.message
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`container ${styles.narrow}`}>
      <div className={`card ${styles.panel}`}>
        <span className="eyebrow">{t({ en: 'Track your booking', hi: 'अपनी बुकिंग देखें' })}</span>
        <h1 className={styles.h1}>{t({ en: 'Find your consultation', hi: 'अपना परामर्श खोजें' })}</h1>
        <p className="muted">
          {signedIn
            ? t({ en: 'This booking is not linked to your account. Enter the phone number it was made with.', hi: 'यह बुकिंग आपके खाते से जुड़ी नहीं है। जिस फ़ोन नंबर से बुक किया था, वह दर्ज करें।' })
            : t({ en: 'Sign in with the phone number you booked with, or enter your booking details below.', hi: 'जिस फ़ोन नंबर से बुक किया था उससे साइन इन करें, या नीचे बुकिंग विवरण दर्ज करें।' })}
        </p>
        <form onSubmit={submit} className={styles.lookupForm} noValidate>
          <div className="field">
            <label htmlFor="lk-no">{t({ en: 'Booking number (optional)', hi: 'बुकिंग संख्या (वैकल्पिक)' })}</label>
            <input id="lk-no" className="input" placeholder="VD-2610-ABCDE" value={bookingNo} onChange={(e) => setBookingNo(e.target.value)} maxLength={14} />
          </div>
          <div className="field">
            <label htmlFor="lk-phone">{t({ en: 'Mobile number', hi: 'मोबाइल नंबर' })}</label>
            <input id="lk-phone" type="tel" inputMode="numeric" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={14} />
          </div>
          {error && (
            <p className="error-text" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-primary btn-block" disabled={busy}>
            <Search size={16} /> {busy ? t({ en: 'Searching…', hi: 'खोज रहे हैं…' }) : t({ en: 'Find booking', hi: 'बुकिंग खोजें' })}
          </button>
        </form>
        {!signedIn && (
          <button type="button" className={`btn btn-ghost btn-block ${styles.mt}`} onClick={onSignIn}>
            <User size={16} /> {t({ en: 'Sign in to see all your bookings', hi: 'अपनी सभी बुकिंग देखने के लिए साइन इन करें' })}
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------ */

function BookingView({ booking, onChange, reload, justPaid, isNew }) {
  const { t, lang } = useLang();
  const { user, openSignIn } = useAuth();
  const config = usePaymentConfig();
  const payment = usePayment();
  const [currency, setCurrency] = useState(null);
  const [panel, setPanel] = useState(null); // 'cancel' | 'reschedule'

  const isOwner = Boolean(user && booking.user && String(booking.user) === String(user.id));
  const isGuest = !booking.user;
  const paid = booking.payment?.status && booking.payment.status !== 'unpaid';
  const open = OPEN.includes(booking.status);
  const canPay = Boolean(config?.enabled) && open && !paid && (isOwner || isGuest);
  const when = booking.scheduledAt || booking.preferredDate;
  const changeable = isOwner && open && booking.status !== 'rescheduled' ? new Date(when).getTime() - Date.now() > DAY_MS : false;
  const cancellable = isOwner && open && new Date(when).getTime() - Date.now() > DAY_MS;

  const planForPrice = useMemo(() => ({ price: booking.planSnapshot?.price ?? booking.payment?.amount, prices: undefined }), [booking]);
  const cur = currency || config?.baseCurrency || 'INR';
  const preview = config ? previewPrice(planForPrice, cur, config) : null;
  const amountLabel = preview ? `${preview.approx ? '≈ ' : ''}${money(preview.amount, cur, lang)}` : money(planForPrice.price, 'INR', lang);

  const pay = async () => {
    const result = await payment.pay({ bookingId: booking.id, currency: cur, phone: isGuest ? booking.contact.phone : undefined });
    if (result.status === 'paid' || result.status === 'pending') await reload();
  };

  const ModeIcon = MODE_ICON[booking.mode] ?? PhoneCall;
  const slot = SLOTS.find((s) => s.id === booking.preferredSlot);
  const astro = booking.astrologer && typeof booking.astrologer === 'object' ? booking.astrologer : null;

  return (
    <div className={`container ${styles.wrap}`}>
      {(justPaid || payment.status === 'paid') && paid && (
        <div className={`${styles.banner} ${styles.bannerOk} fade-up`} role="status">
          <CheckCircle2 size={22} /> {t({ en: 'Payment received — thank you! Your slot will be confirmed shortly.', hi: 'भुगतान प्राप्त हुआ — धन्यवाद! आपका समय शीघ्र ही पक्का किया जाएगा।' })}
        </div>
      )}
      {(justPaid || payment.status === 'pending') && booking.payment?.status === 'unpaid' && (
        <div className={`${styles.banner} fade-up`} role="status">
          <Clock size={22} /> {t({ en: 'Your payment is being processed. This page will show “Paid” once the bank confirms.', hi: 'आपका भुगतान प्रक्रिया में है। बैंक की पुष्टि होते ही यहाँ “भुगतान हो गया” दिखेगा।' })}
        </div>
      )}
      {isNew && !justPaid && (
        <div className={`${styles.banner} ${styles.bannerOk} fade-up`} role="status">
          <Sparkles size={22} />{' '}
          {config?.enabled
            ? t({ en: 'Booking received! Complete the payment below to secure your slot.', hi: 'बुकिंग प्राप्त हुई! अपना समय सुरक्षित करने के लिए नीचे भुगतान पूरा करें।' })
            : t({ en: 'Booking received! Our team will call you to confirm the time; payment is collected at confirmation.', hi: 'बुकिंग प्राप्त हुई! हमारी टीम समय पक्का करने के लिए आपको कॉल करेगी; भुगतान पुष्टि के समय लिया जाएगा।' })}
        </div>
      )}

      <header className={`card ${styles.head}`}>
        <div>
          <span className="eyebrow">{t({ en: 'Consultation booking', hi: 'परामर्श बुकिंग' })}</span>
          <h1 className={styles.h1}>
            {booking.planSnapshot?.name ? t(booking.planSnapshot.name) : t({ en: 'Consultation', hi: 'परामर्श' })}
          </h1>
          <p className={styles.bookingNo}>
            {t({ en: 'Booking no.', hi: 'बुकिंग संख्या' })} <strong>{booking.bookingNo}</strong>
          </p>
        </div>
        <span className={`${styles.pill} ${styles[`pill_${booking.status}`] ?? ''}`}>{t(STATUS_LABELS[booking.status] ?? { en: booking.status })}</span>
      </header>

      <div className={styles.grid}>
        <div className={styles.main}>
          <section className={`card ${styles.panel}`} aria-labelledby="bk-details">
            <h2 id="bk-details" className={styles.h2}>
              {t({ en: 'Session details', hi: 'सत्र विवरण' })}
            </h2>
            <dl className={styles.details}>
              <div>
                <dt>
                  <ModeIcon size={16} /> {t({ en: 'Mode', hi: 'माध्यम' })}
                </dt>
                <dd>{t(MODE_LABELS[booking.mode] ?? { en: booking.mode })}</dd>
              </div>
              <div>
                <dt>
                  <CalendarDays size={16} /> {booking.scheduledAt ? t({ en: 'Scheduled for', hi: 'निर्धारित समय' }) : t({ en: 'Preferred date', hi: 'पसंदीदा तिथि' })}
                </dt>
                <dd>
                  {booking.scheduledAt ? formatDateTime(booking.scheduledAt, lang) : formatDate(booking.preferredDate, lang)}
                  {!booking.scheduledAt && slot && slot.id !== 'any' && ` · ${t(slot.label)}`}
                </dd>
              </div>
              <div>
                <dt>
                  <Clock size={16} /> {t({ en: 'Duration', hi: 'अवधि' })}
                </dt>
                <dd>{booking.planSnapshot?.durationMinutes ? t({ en: `${booking.planSnapshot.durationMinutes} minutes`, hi: `${booking.planSnapshot.durationMinutes} मिनट` }) : '—'}</dd>
              </div>
              <div>
                <dt>
                  <User size={16} /> {t({ en: 'Astrologer', hi: 'ज्योतिषी' })}
                </dt>
                <dd className={styles.astro}>
                  {astro ? (
                    <>
                      <AstroAvatar astro={astro} size={32} /> {t(astro.name)}
                    </>
                  ) : (
                    t({ en: 'First available expert', hi: 'पहले उपलब्ध विशेषज्ञ' })
                  )}
                </dd>
              </div>
            </dl>
            {booking.message && (
              <p className={styles.message}>
                <strong>{t({ en: 'Your question', hi: 'आपका प्रश्न' })}:</strong> {booking.message}
              </p>
            )}

            {isOwner && open && (
              <div className={styles.actions}>
                <button type="button" className="btn btn-ghost btn-sm" disabled={!changeable} onClick={() => setPanel(panel === 'reschedule' ? null : 'reschedule')}>
                  <CalendarDays size={15} /> {t({ en: 'Reschedule', hi: 'समय बदलें' })}
                </button>
                <button type="button" className={`btn btn-ghost btn-sm ${styles.danger}`} disabled={!cancellable} onClick={() => setPanel(panel === 'cancel' ? null : 'cancel')}>
                  <XCircle size={15} /> {t({ en: 'Cancel booking', hi: 'बुकिंग रद्द करें' })}
                </button>
                {!cancellable && (
                  <p className={styles.small}>
                    {t({ en: 'Changes are possible up to 24 hours before the session. For urgent help, contact support.', hi: 'सत्र से 24 घंटे पहले तक बदलाव संभव है। तत्काल सहायता के लिए सहायता टीम से संपर्क करें।' })}
                  </p>
                )}
                {booking.status === 'rescheduled' && cancellable && (
                  <p className={styles.small}>{t({ en: 'Your new date is awaiting confirmation from our team.', hi: 'आपकी नई तिथि की पुष्टि हमारी टीम द्वारा की जानी है।' })}</p>
                )}
              </div>
            )}
            {panel === 'reschedule' && <Reschedule booking={booking} onDone={(b) => { onChange(b); setPanel(null); }} />}
            {panel === 'cancel' && <Cancel booking={booking} onDone={(b) => { onChange(b); setPanel(null); }} />}

            {isGuest && !user && (
              <p className={styles.small}>
                {t({ en: 'To reschedule or cancel, ', hi: 'समय बदलने या रद्द करने के लिए, ' })}
                <button type="button" className={styles.linkBtn} onClick={() => openSignIn({ onSuccess: reload })}>
                  {t({ en: `sign in with +91 ${booking.contact?.phone ?? ''}`, hi: `+91 ${booking.contact?.phone ?? ''} से साइन इन करें` })}
                </button>
                {t({ en: ' and contact support to link this booking, or call us.', hi: ' और इस बुकिंग को जोड़ने के लिए सहायता टीम से संपर्क करें।' })}
              </p>
            )}
          </section>

          <section className={`card ${styles.panel}`} aria-labelledby="bk-timeline">
            <h2 id="bk-timeline" className={styles.h2}>
              {t({ en: 'Status history', hi: 'स्थिति इतिहास' })}
            </h2>
            <ol className={styles.timeline}>
              {[...(booking.statusHistory ?? [])].reverse().map((h, i) => (
                <li key={`${h.status}-${h.at}-${i}`} className={styles[`tl_${h.status}`] ?? ''}>
                  <strong>{t(STATUS_LABELS[h.status] ?? { en: h.status })}</strong>
                  <time dateTime={h.at}>{formatDateTime(h.at, lang)}</time>
                  {h.note && <span>{h.note}</span>}
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className={styles.side}>
          <section className={`card ${styles.panel}`} aria-labelledby="bk-payment">
            <h2 id="bk-payment" className={styles.h2}>
              <CreditCard size={18} /> {t({ en: 'Payment', hi: 'भुगतान' })}
            </h2>
            <p className={styles.amount}>
              {paid ? money(booking.payment.amount, booking.payment.currency || 'INR', lang) : amountLabel}
            </p>
            <span className={`${styles.pill} ${paid ? styles.pill_confirmed : styles.pill_pending}`}>
              {t(PAYMENT_LABELS[booking.payment?.status] ?? PAYMENT_LABELS.unpaid)}
            </span>
            {booking.payment?.paidAt && <p className={styles.small}>{formatDateTime(booking.payment.paidAt, lang)}</p>}

            {canPay && (
              <div className={styles.payBox}>
                {config.currencies?.length > 1 && (
                  <div className="field">
                    <label htmlFor="bk-currency">{t({ en: 'Pay in', hi: 'भुगतान मुद्रा' })}</label>
                    <select id="bk-currency" className="input" value={cur} onChange={(e) => setCurrency(e.target.value)} disabled={payment.busy}>
                      {config.currencies.map((c) => {
                        const p = previewPrice(planForPrice, c, config);
                        return (
                          <option key={c} value={c}>
                            {p ? `${c} · ${p.approx ? '≈ ' : ''}${money(p.amount, c, lang)}` : c}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                <PaymentNotice payment={payment} onRetry={pay} amountLabel={amountLabel} />
                {(payment.status === 'idle' || payment.status === 'paid') && (
                  <button type="button" className="btn btn-primary btn-block" onClick={pay} disabled={payment.busy}>
                    <Lock size={16} /> {t({ en: 'Pay securely', hi: 'सुरक्षित भुगतान करें' })} · {amountLabel}
                  </button>
                )}
                <p className={styles.small}>{t({ en: 'UPI, cards, netbanking, wallets and international cards via Razorpay.', hi: 'Razorpay द्वारा UPI, कार्ड, नेटबैंकिंग, वॉलेट और अंतरराष्ट्रीय कार्ड।' })}</p>
              </div>
            )}
            {!paid && !config?.enabled && open && (
              <p className={styles.small}>{t({ en: 'Payment details will be shared when your slot is confirmed.', hi: 'समय पक्का होने पर भुगतान विवरण भेजा जाएगा।' })}</p>
            )}
          </section>

          <section className={`card ${styles.panel}`}>
            <h2 className={styles.h2}>{t({ en: 'Need help?', hi: 'सहायता चाहिए?' })}</h2>
            <p className={styles.small}>
              {t({ en: 'Quote your booking number when you contact us.', hi: 'संपर्क करते समय अपनी बुकिंग संख्या बताएँ।' })}
            </p>
            <Link href="/contact?topic=refund" className="btn btn-ghost btn-sm btn-block">
              {t({ en: 'Contact support', hi: 'सहायता से संपर्क करें' })}
            </Link>
            <Link href="/contact" className={`btn btn-ghost btn-sm btn-block ${styles.mt}`}>
              {t({ en: 'Book another session', hi: 'एक और सत्र बुक करें' })}
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
}

function Reschedule({ booking, onDone }) {
  const { t } = useLang();
  const [today] = useState(todayIST);
  const [preferred, setPreferred] = useState('');
  const [slot, setSlot] = useState(booking.preferredSlot || 'any');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!preferred) {
      setError(t({ en: 'Choose a new date.', hi: 'नई तिथि चुनें।' }));
      return;
    }
    setBusy(true);
    setError('');
    try {
      const { data } = await api(`/consultations/bookings/${booking.id}/reschedule`, { method: 'PATCH', body: { preferred, preferredSlot: slot } });
      onDone({ ...data, astrologer: booking.astrologer });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className={styles.inlineForm} onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="rs-date">{t({ en: 'New date', hi: 'नई तिथि' })}</label>
        <input id="rs-date" type="date" className="input" min={today} max={addDaysIso(today, 180)} value={preferred} onChange={(e) => setPreferred(e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="rs-slot">{t({ en: 'Time of day', hi: 'समय' })}</label>
        <select id="rs-slot" className="input" value={slot} onChange={(e) => setSlot(e.target.value)}>
          {SLOTS.map((s) => (
            <option key={s.id} value={s.id}>
              {t(s.label)}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn-primary btn-sm" disabled={busy}>
        {busy ? t({ en: 'Saving…', hi: 'सहेज रहे हैं…' }) : t({ en: 'Request new date', hi: 'नई तिथि का अनुरोध करें' })}
      </button>
    </form>
  );
}

function Cancel({ booking, onDone }) {
  const { t } = useLang();
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const paid = booking.payment?.status === 'paid';

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { data } = await api(`/consultations/bookings/${booking.id}/cancel`, { method: 'PATCH', body: reason.trim() ? { reason: reason.trim() } : {} });
      onDone({ ...data, astrologer: booking.astrologer });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className={styles.inlineForm} onSubmit={submit} noValidate>
      <p className={styles.small}>
        {paid
          ? t({ en: 'Your payment will be refunded to the original method within 5–7 working days.', hi: 'आपका भुगतान 5–7 कार्यदिवसों में मूल माध्यम में वापस कर दिया जाएगा।' })
          : t({ en: 'Are you sure you want to cancel this consultation?', hi: 'क्या आप वाकई यह परामर्श रद्द करना चाहते हैं?' })}
      </p>
      <div className="field">
        <label htmlFor="cn-reason">{t({ en: 'Reason (optional)', hi: 'कारण (वैकल्पिक)' })}</label>
        <input id="cn-reason" className="input" value={reason} onChange={(e) => setReason(e.target.value)} maxLength={500} />
      </div>
      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}
      <button className={`btn btn-sm ${styles.dangerSolid}`} disabled={busy}>
        {busy ? t({ en: 'Cancelling…', hi: 'रद्द हो रहा है…' }) : t({ en: 'Yes, cancel booking', hi: 'हाँ, बुकिंग रद्द करें' })}
      </button>
    </form>
  );
}
