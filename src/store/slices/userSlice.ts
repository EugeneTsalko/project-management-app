import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getUserById, signIn, signUp } from 'api';
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

export const isUserAuth = createAsyncThunk('user/isUserAuth', async () => {
  const token = localStorage.getItem('token');
  if (token) {
    const userData = decodeJWT(token);
    const user = await getUserById(userData.id);
    return user;
  } else {
    throw new Error();
  }
});

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
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<User & UserToken>) => {
        state.isLoading = false;
        state.isAuth = true;
        const { token, ...userData } = action.payload;
        state.user = { ...userData };
        localStorage.setItem('token', token);
      });

    builder
      .addCase(isUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isUserAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { signOutUser } = userSlice.actions;
