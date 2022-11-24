import { Header } from 'components/Header/Header';
import { Footer } from 'components/Footer/Footer';
import React from 'react';

import AppRoutes from './routes/AppRoutes';
import { Toaster } from 'react-hot-toast';

import './styles/common.scss';

export default function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Toaster position="top-center" reverseOrder={true} toastOptions={{ duration: 3000 }} />
      <Footer />
    </>
  );
}
