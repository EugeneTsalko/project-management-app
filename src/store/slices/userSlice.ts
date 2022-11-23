import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isUserAuth, signInUser, signUpUser } from 'api';
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOutUser: (state) => {
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
        const { id, login, name } = action.payload;
        state.user = { id, login, name };
      });

    builder
      .addCase(isUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isUserAuth.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(isUserAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuth = false;
      });
  },
});

export const userReducer = userSlice.reducer;
export const { signOutUser } = userSlice.actions;
