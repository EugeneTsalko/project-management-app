import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from 'store/store';

import AppRoutes from './routes/AppRoutes';

import './styles/common.scss';

export default function App() {
  return (
    <Provider store={store}>
      <Header></Header>
      <AppRoutes />
      <Footer></Footer>
    </Provider>
  );
}
