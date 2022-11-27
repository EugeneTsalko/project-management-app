import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { updateTask as updateTaskAPI } from 'api/currentBoard';
import { updateTask as updateTaskAction } from 'store/slices/currentBoardSlice';
import { ModalWindowProps, ModalWindowModification } from './AboutTask.types';
import styles from './AboutTask.module.scss';

import { userId } from 'api/token';

const AboutTask = ({ setState, data, boardId, columnId }: ModalWindowProps) => {
  const dispatch = useDispatch();
  const [isEditTaskTitle, setIsEditTaskTitle] = useState(false);
  const [isEditTaskDescription, setIsEditTaskDescription] = useState(false);

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
      userId
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
    <ModalWindow type="information" actions={modificationActions}>
      <p className="modalDescription">About task.</p>

      <div className={styles.inputField}>
        <label htmlFor="taskTitle">Title:</label>
        {!isEditTaskTitle && (
          <>
            <p className={styles.columnTitle}>{data.title}</p>
            <button
              className={styles.editButton}
              type="button"
              aria-label="Edit"
              onClick={() => {
                setIsEditTaskTitle(true);
              }}
            >
              Edit
            </button>
          </>
        )}
        {isEditTaskTitle && (
          <>
            <textarea
              className={`${errors.taskTitle ? `${styles.textarea} ${styles.error}` : styles.textarea}`}
              id="taskTitle"
              {...register('taskTitle', taskTitleValidate)}
            />
            {errors.taskTitle && <p className={styles.error}>{errors.taskTitle?.message}</p>}
            <button
              className={styles.cancelButton}
              type="button"
              aria-label="Cancel"
              onClick={() => setIsEditTaskTitle(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <div className={styles.inputField}>
        <label htmlFor="taskDescription">Description:</label>
        {!isEditTaskDescription && (
          <>
            <p className={styles.columnDescription}>{data.description}</p>
            <button
              className={styles.editButton}
              type="button"
              aria-label="Edit"
              onClick={() => {
                setIsEditTaskDescription(true);
              }}
            >
              Edit
            </button>
          </>
        )}
        {isEditTaskDescription && (
          <>
            <textarea
              className={`${errors.taskDescription ? `${styles.textarea} ${styles.error}` : styles.textarea}`}
              id="taskDescription"
              {...register('taskDescription', taskDescriptionValidate)}
            />
            {errors.taskDescription && <p className={styles.error}>{errors.taskDescription?.message}</p>}
            <button
              className={styles.cancelButton}
              type="button"
              aria-label="Cancel"
              onClick={() => setIsEditTaskDescription(false)}
            >
              Cancel
            </button>
          </>
        )}
      </div>
      {(isEditTaskTitle || isEditTaskDescription) && (
        <button className={styles.sendButton} type="submit" aria-label="Send" onClick={handleSubmit(updateTask)}>
          Send
        </button>
      )}
    </ModalWindow>
  );
};

export { AboutTask };
