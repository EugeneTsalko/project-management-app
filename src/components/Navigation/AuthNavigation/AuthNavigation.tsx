import React, { useState } from 'react';
import { useAppDispatch } from 'store/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from 'components/Button/Button';
import { ButtonStyle } from 'components/Button/Button.types';
import { LinkButton } from 'components/LinkButton/LinkButton';

import { signOutUser } from 'store/slices/userSlice';
import { SelectLanguage } from '../SelectLanguage/SelectLanguage';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import FormBoard from 'components/BoardsList/FormBoard';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export const AuthNavigation = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [modal, setModal] = useState<boolean>(false);
  const [createBoardModal, setCreateBoardModal] = useState<boolean>(false);

  const handleClick = () => {
    dispatch(signOutUser());
    window.localStorage.removeItem('token');
    navigate('/');
    toast.success(t('You are signed out!'));
  };

  const createBoard = () => {
    setCreateBoardModal(true);
  };

  const confirmationActions = {
    confirmAction: handleClick,
    closeWindow: () => setModal(false),
  };

  return (
    <>
      {pathname === '/' && <LinkButton path="/boards" text={t('Go to main')} />}
      {pathname === '/profile' && (
        <>
          <LinkButton path="/boards" text={t('Go to boards')} />
          <Button text={t('Sign out')} type="button" style={ButtonStyle.nav} onClick={() => setModal(true)} />
        </>
      )}
      {pathname === '/boards' && (
        <>
          <Button text={t('Create Board')} type="button" style={ButtonStyle.nav} onClick={createBoard} />
          <LinkButton path="/profile" text={t('Profile')} />
          <Button text={t('Sign out')} type="button" style={ButtonStyle.nav} onClick={() => setModal(true)} />
        </>
      )}
      {pathname.includes('/boards/') && (
        <>
          <LinkButton path="/boards" text={t('Go to boards')} />
        </>
      )}
      <SelectLanguage />

      {modal && (
        <ModalWindow type="confirmation" actions={confirmationActions}>
          <h3>{t('Are you sure you want to sign out?')}</h3>
        </ModalWindow>
      )}

      {createBoardModal && <FormBoard setIsFormBoardModal={setCreateBoardModal} />}
    </>
  );
};
