import React from 'react';

import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { createTask as createTaskAPI } from 'api/currentBoard';
import { createTask as createTaskAction } from 'store/slices/currentBoardSlice';
import { ModalWindowProps, ModalWindowModification } from './CreateNewTask.types';
import styles from './CreateNewTask.module.scss';

import { token, userId } from 'api/token';

const CreateNewTask = ({ setState, boardId, columnId }: ModalWindowProps) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ModalWindowModification>({ reValidateMode: 'onSubmit' });

  const taskTitleValidate = {
    required: "Title can't be empty",
    maxLength: { value: 100, message: 'Title must be less than 100 letters.' },
  };
  const taskDescriptionValidate = {
    required: "Description can't be empty",
    maxLength: { value: 400, message: 'Description must be less than 400 letters.' },
  };

  const createTask = async (value: ModalWindowModification) => {
    const responseData = await createTaskAPI(boardId, columnId, value.taskTitle, value.taskDescription, userId, token);
    dispatch(createTaskAction(responseData));
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
      <p className="modalDescription">Create new task.</p>
      <div className={styles.inputField}>
        <label htmlFor="taskTitle">Enter title:</label>
        <textarea
          className={`${errors.taskTitle ? `${styles.textarea} ${styles.error}` : styles.textarea}`}
          id="taskTitle"
          {...register('taskTitle', taskTitleValidate)}
        />
      </div>
      {errors.taskTitle && <p className={styles.error}>{errors.taskTitle?.message}</p>}
      <div className={styles.inputField}>
        <label htmlFor="taskDescription">Enter description:</label>
        <textarea
          className={`${errors.taskDescription ? `${styles.textarea} ${styles.error}` : styles.textarea}`}
          id="taskDescription"
          {...register('taskDescription', taskDescriptionValidate)}
        />
      </div>
      {errors.taskDescription && <p className={styles.error}>{errors.taskDescription?.message}</p>}
    </ModalWindow>
  );
};

export { CreateNewTask };
