'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Check, Copy, Flame, GitBranch, History, MapPin, Pencil, Phone, Plus, ScrollText, Send, Trash2 } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { GOTRAS, RASHIS, RELATIONS, RITUALS, TITHIS, TRADITIONS, VEDAS } from '@/lib/pandit/catalog';
import { inr } from '@/lib/pandit/payments';
import { buildRemedies, remedyMessage, sankalpLine, whatsappLink } from '@/lib/pandit/remedies';
import { usePandit } from '@/lib/pandit/store';
import { Empty, Modal, PageHead, RequireProfile, Shell, useDate, useToast, styles as s } from './ui';

export default function YajmanDetail() {
  return (
    <Shell>
      <RequireProfile>
        <Inner />
      </RequireProfile>
    </Shell>
  );
}

const tithiLabel = (tithi, t) => {
  if (tithi === '' || tithi == null) return '';
  const n = Number(tithi);
  if (n === 0) return t({ en: 'Purnima', hi: 'पूर्णिमा' });
  if (n === 15) return t({ en: 'Amavasya', hi: 'अमावस्या' });
  return t(TITHIS[n - 1]);
};

function Inner() {
  const { id } = useParams();
  const { t } = useLang();
  const fmt = useDate();
  const router = useRouter();
  const { myYajmans, me, deleteYajman, logRemedySent, markTraditionDone, addHistory } = usePandit();
  const y = myYajmans.find((x) => x.id === id);
  const [toast, showToast] = useToast();
  const [logging, setLogging] = useState(false);

  const remedies = useMemo(() => (y ? buildRemedies(y) : []), [y]);
  const [picked, setPicked] = useState(null);
  const chosen = picked ?? remedies.filter((r) => r.priority <= 2).map((r) => r.id);

  if (!y)
    return (
      <Empty icon="🔍" text={t({ en: 'Yajman not found.', hi: 'यजमान नहीं मिला।' })}>
        <Link href="/pandit-sangh/yajman" className="btn btn-primary">
          {t({ en: 'Back to register', hi: 'बही पर वापस' })}
        </Link>
      </Empty>
    );

  const gotra = GOTRAS[y.gotra];
  const gotraText = y.gotra === 'other' ? y.gotraOther : gotra ? t(gotra.label) : '';
  const items = remedies.filter((r) => chosen.includes(r.id));
  const message = remedyMessage({ yajman: y, items, pandit: me, t });
  const today = new Date().toISOString().slice(0, 10);

  const toggle = (rid) => setPicked(chosen.includes(rid) ? chosen.filter((x) => x !== rid) : [...chosen, rid]);

  const send = () => {
    window.open(whatsappLink(y.phone, message), '_blank', 'noopener');
    logRemedySent(y.id, message, 'whatsapp');
    showToast(t({ en: 'Opened WhatsApp · saved to history', hi: 'व्हाट्सऐप खुला · इतिहास में सहेजा' }));
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      logRemedySent(y.id, message, 'copy');
      showToast(t({ en: 'Copied', hi: 'कॉपी हुआ' }));
    } catch {
      showToast(t({ en: 'Could not copy', hi: 'कॉपी नहीं हो सका' }));
    }
  };

  // Vanshavali rows, oldest generation first.
  const anc = y.ancestors || [];
  const fam = y.family || [];
  const pick = (list, rels) => list.filter((m) => rels.includes(m.relation));
  const gens = [
    { label: { en: 'Great-grandparents', hi: 'प्रपितामह' }, people: pick(anc, ['greatGrandfather', 'greatGrandmother']).map((m) => ({ ...m, late: true })) },
    { label: { en: 'Grandparents', hi: 'पितामह' }, people: pick(anc, ['grandfather', 'grandmother']).map((m) => ({ ...m, late: true })) },
    { label: { en: 'Parents', hi: 'माता-पिता' }, people: [...pick(anc, ['father', 'mother']).map((m) => ({ ...m, late: true })), ...pick(fam, ['father', 'mother'])] },
    { label: { en: 'Yajman', hi: 'यजमान' }, people: [{ id: 'self', name: y.name, relation: 'self', self: true }, ...pick(fam, ['wife', 'husband', 'brother']), ...pick(anc, ['wife', 'husband', 'brother']).map((m) => ({ ...m, late: true }))] },
    { label: { en: 'Children', hi: 'संतान' }, people: [...pick(fam, ['son', 'daughter']), ...pick(anc, ['son']).map((m) => ({ ...m, late: true }))] },
  ].filter((g) => g.people.length);

  return (
    <>
      <PageHead back={{ href: '/pandit-sangh/yajman', label: { en: 'All yajmans', hi: 'सभी यजमान' } }} title={y.name} sub={[gotraText && `${gotraText} ${t({ en: 'gotra', hi: 'गोत्र' })}`, y.city].filter(Boolean).join(' · ') || ' '}>
        {y.phone && (
          <a href={`tel:${y.phone}`} className="btn btn-ghost btn-sm">
            <Phone size={15} /> {t({ en: 'Call', hi: 'कॉल' })}
          </a>
        )}
        <button className="btn btn-ghost btn-sm" onClick={() => setLogging(true)}>
          <Plus size={15} /> {t({ en: 'Log a ritual', hi: 'अनुष्ठान दर्ज करें' })}
        </button>
        <Link href={`/pandit-sangh/yajman/${y.id}/edit`} className="btn btn-primary btn-sm">
          <Pencil size={15} /> {t({ en: 'Edit', hi: 'संपादित करें' })}
        </Link>
      </PageHead>

      <div className={s.cols}>
        <div className={s.stack}>
          <section className={s.panel}>
            <h2>
              <GitBranch size={18} /> {t({ en: 'Gotra & kul details', hi: 'गोत्र एवं कुल विवरण' })}
            </h2>
            <dl className={s.kv}>
              <dt>{t({ en: 'Gotra', hi: 'गोत्र' })}</dt>
              <dd>{gotraText || '—'}</dd>
              <dt>{t({ en: 'Pravar', hi: 'प्रवर' })}</dt>
              <dd>
                {y.pravar || gotra?.pravar?.join(', ') || '—'}
                {!y.pravar && gotra?.pravar?.length > 0 && <small className="muted"> ({t({ en: 'common', hi: 'सामान्य' })})</small>}
              </dd>
              <dt>{t({ en: 'Ved / Shakha', hi: 'वेद / शाखा' })}</dt>
              <dd>{[y.ved && t(VEDAS[y.ved]), y.shakha].filter(Boolean).join(' · ') || '—'}</dd>
              <dt>{t({ en: 'Kuldevi / Kuldevta', hi: 'कुलदेवी / कुलदेवता' })}</dt>
              <dd>{y.kuldevi || '—'}</dd>
              <dt>{t({ en: 'Native place', hi: 'मूल स्थान' })}</dt>
              <dd>{y.nativePlace || '—'}</dd>
              <dt>{t({ en: 'Kul purohit', hi: 'कुल पुरोहित' })}</dt>
              <dd>{y.kulPurohit || '—'}</dd>
              <dt>{t({ en: 'Birth', hi: 'जन्म' })}</dt>
              <dd>{[y.dob && fmt(y.dob), y.birthTime, y.birthPlace].filter(Boolean).join(' · ') || '—'}</dd>
              <dt>{t({ en: 'Rashi', hi: 'राशि' })}</dt>
              <dd>{y.rashi !== '' && y.rashi != null ? t(RASHIS[Number(y.rashi)]) : '—'}</dd>
              {y.address && (
                <>
                  <dt>{t({ en: 'Address', hi: 'पता' })}</dt>
                  <dd>
                    <MapPin size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> {y.address}
                  </dd>
                </>
              )}
            </dl>
            <p className="muted" style={{ fontSize: '0.82rem', margin: '16px 0 6px', fontWeight: 700 }}>
              {t({ en: 'Sankalp', hi: 'संकल्प' })}
            </p>
            <div className={s.sankalp}>{sankalpLine(y)}</div>
            {y.notes && (
              <p className="muted" style={{ margin: '14px 0 0', fontSize: '0.92rem' }}>
                📝 {y.notes}
              </p>
            )}
          </section>

          <section className={s.panel}>
            <h2>🌳 {t({ en: 'Vanshavali (family tree)', hi: 'वंशावली' })}</h2>
            <div className={s.vansh}>
              {gens.map((g) => (
                <div key={g.label.en}>
                  <div className={s.genLabel}>{t(g.label)}</div>
                  <div className={s.gen} style={{ marginTop: 6 }}>
                    {g.people.map((m) => (
                      <div key={m.id} className={`${s.person} ${m.late ? s.personLate : ''} ${m.self ? s.personSelf : ''}`}>
                        <strong>
                          {m.late ? `${t({ en: 'Late', hi: 'स्व.' })} ` : ''}
                          {m.name}
                        </strong>
                        <small>
                          {t(RELATIONS[m.relation] || RELATIONS.other)}
                          {m.late && m.tithi !== '' && m.tithi != null ? ` · ${tithiLabel(m.tithi, t)}` : ''}
                        </small>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {anc.length === 0 && (
              <p className="muted" style={{ margin: '12px 0 0', fontSize: '0.9rem', textAlign: 'center' }}>
                {t({ en: 'Add ancestors and their tithis to get shraddh reminders.', hi: 'श्राद्ध स्मरण के लिए पूर्वज और उनकी तिथियाँ जोड़ें।' })}{' '}
                <Link href={`/pandit-sangh/yajman/${y.id}/edit`} className={s.linkBtn}>
                  {t({ en: 'Add now', hi: 'अभी जोड़ें' })}
                </Link>
              </p>
            )}
          </section>

          <section className={s.panel}>
            <h2>
              <Flame size={18} /> {t({ en: 'Kul parampara — traditions of the ancestors', hi: 'कुल परंपरा — पूर्वजों की परंपराएँ' })}
            </h2>
            {(y.traditions || []).length ? (
              <ul className={s.list}>
                {y.traditions.map((tr) => {
                  const def = TRADITIONS[tr.key];
                  if (!def) return null;
                  const months = tr.lastDone ? (Date.now() - new Date(tr.lastDone)) / (86400000 * 30.44) : null;
                  const overdue = def.every > 0 && (months == null || months > def.every);
                  return (
                    <li key={tr.key} className={s.item} style={{ alignItems: 'flex-start' }}>
                      <div className={s.itemBody}>
                        <strong>{t(def.label)}</strong>
                        <small>
                          {tr.lastDone ? `${t({ en: 'Last done', hi: 'अंतिम बार' })}: ${fmt(tr.lastDone)}` : t({ en: 'Not recorded yet', hi: 'अभी दर्ज नहीं' })}
                          {tr.note && ` · ${tr.note}`}
                        </small>
                      </div>
                      {overdue && <span className={`${s.chip} ${s.chipRed}`}>{t({ en: 'Due', hi: 'देय' })}</span>}
                      <button className="btn btn-ghost btn-sm" onClick={() => markTraditionDone(y.id, tr.key, today)} title={t({ en: 'Mark as done today', hi: 'आज संपन्न चिह्नित करें' })}>
                        <Check size={14} /> {t({ en: 'Done', hi: 'संपन्न' })}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="muted" style={{ margin: 0 }}>
                {t({ en: 'No family traditions recorded. Ask the elders what the family has always done.', hi: 'कोई कुल परंपरा दर्ज नहीं। परिवार के बड़ों से पूछें कि परिवार में क्या होता आया है।' })}
              </p>
            )}
          </section>

          <section className={s.panel}>
            <div className={s.panelHead}>
              <h2>
                <History size={18} /> {t({ en: 'Rituals done', hi: 'संपन्न अनुष्ठान' })}
              </h2>
              <button className={s.linkBtn} onClick={() => setLogging(true)}>
                <Plus size={14} /> {t({ en: 'Add', hi: 'जोड़ें' })}
              </button>
            </div>
            {(y.history || []).length ? (
              <ul className={s.list}>
                {y.history.map((h) => (
                  <li key={h.id} className={s.item}>
                    <div className={s.itemBody}>
                      <strong>{t(RITUALS[h.ritual]?.label) || h.ritual}</strong>
                      <small>
                        {fmt(h.date)}
                        {h.note && ` · ${h.note}`}
                      </small>
                    </div>
                    {h.amount > 0 && <span className={s.amount} style={{ fontSize: '0.98rem' }}>{inr(h.amount)}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="muted" style={{ margin: 0 }}>
                {t({ en: 'Nothing logged yet.', hi: 'अभी कुछ दर्ज नहीं।' })}
              </p>
            )}
          </section>

          {(y.remediesSent || []).length > 0 && (
            <section className={s.panel}>
              <h2>
                <Send size={18} /> {t({ en: 'Guidance sent', hi: 'भेजा गया मार्गदर्शन' })}
              </h2>
              <ul className={s.list}>
                {y.remediesSent.slice(0, 10).map((r) => (
                  <li key={r.id}>
                    <details className={s.item} style={{ display: 'block' }}>
                      <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
                        {fmt(r.at, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })} · {r.via === 'whatsapp' ? 'WhatsApp' : t({ en: 'Copied', hi: 'कॉपी' })}
                      </summary>
                      <div className={s.preview} style={{ marginTop: 10 }}>
                        {r.text}
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <button
            className={`${s.linkBtn} ${s.danger}`}
            style={{ justifySelf: 'start' }}
            onClick={() => {
              if (window.confirm(t({ en: `Delete ${y.name} from your register?`, hi: `${y.name} को बही से हटाएँ?` }))) {
                deleteYajman(y.id);
                router.push('/pandit-sangh/yajman');
              }
            }}
          >
            <Trash2 size={14} /> {t({ en: 'Delete this yajman', hi: 'यह यजमान हटाएँ' })}
          </button>
        </div>

        <aside className={s.stack} style={{ position: 'sticky', top: 'calc(var(--header-h) + 70px)' }}>
          <section className={s.panel}>
            <h2>
              <ScrollText size={18} /> {t({ en: 'Remedies & reminders', hi: 'उपाय एवं स्मरण' })}
            </h2>
            <p className="muted" style={{ fontSize: '0.86rem', marginTop: -6 }}>
              {t({ en: 'Built from this family’s ancestors and traditions. Tick what to send.', hi: 'इस परिवार के पूर्वजों और परंपराओं के आधार पर। जो भेजना हो उस पर टिक करें।' })}
            </p>
            {remedies.length ? (
              <div className={s.stack} style={{ gap: 10 }}>
                {remedies.map((r) => (
                  <label key={r.id} className={s.remedy} data-priority={r.priority}>
                    <input type="checkbox" checked={chosen.includes(r.id)} onChange={() => toggle(r.id)} />
                    <span>
                      <strong>{t(r.title)}</strong>
                      {r.due && (
                        <span className={`${s.chip} ${s.chipOn}`} style={{ marginTop: 4 }}>
                          📅 {fmt(r.due, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                      {r.overdue && (
                        <span className={`${s.chip} ${s.chipRed}`} style={{ marginTop: 4 }}>
                          {t({ en: 'Overdue', hi: 'समय निकल गया' })}
                        </span>
                      )}
                      <p>{t(r.text)}</p>
                    </span>
                  </label>
                ))}
              </div>
            ) : (
              <p className="muted">{t({ en: 'Add ancestors or traditions to see suggestions.', hi: 'सुझाव देखने के लिए पूर्वज या परंपराएँ जोड़ें।' })}</p>
            )}
            {items.length > 0 && (
              <>
                <p className="muted" style={{ fontSize: '0.82rem', margin: '16px 0 6px', fontWeight: 700 }}>
                  {t({ en: 'Message preview', hi: 'संदेश पूर्वावलोकन' })}
                </p>
                <div className={s.preview}>{message}</div>
                <div className={s.actions} style={{ marginTop: 12 }}>
                  <button className="btn btn-primary btn-sm" onClick={send} disabled={!y.phone} title={y.phone ? '' : t({ en: 'Add a phone number first', hi: 'पहले फ़ोन नंबर जोड़ें' })}>
                    <Send size={15} /> {t({ en: 'Send on WhatsApp', hi: 'व्हाट्सऐप पर भेजें' })}
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={copy}>
                    <Copy size={15} /> {t({ en: 'Copy', hi: 'कॉपी' })}
                  </button>
                </div>
                <p className="muted" style={{ fontSize: '0.78rem', margin: '10px 0 0' }}>
                  {t({ en: 'Shraddh dates are for New Delhi; a day can differ by place.', hi: 'श्राद्ध तिथियाँ नई दिल्ली के अनुसार हैं; स्थान के अनुसार एक दिन का अंतर हो सकता है।' })}
                </p>
              </>
            )}
          </section>
        </aside>
      </div>

      {logging && <LogRitual onClose={() => setLogging(false)} onSave={(entry) => (addHistory(y.id, entry), setLogging(false), showToast(t({ en: 'Ritual logged', hi: 'अनुष्ठान दर्ज हुआ' })))} />}
      {toast}
    </>
  );
}

function LogRitual({ onClose, onSave }) {
  const { t } = useLang();
  const [f, setF] = useState({ date: new Date().toISOString().slice(0, 10), ritual: 'satyanarayan', amount: '', note: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <Modal title={{ en: 'Log a ritual', hi: 'अनुष्ठान दर्ज करें' }} onClose={onClose}>
      <form
        className={s.form}
        onSubmit={(e) => {
          e.preventDefault();
          onSave({ ...f, amount: Number(f.amount) || 0 });
        }}
      >
        <div className={s.fields}>
          <div className="field">
            <label htmlFor="lr-date">{t({ en: 'Date', hi: 'तारीख' })}</label>
            <input id="lr-date" className="input" type="date" value={f.date} onChange={set('date')} required />
          </div>
          <div className="field">
            <label htmlFor="lr-ritual">{t({ en: 'Ritual', hi: 'अनुष्ठान' })}</label>
            <select id="lr-ritual" className="input" value={f.ritual} onChange={set('ritual')}>
              {Object.entries(RITUALS).map(([k, r]) => (
                <option key={k} value={k}>
                  {t(r.label)}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="lr-amt">{t({ en: 'Dakshina received (₹)', hi: 'प्राप्त दक्षिणा (₹)' })}</label>
            <input id="lr-amt" className="input" type="number" min="0" value={f.amount} onChange={set('amount')} />
          </div>
          <div className="field">
            <label htmlFor="lr-note">{t({ en: 'Note', hi: 'टिप्पणी' })}</label>
            <input id="lr-note" className="input" value={f.note} onChange={set('note')} />
          </div>
        </div>
        <div className={s.actions} style={{ justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            {t({ en: 'Cancel', hi: 'रद्द करें' })}
          </button>
          <button type="submit" className="btn btn-primary">
            {t({ en: 'Save', hi: 'सहेजें' })}
          </button>
        </div>
      </form>
    </Modal>
  );
}
