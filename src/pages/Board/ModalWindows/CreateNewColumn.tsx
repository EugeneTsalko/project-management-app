import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { createColumn as createColumnAPI } from 'api/boards';
import { createColumn as createColumnAction } from 'store/dataSlice';
import { ModalWindowModification, ModalWindowProps } from './CreateNewColumn.types';

import styles from './CreateNewColumn.module.scss';

const CreateNewColumn = ({ setState, boardId, token }: ModalWindowProps) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ModalWindowModification>({ reValidateMode: 'onSubmit' });

  const columnTitleValidate = {
    required: "Title can't be empty",
    maxLength: { value: 100, message: 'Title must be less than 100 letters.' },
  };

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
      <div className={styles.inputField}>
        <label htmlFor="columnTitle">Enter title:</label>
        <textarea
          className={`${errors.columnTitle ? `${styles.textarea} ${styles.error}` : styles.textarea}`}
          id="columnTitle"
          {...register('columnTitle', columnTitleValidate)}
        />
      </div>
      {errors.columnTitle && <p className={styles.error}>{errors.columnTitle?.message}</p>}
    </ModalWindow>
  );
};

export { CreateNewColumn };
