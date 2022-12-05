import { Button } from 'components/Button/Button';
import { ButtonStyle } from 'components/Button/Button.types';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Authorization.module.scss';
import { Props, AuthorizationValues, AuthorizationType } from './Authorization.types';
import { useTranslation } from 'react-i18next';

export const Authorization = ({ type, onChange }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<AuthorizationValues>();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<AuthorizationValues> = (data) => {
    onChange(data);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>
        {type === AuthorizationType.signup
          ? t('Sign up')
          : type === AuthorizationType.signin
          ? t('Sign in')
          : t('Edit profile')}
      </h1>

      {(type === AuthorizationType.signup || type === AuthorizationType.edit) && (
        <>
          <input
            className={styles.input}
            type="text"
            placeholder={type === AuthorizationType.edit ? (t('New Name') as string) : (t('Name') as string)}
            autoComplete="off"
            {...register('name', {
              required: t('Please enter your name') as string,
              minLength: { value: 2, message: t('At least characters', { val: 2 }) },
              maxLength: { value: 20, message: t('Name must be less than characters', { val: 20 }) },
            })}
          />
          <div className={styles.error}>{errors.name && errors.name.message}</div>
        </>
      )}

      <input
        className={styles.input}
        type="text"
        placeholder={type === AuthorizationType.edit ? (t('New Login') as string) : (t('Login') as string)}
        autoComplete="off"
        {...register('login', {
          required: t('Please enter your login') as string,
          minLength: { value: 2, message: t('At least characters', { val: 2 }) },
          maxLength: { value: 15, message: t('Login must be less than characters', { val: 15 }) },
        })}
      />
      <div className={styles.error}>{errors.login && errors.login.message}</div>

      <input
        className={styles.input}
        type="password"
        placeholder={t('Password') as string}
        autoComplete="off"
        {...register('password', {
          required: t('Please enter your password') as string,
          minLength: { value: 8, message: t('At least characters', { val: 8 }) },
        })}
      />
      <div className={styles.error}>{errors.password && errors.password.message}</div>

      <Button
        type="submit"
        style={ButtonStyle.form}
        text={
          type === AuthorizationType.signup
            ? t('Sign up')
            : type === AuthorizationType.signin
            ? t('Sign in')
            : t('Save')
        }
      />
    </form>
  );
};
