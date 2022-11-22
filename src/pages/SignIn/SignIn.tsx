import React, { useEffect } from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType, AuthorizationValues } from 'components/Authorization/Authorization.types';
import styles from './SignIn.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store/store';
import { signInUser } from 'store/slices/userSlice';
import { redirect } from 'react-router-dom';

export const SignIn = () => {
  // const { isAuth, user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (data: AuthorizationValues) => {
    dispatch(signInUser(data));
  };

  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signin} onChange={(data) => handleChange(data)}></Authorization>
    </main>
  );
};
