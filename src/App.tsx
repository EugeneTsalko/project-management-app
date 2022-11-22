import { Footer } from 'components/Footer/Footer';
import { Header } from 'components/Header/Header';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { useAppSelector } from 'store/hooks';
import { store } from 'store/store';

import AppRoutes from './routes/AppRoutes';

import './styles/common.scss';

export default function App() {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  useEffect(() => {
    console.log('isAuth: ', isAuth);
  }, []);

  return (
    <Provider store={store}>
      <Header></Header>
      <AppRoutes />
      <Footer></Footer>
    </Provider>
  );
}
