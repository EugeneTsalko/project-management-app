import { deleteUser, updateUser } from 'api';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType } from 'components/Authorization/Authorization.types';
import { Button } from 'components/Button/Button';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { signOutUser } from 'store/slices/userSlice';
import styles from './ProfilePage.module.scss';
import { EditedUserParams } from './ProfilePage.types';
import { IoArrowBack, IoPersonCircleOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { isTokenExpired } from 'utils/isTokenExpired';

export const ProfilePage = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector((state) => state.user);
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEdit = async ({ name, login, password }: EditedUserParams) => {
    const id = user!._id;
    const response = dispatch(updateUser({ id, name, login, password }));
    await toast.promise(response, {
      loading: t('Updating...'),
      success: t('Your profile has been updated!'),
      error: t('Something went wrong...'),
    });
    setEditUser(false);
  };

  const handleDelete = async () => {
    const id = user!._id;
    const response = deleteUser(id);
    await toast.promise(response, {
      loading: t('Deleting...'),
      success: t('Your profile has been deleted!'),
      error: t('Something went wrong...'),
    });

    dispatch(signOutUser());
    window.localStorage.removeItem('token');
    navigate('/');
  };

  const confirmationActions = {
    confirmAction: () => handleDelete(),
    closeWindow: () => setDeleteUserModal(false),
  };

  return (
    <main className={styles.profilePage}>
      {deleteUserModal && (
        <ModalWindow type="confirmation" actions={confirmationActions}>
          {t('Are you sure you want to delete your account?')}
        </ModalWindow>
      )}

      {!editUser && (
        <section className={styles.profile}>
          <h1>{t('Your profile')}:</h1>
          <IoPersonCircleOutline />
          <p>
            {t('Name')}: <span>{user?.name}</span>
          </p>
          <p>
            {t('Login')}: <span> {user?.login}</span>
          </p>
          <div className={styles.profileButtons}>
            <Button text={t('Edit profile')} type="button" style="form" onClick={() => setEditUser((prev) => !prev)} />
            <Button text={t('Delete account')} type="button" style="form" onClick={() => setDeleteUserModal(true)} />
          </div>
          <p className={styles.token}>{t('Token expires in hours', { val: isTokenExpired().leftTime })}</p>
        </section>
      )}

      {editUser && (
        <section className={styles.editSection}>
          <button onClick={() => setEditUser(false)} className={styles.editButton}>
            <IoArrowBack />
            {t('Back')}
          </button>
          <Authorization type={AuthorizationType.edit} onChange={(data) => handleEdit(data)} />
        </section>
      )}
    </main>
  );
};
