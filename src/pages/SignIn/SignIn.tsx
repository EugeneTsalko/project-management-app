import React from 'react';
import toast from 'react-hot-toast';
import { useAppDispatch } from 'store/hooks';

import styles from './SignIn.module.scss';
import { isUserAuth, signInUser } from 'api';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType, AuthorizationValues } from 'components/Authorization/Authorization.types';
import { useTranslation } from 'react-i18next';

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleChange = async (data: AuthorizationValues) => {
    const { payload } = await dispatch(signInUser(data));
    const { token, message } = payload as { token: string; message: string };

    if (token) {
      window.localStorage.setItem('token', token);
      dispatch(isUserAuth());
      toast.success(t('Welcome back on board!'));
    }
    if (message) {
      toast.error(message);
    }
  };

  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signin} onChange={(data) => handleChange(data)} />
    </main>
  );
};
