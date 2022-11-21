import React, { useState } from 'react';

import { createBoard } from 'api/boards';
import { IBoards } from 'api/boards/index.types';
import { useAppDispatch, useAppSelector } from 'store/hooks';

import BoardsItem from './BoardsItem';
import styles from './index.module.scss';

const BoardsList = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.boards);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isCreateBoardModal, setIsCreateBoardModal] = useState<boolean>(false);

  const submitHandler = () => {
    try {
      dispatch(createBoard({ title, description }));
      setTitle('');
      setDescription('');
      setIsCreateBoardModal(false);
    } catch (err) {
      alert(err);
    }
  };

  const cancelHandler = () => {
    setTitle('');
    setDescription('');
    setIsCreateBoardModal(false);
  };

  if (!boards.length) {
    return <p style={{ textAlign: 'center', padding: '2rem 0' }}>Loading...</p>;
  }

  return (
    <div className={styles.cards}>
      {boards.map((board: IBoards) => (
        <BoardsItem key={board.id} {...board} />
      ))}

      <button className={styles.addBoardButton} onClick={() => setIsCreateBoardModal(true)}>
        + Add Board
      </button>

      {isCreateBoardModal && (
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '250px' }}>
          <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <button onClick={cancelHandler}>Cancel</button>
          <button onClick={submitHandler}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default BoardsList;
