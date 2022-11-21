import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentBoard } from 'store/dataSlice';
import { BoardColumn } from 'components/BoardColumn/BoardColumn';
import { getBoard } from 'api/boards';
import { State } from 'store/store.types';
import styles from './BoardPage.module.scss';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYjViYzdkOC0wYjVlLTQ1NDQtOTU5My1iYTcyZmJhYmY1NDAiLCJsb2dpbiI6InZpdGFsaSIsImlhdCI6MTY2OTAxODc0OX0.3Uv1kUYAmEOwOquH_zl-G7nC1Gz_JcHtbwCXtYj98Hw';

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: State) => state.data.currentBoard);

  const [isLoading, setLoading] = useState(true);

  const { id } = useParams();

  const loadBoard = async () => {
    setLoading(true);
    const data = await getBoard(id as string, token);
    dispatch(setCurrentBoard(data));
    setLoading(false);
  };

  useEffect(() => {
    loadBoard();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h2 className={styles.boardTitle}>{currentBoard.title}</h2>
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
          onClick={() => console.log('Column was created', id)}
        >
          Create column
        </button>
      </header>
      <div className={styles.boardColumns}>
        {currentBoard.columns.map((item) => (
          <BoardColumn key={item.id} data={item} />
        ))}
      </div>
    </main>
  );
};

export { BoardPage };
