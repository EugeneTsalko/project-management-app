import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';

export default function PrivateRoute({ component }: { component: JSX.Element }) {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return isAuth ? component : <Navigate to="/" />;
}
