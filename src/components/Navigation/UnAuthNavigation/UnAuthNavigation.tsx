import React from 'react';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { SelectLanguage } from '../SelectLanguage/SelectLanguage';
import { useTranslation } from 'react-i18next';

export const UnAuthNavigation = () => {
  const { t } = useTranslation();

  return (
    <>
      <LinkButton path="/signin" text={t('signIn')} />
      <LinkButton path="/signup" text={t('signUp')} />
      <SelectLanguage />
    </>
  );
};
