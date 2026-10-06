// Payment split for jobs shared between pandits. Amounts are whole rupees.
import { COMMISSION_RATE, JOB_ROLES } from './catalog';

/**
 * Splits a job's dakshina: the platform takes its commission first, the rest is shared by weight.
 * Rounding leftovers go to the first (lead) pandit so the parts always add up to the total.
 * @param {number} total
 * @param {{ panditId: string, weight: number }[]} team
 * @returns {{ total, commission, distributable, payouts: { panditId, amount, percent }[] }}
 */
export function splitPayment(total, team, rate = COMMISSION_RATE) {
  const amount = Math.max(0, Math.round(Number(total) || 0));
  const commission = Math.round(amount * rate);
  const distributable = amount - commission;
  const weights = team.map((m) => Math.max(0, Number(m.weight) || 0));
  const sum = weights.reduce((a, b) => a + b, 0) || 1;

  const payouts = team.map((m, i) => ({ panditId: m.panditId, amount: Math.floor((distributable * weights[i]) / sum) }));
  const leftover = distributable - payouts.reduce((a, b) => a + b.amount, 0);
  if (payouts.length) payouts[0].amount += leftover;
  payouts.forEach((po) => (po.percent = distributable ? Math.round((po.amount / distributable) * 1000) / 10 : 0));

  return { total: amount, commission, distributable, payouts };
}

export const roleWeight = (role) => JOB_ROLES[role]?.weight ?? 1;

export const inr = (n) => `₹${Math.round(Number(n) || 0).toLocaleString('en-IN')}`;
