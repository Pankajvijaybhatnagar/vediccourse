'use client';

// Razorpay Checkout: loaded lazily, once, only when a visitor actually pays.
const SRC = 'https://checkout.razorpay.com/v1/checkout.js';
let loading = null;

export function loadRazorpay() {
  if (typeof window === 'undefined') return Promise.reject(new Error('Razorpay can only load in the browser'));
  if (window.Razorpay) return Promise.resolve(window.Razorpay);
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SRC;
    script.async = true;
    script.onload = () => (window.Razorpay ? resolve(window.Razorpay) : reject(new Error('Razorpay failed to initialise')));
    script.onerror = () => {
      loading = null; // allow a retry after a network hiccup
      script.remove();
      reject(new Error('Could not load the payment window. Check your connection and try again.'));
    };
    document.body.appendChild(script);
  });
  return loading;
}

/**
 * Opens Razorpay Checkout for an order created by POST /payments/orders.
 * Resolves with { razorpay_order_id, razorpay_payment_id, razorpay_signature } on success.
 * Rejects with an Error whose `reason` is 'dismissed' (closed by the user) or 'failed' (payment declined).
 */
export async function openCheckout(order) {
  const Razorpay = await loadRazorpay();
  return new Promise((resolve, reject) => {
    let settled = false;
    let lastFailure = null;
    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      fn(value);
    };
    const closed = () =>
      lastFailure
        ? Object.assign(new Error(lastFailure), { reason: 'failed' })
        : Object.assign(new Error('Payment window closed'), { reason: 'dismissed' });

    const rzp = new Razorpay({
      key: order.keyId,
      order_id: order.orderId,
      amount: order.amount,
      currency: order.currency,
      name: order.name,
      description: order.description,
      prefill: order.prefill,
      notes: order.notes,
      theme: order.theme,
      retry: { enabled: true, max_count: 3 },
      handler: (response) => finish(resolve, response),
      modal: {
        confirm_close: true,
        ondismiss: () => finish(reject, closed()),
      },
    });

    // Razorpay keeps its window open so the customer can retry with another method;
    // remember the reason in case they give up and close it.
    rzp.on('payment.failed', (resp) => {
      lastFailure = resp?.error?.description || resp?.error?.reason || 'Payment failed';
    });
    rzp.open();
  });
}
