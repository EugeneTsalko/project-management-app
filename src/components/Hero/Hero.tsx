import React from 'react';
import styles from './Hero.module.scss';
import heroImg from '../../assets/hero.svg';
import githubImg from '../../assets/github.svg';
import mailImg from '../../assets/mail.svg';

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <img src={heroImg} alt="about image" className={styles.heroImage}></img>
      <div className={styles.heroes}>
        <div className={styles.heroPerson}>
          <h3>Eugene</h3>
          <div>Done: Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, ex.</div>
          <div className={styles.heroPersonContacts}>
            <img src={githubImg} alt="github" />
            <a href="https://rs.school/react/" target="_blank" rel="nofollow noreferrer">
              eugenetsalko
            </a>
          </div>
          <div className={styles.heroPersonContacts}>
            <img src={mailImg} alt="mail" />
            <span>tefworkmail@gmail.com</span>
          </div>
        </div>

        <div className={styles.heroPerson}>
          <h3>Vitali</h3>
          <div>Done: Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, ex.</div>
          <div className={styles.heroPersonContacts}>
            <img src={githubImg} alt="github" />
            <a href="https://github.com/hauzinski" target="_blank" rel="nofollow noreferrer">
              hauzinski
            </a>
          </div>
          <div className={styles.heroPersonContacts}>
            <img src={mailImg} alt="mail" />
            <span>hauzinski@gmail.com</span>
          </div>
        </div>

        <div className={styles.heroPerson}>
          <h3>Alisher</h3>
          <div>Done: Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, ex.</div>
          <div className={styles.heroPersonContacts}>
            <img src={githubImg} alt="github" />
            <a href="https://github.com/yuksak" target="_blank" rel="nofollow noreferrer">
              yuksak
            </a>
          </div>
          <div className={styles.heroPersonContacts}>
            <img src={mailImg} alt="mail" />
            <span>argulamov@gmail.com</span>
          </div>
        </div>
      </div>
    </section>
  );
};
