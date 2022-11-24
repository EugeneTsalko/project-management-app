import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { createColumn as createColumnAPI } from 'api/boards';
import { createColumn as createColumnAction } from 'store/dataSlice';
import { ModalWindowModification, ModalWindowProps } from './CreateNewColumn.types';

// import styles from './CreateNewColumn.module.scss';

const CreateNewColumn = ({ setState, boardId, token }: ModalWindowProps) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ModalWindowModification>({ reValidateMode: 'onSubmit' });

  const columnTitleValidate = { required: true, minLength: 3, maxLength: 50 };

  const createColumn = async (value: ModalWindowModification) => {
    const responseData = await createColumnAPI(boardId, value.columnTitle, token);
    dispatch(createColumnAction(responseData));
    setState(false);
    resetField('columnTitle');
  };

  const modificationActions = {
    confirmAction: handleSubmit(createColumn),
    closeWindow: () => {
      setState(false);
      resetField('columnTitle');
    },
  };

  return (
    <ModalWindow type="modification" actions={modificationActions}>
      <p className="modalDescription">Create new column.</p>
      <input className="" type="text" id="columnTitle" {...register('columnTitle', columnTitleValidate)} />
      {errors.columnTitle && <p className="">Title must be more than 3 characters and less than 50.</p>}
    </ModalWindow>
  );
};

export { CreateNewColumn };
