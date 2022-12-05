import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { Button } from 'components/Button/Button';
import { updateTask as updateTaskAPI } from 'api/currentBoard';
import { updateTask as updateTaskAction } from 'store/slices/currentBoardSlice';
import { ModalWindowProps, ModalWindowModification } from './AboutTask.types';
import { RootState } from 'store/store';
import styles from './AboutTask.module.scss';

const AboutTask = ({ setState, data, boardId, columnId }: ModalWindowProps) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.user!._id);
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
    required: t("Title can't be empty"),
    maxLength: { value: 100, message: t('Title must be less than characters!', { val: 100 }) },
  };
  const taskDescriptionValidate = {
    required: t("Description can't be empty"),
    maxLength: { value: 1000, message: t('Description must be less than characters!', { val: 1000 }) },
  };

  const updateTask = async (value: ModalWindowModification) => {
    const responseData = await updateTaskAPI(
      boardId,
      columnId,
      data._id,
      value.taskTitle,
      value.taskDescription,
      data.order,
      userId
    );
    if (responseData) {
      dispatch(updateTaskAction(responseData));
    }
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
      <div className={styles.main}>
        <p className="modalDescription">{t('About task')}</p>

        <div className={styles.inputField}>
          <label htmlFor="taskTitle">{t('Title')}</label>
          {!isEditTaskTitle && (
            <>
              <p className={styles.columnTitle}>{data.title}</p>
              <Button text={t('Edit')} type="button" style="editTask" onClick={() => setIsEditTaskTitle(true)} />
            </>
          )}
          {isEditTaskTitle && (
            <>
              <textarea
                className={`${styles.textareaTitle} ${errors.taskTitle ? `${styles.error}` : ''}`}
                id="taskTitle"
                {...register('taskTitle', taskTitleValidate)}
              />
              {errors.taskTitle && <p className={styles.error}>{errors.taskTitle?.message}</p>}
              <Button
                text={t('Cancel')}
                type="button"
                style="cancelEditTask"
                onClick={() => setIsEditTaskTitle(false)}
              />
            </>
          )}
        </div>

        <div className={styles.inputField}>
          <label htmlFor="taskDescription">{t('Description')}</label>
          {!isEditTaskDescription && (
            <>
              <p className={styles.columnDescription}>{data.description}</p>
              <Button text={t('Edit')} type="button" style="editTask" onClick={() => setIsEditTaskDescription(true)} />
            </>
          )}
          {isEditTaskDescription && (
            <>
              <textarea
                className={`${styles.textareaDescription} ${errors.taskDescription ? `${styles.error}` : ''}`}
                id="taskDescription"
                {...register('taskDescription', taskDescriptionValidate)}
              />
              {errors.taskDescription && <p className={styles.error}>{errors.taskDescription?.message}</p>}

              <Button
                text={t('Cancel')}
                type="button"
                style="cancelEditTask"
                onClick={() => setIsEditTaskDescription(false)}
              />
            </>
          )}
        </div>
        {(isEditTaskTitle || isEditTaskDescription) && (
          <Button text={t('Send')} type="submit" style="admitModalWindow" onClick={handleSubmit(updateTask)} />
        )}
      </div>
    </ModalWindow>
  );
};

export { AboutTask };
