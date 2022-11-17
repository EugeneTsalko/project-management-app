import { Header } from 'components/Header/Header';
import React from 'react';

import AppRoutes from './routes/AppRoutes';

import './styles/common.scss';

export default function App() {
  return (
    <>
      <Header></Header>
      <AppRoutes />
      <footer>FOOTER</footer>
    </>
  );
}
