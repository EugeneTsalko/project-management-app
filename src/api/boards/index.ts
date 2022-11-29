import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../base';

import { IBoards, IBoardsErrorMessage, ICreateBoard } from './index.types';

export const getBoardsList = createAsyncThunk<IBoards[], void, { rejectValue: IBoardsErrorMessage }>(
  '/boards',
  async (_, thunkApi) => {
    try {
      const response = await API.get('/boards');

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

export const createBoard = createAsyncThunk<IBoards, ICreateBoard, { rejectValue: IBoardsErrorMessage }>(
  '/createBoard',
  async ({ title, description }, thunkApi) => {
    try {
      const response = await API.post('/boards', { title, description });

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

export const updateBoard = createAsyncThunk<IBoards, IBoards, { rejectValue: IBoardsErrorMessage }>(
  '/updateBoard',
  async ({ id, title, description }, thunkApi) => {
    try {
      const response = await API.put(`/boards/${id}`, { title, description });

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
