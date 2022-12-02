import React from 'react';
import styles from './About.module.scss';
import aboutImg from '../../assets/about.svg';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';

export const About = () => {
  const { user } = useAppSelector((store) => store.user);
  const { t } = useTranslation();

  return (
    <section className={styles.about}>
      <div className={styles.aboutDescription}>
        <h1>{t('welcomeTitle')}</h1>
        <p>{t('welcomeDescription')}</p>
        <LinkButton path={user ? '/boards' : '/signup'} text={t('welcomeButton')} />
      </div>
      <div className={styles.aboutImageWrapper}>
        <img src={aboutImg} alt="about image" className={styles.aboutImage}></img>
      </div>
    </section>
  );
};
