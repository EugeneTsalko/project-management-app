import React from 'react';

import { Button } from 'components/Button/Button';
import styles from './ModalWindow.module.scss';
import { ModalWindowProps } from './ModalWindow.types';

const ModalWindow = ({ type, actions, children }: ModalWindowProps) => {
  const handleClickCloseWindow = (event: React.SyntheticEvent) => {
    event.stopPropagation();
    const { target } = event;

    if ((target as HTMLElement).id === 'modalWindow' || (target as HTMLElement).id === 'denyButton') {
      actions.closeWindow();
    }
  };

  const handleClickConfirm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (actions.confirmAction) {
      actions.confirmAction();
    }
    actions.closeWindow();
  };

  return (
    <div
      id="modalWindow"
      className={styles.main}
      onClick={handleClickCloseWindow}
      onKeyDown={handleClickCloseWindow}
      role="presentation"
    >
      <form
        onSubmit={type === 'modification' ? actions.confirmAction : handleClickConfirm}
        className={styles.container}
      >
        {children}
        <div className={styles.controls}>
          {type === 'information' && (
            <Button
              id="denyButton"
              text="Close"
              type="button"
              style="denyModalWindow"
              onClick={handleClickCloseWindow}
            />
          )}

          {type !== 'information' && (
            <>
              <Button text={type === 'confirmation' ? 'Confirm' : 'Save'} type="submit" style="admitModalWindow" />
              <Button
                id="denyButton"
                text={type === 'confirmation' ? 'Deny' : 'Cancel'}
                type="button"
                style="denyModalWindow"
                onClick={handleClickCloseWindow}
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export { ModalWindow };
