import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { createTask as createTaskAPI } from 'api/currentBoard';
import { createTask as createTaskAction } from 'store/slices/currentBoardSlice';
import { ModalWindowProps, ModalWindowModification } from './CreateNewTask.types';
import { RootState } from 'store/store';
import styles from './CreateNewTask.module.scss';
import { t } from 'i18next';

const CreateNewTask = ({ setState, boardId, columnId, tasksLength }: ModalWindowProps) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user!._id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ModalWindowModification>({ reValidateMode: 'onSubmit' });

  const taskTitleValidate = {
    required: t("Title can't be empty"),
    maxLength: { value: 100, message: t('Title must be less than characters!', { val: 100 }) },
  };
  const taskDescriptionValidate = {
    required: t("Description can't be empty"),
    maxLength: { value: 1000, message: t('Description must be less than characters!', { val: 1000 }) },
  };

  const createTask = async (value: ModalWindowModification) => {
    const responseData = await createTaskAPI(
      boardId,
      columnId,
      value.taskTitle,
      value.taskDescription,
      tasksLength ? tasksLength + 1 : 1,
      userId
    );

    if (responseData) {
      dispatch(createTaskAction(responseData));
    }

    setState(false);
    resetField('taskTitle');
    resetField('taskDescription');
  };

  const modificationActions = {
    confirmAction: handleSubmit(createTask),
    closeWindow: () => {
      setState(false);
      resetField('taskTitle');
      resetField('taskDescription');
    },
  };

  return (
    <ModalWindow type="modification" actions={modificationActions}>
      <div className={styles.main}>
        <p className="modalDescription">{t('Create task')}</p>
        <div className={styles.inputField}>
          <label htmlFor="taskTitle">{t('Enter title:')}</label>
          <textarea
            className={`${styles.textareaTitle} ${errors.taskTitle ? `${styles.error}` : ''}`}
            id="taskTitle"
            {...register('taskTitle', taskTitleValidate)}
          />
        </div>
        {errors.taskTitle && <p className={styles.error}>{errors.taskTitle?.message}</p>}
        <div className={styles.inputField}>
          <label htmlFor="taskDescription">{t('Enter description:')}</label>
          <textarea
            className={`${styles.textareaDescription} ${errors.taskDescription ? `${styles.error}` : ''}`}
            id="taskDescription"
            {...register('taskDescription', taskDescriptionValidate)}
          />
        </div>
        {errors.taskDescription && <p className={styles.error}>{errors.taskDescription?.message}</p>}
      </div>
    </ModalWindow>
  );
};

export { CreateNewTask };
