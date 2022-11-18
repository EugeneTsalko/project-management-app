import React from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import styles from './BoardPage.module.scss';

const BoardPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <p className={styles.boardTitle}>Board name - {id}</p>
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
        <p className={styles.column}>Main Content - Columns and Tasks</p>
        <p className={styles.column}>Main Content - Columns and Tasks</p>
        <p className={styles.column}>Main Content - Columns and Tasks</p>
      </div>
    </main>
  );
};

export { BoardPage };
