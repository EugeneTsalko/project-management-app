import React from 'react';
import styles from './Hero.module.scss';
import heroImg from '../../assets/hero.svg';
import githubImg from '../../assets/github.svg';
import mailImg from '../../assets/mail.svg';

const heroes = [
  {
    name: 'Eugene',
    mail: 'tefworkmail@gmail.com',
    githubLink: 'https://github.com/eugenetsalko',
    githubName: 'eugenetsalko',
    done: 'Welcome route, Header, Footer, Sign In, Sign Up, API interaction, Design.',
  },
  {
    name: 'Vitali',
    mail: 'hauzinski@gmail.com',
    githubLink: 'https://github.com/hauzinski',
    githubName: 'hauzinski',
    done: 'Board route, Columns, Tasks, Generic modal, API interaction, Design. ',
  },
  {
    name: 'Alisher',
    mail: 'argulamov@gmail.com',
    githubLink: 'https://github.com/yuksak',
    githubName: 'yuksak',
    done: 'Main route, Localization, Deploy backend, API interaction, Design.',
  },
];

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <img src={heroImg} alt="about image" className={styles.heroImage}></img>
      <div className={styles.heroes}>
        {heroes.map((hero) => {
          return (
            <div className={styles.heroPerson} key={hero.githubName}>
              <h3>{hero.name}</h3>
              <p>Done: {hero.done}</p>
              <div className={styles.heroPersonContacts}>
                <img src={githubImg} alt="github" />
                <a href={hero.githubLink} target="_blank" rel="nofollow noreferrer">
                  {hero.githubName}
                </a>
              </div>
              <div className={styles.heroPersonContacts}>
                <img src={mailImg} alt="mail" />
                <a href={`mailto:${hero.mail}`}>{hero.mail}</a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
