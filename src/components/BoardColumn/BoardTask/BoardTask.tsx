import React, { useState } from 'react';

import { CSSTransition } from 'react-transition-group';

import { RemoveTask } from './ModalWindows/RemoveTask/RemoveTask';
import { AboutTask } from './ModalWindows/AboutTask/AboutTask';
import { IoTrash } from 'react-icons/io5';
import { BoardTaskProps } from './BoardTask.types';
import styles from './BoardTask.module.scss';

const BoardTask = ({ data, boardId, columnId }: BoardTaskProps) => {
  const [isTaskHover, setTaskHover] = useState(false);
  const [removeTaskModalWindow, setRemoveTaskModalWindow] = useState(false);
  const [aboutTaskModalWindow, setAboutTaskModalWindow] = useState(false);

  const deleteButton = React.useRef(null);

  return (
    <>
      <div className={styles.main} onMouseEnter={() => setTaskHover(true)} onMouseLeave={() => setTaskHover(false)}>
        <p className={styles.task} onClick={() => setAboutTaskModalWindow(true)}>
          {data.title}
        </p>

        <CSSTransition
          nodeRef={deleteButton}
          in={isTaskHover}
          timeout={200}
          classNames={{
            enter: styles.deleteTaskButtonEnter,
            enterActive: styles.deleteTaskButtonEnterActive,
            exit: styles.deleteTaskButtonExit,
            exitActive: styles.deleteTaskButtonExitActive,
          }}
          unmountOnExit
        >
          <button
            ref={deleteButton}
            className={styles.deleteTaskButton}
            type="button"
            onClick={() => setRemoveTaskModalWindow(true)}
          >
            <IoTrash />
          </button>
        </CSSTransition>
      </div>
      {removeTaskModalWindow && (
        <RemoveTask setState={setRemoveTaskModalWindow} boardId={boardId} columnId={columnId} taskId={data._id} />
      )}
      {aboutTaskModalWindow && (
        <AboutTask setState={setAboutTaskModalWindow} data={data} boardId={boardId} columnId={columnId} />
      )}
    </>
  );
};

export { BoardTask };
