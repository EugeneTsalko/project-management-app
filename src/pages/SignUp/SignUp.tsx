import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType, AuthorizationValues } from 'components/Authorization/Authorization.types';
import styles from './SignUp.module.scss';
import { useAppDispatch } from 'store/hooks';
import { signInUser, signUpUser } from 'api';

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const handleChange = async (data: AuthorizationValues) => {
    const response = await dispatch(signUpUser(data));
    if (response) {
      const { login, password } = data;
      dispatch(signInUser({ login, password }));
    }
  };
  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signup} onChange={(data) => handleChange(data)} />
    </main>
  );
};
