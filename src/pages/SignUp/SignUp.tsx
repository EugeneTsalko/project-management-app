import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType } from 'components/Authorization/Authorization.types';
import { createAccount } from 'api/createAccount';

export const SignUp = () => {
  return (
    <>
      <Authorization type={AuthorizationType.signup} onChange={(data) => createAccount(data)}></Authorization>
    </>
  );
};
