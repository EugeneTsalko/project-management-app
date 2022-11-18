import React from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { BoardColumn } from 'components/BoardColumn/BoardColumn';
import styles from './BoardPage.module.scss';

const BoardPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h2 className={styles.boardTitle}>Board title - {id}</h2>
        <button
          className={styles.closeBoardButton}
          type="button"
          aria-label="Close board"
          onClick={() => navigate('/Boards')}
        >
          Close board
        </button>
        <button
          className={styles.createColumnButton}
          type="button"
          aria-label="Create column"
          onClick={() => console.log('Column was created')}
        >
          Create column
        </button>
      </header>
      <div className={styles.boardColumns}>
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
        <BoardColumn />
      </div>
    </main>
  );
};

export { BoardPage };
