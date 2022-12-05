import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LinkButton.module.scss';

type Props = {
  path: string;
  text: string;
  children?: React.ReactNode;
};

export const LinkButton = ({ path, text, children }: Props) => {
  return (
    <NavLink className={({ isActive }) => (isActive ? `${styles.linkBtn} ${styles.active}` : styles.linkBtn)} to={path}>
      {text} {children}
    </NavLink>
  );
};
