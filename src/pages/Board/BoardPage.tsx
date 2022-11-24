import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BoardColumn } from 'components/BoardColumn/BoardColumn';
import { CreateNewColumn } from './ModalWindows/CreateNewColumn';
import { getBoard, ColumnInterface } from 'api/boards';
import { setCurrentBoard } from 'store/dataSlice';
import { StateInterface } from 'store/store.types';
import styles from './BoardPage.module.scss';

import { token } from 'api/token';

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: StateInterface) => state.data.currentBoard);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [CreateColumnModalWindow, setCreateColumnModalWindow] = useState(false);

  const loadBoard = async () => {
    setIsLoading(true);
    const responseData = await getBoard(id as string, token);
    dispatch(setCurrentBoard(responseData));

    setIsLoading(false);
  };

  useEffect(() => {
    loadBoard();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
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
            onClick={() => setCreateColumnModalWindow(true)}
          >
            Create column
          </button>
        </header>
        <div className={styles.boardColumns}>
          {currentBoard.columns.map((item: ColumnInterface) => (
            <BoardColumn key={item.id} data={item} />
          ))}
        </div>
      </main>
      {CreateColumnModalWindow && (
        <CreateNewColumn setState={setCreateColumnModalWindow} boardId={currentBoard.id} token={token} />
      )}
    </>
  );
};

export { BoardPage };
