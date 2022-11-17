import React from 'react';
import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.page404}>
        <div className={styles.page404Container}>
          <div className={styles.page404ContainerScene}>
            <h1>404</h1>
          </div>

          <div className={styles.page404ContainerDetails}>
            <h3>Look like you`re lost</h3>
            <p>the page you are looking for not avaible!</p>
            <a href="/">Go to Home</a>
          </div>
        </div>
      </section>
    </div>
  );
};
