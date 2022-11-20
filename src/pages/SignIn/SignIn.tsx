import React from 'react';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType } from 'components/Authorization/Authorization.types';
import { createToken } from 'api/createToken';

export const SignIn = () => {
  return (
    <>
      <Authorization type={AuthorizationType.signin} onChange={(data) => createToken(data)}></Authorization>
    </>
  );
};
