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
      <h1 className={styles.title}>
        {type === AuthorizationType.signup ? 'Sign Up' : type === AuthorizationType.signin ? 'Sign In' : 'Edit profile'}
      </h1>

      {(type === AuthorizationType.signup || type === AuthorizationType.edit) && (
        <>
          <input
            className={styles.input}
            type="text"
            placeholder={type === AuthorizationType.edit ? 'New name' : 'Name'}
            autoComplete="off"
            {...register('name', {
              required: 'Please enter your name',
              minLength: { value: 2, message: 'At least two symbols' },
              maxLength: { value: 20, message: 'Name must be less than 20 symbols' },
            })}
          />
          <div className={styles.error}>{errors.name && errors.name.message}</div>
        </>
      )}

      <input
        className={styles.input}
        type="text"
        placeholder={type === AuthorizationType.edit ? 'New login' : 'Login'}
        autoComplete="off"
        {...register('login', {
          required: 'Please enter your login',
          minLength: { value: 2, message: 'At least two symbols' },
          maxLength: { value: 15, message: 'Login must be less than 15 symbols' },
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

      <Button
        type="submit"
        style={ButtonStyle.form}
        text={type === AuthorizationType.signup ? 'Sign Up' : type === AuthorizationType.signin ? 'Sign In' : 'Edit'}
      />
    </form>
  );
};
