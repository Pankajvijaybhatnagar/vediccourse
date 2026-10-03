'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { openCheckout } from '@/lib/razorpay';

let configPromise = null;

/** GET /payments/config, fetched once per page load. Resolves to a disabled config if unreachable. */
export function fetchPaymentConfig() {
  configPromise ??= api('/payments/config', { auth: false })
    .then((r) => r.data)
    .catch(() => {
      configPromise = null;
      return { enabled: false, currencies: ['INR'], baseCurrency: 'INR', fxRates: {} };
    });
  return configPromise;
}

export function usePaymentConfig(initial) {
  const [config, setConfig] = useState(initial ?? null);
  useEffect(() => {
    if (initial) return;
    let alive = true;
    fetchPaymentConfig().then((c) => alive && setConfig(c));
    return () => {
      alive = false;
    };
  }, [initial]);
  return config;
}

/**
 * Drives a Razorpay payment for a booking:
 *   creating → open (Razorpay window) → verifying → paid | pending
 * and dismissed / failed / error when it doesn't complete. Safe to call again to retry.
 */
export function usePayment() {
  const [state, setState] = useState({ status: 'idle', message: '' });

  const pay = useCallback(async ({ bookingId, currency, phone }) => {
    setState({ status: 'creating', message: '' });
    try {
      const { data: order } = await api('/payments/orders', { method: 'POST', body: { bookingId, currency, ...(phone && { phone }) } });
      setState({ status: 'open', message: '', order });

      const response = await openCheckout(order);
      setState({ status: 'verifying', message: '', order });

      const { data } = await api('/payments/verify', { method: 'POST', body: response, auth: false });
      const next = { status: data.pending ? 'pending' : 'paid', message: '', order, payment: data.payment };
      setState(next);
      return next;
    } catch (err) {
      if (err?.code === 'ALREADY_PAID') {
        const next = { status: 'paid', message: '' };
        setState(next);
        return next;
      }
      const status = err?.reason === 'dismissed' ? 'dismissed' : err?.reason === 'failed' ? 'failed' : 'error';
      const next = { status, message: err?.message || '' };
      setState(next);
      return next;
    }
  }, []);

  const reset = useCallback(() => setState({ status: 'idle', message: '' }), []);
  const busy = ['creating', 'open', 'verifying'].includes(state.status);

  return { ...state, busy, pay, reset };
}
