import React, { useState } from 'react';

import { RemoveTask } from './ModalWindows/RemoveTask/RemoveTask';
import { AboutTask } from './ModalWindows/AboutTask/AboutTask';
import { IoTrash } from 'react-icons/io5';
import { BoardTaskProps } from './BoardTask.types';
import styles from './BoardTask.module.scss';

const BoardTask = ({ data, boardId, columnId }: BoardTaskProps) => {
  const [isTaskHover, setTaskHover] = useState(false);
  const [removeTaskModalWindow, setRemoveTaskModalWindow] = useState(false);
  const [aboutTaskModalWindow, setAboutTaskModalWindow] = useState(false);

  return (
    <>
      <div className={styles.main} onMouseEnter={() => setTaskHover(true)} onMouseLeave={() => setTaskHover(false)}>
        <p className={styles.task} onClick={() => setAboutTaskModalWindow(true)}>
          {data.title}
        </p>
        {isTaskHover && (
          <button className={styles.deleteTaskButton} type="button" onClick={() => setRemoveTaskModalWindow(true)}>
            <IoTrash />
          </button>
        )}
      </div>
      {removeTaskModalWindow && (
        <RemoveTask setState={setRemoveTaskModalWindow} boardId={boardId} columnId={columnId} taskId={data.id} />
      )}
      {aboutTaskModalWindow && (
        <AboutTask setState={setAboutTaskModalWindow} data={data} boardId={boardId} columnId={columnId} />
      )}
    </>
  );
};

export { BoardTask };
