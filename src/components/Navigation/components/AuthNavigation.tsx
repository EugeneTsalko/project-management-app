import { LinkButton } from 'components/LinkButton/LinkButton';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { SelectLanguage } from './SelectLanguage';

export const AuthNavigation = () => {
  // const dispatch = useAppDispatch();
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && <LinkButton path="/Boards" text="Go to main"></LinkButton>}
      {location.pathname !== '/' && (
        <>
          <button>Create new board</button>
          <LinkButton path="/profile" text="Edit profile"></LinkButton>
          <button>Sign Out</button>
        </>
      )}
      <SelectLanguage></SelectLanguage>
    </>
  );
};
