import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType, AuthorizationValues } from 'components/Authorization/Authorization.types';
import styles from './SignUp.module.scss';
import { useDispatch } from 'react-redux';
import { signInUser, signUpUser } from 'store/slices/userSlice';
import { AppDispatch } from 'store/store';

export const SignUp = () => {
  const dispatch = useDispatch<AppDispatch>();

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
