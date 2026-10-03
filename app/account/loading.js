import styles from './account.module.css';

export default function Loading() {
  return (
    <section className={`${styles.page} page-top`}>
      <div className="container">
        <div className={styles.skeleton} aria-busy="true" aria-label="Loading">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
