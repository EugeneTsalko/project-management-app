import API from 'api/base';
import toast from 'react-hot-toast';
import { UserParams } from './index.types';

export const deleteUser = async (id: string) => {
  try {
    const response = await API.delete(`/users/${id}`);

    if (response.status === 404) {
      toast.error(response.data.message);

      return null;
    }
  } catch {
    toast.error('Failed to delete user');

    return null;
  }
};

export const updateUser = async ({ id, name, login, password }: UserParams) => {
  try {
    const response = await API.put(`/users/${id}`, { name, login, password });

    if (response.status === 404) {
      toast.error(response.data.message);

      return null;
    }

    return response.data;
  } catch {
    toast.error('Failed to update user');

    return null;
  }
};
