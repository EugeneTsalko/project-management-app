import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import API from '../base';

import { IBoards, IBoardsErrorMessage, ICreateBoard } from './index.types';

export const getBoardsList = createAsyncThunk<IBoards[], void, { rejectValue: IBoardsErrorMessage }>(
  '/boards',
  async (_, thunkApi) => {
    try {
      const response = await API.get('/boards');

      if (response.status === 404) {
        toast.error(response.data.message);
        return thunkApi.rejectWithValue({
          message: response.data.message,
        });
      }

      return response.data;
    } catch (err) {
      toast.error('Failed to fetch boards.');
      return thunkApi.rejectWithValue({
        message: 'Failed to fetch data.',
      });
    }
  }
);

export const createBoard = createAsyncThunk<IBoards[], ICreateBoard, { rejectValue: IBoardsErrorMessage }>(
  '/createBoard',
  async ({ title, description }, thunkApi) => {
    try {
      const response = await API.post('/boards', { title, description });

      if (response.status === 404) {
        toast.error(response.data.message);
        return thunkApi.rejectWithValue({
          message: response.data.message,
        });
      }

      toast.success('Board is created');
      return response.data;
    } catch (err) {
      toast.error('Failed to create board.');
      return thunkApi.rejectWithValue({
        message: 'Failed to create data.',
      });
    }
  }
);

export const getBoardById = createAsyncThunk<IBoards[], string, { rejectValue: IBoardsErrorMessage }>(
  '/getBoardById',
  async (id, thunkApi) => {
    try {
      const response = await API.get(`/boards/${id}`);

      if (response.status === 404) {
        toast.error(response.data.message);
        return thunkApi.rejectWithValue({
          message: response.data.message,
        });
      }

      return response.data;
    } catch (err) {
      toast.success('Failed to get board.');
      return thunkApi.rejectWithValue({
        message: 'Failed to get data.',
      });
    }
  }
);

export const deleteBoard = createAsyncThunk<IBoards[], string, { rejectValue: IBoardsErrorMessage }>(
  '/deleteBoard',
  async (id, thunkApi) => {
    try {
      const response = await API.delete(`/boards/${id}`);

      if (response.status === 404) {
        toast.error(response.data.message);
        return thunkApi.rejectWithValue({
          message: response.data.message,
        });
      }
      toast.success('Board is deleted');
      return response.data;
    } catch (err) {
      toast.error('Failed to delete data.');
      return thunkApi.rejectWithValue({
        message: 'Failed to delete data.',
      });
    }
  }
);

export const updateBoard = createAsyncThunk<IBoards[], IBoards, { rejectValue: IBoardsErrorMessage }>(
  '/updateBoard',
  async ({ id, title, description }, thunkApi) => {
    try {
      const response = await API.put(`/boards/${id}`, { title, description });

      if (response.status === 404) {
        toast.error(response.data.message);
        return thunkApi.rejectWithValue({
          message: response.data.message,
        });
      }
      toast.success('Board is updated');
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue({
        message: 'Failed to update data.',
      });
    }
  }
);
