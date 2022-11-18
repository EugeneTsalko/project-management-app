import React from 'react';

import { useParams } from 'react-router-dom';

import styles from './BoardPage.module.scss';

const BoardPage = () => {
  const { id } = useParams();
  return <p className={styles.p}>Board page - {id}</p>;
};

export default BoardPage;
