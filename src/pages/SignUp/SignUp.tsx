import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType, AuthorizationValues } from 'components/Authorization/Authorization.types';
import styles from './SignUp.module.scss';
import { useAppDispatch } from 'store/hooks';
import { signInUser, signUpUser } from 'api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = async ({ login, password, name }: AuthorizationValues) => {
    const register = await dispatch(signUpUser({ login, password, name }));
    const { message: errorMessage } = register.payload as { message: string };

    if (errorMessage) {
      toast.error(t('Sorry, user login already exists or something just went wrong!'));
      return;
    }

    const { payload } = await dispatch(signInUser({ login, password }));
    const { token } = payload as { token: string; message: string };

    if (token) {
      window.localStorage.setItem('token', token);
      navigate('/boards');
      toast.success(t('Welcome on board!'));
    }
  };

  return (
    <main className={styles.main}>
      <Authorization type={AuthorizationType.signup} onChange={(data) => handleChange(data)} />
    </main>
  );
};
