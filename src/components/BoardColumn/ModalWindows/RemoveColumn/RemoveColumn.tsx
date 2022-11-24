import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { removeColumn as removeColumnAPI } from 'api/boards';
import { removeColumn as removeColumnAction } from 'store/dataSlice';
import { StateInterface } from 'store/store.types';
import { ModalWindowProps } from './RemoveColumn.types';
// import styles from './RemoveColumn.module.scss';

import { token } from 'api/token';

const CreateNewColumn = ({ setState, columnData }: ModalWindowProps) => {
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: StateInterface) => state.data.currentBoard);

  const removeColumn = () => {
    dispatch(removeColumnAction(columnData.id));
    removeColumnAPI(currentBoard.id, columnData.id, token);
  };

  const confirmationActions = {
    confirmAction: removeColumn,
    closeWindow: () => setState(false),
  };

  return (
    <ModalWindow type="confirmation" actions={confirmationActions}>
      <p className="modalDescription">Column {columnData.title} will be removed.</p>
      <p className="modalDescription">Are you sure?</p>
    </ModalWindow>
  );
};

export { CreateNewColumn };
