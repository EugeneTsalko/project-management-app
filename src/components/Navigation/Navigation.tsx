import React, { useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { AuthNavigation } from './AuthNavigation/AuthNavigation';
import { UnAuthNavigation } from './UnAuthNavigation/UnAuthNavigation';
import styles from './Navigation.module.scss';
import { IoClose, IoMenu } from 'react-icons/io5';

export const Navigation = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState<boolean>(false);

  const burgerEnabler = isHamburgerOpen ? `${styles.nav} ${styles.activeBurgerList}` : styles.nav;

  return (
    <>
      {
        <button
          className={styles.menuButton}
          onClick={() => setIsHamburgerOpen((prev) => !prev)}
          onKeyDown={() => setIsHamburgerOpen(false)}
        >
          {!isHamburgerOpen ? <IoMenu /> : <IoClose />}
        </button>
      }

      {isHamburgerOpen && <div className={styles.overlay} onClick={() => setIsHamburgerOpen(false)} />}

      <nav onClick={() => setIsHamburgerOpen(false)} className={burgerEnabler}>
        {user ? <AuthNavigation /> : <UnAuthNavigation />}
      </nav>
    </>
  );
};
