import React from 'react';
import styles from './About.module.scss';
import aboutImg from '../../../../assets/about.svg';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { useAppSelector } from 'store/hooks';

export const About = () => {
  const isAuth = useAppSelector((store) => store.user.isAuth);

  return (
    <section className={styles.about}>
      <div className={styles.aboutDescription}>
        <h1>Kanban Task Manager</h1>
        <div>
          Why do companies decide to implement Kanban? It`s obvious. None of the existing time, task or project
          management methods are both user-friendly and efficient at the same time. Also, it`s been proven, that
          implementing Agile methods - such as Kanban - improves projects success rates.
        </div>
        <LinkButton path={isAuth ? 'Boards' : 'signup'} text="TRY NOW" />
      </div>
      <div className={styles.aboutImageWrapper}>
        <img src={aboutImg} alt="about image" className={styles.aboutImage}></img>
      </div>
    </section>
  );
};
