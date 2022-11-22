import { Button } from 'components/Button/Button';
import { ButtonStyle } from 'components/Button/Button.types';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './Authorization.module.scss';
import { Props, AuthorizationValues, AuthorizationType } from './Authorization.types';

export const Authorization = ({ type, onChange }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<AuthorizationValues>();

  const onSubmit: SubmitHandler<AuthorizationValues> = (data) => {
    onChange(data);
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1>{type === AuthorizationType.signup ? 'Sign Up' : 'Sign In'}</h1>

      {type === AuthorizationType.signup && (
        <>
          <input
            className={styles.input}
            type="text"
            placeholder="Name"
            autoComplete="off"
            {...register('name', {
              required: 'Please enter your name',
              minLength: { value: 2, message: 'At least two symbols' },
            })}
          />
          <div className={styles.error}>{errors.name && errors.name.message}</div>
        </>
      )}

      <input
        className={styles.input}
        type="text"
        placeholder="Login"
        autoComplete="off"
        {...register('login', {
          required: 'Please enter your login',
          minLength: { value: 2, message: 'At least two symbols' },
        })}
      />
      <div className={styles.error}>{errors.login && errors.login.message}</div>

      <input
        className={styles.input}
        type="password"
        placeholder="Password"
        autoComplete="off"
        {...register('password', {
          required: 'Please enter your password',
          minLength: { value: 8, message: 'Minimum eight symbols' },
        })}
      />
      <div className={styles.error}>{errors.password && errors.password.message}</div>

      <Button type="submit" style={ButtonStyle.form} text={type === AuthorizationType.signup ? 'Sign Up' : 'Sign In'} />
    </form>
  );
};
