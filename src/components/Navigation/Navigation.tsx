import React from 'react';
import { useAppSelector } from 'store/hooks';
import { AuthNavigation } from './AuthNavigation/AuthNavigation';
import { UnAuthNavigation } from './UnAuthNavigation/UnAuthNavigation';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const { user } = useAppSelector((state) => state.user);

  return <nav className={styles.nav}>{user ? <AuthNavigation /> : <UnAuthNavigation />}</nav>;
};
