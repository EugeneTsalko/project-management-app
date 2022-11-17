import React from 'react';
import styles from './Hero.module.scss';
import heroImg from '../../../../assets/hero.svg';
import githubImg from '../../../../assets/github.svg';
import mailImg from '../../../../assets/mail.svg';

export const Hero = () => {
  return (
    <section className={styles.hero}>
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
      <img src={heroImg} alt="about image" className={styles.heroImage}></img>
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
          <span>....@mail</span>
        </div>
      </div>
    </section>
  );
};
