import React from 'react';

import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { updateTask as updateTaskAPI } from 'api/boards';
import { updateTask as updateTaskAction } from 'store/dataSlice';
import { ModalWindowProps, ModalWindowModification } from './UpdateTask.types';
import styles from './UpdateTask.module.scss';

import { token, userId } from 'api/token';

const UpdateTask = ({ setState, data, boardId, columnId }: ModalWindowProps) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ModalWindowModification>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      taskTitle: data.title,
      taskDescription: data.description,
    },
  });

  const taskTitleValidate = {
    required: "Title can't be empty",
    maxLength: { value: 100, message: 'Title must be less than 100 letters.' },
  };
  const taskDescriptionValidate = {
    required: "Description can't be empty",
    maxLength: { value: 400, message: 'Description must be less than 400 letters.' },
  };

  const updateTask = async (value: ModalWindowModification) => {
    const responseData = await updateTaskAPI(
      boardId,
      columnId,
      data.id,
      value.taskTitle,
      value.taskDescription,
      data.order,
      userId,
      token
    );
    dispatch(updateTaskAction(responseData));

    setState(false);
    resetField('taskTitle');
    resetField('taskDescription');
  };

  const modificationActions = {
    confirmAction: handleSubmit(updateTask),
    closeWindow: () => {
      setState(false);
      resetField('taskTitle');
      resetField('taskDescription');
    },
  };

  return (
    <ModalWindow type="modification" actions={modificationActions}>
      <p className="modalDescription">About task.</p>
      <div className={styles.inputField}>
        <label htmlFor="taskTitle">Title:</label>
        <textarea
          className={`${errors.taskTitle ? `${styles.textarea} ${styles.error}` : styles.textarea}`}
          id="taskTitle"
          {...register('taskTitle', taskTitleValidate)}
        />
      </div>
      {errors.taskTitle && <p className={styles.error}>{errors.taskTitle?.message}</p>}
      <div className={styles.inputField}>
        <label htmlFor="taskDescription">Description:</label>
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

export { UpdateTask };
