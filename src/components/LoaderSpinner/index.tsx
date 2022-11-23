import React from 'react';
import styles from './index.module.scss';

import { RotatingLines } from 'react-loader-spinner';

const LoaderSpinner = () => {
  return (
    <div className={styles.block}>
      <RotatingLines strokeColor="grey" strokeWidth="3" animationDuration="0.75" width="44" visible={true} />
    </div>
  );
};

export default LoaderSpinner;
