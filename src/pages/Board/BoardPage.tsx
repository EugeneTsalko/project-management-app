import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BoardColumn } from 'components/BoardColumn/BoardColumn';
import { CreateNewColumn } from './ModalWindows/CreateNewColumn';
import LoaderSpinner from 'components/LoaderSpinner';
import { Button } from 'components/Button/Button';
import { getColumns as getColumnsAPI, getAllTasks as getAllTasksAPI } from 'api/currentBoard';
import { setColumns as setColumnsAction, setTasks as setTasksAction } from 'store/slices/currentBoardSlice';
import { ColumnInterface } from 'api/currentBoard/index.types';
import { useTranslation } from 'react-i18next';
import { RootState } from 'store/store';
import styles from './BoardPage.module.scss';

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const allBoards = useSelector((state: RootState) => state.boards.boards);
  const boardColumns = useSelector((state: RootState) => state.currentBoard.columns);
  const { boardId } = useParams();
  const currentBoard = allBoards.find((board) => board._id === (boardId as string));

  const [isLoading, setIsLoading] = useState(true);
  const [createColumnModalWindow, setCreateColumnModalWindow] = useState(false);

  const loadBoard = async () => {
    setIsLoading(true);

    if (!currentBoard) {
      navigate('/boards');
      return;
    }

    const columns = await getColumnsAPI(boardId as string);
    if (columns) {
      dispatch(setColumnsAction(columns));

      const tasks = await getAllTasksAPI(columns);
      if (tasks) {
        dispatch(setTasksAction(tasks));
      }
    }

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
          <h2 className={styles.boardTitle}>{currentBoard!.title}</h2>
          <Button text={t('Close Board')} type="button" style="closeBoard" onClick={() => navigate(-1)} />
          <Button
            text={t('Create column')}
            type="button"
            style="createColumn"
            onClick={() => setCreateColumnModalWindow(true)}
          />
        </header>
        <ul className={styles.columnList}>
          {boardColumns.map((item: ColumnInterface) => (
            <li key={item._id}>
              <BoardColumn data={item} boardId={boardId as string} />
            </li>
          ))}
        </ul>
      </main>
      {createColumnModalWindow && <CreateNewColumn setState={setCreateColumnModalWindow} boardId={boardId as string} />}
    </>
  );
};

export { BoardPage };
