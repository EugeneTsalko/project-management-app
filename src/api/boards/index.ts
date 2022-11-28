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
      toast.error((err as Error).message);
      return thunkApi.rejectWithValue({
        message: 'Failed to get boards.',
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
        return thunkApi.rejectWithValue({
          message: response.data.message,
        });
      }

      toast.success('Board is created');
      return response.data;
    } catch (err) {
      toast.error((err as Error).message);
      return thunkApi.rejectWithValue({
        message: (err as Error).message,
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
        return thunkApi.rejectWithValue({
          message: response.data.message,
        });
      }

      return response.data;
    } catch (err) {
      toast.error((err as Error).message);
      return thunkApi.rejectWithValue({
        message: 'Failed to get board.',
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
        return thunkApi.rejectWithValue({
          message: response.data.message,
        });
      }
      toast.success('Board is deleted');
      return response.data;
    } catch (err) {
      toast.error((err as Error).message);
      return thunkApi.rejectWithValue({
        message: 'Failed to delete board.',
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
        return thunkApi.rejectWithValue({
          message: response.data.message,
        });
      }
      toast.success('Board is updated');
      return response.data;
    } catch (err) {
      toast.error((err as Error).message);
      return thunkApi.rejectWithValue({
        message: (err as Error).message,
      });
    }
  }
);
