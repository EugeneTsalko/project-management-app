import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { BoardTask } from './BoardTask/BoardTask';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { removeColumn as removeColumnAPI, ColumnInterface } from 'api/boards';
import { removeColumn as removeColumnAction } from 'store/dataSlice';
import { StateInterface } from 'store/store.types';
import styles from './BoardColumn.module.scss';

import { token } from 'api/token';

const BoardColumn = ({ data }: { data: ColumnInterface }) => {
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: StateInterface) => state.data.currentBoard);
  const [isConfirmationModalWindow, setIsConfirmationModalWindow] = useState(false);

  const removeColumn = () => {
    dispatch(removeColumnAction(data.id));
    removeColumnAPI(currentBoard.id, data.id, token);
  };

  const confirmationActions = {
    confirmAction: removeColumn,
    closeWindow: () => setIsConfirmationModalWindow(false),
  };

  return (
    <>
      <div className={styles.column}>
        <h3 className={styles.columnTitle}>{data.title}</h3>
        <div className={styles.taskContainer}>
          {data.tasks.map((item) => (
            <BoardTask key={item.id} data={item} />
          ))}
        </div>
        <div className={styles.columnControl}>
          <button
            className={styles.deleteColumnButton}
            type="button"
            aria-label="Delete column"
            onClick={() => setIsConfirmationModalWindow(true)}
          >
            X
          </button>
          <button
            className={styles.createTaskButton}
            type="button"
            aria-label="Create task"
            onClick={() => console.log('Task was created', data.id)}
          >
            Create task
          </button>
        </div>
      </div>
      {isConfirmationModalWindow && (
        <ModalWindow type="confirmation" actions={confirmationActions}>
          <p className="modalDescription">{data.title} will be removed. Are you sure?</p>
        </ModalWindow>
      )}
    </>
  );
};

export { BoardColumn };
