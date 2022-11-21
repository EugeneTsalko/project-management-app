import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Board } from 'api/boardsApi.types';

const initialState = {
  currentBoard: {},
};

export const data = createSlice({
  name: 'cache',
  initialState: initialState,
  reducers: {
    setCurrentBoard: (state, action: PayloadAction<Board>) => {
      state.currentBoard = action.payload;
    },
  },
});

export const { setCurrentBoard } = data.actions;

export default data.reducer;
