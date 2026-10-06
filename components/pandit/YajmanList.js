'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Download, Phone, Plus, Search, Upload } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { GOTRAS } from '@/lib/pandit/catalog';
import { downloadText, yajmansToCsv } from '@/lib/pandit/csv';
import { buildRemedies } from '@/lib/pandit/remedies';
import { usePandit } from '@/lib/pandit/store';
import ImportDialog from './ImportDialog';
import { Empty, PageHead, RequireProfile, Shell, useDate, useToast, styles as s } from './ui';

export default function YajmanList() {
  return (
    <Shell>
      <RequireProfile>
        <Inner />
      </RequireProfile>
    </Shell>
  );
}

const gotraName = (y, t) => (y.gotra === 'other' ? y.gotraOther : y.gotra ? t(GOTRAS[y.gotra]?.label) : '');

function Inner() {
  const { t } = useLang();
  const fmt = useDate();
  const { myYajmans } = usePandit();
  const [q, setQ] = useState('');
  const [gotra, setGotra] = useState('');
  const [city, setCity] = useState('');
  const [sort, setSort] = useState('name');
  const [importing, setImporting] = useState(false);
  const [toast, showToast] = useToast();

  const cities = useMemo(() => [...new Set(myYajmans.map((y) => y.city).filter(Boolean))].sort(), [myYajmans]);
  const gotrasUsed = useMemo(() => {
    const m = new Map();
    myYajmans.forEach((y) => {
      const name = gotraName(y, t);
      if (name) m.set(name, (m.get(name) || 0) + 1);
    });
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [myYajmans, t]);

  // Count of urgent (priority 1) suggestions per yajman.
  const urgent = useMemo(() => {
    const now = new Date();
    return Object.fromEntries(myYajmans.map((y) => [y.id, buildRemedies(y, now).filter((r) => r.priority === 1).length]));
  }, [myYajmans]);

  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    const rows = myYajmans.filter(
      (y) =>
        (!gotra || gotraName(y, t) === gotra) &&
        (!city || y.city === city) &&
        (!n ||
          [y.name, y.phone, y.city, y.kuldevi, y.nativePlace, gotraName(y, t), ...(y.family || []).map((m) => m.name), ...(y.ancestors || []).map((a) => a.name)]
            .join(' ')
            .toLowerCase()
            .includes(n))
    );
    const by = {
      name: (a, b) => a.name.localeCompare(b.name),
      recent: (a, b) => (b.updatedAt || b.createdAt || '').localeCompare(a.updatedAt || a.createdAt || ''),
      urgent: (a, b) => urgent[b.id] - urgent[a.id],
    };
    return rows.sort(by[sort]);
  }, [myYajmans, q, gotra, city, sort, urgent, t]);

  return (
    <>
      <PageHead
        title={{ en: 'Yajman register', hi: 'यजमान बही' }}
        sub={{ en: `${myYajmans.length} families · private to you`, hi: `${myYajmans.length} परिवार · केवल आपके लिए` }}
      >
        <button className="btn btn-ghost btn-sm" onClick={() => setImporting(true)}>
          <Upload size={15} /> {t({ en: 'Import Excel/CSV', hi: 'एक्सेल/CSV आयात' })}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => downloadText(`yajman-bahi-${new Date().toISOString().slice(0, 10)}.csv`, yajmansToCsv(myYajmans))} disabled={!myYajmans.length}>
          <Download size={15} /> {t({ en: 'Export', hi: 'निर्यात' })}
        </button>
        <Link href="/pandit-sangh/yajman/new" className="btn btn-primary btn-sm">
          <Plus size={15} /> {t({ en: 'Add yajman', hi: 'यजमान जोड़ें' })}
        </Link>
      </PageHead>

      {myYajmans.length === 0 ? (
        <Empty icon="📒" text={t({ en: 'Your bahi is empty. Add your first family or import your existing list from Excel.', hi: 'आपकी बही खाली है। पहला परिवार जोड़ें या एक्सेल से अपनी मौजूदा सूची आयात करें।' })}>
          <div className={s.actions} style={{ justifyContent: 'center' }}>
            <Link href="/pandit-sangh/yajman/new" className="btn btn-primary">
              <Plus size={16} /> {t({ en: 'Add yajman', hi: 'यजमान जोड़ें' })}
            </Link>
            <button className="btn btn-ghost" onClick={() => setImporting(true)}>
              <Upload size={16} /> {t({ en: 'Import from Excel', hi: 'एक्सेल से आयात' })}
            </button>
          </div>
        </Empty>
      ) : (
        <>
          <div className={s.toolbar}>
            <div className={s.search}>
              <Search size={18} />
              <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t({ en: 'Search name, phone, kuldevi, ancestor…', hi: 'नाम, फ़ोन, कुलदेवी, पूर्वज खोजें…' })} aria-label={t({ en: 'Search yajmans', hi: 'यजमान खोजें' })} />
            </div>
            <select className="input" value={gotra} onChange={(e) => setGotra(e.target.value)} aria-label={t({ en: 'Gotra', hi: 'गोत्र' })}>
              <option value="">{t({ en: 'All gotras', hi: 'सभी गोत्र' })}</option>
              {gotrasUsed.map(([g, n]) => (
                <option key={g} value={g}>
                  {g} ({n})
                </option>
              ))}
            </select>
            <select className="input" value={city} onChange={(e) => setCity(e.target.value)} aria-label={t({ en: 'City', hi: 'शहर' })}>
              <option value="">{t({ en: 'All cities', hi: 'सभी शहर' })}</option>
              {cities.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select className="input" value={sort} onChange={(e) => setSort(e.target.value)} aria-label={t({ en: 'Sort', hi: 'क्रम' })}>
              <option value="name">{t({ en: 'Sort: Name', hi: 'क्रम: नाम' })}</option>
              <option value="recent">{t({ en: 'Sort: Recently updated', hi: 'क्रम: हाल में बदले' })}</option>
              <option value="urgent">{t({ en: 'Sort: Needs attention', hi: 'क्रम: ध्यान आवश्यक' })}</option>
            </select>
          </div>

          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>{t({ en: 'Yajman', hi: 'यजमान' })}</th>
                  <th>{t({ en: 'Gotra', hi: 'गोत्र' })}</th>
                  <th>{t({ en: 'Kuldevi', hi: 'कुलदेवी' })}</th>
                  <th>{t({ en: 'City', hi: 'शहर' })}</th>
                  <th>{t({ en: 'Family', hi: 'परिवार' })}</th>
                  <th>{t({ en: 'Last ritual', hi: 'अंतिम अनुष्ठान' })}</th>
                  <th>{t({ en: 'Attention', hi: 'ध्यान' })}</th>
                </tr>
              </thead>
              <tbody>
                {list.map((y) => (
                  <tr key={y.id}>
                    <td>
                      <Link href={`/pandit-sangh/yajman/${y.id}`}>{y.name}</Link>
                      {y.phone && (
                        <small className="muted" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Phone size={12} /> {y.phone}
                        </small>
                      )}
                    </td>
                    <td>{gotraName(y, t) || '—'}</td>
                    <td>{y.kuldevi || '—'}</td>
                    <td>{y.city || '—'}</td>
                    <td>
                      {(y.family || []).length + 1} · <span className="muted">{(y.ancestors || []).length} {t({ en: 'pitru', hi: 'पितृ' })}</span>
                    </td>
                    <td>{y.history?.[0] ? fmt(y.history[0].date) : '—'}</td>
                    <td>{urgent[y.id] > 0 ? <span className={`${s.chip} ${s.chipRed}`}>{urgent[y.id]} {t({ en: 'due', hi: 'देय' })}</span> : <span className={`${s.chip} ${s.chipGreen}`}>✓</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!list.length && (
              <p className="muted" style={{ padding: 20, margin: 0, textAlign: 'center' }}>
                {t({ en: 'No yajman matches your search.', hi: 'आपकी खोज से कोई यजमान नहीं मिला।' })}
              </p>
            )}
          </div>
        </>
      )}

      {importing && <ImportDialog onClose={() => setImporting(false)} onDone={(n) => showToast(t({ en: `${n} yajmans imported`, hi: `${n} यजमान आयात हुए` }))} />}
      {toast}
    </>
  );
}
