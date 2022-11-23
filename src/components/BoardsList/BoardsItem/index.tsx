import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store/hooks';
import { IBoards } from 'api/boards/index.types';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import FormBoard from '../FormBoard';
import { deleteBoard } from 'api/boards';
import styles from './index.module.scss';

const BoardsItem: FC<IBoards> = ({ id, title, description }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isDeleteBoardModal, setIsDeleteBoardModal] = useState<boolean>(false);
  const [isEditBoardModal, setIsEditBoardModal] = useState<boolean>(false);

  const actionHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if ((e.target as HTMLButtonElement).name === 'edit') {
      setIsEditBoardModal(true);
    } else {
      setIsDeleteBoardModal(true);
    }
  };

  const deleteActions = {
    confirmAction: () => dispatch(deleteBoard(id)),
    closeWindow: () => setIsDeleteBoardModal(false),
  };

  return (
    <>
      <div className={styles.card} onClick={() => navigate(`/boards/${id}`)}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttons}>
          <button name="delete" onClick={actionHandler}>
            Delete
          </button>
          <button name="edit" onClick={actionHandler}>
            Edit
          </button>
        </div>
      </div>

      {isDeleteBoardModal && (
        <ModalWindow type="confirmation" actions={deleteActions}>
          <p>Do you want to delete this board?</p>
        </ModalWindow>
      )}

      {isEditBoardModal && (
        <FormBoard setIsFormBoardModal={setIsEditBoardModal} id={id} title={title} description={description} />
      )}
    </>
  );
};

export default BoardsItem;
