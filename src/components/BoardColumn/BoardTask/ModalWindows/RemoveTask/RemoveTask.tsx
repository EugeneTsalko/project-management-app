import React from 'react';

import { useDispatch } from 'react-redux';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { removeTask as removeTaskAPI } from 'api/currentBoard';
import { removeTask as removeTaskAction } from 'store/slices/currentBoardSlice';
import { ModalWindowProps } from './RemoveTask.types';
import { t } from 'i18next';

const RemoveTask = ({ setState, boardId, columnId, taskId }: ModalWindowProps) => {
  const dispatch = useDispatch();

  const removeTask = async () => {
    const response = await removeTaskAPI(boardId, columnId, taskId);

    if (response) {
      dispatch(removeTaskAction({ columnId, taskId }));
    }
  };

  const confirmationActions = {
    confirmAction: removeTask,
    closeWindow: () => setState(false),
  };

  return (
    <ModalWindow type="confirmation" actions={confirmationActions}>
      <p className="modalDescription">{t('Are you sure you want to delete this task?')}</p>
    </ModalWindow>
  );
};

export { RemoveTask };
