import React, { useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import { BoardTask } from './BoardTask/BoardTask';
import { RemoveColumn } from './ModalWindows/RemoveColumn/RemoveColumn';
import { CreateNewTask } from './ModalWindows/CreateNewTask/CreateNewTask';
import { ColumnInterface, updateColumn as updateColumnAPI } from 'api/boards';
import { updateColumn as updateColumnAction } from 'store/dataSlice';
import styles from './BoardColumn.module.scss';

import { token } from 'api/token';

const BoardColumn = ({ data, boardId }: { data: ColumnInterface; boardId: string }) => {
  const dispatch = useDispatch();
  const [removeColumnModalWindow, setRemoveColumnModalWindow] = useState(false);
  const [newTaskModalWindow, setNewTaskModalWindow] = useState(false);
  const [isEditColumnTitle, setIsEditColumnTitle] = useState(false);
  const columnTitle = useRef(null) as React.RefObject<HTMLTextAreaElement>;

  const setColumnTitle = async () => {
    if (columnTitle.current) {
      const title = columnTitle.current.value;

      if (!title.trim().length) {
        return;
      }

      const responseData = await updateColumnAPI(boardId, data.id, title, data.order, token);
      dispatch(updateColumnAction(responseData));
    }
    setIsEditColumnTitle(false);
  };

  return (
    <>
      <div className={styles.column}>
        {!isEditColumnTitle && (
          <h3 className={styles.columnTitle} onClick={() => setIsEditColumnTitle(true)}>
            {data.title}
          </h3>
        )}
        {isEditColumnTitle && (
          <div className={styles.editColumnTitle}>
            <textarea defaultValue={data.title} ref={columnTitle} />
            <div>
              <button className={styles.sendButton} type="button" aria-label="Send" onClick={setColumnTitle}>
                Send
              </button>
              <button
                className={styles.cancelButton}
                type="button"
                aria-label="Cancel"
                onClick={() => setIsEditColumnTitle(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className={styles.taskContainer}>
          {data.tasks.map((item) => (
            <BoardTask key={item.id} data={item} boardId={boardId} columnId={data.id} />
          ))}
        </div>
        <div className={styles.columnControl}>
          <button
            className={styles.deleteColumnButton}
            type="button"
            aria-label="Delete column"
            onClick={() => setRemoveColumnModalWindow(true)}
          >
            X
          </button>
          <button
            className={styles.createTaskButton}
            type="button"
            aria-label="Create task"
            onClick={() => setNewTaskModalWindow(true)}
          >
            Create task
          </button>
        </div>
      </div>
      {removeColumnModalWindow && (
        <RemoveColumn setState={setRemoveColumnModalWindow} boardId={boardId} columnId={data.id} />
      )}
      {newTaskModalWindow && <CreateNewTask setState={setNewTaskModalWindow} boardId={boardId} columnId={data.id} />}
    </>
  );
};

export { BoardColumn };
