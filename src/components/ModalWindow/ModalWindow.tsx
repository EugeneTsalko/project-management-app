import React from 'react';

import styles from './ModalWindow.module.scss';
import { ModalWindowProps } from './ModalWindow.types';

const ModalWindow = ({ confirmAction, denyAction, children }: ModalWindowProps) => {
  const handleClickDeny = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    const { target } = event;

    if ((target as HTMLElement).id === 'modalWindow' || (target as HTMLElement).id === 'denyButton') {
      denyAction();
    }
  };

  const handleClickConfirm = () => {
    confirmAction();
    denyAction();
  };

  return (
    <div
      id="modalWindow"
      className={styles.main}
      onClick={handleClickDeny}
      onKeyDown={handleClickDeny}
      role="presentation"
    >
      <div className={styles.container}>
        {children}
        <div className={styles.controls}>
          <button
            className={`${styles.button} ${styles.confirmButton}`}
            type="button"
            aria-label="Confirm"
            onClick={handleClickConfirm}
          >
            Confirm
          </button>
          <button
            className={`${styles.button} ${styles.denyButton}`}
            id="denyButton"
            type="button"
            aria-label="Deny"
            onClick={handleClickDeny}
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
};

export { ModalWindow };
