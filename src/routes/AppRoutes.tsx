import { NotFound } from 'pages/NotFound/NotFound';
import { SignIn } from 'pages/SignIn/SignIn';
import { SignUp } from 'pages/SignUp/SignUp';
import { WelcomePage } from 'pages/WelcomePage/WelcomePage';
import React, { Suspense, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { isUserAuth } from 'api';

export default function AppRoutes() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isUserAuth());
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/signin" element={<PublicRoute component={<SignIn />} />} />
        <Route path="/signup" element={<PublicRoute component={<SignUp />} />} />
        <Route path="/Boards" element={<PrivateRoute component={<p>Main Page</p>} />} />
        <Route path="/Boards/:id" element={<p>Board page</p>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
