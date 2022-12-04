import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BoardInterface, ColumnResponseInterface, TaskResponseInterface } from 'api/currentBoard/index.types';

const initialState = {} as BoardInterface;
export const currentBoard = createSlice({
  name: 'currentBoard',
  initialState,
  reducers: {
    setCurrentBoard: (state, action: PayloadAction<BoardInterface>) => {
      return action.payload;
    },
    createColumn: (state, action: PayloadAction<ColumnResponseInterface>) => {
      state.columns.push({ ...action.payload, tasks: [] });
    },
    removeColumn: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter((column) => column._id !== action.payload);
    },
    updateColumn: (state, action: PayloadAction<ColumnResponseInterface>) => {
      const columnIndex = state.columns.findIndex((column) => column._id === action.payload._id);
      state.columns[columnIndex].order = action.payload.order;
      state.columns[columnIndex].title = action.payload.title;
    },
    createTask: (state, action: PayloadAction<TaskResponseInterface>) => {
      const newTask = {
        id: action.payload._id,
        title: action.payload.title,
        description: action.payload.description,
        order: action.payload.order,
        userId: action.payload.userId,
        files: [],
      };

      const columnIndex = state.columns.findIndex((column) => column._id === action.payload.columnId);
      state.columns[columnIndex].tasks.push(newTask);
    },
    removeTask: (state, action: PayloadAction<{ columnId: string; taskId: string }>) => {
      const columnIndex = state.columns.findIndex((column) => column._id === action.payload.columnId);
      state.columns[columnIndex].tasks = state.columns[columnIndex].tasks.filter(
        (task) => task.id !== action.payload.taskId
      );
    },
    updateTask: (state, action: PayloadAction<TaskResponseInterface>) => {
      const columnIndex = state.columns.findIndex((column) => column._id === action.payload.columnId);
      const taskIndex = state.columns[columnIndex].tasks.findIndex((task) => task.id === action.payload._id);
      state.columns[columnIndex].tasks[taskIndex].title = action.payload.title;
      state.columns[columnIndex].tasks[taskIndex].description = action.payload.description;
      state.columns[columnIndex].tasks[taskIndex].order = action.payload.order;
    },
  },
});

export const { setCurrentBoard, createColumn, removeColumn, updateColumn, createTask, removeTask, updateTask } =
  currentBoard.actions;

export default currentBoard.reducer;
