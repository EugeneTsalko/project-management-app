import React from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch } from 'store/hooks';

import styles from './SignIn.module.scss';
import { isUserAuth, signInUser } from 'api';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType, AuthorizationValues } from 'components/Authorization/Authorization.types';
import { t } from 'i18next';

export const SignIn = () => {
  const dispatch = useAppDispatch();

  const handleChange = async (data: AuthorizationValues) => {
    const { payload } = await dispatch(signInUser(data));
    const { token, message } = payload as { token: string; message: string };

    if (token) {
      window.localStorage.setItem('token', token);
      dispatch(isUserAuth());
      toast.success(t('Welcome back on board!'));
    }

    if (message) {
      if (message.includes('403')) {
        toast.error(t('User was not found!'));
      } else {
        toast.error(t('Sorry, something went wrong.'));
      }
    }
  };

  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signin} onChange={(data) => handleChange(data)} />
    </main>
  );
};
