import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from 'store/hooks';
import { createBoard, updateBoard } from 'api/boards';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import styles from './index.module.scss';

import { ICreateBoard } from 'api/boards/index.types';
import { IFormBoardProps } from './index.types';

const FormBoard: FC<IFormBoardProps> = ({ setIsFormBoardModal, id, title, description }) => {
  const dispatch = useAppDispatch();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateBoard>({
    defaultValues: {
      title: title ? title : '',
      description: description ? description : '',
    },
  });

  const cancelHandler = () => {
    reset();
    setIsFormBoardModal(false);
  };

  const submitHandler: SubmitHandler<ICreateBoard> = async ({ title, description }, e) => {
    await dispatch(id ? updateBoard({ id, title, description }) : createBoard({ title, description }));
    setIsFormBoardModal(false);
    reset();
  };

  const confirmationActions = {
    confirmAction: handleSubmit(submitHandler),
    closeWindow: cancelHandler,
  };

  return (
    <ModalWindow actions={confirmationActions} type="modification">
      <h1>{id ? 'Edit board' : 'Create board'}</h1>
      <div className={styles.inputBox}>
        <input
          {...register('title', {
            required: "Title can't be empty",
            maxLength: { value: 20, message: 'Title must be less than 20 letters!' },
          })}
          className={`${errors.title ? `${styles.input} ${styles.error}` : styles.input}`}
          type="text"
          placeholder="Title"
        />
        {errors.title && <p className={styles.error}>{errors.title?.message}</p>}
      </div>
      <div className={styles.inputBox}>
        <input
          {...register('description', {
            required: "Description can't be empty",
            maxLength: { value: 60, message: 'It must be less than 60 letters!' },
          })}
          className={`${errors.description ? `${styles.input} ${styles.error}` : styles.input}`}
          type="text"
          placeholder="Description"
        />
        {errors.description && <p className={styles.error}>{errors.description?.message}</p>}
      </div>
    </ModalWindow>
  );
};

export default FormBoard;
