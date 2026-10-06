'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Award, Briefcase, Languages, MapPin, Pencil, Star, ThumbsUp, Users } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { LANGUAGES, RITUALS, SPECIALITIES, VEDAS } from '@/lib/pandit/catalog';
import { inr } from '@/lib/pandit/payments';
import { ME, panditName, usePandit } from '@/lib/pandit/store';
import { ConnectButton } from './PanditCard';
import { Avatar, Empty, Stat, StatusChip, Verified, useDate, styles as s } from './ui';

// Stable pseudo-count so sample profiles show some endorsements.
const baseCount = (id, skill) => (id === ME ? 0 : [...`${id}${skill}`].reduce((a, c) => a + c.charCodeAt(0), 0) % 23) + (id === ME ? 0 : 3);

export default function PanditProfile() {
  const { id } = useParams();
  const { t, lang } = useLang();
  const fmt = useDate();
  const { panditById, endorsements, endorse, jobs, me, loaded, connections, myYajmans } = usePandit();
  const p = panditById(id);

  if (!loaded) return null;
  if (!p)
    return (
      <div className={`container ${s.shell}`} style={{ paddingTop: 28 }}>
        <Empty icon="🔍" text={t({ en: 'This pandit profile was not found.', hi: 'यह पंडित प्रोफ़ाइल नहीं मिली।' })}>
          <Link href="/pandit-sangh/network" className="btn btn-primary">
            {t({ en: 'Back to network', hi: 'नेटवर्क पर वापस' })}
          </Link>
        </Empty>
      </div>
    );

  const mine = id === ME;
  const openJobs = jobs.filter((j) => j.postedBy === id && j.status === 'open');
  const together = mine ? [] : jobs.filter((j) => j.team.some((m) => m.panditId === id) && j.team.some((m) => m.panditId === ME));
  const connCount = connections.filter((c) => c.status === 'accepted' && (c.from === id || c.to === id)).length + (mine ? 0 : 40 + (p.reviews % 60));
  const endorsedByMe = (skill) => endorsements.some((e) => e.from === ME && e.to === id && e.skill === skill);
  const endorseCount = (skill) => baseCount(id, skill) + endorsements.filter((e) => e.to === id && e.skill === skill).length;

  return (
    <div className={`container ${s.shell}`}>
      <section className={s.hero}>
        <div className={s.cover} />
        <div className={s.heroBody}>
          <div className={s.heroAvatar}>
            <Avatar name={p.name} hue={p.hue} size={108} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start' }}>
            <div>
              <h1>
                {panditName(p, lang)} {p.verified && <Verified size={22} />}
              </h1>
              <p className="muted" style={{ margin: '0 0 8px', fontSize: '1.05rem' }}>
                {p.headline}
              </p>
              <div className={s.meta}>
                <span>
                  <MapPin size={14} /> {[p.city, p.state].filter(Boolean).join(', ')}
                </span>
                <span>
                  <Award size={14} /> {p.experience} {t({ en: 'years experience', hi: 'वर्ष अनुभव' })}
                </span>
                <span>
                  <Users size={14} /> {connCount} {t({ en: 'connections', hi: 'कनेक्शन' })}
                </span>
                {p.available !== false && <span className={`${s.chip} ${s.chipGreen}`}>{t({ en: 'Open to work', hi: 'काम हेतु उपलब्ध' })}</span>}
              </div>
            </div>
            <div className={s.actions}>
              {mine ? (
                <Link href="/pandit-sangh/profile" className="btn btn-primary">
                  <Pencil size={16} /> {t({ en: 'Edit profile', hi: 'प्रोफ़ाइल बदलें' })}
                </Link>
              ) : (
                <ConnectButton panditId={id} />
              )}
            </div>
          </div>
        </div>
      </section>

      <div className={s.stats} style={{ marginTop: 20 }}>
        <Stat icon={Briefcase} value={(p.worksDone ?? jobs.filter((j) => j.status === 'paid' && j.team.some((m) => m.panditId === id)).length).toLocaleString('en-IN')} label={t({ en: 'Anushthans done', hi: 'संपन्न अनुष्ठान' })} />
        <Stat icon={Users} value={(mine ? myYajmans.length : p.yajmanCount ?? 0).toLocaleString('en-IN')} label={t({ en: 'Yajman families', hi: 'यजमान परिवार' })} />
        <Stat icon={Star} value={p.rating ? `${p.rating} ★` : '—'} label={t({ en: `${p.reviews ?? 0} reviews`, hi: `${p.reviews ?? 0} समीक्षाएँ` })} />
        <Stat icon={Languages} value={p.languages.length} label={(p.languages || []).map((l) => t(LANGUAGES[l])).join(', ')} />
      </div>

      <div className={s.cols} style={{ marginTop: 24 }}>
        <div className={s.stack}>
          <section className={s.panel}>
            <h2>{t({ en: 'About', hi: 'परिचय' })}</h2>
            <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{p.bio || <span className="muted">{t({ en: 'No introduction added yet.', hi: 'अभी परिचय नहीं जोड़ा गया।' })}</span>}</p>
            {p.ved && (
              <p className="muted" style={{ margin: '12px 0 0', fontSize: '0.92rem' }}>
                {t({ en: 'Ved:', hi: 'वेद:' })} <strong>{t(VEDAS[p.ved])}</strong>
              </p>
            )}
          </section>

          <section className={s.panel}>
            <h2>
              <ThumbsUp size={18} /> {t({ en: 'Specialities & endorsements', hi: 'विशेषज्ञता एवं समर्थन' })}
            </h2>
            <ul className={s.list}>
              {p.specialities.map((k) => (
                <li key={k} className={s.item}>
                  <div className={s.itemBody}>
                    <strong>{t(SPECIALITIES[k])}</strong>
                    <small>
                      {endorseCount(k)} {t({ en: 'pandits endorsed this', hi: 'पंडितों ने समर्थन किया' })}
                    </small>
                  </div>
                  {!mine && me && (
                    <button type="button" className={`btn btn-sm ${endorsedByMe(k) ? 'btn-primary' : 'btn-ghost'}`} onClick={() => endorse(id, k)} aria-pressed={endorsedByMe(k)}>
                      <ThumbsUp size={14} /> {endorsedByMe(k) ? t({ en: 'Endorsed', hi: 'समर्थित' }) : t({ en: 'Endorse', hi: 'समर्थन करें' })}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {together.length > 0 && (
            <section className={s.panel}>
              <h2>{t({ en: 'Work done together', hi: 'साथ में किए गए कार्य' })}</h2>
              <ul className={s.list}>
                {together.map((j) => (
                  <li key={j.id} className={s.item}>
                    <div className={s.itemBody}>
                      <Link href={`/pandit-sangh/kaam/${j.id}`}>
                        <strong>{j.title}</strong>
                      </Link>
                      <small>
                        {t(RITUALS[j.ritual]?.label)} · {j.city} · {fmt(j.date)}
                      </small>
                    </div>
                    <StatusChip status={j.status} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className={s.stack}>
          <section className={s.panel}>
            <h3>
              <Briefcase size={18} /> {t({ en: 'Open work from this pandit', hi: 'इन पंडित का उपलब्ध काम' })}
            </h3>
            {openJobs.length ? (
              <ul className={s.list}>
                {openJobs.map((j) => (
                  <li key={j.id}>
                    <Link href={`/pandit-sangh/kaam/${j.id}`} className={s.item}>
                      <span className={s.itemBody}>
                        <strong>{j.title}</strong>
                        <small>
                          {fmt(j.date)} · {inr(j.total)}
                        </small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
                {t({ en: 'No open work right now.', hi: 'अभी कोई खुला काम नहीं।' })}
              </p>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
