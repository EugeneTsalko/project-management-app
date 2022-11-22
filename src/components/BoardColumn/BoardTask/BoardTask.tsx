import React from 'react';

import styles from './BoardTask.module.scss';
import { TaskInterface } from 'api/boards';

const BoardTask = ({ data }: { data: TaskInterface }) => {
  return <p className={styles.task}>{data.title}</p>;
};

export { BoardTask };
