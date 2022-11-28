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

export const AuthNavigation = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [modal, setModal] = useState<boolean>(false);
  const [createBoardModal, setCreateBoardModal] = useState<boolean>(false);

  const handleClick = () => {
    dispatch(signOutUser());
    window.localStorage.removeItem('token');
    navigate('/');
    toast.success('You are signed out!');
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
      {pathname === '/' && <LinkButton path="/Boards" text="Go to main" />}
      {pathname !== '/' && (
        <>
          <Button text="Create new board" type="button" style={ButtonStyle.nav} onClick={createBoard} />
          <LinkButton path="/profile" text="Edit profile" />
          <Button text="Sign Out" type="button" style={ButtonStyle.nav} onClick={() => setModal(true)} />
        </>
      )}
      <SelectLanguage />

      {modal && (
        <ModalWindow type="confirmation" actions={confirmationActions}>
          <h3>Are you sure you want to sign out?</h3>
        </ModalWindow>
      )}

      {createBoardModal && <FormBoard setIsFormBoardModal={setCreateBoardModal} />}
    </>
  );
};
