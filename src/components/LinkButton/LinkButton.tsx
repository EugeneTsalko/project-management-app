import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LinkButton.module.scss';

type Props = {
  path: string;
  text: string;
};

export const LinkButton = ({ path, text }: Props) => {
  return (
    <Link className={styles.linkBtn} to={path}>
      {text}
    </Link>
  );
};
