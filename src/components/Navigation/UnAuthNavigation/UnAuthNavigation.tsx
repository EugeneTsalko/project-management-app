import React from 'react';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { SelectLanguage } from '../SelectLanguage/SelectLanguage';
import { useTranslation } from 'react-i18next';
import { IoLogInOutline } from 'react-icons/io5';
import { TiUserAddOutline } from 'react-icons/ti';

export const UnAuthNavigation = () => {
  const { t } = useTranslation();

  return (
    <>
      <LinkButton path="/signin" text={t('Sign in')}>
        <IoLogInOutline />
      </LinkButton>
      <LinkButton path="/signup" text={t('Sign up')}>
        <TiUserAddOutline />
      </LinkButton>
      <SelectLanguage />
    </>
  );
};
