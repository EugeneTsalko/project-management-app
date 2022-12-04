import React from 'react';
import styles from './Footer.module.scss';
import rsLogo from '../../assets/rsschool.svg';
import { FaRegCopyright } from 'react-icons/fa';

const links = [
  {
    username: 'eugenetsalko',
    url: 'https://github.com/eugenetsalko',
  },
  {
    username: 'hauzinski',
    url: 'https://github.com/hauzinski',
  },
  {
    username: 'yuksak',
    url: 'https://github.com/yuksak',
  },
];

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://rs.school/react/" target="_blank" rel="nofollow noreferrer">
        <img className={styles.footerLogo} src={rsLogo} alt="rs-school logo"></img>
      </a>
      <div className={styles.footerGithub}>
        {links.map((link) => {
          return (
            <a href={link.url} key={link.url} target="_blank" rel="nofollow noreferrer" className={styles.footerLink}>
              {link.username}
            </a>
          );
        })}
      </div>
      <div className={styles.copyright}>
        <FaRegCopyright /> React 2022Q3
      </div>
    </footer>
  );
};
