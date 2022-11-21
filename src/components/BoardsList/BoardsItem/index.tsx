import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { IBoards } from 'api/boards/index.types';
import styles from './index.module.scss';

const BoardsItem: FC<IBoards> = ({ id, title, description }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(`/boards/${id}`)}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <div className={styles.buttons}>
        <button onClick={(e) => e.stopPropagation()}>Delete</button>
        <button onClick={(e) => e.stopPropagation()}>Edit</button>
      </div>
    </div>
  );
};

export default BoardsItem;
