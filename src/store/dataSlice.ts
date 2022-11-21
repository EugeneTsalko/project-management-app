import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Board } from 'api/boards/boardsApi.types';

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
    removeColumn: (state, action: PayloadAction<string>) => {
      const columnIndex = (state.currentBoard as Board).columns.findIndex((value) => value.id === action.payload);
      (state.currentBoard as Board).columns.splice(columnIndex, 1);
    },
  },
});

export const { setCurrentBoard, removeColumn } = data.actions;

export default data.reducer;
