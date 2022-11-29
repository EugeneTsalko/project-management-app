import { createAsyncThunk } from '@reduxjs/toolkit';
import { t } from 'i18next';
import API from '../base';
import toast from 'react-hot-toast';

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
      toast.error(t('Failed to get boards!'));
      return thunkApi.rejectWithValue({
        message: (err as Error).message,
      });
    }
  }
);

export const createBoard = createAsyncThunk<IBoards, ICreateBoard, { rejectValue: IBoardsErrorMessage }>(
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

      toast.success(t('Board is created!'));
      return response.data;
    } catch (err) {
      toast.error(t('Failed to create board.'));
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
        toast.error(response.data.message);
        return thunkApi.rejectWithValue({
          message: response.data.message,
        });
      }

      return response.data;
    } catch (err) {
      toast.error(t('Failed to get board!'));
      return thunkApi.rejectWithValue({
        message: (err as Error).message,
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

      toast.success(t('Board is deleted!'));
      return response.data;
    } catch (err) {
      toast.error(t('Failed to delete board!'));
      return thunkApi.rejectWithValue({
        message: (err as Error).message,
      });
    }
  }
);

export const updateBoard = createAsyncThunk<IBoards, IBoards, { rejectValue: IBoardsErrorMessage }>(
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

      toast.success(t('Board is updated!'));
      return response.data;
    } catch (err) {
      toast.error(t('Failed to update board!'));
      return thunkApi.rejectWithValue({
        message: (err as Error).message,
      });
    }
  }
);
