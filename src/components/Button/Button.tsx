import React from 'react';
import { Props } from './Button.types';
import styles from './Button.module.scss';

export const Button = ({ id, text, type, style, onClick, children }: Props) => {
  return (
    <button className={`${styles.btn} ${styles[style]}`} id={id} onClick={onClick} type={type} aria-label={text}>
      {text} {children}
    </button>
  );
};
