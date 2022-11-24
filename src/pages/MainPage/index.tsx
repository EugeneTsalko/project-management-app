import React, { lazy, Suspense, useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

const BoardsList = lazy(() => import('components/BoardsList'));
import { getBoardsList } from 'api/boards';

import styles from './index.module.scss';
import LoaderSpinner from 'components/LoaderSpinner';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(getBoardsList());
    }
  }, []);

  return (
    <div className={styles.cardsBlock}>
      <h1 className={styles.title}>Boards</h1>
      <Suspense fallback={<LoaderSpinner />}>
        <BoardsList />
      </Suspense>
    </div>
  );
};

export default MainPage;
