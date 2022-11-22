import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { Button } from 'components/Button/Button';
import { ButtonStyle } from 'components/Button/Button.types';
import { LinkButton } from 'components/LinkButton/LinkButton';
import { signOutUser } from 'store/slices/userSlice';
import { SelectLanguage } from '../SelectLanguage/SelectLanguage';

export const AuthNavigation = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleClick = () => {
    console.log('click');
    dispatch(signOutUser());
    return <Navigate to="/" />;
  };

  const createBoard = () => {
    console.log('create board!');
  };

  return (
    <>
      {location.pathname === '/' && <LinkButton path="/Boards" text="Go to main" />}
      {location.pathname !== '/' && (
        <>
          <Button text="Create new board" type="button" style={ButtonStyle.nav} onClick={createBoard} />
          <LinkButton path="/profile" text="Edit profile" />
          <Button text="Sign Out" type="button" style={ButtonStyle.nav} onClick={handleClick} />
        </>
      )}
      <SelectLanguage />
    </>
  );
};
