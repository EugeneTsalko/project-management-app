import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType, AuthorizationValues } from 'components/Authorization/Authorization.types';
import styles from './SignIn.module.scss';
import { useAppDispatch } from 'store/hooks';
import { signInUser } from 'api';
import { SignInPayload } from 'api/authorization.types';

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const handleChange = async (data: AuthorizationValues) => {
    const response = await dispatch(signInUser(data));
    if (response.payload) {
      const { token } = response.payload as SignInPayload;
      window.localStorage.setItem('token', token);
    }
  };

  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signin} onChange={(data) => handleChange(data)} />
    </main>
  );
};
