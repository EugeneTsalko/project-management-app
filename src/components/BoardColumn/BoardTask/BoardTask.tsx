import React from 'react';

import styles from './BoardTask.module.scss';
import { Task } from 'api/boardsApi.types';

const BoardTask = ({ data }: { data: Task }) => {
  return <p className={styles.task}>{data.title}</p>;
};

export { BoardTask };
