import React, { useEffect, useRef, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentBoard } from 'store/dataSlice';
import { BoardColumn } from 'components/BoardColumn/BoardColumn';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { getBoard, createColumn as createColumnAPI, ColumnInterface } from 'api/boards';
import { createColumn as createColumnAction } from 'store/dataSlice';
import { StateInterface } from 'store/store.types';
import styles from './BoardPage.module.scss';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYjViYzdkOC0wYjVlLTQ1NDQtOTU5My1iYTcyZmJhYmY1NDAiLCJsb2dpbiI6InZpdGFsaSIsImlhdCI6MTY2OTExMzQ3Mn0.HxZyLBx2BGKnHYS0z8-9BjlHn7HIdAiEn4R4oSn-yMk';

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: StateInterface) => state.data.currentBoard);
  const { id } = useParams();
  const columnTitle: React.RefObject<HTMLInputElement> = useRef(null);

  const [isLoading, setLoading] = useState(true);
  const [isModificationModalWindow, setIsModificationModalWindow] = useState(false);

  const createColumn = async () => {
    if (columnTitle.current) {
      const data = await createColumnAPI(currentBoard.id, columnTitle.current.value, token);
      dispatch(createColumnAction(data));
    }
  };

  const modificationActions = {
    confirmAction: createColumn,
    closeWindow: () => setIsModificationModalWindow(false),
  };

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
            onClick={() => setIsModificationModalWindow(true)}
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
      {isModificationModalWindow && (
        <ModalWindow type="modification" actions={modificationActions}>
          <p className="modalDescription">Create new column.</p>
          <input className="" type="text" ref={columnTitle} autoFocus />
        </ModalWindow>
      )}
    </>
  );
};

export { BoardPage };
