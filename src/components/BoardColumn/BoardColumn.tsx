import React from 'react';

import { BoardTask } from './BoardTask/BoardTask';
import styles from './BoardColumn.module.scss';
import { Column } from 'api/boardsApi.types';

const BoardColumn = ({ data }: { data: Column }) => {
  return (
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
