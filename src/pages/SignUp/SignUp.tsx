import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType, AuthorizationValues } from 'components/Authorization/Authorization.types';
import styles from './SignUp.module.scss';
import { signInUser, signUpUser } from 'store/slices/userSlice';
import { useAppDispatch } from 'store/hooks';

export const SignUp = () => {
  const dispatch = useAppDispatch();

  const handleChange = async (data: AuthorizationValues) => {
    const response = await dispatch(signUpUser(data));
    if (response) {
      dispatch(signInUser(data));
    }
  };
  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signup} onChange={(data) => handleChange(data)}></Authorization>
    </main>
  );
};
