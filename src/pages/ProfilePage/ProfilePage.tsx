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
import { IoPersonCircleOutline } from 'react-icons/io5';

export const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEdit = async ({ name, login, password }: EditedUserParams) => {
    const id = user!.id;
    const response = dispatch(updateUser({ id, name, login, password }));
    await toast.promise(response, {
      loading: 'Updating...',
      success: 'Your profile has been updated!',
      error: 'Something went wrong...',
    });
    setEditUser(false);
  };

  const handleDelete = async () => {
    const id = user!.id;
    const response = deleteUser(id);
    await toast.promise(response, {
      loading: 'Delete...',
      success: 'Your profile has been deleted!',
      error: 'Something went wrong...',
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
          Are you sure you want to delete your profile?
        </ModalWindow>
      )}

      <section className={styles.profile}>
        <h1>Your Profile:</h1>
        <IoPersonCircleOutline />
        <p>
          Name: <span>{user?.name}</span>
        </p>
        <p>
          Login: <span> {user?.login}</span>
        </p>
        <div className={styles.profileButtons}>
          <Button text="Delete user" type="button" style="form" onClick={() => setDeleteUserModal(true)} />
          <Button text="Edit user" type="button" style="form" onClick={() => setEditUser(!editUser)} />
        </div>
      </section>
      <section className={styles.editSection}>
        {editUser && <Authorization type={AuthorizationType.edit} onChange={(data) => handleEdit(data)} />}
      </section>
    </main>
  );
};
