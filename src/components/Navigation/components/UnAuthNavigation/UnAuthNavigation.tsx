import { LinkButton } from 'components/LinkButton/LinkButton';
import React from 'react';
import { SelectLanguage } from '../SelectLanguage/SelectLanguage';

export const UnAuthNavigation = () => {
  return (
    <>
      <SelectLanguage></SelectLanguage>
      <LinkButton path="/signin" text="Sign in"></LinkButton>
      <LinkButton path="/signup" text="Sign up"></LinkButton>
    </>
  );
};
