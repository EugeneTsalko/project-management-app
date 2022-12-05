import React, { useEffect } from 'react';

import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';

import AppRoutes from './routes/AppRoutes';
import { useAppDispatch } from 'store/hooks';
import { Toaster, toast } from 'react-hot-toast';
import { isTokenExpired } from 'utils/isTokenExpired';
import { isUserAuth } from 'api';
import { t } from 'i18next';

import './styles/common.scss';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isUserAuth());

    if (isTokenExpired().status) {
      localStorage.removeItem('token');
      toast.error(t('Your token is expired!'));
    }
  }, []);

  return (
    <>
      <Header />
      <AppRoutes />
      <Toaster position="top-center" reverseOrder={true} toastOptions={{ duration: 3000 }} />
      <Footer />
    </>
  );
}
