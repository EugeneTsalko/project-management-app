import React from 'react';
import styles from './Footer.module.scss';
import rsLogo from '../../assets/rsschool.svg';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://rs.school/react/" target="_blank" rel="nofollow noreferrer">
        <img className={styles.footerLogo} src={rsLogo} alt="rs-school logo"></img>
      </a>
      <div>2022</div>
      <div className={styles.footerGithub}>
        <a
          href="https://github.com/eugenetsalko"
          target="_blank"
          rel="nofollow noreferrer"
          className={styles.footerLink}
        >
          eugenetsalko
        </a>
        <a href="https://github.com/hauzinski" target="_blank" rel="nofollow noreferrer" className={styles.footerLink}>
          hauzinski
        </a>
        <a href="https://github.com/yuksak" target="_blank" rel="nofollow noreferrer" className={styles.footerLink}>
          yuksak
        </a>
      </div>
    </footer>
  );
};
