import { createAsyncThunk } from '@reduxjs/toolkit';
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

export const updateUser = createAsyncThunk(
  '/users/update',
  async ({ id, name, login, password }: UserParams, thunkApi) => {
    try {
      const response = await API.put(`/users/${id}`, { name, login, password });

      if (response.status === 404) {
        return thunkApi.rejectWithValue({
          message: response.data.message,
        });
      }
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue({
        message: (err as Error).message,
      });
    }
  }
);
