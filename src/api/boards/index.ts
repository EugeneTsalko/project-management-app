import { createAsyncThunk } from '@reduxjs/toolkit';
import { t } from 'i18next';
import API from '../base';
import toast from 'react-hot-toast';

import { IBoards, IBoardsErrorMessage, ICreateBoard, ICreateBoardProps, IFetchedBoards } from './index.types';

export const getBoardsList = createAsyncThunk<IFetchedBoards[], void, { rejectValue: IBoardsErrorMessage }>(
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

export const createBoard = createAsyncThunk<IFetchedBoards, ICreateBoardProps, { rejectValue: IBoardsErrorMessage }>(
  '/createBoard',
  async ({ title, owner, users }, thunkApi) => {
    try {
      const response = await API.post('/boards', { title, owner, users });

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

export const getBoardById = createAsyncThunk<IFetchedBoards, string, { rejectValue: IBoardsErrorMessage }>(
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

export const deleteBoard = createAsyncThunk<IFetchedBoards[], string, { rejectValue: IBoardsErrorMessage }>(
  '/deleteBoard',
  async (_id, thunkApi) => {
    try {
      const response = await API.delete(`/boards/${_id}`);

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

export const updateBoard = createAsyncThunk<IFetchedBoards, IBoards, { rejectValue: IBoardsErrorMessage }>(
  '/updateBoard',
  async ({ id, title, owner, users }, thunkApi) => {
    try {
      const response = await API.put(`/boards/${id}`, { title, owner, users });

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
