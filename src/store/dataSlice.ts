import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BoardInterface, CreateColumnResponseInterface, CreateTaskResponseInterface } from 'api/boards';

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
    createColumn: (state, action: PayloadAction<CreateColumnResponseInterface>) => {
      state.currentBoard.columns.push({ ...action.payload, tasks: [] });
    },
    removeColumn: (state, action: PayloadAction<string>) => {
      state.currentBoard.columns = state.currentBoard.columns.filter((column) => column.id !== action.payload);
    },
    createTask: (state, action: PayloadAction<CreateTaskResponseInterface>) => {
      const newTask = {
        id: action.payload.id,
        title: action.payload.title,
        description: action.payload.description,
        order: action.payload.order,
        userId: action.payload.userId,
        files: [],
      };

      const columnIndex = state.currentBoard.columns.findIndex((column) => column.id === action.payload.columnId);
      state.currentBoard.columns[columnIndex].tasks.push(newTask);
    },
  },
});

export const { setCurrentBoard, createColumn, removeColumn, createTask } = data.actions;

export default data.reducer;
