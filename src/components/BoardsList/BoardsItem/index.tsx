import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';

import { IBoards, IFetchedBoards } from 'api/boards/index.types';
import { deleteBoard } from 'api/boards';

import FormBoard from '../FormBoard';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';

import { IoTrash, IoPencil } from 'react-icons/io5';
import styles from './index.module.scss';
import { t } from 'i18next';

const BoardsItem: FC<IFetchedBoards> = ({ _id, title, owner, users }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    await dispatch(deleteBoard(_id));
  };

  const deleteActions = {
    confirmAction: () => deleteHandler(),
    closeWindow: () => setIsDeleteBoardModal(false),
  };

  return (
    <>
      <div className={styles.card} onClick={() => navigate(`/boards/${_id}`)}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{owner}</p>
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
          <h3>{t('Are you sure you want to delete this board?')}</h3>
        </ModalWindow>
      )}

      {isEditBoardModal && (
        <FormBoard setIsFormBoardModal={setIsEditBoardModal} id={_id} title={title} owner={owner} users={users} />
      )}
    </>
  );
};

export default BoardsItem;
