import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType, AuthorizationValues } from 'components/Authorization/Authorization.types';
import styles from './SignIn.module.scss';
import { useAppDispatch } from 'store/hooks';
import { signInUser } from 'api';

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const handleChange = (data: AuthorizationValues) => {
    dispatch(signInUser(data));
  };

  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signin} onChange={(data) => handleChange(data)} />
    </main>
  );
};
