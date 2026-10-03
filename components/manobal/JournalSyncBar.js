'use client';

import { useLang } from '@/lib/i18n';
import styles from './tools.module.css';

/** Where the journal is saved, plus sign-in / one-time import prompts. Takes the object returned by useJournal(). */
export default function JournalSyncBar({ journal }) {
  const { t } = useLang();
  const { synced, ready, error, importCount, importing, importLocal, dismissImport, openSignIn } = journal;
  if (!ready) return null;

  return (
    <>
      <div className={styles.syncBar}>
        {synced ? (
          <span>☁️ {t({ en: 'Saved privately to your account — only you can see it.', hi: 'आपके खाते में निजी रूप से सहेजा जाता है — इसे केवल आप देख सकते हैं।' })}</span>
        ) : (
          <>
            <span>🔒 {t({ en: 'Saved privately on this device only.', hi: 'केवल इसी उपकरण पर निजी रूप से सहेजा जाता है।' })}</span>
            <button type="button" onClick={() => openSignIn()}>
              {t({ en: 'Sign in to keep it on all your devices', hi: 'साइन इन करें — सभी उपकरणों पर सुरक्षित रखें' })}
            </button>
          </>
        )}
      </div>

      {synced && importCount > 0 && (
        <div className={styles.syncBar} role="status">
          <span>
            {t({
              en: `You have ${importCount} entr${importCount === 1 ? 'y' : 'ies'} saved on this device. Add ${importCount === 1 ? 'it' : 'them'} to your account?`,
              hi: `इस उपकरण पर आपकी ${importCount} प्रविष्टियाँ सहेजी हैं। क्या इन्हें अपने खाते में जोड़ें?`,
            })}
          </span>
          <button type="button" onClick={importLocal} disabled={importing}>
            {importing ? t({ en: 'Importing…', hi: 'जोड़ी जा रही हैं…' }) : t({ en: 'Import', hi: 'जोड़ें' })}
          </button>
          <button type="button" onClick={dismissImport} disabled={importing}>
            {t({ en: 'Not now', hi: 'अभी नहीं' })}
          </button>
        </div>
      )}

      {error && (
        <p className={styles.errorText} role="alert">
          {error === 'load'
            ? t({ en: 'Could not load your saved entries. Please refresh the page.', hi: 'आपकी सहेजी प्रविष्टियाँ लोड नहीं हो सकीं। कृपया पृष्ठ पुनः लोड करें।' })
            : t({ en: 'Could not save. Please check your connection and try again.', hi: 'सहेजा नहीं जा सका। कृपया कनेक्शन जाँचकर पुनः प्रयास करें।' })}
        </p>
      )}
    </>
  );
}
