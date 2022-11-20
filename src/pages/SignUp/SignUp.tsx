import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType } from 'components/Authorization/Authorization.types';

export const SignUp = () => {
  return (
    <>
      <Authorization type={AuthorizationType.signup} onChange={(data) => console.log('user: ', data)}></Authorization>
    </>
  );
};
