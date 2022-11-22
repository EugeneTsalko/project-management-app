import React, { useState } from 'react';

import { BoardTask } from './BoardTask/BoardTask';
import { deleteColumn } from 'api/boards';
import { Column } from 'api/boards/boardsApi.types';
import styles from './BoardColumn.module.scss';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { useDispatch, useSelector } from 'react-redux';
import { removeColumn as removeColumnAction } from 'store/dataSlice';
import { State } from 'store/store.types';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxYjViYzdkOC0wYjVlLTQ1NDQtOTU5My1iYTcyZmJhYmY1NDAiLCJsb2dpbiI6InZpdGFsaSIsImlhdCI6MTY2OTEwNjczMn0.PWYfhTDgCFlk5BiUYeuw-bGfa2hFbNMKXvrfhiWu-kw';

const BoardColumn = ({ data }: { data: Column }) => {
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: State) => state.data.currentBoard);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const removeColumn = () => {
    dispatch(removeColumnAction(data.id));
    deleteColumn(currentBoard.id, data.id, token);
  };

  const confirmationActions = {
    confirmAction: removeColumn,
    closeWindow: () => setIsDisplayed(false),
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
            onClick={() => {
              console.log('Column was deleted', data.id);
              setIsDisplayed(true);
            }}
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
      {isDisplayed && (
        <ModalWindow type="confirmation" actions={confirmationActions}>
          <p className="modalDescription">Delete column {data.title}. Are you sure?</p>
        </ModalWindow>
      )}
    </>
  );
};

export { BoardColumn };
