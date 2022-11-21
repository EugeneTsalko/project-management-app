import React, { useEffect } from 'react';
import { useAppDispatch } from 'store/hooks';

import BoardsList from 'components/BoardsList';
import { getBoardsList } from 'api/boards';

import styles from './index.module.scss';

const MainPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBoardsList());
  }, []);

  window.localStorage.setItem(
    'token',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGNmOTZkMi01OGZjLTRlMGMtOTZkOS05YWM0MjhkNGQ0OTUiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIwMDMyMTF9.EUlvrrs0Hl7wq1o-vkW5eh710CeNmhTfivk8aYkO43I'
  );

  return (
    <div className={styles.cardsBlock}>
      <h1 className={styles.title}>Boards</h1>
      <BoardsList />
    </div>
  );
};

export default MainPage;
