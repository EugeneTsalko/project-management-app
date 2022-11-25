import React, { useState } from 'react';

import { RemoveTask } from './ModalWindows/RemoveTask/RemoveTask';
import { UpdateTask } from './ModalWindows/UpdateTask/UpdateTask';
import { BoardTaskProps } from './BoardTask.types';
import styles from './BoardTask.module.scss';

const BoardTask = ({ data, boardId, columnId }: BoardTaskProps) => {
  const [isTaskHover, setTaskHover] = useState(false);
  const [removeTaskModalWindow, setRemoveTaskModalWindow] = useState(false);
  const [updateTaskModalWindow, setUpdateTaskModalWindow] = useState(false);

  return (
    <>
      <div className={styles.main} onMouseEnter={() => setTaskHover(true)} onMouseLeave={() => setTaskHover(false)}>
        <p className={styles.task} onClick={() => setUpdateTaskModalWindow(true)}>
          {data.title}
        </p>
        {isTaskHover && (
          <button className={styles.deleteTaskButton} type="button" onClick={() => setRemoveTaskModalWindow(true)}>
            X
          </button>
        )}
      </div>
      {removeTaskModalWindow && (
        <RemoveTask setState={setRemoveTaskModalWindow} boardId={boardId} columnId={columnId} taskId={data.id} />
      )}
      {updateTaskModalWindow && (
        <UpdateTask setState={setUpdateTaskModalWindow} data={data} boardId={boardId} columnId={columnId} />
      )}
    </>
  );
};

export { BoardTask };
