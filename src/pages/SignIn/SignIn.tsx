import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType } from 'components/Authorization/Authorization.types';

export const SignIn = () => {
  return (
    <>
      <Authorization type={AuthorizationType.signin} onChange={(data) => console.log('user: ', data)}></Authorization>
    </>
  );
};
