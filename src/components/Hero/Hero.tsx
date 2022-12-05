import React from 'react';
import styles from './Hero.module.scss';
import { ReactComponent as HeroImg } from '../../assets/hero.svg';
import githubImg from '../../assets/github.svg';
import mailImg from '../../assets/mail.svg';
import { useTranslation } from 'react-i18next';

const heroes = [
  {
    name: 'Eugene',
    mail: 'tefworkmail@gmail.com',
    githubLink: 'https://github.com/eugenetsalko',
    githubName: 'eugenetsalko',
    done: 'Welcome route, Header, Footer, Sign In, Sign Up, Profile, API interaction, Design.',
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
    done: 'Main route, DnD, Localization, Deploy backend, Adaptive layouts, API interaction, Design.',
  },
];

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <HeroImg className={styles.heroImage} />
      <div className={styles.heroes}>
        <h2 className={styles.title}>{t('Team')}:</h2>
        {heroes.map((hero) => {
          return (
            <div className={styles.heroPerson} key={hero.githubName}>
              <h3>{t(hero.name)}</h3>
              <p>
                <strong>{t('Done')}:</strong> {hero.done}
              </p>
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
