import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ColumnInterface, TaskInterface } from 'api/currentBoard/index.types';

const initialState = {
  columns: [] as ColumnInterface[],
  tasks: {} as { [key: string]: TaskInterface[] },
};

export const currentBoard = createSlice({
  name: 'currentBoard',
  initialState,
  reducers: {
    setColumns: (state, action: PayloadAction<ColumnInterface[]>) => {
      state.columns = action.payload;
    },
    createColumn: (state, action: PayloadAction<ColumnInterface>) => {
      state.columns.push(action.payload);
      state.tasks[action.payload._id] = [] as TaskInterface[];
    },
    removeColumn: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter((column) => column._id !== action.payload);
      delete state.tasks[action.payload];
    },
    updateColumn: (state, action: PayloadAction<ColumnInterface>) => {
      const columnIndex = state.columns.findIndex((column) => column._id === action.payload._id);
      state.columns[columnIndex].order = action.payload.order;
      state.columns[columnIndex].title = action.payload.title;
    },
    setTasks: (state, action: PayloadAction<{ [key: string]: TaskInterface[] }>) => {
      state.tasks = action.payload;
    },
    createTask: (state, action: PayloadAction<TaskInterface>) => {
      const newTask = {
        _id: action.payload._id,
        title: action.payload.title,
        order: action.payload.order,
        boardId: action.payload.boardId,
        columnId: action.payload.columnId,
        description: action.payload.description,
        userId: action.payload.userId,
        users: [action.payload.userId],
      };
      state.tasks[action.payload.columnId].push(newTask);
    },
    removeTask: (state, action: PayloadAction<{ columnId: string; taskId: string }>) => {
      const columnId = action.payload.columnId;
      state.tasks[columnId] = state.tasks[columnId].filter((task) => task._id !== action.payload.taskId);
    },
    updateTask: (state, action: PayloadAction<TaskInterface>) => {
      const columnId = action.payload.columnId;
      const taskIndex = state.tasks[columnId].findIndex((task) => task._id === action.payload._id);
      state.tasks[columnId][taskIndex].title = action.payload.title;
      state.tasks[columnId][taskIndex].description = action.payload.description;
      state.tasks[columnId][taskIndex].order = action.payload.order;
    },
  },
});

export const { setColumns, createColumn, removeColumn, updateColumn, setTasks, createTask, removeTask, updateTask } =
  currentBoard.actions;

export default currentBoard.reducer;
