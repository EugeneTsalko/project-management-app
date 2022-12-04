import React, { useRef, useState } from 'react';

import { useDispatch } from 'react-redux';

import { BoardTask } from './BoardTask/BoardTask';
import { RemoveColumn } from './ModalWindows/RemoveColumn/RemoveColumn';
import { CreateNewTask } from './ModalWindows/CreateNewTask/CreateNewTask';
import { Button } from 'components/Button/Button';
import { IoTrash } from 'react-icons/io5';
import { updateColumn as updateColumnAPI } from 'api/currentBoard';
import { ColumnInterface } from 'api/currentBoard/index.types';
import { updateColumn as updateColumnAction } from 'store/slices/currentBoardSlice';

import styles from './BoardColumn.module.scss';
import { t } from 'i18next';

const BoardColumn = ({ data, boardId }: { data: ColumnInterface; boardId: string }) => {
  const dispatch = useDispatch();

  const [removeColumnModalWindow, setRemoveColumnModalWindow] = useState(false);
  const [newTaskModalWindow, setNewTaskModalWindow] = useState(false);
  const [isEditColumnTitle, setIsEditColumnTitle] = useState(false);
  const columnTitle = useRef(null) as React.RefObject<HTMLTextAreaElement>;

  const setColumnTitle = async () => {
    const title = columnTitle.current!.value;

    if (!title.trim().length) {
      return;
    }

    const responseData = await updateColumnAPI(boardId, data._id, title, data.order);

    if (responseData) {
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
              <Button text={t('Send')} type="button" style="sendColumnTitle" onClick={setColumnTitle} />
              <Button
                text={t('Cancel')}
                type="button"
                style="denyColumnTitle"
                onClick={() => setIsEditColumnTitle(false)}
              />
            </div>
          </div>
        )}
        <ul className={styles.taskList}>
          {data.tasks.map((item) => (
            <li key={item.id}>
              <BoardTask data={item} boardId={boardId} columnId={data._id} />
            </li>
          ))}
        </ul>
        <div className={styles.columnControl}>
          <button
            className={styles.deleteColumnButton}
            type="button"
            aria-label="Delete column"
            onClick={() => setRemoveColumnModalWindow(true)}
          >
            <IoTrash />
          </button>
          <Button
            text={t('Create task')}
            type="button"
            style="createTask"
            onClick={() => setNewTaskModalWindow(true)}
          />
        </div>
      </div>
      {removeColumnModalWindow && (
        <RemoveColumn setState={setRemoveColumnModalWindow} boardId={boardId} columnId={data._id} />
      )}
      {newTaskModalWindow && <CreateNewTask setState={setNewTaskModalWindow} boardId={boardId} columnId={data._id} />}
    </>
  );
};

export { BoardColumn };
