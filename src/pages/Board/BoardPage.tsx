import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { BoardColumn } from 'components/BoardColumn/BoardColumn';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { getBoard, createColumn as createColumnAPI, ColumnInterface } from 'api/boards';
import { setCurrentBoard } from 'store/dataSlice';
import { createColumn as createColumnAction } from 'store/dataSlice';
import { ModalWindowModification } from './BoardPage.types';
import { StateInterface } from 'store/store.types';
import styles from './BoardPage.module.scss';

import { token } from 'api/token';

const INITIAL_STATE = {
  isLoading: true,
  isModificationModalWindow: false,
};

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: StateInterface) => state.data.currentBoard);
  const { id } = useParams();

  const [state, setState] = useState(INITIAL_STATE);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ModalWindowModification>({ reValidateMode: 'onSubmit' });

  const columnTitleValidate = { required: true, minLength: 3, maxLength: 50 };

  const createColumn = async (value: ModalWindowModification) => {
    const responseData = await createColumnAPI(currentBoard.id, value.columnTitle, token);
    dispatch(createColumnAction(responseData));
    setState({ ...state, isModificationModalWindow: false });
    resetField('columnTitle');
  };

  const modificationActions = {
    confirmAction: handleSubmit(createColumn),
    closeWindow: () => {
      setState({ ...state, isModificationModalWindow: false });
      resetField('columnTitle');
    },
  };

  const loadBoard = async () => {
    setState({ ...state, isLoading: true });
    const responseData = await getBoard(id as string, token);
    dispatch(setCurrentBoard(responseData));

    setState({ ...state, isLoading: false });
  };

  useEffect(() => {
    loadBoard();
  }, []);

  if (state.isLoading) {
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
            onClick={() => setState({ ...state, isModificationModalWindow: true })}
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
      {state.isModificationModalWindow && (
        <ModalWindow type="modification" actions={modificationActions}>
          <p className="modalDescription">Create new column.</p>
          <input className="" type="text" id="columnTitle" {...register('columnTitle', columnTitleValidate)} />
          {errors.columnTitle && <p className="">Title must be more than 3 characters and less than 50.</p>}
        </ModalWindow>
      )}
    </>
  );
};

export { BoardPage };
