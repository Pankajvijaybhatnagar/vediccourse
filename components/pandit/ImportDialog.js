'use client';

import { useRef, useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { GOTRAS } from '@/lib/pandit/catalog';
import { downloadText, parseCsv, rowsToYajmans, templateCsv } from '@/lib/pandit/csv';
import { usePandit } from '@/lib/pandit/store';
import { Modal, styles as s } from './ui';

export default function ImportDialog({ onClose, onDone }) {
  const { t } = useLang();
  const { importYajmans } = usePandit();
  const input = useRef(null);
  const [drag, setDrag] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const read = (file) => {
    setError('');
    if (!file) return;
    if (!/\.(csv|txt)$/i.test(file.name)) {
      setError(t({ en: 'Please choose a .csv file. In Excel use File → Save As → CSV UTF-8.', hi: 'कृपया .csv फ़ाइल चुनें। एक्सेल में File → Save As → CSV UTF-8 चुनें।' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const parsed = rowsToYajmans(parseCsv(String(reader.result)));
      if (!parsed.yajmans.length) setError(t({ en: 'No rows with a name were found. Check that the first row has column headings.', hi: 'नाम वाली कोई पंक्ति नहीं मिली। देखें कि पहली पंक्ति में कॉलम शीर्षक हों।' }));
      setResult(parsed);
    };
    reader.readAsText(file, 'utf-8');
  };

  const confirm = () => {
    importYajmans(result.yajmans);
    onDone?.(result.yajmans.length);
    onClose();
  };

  return (
    <Modal title={{ en: 'Import yajmans from Excel / CSV', hi: 'एक्सेल / CSV से यजमान आयात करें' }} onClose={onClose} wide>
      {!result?.yajmans?.length ? (
        <>
          <ol className="muted" style={{ paddingLeft: 20, marginTop: 0, fontSize: '0.92rem' }}>
            <li>{t({ en: 'Download the template and fill one family per row (or use your own sheet with similar headings).', hi: 'टेम्पलेट डाउनलोड करें और हर पंक्ति में एक परिवार भरें (या मिलते-जुलते शीर्षकों वाली अपनी शीट उपयोग करें)।' })}</li>
            <li>{t({ en: 'For ancestors write “Name - tithi number”, e.g. “Shivprasad Sharma - 7” (15 = Amavasya, 0 = Purnima).', hi: 'पूर्वज के लिए “नाम - तिथि संख्या” लिखें, जैसे “शिवप्रसाद शर्मा - 7” (15 = अमावस्या, 0 = पूर्णिमा)।' })}</li>
            <li>{t({ en: 'Save as CSV (UTF-8) and upload below. Duplicate name + phone are skipped.', hi: 'CSV (UTF-8) में सहेजें और नीचे अपलोड करें। एक जैसे नाम + फ़ोन वाले छोड़ दिए जाएँगे।' })}</li>
          </ol>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => downloadText('yajman-template.csv', templateCsv())} style={{ marginBottom: 16 }}>
            <Download size={15} /> {t({ en: 'Download template', hi: 'टेम्पलेट डाउनलोड करें' })}
          </button>
          <div
            className={`${s.drop} ${drag ? s.dropActive : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => input.current?.click()}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && input.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              read(e.dataTransfer.files?.[0]);
            }}
          >
            <FileSpreadsheet size={36} style={{ margin: '0 auto', color: 'var(--saffron-deep)' }} />
            <strong>{t({ en: 'Drop your CSV file here or click to choose', hi: 'CSV फ़ाइल यहाँ छोड़ें या चुनने के लिए क्लिक करें' })}</strong>
            <p>{t({ en: 'Hindi and English both work.', hi: 'हिंदी और अंग्रेज़ी दोनों चलेंगे।' })}</p>
            <input ref={input} type="file" accept=".csv,text/csv" hidden onChange={(e) => read(e.target.files?.[0])} />
          </div>
          {error && (
            <p className="error-text" style={{ marginTop: 12 }}>
              {error}
            </p>
          )}
        </>
      ) : (
        <>
          <p style={{ marginTop: 0 }}>
            <strong>{t({ en: `${result.yajmans.length} yajmans ready to import`, hi: `${result.yajmans.length} यजमान आयात के लिए तैयार` })}</strong>
            {result.skipped > 0 && <span className="muted"> · {t({ en: `${result.skipped} rows without a name skipped`, hi: `बिना नाम की ${result.skipped} पंक्तियाँ छोड़ी गईं` })}</span>}
          </p>
          <div className={s.tableWrap} style={{ maxHeight: 340, overflow: 'auto' }}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>{t({ en: 'Name', hi: 'नाम' })}</th>
                  <th>{t({ en: 'Phone', hi: 'फ़ोन' })}</th>
                  <th>{t({ en: 'City', hi: 'शहर' })}</th>
                  <th>{t({ en: 'Gotra', hi: 'गोत्र' })}</th>
                  <th>{t({ en: 'Ancestors', hi: 'पूर्वज' })}</th>
                  <th>{t({ en: 'Traditions', hi: 'परंपराएँ' })}</th>
                </tr>
              </thead>
              <tbody>
                {result.yajmans.slice(0, 100).map((y, i) => (
                  <tr key={i}>
                    <td>{y.name}</td>
                    <td>{y.phone}</td>
                    <td>{y.city}</td>
                    <td>{y.gotra === 'other' ? y.gotraOther : y.gotra ? t(GOTRAS[y.gotra].label) : '—'}</td>
                    <td>{y.ancestors.length}</td>
                    <td>{y.traditions.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.actions} style={{ justifyContent: 'flex-end', marginTop: 16 }}>
            <button type="button" className="btn btn-ghost" onClick={() => setResult(null)}>
              {t({ en: 'Choose another file', hi: 'दूसरी फ़ाइल चुनें' })}
            </button>
            <button type="button" className="btn btn-primary" onClick={confirm}>
              {t({ en: 'Import all', hi: 'सभी आयात करें' })}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
