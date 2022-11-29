import { deleteUser, updateUser } from 'api';
import { Authorization } from 'components/Authorization/Authorization';
import { AuthorizationType } from 'components/Authorization/Authorization.types';
import { Button } from 'components/Button/Button';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { signOutUser } from 'store/slices/userSlice';
import styles from './ProfilePage.module.scss';
import { EditedUserParams } from './ProfilePage.types';

export const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log('user: ', user);

  const handleEdit = async ({ name, login, password }: EditedUserParams) => {
    const id = user!.id;
    const response = updateUser({ id, name, login, password });
    await toast.promise(response, {
      loading: 'Updating...',
      success: 'Your profile has been updated!',
      error: 'Something went wrong...',
    });
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

      <section>
        <p>Your Profile:</p>
        <img></img>
        <p>Name: {user?.name}</p>
        <p>Login: {user?.login}</p>
        <Button text="Delete user" type="button" style="form" onClick={() => setDeleteUserModal(true)} />
        <Button text="Edit user" type="button" style="form" onClick={() => setEditUser(!editUser)} />
      </section>
      {editUser && (
        <section>
          <Authorization type={AuthorizationType.edit} onChange={(data) => handleEdit(data)} />
        </section>
      )}
    </main>
  );
};
