import React from 'react';
import styles from './SelectLanguage.module.scss';

export const SelectLanguage = () => {
  return (
    <select name="select" className={styles.select}>
      <option>RU</option>
      <option>EN</option>
    </select>
  );
};
