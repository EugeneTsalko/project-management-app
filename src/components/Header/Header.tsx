import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import logo from '../../assets/logo.svg';
import { Navigation } from 'components/Navigation/Navigation';

export const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>
      <Navigation></Navigation>
    </header>
  );
};
