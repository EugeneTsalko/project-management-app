import React from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { createColumn as createColumnAPI } from 'api/currentBoard';
import { createColumn as createColumnAction } from 'store/slices/currentBoardSlice';
import { ModalWindowModification, ModalWindowProps } from './CreateNewColumn.types';

import styles from './CreateNewColumn.module.scss';
import { useTranslation } from 'react-i18next';

const CreateNewColumn = ({ setState, boardId, columnsLength }: ModalWindowProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ModalWindowModification>({ reValidateMode: 'onSubmit' });

  const columnTitleValidate = {
    required: t("Title can't be empty"),
    maxLength: { value: 100, message: t('Title must be less than characters!', { val: 100 }) },
  };

  const createColumn = async (value: ModalWindowModification) => {
    const responseData = await createColumnAPI(boardId, value.columnTitle, columnsLength ? columnsLength + 1 : 1);
    if (responseData) {
      dispatch(createColumnAction(responseData));
    }
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
      <div className={styles.main}>
        <p className="modalDescription">{t('Create column')}</p>
        <div className={styles.inputField}>
          <label htmlFor="columnTitle">{t('Enter title:')}</label>
          <textarea
            className={`${errors.columnTitle ? `${styles.textarea} ${styles.error}` : styles.textarea}`}
            id="columnTitle"
            {...register('columnTitle', columnTitleValidate)}
          />
        </div>
        {errors.columnTitle && <p className={styles.error}>{errors.columnTitle?.message}</p>}
      </div>
    </ModalWindow>
  );
};

export { CreateNewColumn };
