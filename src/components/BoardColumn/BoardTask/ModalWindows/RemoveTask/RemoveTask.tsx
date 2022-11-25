import React from 'react';

import { useDispatch } from 'react-redux';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { removeTask as removeTaskAPI } from 'api/boards';
import { removeTask as removeTaskAction } from 'store/dataSlice';
import { ModalWindowProps } from './RemoveTask.types';

import { token } from 'api/token';

const RemoveTask = ({ setState, boardId, columnId, taskId }: ModalWindowProps) => {
  const dispatch = useDispatch();

  const removeTask = () => {
    dispatch(removeTaskAction({ columnId, taskId }));
    removeTaskAPI(boardId, columnId, taskId, token);
  };

  const confirmationActions = {
    confirmAction: removeTask,
    closeWindow: () => setState(false),
  };

  return (
    <ModalWindow type="confirmation" actions={confirmationActions}>
      <p className="modalDescription">The task will be removed. Are you sure?</p>
    </ModalWindow>
  );
};

export { RemoveTask };
