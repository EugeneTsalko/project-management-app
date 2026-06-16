import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Navigation } from 'components/Navigation/Navigation';
import { useScrollPosition } from 'utils/hooks/useScrollPosition';

export const Header = () => {
  const { scrollPosition } = useScrollPosition();

  return (
    <header className={scrollPosition > 0 ? `${styles.header} ${styles.scrolled}` : styles.header}>
      <NavLink to="/">
        <Logo className={styles.logo} />
      </NavLink>
      <Navigation />
    </header>
  );
};
