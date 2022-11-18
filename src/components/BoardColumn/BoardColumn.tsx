import React from 'react';

import { BoardTask } from './BoardTask/BoardTask';
import styles from './BoardColumn.module.scss';

const BoardColumn = () => {
  return (
    <div className={styles.column}>
      <h3 className={styles.columnTitle}>Column title</h3>
      <div className={styles.taskContainer}>
        <BoardTask />
        <BoardTask />
        <BoardTask />
        <BoardTask />
        <BoardTask />
        <BoardTask />
        <BoardTask />
        <BoardTask />
        <BoardTask />
        <BoardTask />
      </div>
      <div className={styles.columnControl}>
        <button
          className={styles.deleteColumnButton}
          type="button"
          aria-label="Delete column"
          onClick={() => console.log('Column was deleted')}
        >
          X
        </button>
        <button
          className={styles.createTaskButton}
          type="button"
          aria-label="Create task"
          onClick={() => console.log('Task was created')}
        >
          Create task
        </button>
      </div>
    </div>
  );
};

export { BoardColumn };
