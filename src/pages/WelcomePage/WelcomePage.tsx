import React from 'react';
import { About } from '../../components/About/About';
import { Hero } from '../../components/Hero/Hero';
import styles from './WelcomePage.module.scss';

export const WelcomePage = () => {
  return (
    <main className={styles.welcomePage}>
      <About />
      <Hero />
    </main>
  );
};
