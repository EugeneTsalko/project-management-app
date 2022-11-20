import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType } from 'components/Authorization/Authorization.types';
import { createToken } from 'api/createToken';
import styles from './SignIn.module.scss';

export const SignIn = () => {
  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signin} onChange={(data) => createToken(data)}></Authorization>
    </main>
  );
};
