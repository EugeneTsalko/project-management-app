import React from 'react';
import { Props } from './Button.types';
import styles from './Button.module.scss';

export const Button = ({ text, type, style, onClick }: Props) => {
  return (
    <button className={`${styles.btn} ${styles[style]}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
};
