'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import { PLACE_STATES } from '@/lib/placesIndex';
import { useLang } from '@/lib/i18n';
import styles from './BirthPlacePicker.module.css';

const MAX_RESULTS = 60;
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '');
const coord = (lat, lon) => `${lat.toFixed(2)}°N, ${lon.toFixed(2)}°E`;

// Each district's villages/towns are fetched on demand and cached for the session.
const cache = new Map();
function loadDistrict(stateId, districtId) {
  const key = `${stateId}/${districtId}`;
  if (!cache.has(key)) {
    cache.set(
      key,
      fetch(`/places/${key}.json`)
        .then((r) => {
          if (!r.ok) throw new Error(r.status);
          return r.json();
        })
        .then((rows) => {
          const seen = new Map();
          rows.forEach(([name]) => seen.set(name, (seen.get(name) || 0) + 1));
          return rows.map(([name, lat, lon]) => ({ name, lat, lon, key: norm(name), dup: seen.get(name) > 1 }));
        })
        .catch((err) => {
          cache.delete(key);
          throw err;
        })
    );
  }
  return cache.get(key);
}

/**
 * Janam Sthan picker for India: State → District → Village / Town.
 * Calls onChange with { lat, lon, tz, name: {en, hi} } or null while incomplete.
 * If no village is chosen, the district's centre is used.
 */
