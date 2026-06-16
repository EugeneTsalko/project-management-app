import { createSlice } from '@reduxjs/toolkit';
import { isUserAuth, signInUser, signUpUser, updateUser } from 'api';
import { UserState } from './userSlice.types';

const initialState: UserState = {
  user: null,
  status: 'Pending',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signOutUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.user = null;
        state.status = 'Pending';
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'Fulfilled';
      })
      .addCase(signUpUser.rejected, (state) => {
        state.status = 'Rejected';
      });

    builder
      .addCase(signInUser.pending, (state) => {
        state.status = 'Pending';
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.status = 'Fulfilled';
      })
      .addCase(signInUser.rejected, (state) => {
        state.status = 'Rejected';
      });

    builder
      .addCase(isUserAuth.pending, (state) => {
        state.user = null;
        state.status = 'Pending';
      })
      .addCase(isUserAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'Fulfilled';
      })
      .addCase(isUserAuth.rejected, (state) => {
        state.status = 'Rejected';
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.status = 'Pending';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'Fulfilled';
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'Rejected';
      });
  },
});

export const userReducer = userSlice.reducer;
export const { signOutUser } = userSlice.actions;
