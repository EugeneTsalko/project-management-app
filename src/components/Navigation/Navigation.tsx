import { LinkButton } from 'components/LinkButton/LinkButton';
import React from 'react';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  return (
    <div className={styles.nav}>
      <LinkButton path="/signin" text="Sign in"></LinkButton>
      <LinkButton path="/signup" text="Sign up"></LinkButton>
    </div>
  );
};
