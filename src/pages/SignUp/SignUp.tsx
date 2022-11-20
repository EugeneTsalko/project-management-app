import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType } from 'components/Authorization/Authorization.types';
import { createAccount } from 'api/createAccount';
import styles from './SignUp.module.scss';

export const SignUp = () => {
  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signup} onChange={(data) => createAccount(data)}></Authorization>
    </main>
  );
};
