import React from 'react';
import styles from './About.module.scss';
import aboutImg from '../../assets/about.svg';
import { useAppSelector } from 'store/hooks';
import { useTranslation } from 'react-i18next';
import { Button } from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

export const About = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((store) => store.user);
  const { t } = useTranslation();

  return (
    <section className={styles.about}>
      <div className={styles.aboutDescription}>
        <div className={styles.text}>
          <h1>{t('welcomeTitle')}</h1>
          <p>{t('welcomeDescription')}</p>
        </div>
        <Button
          text={t('welcomeButton')}
          type="button"
          style="form"
          onClick={() => navigate(`${user ? '/boards' : '/signup'}`)}
        >
          <IoArrowForward />
        </Button>
      </div>
      <div className={styles.aboutImageWrapper}>
        <img src={aboutImg} alt="about image" className={styles.aboutImage}></img>
      </div>
    </section>
  );
};
