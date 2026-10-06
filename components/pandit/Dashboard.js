'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { Bell, Briefcase, CalendarDays, HandCoins, Network, Plus, Upload, UserCheck, Users, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { RELATIONS } from '@/lib/pandit/catalog';
import { inr } from '@/lib/pandit/payments';
import { pitruPakshaDays, shraddhDate } from '@/lib/pandit/remedies';
import { ME, panditName, usePandit } from '@/lib/pandit/store';
import { JobCard } from './WorkBoard';
import { Avatar, PageHead, RequireProfile, Shell, Stat, useDate, styles as s } from './ui';

export default function Dashboard() {
  return (
    <Shell>
      <RequireProfile>
        <Inner />
      </RequireProfile>
    </Shell>
  );
}

function Inner() {
  const { t, lang } = useLang();
  const fmt = useDate();
  const { me, myYajmans, jobs, connections, ledger, notices, panditById, respondConnection, markNoticesRead } = usePandit();

  const season = useMemo(() => pitruPakshaDays(new Date()), []);
  const seasonStart = season[0]?.date;
  const seasonEnd = season.at(-1)?.date;

  // Upcoming shraddh across all yajmans, soonest first.
  const shraddhs = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return myYajmans
      .flatMap((y) =>
        (y.ancestors || [])
          .filter((a) => a.tithi !== '' && a.tithi != null)
          .map((a) => ({ y, a, date: shraddhDate(a.tithi) }))
      )
      .filter((x) => x.date && x.date >= today)
      .sort((a, b) => a.date - b.date)
      .slice(0, 8);
  }, [myYajmans]);

  const requests = connections.filter((c) => c.to === ME && c.status === 'pending');
  const myJobs = jobs.filter((j) => (j.postedBy === ME || j.team.some((m) => m.panditId === ME)) && ['open', 'staffed', 'completed'].includes(j.status)).sort((a, b) => a.date.localeCompare(b.date));
  const openJobs = jobs.filter((j) => j.status === 'open' && j.postedBy !== ME && !j.team.some((m) => m.panditId === ME)).slice(0, 2);
  const earned = ledger.filter((l) => l.panditId === ME).reduce((a, l) => a + l.amount, 0);
  const connCount = connections.filter((c) => c.status === 'accepted').length;
  const unread = notices.filter((n) => !n.read);
  const firstName = (lang === 'hi' && me.nameHi ? me.nameHi : me.name).split(' ').slice(0, 2).join(' ');

  return (
    <>
      <PageHead title={{ en: `Pranam, ${firstName} 🙏`, hi: `प्रणाम, ${firstName} 🙏` }} sub={{ en: 'Here is what needs your attention today.', hi: 'आज आपके ध्यान के लिए ये बातें हैं।' }}>
        <Link href="/pandit-sangh/yajman/new" className="btn btn-ghost btn-sm">
          <Plus size={15} /> {t({ en: 'Add yajman', hi: 'यजमान जोड़ें' })}
        </Link>
        <Link href="/pandit-sangh/kaam" className="btn btn-primary btn-sm">
          <Briefcase size={15} /> {t({ en: 'Post / find work', hi: 'काम दें / खोजें' })}
        </Link>
      </PageHead>

      <div className={s.stats}>
        <Stat icon={Users} value={myYajmans.length} label={t({ en: 'Yajman families', hi: 'यजमान परिवार' })} />
        <Stat icon={Briefcase} value={myJobs.length} label={t({ en: 'Active work', hi: 'चालू काम' })} />
        <Stat icon={Network} value={connCount} label={t({ en: 'Connections', hi: 'कनेक्शन' })} />
        <Stat icon={HandCoins} value={inr(earned)} label={t({ en: 'Network earnings', hi: 'नेटवर्क कमाई' })} />
      </div>

      <div className={s.cols} style={{ marginTop: 24 }}>
        <div className={s.stack}>
          <section className={s.panel}>
            <div className={s.panelHead}>
              <h2>
                <CalendarDays size={18} /> {t({ en: 'Upcoming shraddh of your yajmans', hi: 'आपके यजमानों के आगामी श्राद्ध' })}
              </h2>
            </div>
            {seasonStart && (
              <p className="muted" style={{ fontSize: '0.88rem', marginTop: -6 }}>
                {t({ en: 'Pitru Paksha', hi: 'पितृ पक्ष' })}: {fmt(seasonStart, { day: 'numeric', month: 'long' })} – {fmt(seasonEnd, { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
            {shraddhs.length ? (
              <ul className={s.list}>
                {shraddhs.map(({ y, a, date }) => (
                  <li key={`${y.id}-${a.id}`}>
                    <Link href={`/pandit-sangh/yajman/${y.id}`} className={s.item}>
                      <span className={s.statIcon} style={{ width: 52, height: 52, flexDirection: 'column', lineHeight: 1.1 }}>
                        <strong style={{ fontSize: '1.1rem' }}>{date.getDate()}</strong>
                        <small style={{ fontSize: '0.7rem' }}>{fmt(date, { month: 'short' })}</small>
                      </span>
                      <span className={s.itemBody}>
                        <strong>
                          {t({ en: 'Late', hi: 'स्व.' })} {a.name}
                        </strong>
                        <small>
                          {t(RELATIONS[a.relation] || RELATIONS.other)} {t({ en: 'of', hi: '—' })} {y.name}
                          {y.phone && ` · ${y.phone}`}
                        </small>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted" style={{ margin: 0 }}>
                {t({ en: 'Add ancestors with their tithi to your yajmans to see shraddh dates here.', hi: 'यहाँ श्राद्ध तिथियाँ देखने के लिए यजमानों में पूर्वज और उनकी तिथि जोड़ें।' })}
              </p>
            )}
          </section>

          <section className={s.panel}>
            <div className={s.panelHead}>
              <h2>
                <Briefcase size={18} /> {t({ en: 'My active work', hi: 'मेरे चालू काम' })}
              </h2>
              <Link href="/pandit-sangh/kaam" className={s.linkBtn}>
                {t({ en: 'Work board →', hi: 'कार्य बोर्ड →' })}
              </Link>
            </div>
            {myJobs.length ? (
              <div className={s.stack} style={{ gap: 12 }}>
                {myJobs.map((j) => (
                  <JobCard key={j.id} job={j} />
                ))}
              </div>
            ) : (
              <p className="muted" style={{ margin: 0 }}>
                {t({ en: 'No active work. Post an anushthan or apply to one below.', hi: 'कोई चालू काम नहीं। अनुष्ठान पोस्ट करें या नीचे किसी में आवेदन करें।' })}
              </p>
            )}
          </section>

          {openJobs.length > 0 && (
            <section className={s.panel}>
              <h2>✨ {t({ en: 'New work from the network', hi: 'नेटवर्क से नया काम' })}</h2>
              <div className={s.stack} style={{ gap: 12 }}>
                {openJobs.map((j) => (
                  <JobCard key={j.id} job={j} />
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className={s.stack}>
          {requests.length > 0 && (
            <section className={s.panel}>
              <h3>
                <UserCheck size={18} /> {t({ en: 'Connection requests', hi: 'जुड़ने के अनुरोध' })}
              </h3>
              <ul className={s.list}>
                {requests.map((c) => {
                  const p = panditById(c.from);
                  if (!p) return null;
                  return (
                    <li key={c.id} className={s.item}>
                      <Avatar name={p.name} hue={p.hue} size={38} />
                      <Link href={`/pandit-sangh/pandit/${p.id}`} className={s.itemBody}>
                        <strong style={{ fontSize: '0.92rem' }}>{panditName(p, lang)}</strong>
                        <small>{p.city}</small>
                      </Link>
                      <button className={s.iconBtn} style={{ color: 'var(--green)' }} onClick={() => respondConnection(c.id, true)} aria-label={t({ en: 'Accept', hi: 'स्वीकारें' })}>
                        <UserCheck size={16} />
                      </button>
                      <button className={s.iconBtn} onClick={() => respondConnection(c.id, false)} aria-label={t({ en: 'Ignore', hi: 'अनदेखा करें' })}>
                        <X size={16} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          <section className={s.panel}>
            <div className={s.panelHead}>
              <h3>
                <Bell size={18} /> {t({ en: 'Notifications', hi: 'सूचनाएँ' })}
              </h3>
              {unread.length > 0 && (
                <button className={s.linkBtn} onClick={markNoticesRead}>
                  {t({ en: 'Mark read', hi: 'पढ़ा हुआ' })}
                </button>
              )}
            </div>
            {notices.length ? (
              <ul className={s.list}>
                {notices.slice(0, 6).map((n) => (
                  <li key={n.id} className={s.item} style={n.read ? { opacity: 0.65 } : { borderColor: 'var(--border-strong)' }}>
                    <span className={s.itemBody}>
                      <strong style={{ fontSize: '0.9rem', fontWeight: 600 }}>{t(n.text)}</strong>
                      <small>{fmt(n.at, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</small>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted" style={{ margin: 0, fontSize: '0.9rem' }}>
                {t({ en: 'You are all caught up.', hi: 'कोई नई सूचना नहीं।' })}
              </p>
            )}
          </section>

          <section className={s.panel}>
            <h3>{t({ en: 'Quick actions', hi: 'त्वरित कार्य' })}</h3>
            <div className={s.stack} style={{ gap: 8 }}>
              <Link href="/pandit-sangh/yajman" className="btn btn-ghost btn-block">
                <Upload size={15} /> {t({ en: 'Import yajmans from Excel', hi: 'एक्सेल से यजमान आयात' })}
              </Link>
              <Link href="/pandit-sangh/network" className="btn btn-ghost btn-block">
                <Network size={15} /> {t({ en: 'Grow my network', hi: 'नेटवर्क बढ़ाएँ' })}
              </Link>
              <Link href={`/pandit-sangh/pandit/${ME}`} className="btn btn-ghost btn-block">
                <Avatar name={me.name} hue={me.hue} size={20} /> {t({ en: 'View my public profile', hi: 'मेरी सार्वजनिक प्रोफ़ाइल' })}
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
