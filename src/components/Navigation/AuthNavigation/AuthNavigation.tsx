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
import { IoLogOutOutline } from 'react-icons/io5';
import Divider from 'components/Divider';

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

  const createBoard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCreateBoardModal(true);
  };

  const signOutHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModal(true);
  };

  const confirmationActions = {
    confirmAction: handleClick,
    closeWindow: () => setModal(false),
  };

  return (
    <>
      {pathname === '/' && <LinkButton path="/boards" text={t('Go to main')} />}
      {pathname === '/profile' && <LinkButton path="/boards" text={t('Go to boards')} />}
      {pathname === '/boards' && (
        <>
          <Button text={t('Create Board')} type="button" style={ButtonStyle.nav} onClick={createBoard} />
          <LinkButton path="/profile" text={t('Profile')} />
        </>
      )}

      {pathname.includes('/boards/') && (
        <Button onClick={() => navigate('/boards')} type="button" style="nav" text={t('Go to boards')} />
      )}

      <SelectLanguage />
      <Divider />
      <Button text={t('Sign out')} type="button" style={ButtonStyle.nav} onClick={signOutHandler}>
        <IoLogOutOutline />
      </Button>

      {modal && (
        <ModalWindow type="confirmation" actions={confirmationActions}>
          <h3>{t('Are you sure you want to sign out?')}</h3>
        </ModalWindow>
      )}

      {createBoardModal && <FormBoard setIsFormBoardModal={setCreateBoardModal} />}
    </>
  );
};
