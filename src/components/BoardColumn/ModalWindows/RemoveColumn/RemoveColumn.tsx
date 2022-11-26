import React from 'react';

import { useDispatch } from 'react-redux';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { removeColumn as removeColumnAPI } from 'api/currentBoard';
import { removeColumn as removeColumnAction } from 'store/slices/currentBoardSlice';
import { ModalWindowProps } from './RemoveColumn.types';

const RemoveColumn = ({ setState, boardId, columnId }: ModalWindowProps) => {
  const dispatch = useDispatch();

  const removeColumn = () => {
    removeColumnAPI(boardId, columnId);
    dispatch(removeColumnAction(columnId));
  };

  const confirmationActions = {
    confirmAction: removeColumn,
    closeWindow: () => setState(false),
  };

  return (
    <ModalWindow type="confirmation" actions={confirmationActions}>
      <p className="modalDescription">The column will be removed. Are you sure?</p>
    </ModalWindow>
  );
};

export { RemoveColumn };
