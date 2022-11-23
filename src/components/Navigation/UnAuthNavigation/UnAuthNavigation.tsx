import React from 'react';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { SelectLanguage } from '../SelectLanguage/SelectLanguage';

export const UnAuthNavigation = () => {
  return (
    <>
      <SelectLanguage />
      <LinkButton path="/signin" text="Sign in" />
      <LinkButton path="/signup" text="Sign up" />
    </>
  );
};