export default function BirthPlacePicker({ onChange, error, idPrefix = 'bp' }) {
  const { t } = useLang();
  const [stateId, setStateId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [places, setPlaces] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  const [query, setQuery] = useState('');
  const [village, setVillage] = useState(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  const boxRef = useRef(null);

  const state = PLACE_STATES.find((s) => s.id === stateId);
  const district = state?.districts.find((d) => d.id === districtId);
  const label = (o) => t({ en: o.en, hi: o.hi || o.en });

  useEffect(() => {
    if (!state || !district) return;
    let alive = true;
    setStatus('loading');
    setPlaces(null);
    loadDistrict(state.id, district.id)
      .then((rows) => alive && (setPlaces(rows), setStatus('ready')))
      .catch(() => alive && setStatus('error'));
    return () => {
      alive = false;
    };
  }, [state, district]);

  // Report the chosen place upward.
  useEffect(() => {
    if (!state || !district) return onChange(null);
    const tail = { en: `${district.en}, ${state.en}`, hi: `${district.hi || district.en}, ${state.hi}` };
    if (village) {
      onChange({ lat: village.lat, lon: village.lon, tz: 5.5, name: { en: `${village.name}, ${tail.en}`, hi: `${village.name}, ${tail.hi}` } });
    } else {
      onChange({ lat: district.lat, lon: district.lon, tz: 5.5, name: tail });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, district, village]);

  const results = useMemo(() => {
    if (!places) return [];
    const q = norm(query);
    if (!q) return places.slice(0, MAX_RESULTS);
    const starts = [];
    const contains = [];
    for (const p of places) {
      if (p.key.startsWith(q)) starts.push(p);
      else if (p.key.includes(q)) contains.push(p);
      if (starts.length >= MAX_RESULTS) break;
    }
    return starts.concat(contains).slice(0, MAX_RESULTS);
  }, [places, query]);

  useEffect(() => setActive(0), [query, places]);

  useEffect(() => {
    if (!open) return;
    const close = (e) => !boxRef.current?.contains(e.target) && setOpen(false);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const pickState = (e) => {
    setStateId(e.target.value);
    setDistrictId('');
    setVillage(null);
    setQuery('');
  };
  const pickDistrict = (e) => {
    setDistrictId(e.target.value);
    setVillage(null);
    setQuery('');
  };
  const choose = (p) => {
    setVillage(p);
    setQuery(p.name);
    setOpen(false);
  };
  const clearVillage = () => {
    setVillage(null);
    setQuery('');
    setOpen(true);
  };

  const onKey = (e) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter' && open) {
      e.preventDefault();
      choose(results[active]);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <>
      <div className="field">
        <label htmlFor={`${idPrefix}-state`}>{t({ en: 'State / UT', hi: 'राज्य / केंद्र शासित प्रदेश' })}</label>
        <select id={`${idPrefix}-state`} className={`input ${error && !stateId ? 'invalid' : ''}`} value={stateId} onChange={pickState}>
          <option value="">{t({ en: '— Select state —', hi: '— राज्य चुनें —' })}</option>
          {PLACE_STATES.map((s) => (
            <option key={s.id} value={s.id}>
              {label(s)}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor={`${idPrefix}-district`}>{t({ en: 'District', hi: 'ज़िला' })}</label>
        <select id={`${idPrefix}-district`} className={`input ${error && stateId && !districtId ? 'invalid' : ''}`} value={districtId} onChange={pickDistrict} disabled={!state}>
          <option value="">{t({ en: '— Select district —', hi: '— ज़िला चुनें —' })}</option>
          {state?.districts.map((d) => (
            <option key={d.id} value={d.id}>
              {label(d)}
            </option>
          ))}
        </select>
      </div>
      {error && (!stateId || !districtId) && <span className={`error-text ${styles.full}`}>{t(error)}</span>}

      <div className={`field ${styles.full}`} ref={boxRef}>
        <label htmlFor={`${idPrefix}-village`}>
          {t({ en: 'Village / Town / City', hi: 'गाँव / कस्बा / शहर' })} <span className={styles.optional}>{t({ en: '(optional)', hi: '(वैकल्पिक)' })}</span>
        </label>
        <div className={styles.combo}>
          <Search size={17} className={styles.searchIcon} aria-hidden="true" />
          <input
            id={`${idPrefix}-village`}
            className="input"
            role="combobox"
            aria-expanded={open && results.length > 0}
            aria-controls={`${idPrefix}-village-list`}
            aria-autocomplete="list"
            aria-activedescendant={open && results[active] ? `${idPrefix}-opt-${active}` : undefined}
            autoComplete="off"
            disabled={!district}
            placeholder={
              !district
                ? t({ en: 'Select state and district first', hi: 'पहले राज्य और ज़िला चुनें' })
                : status === 'loading'
                  ? t({ en: 'Loading villages…', hi: 'गाँव लोड हो रहे हैं…' })
                  : t({ en: `Search ${district.n.toLocaleString('en-IN')} villages & towns…`, hi: `${district.n.toLocaleString('en-IN')} गाँव व कस्बों में खोजें…` })
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVillage(null);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKey}
          />
          {query && district && (
            <button type="button" className={styles.clear} onClick={clearVillage} aria-label={t({ en: 'Clear village', hi: 'गाँव हटाएँ' })}>
              <X size={16} />
            </button>
          )}
          {open && status === 'ready' && district && (
            <ul id={`${idPrefix}-village-list`} role="listbox" className={styles.list} ref={listRef}>
              {results.length ? (
                results.map((p, i) => (
                  <li
                    key={`${p.name}-${p.lat}-${p.lon}`}
                    id={`${idPrefix}-opt-${i}`}
                    role="option"
                    aria-selected={i === active}
                    className={styles.option}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      choose(p);
                    }}
                    onMouseEnter={() => setActive(i)}
                  >
                    <MapPin size={14} aria-hidden="true" />
                    <span>{p.name}</span>
                    {p.dup && <small>{coord(p.lat, p.lon)}</small>}
                  </li>
                ))
              ) : (
                <li className={styles.empty}>
                  {t({ en: 'No match in this district. Leave it empty to use the district centre.', hi: 'इस ज़िले में नहीं मिला। खाली छोड़ें, ज़िले का केंद्र उपयोग होगा।' })}
                </li>
              )}
            </ul>
          )}
        </div>
        {status === 'error' && (
          <span className="error-text">{t({ en: 'Could not load villages. Check your connection; the district centre will be used.', hi: 'गाँव लोड नहीं हो सके। कनेक्शन जाँचें; ज़िले का केंद्र उपयोग होगा।' })}</span>
        )}
        {district && (
          <span className={styles.chosen}>
            <MapPin size={13} aria-hidden="true" />{' '}
            {village
              ? `${village.name}, ${label(district)} · ${coord(village.lat, village.lon)}`
              : t({
                  en: `No village chosen: using ${district.en} district centre (${coord(district.lat, district.lon)})`,
                  hi: `गाँव नहीं चुना: ${district.hi || district.en} ज़िले का केंद्र (${coord(district.lat, district.lon)})`,
                })}
          </span>
        )}
        <span className={styles.credit}>
          {t({ en: 'Place data: ', hi: 'स्थान डेटा: ' })}
          <a href="https://www.geonames.org/" target="_blank" rel="noopener noreferrer">GeoNames</a> (CC BY 4.0)
        </span>
      </div>
    </>
  );
}
