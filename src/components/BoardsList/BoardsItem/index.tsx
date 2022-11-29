import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';

import { IBoards } from 'api/boards/index.types';
import { deleteBoard } from 'api/boards';
import toast from 'react-hot-toast';

import FormBoard from '../FormBoard';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';

import { IoTrash, IoPencil } from 'react-icons/io5';
import styles from './index.module.scss';
import { useTranslation } from 'react-i18next';

const BoardsItem: FC<IBoards> = ({ id, title, description }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isDeleteBoardModal, setIsDeleteBoardModal] = useState<boolean>(false);
  const [isEditBoardModal, setIsEditBoardModal] = useState<boolean>(false);

  const actionHandler = (e: React.MouseEvent<HTMLButtonElement | SVGElement>) => {
    e.stopPropagation();
    if ((e.target as HTMLButtonElement).name === 'edit') {
      setIsEditBoardModal(true);
    }
    if ((e.target as HTMLButtonElement).name === 'delete') {
      setIsDeleteBoardModal(true);
    }
  };

  const deleteHandler = async () => {
    const { payload } = await dispatch(deleteBoard(id));
    if (!payload) {
      toast.success(t('Board is deleted!'));
    } else {
      toast.error(t('Failed to delete board.'));
    }
  };

  const deleteActions = {
    confirmAction: () => deleteHandler(),
    closeWindow: () => setIsDeleteBoardModal(false),
  };

  return (
    <>
      <div className={styles.card} onClick={() => navigate(`/boards/${id}`)}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <button name="delete" type="button" onClick={actionHandler}>
            <IoTrash />
          </button>
          <button name="edit" type="button" onClick={actionHandler}>
            <IoPencil />
          </button>
        </div>
      </div>

      {isDeleteBoardModal && (
        <ModalWindow type="confirmation" actions={deleteActions}>
          <h3>{t('Do you want to delete this board?')}</h3>
        </ModalWindow>
      )}

      {isEditBoardModal && (
        <FormBoard setIsFormBoardModal={setIsEditBoardModal} id={id} title={title} description={description} />
      )}
    </>
  );
};

export default BoardsItem;
