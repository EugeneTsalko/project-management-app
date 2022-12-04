import React, { lazy, Suspense, useState } from 'react';

import { IBoards, IFetchedBoards } from 'api/boards/index.types';
import { useAppSelector } from 'store/hooks';

const BoardsItem = lazy(() => import('./BoardsItem'));
import { BsClipboardPlus } from 'react-icons/bs';

import styles from './index.module.scss';
import FormBoard from './FormBoard';
import LoaderSpinner from 'components/LoaderSpinner';
import { t } from 'i18next';

const BoardsList = () => {
  const { boards } = useAppSelector((state) => state.boards);
  const [isFormBoardModal, setIsFormBoardModal] = useState<boolean>(false);

  return (
    <div className={styles.cards}>
      <Suspense fallback={<LoaderSpinner />}>
        {boards.map((board: IFetchedBoards) => (
          <Suspense fallback={<LoaderSpinner />} key={board._id}>
            <BoardsItem key={board._id} {...board} />
          </Suspense>
        ))}
      </Suspense>

      <button className={styles.addBoardButton} onClick={() => setIsFormBoardModal(true)}>
        <BsClipboardPlus />
        {t('Add Boards')}
      </button>

      {isFormBoardModal && <FormBoard setIsFormBoardModal={setIsFormBoardModal} />}
    </div>
  );
};

export default BoardsList;
