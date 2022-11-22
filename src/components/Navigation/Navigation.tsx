import { LinkButton } from 'components/LinkButton/LinkButton';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { AuthNavigation } from './components/AuthNavigation';
import { UnAuthNavigation } from './components/UnAuthNavigation';
import styles from './Navigation.module.scss';

export const Navigation = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);
  const location = useLocation();

  useEffect(() => {
    console.log('location: ', location.pathname);
  }, [location.pathname]);

  return <div className={styles.nav}>{isAuth ? <AuthNavigation /> : <UnAuthNavigation />}</div>;
};
