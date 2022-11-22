import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signIn, signUp } from 'api';
import { decodeJWT } from 'utils/decodeJWT';
import { signOut } from 'utils/signOut';
import { User, UserState, UserToken } from './userSlice.types';

const initialState: UserState = {
  isAuth: null,
  isLoading: false,
  user: {
    id: '',
    name: '',
    login: '',
  },
};

export const signUpUser = createAsyncThunk(
  'user/signUp',
  async ({ name, login, password }: { name: string; login: string; password: string }) => {
    const data = await signUp({ name, login, password });
    return data;
  }
);

export const signInUser = createAsyncThunk(
  'user/signIn',
  async ({ login, password }: { login: string; password: string }) => {
    const data = await signIn({ login, password });
    const userData = decodeJWT(data.token);
    return { token: data.token, ...userData };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOutUser: (state) => {
      signOut();
      state.isAuth = false;
      state.user = { id: '', name: '', login: '' };
    },
  },
  extraReducers: {
    [signUpUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signUpUser.fulfilled.type]: (state) => {
      state.isLoading = false;
    },
    [signInUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signInUser.fulfilled.type]: (state, action: PayloadAction<User & UserToken>) => {
      state.isLoading = false;
      state.isAuth = true;
      const { token, ...userData } = action.payload;
      state.user = { ...userData };
      localStorage.setItem('token', token);
    },
  },
});

export const userReducer = userSlice.reducer;
export const { signOutUser } = userSlice.actions;
