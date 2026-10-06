'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Briefcase, HandCoins, IndianRupee, Percent } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { RITUALS } from '@/lib/pandit/catalog';
import { inr } from '@/lib/pandit/payments';
import { ME, usePandit } from '@/lib/pandit/store';
import { Empty, PageHead, RequireProfile, Shell, Stat, useDate, styles as s } from './ui';

export default function Earnings() {
  return (
    <Shell>
      <RequireProfile>
        <Inner />
      </RequireProfile>
    </Shell>
  );
}

function Inner() {
  const { t } = useLang();
  const fmt = useDate();
  const { ledger, jobs, myYajmans, me } = usePandit();

  const data = useMemo(() => {
    const mine = ledger.filter((l) => l.panditId === ME);
    const jobById = Object.fromEntries(jobs.map((j) => [j.id, j]));
    const network = mine.reduce((a, l) => a + l.amount, 0);
    // Commission on jobs I posted (what the platform kept from my yajmans' payments).
    const commission = ledger.filter((l) => l.kind === 'commission' && jobById[l.jobId]?.postedBy === ME).reduce((a, l) => a + l.amount, 0);
    const direct = myYajmans.flatMap((y) => (y.history || []).map((h) => ({ ...h, yajman: y.name, yajmanId: y.id }))).filter((h) => h.amount > 0);
    const directTotal = direct.reduce((a, h) => a + h.amount, 0);
    const pending = jobs.filter((j) => j.status === 'completed' && j.team.some((m) => m.panditId === ME)).length;
    return { mine, jobById, network, commission, direct, directTotal, pending };
  }, [ledger, jobs, myYajmans]);

  return (
    <>
      <PageHead title={{ en: 'Earnings', hi: 'कमाई' }} sub={{ en: 'Payouts from shared work and dakshina logged from your own yajmans.', hi: 'साझा काम से भुगतान और आपके यजमानों से दर्ज दक्षिणा।' }} />

      <div className={s.stats}>
        <Stat icon={HandCoins} value={inr(data.network)} label={t({ en: 'Paid out to you (network)', hi: 'आपको भुगतान (नेटवर्क)' })} />
        <Stat icon={IndianRupee} value={inr(data.directTotal)} label={t({ en: 'Direct dakshina logged', hi: 'सीधी दक्षिणा दर्ज' })} />
        <Stat icon={Percent} value={inr(data.commission)} label={t({ en: 'Commission on your posts', hi: 'आपकी पोस्ट पर कमीशन' })} />
        <Stat icon={Briefcase} value={data.pending} label={t({ en: 'Jobs awaiting payout', hi: 'भुगतान प्रतीक्षित काम' })} />
      </div>

      {!me.upi && (
        <div className={s.notice} style={{ marginTop: 16 }}>
          <IndianRupee size={16} />
          <span>
            {t({ en: 'Add your UPI ID so payouts can reach you.', hi: 'भुगतान पाने के लिए अपनी UPI आईडी जोड़ें।' })}{' '}
            <Link href="/pandit-sangh/profile" className={s.linkBtn}>
              {t({ en: 'Add now', hi: 'अभी जोड़ें' })}
            </Link>
          </span>
        </div>
      )}

      <div className={s.grid2} style={{ marginTop: 24, alignItems: 'start' }}>
        <section className={s.panel}>
          <h2>{t({ en: 'Network payouts', hi: 'नेटवर्क भुगतान' })}</h2>
          {data.mine.length ? (
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>{t({ en: 'Date', hi: 'तारीख' })}</th>
                    <th>{t({ en: 'Work', hi: 'काम' })}</th>
                    <th className={s.num}>{t({ en: 'Amount', hi: 'राशि' })}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.mine.map((l) => {
                    const j = data.jobById[l.jobId];
                    return (
                      <tr key={l.id}>
                        <td>{fmt(l.at)}</td>
                        <td>{j ? <Link href={`/pandit-sangh/kaam/${j.id}`}>{j.title}</Link> : '—'}</td>
                        <td className={s.num}>
                          <strong style={{ color: 'var(--green)' }}>{inr(l.amount)}</strong>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <Empty icon="🪙" text={t({ en: 'No payouts yet. Join a team on the work board.', hi: 'अभी कोई भुगतान नहीं। कार्य बोर्ड पर किसी टीम से जुड़ें।' })}>
              <Link href="/pandit-sangh/kaam" className="btn btn-primary btn-sm">
                {t({ en: 'Open work board', hi: 'कार्य बोर्ड खोलें' })}
              </Link>
            </Empty>
          )}
        </section>

        <section className={s.panel}>
          <h2>{t({ en: 'Dakshina from your yajmans', hi: 'आपके यजमानों से दक्षिणा' })}</h2>
          {data.direct.length ? (
            <div className={s.tableWrap}>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>{t({ en: 'Date', hi: 'तारीख' })}</th>
                    <th>{t({ en: 'Yajman', hi: 'यजमान' })}</th>
                    <th className={s.num}>{t({ en: 'Amount', hi: 'राशि' })}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.direct
                    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
                    .map((h) => (
                      <tr key={h.id}>
                        <td>{fmt(h.date)}</td>
                        <td>
                          <Link href={`/pandit-sangh/yajman/${h.yajmanId}`}>{h.yajman}</Link>
                          <small className="muted" style={{ display: 'block' }}>
                            {t(RITUALS[h.ritual]?.label)}
                          </small>
                        </td>
                        <td className={s.num}>{inr(h.amount)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="muted">{t({ en: 'Use “Log a ritual” on a yajman’s page to record dakshina.', hi: 'दक्षिणा दर्ज करने के लिए यजमान पृष्ठ पर “अनुष्ठान दर्ज करें” का उपयोग करें।' })}</p>
          )}
        </section>
      </div>
    </>
  );
}
