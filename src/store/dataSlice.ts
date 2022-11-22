import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BoardInterface, CreateColumnResponseInterface } from 'api/boards';

const initialState = {
  currentBoard: {} as BoardInterface,
};

export const data = createSlice({
  name: 'cache',
  initialState: initialState,
  reducers: {
    setCurrentBoard: (state, action: PayloadAction<BoardInterface>) => {
      state.currentBoard = action.payload;
    },
    removeColumn: (state, action: PayloadAction<string>) => {
      const columnIndex = state.currentBoard.columns.findIndex((value) => value.id === action.payload);
      state.currentBoard.columns.splice(columnIndex, 1);
    },
    createColumn: (state, action: PayloadAction<CreateColumnResponseInterface>) => {
      state.currentBoard.columns = [...state.currentBoard.columns, { ...action.payload, tasks: [] }];
    },
  },
});

export const { setCurrentBoard, removeColumn, createColumn } = data.actions;

export default data.reducer;
