import React, { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { AuthNavigation } from './AuthNavigation/AuthNavigation';
import { UnAuthNavigation } from './UnAuthNavigation/UnAuthNavigation';
import styles from './Navigation.module.scss';
import { IoClose, IoMenu } from 'react-icons/io5';

export const Navigation = () => {
  const { user } = useAppSelector((state) => state.user);
  const [hamburger, setHamburger] = useState<boolean>(false);

  const burgerEnabler = user
    ? hamburger
      ? `${styles.nav} ${styles.activeBurgerList}`
      : styles.nav
    : `${styles.nav} ${styles.nonactiveNav}`;

  return (
    <>
      {user && (
        <button
          className={styles.menuButton}
          onClick={() => setHamburger((prev) => !prev)}
          onKeyDown={() => setHamburger(false)}
        >
          {!hamburger ? <IoMenu /> : <IoClose />}
        </button>
      )}

      {user && hamburger && <div className={styles.overlay} onClick={() => setHamburger(false)} />}

      <nav onClick={() => setHamburger(false)} className={burgerEnabler}>
        {user ? <AuthNavigation /> : <UnAuthNavigation />}
      </nav>
    </>
  );
};
