import React from 'react';
import styles from './SelectLanguage.module.scss';
import { useTranslation } from 'react-i18next';

export const SelectLanguage = () => {
  const { t, i18n } = useTranslation();

  const selectLanguageHandler = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    const targetValue = (target as HTMLSelectElement).value;

    i18n.changeLanguage(targetValue);
  };

  return (
    <select
      name="select"
      value={window.localStorage.getItem('i18nextLng') || ''}
      className={styles.select}
      onChange={selectLanguageHandler}
    >
      <option value="en">{t('langEN')}</option>
      <option value="ru">{t('langRU')}</option>
    </select>
  );
};
