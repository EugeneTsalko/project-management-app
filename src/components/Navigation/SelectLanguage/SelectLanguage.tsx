import React from 'react';
import styles from './SelectLanguage.module.scss';
import { useTranslation } from 'react-i18next';

export const SelectLanguage = () => {
  const { t, i18n } = useTranslation();

  const selectLanguageHandler = (e: React.ChangeEvent<HTMLSelectElement> | React.MouseEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    i18n.changeLanguage((e.target as HTMLSelectElement).value);
  };

  return (
    <select
      name="select"
      value={window.localStorage.getItem('i18nextLng') || ''}
      className={styles.select}
      onChange={selectLanguageHandler}
      onClick={selectLanguageHandler}
    >
      <option value="en">{t('langEN')}</option>
      <option value="ru">{t('langRU')}</option>
    </select>
  );
};
