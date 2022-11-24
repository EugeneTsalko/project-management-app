import React, { FC } from 'react';
import styles from './index.module.scss';

import { RotatingLines } from 'react-loader-spinner';

const LoaderSpinner: FC<{ full?: boolean }> = ({ full = false }) => {
  return (
    <div className={full ? `${styles.block} ${styles.full}` : `${styles.block}`}>
      <RotatingLines strokeColor="grey" strokeWidth="3" animationDuration="0.75" width="44" visible={true} />
    </div>
  );
};

export default LoaderSpinner;
