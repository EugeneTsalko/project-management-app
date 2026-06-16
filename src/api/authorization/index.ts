import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../base';

import { decodeJWT } from 'utils/decodeJWT';
import { User } from 'store/slices/userSlice.types';
import { ISignInProps, ISignUpErrorMessage, ISignUpProps } from './index.types';

export const signUpUser = createAsyncThunk<User, ISignUpProps, { rejectValue: ISignUpErrorMessage }>(
  '/user/signUp',
  async (user, thunkApi) => {
    try {
      const response = await API.post('/auth/signup', user);

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

export const signInUser = createAsyncThunk<User, ISignInProps, { rejectValue: ISignUpErrorMessage }>(
  '/user/signIn',
  async ({ login, password }, thunkApi) => {
    try {
      const response = await API.post('/auth/signin', { login, password });

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

export const isUserAuth = createAsyncThunk('user/isUserAuth', async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const { id } = decodeJWT(token);
    const { data }: { data: User } = await API.get(`/users/${id}`);

    return data;
  } else {
    throw new Error();
  }
});
