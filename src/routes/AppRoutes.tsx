import React from 'react';

import MainPage from 'pages/MainPage';
import { SignIn } from 'pages/SignIn/SignIn';
import { SignUp } from 'pages/SignUp/SignUp';
import { NotFound } from 'pages/NotFound/NotFound';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import { BoardPage } from 'pages/Board/BoardPage';

import { Routes, Route } from 'react-router-dom';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { ProfilePage } from 'pages/ProfilePage/ProfilePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signin" element={<PublicRoute component={<SignIn />} />} />
      <Route path="/signup" element={<PublicRoute component={<SignUp />} />} />
      <Route path="/profile" element={<PrivateRoute component={<ProfilePage />} />} />
      <Route path="/boards" element={<PrivateRoute component={<MainPage />} />} />
      <Route path="/boards/:boardId" element={<PrivateRoute component={<BoardPage />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
