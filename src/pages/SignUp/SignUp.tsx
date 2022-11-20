import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType } from 'components/Authorization/Authorization.types';
import { signUp } from 'api';
import styles from './SignUp.module.scss';

export const SignUp = () => {
  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signup} onChange={(data) => signUp(data)}></Authorization>
    </main>
  );
};
