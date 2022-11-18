import { NotFound } from 'pages/NotFound/NotFound';
import { SignIn } from 'pages/SignIn/SignIn';
import { SignUp } from 'pages/SignUp/SignUp';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import React from 'react';

import { Routes, Route } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/Boards" element={<p>Main page</p>} />
      <Route path="/Boards/:id" element={<p>Board page</p>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
