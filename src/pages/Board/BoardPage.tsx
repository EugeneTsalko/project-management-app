import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BoardColumn } from 'components/BoardColumn/BoardColumn';
import { CreateNewColumn } from './ModalWindows/CreateNewColumn';
import LoaderSpinner from 'components/LoaderSpinner';
import { Button } from 'components/Button/Button';
import { getBoard } from 'api/currentBoard';
import { ColumnInterface } from 'api/currentBoard/index.types';
import { setCurrentBoard } from 'store/slices/currentBoardSlice';
import { useTranslation } from 'react-i18next';
import { RootState } from 'store/store';
import styles from './BoardPage.module.scss';

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: RootState) => state.currentBoard);
  const { id } = useParams();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [createColumnModalWindow, setCreateColumnModalWindow] = useState(false);

  const loadBoard = async () => {
    setIsLoading(true);
    const responseData = await getBoard(id as string);

    if (!responseData) {
      navigate('/boards');
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
          <Button text={t('Close Board')} type="button" style="closeBoard" onClick={() => navigate(-1)} />
          <Button
            text={t('Create column')}
            type="button"
            style="createColumn"
            onClick={() => setCreateColumnModalWindow(true)}
          />
        </header>
        <ul className={styles.columnList}>
          {currentBoard.columns.map((item: ColumnInterface) => (
            <li key={item._id}>
              <BoardColumn data={item} boardId={currentBoard._id} />
            </li>
          ))}
        </ul>
      </main>
      {createColumnModalWindow && <CreateNewColumn setState={setCreateColumnModalWindow} boardId={currentBoard._id} />}
    </>
  );
};

export { BoardPage };
