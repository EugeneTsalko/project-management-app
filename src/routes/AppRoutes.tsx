import React, { useEffect } from 'react';

import MainPage from 'pages/MainPage';
import { SignIn } from 'pages/SignIn/SignIn';
import { SignUp } from 'pages/SignUp/SignUp';
import { NotFound } from 'pages/NotFound/NotFound';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';

import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { isUserAuth } from 'api';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';

export default function AppRoutes() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isUserAuth());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signin" element={<PublicRoute component={<SignIn />} />} />
      <Route path="/signup" element={<PublicRoute component={<SignUp />} />} />
      <Route path="/Boards" element={<PrivateRoute component={<MainPage />} />} />
      <Route path="/Boards/:id" element={<p>Board page</p>} />
      <Route path="/profile" element={<PrivateRoute component={<ProfilePage />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
