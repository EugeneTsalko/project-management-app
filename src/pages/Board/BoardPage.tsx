import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BoardColumn } from 'components/BoardColumn/BoardColumn';
import { CreateNewColumn } from './ModalWindows/CreateNewColumn';
import LoaderSpinner from 'components/LoaderSpinner';
import { getBoard } from 'api/currentBoard';
import { ColumnInterface } from 'api/currentBoard/index.types';
import { setCurrentBoard } from 'store/slices/currentBoardSlice';
import { RootState } from 'store/store';
import styles from './BoardPage.module.scss';

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: RootState) => state.currentBoard);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [createColumnModalWindow, setCreateColumnModalWindow] = useState(false);

  const loadBoard = async () => {
    setIsLoading(true);
    const responseData = await getBoard(id as string);

    if (!responseData) {
      navigate('/Boards');
      return;
    }
    dispatch(setCurrentBoard(responseData));
    setIsLoading(false);
  };

  useEffect(() => {
    loadBoard();
  }, []);

  if (isLoading) {
    return <LoaderSpinner full={true} />;
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
        <ul className={styles.columnList}>
          {currentBoard.columns.map((item: ColumnInterface) => (
            <li key={item.id}>
              <BoardColumn data={item} boardId={currentBoard.id} />
            </li>
          ))}
        </ul>
      </main>
      {createColumnModalWindow && <CreateNewColumn setState={setCreateColumnModalWindow} boardId={currentBoard.id} />}
    </>
  );
};

export { BoardPage };
