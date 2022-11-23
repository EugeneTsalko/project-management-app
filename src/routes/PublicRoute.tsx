import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

export const PublicRoute = ({ component }: { component: JSX.Element }) => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return isAuth ? <Navigate to="/Boards" /> : component;
};
