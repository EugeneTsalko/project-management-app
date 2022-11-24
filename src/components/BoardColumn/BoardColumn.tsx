import React, { useState } from 'react';

import { BoardTask } from './BoardTask/BoardTask';
import { CreateNewColumn } from './ModalWindows/RemoveColumn/RemoveColumn';
import { CreateNewTask } from './ModalWindows/CreateNewTask/CreateNewTask';
import { ColumnInterface } from 'api/boards';
import styles from './BoardColumn.module.scss';

const BoardColumn = ({ data }: { data: ColumnInterface }) => {
  const [RemoveColumnModalWindow, setRemoveColumnModalWindow] = useState(false);
  const [NewTaskModalWindow, setNewTaskModalWindow] = useState(false);

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
      {RemoveColumnModalWindow && <CreateNewColumn setState={setRemoveColumnModalWindow} columnData={data} />}
      {NewTaskModalWindow && <CreateNewTask setState={setNewTaskModalWindow} columnData={data} />}
    </>
  );
};

export { BoardColumn };
