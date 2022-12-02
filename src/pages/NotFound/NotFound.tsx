import React from 'react';
import styles from './NotFound.module.scss';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main className={styles.wrapper}>
      <section className={styles.page404}>
        <div className={styles.page404Container}>
          <div className={styles.page404ContainerScene}>
            <h1>404</h1>
          </div>

          <div className={styles.page404ContainerDetails}>
            <h3>{t('notFoundPageTitle')}</h3>
            <p>{t('notFoundPageDescription')}</p>
            <a href="/">{t('notFoundPageButton')}</a>
          </div>
        </div>
      </section>
    </main>
  );
};
