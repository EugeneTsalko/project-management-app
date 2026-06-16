import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

export const PublicRoute = ({ component }: { component: JSX.Element }) => {
  const { user } = useAppSelector((state) => state.user);
  const token = window.localStorage.getItem('token');

  return user && token ? <Navigate to="/boards" /> : component;
};
