import React, { lazy, Suspense, useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

const BoardsList = lazy(() => import('components/BoardsList'));
import { getBoardsList } from 'api/boards';

import styles from './index.module.scss';
import LoaderSpinner from 'components/LoaderSpinner';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getBoardsList());
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{t('Boards')}</h1>
      <Suspense fallback={<LoaderSpinner />}>
        <BoardsList />
      </Suspense>
    </main>
  );
};

export default MainPage;
