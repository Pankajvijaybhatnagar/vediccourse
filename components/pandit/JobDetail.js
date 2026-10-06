'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { CalendarDays, CheckCircle2, Clock, HandCoins, MapPin, Trash2, UserMinus, UserPlus, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { COMMISSION_RATE, JOB_ROLES, RITUALS } from '@/lib/pandit/catalog';
import { inr, roleWeight, splitPayment } from '@/lib/pandit/payments';
import { ME, panditName, usePandit } from '@/lib/pandit/store';
import { Avatar, Empty, PageHead, Shell, StatusChip, Verified, useDate, useToast, styles as s } from './ui';

const COLORS = ['#e88a00', '#f5b942', '#f9d98c', '#d97706', '#fcd34d', '#b45309', '#fde68a'];

export default function JobDetail() {
  const { id } = useParams();
  const { t, lang } = useLang();
  const fmt = useDate();
  const router = useRouter();
  const store = usePandit();
  const { jobs, panditById, me, loaded, applyJob, withdrawJob, hire, declineApplicant, setTeam, setJobStatus, releasePayment, deleteJob, ledger } = store;
  const job = jobs.find((j) => j.id === id);
  const [note, setNote] = useState('');
  const [toast, showToast] = useToast();

  if (!loaded) return null;
  if (!job)
    return (
      <Shell>
        <div style={{ marginTop: 28 }}>
          <Empty icon="🔍" text={t({ en: 'This work post was not found.', hi: 'यह कार्य पोस्ट नहीं मिली।' })}>
            <Link href="/pandit-sangh/kaam" className="btn btn-primary">
              {t({ en: 'Back to work board', hi: 'कार्य बोर्ड पर वापस' })}
            </Link>
          </Empty>
        </div>
      </Shell>
    );

  const mine = job.postedBy === ME;
  const poster = panditById(job.postedBy);
  const inTeam = job.team.some((m) => m.panditId === ME);
  const applied = job.applicants.some((a) => a.panditId === ME);
  const split = splitPayment(job.total, job.team);
  const editable = mine && !['paid', 'cancelled'].includes(job.status);
  const myPayout = ledger.find((l) => l.jobId === job.id && l.panditId === ME);

  const updateMember = (i, patch) => setTeam(job.id, job.team.map((m, j) => (j === i ? { ...m, ...patch } : m)));
  const removeMember = (i) => setTeam(job.id, job.team.filter((_, j) => j !== i));

  return (
    <Shell>
      <PageHead back={{ href: '/pandit-sangh/kaam', label: { en: 'Work board', hi: 'कार्य बोर्ड' } }} title={job.title} sub={`${t(RITUALS[job.ritual]?.label)} · ${job.city}`}>
        <StatusChip status={job.status} />
      </PageHead>

      <div className={s.cols}>
        <div className={s.stack}>
          <section className={s.panel}>
            <div className={s.meta} style={{ fontSize: '0.95rem', marginBottom: 12 }}>
              <span>
                <CalendarDays size={16} /> {fmt(job.date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              {job.time && (
                <span>
                  <Clock size={16} /> {job.time}
                </span>
              )}
              <span>
                <MapPin size={16} /> {job.city}
              </span>
            </div>
            {job.description && <p style={{ margin: '0 0 12px', whiteSpace: 'pre-wrap' }}>{job.description}</p>}
            {poster && (
              <Link href={`/pandit-sangh/pandit/${poster.id}`} className={s.item}>
                <Avatar name={poster.name} hue={poster.hue} size={40} />
                <span className={s.itemBody}>
                  <small>{t({ en: 'Posted by', hi: 'पोस्टकर्ता' })}</small>
                  <strong style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    {mine ? t({ en: 'You', hi: 'आप' }) : panditName(poster, lang)} {poster.verified && <Verified size={15} />}
                  </strong>
                </span>
              </Link>
            )}
          </section>

          {/* Team & split */}
          <section className={s.panel}>
            <div className={s.panelHead}>
              <h2>
                <HandCoins size={18} /> {t({ en: 'Team & dakshina split', hi: 'टीम एवं दक्षिणा बँटवारा' })}
              </h2>
              <span className="muted" style={{ fontSize: '0.88rem' }}>
                {job.team.length}/{job.needed} {t({ en: 'pandits', hi: 'पंडित' })}
              </span>
            </div>

            {job.team.length ? (
              <>
                {job.team.map((m, i) => {
                  const p = panditById(m.panditId);
                  const po = split.payouts[i];
                  return (
                    <div key={m.panditId} className={s.splitRow}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                        <i style={{ width: 10, height: 10, borderRadius: 3, background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                        <Avatar name={p?.name || '?'} hue={p?.hue} size={32} />
                        <strong style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.panditId === ME ? t({ en: 'You', hi: 'आप' }) : panditName(p, lang)}</strong>
                      </div>
                      {editable ? (
                        <select className={`input ${s.smallInput}`} value={m.role} onChange={(e) => updateMember(i, { role: e.target.value, weight: roleWeight(e.target.value) })} aria-label={t({ en: 'Role', hi: 'भूमिका' })}>
                          {Object.entries(JOB_ROLES).map(([k, r]) => (
                            <option key={k} value={k}>
                              {t(r.label)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="muted" style={{ fontSize: '0.9rem' }}>
                          {t(JOB_ROLES[m.role]?.label)}
                        </span>
                      )}
                      {editable ? (
                        <input className={`input ${s.smallInput}`} type="number" min="0" step="0.5" value={m.weight} onChange={(e) => updateMember(i, { weight: e.target.value })} aria-label={t({ en: 'Share weight', hi: 'हिस्सा भार' })} title={t({ en: 'Share weight', hi: 'हिस्सा भार' })} />
                      ) : (
                        <span className="muted">{po?.percent}%</span>
                      )}
                      <strong className={s.num}>{inr(po?.amount)}</strong>
                      {editable && m.panditId !== ME ? (
                        <button className={s.iconBtn} onClick={() => removeMember(i)} aria-label={t({ en: 'Remove from team', hi: 'टीम से हटाएँ' })}>
                          <UserMinus size={16} />
                        </button>
                      ) : (
                        <span />
                      )}
                    </div>
                  );
                })}
                <div className={s.bar} aria-hidden="true">
                  {split.payouts.map((po, i) => (
                    <span key={po.panditId} style={{ width: `${(po.amount / (split.total || 1)) * 100}%`, background: COLORS[i % COLORS.length] }} />
                  ))}
                  <span style={{ width: `${(split.commission / (split.total || 1)) * 100}%`, background: '#c9b48a' }} />
                </div>
                <div className={s.splitTotal}>
                  <div>
                    <span>{t({ en: 'Dakshina from yajman', hi: 'यजमान से दक्षिणा' })}</span>
                    <strong>{inr(split.total)}</strong>
                  </div>
                  <div>
                    <span>
                      {t({ en: 'Pandit Sangh commission', hi: 'पंडित संघ कमीशन' })} ({COMMISSION_RATE * 100}%)
                    </span>
                    <span>− {inr(split.commission)}</span>
                  </div>
                  <div className={s.grand}>
                    <span>{t({ en: 'Shared among pandits', hi: 'पंडितों में वितरित' })}</span>
                    <span>{inr(split.distributable)}</span>
                  </div>
                </div>
                {editable && (
                  <p className="muted" style={{ fontSize: '0.82rem', margin: '10px 0 0' }}>
                    {t({ en: 'Weight decides the share: Acharya 2, Brahma 1.5, Sahayak/Path 1. Change it if you agreed otherwise.', hi: 'भार से हिस्सा तय होता है: आचार्य 2, ब्रह्मा 1.5, सहायक/पाठ 1। अलग सहमति हो तो बदलें।' })}
                  </p>
                )}
              </>
            ) : (
              <p className="muted" style={{ margin: 0 }}>
                {t({ en: 'No one in the team yet.', hi: 'अभी टीम में कोई नहीं।' })}
              </p>
            )}
          </section>

          {mine && job.applicants.length > 0 && editable && (
            <section className={s.panel}>
              <h2>
                <UserPlus size={18} /> {t({ en: 'Applicants', hi: 'आवेदक' })} ({job.applicants.length})
              </h2>
              <ul className={s.list}>
                {job.applicants.map((a) => {
                  const p = panditById(a.panditId);
                  if (!p) return null;
                  return (
                    <li key={a.panditId} className={s.item} style={{ flexWrap: 'wrap' }}>
                      <Avatar name={p.name} hue={p.hue} size={42} />
                      <div className={s.itemBody}>
                        <Link href={`/pandit-sangh/pandit/${p.id}`}>
                          <strong style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                            {panditName(p, lang)} {p.verified && <Verified size={15} />}
                          </strong>
                        </Link>
                        <small>
                          {p.city} · {p.experience} {t({ en: 'yrs', hi: 'वर्ष' })} · ★ {p.rating}
                          {a.note && ` · “${a.note}”`}
                        </small>
                      </div>
                      <button className="btn btn-primary btn-sm" onClick={() => (hire(job.id, a.panditId, 'sahayak'), showToast(t({ en: 'Added to team', hi: 'टीम में जोड़ा' })))}>
                        <UserPlus size={14} /> {t({ en: 'Add to team', hi: 'टीम में जोड़ें' })}
                      </button>
                      <button className={s.iconBtn} onClick={() => declineApplicant(job.id, a.panditId)} aria-label={t({ en: 'Decline', hi: 'अस्वीकारें' })}>
                        <X size={16} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>

        <aside className={s.stack}>
          <section className={s.panel}>
            <span className={s.amount} style={{ fontSize: '1.6rem' }}>
              {inr(job.total)}
            </span>
            <p className="muted" style={{ margin: '0 0 14px', fontSize: '0.88rem' }}>
              {t({ en: 'Total dakshina · paid through Pandit Sangh', hi: 'कुल दक्षिणा · पंडित संघ के माध्यम से भुगतान' })}
            </p>

            {/* Poster's controls */}
            {mine && job.status === 'open' && (
              <button className="btn btn-primary btn-block" disabled={!job.team.length} onClick={() => setJobStatus(job.id, 'staffed')}>
                {t({ en: 'Team is final — close applications', hi: 'टीम तय — आवेदन बंद करें' })}
              </button>
            )}
            {mine && job.status === 'staffed' && (
              <button className="btn btn-primary btn-block" onClick={() => setJobStatus(job.id, 'completed')}>
                <CheckCircle2 size={16} /> {t({ en: 'Mark anushthan completed', hi: 'अनुष्ठान संपन्न चिह्नित करें' })}
              </button>
            )}
            {mine && job.status === 'completed' && (
              <>
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    if (window.confirm(t({ en: `Release ${inr(split.distributable)} to ${job.team.length} pandits?`, hi: `${job.team.length} पंडितों को ${inr(split.distributable)} वितरित करें?` }))) releasePayment(job.id);
                  }}
                >
                  <HandCoins size={16} /> {t({ en: 'Release payment to team', hi: 'टीम को भुगतान वितरित करें' })}
                </button>
                <p className="muted" style={{ fontSize: '0.8rem', margin: '8px 0 0' }}>
                  {t({ en: 'Confirms the yajman’s payment was received and pays each pandit’s share to their UPI.', hi: 'पुष्टि करता है कि यजमान का भुगतान मिल गया और हर पंडित का हिस्सा उनके UPI पर भेजता है।' })}
                </p>
              </>
            )}
            {mine && job.status === 'open' && job.team.length > 0 && job.team.length < job.needed && (
              <p className="muted" style={{ fontSize: '0.8rem', margin: '8px 0 0' }}>
                {t({ en: `${job.needed - job.team.length} more pandit(s) needed.`, hi: `${job.needed - job.team.length} और पंडित चाहिए।` })}
              </p>
            )}
            {job.status === 'paid' && (
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--green)' }}>
                ✓ {t({ en: 'Paid on', hi: 'भुगतान तिथि' })} {fmt(job.paidAt)}
                {myPayout && (
                  <>
                    <br />
                    {t({ en: 'Your share:', hi: 'आपका हिस्सा:' })} {inr(myPayout.amount)}
                  </>
                )}
              </p>
            )}

            {/* Other pandits' controls */}
            {!mine && job.status === 'open' && !inTeam && me && (
              <>
                {applied ? (
                  <>
                    <p style={{ margin: '0 0 10px', fontWeight: 600 }}>{t({ en: 'You have applied. The poster will respond soon.', hi: 'आपने आवेदन किया है। पोस्टकर्ता जल्द उत्तर देंगे।' })}</p>
                    <button className="btn btn-ghost btn-block" onClick={() => withdrawJob(job.id)}>
                      {t({ en: 'Withdraw application', hi: 'आवेदन वापस लें' })}
                    </button>
                  </>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      applyJob(job.id, note.trim());
                      setNote('');
                      showToast(t({ en: 'Application sent', hi: 'आवेदन भेजा गया' }));
                    }}
                    className={s.stack}
                    style={{ gap: 10 }}
                  >
                    <label htmlFor="apply-note" className="muted" style={{ fontSize: '0.86rem', fontWeight: 700 }}>
                      {t({ en: 'Note to the poster (optional)', hi: 'पोस्टकर्ता के लिए संदेश (वैकल्पिक)' })}
                    </label>
                    <textarea id="apply-note" className="input" rows={3} value={note} onChange={(e) => setNote(e.target.value)} style={{ minHeight: 80 }} placeholder={t({ en: 'Experience with this anushthan, availability…', hi: 'इस अनुष्ठान का अनुभव, उपलब्धता…' })} />
                    <button type="submit" className="btn btn-primary btn-block">
                      {t({ en: 'Apply for this work', hi: 'इस काम हेतु आवेदन करें' })}
                    </button>
                    <p className="muted" style={{ fontSize: '0.8rem', margin: 0 }}>
                      {t({ en: `As a Sahayak your share would be about ${inr(splitPayment(job.total, [...job.team, { panditId: ME, weight: 1 }]).payouts.at(-1).amount)}.`, hi: `सहायक के रूप में आपका हिस्सा लगभग ${inr(splitPayment(job.total, [...job.team, { panditId: ME, weight: 1 }]).payouts.at(-1).amount)} होगा।` })}
                    </p>
                  </form>
                )}
              </>
            )}
            {!mine && !me && (
              <Link href="/pandit-sangh/profile" className="btn btn-primary btn-block">
                {t({ en: 'Create profile to apply', hi: 'आवेदन हेतु प्रोफ़ाइल बनाएँ' })}
              </Link>
            )}
            {!mine && inTeam && job.status !== 'paid' && (
              <p style={{ margin: 0, fontWeight: 600 }}>
                ✓ {t({ en: 'You are in this team. Your share:', hi: 'आप इस टीम में हैं। आपका हिस्सा:' })} {inr(split.payouts[job.team.findIndex((m) => m.panditId === ME)]?.amount)}
              </p>
            )}
          </section>

          {mine && !['paid'].includes(job.status) && (
            <div className={s.actions}>
              {job.status !== 'cancelled' && (
                <button className={`${s.linkBtn} ${s.danger}`} onClick={() => window.confirm(t({ en: 'Cancel this work?', hi: 'यह काम रद्द करें?' })) && setJobStatus(job.id, 'cancelled')}>
                  <X size={14} /> {t({ en: 'Cancel work', hi: 'काम रद्द करें' })}
                </button>
              )}
              <button
                className={`${s.linkBtn} ${s.danger}`}
                onClick={() => {
                  if (window.confirm(t({ en: 'Delete this post permanently?', hi: 'यह पोस्ट स्थायी रूप से हटाएँ?' }))) {
                    deleteJob(job.id);
                    router.push('/pandit-sangh/kaam');
                  }
                }}
              >
                <Trash2 size={14} /> {t({ en: 'Delete', hi: 'हटाएँ' })}
              </button>
            </div>
          )}
        </aside>
      </div>
      {toast}
    </Shell>
  );
}
