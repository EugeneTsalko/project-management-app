import React, { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useAppDispatch } from 'store/hooks';
import { createBoard, updateBoard } from 'api/boards';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import styles from './index.module.scss';

import { IBoards, IBoardsErrorMessage, ICreateBoard } from 'api/boards/index.types';
import { IFormBoardProps } from './index.types';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const FormBoard: FC<IFormBoardProps> = ({ setIsFormBoardModal, id, title, description }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

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
    const { payload } = await dispatch(
      id ? updateBoard({ id, title, description }) : createBoard({ title, description })
    );

    if (payload && 'message' in payload === false) {
      id ? toast.success(t('Board is updated!')) : toast.success(t('Board is created!'));
    }
    if (payload && 'message' in payload) {
      id ? toast.error(t('Failed to update board.')) : toast.error(t('Failed to create board.'));
    }

    setIsFormBoardModal(false);
    reset();
  };

  const confirmationActions = {
    confirmAction: handleSubmit(submitHandler),
    closeWindow: cancelHandler,
  };

  return (
    <ModalWindow actions={confirmationActions} type="modification">
      <h1>{id ? t('Edit Board') : t('Create Board')}</h1>
      <div className={styles.inputBox}>
        <input
          {...register('title', {
            required: t("Title can't be empty") as string,
            maxLength: { value: 20, message: t('Title must be less than 20 characters!') },
          })}
          className={`${errors.title ? `${styles.input} ${styles.error}` : styles.input}`}
          type="text"
          placeholder={t('boardTitle') as string}
        />
        {errors.title && <p className={styles.error}>{errors.title?.message}</p>}
      </div>
      <div className={styles.inputBox}>
        <input
          {...register('description', {
            required: t("Description can't be empty") as string,
            maxLength: { value: 60, message: t('It must be less than 60 characters!') },
          })}
          className={`${errors.description ? `${styles.input} ${styles.error}` : styles.input}`}
          type="text"
          placeholder={t('boardDescription') as string}
        />
        {errors.description && <p className={styles.error}>{errors.description?.message}</p>}
      </div>
    </ModalWindow>
  );
};

export default FormBoard;
