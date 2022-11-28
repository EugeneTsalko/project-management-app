import React from 'react';

import { useDispatch } from 'react-redux';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { removeTask as removeTaskAPI } from 'api/currentBoard';
import { removeTask as removeTaskAction } from 'store/slices/currentBoardSlice';
import { ModalWindowProps } from './RemoveTask.types';

const RemoveTask = ({ setState, boardId, columnId, taskId }: ModalWindowProps) => {
  const dispatch = useDispatch();

  const removeTask = async () => {
    const response = await removeTaskAPI(boardId, columnId, taskId);

    if (response.status === 204) {
      dispatch(removeTaskAction({ columnId, taskId }));
    }
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
