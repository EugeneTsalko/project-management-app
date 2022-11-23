import React, { useState } from 'react';

import { IBoards } from 'api/boards/index.types';
import { useAppSelector } from 'store/hooks';

import BoardsItem from './BoardsItem';
import styles from './index.module.scss';
import FormBoard from './FormBoard';
import { Toaster } from 'react-hot-toast';

const BoardsList = () => {
  const { boards, status, error } = useAppSelector((state) => state.boards);
  const [isFormBoardModal, setIsFormBoardModal] = useState<boolean>(false);

  if (!boards.length && status !== 'Fulfilled') {
    return <p>Loading...</p>;
  }

  if (!boards.length && status === 'Rejected') {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.cards}>
      {boards.map((board: IBoards) => (
        <BoardsItem key={board.id} {...board} />
      ))}

      <button className={styles.addBoardButton} onClick={() => setIsFormBoardModal(true)}>
        + Add Board
      </button>

      {isFormBoardModal && <FormBoard setIsFormBoardModal={setIsFormBoardModal} />}
    </div>
  );
};

export default BoardsList;
