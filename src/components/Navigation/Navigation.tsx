import React from 'react';
import { useAppSelector } from 'store/hooks';
import { AuthNavigation } from './AuthNavigation/AuthNavigation';
import { UnAuthNavigation } from './UnAuthNavigation/UnAuthNavigation';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return <nav className={styles.nav}>{isAuth ? <AuthNavigation /> : <UnAuthNavigation />}</nav>;
};
