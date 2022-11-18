import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import { BoardColumn } from 'components/BoardColumn/BoardColumn';
import { getBoard } from 'api/boardsApi';
import { Board } from 'api/boardsApi.models';
import styles from './BoardPage.module.scss';

const BoardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({} as Board);

  const { id } = useParams();

  const getState = async () => {
    setLoading(true);
    const data = await getBoard(id as string);
    setLoading(false);
    setState(data);
  };

  useEffect(() => {
    getState();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h2 className={styles.boardTitle}>{state.title}</h2>
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
        {state.columns.map((item) => (
          <BoardColumn key={item.id} data={item} />
        ))}
      </div>
    </main>
  );
};

export { BoardPage };
