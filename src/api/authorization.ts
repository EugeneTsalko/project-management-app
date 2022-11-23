import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, UserToken } from 'store/slices/userSlice.types';
import { decodeJWT } from 'utils/decodeJWT';
import { AuthorizationParams } from './authorization.types';
import API from './base';

export const signUpUser = createAsyncThunk('user/signUp', async (user: AuthorizationParams) => {
  const { data } = await API.post('/signup', user);

  return data;
});

export const signInUser = createAsyncThunk('user/signIn', async (user: AuthorizationParams) => {
  const { data }: { data: UserToken } = await API.post('/signin', user);
  const userData = decodeJWT(data.token);

  return { token: data.token, ...userData };
});

export const isUserAuth = createAsyncThunk('user/isUserAuth', async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const userData = decodeJWT(token);
    const { data }: { data: User } = await API.get(`/users/${userData.id}`);

    return data;
  } else {
    throw new Error();
  }
});
