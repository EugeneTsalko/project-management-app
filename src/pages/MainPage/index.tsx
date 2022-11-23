import React, { lazy, Suspense, useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

const BoardsList = lazy(() => import('components/BoardsList'));
import { getBoardsList } from 'api/boards';

import styles from './index.module.scss';
import LoaderSpinner from 'components/LoaderSpinner';

const MainPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsList());
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
