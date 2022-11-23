import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isUserAuth, signInUser, signUpUser } from 'api';
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
