import React from 'react';

import { useDispatch } from 'react-redux';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { removeColumn as removeColumnAPI } from 'api/currentBoard';
import { removeColumn as removeColumnAction } from 'store/slices/currentBoardSlice';
import { ModalWindowProps } from './RemoveColumn.types';
import { t } from 'i18next';

const RemoveColumn = ({ setState, boardId, columnId }: ModalWindowProps) => {
  const dispatch = useDispatch();

  const removeColumn = async () => {
    const response = await removeColumnAPI(boardId, columnId);

    if (response) {
      dispatch(removeColumnAction(columnId));
    }
  };

  const confirmationActions = {
    confirmAction: removeColumn,
    closeWindow: () => setState(false),
  };

  return (
    <ModalWindow type="confirmation" actions={confirmationActions}>
      <p className="modalDescription">{t('Are you sure you want to delete this column?')}</p>
    </ModalWindow>
  );
};

export { RemoveColumn };
